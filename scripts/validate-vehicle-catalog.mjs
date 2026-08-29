import { readFile } from "node:fs/promises";

const inputPath = process.argv[2] ?? "data/fbox-fitment.vehicle-catalog-expanded.json";
const networkCheck = process.argv.includes("--network");
const requiredFields = [
  "id",
  "brand",
  "brand_zh",
  "series",
  "series_zh",
  "market_scope",
  "year_start",
  "year_end",
  "generation_or_chassis",
  "body_styles",
  "common_drive_forms",
  "source_refs",
  "source_type",
  "verification_status",
  "limitations"
];
const forbiddenRecordKeys = [
  "pcd",
  "center_bore",
  "center_bore_mm",
  "wheel_et",
  "et_mm",
  "wheel_width",
  "wheel_diameter",
  "brake_clearance",
  "caliper_clearance",
  "coilover_clearance",
  "tire_size",
  "tyre_size"
];
const allowedMarketScopes = new Set([
  "global",
  "China",
  "North America",
  "Europe",
  "pending_exact_market_verification"
]);
const fourMarketTemplate = new Set(["global", "China", "North America", "Europe"]);

const errors = [];
const warnings = [];
const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
const isNonEmptyArray = (value) => Array.isArray(value) && value.length > 0;

function error(message) {
  errors.push(message);
}

function checkSourceUrl(recordId, source, sourceIndex) {
  if (!source || typeof source !== "object") {
    error(`${recordId}: source_refs[${sourceIndex}] must be an object`);
    return;
  }
  if (!isNonEmptyString(source.url)) {
    error(`${recordId}: source_refs[${sourceIndex}].url is required`);
    return;
  }
  try {
    const parsed = new URL(source.url);
    if (parsed.protocol !== "https:") {
      error(`${recordId}: source_refs[${sourceIndex}].url must use https`);
    }
  } catch {
    error(`${recordId}: source_refs[${sourceIndex}].url is not a valid URL: ${source.url}`);
  }
  if (!isNonEmptyString(source.publisher)) {
    error(`${recordId}: source_refs[${sourceIndex}].publisher is required`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(source.accessed_on ?? "")) {
    error(`${recordId}: source_refs[${sourceIndex}].accessed_on must be YYYY-MM-DD`);
  }
}

function checkMarketScope(recordId, record) {
  if (!isNonEmptyArray(record.market_scope)) return;

  const scopes = new Set(record.market_scope);
  for (const scope of scopes) {
    if (!allowedMarketScopes.has(scope)) {
      error(`${recordId}: unsupported market_scope value ${scope}`);
    }
  }

  if (scopes.size === fourMarketTemplate.size && [...fourMarketTemplate].every((scope) => scopes.has(scope))) {
    error(`${recordId}: market_scope uses the forbidden four-market template`);
  }

  if (scopes.has("pending_exact_market_verification") && scopes.size !== 1) {
    error(`${recordId}: pending_exact_market_verification must be the only market_scope value`);
  }

  if (String(record.verification_status ?? "").includes("series_catalog_only") && !scopes.has("pending_exact_market_verification")) {
    error(`${recordId}: series_catalog_only records must use pending_exact_market_verification`);
  }
}

async function checkNetworkUrl(url) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(8000)
    });
    return response.status < 400;
  } catch {
    return false;
  }
}

let catalog;
try {
  catalog = JSON.parse(await readFile(inputPath, "utf8"));
} catch (cause) {
  console.error(`Cannot read or parse ${inputPath}: ${cause.message}`);
  process.exit(1);
}

if (!Array.isArray(catalog.records)) {
  error("records must be an array");
}

const records = Array.isArray(catalog.records) ? catalog.records : [];
const ids = new Set();
const identityKeys = new Set();
const brands = new Set();
const sourceUrls = new Set();
const sourceUrlRecords = new Map();

function normalizeIdentity(value) {
  return String(value ?? "").toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "");
}

function identityKey(record) {
  return [
    normalizeIdentity(record.brand),
    normalizeIdentity(record.series),
    record.year_start,
    record.year_end,
    normalizeIdentity(record.generation_or_chassis),
    [...(record.body_styles ?? [])].sort().join(","),
    [...(record.common_drive_forms ?? [])].sort().join(",")
  ].join("|");
}

for (const [index, record] of records.entries()) {
  const recordId = record?.id ?? `records[${index}]`;
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    error(`${recordId}: record must be an object`);
    continue;
  }

  for (const field of requiredFields) {
    if (!(field in record)) {
      error(`${recordId}: missing required field ${field}`);
    }
  }

  if (!isNonEmptyString(record.id)) {
    error(`${recordId}: id must be a non-empty string`);
  } else if (ids.has(record.id)) {
    error(`${record.id}: duplicate id`);
  } else {
    ids.add(record.id);
  }

  const normalizedIdentityKey = identityKey(record);
  if (identityKeys.has(normalizedIdentityKey)) {
    error(`${recordId}: duplicate normalized identity key ${normalizedIdentityKey}`);
  } else {
    identityKeys.add(normalizedIdentityKey);
  }

  if (!isNonEmptyString(record.brand)) error(`${recordId}: brand must be a non-empty string`);
  if (!isNonEmptyString(record.series)) error(`${recordId}: series must be a non-empty string`);
  if (!Number.isInteger(record.year_start) || !Number.isInteger(record.year_end)) {
    error(`${recordId}: year_start and year_end must be integers`);
  } else {
    if (record.year_start < 1880 || record.year_start > 2100) error(`${recordId}: year_start outside 1880-2100`);
    if (record.year_end < 1880 || record.year_end > 2100) error(`${recordId}: year_end outside 1880-2100`);
    if (record.year_start > record.year_end) error(`${recordId}: year_start is after year_end`);
  }

  if (!isNonEmptyArray(record.market_scope)) error(`${recordId}: market_scope must be non-empty`);
  checkMarketScope(recordId, record);
  if (!isNonEmptyArray(record.body_styles)) error(`${recordId}: body_styles must be non-empty`);
  if (!isNonEmptyArray(record.common_drive_forms)) error(`${recordId}: common_drive_forms must be non-empty`);
  if (record.generation_or_chassis !== null && !isNonEmptyString(record.generation_or_chassis)) {
    error(`${recordId}: generation_or_chassis must be a string or null`);
  }
  if (!isNonEmptyArray(record.source_refs)) {
    error(`${recordId}: source_refs must be a non-empty array`);
  } else {
    record.source_refs.forEach((source, sourceIndex) => {
      checkSourceUrl(recordId, source, sourceIndex);
      if (source?.url) {
        sourceUrls.add(source.url);
        sourceUrlRecords.set(source.url, (sourceUrlRecords.get(source.url) ?? 0) + 1);
      }
    });
  }
  if (!isNonEmptyArray(record.source_type)) error(`${recordId}: source_type must be a non-empty array`);
  if (!isNonEmptyString(record.verification_status)) error(`${recordId}: verification_status is required`);
  if (!isNonEmptyString(record.limitations)) error(`${recordId}: limitations is required`);
  if (isNonEmptyString(record.verification_status) && record.verification_status.includes("year_generation_pending") && record.generation_or_chassis !== null) {
    error(`${recordId}: year_generation_pending records must set generation_or_chassis to null`);
  }
  if (isNonEmptyString(record.limitations)) {
    for (const marker of ["销售市场", "年款", "代际", "PCD", "中心孔", "ET"]) {
      if (!record.limitations.includes(marker)) {
        error(`${recordId}: limitations must explicitly mention ${marker}`);
      }
    }
  }

  for (const key of Object.keys(record)) {
    const normalizedKey = key.toLowerCase();
    if (forbiddenRecordKeys.some((forbidden) => normalizedKey.includes(forbidden))) {
      error(`${recordId}: forbidden production-fitment field ${key} found in identity catalog`);
    }
  }

  if (isNonEmptyString(record.brand)) brands.add(record.brand);
}

if (catalog.record_count !== records.length) error(`record_count=${catalog.record_count} does not match ${records.length}`);
if (catalog.brand_count !== brands.size) error(`brand_count=${catalog.brand_count} does not match ${brands.size}`);
if (brands.size < 25) error(`catalog must cover at least 25 brands; found ${brands.size}`);

for (const brand of brands) {
  const count = records.filter((record) => record.brand === brand).length;
  if (count < 2) warnings.push(`${brand}: only ${count} series; expand main series when verified sources are available`);
}

if (networkCheck) {
  for (const url of sourceUrls) {
    const reachable = await checkNetworkUrl(url);
    if (!reachable) warnings.push(`network check could not confirm ${url}; provider may block HEAD or require browser navigation`);
  }
}

if (errors.length > 0) {
  console.error(`Vehicle catalog validation failed with ${errors.length} error(s)`);
  for (const message of errors) console.error(`- ${message}`);
  process.exit(1);
}

console.log(`Vehicle catalog valid: ${records.length} records, ${brands.size} brands, ${sourceUrls.size} unique source URLs`);
console.log(`Normalized identity keys checked: ${identityKeys.size}`);
console.log(`Required fields checked: ${requiredFields.join(", ")}`);
console.log(
  `Production-fitment fields blocked in the identity layer only; keep them in linked verified/reference records: ${forbiddenRecordKeys.join(", ")}`,
);
if (warnings.length > 0) {
  console.warn(`Warnings: ${warnings.length}`);
  for (const warning of warnings) console.warn(`- ${warning}`);
}
