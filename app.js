import { domesticHomePage, wireDomesticHome } from './domestic-home.js?v=20260829-showcase-media-v3';

const ASSET = '/assets/';
const runtimeConfig = globalThis.__FBOX_RUNTIME__ || {};
const staticAssetFallbacks = new Map();
const icons = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h7.5a2 2 0 0 0 1.9-1.5L20 8H6"></path><circle cx="10" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.5"></circle><path d="M4.5 20a7.5 7.5 0 0 1 15 0"></path></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 8.7c0 5.4-8.8 10.3-8.8 10.3S3.2 14.1 3.2 8.7A4.6 4.6 0 0 1 12 6.3a4.6 4.6 0 0 1 8.8 2.4Z"></path></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z"></path><circle cx="12" cy="12" r="2.5"></circle></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m6 6 12 12M18 6 6 18"></path></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m6 9 6 6 6-6"></path></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m15 18-6-6 6-6"></path></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 18 6-6-6-6"></path></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"></path><circle cx="7" cy="19" r="1.8"></circle><circle cx="18" cy="19" r="1.8"></circle></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z"></path><path d="m8.5 12 2.2 2.2 4.8-5"></path></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 18.5 3.5 21l4.2-1.9c1.3.6 2.8.9 4.3.9 4.7 0 8.5-3.1 8.5-7s-3.8-7-8.5-7S3.5 10.1 3.5 14c0 1.7.5 3.2 1.5 4.5Z"></path></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.4 7.6L4 20l1-3.8a8.5 8.5 0 1 1 15.5-4.7Z"></path><path d="M8.5 8.4c.2-.4.5-.4.8-.4h.6c.2 0 .4.1.5.4l.7 1.8c.1.3.1.5-.1.7l-.6.7c.6 1.1 1.5 2 2.7 2.6l.7-.6c.2-.2.4-.2.7-.1l1.8.8c.3.1.4.3.4.5v.6c0 .3-.1.6-.4.8-.5.4-1.1.5-1.8.3-2.1-.6-4-1.9-5.3-3.6-1-1.2-1.6-2.4-1.7-3.5-.1-.4 0-.7.2-1Z"></path></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"></path></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"></path><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"></path></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>',
  save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"></path><path d="M17 21v-8H7v8M7 3v5h8"></path></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"></path></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"></path></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-5-5L5 21"></path></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.6v12.8L18.8 12 8 5.6Z"></path></svg>',
  store: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9h18l-2-5H5L3 9Z"></path><path d="M5 9v11h14V9M9 20v-6h6v6"></path></svg>'
};

const vehicleFamilies = {
  Audi: { A3: [2013, 2027, ['Premium', 'Premium Plus', 'S line']], A4: [2009, 2027, ['Premium', 'Premium Plus', 'Prestige']], Q3: [2015, 2027, ['Premium', 'Premium Plus', 'S line']], Q5: [2009, 2027, ['Premium', 'Premium Plus', 'Prestige']], A6: [2012, 2027, ['Premium Plus', 'Prestige']], Q7: [2007, 2027, ['Premium', 'Premium Plus', 'Prestige']] },
  BMW: { '3 Series': [2000, 2027, ['330i', 'M340i', 'M3']], '5 Series': [2000, 2027, ['530i', '540i', 'M550i']], M3: [2001, 2027, ['Base', 'Competition']], X3: [2004, 2027, ['xDrive30i', 'M40i']], X5: [2000, 2027, ['xDrive40i', 'M60i']] },
  'Mercedes-Benz': { 'C-Class': [2001, 2027, ['C300', 'AMG C43', 'AMG C63']], 'E-Class': [2000, 2027, ['E350', 'E450', 'AMG E53']], GLC: [2016, 2027, ['GLC300', 'AMG GLC43']], 'CLA-Class': [2014, 2027, ['CLA250', 'AMG CLA45']] },
  Volkswagen: { Golf: [1990, 2027, ['S', 'SE', 'GTI', 'R']], GTI: [2006, 2027, ['S', 'SE', 'Autobahn']], Jetta: [1990, 2027, ['S', 'SE', 'GLI']], Tiguan: [2009, 2027, ['S', 'SE', 'R-Line']] },
  Honda: { Civic: [1980, 2027, ['LX', 'Sport', 'Si', 'Type R', 'Touring']], Accord: [1980, 2027, ['LX', 'Sport', 'EX-L', 'Touring']], Integra: [1986, 2027, ['Base', 'A-Spec', 'Type S']], 'CR-V': [1997, 2027, ['LX', 'EX', 'Touring']], 'Civic Type R': [2017, 2027, ['Base', 'Limited Edition']] },
  Toyota: { Camry: [1983, 2027, ['LE', 'SE', 'XSE']], Corolla: [1980, 2027, ['LE', 'SE', 'XSE']], GR86: [2022, 2027, ['Base', 'Premium', 'Trueno']], Supra: [2020, 2027, ['3.0', '3.0 Premium']], '4Runner': [1984, 2027, ['SR5', 'TRD Sport', 'TRD Pro']] },
  Ford: { Mustang: [1980, 2027, ['EcoBoost', 'GT', 'Dark Horse']], Focus: [2000, 2018, ['SE', 'ST', 'RS']], 'F-150': [1980, 2027, ['XL', 'XLT', 'Lariat']], Bronco: [2021, 2027, ['Base', 'Big Bend', 'Badlands']], Explorer: [1991, 2027, ['Base', 'XLT', 'ST']] },
  Subaru: { WRX: [2002, 2027, ['Base', 'Premium', 'Limited', 'TR']], BRZ: [2013, 2027, ['Premium', 'Limited']], Outback: [1995, 2027, ['Base', 'Premium', 'Limited']], Forester: [1998, 2027, ['Base', 'Premium', 'Sport']] },
  Nissan: { '370Z': [2009, 2020, ['Sport', 'Nismo']], Z: [2023, 2027, ['Sport', 'Performance']], 'GT-R': [2009, 2027, ['Premium', 'Nismo']], Altima: [1993, 2027, ['S', 'SV', 'SR']], Sentra: [1983, 2027, ['S', 'SV', 'SR']] },
  Mazda: { 'MX-5 Miata': [1990, 2027, ['Sport', 'Club', 'Grand Touring']], Mazda3: [2004, 2027, ['2.5 S', 'Select', 'Turbo']], 'CX-5': [2013, 2027, ['Sport', 'Select', 'Turbo']], Mazda6: [2003, 2021, ['Sport', 'Touring', 'Grand Touring']] },
  Chevrolet: { Camaro: [1980, 2024, ['1LT', '2SS', 'ZL1']], Corvette: [1984, 2027, ['Stingray', 'Z06', 'E-Ray']], Silverado: [1980, 2027, ['WT', 'LT', 'LTZ']], Malibu: [1997, 2024, ['LS', 'LT', 'Premier']] },
  Hyundai: { Elantra: [1992, 2027, ['SE', 'SEL', 'N Line']], Veloster: [2012, 2022, ['Base', 'Turbo', 'N']], 'Ioniq 5': [2022, 2027, ['SE', 'SEL', 'Limited']], Sonata: [1989, 2027, ['SE', 'SEL', 'N Line']] },
  Kia: { Stinger: [2018, 2023, ['GT-Line', 'GT1', 'GT2']], Forte: [2010, 2027, ['FE', 'LXS', 'GT']], EV6: [2022, 2027, ['Light', 'Wind', 'GT-Line']], Sportage: [1995, 2027, ['LX', 'X-Line', 'X-Pro']] },
  Tesla: { 'Model 3': [2017, 2027, ['RWD', 'Long Range', 'Performance']], 'Model Y': [2020, 2027, ['RWD', 'Long Range', 'Performance']], 'Model S': [2012, 2027, ['Long Range', 'Plaid']], 'Model X': [2016, 2027, ['Long Range', 'Plaid']] },
  Volvo: { S60: [2001, 2027, ['Core', 'Plus', 'Ultimate']], XC60: [2009, 2027, ['Core', 'Plus', 'Ultimate']], XC90: [2003, 2027, ['Core', 'Plus', 'Ultimate']] },
  Lexus: { IS: [1999, 2027, ['300', '350', 'F Sport']], NX: [2015, 2027, ['250', '350h', '450h+']], RX: [1999, 2027, ['350', '350h', '500h']] },
  Porsche: { '911': [1980, 2027, ['Carrera', 'Carrera S', 'Turbo S']], Macan: [2015, 2027, ['Base', 'S', 'GTS']], Cayenne: [2003, 2027, ['Base', 'S', 'GTS']] },
  Jeep: { Wrangler: [1987, 2027, ['Sport', 'Sahara', 'Rubicon']], Gladiator: [2020, 2027, ['Sport', 'Mojave', 'Rubicon']], Cherokee: [1984, 2023, ['Latitude', 'Limited', 'Trailhawk']] },
  Mitsubishi: { Lancer: [1980, 2017, ['ES', 'GTS', 'Evolution']], Outlander: [2003, 2027, ['ES', 'SE', 'SEL']], Eclipse: [1990, 2012, ['GS', 'GT', 'GTS']] }
};

function buildVehicleCatalog() {
  const catalog = {};
  for (let year = 2027; year >= 1980; year -= 1) {
    catalog[year] = {};
    Object.entries(vehicleFamilies).forEach(([make, models]) => {
      const availableModels = Object.entries(models).filter(([, [from, to]]) => year >= from && year <= to);
      if (availableModels.length) catalog[year][make] = Object.fromEntries(availableModels.map(([model, [, , trims]]) => [model, trims]));
    });
  }
  return catalog;
}
const vehicles = buildVehicleCatalog();
let years = Object.keys(vehicles).sort((a, b) => b - a);
const vehicleCatalogCollator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
const vehicleCatalogSort = values => [...new Set(values)].sort(vehicleCatalogCollator.compare);
let vehicleDirectoryMeta = null;
let vehicleDirectoryRequest = null;
let expandedVehicleIdentityRecords = [];
let expandedVehicleIdentityRequest = null;

function mergeVehicleDirectory(payload = {}) {
  const directoryYears = payload?.years && typeof payload.years === 'object' ? payload.years : {};
  Object.entries(directoryYears).forEach(([year, makes]) => {
    if (!makes || typeof makes !== 'object') return;
    vehicles[year] ||= {};
    Object.entries(makes).forEach(([make, models]) => {
      if (!models || typeof models !== 'object') return;
      vehicles[year][make] ||= {};
      Object.entries(models).forEach(([model, trims]) => {
        const existing = Array.isArray(vehicles[year][make][model]) ? vehicles[year][make][model] : [];
        vehicles[year][make][model] = vehicleCatalogSort([...existing, ...(Array.isArray(trims) ? trims.map(String) : [])]);
      });
    });
  });
  vehicleDirectoryMeta = payload?.stats || null;
  years = Object.keys(vehicles).sort((a, b) => Number(b) - Number(a));
}

function loadVehicleDirectory() {
  if (vehicleDirectoryRequest) return vehicleDirectoryRequest;
  vehicleDirectoryRequest = fetch('/data/fbox-vehicle-directory.json', { cache: 'no-cache', headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(20_000) })
    .then(response => response.ok ? response.json() : Promise.reject(new Error('Vehicle directory unavailable')))
    .then(payload => {
      mergeVehicleDirectory(payload);
      renderBackgroundUpdate();
      return payload;
    })
    .catch(() => undefined);
  return vehicleDirectoryRequest;
}

function mergeExpandedVehicleIdentity(records = []) {
  expandedVehicleIdentityRecords = records.map(record => ({
    id: String(record?.id || ''),
    brand: String(record?.brand || ''),
    series: String(record?.series || ''),
    year_start: Number(record?.year_start),
    year_end: Number(record?.year_end),
    generation_or_chassis: typeof record?.generation_or_chassis === 'string' ? record.generation_or_chassis : '',
    body_styles: Array.isArray(record?.body_styles) ? record.body_styles.map(String) : [],
    common_drive_forms: Array.isArray(record?.common_drive_forms) ? record.common_drive_forms.map(String) : [],
    verification_status: String(record?.verification_status || ''),
    limitations: String(record?.limitations || '')
  })).filter(record => record.id && record.brand && record.series && Number.isInteger(record.year_start) && Number.isInteger(record.year_end) && record.year_start <= record.year_end);
  expandedVehicleIdentityRecords.forEach(record => {
    for (let year = record.year_start; year <= record.year_end; year += 1) {
      vehicles[year] ||= {};
      vehicles[year][record.brand] ||= {};
      vehicles[year][record.brand][record.series] ||= [];
    }
  });
  years = Object.keys(vehicles).sort((a, b) => Number(b) - Number(a));
}

function loadExpandedVehicleIdentity() {
  if (expandedVehicleIdentityRequest) return expandedVehicleIdentityRequest;
  expandedVehicleIdentityRequest = fetch('/data/fbox-fitment.vehicle-catalog-expanded.json', { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(12000) })
    .then(response => response.ok ? response.json() : Promise.reject(new Error('Vehicle identity catalog unavailable')))
    .then(payload => {
      mergeExpandedVehicleIdentity(Array.isArray(payload?.records) ? payload.records : []);
      renderBackgroundUpdate();
    })
    .catch(() => undefined);
  return expandedVehicleIdentityRequest;
}

function driveOptions(make, model) {
  const key = `${make}|${model}`;
  const exact = {
    'BMW|3 Series': ['RWD', 'AWD'], 'BMW|5 Series': ['RWD', 'AWD'], 'BMW|M3': ['RWD', 'AWD'], 'BMW|X3': ['RWD', 'AWD'], 'BMW|X5': ['RWD', 'AWD'],
    'Mercedes-Benz|C-Class': ['RWD', 'AWD'], 'Mercedes-Benz|E-Class': ['RWD', 'AWD'], 'Mercedes-Benz|GLC': ['RWD', 'AWD'], 'Mercedes-Benz|CLA-Class': ['FWD', 'AWD'],
    'Honda|Civic': ['FWD'], 'Honda|Accord': ['FWD', 'AWD'], 'Honda|Integra': ['FWD'], 'Honda|CR-V': ['FWD', 'AWD'], 'Honda|Civic Type R': ['FWD'],
    'Toyota|GR86': ['RWD'], 'Toyota|Supra': ['RWD'], 'Toyota|4Runner': ['RWD', '4WD'],
    'Ford|Mustang': ['RWD'], 'Ford|Focus': ['FWD', 'AWD'], 'Ford|F-150': ['RWD', '4WD'], 'Ford|Bronco': ['RWD', '4WD'], 'Ford|Explorer': ['RWD', 'AWD'],
    'Subaru|BRZ': ['RWD'], 'Subaru|WRX': ['AWD'], 'Subaru|Outback': ['AWD'], 'Subaru|Forester': ['AWD'],
    'Nissan|370Z': ['RWD'], 'Nissan|Z': ['RWD'], 'Nissan|GT-R': ['AWD'], 'Nissan|Altima': ['FWD', 'AWD'], 'Nissan|Sentra': ['FWD'],
    'Mazda|MX-5 Miata': ['RWD'], 'Mazda|Mazda3': ['FWD', 'AWD'], 'Mazda|CX-5': ['FWD', 'AWD'], 'Mazda|Mazda6': ['FWD'],
    'Chevrolet|Camaro': ['RWD'], 'Chevrolet|Corvette': ['RWD'], 'Chevrolet|Silverado': ['RWD', '4WD'], 'Chevrolet|Malibu': ['FWD'],
    'Hyundai|Elantra': ['FWD'], 'Hyundai|Veloster': ['FWD'], 'Hyundai|Ioniq 5': ['RWD', 'AWD'], 'Hyundai|Sonata': ['FWD'],
    'Kia|Stinger': ['RWD', 'AWD'], 'Kia|Forte': ['FWD'], 'Kia|EV6': ['RWD', 'AWD'], 'Kia|Sportage': ['FWD', 'AWD'],
    'Tesla|Model 3': ['RWD', 'AWD'], 'Tesla|Model Y': ['RWD', 'AWD'], 'Tesla|Model S': ['RWD', 'AWD'], 'Tesla|Model X': ['AWD'],
    'Lexus|IS': ['RWD', 'AWD'], 'Lexus|NX': ['FWD', 'AWD'], 'Lexus|RX': ['FWD', 'AWD'],
    'Porsche|911': ['RWD', 'AWD'], 'Porsche|Macan': ['AWD'], 'Porsche|Cayenne': ['AWD'],
    'Jeep|Wrangler': ['RWD', '4WD'], 'Jeep|Gladiator': ['RWD', '4WD'], 'Jeep|Cherokee': ['FWD', '4WD']
  };
  if (exact[key]) return exact[key];
  const researched = [...new Set(expandedVehicleIdentityRecords.filter(record => record.brand === make && record.series === model).flatMap(record => record.common_drive_forms).filter(value => ['FWD', 'RWD', 'AWD', '4WD'].includes(value)))];
  if (researched.length) return researched;
  if (['Audi', 'Volkswagen', 'Volvo', 'Mitsubishi'].includes(make)) return ['FWD', 'AWD'];
  return ['FWD', 'RWD', 'AWD', '4WD'];
}

let products = [
  { id: 'fbox-axis-19', category: 'Wheels', brand: 'CIRUI', name: 'Axis 19', meta: '19x9.5 +35 · 5x114.3', price: 270, oldPrice: 300, rating: 0, reviews: 0, finish: 'Satin Black', diameter: 19, image: '9025362311e9a376.jpg', badge: 'Hot', deal: 'Availability managed by CIRUI', material: 'Rotary Forged', color: 'Satin Black', part: 'FBX-AXI-1995-35', weight: '22.4 lb' },
  { id: 'fbox-velocity-18', category: 'Wheels', brand: 'CIRUI', name: 'Velocity 18', meta: '18x8.5 +35 · 5x114.3', price: 230, oldPrice: 250, rating: 0, reviews: 0, finish: 'Bronze Machined', diameter: 18, image: '71118c6795a2a3a8.jpg', badge: 'Sale', deal: 'Availability managed by CIRUI', material: 'Cast Aluminum', color: 'Bronze Machined', part: 'FBX-VEL-1885-35', weight: '20.8 lb' },
  { id: 'fbox-forge-20', category: 'Wheels', brand: 'CIRUI', name: 'Forge 20', meta: '20x9 +35 · 5x114.3', price: 300, oldPrice: 340, rating: 0, reviews: 0, finish: 'Gloss Black', diameter: 20, image: 'a8d2e56e51bb2d69.jpg', badge: 'New', deal: 'Availability managed by CIRUI', material: 'Rotary Forged', color: 'Gloss Black', part: 'FBX-FOR-2090-35', weight: '24.3 lb' },
  { id: 'fbox-drift-18', category: 'Wheels', brand: 'CIRUI', name: 'Drift 18', meta: '18x9.5 +35 · 5x114.3', price: 216, oldPrice: 240, rating: 0, reviews: 0, finish: 'Matte Bronze', diameter: 18, image: 'a5816dd04dfd6ee0.jpg', badge: 'Sale', deal: 'Availability managed by CIRUI', material: 'Cast Aluminum', color: 'Matte Bronze', part: 'FBX-DRI-1895-35', weight: '21.2 lb' },
  { id: 'fbox-lumen-19', category: 'Wheels', brand: 'CIRUI', name: 'Lumen 19', meta: '19x8.5 +35 · 5x112', price: 260, oldPrice: null, rating: 0, reviews: 0, finish: 'Machined Silver', diameter: 19, image: 'fb1db723061ad6df.jpg', badge: '', deal: 'Availability managed by CIRUI', material: 'Cast Aluminum', color: 'Machined Silver', part: 'FBX-LUM-1985-35', weight: '23.1 lb' },
  { id: 'fbox-track-17', category: 'Wheels', brand: 'CIRUI', name: 'Track 17', meta: '17x8 +35 · 5x114.3', price: 198, oldPrice: null, rating: 0, reviews: 0, finish: 'Hyper Silver', diameter: 17, image: '0dccdbef8e429925.jpg', badge: '', deal: 'Availability managed by CIRUI', material: 'Cast Aluminum', color: 'Hyper Silver', part: 'FBX-TRA-1780-35', weight: '18.6 lb' },
  { id: 'fbox-ceramic-pro', category: 'Calipers', brand: 'CIRUI Braking', name: 'Ceramic Pro 6P', meta: '6 piston · front axle · 380 mm', price: 1240, oldPrice: 1390, rating: 0, reviews: 0, finish: 'Ceramic White', diameter: 380, image: 'fbox-ceramic-white-reference-pending.svg', badge: 'Sale', deal: 'Availability managed by CIRUI', material: 'Forged Aluminum', color: 'Ceramic White', part: 'FBX-CP6-380-WH', weight: '11.8 lb' },
  { id: 'fbox-street-4p', category: 'Calipers', brand: 'CIRUI Braking', name: 'Street 4P', meta: '4 piston · front axle · 330 mm', price: 880, oldPrice: null, rating: 0, reviews: 0, finish: 'Electric Blue', diameter: 330, image: 'f5effff1812a14eb.jpg', badge: 'New', deal: 'Availability managed by CIRUI', material: 'Forged Aluminum', color: 'Electric Blue', part: 'FBX-ST4-330-BL', weight: '9.4 lb' },
  { id: 'fbox-slotted-380', category: 'Rotors', brand: 'CIRUI Braking', name: 'Track Slotted 380', meta: '2-piece · slotted · 380 mm', price: 420, oldPrice: 480, rating: 0, reviews: 0, finish: 'Black Hat', diameter: 380, image: 'e78ac1cfdeae4727.jpg', badge: 'Sale', deal: 'Availability managed by CIRUI', material: 'Iron + Aluminum', color: 'Black Hat', part: 'FBX-TS380-2P', weight: '21.3 lb' },
  { id: 'fbox-drilled-330', category: 'Rotors', brand: 'CIRUI Braking', name: 'Street Drilled 330', meta: '1-piece · drilled & slotted · 330 mm', price: 278, oldPrice: null, rating: 0, reviews: 0, finish: 'Geomet Coat', diameter: 330, image: '07576b43c0712d61.jpg', badge: '', deal: 'Availability managed by CIRUI', material: 'High Carbon Iron', color: 'Geomet Coat', part: 'FBX-SD330-1P', weight: '17.9 lb' },
  { id: 'fbox-race-pad', category: 'Brake Pads', brand: 'CIRUI Braking', name: 'R-Compound Pads', meta: 'Low dust · high bite · front axle', price: 168, oldPrice: 190, rating: 0, reviews: 0, finish: 'Carbon Ceramic', diameter: 0, image: '746b0039a724a70a.jpg', badge: 'Sale', deal: 'Availability managed by CIRUI', material: 'Carbon Ceramic', color: 'Carbon Ceramic', part: 'FBX-RCP-FR', weight: '4.1 lb' },
  { id: 'fbox-quiet-pad', category: 'Brake Pads', brand: 'CIRUI Braking', name: 'Quiet Street Pads', meta: 'Low noise · low dust · front axle', price: 118, oldPrice: null, rating: 0, reviews: 0, finish: 'Ceramic', diameter: 0, image: '333cd3b0b1906049.jpg', badge: '', deal: 'Availability managed by CIRUI', material: 'Ceramic', color: 'Ceramic', part: 'FBX-QSP-FR', weight: '3.7 lb' },
  { id: 'fbox-halo-20-spoke', category: 'Wheels', brand: 'CIRUI', name: 'CIRUI Halo 20-Spoke - Custom Hydraulic Forged Aluminum Alloy Step-Lip Wheel', meta: 'Custom size - All diameters and widths available - PCD / ET / CB built to order', price: 298, oldPrice: null, rating: 0, reviews: 0, finish: 'Satin Silver', diameter: null, image: 'halo-20-spoke-01.png', images: ['halo-20-spoke-01.png', 'halo-20-spoke-02.png', 'halo-20-spoke-03.png'], badge: 'New', deal: 'Made to order - All sizes, fitment and finish customized by CIRUI', material: 'Hydraulic Forged Aluminum Alloy', color: 'Satin Silver', part: 'FBX-HALO-20S', weight: '', price_mode: 'from', currency: 'USD', image_cutout: true, visualizer_enabled: true, dynamic_wheel_effect: true, visualizer_mode: 'dynamic-wheel' },
  { id: 'fbox-meridian-multi-spoke', category: 'Wheels', brand: 'CIRUI', name: 'CIRUI Meridian - Custom Hydraulic Forged Aluminum Alloy Precision Multi-Spoke Wheel', meta: 'Custom size - All diameters and widths available - PCD / ET / CB built to order', price: 298, oldPrice: null, rating: 0, reviews: 0, finish: 'Brushed Silver', diameter: null, image: 'meridian-multi-spoke-01.png', images: ['meridian-multi-spoke-01.png', 'meridian-multi-spoke-02.png', 'meridian-multi-spoke-03.png'], badge: 'New', deal: 'Made to order - All sizes, fitment and finish customized by CIRUI', material: 'Hydraulic Forged Aluminum Alloy', color: 'Brushed Silver', part: 'FBX-MERIDIAN-MS', weight: '', price_mode: 'from', currency: 'USD', image_cutout: true, visualizer_enabled: true, dynamic_wheel_effect: true, visualizer_mode: 'dynamic-wheel' },
  { id: 'fbox-vanta-10', category: 'Wheels', brand: 'CIRUI', name: 'CIRUI Vanta 10 - Custom Hydraulic Forged Aluminum Alloy 10-Spoke Deep-Lip Wheel', meta: 'Custom size - All diameters and widths available - PCD / ET / CB built to order', price: 298, oldPrice: null, rating: 0, reviews: 0, finish: 'Polished Silver', diameter: null, image: 'vanta-10-01.png', images: ['vanta-10-01.png', 'vanta-10-02.png', 'vanta-10-03.png'], badge: 'New', deal: 'Made to order - All sizes, fitment and finish customized by CIRUI', material: 'Hydraulic Forged Aluminum Alloy', color: 'Polished Silver', part: 'FBX-VANTA-10', weight: '', price_mode: 'from', currency: 'USD', image_cutout: true, visualizer_enabled: true, dynamic_wheel_effect: true, visualizer_mode: 'dynamic-wheel', minimum_quantity: 4 },
  { id: 'fbox-apex-split-spoke', category: 'Wheels', brand: 'CIRUI', name: 'CIRUI Apex - Custom Hydraulic Forged Aluminum Alloy Split-Spoke Performance Wheel', meta: 'Custom size - All diameters and widths available - PCD / ET / CB built to order', price: 298, oldPrice: null, rating: 0, reviews: 0, finish: 'Satin Silver', diameter: null, image: 'apex-split-spoke-01.png', images: ['apex-split-spoke-01.png', 'apex-split-spoke-02.png', 'apex-split-spoke-03.png'], badge: 'New', deal: 'Made to order - All sizes, fitment and finish customized by CIRUI', material: 'Hydraulic Forged Aluminum Alloy', color: 'Satin Silver', part: 'FBX-APEX-SPLIT', weight: '', price_mode: 'from', currency: 'USD', image_cutout: true, visualizer_enabled: true, dynamic_wheel_effect: true, visualizer_mode: 'dynamic-wheel' },
  { id: 'fbox-sv100', category: 'Wheels', brand: 'CIRUI', name: 'CIRUI SV100 - Custom Forged Multi-Piece Wheel', meta: 'Custom size - All diameters and widths available - PCD / ET / CB built to order', price: 290, oldPrice: null, rating: 0, reviews: 0, finish: 'Custom finish', diameter: null, image: 'sv100-01.png', images: ['sv100-01.png', 'sv100-02.png', 'sv100-03.png', 'sv100-04.png'], badge: 'New', deal: 'Made to order - All sizes, fitment and finish customized by CIRUI', material: 'Forged Aluminum - Multi-Piece', color: 'Custom finish', part: 'FBX-SV100', weight: '', price_mode: 'from', currency: 'USD', image_cutout: true, visualizer_enabled: true, dynamic_wheel_effect: true, visualizer_mode: 'dynamic-wheel' },
  { id: 'fbox-rse', category: 'Wheels', brand: 'CIRUI', name: 'CIRUI RSE - CustomSpec Forged Performance Wheel', meta: 'Custom size - All diameters and widths available - PCD / ET / CB built to order', price: 310, oldPrice: null, rating: 0, reviews: 0, finish: 'Custom finish', diameter: null, image: 'rse-01.png', images: ['rse-01.png'], badge: 'New', deal: 'Made to order - All sizes, fitment and finish customized by CIRUI', material: 'CustomSpec Forged Aluminum', color: 'Custom finish', part: 'FBX-RSE', weight: '', price_mode: 'from', currency: 'USD', image_cutout: true, visualizer_enabled: true, dynamic_wheel_effect: true, visualizer_mode: 'dynamic-wheel' }
];
products = products.map(item => ({
  ...item,
  custom_size: true,
  size_note: item.size_note || (item.category === 'Wheels' ? 'All sizes supported - custom diameter, width and fitment' : 'All sizes supported - custom fitment built to order')
}));
const localCustomProductFallback = products
  .filter(item => item.price_mode === 'from' || item.visualizer_enabled)
  .map(item => ({
    ...item,
    price: null,
    oldPrice: null,
    price_mode: 'inquiry',
    currency: '',
    minimum_quantity: null,
    deal: '',
    ddp_regions: [],
    ddp_quote_basis: '',
    lead_time_note: ''
  }));

// Customer reviews and build cases are intentionally empty until verified
// orders are collected. The storefront must never present invented proof.
let reviews = [];
let fboxCases = [];
let fboxPhotoReviews = [];

const categories = [
  ['Wheels', 'The right spoke, width and offset.', 'spark'], ['Calipers', 'Big brake color and control.', 'bolt'], ['Rotors', 'Track-ready bite and cooling.', 'disc'], ['Brake Pads', 'Quiet street to race compounds.', 'shield'], ['Wheel & Tire Packages', 'Mount, balance and save.', 'truck'], ['Suspension', 'Drop it. Dial it. Drive it.', 'arrow']
];
const guideCards = [];

const ceruiVehicleProducts = [
  { id: 'cerui-bmw-forged-fitment', vehicle_label: 'BMW', vehicle_group: 'European performance', category: 'Wheels', brand: 'CIRUI Forged', name: 'BMW Custom Forged Fitment', meta: 'Built around the exact chassis, brake package and stance', price: 310, price_mode: 'from', minimum_quantity: 4, rating: 0, reviews: 0, finish: 'Custom finish', diameter: null, image: 'cerui/catalog-bmw-v1.webp', images: ['cerui/catalog-bmw-v1.webp'], badge: 'Factory', deal: 'Made to order · DDP delivery available', material: 'Forged aluminum', color: 'Made to order', size_note: 'Custom diameter, width, PCD, ET and center bore' },
  { id: 'cerui-mercedes-suv-forged-fitment', vehicle_label: 'Mercedes-Benz', vehicle_group: 'Luxury & SUV', category: 'Wheels', brand: 'CIRUI Forged', name: 'Mercedes-Benz SUV Custom Forged Fitment', meta: 'Load, brake clearance and profile configured for the vehicle', price: 310, price_mode: 'from', minimum_quantity: 4, rating: 0, reviews: 0, finish: 'Custom finish', diameter: null, image: 'cerui/catalog-mercedes-suv-v1.webp', images: ['cerui/catalog-mercedes-suv-v1.webp'], badge: 'Factory', deal: 'Made to order · DDP delivery available', material: 'Forged aluminum', color: 'Made to order', size_note: 'Custom diameter, width, PCD, ET and center bore' },
  { id: 'cerui-audi-forged-fitment', vehicle_label: 'Audi', vehicle_group: 'European performance', category: 'Wheels', brand: 'CIRUI Forged', name: 'Audi Custom Forged Fitment', meta: 'Vehicle-specific spoke, offset and brake-clearance direction', price: 310, price_mode: 'from', minimum_quantity: 4, rating: 0, reviews: 0, finish: 'Custom finish', diameter: null, image: 'cerui/catalog-audi-v1.webp', images: ['cerui/catalog-audi-v1.webp'], badge: 'Factory', deal: 'Made to order · DDP delivery available', material: 'Forged aluminum', color: 'Made to order', size_note: 'Custom diameter, width, PCD, ET and center bore' },
  { id: 'cerui-porsche-forged-fitment', vehicle_label: 'Porsche', vehicle_group: 'European performance', category: 'Wheels', brand: 'CIRUI Forged', name: 'Porsche Custom Forged Fitment', meta: 'Performance-led fitment with profile and caliper room reviewed', price: 310, price_mode: 'from', minimum_quantity: 4, rating: 0, reviews: 0, finish: 'Custom finish', diameter: null, image: 'cerui/catalog-porsche-v1.webp', images: ['cerui/catalog-porsche-v1.webp'], badge: 'Factory', deal: 'Made to order · DDP delivery available', material: 'Forged aluminum', color: 'Made to order', size_note: 'Custom diameter, width, PCD, ET and center bore' },
  { id: 'cerui-volkswagen-forged-fitment', vehicle_label: 'Volkswagen', vehicle_group: 'European performance', category: 'Wheels', brand: 'CIRUI Forged', name: 'Volkswagen Custom Forged Fitment', meta: 'Road-focused wheel direction configured to the exact platform', price: 310, price_mode: 'from', minimum_quantity: 4, rating: 0, reviews: 0, finish: 'Custom finish', diameter: null, image: 'cerui/catalog-volkswagen-v1.webp', images: ['cerui/catalog-volkswagen-v1.webp'], badge: 'Factory', deal: 'Made to order · DDP delivery available', material: 'Forged aluminum', color: 'Made to order', size_note: 'Custom diameter, width, PCD, ET and center bore' },
  { id: 'cerui-land-rover-forged-fitment', vehicle_label: 'Land Rover', vehicle_group: 'Luxury & SUV', category: 'Wheels', brand: 'CIRUI Forged', name: 'Land Rover Custom Forged Fitment', meta: 'SUV load, stance and brake clearance considered together', price: 310, price_mode: 'from', minimum_quantity: 4, rating: 0, reviews: 0, finish: 'Custom finish', diameter: null, image: 'cerui/catalog-land-rover-v1.webp', images: ['cerui/catalog-land-rover-v1.webp'], badge: 'Factory', deal: 'Made to order · DDP delivery available', material: 'Forged aluminum', color: 'Made to order', size_note: 'Custom diameter, width, PCD, ET and center bore' },
  { id: 'cerui-toyota-4x4-forged-fitment', vehicle_label: 'Toyota 4x4', vehicle_group: 'SUV & off-road', category: 'Wheels', brand: 'CIRUI Forged', name: 'Toyota 4x4 Custom Forged Fitment', meta: 'Off-road profile, hardware and load direction built to the brief', price: 310, price_mode: 'from', minimum_quantity: 4, rating: 0, reviews: 0, finish: 'Custom finish', diameter: null, image: 'cerui/catalog-toyota-v1.webp', images: ['cerui/catalog-toyota-v1.webp'], badge: 'Factory', deal: 'Made to order · DDP delivery available', material: 'Forged aluminum', color: 'Made to order', size_note: 'Custom diameter, width, PCD, ET and center bore' },
  { id: 'cerui-tesla-forged-fitment', vehicle_label: 'Tesla', vehicle_group: 'EV & modern', category: 'Wheels', brand: 'CIRUI Forged', name: 'Tesla Custom Forged Fitment', meta: 'EV load, stance and brake clearance reviewed before production', price: 310, price_mode: 'from', minimum_quantity: 4, rating: 0, reviews: 0, finish: 'Custom finish', diameter: null, image: 'cerui/catalog-tesla-v1.webp', images: ['cerui/catalog-tesla-v1.webp'], badge: 'Factory', deal: 'Made to order · DDP delivery available', material: 'Forged aluminum', color: 'Made to order', size_note: 'Custom diameter, width, PCD, ET and center bore' },
  { id: 'cerui-bentley-forged-fitment', vehicle_label: 'Bentley', vehicle_group: 'Luxury & SUV', category: 'Wheels', brand: 'CIRUI Forged', name: 'Bentley Custom Forged Fitment', meta: 'Luxury finish direction with exact vehicle measurements checked', price: 310, price_mode: 'from', minimum_quantity: 4, rating: 0, reviews: 0, finish: 'Custom finish', diameter: null, image: 'cerui/catalog-bentley-v1.webp', images: ['cerui/catalog-bentley-v1.webp'], badge: 'Factory', deal: 'Made to order · DDP delivery available', material: 'Forged aluminum', color: 'Made to order', size_note: 'Custom diameter, width, PCD, ET and center bore' },
  { id: 'cerui-rolls-royce-forged-fitment', vehicle_label: 'Rolls-Royce', vehicle_group: 'Luxury & SUV', category: 'Wheels', brand: 'CIRUI Forged', name: 'Rolls-Royce Custom Forged Fitment', meta: 'Large-diameter luxury direction configured to the exact vehicle', price: 310, price_mode: 'from', minimum_quantity: 4, rating: 0, reviews: 0, finish: 'Custom finish', diameter: null, image: 'cerui/catalog-rolls-royce-v1.webp', images: ['cerui/catalog-rolls-royce-v1.webp'], badge: 'Factory', deal: 'Made to order · DDP delivery available', material: 'Forged aluminum', color: 'Made to order', size_note: 'Custom diameter, width, PCD, ET and center bore' },
  { id: 'cerui-cadillac-forged-fitment', vehicle_label: 'Cadillac', vehicle_group: 'US luxury', category: 'Wheels', brand: 'CIRUI Forged', name: 'Cadillac Custom Forged Fitment', meta: 'Luxury road fitment configured around the precise platform', price: 310, price_mode: 'from', minimum_quantity: 4, rating: 0, reviews: 0, finish: 'Custom finish', diameter: null, image: 'cerui/catalog-cadillac-v1.webp', images: ['cerui/catalog-cadillac-v1.webp'], badge: 'Factory', deal: 'Made to order · DDP delivery available', material: 'Forged aluminum', color: 'Made to order', size_note: 'Custom diameter, width, PCD, ET and center bore' },
  { id: 'cerui-lexus-forged-fitment', vehicle_label: 'Lexus', vehicle_group: 'Luxury & SUV', category: 'Wheels', brand: 'CIRUI Forged', name: 'Lexus Custom Forged Fitment', meta: 'Custom finish and wheel profile matched to the vehicle brief', price: 310, price_mode: 'from', minimum_quantity: 4, rating: 0, reviews: 0, finish: 'Custom finish', diameter: null, image: 'cerui/catalog-lexus-v1.webp', images: ['cerui/catalog-lexus-v1.webp'], badge: 'Factory', deal: 'Made to order · DDP delivery available', material: 'Forged aluminum', color: 'Made to order', size_note: 'Custom diameter, width, PCD, ET and center bore' },
  { id: 'cerui-off-road-forged-fitment', vehicle_label: 'SUV / 4x4', vehicle_group: 'SUV & off-road', category: 'Wheels', brand: 'CIRUI Forged', name: 'SUV & 4x4 Custom Forged Fitment', meta: 'Hardware, load and terrain use translated into a wheel brief', price: 310, price_mode: 'from', minimum_quantity: 4, rating: 0, reviews: 0, finish: 'Custom finish', diameter: null, image: 'cerui/catalog-off-road-v1.webp', images: ['cerui/catalog-off-road-v1.webp'], badge: 'Factory', deal: 'Made to order · DDP delivery available', material: 'Forged aluminum', color: 'Made to order', size_note: 'Custom diameter, width, PCD, ET and center bore' }
];

products.push(...ceruiVehicleProducts);

const company = {
  legalName: 'Fanghe Overseas Intelligent Technology Co., Ltd.',
  contactName: '李炜',
  phone: '186 5819 1106',
  tel: '+8618658191106',
  whatsapp: '+86 18658191106',
  whatsappNumber: '8618658191106'
};

// All storefront data and account actions go through the CIRUI backend.
// There is no dependency on macrozheng/mall or a third-party mall service.
const mallConfig = {
  portalBase: '/api/fbox-store',
  adminBase: '/api/fbox-ops'
};

const paypalHostedButtonConfig = {
  productId: 'fbox-halo-20-spoke',
  buttonId: 'H3B5HFVS2UW6Q',
  sdkUrl: 'https://www.paypal.com/sdk/js?client-id=BAA8s4HvB-lyiiKYKM_GT6F_AebG4mRT6fQP9ZEHYZ17BU9vy9KaSahJUqK8hVYyCRKWYqeVl-u6H7D9Qg&components=hosted-buttons&disable-funding=venmo&currency=USD'
};

const paypalCartButtonConfig = {
  productId: 'fbox-vanta-10',
  merchantId: '3VP6957R27FNQ',
  buttonId: 'pp-view-cart',
  sdkUrl: 'https://www.paypalobjects.com/ncp/cart/cart.js'
};

const localeOptions = [
  ['en', 'English'], ['zh-CN', '简体中文'], ['zh-TW', '繁體中文'], ['ja', '日本語'], ['ko', '한국어'],
  ['de', 'Deutsch'], ['fr', 'Français'], ['es', 'Español'], ['it', 'Italiano'], ['pt-BR', 'Português (Brasil)'],
  ['ru', 'Русский'], ['ar', 'العربية'], ['nl', 'Nederlands'], ['tr', 'Türkçe'], ['pl', 'Polski'],
  ['vi', 'Tiếng Việt'], ['th', 'ไทย'], ['id', 'Bahasa Indonesia'], ['hi', 'हिन्दी']
];

const localeDictionaries = {
  'zh-CN': {
    'My Account': '我的账户', Cart: '购物车', 'Browse all parts': '浏览全部配件', 'Add my car': '添加我的车辆', 'Search gallery': '搜索案例', Brands: '品牌', Resources: '资源', 'Need help?': '需要帮助？', Shop: '商城', 'Shop now': '立即选购', 'View all parts': '查看全部配件', 'Product reviews': '商品评价', 'Write a review': '写评价', 'Continue shopping': '继续购物', 'Order summary': '订单摘要', 'Continue to checkout': '进入结算', Dismiss: '关闭', 'Shopping cart': '购物车', 'Secure checkout': '安全结算', 'Finish your order.': '完成订单', Customer: '客户信息', Shipping: '配送信息', Payment: '支付信息', Continue: '继续', 'Place demo order': '提交演示订单', 'Buy it now': '立即购买', 'Add to cart': '加入购物车', Details: '详情', Home: '首页', 'All performance parts': '全部性能配件', 'All parts': '全部配件', 'Product type': '产品类型', 'Price range': '价格区间', 'Customer rating': '客户评分', 'Delivery estimate': '配送估算', 'Search by vehicle': '按车型搜索', 'Search products': '搜索商品', 'Search wheels, calipers, rotors, pads...': '搜索轮毂、卡钳、刹车盘、刹车片…'
  },
  'zh-TW': {
    'My Account': '我的帳戶', Cart: '購物車', 'Browse all parts': '瀏覽全部配件', 'Add my car': '加入我的車輛', 'Search gallery': '搜尋案例', Brands: '品牌', Resources: '資源', 'Need help?': '需要協助？', Shop: '商城', 'Shop now': '立即選購', 'View all parts': '查看全部配件', 'Product reviews': '商品評價', 'Write a review': '撰寫評價', 'Continue shopping': '繼續購物', 'Order summary': '訂單摘要', 'Continue to checkout': '前往結帳', Dismiss: '關閉', 'Shopping cart': '購物車', 'Secure checkout': '安全結帳', 'Finish your order.': '完成訂單', Customer: '客戶資訊', Shipping: '配送資訊', Payment: '付款資訊', Continue: '繼續', 'Place demo order': '提交示範訂單', 'Buy it now': '立即購買', 'Add to cart': '加入購物車', Details: '詳情', Home: '首頁', 'All performance parts': '全部性能配件', 'All parts': '全部配件', 'Product type': '產品類型', 'Price range': '價格區間', 'Customer rating': '客戶評分', 'Delivery estimate': '配送估算', 'Search by vehicle': '依車型搜尋', 'Search products': '搜尋商品', 'Search wheels, calipers, rotors, pads...': '搜尋輪圈、卡鉗、煞車碟、煞車片…'
  },
  ja: { 'My Account': 'アカウント', Cart: 'カート', 'Browse all parts': 'すべての商品', 'Add my car': '車両を追加', 'Search gallery': 'ギャラリー', Brands: 'ブランド', Resources: 'リソース', 'Need help?': 'ヘルプ', Shop: 'ショップ', 'Shop now': '今すぐ見る', 'View all parts': 'すべて見る', 'Product reviews': '商品レビュー', 'Write a review': 'レビューを書く', 'Continue shopping': '買い物を続ける', 'Order summary': '注文概要', 'Continue to checkout': 'チェックアウトへ', Dismiss: '閉じる', 'Shopping cart': 'ショッピングカート', 'Secure checkout': '安全なチェックアウト', 'Finish your order.': '注文を完了', Customer: 'お客様情報', Shipping: '配送', Payment: '支払い', Continue: '続ける', 'Place demo order': 'デモ注文を送信', 'Buy it now': '今すぐ購入', 'Add to cart': 'カートに追加', Details: '詳細', Home: 'ホーム', 'All performance parts': '全パフォーマンスパーツ', 'Product type': '商品タイプ', 'Price range': '価格帯', 'Customer rating': '評価', 'Search by vehicle': '車種から検索', 'Search products': '商品を検索' },
  ko: { 'My Account': '내 계정', Cart: '장바구니', 'Browse all parts': '전체 부품 보기', 'Add my car': '내 차량 추가', 'Search gallery': '갤러리 검색', Brands: '브랜드', Resources: '자료실', 'Need help?': '도움이 필요하신가요?', Shop: '쇼핑', 'Shop now': '지금 쇼핑하기', 'View all parts': '전체 부품 보기', 'Product reviews': '상품 리뷰', 'Write a review': '리뷰 작성', 'Continue shopping': '쇼핑 계속하기', 'Order summary': '주문 요약', 'Continue to checkout': '결제로 이동', Dismiss: '닫기', 'Shopping cart': '장바구니', 'Secure checkout': '안전한 결제', 'Finish your order.': '주문 완료', Customer: '고객 정보', Shipping: '배송', Payment: '결제', Continue: '계속', 'Place demo order': '데모 주문 제출', 'Buy it now': '지금 구매', 'Add to cart': '장바구니에 담기', Details: '상세 보기', Home: '홈', 'All performance parts': '전체 퍼포먼스 부품', 'Product type': '상품 유형', 'Price range': '가격 범위', 'Customer rating': '고객 평점', 'Search by vehicle': '차량으로 검색', 'Search products': '상품 검색' },
  de: { 'My Account': 'Mein Konto', Cart: 'Warenkorb', 'Browse all parts': 'Alle Teile', 'Add my car': 'Mein Auto hinzufügen', 'Search gallery': 'Galerie', Brands: 'Marken', Resources: 'Ressourcen', 'Need help?': 'Hilfe benötigt?', Shop: 'Shop', 'Shop now': 'Jetzt shoppen', 'View all parts': 'Alle Teile ansehen', 'Product reviews': 'Produktbewertungen', 'Write a review': 'Bewertung schreiben', 'Continue shopping': 'Weiter einkaufen', 'Order summary': 'Bestellübersicht', 'Continue to checkout': 'Zur Kasse', Dismiss: 'Schließen', 'Shopping cart': 'Warenkorb', 'Secure checkout': 'Sicherer Checkout', 'Finish your order.': 'Bestellung abschließen', Customer: 'Kunde', Shipping: 'Versand', Payment: 'Zahlung', Continue: 'Weiter', 'Place demo order': 'Demo-Bestellung senden', 'Buy it now': 'Jetzt kaufen', 'Add to cart': 'In den Warenkorb', Details: 'Details', Home: 'Startseite', 'All performance parts': 'Alle Performance-Teile', 'Product type': 'Produkttyp', 'Price range': 'Preisbereich', 'Customer rating': 'Kundenbewertung', 'Search by vehicle': 'Nach Fahrzeug suchen', 'Search products': 'Produkte suchen' },
  fr: { 'My Account': 'Mon compte', Cart: 'Panier', 'Browse all parts': 'Toutes les pièces', 'Add my car': 'Ajouter ma voiture', 'Search gallery': 'Galerie', Brands: 'Marques', Resources: 'Ressources', 'Need help?': 'Besoin d’aide ?', Shop: 'Boutique', 'Shop now': 'Acheter maintenant', 'View all parts': 'Voir toutes les pièces', 'Product reviews': 'Avis produits', 'Write a review': 'Écrire un avis', 'Continue shopping': 'Continuer les achats', 'Order summary': 'Récapitulatif', 'Continue to checkout': 'Passer au paiement', Dismiss: 'Fermer', 'Shopping cart': 'Panier', 'Secure checkout': 'Paiement sécurisé', 'Finish your order.': 'Finaliser la commande', Customer: 'Client', Shipping: 'Livraison', Payment: 'Paiement', Continue: 'Continuer', 'Place demo order': 'Envoyer la commande démo', 'Buy it now': 'Acheter maintenant', 'Add to cart': 'Ajouter au panier', Details: 'Détails', Home: 'Accueil', 'All performance parts': 'Toutes les pièces performance', 'Product type': 'Type de produit', 'Price range': 'Fourchette de prix', 'Customer rating': 'Note client', 'Search by vehicle': 'Rechercher par véhicule', 'Search products': 'Rechercher des produits' },
  es: { 'My Account': 'Mi cuenta', Cart: 'Carrito', 'Browse all parts': 'Todas las piezas', 'Add my car': 'Añadir mi coche', 'Search gallery': 'Galería', Brands: 'Marcas', Resources: 'Recursos', 'Need help?': '¿Necesitas ayuda?', Shop: 'Tienda', 'Shop now': 'Comprar ahora', 'View all parts': 'Ver todas las piezas', 'Product reviews': 'Opiniones', 'Write a review': 'Escribir opinión', 'Continue shopping': 'Seguir comprando', 'Order summary': 'Resumen del pedido', 'Continue to checkout': 'Ir al checkout', Dismiss: 'Cerrar', 'Shopping cart': 'Carrito', 'Secure checkout': 'Checkout seguro', 'Finish your order.': 'Finaliza tu pedido', Customer: 'Cliente', Shipping: 'Envío', Payment: 'Pago', Continue: 'Continuar', 'Place demo order': 'Enviar pedido demo', 'Buy it now': 'Comprar ahora', 'Add to cart': 'Añadir al carrito', Details: 'Detalles', Home: 'Inicio', 'All performance parts': 'Todas las piezas de rendimiento', 'Product type': 'Tipo de producto', 'Price range': 'Rango de precio', 'Customer rating': 'Valoración', 'Search by vehicle': 'Buscar por vehículo', 'Search products': 'Buscar productos' },
  'pt-BR': { 'My Account': 'Minha conta', Cart: 'Carrinho', 'Browse all parts': 'Todas as peças', 'Add my car': 'Adicionar meu carro', 'Search gallery': 'Galeria', Brands: 'Marcas', Resources: 'Recursos', 'Need help?': 'Precisa de ajuda?', Shop: 'Loja', 'Shop now': 'Comprar agora', 'View all parts': 'Ver todas as peças', 'Product reviews': 'Avaliações', 'Write a review': 'Escrever avaliação', 'Continue shopping': 'Continuar comprando', 'Order summary': 'Resumo do pedido', 'Continue to checkout': 'Ir para checkout', Dismiss: 'Fechar', 'Shopping cart': 'Carrinho', 'Secure checkout': 'Checkout seguro', 'Finish your order.': 'Finalize seu pedido', Customer: 'Cliente', Shipping: 'Entrega', Payment: 'Pagamento', Continue: 'Continuar', 'Place demo order': 'Enviar pedido de demonstração', 'Buy it now': 'Comprar agora', 'Add to cart': 'Adicionar ao carrinho', Details: 'Detalhes', Home: 'Início', 'All performance parts': 'Todas as peças de performance', 'Product type': 'Tipo de produto', 'Price range': 'Faixa de preço', 'Customer rating': 'Avaliação do cliente', 'Search by vehicle': 'Buscar por veículo', 'Search products': 'Buscar produtos' },
  ru: { 'My Account': 'Мой аккаунт', Cart: 'Корзина', 'Browse all parts': 'Все детали', 'Add my car': 'Добавить автомобиль', 'Search gallery': 'Галерея', Brands: 'Бренды', Resources: 'Ресурсы', 'Need help?': 'Нужна помощь?', Shop: 'Магазин', 'Shop now': 'Купить сейчас', 'View all parts': 'Все детали', 'Product reviews': 'Отзывы', 'Write a review': 'Оставить отзыв', 'Continue shopping': 'Продолжить покупки', 'Order summary': 'Сводка заказа', 'Continue to checkout': 'Перейти к оплате', Dismiss: 'Закрыть', 'Shopping cart': 'Корзина', 'Secure checkout': 'Безопасная оплата', 'Finish your order.': 'Завершите заказ', Customer: 'Покупатель', Shipping: 'Доставка', Payment: 'Оплата', Continue: 'Продолжить', 'Place demo order': 'Отправить демо-заказ', 'Buy it now': 'Купить сейчас', 'Add to cart': 'В корзину', Details: 'Подробнее', Home: 'Главная', 'All performance parts': 'Все спортивные детали', 'Product type': 'Тип товара', 'Price range': 'Диапазон цен', 'Customer rating': 'Рейтинг клиентов', 'Search by vehicle': 'Поиск по автомобилю', 'Search products': 'Поиск товаров' },
  ar: { 'My Account': 'حسابي', Cart: 'السلة', 'Browse all parts': 'كل القطع', 'Add my car': 'أضف سيارتي', 'Search gallery': 'المعرض', Brands: 'العلامات التجارية', Resources: 'المصادر', 'Need help?': 'هل تحتاج مساعدة؟', Shop: 'المتجر', 'Shop now': 'تسوق الآن', 'View all parts': 'عرض كل القطع', 'Product reviews': 'تقييمات المنتجات', 'Write a review': 'اكتب تقييمًا', 'Continue shopping': 'متابعة التسوق', 'Order summary': 'ملخص الطلب', 'Continue to checkout': 'المتابعة للدفع', Dismiss: 'إغلاق', 'Shopping cart': 'سلة التسوق', 'Secure checkout': 'دفع آمن', 'Finish your order.': 'أكمل طلبك', Customer: 'العميل', Shipping: 'الشحن', Payment: 'الدفع', Continue: 'متابعة', 'Place demo order': 'إرسال طلب تجريبي', 'Buy it now': 'اشتر الآن', 'Add to cart': 'أضف إلى السلة', Details: 'التفاصيل', Home: 'الرئيسية', 'All performance parts': 'كل قطع الأداء', 'Product type': 'نوع المنتج', 'Price range': 'نطاق السعر', 'Customer rating': 'تقييم العملاء', 'Search by vehicle': 'البحث حسب السيارة', 'Search products': 'البحث عن المنتجات' },
  it: { 'My Account': 'Il mio account', Cart: 'Carrello', 'Browse all parts': 'Tutti i componenti', 'Add my car': 'Aggiungi la mia auto', 'Search gallery': 'Galleria', Brands: 'Brand', Resources: 'Risorse', 'Need help?': 'Serve aiuto?', Shop: 'Shop', 'Shop now': 'Acquista ora', 'View all parts': 'Vedi tutti i componenti', 'Product reviews': 'Recensioni', 'Write a review': 'Scrivi una recensione', 'Continue shopping': 'Continua lo shopping', 'Order summary': 'Riepilogo ordine', 'Continue to checkout': 'Vai al checkout', Dismiss: 'Chiudi', 'Shopping cart': 'Carrello', 'Secure checkout': 'Checkout sicuro', 'Finish your order.': 'Completa il tuo ordine', Customer: 'Cliente', Shipping: 'Spedizione', Payment: 'Pagamento', Continue: 'Continua', 'Place demo order': 'Invia ordine demo', 'Buy it now': 'Acquista ora', 'Add to cart': 'Aggiungi al carrello', Details: 'Dettagli', Home: 'Home', 'Product type': 'Tipo di prodotto', 'Price range': 'Fascia di prezzo', 'Customer rating': 'Valutazione cliente', 'Search by vehicle': 'Cerca per veicolo', 'Search products': 'Cerca prodotti' },
  tr: { 'My Account': 'Hesabım', Cart: 'Sepet', 'Browse all parts': 'Tüm parçalar', 'Add my car': 'Aracımı ekle', 'Search gallery': 'Galeri', Brands: 'Markalar', Resources: 'Kaynaklar', 'Need help?': 'Yardıma mı ihtiyacınız var?', Shop: 'Mağaza', 'Shop now': 'Şimdi alışveriş yap', 'View all parts': 'Tüm parçaları gör', 'Product reviews': 'Ürün yorumları', 'Write a review': 'Yorum yaz', 'Continue shopping': 'Alışverişe devam et', 'Order summary': 'Sipariş özeti', 'Continue to checkout': 'Ödemeye geç', Dismiss: 'Kapat', 'Shopping cart': 'Sepet', 'Secure checkout': 'Güvenli ödeme', 'Finish your order.': 'Siparişinizi tamamlayın', Customer: 'Müşteri', Shipping: 'Kargo', Payment: 'Ödeme', Continue: 'Devam', 'Place demo order': 'Demo siparişi gönder', 'Buy it now': 'Şimdi satın al', 'Add to cart': 'Sepete ekle', Details: 'Detaylar', Home: 'Ana sayfa', 'Product type': 'Ürün türü', 'Price range': 'Fiyat aralığı', 'Customer rating': 'Müşteri puanı', 'Search by vehicle': 'Araca göre ara', 'Search products': 'Ürün ara' },
  vi: { 'My Account': 'Tài khoản', Cart: 'Giỏ hàng', 'Browse all parts': 'Tất cả phụ tùng', 'Add my car': 'Thêm xe của tôi', 'Search gallery': 'Thư viện xe', Brands: 'Thương hiệu', Resources: 'Tài nguyên', 'Need help?': 'Cần hỗ trợ?', Shop: 'Cửa hàng', 'Shop now': 'Mua ngay', 'View all parts': 'Xem tất cả phụ tùng', 'Product reviews': 'Đánh giá sản phẩm', 'Write a review': 'Viết đánh giá', 'Continue shopping': 'Tiếp tục mua sắm', 'Order summary': 'Tóm tắt đơn hàng', 'Continue to checkout': 'Đến thanh toán', Dismiss: 'Đóng', 'Shopping cart': 'Giỏ hàng', 'Secure checkout': 'Thanh toán an toàn', 'Finish your order.': 'Hoàn tất đơn hàng', Customer: 'Khách hàng', Shipping: 'Giao hàng', Payment: 'Thanh toán', Continue: 'Tiếp tục', 'Place demo order': 'Gửi đơn thử nghiệm', 'Buy it now': 'Mua ngay', 'Add to cart': 'Thêm vào giỏ', Details: 'Chi tiết', Home: 'Trang chủ', 'Product type': 'Loại sản phẩm', 'Price range': 'Khoảng giá', 'Customer rating': 'Đánh giá khách hàng', 'Search by vehicle': 'Tìm theo xe', 'Search products': 'Tìm sản phẩm' }
};

Object.assign(localeDictionaries, {
  nl: { 'My Account': 'Mijn account', Cart: 'Winkelwagen', 'Browse all parts': 'Alle onderdelen', 'Add my car': 'Mijn auto toevoegen', 'Search gallery': 'Galerij', Brands: 'Merken', Resources: 'Bronnen', Shop: 'Shop', 'Shop now': 'Nu shoppen', 'View all parts': 'Alle onderdelen bekijken', 'Product reviews': 'Productreviews', 'Write a review': 'Review schrijven', 'Continue shopping': 'Verder winkelen', 'Order summary': 'Besteloverzicht', 'Continue to checkout': 'Naar afrekenen', Dismiss: 'Sluiten', 'Shopping cart': 'Winkelwagen', 'Secure checkout': 'Veilig afrekenen', Continue: 'Doorgaan', 'Buy it now': 'Nu kopen', 'Add to cart': 'In winkelwagen', Details: 'Details', Home: 'Home', 'Product type': 'Producttype', 'Price range': 'Prijsbereik', 'Customer rating': 'Klantbeoordeling', 'Search by vehicle': 'Zoeken op voertuig', 'Search products': 'Producten zoeken' },
  pl: { 'My Account': 'Moje konto', Cart: 'Koszyk', 'Browse all parts': 'Wszystkie części', 'Add my car': 'Dodaj mój samochód', 'Search gallery': 'Galeria', Brands: 'Marki', Resources: 'Materiały', Shop: 'Sklep', 'Shop now': 'Kup teraz', 'View all parts': 'Zobacz wszystkie części', 'Product reviews': 'Opinie o produkcie', 'Write a review': 'Napisz opinię', 'Continue shopping': 'Kontynuuj zakupy', 'Order summary': 'Podsumowanie zamówienia', 'Continue to checkout': 'Przejdź do kasy', Dismiss: 'Zamknij', 'Shopping cart': 'Koszyk', 'Secure checkout': 'Bezpieczna płatność', Continue: 'Dalej', 'Buy it now': 'Kup teraz', 'Add to cart': 'Dodaj do koszyka', Details: 'Szczegóły', Home: 'Strona główna', 'Product type': 'Typ produktu', 'Price range': 'Zakres cen', 'Customer rating': 'Ocena klienta', 'Search by vehicle': 'Szukaj po pojeździe', 'Search products': 'Szukaj produktów' },
  th: { 'My Account': 'บัญชีของฉัน', Cart: 'รถเข็น', 'Browse all parts': 'ดูชิ้นส่วนทั้งหมด', 'Add my car': 'เพิ่มรถของฉัน', 'Search gallery': 'แกลเลอรี', Brands: 'แบรนด์', Resources: 'แหล่งข้อมูล', Shop: 'ร้านค้า', 'Shop now': 'เลือกซื้อเลย', 'View all parts': 'ดูชิ้นส่วนทั้งหมด', 'Product reviews': 'รีวิวสินค้า', 'Write a review': 'เขียนรีวิว', 'Continue shopping': 'ช้อปต่อ', 'Order summary': 'สรุปคำสั่งซื้อ', 'Continue to checkout': 'ไปชำระเงิน', Dismiss: 'ปิด', 'Shopping cart': 'รถเข็น', 'Secure checkout': 'ชำระเงินที่ปลอดภัย', Continue: 'ดำเนินการต่อ', 'Buy it now': 'ซื้อเลย', 'Add to cart': 'เพิ่มลงรถเข็น', Details: 'รายละเอียด', Home: 'หน้าแรก', 'Product type': 'ประเภทสินค้า', 'Price range': 'ช่วงราคา', 'Customer rating': 'คะแนนลูกค้า', 'Search by vehicle': 'ค้นหาตามรถ', 'Search products': 'ค้นหาสินค้า' },
  id: { 'My Account': 'Akun saya', Cart: 'Keranjang', 'Browse all parts': 'Semua suku cadang', 'Add my car': 'Tambah mobil saya', 'Search gallery': 'Galeri', Brands: 'Merek', Resources: 'Sumber daya', Shop: 'Toko', 'Shop now': 'Belanja sekarang', 'View all parts': 'Lihat semua suku cadang', 'Product reviews': 'Ulasan produk', 'Write a review': 'Tulis ulasan', 'Continue shopping': 'Lanjut belanja', 'Order summary': 'Ringkasan pesanan', 'Continue to checkout': 'Lanjut ke pembayaran', Dismiss: 'Tutup', 'Shopping cart': 'Keranjang', 'Secure checkout': 'Checkout aman', Continue: 'Lanjut', 'Buy it now': 'Beli sekarang', 'Add to cart': 'Tambah ke keranjang', Details: 'Detail', Home: 'Beranda', 'Product type': 'Jenis produk', 'Price range': 'Rentang harga', 'Customer rating': 'Penilaian pelanggan', 'Search by vehicle': 'Cari berdasarkan kendaraan', 'Search products': 'Cari produk' },
  hi: { 'My Account': 'मेरा खाता', Cart: 'कार्ट', 'Browse all parts': 'सभी पार्ट्स देखें', 'Add my car': 'मेरी कार जोड़ें', 'Search gallery': 'गैलरी', Brands: 'ब्रांड', Resources: 'संसाधन', Shop: 'शॉप', 'Shop now': 'अभी खरीदें', 'View all parts': 'सभी पार्ट्स देखें', 'Product reviews': 'उत्पाद समीक्षाएं', 'Write a review': 'समीक्षा लिखें', 'Continue shopping': 'खरीदारी जारी रखें', 'Order summary': 'ऑर्डर सारांश', 'Continue to checkout': 'चेकआउट पर जाएं', Dismiss: 'बंद करें', 'Shopping cart': 'शॉपिंग कार्ट', 'Secure checkout': 'सुरक्षित चेकआउट', Continue: 'जारी रखें', 'Buy it now': 'अभी खरीदें', 'Add to cart': 'कार्ट में जोड़ें', Details: 'विवरण', Home: 'होम', 'Product type': 'उत्पाद प्रकार', 'Price range': 'मूल्य सीमा', 'Customer rating': 'ग्राहक रेटिंग', 'Search by vehicle': 'वाहन से खोजें', 'Search products': 'उत्पाद खोजें' }
});

const customerBuildTranslationKeys = [
  'CUSTOMER CARS',
  'See CIRUI wheels',
  'after fitment.',
  'Explore approved owner photos to compare stance, finish, spoke depth and real-world presence. Start with a quick preview, then open the full gallery.',
  'Verified customer build',
  'International customer',
  '{count} approved builds',
  'Open any image for a closer look.',
  'Show fewer customer cars',
  'View all {count} customer cars',
  'Customer builds',
  'are coming soon.',
  'Customer-submitted fitment photos will appear here after approval.',
  'Customer cars',
  'Customer builds are loading.',
  'Open customer build photo',
  'fitted to a customer vehicle'
];

const customerBuildTranslations = {
  'zh-CN': ['客户车辆', '查看 CIRUI 轮毂', '实车安装效果。', '浏览审核通过的车主实拍，对比姿态、表面处理、辐条深度与真实效果。先快速预览，再展开完整图库。', '已验证客户案例', '海外客户', '{count} 个已审核案例', '点击任意图片查看大图。', '收起客户车辆', '查看全部 {count} 台客户车辆', '客户案例', '即将上线。', '审核通过后，客户提交的实车安装照片将展示在这里。', '客户车辆', '正在加载客户案例。', '打开客户案例照片', '已安装到客户车辆'],
  'zh-TW': ['客戶車輛', '查看 CIRUI 輪圈', '實車安裝效果。', '瀏覽審核通過的車主實拍，比較姿態、表面處理、輻條深度與真實效果。先快速預覽，再展開完整圖庫。', '已驗證客戶案例', '海外客戶', '{count} 個已審核案例', '點擊任意圖片查看大圖。', '收起客戶車輛', '查看全部 {count} 台客戶車輛', '客戶案例', '即將上線。', '審核通過後，客戶提交的實車安裝照片將展示在這裡。', '客戶車輛', '正在載入客戶案例。', '開啟客戶案例照片', '已安裝到客戶車輛'],
  ja: ['カスタマーカー', 'CIRUIホイールの', '装着後の姿。', '承認済みのオーナー写真で、スタンス、仕上げ、スポークの深さ、実車での存在感を比較できます。まずプレビューし、その後ギャラリー全体を開いてください。', '確認済みカスタマービルド', '海外のお客様', '承認済み事例 {count} 件', '画像を開いて詳しく見る。', '表示を減らす', '全 {count} 台を見る', 'カスタマービルド', 'まもなく公開。', '承認後、お客様が投稿した装着写真をここに掲載します。', 'カスタマーカー', 'カスタマービルドを読み込み中。', 'カスタマービルド写真を開く', 'お客様の車両に装着'],
  ko: ['고객 차량', 'CIRUI 휠의', '실차 장착 모습.', '승인된 오너 사진에서 자세, 마감, 스포크 깊이와 실제 존재감을 비교하세요. 먼저 미리 보고 전체 갤러리를 열 수 있습니다.', '확인된 고객 빌드', '해외 고객', '승인된 빌드 {count}개', '이미지를 열어 자세히 보세요.', '고객 차량 접기', '고객 차량 {count}대 모두 보기', '고객 빌드', '곧 공개됩니다.', '승인된 고객 장착 사진이 여기에 표시됩니다.', '고객 차량', '고객 빌드 불러오는 중.', '고객 빌드 사진 열기', '고객 차량에 장착'],
  de: ['KUNDENFAHRZEUGE', 'CIRUI-Räder', 'nach der Montage.', 'Vergleichen Sie auf freigegebenen Besitzerfotos Fahrzeughöhe, Finish, Speichentiefe und reale Wirkung. Starten Sie mit der Vorschau und öffnen Sie danach die vollständige Galerie.', 'Geprüfter Kundenumbau', 'Internationaler Kunde', '{count} freigegebene Umbauten', 'Öffnen Sie ein Bild für die Detailansicht.', 'Weniger Kundenfahrzeuge anzeigen', 'Alle {count} Kundenfahrzeuge anzeigen', 'Kundenumbauten', 'folgen in Kürze.', 'Von Kunden eingereichte Montagefotos erscheinen hier nach Freigabe.', 'Kundenfahrzeuge', 'Kundenumbauten werden geladen.', 'Foto des Kundenumbaus öffnen', 'an einem Kundenfahrzeug montiert'],
  fr: ['VÉHICULES CLIENTS', 'Les jantes CIRUI', 'une fois montées.', 'Comparez la posture, la finition, la profondeur des branches et le rendu réel grâce aux photos de propriétaires approuvées. Commencez par l’aperçu, puis ouvrez la galerie complète.', 'Projet client vérifié', 'Client international', '{count} projets approuvés', 'Ouvrez une image pour l’agrandir.', 'Afficher moins de véhicules', 'Voir les {count} véhicules clients', 'Projets clients', 'bientôt disponibles.', 'Les photos de montage envoyées par les clients apparaîtront ici après validation.', 'Véhicules clients', 'Chargement des projets clients.', 'Ouvrir la photo du projet client', 'montée sur un véhicule client'],
  es: ['COCHES DE CLIENTES', 'Llantas CIRUI', 'después del montaje.', 'Compara postura, acabado, profundidad de radios y presencia real en fotos aprobadas de propietarios. Empieza con la vista previa y abre después la galería completa.', 'Proyecto de cliente verificado', 'Cliente internacional', '{count} proyectos aprobados', 'Abre cualquier imagen para verla en detalle.', 'Mostrar menos coches', 'Ver los {count} coches de clientes', 'Proyectos de clientes', 'próximamente.', 'Las fotos de montaje enviadas por clientes aparecerán aquí tras su aprobación.', 'Coches de clientes', 'Cargando proyectos de clientes.', 'Abrir foto del proyecto del cliente', 'montada en un vehículo de cliente'],
  it: ['AUTO DEI CLIENTI', 'Cerchi CIRUI', 'dopo il montaggio.', 'Confronta assetto, finitura, profondità delle razze e resa reale nelle foto approvate dei proprietari. Parti dall’anteprima e poi apri la galleria completa.', 'Progetto cliente verificato', 'Cliente internazionale', '{count} progetti approvati', 'Apri un’immagine per vederla in dettaglio.', 'Mostra meno auto', 'Vedi tutte le {count} auto dei clienti', 'Progetti dei clienti', 'in arrivo.', 'Le foto di montaggio inviate dai clienti appariranno qui dopo l’approvazione.', 'Auto dei clienti', 'Caricamento progetti clienti.', 'Apri la foto del progetto cliente', 'montato su un veicolo cliente'],
  'pt-BR': ['CARROS DE CLIENTES', 'Rodas CIRUI', 'depois da instalação.', 'Compare postura, acabamento, profundidade dos raios e presença real nas fotos aprovadas dos proprietários. Comece pela prévia e depois abra a galeria completa.', 'Projeto de cliente verificado', 'Cliente internacional', '{count} projetos aprovados', 'Abra qualquer imagem para ver de perto.', 'Mostrar menos carros', 'Ver todos os {count} carros de clientes', 'Projetos de clientes', 'em breve.', 'As fotos de instalação enviadas por clientes aparecerão aqui após aprovação.', 'Carros de clientes', 'Carregando projetos de clientes.', 'Abrir foto do projeto do cliente', 'instalada em um veículo de cliente'],
  ru: ['АВТОМОБИЛИ КЛИЕНТОВ', 'Диски CIRUI', 'после установки.', 'Сравните посадку, отделку, глубину спиц и вид на автомобиле по одобренным фотографиям владельцев. Начните с предпросмотра, затем откройте всю галерею.', 'Проверенный проект клиента', 'Международный клиент', 'Одобрено проектов: {count}', 'Откройте изображение для подробного просмотра.', 'Показать меньше автомобилей', 'Показать все автомобили клиентов: {count}', 'Проекты клиентов', 'скоро появятся.', 'Фотографии установки от клиентов появятся здесь после проверки.', 'Автомобили клиентов', 'Загрузка проектов клиентов.', 'Открыть фото проекта клиента', 'установлено на автомобиль клиента'],
  ar: ['سيارات العملاء', 'عجلات CIRUI', 'بعد التركيب.', 'قارن الوقفة والتشطيب وعمق الأذرع والحضور الفعلي من خلال صور المالكين المعتمدة. ابدأ بالمعاينة ثم افتح المعرض الكامل.', 'مشروع عميل موثّق', 'عميل دولي', '{count} مشاريع معتمدة', 'افتح أي صورة لرؤية التفاصيل.', 'عرض عدد أقل من السيارات', 'عرض جميع سيارات العملاء وعددها {count}', 'مشاريع العملاء', 'قريبًا.', 'ستظهر هنا صور التركيب المرسلة من العملاء بعد اعتمادها.', 'سيارات العملاء', 'جارٍ تحميل مشاريع العملاء.', 'فتح صورة مشروع العميل', 'مركبة على سيارة عميل'],
  nl: ['KLANTAUTO’S', 'CIRUI-wielen', 'na montage.', 'Vergelijk houding, afwerking, spaakdiepte en uitstraling op goedgekeurde foto’s van eigenaren. Bekijk eerst de preview en open daarna de volledige galerij.', 'Geverifieerde klantenauto', 'Internationale klant', '{count} goedgekeurde projecten', 'Open een afbeelding voor een grotere weergave.', 'Minder klantauto’s tonen', 'Alle {count} klantauto’s bekijken', 'Klantprojecten', 'binnenkort beschikbaar.', 'Door klanten ingestuurde montagefoto’s verschijnen hier na goedkeuring.', 'Klantauto’s', 'Klantprojecten worden geladen.', 'Foto van klantproject openen', 'gemonteerd op een klantauto'],
  tr: ['MÜŞTERİ ARAÇLARI', 'CIRUI jantları', 'montaj sonrası.', 'Onaylı araç sahibi fotoğraflarında duruşu, kaplamayı, kol derinliğini ve gerçek görünümü karşılaştırın. Önce önizlemeye bakın, ardından tüm galeriyi açın.', 'Doğrulanmış müşteri projesi', 'Uluslararası müşteri', '{count} onaylı proje', 'Yakından görmek için bir görsel açın.', 'Daha az araç göster', 'Tüm {count} müşteri aracını göster', 'Müşteri projeleri', 'yakında.', 'Müşterilerin gönderdiği montaj fotoğrafları onaylandıktan sonra burada görünecek.', 'Müşteri araçları', 'Müşteri projeleri yükleniyor.', 'Müşteri projesi fotoğrafını aç', 'müşteri aracına takılı'],
  pl: ['SAMOCHODY KLIENTÓW', 'Felgi CIRUI', 'po montażu.', 'Porównaj pozycję auta, wykończenie, głębokość ramion i wygląd na zatwierdzonych zdjęciach właścicieli. Zacznij od podglądu, a następnie otwórz pełną galerię.', 'Zweryfikowany projekt klienta', 'Klient międzynarodowy', 'Zatwierdzone projekty: {count}', 'Otwórz zdjęcie, aby zobaczyć szczegóły.', 'Pokaż mniej samochodów', 'Pokaż wszystkie samochody klientów: {count}', 'Projekty klientów', 'już wkrótce.', 'Zdjęcia montażu przesłane przez klientów pojawią się tutaj po zatwierdzeniu.', 'Samochody klientów', 'Ładowanie projektów klientów.', 'Otwórz zdjęcie projektu klienta', 'zamontowane w samochodzie klienta'],
  vi: ['XE CỦA KHÁCH HÀNG', 'Mâm CIRUI', 'sau khi lắp đặt.', 'So sánh dáng xe, bề mặt hoàn thiện, độ sâu nan và hiệu ứng thực tế qua ảnh chủ xe đã được duyệt. Xem nhanh trước rồi mở toàn bộ thư viện.', 'Bản độ khách hàng đã xác minh', 'Khách hàng quốc tế', '{count} bản độ đã duyệt', 'Mở ảnh bất kỳ để xem kỹ hơn.', 'Thu gọn xe khách hàng', 'Xem tất cả {count} xe khách hàng', 'Bản độ khách hàng', 'sắp ra mắt.', 'Ảnh lắp đặt do khách hàng gửi sẽ xuất hiện tại đây sau khi được duyệt.', 'Xe khách hàng', 'Đang tải bản độ khách hàng.', 'Mở ảnh bản độ khách hàng', 'đã lắp trên xe khách hàng'],
  th: ['รถของลูกค้า', 'ล้อ CIRUI', 'หลังติดตั้งจริง', 'เปรียบเทียบท่าทางรถ งานผิว ความลึกของก้าน และภาพลักษณ์จริงจากรูปเจ้าของรถที่ผ่านการอนุมัติ ดูตัวอย่างก่อนแล้วจึงเปิดแกลเลอรีทั้งหมด', 'ผลงานลูกค้าที่ตรวจสอบแล้ว', 'ลูกค้าต่างประเทศ', 'ผลงานที่อนุมัติแล้ว {count} รายการ', 'เปิดรูปเพื่อดูรายละเอียด', 'แสดงรถน้อยลง', 'ดูรถลูกค้าทั้งหมด {count} คัน', 'ผลงานลูกค้า', 'เร็ว ๆ นี้', 'รูปติดตั้งที่ลูกค้าส่งมาจะแสดงที่นี่หลังผ่านการอนุมัติ', 'รถของลูกค้า', 'กำลังโหลดผลงานลูกค้า', 'เปิดรูปผลงานลูกค้า', 'ติดตั้งบนรถของลูกค้า'],
  id: ['MOBIL PELANGGAN', 'Velg CIRUI', 'setelah terpasang.', 'Bandingkan stance, finishing, kedalaman palang, dan tampilan nyata melalui foto pemilik yang telah disetujui. Mulai dari pratinjau lalu buka galeri lengkap.', 'Proyek pelanggan terverifikasi', 'Pelanggan internasional', '{count} proyek disetujui', 'Buka gambar untuk melihat lebih dekat.', 'Tampilkan lebih sedikit mobil', 'Lihat semua {count} mobil pelanggan', 'Proyek pelanggan', 'segera hadir.', 'Foto pemasangan kiriman pelanggan akan tampil di sini setelah disetujui.', 'Mobil pelanggan', 'Memuat proyek pelanggan.', 'Buka foto proyek pelanggan', 'terpasang pada mobil pelanggan'],
  hi: ['ग्राहकों की कारें', 'CIRUI व्हील', 'फिटमेंट के बाद।', 'स्वीकृत मालिक फ़ोटो में स्टांस, फ़िनिश, स्पोक की गहराई और वास्तविक रूप की तुलना करें। पहले झलक देखें, फिर पूरी गैलरी खोलें।', 'सत्यापित ग्राहक बिल्ड', 'अंतरराष्ट्रीय ग्राहक', '{count} स्वीकृत बिल्ड', 'नज़दीक से देखने के लिए कोई चित्र खोलें।', 'कम ग्राहक कारें दिखाएँ', 'सभी {count} ग्राहक कारें देखें', 'ग्राहक बिल्ड', 'जल्द आ रहे हैं।', 'ग्राहकों द्वारा भेजी गई फिटमेंट तस्वीरें स्वीकृति के बाद यहाँ दिखाई देंगी।', 'ग्राहकों की कारें', 'ग्राहक बिल्ड लोड हो रहे हैं।', 'ग्राहक बिल्ड की तस्वीर खोलें', 'ग्राहक वाहन पर फिट किया गया']
};

Object.entries(customerBuildTranslations).forEach(([locale, values]) => {
  if (!localeDictionaries[locale]) return;
  Object.assign(localeDictionaries[locale], Object.fromEntries(customerBuildTranslationKeys.map((key, index) => [key, values[index] || key])));
});

const siteChromeTranslationKeys = [
  'CIRUI source factory',
  'DDP delivery available',
  'Target production + transport in about 30 business days',
  'Search wheels, vehicle fitment, finishes...',
  'Language',
  'Language selection',
  'Open navigation',
  'Fitment Lab',
  'Shop by vehicle',
  'About CIRUI',
  'Motorsport',
  'Journal',
  'Fitment help',
  '策锐官网 · OFFICIAL GLOBAL SITE',
  'Factory-direct custom forged wheels built around the exact vehicle, fitment and finish.',
  'Forged wheels',
  'All wheel directions',
  'Custom fitment',
  'Tools',
  'Vehicle photo preview',
  'Fitment journal',
  'Customer feedback',
  'Factory + delivery',
  'Manufacturing',
  'DDP delivery',
  'Contact',
  'Orders + partners',
  'Track order',
  'My account',
  'Wholesale program',
  'WhatsApp fitment help',
  'Vehicle manufacturer names are used only to identify compatibility. CIRUI Forged is not affiliated with or endorsed by those vehicle manufacturers.',
  'Terms · Privacy · CCPA',
  'By using CIRUI, you agree to our cookie policy and fitment analytics.'
];

const siteChromeTranslations = {
  'zh-CN': ['CIRUI 源头工厂', '支持 DDP 完税到门', '生产 + 运输目标约 30 个工作日', '搜索轮毂、车型适配、表面处理…', '语言', '语言选择', '打开导航', '适配实验室', '按车型选购', '关于 CIRUI', '赛事运动', '杂志', '适配咨询', '策锐官网 · 官方海外网站', '围绕准确车型、适配参数和表面处理，提供工厂直供定制锻造轮毂。', '锻造轮毂', '全部轮毂款式', '定制适配', '工具', '车辆效果图预览', '适配杂志', '客户评价', '工厂 + 配送', '生产制造', 'DDP 配送', '联系', '订单 + 合作伙伴', '查询订单', '我的账户', '批发合作', 'WhatsApp 适配咨询', '车辆制造商名称仅用于识别适配性。CIRUI Forged 与这些车辆制造商没有隶属或认可关系。', '条款 · 隐私 · CCPA', '继续使用 CIRUI 即表示您同意 Cookie 政策与适配分析。'],
  'zh-TW': ['CIRUI 源頭工廠', '支援 DDP 完稅到門', '生產 + 運輸目標約 30 個工作日', '搜尋輪圈、車型適配、表面處理…', '語言', '語言選擇', '開啟導覽', '適配實驗室', '依車型選購', '關於 CIRUI', '賽事運動', '雜誌', '適配諮詢', '策锐官网 · 官方海外網站', '依照準確車型、適配參數與表面處理，提供工廠直供的客製鍛造輪圈。', '鍛造輪圈', '全部輪圈款式', '客製適配', '工具', '車輛效果圖預覽', '適配雜誌', '客戶評價', '工廠 + 配送', '生產製造', 'DDP 配送', '聯絡', '訂單 + 合作夥伴', '查詢訂單', '我的帳戶', '批發合作', 'WhatsApp 適配諮詢', '車輛製造商名稱僅用於識別適配性。CIRUI Forged 與這些車輛製造商並無隸屬或認可關係。', '條款 · 隱私 · CCPA', '繼續使用 CIRUI 即表示您同意 Cookie 政策與適配分析。'],
  ja: ['CIRUI 製造元工場', 'DDP配送に対応', '製造＋輸送の目安は約30営業日', 'ホイール、車種適合、仕上げを検索…', '言語', '言語の選択', 'ナビゲーションを開く', 'フィットメントラボ', '車種から選ぶ', 'CIRUIについて', 'モータースポーツ', 'ジャーナル', '適合サポート', '策锐官网 · 公式グローバルサイト', '正確な車両、適合寸法、仕上げに合わせて製造元から直送するカスタム鍛造ホイール。', '鍛造ホイール', 'すべてのホイールデザイン', 'カスタムフィットメント', 'ツール', '車両写真プレビュー', 'フィットメントジャーナル', 'お客様の声', '工場＋配送', '製造工程', 'DDP配送', 'お問い合わせ', '注文＋パートナー', '注文を追跡', 'マイアカウント', '卸売プログラム', 'WhatsApp適合サポート', '車両メーカー名は適合性を示す目的でのみ使用しています。CIRUI Forgedは各車両メーカーと提携または承認関係にありません。', '利用規約 · プライバシー · CCPA', 'CIRUIを利用すると、Cookieポリシーと適合分析に同意したものとみなされます。'],
  ko: ['CIRUI 원천 공장', 'DDP 배송 가능', '생산 + 운송 목표 약 30영업일', '휠, 차량 핏먼트, 마감 검색…', '언어', '언어 선택', '탐색 메뉴 열기', '핏먼트 랩', '차량별 쇼핑', 'CIRUI 소개', '모터스포츠', '저널', '핏먼트 지원', '策锐官网 · 공식 글로벌 사이트', '정확한 차량, 핏먼트 수치와 마감에 맞춘 공장 직영 커스텀 단조 휠.', '단조 휠', '모든 휠 디자인', '커스텀 핏먼트', '도구', '차량 사진 미리보기', '핏먼트 저널', '고객 후기', '공장 + 배송', '제조', 'DDP 배송', '문의', '주문 + 파트너', '주문 조회', '내 계정', '도매 프로그램', 'WhatsApp 핏먼트 지원', '차량 제조사 이름은 호환성 식별 목적으로만 사용됩니다. CIRUI Forged는 해당 제조사와 제휴하거나 승인을 받지 않았습니다.', '이용약관 · 개인정보 · CCPA', 'CIRUI를 계속 사용하면 쿠키 정책과 핏먼트 분석에 동의하게 됩니다.'],
  de: ['CIRUI Herstellerwerk', 'DDP-Lieferung verfügbar', 'Ziel: Produktion + Transport in etwa 30 Werktagen', 'Räder, Fahrzeug-Fitment, Oberflächen suchen…', 'Sprache', 'Sprachauswahl', 'Navigation öffnen', 'Fitment-Labor', 'Nach Fahrzeug einkaufen', 'Über CIRUI', 'Motorsport', 'Magazin', 'Fitment-Hilfe', '策锐官网 · OFFIZIELLE GLOBALE WEBSITE', 'Werksdirekte, maßgefertigte Schmiederäder für das genaue Fahrzeug, Fitment und Finish.', 'Schmiederäder', 'Alle Raddesigns', 'Individuelles Fitment', 'Werkzeuge', 'Vorschau am Fahrzeugfoto', 'Fitment-Magazin', 'Kundenfeedback', 'Werk + Lieferung', 'Fertigung', 'DDP-Lieferung', 'Kontakt', 'Bestellungen + Partner', 'Bestellung verfolgen', 'Mein Konto', 'Großhandelsprogramm', 'WhatsApp Fitment-Hilfe', 'Fahrzeugherstellernamen dienen ausschließlich zur Bestimmung der Kompatibilität. CIRUI Forged ist mit diesen Herstellern weder verbunden noch von ihnen empfohlen.', 'AGB · Datenschutz · CCPA', 'Mit der Nutzung von CIRUI stimmen Sie unserer Cookie-Richtlinie und Fitment-Analyse zu.'],
  fr: ['Usine source CIRUI', 'Livraison DDP disponible', 'Objectif : production + transport en environ 30 jours ouvrés', 'Rechercher des jantes, compatibilités, finitions…', 'Langue', 'Choix de la langue', 'Ouvrir la navigation', 'Laboratoire de compatibilité', 'Acheter par véhicule', 'À propos de CIRUI', 'Sport automobile', 'Journal', 'Aide compatibilité', '策锐官网 · SITE MONDIAL OFFICIEL', 'Des jantes forgées sur mesure en direct de l’usine, selon le véhicule, la compatibilité et la finition exacts.', 'Jantes forgées', 'Tous les designs de jantes', 'Compatibilité sur mesure', 'Outils', 'Aperçu sur photo du véhicule', 'Journal de compatibilité', 'Avis clients', 'Usine + livraison', 'Fabrication', 'Livraison DDP', 'Contact', 'Commandes + partenaires', 'Suivre la commande', 'Mon compte', 'Programme de gros', 'Aide compatibilité WhatsApp', 'Les noms des constructeurs automobiles servent uniquement à identifier la compatibilité. CIRUI Forged n’est ni affilié ni approuvé par ces constructeurs.', 'Conditions · Confidentialité · CCPA', 'En utilisant CIRUI, vous acceptez notre politique relative aux cookies et l’analyse de compatibilité.'],
  es: ['Fábrica de origen CIRUI', 'Entrega DDP disponible', 'Objetivo: producción + transporte en unos 30 días laborables', 'Buscar llantas, compatibilidad, acabados…', 'Idioma', 'Selección de idioma', 'Abrir navegación', 'Laboratorio de compatibilidad', 'Comprar por vehículo', 'Sobre CIRUI', 'Automovilismo', 'Revista', 'Ayuda de compatibilidad', '策锐官网 · SITIO GLOBAL OFICIAL', 'Llantas forjadas a medida, directas de fábrica y creadas para el vehículo, ajuste y acabado exactos.', 'Llantas forjadas', 'Todos los diseños de llantas', 'Compatibilidad a medida', 'Herramientas', 'Vista previa en foto del vehículo', 'Revista de compatibilidad', 'Opiniones de clientes', 'Fábrica + entrega', 'Fabricación', 'Entrega DDP', 'Contacto', 'Pedidos + socios', 'Seguir pedido', 'Mi cuenta', 'Programa mayorista', 'Ayuda de compatibilidad por WhatsApp', 'Los nombres de fabricantes de vehículos se utilizan únicamente para identificar la compatibilidad. CIRUI Forged no está afiliada ni respaldada por dichos fabricantes.', 'Términos · Privacidad · CCPA', 'Al utilizar CIRUI, aceptas nuestra política de cookies y el análisis de compatibilidad.'],
  it: ['Fabbrica CIRUI', 'Consegna DDP disponibile', 'Obiettivo: produzione + trasporto in circa 30 giorni lavorativi', 'Cerca cerchi, compatibilità, finiture…', 'Lingua', 'Selezione lingua', 'Apri navigazione', 'Laboratorio di compatibilità', 'Acquista per veicolo', 'Chi è CIRUI', 'Motorsport', 'Magazine', 'Assistenza compatibilità', '策锐官网 · SITO GLOBALE UFFICIALE', 'Cerchi forgiati su misura direttamente dalla fabbrica, progettati per veicolo, compatibilità e finitura esatti.', 'Cerchi forgiati', 'Tutti i design dei cerchi', 'Compatibilità su misura', 'Strumenti', 'Anteprima sulla foto del veicolo', 'Magazine compatibilità', 'Feedback clienti', 'Fabbrica + consegna', 'Produzione', 'Consegna DDP', 'Contatti', 'Ordini + partner', 'Traccia ordine', 'Il mio account', 'Programma rivenditori', 'Assistenza compatibilità WhatsApp', 'I nomi dei produttori di veicoli sono usati solo per identificare la compatibilità. CIRUI Forged non è affiliata né approvata da tali produttori.', 'Termini · Privacy · CCPA', 'Utilizzando CIRUI, accetti la nostra politica sui cookie e l’analisi di compatibilità.'],
  'pt-BR': ['Fábrica de origem CIRUI', 'Entrega DDP disponível', 'Meta: produção + transporte em cerca de 30 dias úteis', 'Buscar rodas, compatibilidade, acabamentos…', 'Idioma', 'Seleção de idioma', 'Abrir navegação', 'Laboratório de compatibilidade', 'Comprar por veículo', 'Sobre a CIRUI', 'Automobilismo', 'Revista', 'Ajuda de compatibilidade', '策锐官网 · SITE GLOBAL OFICIAL', 'Rodas forjadas sob medida, direto da fábrica e feitas para o veículo, encaixe e acabamento exatos.', 'Rodas forjadas', 'Todos os designs de rodas', 'Compatibilidade sob medida', 'Ferramentas', 'Prévia na foto do veículo', 'Revista de compatibilidade', 'Avaliações de clientes', 'Fábrica + entrega', 'Fabricação', 'Entrega DDP', 'Contato', 'Pedidos + parceiros', 'Rastrear pedido', 'Minha conta', 'Programa de atacado', 'Ajuda de compatibilidade no WhatsApp', 'Os nomes dos fabricantes de veículos são usados apenas para identificar compatibilidade. A CIRUI Forged não é afiliada nem endossada por esses fabricantes.', 'Termos · Privacidade · CCPA', 'Ao usar a CIRUI, você concorda com nossa política de cookies e análise de compatibilidade.'],
  ru: ['Завод-изготовитель CIRUI', 'Доставка DDP доступна', 'Цель: производство + доставка примерно за 30 рабочих дней', 'Поиск дисков, совместимости, отделки…', 'Язык', 'Выбор языка', 'Открыть навигацию', 'Лаборатория фитмента', 'Подбор по автомобилю', 'О CIRUI', 'Автоспорт', 'Журнал', 'Помощь по фитменту', '策锐官网 · ОФИЦИАЛЬНЫЙ МЕЖДУНАРОДНЫЙ САЙТ', 'Кованые диски на заказ напрямую с завода под точный автомобиль, фитмент и отделку.', 'Кованые диски', 'Все дизайны дисков', 'Индивидуальный фитмент', 'Инструменты', 'Примерка на фото автомобиля', 'Журнал о фитменте', 'Отзывы клиентов', 'Завод + доставка', 'Производство', 'Доставка DDP', 'Контакты', 'Заказы + партнёры', 'Отследить заказ', 'Мой аккаунт', 'Оптовая программа', 'Помощь по фитменту в WhatsApp', 'Названия производителей автомобилей используются только для определения совместимости. CIRUI Forged не связана с этими производителями и не одобрена ими.', 'Условия · Конфиденциальность · CCPA', 'Используя CIRUI, вы соглашаетесь с нашей политикой cookie и аналитикой фитмента.'],
  ar: ['مصنع CIRUI المصدر', 'توصيل DDP متاح', 'الهدف: الإنتاج + النقل خلال نحو 30 يوم عمل', 'ابحث عن العجلات وتوافق السيارة والتشطيبات…', 'اللغة', 'اختيار اللغة', 'فتح التنقل', 'مختبر التوافق', 'التسوق حسب السيارة', 'عن CIRUI', 'رياضة المحركات', 'المجلة', 'مساعدة التوافق', '策锐官网 · الموقع العالمي الرسمي', 'عجلات مطروقة مخصصة مباشرة من المصنع وفق السيارة والتوافق والتشطيب بدقة.', 'عجلات مطروقة', 'جميع تصاميم العجلات', 'توافق مخصص', 'الأدوات', 'معاينة على صورة السيارة', 'مجلة التوافق', 'آراء العملاء', 'المصنع + التوصيل', 'التصنيع', 'توصيل DDP', 'اتصل بنا', 'الطلبات + الشركاء', 'تتبع الطلب', 'حسابي', 'برنامج الجملة', 'مساعدة التوافق عبر WhatsApp', 'تُستخدم أسماء مصنّعي المركبات فقط لتحديد التوافق. CIRUI Forged غير تابعة لهؤلاء المصنعين ولا معتمدة منهم.', 'الشروط · الخصوصية · CCPA', 'باستخدام CIRUI، فإنك توافق على سياسة ملفات تعريف الارتباط وتحليلات التوافق.'],
  nl: ['CIRUI-bronfabriek', 'DDP-levering beschikbaar', 'Doel: productie + transport in circa 30 werkdagen', 'Zoek wielen, voertuigfitment, afwerkingen…', 'Taal', 'Taalkeuze', 'Navigatie openen', 'Fitmentlab', 'Shop op voertuig', 'Over CIRUI', 'Motorsport', 'Journaal', 'Fitmenthulp', '策锐官网 · OFFICIËLE WERELDWIJDE SITE', 'Fabrieksdirecte gesmede maatwielen voor het exacte voertuig, de fitment en afwerking.', 'Gesmede wielen', 'Alle wielontwerpen', 'Fitment op maat', 'Tools', 'Voorbeeld op voertuigfoto', 'Fitmentjournaal', 'Klantfeedback', 'Fabriek + levering', 'Productie', 'DDP-levering', 'Contact', 'Bestellingen + partners', 'Bestelling volgen', 'Mijn account', 'Groothandelsprogramma', 'WhatsApp-fitmenthulp', 'Namen van voertuigfabrikanten worden alleen gebruikt om compatibiliteit aan te duiden. CIRUI Forged is niet verbonden met of goedgekeurd door deze fabrikanten.', 'Voorwaarden · Privacy · CCPA', 'Door CIRUI te gebruiken gaat u akkoord met ons cookiebeleid en fitmentanalyse.'],
  tr: ['CIRUI kaynak fabrika', 'DDP teslimat mevcut', 'Hedef: üretim + taşıma yaklaşık 30 iş günü', 'Jant, araç uyumu ve kaplama ara…', 'Dil', 'Dil seçimi', 'Navigasyonu aç', 'Uyum laboratuvarı', 'Araca göre alışveriş', 'CIRUI hakkında', 'Motor sporları', 'Dergi', 'Uyum desteği', '策锐官网 · RESMÎ KÜRESEL SİTE', 'Tam araç, uyum ve kaplamaya göre fabrikadan doğrudan özel dövme jantlar.', 'Dövme jantlar', 'Tüm jant tasarımları', 'Özel uyum', 'Araçlar', 'Araç fotoğrafında önizleme', 'Uyum dergisi', 'Müşteri görüşleri', 'Fabrika + teslimat', 'Üretim', 'DDP teslimat', 'İletişim', 'Siparişler + ortaklar', 'Sipariş takibi', 'Hesabım', 'Toptan satış programı', 'WhatsApp uyum desteği', 'Araç üreticisi adları yalnızca uyumluluğu tanımlamak için kullanılır. CIRUI Forged bu üreticilerle bağlantılı değildir veya onlar tarafından desteklenmez.', 'Şartlar · Gizlilik · CCPA', 'CIRUI’yi kullanarak çerez politikamızı ve uyum analizini kabul edersiniz.'],
  pl: ['Fabryka źródłowa CIRUI', 'Dostawa DDP dostępna', 'Cel: produkcja + transport w około 30 dni roboczych', 'Szukaj felg, dopasowania pojazdu, wykończeń…', 'Język', 'Wybór języka', 'Otwórz nawigację', 'Laboratorium dopasowania', 'Kupuj według pojazdu', 'O CIRUI', 'Motorsport', 'Magazyn', 'Pomoc w dopasowaniu', '策锐官网 · OFICJALNA STRONA GLOBALNA', 'Kute felgi na zamówienie prosto z fabryki, dopasowane do konkretnego pojazdu, parametrów i wykończenia.', 'Kute felgi', 'Wszystkie wzory felg', 'Dopasowanie na zamówienie', 'Narzędzia', 'Podgląd na zdjęciu pojazdu', 'Magazyn o dopasowaniu', 'Opinie klientów', 'Fabryka + dostawa', 'Produkcja', 'Dostawa DDP', 'Kontakt', 'Zamówienia + partnerzy', 'Śledź zamówienie', 'Moje konto', 'Program hurtowy', 'Pomoc w dopasowaniu przez WhatsApp', 'Nazwy producentów pojazdów służą wyłącznie do identyfikacji kompatybilności. CIRUI Forged nie jest powiązana ani wspierana przez tych producentów.', 'Warunki · Prywatność · CCPA', 'Korzystając z CIRUI, akceptujesz politykę plików cookie i analizę dopasowania.'],
  vi: ['Nhà máy nguồn CIRUI', 'Có giao hàng DDP', 'Mục tiêu: sản xuất + vận chuyển trong khoảng 30 ngày làm việc', 'Tìm mâm, độ tương thích xe, bề mặt hoàn thiện…', 'Ngôn ngữ', 'Chọn ngôn ngữ', 'Mở điều hướng', 'Phòng thí nghiệm tương thích', 'Mua theo xe', 'Về CIRUI', 'Đua xe thể thao', 'Tạp chí', 'Hỗ trợ tương thích', '策锐官网 · TRANG TOÀN CẦU CHÍNH THỨC', 'Mâm rèn tùy chỉnh trực tiếp từ nhà máy, theo đúng xe, thông số và bề mặt hoàn thiện.', 'Mâm rèn', 'Tất cả thiết kế mâm', 'Tương thích tùy chỉnh', 'Công cụ', 'Xem trước trên ảnh xe', 'Tạp chí tương thích', 'Phản hồi khách hàng', 'Nhà máy + giao hàng', 'Sản xuất', 'Giao hàng DDP', 'Liên hệ', 'Đơn hàng + đối tác', 'Theo dõi đơn hàng', 'Tài khoản của tôi', 'Chương trình bán sỉ', 'Hỗ trợ tương thích qua WhatsApp', 'Tên nhà sản xuất xe chỉ được dùng để xác định khả năng tương thích. CIRUI Forged không liên kết hoặc được các nhà sản xuất đó chứng thực.', 'Điều khoản · Quyền riêng tư · CCPA', 'Khi sử dụng CIRUI, bạn đồng ý với chính sách cookie và phân tích tương thích.'],
  th: ['โรงงานต้นทาง CIRUI', 'มีบริการจัดส่ง DDP', 'เป้าหมาย: ผลิต + ขนส่งประมาณ 30 วันทำการ', 'ค้นหาล้อ ความเข้ากันได้ของรถ และงานผิว…', 'ภาษา', 'เลือกภาษา', 'เปิดเมนูนำทาง', 'ห้องทดลองความเข้ากันได้', 'เลือกซื้อตามรถ', 'เกี่ยวกับ CIRUI', 'มอเตอร์สปอร์ต', 'บทความ', 'ช่วยเหลือด้านความเข้ากันได้', '策锐官网 · เว็บไซต์สากลอย่างเป็นทางการ', 'ล้อฟอร์จสั่งทำตรงจากโรงงานตามรถ ขนาดติดตั้ง และงานผิวที่แม่นยำ', 'ล้อฟอร์จ', 'ดีไซน์ล้อทั้งหมด', 'ความเข้ากันได้แบบสั่งทำ', 'เครื่องมือ', 'ดูตัวอย่างบนภาพรถ', 'บทความความเข้ากันได้', 'ความคิดเห็นลูกค้า', 'โรงงาน + การจัดส่ง', 'การผลิต', 'จัดส่ง DDP', 'ติดต่อ', 'คำสั่งซื้อ + พันธมิตร', 'ติดตามคำสั่งซื้อ', 'บัญชีของฉัน', 'โปรแกรมขายส่ง', 'ช่วยเหลือผ่าน WhatsApp', 'ชื่อผู้ผลิตรถใช้เพื่อระบุความเข้ากันได้เท่านั้น CIRUI Forged ไม่มีความเกี่ยวข้องหรือการรับรองจากผู้ผลิตเหล่านั้น', 'ข้อกำหนด · ความเป็นส่วนตัว · CCPA', 'การใช้ CIRUI ถือว่าคุณยอมรับนโยบายคุกกี้และการวิเคราะห์ความเข้ากันได้'],
  id: ['Pabrik sumber CIRUI', 'Pengiriman DDP tersedia', 'Target: produksi + transportasi sekitar 30 hari kerja', 'Cari velg, kecocokan kendaraan, finishing…', 'Bahasa', 'Pilihan bahasa', 'Buka navigasi', 'Laboratorium kecocokan', 'Belanja berdasarkan kendaraan', 'Tentang CIRUI', 'Motorsport', 'Jurnal', 'Bantuan kecocokan', '策锐官网 · SITUS GLOBAL RESMI', 'Velg forged kustom langsung dari pabrik untuk kendaraan, kecocokan, dan finishing yang tepat.', 'Velg forged', 'Semua desain velg', 'Kecocokan kustom', 'Alat', 'Pratinjau pada foto kendaraan', 'Jurnal kecocokan', 'Ulasan pelanggan', 'Pabrik + pengiriman', 'Produksi', 'Pengiriman DDP', 'Kontak', 'Pesanan + mitra', 'Lacak pesanan', 'Akun saya', 'Program grosir', 'Bantuan kecocokan WhatsApp', 'Nama produsen kendaraan hanya digunakan untuk mengidentifikasi kompatibilitas. CIRUI Forged tidak berafiliasi atau didukung oleh produsen tersebut.', 'Ketentuan · Privasi · CCPA', 'Dengan menggunakan CIRUI, Anda menyetujui kebijakan cookie dan analitik kecocokan kami.'],
  hi: ['CIRUI स्रोत फैक्ट्री', 'DDP डिलीवरी उपलब्ध', 'लक्ष्य: उत्पादन + परिवहन लगभग 30 कार्य दिवस', 'व्हील, वाहन फिटमेंट और फिनिश खोजें…', 'भाषा', 'भाषा चयन', 'नेविगेशन खोलें', 'फिटमेंट लैब', 'वाहन के अनुसार खरीदें', 'CIRUI के बारे में', 'मोटरस्पोर्ट', 'जर्नल', 'फिटमेंट सहायता', '策锐官网 · आधिकारिक वैश्विक साइट', 'सटीक वाहन, फिटमेंट और फिनिश के अनुसार फैक्ट्री-डायरेक्ट कस्टम फोर्ज्ड व्हील।', 'फोर्ज्ड व्हील', 'सभी व्हील डिज़ाइन', 'कस्टम फिटमेंट', 'टूल्स', 'वाहन फोटो पर पूर्वावलोकन', 'फिटमेंट जर्नल', 'ग्राहक प्रतिक्रिया', 'फैक्ट्री + डिलीवरी', 'निर्माण', 'DDP डिलीवरी', 'संपर्क', 'ऑर्डर + साझेदार', 'ऑर्डर ट्रैक करें', 'मेरा खाता', 'थोक कार्यक्रम', 'WhatsApp फिटमेंट सहायता', 'वाहन निर्माताओं के नाम केवल अनुकूलता पहचानने के लिए उपयोग किए जाते हैं। CIRUI Forged उन निर्माताओं से संबद्ध या समर्थित नहीं है।', 'शर्तें · गोपनीयता · CCPA', 'CIRUI का उपयोग करके आप हमारी कुकी नीति और फिटमेंट एनालिटिक्स से सहमत होते हैं।']
};

Object.entries(siteChromeTranslations).forEach(([locale, values]) => {
  if (!localeDictionaries[locale]) return;
  Object.assign(localeDictionaries[locale], Object.fromEntries(siteChromeTranslationKeys.map((key, index) => [key, values[index] || key])));
});

// Keep the complete navigation usable without waiting for the public machine-
// translation fallback. These labels are part of the interaction chrome, so
// they must switch immediately and remain available when a visitor is offline.
const navigationChromeTranslationKeys = [
  'Automatic',
  'Close navigation',
  'Customization',
  'Factory',
  'Trade & DDP',
  'RFQ list',
  'Forged wheel catalog',
  'Wheel construction',
  'All forged wheels',
  'Monoblock forged',
  '2-piece forged',
  'Aero & floating',
  'SUV & off-road',
  'Fitment tools',
  'Vehicle fitment',
  'Brake clearance',
  'Vehicle photo visualizer',
  'Offset & stance calculator',
  'Finishes & colors',
  'Lip profiles',
  'Center caps',
  'Hardware options',
  'Factory & trade',
  'Meet the factory',
  'DDP Europe & North America',
  'Dealer & wholesale',
  'Track my order',
  'Open RFQ list'
];

const navigationChromeTranslations = {
  'zh-CN': '自动|关闭导航|定制选项|工厂|外贸与 DDP|询价清单|锻造轮毂目录|轮毂结构|全部锻造轮毂|单片式锻造|双片式锻造|空气动力学与悬浮式|SUV 与越野|适配工具|车辆适配|刹车间隙|车辆照片效果预览|ET 与姿态计算器|表面处理与颜色|轮唇造型|中心盖|螺丝配件选项|工厂与外贸|了解工厂|欧洲与北美 DDP|经销与批发|查询我的订单|打开询价清单'.split('|'),
  'zh-TW': '自動|關閉導覽|客製選項|工廠|外貿與 DDP|詢價清單|鍛造輪圈目錄|輪圈結構|全部鍛造輪圈|單片式鍛造|雙片式鍛造|空氣動力學與懸浮式|SUV 與越野|適配工具|車輛適配|煞車間隙|車輛照片效果預覽|ET 與姿態計算器|表面處理與顏色|輪唇造型|中心蓋|螺絲配件選項|工廠與外貿|了解工廠|歐洲與北美 DDP|經銷與批發|查詢我的訂單|開啟詢價清單'.split('|'),
  ja: '自動|ナビゲーションを閉じる|カスタマイズ|工場|取引・DDP|見積依頼リスト|鍛造ホイールカタログ|ホイール構造|すべての鍛造ホイール|1ピース鍛造|2ピース鍛造|エアロ＆フローティング|SUV・オフロード|フィットメントツール|車両フィットメント|ブレーキクリアランス|車両写真シミュレーター|オフセット＆スタンス計算|仕上げ・カラー|リムプロファイル|センターキャップ|ハードウェアオプション|工場・取引|工場について|欧州・北米 DDP|ディーラー・卸売|注文を追跡|見積依頼リストを開く'.split('|'),
  ko: '자동|탐색 메뉴 닫기|커스터마이징|공장|무역 및 DDP|견적 요청 목록|단조 휠 카탈로그|휠 구조|모든 단조 휠|모노블록 단조|2피스 단조|에어로 및 플로팅|SUV 및 오프로드|핏먼트 도구|차량 핏먼트|브레이크 간극|차량 사진 시뮬레이터|오프셋 및 스탠스 계산기|마감 및 색상|립 프로파일|센터 캡|하드웨어 옵션|공장 및 무역|공장 소개|유럽 및 북미 DDP|딜러 및 도매|주문 조회|견적 요청 목록 열기'.split('|'),
  de: 'Automatisch|Navigation schließen|Individualisierung|Werk|Handel & DDP|Angebotsliste|Schmiederad-Katalog|Radkonstruktion|Alle Schmiederäder|Monoblock geschmiedet|2-teilig geschmiedet|Aero & Floating|SUV & Offroad|Fitment-Werkzeuge|Fahrzeug-Fitment|Bremsfreigängigkeit|Vorschau am Fahrzeugfoto|Offset- & Stance-Rechner|Oberflächen & Farben|Felgenbettprofile|Nabenkappen|Hardware-Optionen|Werk & Handel|Werk kennenlernen|DDP Europa & Nordamerika|Händler & Großhandel|Meine Bestellung verfolgen|Angebotsliste öffnen'.split('|'),
  fr: 'Automatique|Fermer la navigation|Personnalisation|Usine|Commerce & DDP|Liste de devis|Catalogue de jantes forgées|Construction de la jante|Toutes les jantes forgées|Forgée monobloc|Forgée en 2 parties|Aéro & flottante|SUV & tout-terrain|Outils de compatibilité|Compatibilité véhicule|Dégagement des freins|Simulateur sur photo du véhicule|Calculateur de déport & stance|Finitions & couleurs|Profils de bord|Cabochons centraux|Options de visserie|Usine & commerce|Découvrir l’usine|DDP Europe & Amérique du Nord|Revendeurs & grossistes|Suivre ma commande|Ouvrir la liste de devis'.split('|'),
  es: 'Automático|Cerrar navegación|Personalización|Fábrica|Comercio y DDP|Lista de cotización|Catálogo de llantas forjadas|Construcción de la llanta|Todas las llantas forjadas|Forjada monobloque|Forjada de 2 piezas|Aero y flotante|SUV y todoterreno|Herramientas de ajuste|Ajuste del vehículo|Espacio para frenos|Simulador en foto del vehículo|Calculadora de offset y postura|Acabados y colores|Perfiles de aro|Tapas centrales|Opciones de tornillería|Fábrica y comercio|Conocer la fábrica|DDP Europa y Norteamérica|Distribuidores y mayoristas|Seguir mi pedido|Abrir lista de cotización'.split('|'),
  it: 'Automatico|Chiudi navigazione|Personalizzazione|Fabbrica|Commercio e DDP|Lista preventivo|Catalogo cerchi forgiati|Costruzione del cerchio|Tutti i cerchi forgiati|Forgiato monoblocco|Forgiato 2 pezzi|Aero e flottante|SUV e fuoristrada|Strumenti di compatibilità|Compatibilità veicolo|Spazio freni|Simulatore su foto veicolo|Calcolatore offset e stance|Finiture e colori|Profili del canale|Coprimozzi|Opzioni hardware|Fabbrica e commercio|Scopri la fabbrica|DDP Europa e Nord America|Rivenditori e ingrosso|Traccia il mio ordine|Apri lista preventivo'.split('|'),
  'pt-BR': 'Automático|Fechar navegação|Personalização|Fábrica|Comércio e DDP|Lista de cotação|Catálogo de rodas forjadas|Construção da roda|Todas as rodas forjadas|Forjada monobloco|Forjada de 2 peças|Aero e flutuante|SUV e off-road|Ferramentas de compatibilidade|Compatibilidade do veículo|Espaço para freios|Simulador na foto do veículo|Calculadora de offset e postura|Acabamentos e cores|Perfis de borda|Calotas centrais|Opções de ferragens|Fábrica e comércio|Conheça a fábrica|DDP Europa e América do Norte|Revendedores e atacado|Rastrear meu pedido|Abrir lista de cotação'.split('|'),
  ru: 'Автоматически|Закрыть навигацию|Индивидуальная настройка|Завод|Торговля и DDP|Список запросов цены|Каталог кованых дисков|Конструкция диска|Все кованые диски|Моноблочные кованые|Двухсоставные кованые|Аэро и плавающие|SUV и бездорожье|Инструменты фитмента|Подбор по автомобилю|Зазор тормозов|Визуализация на фото автомобиля|Калькулятор вылета и посадки|Отделки и цвета|Профили обода|Центральные колпачки|Варианты крепежа|Завод и торговля|Познакомиться с заводом|DDP Европа и Северная Америка|Дилеры и опт|Отследить мой заказ|Открыть список запросов'.split('|'),
  ar: 'تلقائي|إغلاق التنقل|التخصيص|المصنع|التجارة وDDP|قائمة طلبات الأسعار|كتالوج العجلات المطروقة|بنية العجلة|جميع العجلات المطروقة|مطروقة أحادية القطعة|مطروقة من قطعتين|ديناميكية هوائية وعائمة|SUV والطرق الوعرة|أدوات التوافق|توافق السيارة|خلوص الفرامل|معاينة على صورة السيارة|حاسبة الإزاحة والوقفة|التشطيبات والألوان|أشكال الحافة|أغطية المركز|خيارات المكونات|المصنع والتجارة|تعرّف على المصنع|DDP لأوروبا وأمريكا الشمالية|الوكلاء والجملة|تتبع طلبي|فتح قائمة طلبات الأسعار'.split('|'),
  nl: 'Automatisch|Navigatie sluiten|Maatwerk|Fabriek|Handel & DDP|Offertelijst|Catalogus gesmede wielen|Wielconstructie|Alle gesmede wielen|Monoblock gesmeed|2-delig gesmeed|Aero & floating|SUV & offroad|Fitmenttools|Voertuigfitment|Remspeling|Voorbeeld op voertuigfoto|Offset- & stancecalculator|Afwerkingen & kleuren|Velgrandprofielen|Naafdoppen|Hardwareopties|Fabriek & handel|Bekijk de fabriek|DDP Europa & Noord-Amerika|Dealers & groothandel|Mijn bestelling volgen|Offertelijst openen'.split('|'),
  tr: 'Otomatik|Navigasyonu kapat|Özelleştirme|Fabrika|Ticaret ve DDP|Teklif listesi|Dövme jant kataloğu|Jant yapısı|Tüm dövme jantlar|Monoblok dövme|2 parçalı dövme|Aero ve yüzer|SUV ve arazi|Uyum araçları|Araç uyumu|Fren boşluğu|Araç fotoğrafı önizleyici|Ofset ve duruş hesaplayıcı|Kaplamalar ve renkler|Dudak profilleri|Orta kapaklar|Donanım seçenekleri|Fabrika ve ticaret|Fabrikayı tanıyın|Avrupa ve Kuzey Amerika DDP|Bayi ve toptan satış|Siparişimi takip et|Teklif listesini aç'.split('|'),
  pl: 'Automatycznie|Zamknij nawigację|Personalizacja|Fabryka|Handel i DDP|Lista zapytań|Katalog kutych felg|Konstrukcja felgi|Wszystkie kute felgi|Kute monoblokowe|Kute 2-częściowe|Aero i pływające|SUV i off-road|Narzędzia dopasowania|Dopasowanie pojazdu|Prześwit hamulców|Podgląd na zdjęciu pojazdu|Kalkulator odsadzenia i stance|Wykończenia i kolory|Profile rantu|Dekielki centralne|Opcje osprzętu|Fabryka i handel|Poznaj fabrykę|DDP Europa i Ameryka Północna|Dealerzy i hurt|Śledź moje zamówienie|Otwórz listę zapytań'.split('|'),
  vi: 'Tự động|Đóng điều hướng|Tùy chỉnh|Nhà máy|Thương mại & DDP|Danh sách báo giá|Danh mục mâm rèn|Kết cấu mâm|Tất cả mâm rèn|Mâm rèn nguyên khối|Mâm rèn 2 mảnh|Khí động học & nổi|SUV & địa hình|Công cụ tương thích|Tương thích xe|Khoảng hở phanh|Xem trước trên ảnh xe|Bộ tính offset & dáng xe|Bề mặt & màu sắc|Kiểu vành mâm|Nắp chụp tâm|Tùy chọn phụ kiện|Nhà máy & thương mại|Khám phá nhà máy|DDP Châu Âu & Bắc Mỹ|Đại lý & bán sỉ|Theo dõi đơn hàng|Mở danh sách báo giá'.split('|'),
  th: 'อัตโนมัติ|ปิดเมนูนำทาง|การปรับแต่ง|โรงงาน|การค้าและ DDP|รายการขอใบเสนอราคา|แค็ตตาล็อกล้อฟอร์จ|โครงสร้างล้อ|ล้อฟอร์จทั้งหมด|ฟอร์จชิ้นเดียว|ฟอร์จ 2 ชิ้น|แอโรและแบบลอย|SUV และออฟโรด|เครื่องมือความเข้ากันได้|ความเข้ากันได้ของรถ|ระยะห่างเบรก|ตัวอย่างบนภาพรถ|เครื่องคำนวณออฟเซ็ตและสแตนซ์|งานผิวและสี|รูปแบบขอบล้อ|ฝาครอบดุมกลาง|ตัวเลือกฮาร์ดแวร์|โรงงานและการค้า|รู้จักโรงงาน|DDP ยุโรปและอเมริกาเหนือ|ตัวแทนจำหน่ายและขายส่ง|ติดตามคำสั่งซื้อของฉัน|เปิดรายการขอใบเสนอราคา'.split('|'),
  id: 'Otomatis|Tutup navigasi|Kustomisasi|Pabrik|Perdagangan & DDP|Daftar penawaran|Katalog velg forged|Konstruksi velg|Semua velg forged|Forged monoblok|Forged 2 bagian|Aero & floating|SUV & off-road|Alat fitment|Fitment kendaraan|Jarak bebas rem|Pratinjau pada foto kendaraan|Kalkulator offset & stance|Finishing & warna|Profil bibir velg|Tutup tengah|Opsi hardware|Pabrik & perdagangan|Kenali pabrik|DDP Eropa & Amerika Utara|Dealer & grosir|Lacak pesanan saya|Buka daftar penawaran'.split('|'),
  hi: 'स्वचालित|नेविगेशन बंद करें|कस्टमाइज़ेशन|फैक्ट्री|व्यापार और DDP|कोटेशन सूची|फोर्ज्ड व्हील कैटलॉग|व्हील संरचना|सभी फोर्ज्ड व्हील|मोनोब्लॉक फोर्ज्ड|2-पीस फोर्ज्ड|एयरो और फ्लोटिंग|SUV और ऑफ-रोड|फिटमेंट टूल|वाहन फिटमेंट|ब्रेक क्लियरेंस|वाहन फोटो प्रीव्यू|ऑफसेट और स्टांस कैलकुलेटर|फिनिश और रंग|लिप प्रोफाइल|सेंटर कैप|हार्डवेयर विकल्प|फैक्ट्री और व्यापार|फैक्ट्री देखें|यूरोप और उत्तरी अमेरिका DDP|डीलर और थोक|मेरा ऑर्डर ट्रैक करें|कोटेशन सूची खोलें'.split('|')
};

Object.entries(navigationChromeTranslations).forEach(([locale, values]) => {
  if (!localeDictionaries[locale]) return;
  Object.assign(localeDictionaries[locale], Object.fromEntries(navigationChromeTranslationKeys.map((key, index) => [key, values[index] || key])));
});

const engineeringChromeTranslations = {
  en: 'Engineering',
  'zh-CN': '工程技术',
  'zh-TW': '工程技術',
  ja: 'エンジニアリング',
  ko: '엔지니어링',
  de: 'Technik',
  fr: 'Ingénierie',
  es: 'Ingeniería',
  it: 'Ingegneria',
  'pt-BR': 'Engenharia',
  ru: 'Инженерия',
  ar: 'الهندسة',
  nl: 'Engineering',
  tr: 'Mühendislik',
  pl: 'Inżynieria',
  vi: 'Kỹ thuật',
  th: 'วิศวกรรม',
  id: 'Rekayasa',
  hi: 'इंजीनियरिंग'
};
Object.entries(engineeringChromeTranslations).forEach(([locale, value]) => {
  if (localeDictionaries[locale]) localeDictionaries[locale].Engineering = value;
});

const homeIntroTranslationKeys = [
  'CIRUI FORGED · OFFICIAL GLOBAL SITE',
  'Forged at the source.',
  'Fitted to your car.',
  '策锐官网 is the official overseas website of CIRUI Forged — a source wheel factory turning your exact vehicle, stance and finish into a production-ready forged wheel.',
  'Build my exact fitment',
  'Meet the factory',
  'Factory direct',
  'Design · forge · machine · finish',
  '3-angle preview',
  'See it on your car before production',
  'DDP available',
  'Clearer landed delivery for global buyers',
  'Exact vehicle fitment',
  'Custom forged design',
  'Factory production',
  'DDP delivery support',
  'Source wheel factory',
  'Real production, machining and finished inventory.',
  'Made to your numbers',
  'Diameter, width, PCD, ET, CB and brake clearance.',
  'Preview before production',
  'Upload a vehicle photo and generate three wheel views.',
  'About 30 business days',
  'Target production + delivery timing, confirmed per destination.',
  'FITMENT FIRST',
  'Start with the car.',
  'Not a generic wheel.',
  'Compatibility is the high-risk part of buying wheels online. Start with the exact platform so the wheel drawing can account for the hub, brakes, suspension, tire envelope and intended use.',
  'PCD + center bore',
  'Front + rear ET',
  'Caliper clearance',
  'Street + show + track',
  '01 / Vehicle brief',
  'Tell CIRUI what you drive.',
  'The existing fitment calculator remains the engineering core of the site.',
  'Open fitment lab',
  'Loading CIRUI Visual Studio…'
];

const homeIntroTranslations = {
  'zh-CN': ['CIRUI 锻造 · 官方海外网站', '源头锻造。', '为你的车精准适配。', '策锐官网 是 CIRUI 策锐锻造的官方海外网站。我们是一家源头轮毂工厂，把你的准确车型、姿态与表面处理转化为可生产的定制锻造轮毂。', '开始精准适配', '了解工厂', '工厂直供', '设计 · 锻造 · 加工 · 表面处理', '3 角度效果预览', '生产前先看上车效果', '支持 DDP', '让海外买家更清楚掌握到门成本', '准确车型适配', '定制锻造设计', '工厂生产', 'DDP 配送支持', '源头轮毂工厂', '真实生产、机加工与成品库存。', '按你的参数制造', '直径、宽度、PCD、ET、CB 与刹车间隙。', '生产前预览', '上传车辆照片，生成三个角度的轮毂效果。', '约 30 个工作日', '生产 + 配送目标时间按目的地最终确认。', '适配优先', '从车辆开始。', '不是通用轮毂。', '网购轮毂最大的风险是适配。先选定准确平台，让轮毂图纸同时考虑轴头、刹车、悬挂、轮胎包络与使用场景。', 'PCD + 中心孔', '前 + 后 ET', '卡钳间隙', '街道 + 展示 + 赛道', '01 / 车辆需求', '告诉 CIRUI 你开什么车。', '现有定制适配计算器仍是网站的工程核心。', '打开适配实验室', '正在加载 CIRUI 效果工作室…'],
  'zh-TW': ['CIRUI 鍛造 · 官方海外網站', '源頭鍛造。', '為你的車精準適配。', '策锐官网 是 CIRUI 策銳鍛造的官方海外網站。我們是源頭輪圈工廠，將你的準確車型、姿態與表面處理轉化為可生產的客製鍛造輪圈。', '開始精準適配', '了解工廠', '工廠直供', '設計 · 鍛造 · 加工 · 表面處理', '3 角度效果預覽', '生產前先看上車效果', '支援 DDP', '讓海外買家更清楚掌握到門成本', '準確車型適配', '客製鍛造設計', '工廠生產', 'DDP 配送支援', '源頭輪圈工廠', '真實生產、機加工與成品庫存。', '依你的參數製造', '直徑、寬度、PCD、ET、CB 與煞車間隙。', '生產前預覽', '上傳車輛照片，產生三個角度的輪圈效果。', '約 30 個工作日', '生產 + 配送目標時間依目的地最終確認。', '適配優先', '從車輛開始。', '不是通用輪圈。', '網購輪圈最大的風險是適配。先選定準確平台，讓輪圈圖紙同時考慮軸頭、煞車、懸吊、輪胎包絡與使用場景。', 'PCD + 中心孔', '前 + 後 ET', '卡鉗間隙', '街道 + 展示 + 賽道', '01 / 車輛需求', '告訴 CIRUI 你開什麼車。', '現有客製適配計算器仍是網站的工程核心。', '開啟適配實驗室', '正在載入 CIRUI 效果工作室…'],
  ja: ['CIRUI FORGED · 公式グローバルサイト', '製造元で鍛造。', 'あなたの車に正確に適合。', '策锐官网はCIRUI Forgedの公式海外サイトです。製造元のホイール工場として、正確な車種、スタンス、仕上げを生産可能なカスタム鍛造ホイールへ落とし込みます。', '正確なフィットメントを作る', '工場を見る', '工場直販', '設計 · 鍛造 · 加工 · 仕上げ', '3方向プレビュー', '生産前に装着イメージを確認', 'DDP対応', '海外購入者にも分かりやすい着地コスト', '正確な車両フィットメント', 'カスタム鍛造デザイン', '工場生産', 'DDP配送サポート', '製造元ホイール工場', '実際の生産、機械加工、完成品在庫。', 'あなたの数値で製作', '直径、幅、PCD、ET、CB、ブレーキクリアランス。', '生産前プレビュー', '車両写真をアップロードし、3方向のホイール表示を生成。', '約30営業日', '生産＋配送の目安は目的地ごとに確定します。', 'フィットメント優先', 'まず車から。', '汎用ホイールではありません。', 'オンラインでホイールを買う最大のリスクは適合です。正確な車両から始め、ハブ、ブレーキ、サスペンション、タイヤ外形、用途を図面に反映します。', 'PCD + センターボア', 'フロント + リアET', 'キャリパークリアランス', 'ストリート + ショー + サーキット', '01 / 車両情報', 'お車をCIRUIに教えてください。', '既存のフィットメント計算機がサイトの技術的な中核です。', 'フィットメントラボを開く', 'CIRUIビジュアルスタジオを読み込み中…'],
  ko: ['CIRUI FORGED · 공식 글로벌 사이트', '원천에서 단조.', '내 차에 정확히 장착.', '策锐官网는 CIRUI Forged의 공식 해외 웹사이트입니다. 원천 휠 공장으로서 정확한 차량, 자세와 마감을 생산 가능한 커스텀 단조 휠로 구현합니다.', '정확한 핏먼트 시작', '공장 보기', '공장 직영', '설계 · 단조 · 가공 · 마감', '3각도 미리보기', '생산 전 내 차에서 확인', 'DDP 가능', '해외 구매자의 도착 비용을 더 명확하게', '정확한 차량 핏먼트', '커스텀 단조 디자인', '공장 생산', 'DDP 배송 지원', '원천 휠 공장', '실제 생산, 가공 및 완제품 재고.', '내 수치에 맞춰 제작', '직경, 폭, PCD, ET, CB 및 브레이크 간극.', '생산 전 미리보기', '차량 사진을 업로드해 3개 각도의 휠 모습을 생성하세요.', '약 30영업일', '생산 + 배송 목표 일정은 목적지별로 확정됩니다.', '핏먼트 우선', '차량에서 시작하세요.', '범용 휠이 아닙니다.', '온라인 휠 구매의 가장 큰 위험은 호환성입니다. 정확한 플랫폼부터 시작해 허브, 브레이크, 서스펜션, 타이어 공간과 용도를 도면에 반영합니다.', 'PCD + 센터 보어', '앞 + 뒤 ET', '캘리퍼 간극', '스트리트 + 쇼 + 트랙', '01 / 차량 정보', '어떤 차를 타는지 CIRUI에 알려주세요.', '기존 핏먼트 계산기는 사이트의 엔지니어링 핵심으로 유지됩니다.', '핏먼트 랩 열기', 'CIRUI 비주얼 스튜디오 로딩 중…'],
  de: ['CIRUI FORGED · OFFIZIELLE GLOBALE WEBSITE', 'An der Quelle geschmiedet.', 'Für Ihr Fahrzeug angepasst.', '策锐官网 ist die offizielle internationale Website von CIRUI Forged – einem Herstellerwerk, das Ihr genaues Fahrzeug, die gewünschte Haltung und das Finish in ein produktionsreifes Schmiederad überführt.', 'Mein exaktes Fitment erstellen', 'Das Werk kennenlernen', 'Direkt ab Werk', 'Design · Schmieden · Bearbeiten · Finish', '3-Perspektiven-Vorschau', 'Vor der Produktion am eigenen Auto ansehen', 'DDP verfügbar', 'Transparentere Gesamtkosten für internationale Käufer', 'Exaktes Fahrzeug-Fitment', 'Individuelles Schmiederad-Design', 'Fertigung im Werk', 'DDP-Lieferservice', 'Herstellerwerk für Räder', 'Echte Produktion, Bearbeitung und Fertigradbestand.', 'Nach Ihren Maßen gefertigt', 'Durchmesser, Breite, PCD, ET, CB und Bremsfreigang.', 'Vorschau vor der Produktion', 'Fahrzeugfoto hochladen und drei Radansichten erzeugen.', 'Etwa 30 Werktage', 'Zielzeit für Produktion + Lieferung, je Zielort bestätigt.', 'FITMENT ZUERST', 'Beginnen Sie mit dem Fahrzeug.', 'Kein universelles Rad.', 'Die Passgenauigkeit ist das größte Risiko beim Online-Radkauf. Beginnen Sie mit der genauen Plattform, damit Nabe, Bremsen, Fahrwerk, Reifenraum und Einsatzzweck in die Zeichnung einfließen.', 'PCD + Mittenbohrung', 'ET vorne + hinten', 'Bremssattelfreigang', 'Straße + Show + Rennstrecke', '01 / Fahrzeugbrief', 'Sagen Sie CIRUI, was Sie fahren.', 'Der vorhandene Fitment-Rechner bleibt der technische Kern der Website.', 'Fitment-Labor öffnen', 'CIRUI Visual Studio wird geladen…'],
  fr: ['CIRUI FORGED · SITE MONDIAL OFFICIEL', 'Forgées à la source.', 'Adaptées à votre voiture.', '策锐官网 est le site international officiel de CIRUI Forged, une usine de jantes qui transforme votre véhicule exact, sa posture et sa finition en jantes forgées sur mesure prêtes à produire.', 'Créer ma compatibilité exacte', 'Découvrir l’usine', 'Direct usine', 'Conception · forge · usinage · finition', 'Aperçu sous 3 angles', 'Visualisez-les sur votre voiture avant production', 'DDP disponible', 'Un coût rendu plus clair pour les acheteurs internationaux', 'Compatibilité exacte du véhicule', 'Design forgé sur mesure', 'Production en usine', 'Assistance livraison DDP', 'Usine de jantes source', 'Production, usinage et stock de jantes finies réels.', 'Fabriquées selon vos mesures', 'Diamètre, largeur, PCD, ET, CB et dégagement des freins.', 'Aperçu avant production', 'Importez une photo du véhicule et générez trois vues des jantes.', 'Environ 30 jours ouvrés', 'Délai cible de production + livraison confirmé selon la destination.', 'LA COMPATIBILITÉ D’ABORD', 'Commencez par la voiture.', 'Pas une jante générique.', 'La compatibilité est le principal risque lors de l’achat de jantes en ligne. Commencez par la plateforme exacte afin que le moyeu, les freins, la suspension, l’enveloppe du pneu et l’usage soient intégrés au plan.', 'PCD + alésage central', 'ET avant + arrière', 'Dégagement de l’étrier', 'Route + exposition + circuit', '01 / Fiche véhicule', 'Indiquez à CIRUI ce que vous conduisez.', 'Le calculateur de compatibilité existant reste le cœur technique du site.', 'Ouvrir le laboratoire', 'Chargement du Studio Visuel CIRUI…'],
  es: ['CIRUI FORGED · SITIO GLOBAL OFICIAL', 'Forjadas en origen.', 'Ajustadas a tu coche.', '策锐官网 es el sitio internacional oficial de CIRUI Forged, una fábrica de llantas que convierte tu vehículo exacto, postura y acabado en una llanta forjada lista para producción.', 'Crear mi ajuste exacto', 'Conocer la fábrica', 'Directo de fábrica', 'Diseño · forja · mecanizado · acabado', 'Vista previa en 3 ángulos', 'Míralas en tu coche antes de producirlas', 'DDP disponible', 'Coste final más claro para compradores internacionales', 'Ajuste exacto del vehículo', 'Diseño forjado a medida', 'Producción en fábrica', 'Soporte de entrega DDP', 'Fábrica de llantas de origen', 'Producción, mecanizado e inventario terminado reales.', 'Fabricadas con tus medidas', 'Diámetro, ancho, PCD, ET, CB y espacio para frenos.', 'Vista previa antes de producción', 'Sube una foto del vehículo y genera tres vistas de las llantas.', 'Unos 30 días laborables', 'Plazo objetivo de producción + entrega, confirmado por destino.', 'PRIMERO EL AJUSTE', 'Empieza por el coche.', 'No por una llanta genérica.', 'La compatibilidad es el mayor riesgo al comprar llantas online. Empieza por la plataforma exacta para que el dibujo contemple buje, frenos, suspensión, espacio del neumático y uso previsto.', 'PCD + buje central', 'ET delantero + trasero', 'Espacio para la pinza', 'Calle + exposición + circuito', '01 / Datos del vehículo', 'Dile a CIRUI qué conduces.', 'El calculador de compatibilidad existente sigue siendo el núcleo técnico del sitio.', 'Abrir laboratorio de compatibilidad', 'Cargando CIRUI Visual Studio…'],
  it: ['CIRUI FORGED · SITO GLOBALE UFFICIALE', 'Forgiati alla fonte.', 'Adattati alla tua auto.', '策锐官网 è il sito internazionale ufficiale di CIRUI Forged, una fabbrica di cerchi che trasforma veicolo, assetto e finitura esatti in un cerchio forgiato pronto per la produzione.', 'Crea il mio fitment esatto', 'Scopri la fabbrica', 'Diretto dalla fabbrica', 'Design · forgiatura · lavorazione · finitura', 'Anteprima a 3 angoli', 'Guardali sulla tua auto prima della produzione', 'DDP disponibile', 'Costo a destinazione più chiaro per gli acquirenti internazionali', 'Fitment esatto del veicolo', 'Design forgiato su misura', 'Produzione in fabbrica', 'Supporto consegna DDP', 'Fabbrica di cerchi', 'Produzione, lavorazione e scorte finite reali.', 'Realizzati secondo le tue misure', 'Diametro, larghezza, PCD, ET, CB e spazio freni.', 'Anteprima prima della produzione', 'Carica una foto del veicolo e genera tre viste dei cerchi.', 'Circa 30 giorni lavorativi', 'Tempi obiettivo di produzione + consegna confermati per destinazione.', 'PRIMA IL FITMENT', 'Parti dall’auto.', 'Non da un cerchio generico.', 'La compatibilità è il rischio principale nell’acquisto online. Parti dalla piattaforma esatta, così il disegno considera mozzo, freni, sospensioni, ingombro pneumatici e utilizzo.', 'PCD + foro centrale', 'ET anteriore + posteriore', 'Spazio pinza', 'Strada + show + pista', '01 / Dati veicolo', 'Dì a CIRUI cosa guidi.', 'Il calcolatore di fitment esistente resta il cuore tecnico del sito.', 'Apri laboratorio di fitment', 'Caricamento di CIRUI Visual Studio…'],
  'pt-BR': ['CIRUI FORGED · SITE GLOBAL OFICIAL', 'Forjadas na origem.', 'Ajustadas ao seu carro.', '策锐官网 é o site internacional oficial da CIRUI Forged, uma fábrica de rodas que transforma seu veículo exato, postura e acabamento em uma roda forjada pronta para produção.', 'Criar meu encaixe exato', 'Conhecer a fábrica', 'Direto da fábrica', 'Design · forja · usinagem · acabamento', 'Prévia em 3 ângulos', 'Veja no seu carro antes da produção', 'DDP disponível', 'Custo final mais claro para compradores internacionais', 'Encaixe exato do veículo', 'Design forjado sob medida', 'Produção na fábrica', 'Suporte de entrega DDP', 'Fábrica de rodas de origem', 'Produção, usinagem e estoque acabado reais.', 'Feitas com suas medidas', 'Diâmetro, largura, PCD, ET, CB e folga dos freios.', 'Prévia antes da produção', 'Envie uma foto do veículo e gere três vistas das rodas.', 'Cerca de 30 dias úteis', 'Prazo-alvo de produção + entrega confirmado por destino.', 'ENCAIXE PRIMEIRO', 'Comece pelo carro.', 'Não por uma roda genérica.', 'A compatibilidade é o maior risco na compra online. Comece pela plataforma exata para que cubo, freios, suspensão, espaço do pneu e uso previsto entrem no desenho.', 'PCD + furo central', 'ET dianteiro + traseiro', 'Folga da pinça', 'Rua + exposição + pista', '01 / Dados do veículo', 'Conte à CIRUI o que você dirige.', 'O calculador de encaixe existente continua sendo o núcleo técnico do site.', 'Abrir laboratório de compatibilidade', 'Carregando o CIRUI Visual Studio…'],
  ru: ['CIRUI FORGED · ОФИЦИАЛЬНЫЙ МЕЖДУНАРОДНЫЙ САЙТ', 'Ковка у источника.', 'Точно под ваш автомобиль.', '策锐官网 — официальный международный сайт CIRUI Forged, завода дисков, который превращает точный автомобиль, посадку и отделку в готовый к производству кованый диск.', 'Создать точный фитмент', 'Познакомиться с заводом', 'Напрямую с завода', 'Дизайн · ковка · обработка · отделка', 'Предпросмотр в 3 ракурсах', 'Посмотрите на своём авто до производства', 'DDP доступна', 'Более понятная итоговая стоимость для зарубежных покупателей', 'Точный фитмент автомобиля', 'Индивидуальный дизайн кованых дисков', 'Заводское производство', 'Поддержка доставки DDP', 'Завод-производитель дисков', 'Реальное производство, обработка и склад готовых дисков.', 'Изготовлено по вашим параметрам', 'Диаметр, ширина, PCD, ET, CB и зазор тормозов.', 'Предпросмотр до производства', 'Загрузите фото автомобиля и создайте три вида дисков.', 'Около 30 рабочих дней', 'Целевой срок производства + доставки подтверждается для каждого направления.', 'СНАЧАЛА ФИТМЕНТ', 'Начните с автомобиля.', 'Не с универсального диска.', 'Совместимость — главный риск покупки дисков онлайн. Начните с точной платформы, чтобы учесть ступицу, тормоза, подвеску, габарит шины и назначение.', 'PCD + центральное отверстие', 'ET спереди + сзади', 'Зазор суппорта', 'Улица + шоу + трек', '01 / Данные автомобиля', 'Расскажите CIRUI, на чём вы ездите.', 'Существующий калькулятор фитмента остаётся инженерным ядром сайта.', 'Открыть лабораторию фитмента', 'Загрузка CIRUI Visual Studio…'],
  ar: ['CIRUI FORGED · الموقع العالمي الرسمي', 'مطروقة في المصدر.', 'ملائمة لسيارتك بدقة.', '策锐官网 هو الموقع الدولي الرسمي لـ CIRUI Forged، مصنع عجلات يحوّل سيارتك الدقيقة ووقفتها وتشطيبها إلى عجلة مطروقة مخصصة جاهزة للإنتاج.', 'إنشاء التوافق الدقيق', 'تعرّف على المصنع', 'مباشرة من المصنع', 'تصميم · طرق · تشغيل · تشطيب', 'معاينة من 3 زوايا', 'شاهدها على سيارتك قبل الإنتاج', 'DDP متاح', 'تكلفة وصول أوضح للمشترين الدوليين', 'توافق دقيق مع السيارة', 'تصميم مطروق مخصص', 'إنتاج المصنع', 'دعم توصيل DDP', 'مصنع العجلات المصدر', 'إنتاج وتشغيل ومخزون نهائي حقيقي.', 'مصنوعة حسب أرقامك', 'القطر والعرض وPCD وET وCB وخلوص المكابح.', 'معاينة قبل الإنتاج', 'ارفع صورة السيارة وأنشئ ثلاث زوايا للعجلات.', 'نحو 30 يوم عمل', 'توقيت الإنتاج + التوصيل المستهدف يؤكد حسب الوجهة.', 'التوافق أولًا', 'ابدأ بالسيارة.', 'وليست عجلة عامة.', 'التوافق هو أكبر مخاطر شراء العجلات عبر الإنترنت. ابدأ بالمنصة الدقيقة حتى يراعي الرسم الصرة والمكابح والتعليق وحيز الإطار والاستخدام المقصود.', 'PCD + الفتحة المركزية', 'ET أمامي + خلفي', 'خلوص الكليبر', 'شارع + عرض + حلبة', '01 / بيانات السيارة', 'أخبر CIRUI بما تقود.', 'تبقى حاسبة التوافق الحالية القلب الهندسي للموقع.', 'فتح مختبر التوافق', 'جارٍ تحميل CIRUI Visual Studio…'],
  nl: ['CIRUI FORGED · OFFICIËLE WERELDWIJDE SITE', 'Gesmeed bij de bron.', 'Passend voor uw auto.', '策锐官网 is de officiële internationale website van CIRUI Forged, een wielfabriek die uw exacte voertuig, houding en afwerking omzet in een productierijp gesmeed wiel.', 'Mijn exacte fitment maken', 'Maak kennis met de fabriek', 'Direct uit de fabriek', 'Ontwerp · smeden · bewerken · afwerken', 'Voorbeeld uit 3 hoeken', 'Bekijk het voor productie op uw auto', 'DDP beschikbaar', 'Duidelijkere totaalprijs voor internationale kopers', 'Exacte voertuigfitment', 'Gesmeed ontwerp op maat', 'Productie in de fabriek', 'DDP-leveringsondersteuning', 'Wielfabriek bij de bron', 'Echte productie, bewerking en voorraad afgewerkte wielen.', 'Gemaakt volgens uw maten', 'Diameter, breedte, PCD, ET, CB en remvrijloop.', 'Voorbeeld vóór productie', 'Upload een voertuigfoto en genereer drie wielaanzichten.', 'Ongeveer 30 werkdagen', 'Streeftijd voor productie + levering, bevestigd per bestemming.', 'FITMENT EERST', 'Begin met de auto.', 'Niet met een generiek wiel.', 'Compatibiliteit is het grootste risico bij online wielen kopen. Begin met het exacte platform zodat naaf, remmen, onderstel, bandenruimte en gebruik in de tekening worden meegenomen.', 'PCD + naafdiameter', 'ET voor + achter', 'Remklauwvrijloop', 'Straat + show + circuit', '01 / Voertuiggegevens', 'Vertel CIRUI wat u rijdt.', 'De bestaande fitmentcalculator blijft de technische kern van de site.', 'Fitmentlab openen', 'CIRUI Visual Studio laden…'],
  tr: ['CIRUI FORGED · RESMÎ KÜRESEL SİTE', 'Kaynağında dövüldü.', 'Aracınıza tam uyumlu.', '策锐官网, CIRUI Forged’un resmî uluslararası sitesidir; kaynak jant fabrikası olarak tam aracınızı, duruşu ve kaplamayı üretime hazır özel dövme janta dönüştürür.', 'Tam uyumumu oluştur', 'Fabrikayı tanıyın', 'Doğrudan fabrika', 'Tasarım · dövme · işleme · kaplama', '3 açılı önizleme', 'Üretimden önce aracınızda görün', 'DDP mevcut', 'Uluslararası alıcılar için daha net teslim maliyeti', 'Tam araç uyumu', 'Özel dövme tasarım', 'Fabrika üretimi', 'DDP teslimat desteği', 'Kaynak jant fabrikası', 'Gerçek üretim, işleme ve bitmiş jant stoğu.', 'Ölçülerinize göre üretim', 'Çap, genişlik, PCD, ET, CB ve fren boşluğu.', 'Üretim öncesi önizleme', 'Araç fotoğrafı yükleyin ve üç jant görünümü oluşturun.', 'Yaklaşık 30 iş günü', 'Üretim + teslimat hedef süresi varış yerine göre doğrulanır.', 'ÖNCE UYUM', 'Araçla başlayın.', 'Genel bir jantla değil.', 'Çevrimiçi jant alırken en büyük risk uyumdur. Çizimde göbek, fren, süspansiyon, lastik zarfı ve kullanım amacı hesaba katılsın diye tam platformla başlayın.', 'PCD + merkez deliği', 'Ön + arka ET', 'Kaliper boşluğu', 'Cadde + fuar + pist', '01 / Araç bilgisi', 'CIRUI’ye ne kullandığınızı söyleyin.', 'Mevcut uyum hesaplayıcısı sitenin mühendislik çekirdeği olarak kalır.', 'Uyum laboratuvarını aç', 'CIRUI Visual Studio yükleniyor…'],
  pl: ['CIRUI FORGED · OFICJALNA STRONA GLOBALNA', 'Kute u źródła.', 'Dopasowane do Twojego auta.', '策锐官网 to oficjalna międzynarodowa strona CIRUI Forged — fabryki felg, która przekłada dokładny pojazd, pozycję i wykończenie na gotową do produkcji kutą felgę.', 'Utwórz dokładne dopasowanie', 'Poznaj fabrykę', 'Prosto z fabryki', 'Projekt · kucie · obróbka · wykończenie', 'Podgląd z 3 kątów', 'Zobacz na swoim aucie przed produkcją', 'DDP dostępne', 'Bardziej przejrzysty koszt dostawy dla klientów zagranicznych', 'Dokładne dopasowanie pojazdu', 'Indywidualny projekt kuty', 'Produkcja fabryczna', 'Wsparcie dostawy DDP', 'Fabryka felg u źródła', 'Prawdziwa produkcja, obróbka i zapas gotowych felg.', 'Wykonane według Twoich parametrów', 'Średnica, szerokość, PCD, ET, CB i prześwit hamulców.', 'Podgląd przed produkcją', 'Prześlij zdjęcie pojazdu i wygeneruj trzy widoki felg.', 'Około 30 dni roboczych', 'Docelowy czas produkcji + dostawy potwierdzany dla miejsca docelowego.', 'NAJPIERW DOPASOWANIE', 'Zacznij od auta.', 'Nie od uniwersalnej felgi.', 'Kompatybilność to największe ryzyko zakupu felg online. Zacznij od dokładnej platformy, aby rysunek uwzględniał piastę, hamulce, zawieszenie, obrys opony i zastosowanie.', 'PCD + otwór centralny', 'ET przód + tył', 'Prześwit zacisku', 'Ulica + pokaz + tor', '01 / Dane pojazdu', 'Powiedz CIRUI, czym jeździsz.', 'Istniejący kalkulator dopasowania pozostaje technicznym rdzeniem strony.', 'Otwórz laboratorium dopasowania', 'Ładowanie CIRUI Visual Studio…'],
  vi: ['CIRUI FORGED · TRANG TOÀN CẦU CHÍNH THỨC', 'Rèn tại nguồn.', 'Lắp chuẩn cho xe của bạn.', '策锐官网 là trang quốc tế chính thức của CIRUI Forged, nhà máy mâm biến đúng mẫu xe, dáng xe và bề mặt bạn muốn thành mâm rèn tùy chỉnh sẵn sàng sản xuất.', 'Tạo thông số chính xác', 'Khám phá nhà máy', 'Trực tiếp từ nhà máy', 'Thiết kế · rèn · gia công · hoàn thiện', 'Xem trước 3 góc', 'Xem trên xe trước khi sản xuất', 'Có DDP', 'Chi phí đến nơi rõ ràng hơn cho khách quốc tế', 'Tương thích chính xác với xe', 'Thiết kế rèn tùy chỉnh', 'Sản xuất tại nhà máy', 'Hỗ trợ giao hàng DDP', 'Nhà máy mâm nguồn', 'Sản xuất, gia công và kho thành phẩm thực tế.', 'Làm theo thông số của bạn', 'Đường kính, chiều rộng, PCD, ET, CB và khoảng hở phanh.', 'Xem trước trước sản xuất', 'Tải ảnh xe lên và tạo ba góc nhìn của mâm.', 'Khoảng 30 ngày làm việc', 'Thời gian sản xuất + giao hàng mục tiêu được xác nhận theo điểm đến.', 'ƯU TIÊN TƯƠNG THÍCH', 'Bắt đầu từ chiếc xe.', 'Không phải mâm chung chung.', 'Khả năng tương thích là rủi ro lớn nhất khi mua mâm trực tuyến. Bắt đầu với đúng nền tảng để bản vẽ tính đến moay-ơ, phanh, hệ treo, không gian lốp và mục đích sử dụng.', 'PCD + lỗ tâm', 'ET trước + sau', 'Khoảng hở heo dầu', 'Đường phố + trưng bày + đường đua', '01 / Thông tin xe', 'Cho CIRUI biết bạn đang lái xe gì.', 'Công cụ tính tương thích hiện có vẫn là lõi kỹ thuật của trang.', 'Mở phòng thí nghiệm', 'Đang tải CIRUI Visual Studio…'],
  th: ['CIRUI FORGED · เว็บไซต์สากลอย่างเป็นทางการ', 'ฟอร์จจากต้นทาง', 'ติดตั้งให้ตรงกับรถของคุณ', '策锐官网 คือเว็บไซต์ต่างประเทศอย่างเป็นทางการของ CIRUI Forged โรงงานล้อต้นทางที่เปลี่ยนข้อมูลรถ ท่าทาง และงานผิวที่แม่นยำให้เป็นล้อฟอร์จสั่งทำพร้อมผลิต', 'สร้างสเปกติดตั้งที่แม่นยำ', 'รู้จักโรงงาน', 'ตรงจากโรงงาน', 'ออกแบบ · ฟอร์จ · กลึง · ทำผิว', 'ดูตัวอย่าง 3 มุม', 'ดูกับรถของคุณก่อนผลิต', 'มี DDP', 'ค่าใช้จ่ายถึงปลายทางชัดเจนขึ้นสำหรับผู้ซื้อต่างประเทศ', 'ความเข้ากันได้ตรงรุ่น', 'ดีไซน์ฟอร์จสั่งทำ', 'ผลิตในโรงงาน', 'รองรับการจัดส่ง DDP', 'โรงงานล้อต้นทาง', 'การผลิต การกลึง และสต็อกสำเร็จจริง', 'ผลิตตามตัวเลขของคุณ', 'เส้นผ่านศูนย์กลาง ความกว้าง PCD, ET, CB และระยะห่างเบรก', 'ดูตัวอย่างก่อนผลิต', 'อัปโหลดภาพรถและสร้างภาพล้อ 3 มุม', 'ประมาณ 30 วันทำการ', 'ระยะเวลาเป้าหมายการผลิต + จัดส่งยืนยันตามปลายทาง', 'เริ่มจากความเข้ากันได้', 'เริ่มจากรถ', 'ไม่ใช่ล้อทั่วไป', 'ความเข้ากันได้คือความเสี่ยงหลักของการซื้อล้อออนไลน์ เริ่มจากแพลตฟอร์มรถที่ถูกต้องเพื่อให้แบบคำนึงถึงดุม เบรก ช่วงล่าง ขอบเขตยาง และการใช้งาน', 'PCD + รูดุมกลาง', 'ET หน้า + หลัง', 'ระยะห่างคาลิเปอร์', 'ถนน + โชว์ + สนาม', '01 / ข้อมูลรถ', 'บอก CIRUI ว่าคุณขับรถอะไร', 'เครื่องคำนวณความเข้ากันได้เดิมยังคงเป็นแกนวิศวกรรมของเว็บไซต์', 'เปิดห้องทดลองความเข้ากันได้', 'กำลังโหลด CIRUI Visual Studio…'],
  id: ['CIRUI FORGED · SITUS GLOBAL RESMI', 'Ditempa di sumbernya.', 'Dipasang tepat untuk mobil Anda.', '策锐官网 adalah situs internasional resmi CIRUI Forged, pabrik velg sumber yang mengubah kendaraan, stance, dan finishing Anda menjadi velg forged kustom siap produksi.', 'Buat kecocokan presisi', 'Kenali pabrik', 'Langsung dari pabrik', 'Desain · tempa · mesin · finishing', 'Pratinjau 3 sudut', 'Lihat pada mobil Anda sebelum produksi', 'DDP tersedia', 'Biaya tiba yang lebih jelas bagi pembeli internasional', 'Kecocokan kendaraan presisi', 'Desain forged kustom', 'Produksi pabrik', 'Dukungan pengiriman DDP', 'Pabrik velg sumber', 'Produksi, pemesinan, dan stok jadi yang nyata.', 'Dibuat sesuai angka Anda', 'Diameter, lebar, PCD, ET, CB, dan celah rem.', 'Pratinjau sebelum produksi', 'Unggah foto kendaraan dan buat tiga tampilan velg.', 'Sekitar 30 hari kerja', 'Target waktu produksi + pengiriman dikonfirmasi per tujuan.', 'UTAMAKAN KECOCOKAN', 'Mulai dari mobil.', 'Bukan velg generik.', 'Kompatibilitas adalah risiko terbesar membeli velg online. Mulailah dari platform yang tepat agar gambar memperhitungkan hub, rem, suspensi, ruang ban, dan penggunaan.', 'PCD + lubang tengah', 'ET depan + belakang', 'Celah kaliper', 'Jalan + pameran + trek', '01 / Data kendaraan', 'Beri tahu CIRUI apa yang Anda kendarai.', 'Kalkulator kecocokan yang ada tetap menjadi inti teknik situs.', 'Buka laboratorium kecocokan', 'Memuat CIRUI Visual Studio…'],
  hi: ['CIRUI FORGED · आधिकारिक वैश्विक साइट', 'स्रोत पर फोर्ज्ड।', 'आपकी कार के लिए सटीक फिट।', '策锐官网 CIRUI Forged की आधिकारिक अंतरराष्ट्रीय वेबसाइट है—एक स्रोत व्हील फैक्ट्री जो आपके सटीक वाहन, स्टांस और फिनिश को उत्पादन-तैयार कस्टम फोर्ज्ड व्हील में बदलती है।', 'मेरा सटीक फिटमेंट बनाएँ', 'फैक्ट्री देखें', 'सीधे फैक्ट्री से', 'डिज़ाइन · फोर्ज · मशीनिंग · फिनिश', '3-एंगल पूर्वावलोकन', 'उत्पादन से पहले अपनी कार पर देखें', 'DDP उपलब्ध', 'अंतरराष्ट्रीय खरीदारों के लिए स्पष्ट पहुँच लागत', 'सटीक वाहन फिटमेंट', 'कस्टम फोर्ज्ड डिज़ाइन', 'फैक्ट्री उत्पादन', 'DDP डिलीवरी सहायता', 'स्रोत व्हील फैक्ट्री', 'वास्तविक उत्पादन, मशीनिंग और तैयार स्टॉक।', 'आपके माप के अनुसार निर्मित', 'व्यास, चौड़ाई, PCD, ET, CB और ब्रेक क्लीयरेंस।', 'उत्पादन से पहले पूर्वावलोकन', 'वाहन फोटो अपलोड करें और व्हील के तीन दृश्य बनाएँ।', 'लगभग 30 कार्य दिवस', 'लक्षित उत्पादन + डिलीवरी समय गंतव्य के अनुसार पुष्ट होता है।', 'पहले फिटमेंट', 'कार से शुरू करें।', 'सामान्य व्हील से नहीं।', 'ऑनलाइन व्हील खरीदने में अनुकूलता सबसे बड़ा जोखिम है। सटीक प्लेटफॉर्म से शुरू करें ताकि ड्रॉइंग में हब, ब्रेक, सस्पेंशन, टायर स्थान और उपयोग शामिल हों।', 'PCD + सेंटर बोर', 'आगे + पीछे ET', 'कैलिपर क्लीयरेंस', 'स्ट्रीट + शो + ट्रैक', '01 / वाहन जानकारी', 'CIRUI को बताएं कि आप क्या चलाते हैं।', 'मौजूदा फिटमेंट कैलकुलेटर वेबसाइट का इंजीनियरिंग केंद्र बना रहता है।', 'फिटमेंट लैब खोलें', 'CIRUI Visual Studio लोड हो रहा है…']
};

Object.entries(homeIntroTranslations).forEach(([locale, values]) => {
  if (!localeDictionaries[locale]) return;
  Object.assign(localeDictionaries[locale], Object.fromEntries(homeIntroTranslationKeys.map((key, index) => [key, values[index] || key])));
});

const premiumHeroTranslationKeys = ['Forged for your', 'exact vehicle.'];
const premiumHeroTranslations = {
  'zh-CN': ['为你的座驾而锻造', '精准适配。'],
  'zh-TW': ['為你的座駕而鍛造', '精準適配。'],
  ja: ['あなたの愛車のために鍛造', '完全適合。'],
  ko: ['당신의 차량을 위해 단조', '정밀 맞춤.'],
  de: ['Für Ihr Fahrzeug geschmiedet', 'Exakt angepasst.'],
  fr: ['Forgées pour votre véhicule', 'Ajustement exact.'],
  es: ['Forjadas para tu vehículo', 'Ajuste exacto.'],
  it: ['Forgiati per la tua auto', 'Fitment esatto.'],
  'pt-BR': ['Forjadas para o seu carro', 'Encaixe exato.'],
  ru: ['Выкованы для вашего авто', 'Точная посадка.'],
  ar: ['مطروقة لسيارتك', 'ملاءمة دقيقة.'],
  nl: ['Gesmeed voor uw auto', 'Exact passend.'],
  tr: ['Aracınız için dövüldü', 'Tam uyum.'],
  pl: ['Kute dla Twojego auta', 'Dokładne dopasowanie.'],
  vi: ['Rèn cho chính chiếc xe của bạn', 'Lắp chuẩn tuyệt đối.'],
  th: ['ฟอร์จเพื่อรถของคุณ', 'ติดตั้งตรงรุ่น'],
  id: ['Ditempa untuk mobil Anda', 'Pas secara presisi.'],
  hi: ['आपकी कार के लिए फोर्ज्ड', 'सटीक फिटमेंट।']
};

Object.entries(premiumHeroTranslations).forEach(([locale, values]) => {
  if (!localeDictionaries[locale]) return;
  Object.assign(localeDictionaries[locale], Object.fromEntries(premiumHeroTranslationKeys.map((key, index) => [key, values[index] || key])));
});

const visualStudioTranslationKeys = [
  'CIRUI VISUAL STUDIO',
  'Live fitment preview',
  'See the selected wheel on your car before production.',
  'Preview included',
  'LIVE / 01',
  '03 ANGLES',
  'Selected design',
  'Choose a wheel',
  'All sizes · custom fitment',
  'Upload your car photo',
  'Generate three fitment angles with the selected wheel.',
  'Upload photo & preview',
  'Newest to archive',
  'Previous wheels',
  'Next wheels',
  'Custom finish',
  'From'
];

const visualStudioTranslations = {
  'zh-CN': ['CIRUI 效果工作室', '实时适配预览', '生产前先在你的车上查看所选轮毂效果。', '预览已包含', '实时 / 01', '3 个角度', '当前款式', '选择轮毂', '全尺寸 · 定制适配', '上传车辆照片', '使用所选轮毂生成三个适配角度。', '上传照片并查看效果', '从最新到经典', '上一组轮毂', '下一组轮毂', '定制表面处理', '起'],
  'zh-TW': ['CIRUI 效果工作室', '即時適配預覽', '生產前先在你的車上查看所選輪圈效果。', '已包含預覽', '即時 / 01', '3 個角度', '目前款式', '選擇輪圈', '全尺寸 · 客製適配', '上傳車輛照片', '使用所選輪圈產生三個適配角度。', '上傳照片並查看效果', '從最新到經典', '上一組輪圈', '下一組輪圈', '客製表面處理', '起'],
  ja: ['CIRUI ビジュアルスタジオ', 'リアルタイム装着プレビュー', '生産前に選んだホイールを車両上で確認。', 'プレビュー込み', 'ライブ / 01', '3方向', '選択中のデザイン', 'ホイールを選ぶ', '全サイズ · カスタム適合', '車両写真をアップロード', '選択したホイールで3方向の装着イメージを生成。', '写真をアップロードして確認', '新作から定番へ', '前のホイール', '次のホイール', 'カスタム仕上げ', '～'],
  ko: ['CIRUI 비주얼 스튜디오', '실시간 핏먼트 미리보기', '생산 전 선택한 휠을 내 차에서 확인하세요.', '미리보기 포함', '라이브 / 01', '3개 각도', '선택한 디자인', '휠 선택', '전체 사이즈 · 커스텀 핏먼트', '차량 사진 업로드', '선택한 휠로 3개 각도의 핏먼트를 생성하세요.', '사진 업로드 및 미리보기', '최신순', '이전 휠', '다음 휠', '커스텀 마감', '최저'],
  de: ['CIRUI VISUAL STUDIO', 'Live-Fitment-Vorschau', 'Sehen Sie das ausgewählte Rad vor der Produktion an Ihrem Auto.', 'Vorschau inklusive', 'LIVE / 01', '3 PERSPEKTIVEN', 'Ausgewähltes Design', 'Rad auswählen', 'Alle Größen · individuelles Fitment', 'Fahrzeugfoto hochladen', 'Erstellen Sie drei Fitment-Ansichten mit dem ausgewählten Rad.', 'Foto hochladen & ansehen', 'Neueste bis Klassiker', 'Vorherige Räder', 'Nächste Räder', 'Individuelles Finish', 'Ab'],
  fr: ['STUDIO VISUEL CIRUI', 'Aperçu de compatibilité en direct', 'Visualisez la jante choisie sur votre voiture avant production.', 'Aperçu inclus', 'DIRECT / 01', '3 ANGLES', 'Design sélectionné', 'Choisir une jante', 'Toutes tailles · compatibilité sur mesure', 'Importer la photo de votre voiture', 'Générez trois angles de montage avec la jante choisie.', 'Importer et prévisualiser', 'Des nouveautés aux classiques', 'Jantes précédentes', 'Jantes suivantes', 'Finition sur mesure', 'À partir de'],
  es: ['ESTUDIO VISUAL CIRUI', 'Vista previa de ajuste en directo', 'Mira la llanta elegida en tu coche antes de producirla.', 'Vista previa incluida', 'DIRECTO / 01', '3 ÁNGULOS', 'Diseño seleccionado', 'Elegir llanta', 'Todos los tamaños · ajuste a medida', 'Sube una foto de tu coche', 'Genera tres ángulos de montaje con la llanta elegida.', 'Subir foto y previsualizar', 'De novedades a clásicos', 'Llantas anteriores', 'Llantas siguientes', 'Acabado a medida', 'Desde'],
  it: ['STUDIO VISIVO CIRUI', 'Anteprima fitment in tempo reale', 'Guarda il cerchio scelto sulla tua auto prima della produzione.', 'Anteprima inclusa', 'LIVE / 01', '3 ANGOLI', 'Design selezionato', 'Scegli un cerchio', 'Tutte le misure · fitment su misura', 'Carica la foto della tua auto', 'Genera tre angoli di fitment con il cerchio selezionato.', 'Carica foto e visualizza', 'Dai più recenti ai classici', 'Cerchi precedenti', 'Cerchi successivi', 'Finitura su misura', 'Da'],
  'pt-BR': ['ESTÚDIO VISUAL CIRUI', 'Prévia de encaixe ao vivo', 'Veja a roda escolhida no seu carro antes da produção.', 'Prévia incluída', 'AO VIVO / 01', '3 ÂNGULOS', 'Design selecionado', 'Escolher uma roda', 'Todos os tamanhos · encaixe sob medida', 'Envie a foto do seu carro', 'Gere três ângulos de encaixe com a roda selecionada.', 'Enviar foto e visualizar', 'Das novidades aos clássicos', 'Rodas anteriores', 'Próximas rodas', 'Acabamento sob medida', 'A partir de'],
  ru: ['ВИЗУАЛЬНАЯ СТУДИЯ CIRUI', 'Живой предпросмотр фитмента', 'Посмотрите выбранный диск на своём автомобиле до производства.', 'Предпросмотр включён', 'LIVE / 01', '3 РАКУРСА', 'Выбранный дизайн', 'Выберите диск', 'Все размеры · индивидуальный фитмент', 'Загрузите фото автомобиля', 'Создайте три ракурса с выбранным диском.', 'Загрузить фото и посмотреть', 'От новых к классическим', 'Предыдущие диски', 'Следующие диски', 'Индивидуальная отделка', 'От'],
  ar: ['استوديو CIRUI المرئي', 'معاينة توافق مباشرة', 'شاهد العجلة المختارة على سيارتك قبل الإنتاج.', 'المعاينة مشمولة', 'مباشر / 01', '3 زوايا', 'التصميم المختار', 'اختر عجلة', 'جميع المقاسات · توافق مخصص', 'ارفع صورة سيارتك', 'أنشئ ثلاث زوايا توافق بالعجلة المختارة.', 'ارفع الصورة وعاين', 'من الأحدث إلى الكلاسيكي', 'العجلات السابقة', 'العجلات التالية', 'تشطيب مخصص', 'ابتداءً من'],
  nl: ['CIRUI VISUAL STUDIO', 'Live fitmentvoorbeeld', 'Bekijk het gekozen wiel vóór productie op uw auto.', 'Voorbeeld inbegrepen', 'LIVE / 01', '3 HOEKEN', 'Geselecteerd ontwerp', 'Kies een wiel', 'Alle maten · fitment op maat', 'Upload uw voertuigfoto', 'Genereer drie fitmenthoeken met het gekozen wiel.', 'Foto uploaden en bekijken', 'Nieuw naar klassiek', 'Vorige wielen', 'Volgende wielen', 'Afwerking op maat', 'Vanaf'],
  tr: ['CIRUI GÖRSEL STÜDYO', 'Canlı uyum önizlemesi', 'Seçilen jantı üretimden önce aracınızda görün.', 'Önizleme dahil', 'CANLI / 01', '3 AÇI', 'Seçilen tasarım', 'Jant seçin', 'Tüm ölçüler · özel uyum', 'Araç fotoğrafınızı yükleyin', 'Seçilen jantla üç uyum açısı oluşturun.', 'Fotoğraf yükle ve önizle', 'En yeniden klasiğe', 'Önceki jantlar', 'Sonraki jantlar', 'Özel kaplama', 'Başlangıç'],
  pl: ['STUDIO WIZUALNE CIRUI', 'Podgląd dopasowania na żywo', 'Zobacz wybraną felgę na swoim aucie przed produkcją.', 'Podgląd w cenie', 'LIVE / 01', '3 UJĘCIA', 'Wybrany projekt', 'Wybierz felgę', 'Wszystkie rozmiary · dopasowanie na zamówienie', 'Prześlij zdjęcie auta', 'Wygeneruj trzy ujęcia dopasowania z wybraną felgą.', 'Prześlij zdjęcie i zobacz', 'Od nowości do klasyków', 'Poprzednie felgi', 'Następne felgi', 'Wykończenie na zamówienie', 'Od'],
  vi: ['STUDIO HÌNH ẢNH CIRUI', 'Xem trước tương thích trực tiếp', 'Xem mâm đã chọn trên xe trước khi sản xuất.', 'Đã gồm bản xem trước', 'TRỰC TIẾP / 01', '3 GÓC', 'Thiết kế đã chọn', 'Chọn mâm', 'Mọi kích thước · tương thích tùy chỉnh', 'Tải ảnh xe của bạn', 'Tạo ba góc lắp đặt với mâm đã chọn.', 'Tải ảnh và xem trước', 'Từ mới nhất đến cổ điển', 'Mâm trước', 'Mâm tiếp theo', 'Bề mặt tùy chỉnh', 'Từ'],
  th: ['สตูดิโอภาพ CIRUI', 'ดูตัวอย่างการติดตั้งแบบสด', 'ดูวงล้อที่เลือกบนรถของคุณก่อนผลิต', 'รวมการดูตัวอย่าง', 'สด / 01', '3 มุม', 'ดีไซน์ที่เลือก', 'เลือกล้อ', 'ทุกขนาด · ติดตั้งสั่งทำ', 'อัปโหลดภาพรถของคุณ', 'สร้างภาพติดตั้ง 3 มุมด้วยล้อที่เลือก', 'อัปโหลดภาพและดูตัวอย่าง', 'จากใหม่ล่าสุดสู่คลาสสิก', 'ล้อก่อนหน้า', 'ล้อถัดไป', 'งานผิวสั่งทำ', 'เริ่มต้น'],
  id: ['STUDIO VISUAL CIRUI', 'Pratinjau kecocokan langsung', 'Lihat velg pilihan pada mobil Anda sebelum produksi.', 'Pratinjau termasuk', 'LANGSUNG / 01', '3 SUDUT', 'Desain terpilih', 'Pilih velg', 'Semua ukuran · kecocokan kustom', 'Unggah foto mobil Anda', 'Buat tiga sudut kecocokan dengan velg pilihan.', 'Unggah foto dan pratinjau', 'Terbaru hingga klasik', 'Velg sebelumnya', 'Velg berikutnya', 'Finishing kustom', 'Mulai'],
  hi: ['CIRUI विज़ुअल स्टूडियो', 'लाइव फिटमेंट पूर्वावलोकन', 'उत्पादन से पहले चुने गए व्हील को अपनी कार पर देखें।', 'पूर्वावलोकन शामिल', 'लाइव / 01', '3 एंगल', 'चुना गया डिज़ाइन', 'व्हील चुनें', 'सभी आकार · कस्टम फिटमेंट', 'अपनी कार की फोटो अपलोड करें', 'चुने गए व्हील के साथ तीन फिटमेंट एंगल बनाएँ।', 'फोटो अपलोड और पूर्वावलोकन', 'नवीनतम से क्लासिक', 'पिछले व्हील', 'अगले व्हील', 'कस्टम फिनिश', 'से']
};

Object.entries(visualStudioTranslations).forEach(([locale, values]) => {
  if (!localeDictionaries[locale]) return;
  Object.assign(localeDictionaries[locale], Object.fromEntries(visualStudioTranslationKeys.map((key, index) => [key, values[index] || key])));
});

Object.assign(localeDictionaries['zh-CN'], {
  'CIRUI VISUAL STUDIO': 'CIRUI 效果工作室',
  'Live fitment preview': '实时适配预览',
  'See the selected wheel on your car before production.': '生产前先在你的车上查看所选轮毂效果。',
  'Preview included': '预览已包含',
  'LIVE / 01': '实时 / 01',
  '03 ANGLES': '3 个角度',
  'Selected design': '当前款式',
  'Choose a wheel': '选择轮毂',
  'All sizes · custom fitment': '全尺寸 · 定制适配',
  'Upload your car photo': '上传车辆照片',
  'Generate three fitment angles with the selected wheel.': '使用所选轮毂生成三个适配角度。',
  'Upload photo & preview': '上传照片并查看效果'
});

const fitmentChineseTranslations = {
  'CIRUI Fitment Lab': 'CIRUI 适配实验室',
  'Chassis + parts + use case': '底盘 + 改装件 + 使用场景',
  'Check the setup before we draw the wheel.': '画轮毂之前，先把整套参数核对清楚。',
  'Choose the car, identify the modified parts and enter the numbers you already know. The rule engine surfaces brake diameter, hub match, ET direction, tire size and the measurements still needed for a final custom quote.': '先选择车辆，标记已经安装的改装件，再填写你已经知道的参数。规则引擎会先核对刹车直径、轮毂孔距、ET 方向、轮胎规格，并列出定制报价还需要的实测数据。',
  'Hub pattern first': '先确认轮毂孔距',
  'Brake profile': '刹车轮廓',
  'Diameter is not enough': '只看直径还不够',
  'Use case': '使用场景',
  'Street, show or track': '日常、展示或赛道',
  '01 / Vehicle': '01 / 车辆',
  'Start with the exact platform.': '先选择准确车型。',
  'Trim and drive can change the original wheel, brake and clearance baseline.': '配置和驱动形式会改变原厂轮毂、刹车及间隙基准。',
  'How will you use it?': '你准备如何使用？',
  'Current ride-height drop (mm)': '当前降低高度（毫米）',
  'Current stance / ride-height profile': '当前姿态 / 车高状态',
  'Factory original / exact trim': '原厂 / 准确配置',
  'Lowered street': '街道降低',
  'Static low / stance': '静态低趴',
  'Air suspension low': '气动低趴',
  'Track alignment': '赛道定位',
  'Parts library': '改装件库',
  'Tell us what is already on the car.': '告诉我们车辆现在装了什么。',
  'Known brand and part numbers make the first-pass recommendation much sharper. The library is editable by CIRUI staff.': '已知品牌和零件号能让第一轮推荐更准确。适配库可由 CIRUI 后台继续维护。',
  'Front brake kit': '前轴刹车套件',
  'Rear brake kit': '后轴刹车套件',
  'Front brake kit / caliper': '前轴刹车套件 / 卡钳',
  'Rear brake kit / caliper': '后轴刹车套件 / 卡钳',
  'Front brake rotor': '前轴刹车盘',
  'Rear brake rotor': '后轴刹车盘',
  'Front brake pad': '前轴刹车片',
  'Rear brake pad': '后轴刹车片',
  'Suspension / coilover': '避震 / 绞牙',
  'Front axle': '前轴',
  'Rear axle': '后轴',
  'Front axle wheel + tire': '前轴轮毂 + 轮胎',
  'Rear axle wheel + tire': '后轴轮毂 + 轮胎',
  'Optional until you have measured values': '没有实测值前可留空',
  'Diameter (in)': '直径（英寸）',
  'Width (in)': '宽度（英寸）',
  'ET / offset (mm)': 'ET / 偏距（毫米）',
  'Center bore (mm)': '中心孔（毫米）',
  'Spacer (mm)': '垫片（毫米）',
  'Inner clearance (mm)': '内侧间隙（毫米）',
  'Spoke clearance (mm)': '辐条间隙（毫米）',
  'Spacer thickness (mm)': '垫片厚度（毫米）',
  'Wheel barrel to strut clearance (mm)': '轮毂内桶到避震筒间隙（毫米）',
  'Spoke back to caliper clearance (mm)': '辐条背面到卡钳间隙（毫米）',
  'Camber (deg)': '倾角（度）',
  'Toe (deg)': '前束（度）',
  'Fender clearance (mm)': '轮眉间隙（毫米）',
  'Full-compression clearance (mm)': '完全压缩间隙（毫米）',
  'Tire shoulder to fender clearance (mm)': '轮胎肩部到轮眉内缘间隙（毫米）',
  'Full-compression minimum clearance (mm)': '完全压缩最小间隙（毫米）',
  'Tire fitment style': '轮胎安装风格',
  'Not specified': '未说明',
  'Standard tire': '标准安装',
  'Mild stretch': '轻度拉伸',
  'Aggressive stretch': '激进拉伸',
  'Wheel barrel to strut or spring perch; measure the smallest gap.': '量轮毂内桶到避震筒或弹簧座的最小距离。',
  'Wheel spoke back to the caliper highest point; use the brake template if available.': '量辐条背面到卡钳最高点；有模板时优先使用刹车模板。',
  'Tire shoulder to the inner fender lip at steering lock.': '量轮胎肩部到轮眉内缘的最小距离；前轴请在打满方向后测量。',
  'Tire, fender, strut and barrel gap with suspension fully compressed.': '悬挂完全压缩并受载时，量轮胎、轮眉、避震和轮毂内桶的最小间隙。',
  'Spacer thickness changes inner and outer clearance; record the installed thickness.': '垫片会同时改变内外间隙，请填写实际安装厚度。',
  'Rim bead-seat diameter, not tire outside diameter.': '填写轮圈胎唇座直径，不是轮胎外径。',
  'Bead-seat width from the wheel drawing.': '填写轮毂图纸上的胎唇座宽度。',
  'Mounting-face offset; positive ET moves the wheel inward.': '填写安装面偏距；正 ET 会让轮毂向车内移动。',
  'Number of holes × pitch-circle diameter, e.g. 5x112.': '填写孔数 × 孔距圆直径，例如 5x112。',
  'Wheel center hole over the hub; smaller will not fit.': '填写轮毂中心孔；小于车辆轴头就无法安装。',
  'Installed spacer thickness; it changes both inner and outer clearance.': '填写实际安装的垫片厚度，它会同时改变内外间隙。',
  'Installed tire size; it controls rolling diameter and sidewall position.': '填写当前轮胎规格，它决定滚动直径和胎壁位置。',
  'Negative means the top of the tire leans inward.': '负值表示轮胎上端向车内倾。',
  'Measure total toe for this axle after lowering; follow the alignment printout.': '降低车身后按四轮定位单填写该轴总前束。',
  'Standard or stretched changes bead and fender clearance; record actual tire style.': '标准或拉伸会改变胎唇和轮眉间隙，请填写实际安装方式。',
  'Tire size': '轮胎规格',
  'Measured': '实测值',
  'Ready to check the setup?': '准备检查适配了吗？',
  'Leave unknown values blank and the result will list exactly what CIRUI needs next.': '不知道的数值可以留空，结果会明确列出 CIRUI 下一步需要的数据。',
  'Checking…': '检查中…',
  'Check fitment': '检查适配',
  'CIRUI rule engine': 'CIRUI 规则引擎',
  'Fitment result': '适配结果',
  'CIRUI will review the final wheel drawing before production.': 'CIRUI 会在生产前复核最终轮毂图纸。',
  'Known rules pass': '已知规则通过',
  'Conflict found': '发现冲突',
  'Needs measurement': '需要测量',
  'Minimum diameter': '最低轮径',
  'Width baseline': '宽度基准',
  'ET estimate': 'ET 估算',
  'Center bore': '中心孔',
  'PCD pending': 'PCD 待确认',
  'Confirm': '待确认',
  'Measure': '需要测量',
  'Enter wheel values for a more precise check.': '填写轮毂参数后，可以进行更精确的检查。',
  'What needs attention': '需要注意',
  'The known inputs are consistent. Final spoke and barrel clearance still require the selected wheel drawing.': '已知参数没有冲突，但最终辐条和轮辋内桶间隙仍需结合轮毂图纸确认。',
  'Send this setup to CIRUI': '把这套参数发给 CIRUI',
  'Send setup via WhatsApp': '通过 WhatsApp 发送这套参数',
  'Open CIRUI chat': '打开 CIRUI 在线客服',
  'Newest to archive': '最新到旧款',
  'Previous wheels': '上一页轮毂',
  'Next wheels': '下一页轮毂',
  'WhatsApp quote': 'WhatsApp 咨询报价',
  'Chat with CIRUI on WhatsApp': '通过 WhatsApp 联系 CIRUI',
  'WhatsApp fitment consultation': 'WhatsApp 适配咨询',
  'WhatsApp will open with your setup details and preview links ready to send.': 'WhatsApp 会打开并预填整套参数和效果图链接，确认后即可发送。',
  'WhatsApp message copied': 'WhatsApp 文案已复制',
  'Browse custom wheels': '浏览定制轮毂',
  'How the result is used': '结果如何使用',
  'Numbers first. Drawing second.': '先核对数字，再确认图纸。',
  'Every custom wheel still goes through a final engineering review. The lab gets the order of questions right: vehicle and hub, modified brakes and suspension, use case, tire envelope, then the wheel diameter, width, ET, center bore and spoke/barrel clearance.': '每一款定制轮毂仍然要经过最终工程复核。实验室按正确顺序收集信息：车辆和轮毂孔距、刹车与避震改装、使用场景、轮胎范围，再到轮毂直径、宽度、ET、中心孔以及辐条和内桶间隙。',
  'Year': '年份',
  'Make': '品牌',
  'Model': '车型',
  'Trim': '配置',
  'Drive': '驱动',
  'Daily street': '日常街道',
  'Spirited road': '激烈驾驶',
  'Show / stance': '展示 / 低趴',
  'Track / competition': '赛道 / 竞技',
  'Not listed / use manual brake template': '未收录 / 使用手动刹车模板',
  'Not listed / enter measured ride height': '未收录 / 输入实测车高',
  'active component profiles loaded': '条启用的改装件档案已加载',
  'Exact brake templates and measurements are still reviewed by a specialist.': '刹车模板和实测间隙仍需由专业人员复核。',
  'OEM, low-stance and unverified component data still require exact template and dynamic-clearance review.': '原厂、低趴和未完成核验的改装件数据，仍需准确模板和动态间隙复核。',
  'CIRUI will review the final wheel drawing and dynamic clearance before production.': 'CIRUI 会在生产前复核最终轮毂图纸和动态间隙。',
  'Loading the component library. You can still enter the vehicle and measurements manually.': '正在加载改装件库，你仍可以手动填写车辆和测量值。',
  'PCD': 'PCD',
  'Wheel values': '轮毂参数',
  'Rule pass': '规则通过',
  'in min': '英寸起'
};
Object.assign(localeDictionaries['zh-CN'], fitmentChineseTranslations);
const traditionalizeFitmentText = value => value
  .replaceAll('轮毂', '輪圈')
  .replaceAll('刹车', '煞車')
  .replaceAll('车辆', '車輛')
  .replaceAll('车型', '車型')
  .replaceAll('适配', '適配')
  .replaceAll('改装', '改裝')
  .replaceAll('改装件', '改裝件')
  .replaceAll('前轴', '前軸')
  .replaceAll('后轴', '後軸')
  .replaceAll('轮胎', '輪胎')
  .replaceAll('直径', '直徑')
  .replaceAll('宽度', '寬度')
  .replaceAll('垫片', '墊片')
  .replaceAll('内侧', '內側')
  .replaceAll('辐条', '輻條')
  .replaceAll('间隙', '間隙')
  .replaceAll('实测', '實測')
  .replaceAll('待确认', '待確認')
  .replaceAll('需要测量', '需要測量')
  .replaceAll('发现冲突', '發現衝突')
  .replaceAll('已知规则通过', '已知規則通過')
  .replaceAll('检查', '檢查')
  .replaceAll('结果', '結果')
  .replaceAll('浏览', '瀏覽')
  .replaceAll('定制', '訂製')
  .replaceAll('后台', '後台')
  .replaceAll('来源', '來源')
  .replaceAll('没有', '沒有')
  .replaceAll('数值', '數值')
  .replaceAll('参数', '參數')
  .replaceAll('选择', '選擇')
  .replaceAll('填写', '填寫')
  .replaceAll('核对', '核對')
  .replaceAll('准确', '準確')
  .replaceAll('信息', '資訊')
  .replaceAll('顺序', '順序')
  .replaceAll('最终', '最終')
  .replaceAll('经过', '經過')
  .replaceAll('正确', '正確')
  .replaceAll('赛道', '賽道')
  .replaceAll('驾驶', '駕駛')
  .replaceAll('手动', '手動')
  .replaceAll('输入', '輸入')
  .replaceAll('降低高度', '降低高度')
  .replaceAll('毫米', '毫米')
  .replaceAll('英寸', '英吋')
  .replaceAll('卡钳', '卡鉗')
  .replaceAll('刹车盘', '煞車碟')
  .replaceAll('刹车片', '煞車片')
  .replaceAll('避震', '避震')
  .replaceAll('绞牙', '絞牙')
  .replaceAll('底盘', '底盤')
  .replaceAll('轮辋', '輪圈')
  .replaceAll('实验室', '實驗室')
  .replaceAll('轮廓', '輪廓')
  .replaceAll('场景', '場景')
  .replaceAll('画', '畫')
  .replaceAll('已经', '已經')
  .replaceAll('安装', '安裝')
  .replaceAll('报价', '報價')
  .replaceAll('还', '還')
  .replaceAll('数据', '數據')
  .replaceAll('规则', '規則')
  .replaceAll('会', '會')
  .replaceAll('规格', '規格')
  .replaceAll('竞技', '競技')
  .replaceAll('驱动', '驅動')
  .replaceAll('标记', '標記')
  .replaceAll('并', '並')
  .replaceAll('够', '夠')
    .replaceAll('确认', '確認')
    .replaceAll('源头', '源頭')
    .replaceAll('工厂', '工廠')
    .replaceAll('锻造', '鍛造')
    .replaceAll('生产', '生產')
    .replaceAll('产品', '產品')
    .replaceAll('处理', '處理')
    .replaceAll('质量', '品質')
    .replaceAll('检验', '檢驗')
    .replaceAll('包装', '包裝')
    .replaceAll('运输', '運輸')
    .replaceAll('订单', '訂單')
    .replaceAll('客户', '客戶')
    .replaceAll('评价', '評價')
    .replaceAll('服务', '服務')
    .replaceAll('范围', '範圍')
    .replaceAll('活动', '活動')
    .replaceAll('参与', '參與')
    .replaceAll('载荷', '載荷')
    .replaceAll('对于', '對於')
    .replaceAll('通过', '通過')
    .replaceAll('团队', '團隊')
    .replaceAll('轴承', '軸承')
    .replaceAll('轮心', '輪心')
    .replaceAll('中心盖', '中心蓋')
    .replaceAll('图', '圖')
    .replaceAll('现', '現')
    .replaceAll('将', '將')
    .replaceAll('让', '讓')
    .replaceAll('为', '為')
    .replaceAll('与', '與')
    .replaceAll('从', '從')
    .replaceAll('发', '發')
    .replaceAll('应', '應')
    .replaceAll('开', '開')
    .replaceAll('后', '後')
    .replaceAll('这', '這')
    .replaceAll('个', '個')
    .replaceAll('仅', '僅')
    .replaceAll('条', '條')
    .replaceAll('过', '過')
    .replaceAll('标', '標')
    .replaceAll('锁', '鎖')
    .replaceAll('较', '較')
    .replaceAll('时', '時')
    .replaceAll('实', '實')
    .replaceAll('车', '車')
    .replaceAll('轮', '輪');
Object.assign(localeDictionaries['zh-TW'], Object.fromEntries(Object.entries(fitmentChineseTranslations).map(([key, value]) => [key, traditionalizeFitmentText(value)])));
const workshopChineseTranslations = {
  'Workshop Lab': '改装店装备实验室',
  'CIRUI Workshop Lab': 'CIRUI 改装店装备实验室',
  'Free workspace for tuning shops': '面向改装店的免费工作台',
  'Free professional fitment tool': '免费专业适配工具',
  'One customer. One saved build.': '一个客户，一套可保存的方案。',
  'Look up the vehicle, document the installed chassis parts, check the known fitment rules and keep every decision in a project your shop can reopen or share with the customer.': '查询车辆、记录已安装的底盘改装件、核对已知适配规则，并把每个决定保存在店家可随时打开或分享给客户的项目中。',
  'Save': '保存',
  'Share': '分享',
  'Quote': '报价',
  'Keep every customer build': '保存每一套客户方案',
  'One branded customer link': '一个店家联名客户链接',
  'Send the complete brief': '发送完整需求',
  'Check first. Save when the project becomes real.': '先免费核对，项目确定后再保存。',
  'Vehicle and parts lookup is open. Sign in only when your shop needs to save, share or price a customer build.': '车辆与改装件查询免费开放；需要保存、分享或给客户定价时再登录。',
  'Sign in': '登录',
  'Sign out': '退出登录',
  'Close': '关闭',
  'Create shop account': '创建店家账号',
  'Shop workspace': '店家工作台',
  'Set up your shop': '设置你的改装店',
  'Shop name': '店铺名称',
  'Your tuning shop': '你的改装店',
  'Advisor name': '顾问姓名',
  'Fitment advisor': '适配顾问',
  'Email': '邮箱',
  'Phone / WhatsApp': '电话 / WhatsApp',
  'City / location': '城市 / 地址',
  'Save shop profile': '保存店铺资料',
  'Customer link setup': '客户链接设置',
  'Complete your shop profile.': '完善店铺资料。',
  'Let the customer know who is helping them.': '让客户清楚由哪家店提供服务。',
  'These details appear on your customer link. Save them once and the next share is instant.': '这些资料会显示在客户链接中；保存一次，以后即可直接分享。',
  'Save and create customer link': '保存并生成客户链接',
  'You can update these details later in My Account.': '之后仍可在“我的账户”中修改这些资料。',
  'Customer projects': '客户项目',
  'No saved projects yet.': '还没有已保存的项目。',
  'Save the first customer setup and it will stay available on this device.': '保存第一套客户方案后，它会保留在当前设备和账号中。',
  'Current customer build': '当前客户方案',
  'New project': '新建项目',
  'Save project': '保存项目',
  'Saving…': '保存中…',
  'Share with customer': '分享给客户',
  'Copy share link': '复制分享链接',
  'Copy customer link': '复制客户链接',
  'Draft': '草稿',
  'Checked': '已核对',
  'Shared': '已分享',
  'Quote requested': '已申请报价',
  'Closed': '已关闭',
  'New customer build': '新客户方案',
  'Untitled project': '未命名项目',
  'Vehicle not selected': '尚未选择车辆',
  'Project identity': '项目标识',
  'Name the customer build.': '给这套客户方案命名。',
  'Use a short internal reference. Customer contact details are requested only when a quote is sent.': '使用简短的内部标记；只有发送报价时才收集客户联系方式。',
  'Project name': '项目名称',
  'Customer reference': '客户内部标记',
  'Example: C43 street setup': '示例：C43 街道方案',
  'Example: Chris / ticket 024': '示例：Chris / 工单 024',
  'Example: Alex / work order 024': '示例：Alex / 工单 024',
  'Example: 2022 C43, same brakes, 19x9 ET38': '示例：2022 款 C43、同款刹车、19x9 ET38',
  'Calculate automatically': '由系统自动计算',
  'Calculated from vehicle': '根据车辆数据计算',
  'Measured minimum': '输入实测最小值',
  'Template / measured gap': '输入模板或实测间隙',
  'Loaded suspension gap': '输入带载悬挂间隙',
  'Describe installed parts, ride height and known measurements…': '请描述已安装部件、车高和已知实测数据…',
  'Customer sales route': '客户成交方式',
  'Shop controls the sale': '由店家主导成交',
  'CIRUI collects payment for the shop': 'CIRUI 为店家代收款',
  'Allow direct CIRUI checkout': '允许客户直接向 CIRUI 购买',
  'Shop-controlled is the default: the customer can design and browse, but the final sale stays with your shop.': '默认由店家主导：客户可以浏览和设计，但最终成交仍归你的店铺。',
  'Price shown before your quote': '店家报价前显示的价格',
  'Hide platform prices': '隐藏平台价格',
  'Show CIRUI retail prices': '显示 CIRUI 零售价',
  'Your published customer quote is always separate from the private CIRUI supply cost.': '店家发布给客户的报价始终与 CIRUI 私密供货成本分开。',
  'Allow this build to be featured in the CIRUI gallery': '允许在 CIRUI 案例库展示此方案',
  'Customer names and contact details stay private. Only the vehicle, parts, fitment result and approved images may be shown.': '客户姓名和联系方式不会公开，仅展示车辆、改装件、适配结果和经确认的图片。',
  'Existing styles': '现有款式',
  'Select for the build': '选择用于此方案',
  'Custom concept': '定制概念',
  'Text + reference image': '文字 + 参考图',
  'Customer pricing': '客户报价',
  'Shop quote': '店家报价',
  'Margin + service fees': '利润 + 服务费',
  'Protected partner request': '店家保护询价',
  'From fitment to sale': '从适配到成交',
  'One shared project': '一个共享项目',
  'Choose the next path with the customer.': '与客户一起选择下一步。',
  'Use a listed CIRUI style, co-design a new wheel from text and a reference image, or move the complete project into the shop-controlled quote flow.': '选择现有 CIRUI 款式、通过文字和参考图共创轮毂，或把完整项目转入店家主导的报价流程。',
  'CIRUI wheel catalog': 'CIRUI 轮毂目录',
  'Choose an existing direction.': '选择一个现有款式方向。',
  'Choose a direction for the shop to include in its final customer quote. Platform supply prices stay private.': '选择款式方向，由店家加入最终客户报价；平台供货价格保持私密。',
  'Quoted by your shop': '由你的店家报价',
  'Select for shop quote': '加入店家报价',
  'View and order': '查看并购买',
  'View and request custom quote': '查看并申请定制报价',
  'Customer co-design studio': '客户共创设计室',
  'Describe it. Reference it. See it on the car.': '描述、参考，并在车上预览。',
  'The customer supplies a style reference and a written brief. CIRUI generates visual concepts while the saved fitment project keeps the engineering questions attached.': '客户提供款式参考与文字需求，CIRUI 生成视觉概念，同时适配项目保留全部工程核对项。',
  'Describe the wheel you want': '描述想要的轮毂',
  'Example: a lightweight forged 10-spoke design, deep center, brushed face with polished step lip, motorsport rather than luxury.': '例如：轻量化锻造 10 辐、深中心、拉丝表面配抛光阶梯唇，偏赛车风而不是豪华风。',
  'Describe spoke count, spoke shape, lip, concavity, center cap and finish. Do not use the visual result as installation approval.': '请描述辐条数量与形状、轮唇、凹度、中心盖和表面处理；效果图不能作为安装批准。',
  'Upload a wheel reference image': '上传轮毂参考图',
  'JPG, PNG or WebP. The next step asks for the customer vehicle photo.': '支持 JPG、PNG 或 WebP；下一步会要求上传客户车辆照片。',
  'Finish': '表面处理',
  'Construction': '结构',
  'Brushed clear': '透明拉丝',
  'Satin black': '缎面黑',
  'Polished silver': '抛光银',
  'Bronze': '古铜色',
  'Custom finish': '定制表面',
  'Forged monoblock': '锻造单片式',
  'Forged 2-piece': '锻造两片式',
  'Forged 3-piece': '锻造三片式',
  'Front width / ET': '前轮宽度 / ET',
  'Rear width / ET': '后轮宽度 / ET',
  'Start visual concept': '开始生成视觉概念',
  'A free CIRUI account is requested only after the vehicle photo is uploaded.': '上传车辆照片后才会要求注册免费 CIRUI 账号。',
  'Upload a wheel reference image first.': '请先上传轮毂参考图。',
  'Use a JPG, PNG or WebP image smaller than 14 MB.': '请使用小于 14 MB 的 JPG、PNG 或 WebP 图片。',
  'CIRUI custom wheel concept': 'CIRUI 定制轮毂概念',
  'The visual concept could not be started.': '无法启动视觉概念生成。',
  'Shop customer quote': '店家客户报价',
  'Save this project before pricing it.': '请先保存项目再进行定价。',
  'The project needs an account-owned record before private supply cost and customer pricing can be kept apart.': '项目需要先归属到账号，才能安全分开供货成本与客户报价。',
  'Build your selling price, not ours.': '制定你的成交价，而不是照搬我们的价格。',
  'CIRUI supply cost stays private. Add your wheel margin and the real services your shop provides before publishing one final customer price.': 'CIRUI 供货成本保持私密；加入轮毂利润和店铺实际提供的服务，再发布最终客户价格。',
  'CIRUI supply quote': 'CIRUI 供货报价',
  'Waiting for CIRUI': '等待 CIRUI 报价',
  'Current customer total': '当前客户总价',
  'Estimated gross margin': '预估毛利',
  'Cost pending': '成本待确认',
  'Published to customer': '已发布给客户',
  'Private draft': '私密草稿',
  'Customer wheel price / each': '客户轮毂单只售价',
  'Wheel quantity': '轮毂数量',
  'Design service': '设计服务费',
  'Measurement + fitment': '测量与适配费',
  'Installation labor': '安装施工费',
  'Tires / mounting': '轮胎 / 装配费',
  'Other service': '其他服务费',
  'Shipping': '运输费',
  'Tax': '税费',
  'Discount': '优惠',
  'Deposit percent': '订金比例',
  'Valid until': '有效期至',
  'Customer quote note': '客户报价备注',
  'Publish this final price to the customer link': '把最终价格发布到客户链接',
  'The CIRUI supply cost and estimated margin will remain private.': 'CIRUI 供货成本和预估毛利始终保持私密。',
  'Save customer quote': '保存客户报价',
  'Automatic payment splitting is not enabled yet; this version records the commercial structure safely.': '自动分账尚未启用；当前版本会先安全记录完整的商业结构。',
  'Customer quote published.': '客户报价已发布。',
  'Customer quote saved as a private draft.': '客户报价已保存为私密草稿。',
  'Quote from': '报价来自',
  'Your complete wheel project price.': '你的完整轮毂项目报价。',
  'This is the shop selling price, including the listed services. CIRUI supply pricing is never shown here.': '这是店家的成交价格，包含列出的服务；此处绝不显示 CIRUI 供货价。',
  'Wheels': '轮毂',
  'Final customer total': '客户最终总价',
  'Requested deposit': '所需订金',
  'Continue with': '继续联系',
  'The originating shop remains your sales and installation contact.': '来源店家仍是你的销售与安装服务联系人。',
  'Partner-protected request': '店家保护询价',
  'Send the complete project through': '通过以下店家发送完整项目：',
  'No retyping: the vehicle, modified parts, measurements, fitment result and chosen design travel together. CIRUI supports the shop without taking over the customer relationship.': '无需重复填写：车辆、改装件、测量值、适配结果和设计方向会一起发送；CIRUI 支持店家，但不会接管客户关系。',
  'Sales contact': '销售联系人',
  'Request through': '通过以下店家询价：',
  'The request is attributed to the originating shop in CIRUI.': '该需求会在 CIRUI 后台归因到来源店家。',
  'Contact details are not available. Send the protected request instead.': '店家联系方式暂不可用，请改用受保护询价。',
  'Ask the shop for a quote': '向店家申请报价',
  'Partner-protected customer relationship': '受保护的店家客户关系',
  'Pricing and the final sale are controlled by this shop. CIRUI provides the platform, engineering and production support.': '报价和最终成交由该店家控制，CIRUI 提供平台、工程与生产支持。',
  'This shop remains attributed if CIRUI assists with checkout and fulfillment.': '即使 CIRUI 协助收款与履约，该订单仍归因到此店家。',
  'Shared workshop project': '店家共享项目',
  'Customer build room': '客户方案空间',
  'Customer project': '客户项目',
  'Parts recorded': '已记录改装件',
  'Project revision': '项目版本',
  'Fitment status': '适配状态',
  'Your shop has saved the vehicle and fitment context here. Review the result, choose a listed wheel or co-design a custom direction. The originating shop remains your sales and installation contact.': '店家已在此保存车辆与适配信息。你可以查看结果、选择现有轮毂或共同设计定制方向；来源店家仍负责销售与安装服务。',
  'Opening the shared build…': '正在打开共享方案…',
  'Loading the vehicle, fitment result and shop design room.': '正在加载车辆、适配结果和店家设计空间。',
  'This workshop link is not available.': '此店家项目链接不可用。',
  'Ask the shop for a new project link.': '请向店家索取新的项目链接。',
  'Open the Workshop Lab': '打开改装店装备实验室',
  'CIRUI Wheel Fitment Lab for Tuning Shops': 'CIRUI 改装店轮毂适配实验室',
  'My CIRUI Workshop Account': '我的 CIRUI 改装店工作台',
  'Shared Wheel Build': '共享轮毂方案',
  'Shared by': '分享店家',
  'Contact the shop that sent this link for installation support.': '请联系分享此链接的店家获取安装支持。',
  'Visual concepts help confirm style direction. Final wheel drawings, load requirements and physical clearances must be approved before production.': '视觉概念仅用于确认款式方向；生产前必须批准最终轮毂图纸、载荷要求和实际间隙。',
  'CIRUI account': 'CIRUI 账号',
  'Private shop workspace': '店家私密工作台',
  'Your customer projects live here.': '你的客户项目都保存在这里。',
  'The fitment tool stays free. Sign in to reopen saved builds, protect customer relationships, set your selling price and publish shop-branded links.': '适配工具保持免费；登录后可重新打开项目、保护客户关系、设置成交价并发布店家联名链接。',
  'CIRUI partner workspace': 'CIRUI 合作店家工作台',
  'Customers, fitment and margin in one place.': '客户、适配与利润集中管理。',
  'Use CIRUI as the technical and production platform while your shop keeps the sales relationship, service work and customer-facing price.': '让 CIRUI 提供技术与生产平台，同时由你的店铺保留销售关系、服务施工和面向客户的价格。',
  'New customer build': '新建客户方案',
  'Track orders': '查看订单',
  'Saved projects': '已保存项目',
  'Customer links': '客户链接',
  'Published shop quotes': '已发布店家报价',
  'Channel default': '渠道默认规则',
  'Shop controlled': '店家主导',
  'Project management': '项目管理',
  'Every build stays attached to your account.': '每套方案都归属你的账号。',
  'Open a project to update fitment, select a wheel direction, request CIRUI supply pricing or publish your own customer quote.': '打开项目即可更新适配、选择轮毂方向、申请 CIRUI 供货价或发布自己的客户报价。',
  'Loading customer projects…': '正在加载客户项目…',
  'Current project': '当前项目',
  'Sales route': '成交方式',
  'Customer quote': '客户报价',
  'Not published': '尚未发布',
  'Case visibility': '案例展示',
  'Published': '已展示',
  'Awaiting review': '等待确认',
  'Approved': '已批准',
  'Under review': '审核中',
  'Private': '私密',
  'Open workspace': '打开工作台',
  'No project selected.': '尚未选择项目。',
  'Start a customer build or choose one from the project list.': '新建客户方案，或从项目列表中选择。',
  'Partner protection': '店家渠道保护',
  'CIRUI supports the sale without taking the customer away.': 'CIRUI 支持成交，但不会抢走店家的客户。',
  'Private CIRUI supply cost': '私密 CIRUI 供货成本',
  'Shop-controlled customer price and service fees': '店家自定客户价格与服务费',
  'Persistent inquiry and order attribution': '询价与订单持续归因',
  'Direct checkout only when the shop enables it': '仅在店家允许时开放直接购买',
  'Partner-protected build': '店家保护方案',
  'CIRUI workshop partner': 'CIRUI 合作改装店',
  'Design, inquiry and order activity remains attributed to this shop.': '设计、询价和订单行为仍归因到该店家。',
  'Return to shared build': '返回共享方案',
  'My Account': '我的账户',
  'Customer projects could not be loaded.': '无法加载客户项目。',
  'Add your shop name before creating a customer link.': '创建客户链接前，请先填写店铺名称。',
  'Shop profile saved.': '店铺资料已保存。',
  'Shop profile could not be saved.': '无法保存店铺资料。',
  'Workshop project saved.': '店家项目已保存。',
  'Customer share link copied.': '客户分享链接已复制。',
  'Customer project opened.': '客户项目已打开。',
  'The project could not be saved.': '无法保存此项目。',
  'This shared project could not be opened.': '无法打开此共享项目。',
  'The quote request could not be sent.': '无法发送报价申请。',
  'Sent to CIRUI': '已发送到 CIRUI',
  'The project is now in the quote queue.': '该项目已进入报价队列。',
  'The saved vehicle, fitment result, selected style and customer note are attached to the inquiry.': '已保存的车辆、适配结果、所选款式和客户备注已附在询价中。',
  'Inquiry ID': '询价编号'
};
Object.assign(localeDictionaries['zh-CN'], workshopChineseTranslations);
Object.assign(localeDictionaries['zh-TW'], Object.fromEntries(Object.entries(workshopChineseTranslations).map(([key, value]) => [key, traditionalizeFitmentText(value)])));
Object.assign(localeDictionaries['zh-CN'], {
  'PayPal checkout': 'PayPal 支付',
  'Pay securely with PayPal.': '使用 PayPal 安全付款。',
  'The PayPal button below uses the product and amount configured in your PayPal account.': '下面的 PayPal 按钮使用您 PayPal 账户中配置的商品和金额。',
  'Custom diameter, width, PCD, ET, center bore and brake clearance are confirmed separately before production.': '定制直径、宽度、PCD、ET、中心孔以及刹车间隙会在生产前单独确认。',
  'PayPal is temporarily unavailable. Please use the CIRUI quote or WhatsApp for this build.': 'PayPal 暂时不可用，请使用 CIRUI 报价或 WhatsApp 咨询这套方案。',
  'Minimum order: 4 wheels.': '最低订购 4 只轮毂。',
  'The starting price is per wheel.': '页面显示的起始价为单只轮毂价格。',
  'Please update the quantity before checkout.': '请将数量调整到最低订购数量后再结算。',
  'PayPal cart': 'PayPal 购物车',
  'View your PayPal cart': '查看 PayPal 购物车',
  'Review this build in your PayPal cart.': '在 PayPal 购物车中查看这套方案。',
  'The PayPal cart keeps the four-wheel minimum order. Final custom fitment is confirmed before production.': 'PayPal 购物车按四只起订执行，定制适配参数会在生产前最终确认。',
  'PayPal cart is temporarily unavailable. Please use the CIRUI quote or WhatsApp for this build.': 'PayPal 购物车暂时不可用，请使用 CIRUI 报价或 WhatsApp 咨询这套方案。'
});
Object.assign(localeDictionaries['zh-TW'], {
  'PayPal checkout': 'PayPal 付款',
  'Pay securely with PayPal.': '使用 PayPal 安全付款。',
  'The PayPal button below uses the product and amount configured in your PayPal account.': '下方的 PayPal 按鈕使用您 PayPal 帳戶中設定的商品與金額。',
  'Custom diameter, width, PCD, ET, center bore and brake clearance are confirmed separately before production.': '訂製直徑、寬度、PCD、ET、中心孔以及煞車間隙會在生產前另外確認。',
  'PayPal is temporarily unavailable. Please use the CIRUI quote or WhatsApp for this build.': 'PayPal 暫時無法使用，請改用 CIRUI 報價或 WhatsApp 諮詢這套方案。',
  'Minimum order: 4 wheels.': '最低訂購 4 只輪圈。',
  'The starting price is per wheel.': '頁面顯示的起始價為單只輪圈價格。',
  'Please update the quantity before checkout.': '請將數量調整到最低訂購數量後再結帳。',
  'PayPal cart': 'PayPal 購物車',
  'View your PayPal cart': '查看 PayPal 購物車',
  'Review this build in your PayPal cart.': '在 PayPal 購物車中查看這套方案。',
  'The PayPal cart keeps the four-wheel minimum order. Final custom fitment is confirmed before production.': 'PayPal 購物車按四只起訂執行，訂製適配參數會在生產前最終確認。',
  'PayPal cart is temporarily unavailable. Please use the CIRUI quote or WhatsApp for this build.': 'PayPal 購物車暫時無法使用，請改用 CIRUI 報價或 WhatsApp 諮詢這套方案。'
});
const fitmentPlanChineseTranslations = {
  'Exact trim / variant': '准确配置 / 版本',
  'Chassis code, e.g. F30': '底盘代号，例如 F30',
  'Body style': '车身形式',
  'Market': '销售市场',
  'Sedan': '轿车',
  'Coupe': '双门轿跑',
  'Hatchback': '掀背车',
  'Wagon': '旅行车',
  'SUV': 'SUV',
  'Truck': '皮卡',
  'Roadster': '敞篷跑车',
  'Other': '其他',
  'United States': '美国',
  'Europe': '欧洲',
  'United Kingdom': '英国',
  'Japan': '日本',
  'China': '中国',
  'Use the exact trim, chassis and market shown on the VIN/build record. Suggested trims are search aids, not verified fitment facts.': '请按 VIN / 原厂配置记录填写准确配置、底盘代号和销售市场；系统不会把目录建议当作已验证适配事实。',
  'Vehicle identity required': '需要确认准确车型',
  'Starting plan generated': '已生成起始方案',
  'Ready for drawing': '可进入图纸阶段',
  'We kept the customer target, but no dimensional plan will pretend the hub data is verified. Confirm the exact vehicle identity first, then the same project will resolve the hub and wheel envelope.': '系统保留了客户目标值，但不会把未验证的轴头数据伪装成精确尺寸。先确认准确车型，同一项目即可继续得出轴头与轮毂尺寸范围。',
  'This is the recommended starting specification from the strongest available evidence. Complete the remaining measurements below to lock the production drawing.': '这是根据当前最可靠证据生成的建议起始规格。补齐下方测量值后即可锁定生产图纸。',
  'The known vehicle, component and measurement rules are consistent. This plan can move to the final wheel drawing and physical template review.': '已知车型、部件和测量规则一致，该方案可以进入最终轮毂图纸与实体模板复核。',
  'Confirm exact trim, chassis code, drive and market from VIN or manufacturer build data.': '通过 VIN 或原厂配置数据确认准确配置、底盘代号、驱动形式和销售市场。',
  'Verify PCD and hub diameter from an approved vehicle source before machining.': '加工前通过获准车型来源核实 PCD 和轴头直径。',
  'Provide the front caliper/rotor assembly drawing or a 1:1 wheel-clearance template.': '提供前卡钳 / 刹车盘总成图纸或 1:1 轮毂间隙模板。',
  'Provide the rear caliper/rotor assembly drawing or a 1:1 wheel-clearance template.': '提供后卡钳 / 刹车盘总成图纸或 1:1 轮毂间隙模板。',
  'Choose the complete front tire size with load index and speed rating.': '填写完整前轮胎规格、载重指数和速度级别。',
  'Choose the complete rear tire size with load index and speed rating.': '填写完整后轮胎规格、载重指数和速度级别。',
  'Confirm the front tire maker approves the proposed rim width and vehicle load.': '确认前轮胎厂商允许建议轮圈宽度并满足车辆载荷。',
  'Confirm the rear tire maker approves the proposed rim width and vehicle load.': '确认后轮胎厂商允许建议轮圈宽度并满足车辆载荷。',
  'Vehicle identity': '车型身份',
  'Wheel diameter': '轮毂直径',
  'Wheel width': '轮毂宽度',
  'ET / offset': 'ET / 偏距',
  'The catalog combination is not a verified engineering record.': '该目录组合不是已验证工程记录。',
  'The entered value is incomplete or outside a physically valid range.': '输入值不完整或超出物理合理范围。',
  'A complete tire size needs width, aspect ratio and rim diameter.': '完整轮胎规格必须包含胎宽、扁平比和轮径。',
  'Corrected to the verified vehicle/platform hub.': '已按验证过的车型 / 平台轴头修正。',
  'A custom wheel should be machined hub-centric for this vehicle.': '定制轮毂应按该车轴头进行中心定位加工。',
  'Raised to clear the verified brake diameter requirement.': '已提高到满足验证过的刹车轮径要求。',
  'Moved inside the year-matched platform starting envelope.': '已调整到年份匹配的平台起始范围内。',
  'The tire rim diameter must match the proposed wheel diameter.': '轮胎轮圈直径必须与建议轮毂直径一致。',
  'Engineering correction': '工程修正',
  'Verify first': '先核实',
  'CIRUI custom wheel plan': 'CIRUI 定制轮毂方案',
  'Recommended starting specification': '建议起始规格',
  'Pending vehicle data': '等待车型数据',
  'Pending measurements': '等待测量',
  'Working range': '工作范围',
  'No safe ET range yet': '暂无可靠 ET 范围',
  'Verified vehicle basis': '已验证车型基准',
  'Platform starting range': '平台起始范围',
  'Customer target only': '仅客户目标值',
  'Needs verification': '需要验证',
  'Machining center bore': '加工中心孔',
  'Target ET': '目标 ET',
  'Tire envelope': '轮胎范围',
  'Verify vehicle': '核实车型',
  'Select after OE diameter + tire approval': '确认原厂总直径及轮胎许可后选择',
  'System corrections': '系统自动修正',
  'What the plan changed for you': '方案已经替你修正的内容',
  'Vehicle': '车辆',
  'No entered value was silently replaced. The plan preserves valid customer targets and labels every unresolved field.': '系统没有静默替换任何输入值；方案保留有效目标，并清楚标记所有待确认字段。',
  'Before production': '生产前',
  'Finish these to lock the wheel drawing': '完成这些即可锁定轮毂图纸',
  'Next gate': '下一道确认',
  'Ready for the final drawing review': '可进入最终图纸复核',
  'Engineering checks and evidence': '工程检查与证据',
  'review notes': '条复核说明',
  'Why the plan is not production-locked yet': '尚未锁定生产尺寸的原因',
  'Apply plan to the form': '将方案应用到表单',
  'The corrected starting plan has been applied. Recheck after adding the missing vehicle and measurement evidence.': '已应用修正后的起始方案。补充缺少的车型与测量证据后，请重新检查。',
  'Calculated plan · measurements needed': '已计算方案 · 需要补测',
  'Calculated plan · correction required': '已计算方案 · 需要修正',
  'Calculated plan · engineering ready': '已计算方案 · 可进入工程审核',
  'Production-locked specification': '已锁定生产规格',
  'The calculator has produced a specific front/rear plan and marked exactly which measurements still control it. Add those values and calculate again.': '计算器已经生成明确的前后轴方案，并标记仍会影响结果的测量值；补齐后再次计算即可。',
  'The requested combination cannot meet every entered constraint. Use the corrected specification below, or change the tire/hardware named in the correction.': '当前要求无法同时满足全部约束，请采用下方修正规格，或更换修正项中指出的轮胎 / 硬件。',
  'The calculated geometry and evidence gates are complete. CIRUI can now attach the named drawing revision and engineering approval.': '几何计算与证据关卡已经完整，CIRUI 现在可以绑定具名图纸版本并进行工程批准。',
  'This exact revision has the required drawing, templates, measurements and named engineering approval for production.': '该准确版本已绑定生产所需的图纸、模板、测量和具名工程批准。',
  'Production-locked custom specification': '已锁定生产的定制规格',
  'Final calculated custom specification': '最终计算定制规格',
  'Corrected custom specification': '修正后的定制规格',
  'Calculated custom specification': '计算得出的定制规格',
  'Front axle calculator': '前轴计算器',
  'Rear axle calculator': '后轴计算器',
  'Current baseline → calculated custom specification': '当前基准 → 计算定制规格',
  'Current installed baseline': '当前已安装基准',
  'Read these values from the wheel, tire and installed spacer. They anchor every movement calculation.': '从当前轮毂、轮胎和已安装垫片读取这些值，它们是所有位移计算的基准。',
  'Current diameter (in)': '当前轮径（英寸）',
  'Current width (in)': '当前轮宽（英寸）',
  'Current ET (mm)': '当前 ET（毫米）',
  'Current spacer (mm)': '当前垫片（毫米）',
  'Current tire size': '当前轮胎规格',
  'Requested custom specification': '期望定制规格',
  'Enter the desired diameter or width. Leave ET blank and the calculator will solve it from the measured clearance envelope.': '填写期望轮径或轮宽；ET 留空时，计算器会根据实测间隙范围反算。',
  'Target diameter (in)': '目标轮径（英寸）',
  'Target width (in)': '目标轮宽（英寸）',
  'Requested ET (optional)': '期望 ET（可不填）',
  'Leave blank to calculate; positive ET moves the wheel inward.': '留空即可计算；正 ET 会使轮毂向车内移动。',
  'Custom machining must match the verified vehicle hub.': '定制加工必须匹配已验证的车辆轴头。',
  'Final spacer (normally 0 mm)': '最终垫片（通常为 0 毫米）',
  'A custom ET should normally remove the need for a spacer.': '定制 ET 通常应消除使用垫片的需要。',
  'Measured current clearances': '当前配置实测间隙',
  'Measure the current installed setup. The calculator projects the remaining clearance after the new wheel and tire move.': '测量当前已安装配置，计算器会推算新轮毂和轮胎位移后的剩余间隙。',
  'Current wheel barrel to strut or spring perch; use the smallest gap.': '测量当前轮毂内桶到避震筒或弹簧座的最小间隙。',
  'Current spoke back to the caliper highest point; the final wheel still needs its 1:1 template.': '测量当前辐条背面到卡钳最高点；最终轮毂仍需 1:1 模板比对。',
  'Current tire shoulder to the inner fender lip at steering lock or axle load.': '测量当前轮胎肩部在打满方向或车轴受载时到轮眉内缘的最小间隙。',
  'Current minimum through usable suspension travel, with steering lock where applicable.': '测量悬挂有效行程中的当前最小间隙，前轴还需包含打满方向。',
  'Use the current alignment printout; negative means the top leans inward.': '按当前四轮定位单填写；负值表示轮胎上端向内倾。',
  'Use total toe for this axle from the current alignment printout.': '按当前四轮定位单填写该轴总前束。',
  'Target tire approval': '目标轮胎许可',
  'Use the exact tire maker data sheet. Size alone is not enough for a production-locked wheel width.': '请使用准确轮胎型号的数据表；只有规格尺寸不足以锁定生产轮宽。',
  'Target tire size': '目标轮胎规格',
  'Tire manufacturer': '轮胎品牌',
  'Tire model': '轮胎型号',
  'Load index': '载重指数',
  'Speed rating': '速度级别',
  'Maker-approved rim width (in)': '厂商允许轮圈宽度（英寸）',
  'Desired installed result': '期望安装效果',
  'OEM-safe street': '原厂安全街道',
  'Flush street': '齐边街道',
  'Performance / track': '性能 / 赛道',
  'Show / low stance': '展示 / 低趴',
  'Shop calibration': '店家校准',
  'Start from what your shop already knows.': '从店家已经掌握的规格开始。',
  'Enter a familiar successful specification as the candidate. CIRUI keeps its source, then checks and corrects it against this customer vehicle.': '先把熟悉或成功安装过的规格作为候选值；CIRUI 会保留来源，再按当前客户车辆检查并修正。',
  'Candidate specification source': '候选规格来源',
  'Measured on this vehicle': '当前车辆实测',
  'Previous successful install on matching vehicle': '同配置车辆成功安装案例',
  'Manufacturer drawing / application': '厂家图纸 / 适配目录',
  'Shop experience candidate': '店家经验候选值',
  'Reference build / calibration note': '参考案例 / 校准备注',
  'Example: 2022 C43, same brakes, installed 19x9 ET38 without spacer': '例如：2022 C43，同款刹车，19x9 ET38 无垫片成功安装',
  'Experience is useful as a starting point. Production lock still follows the exact vehicle, current modifications, tire approval and measured clearance.': '经验值适合作为起点；生产锁定仍以准确车型、现有改装、轮胎许可和实测间隙为准。',
  'Installation feedback record': '安装反馈记录',
  'Save what actually happened after installation': '保存安装后的真实结果',
  'This optional record turns workshop experience into reusable evidence without treating memory as an automatic approval.': '这份可选记录会把店家安装经验变成可复用证据，但不会把记忆直接当作自动批准。',
  'Installation outcome': '安装结果',
  'Candidate only / not installed': '仅候选方案 / 尚未安装',
  'Installed and verified clear': '已安装并复检无干涉',
  'Installed after specification correction': '修正规格后安装成功',
  'Interference found / needs revision': '发现干涉 / 需要修正',
  'Install date': '安装日期',
  'Installer / work order': '安装人员 / 工单号',
  'Post-install checks': '安装后复检项目',
  'Spoke-to-caliper clearance checked': '已检查辐条到卡钳间隙',
  'Barrel/tire-to-suspension clearance checked': '已检查内桶 / 轮胎到避震间隙',
  'Steering lock clearance checked': '已检查左右打满方向间隙',
  'Full suspension travel checked': '已检查悬挂完整有效行程',
  'Loaded fender clearance checked': '已检查受载后的轮眉间隙',
  'Alignment and road test completed': '已完成四轮定位与路试',
  'Post-install note': '安装后备注',
  'Record rubbing, corrections, final spacer, alignment or tire changes.': '记录刮蹭、修正后的规格、最终垫片、定位或轮胎变化。',
  'Qualified shop records for this exact vehicle': '该精确车型的店家合格记录',
  'Use as candidate': '作为候选规格使用',
  'Only records with calculated geometry and all six post-install checks appear here. They still pass through the current vehicle calculator.': '这里只显示完成几何计算及六项安装后复检的记录；复用后仍会重新经过当前车辆计算器。',
  'Successful installation record': '成功安装记录',
  'Correction followed by successful installation': '修正后成功安装记录',
  'A previous successful record was loaded as a candidate. Recalculate it against this customer vehicle.': '已把历史成功记录载入为候选规格，请按当前客户车辆重新计算。',
  'Attach the exact successful-install work order and complete all six post-install checks.': '附上准确的成功安装工单，并完成全部六项安装后复检。',
  'Complete every post-install clearance and road-test check before treating this record as shop evidence.': '在把该记录作为店家证据前，完成全部安装后间隙和路试复检。',
  'Correct the recorded interference, recalculate and complete a new installation test.': '修正已记录的干涉，重新计算并完成一次新的安装测试。',
  'Custom wheel fitment calculator.': '轮毂定制计算器。',
  'Start from a shop-proven candidate, calibrate it against the customer vehicle, and save the complete modification record for the next visit.': '从店家验证过的候选规格开始，按客户车辆校准，并保存完整改装档案供下次继续使用。',
  'Calculate': '计算',
  'Turn experience into a checked specification': '把经验转成已校验规格',
  'Archive': '档案',
  'Keep every customer revision': '保留每次客户修订',
  'One protected customer link': '一个受保护的客户链接',
  'Customer modification record': '客户改装档案',
  'Name this customer build.': '命名这套客户改装方案。',
  'Every save creates a new revision, so the shop can reopen the vehicle history later.': '每次保存都会生成新版本，店家之后可继续查看车辆历史。',
  'Calculate the custom specification': '计算定制规格',
  'The result gives a corrected plan first, then asks only for evidence still needed to production-lock it.': '结果会先给出修正方案，再只要求补充锁定生产仍缺少的证据。',
  'Calculating…': '正在计算…',
  'Calculate specification': '计算规格',
  'Production lock': '生产锁定',
  'Calculated first. Signed off last.': '先计算，最后签核。',
  'The calculator resolves the wheel and tire geometry. A 100% installation commitment is shown only after the exact vehicle, component templates, dynamic measurements and named CIRUI drawing approval are attached to the saved revision.': '计算器负责求解轮毂与轮胎几何；只有准确车型、部件模板、动态实测和 CIRUI 具名图纸批准都绑定到保存版本后，才会显示 100% 安装承诺。',
  'CIRUI custom wheel calculator': 'CIRUI 定制轮毂计算器',
  'Calculated position and remaining clearance': '计算位置与剩余间隙',
  'Calculated from current installed baseline': '基于当前已安装配置计算',
  'Complete the current baseline to calculate': '补齐当前基准后计算',
  'Wheel inner movement': '轮毂内侧位移',
  'Wheel outer movement': '轮毂外侧位移',
  'Inner clearance remaining': '剩余内侧间隙',
  'Fender clearance remaining': '剩余轮眉间隙',
  'Full-compression clearance': '完全压缩剩余间隙',
  'Rolling diameter change': '滚动直径变化',
  'Measurement needed': '需要测量',
  'Tire specification': '轮胎规格',
  'Shop calibration source': '店家校准来源',
  'Calibration source not recorded': '未记录校准来源',
  'Saved with this revision': '已随当前版本保存',
  'Installation commitment': '安装承诺',
  'Not production-locked yet': '尚未锁定生产',
  'The calculated specification becomes an installation commitment only after every evidence gate and the named CIRUI drawing approval.': '只有全部证据关卡和 CIRUI 具名图纸批准完成后，计算规格才会成为安装承诺。',
  'Record the current front wheel diameter, width, ET and spacer.': '记录当前前轮毂直径、宽度、ET 和垫片。',
  'Record the current rear wheel diameter, width, ET and spacer.': '记录当前后轮毂直径、宽度、ET 和垫片。',
  'Record the current front tire size.': '记录当前前轮胎规格。',
  'Record the current rear tire size.': '记录当前后轮胎规格。',
  'Measure the current front inner, fender and full-compression clearances.': '测量当前前轴内侧、轮眉和完全压缩间隙。',
  'Measure the current rear inner, fender and full-compression clearances.': '测量当前后轴内侧、轮眉和完全压缩间隙。',
  'Reduce the front wheel/tire width or revise the hardware until a safe ET window exists.': '减小前轮毂 / 轮胎宽度或调整硬件，直到存在安全 ET 范围。',
  'Reduce the rear wheel/tire width or revise the hardware until a safe ET window exists.': '减小后轮毂 / 轮胎宽度或调整硬件，直到存在安全 ET 范围。',
  'Record whether the brakes and suspension are factory or modified, with exact package or part numbers.': '记录刹车和避震是原厂还是改装，并填写准确套件或零件号。',
  'Attach exact vehicle application and clearance evidence for every selected modified component.': '为每个选中的改装部件附上准确车型适配和间隙证据。',
  'Confirm the factory brake and suspension option package by VIN, build sheet or OE part number.': '通过 VIN、配置单或原厂零件号确认原厂刹车和避震选装包。',
  'Adjusted to preserve the measured inner and outer clearance margins.': '已调整以保留实测内外侧安全余量。',
  'Adjusted to the selected tire maker approved rim-width range.': '已调整到所选轮胎厂商允许的轮圈宽度范围。',
  'Revision': '版本',
  'saved versions': '个历史版本',
  'Modification history': '改装历史',
  'Opening an older version loads it as a draft. Saving it creates a new revision and never deletes the later history.': '打开旧版本只会载入为草稿；再次保存会创建新版本，不会删除后续历史。',
  'Current revision': '当前版本',
  'Fitment calculation not saved in this revision': '该版本尚未保存适配计算结果',
  'Open as new draft': '作为新草稿打开',
  'No earlier revisions yet.': '暂无更早版本。',
  'Save after the next calibration and the previous customer setup will appear here.': '下次校准后保存，之前的客户配置就会保留在这里。',
  'Older revision opened as a draft. Saving will create a new revision.': '旧版本已作为草稿打开；保存后会创建一个新版本。',
  'Save this project': '保存客户档案',
  'Save once, then the same link can carry the vehicle data, design direction and quote conversation.': '保存一次后，同一链接即可持续携带车辆数据、设计方向和报价沟通。',
  'By using CIRUI, you agree to our cookie policy and fitment analytics.': '继续使用 CIRUI 即表示你同意 Cookie 政策和适配数据分析。',
  'Dismiss': '关闭'
};
Object.assign(localeDictionaries['zh-CN'], fitmentPlanChineseTranslations);
Object.assign(localeDictionaries['zh-TW'], Object.fromEntries(Object.entries(fitmentPlanChineseTranslations).map(([key, value]) => [key, traditionalizeFitmentText(value)])));

const fitmentFlowChineseTranslations = {
  'Global delivery on performance parts ·': '高性能零件全球配送 ·',
  'Enjoy as low as 0% APR Financing': '低至 0% 年利率融资',
  '· Build now, pay later': '· 现在定制，稍后付款',
  'Journal': '杂志',
  'Language': '语言',
  'Step': '步骤',
  'Choose how this build starts.': '选择这次定制从哪里开始。',
  'What do you have right now?': '你现在从哪一步开始？',
  'Choose either route. Both use the same engineering record and lead to the same checked result.': '两条路径没有主次，都会使用同一份工程档案并得到同样经过核验的结果。',
  'Route': '路径',
  'Two paths, one engineering record.': '从你已经掌握的信息开始。',
  'The shop can begin with a wheel style or calculate the usable envelope first. Both paths keep the same vehicle, modification, measurement and approval history.': '已经选好轮毂，就验证款式；还没选，就先计算可用规格。车辆、改装、实测和审核记录始终保存在同一份档案中。',
  'Enter the exact vehicle, brake and suspension modifications, measured clearances and intended result. The calculator checks PCD and center bore, calculates wheel width, offset and compatible tires, then returns 1–3 proposals ready to save, share or quote. Built for OEM upgrades, big-brake conversions, flush or stance setups and track use.': '输入准确车型、刹车与避震改装、实测间隙和目标效果，系统会核对 PCD 与中心孔，反算轮宽、ET 和适配轮胎，并生成 1–3 套可保存、分享和询价的定制方案。适用于原厂升级、大刹车、低趴齐边与赛道设定。',
  'I already chose a style': '我已经选好款式',
  'A wheel style or reference': '已有款式或参考图',
  'Start from a style': '从款式开始',
  'Choose a CIRUI wheel or upload a reference image first.': '先选择 CIRUI 轮毂，或上传一张参考款式图。',
  'Then validate it against the exact vehicle and measured setup.': '随后再与准确车型、改装和实测数据进行核对。',
  'Validate a selected CIRUI wheel or reference design against this exact vehicle.': '把选中的 CIRUI 轮毂或参考款式与这台准确车辆进行适配验证。',
  'Start with fitment': '先帮我算适配方案',
  'Vehicle data and measurements': '车辆数据与实测参数',
  'Start from vehicle data': '从车辆参数开始',
  'Enter the vehicle, modifications and measurements first.': '先填写车型、改装部件和当前实测数据。',
  'Then compare styles that can support the calculated result.': '计算出安全边界后，再比较能够支持结果的款式。',
  'Choose this route': '选择这条路径',
  'Enter the vehicle and measured setup first, then choose from styles that can support the result.': '先填写车辆与实测配置，再从能够实现该参数的款式中选择。',
  'Open style-first workflow': '开始款式优先流程',
  'Open fitment-first workflow': '开始参数优先流程',
  'Style first': '款式优先',
  'Fitment first': '参数优先',
  'Resume current build': '继续当前方案',
  'Edit inputs': '修改输入',
  'View latest result': '查看最新结果',
  'Current engineering file': '当前工程档案',
  'Engineering workspace': '工程工作区',
  'No current build yet': '尚未创建工程档案',
  'Your vehicle, measurements and calculation result will appear here after you begin.': '开始填写后，车辆、实测数据和计算结果会显示在这里。',
  'Clear': '清空',
  'Clear current build': '清空当前档案',
  'Clear this current build?': '确认清空当前档案？',
  'This removes the vehicle, measurements, selected wheel and latest calculation from this browser.': '这会清除当前浏览器中的车型、实测数据、已选轮毂和最新计算结果。',
  'Projects already saved to your account will remain available in My Account.': '已保存到账号的客户项目仍会保留，可在“我的账户”中重新打开。',
  'Keep current build': '保留当前档案',
  'Confirm clear': '确认清空',
  'Current build cleared.': '当前档案已清空。',
  'Remove partner attribution': '解除店家关联',
  'Remove this shop connection?': '确认解除店家关联？',
  'Future design, inquiry and order activity on this browser will no longer be attributed to this shop.': '解除后，此浏览器后续的设计、询价和订单将不再归因到该店家。',
  'This does not delete the shared build or any saved project.': '共享方案和任何已保存项目都不会被删除。',
  'Keep shop connection': '保留店家关联',
  'Remove connection': '确认解除',
  'Partner attribution cleared.': '店家关联已解除。',
  'Calculation status': '计算状态',
  'Awaiting first calculation': '等待首次计算',
  'Best when': '适合',
  'A wheel product or reference image is already selected.': '已经选定轮毂商品或准备好了参考图。',
  'The wheel specification needs to be calculated before choosing a style.': '需要先算出轮毂规格，再挑选能够实现的款式。',
  'One record follows both workflows.': '两条路径共用一份档案。',
  'Switching the starting route never discards the vehicle, modification or measurement history.': '切换起点不会丢失车型、改装或实测记录。',
  'No result has been calculated yet.': '还没有完成计算。',
  'Start a fitment workflow to create the first checked proposal.': '先开始适配流程，生成第一版已校验方案。',
  'Build brief': '定制需求',
  'Exact vehicle': '准确车型',
  'Installed hardware': '现有改装',
  'Current measurements': '当前实测',
  'Target and tires': '目标与轮胎',
  'Back': '上一步',
  'Next': '下一步',
  'Close fitment workspace': '关闭适配工作台',
  'Select the starting direction.': '选择这次定制的起点。',
  'Pick an existing CIRUI style or upload one reference image. The style still needs its final spoke and barrel drawing check.': '选择现有 CIRUI 款式或上传一张参考图。最终仍需检查该款式的辐条和内桶图纸。',
  'Selected wheel style': '已选轮毂款式',
  'CIRUI wheel catalog': 'CIRUI 轮毂目录',
  'Browse every available wheel': '浏览全部可选轮毂',
  '{count} wheel designs available': '共 {count} 款轮毂',
  'Filter by construction': '按结构筛选',
  'Search the wheel catalog': '搜索轮毂目录',
  'Search wheel name or series': '搜索轮毂名称或系列',
  'All wheels': '全部轮毂',
  'One-piece forged': '单片锻造',
  'Two-piece forged': '双片锻造',
  'Every available design': '全部可选设计',
  'Lightweight single-piece construction': '轻量一体式结构',
  'Separate center and barrel': '独立轮心与轮辋结构',
  'Matching designs': '匹配款式',
  'Your current direction': '当前选择方向',
  'Selection status': '选择状态',
  'Required before continuing': '继续前必须选择',
  'Wheel selected': '已选轮毂',
  'Select design': '选择款式',
  'Selected design': '已选款式',
  'No wheels match this search.': '没有找到符合条件的轮毂。',
  'Try another name or clear the current filters.': '请尝试其他名称，或清除当前筛选条件。',
  'Clear search': '清除搜索',
  'Scroll inside the catalog to see every matching design.': '可在目录内继续滚动，浏览全部匹配款式。',
  'Or bring your own direction': '或者上传你的设计方向',
  'Upload image': '上传图片',
  'All': '全部',
  'Monoblock': '单片式',
  '2-piece': '双片式',
  'Show preview only': '收起，仅显示预览',
  'View all {count} wheels': '查看全部 {count} 款轮毂',
  'Showing {visible} of {total}': '当前显示 {visible} / {total}',
  'Unconfirmed constructions remain in All until drawing review.': '结构待确认的款式暂时仅保留在“全部”中，最终以图纸审核为准。',
  'Choose this style': '选择这个款式',
  'Selected': '已选择',
  'Upload a reference style': '上传参考款式',
  'Reference image selected': '已选择参考图',
  'JPG, PNG or WebP. Used as a design direction, not as dimensional evidence.': '支持 JPG、PNG 或 WebP；仅作为设计方向，不作为尺寸证据。',
  'Tell us the job and intended result.': '说明这次项目和期望效果。',
  'These choices control which safety margins and questions the calculator uses.': '这些选择会决定计算器采用的安全余量和后续问题。',
  'Identify the exact vehicle.': '确认准确车辆。',
  'Use the VIN or manufacturer build record when trim, market or factory options are uncertain.': '配置、市场或原厂选装不确定时，请使用 VIN 或厂家配置记录核对。',
  'VIN / build reference (optional)': 'VIN / 配置记录（可选）',
  'Record what is installed now.': '记录车辆现在安装的部件。',
  'Factory parts are valid choices. Modified parts should use the exact brand, model and part number whenever possible.': '原厂部件也是有效选项；改装部件应尽量填写准确品牌、型号和零件号。',
  'Shop experience and calibration': '店家经验与校准',
  'Measure one axle at a time.': '一次测量一个车轴。',
  'Switch between front and rear. Values are saved immediately while you work.': '在前后轴之间切换；填写过程中数据会立即保存。',
  'Front': '前轴',
  'Rear': '后轴',
  'How to measure': '如何测量',
  'Current wheel and tire': '当前轮毂与轮胎',
  'Clearance and alignment': '间隙与定位',
  'Set the target, or leave it for the calculator.': '填写目标参数，也可以交给计算器求解。',
  'Unknown target values may stay blank. Exact tire approval data makes a proposal stronger.': '不知道的目标值可以留空；完整轮胎许可数据能提高方案可信度。',
  'Optional preferred wheel': '可选的偏好轮毂参数',
  'Tire approval data': '轮胎许可数据',
  'Review and calculate': '复核并计算',
  'The calculator will only mark a proposal selectable when the entered hard constraints do not conflict.': '只有已填写的硬性约束没有冲突时，计算器才会允许选择方案。',
  'Calculate 1–3 proposals': '计算 1–3 个方案',
  'Calculating proposals…': '正在计算方案…',
  'Complete the selected wheel style or upload a reference before continuing.': '继续前请先选择轮毂款式或上传参考图。',
  'Choose at least the year, make and model before continuing.': '继续前至少选择年份、品牌和车型。',
  'Choose the exact year, make, model, trim and drive before continuing.': '继续前请填写准确年份、品牌、车型、配置版本和驱动形式。',
  'Please complete the following required vehicle fields:': '请补充以下必填车辆信息：',
  'Fitment proposals': '适配方案',
  'Choose a usable proposal, then save it to the customer record or continue to a wheel style.': '选择可用方案后，可以保存到客户档案，或继续选择轮毂款式。',
  'Current target cannot be approved': '当前目标不能批准',
  'A corrected direction is shown, but it cannot be selected until the listed conflict is resolved.': '系统已给出修正方向，但解决所列冲突前不能选择。',
  'A proposal is ready for measurement': '已有方案，等待补充测量',
  'Complete the remaining evidence before the wheel drawing is locked.': '补齐剩余证据后才能锁定轮毂图纸。',
  'Ready for drawing review': '可进入图纸复核',
  'Known constraints are consistent. CIRUI still checks the selected wheel drawing and physical templates.': '已知约束一致；CIRUI 仍会核对所选款式图纸和实体模板。',
  'Missing evidence': '待补资料',
  'Professional data': '专业数据',
  'Recommended': '推荐',
  'Balanced clearance': '均衡余量',
  'Flush appearance': '齐边效果',
  'Customer target': '客户目标',
  'Corrected starting point': '修正起始方案',
  'Selectable': '可以选择',
  'Blocked': '暂不可选',
  'Select this proposal': '选择此方案',
  'Selected proposal': '已选方案',
  'View proposal details': '查看方案详情',
  'Wheel specification': '轮毂规格',
  'Tire': '轮胎',
  'Still needs approval': '仍需确认',
  'Style drawing check': '款式图纸检查',
  'Browse matching styles': '寻找匹配款式',
  'Ask CIRUI to custom build': '找 CIRUI 定制',
  'Save customer record': '保存客户档案',
  'Predicted clearance': '预计间隙',
  'Moves toward suspension': '向避震侧靠近',
  'Moves away from suspension': '远离避震',
  'Moves toward fender': '向轮眉外移',
  'Moves inward from fender': '从轮眉向车内收',
  'No position change': '位置不变',
  'Predicted interference': '预计干涉',
  'Predicted remaining clearance': '预计剩余间隙',
  'Measurement required': '需要实测',
  'The previous result is out of date because the inputs changed. Recalculate before saving or quoting.': '输入已经改变，之前的结果已过期；保存或报价前请重新计算。',
  'Measurement guide': '测量指引',
  'Measure the smallest real gap on the currently installed setup. Do not estimate from a photo.': '请测量当前已安装配置的真实最小间隙，不要根据照片估算。',
  'Inner barrel to suspension': '内桶到避震',
  'Measure the smallest gap from the wheel barrel or tire to the strut body and spring perch.': '测量轮毂内桶或轮胎到避震筒及弹簧座的最小距离。',
  'Spoke back to caliper': '辐条背面到卡钳',
  'Use the caliper highest point and keep the final 1:1 brake template for drawing approval.': '以卡钳最高点为准，并保留最终 1:1 刹车模板用于图纸批准。',
  'Tire shoulder to fender': '轮胎肩部到轮眉',
  'Front axle is checked at steering lock; rear axle is checked under realistic load.': '前轴在打满方向时检查，后轴在真实载荷下检查。',
  'Full travel minimum': '完整行程最小间隙',
  'Check the minimum gap through usable suspension travel, not only at static ride height.': '检查悬挂有效行程中的最小间隙，而不只是静态车高。',
  'Engineering evidence': '工程证据',
  'Calculation details': '计算详情',
  'The signs have been translated into physical directions. A negative remaining clearance is shown as interference and can never be selected.': '系统已把正负号转换成实际移动方向；负的剩余间隙会直接显示为干涉，并且不能选择。',
  'Describe the installed parts in your own words.': '用你习惯的方式描述已经安装的改装件。',
  'Paste a work-order note, customer description or measurement record. AI will organize only the facts you stated and list what still needs confirmation.': '可以粘贴工单、客户描述或测量记录。AI 只整理你明确提供的事实，并列出仍需确认的内容。',
  'Organize with AI': '用 AI 整理',
  'Organizing facts…': '正在整理事实…',
  'AI fact organizer': 'AI 事实整理',
  'AI only organizes stated facts. It never approves dimensions or installation safety.': 'AI 只整理已陈述事实，不会批准尺寸或安装安全性。',
  'Known facts': '已识别事实',
  'Questions to confirm': '需要确认的问题',
  'Evidence to collect': '需要补充的证据',
  'No explicit hardware facts were found yet.': '暂未识别到明确的改装件事实。',
  'Please enter a description first.': '请先填写改装描述。',
  'AI organization is temporarily unavailable. You can continue by selecting parts manually.': 'AI 整理暂时不可用，你仍可继续手动选择改装件。',
  'Installed parts and measurement notes': '已装改件与测量备注',
  'Current wheel (axle not specified)': '当前轮毂（轴位未说明）',
  'Current tire (axle not specified)': '当前轮胎（轴位未说明）',
  'Vehicle reference data': '车型参考数据',
  'Loading vehicle reference…': '正在查询车型参考…',
  'Verified exact-vehicle record': '准确车型已核验',
  'Reference only': '仅供参考',
  'Platform reference matched': '已匹配平台参考',
  'Exact vehicle reference found': '已找到准确车型参考',
  'No reference record matched yet.': '暂未匹配到参考记录。',
  'Continue with the VIN, current wheel markings and physical measurements.': '请继续使用 VIN、当前轮毂标识和现车实测数据。',
  'Reference values help lookup and comparison. They never overwrite measurements or approve production automatically.': '参考值用于查询和对照，不会覆盖实测值，也不会自动批准生产。',
  'Typical wheel range': '常见轮毂范围',
  'Brake baseline': '刹车基线',
  'Source and limits': '来源与限制',
  'View source': '查看来源',
  'AI parameter lookup': 'AI 参数查询',
  'Describe the vehicle changes. AI will look up the related parameters.': '描述车辆改装，AI 会查询相关参数。',
  'Enter the installed brake, rotor, suspension, ride height or measurements you know. AI will match the vehicle and component library, then prepare a wheel-size starting point for the calculator.': '填写你知道的卡钳、刹车盘、避震、车高或实测数据。AI 会匹配车型与改装件资料库，并为计算器准备轮毂尺寸起始范围。',
  'Search parameters with AI': '用 AI 查询参数',
  'Searching vehicle and component data…': '正在查询车型与改装件参数…',
  'AI looks up reference data and fills confirmed inputs. Final width, ET and tire are calculated from the remaining measurements.': 'AI 会查询参考资料并回填可确认数据；最终轮宽、ET 和轮胎由后续实测数据计算。',
  'Matched component data': '匹配到的改装件资料',
  'Wheel calculation starting point': '轮毂计算起点',
  'Calculation inputs found': '已找到的计算输入',
  'What to complete next': '下一步需要补充',
  'No component-library match was found.': '资料库暂未匹配到对应改装件。',
  'Exact part number': '准确料号',
  'Vehicle-family reference': '车型系列参考',
  'Model-family reference': '型号系列参考',
  'Family reference': '品牌 / 系列参考',
  'Not found': '未匹配',
  'Front reference': '前轴参考',
  'Rear reference': '后轴参考',
  'Minimum wheel diameter': '轮毂最小直径参考',
  'Rotor reference': '刹车盘参考',
  'Width and ET': '轮宽与 ET',
  'Tire reference': '轮胎参考',
  'Hub specification': '轴头规格',
  'Source': '资料来源',
  'One-click apply and continue precise custom-wheel calculation': '一键录入，继续精准计算轮毂个性化定制',
  'Applied to calculator': '已录入计算器',
  'Confirmed values were filled. Fields still needed are marked in red.': '可确认参数已回填；仍需补充的字段已用红框标出。',
  'Complete this field': '待补充',
  'Enter or measure this value before the precision calculation.': '请填写或实测此项后再进行精准计算。',
  'Component model / part number details': '改装件型号 / 料号详情',
  'Front caliper description': '前卡钳描述',
  'Rear caliper description': '后卡钳描述',
  'Front rotor description': '前刹车盘描述',
  'Rear rotor description': '后刹车盘描述',
  'Suspension description': '避震描述',
  'Model or part number': '型号或料号',
  'AI lookup is a starting point, not installation approval. Exact component drawings and physical clearance remain required before production.': 'AI 查询结果是计算起点，不是安装批准；生产前仍需准确改装件图纸和现车间隙复核。',
  'Reference baseline': '参考基线',
  'Verified vehicle reference': '已核验车型参考',
  'Vehicle data required': '需要车型资料',
  'No missing inputs were identified.': '暂未发现需要补充的输入。',
  'Open the marked step': '前往补充',
  'AI parameter lookup is temporarily unavailable. You can continue by entering the known data manually.': 'AI 参数查询暂时不可用，你仍可手动填写已知数据继续。',
  'Official identity lookup': '官方车辆身份查询',
  'Decode vehicle by VIN': '使用 VIN 识别车辆',
  "Enter the vehicle's 17-character VIN to retrieve its manufacturer-submitted identity.": '输入车辆的 17 位 VIN，查询制造商提交的车辆身份信息。',
  '17-character VIN': '17 位 VIN',
  'Decode VIN': '查询 VIN',
  'Checking official vehicle record…': '正在查询官方车辆记录…',
  'Vehicle found via NHTSA': '已通过 NHTSA 找到车辆',
  'Review the decoded trim and drive before continuing.': '继续前请核对识别出的配置版本和驱动形式。',
  'NHTSA vPIC covers vehicles sold or imported into the United States most completely.': 'NHTSA vPIC 对在美国销售或进口的车型覆盖最完整。',
  'VIN lookup does not provide wheel fitment, factory options, accident history, mileage or ownership.': 'VIN 查询不提供轮毂适配、原厂选装、事故、里程或车主历史。',
  'Enter a valid 17-character VIN. Letters I, O and Q are not used.': '请输入有效的 17 位 VIN；VIN 不使用字母 I、O 和 Q。',
  'Official vehicle service unavailable. You can continue by entering the vehicle manually.': '官方车辆查询服务暂时不可用，你可以手动填写车型继续。',
  'VIN lookup failed.': 'VIN 查询失败',
  'Too many VIN checks. Please wait before trying again.': 'VIN 查询次数过多，请稍后再试。',
  'No exact vehicle record was returned. Enter the vehicle manually and review the VIN.': '未返回准确车辆记录，请核对 VIN 或手动填写车型。',
  'Partial record — review every field.': '当前记录不完整，请逐项核对。',
  'Engine': '发动机',
  'cyl': '缸',
  'Built in': '生产国家 / 地区',
  'Front wheel diameter': '原厂前轮直径',
  'Rear wheel diameter': '原厂后轮直径',
  'Number of wheels': '车轮数量',
  'Track width': '轮距',
  'Manufacturer-reported wheel data': '制造商申报的轮毂数据：',
  'Diameter only; PCD, width, ET, center bore and factory option package still require an exact OEM or physical check.': '仅代表轮毂直径；PCD、宽度、ET、中心孔和原厂选装包仍需通过准确原厂资料或实车检查确认。',
  'No manufacturer wheel fields were submitted for this VIN.': '该 VIN 没有制造商申报的轮毂字段。',
  'Continue with the exact trim, OEM build record and physical wheel measurements.': '请继续结合准确配置版本、原厂配置记录和实车轮毂测量数据。',
  'Choose suspension': '选择避震',
  'Choose installed component': '选择已安装部件',
  'Factory component recorded': '已记录原厂部件',
  'AI candidate recorded — verify the exact kit before production': '已记录 AI 识别系列 · 生产前复核准确套件',
  'Catalog component selected': '已选择资料库部件',
  'Search by model or part number': '按型号或料号搜索',
  'piston': '活塞',
  'Series reference': '系列资料',
  'Verified application': '已验证应用',
  'Suggested': '建议候选',
  'Catalog': '资料库',
  'Search model, series or part number': '搜索型号、系列或料号',
  'Clear': '清空',
  'Enter at least two characters to search the component catalog.': '输入至少 2 个字符搜索部件资料库。',
  'Selected. Search only if this component needs to be changed.': '已选定；仅在需要更换该部件时搜索。',
  'No matching component. Keep the workshop note and add the exact code later.': '没有匹配部件；可保留车间备注，稍后补充准确编号。',
  'Recognized parts recorded': '识别部件已记录',
  'Confirm the recognized component families': '确认 AI 识别的部件系列',
  '{count} measurements remain; production evidence can be added later.': '还需 {count} 项实测；生产资料可稍后补充。',
  '{count} component candidates are ready to confirm.': '已有 {count} 个部件候选待确认。',
  'Continue to measurements': '继续录入实测',
  'Confirm matches': '确认识别结果',
  'Production verification — add later': '生产复核资料 · 可稍后补充',
  'production checks': '项生产复核',
  'Component candidates': '部件候选',
  'Exact manufacturer kit code': '厂家准确套件编号',
  'Optional now — required only before production approval': '现在可不填 · 仅生产批准前需要',
  'Enter the marking on the caliper, rotor or kit label': '填写卡钳、刹车盘或套件铭牌上的编号',
  'Recognized from workshop notes': '来自车间备注识别',
  'The recognized description is already saved. Add an exact code or template only when preparing the production drawing.': '已自动保存识别描述；准备生产图纸时再补准确编号或模板。',
  'Installed hardware': '当前已安装部件',
  'Confirm the parts, not the same text twice.': '确认部件，不必重复填写同一句话。',
  'AI candidates are recorded when you confirm them. Search only when a suggestion needs correction.': '确认后会直接记录 AI 候选；只有识别不准确时才需要搜索更换。',
  'Rotors, suspension and ride height': '刹车盘、避震与车身高度',
  'Open only when these parts or measurements changed.': '仅在这些部件或数据有变化时展开。',
  'Use the measured drop; leave blank for factory height.': '填写实测降低量；原厂高度可留空。',
  'Confirm the installed hardware.': '确认当前已安装部件。',
  'AI identifies a component family; the workshop confirms the record. Exact codes and templates are collected later for production approval.': 'AI 先识别部件系列，由车行确认记录；准确编号与模板留到生产批准前补充。',
  'Workshop note used for this lookup': '本次查询使用的车间备注',
  'Edit and search again': '编辑并重新查询',
  'AI intake completed': 'AI 识别已完成',
  'View or edit analysis': '查看或修改分析'
};
Object.assign(localeDictionaries['zh-CN'], fitmentFlowChineseTranslations);
Object.assign(localeDictionaries['zh-TW'], Object.fromEntries(Object.entries(fitmentFlowChineseTranslations).map(([key, value]) => [key, traditionalizeFitmentText(value)])));

const homeMiddleChineseTranslations = {
  'SHOP BY VEHICLE': '按车型选购',
  'Real CIRUI wheel directions,': '真实 CIRUI 轮毂方案，',
  'organized around the car.': '按车型清晰整理。',
  'Open any series to review the product and use the existing vehicle-photo preview. Every wheel remains quote-built to the exact vehicle; vehicle names identify compatibility only.': '打开任意车系即可查看产品，并使用现有的车辆照片效果预览。每款轮毂仍会按准确车型单独核价生产；车型名称仅用于说明适配范围。',
  'European performance': '欧系性能车',
  'Luxury & SUV': '豪华车与 SUV',
  'SUV & off-road': 'SUV 与越野',
  'EV & modern': '新能源与现代车型',
  'US luxury': '美系豪华车',
  'BMW Custom Forged Fitment': 'BMW 定制锻造适配方案',
  'Mercedes-Benz SUV Custom Forged Fitment': '梅赛德斯-奔驰 SUV 定制锻造适配方案',
  'Audi Custom Forged Fitment': '奥迪定制锻造适配方案',
  'Porsche Custom Forged Fitment': '保时捷定制锻造适配方案',
  'Volkswagen Custom Forged Fitment': '大众定制锻造适配方案',
  'Land Rover Custom Forged Fitment': '路虎定制锻造适配方案',
  'Toyota 4x4 Custom Forged Fitment': '丰田 4×4 定制锻造适配方案',
  'Tesla Custom Forged Fitment': '特斯拉定制锻造适配方案',
  'Bentley Custom Forged Fitment': '宾利定制锻造适配方案',
  'Rolls-Royce Custom Forged Fitment': '劳斯莱斯定制锻造适配方案',
  'Cadillac Custom Forged Fitment': '凯迪拉克定制锻造适配方案',
  'Lexus Custom Forged Fitment': '雷克萨斯定制锻造适配方案',
  'SUV & 4x4 Custom Forged Fitment': 'SUV 与 4×4 定制锻造适配方案',
  'View + preview': '查看 + 预览',
  'Need a different platform? The fitment lab supports a broader vehicle catalog.': '没有找到你的车型？适配实验室支持更完整的车辆目录。',
  'Check another vehicle': '查询其他车型',
  'THE CIRUI FACTORY': 'CIRUI 策锐工厂',
  'From raw wheel blank': '从锻造轮坯',
  'to finished set.': '到整套成品\u200b交付。',
  'The strongest export story is the real one: factory production, CNC machining, finish control, inspection and packaging — handled close to the source.': '最有说服力的外贸故事就是真实制造：工厂生产、CNC 加工、表面控制、质量检验与包装，都在源头完成。',
  'Custom engineering': '定制工程设计',
  'Vehicle and use-case information becomes the production brief.': '车辆信息与使用场景会转化为明确的生产需求。',
  'Factory visibility': '真实工厂可视化',
  'Real manufacturing and finished-wheel imagery, not stock photography.': '展示真实生产与成品轮毂，不使用素材图库冒充工厂。',
  'Direct export support': '出口直供支持',
  'One route from specification confirmation through global delivery.': '从规格确认到全球配送，由同一条服务链路持续跟进。',
  'Explore our factory': '了解我们的工厂',
  'Production line': '生产线',
  'Source manufacturing': '源头制造',
  'CNC machining': 'CNC 精密加工',
  'Wheel-specific precision': '轮毂专用精密工艺',
  'Finished inventory': '成品库存',
  'Inspection before packing': '包装前质量检验',
  'BUILT CLOSE TO MOTORSPORT': '与汽车赛事同行',
  'Fitment is not theory': '适配绝不是纸上理论',
  'when the car is at speed.': '尤其当车辆在赛道疾驰时。',
  'CIRUI participates in automotive events and motorsport activity, bringing the brand into the same world as brake clearance, tire envelope, vehicle load and real track use.': 'CIRUI 积极参与汽车活动与赛事，把品牌带进真实的性能环境，持续理解刹车间隙、轮胎包络、车辆载荷与赛道使用需求。',
  'Race and track participation': '参与赛事与赛道活动',
  'Tuning community presence': '深入改装车社群',
  'Performance-led fitment culture': '以性能为导向的适配文化',
  'Our story': '了解我们的故事',
  'FROM BRIEF TO YOUR DOOR': '从需求沟通到送达',
  'A clear custom-wheel': '清晰透明的定制轮毂',
  'delivery path.': '生产与交付流程。',
  'For supported destinations, CIRUI can quote production and DDP delivery together. The exact destination, specification and final quote control the confirmed schedule.': '对于支持的目的地，CIRUI 可将生产与 DDP 配送一并报价。最终交期以准确目的地、产品规格和确认报价为准。',
  'Share the vehicle + goal': '提供车辆与改装目标',
  'Tell us the exact car, brake package, suspension, stance and how you drive.': '告诉我们准确车型、刹车套件、悬挂、姿态以及你的驾驶方式。',
  'Approve fitment + design': '确认适配参数与设计',
  'Review diameter, width, PCD, ET, center bore, profile, finish and the visual direction.': '确认直径、宽度、PCD、ET、中心孔、轮廓、表面处理与视觉方向。',
  'Forge, machine + inspect': '锻造、加工与检验',
  'Your set moves through factory production, CNC machining, finishing and final inspection.': '整套轮毂依次完成工厂生产、CNC 加工、表面处理与最终检验。',
  'For supported destinations, the confirmed quote can include duty-paid delivery to your door.': '对于支持的目的地，确认报价可包含完税到门配送。',
  'Start the brief': '开始提交需求',
  'Target: production + transport in about 30 business days.': '目标：生产 + 运输约 30 个工作日。',
  'Timing is confirmed with the final vehicle specification, finish, destination and DDP quote.': '最终时间将根据车辆规格、表面处理、目的地与 DDP 报价确认。',
  'IN THE REAL WORLD': '真实世界中的 CIRUI',
  'Factory, track': '工厂、赛道',
  'and tuning culture.': '与改装文化。',
  'Real photographs from CIRUI production, exhibitions and motorsport provide the proof behind the brand.': '来自 CIRUI 生产、展会与赛事的真实照片，为品牌实力提供直接证明。',
  'Brand events': '品牌活动',
  'CIRUI Forged in the tuning community': 'CIRUI 策锐锻造走进改装车社群',
  'Design display': '设计展示',
  'Forged directions shown in the real world': '在真实场景中展示锻造轮毂方向',
  'Competition-backed product understanding': '以赛事经验加深产品理解',
  'Finish range': '表面工艺范围',
  'Color, profile and detail references': '颜色、轮廓与细节参考',
  'READY DESIGN DIRECTIONS': '成熟设计方向',
  'Choose a starting point.': '先选择一个设计起点。',
  'Then make it yours.': '再把它变成你的专属方案。',
  'The existing wheel catalog, product pages, quoting flow and car-photo visualizer stay intact.': '现有轮毂目录、商品页面、询价流程与车辆照片效果预览功能全部保留。',
  'Browse all forged wheels': '浏览全部锻造轮毂',
  'New': '新品',
  'Custom size - All diameters and widths available - PCD / ET / CB built to order': '全尺寸定制 · 直径、宽度、PCD、ET、CB 均可按订单生产',
  'Made to order - Fitment, finish and hardware customized by CIRUI': '按订单生产 · 适配、表面处理与五金由 CIRUI 定制',
  'CIRUI Halo 20-Spoke - Custom Hydraulic Forged Aluminum Alloy Step-Lip Wheel': 'CIRUI Halo 20 辐 · 定制液压锻造铝合金阶梯唇轮毂',
  'CIRUI Meridian - Custom Hydraulic Forged Aluminum Alloy Precision Multi-Spoke Wheel': 'CIRUI Meridian · 定制液压锻造铝合金精密多辐轮毂',
  'CIRUI Vanta 10 - Custom Hydraulic Forged Aluminum Alloy 10-Spoke Deep-Lip Wheel': 'CIRUI Vanta 10 · 定制液压锻造铝合金十辐深唇轮毂',
  'CIRUI Apex - Custom Hydraulic Forged Aluminum Alloy Split-Spoke Performance Wheel': 'CIRUI Apex · 定制液压锻造铝合金分叉辐性能轮毂',
  'Customize & quote': '定制并询价',
  'Verified customer feedback': '已验证客户评价',
  'Built by people who drive them.': '来自真实车主的安装体验。',
  'Real feedback from drivers building daily cars, weekend projects and track setups.': '真实反馈来自日常用车、周末改装项目与赛道车辆的车主。',
  'Perfect fitment': '适配非常完美',
  'The custom 23-inch electroplated chrome wheels came out absolutely perfect on the Rolls-Royce Phantom.': '这套定制 23 英寸电镀铬轮毂安装在劳斯莱斯幻影上的效果非常完美。',
  'Beautiful wheel design': '轮毂设计非常漂亮',
  'I received my wheels today and I am very happy. I highly recommend them.': '今天收到了轮毂，我非常满意，强烈推荐。',
  'Customer 088': '客户 088',
  'Customer 090': '客户 090',
  'Bulgaria': '保加利亚',
  'Custom Deep Concave Forged Wheel': '定制深凹锻造轮毂',
  'Forged Brushed Performance Wheel': '拉丝性能锻造轮毂',
  '1-Piece Forged Deep Concave Wheel': '单片式深凹锻造轮毂',
  'Super Deep Concave Custom Wheel': '超深凹定制轮毂',
  '{count} customer reviews': '{count} 条客户评价',
  '{count} reviews': '{count} 条评价',
  '{count} photos shared': '{count} 张照片',
  '{count} photo shared': '{count} 张照片',
  'No verified reviews yet': '暂无已验证评价',
  'Verified purchase': '已验证购买',
  'Seller response': '商家回复',
  'photos shared': '张照片',
  'photo shared': '张照片'
};
Object.assign(localeDictionaries['zh-CN'], homeMiddleChineseTranslations);
Object.assign(localeDictionaries['zh-TW'], Object.fromEntries(Object.entries(homeMiddleChineseTranslations).map(([key, value]) => [key, traditionalizeFitmentText(value)])));

const publicSiteChineseTranslations = {
  '策锐官网 · GLOBAL': '策锐官网 · 官方海外网站',
  'Home': '首页',
  'Shop': '商城',
  'Wheels': '轮毂',
  'Calipers': '卡钳',
  'Rotors': '刹车盘',
  'Brake Pads': '刹车片',
  'Performance parts': '性能部件',
  'All performance parts': '全部性能部件',
  'Factory': '工厂',
  'Fitment': '适配',
  'Technical': '技术指南',
  'Engineering': '工程技术',
  'Finish': '表面处理',
  'Journal': '杂志',
  'CIRUI Journal': 'CIRUI 策锐杂志',
  '4 min read': '阅读约 4 分钟',
  '5 min read': '阅读约 5 分钟',
  '6 min read': '阅读约 6 分钟',
  '7 min read': '阅读约 7 分钟',
  'Fitment · 6 min read': '适配 · 阅读约 6 分钟',
  '策锐官网 · OFFICIAL GLOBAL SITE': '策锐官网 · 官方海外网站',

  'ABOUT CIRUI FORGED': '关于 CIRUI 策锐锻造',
  'A source wheel factory': '一家源头轮毂工厂',
  'built for global custom projects.': '为全球定制项目而生。',
  '策锐官网 is the official overseas website of CIRUI Forged, connecting European and North American drivers, tuning shops and partners directly with the people engineering and producing the wheels.': '策锐官网 是 CIRUI 策锐锻造的官方海外网站，让欧洲与北美车主、改装店和合作伙伴直接对接轮毂的工程设计与源头生产团队。',
  'Factory capability.': '源头工厂能力。',
  'Fitment intelligence.': '专业适配能力。',
  'CIRUI is positioned around one simple advantage: the product and the technical conversation live close to the source. The same site that helps a buyer calculate fitment and preview the wheel also explains how the wheel moves into production.': 'CIRUI 的核心优势很直接：产品制造与技术沟通都贴近源头。你可以在同一网站计算轮毂适配、预览上车效果，并清楚了解方案如何进入生产。',
  '“策锐官网 is CIRUI Forged for the global market.”': '“策锐官网，就是面向全球市场的 CIRUI 策锐锻造。”',
  'HOW WE WORK': '我们的生产方式',
  'Real production,': '真实生产，',
  'shown clearly.': '清晰呈现。',
  'No invented scale figures and no borrowed factory imagery — only the manufacturing material supplied by CIRUI.': '不虚构工厂规模，也不借用他人生产素材；这里只展示 CIRUI 提供的真实制造资料。',
  'Production line': '生产线',
  'CNC machining': 'CNC 精密加工',
  'Finished wheels': '轮毂成品',
  'Packaging for delivery': '出口交付包装',
  'Engineering the brief': '梳理工程需求',
  'Exact vehicle, brakes, suspension, use case and aesthetic direction are translated into a production specification.': '把准确车型、刹车、悬挂、使用场景与设计偏好转化为明确的生产规格。',
  'Machining the wheel': '轮毂精密加工',
  'CNC machining turns the forged blank into the approved spoke, hub and profile direction.': '通过 CNC 加工，把锻造轮坯制成已确认的辐条、轮心与轮廓方案。',
  'Finish + detail': '表面工艺与细节',
  'Color, gloss level, machined details and center-cap direction complete the visual brief.': '颜色、光泽度、机加工细节与中心盖方案共同完成最终视觉要求。',
  'Inspection + export': '检验与出口',
  'The finished set is checked, packed and routed through the confirmed export plan.': '整套成品完成检验与包装后，按确认的出口运输方案发出。',
  'MOTORSPORT + EVENTS': '汽车赛事与活动',
  'Part of the culture': '融入我们所服务的',
  'we build for.': '汽车改装文化。',
  'CIRUI participates in events and motorsport activity, placing the brand in direct contact with modified cars, enthusiast expectations and performance use.': 'CIRUI 持续参与汽车活动与赛事，直接接触改装车辆、车友需求与性能使用场景。',
  'Track and race participation': '参与赛道与竞赛活动',
  'Wheel and tuning exhibitions': '参加轮毂与改装展会',
  'Real-world finish and fitment feedback': '收集真实表面工艺与适配反馈',
  'GLOBAL DELIVERY': '全球交付',
  'One technical brief.': '一套明确的技术需求。',
  'One export route.': '一条清晰的出口链路。',
  'For eligible destinations, CIRUI can quote DDP delivery so the production and landed-delivery conversation is handled together. The confirmed quote defines duties, destination, timing and final scope.': '对于符合条件的目的地，CIRUI 可将生产与 DDP 完税交付一并报价。最终报价将明确税费、目的地、时效与服务范围。',
  'Europe + North America': '欧洲 + 北美',
  'Primary overseas market focus': '重点海外市场',
  'About 30 business days': '约 30 个工作日',
  'Target production + transport, confirmed per order': '目标生产与运输时效，以订单确认为准',
  'Start a global build': '开始全球定制',
  'BUILD WITH CIRUI': '与 CIRUI 一起定制',
  'Bring the car.': '带来你的车型需求。',
  'We will build the numbers.': '我们负责把参数做准确。',
  'Open fitment lab': '打开适配实验室',
  'Browse wheels': '浏览轮毂',

  'Fitment-first shopping for wheels, calipers, rotors and pads. Prices, stock and product status are managed by the CIRUI catalog.': '按适配优先选购轮毂、卡钳、刹车盘与刹车片。价格、库存与商品状态均由 CIRUI 商品目录统一管理。',
  'Filter with CIRUI AI': '使用 CIRUI AI 筛选',
  'Describe the look or setup you want. We will narrow the catalog.': '描述你想要的外观或配置，我们会为你缩小商品范围。',
  'e.g. bronze wheels for 2020 Civic': '例如：2020 Civic 古铜色轮毂',
  'Try “track pads”, “19 inch black wheels”, or a car model.': '可尝试输入“赛道刹车片”“19 英寸黑色轮毂”或具体车型。',
  'Delivery estimate': '预计交付',
  'Deliver to ZIP / postcode': '输入 ZIP / 邮政编码',
  'Save location': '保存地区',
  'Search by vehicle': '按车型搜索',
  'Apply vehicle': '应用车型',
  'Product type': '商品类型',
  'All parts': '全部部件',
  'Fitment preferences': '适配偏好',
  'In-stock deals only': '仅显示现货优惠',
  'All finishes': '全部表面处理',
  'Satin Black': '缎面黑',
  'Bronze Machined': '古铜机加工',
  'Gloss Black': '亮光黑',
  'Matte Bronze': '哑光古铜',
  'Racing Red': '竞速红',
  'Electric Blue': '电光蓝',
  'Black Hat': '黑色帽型',
  'Ceramic': '陶瓷配方',
  'Wheel diameter': '轮毂直径',
  'inches': '英寸',
  'Any diameter': '任意直径',
  'Price range': '价格范围',
  'Min': '最低价',
  'Max': '最高价',
  'Customer rating': '客户评分',
  'Any rating': '任意评分',
  'CIRUI AI: Search by vehicle, product, finish or use case': 'CIRUI AI：按车型、商品、表面处理或使用场景搜索',
  'Search': '搜索',
  'Clear filters': '清除筛选',
  'Newest arrivals': '最新上架',
  'Price: low to high': '价格：从低到高',
  'Price: high to low': '价格：从高到低',
  'Highest rated': '评分最高',
  'No exact matches yet.': '暂未找到完全匹配的商品。',
  'Try clearing one filter or tell CIRUI what you want in the AI search.': '请尝试清除一项筛选，或在 AI 搜索中告诉 CIRUI 你的需求。',
  'Reset catalog': '重置商品目录',
  'Fitment context': '适配信息',
  'Products below are shown with the selected vehicle context.': '以下商品将结合已选择的车型信息展示。',
  'Change vehicle': '更换车型',
  'Hot': '热门',
  'Sale': '优惠',
  'Add': '加入购物车',
  'Availability managed by CIRUI': '供货状态由 CIRUI 管理',
  'Made to order · DDP delivery available': '按订单生产 · 支持 DDP 完税交付',
  'Made to order - All sizes, fitment and finish customized by CIRUI': '按订单生产 · 所有尺寸、适配与表面处理均由 CIRUI 定制',
  'All sizes supported - custom diameter, width and fitment': '支持全尺寸 · 直径、宽度与适配均可定制',
  'All sizes supported - custom fitment built to order': '支持全尺寸 · 按订单定制适配',
  'Custom finish and wheel profile matched to the vehicle brief · Custom diameter, width, PCD, ET and center bore': '根据车型需求定制表面处理与轮廓 · 直径、宽度、PCD、ET 与中心孔均可定制',
  'Vehicle-specific spoke, offset and brake-clearance direction · Custom diameter, width, PCD, ET and center bore': '按车型定制辐条、偏距与刹车间隙 · 直径、宽度、PCD、ET 与中心孔均可定制',
  'Road-focused wheel direction configured to the exact platform · Custom diameter, width, PCD, ET and center bore': '面向公路使用并按准确车型配置 · 直径、宽度、PCD、ET 与中心孔均可定制',
  'Performance-led fitment with profile and caliper room reviewed · Custom diameter, width, PCD, ET and center bore': '以性能为导向，并复核轮廓与卡钳空间 · 直径、宽度、PCD、ET 与中心孔均可定制',
  'Built around the exact chassis, brake package and stance · Custom diameter, width, PCD, ET and center bore': '围绕准确底盘、刹车套件与姿态定制 · 直径、宽度、PCD、ET 与中心孔均可定制',
  'Load, brake clearance and profile configured for the vehicle · Custom diameter, width, PCD, ET and center bore': '按车型配置载荷、刹车间隙与轮廓 · 直径、宽度、PCD、ET 与中心孔均可定制',
  'Luxury road fitment configured around the precise platform · Custom diameter, width, PCD, ET and center bore': '围绕准确车型配置豪华公路适配 · 直径、宽度、PCD、ET 与中心孔均可定制',
  'Luxury finish direction with exact vehicle measurements checked · Custom diameter, width, PCD, ET and center bore': '在核对准确车辆尺寸后制定豪华表面方案 · 直径、宽度、PCD、ET 与中心孔均可定制',
  'Large-diameter luxury direction configured to the exact vehicle · Custom diameter, width, PCD, ET and center bore': '按准确车型配置大直径豪华方案 · 直径、宽度、PCD、ET 与中心孔均可定制',
  'Hardware, load and terrain use translated into a wheel brief · Custom diameter, width, PCD, ET and center bore': '将五金、载荷与路况需求转化为轮毂方案 · 直径、宽度、PCD、ET 与中心孔均可定制',
  'Off-road profile, hardware and load direction built to the brief · Custom diameter, width, PCD, ET and center bore': '按需求定制越野轮廓、五金与载荷方向 · 直径、宽度、PCD、ET 与中心孔均可定制',
  'EV load, stance and brake clearance reviewed before production · Custom diameter, width, PCD, ET and center bore': '生产前复核新能源车辆载荷、姿态与刹车间隙 · 直径、宽度、PCD、ET 与中心孔均可定制',
  'SUV load, stance and brake clearance considered together · Custom diameter, width, PCD, ET and center bore': '综合考虑 SUV 载荷、姿态与刹车间隙 · 直径、宽度、PCD、ET 与中心孔均可定制',
  'Low dust · high bite · front axle · All sizes supported - custom fitment built to order': '低粉尘 · 高摩擦力 · 前轴 · 支持全尺寸定制适配',
  'Low noise · low dust · front axle · All sizes supported - custom fitment built to order': '低噪音 · 低粉尘 · 前轴 · 支持全尺寸定制适配',
  '4 piston · front axle · 330 mm · All sizes supported - custom fitment built to order': '四活塞 · 前轴 · 330 mm · 支持全尺寸定制适配',
  '6 piston · front axle · 380 mm · All sizes supported - custom fitment built to order': '六活塞 · 前轴 · 380 mm · 支持全尺寸定制适配',
  '1-piece · drilled & slotted · 330 mm · All sizes supported - custom fitment built to order': '单片式 · 打孔划线 · 330 mm · 支持全尺寸定制适配',
  '2-piece · slotted · 380 mm · All sizes supported - custom fitment built to order': '两片式 · 划线 · 380 mm · 支持全尺寸定制适配',
  '/ ea': '/ 件',

  'CIRUI RSE - CustomSpec Forged Performance Wheel': 'CIRUI RSE · 定制规格锻造性能轮毂',
  'CIRUI SV100 - Custom Forged Multi-Piece Wheel': 'CIRUI SV100 · 定制多片式锻造轮毂',
  'CustomSpec Forged Aluminum': '定制规格锻造铝合金',
  'Brand': '品牌',
  'Model': '型号',
  'Part number': '零件编号',
  'Available sizes': '可选尺寸',
  'Material': '材质',
  'Weight': '重量',
  'starting price / wheel': '轮毂单只起售价',
  'each': '每件',
  'Final price is quoted after fitment, finish, PCD, CB and ET are confirmed.': '最终价格将在适配、表面处理、PCD、CB 与 ET 确认后报价。',
  'Pay over time with CIRUI financing.': '可使用 CIRUI 分期付款。',
  'Check vehicle fitment': '核对车型适配',
  'Free delivery to the lower 48 · Aug 19–Aug 21': '美国本土 48 州免费配送 · 8 月 19 日至 8 月 21 日',
  'Enter a postcode for an exact estimate.': '请输入邮政编码以获取准确预估。',
  'Add to cart': '加入购物车',
  'Buy it now': '立即购买',
  'No reviews yet': '暂无评价',
  'No customer reviews yet.': '暂无客户评价。',
  'Customer feedback': '客户反馈',
  'Customer proof': '客户实证',
  'Product reviews': '商品评价',
  'Write a review': '撰写评价',
  'Load more reviews': '加载更多评价',
  'Be the first to share your fitment experience.': '成为第一位分享适配体验的客户。',
  'Tell other drivers how your build looks and feels.': '告诉其他车主你的改装效果与驾驶感受。',
  'Keep building': '继续探索',
  'Related Wheels': '相关轮毂',
  'Related Calipers': '相关卡钳',
  'Related Rotors': '相关刹车盘',
  'Related Brake Pads': '相关刹车片',
  'Shop all': '查看全部',
  'Ask CIRUI': '咨询 CIRUI',
  'See it on your car': '查看上车效果',
  'before you commit.': '下单前先确认效果。',
  'Preview this wheel': '预览这款轮毂',
  'Upload car photo': '上传车辆照片',
  'Upload one clear photo of your car and CIRUI will prepare three angles with this exact wheel, finish and fitment as the reference.': '上传一张清晰的车辆照片，CIRUI 将以这款轮毂、表面处理与适配参数为参考生成三个角度的效果图。',
  'Selected product image': '已选择的商品图片',
  '3 angles': '三个角度',
  'Fitment-led': '适配优先',
  'Made to order. Start the visual fitment preview or send an inquiry to receive your exact USD quote.': '按订单生产。可先生成上车效果预览，或发送询价以获取准确的美元报价。',

  'Shopping cart': '购物车',
  'Your saved build': '已保存的定制方案',
  'Continue shopping': '继续选购',
  'Remove': '移除',
  'Order summary': '订单汇总',
  'Parts subtotal': '商品小计',
  'Estimated delivery': '预计交付',
  'Calculated at checkout': '结账时计算',
  'Fitment review': '适配复核',
  'Included': '已包含',
  'Promo code': '优惠码',
  'Apply': '应用',
  'Total': '合计',
  'Continue to checkout': '继续结账',
  'Orders are created in the CIRUI backend. Payment remains a separate PayPal step.': '订单将在 CIRUI 后台创建，随后通过独立的 PayPal 步骤完成付款。',
  'Your cart is ready for a build.': '你的购物车正在等待一套定制方案。',
  'Add wheels, calipers, rotors or pads and we will keep the fitment context attached.': '加入轮毂、卡钳、刹车盘或刹车片后，我们会持续保留对应的车型适配信息。',
  'Start shopping': '开始选购',

  'Build with more confidence.': '让每一次定制更有把握。',
  'Practical notes on fitment, wheel engineering and finishes, written for the moment before you place the order.': '为下单前的关键决策提供实用内容，涵盖轮毂适配、工程设计与表面处理。',
  'View all journal posts': '查看全部杂志文章',
  'Read the journal': '阅读文章',
  'A practical editorial space for wheel fitment, custom design and the engineering decisions that make a finished build feel right.': '聚焦轮毂适配、定制设计与工程决策的实用内容空间，帮助每套改装方案获得理想效果。',
  'Notes for the': '写给下一套',
  'next build.': '改装方案的实用笔记。',
  'Read featured post': '阅读精选文章',
  'Browse the archive': '浏览文章库',
  'Useful before you buy.': '下单前值得阅读。',
  'All': '全部',
  'Fitment Before Finish: A Better Way to Buy Custom Wheels': '先确认适配，再选择表面：定制轮毂的正确购买方式',
  'How to Read Wheel Specs Without Guessing': '如何准确看懂轮毂规格',
  'Forged vs. Cast Wheels: What the Difference Means on the Road': '锻造轮毂与铸造轮毂：实际道路表现有何不同',
  'Satin, Gloss, Brushed or Polished: Choosing a Wheel Finish': '缎面、亮光、拉丝还是抛光：如何选择轮毂表面工艺',
  'The finish gets the attention, but diameter, width, PCD, center bore, offset and brake clearance decide whether the build works.': '表面处理决定第一印象，但直径、宽度、PCD、中心孔、偏距与刹车间隙，才真正决定改装方案能否成立。',
  'A quick guide to diameter, width, PCD, center bore and ET, with the practical questions to ask before ordering.': '快速看懂直径、宽度、PCD、中心孔与 ET，并掌握下单前应确认的关键问题。',
  'The manufacturing process changes how a wheel can be designed, tested and finished. Here is how to think about the trade-offs.': '制造工艺会影响轮毂的设计、测试与表面处理方式，本文带你理解两者之间的取舍。',
  'Finish changes the way a spoke profile reads in daylight, under street lighting and in the photos you keep coming back to.': '不同表面工艺会改变辐条轮廓在日光、街灯与照片中的视觉表现。',
  'Journal post not found.': '未找到这篇杂志文章。',
  'Back to Journal': '返回杂志',
  'By 策锐官网 Engineering': '作者：策锐官网 工程团队',
  'By 策锐官网 Design Studio': '作者：策锐官网 设计工作室',
  'Have a build in mind?': '已经有改装想法？',
  'Bring the vehicle, the stance and the finish. CIRUI will help turn the brief into a build-ready spec.': '告诉我们车型、姿态与表面处理方向，CIRUI 会协助把需求转化为可生产的规格。',
  'In this post': '本文内容',
  'Keep reading': '继续阅读',
  'More from the journal.': '更多杂志文章。',
  'wheel specs': '轮毂规格',
  'offset': '偏距',
  'center bore': '中心孔',
  'custom wheels': '定制轮毂',
  'brake clearance': '刹车间隙',
  'forged wheels': '锻造轮毂',
  'cast wheels': '铸造轮毂',
  'wheel finish': '轮毂表面处理',
  'satin': '缎面',
  'polished': '抛光',
  'custom color': '定制颜色',

  'A custom wheel should make the car look intentional and drive without surprises. That starts with the platform, not the color sample. Before choosing a deep concave profile or a polished lip, capture the vehicle year, make, model, trim, brake package and current suspension setup.': '一套定制轮毂既要让车辆呈现明确的设计意图，也要确保驾驶时没有意外。正确流程应从车辆平台开始，而不是先看色板。在选择深凹轮廓或抛光轮唇之前，应先记录车辆年份、品牌、车型、配置、刹车套件与当前悬挂状态。',
  'Start with the numbers': '先从参数开始',
  'Diameter and width set the tire envelope. PCD and center bore determine whether the wheel locates correctly on the hub. Offset controls how the wheel sits in the arch and how much room remains for the brake caliper. These values work together, so changing one can change the answer for all the others.': '直径与宽度决定轮胎包络，PCD 与中心孔决定轮毂能否正确定位在轮毂轴承上，偏距则控制轮毂在轮拱中的位置以及留给卡钳的空间。这些数值相互关联，任何一项变化都可能影响其他参数。',
  'Check brake clearance early': '尽早核对刹车间隙',
  'A wheel that clears the fender can still fail at the caliper. Ask for a brake template or a verified clearance check when the build uses a larger factory package, an aftermarket caliper or a track-focused rotor. 策锐官网 keeps brake clearance in the brief before the design moves to production.': '即使轮毂与翼子板不干涉，也可能与卡钳冲突。若车辆使用更大的原厂刹车套件、改装卡钳或赛道刹车盘，应索取刹车模板或完成已验证的间隙检查。策锐官网 会在设计进入生产前，把刹车间隙纳入技术需求。',
  'Finish comes last for a reason': '最后再确定表面处理是有原因的',
  'Once the fitment is confirmed, the finish becomes a creative decision instead of a gamble. Satin, gloss, brushed, machined and custom color options can all work when the hard constraints are already locked. A good wheel brief makes the final design easier to approve because every visual decision has a usable foundation.': '适配确认后，表面处理才能从冒险变成纯粹的创意选择。当硬性参数全部锁定，缎面、亮光、拉丝、机加工与定制颜色都可以放心评估。清晰的轮毂需求让最终设计更容易确认，因为每个视觉决定都有可靠基础。',
  'Wheel specifications look compact because each number carries a lot of information. Learning the shorthand makes it easier to compare designs and much harder to order a wheel that only looks right in a product photo.': '轮毂规格看起来很简短，是因为每个数字都承载了大量信息。理解这些缩写后，你会更容易比较不同设计，也更不容易买到只在商品图里看起来合适的轮毂。',
  'Diameter and width': '直径与宽度',
  'A 20 x 9 wheel is 20 inches in diameter and 9 inches wide. The tire must support that size range, and the available width affects sidewall shape, contact patch and clearance. The widest option is not automatically the best option for a daily-driven car.': '20 × 9 的轮毂表示直径 20 英寸、宽度 9 英寸。轮胎必须支持这一尺寸范围，而轮宽还会影响胎壁形态、接地面积与间隙。对日常用车而言，最宽的选择并不一定最好。',
  'PCD and center bore': 'PCD 与中心孔',
  'PCD describes the number of lugs and the diameter of the circle they form, such as 5x112 or 5x114.3. The center bore is the opening that locates the wheel on the hub. A larger bore can sometimes be managed with hub-centric rings, while a smaller bore will not install without a compatible design.': 'PCD 表示螺栓数量及其分布圆直径，例如 5×112 或 5×114.3。中心孔是轮毂在轴承上定位的开口。较大的中心孔有时可使用中心环适配，而较小的中心孔若没有兼容设计则无法安装。',
  'ET means offset': 'ET 代表偏距',
  'ET is the wheel offset in millimeters. A higher positive offset moves the wheel inward; a lower offset moves it outward. The right range depends on the vehicle, tire, suspension and brake package. Always compare the proposed offset with the stock reference and the actual clearance around the inner barrel, strut and fender.': 'ET 是以毫米表示的轮毂偏距。更高的正偏距会使轮毂向内移动，更低的偏距会使其向外移动。合适范围取决于车型、轮胎、悬挂与刹车套件。应始终把建议偏距与原厂参考值，以及内桶、减振支柱和翼子板周围的实际间隙进行比较。',
  'The useful question': '真正有用的问题',
  'Do not ask only whether a wheel is available in a certain size. Ask whether that size, offset and brake profile are approved for the exact vehicle and use case. That is the difference between a catalog match and a build-ready fitment.': '不要只问某款轮毂是否提供某个尺寸，更要确认这一尺寸、偏距与刹车轮廓是否适合准确车型和使用场景。这正是目录匹配与可直接生产适配方案之间的区别。',
  'Forged and cast wheels are made differently, but the label alone does not tell you whether a wheel is right for the build. The useful comparison is how the process supports the required strength, weight, design freedom, testing and budget.': '锻造轮毂与铸造轮毂采用不同制造方式，但仅凭名称无法判断哪一种更适合你的方案。真正有意义的比较，是相应工艺能否满足所需强度、重量、设计自由度、测试标准与预算。',
  'What forging changes': '锻造工艺带来的变化',
  'Forging starts with a solid billet that is shaped under pressure and then machined to the final profile. The process can support a strong, relatively light wheel with precise control over the spoke, barrel and hub areas. It is especially useful when the design needs a specific offset, concavity or brake profile.': '锻造从实心坯料开始，经压力成形后再加工为最终轮廓。这种工艺可实现强度高、相对轻量的轮毂，并精确控制辐条、轮辋与轮心区域；当设计需要特定偏距、凹度或刹车轮廓时尤其适用。',
  'Where cast wheels fit': '铸造轮毂适用的场景',
  'Casting forms the wheel from molten alloy in a mold. It allows efficient production and a wide range of everyday designs at a more accessible cost. A properly specified and tested cast wheel can be a sensible choice for street use when its load rating and fitment are correct.': '铸造是在模具中使用熔融合金成形轮毂，能够以更亲民的成本高效生产多种日常设计。只要载荷等级与适配正确，并完成相应测试，铸造轮毂也可以成为公路使用的合理选择。',
  'The decision is use-case first': '选择应以使用场景为先',
  'Daily mileage, road conditions, tire choice, brake package and visual priorities should drive the decision. A track or high-performance build may benefit from the control and weight targets of a forged wheel. A straightforward street build may prioritize proven sizing, availability and value.': '日常里程、道路状况、轮胎选择、刹车套件与视觉偏好都应影响最终决定。赛道或高性能方案可能更受益于锻造轮毂的精确控制与重量目标，而常规街道方案则可能更重视成熟尺寸、供货与性价比。',
  'Ask for the complete spec': '索取完整规格',
  'Whichever process you choose, check the load rating, test standard, actual weight, finish warranty and vehicle-specific fitment. Manufacturing language is useful only when it connects back to the way the wheel will be used.': '无论选择哪种工艺，都应核对载荷等级、测试标准、实际重量、表面处理质保与车型专用适配。只有当制造术语能对应到轮毂的实际使用方式时，它才真正有价值。',
  'The same wheel design can feel understated, technical or dramatic depending on the finish. Start with the body color, the amount of brake hardware you want to show and the amount of maintenance you are comfortable with.': '同一款轮毂设计会因表面处理不同而呈现低调、技术感或强烈视觉效果。选择时可先考虑车身颜色、希望露出的刹车部件比例，以及自己能接受的养护频率。',
  'Satin and matte': '缎面与哑光',
  'Satin finishes soften reflections and make complex spoke geometry easy to read. They suit daily builds that want a clean, technical surface without a mirror-like highlight. Matte surfaces make a strong statement, but they need careful cleaning products and a clear maintenance plan.': '缎面处理会柔化反射，让复杂辐条几何更清晰，适合希望获得干净技术感、又不想要镜面高光的日常车辆。哑光表面个性鲜明，但需要使用合适的清洁产品并制定明确的养护方式。',
  'Gloss and custom color': '亮光与定制颜色',
  'Gloss finishes add depth and make darker colors look richer in photos and direct light. Custom color works best when the tone is considered alongside the body, trim and caliper color. Ask for a physical or controlled-light sample when the shade is important.': '亮光表面能增加层次，让深色在照片与直射光下更饱满。定制颜色最好结合车身、饰件与卡钳颜色共同判断；若色调非常关键，应索取实物样板或受控光线下的样品。',
  'Brushed and polished': '拉丝与抛光',
  'Brushed metal keeps visible grain and a crafted feel. Polished surfaces create the brightest highlight and can make a simple spoke profile look more intricate. Both finishes reward regular care, especially in climates with road salt or heavy brake dust.': '拉丝金属保留可见纹理与手工质感，抛光表面则产生最明亮的高光，让简洁辐条显得更精致。两者都值得定期养护，尤其是在有融雪盐或刹车粉尘较多的环境中。',
  'Make the finish serve the shape': '让表面工艺服务于造型',
  'Use the finish to explain the wheel design. Satin can emphasize concavity, gloss can deepen a sculpted spoke, and brushed or polished details can trace the edge of a lip. The best choice is the one that makes the form easier to see and the car easier to live with.': '表面工艺应帮助表达轮毂设计。缎面可强调凹度，亮光可深化雕塑感辐条，拉丝或抛光细节则能勾勒轮唇边缘。最佳选择既要让造型更清晰，也要适合日常使用与养护。',

  'Forged wheel catalog': '锻造轮毂目录',
  'Custom vehicle series': '车型定制系列',
  '1-piece forged': '单片式锻造',
  '2-piece forged': '两片式锻造',
  'Fitment tools': '适配工具',
  'Fitment guide': '适配指南',
  'Brake clearance': '刹车间隙',
  'Vehicle photo preview': '车辆照片效果预览',
  'Wheel offset guide': '轮毂偏距指南',
  'Custom direction': '定制方向',
  'Street builds': '街道改装',
  'Show cars': '展示车辆',
  'Track setups': '赛道设定',
  'Dealer programs': '经销商计划',
  'Custom center caps': '定制中心盖',
  'CIRUI service': 'CIRUI 服务',
  'Meet the factory': '了解源头工厂',
  'Track my order': '查询我的订单',
  'Fitment support': '适配支持',
  'Details': '查看详情',
  'Save product': '收藏商品',
  'Quick view': '快速查看',
  '{count} results': '{count} 个结果',
  'fits {vehicle}': '适配 {vehicle}',
  '{count} ratings': '{count} 条评分',
  '{count} review for this product': '这款商品有 {count} 条评价',
  '{count} reviews for this product': '这款商品有 {count} 条评价',
  '{rating} out of 5': '满分 5 分，当前 {rating} 分',
  '4 piston · front axle · 330 mm': '四活塞 · 前轴 · 330 mm',
  '6 piston · front axle · 380 mm': '六活塞 · 前轴 · 380 mm',
  '1-piece · drilled & slotted · 330 mm': '单片式 · 打孔划线 · 330 mm',
  '2-piece · slotted · 380 mm': '两片式 · 划线 · 380 mm',
  'Low dust · high bite · front axle': '低粉尘 · 高摩擦力 · 前轴',
  'Low noise · low dust · front axle': '低噪音 · 低粉尘 · 前轴',
  'Forged Aluminum': '锻造铝合金',
  'High Carbon Iron': '高碳铸铁',
  'Ceramic White': '陶瓷白',
  'Geomet Coat': 'Geomet 涂层',
  'fitment': '适配',
  '{total} set of four · was {each} each': '四件套 {total} · 原价每件 {each}',
  '{total} set of four · build pricing available': '四件套 {total} · 可询价定制',
  'Pay over time with CIRUI financing. Starting at {amount}/month with approved credit.': '支持 CIRUI 分期付款。信用审核通过后，每月 {amount} 起。',
  'CIRUI Forged Custom Wheels | Official 策锐官网 Global Site': 'CIRUI 策锐锻造定制轮毂 | 策锐官网 官方海外网站',
  'About CIRUI Forged | Source Custom Wheel Factory': '关于 CIRUI 策锐锻造 | 源头定制轮毂工厂',
  'CIRUI Performance Parts': 'CIRUI 性能部件',
  'CIRUI Shopping Cart': 'CIRUI 购物车',
  'CIRUI Journal | Fitment and Wheel Engineering': 'CIRUI 策锐杂志 | 轮毂适配与工程技术',
  'Ceramic Pro 6P': 'Ceramic Pro 6P 陶瓷六活塞卡钳',
  'Street 4P': 'Street 4P 街道四活塞卡钳',
  'Street Drilled 330': 'Street Drilled 330 街道打孔刹车盘',
  'Track Slotted 380': 'Track Slotted 380 赛道划线刹车盘',
  'Quiet Street Pads': 'Quiet Street 低噪刹车片',
  'R-Compound Pads': 'R-Compound 高摩擦刹车片'
};
Object.assign(localeDictionaries['zh-CN'], publicSiteChineseTranslations);
Object.assign(localeDictionaries['zh-TW'], Object.fromEntries(Object.entries(publicSiteChineseTranslations).map(([key, value]) => [key, traditionalizeFitmentText(value)])));

const factoryFilmTranslationKeys = [
  'Watch factory film',
  'Inside CIRUI manufacturing',
  'Real factory footage from machining through finishing, inspection and packing.',
  'Play CIRUI factory film',
  'Full film · 02:16'
];
const factoryFilmTranslations = {
  'zh-CN': ['观看工厂影片', '走进 CIRUI 真实制造', '真实记录从机加工、表面处理到检验与包装的制造过程。', '播放 CIRUI 工厂影片', '完整影片 · 02:16'],
  'zh-TW': ['觀看工廠影片', '走進 CIRUI 真實製造', '真實記錄從機加工、表面處理到檢驗與包裝的製造過程。', '播放 CIRUI 工廠影片', '完整影片 · 02:16'],
  ja: ['工場映像を見る', 'CIRUIの製造現場', '機械加工から仕上げ、検査、梱包までを収録した実際の工場映像です。', 'CIRUI工場映像を再生', 'フル映像 · 02:16'],
  ko: ['공장 영상 보기', 'CIRUI 실제 제조 현장', '기계 가공부터 마감, 검사, 포장까지 담은 실제 공장 영상입니다.', 'CIRUI 공장 영상 재생', '전체 영상 · 02:16'],
  de: ['Werksfilm ansehen', 'Einblick in die CIRUI Fertigung', 'Echte Werksaufnahmen von der Bearbeitung über Finish und Prüfung bis zur Verpackung.', 'CIRUI Werksfilm abspielen', 'Vollständiger Film · 02:16'],
  fr: ['Voir le film de l’usine', 'Au cœur de la fabrication CIRUI', 'Des images réelles de l’usinage à la finition, au contrôle et à l’emballage.', 'Lire le film de l’usine CIRUI', 'Film complet · 02:16'],
  es: ['Ver el vídeo de fábrica', 'Dentro de la fabricación CIRUI', 'Imágenes reales desde el mecanizado hasta el acabado, la inspección y el embalaje.', 'Reproducir el vídeo de fábrica CIRUI', 'Vídeo completo · 02:16'],
  it: ['Guarda il filmato della fabbrica', 'Dentro la produzione CIRUI', 'Riprese reali dalla lavorazione alla finitura, al controllo e all’imballaggio.', 'Riproduci il filmato della fabbrica CIRUI', 'Filmato completo · 02:16'],
  'pt-BR': ['Ver o vídeo da fábrica', 'Por dentro da fabricação CIRUI', 'Imagens reais da usinagem ao acabamento, inspeção e embalagem.', 'Reproduzir vídeo da fábrica CIRUI', 'Vídeo completo · 02:16'],
  ru: ['Смотреть фильм о заводе', 'Производство CIRUI изнутри', 'Реальные кадры от механической обработки до отделки, контроля и упаковки.', 'Воспроизвести фильм о заводе CIRUI', 'Полный фильм · 02:16'],
  ar: ['شاهد فيلم المصنع', 'داخل تصنيع CIRUI', 'لقطات حقيقية من التشغيل والتشطيب إلى الفحص والتعبئة.', 'تشغيل فيلم مصنع CIRUI', 'الفيلم الكامل · 02:16'],
  nl: ['Bekijk de fabrieksfilm', 'Binnen de CIRUI-productie', 'Echte fabrieksbeelden van verspaning en afwerking tot inspectie en verpakking.', 'CIRUI-fabrieksfilm afspelen', 'Volledige film · 02:16'],
  tr: ['Fabrika filmini izleyin', 'CIRUI üretiminin içinde', 'İşlemeden yüzey işlemine, kontrolden paketlemeye gerçek fabrika görüntüleri.', 'CIRUI fabrika filmini oynat', 'Tam film · 02:16'],
  pl: ['Obejrzyj film z fabryki', 'Wewnątrz produkcji CIRUI', 'Prawdziwe ujęcia od obróbki i wykończenia po kontrolę oraz pakowanie.', 'Odtwórz film z fabryki CIRUI', 'Pełny film · 02:16'],
  vi: ['Xem phim nhà máy', 'Bên trong quy trình sản xuất CIRUI', 'Hình ảnh thực tế từ gia công, hoàn thiện đến kiểm tra và đóng gói.', 'Phát phim nhà máy CIRUI', 'Phim đầy đủ · 02:16'],
  th: ['ชมวิดีโอโรงงาน', 'ภายในกระบวนการผลิตของ CIRUI', 'ภาพจริงตั้งแต่งานแมชชีน งานเคลือบผิว การตรวจสอบ ไปจนถึงการบรรจุ', 'เล่นวิดีโอโรงงาน CIRUI', 'วิดีโอเต็ม · 02:16'],
  id: ['Tonton film pabrik', 'Di dalam manufaktur CIRUI', 'Rekaman pabrik nyata dari pemesinan dan finishing hingga inspeksi serta pengemasan.', 'Putar film pabrik CIRUI', 'Film lengkap · 02:16'],
  hi: ['फ़ैक्टरी फ़िल्म देखें', 'CIRUI निर्माण के अंदर', 'मशीनिंग और फ़िनिशिंग से लेकर निरीक्षण व पैकिंग तक की वास्तविक फ़ैक्टरी फ़ुटेज।', 'CIRUI फ़ैक्टरी फ़िल्म चलाएँ', 'पूरी फ़िल्म · 02:16']
};
Object.entries(factoryFilmTranslations).forEach(([locale, values]) => {
  if (!localeDictionaries[locale]) return;
  Object.assign(localeDictionaries[locale], Object.fromEntries(factoryFilmTranslationKeys.map((key, index) => [key, values[index] || key])));
});

// Product copy is profile-driven so every newly uploaded custom wheel receives
// the same complete locale coverage without maintaining translations per SKU.
const productCatalogTranslationKeys = [
  'Wheels',
  'New',
  'No verified reviews yet',
  'Full Custom Wheel',
  'Full Custom Forged Wheel',
  'Floating Custom Forged Wheel',
  'Full-size custom forged wheel - Diameter / width / PCD / ET / CB built to order',
  'All sizes supported - custom diameter, width and fitment',
  'Made to order - every size, fitment and finish customized by CIRUI',
  'Forged Aluminum Alloy',
  'Custom finish',
  'Availability managed by CIRUI',
  'starting price / wheel',
  'Final price is quoted after fitment, finish, PCD, CB and ET are confirmed.',
  'From',
  '/ ea'
];
const productCatalogTranslations = {
  'zh-CN': ['轮毂', '新品', '暂无已验证评价', '全尺寸定制轮毂', '全尺寸定制锻造轮毂', '悬浮式定制锻造轮毂', '全尺寸定制锻造轮毂 - 直径 / 宽度 / PCD / ET / 中心孔按需生产', '支持全尺寸 - 直径、宽度与适配参数均可定制', '按单生产 - 每个尺寸、适配参数与表面处理均由 CIRUI 定制', '锻造铝合金', '定制表面处理', '供货状态由 CIRUI 管理', '单只轮毂起售价', '确认适配、表面处理、PCD、中心孔与 ET 后提供最终报价。', '起', '/ 只'],
  'zh-TW': ['輪圈', '新品', '暫無已驗證評價', '全尺寸訂製輪圈', '全尺寸訂製鍛造輪圈', '懸浮式訂製鍛造輪圈', '全尺寸訂製鍛造輪圈 - 直徑 / 寬度 / PCD / ET / 中心孔按需生產', '支援全尺寸 - 直徑、寬度與適配參數均可訂製', '按單生產 - 每個尺寸、適配參數與表面處理均由 CIRUI 訂製', '鍛造鋁合金', '訂製表面處理', '供貨狀態由 CIRUI 管理', '單只輪圈起售價', '確認適配、表面處理、PCD、中心孔與 ET 後提供最終報價。', '起', '/ 只'],
  ja: ['ホイール', '新商品', '確認済みレビューはまだありません', 'フルサイズ・カスタムホイール', 'フルカスタム鍛造ホイール', 'フローティング・カスタム鍛造ホイール', 'フルサイズ対応の鍛造ホイール - 直径 / 幅 / PCD / ET / ハブ径を受注製作', '全サイズ対応 - 直径、幅、フィットメントをカスタム可能', '受注生産 - サイズ、フィットメント、仕上げをすべて CIRUI がカスタム', '鍛造アルミ合金', 'カスタム仕上げ', '在庫・供給状況は CIRUI が管理', 'ホイール1本の開始価格', 'フィットメント、仕上げ、PCD、ハブ径、ET の確認後に最終見積りをご案内します。', '〜', '/ 本'],
  ko: ['휠', '신제품', '검증된 리뷰가 아직 없습니다', '전체 사이즈 커스텀 휠', '풀 커스텀 단조 휠', '플로팅 커스텀 단조 휠', '전체 사이즈 커스텀 단조 휠 - 직경 / 폭 / PCD / ET / 센터보어 주문 제작', '전체 사이즈 지원 - 직경, 폭, 핏먼트 맞춤 제작', '주문 제작 - 모든 사이즈, 핏먼트, 마감을 CIRUI가 맞춤 제작', '단조 알루미늄 합금', '커스텀 마감', '공급 상태는 CIRUI에서 관리', '휠 1개 시작가', '핏먼트, 마감, PCD, 센터보어, ET 확인 후 최종 견적을 제공합니다.', '부터', '/ 개'],
  de: ['Felgen', 'Neu', 'Noch keine verifizierten Bewertungen', 'Vollständig maßgefertigte Felge', 'Vollständig maßgefertigte Schmiedefelge', 'Schwebende maßgefertigte Schmiedefelge', 'Schmiedefelge in allen Größen - Durchmesser / Breite / PCD / ET / Nabenbohrung nach Maß', 'Alle Größen verfügbar - Durchmesser, Breite und Passform nach Maß', 'Auftragsfertigung - Größe, Passform und Finish werden von CIRUI individuell gefertigt', 'Geschmiedete Aluminiumlegierung', 'Individuelles Finish', 'Verfügbarkeit wird von CIRUI verwaltet', 'Startpreis pro Felge', 'Der Endpreis wird nach Bestätigung von Passform, Finish, PCD, Nabenbohrung und ET angeboten.', 'Ab', '/ Stk.'],
  fr: ['Jantes', 'Nouveau', 'Aucun avis vérifié pour le moment', 'Jante entièrement sur mesure', 'Jante forgée entièrement sur mesure', 'Jante forgée flottante sur mesure', 'Jante forgée toutes dimensions - diamètre / largeur / entraxe / ET / alésage sur mesure', 'Toutes dimensions disponibles - diamètre, largeur et montage sur mesure', 'Fabrication à la commande - chaque dimension, montage et finition est personnalisé par CIRUI', 'Alliage d’aluminium forgé', 'Finition personnalisée', 'Disponibilité gérée par CIRUI', 'Prix de départ par jante', 'Le prix final est établi après confirmation du montage, de la finition, de l’entraxe, de l’alésage et de l’ET.', 'À partir de', '/ unité'],
  es: ['Llantas', 'Nuevo', 'Todavía no hay reseñas verificadas', 'Llanta totalmente personalizada', 'Llanta forjada totalmente personalizada', 'Llanta forjada flotante personalizada', 'Llanta forjada en todas las medidas - diámetro / ancho / PCD / ET / buje bajo pedido', 'Todas las medidas disponibles - diámetro, ancho y ajuste personalizados', 'Fabricación bajo pedido - CIRUI personaliza cada medida, ajuste y acabado', 'Aleación de aluminio forjado', 'Acabado personalizado', 'Disponibilidad gestionada por CIRUI', 'Precio inicial por llanta', 'El precio final se cotiza tras confirmar ajuste, acabado, PCD, diámetro de buje y ET.', 'Desde', '/ unidad'],
  it: ['Cerchi', 'Nuovo', 'Non ci sono ancora recensioni verificate', 'Cerchio completamente personalizzato', 'Cerchio forgiato completamente personalizzato', 'Cerchio forgiato flottante personalizzato', 'Cerchio forgiato in tutte le misure - diametro / larghezza / PCD / ET / foro centrale su ordinazione', 'Tutte le misure disponibili - diametro, larghezza e fitment personalizzati', 'Produzione su ordinazione - CIRUI personalizza ogni misura, fitment e finitura', 'Lega di alluminio forgiato', 'Finitura personalizzata', 'Disponibilità gestita da CIRUI', 'Prezzo di partenza per cerchio', 'Il prezzo finale viene quotato dopo la conferma di fitment, finitura, PCD, foro centrale ed ET.', 'Da', '/ pz.'],
  'pt-BR': ['Rodas', 'Novo', 'Ainda não há avaliações verificadas', 'Roda totalmente personalizada', 'Roda forjada totalmente personalizada', 'Roda forjada flutuante personalizada', 'Roda forjada em todas as medidas - diâmetro / largura / PCD / ET / furo central sob encomenda', 'Todas as medidas disponíveis - diâmetro, largura e encaixe personalizados', 'Produção sob encomenda - cada medida, encaixe e acabamento é personalizado pela CIRUI', 'Liga de alumínio forjado', 'Acabamento personalizado', 'Disponibilidade gerenciada pela CIRUI', 'Preço inicial por roda', 'O preço final é cotado após a confirmação do encaixe, acabamento, PCD, furo central e ET.', 'A partir de', '/ un.'],
  ru: ['Диски', 'Новинка', 'Проверенных отзывов пока нет', 'Полностью индивидуальный диск', 'Полностью индивидуальный кованый диск', 'Плавающий индивидуальный кованый диск', 'Кованый диск любых размеров - диаметр / ширина / PCD / ET / ЦО на заказ', 'Все размеры доступны - индивидуальные диаметр, ширина и параметры установки', 'Производство под заказ - CIRUI настраивает каждый размер, посадку и отделку', 'Кованый алюминиевый сплав', 'Индивидуальная отделка', 'Доступность контролируется CIRUI', 'Начальная цена за диск', 'Окончательная цена рассчитывается после подтверждения посадки, отделки, PCD, ЦО и ET.', 'От', '/ шт.'],
  ar: ['جنوط', 'جديد', 'لا توجد تقييمات موثقة بعد', 'جنط مخصص بالكامل', 'جنط مطروق مخصص بالكامل', 'جنط مطروق عائم مخصص', 'جنط مطروق بجميع المقاسات - القطر / العرض / PCD / ET / فتحة المركز حسب الطلب', 'جميع المقاسات متاحة - تخصيص القطر والعرض والملاءمة', 'تصنيع حسب الطلب - تخصص CIRUI كل مقاس وملاءمة وتشطيب', 'سبيكة ألمنيوم مطروقة', 'تشطيب مخصص', 'تدير CIRUI حالة التوفر', 'السعر الابتدائي للجنط', 'يُحدد السعر النهائي بعد تأكيد الملاءمة والتشطيب وPCD وفتحة المركز وET.', 'ابتداءً من', '/ قطعة'],
  nl: ['Velgen', 'Nieuw', 'Nog geen geverifieerde beoordelingen', 'Volledig op maat gemaakte velg', 'Volledig op maat gemaakte gesmede velg', 'Zwevende gesmede maatwerkvelg', 'Gesmede velg in alle maten - diameter / breedte / PCD / ET / naafboring op maat', 'Alle maten leverbaar - diameter, breedte en passing op maat', 'Op bestelling gemaakt - elke maat, passing en afwerking wordt door CIRUI aangepast', 'Gesmede aluminiumlegering', 'Afwerking op maat', 'Beschikbaarheid beheerd door CIRUI', 'Vanafprijs per velg', 'De definitieve prijs volgt na bevestiging van passing, afwerking, PCD, naafboring en ET.', 'Vanaf', '/ stuk'],
  tr: ['Jantlar', 'Yeni', 'Henüz doğrulanmış yorum yok', 'Tam ölçü özel jant', 'Tam özel dövme jant', 'Yüzer özel dövme jant', 'Tüm ölçülerde özel dövme jant - çap / genişlik / PCD / ET / göbek deliği siparişe göre', 'Tüm ölçüler desteklenir - çap, genişlik ve uyum özel üretim', 'Sipariş üzerine üretim - her ölçü, uyum ve kaplama CIRUI tarafından özelleştirilir', 'Dövme alüminyum alaşım', 'Özel kaplama', 'Stok durumu CIRUI tarafından yönetilir', 'Jant başına başlangıç fiyatı', 'Nihai fiyat; uyum, kaplama, PCD, göbek deliği ve ET onaylandıktan sonra verilir.', 'Başlangıç', '/ adet'],
  pl: ['Felgi', 'Nowość', 'Brak zweryfikowanych opinii', 'W pełni niestandardowa felga', 'W pełni niestandardowa felga kuta', 'Pływająca niestandardowa felga kuta', 'Kuta felga we wszystkich rozmiarach - średnica / szerokość / PCD / ET / otwór centrujący na zamówienie', 'Wszystkie rozmiary dostępne - średnica, szerokość i dopasowanie na zamówienie', 'Produkcja na zamówienie - CIRUI dostosowuje każdy rozmiar, dopasowanie i wykończenie', 'Kuty stop aluminium', 'Wykończenie niestandardowe', 'Dostępnością zarządza CIRUI', 'Cena początkowa za felgę', 'Cena końcowa jest ustalana po potwierdzeniu dopasowania, wykończenia, PCD, otworu centrującego i ET.', 'Od', '/ szt.'],
  vi: ['Mâm xe', 'Mới', 'Chưa có đánh giá đã xác minh', 'Mâm xe tùy chỉnh toàn bộ kích thước', 'Mâm rèn tùy chỉnh hoàn toàn', 'Mâm rèn nổi tùy chỉnh', 'Mâm rèn đủ mọi kích thước - đường kính / chiều rộng / PCD / ET / lỗ tâm đặt làm', 'Hỗ trợ mọi kích thước - tùy chỉnh đường kính, chiều rộng và thông số lắp', 'Sản xuất theo đơn - mọi kích thước, thông số lắp và hoàn thiện đều do CIRUI tùy chỉnh', 'Hợp kim nhôm rèn', 'Hoàn thiện tùy chỉnh', 'Tình trạng hàng do CIRUI quản lý', 'Giá khởi điểm mỗi mâm', 'Giá cuối cùng được báo sau khi xác nhận thông số lắp, hoàn thiện, PCD, lỗ tâm và ET.', 'Từ', '/ chiếc'],
  th: ['ล้อ', 'ใหม่', 'ยังไม่มีรีวิวที่ยืนยันแล้ว', 'ล้อสั่งทำครบทุกขนาด', 'ล้อฟอร์จสั่งทำเต็มรูปแบบ', 'ล้อฟอร์จแบบลอยสั่งทำ', 'ล้อฟอร์จครบทุกขนาด - เส้นผ่านศูนย์กลาง / ความกว้าง / PCD / ET / รูดุม สั่งผลิต', 'รองรับทุกขนาด - ปรับเส้นผ่านศูนย์กลาง ความกว้าง และฟิตเมนต์ได้', 'ผลิตตามสั่ง - CIRUI ปรับทุกขนาด ฟิตเมนต์ และสีผิว', 'อะลูมิเนียมอัลลอยฟอร์จ', 'สีผิวสั่งทำ', 'CIRUI เป็นผู้จัดการสถานะสินค้า', 'ราคาเริ่มต้นต่อล้อ', 'ราคาสุดท้ายจะเสนอหลังยืนยันฟิตเมนต์ สีผิว PCD รูดุม และ ET', 'เริ่มต้น', '/ ชิ้น'],
  id: ['Velg', 'Baru', 'Belum ada ulasan terverifikasi', 'Velg kustom semua ukuran', 'Velg forged kustom penuh', 'Velg forged floating kustom', 'Velg forged semua ukuran - diameter / lebar / PCD / ET / center bore dibuat sesuai pesanan', 'Mendukung semua ukuran - diameter, lebar, dan fitment dapat dikustom', 'Dibuat sesuai pesanan - setiap ukuran, fitment, dan finishing dikustom oleh CIRUI', 'Paduan aluminium forged', 'Finishing kustom', 'Ketersediaan dikelola oleh CIRUI', 'Harga awal per velg', 'Harga akhir dikutip setelah fitment, finishing, PCD, center bore, dan ET dikonfirmasi.', 'Mulai', '/ buah'],
  hi: ['व्हील', 'नया', 'अभी कोई सत्यापित समीक्षा नहीं', 'पूरी तरह कस्टम व्हील', 'पूरी तरह कस्टम फोर्ज्ड व्हील', 'फ्लोटिंग कस्टम फोर्ज्ड व्हील', 'सभी आकारों में कस्टम फोर्ज्ड व्हील - डायामीटर / चौड़ाई / PCD / ET / सेंटर बोर ऑर्डर पर', 'सभी आकार उपलब्ध - डायामीटर, चौड़ाई और फिटमेंट कस्टम', 'ऑर्डर पर निर्माण - हर आकार, फिटमेंट और फिनिश CIRUI द्वारा कस्टम', 'फोर्ज्ड एल्युमिनियम मिश्रधातु', 'कस्टम फिनिश', 'उपलब्धता CIRUI द्वारा प्रबंधित', 'प्रति व्हील शुरुआती कीमत', 'फिटमेंट, फिनिश, PCD, सेंटर बोर और ET की पुष्टि के बाद अंतिम कीमत दी जाती है।', 'से', '/ इकाई']
};
Object.entries(productCatalogTranslations).forEach(([locale, values]) => {
  if (!localeDictionaries[locale]) localeDictionaries[locale] = {};
  productCatalogTranslationKeys.forEach((key, index) => {
    localeDictionaries[locale][key] = values[index] || key;
  });
});

const exportWorkflowZhCN = {
  'RFQ list': '询价清单',
  'Open RFQ list': '打开询价清单',
  'Forged wheel catalog': '锻造轮毂目录',
  'All forged wheels': '全部锻造轮毂',
  'Monoblock forged': '单片式锻造',
  '2-piece forged': '双片式锻造',
  'Aero & floating': '空气动力学与悬浮式',
  'SUV & off-road': 'SUV 与越野',
  'CIRUI FORGED CATALOG': 'CIRUI 锻造轮毂目录',
  'Choose the design. We build the exact specification.': '选择款式，准确规格由我们完成。',
  'Every public wheel below is a made-to-order forged direction. Vehicle, brake package, finish and destination are confirmed before the production drawing is released.': '以下公开款式均为按单生产的锻造轮毂方向。车辆、刹车套件、表面处理与目的地确认后，才会出具生产图纸。',
  'Browse CIRUI wheel styles and design directions. Open any product to view its images and technical information, then contact CIRUI when you need further confirmation.': '浏览策锐轮毂款式与设计方向。点击商品可查看图片与技术信息，需要进一步确认时可直接联系策锐。',
  'ONE-PIECE CONSTRUCTION': '单片式结构',
  'Monoblock forged wheels.': '单片式锻造轮毂。',
  'Single-piece forged directions for performance, road and luxury builds. Final load target, profile and fitment remain vehicle-specific.': '面向性能、公路与豪华车型的单片锻造方向；最终载荷、轮面与适配参数仍按具体车辆确定。',
  'MODULAR CONSTRUCTION': '模块化结构',
  '2-piece forged wheels.': '双片式锻造轮毂。',
  'Separate center and barrel/lip directions for deeper profiles and more finish combinations. Visible classifications are verified again on the approved drawing.': '轮心与轮辋/唇边可分开设计，以获得更深轮面和更多表面组合；页面分类仍会在确认图纸中再次核实。',
  'AERO DESIGN COLLECTION': '空气动力学设计系列',
  'Aero and floating-cap directions.': '空气动力学与悬浮中心盖方向。',
  'Full-face, turbine and floating-cap ideas for modern luxury and EV builds. The base construction is confirmed during engineering review.': '适用于现代豪华车与电动车的满盘、涡轮与悬浮盖设计；基础结构在工程审核中确认。',
  'LOAD-LED APPLICATIONS': '以载荷为核心的应用',
  'SUV and off-road directions.': 'SUV 与越野轮毂方向。',
  'Wheel directions organized around vehicle load, tire envelope and terrain use. Beadlock-style appearance never replaces the final engineering specification.': '围绕车辆载荷、轮胎包络与路况用途整理；防脱圈外观不能替代最终工程规格。',
  'Find the right starting design': '找到合适的起始款式',
  'Filters change the visible catalog immediately. Final fitment is engineered after the RFQ.': '筛选会立即改变可见目录；最终适配在收到询价后进行工程确认。',
  'Filters update the visible catalog immediately. Contact CIRUI to confirm any technical detail.': '筛选会立即更新可见目录；具体技术信息可直接联系策锐确认。',
  'Search designs': '搜索款式',
  'Model code, spoke style or finish': '型号、辐条风格或表面处理',
  'Construction': '结构',
  'Application': '用途',
  'All uses': '全部用途',
  'Performance': '性能',
  'Luxury': '豪华',
  'Heritage': '经典',
  'Street': '街道',
  'Aero Disc': '空气动力学满盘',
  'Deep Lip': '深唇',
  'Off Road': '越野',
  'Vehicle fitment': '车型适配',
  'Attach vehicle': '关联车辆',
  'DDP available': '支持 DDP 完税到门',
  'Europe and North America · final quote by country and postcode': '欧洲与北美 · 按国家和邮编确认最终报价',
  'Reset': '重置',
  'Reset catalog': '重置商品目录',
  'Catalog order': '目录顺序',
  'Reference price: low to high': '参考价：从低到高',
  'Reference price: high to low': '参考价：从高到低',
  'Monoblock': '单片式',
  '2-piece': '双片式',
  'Confirm with drawing': '以图纸确认为准',
  'Confirmed specification': '已确认规格',
  'Classified from supplied views': '依据所提供视图分类',
  'Engineering confirmation required': '需要工程确认',
  'MOQ': '起订量',
  'DDP quote available · Europe & North America': '支持 DDP 报价 · 欧洲与北美',
  'reference / wheel': '参考价 / 只',
  'Made to order': '按单生产',
  'View details': '查看详情',
  'Add to RFQ': '加入询价清单',
  'Request quote now': '立即询价',
  'Inquire now': '立即询价',
  'Check fitment': '检查车型适配',
  'Product inquiry': '产品询价',
  'Contact CIRUI directly': '直接联系策锐',
  'Call us': '电话咨询',
  'WeChat consultation': '微信咨询',
  'Scan the QR code to add CIRUI on WeChat.': '扫码添加策锐微信，发送车型、轮毂款式和改装需求。',
  'The WeChat QR code has not been uploaded yet.': '微信二维码尚未上传，请先通过电话联系，或在后台媒体管理中补充。',
  'Mention this model when contacting us': '咨询时请提供此款式',
  'Price on request': '价格请咨询',
  'Minimum order: 4 wheels.': '最低起订量：4 只轮毂。',
  'This item is not part of the public forged wheel catalog.': '该商品不在公开锻造轮毂目录中。',
  'Browse current CIRUI forged directions or send a custom reference through the RFQ.': '浏览当前 CIRUI 锻造款式，或通过询价表提交自定义参考。',
  'Open forged wheel catalog': '打开锻造轮毂目录',
  'Model code': '型号代码',
  'Design direction': '设计方向',
  'Classification': '分类依据',
  'Minimum order': '最低起订量',
  'Available sizes': '可定制尺寸',
  'Material': '材料',
  'Load target': '载荷目标',
  'DDP regions': 'DDP 区域',
  'Made to order for the exact vehicle': '按准确车型定制生产',
  'Final price follows the confirmed vehicle, drawing, finish, quantity and delivery destination.': '最终价格以确认后的车型、图纸、表面处理、数量和目的地为准。',
  'Attach vehicle context': '关联车辆信息',
  'Run full fitment check': '进行完整适配检查',
  'Customization': '定制选项',
  'Custom finish': '定制表面处理',
  'Center cap': '中心盖',
  'Hardware / lip': '螺丝 / 唇边',
  'Review all finish and detail options': '查看全部表面与细节选项',
  'Europe and North America': '欧洲与北美',
  'Quoted by destination country and postcode. Final landed price is confirmed in the RFQ.': '按目的国家和邮编报价，最终到岸完税价在询价中确认。',
  'Quoted by destination country and postcode. Final landed price is confirmed during inquiry.': '按目的国家和邮编报价，最终到岸完税价在咨询中确认。',
  'RELATED DIRECTIONS': '相关款式',
  'More forged wheel starting points.': '更多锻造轮毂起始方向。',
  'View full catalog': '查看完整目录',
  'BUILT AROUND YOUR BRIEF': '围绕您的需求打造',
  'One wheel direction. Your exact finish and detail.': '同一款式，按您的表面处理与细节精准定制。',
  'Choose the design first. CIRUI then combines construction, vehicle data, finish, cap, hardware and lip into one production drawing and one RFQ.': '先选择款式，CIRUI 再把结构、车辆数据、表面处理、中心盖、螺丝与唇边整合到一份生产图纸和询价中。',
  'Choose a wheel': '选择轮毂',
  'Request a custom quote': '申请定制报价',
  'Finishes & colors': '表面处理与颜色',
  'Brushed, polished, satin, gloss, tinted clear and custom color directions are quoted against the selected wheel and use case.': '拉丝、抛光、缎面、亮面、着色透明漆与定制颜色，会结合所选轮毂和用途报价。',
  'Lip profiles': '唇边造型',
  'Flat, stepped and deep-lip directions depend on construction, brake package, offset and the approved wheel drawing.': '平唇、阶梯唇和深唇取决于结构、刹车套件、偏距和已确认图纸。',
  'Center caps': '中心盖',
  'Standard CIRUI caps, custom logo artwork and floating-cap directions are treated as product options, not separate empty products.': 'CIRUI 标准盖、定制 Logo 图案与悬浮盖均作为轮毂选项处理，不再作为空白独立商品。',
  'Hardware options': '螺丝选项',
  'Visible or concealed hardware is available only where the selected construction supports it. Material and finish are confirmed in the quote.': '仅在所选结构支持时提供外露或隐藏螺丝；材料与表面处理在报价中确认。',
  'HOW IT BECOMES A REAL ORDER': '如何形成真实订单',
  'Design choice → fitment → options → approved drawing.': '选择款式 → 车型适配 → 定制选项 → 确认图纸。',
  'Select a wheel direction': '选择轮毂方向',
  'Attach the exact vehicle': '关联准确车型',
  'Specify finish and details': '指定表面与细节',
  'Approve the production drawing': '确认生产图纸',
  'EXPORT SUPPORT': '出口支持',
  'Trade & DDP': '外贸合作与 DDP',
  'DDP available across Europe and North America.': '欧洲与北美均可提供 DDP 完税到门。',
  'CIRUI can quote the wheel set and duty-paid delivery together. The confirmed country, postcode, specification and shipment determine the final landed quotation.': 'CIRUI 可将轮毂与完税到门运输合并报价；最终到岸报价由确认后的国家、邮编、规格与运输方案决定。',
  'Request a DDP quote': '申请 DDP 报价',
  'Dealer / wholesale inquiry': '经销商 / 批发询价',
  '4 wheels per design': '每款 4 只起订',
  'Mixed specifications, staggered sets and larger trade quantities are reviewed in the RFQ.': '混合规格、前后配与更大批发数量会在询价中审核。',
  'Production': '生产',
  'Target production and transport is about 30 business days; the final drawing, finish and destination control the confirmed timing.': '生产与运输目标约 30 个工作日；确认周期以最终图纸、表面处理与目的地为准。',
  'Europe + North America': '欧洲 + 北美',
  'Final duty-paid delivery is quoted by destination country and postcode. It is not a universal fixed shipping price.': '完税到门价格按目的国家和邮编核算，并非统一固定运费。',
  'B2B': '企业合作',
  'Dealer & distributor support': '经销商与分销商支持',
  'Attach company, volume, target market and recurring fitment needs for a trade quotation.': '提交公司、数量、目标市场与常用适配需求，以获取外贸报价。',
  'QUOTE FLOW': '报价流程',
  'One brief from wheel choice to landed quote.': '从款式选择到到岸报价，只需一份需求表。',
  'Add one or more wheel directions to the RFQ list.': '将一个或多个轮毂方向加入询价清单。',
  'Enter vehicle, quantity, finish, country and postcode.': '填写车型、数量、表面处理、国家和邮编。',
  'CIRUI reviews construction, fitment, production and DDP route.': 'CIRUI 审核结构、适配、生产与 DDP 路线。',
  'You receive the final specification and quotation for approval.': '您将收到最终规格与报价并进行确认。',
  'Browse forged wheels': '浏览锻造轮毂',
  'Choose at least one wheel direction, then open the RFQ.': '请先选择至少一个轮毂方向，再打开询价表。',
  'Open RFQ': '打开询价表',
  'Track an existing order': '查询现有订单',
  'YOUR CUSTOM WHEEL BRIEF': '您的定制轮毂需求',
  'Request for quotation': '提交询价',
  'Collect multiple wheel directions, set quantities, then send one vehicle and destination brief to CIRUI.': '可收集多个轮毂方向、设置数量，再一次性向 CIRUI 提交车型与目的地需求。',
  'Add more wheels': '添加更多轮毂',
  'Custom fitment and finish': '定制适配与表面处理',
  'Remove': '移除',
  'Quantity': '数量',
  'Reference': '参考',
  'Final quote after review': '审核后提供最终报价',
  'The RFQ is not a checkout.': '询价表不是在线结算。',
  'CIRUI confirms construction, fitment, finish, production time and DDP delivery before any final order or payment.': '在最终下单或付款前，CIRUI 会确认结构、适配、表面处理、生产周期和 DDP 配送。',
  'QUOTE INPUTS': '报价信息',
  'Ready to send?': '可以提交了吗？',
  'wheel direction': '个轮毂方向',
  'wheel directions': '个轮毂方向',
  'total wheels': '只轮毂',
  'Vehicle pending': '待填写车辆',
  'Complete RFQ brief': '完善询价信息',
  'Check fitment first': '先检查适配',
  'Country and postcode are required for a DDP quotation. No fixed duty-paid price is promised before review.': 'DDP 报价必须提供国家和邮编；审核前不会承诺固定完税价格。',
  'Your RFQ list is empty.': '询价清单为空。',
  'Add one or more forged wheel directions. CIRUI will combine them with your vehicle, finish, quantity and destination in one quotation request.': '添加一个或多个锻造轮毂方向，CIRUI 会把车型、表面处理、数量和目的地整合到同一份询价中。',
  'CUSTOM FORGED WHEEL RFQ': '定制锻造轮毂询价',
  'Complete the quotation brief.': '完善报价需求。',
  'CIRUI will confirm the engineering specification and DDP route before issuing the final price.': 'CIRUI 会在给出最终价格前确认工程规格与 DDP 路线。',
  'design': '个款式',
  'designs': '个款式',
  'Buyer and contact': '采购方与联系方式',
  'Name': '姓名',
  'Email': '邮箱',
  'Phone / WhatsApp': '电话 / WhatsApp',
  'Company': '公司',
  'Buyer type': '采购类型',
  'Private buyer': '个人买家',
  'Dealer / tuning shop': '经销商 / 改装店',
  'Distributor': '分销商',
  'Vehicle and wheel brief': '车辆与轮毂需求',
  'Vehicle': '车辆',
  'Preferred finish': '期望表面处理',
  'Quantity note': '数量说明',
  'Destination and DDP': '目的地与 DDP',
  'Country': '国家',
  'ZIP / postcode': '邮编',
  'Request DDP quotation': '申请 DDP 报价',
  'Available across Europe and North America; final route and landed price require destination review.': '欧洲与北美均可提供；最终路线与到岸价格需按目的地审核。',
  'Notes': '补充说明',
  'Brake package, suspension, target stance, logo cap, finish reference or trade volume.': '刹车套件、悬挂、目标姿态、Logo 中心盖、表面参考或批发数量。',
  'Keep editing later': '稍后继续填写',
  'Send RFQ to CIRUI': '向 CIRUI 提交询价',
  'Sending RFQ…': '正在提交询价…',
  'Close': '关闭',
  'DDP Europe & North America': '欧洲与北美 DDP',
  'Finishes, caps & hardware': '表面、中心盖与螺丝',
  'MOQ & lead time': '起订量与交期',
  'Dealer & wholesale': '经销与批发'
};

Object.assign(localeDictionaries['zh-CN'], exportWorkflowZhCN);
const exportTraditionalCharacters = { '锻': '鍛', '轮': '輪', '毂': '轂', '车': '車', '辆': '輛', '选': '選', '择': '擇', '图': '圖', '纸': '紙', '询': '詢', '价': '價', '单': '單', '产': '產', '处': '處', '览': '覽', '与': '與', '为': '為', '认': '認', '确': '確', '发': '發', '东': '東', '业': '業', '个': '個', '数': '數', '经': '經', '销': '銷', '商': '商', '设': '設', '计': '計', '验': '驗', '证': '證', '审': '審', '测': '測', '试': '試', '开': '開', '关': '關', '闭': '閉', '时': '時', '间': '間', '规': '規', '格': '格', '载': '載', '将': '將', '这': '這', '后': '後', '应': '應', '仅': '僅', '显': '顯', '条': '條', '来': '來', '现': '現', '过': '過', '还': '還', '总': '總', '统': '統', '万': '萬', '邮': '郵', '务': '務', '项': '項', '边': '邊', '类': '類', '围': '圍', '内': '內', '并': '並', '该': '該', '离': '離', '备': '備', '门': '門', '复': '複', '买': '買', '卖': '賣', '参': '參', '标': '標', '写': '寫', '况': '況', '继': '繼', '续': '續', '订': '訂', '据': '據', '从': '從', '额': '額', '满': '滿', '构': '構', '块': '塊', '层': '層', '组': '組', '术': '術', '电': '電', '动': '動', '统': '統', '实': '實', '绩': '績', '导': '導', '别': '別', '么': '麼', '缓': '緩', '临': '臨', '适': '適' };
Object.assign(localeDictionaries['zh-TW'], Object.fromEntries(Object.entries(exportWorkflowZhCN).map(([key, value]) => [key, value.replace(/[\u3400-\u9fff]/g, character => exportTraditionalCharacters[character] || character)])));

// The export workflow adds a few overlapping Chinese labels. Re-apply the
// reviewed navigation glossary last so Simplified and Traditional Chinese use
// the intended menu terminology consistently.
Object.entries(siteChromeTranslations).forEach(([locale, values]) => {
  if (!localeDictionaries[locale]) return;
  Object.assign(localeDictionaries[locale], Object.fromEntries(siteChromeTranslationKeys.map((key, index) => [key, values[index] || key])));
});
Object.entries(navigationChromeTranslations).forEach(([locale, values]) => {
  if (!localeDictionaries[locale]) return;
  Object.assign(localeDictionaries[locale], Object.fromEntries(navigationChromeTranslationKeys.map((key, index) => [key, values[index] || key])));
});

// Input guidance must switch immediately with the UI language. These strings
// are kept locally because workflow modals can open after the initial page
// translation pass and should never depend on an external translation call.
const fitmentPlaceholderTranslationKeys = [
  'Example: C43 street setup',
  'Example: Chris / ticket 024',
  'Example: Alex / work order 024',
  'Example: 2022 C43, same brakes, 19x9 ET38',
  'Calculate automatically',
  'Calculated from vehicle',
  'Measured minimum',
  'Template / measured gap',
  'Loaded suspension gap',
  'Describe installed parts, ride height and known measurements…',
  'Exact trim / variant',
  'Chassis code, e.g. F30',
  'Pending measurements',
  'Model or part number',
  'Record rubbing, corrections, final spacer, alignment or tire changes.'
];
const fitmentPlaceholderTranslations = {
  ja: ['例：C43 ストリート仕様', '例：Chris / チケット 024', '例：Alex / 作業指示書 024', '例：2022 C43、同じブレーキ、19x9 ET38', '自動計算', '車両データから計算', '実測最小値', 'テンプレート / 実測クリアランス', '荷重時サスペンションクリアランス', '装着部品、車高、既知の実測値を入力…', '正確なグレード / バリエーション', 'シャシーコード（例：F30）', '測定待ち', 'モデルまたは部品番号', '干渉、修正、最終スペーサー、アライメントまたはタイヤ変更を記録してください。'],
  ko: ['예: C43 스트리트 셋업', '예: Chris / 티켓 024', '예: Alex / 작업 지시서 024', '예: 2022 C43, 동일 브레이크, 19x9 ET38', '자동 계산', '차량 데이터로 계산', '실측 최솟값', '템플릿 / 실측 간격', '하중 상태 서스펜션 간격', '장착 부품, 차고 및 알고 있는 실측값을 입력…', '정확한 트림 / 버전', '샤시 코드(예: F30)', '측정 대기', '모델 또는 부품 번호', '간섭, 수정, 최종 스페이서, 얼라인먼트 또는 타이어 변경을 기록하세요.'],
  de: ['Beispiel: C43 Straßen-Setup', 'Beispiel: Chris / Ticket 024', 'Beispiel: Alex / Auftrag 024', 'Beispiel: 2022 C43, gleiche Bremsen, 19x9 ET38', 'Automatisch berechnen', 'Aus Fahrzeugdaten berechnet', 'Gemessener Mindestwert', 'Schablone / gemessener Abstand', 'Abstand bei belastetem Fahrwerk', 'Montierte Teile, Fahrzeughöhe und bekannte Messwerte beschreiben…', 'Exakte Ausstattung / Variante', 'Fahrgestellcode, z. B. F30', 'Messwerte ausstehend', 'Modell oder Teilenummer', 'Schleifen, Korrekturen, finalen Distanzring, Achsvermessung oder Reifenänderungen dokumentieren.'],
  fr: ['Exemple : configuration route C43', 'Exemple : Chris / ticket 024', 'Exemple : Alex / ordre 024', 'Exemple : C43 2022, mêmes freins, 19x9 ET38', 'Calcul automatique', 'Calculé à partir du véhicule', 'Minimum mesuré', 'Gabarit / jeu mesuré', 'Jeu de suspension en charge', 'Décrivez les pièces montées, la hauteur et les mesures connues…', 'Finition / variante exacte', 'Code châssis, ex. F30', 'Mesures en attente', 'Modèle ou référence de pièce', 'Notez les frottements, corrections, cales finales, réglages de géométrie ou changements de pneus.'],
  es: ['Ejemplo: configuración de calle C43', 'Ejemplo: Chris / ticket 024', 'Ejemplo: Alex / orden 024', 'Ejemplo: C43 2022, mismos frenos, 19x9 ET38', 'Calcular automáticamente', 'Calculado a partir del vehículo', 'Mínimo medido', 'Plantilla / holgura medida', 'Holgura de suspensión con carga', 'Describe las piezas instaladas, la altura y las medidas conocidas…', 'Acabado / variante exactos', 'Código de chasis, p. ej. F30', 'Medidas pendientes', 'Modelo o número de pieza', 'Registra roces, correcciones, separador final, alineación o cambios de neumáticos.'],
  it: ['Esempio: configurazione stradale C43', 'Esempio: Chris / ticket 024', 'Esempio: Alex / ordine 024', 'Esempio: C43 2022, stessi freni, 19x9 ET38', 'Calcola automaticamente', 'Calcolato dai dati del veicolo', 'Minimo misurato', 'Dima / distanza misurata', 'Distanza sospensione sotto carico', 'Descrivi componenti installati, altezza e misure note…', 'Allestimento / variante esatti', 'Codice telaio, es. F30', 'Misure in attesa', 'Modello o codice ricambio', 'Registra sfregamenti, correzioni, distanziale finale, allineamento o modifiche agli pneumatici.'],
  'pt-BR': ['Exemplo: configuração de rua C43', 'Exemplo: Chris / chamado 024', 'Exemplo: Alex / ordem 024', 'Exemplo: C43 2022, mesmos freios, 19x9 ET38', 'Calcular automaticamente', 'Calculado a partir do veículo', 'Mínimo medido', 'Gabarito / folga medida', 'Folga da suspensão com carga', 'Descreva as peças instaladas, altura e medidas conhecidas…', 'Versão / acabamento exatos', 'Código do chassi, ex.: F30', 'Medições pendentes', 'Modelo ou número da peça', 'Registre atritos, correções, espaçador final, alinhamento ou alterações de pneus.'],
  ru: ['Пример: дорожная настройка C43', 'Пример: Chris / заявка 024', 'Пример: Alex / заказ-наряд 024', 'Пример: C43 2022, те же тормоза, 19x9 ET38', 'Рассчитать автоматически', 'Рассчитано по данным автомобиля', 'Измеренный минимум', 'Шаблон / измеренный зазор', 'Зазор подвески под нагрузкой', 'Опишите установленные детали, высоту и известные измерения…', 'Точная комплектация / версия', 'Код шасси, напр. F30', 'Ожидаются измерения', 'Модель или номер детали', 'Запишите касания, коррекции, итоговые проставки, развал-схождение или замены шин.'],
  ar: ['مثال: إعداد C43 للطريق', 'مثال: Chris / تذكرة 024', 'مثال: Alex / أمر عمل 024', 'مثال: C43 2022، نفس المكابح، 19x9 ET38', 'حساب تلقائي', 'محسوب من بيانات المركبة', 'الحد الأدنى المقاس', 'قالب / خلوص مقاس', 'خلوص التعليق تحت الحمل', 'صف القطع المركبة وارتفاع المركبة والقياسات المعروفة…', 'الفئة / الإصدار الدقيق', 'رمز الهيكل، مثل F30', 'القياسات معلقة', 'الطراز أو رقم القطعة', 'سجل الاحتكاك، والتصحيحات، والفاصل النهائي، والمحاذاة أو تغييرات الإطارات.'],
  nl: ['Voorbeeld: C43-straatsetup', 'Voorbeeld: Chris / ticket 024', 'Voorbeeld: Alex / werkorder 024', 'Voorbeeld: C43 uit 2022, dezelfde remmen, 19x9 ET38', 'Automatisch berekenen', 'Berekend op basis van voertuiggegevens', 'Gemeten minimum', 'Sjabloon / gemeten speling', 'Speling van belaste ophanging', 'Beschrijf gemonteerde onderdelen, rijhoogte en bekende metingen…', 'Exacte uitvoering / variant', 'Chassiscode, bijv. F30', 'Metingen in afwachting', 'Model- of onderdeelnummer', 'Noteer aanlopen, correcties, definitieve spacer, uitlijning of bandenwijzigingen.'],
  tr: ['Örnek: C43 cadde ayarı', 'Örnek: Chris / talep 024', 'Örnek: Alex / iş emri 024', 'Örnek: 2022 C43, aynı frenler, 19x9 ET38', 'Otomatik hesapla', 'Araç verilerinden hesaplandı', 'Ölçülen minimum', 'Şablon / ölçülen boşluk', 'Yük altında süspansiyon boşluğu', 'Takılı parçaları, sürüş yüksekliğini ve bilinen ölçümleri açıklayın…', 'Tam donanım / varyant', 'Şasi kodu, örn. F30', 'Ölçümler bekleniyor', 'Model veya parça numarası', 'Sürtme, düzeltme, son spacer, hizalama veya lastik değişikliklerini kaydedin.'],
  pl: ['Przykład: ustawienie uliczne C43', 'Przykład: Chris / zgłoszenie 024', 'Przykład: Alex / zlecenie 024', 'Przykład: C43 2022, te same hamulce, 19x9 ET38', 'Oblicz automatycznie', 'Obliczono z danych pojazdu', 'Zmierzona wartość minimalna', 'Szablon / zmierzony luz', 'Luz zawieszenia pod obciążeniem', 'Opisz zamontowane części, wysokość i znane pomiary…', 'Dokładna wersja / wariant', 'Kod podwozia, np. F30', 'Oczekujące pomiary', 'Model lub numer części', 'Zapisz ocieranie, korekty, końcowy dystans, geometrię lub zmiany opon.'],
  vi: ['Ví dụ: thiết lập đường phố C43', 'Ví dụ: Chris / phiếu 024', 'Ví dụ: Alex / lệnh việc 024', 'Ví dụ: C43 2022, cùng bộ phanh, 19x9 ET38', 'Tự động tính', 'Tính từ dữ liệu xe', 'Giá trị tối thiểu đã đo', 'Mẫu / khe hở đã đo', 'Khe hở hệ thống treo khi có tải', 'Mô tả phụ tùng đã lắp, chiều cao và các số đo đã biết…', 'Phiên bản / biến thể chính xác', 'Mã khung gầm, ví dụ F30', 'Đang chờ đo', 'Mẫu hoặc mã phụ tùng', 'Ghi lại cọ xát, hiệu chỉnh, spacer cuối, cân chỉnh hoặc thay đổi lốp.'],
  th: ['ตัวอย่าง: การตั้งค่า C43 สำหรับถนน', 'ตัวอย่าง: Chris / ทิกเก็ต 024', 'ตัวอย่าง: Alex / ใบงาน 024', 'ตัวอย่าง: C43 ปี 2022, เบรกชุดเดิม, 19x9 ET38', 'คำนวณอัตโนมัติ', 'คำนวณจากข้อมูลรถ', 'ค่าต่ำสุดที่วัดได้', 'แม่แบบ / ระยะห่างที่วัดได้', 'ระยะห่างช่วงล่างเมื่อรับน้ำหนัก', 'อธิบายชิ้นส่วนที่ติดตั้ง ความสูงรถ และค่าวัดที่ทราบ…', 'รุ่นย่อย / รุ่นที่แน่นอน', 'รหัสแชสซี เช่น F30', 'รอการวัด', 'รุ่นหรือหมายเลขชิ้นส่วน', 'บันทึกการเสียดสี การแก้ไข สเปเซอร์สุดท้าย การตั้งศูนย์ หรือการเปลี่ยนยาง'],
  id: ['Contoh: setelan jalan C43', 'Contoh: Chris / tiket 024', 'Contoh: Alex / perintah kerja 024', 'Contoh: C43 2022, rem yang sama, 19x9 ET38', 'Hitung otomatis', 'Dihitung dari data kendaraan', 'Nilai minimum terukur', 'Templat / celah terukur', 'Celah suspensi saat berbeban', 'Jelaskan komponen terpasang, tinggi kendaraan, dan pengukuran yang diketahui…', 'Varian / trim yang tepat', 'Kode sasis, mis. F30', 'Pengukuran tertunda', 'Model atau nomor komponen', 'Catat gesekan, koreksi, spacer akhir, alignment, atau perubahan ban.'],
  hi: ['उदाहरण: C43 स्ट्रीट सेटअप', 'उदाहरण: Chris / टिकट 024', 'उदाहरण: Alex / वर्क ऑर्डर 024', 'उदाहरण: 2022 C43, समान ब्रेक, 19x9 ET38', 'स्वचालित गणना', 'वाहन डेटा से गणना', 'मापा गया न्यूनतम', 'टेम्पलेट / मापा गया क्लियरेंस', 'लोड पर सस्पेंशन क्लियरेंस', 'लगे हुए पार्ट्स, राइड हाइट और ज्ञात माप बताएँ…', 'सटीक ट्रिम / वेरिएंट', 'चेसिस कोड, जैसे F30', 'माप लंबित', 'मॉडल या पार्ट नंबर', 'रबिंग, सुधार, अंतिम स्पेसर, एलाइनमेंट या टायर बदलाव दर्ज करें।']
};
Object.entries(fitmentPlaceholderTranslations).forEach(([locale, values]) => {
  if (!localeDictionaries[locale]) return;
  Object.assign(localeDictionaries[locale], Object.fromEntries(fitmentPlaceholderTranslationKeys.map((key, index) => [key, values[index] || key])));
});

const aiWheelStudioZhCN = {
  'AI Original Design': 'AI 原创设计',
  'AI Wheel Design Studio': 'AI 轮毂原创设计室',
  'FROM IDEA TO A CONSISTENT CONCEPT': '从想法到一致的概念方案',
  'Describe it. Reference it. Make it original.': '文字描述，也可上传参考图，生成你的原创方向。',
  'Start with words, an optional reference image, or both. CIRUI generates four original wheel directions; after you select one, the studio renders eight locked angles as a nine-cell review board.': '可以只输入文字、只用参考图配合修改要求，或两者结合。CIRUI 先生成 4 个原创轮毂方向；选定后再锁定设计，生成 8 个固定角度并组成九宫格审核图。',
  '01 Brief': '01 描述需求',
  '02 Choose': '02 选择方案',
  '03 Multi-view': '03 九宫格多视图',
  'Write what you want': '写下你想要的轮毂',
  'Reference an existing direction': '参考现有方向再创新',
  'Use text + reference': '文字 + 参考图',
  'Text only': '只用文字',
  'Reference + changes': '参考图 + 修改要求',
  'Text + reference': '文字 + 参考图',
  'Describe the wheel direction': '描述想要的轮毂方向',
  'Example: an original lightweight 10-spoke forged wheel, deep concavity, thin paired spokes, brushed face and polished step lip; technical motorsport character rather than luxury.': '例如：原创轻量化 10 辐锻造轮毂，深凹面，纤细双辐，拉丝轮面配抛光阶梯唇，偏技术赛车风而不是豪华风。',
  'Be specific about spoke count, spoke shape, concavity, lip, center area and finish. Brand names are treated only as broad inspiration and are never copied.': '尽量写清辐条数量、造型、凹度、轮唇、中心区域和表面处理。品牌名称只能作为宽泛风格参考，不会照抄现有产品。',
  'Optional reference image': '可选参考图',
  'Upload a wheel image': '上传轮毂图片',
  'JPG, PNG or WebP · up to 14 MB': 'JPG、PNG 或 WebP · 不超过 14MB',
  'What should stay?': '参考图中保留什么？',
  'Example: keep the thin paired-spoke rhythm and deep center.': '例如：保留纤细双辐节奏和深凹中心。',
  'What should change?': '需要改成什么？',
  'Example: change to 10 spokes, cleaner center and bronze brushed finish.': '例如：改成 10 辐、更干净的中心区域和古铜拉丝表面。',
  'Construction': '结构',
  'Forged monoblock': '单片式锻造',
  'Forged 2-piece': '双片式锻造',
  'Forged 3-piece': '三片式锻造',
  'Design character': '设计风格',
  'Performance / motorsport': '性能 / 赛车',
  'Luxury / executive': '豪华 / 商务',
  'Heritage / classic': '复古 / 经典',
  'Aero / technical': '空气动力 / 技术感',
  'SUV / off-road': 'SUV / 越野',
  'Spoke direction': '辐条方向',
  'Let AI propose': '由 AI 提议',
  '5-spoke': '5 辐',
  '6-spoke': '6 辐',
  '7-spoke': '7 辐',
  '8-spoke': '8 辐',
  '10-spoke': '10 辐',
  'Multi-spoke': '多辐',
  'Finish direction': '表面处理方向',
  'Brushed clear': '透明拉丝',
  'Satin black': '缎面黑',
  'Polished silver': '抛光银',
  'Bronze': '古铜色',
  'Two-tone custom': '双色定制',
  'Visual diameter': '视觉轮径',
  'Not fixed': '暂不限定',
  'Vehicle context inherited': '已继承车型信息',
  'No vehicle selected': '尚未选择车型',
  'The vehicle is used only as design context. Fitment, brake clearance and load are still checked separately in the Fitment Lab.': '车型这里只用于辅助设计方向；实际适配、刹车间隙和载荷仍需在适配实验室单独核验。',
  'Generate 4 original concepts': '生成 4 个原创方案',
  'Sign in to generate concepts': '登录后生成方案',
  'Concept preview only': '仅作为概念预览',
  'AI images do not approve fitment, strength or manufacturing. Final production requires CIRUI engineering CAD, load review and physical-clearance approval.': 'AI 图片不代表适配、强度或制造批准。最终生产必须由 CIRUI 工程师完成 CAD、载荷审核和实体间隙确认。',
  'Creating four original directions': '正在生成 4 个原创方向',
  'The studio is varying the spoke rhythm, concavity and surface breaks while keeping your brief fixed.': '系统会在锁定需求的前提下，探索不同辐条节奏、凹度和表面转折。',
  'Choose one direction': '选择一个设计方向',
  'The selected image becomes the only visual identity reference for every multi-view angle.': '你选中的图片将成为后续所有角度唯一的视觉身份参考。',
  'Selected': '已选择',
  'Edit brief': '修改需求',
  'Generate nine-cell multi-view': '生成九宫格多视图',
  'Choose a concept first.': '请先选择一个方案。',
  'Rendering eight locked angles': '正在生成 8 个锁定角度',
  'Each image uses the selected concept as the same identity reference. This may take several minutes.': '每一张图都以选中方案为同一个身份参考，整个过程可能需要几分钟。',
  'Nine-cell concept review': '九宫格概念审核',
  'Eight generated angles surround the selected hero concept. Review spoke count, center, lip, barrel and finish consistency before sending it to engineering.': '8 个生成角度围绕中间的选中方案。请检查辐条数量、中心区、轮唇、轮辋和表面处理是否一致，再交给工程师。',
  'Selected concept': '选中方案',
  'Regenerate multi-view': '重新生成多视图',
  'Start a new design': '开始新设计',
  'Discuss with CIRUI': '联系 CIRUI 继续沟通',
  'Open AI Original Design Studio': '打开 AI 轮毂原创设计室',
  'Create four original directions first, then return with the selected concept for vehicle fitment and quoting.': '先独立生成 4 个原创方向并完成九宫格审核，再把选中的方案带回车型适配和询价流程。',
  'This reference will guide the new design': '这张参考图将用于引导原创设计',
  'Remove reference': '移除参考图',
  'View larger': '放大查看',
  'Generation failed': '生成失败',
  'Try again': '重试',
  'Return to brief': '返回修改需求'
};
Object.assign(localeDictionaries['zh-CN'], aiWheelStudioZhCN);
Object.assign(localeDictionaries['zh-TW'], Object.fromEntries(Object.entries(aiWheelStudioZhCN).map(([key, value]) => [key, value.replace(/[\u3400-\u9fff]/g, character => exportTraditionalCharacters[character] || character)])));

function uiLabel(key, fallback = key) {
  return localeDictionaries[state.locale]?.[key] || fallback;
}

function formatUiLabel(key, replacements = {}, fallback = key) {
  return Object.entries(replacements).reduce((value, [name, replacement]) => value.split(`{${name}}`).join(String(replacement)), uiLabel(key, fallback));
}

function localeLabel(code) { return localeOptions.find(([value]) => value === code)?.[1] || 'English'; }
function browserLocale() {
  const candidates = [
    ...(Array.isArray(navigator.languages) ? navigator.languages : []),
    navigator.language,
    typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().locale : ''
  ].filter(Boolean);
  for (const candidate of [...new Set(candidates)]) {
    const raw = String(candidate).toLowerCase();
    if (raw.startsWith('zh-tw') || raw.startsWith('zh-hk') || raw.startsWith('zh-mo')) return 'zh-TW';
    if (raw.startsWith('zh')) return 'zh-CN';
    const exact = localeOptions.find(([value]) => raw === value.toLowerCase() || raw.startsWith(`${value.toLowerCase()}-`));
    if (exact) return exact[0];
  }
  return 'en';
}
function countryLocale(countryCode = '') {
  const code = countryCode.toUpperCase();
  if (code === 'CN') return 'zh-CN';
  if (['TW', 'HK', 'MO'].includes(code)) return 'zh-TW';
  if (code === 'JP') return 'ja';
  if (code === 'KR') return 'ko';
  if (['DE', 'AT', 'CH', 'LI'].includes(code)) return 'de';
  if (['FR', 'BE', 'LU', 'MC'].includes(code)) return 'fr';
  if (['ES', 'MX', 'AR', 'CL', 'CO', 'PE', 'UY', 'EC', 'CR', 'PA'].includes(code)) return 'es';
  if (['IT', 'SM', 'VA'].includes(code)) return 'it';
  if (['BR', 'PT'].includes(code)) return 'pt-BR';
  if (['RU', 'KZ', 'BY', 'UA'].includes(code)) return 'ru';
  if (['SA', 'AE', 'QA', 'KW', 'BH', 'OM', 'EG', 'JO', 'MA'].includes(code)) return 'ar';
  if (code === 'TR') return 'tr';
  if (code === 'VN') return 'vi';
  if (code === 'TH') return 'th';
  if (['ID', 'MY'].includes(code)) return 'id';
  if (code === 'IN') return 'hi';
  if (code === 'PL') return 'pl';
  if (code === 'NL') return 'nl';
  return 'en';
}
function storedLocaleIsValid() {
  const stored = localStorage.getItem('fbox-locale');
  return Boolean(stored && localeOptions.some(([code]) => code === stored));
}
function initialLocale() {
  localStorage.setItem('fbox-locale', 'zh-CN');
  localStorage.setItem('fbox-locale-mode', 'manual');
  return 'zh-CN';
}
function initialLocaleMode() { return 'manual'; }

const blogFallbackPosts = [
  { id: 'blog-fitment-before-finish', slug: 'fitment-before-finish-custom-wheel-buying-guide', title: 'Fitment Before Finish: A Better Way to Buy Custom Wheels', excerpt: 'The finish gets the attention, but diameter, width, PCD, center bore, offset and brake clearance decide whether the build works.', category: 'Fitment', cover_image: 'halo-20-spoke-01.png', author: 'CIRUI Engineering', read_time: '6 min read', featured: true, published_at: '2026-08-18T09:00:00.000Z', tags: ['fitment', 'custom wheels'] },
   { id: 'blog-read-wheel-specs', slug: 'how-to-read-wheel-specs-diameter-width-pcd-et', title: 'How to Read Wheel Specs Without Guessing', excerpt: 'A quick guide to diameter, width, PCD, center bore and ET, with the practical questions to ask before ordering.', category: 'Technical', cover_image: 'meridian-multi-spoke-01.png', author: 'CIRUI Engineering', read_time: '5 min read', featured: false, published_at: '2026-08-14T09:00:00.000Z', tags: ['wheel specs', 'PCD'] },
   { id: 'blog-forged-vs-cast', slug: 'forged-vs-cast-wheels-what-the-difference-means', title: 'Forged vs. Cast Wheels: What the Difference Means on the Road', excerpt: 'The manufacturing process changes how a wheel can be designed, tested and finished. Here is how to think about the trade-offs.', category: 'Engineering', cover_image: 'vanta-10-01.png', author: 'CIRUI Engineering', read_time: '7 min read', featured: false, published_at: '2026-08-09T09:00:00.000Z', tags: ['forged wheels', 'engineering'] },
   { id: 'blog-wheel-finish-guide', slug: 'wheel-finish-guide-satin-gloss-brushed-and-polished', title: 'Satin, Gloss, Brushed or Polished: Choosing a Wheel Finish', excerpt: 'Finish changes the way a spoke profile reads in daylight, under street lighting and in the photos you keep coming back to.', category: 'Finish', cover_image: 'apex-split-spoke-01.jpg', author: 'CIRUI Design Studio', read_time: '4 min read', featured: false, published_at: '2026-08-03T09:00:00.000Z', tags: ['wheel finish', 'custom color'] }
];

function readLocalJson(key, fallback) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || 'null');
    return parsed === null ? fallback : parsed;
  } catch { return fallback; }
}

const localWorkshopProjects = readLocalJson('fbox-workshop-projects', []);
const localWorkshopCurrentToken = localStorage.getItem('fbox-workshop-current') || '';
const localWorkshopCurrentProject = localWorkshopProjects.find(item => item.share_token === localWorkshopCurrentToken) || null;
const initialAiWheelDraft = readLocalJson('cirui-ai-wheel-draft', {});

function aiWheelDesignDefaults() {
  return {
    stage: 'brief',
    status: 'idle',
    error: '',
    jobId: '',
    conceptJobId: '',
    draft: {
      mode: 'text-reference',
      prompt: '',
      reference_keep: '',
      reference_change: '',
      construction: 'Forged monoblock',
      character: 'Performance / motorsport',
      spoke_count: '',
      finish: 'Brushed clear',
      diameter: '',
      ...initialAiWheelDraft
    },
    referenceData: '',
    referenceName: '',
    concepts: [],
    selectedIndex: -1,
    views: []
  };
}

const state = {
  route: getRoute(),
  menuOpen: false,
  mobileNav: false,
  chatOpen: false,
  chatSessionId: localStorage.getItem('fbox-chat-session') || '',
  chatMessages: [],
  chatSending: false,
  cookie: localStorage.getItem('fbox-cookie') !== 'dismissed',
  modal: null,
  toast: '',
  search: '',
  vehicle: JSON.parse(localStorage.getItem('fbox-vehicle') || 'null'),
  filters: { category: 'Wheels', collection: 'all', application: 'all', saleOnly: false, finish: 'All', diameter: 'All', minPrice: '', maxPrice: '', minRating: '0' },
  sort: 'latest',
  wishlist: JSON.parse(localStorage.getItem('fbox-wishlist') || '[]'),
  cart: JSON.parse(localStorage.getItem('fbox-cart') || '[]'),
  productImage: {},
  reviewLimit: 3,
  homeBuildsExpanded: false,
  checkoutStep: 1,
  locale: initialLocale(),
  localeMode: initialLocaleMode(),
  localeCountry: '',
  mallToken: localStorage.getItem('fbox-mall-token') || '',
  account: null,
  catalogLoaded: false,
  checkoutForm: JSON.parse(localStorage.getItem('fbox-checkout-form') || '{}'),
  rfq: { status: 'idle', id: '', error: '', draft: readLocalJson('cirui-rfq-draft', {}) },
  customSection: 'overview',
  catalogNotice: '',
  lastOrder: null,
  backend: { portal: 'testing', admin: 'testing', checked: false, checking: false },
  fboxVehicleRecords: [],
  fboxVehicleLibrary: { ready: false, source: 'local-fallback', total: 0, officialSpecs: 0 },
  accountOrders: [],
  accountOrdersLoading: false,
  wheelVisualizer: null,
  aiWheelDesign: aiWheelDesignDefaults(),
  homePreviewProductId: 'fbox-rse',
  homeWheelPage: 0,
  homeWheelAutoPausedUntil: 0,
  blogPosts: blogFallbackPosts,
  blogCategory: 'All',
  blogLoaded: false,
  fitment: {
    vehicle: JSON.parse(localStorage.getItem('fbox-vehicle') || 'null'),
    parts: [],
    loaded: false,
    loading: false,
    submitting: false,
    error: '',
    draft: readLocalJson('fbox-fitment-draft', {}),
    result: readLocalJson('fbox-fitment-result', null),
    resultStale: false,
    selectedPackageId: localStorage.getItem('fbox-fitment-package') || '',
    styleReference: null,
    styleCatalog: { filter: 'all', expanded: false, query: '' },
    flow: { mode: '', step: 1, axle: 'front', panel: '', error: '' },
    ai: { loading: false, error: '', result: null, applied: false, missingFields: [] },
    reference: { key: '', loading: false, error: '', data: null },
    vinLookup: { loading: false, error: '', data: null, queriedVin: '' }
  },
  workshop: {
    profile: readLocalJson('fbox-workshop-profile', { shop_name: '', advisor_name: '', email: '', phone: '', location: '' }),
    projects: Array.isArray(localWorkshopProjects) ? localWorkshopProjects : [],
    projectsLoading: false,
    currentProject: localWorkshopCurrentProject,
    saving: false,
    error: '',
    shareProject: null,
    shareLoading: false,
    shareError: '',
    selectedProductId: localWorkshopCurrentProject?.selected_product_id || '',
    referral: readLocalJson('fbox-workshop-referral', null),
    mode: 'ready',
    quote: { status: 'idle', error: '', id: '' }
  }
};
if (state.workshop.referral?.expires_at && Number(state.workshop.referral.expires_at) <= Date.now()) {
  state.workshop.referral = null;
  localStorage.removeItem('fbox-workshop-referral');
}

function getRoute() {
  // Dedicated application paths take precedence over stale hashes. Without
  // this, /fitment-lab#home rendered the homepage while the URL still claimed
  // to be the Fitment Lab, and every subsequent language render repeated the
  // mismatch.
  const pathName = location.pathname.replace(/\/$/, '') || '/';
  const buildMatch = pathName.match(/^\/build\/([^/]+)$/);
  const caseMatch = pathName.match(/^\/fitment-cases\/([^/]+)$/);
  if (buildMatch || caseMatch) return { name: 'fitment-share', token: decodeURIComponent((buildMatch || caseMatch)[1]), publicCase: Boolean(caseMatch) };
  if (pathName === '/fitment-lab') return { name: 'fitment' };
  if (pathName === '/fitment-lab/result') return { name: 'fitment-result' };
  if (pathName === '/ai-wheel-studio') return { name: 'ai-wheel-design' };
  if (pathName === '/account') return { name: 'account' };

  const rawHash = location.hash.replace(/^#/, '');
  const raw = rawHash || 'home';
  const [path] = raw.split('?');
  if (path.startsWith('product/')) return { name: 'product', id: path.split('/')[1] };
  if (path.startsWith('blog/')) return { name: 'blog-post', slug: decodeURIComponent(path.slice('blog/'.length)) };
  if (path.startsWith('fitment-share/')) return { name: 'fitment-share', token: decodeURIComponent(path.slice('fitment-share/'.length)) };
  if (path === 'blog') return { name: 'blog' };
  if (path === 'fitment-result') return { name: 'fitment-result' };
  if (path === 'cart') return { name: 'store' };
  if (path === 'store' || path === 'home' || path === 'about' || path === 'custom' || path === 'trade' || path === 'fitment' || path === 'account') return { name: path };
  return { name: 'home' };
}
function esc(value = '') { return String(value).replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }
function assetUrl(value = '') {
  const source = String(value || '').trim();
  if (!source) return source;
  const cdnBase = String(runtimeConfig.assetCdnBaseUrl || '').replace(/\/+$/, '');
  const cdnPrefix = String(runtimeConfig.assetCdnPathPrefix || '').replace(/^\/+|\/+$/g, '');
  const cdnMediaPrefix = String(runtimeConfig.assetCdnMediaPathPrefix || 'fbox/media').replace(/^\/+|\/+$/g, '');
  const useCdn = runtimeConfig.assetCdnEnabled === true && /^https:\/\//i.test(cdnBase);
  const apiAssetMatch = source.match(/(?:^|\/)api\/fbox-assets\/([^/?#]+)/i);
  if (apiAssetMatch) {
    const localMediaSource = /^(?:https?:|data:|blob:|\/)/i.test(source)
      ? source
      : `/${source.replace(/^\.\//, '')}`;
    if (!useCdn) return localMediaSource;
    const resolved = `${cdnBase}/${[cdnMediaPrefix, apiAssetMatch[1]].filter(Boolean).join('/')}`;
    staticAssetFallbacks.set(new URL(resolved, location.href).href, localMediaSource);
    return resolved;
  }
  if (/^(?:https?:|data:|blob:)/i.test(source)) return source;
  if (/^(?:\/|\.\.?\/)/.test(source) && !/^(?:\.\/|\/)?assets\//i.test(source)) return source;
  const relative = source.replace(/^\.\//, '').replace(/^\/+/g, '').replace(/^assets\//i, '');
  const localOriginal = `${ASSET}${relative}`;
  if (!/\.(?:png|jpe?g)$/i.test(relative)) return localOriginal;

  const optimizedRelative = relative.replace(/\.(?:png|jpe?g)$/i, '.webp');
  const localOptimized = `${ASSET}${optimizedRelative}`;
  const resolved = useCdn
    ? `${cdnBase}/${[cdnPrefix, optimizedRelative].filter(Boolean).join('/')}`
    : localOptimized;
  staticAssetFallbacks.set(new URL(resolved, location.href).href, localOriginal);
  return resolved;
}
document.addEventListener('error', event => {
  const image = event.target;
  if (image instanceof HTMLImageElement && image.hasAttribute('data-contact-qr')) {
    image.hidden = true;
    const link = image.closest('a');
    if (link instanceof HTMLElement) link.hidden = true;
    const fallback = image.closest('.contact-inquiry-qr')?.querySelector('.contact-inquiry-qr-missing');
    if (fallback instanceof HTMLElement) fallback.hidden = false;
    return;
  }
  if (!(image instanceof HTMLImageElement) || image.dataset.fboxFallbackTried === 'true') return;
  const failedSource = image.currentSrc || image.src;
  const fallback = staticAssetFallbacks.get(failedSource);
  if (!fallback) return;
  image.dataset.fboxFallbackTried = 'true';
  const link = image.closest('a[href]');
  if (link && link.href === failedSource) link.href = new URL(fallback, location.href).href;
  image.src = fallback;
}, true);
function money(value) { return `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; }
function stars(rating) { return Number(rating) > 0 ? `<span class="stars" aria-label="${esc(formatUiLabel('{rating} out of 5', { rating }))}">★★★★★</span>` : `<span class="rating-empty">${uiLabel('No verified reviews yet')}</span>`; }
function productTranslationProfile(item) {
  const explicit = String(item?.translation_profile || '').trim();
  if (explicit) return explicit;
  return String(item?.category || '').toLowerCase() === 'wheels' ? 'custom-wheel' : 'catalog-item';
}
function productNameText(item) {
  const localizedName = item?.localized_names?.[state.locale]
    || item?.localized_names?.[String(state.locale || '').split('-')[0]]
    || item?.localized_names?.en;
  const name = String(localizedName || item?.catalog_display_name || item?.name || '').trim();
  if (!name || productTranslationProfile(item) !== 'custom-wheel') return name;
  const suffixes = ['Floating Custom Forged Wheel', 'Full Custom Forged Wheel', 'Full Custom Wheel'];
  const matched = suffixes.find(suffix => name.toLowerCase().endsWith(` - ${suffix.toLowerCase()}`));
  return matched ? `${name.slice(0, -(matched.length + 3))} - ${uiLabel(matched)}` : name;
}
function productCategoryText(item) { return uiLabel(String(item?.category || '')); }
function productFinishText(item) { return uiLabel(String(item?.finish || item?.color || (productTranslationProfile(item) === 'custom-wheel' ? 'Custom finish' : ''))); }
function productMaterialText(item) { return uiLabel(String(item?.material || (productTranslationProfile(item) === 'custom-wheel' ? 'Forged Aluminum Alloy' : ''))); }
function productDealText(item) {
  const fallback = productTranslationProfile(item) === 'custom-wheel'
    ? 'Made to order - every size, fitment and finish customized by CIRUI'
    : 'Availability managed by CIRUI';
  return uiLabel(String(item?.deal || fallback));
}
function productSizeNote(item) { return item?.size_note || (item?.category === 'Wheels' ? 'All sizes supported - custom diameter, width and fitment' : 'All sizes supported - custom fitment built to order'); }
function productMetaText(item) {
  const profile = productTranslationProfile(item);
  const meta = String(item?.meta || (profile === 'custom-wheel' ? 'Full-size custom forged wheel - Diameter / width / PCD / ET / CB built to order' : '')).trim();
  const note = productSizeNote(item);
  const translated = /all sizes supported|all diameters/i.test(meta) ? [uiLabel(meta)] : [uiLabel(meta), uiLabel(note)];
  return [...new Set(translated.filter(Boolean))].join(' · ');
}
function productGallery(item) {
  const stored = Array.isArray(item?.images) ? item.images.map(image => typeof image === 'string' ? image : image?.url).filter(Boolean) : [];
  const fallback = item?.image ? [item.image, 'a7dd472643daf9b4.jpg', 'ff2a26733252a2c8.jpg'] : [];
  return [...new Set((stored.length ? stored : fallback).filter(Boolean))];
}
function hasStartingPrice(item) { return item?.price_mode === 'from'; }
function productPriceText(item) {
  if (item?.price_mode === 'inquiry' || item?.price === null || item?.price === '' || item?.price === undefined) return uiLabel('Price on request');
  if (!hasStartingPrice(item)) return money(item.price);
  const amount = `US${money(item.price)}`;
  const from = uiLabel('From');
  return ['zh-CN', 'zh-TW', 'ja', 'ko', 'hi'].includes(state.locale) ? `${amount} ${from}` : `${from} ${amount}`;
}
function productMinimumQuantity(item) {
  const configured = Number(item?.minimum_quantity || 0);
  const fallback = item?.category === 'Wheels' && (item?.price_mode === 'from' || item?.visualizer_enabled) ? 4 : 1;
  return Math.max(fallback, configured || 0);
}
function productMinimumOrderText(item) {
  const minimum = productMinimumQuantity(item);
  return minimum > 1 ? uiLabel(`Minimum order: ${minimum} wheels.`, `Minimum order: ${minimum} wheels.`) : '';
}
function productMinimumOrderSummary(item) {
  const minimum = productMinimumQuantity(item);
  if (minimum <= 1) return '';
  const subtotal = money(Number(item?.price || 0) * minimum);
  if (state.locale === 'zh-TW') return `最低起訂金額：${subtotal}，${minimum} 只輪圈。`;
  if (String(state.locale || '').startsWith('zh')) return `最低起订金额：${subtotal}，${minimum} 只轮毂。`;
  return `Minimum starting subtotal: ${subtotal} for ${minimum} wheels.`;
}
function product(id) { return products.find(item => item.id === id) || products[0]; }
function homeWheelProducts() {
  const fallbackRank = ['fbox-rse', 'fbox-sv100', 'fbox-apex-split-spoke', 'fbox-vanta-10', 'fbox-meridian-multi-spoke', 'fbox-halo-20-spoke'];
  return publicForgedProducts()
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.image)
    .sort((left, right) => {
      const a = left.item;
      const b = right.item;
      const aDate = Date.parse(a.created_at || a.updated_at || '') || 0;
      const bDate = Date.parse(b.created_at || b.updated_at || '') || 0;
      if (aDate !== bDate) return bDate - aDate;
      const aCustom = a.price_mode === 'from' || a.visualizer_enabled ? 1 : 0;
      const bCustom = b.price_mode === 'from' || b.visualizer_enabled ? 1 : 0;
      if (aCustom !== bCustom) return bCustom - aCustom;
      const aSort = Number(a.sort || 0);
      const bSort = Number(b.sort || 0);
      if (aSort !== bSort) return bSort - aSort;
      const aRank = fallbackRank.indexOf(a.id);
      const bRank = fallbackRank.indexOf(b.id);
      if (aRank !== bRank) return (aRank < 0 ? 99 : aRank) - (bRank < 0 ? 99 : bRank);
      return left.index - right.index;
    })
    .map(({ item }) => item);
}
function homePreviewProduct() {
  return products.find(item => item.id === state.homePreviewProductId && item.category === 'Wheels')
    || homeWheelProducts()[0]
    || products[0];
}
function homePreviewShortName(item) { return String(item?.name || 'CIRUI wheel').replace(/^CIRUI\s+/i, '').split(' - ')[0]; }
function persist() { localStorage.setItem('fbox-cart', JSON.stringify(state.cart)); localStorage.setItem('fbox-wishlist', JSON.stringify(state.wishlist)); if (state.vehicle) localStorage.setItem('fbox-vehicle', JSON.stringify(state.vehicle)); }
function setToast(message) { state.toast = message; render(); window.clearTimeout(setToast.timer); setToast.timer = window.setTimeout(() => { state.toast = ''; render(); }, 2800); }
function go(hash) {
  const normalizedHash = `#${String(hash || 'home').replace(/^#/, '')}`;
  state.modal = null;
  state.menuOpen = false;
  state.mobileNav = false;
  history.pushState({}, '', `/${normalizedHash}`);
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
  trackPageView();
}
function goPath(path) {
  state.modal = null;
  history.pushState({}, '', path);
  render();
  if (state.route.name === 'fitment') void loadFitmentPartsContent();
  if (state.route.name === 'fitment-share') void loadWorkshopShare(state.route.token);
  if (state.route.name === 'account') void loadWorkshopProjects();
  window.scrollTo({ top: 0, behavior: 'instant' });
  trackPageView();
}
function cartCount() {
  return state.cart.filter(row => {
    const item = product(row.id);
    return item?.category === 'Wheels' && item.public_scope !== false && !item.vehicle_label;
  }).length;
}
function cartTotal() { return state.cart.reduce((sum, item) => sum + item.qty * product(item.id).price, 0); }
function cartMinimumIssue() {
  return state.cart.map(row => ({ row, item: product(row.id) })).find(({ row, item }) => row.qty < productMinimumQuantity(item)) || null;
}
function currentVehicleLabel() { return state.vehicle ? [state.vehicle.year, state.vehicle.make, state.vehicle.model, state.vehicle.trim].filter(Boolean).join(' ') : 'Select your vehicle'; }
function currentVehicleRecord() {
  const selected = state.vehicle || {};
  const matches = state.fboxVehicleRecords.filter(record => record.spec_status === 'verified' && Number(record.year) === Number(selected.year) && record.make === selected.make && record.model === selected.model && record.trim === selected.trim);
  return matches.find(record => !selected.drive || !record.drive || record.drive === selected.drive) || matches[0] || null;
}
function currentOfficialWheelSpecs() {
  const record = currentVehicleRecord();
  return record?.oem_wheel_specs || {};
}

function whatsappIsChinese() { return String(state.locale || '').startsWith('zh'); }
function whatsappCopy(english, chinese) { return whatsappIsChinese() ? chinese : english; }
function whatsappValue(value, pending = whatsappCopy('To confirm', '待确认')) { return value === undefined || value === null || String(value).trim() === '' ? pending : String(value); }
function whatsappVehicleLabel(vehicle = state.vehicle || state.fitment?.vehicle) {
  return [vehicle?.year, vehicle?.make, vehicle?.model, vehicle?.trim, vehicle?.drive ? `(${vehicle.drive})` : ''].filter(Boolean).join(' ') || whatsappCopy('Vehicle not selected', '尚未选择车型');
}
function whatsappUsageLabel(value) {
  return ({ street: whatsappCopy('Daily street', '日常街道'), spirited: whatsappCopy('Spirited road', '激烈驾驶'), show: whatsappCopy('Show / stance', '展示 / 低趴'), track: whatsappCopy('Track / competition', '赛道 / 竞技') })[value] || whatsappValue(value, whatsappCopy('Not specified', '未说明'));
}
function whatsappStanceLabel(value) {
  return ({ oem: whatsappCopy('Factory original', '原厂状态'), lowered: whatsappCopy('Lowered street', '街道降低'), 'static-low': whatsappCopy('Static low / stance', '静态低趴'), 'air-low': whatsappCopy('Air suspension low', '气动低趴'), track: whatsappCopy('Track alignment', '赛道定位') })[value] || whatsappValue(value, whatsappCopy('Not specified', '未说明'));
}
function whatsappPartLabel(id, type = '') {
  if (!id) return whatsappCopy('Not selected', '未选择');
  if (id === 'oem') return type === 'suspension' ? whatsappCopy('Factory original suspension · exact trim to confirm', '原厂避震 · 需确认准确配置') : whatsappCopy('Factory original · exact trim to confirm', '原厂部件 · 需确认准确配置');
  const part = state.fitment.parts.find(item => String(item.id) === String(id));
  return part ? `${part.brand} ${part.model}${part.part_number ? ` · ${part.part_number}` : ''}` : String(id);
}
function whatsappImageUrl(value) {
  const source = String(value || '').trim();
  if (!source || /^(?:data|blob):/i.test(source)) return '';
  try {
    const url = new URL(assetUrl(source), location.href);
    return /^https?:$/i.test(url.protocol) ? url.href : '';
  } catch { return ''; }
}
function whatsappImageLinks(lines, imageUrls) {
  const unique = [...new Set(imageUrls.map(whatsappImageUrl).filter(Boolean))].slice(0, 3);
  if (unique.length) lines.push(`${whatsappCopy('Preview image links', '效果图链接')}:\n${unique.map((url, index) => `${index + 1}. ${url}`).join('\n')}`);
  return { lines, imageUrls: unique };
}
function whatsappAxleLines(draft, axle) {
  const label = axle === 'front' ? whatsappCopy('Front axle', '前轴') : whatsappCopy('Rear axle', '后轴');
  const value = key => whatsappValue(draft[`${axle}_${key}`], '—');
  return [
    `${label} ${whatsappCopy('wheel', '轮毂')}：${value('diameter')} × ${value('width')} in · PCD ${value('pcd')} · ET ${value('offset')} · CB ${value('center_bore')} mm`,
    `${whatsappCopy('Clearance', '间隙')}：${whatsappCopy('spacer', '垫片')} ${value('spacer_mm')} mm · ${whatsappCopy('barrel → strut / spring perch', '内桶 → 避震筒 / 弹簧座')} ${value('inner_clearance_mm')} mm · ${whatsappCopy('spoke back → caliper highest point', '辐条背面 → 卡钳最高点')} ${value('spoke_clearance_mm')} mm`,
    `${whatsappCopy('Alignment', '定位')}：${whatsappCopy('camber', '倾角')} ${value('camber_deg')}° · ${whatsappCopy('toe', '前束')} ${value('toe_deg')}° · ${whatsappCopy('tire', '轮胎')} ${value('tire')} · ${whatsappCopy('style', '安装风格')} ${whatsappValue(draft[`${axle}_tire_fitment_style`], whatsappCopy('Not specified', '未说明'))}`,
    `${whatsappCopy('Dynamic clearance', '动态间隙')}：${whatsappCopy('tire shoulder → inner fender', '轮胎肩部 → 轮眉内缘')} ${value('fender_clearance_mm')} mm · ${whatsappCopy('full compression minimum', '完全压缩最小值')} ${value('compression_clearance_mm')} mm`
  ];
}
function fitmentWhatsAppContext() {
  const draft = state.fitment.draft || {};
  const result = state.fitment.result || {};
  const lines = [
    whatsappCopy('CIRUI custom wheel fitment consultation', 'CIRUI 定制轮毂适配咨询'),
    `${whatsappCopy('Vehicle', '车型')}：${whatsappVehicleLabel(state.fitment.vehicle || state.vehicle)}`,
    `${whatsappCopy('Use case', '使用场景')}：${whatsappUsageLabel(draft.usage)} · ${whatsappCopy('stance', '姿态')}：${whatsappStanceLabel(draft.stance_profile)} · ${whatsappCopy('ride-height drop', '降低高度')}：${whatsappValue(draft.ride_height_drop_mm, '0')} mm`,
    `${whatsappCopy('Front brake / caliper', '前轴刹车 / 卡钳')}：${whatsappPartLabel(draft.front_brake_id, 'brake')}`,
    `${whatsappCopy('Rear brake / caliper', '后轴刹车 / 卡钳')}：${whatsappPartLabel(draft.rear_brake_id, 'brake')}`,
    `${whatsappCopy('Front rotor', '前轴刹车盘')}：${whatsappPartLabel(draft.front_rotor_id, 'rotor')}`,
    `${whatsappCopy('Rear rotor', '后轴刹车盘')}：${whatsappPartLabel(draft.rear_rotor_id, 'rotor')}`,
    `${whatsappCopy('Front pad', '前轴刹车片')}：${whatsappPartLabel(draft.front_pad_id, 'pad')}`,
    `${whatsappCopy('Rear pad', '后轴刹车片')}：${whatsappPartLabel(draft.rear_pad_id, 'pad')}`,
    `${whatsappCopy('Suspension / coilover', '避震 / 绞牙')}：${whatsappPartLabel(draft.suspension_id, 'suspension')}`,
    '',
    ...whatsappAxleLines(draft, 'front'),
    ...whatsappAxleLines(draft, 'rear'),
    '',
    `${whatsappCopy('Rule result', '规则结果')}：${result.status_label || result.status || whatsappCopy('Needs measurement', '需要测量')}`,
    `${whatsappCopy('Next step', '下一步')}：${result.next_step || whatsappCopy('Please confirm the final wheel drawing and dynamic clearance.', '请确认最终轮毂图纸和动态间隙。')}`
  ];
  const missing = (result.missing || []).slice(0, 8);
  if (missing.length) lines.push(`${whatsappCopy('Still needed', '仍需补充')}：\n${missing.map(item => `- ${item}`).join('\n')}`);
  const imageResult = whatsappImageLinks(lines, []);
  return { kind: 'fitment', title: whatsappCopy('CIRUI fitment consultation', 'CIRUI 适配咨询'), message: imageResult.lines.join('\n'), imageUrls: imageResult.imageUrls };
}
function whatsappProductPrice(item) {
  if (!hasStartingPrice(item)) return money(item?.price || 0);
  return whatsappIsChinese() ? `USD ${Number(item.price || 0).toFixed(0)} 起` : `From USD ${item.price}`;
}
function whatsappProductFinish(item) {
  const finish = String(item?.finish || item?.color || '').trim();
  if (!finish) return whatsappCopy('Custom finish', '表面处理按需定制');
  return whatsappIsChinese() && /custom/i.test(finish) ? '表面颜色和工艺按需定制' : finish;
}
function whatsappProductSizeNote(item) {
  if (!whatsappIsChinese()) return productSizeNote(item);
  return item?.category === 'Wheels'
    ? '支持全尺寸定制：直径、宽度、PCD、ET、中心孔可按车型匹配'
    : '支持全尺寸定制，并按车辆和安装空间适配';
}
function productWhatsAppContext(item) {
  const lines = [
    whatsappCopy('CIRUI custom wheel quotation', 'CIRUI 定制轮毂咨询报价'),
    `${whatsappCopy('Product', '商品')}：${item?.name || whatsappCopy('Custom wheel', '定制轮毂')}`,
    `${whatsappCopy('Price', '价格')}：${whatsappProductPrice(item)}`,
    `${whatsappCopy('Finish', '表面处理')}：${whatsappProductFinish(item)}`,
    `${whatsappCopy('Available size', '可定制尺寸')}：${whatsappProductSizeNote(item)}`,
    `${whatsappCopy('Vehicle', '车型')}：${whatsappVehicleLabel()}`,
    whatsappCopy('Please confirm the exact diameter, width, PCD, ET, center bore, brake template and dynamic clearance for my vehicle.', '请帮我确认这台车适配的直径、宽度、PCD、ET、中心孔、刹车模板和动态间隙。')
  ];
  const imageResult = whatsappImageLinks(lines, [state.productImage[item?.id], ...(productGallery(item) || [])]);
  return { kind: 'product', title: whatsappCopy('CIRUI wheel quotation', 'CIRUI 轮毂报价'), productId: item?.id || '', message: imageResult.lines.join('\n'), imageUrls: imageResult.imageUrls };
}
function visualizerWhatsAppContext() {
  const current = state.wheelVisualizer || {};
  const item = wheelVisualizerItem();
  const draft = current.inquiry?.draft || {};
  const lines = [
    whatsappCopy('CIRUI visual fitment consultation', 'CIRUI 效果图适配咨询'),
    `${whatsappCopy('Product', '商品')}：${item?.name || whatsappCopy('Custom wheel', '定制轮毂')}`,
    `${whatsappCopy('Vehicle', '车型')}：${current.vehicleName || whatsappVehicleLabel()}`,
    `${whatsappCopy('Wheel specification', '轮毂参数')}：${whatsappValue(draft.diameter)} × ${whatsappValue(draft.width)} in · PCD ${whatsappValue(draft.pcd)} · ET ${whatsappValue(draft.offset)} · CB ${whatsappValue(draft.center_bore)} mm`,
    `${whatsappCopy('Quantity', '数量')}：${whatsappValue(draft.quantity, '4')}`,
    whatsappCopy('Please confirm the final custom wheel drawing and clearance before production.', '请在生产前确认最终定制轮毂图纸和间隙适配。')
  ];
  const images = [current.referenceImage, ...(current.results || []).map(result => result.imageUrl || result.image_url || result.url)];
  const imageResult = whatsappImageLinks(lines, images);
  return { kind: 'visualizer', title: whatsappCopy('CIRUI visual fitment', 'CIRUI 效果图适配'), productId: item?.id || '', message: imageResult.lines.join('\n'), imageUrls: imageResult.imageUrls };
}
function generalWhatsAppContext() {
  return { kind: 'general', title: whatsappCopy('Contact CIRUI', '联系 CIRUI'), message: whatsappCopy('Hello CIRUI, I would like help choosing custom wheels for my vehicle. Please tell me what fitment information and photos you need.', '你好 CIRUI，我想咨询我的车辆定制轮毂。请告诉我需要提供哪些适配参数和照片。'), imageUrls: [] };
}
function whatsappContext(action = '', targetId = '') {
  if (action === 'whatsapp-fitment' || (state.route.name === 'fitment' && state.fitment.result)) return fitmentWhatsAppContext();
  if (action === 'whatsapp-visualizer' || state.wheelVisualizer?.open) return visualizerWhatsAppContext();
  if (action === 'whatsapp-product' || state.route.name === 'product') return productWhatsAppContext(product(targetId || state.route.id));
  return generalWhatsAppContext();
}
function whatsappHref(message) { return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(String(message || '').slice(0, 6000))}`; }
async function openWhatsAppContext(context) {
  const message = context.message || generalWhatsAppContext().message;
  trackEvent('whatsapp_click', { path: location.pathname + location.hash, title: context.kind || 'general', product_id: context.productId || '', meta: { phone: company.whatsappNumber, image_count: context.imageUrls?.length || 0 } });
  if (context.imageUrls?.length && window.matchMedia('(max-width: 760px)').matches && typeof navigator.share === 'function') {
    try {
      const files = [];
      for (const [index, imageUrl] of context.imageUrls.slice(0, 3).entries()) {
        const response = await fetch(imageUrl, { mode: 'cors' });
        if (!response.ok) continue;
        const blob = await response.blob();
        if (!blob.size) continue;
        const type = blob.type || 'image/jpeg';
        const extension = type.includes('png') ? 'png' : 'jpg';
        files.push(new File([blob], `fbox-${context.kind || 'preview'}-${index + 1}.${extension}`, { type }));
      }
      if (files.length && typeof navigator.canShare === 'function' && navigator.canShare({ files })) {
        await navigator.share({ title: context.title, text: message, files });
        setToast(whatsappCopy('Shared with your selected app.', '已通过手机分享面板发送。'));
        return;
      }
    } catch (error) {
      if (error?.name === 'AbortError') return;
    }
  }
  const opened = window.open(whatsappHref(message), '_blank', 'noopener,noreferrer');
  if (!opened) window.location.href = whatsappHref(message);
  setToast(whatsappCopy('WhatsApp opened with your setup and preview links.', 'WhatsApp 已打开，参数和效果图链接已填入。'));
}
function whatsappFab() {
  const label = uiLabel('Chat with CIRUI on WhatsApp', 'Chat with CIRUI on WhatsApp');
  const context = whatsappContext();
  return `<a class="whatsapp-fab" data-action="whatsapp" href="${esc(whatsappHref(context.message))}" target="_blank" rel="noopener" aria-label="${esc(label)}" title="${esc(label)}">${icons.whatsapp}<span class="whatsapp-fab-label">WhatsApp</span></a>`;
}

const wheelVisualizerDefaults = () => ({
  open: false,
  productId: '',
  referenceImage: '',
  referenceObjectUrl: '',
  customProduct: null,
  designPrompt: '',
  workshopProjectToken: '',
  workshopProjectTitle: '',
  workshopShopName: '',
  phase: 'upload',
  vehicleFile: null,
  vehicleUrl: '',
  vehicleName: '',
  crop: { zoom: 1, x: 50, y: 50 },
  jobId: '',
  results: [],
  error: '',
  errorCode: '',
  resultViewer: null,
  inquiry: null,
  registrationDraft: { name: '', email: '', telephone: '' },
  registrationError: '',
  registrationSubmitting: false,
  mode: 'fbox-lingkeai'
});
state.wheelVisualizer = wheelVisualizerDefaults();

function wheelVisualizerState(productId = '', referenceImage = '') {
  const item = product(productId);
  return { ...wheelVisualizerDefaults(), open: true, productId, referenceImage: referenceImage || state.productImage[productId] || item.image };
}
function wheelVisualizerItem() {
  return state.wheelVisualizer?.customProduct || product(state.wheelVisualizer?.productId || state.route.id);
}
function wheelVisualizerAngleLabel(angle) {
  return ({
    front_left: 'Front three-quarter',
    front_right: 'Front three-quarter',
    side_profile: 'Side profile'
  })[angle] || angle || 'Generated view';
}
function wheelVisualizerFormatBytes(bytes = 0) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
function wheelVisualizerCropStyle(crop = state.wheelVisualizer?.crop || {}) {
  const zoom = Number(crop.zoom || 1);
  const x = Number(crop.x ?? 50);
  const y = Number(crop.y ?? 50);
  const translateX = ((50 - x) * 0.75).toFixed(2);
  const translateY = ((50 - y) * 0.75).toFixed(2);
  return `transform:translate3d(${translateX}%,${translateY}%,0) scale(${zoom});transform-origin:center center;`;
}
function wheelVisualizerUpdateCropPreview() {
  const crop = state.wheelVisualizer?.crop;
  if (!crop) return;
  const image = document.querySelector('[data-wheel-crop-image]');
  if (image) image.setAttribute('style', wheelVisualizerCropStyle(crop));
  Object.entries(crop).forEach(([key, value]) => {
    const input = document.querySelector(`[data-wheel-crop="${key}"]`);
    if (input) input.value = value;
    const output = document.querySelector(`[data-wheel-crop-output="${key}"]`);
    if (output) output.textContent = key === 'zoom' ? `${Number(value).toFixed(2)}×` : `${value}%`;
  });
}
function wheelVisualizerClose() {
  const current = state.wheelVisualizer;
  if (current?.vehicleUrl?.startsWith('blob:')) URL.revokeObjectURL(current.vehicleUrl);
  if (current?.referenceObjectUrl?.startsWith('blob:')) URL.revokeObjectURL(current.referenceObjectUrl);
  state.wheelVisualizer = wheelVisualizerDefaults();
  render();
}
function wheelVisualizerReset(nextPhase = 'upload') {
  const current = state.wheelVisualizer || wheelVisualizerDefaults();
  if (current.vehicleUrl?.startsWith('blob:')) URL.revokeObjectURL(current.vehicleUrl);
  state.wheelVisualizer = {
    ...wheelVisualizerDefaults(),
    open: true,
    productId: current.productId,
    referenceImage: current.referenceImage,
    referenceObjectUrl: current.referenceObjectUrl,
    customProduct: current.customProduct,
    designPrompt: current.designPrompt,
    workshopProjectToken: current.workshopProjectToken,
    workshopProjectTitle: current.workshopProjectTitle,
    workshopShopName: current.workshopShopName,
    phase: nextPhase
  };
  render();
}
function wheelVisualizerHandleFile(file) {
  if (!file) return;
  const fileType = String(file.type || '').toLowerCase();
  const fileName = String(file.name || '').toLowerCase();
  const hasSupportedImageType = fileType.startsWith('image/') || /\.(?:jpe?g|png|webp|heic|heif)$/i.test(fileName);
  if (!hasSupportedImageType) {
    state.wheelVisualizer.error = 'Please choose a JPG, PNG, WEBP or HEIC image.';
    state.wheelVisualizer.phase = 'error';
    render();
    return;
  }
  if (file.size > 20 * 1024 * 1024) {
    state.wheelVisualizer.error = 'This image is larger than 20 MB. Please choose a smaller photo.';
    state.wheelVisualizer.phase = 'error';
    render();
    return;
  }
  const current = state.wheelVisualizer;
  if (current.vehicleUrl?.startsWith('blob:')) URL.revokeObjectURL(current.vehicleUrl);
  current.vehicleFile = file;
  current.vehicleUrl = URL.createObjectURL(file);
  current.vehicleName = file.name;
  current.crop = { zoom: 1, x: 50, y: 50 };
  current.registrationDraft = { name: state.account?.name || state.account?.username || '', email: state.account?.email || '', telephone: '' };
  current.registrationError = '';
  current.phase = state.mallToken && state.account ? 'crop' : 'registration';
  current.error = '';
  render();
}
function wheelVisualizerPrepareImage(blob) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      try {
        const naturalWidth = image.naturalWidth || image.width;
        const naturalHeight = image.naturalHeight || image.height;
        if (!naturalWidth || !naturalHeight) throw new Error('The selected image has no readable dimensions.');
        let width = Math.min(naturalWidth, 2200);
        let height = Math.max(1, Math.round(naturalHeight * (width / naturalWidth)));
        let output = '';
        for (let attempt = 0; attempt < 6; attempt += 1) {
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(width));
          canvas.height = Math.max(1, Math.round(height));
          const context = canvas.getContext('2d', { alpha: false });
          if (!context) throw new Error('This browser cannot prepare the selected image.');
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          output = canvas.toDataURL('image/jpeg', Math.max(0.56, 0.84 - attempt * 0.05));
          if (output.length <= 5 * 1024 * 1024 || attempt === 5) break;
          width = Math.max(960, width * 0.82);
          height = Math.max(1, Math.round(naturalHeight * (width / naturalWidth)));
        }
        if (!output) throw new Error('The selected image could not be prepared.');
        resolve(output);
      } catch (error) {
        reject(error);
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      const name = String(blob?.name || '').toLowerCase();
      const type = String(blob?.type || '').toLowerCase();
      if (type.includes('heic') || type.includes('heif') || /\.(?:heic|heif)$/i.test(name)) {
        reject(new Error('This phone photo is HEIC/HEIF and cannot be converted by this browser. Export it as JPG from your photo app, then try again.'));
        return;
      }
      reject(new Error('The selected image could not be read. Please choose a JPG, PNG or WEBP photo.'));
    };
    image.src = objectUrl;
  });
}
async function wheelVisualizerRemoteJob(request) {
  const vehicleImage = await wheelVisualizerPrepareImage(request.file);
  let productImage = '';
  if (request.referenceImage || request.product.image) {
    const productResponse = await fetch(assetUrl(request.referenceImage || request.product.image));
    if (!productResponse.ok) throw new Error('The selected product reference could not be loaded.');
    productImage = await wheelVisualizerPrepareImage(await productResponse.blob());
  }
  const body = {
    vehicle_image: vehicleImage,
    product_image: productImage,
    product_id: request.product.id,
    product_name: request.product.name,
    product_category: request.product.category,
    product_finish: request.product.finish,
    product_fitment: request.product.meta,
    design_prompt: state.wheelVisualizer?.designPrompt || '',
    workshop_project_token: state.wheelVisualizer?.workshopProjectToken || '',
    vehicle_name: currentVehicleLabel(),
    vehicle_file_name: request.file?.name || '',
    crop: request.crop,
    angles: 3
  };
  const response = await fetch('/api/wheel-visualizer/jobs', { method: 'POST', body: JSON.stringify(body), headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...(state.mallToken ? { Authorization: state.mallToken } : {}) } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) { const error = new Error(payload.message || payload.detail || payload.error?.message || 'The CIRUI AI visualizer is unavailable.'); error.status = response.status; throw error; }
  return payload.data || payload;
}
async function createWheelVisualizerJob() {
  const current = state.wheelVisualizer;
  const item = wheelVisualizerItem();
  const request = { file: current.vehicleFile, vehicleUrl: current.vehicleUrl, crop: current.crop, referenceImage: current.referenceImage || item.image, product: item };
  if (window.FBOX_WHEEL_VISUALIZER_API?.create) return window.FBOX_WHEEL_VISUALIZER_API.create(request);
  return wheelVisualizerRemoteJob(request);
}
async function wheelVisualizerStart() {
  const current = state.wheelVisualizer;
  if (!current?.vehicleFile) return;
  if (!state.mallToken || !state.account) {
    current.phase = 'registration';
    render();
    return;
  }
  current.phase = 'generating';
  current.error = '';
  current.errorCode = '';
  current.jobId = '';
  render();
  try {
    const result = await createWheelVisualizerJob();
    if (result?.status === 'queued' || result?.status === 'running') {
      current.jobId = result.jobId || result.job_id || '';
      current.phase = 'generating';
      render();
      await wheelVisualizerPoll(current.jobId);
      return;
    }
    current.jobId = result?.jobId || result?.job_id || '';
    current.results = (result?.results || []).slice(0, 3);
    current.mode = result?.mode || 'fbox-lingkeai';
    if (current.results.length !== 3) throw new Error('The preview service returned fewer than 3 angles.');
    current.phase = 'results';
    render();
  } catch (error) {
    current.phase = 'error';
    current.errorCode = error?.code || '';
    current.error = error?.message || 'We could not generate the visual preview.';
    render();
  }
}
async function wheelVisualizerResume() {
  const current = state.wheelVisualizer;
  if (!current?.vehicleFile || !current.jobId) return wheelVisualizerStart();
  current.phase = 'generating';
  current.error = '';
  current.errorCode = '';
  render();
  try {
    await wheelVisualizerPoll(current.jobId);
  } catch (error) {
    current.phase = 'error';
    current.errorCode = error?.code || '';
    current.error = error?.message || 'We could not resume the visual preview.';
    render();
  }
}
async function wheelVisualizerPoll(jobId) {
  if (!jobId) throw new Error('The preview job did not return an id.');
  const pollIntervalMs = 1500;
  const maxWaitMs = 360000;
  const maxAttempts = Math.ceil(maxWaitMs / pollIntervalMs);
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    await new Promise(resolve => window.setTimeout(resolve, pollIntervalMs));
    const response = await fetch(`/api/wheel-visualizer/jobs/${encodeURIComponent(jobId)}`, { headers: { Accept: 'application/json' } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || payload.detail || payload.error?.message || 'The preview job could not be checked.');
    const result = payload.data || payload;
    if (result.status === 'failed') {
      const error = new Error(result.message || 'The preview job failed.');
      error.code = 'JOB_FAILED';
      throw error;
    }
    if (result.status === 'canceled') {
      const error = new Error('The preview job was canceled.');
      error.code = 'JOB_CANCELED';
      throw error;
    }
    if (result.status === 'succeeded' || result.status === 'completed') {
      const current = state.wheelVisualizer;
      current.results = (result.results || []).slice(0, 3);
      current.mode = result.mode || 'fbox-lingkeai';
      if (current.results.length !== 3) throw new Error('The preview service returned fewer than 3 angles.');
      current.phase = 'results';
      render();
      return;
    }
  }
  const timeout = new Error('This preview is still processing. Continue waiting to reuse this request; a new image task will not be created.');
  timeout.code = 'POLL_TIMEOUT';
  throw timeout;
}

async function mallRequest(base, endpoint, options = {}) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), options.timeout || 5000);
  const headers = { Accept: 'application/json', ...(options.headers || {}) };
  if (state.mallToken) headers.Authorization = state.mallToken;
  try {
    const response = await fetch(`${base}${endpoint}`, { ...options, headers, signal: controller.signal });
    const text = await response.text();
    let payload = null;
    try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }
    if (!response.ok) throw new Error(`CIRUI request failed: ${response.status}`);
    if (payload && typeof payload === 'object' && payload.code !== undefined && payload.code !== 200) {
      throw new Error(payload.message || 'CIRUI request failed');
    }
    return payload?.data ?? payload;
  } finally {
    window.clearTimeout(timeout);
  }
}

async function checkMallBackend() {
  if (state.backend.checking) return;
  state.backend.checking = true;
  state.backend.portal = 'checking';
  state.backend.admin = 'checking';
  renderBackgroundUpdate();
  const [portal, admin] = await Promise.allSettled([
    fetch(`${mallConfig.portalBase}/products`, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(8000) }),
    fetch('/api/fbox-content/settings', { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(8000) })
  ]);
  state.backend.portal = portal.status === 'fulfilled' && portal.value.ok ? 'connected' : 'testing';
  state.backend.admin = admin.status === 'fulfilled' && admin.value.ok ? 'connected' : 'testing';
  state.backend.checked = true;
  state.backend.checking = false;
  renderBackgroundUpdate();
}

function isPaymentProductPageMounted() {
  return getRoute().name === 'product'
    && Boolean(document.querySelector('[data-paypal-hosted-container], [data-paypal-cart-button]'));
}

function renderBackgroundUpdate() {
  if (isPaymentProductPageMounted()) return;
  render();
}

function applyProductReviewStats(catalog) {
  return catalog.map(item => {
    const productReviews = reviews.filter(review => review.product_id === item.id);
    if (!productReviews.length) return { ...item, rating: 0, reviews: 0 };
    const rating = productReviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / productReviews.length;
    return { ...item, rating: Number(rating.toFixed(1)), reviews: productReviews.length };
  });
}

async function loadReviewsContent() {
  try {
    const reviewResponse = await fetch('/api/fbox-content/reviews?status=approved', { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000) });
    const reviewPayload = await reviewResponse.json().catch(() => ({}));
    if (!reviewResponse.ok) throw new Error('Reviews unavailable');
    reviews = Array.isArray(reviewPayload.data) ? reviewPayload.data : [];
    products = applyProductReviewStats(products);
    renderBackgroundUpdate();
  } catch {
    // Reviews stay empty when the public content API is offline.
  }
}

async function loadCasesContent() {
  try {
    const caseResponse = await fetch('/api/fbox-content/cases?status=published', { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000) });
    const casePayload = await caseResponse.json().catch(() => ({}));
    if (!caseResponse.ok) throw new Error('Cases unavailable');
    fboxCases = Array.isArray(casePayload.data) ? casePayload.data : [];
    renderBackgroundUpdate();
  } catch {
    // Case studies are optional storefront content.
  }
}

async function loadPhotoReviewsContent() {
  try {
    const photoReviewResponse = await fetch('/api/fbox-content/photo-reviews?limit=20', { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000) });
    const photoReviewPayload = await photoReviewResponse.json().catch(() => ({}));
    if (!photoReviewResponse.ok) throw new Error('Photo reviews unavailable');
    fboxPhotoReviews = Array.isArray(photoReviewPayload.data) ? photoReviewPayload.data : [];
    renderBackgroundUpdate();
  } catch {
    // Photo reviews are optional storefront content.
  }
}

async function loadFitmentPartsContent() {
  void loadExpandedVehicleIdentity();
  void loadFitmentVehicleReference(state.fitment.vehicle);
  if (state.fitment.loaded || state.fitment.loading) return;
  state.fitment.loading = true;
  try {
    const fitmentResponse = await fetch('/api/fbox-content/fitment/parts', { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(12000) });
    const fitmentPayload = await fitmentResponse.json().catch(() => ({}));
    if (!fitmentResponse.ok) throw new Error('Fitment parts unavailable');
    state.fitment.parts = Array.isArray(fitmentPayload.data) ? fitmentPayload.data : [];
    state.fitment.loaded = true;
    renderBackgroundUpdate();
  } catch {
    state.fitment.loaded = false;
  } finally {
    state.fitment.loading = false;
  }
}

function loadFBoxContent() {
  return Promise.allSettled([
    loadReviewsContent(),
    loadCasesContent(),
    loadPhotoReviewsContent()
  ]);
}

const loadedVehicleRecordKeys = new Set();
const vehicleRecordRequests = new Map();
function vehicleRecordKey(vehicle = {}) {
  return [vehicle.year, vehicle.make, vehicle.model, vehicle.trim].map(value => String(value || '').trim()).join('|');
}
async function loadSelectedVehicleRecord(vehicle = state.vehicle) {
  if (!vehicle?.year || !vehicle?.make || !vehicle?.model || !vehicle?.trim) return null;
  const key = vehicleRecordKey(vehicle);
  const existing = state.fboxVehicleRecords.find(record => vehicleRecordKey(record) === key);
  if (existing || loadedVehicleRecordKeys.has(key)) return existing || null;
  if (vehicleRecordRequests.has(key)) return vehicleRecordRequests.get(key);

  const request = (async () => {
    const params = new URLSearchParams({
      year: String(vehicle.year),
      make: vehicle.make,
      model: vehicle.model,
      trim: vehicle.trim
    });
    const response = await fetch(`/api/fbox-content/vehicles?${params}`, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error('Vehicle specification unavailable');
    const records = Array.isArray(payload.data) ? payload.data.filter(record => record.status !== 'inactive' && record.spec_status === 'verified' && (record.spec_source || record.oem_wheel_specs?.source)) : [];
    const known = new Set(state.fboxVehicleRecords.map(record => record.id || `${vehicleRecordKey(record)}|${record.drive || ''}`));
    records.forEach(record => {
      const identity = record.id || `${vehicleRecordKey(record)}|${record.drive || ''}`;
      if (!known.has(identity)) state.fboxVehicleRecords.push(record);
    });
    loadedVehicleRecordKeys.add(key);
    state.fboxVehicleLibrary = {
      ready: true,
      source: payload.meta?.source || 'CIRUI vehicle library',
      total: Number(payload.meta?.total || records.length),
      officialSpecs: Number(payload.meta?.verified_specs || 0)
    };
    if (vehicleRecordKey(state.vehicle || state.fitment.vehicle || {}) === key) renderBackgroundUpdate();
    return records[0] || null;
  })().catch(() => null).finally(() => vehicleRecordRequests.delete(key));
  vehicleRecordRequests.set(key, request);
  return request;
}

async function loadBlogContent() {
  try {
    const response = await fetch('/api/fbox-content/blog?limit=50', { headers: { Accept: 'application/json' } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || 'Journal unavailable');
    state.blogPosts = Array.isArray(payload.data) && payload.data.length ? payload.data : blogFallbackPosts;
    state.blogLoaded = true;
    if (state.route.name === 'blog' || state.route.name === 'blog-post' || state.route.name === 'home') render();
  } catch {
    state.blogPosts = blogFallbackPosts;
  }
}

function normalizeWhatsAppNumber(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return /^\d{8,15}$/.test(digits) ? digits : '';
}

function formatWhatsAppNumber(value) {
  const digits = normalizeWhatsAppNumber(value);
  if (!digits) return company.whatsapp || company.phone;
  if (digits.startsWith('86') && digits.length === 13) return `+86 ${digits.slice(2, 5)} ${digits.slice(5)}`;
  return `+${digits}`;
}

async function loadFBoxSettings() {
  try {
    const previousLocale = state.locale;
    const response = await fetch('/api/fbox-content/settings', { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(8000) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || 'Storefront settings unavailable');
    const settings = payload.data || payload;
    const whatsappNumber = normalizeWhatsAppNumber(settings.whatsapp_number);
    if (whatsappNumber) {
      company.whatsappNumber = whatsappNumber;
      company.whatsapp = formatWhatsAppNumber(whatsappNumber);
    }
    if (settings.phone) company.phone = String(settings.phone);
    if (settings.company_name) company.legalName = String(settings.company_name);
    if (state.localeMode === 'auto' && browserLocale() === 'en' && localeOptions.some(([code]) => code === settings.default_locale)) {
      state.locale = settings.default_locale;
    }
    if (state.locale !== previousLocale) render();
    else renderBackgroundUpdate();
  } catch {
    // The built-in contact value keeps the storefront usable while the API is unavailable.
  }
}

function blogPostsForDisplay() {
  const posts = state.blogPosts.filter(post => post.status !== 'draft' && post.status !== 'archived');
  if (state.blogCategory === 'All') return posts;
  return posts.filter(post => post.category === state.blogCategory);
}

function blogCover(post) {
  return assetUrl(post.cover_image || post.image || 'halo-20-spoke-01.png');
}

function blogDateLabel(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(state.locale || 'en', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

function blogCard(post, index = 0, featured = false) {
  return `<article class="blog-card ${featured ? 'is-featured' : ''} reveal delay-${index % 4}"><a class="blog-card-media" href="#blog/${encodeURIComponent(post.slug)}"><img src="${blogCover(post)}" alt="${esc(post.title)}" loading="lazy"><span>${esc(post.category || 'Journal')}</span></a><div class="blog-card-body"><div class="blog-card-meta"><span>${esc(post.read_time || '5 min read')}</span><span>${esc(blogDateLabel(post.published_at))}</span></div><h3><a href="#blog/${encodeURIComponent(post.slug)}">${esc(post.title)}</a></h3><p>${esc(post.excerpt)}</p><a class="blog-read-link" href="#blog/${encodeURIComponent(post.slug)}">Read the journal <span>${icons.chevron}</span></a></div></article>`;
}

function blogHomeSection() {
  const posts = blogPostsForDisplay().slice(0, 3);
  return `<section class="section blog-home-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">CIRUI Journal</p><h2>Build with more confidence.</h2></div><p>Practical notes on fitment, wheel engineering and finishes, written for the moment before you place the order.</p><a class="btn btn-dark" href="#blog">View all journal posts</a></div><div class="blog-home-grid">${posts.map((post, index) => blogCard(post, index)).join('')}</div></div></section>`;
}

function blogBodyMarkup(post) {
  return String(post.body || '').split(/\n\s*\n/).map(block => block.trim()).filter(Boolean).map(block => {
    const lines = block.split('\n');
    const heading = lines[0].startsWith('## ') ? lines.shift().slice(3) : '';
    const copy = lines.join('\n');
    return `${heading ? `<h2>${esc(heading)}</h2>` : ''}${copy ? `<p>${esc(copy).replace(/\n/g, '<br>')}</p>` : ''}`;
  }).join('');
}

function blogPage() {
  const posts = blogPostsForDisplay();
  const categories = ['All', ...new Set(state.blogPosts.filter(post => post.status !== 'draft' && post.status !== 'archived').map(post => post.category).filter(Boolean))];
  const featured = posts.find(post => post.featured) || posts[0];
  const remaining = featured ? posts.filter(post => post.id !== featured.id) : posts;
  return `<section class="blog-hero"><div class="container"><div class="breadcrumbs"><a href="#home">Home</a><span>/</span><span>Journal</span></div><div class="blog-hero-grid"><div><p class="eyebrow">CIRUI Journal</p><h1>Notes for the<br><em>next build.</em></h1><p class="blog-hero-copy">A practical editorial space for wheel fitment, custom design and the engineering decisions that make a finished build feel right.</p></div>${featured ? `<a class="blog-featured-card" href="#blog/${encodeURIComponent(featured.slug)}"><img src="${blogCover(featured)}" alt="${esc(featured.title)}"><div><span>${esc(featured.category)} · ${esc(featured.read_time || '5 min read')}</span><strong>${esc(featured.title)}</strong><small>${esc(featured.excerpt)}</small><b>Read featured post ${icons.chevron}</b></div></a>` : ''}</div></div></section><main class="section blog-main"><div class="container"><div class="blog-toolbar"><div><p class="eyebrow">Browse the archive</p><h2>Useful before you buy.</h2></div><div class="blog-categories">${categories.map(category => `<button class="blog-category ${state.blogCategory === category ? 'is-active' : ''}" data-action="blog-filter" data-blog-category="${esc(category)}">${esc(category)}</button>`).join('')}</div></div>${remaining.length ? `<div class="blog-grid">${remaining.map((post, index) => blogCard(post, index)).join('')}</div>` : `<div class="case-empty"><strong>No posts in this category yet.</strong><span>Return to All to see the current CIRUI journal.</span></div>`}</div></main>`;
}

function blogArticlePage(post) {
  if (!post) return `<main class="section"><div class="container"><div class="case-empty"><strong>Journal post not found.</strong><a class="btn btn-dark" href="#blog">Back to Journal</a></div></div></main>`;
  const related = state.blogPosts.filter(item => item.id !== post.id && item.status !== 'draft' && item.status !== 'archived').slice(0, 3);
  return `<main class="blog-article"><div class="container"><div class="breadcrumbs"><a href="#home">Home</a><span>/</span><a href="#blog">Journal</a><span>/</span><span>${esc(post.category || 'Journal')}</span></div><div class="blog-article-head"><p class="eyebrow">${esc(post.category || 'Journal')} · ${esc(post.read_time || '5 min read')}</p><h1>${esc(post.title)}</h1><p>${esc(post.excerpt)}</p><div class="blog-article-byline"><span>By ${esc(post.author || 'CIRUI Editorial')}</span><span>${esc(blogDateLabel(post.published_at))}</span></div></div><figure class="blog-article-cover"><img src="${blogCover(post)}" alt="${esc(post.title)}"></figure><div class="blog-article-layout"><article class="blog-article-body">${blogBodyMarkup(post)}<div class="blog-article-cta"><strong>Have a build in mind?</strong><span>Bring the vehicle, the stance and the finish. CIRUI will help turn the brief into a build-ready spec.</span><a class="btn btn-primary" href="#store" data-category-link="Wheels">Browse wheels</a></div></article><aside class="blog-article-aside"><span class="eyebrow">In this post</span>${(post.tags || []).map(tag => `<span class="blog-tag">${esc(tag)}</span>`).join('')}<a class="btn btn-outline btn-small" href="#blog">Back to Journal</a></aside></div>${related.length ? `<section class="blog-related"><div class="section-heading"><div><p class="eyebrow">Keep reading</p><h2>More from the journal.</h2></div></div><div class="blog-grid">${related.map((item, index) => blogCard(item, index)).join('')}</div></section>` : ''}</div></main>`;
}

async function mallLogin(username, password) {
  return mallRequest(mallConfig.portalBase, '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
}

async function mallRegister(values) {
  return mallRequest(mallConfig.portalBase, '/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
    username: String(values.username || ''), password: String(values.password || ''), telephone: String(values.telephone || ''), email: String(values.email || ''), company: String(values.company || '')
  }) });
}

async function mallVisualizerRegister(values) {
  return mallRequest(mallConfig.portalBase, '/auth/visualizer-register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
    name: String(values.name || ''),
    email: String(values.email || ''),
    telephone: values.telephone_local ? `+1 ${String(values.telephone_local).trim()}` : ''
  }) });
}

async function submitWheelVisualizerRegistration(values) {
  const current = state.wheelVisualizer;
  if (!current?.open || current.phase !== 'registration' || current.registrationSubmitting) return;
  current.registrationDraft = {
    name: String(values.name || '').trim(),
    email: String(values.email || '').trim(),
    telephone: String(values.telephone_local || '').trim()
  };
  current.registrationSubmitting = true;
  current.registrationError = '';
  render();
  try {
    const registered = await mallVisualizerRegister(current.registrationDraft);
    const token = `${registered?.tokenHead || 'Bearer '}${registered?.token || ''}`.trim();
    if (!token || !registered?.token) throw new Error('The CIRUI account service returned no session.');
    state.mallToken = token;
    state.account = registered?.member || registered?.data?.member || null;
    localStorage.setItem('fbox-mall-token', state.mallToken);
    current.phase = 'crop';
    current.registrationSubmitting = false;
    current.registrationError = '';
    render();
  } catch (error) {
    current.registrationSubmitting = false;
    current.registrationError = error?.message || 'Account registration failed. Please try again.';
    render();
  }
}

async function loadAccountInfo() {
  if (!state.mallToken) { state.account = null; return; }
  try {
    const payload = await mallRequest(mallConfig.portalBase, '/auth/info', { timeout: 7000 });
    state.account = payload?.data?.member || payload?.member || null;
    if (state.account) {
      state.workshop.profile = {
        shop_name: state.workshop.profile.shop_name || state.account.company || '',
        advisor_name: state.workshop.profile.advisor_name || state.account.advisor_name || state.account.name || '',
        email: state.workshop.profile.email || state.account.email || '',
        phone: state.workshop.profile.phone || state.account.telephone || '',
        location: state.workshop.profile.location || state.account.location || ''
      };
      localStorage.setItem('fbox-workshop-profile', JSON.stringify(state.workshop.profile));
      await loadWorkshopProjects();
    }
  } catch {
    // token expired or backend offline: drop the session so the UI falls back to sign-in
    state.mallToken = '';
    state.account = null;
    localStorage.removeItem('fbox-mall-token');
  }
}

async function loadWorkshopProjects() {
  if (!state.mallToken || state.workshop.projectsLoading) return;
  state.workshop.projectsLoading = true;
  renderBackgroundUpdate();
  try {
    const projects = await mallRequest('/api/fbox-content', '/workshop/projects', { timeout: 8000 });
    state.workshop.projects = Array.isArray(projects) ? projects : [];
    const currentToken = state.workshop.currentProject?.share_token || localStorage.getItem('fbox-workshop-current') || '';
    state.workshop.currentProject = state.workshop.projects.find(item => item.share_token === currentToken) || state.workshop.currentProject;
    persistWorkshopProjects();
  } catch (error) {
    state.workshop.error = error?.message || uiLabel('Customer projects could not be loaded.');
  } finally {
    state.workshop.projectsLoading = false;
    render();
  }
}

async function mallLogout() {
  try { await mallRequest(mallConfig.portalBase, '/auth/logout', { method: 'POST', timeout: 5000 }); } catch { /* best-effort */ }
  state.mallToken = '';
  state.account = null;
  state.accountOrders = [];
  state.workshop.projects = [];
  state.workshop.currentProject = null;
  state.workshop.profile = { shop_name: '', advisor_name: '', email: '', phone: '', location: '' };
  localStorage.removeItem('fbox-mall-token');
  localStorage.removeItem('fbox-workshop-projects');
  localStorage.removeItem('fbox-workshop-current');
  localStorage.removeItem('fbox-workshop-profile');
}

async function syncMallWishlist() {
  if (!state.mallToken) return;
  const remote = await mallRequest(mallConfig.portalBase, '/wishlist', { timeout: 7000 });
  const list = Array.isArray(remote?.data) ? remote.data : Array.isArray(remote) ? remote : [];
  state.wishlist = list.map(row => products.find(item => String(item.id) === String(row.product_id || row.productId || row.id))?.id).filter(Boolean);
  persist();
}

async function loadMemberOrders() {
  if (!state.mallToken) return;
  state.accountOrdersLoading = true;
  render();
  try {
    const remote = await mallRequest(mallConfig.portalBase, '/orders', { timeout: 7000 });
    state.accountOrders = Array.isArray(remote?.data) ? remote.data : Array.isArray(remote) ? remote : [];
  } catch (error) {
    state.accountOrders = [];
    setToast(error?.message || '订单查询失败，请重新登录后重试。');
  } finally {
    state.accountOrdersLoading = false;
    render();
  }
}

function productRatingMarkup(item) {
  return Number(item.rating) > 0 ? `${stars(item.rating)} <a href="#product/${item.id}">${item.rating} · ${formatUiLabel('{count} reviews', { count: item.reviews })}</a>` : stars(0);
}

function ciruiPublicBrandText(value = '') {
  return String(value).replace(/\bF-(?:BOX|Box)\b/g, 'CIRUI');
}

function mallProductToFBox(raw) {
  const base = products.find(item => item.part === raw.productSn);
  if (!base) return null;
  const price = Number(raw.price || base.price || 0);
  const originalPrice = Number(raw.originalPrice || 0);
  return {
    ...base,
    backendId: Number(raw.id),
    name: ciruiPublicBrandText(raw.name || base.name),
    brand: ciruiPublicBrandText(raw.brandName || base.brand),
    category: ciruiPublicBrandText(raw.productCategoryName || base.category),
    price,
    oldPrice: originalPrice > price ? originalPrice : null,
    image: base.image,
    rating: 0,
    reviews: 0,
    deal: ciruiPublicBrandText(raw.deal || (Number(raw.stock || 0) > 0 ? 'In stock · live inventory' : 'Contact CIRUI for availability')),
    stock: Number(raw.stock || 0),
    meta: ciruiPublicBrandText(base.meta),
    custom_size: true,
    size_note: ciruiPublicBrandText(raw.size_note || base.size_note || productSizeNote(base)),
    backendPic: raw.pic || ''
  };
}

async function loadMallCatalog() {
  try {
    const page = await mallRequest(mallConfig.portalBase, '/products', { timeout: 7000 });
    const rawProducts = Array.isArray(page?.data) ? page.data : Array.isArray(page) ? page : [];
    const mapped = rawProducts.map(raw => {
      const base = products.find(item => String(item.id) === String(raw.id));
      if (!base && !raw.id) return null;
      const rawImages = Array.isArray(raw.images) ? raw.images.map(imageEntry => typeof imageEntry === 'string' ? imageEntry : imageEntry?.url).filter(Boolean) : [];
      const images = rawImages.length ? rawImages : (Array.isArray(base?.images) ? base.images.map(imageEntry => typeof imageEntry === 'string' ? imageEntry : imageEntry?.url).filter(Boolean) : []);
      const image = images[0] || raw.image || raw.pic || base?.image || '';
      return {
        ...(base || {}),
        ...raw,
        id: String(raw.id ?? base?.id ?? ''),
        name: ciruiPublicBrandText(raw.name || base?.name || 'CIRUI product'),
        brand: ciruiPublicBrandText(raw.brand || raw.brandName || base?.brand || 'CIRUI'),
        category: ciruiPublicBrandText(raw.category || raw.productCategoryName || base?.category || 'Wheels'),
         meta: ciruiPublicBrandText(raw.meta || base?.meta || ''),
         custom_size: true,
         size_note: ciruiPublicBrandText(raw.size_note || base?.size_note || (raw.category === 'Wheels' ? 'All sizes supported - custom diameter, width and fitment' : 'All sizes supported - custom fitment built to order')),
        deal: ciruiPublicBrandText(raw.deal || base?.deal || (Number(raw.stock || 0) > 0 ? 'In stock · live inventory' : 'Contact CIRUI for availability')),
        price: raw.price === null || raw.price === '' ? null : Number(raw.price ?? base?.price ?? 0),
        oldPrice: raw.oldPrice ?? (raw.originalPrice || base?.oldPrice || null),
        image,
        images: images.length ? images : undefined,
        image_cutout: raw.image_cutout ?? base?.image_cutout ?? false,
        price_mode: raw.price_mode || base?.price_mode || 'fixed',
        finish: raw.finish || base?.finish || '',
        color: raw.color || raw.finish || base?.color || '',
        rating: Number(raw.rating || base?.rating || 0),
        reviews: Number(raw.reviews || base?.reviews || 0),
        stock: Number(raw.stock ?? base?.stock ?? 0)
      };
    }).filter(Boolean);
    if (!mapped.length) throw new Error('CIRUI catalog is empty');
    const detailed = await Promise.all(mapped.map(async item => {
      try {
        return item;
      } catch {
        return item;
      }
    }));
    const merged = [
      ...detailed,
      ...localCustomProductFallback.filter(local => !detailed.some(item => item.id === local.id))
    ];
    products = applyProductReviewStats(merged);
    state.catalogLoaded = true;
    renderBackgroundUpdate();
  } catch (error) {
    state.catalogLoaded = false;
    state.backend.portal = 'testing';
    renderBackgroundUpdate();
  }
}

async function loadMallCart() {
  if (!state.mallToken) return;
  const remote = await mallRequest(mallConfig.portalBase, '/cart', { timeout: 7000 });
  const next = (Array.isArray(remote?.items) ? remote.items : Array.isArray(remote) ? remote : []).map(row => {
    const item = products.find(productItem => String(productItem.id) === String(row.product_id || row.productId || row.id));
    return item ? { id: item.id, qty: Math.max(productMinimumQuantity(item), Number(row.quantity || row.qty || 1)), backendCartId: row.id } : null;
  }).filter(Boolean);
  state.cart = next;
  persist();
}

async function syncMallCart() {
  if (!state.mallToken) throw new Error('请先登录 CIRUI 账户');
  for (const row of state.cart) {
    const item = product(row.id);
    if (!item) continue;
    row.qty = Math.max(productMinimumQuantity(item), Number(row.qty || 1));
    await mallRequest(mallConfig.portalBase, '/cart/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: item.id, quantity: row.qty })
    });
  }
  persist();
  await loadMallCart();
}

async function createMallOrder(values) {
  const minimumIssue = cartMinimumIssue();
  if (minimumIssue) throw new Error(`${productMinimumOrderText(minimumIssue.item)} Please update the quantity before checkout.`);
  await syncMallCart();
  const result = await mallRequest(mallConfig.portalBase, '/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer: { name: values.name, phone: values.phone, email: values.email },
      shipping: { address: values.address, city: values.city, province: values.province || '', region: values.region || '', postCode: values.postCode },
      attribution: state.workshop.referral ? {
        workshop_project_token: state.workshop.referral.share_token || '',
        workshop_referral_code: state.workshop.referral.referral_code || '',
        workshop_shop_name: state.workshop.referral.shop_name || ''
      } : {},
      items: state.cart.map(row => ({ product_id: row.id, quantity: row.qty }))
    })
  });
  return result?.order || result;
}

function selectOptions(values, selected = '', placeholder = 'Select') { return `<option value="">${placeholder}</option>${values.map(value => `<option value="${esc(value)}" ${String(value) === String(selected) ? 'selected' : ''}>${esc(value)}</option>`).join('')}`; }
function vehicleSelector(prefix = 'vehicle') {
  const v = state.vehicle || {};
  const makes = v.year && vehicles[v.year] ? vehicleCatalogSort(Object.keys(vehicles[v.year])) : [];
  const models = v.year && v.make && vehicles[v.year]?.[v.make] ? vehicleCatalogSort(Object.keys(vehicles[v.year][v.make])) : [];
  const trims = v.year && v.make && v.model && vehicles[v.year]?.[v.make]?.[v.model] ? vehicles[v.year][v.make][v.model] : [];
  return `<div class="fitment-selects" data-vehicle-prefix="${prefix}">
    <select class="fitment-select" data-field="year">${selectOptions(years, v.year, 'Year')}</select>
    <select class="fitment-select" data-field="make" ${makes.length ? '' : 'disabled'}>${selectOptions(makes, v.make, 'Make')}</select>
    <select class="fitment-select" data-field="model" ${models.length ? '' : 'disabled'}>${selectOptions(models, v.model, 'Model')}</select>
    <select class="fitment-select" data-field="trim" ${trims.length ? '' : 'disabled'}>${selectOptions(trims, v.trim, 'Trim')}</select>
    <select class="fitment-select" data-field="drive" ${v.trim ? '' : 'disabled'}>${selectOptions(driveOptions(v.make, v.model), v.drive, 'Drive')}</select>
  </div>`;
}

function fitmentVehicleSelector() {
  const v = state.fitment.vehicle || {};
  const makes = v.year && vehicles[v.year] ? vehicleCatalogSort(Object.keys(vehicles[v.year])) : [];
  const models = v.year && v.make && vehicles[v.year]?.[v.make] ? vehicleCatalogSort(Object.keys(vehicles[v.year][v.make])) : [];
  const trims = v.year && v.make && v.model ? vehicles[v.year]?.[v.make]?.[v.model] || [] : [];
  const identityMatches = expandedVehicleIdentityRecords.filter(record => record.brand === v.make && record.series === v.model && Number(v.year) >= record.year_start && Number(v.year) <= record.year_end);
  const chassisHints = [...new Set(identityMatches.map(record => record.generation_or_chassis).filter(Boolean))];
  const fitmentSelectOptions = (values, selected, placeholder) => `<option value="" data-translate-option>${esc(uiLabel(placeholder, placeholder))}</option>${values.map(value => `<option value="${esc(value)}" ${String(value) === String(selected) ? 'selected' : ''}>${esc(uiLabel(value, value))}</option>`).join('')}`;
  const bodyStyles = ['Sedan', 'Coupe', 'Hatchback', 'Wagon', 'SUV', 'Truck', 'Roadster', 'Other'];
  const markets = ['United States', 'Europe', 'United Kingdom', 'Japan', 'China', 'Other'];
  const flow = fitmentFlowState();
  const invalidClass = field => flow.step === 2 && flow.error && !String(v[field] || '').trim() ? ' is-invalid' : '';
  const invalidAttrs = field => flow.step === 2 && flow.error && !String(v[field] || '').trim() ? ' aria-invalid="true" data-required-missing="true"' : '';
  return `<div class="fitment-selects fitment-lab-vehicle" data-fitment-vehicle>
    <select class="fitment-select${invalidClass('year')}" data-fitment-field="year"${invalidAttrs('year')}>${fitmentSelectOptions(years, v.year, 'Year')}</select>
    <select class="fitment-select${invalidClass('make')}" data-fitment-field="make"${invalidAttrs('make')} ${makes.length ? '' : 'disabled'}>${fitmentSelectOptions(makes, v.make, 'Make')}</select>
    <select class="fitment-select${invalidClass('model')}" data-fitment-field="model"${invalidAttrs('model')} ${models.length ? '' : 'disabled'}>${fitmentSelectOptions(models, v.model, 'Model')}</select>
    <input class="fitment-select${invalidClass('trim')}" data-fitment-field="trim"${invalidAttrs('trim')} list="fitment-trim-options" value="${esc(v.trim || '')}" ${v.model ? '' : 'disabled'} placeholder="${esc(uiLabel('Exact trim / variant'))}"><datalist id="fitment-trim-options">${trims.map(value => `<option value="${esc(value)}"></option>`).join('')}</datalist>
    <input class="fitment-select" data-fitment-field="chassis" list="fitment-chassis-options" value="${esc(v.chassis || '')}" ${v.model ? '' : 'disabled'} placeholder="${esc(uiLabel('Chassis code, e.g. F30'))}"><datalist id="fitment-chassis-options">${chassisHints.map(value => `<option value="${esc(value)}"></option>`).join('')}</datalist>
    <select class="fitment-select" data-fitment-field="body_style" ${v.model ? '' : 'disabled'}>${fitmentSelectOptions(bodyStyles, v.body_style, 'Body style')}</select>
    <select class="fitment-select${invalidClass('drive')}" data-fitment-field="drive"${invalidAttrs('drive')} ${v.model ? '' : 'disabled'}>${fitmentSelectOptions(driveOptions(v.make, v.model), v.drive, 'Drive')}</select>
    <select class="fitment-select" data-fitment-field="market" ${v.model ? '' : 'disabled'}>${fitmentSelectOptions(markets, v.market, 'Market')}</select>
    <p class="fitment-vehicle-integrity">${uiLabel('Use the exact trim, chassis and market shown on the VIN/build record. Suggested trims are search aids, not verified fitment facts.')}</p>
  </div>`;
}

function fitmentVinValue(value = '') {
  return String(value || '').toUpperCase().replace(/[\s-]+/g, '').slice(0, 17);
}

function fitmentVinIsValid(value = '') {
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(fitmentVinValue(value));
}

function fitmentCatalogIdentity(values = [], value = '') {
  const normalized = candidate => String(candidate || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const target = normalized(value);
  return values.find(candidate => normalized(candidate) === target) || String(value || '').trim();
}

function fitmentDecodedDrive(value = '') {
  const normalized = String(value || '').toLowerCase();
  if (/all.?wheel|\bawd\b/.test(normalized)) return 'AWD';
  if (/front.?wheel|\bfwd\b/.test(normalized)) return 'FWD';
  if (/rear.?wheel|\brwd\b/.test(normalized)) return 'RWD';
  if (/4.?wheel|4x4|\b4wd\b/.test(normalized)) return '4WD';
  return '';
}

function fitmentDecodedBodyStyle(value = '') {
  const normalized = String(value || '').toLowerCase();
  if (/sport utility|utility vehicle|crossover|\bsuv\b/.test(normalized)) return 'SUV';
  if (/pickup|truck/.test(normalized)) return 'Truck';
  if (/hatchback/.test(normalized)) return 'Hatchback';
  if (/wagon/.test(normalized)) return 'Wagon';
  if (/roadster|convertible|cabriolet/.test(normalized)) return 'Roadster';
  if (/coupe/.test(normalized)) return 'Coupe';
  if (/sedan|saloon/.test(normalized)) return 'Sedan';
  return value ? 'Other' : '';
}

function fitmentVinLookupMarkup() {
  const lookup = state.fitment.vinLookup || {};
  const data = lookup.data;
  const vehicle = data?.vehicle || {};
  const label = [vehicle.year, vehicle.make, vehicle.model, vehicle.trim || vehicle.series].filter(Boolean).join(' ');
  const displacement = Number(vehicle.engine?.displacement_l);
  const engine = [Number.isFinite(displacement) && displacement > 0 ? `${displacement.toFixed(1)} L` : '', vehicle.engine?.cylinders ? `${vehicle.engine.cylinders} ${uiLabel('cyl')}` : '', vehicle.engine?.fuel_type].filter(Boolean).join(' · ');
  const oemWheels = vehicle.oem_wheels || {};
  const wheelFacts = [
    [uiLabel('Front wheel diameter'), oemWheels.front_diameter_in ? `${oemWheels.front_diameter_in} in` : ''],
    [uiLabel('Rear wheel diameter'), oemWheels.rear_diameter_in ? `${oemWheels.rear_diameter_in} in` : ''],
    [uiLabel('Number of wheels'), oemWheels.number_of_wheels],
    [uiLabel('Track width'), oemWheels.track_width_in ? `${oemWheels.track_width_in} in` : '']
  ].filter(([, value]) => value);
  const facts = [[uiLabel('Body style'), vehicle.body_style], [uiLabel('Drive'), vehicle.drive], [uiLabel('Engine'), engine], [uiLabel('Built in'), vehicle.plant_country], ...wheelFacts].filter(([, value]) => value);
  const wheelNotice = data ? (wheelFacts.length
    ? `<p class="fitment-vin-wheel-note is-found"><b>${uiLabel('Manufacturer-reported wheel data')}</b> ${uiLabel('Diameter only; PCD, width, ET, center bore and factory option package still require an exact OEM or physical check.')}</p>`
    : `<p class="fitment-vin-wheel-note"><b>${uiLabel('No manufacturer wheel fields were submitted for this VIN.')}</b> ${uiLabel('Continue with the exact trim, OEM build record and physical wheel measurements.')}</p>`) : '';
  const status = lookup.loading
    ? `<div class="fitment-vin-status is-loading" role="status"><span class="wheel-progress"><i></i></span><strong>${uiLabel('Checking official vehicle record…')}</strong></div>`
    : lookup.error
      ? `<div class="fitment-vin-status is-error" role="alert"><span>${icons.shield}</span><div><strong>${uiLabel('VIN lookup failed.')}</strong><p>${esc(lookup.error)}</p></div></div>`
      : data
        ? `<div class="fitment-vin-status is-success" role="status"><span>${icons.shield}</span><div><small>${uiLabel('Vehicle found via NHTSA')}</small><strong>${esc(label)}</strong><p>${uiLabel('Review the decoded trim and drive before continuing.')}</p>${facts.length ? `<dl>${facts.map(([key, value]) => `<div><dt>${key}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>` : ''}${wheelNotice}${data.warnings?.length ? `<p class="fitment-vin-warning">${uiLabel('Partial record — review every field.')}</p>` : ''}</div><a href="${esc(data.source_url || 'https://vpic.nhtsa.dot.gov/api/Home/Index')}" target="_blank" rel="noreferrer"><small>${uiLabel('Source')}</small><b>NHTSA vPIC</b></a></div>`
        : '';
  return `<section class="fitment-vin-lookup"><div class="fitment-vin-lookup-head"><span>${icons.shield}</span><div><small>${uiLabel('Official identity lookup')}</small><h3>${uiLabel('Decode vehicle by VIN')}</h3><p>${uiLabel("Enter the vehicle's 17-character VIN to retrieve its manufacturer-submitted identity.")}</p></div></div><div class="fitment-vin-controls"><label><span>${uiLabel('17-character VIN')}</span><input name="vin_reference" data-fitment-vin-input value="${fitmentDraftValue('vin_reference')}" maxlength="17" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="1HGCM82633A004352" aria-describedby="fitment-vin-help"></label><button type="button" class="btn btn-primary" data-action="fitment-vin-decode" ${lookup.loading ? 'disabled' : ''}>${lookup.loading ? uiLabel('Checking official vehicle record…') : uiLabel('Decode VIN')} ${icons.arrowRight}</button></div><p id="fitment-vin-help" class="fitment-vin-help">${uiLabel('NHTSA vPIC covers vehicles sold or imported into the United States most completely.')} ${uiLabel('VIN lookup does not provide wheel fitment, factory options, accident history, mileage or ownership.')}</p>${status}</section>`;
}

function fitmentVinErrorMessage(status = 0, detail = '') {
  if (status === 400) return uiLabel('Enter a valid 17-character VIN. Letters I, O and Q are not used.');
  if (status === 429) return uiLabel('Too many VIN checks. Please wait before trying again.');
  if (status === 422) return uiLabel('No exact vehicle record was returned. Enter the vehicle manually and review the VIN.');
  if (status >= 500) return uiLabel('Official vehicle service unavailable. You can continue by entering the vehicle manually.');
  return detail || uiLabel('VIN lookup failed.');
}

async function decodeFitmentVin() {
  const form = document.querySelector('[data-form="fitment-wizard"]');
  if (!form) return;
  captureFitmentDraft(form);
  const vin = fitmentVinValue(form.elements.namedItem('vin_reference')?.value || state.fitment.draft?.vin_reference);
  state.fitment.draft = { ...(state.fitment.draft || {}), vin_reference: vin };
  localStorage.setItem('fbox-fitment-draft', JSON.stringify(state.fitment.draft));
  if (!fitmentVinIsValid(vin)) {
    state.fitment.vinLookup = { loading: false, error: uiLabel('Enter a valid 17-character VIN. Letters I, O and Q are not used.'), data: null, queriedVin: vin };
    render();
    requestAnimationFrame(() => document.querySelector('[data-fitment-vin-input]')?.focus());
    return;
  }

  state.fitment.vinLookup = { loading: true, error: '', data: null, queriedVin: vin };
  render();
  try {
    const response = await fetch('/api/fbox-store/vehicle/vin-decode', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ vin }),
      signal: AbortSignal.timeout(15_000)
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw Object.assign(new Error(payload.detail || 'VIN lookup failed.'), { status: response.status });
    const data = payload.data || payload;
    const decoded = data.vehicle || {};
    const year = String(decoded.year || '').trim();
    const makes = year && vehicles[year] ? Object.keys(vehicles[year]) : [];
    const make = fitmentCatalogIdentity(makes, decoded.make);
    const models = year && make && vehicles[year]?.[make] ? Object.keys(vehicles[year][make]) : [];
    const model = fitmentCatalogIdentity(models, decoded.model);
    const trim = String(decoded.trim || decoded.series_2 || decoded.series || '').trim();
    if (year && make && model) {
      vehicles[year] ||= {};
      vehicles[year][make] ||= {};
      vehicles[year][make][model] ||= [];
      if (trim && !vehicles[year][make][model].includes(trim)) vehicles[year][make][model].push(trim);
      years = Object.keys(vehicles).sort((a, b) => Number(b) - Number(a));
    }
    data.vehicle = { ...decoded, year, make, model, trim };
    const current = state.fitment.vehicle || {};
    const vehicle = { ...current };
    if (year) vehicle.year = year;
    if (make) vehicle.make = make;
    if (model) vehicle.model = model;
    if (trim) vehicle.trim = trim;
    const drive = fitmentDecodedDrive(decoded.drive);
    if (drive) vehicle.drive = drive;
    const bodyStyle = fitmentDecodedBodyStyle(decoded.body_style);
    if (bodyStyle) vehicle.body_style = bodyStyle;
    vehicle.vin_reference = vin;
    vehicle.vin_source = 'NHTSA vPIC';
    state.fitment.vehicle = vehicle;
    state.vehicle = vehicle;
    state.fitment.resultStale = Boolean(state.fitment.result);
    state.fitment.draft = { ...(state.fitment.draft || {}), vin_reference: vin, vin_decode_source: 'NHTSA vPIC' };
    state.fitment.vinLookup = { loading: false, error: '', data, queriedVin: vin };
    localStorage.setItem('fbox-fitment-draft', JSON.stringify(state.fitment.draft));
    persist();
    render();
    void loadFitmentVehicleReference(vehicle);
  } catch (error) {
    const status = Number(error?.status || 0);
    const timeout = error?.name === 'TimeoutError';
    state.fitment.vinLookup = { loading: false, error: fitmentVinErrorMessage(timeout ? 504 : status, error?.message), data: null, queriedVin: vin };
    render();
  }
}

function fitmentVehicleReferenceMarkup() {
  const selected = state.fitment.vehicle || {};
  if (!selected.year || !selected.make || !selected.model) return '';
  const reference = state.fitment.reference || {};
  if (reference.loading) return `<div class="fitment-vehicle-reference is-loading"><span class="wheel-progress"><i></i></span><strong>${uiLabel('Loading vehicle reference…')}</strong></div>`;
  const data = reference.data;
  if (!data || (!data.exact_record && !data.platform_reference)) return `<div class="fitment-vehicle-reference is-empty"><span>${icons.shield}</span><div><small>${uiLabel('Vehicle reference data')}</small><strong>${uiLabel('No reference record matched yet.')}</strong><p>${uiLabel('Continue with the VIN, current wheel markings and physical measurements.')}</p></div></div>`;
  const exact = data.exact_record || null;
  const platform = data.platform_reference || null;
  const specs = exact?.oem_wheel_specs || {};
  const pcd = specs.pcd || platform?.pcd || '—';
  const centerBore = specs.center_bore || specs.center_bore_mm || platform?.center_bore_mm;
  const wheelRange = [specs.diameter && specs.width ? `${specs.diameter} × ${specs.width}J` : specs.diameter ? `${specs.diameter} in` : '', specs.offset ? `ET ${specs.offset}` : '', specs.tire || ''].filter(Boolean).join(' · ') || platform?.wheel_target_not_approved || '—';
  const brake = platform?.oem_brake_baseline || exact?.notes || '—';
  const verified = exact?.spec_status === 'verified';
  const sourceUrl = platform?.source_url || '';
  const sourceText = [...new Set([exact?.spec_source || specs.source || '', platform?.source_limitations || ''].filter(Boolean))].join(' · ') || 'CIRUI reference library';
  return `<section class="fitment-vehicle-reference ${verified ? 'is-verified' : ''}"><div class="fitment-vehicle-reference-head"><span>${icons.shield}</span><div><small>${uiLabel('Vehicle reference data')}</small><strong>${verified ? uiLabel('Verified exact-vehicle record') : exact ? uiLabel('Exact vehicle reference found') : uiLabel('Platform reference matched')}</strong><p>${uiLabel('Reference values help lookup and comparison. They never overwrite measurements or approve production automatically.')}</p></div><b>${verified ? uiLabel('Verified exact-vehicle record') : uiLabel('Reference only')}</b></div><dl><div><dt>PCD</dt><dd>${esc(pcd)}</dd></div><div><dt>${uiLabel('Center bore')}</dt><dd>${centerBore ? `${esc(centerBore)} mm` : '—'}</dd></div><div><dt>${uiLabel('Typical wheel range')}</dt><dd>${esc(wheelRange)}</dd></div><div><dt>${uiLabel('Brake baseline')}</dt><dd>${esc(brake)}</dd></div></dl><footer><span><small>${uiLabel('Source and limits')}</small><strong>${esc(sourceText)}</strong></span>${sourceUrl ? `<a href="${esc(sourceUrl)}" target="_blank" rel="noreferrer">${uiLabel('View source')} ${icons.arrowRight}</a>` : ''}</footer></section>`;
}

async function loadFitmentVehicleReference(vehicle = state.fitment.vehicle) {
  if (!vehicle?.year || !vehicle?.make || !vehicle?.model) {
    state.fitment.reference = { key: '', loading: false, error: '', data: null };
    return null;
  }
  const key = [vehicle.year, vehicle.make, vehicle.model, vehicle.trim, vehicle.drive, vehicle.chassis, vehicle.market].map(value => String(value || '').trim()).join('|');
  if (state.fitment.reference?.key === key && (state.fitment.reference.loading || state.fitment.reference.data)) return state.fitment.reference.data;
  state.fitment.reference = { key, loading: true, error: '', data: null };
  renderBackgroundUpdate();
  const params = new URLSearchParams(Object.fromEntries(Object.entries(vehicle).filter(([, value]) => String(value || '').trim())));
  try {
    const response = await fetch(`/api/fbox-content/fitment/vehicle-reference?${params}`, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(12000) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || 'Vehicle reference unavailable');
    if (state.fitment.reference?.key === key) state.fitment.reference = { key, loading: false, error: '', data: payload.data || payload };
    renderBackgroundUpdate();
    return payload.data || payload;
  } catch (error) {
    if (state.fitment.reference?.key === key) state.fitment.reference = { key, loading: false, error: error?.message || 'Vehicle reference unavailable', data: null };
    renderBackgroundUpdate();
    return null;
  }
}

function fitmentPartOptions(type, selected = '', axle = '') {
  const labels = {
    brake: 'Not listed / use manual brake template',
    caliper: 'Not listed / use manual brake template',
    rotor: 'Not listed / use manual brake template',
    pad: 'Not listed / use manual brake template',
    suspension: 'Not listed / enter measured ride height'
  };
  const types = type === 'brake' ? ['brake', 'caliper'] : [type];
  const label = labels[type] || labels.suspension;
  const records = state.fitment.parts.filter(part => types.includes(part.type) && part.status === 'active');
  const oemId = 'oem';
  const oemLabel = type === 'suspension' ? 'Factory original suspension / exact trim' : `Factory original ${type} / exact trim`;
  return `<option value="" data-translate-option>${esc(uiLabel(label, label))}</option><option value="${oemId}" data-translate-option ${String(selected) === oemId ? 'selected' : ''}>${esc(uiLabel('Factory original / exact trim', oemLabel))}</option>${records.map(part => `<option value="${esc(part.id)}" ${String(part.id) === String(selected) ? 'selected' : ''}>${esc(`${part.brand} ${part.model}${part.part_number ? ` · ${part.part_number}` : ''}`)}</option>`).join('')}`;
}

function fitmentPartPickerRecords(type = 'brake') {
  const types = type === 'brake' ? ['brake', 'caliper'] : [type];
  return state.fitment.parts.filter(part => types.includes(part.type) && part.status === 'active');
}

function fitmentPartRecord(id = '') {
  return state.fitment.parts.find(part => String(part.id) === String(id)) || null;
}

function fitmentPartSearchText(part = {}) {
  const aliases = Array.isArray(part.specs?.search_aliases) ? part.specs.search_aliases : [];
  return [part.brand, part.model, part.part_number, ...aliases].filter(Boolean).join(' ').toLowerCase();
}

function fitmentPartDisplayModel(part = {}) {
  const model = String(part.model || '').trim();
  const partNumber = String(part.part_number || '').trim();
  if (partNumber && /alias|umbrella|exact code required/i.test(model)) return partNumber;
  return model || partNumber;
}

function fitmentPartLabel(part = null, type = 'brake') {
  if (!part) return uiLabel(type === 'suspension' ? 'Choose suspension' : 'Choose installed component');
  const model = fitmentPartDisplayModel(part);
  const partNumber = String(part.part_number || '').trim();
  return [part.brand, model, partNumber && partNumber.toLowerCase() !== model.toLowerCase() ? `· ${partNumber}` : ''].filter(Boolean).join(' ');
}

function fitmentPartPickerMarkup({ name, type, label, selected = '' } = {}) {
  const records = fitmentPartPickerRecords(type);
  const aiMatch = (state.fitment.ai?.result?.matched_parts || []).find(item => item.id_field === name);
  const selectedPart = fitmentPartRecord(selected) || (selected && String(aiMatch?.selected?.id || '') === String(selected) ? aiMatch?.selected || null : null);
  const recommendedIds = new Set([selected, aiMatch?.selected?.id, ...(aiMatch?.alternatives || []).map(item => item.id)].filter(Boolean).map(String));
  const ordered = [...records].sort((left, right) => {
    const priority = Number(recommendedIds.has(String(right.id))) - Number(recommendedIds.has(String(left.id)));
    return priority || fitmentPartLabel(left, type).localeCompare(fitmentPartLabel(right, type), state.locale || 'en', { numeric: true, sensitivity: 'base' });
  });
  const recommendationCount = ordered.filter(part => recommendedIds.has(String(part.id))).length;
  const oemSelected = String(selected) === 'oem';
  const currentLabel = oemSelected ? uiLabel('Factory original / exact trim') : fitmentPartLabel(selectedPart, type);
  const currentStatus = oemSelected
    ? uiLabel('Factory component recorded')
    : selectedPart
      ? (aiMatch?.selected?.id === selectedPart.id ? uiLabel('AI candidate recorded — verify the exact kit before production') : uiLabel('Catalog component selected'))
      : uiLabel('Search by model or part number');
  const option = part => {
    const recommended = recommendedIds.has(String(part.id));
    const selectedOption = String(part.id) === String(selected);
    const showRecommended = recommended && !selected;
    const specs = [
      part.specs?.caliper_pistons ? `${part.specs.caliper_pistons} ${uiLabel('piston')}` : '',
      part.specs?.rotor_diameter_mm ? `Ø${part.specs.rotor_diameter_mm} mm` : '',
      part.verification_status ? uiLabel(part.verification_status === 'source_catalog' ? 'Series reference' : 'Verified application') : ''
    ].filter(Boolean).join(' · ');
    return `<button type='button' class='fitment-part-option ${recommended ? 'is-recommended' : ''} ${selectedOption ? 'is-selected' : ''}' data-action='fitment-part-select' data-field='${esc(name)}' data-id='${esc(part.id)}' data-part-search-text='${esc(fitmentPartSearchText(part))}' data-recommended='${recommended}' ${showRecommended ? '' : 'hidden'} role='option' aria-selected='${selectedOption}'><span>${recommended ? uiLabel('Suggested') : uiLabel('Catalog')}</span><div><strong>${esc([part.brand, fitmentPartDisplayModel(part)].filter(Boolean).join(' '))}</strong><small>${esc(part.part_number || specs || uiLabel('Series reference'))}</small></div><em>${esc(specs)}</em>${icons.arrowRight}</button>`;
  };
  return `<section class='fitment-part-picker ${fitmentAiMissingRecord(name) ? 'fitment-required-missing' : ''}' data-fitment-part-picker data-field='${esc(name)}' data-selected='${selected ? 'true' : 'false'}'><input type='hidden' name='${esc(name)}' value='${esc(selected)}'><header><span>${label}</span>${selected ? `<button type='button' data-action='fitment-part-clear' data-field='${esc(name)}'>${uiLabel('Clear')}</button>` : ''}</header><div class='fitment-part-current ${selected ? 'is-selected' : ''}'><span>${selected ? icons.shield : icons.search}</span><div><strong data-part-current-label>${esc(currentLabel)}</strong><small data-part-current-status>${esc(currentStatus)}</small></div></div><label class='fitment-part-search'>${icons.search}<input type='search' data-fitment-part-search placeholder='${esc(uiLabel('Search model, series or part number'))}' autocomplete='off' aria-label='${esc(uiLabel('Search model, series or part number'))}'></label><div class='fitment-part-results' role='listbox'>${ordered.map(option).join('')}<p class='fitment-part-empty' ${(recommendationCount && !selected) ? 'hidden' : ''}>${uiLabel(selected ? 'Selected. Search only if this component needs to be changed.' : 'Enter at least two characters to search the component catalog.')}</p></div>${fitmentAiFieldHint(name)}</section>`;
}

function fitmentDraftValue(key) {
  return esc(state.fitment.draft?.[key] ?? '');
}

function workshopProjectStatusLabel(status = 'draft') {
  return ({ draft: uiLabel('Draft'), checked: uiLabel('Checked'), shared: uiLabel('Shared'), quote_requested: uiLabel('Quote requested'), closed: uiLabel('Closed') })[status] || uiLabel('Draft');
}

function workshopVehicleLabel(project = {}) {
  const vehicle = project.vehicle || state.fitment.vehicle || state.vehicle || {};
  return [vehicle.year, vehicle.make, vehicle.model, vehicle.trim, vehicle.drive].filter(Boolean).join(' ') || uiLabel('Vehicle not selected');
}

function workshopProjectLink(shareToken = '') {
  return new URL(`/build/${encodeURIComponent(shareToken)}`, location.origin).href;
}

function persistWorkshopProjects() {
  localStorage.setItem('fbox-workshop-projects', JSON.stringify(state.workshop.projects.slice(0, 40)));
  if (state.workshop.currentProject?.share_token) localStorage.setItem('fbox-workshop-current', state.workshop.currentProject.share_token);
  else localStorage.removeItem('fbox-workshop-current');
}

const workshopInstallationCheckKeys = ['caliper', 'suspension', 'steering_lock', 'full_travel', 'fender_loaded', 'road_test'];

function workshopInstallationChecksComplete(installation = {}) {
  return workshopInstallationCheckKeys.every(key => installation.checks?.[key] === true);
}

function workshopSameExactVehicle(left = {}, right = {}) {
  const normalize = value => String(value || '').trim().toLowerCase();
  const keys = ['year', 'make', 'model', 'trim', 'drive'];
  return keys.every(key => normalize(left[key]) && normalize(left[key]) === normalize(right[key]));
}

function workshopQualifiedCalibrationProjects() {
  const vehicle = state.fitment.vehicle || {};
  const currentToken = state.workshop.currentProject?.share_token || '';
  return (state.workshop.projects || []).filter(project => {
    if (!project?.share_token || project.share_token === currentToken || !workshopSameExactVehicle(vehicle, project.vehicle || {})) return false;
    const installation = project.request?.calibration?.installation || {};
    const outcomePassed = ['installed_clear', 'installed_after_correction'].includes(installation.outcome);
    return outcomePassed && workshopInstallationChecksComplete(installation) && project.result?.solution?.has_calculated_geometry === true && !(project.result?.issues || []).length;
  }).slice(0, 3);
}

function workshopCalibrationProjectSpec(project = {}) {
  return ['front', 'rear'].map(axle => {
    const recommendation = project.result?.axles?.[axle]?.recommendation || {};
    const target = project.result?.axles?.[axle]?.geometry?.target_wheel || {};
    const diameter = target.diameter_in ?? recommendation.diameter_in;
    const width = target.width_in ?? recommendation.width_in;
    const et = target.et_mm ?? recommendation.et_mm;
    return diameter && width && Number.isFinite(Number(et)) ? `${axle === 'front' ? 'F' : 'R'} ${diameter}x${width}J ET${et}` : '';
  }).filter(Boolean).join(' · ') || uiLabel('Fitment calculation not saved in this revision');
}

function captureFitmentDraft(form = document.querySelector('[data-form="fitment-wizard"], [data-form="fitment-check"]')) {
  if (!form) return state.fitment.draft || {};
  state.fitment.draft = { ...(state.fitment.draft || {}), ...Object.fromEntries(new FormData(form).entries()) };
  localStorage.setItem('fbox-fitment-draft', JSON.stringify(state.fitment.draft));
  return state.fitment.draft;
}

const fitmentVehicleRequiredFields = ['year', 'make', 'model', 'trim', 'drive'];

function fitmentVehicleMissingFields(vehicle = state.fitment.vehicle || {}) {
  return fitmentVehicleRequiredFields.filter(field => !String(vehicle?.[field] || '').trim());
}

function fitmentVehicleMissingMessage(vehicle = state.fitment.vehicle || {}) {
  const labels = {
    year: uiLabel('Year'),
    make: uiLabel('Make'),
    model: uiLabel('Model'),
    trim: uiLabel('Exact trim / variant'),
    drive: uiLabel('Drive')
  };
  const missing = fitmentVehicleMissingFields(vehicle).map(field => labels[field] || field);
  const locale = state.locale || 'en';
  const fieldList = new Intl.ListFormat(locale, { style: 'short', type: 'conjunction' }).format(missing);
  return `${uiLabel('Please complete the following required vehicle fields:')} ${fieldList}${String(locale).toLowerCase().startsWith('zh') ? '。' : '.'}`;
}

function fitmentVehicleIsComplete(vehicle = state.fitment.vehicle || {}) {
  return fitmentVehicleMissingFields(vehicle).length === 0;
}

function scheduleFitmentVehicleMissingFocus() {
  const focusMissingField = () => {
    const form = document.querySelector('[data-form="fitment-wizard"]');
    const firstMissing = form?.querySelector('[data-required-missing="true"]');
    const error = form?.querySelector('.fitment-flow-error');
    if (!firstMissing || !error) return;
    const active = document.activeElement;
    const canRestore = !active
      || active === document.body
      || active === document.documentElement
      || active === firstMissing
      || active.matches?.('[data-action="fitment-wizard-next"]');
    if (!canRestore) return;
    firstMissing.focus({ preventScroll: true });
    firstMissing.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  requestAnimationFrame(focusMissingField);
  [120, 480, 1200].forEach(delay => window.setTimeout(focusMissingField, delay));
}

function captureFitmentVehicle(form = document.querySelector('[data-form="fitment-wizard"]')) {
  const container = form?.querySelector('[data-fitment-vehicle]');
  if (!container) return state.fitment.vehicle || null;
  const nextVehicle = {};
  ['year', 'make', 'model', 'trim', 'chassis', 'body_style', 'drive', 'market'].forEach(field => {
    const control = container.querySelector(`[data-fitment-field="${field}"]`);
    const value = String(control?.value || '').trim();
    if (value) nextVehicle[field] = value;
  });
  const vinReference = fitmentVinValue(form.elements.namedItem('vin_reference')?.value || state.fitment.draft?.vin_reference);
  if (vinReference) nextVehicle.vin_reference = vinReference;
  if (state.fitment.vinLookup?.data && state.fitment.vinLookup.queriedVin === vinReference) nextVehicle.vin_source = 'NHTSA vPIC';
  state.fitment.vehicle = Object.keys(nextVehicle).length ? nextVehicle : null;
  state.vehicle = state.fitment.vehicle;
  persist();
  return state.fitment.vehicle;
}

function workshopCurrentProjectView() {
  const current = state.workshop.currentProject || {};
  const draft = state.fitment.draft || {};
  return {
    ...current,
    title: draft.project_title || current.title || uiLabel('New customer build'),
    customer_reference: draft.customer_reference || current.customer_reference || '',
    shop: { ...state.workshop.profile, ...(current.shop || {}) },
    vehicle: state.fitment.vehicle || current.vehicle || {},
    request: current.request || {},
    result: state.fitment.result || current.result || {},
    selected_product_id: state.workshop.selectedProductId || current.selected_product_id || '',
    design: current.design || {},
    status: current.status || (state.fitment.result ? 'checked' : 'draft')
  };
}

function resolvedWorkshopProfile() {
  const profile = state.workshop.profile || {};
  const account = state.account || {};
  return {
    shop_name: String(profile.shop_name || account.company || '').trim(),
    advisor_name: String(profile.advisor_name || account.advisor_name || '').trim(),
    email: String(profile.email || account.email || '').trim(),
    phone: String(profile.phone || account.telephone || account.phone || '').trim(),
    location: String(profile.location || account.location || account.country || '').trim()
  };
}

async function saveWorkshopProfile(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  const profile = {
    shop_name: String(values.shop_name || '').trim(),
    advisor_name: String(values.advisor_name || '').trim(),
    email: String(values.email || '').trim(),
    phone: String(values.phone || '').trim(),
    location: String(values.location || '').trim()
  };
  if (!profile.shop_name) throw new Error(uiLabel('Add your shop name before creating a customer link.'));
  state.workshop.profile = profile;
  if (state.mallToken) {
    const payload = await mallRequest(mallConfig.portalBase, '/auth/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company: profile.shop_name,
        advisor_name: profile.advisor_name,
        email: profile.email,
        telephone: profile.phone,
        location: profile.location
      })
    });
    state.account = payload?.member || payload?.data?.member || state.account;
  }
  localStorage.setItem('fbox-workshop-profile', JSON.stringify(profile));
  return profile;
}

function workshopProfileMarkup() {
  const profile = resolvedWorkshopProfile();
  const projects = state.workshop.projects || [];
  const currentToken = state.workshop.currentProject?.share_token || '';
  const projectRows = projects.length
    ? projects.slice(0, 8).map(project => `<button type="button" class="workshop-project-row ${project.share_token === currentToken ? 'is-active' : ''}" data-action="workshop-resume" data-token="${esc(project.share_token)}"><span><strong>${esc(project.title || uiLabel('Untitled project'))}</strong><small>${esc(workshopVehicleLabel(project))} · ${uiLabel('Revision')} ${String(project.revision || 1).padStart(2, '0')}</small></span><b>${esc(workshopProjectStatusLabel(project.status))}</b></button>`).join('')
    : `<div class="workshop-project-empty"><strong>${uiLabel('No saved projects yet.')}</strong><span>${uiLabel('Save the first customer setup and it will stay available on this device.')}</span></div>`;
  return `<aside class="workshop-side"><div class="workshop-side-head"><span>${icons.store}</span><div><p>${uiLabel('Shop workspace')}</p><strong>${esc(profile.shop_name || uiLabel('Set up your shop'))}</strong></div></div><form class="workshop-profile-form" data-form="workshop-profile"><label><span>${uiLabel('Shop name')}</span><input name="shop_name" value="${esc(profile.shop_name || '')}" required placeholder="${esc(uiLabel('Your tuning shop'))}"></label><label><span>${uiLabel('Advisor name')}</span><input name="advisor_name" value="${esc(profile.advisor_name || '')}" placeholder="${esc(uiLabel('Fitment advisor'))}"></label><label><span>${uiLabel('Email')}</span><input name="email" type="email" value="${esc(profile.email || '')}" placeholder="shop@example.com"></label><label><span>${uiLabel('Phone / WhatsApp')}</span><input name="phone" value="${esc(profile.phone || '')}" placeholder="+1"></label><label><span>${uiLabel('City / location')}</span><input name="location" value="${esc(profile.location || '')}" placeholder="Los Angeles, CA"></label><button class="btn btn-light btn-small" type="submit">${icons.save} ${uiLabel('Save shop profile')}</button></form><div class="workshop-projects"><div class="workshop-projects-head"><strong>${uiLabel('Customer projects')}</strong><span>${projects.length}</span></div>${projectRows}</div></aside>`;
}

function workshopProjectBarMarkup() {
  const project = workshopCurrentProjectView();
  const hasShare = Boolean(project.share_token);
  return `<section class="workshop-project-bar"><div class="workshop-project-identity"><span class="workshop-live-dot"></span><div><small>${uiLabel('Current customer build')}</small><strong>${esc(project.title)}</strong><span>${esc(workshopVehicleLabel(project))} · ${uiLabel('Revision')} ${String(project.revision || 1).padStart(2, '0')} · ${(project.revision_history || []).length} ${uiLabel('saved versions')}</span></div><b class="workshop-status workshop-status-${esc(project.status)}">${esc(workshopProjectStatusLabel(project.status))}</b></div><div class="workshop-project-actions"><button type="button" class="icon-btn" data-action="workshop-new" title="${esc(uiLabel('New project'))}" aria-label="${esc(uiLabel('New project'))}">${icons.plus}</button><button type="button" class="btn btn-dark btn-small" data-action="workshop-save" ${state.workshop.saving ? 'disabled' : ''}>${icons.save} ${state.workshop.saving ? uiLabel('Saving…') : uiLabel('Save project')}</button><button type="button" class="btn btn-primary btn-small" data-action="workshop-share" ${state.workshop.saving ? 'disabled' : ''}>${icons.share} ${uiLabel('Share with customer')}</button>${project.share_token ? `<button type="button" class="icon-btn" data-action="workshop-history" title="${esc(uiLabel('Modification history'))}" aria-label="${esc(uiLabel('Modification history'))}">${icons.clock || icons.history || icons.copy}</button>` : ''}${hasShare ? `<button type="button" class="icon-btn" data-action="workshop-copy-link" title="${esc(uiLabel('Copy share link'))}" aria-label="${esc(uiLabel('Copy share link'))}">${icons.copy}</button>` : ''}</div></section>${state.workshop.error ? `<p class="workshop-project-error">${esc(state.workshop.error)}</p>` : ''}`;
}

function workshopGuestBarMarkup() {
  return `<section class="workshop-guest-bar"><div><span>${icons.store}</span><div><small>${uiLabel('Free professional fitment tool')}</small><strong>${uiLabel('Check first. Save when the project becomes real.')}</strong><p>${uiLabel('Vehicle and parts lookup is open. Sign in only when your shop needs to save, share or price a customer build.')}</p></div></div><div><button class="btn btn-outline btn-small" data-action="account-login">${uiLabel('Sign in')}</button><button class="btn btn-primary btn-small" data-action="account-register">${uiLabel('Create shop account')}</button></div></section>`;
}

function workshopChannelFieldsMarkup(project = {}) {
  const draft = state.fitment.draft || {};
  const channel = project.channel || {};
  const salesMode = draft.sales_mode || channel.sales_mode || 'dealer_managed';
  const priceVisibility = draft.price_visibility || channel.price_visibility || 'quote_only';
  const publishCase = draft.publish_case === 'on' || ['pending', 'approved'].includes(project.seo_status);
  return `<div class="workshop-channel-fields"><label><span>${uiLabel('Customer sales route')}</span><select name="sales_mode"><option value="dealer_managed" ${salesMode === 'dealer_managed' ? 'selected' : ''}>${uiLabel('Shop controls the sale')}</option><option value="attributed_checkout" ${salesMode === 'attributed_checkout' ? 'selected' : ''}>${uiLabel('CIRUI collects payment for the shop')}</option><option value="open_checkout" ${salesMode === 'open_checkout' ? 'selected' : ''}>${uiLabel('Allow direct CIRUI checkout')}</option></select><small>${uiLabel('Shop-controlled is the default: the customer can design and browse, but the final sale stays with your shop.')}</small></label><label><span>${uiLabel('Price shown before your quote')}</span><select name="price_visibility"><option value="quote_only" ${priceVisibility === 'quote_only' ? 'selected' : ''}>${uiLabel('Hide platform prices')}</option><option value="retail" ${priceVisibility === 'retail' ? 'selected' : ''}>${uiLabel('Show CIRUI retail prices')}</option></select><small>${uiLabel('Your published customer quote is always separate from the private CIRUI supply cost.')}</small></label><label class="workshop-case-consent"><input type="checkbox" name="publish_case" ${publishCase ? 'checked' : ''}><span><strong>${uiLabel('Allow this build to be featured in the CIRUI gallery')}</strong><small>${uiLabel('Customer names and contact details stay private. Only the vehicle, parts, fitment result and approved images may be shown.')}</small></span></label></div>`;
}

function workshopWheelPickerMarkup(project = {}) {
  const selectedId = state.workshop.selectedProductId || project.selected_product_id || '';
  const wheels = homeWheelProducts().slice(0, 8);
  const partnerProtected = state.route.name === 'fitment-share' && project.channel?.price_visibility !== 'retail';
  return `<div class="workshop-path-panel"><div class="workshop-panel-head"><div><p class="eyebrow">${uiLabel('CIRUI wheel catalog')}</p><h3>${uiLabel('Choose an existing direction.')}</h3></div><p>${partnerProtected ? uiLabel('Choose a direction for the shop to include in its final customer quote. Platform supply prices stay private.') : uiLabel('Select a listed wheel to attach it to this project. Ready-price products can continue to the product page; custom starting-price products move into the quote flow.')}</p></div><div class="workshop-wheel-grid">${wheels.map(item => `<article class="workshop-wheel-option ${item.id === selectedId ? 'is-selected' : ''}"><button type="button" class="workshop-wheel-select" data-action="workshop-select-product" data-id="${esc(item.id)}" aria-pressed="${item.id === selectedId}"><span class="workshop-wheel-media"><img src="${assetUrl(item.image)}" alt="${esc(item.name)}" loading="lazy"></span><span class="workshop-wheel-copy"><small>${esc(item.finish || item.color || uiLabel('Custom finish'))}</small><strong>${esc(homePreviewShortName(item))}</strong><b>${esc(partnerProtected ? uiLabel('Quoted by your shop') : productPriceText(item))}</b></span></button>${partnerProtected ? `<span class="workshop-wheel-protected">${uiLabel('Select for shop quote')}</span>` : `<a href="#product/${encodeURIComponent(item.id)}">${hasStartingPrice(item) ? uiLabel('View and request custom quote') : uiLabel('View and order')} ${icons.arrowRight}</a>`}</article>`).join('')}</div></div>`;
}

function workshopConceptMarkup(project = {}) {
  const vehicle = workshopVehicleLabel(project);
  return `<div class="workshop-path-panel workshop-ai-studio-entry"><div class="workshop-panel-head"><div><p class="eyebrow">${uiLabel('Customer co-design studio')}</p><h3>${uiLabel('AI Wheel Design Studio')}</h3></div><p>${uiLabel('Create four original directions first, then return with the selected concept for vehicle fitment and quoting.')}</p></div><div class="workshop-ai-studio-context">${icons.shield}<span><small>${uiLabel('Vehicle context inherited')}</small><strong>${esc(vehicle)}</strong></span></div><div class="workshop-path-actions"><a class="btn btn-primary" href="/ai-wheel-studio" data-app-path>${icons.spark} ${uiLabel('Open AI Original Design Studio')} ${icons.arrowRight}</a><span>${uiLabel('Concept preview only')}</span></div></div>`;
}

function workshopDealerQuoteMarkup(project = {}) {
  if (!project.share_token) return `<div class="workshop-path-panel workshop-quote-empty"><span>${icons.save}</span><div><p class="eyebrow">${uiLabel('Shop customer quote')}</p><h3>${uiLabel('Save this project before pricing it.')}</h3><p>${uiLabel('The project needs an account-owned record before private supply cost and customer pricing can be kept apart.')}</p><button class="btn btn-primary" data-action="workshop-save">${icons.save} ${uiLabel('Save project')}</button></div></div>`;
  const platform = project.platform_quote || {};
  const quote = project.dealer_quote || {};
  const serviceAmount = id => quote.service_items?.find(item => item.id === id)?.amount || '';
  const published = quote.status === 'published';
  return `<form class="workshop-path-panel workshop-dealer-quote" data-form="workshop-dealer-quote"><div class="workshop-panel-head"><div><p class="eyebrow">${uiLabel('Shop customer quote')}</p><h3>${uiLabel('Build your selling price, not ours.')}</h3></div><p>${uiLabel('CIRUI supply cost stays private. Add your wheel margin and the real services your shop provides before publishing one final customer price.')}</p></div><div class="workshop-cost-strip"><span><small>${uiLabel('CIRUI supply quote')}</small><strong>${platform.status === 'issued' || platform.status === 'accepted' ? money(platform.total_cost || 0) : uiLabel('Waiting for CIRUI')}</strong></span><span><small>${uiLabel('Current customer total')}</small><strong>${money(quote.total || 0)}</strong></span><span><small>${uiLabel('Estimated gross margin')}</small><strong>${platform.total_cost ? money(quote.estimated_margin || 0) : uiLabel('Cost pending')}</strong></span><b>${published ? uiLabel('Published to customer') : uiLabel('Private draft')}</b></div><div class="workshop-dealer-price-grid"><label><span>${uiLabel('Customer wheel price / each')}</span><input name="wheel_unit_price" type="number" min="0" step="0.01" value="${esc(quote.wheel_unit_price || '')}" required></label><label><span>${uiLabel('Wheel quantity')}</span><input name="quantity" type="number" min="4" max="20" step="1" value="${esc(quote.quantity || 4)}" required></label><label><span>${uiLabel('Design service')}</span><input name="service_design" type="number" min="0" step="0.01" value="${esc(serviceAmount('design'))}"></label><label><span>${uiLabel('Measurement + fitment')}</span><input name="service_fitment" type="number" min="0" step="0.01" value="${esc(serviceAmount('fitment'))}"></label><label><span>${uiLabel('Installation labor')}</span><input name="service_installation" type="number" min="0" step="0.01" value="${esc(serviceAmount('installation'))}"></label><label><span>${uiLabel('Tires / mounting')}</span><input name="service_tires" type="number" min="0" step="0.01" value="${esc(serviceAmount('tires'))}"></label><label><span>${uiLabel('Other service')}</span><input name="service_other" type="number" min="0" step="0.01" value="${esc(serviceAmount('other'))}"></label><label><span>${uiLabel('Shipping')}</span><input name="shipping" type="number" min="0" step="0.01" value="${esc(quote.shipping || '')}"></label><label><span>${uiLabel('Tax')}</span><input name="tax" type="number" min="0" step="0.01" value="${esc(quote.tax || '')}"></label><label><span>${uiLabel('Discount')}</span><input name="discount" type="number" min="0" step="0.01" value="${esc(quote.discount || '')}"></label><label><span>${uiLabel('Deposit percent')}</span><input name="deposit_percent" type="number" min="0" max="100" step="1" value="${esc(quote.deposit_percent ?? 50)}"></label><label><span>${uiLabel('Valid until')}</span><input name="valid_until" type="date" value="${esc(quote.valid_until || '')}"></label><label class="workshop-dealer-note"><span>${uiLabel('Customer quote note')}</span><textarea name="note" rows="4">${esc(quote.note || '')}</textarea></label></div><label class="workshop-publish-quote"><input type="checkbox" name="publish_quote" ${published ? 'checked' : ''}><span><strong>${uiLabel('Publish this final price to the customer link')}</strong><small>${uiLabel('The CIRUI supply cost and estimated margin will remain private.')}</small></span></label><div class="workshop-path-actions"><button class="btn btn-primary" type="submit">${icons.save} ${uiLabel('Save customer quote')}</button><span>${uiLabel('Automatic payment splitting is not enabled yet; this version records the commercial structure safely.')}</span></div></form>`;
}

function workshopQuoteMarkup(project = {}) {
  const selected = product(state.workshop.selectedProductId || project.selected_product_id || '');
  const hasSelected = Boolean(state.workshop.selectedProductId || project.selected_product_id);
  const dealerQuote = project.dealer_quote;
  const shopName = project.shop?.shop_name || uiLabel('the partner shop');
  if (dealerQuote && ['published', 'accepted'].includes(dealerQuote.status)) {
    return `<div class="workshop-path-panel workshop-customer-quote"><div class="workshop-panel-head"><div><p class="eyebrow">${uiLabel('Quote from')} ${esc(shopName)}</p><h3>${uiLabel('Your complete wheel project price.')}</h3></div><p>${uiLabel('This is the shop selling price, including the listed services. CIRUI supply pricing is never shown here.')}</p></div><div class="workshop-customer-quote-lines"><span><small>${uiLabel('Wheels')}</small><strong>${dealerQuote.quantity} × ${money(dealerQuote.wheel_unit_price)}</strong><b>${money(dealerQuote.quantity * dealerQuote.wheel_unit_price)}</b></span>${(dealerQuote.service_items || []).map(item => `<span><small>${esc(uiLabel(item.label))}</small><strong></strong><b>${money(item.amount)}</b></span>`).join('')}${dealerQuote.shipping ? `<span><small>${uiLabel('Shipping')}</small><strong></strong><b>${money(dealerQuote.shipping)}</b></span>` : ''}${dealerQuote.tax ? `<span><small>${uiLabel('Tax')}</small><strong></strong><b>${money(dealerQuote.tax)}</b></span>` : ''}${dealerQuote.discount ? `<span><small>${uiLabel('Discount')}</small><strong></strong><b>-${money(dealerQuote.discount)}</b></span>` : ''}</div><div class="workshop-customer-quote-total"><span><small>${uiLabel('Final customer total')}</small><strong>${money(dealerQuote.total)}</strong></span><span><small>${uiLabel('Requested deposit')}</small><strong>${money(dealerQuote.deposit_amount)}</strong></span></div>${dealerQuote.note ? `<p class="workshop-customer-quote-note">${esc(dealerQuote.note)}</p>` : ''}<div class="workshop-path-actions"><button class="btn btn-primary" data-action="workshop-contact-shop">${icons.chat} ${uiLabel('Continue with')} ${esc(shopName)}</button><span>${uiLabel('The originating shop remains your sales and installation contact.')}</span></div></div>`;
  }
  if (state.workshop.quote.status === 'success') return `<div class="workshop-path-panel workshop-quote-success"><span>${icons.shield}</span><div><p class="eyebrow">${uiLabel('Sent to CIRUI')}</p><h3>${uiLabel('The project is now in the quote queue.')}</h3><p>${uiLabel('The saved vehicle, fitment result, selected style and customer note are attached to the inquiry.')}</p><small>${uiLabel('Inquiry ID')}: ${esc(state.workshop.quote.id)}</small></div></div>`;
  return `<form class="workshop-path-panel workshop-quote-form" data-form="workshop-quote"><div class="workshop-panel-head"><div><p class="eyebrow">${uiLabel('Partner-protected request')}</p><h3>${uiLabel('Send the complete project through')} ${esc(shopName)}.</h3></div><p>${uiLabel('No retyping: the vehicle, modified parts, measurements, fitment result and chosen design travel together. CIRUI supports the shop without taking over the customer relationship.')}</p></div><div class="workshop-quote-context"><span><small>${uiLabel('Vehicle')}</small><strong>${esc(workshopVehicleLabel(project))}</strong></span><span><small>${uiLabel('Selected direction')}</small><strong>${esc(hasSelected ? homePreviewShortName(selected) : uiLabel('Custom concept / not selected'))}</strong></span><span><small>${uiLabel('Sales contact')}</small><strong>${esc(shopName)}</strong></span></div><div class="workshop-quote-fields"><label><span>${uiLabel('Customer name')} <b>*</b></span><input name="customer_name" required></label><label><span>${uiLabel('Email')} <b>*</b></span><input name="customer_email" type="email" required></label><label><span>${uiLabel('Phone / WhatsApp')}</span><input name="customer_phone" placeholder="+1"></label><label class="workshop-quote-note"><span>${uiLabel('Quote note')}</span><textarea name="customer_note" rows="4" placeholder="${esc(uiLabel('Delivery country, target budget, finish changes or timing.'))}"></textarea></label></div>${state.workshop.quote.error ? `<p class="workshop-project-error">${esc(state.workshop.quote.error)}</p>` : ''}<div class="workshop-path-actions"><button class="btn btn-primary" type="submit" ${state.workshop.quote.status === 'submitting' ? 'disabled' : ''}>${state.workshop.quote.status === 'submitting' ? uiLabel('Sending…') : `${uiLabel('Request through')} ${esc(shopName)}`} ${icons.arrowRight}</button><span>${uiLabel('The request is attributed to the originating shop in CIRUI.')}</span></div></form>`;
}

function workshopDecisionHub(project = {}) {
  const mode = state.workshop.mode || 'ready';
  const ownerPricing = state.route.name === 'fitment' && Boolean(state.account);
  const quoteTitle = ownerPricing ? uiLabel('Customer pricing') : uiLabel('Shop quote');
  const quoteCaption = ownerPricing ? uiLabel('Margin + service fees') : uiLabel('Protected partner request');
  const panel = mode === 'custom' ? workshopConceptMarkup(project) : mode === 'quote' ? (ownerPricing ? workshopDealerQuoteMarkup(project) : workshopQuoteMarkup(project)) : workshopWheelPickerMarkup(project);
  return `<section class="workshop-decision-hub" id="workshop-next"><div class="workshop-decision-head"><div><p class="custom-kicker">${uiLabel('From fitment to sale')} <span>${uiLabel('One shared project')}</span></p><h2>${uiLabel('Choose the next path with the customer.')}</h2></div><p>${uiLabel('Use a listed CIRUI style, co-design a new wheel from text and a reference image, or move the complete project into the shop-controlled quote flow.')}</p></div><div class="workshop-mode-tabs" role="tablist"><button type="button" role="tab" aria-selected="${mode === 'ready'}" class="${mode === 'ready' ? 'is-active' : ''}" data-action="workshop-mode" data-mode="ready">${icons.store}<span><strong>${uiLabel('Existing styles')}</strong><small>${uiLabel('Select for the build')}</small></span></button><button type="button" role="tab" aria-selected="${mode === 'custom'}" class="${mode === 'custom' ? 'is-active' : ''}" data-action="workshop-mode" data-mode="custom">${icons.spark}<span><strong>${uiLabel('Custom concept')}</strong><small>${uiLabel('Text + reference image')}</small></span></button><button type="button" role="tab" aria-selected="${mode === 'quote'}" class="${mode === 'quote' ? 'is-active' : ''}" data-action="workshop-mode" data-mode="quote">${icons.chat}<span><strong>${quoteTitle}</strong><small>${quoteCaption}</small></span></button></div>${panel}</section>`;
}

function fitmentAxleForm(axle, label) {
  const prefix = axle;
  return `<article class="fitment-axle-card">
    <div class="fitment-axle-head"><div><span class="fitment-step-index">${axle === 'front' ? '02' : '03'}</span><h3>${uiLabel(`${label} calculator`, `${label} calculator`)}</h3></div><span class="fitment-axle-note">${uiLabel('Current baseline → calculated custom specification')}</span></div>
    <section class="fitment-axle-group">
      <div class="fitment-axle-group-head"><h4>${uiLabel('Current installed baseline')}</h4><p>${uiLabel('Read these values from the wheel, tire and installed spacer. They anchor every movement calculation.')}</p></div>
      <div class="fitment-input-grid fitment-input-grid-compact">
        <label><span>${uiLabel('Current diameter (in)')}</span><input name="current_${prefix}_diameter" type="number" step="0.1" min="12" max="30" value="${fitmentDraftValue(`current_${prefix}_diameter`)}" placeholder="18"></label>
        <label><span>${uiLabel('Current width (in)')}</span><input name="current_${prefix}_width" type="number" step="0.1" min="4" max="16" value="${fitmentDraftValue(`current_${prefix}_width`)}" placeholder="8.0"></label>
        <label><span>${uiLabel('Current ET (mm)')}</span><input name="current_${prefix}_offset" type="number" step="0.1" value="${fitmentDraftValue(`current_${prefix}_offset`)}" placeholder="34"></label>
        <label><span>${uiLabel('Current spacer (mm)')}</span><input name="current_${prefix}_spacer_mm" type="number" step="0.5" min="0" value="${fitmentDraftValue(`current_${prefix}_spacer_mm`)}" placeholder="0"></label>
        <label class="fitment-input-wide"><span>${uiLabel('Current tire size')}</span><input name="current_${prefix}_tire" value="${fitmentDraftValue(`current_${prefix}_tire`)}" placeholder="225/45R18"></label>
      </div>
    </section>
    <section class="fitment-axle-group">
      <div class="fitment-axle-group-head"><h4>${uiLabel('Requested custom specification')}</h4><p>${uiLabel('Enter the desired diameter or width. Leave ET blank and the calculator will solve it from the measured clearance envelope.')}</p></div>
      <div class="fitment-input-grid">
        <label><span>${uiLabel('Target diameter (in)')}</span><small class="fitment-field-help">${uiLabel('Rim bead-seat diameter, not tire outside diameter.')}</small><input name="${prefix}_diameter" type="number" step="0.1" min="12" max="30" value="${fitmentDraftValue(`${prefix}_diameter`)}" placeholder="19"></label>
        <label><span>${uiLabel('Target width (in)')}</span><small class="fitment-field-help">${uiLabel('Bead-seat width from the wheel drawing.')}</small><input name="${prefix}_width" type="number" step="0.1" min="4" max="16" value="${fitmentDraftValue(`${prefix}_width`)}" placeholder="9.0"></label>
        <label><span>${uiLabel('Requested ET (optional)')}</span><small class="fitment-field-help">${uiLabel('Leave blank to calculate; positive ET moves the wheel inward.')}</small><input name="${prefix}_offset" type="number" step="0.1" value="${fitmentDraftValue(`${prefix}_offset`)}" placeholder="${esc(uiLabel('Calculate automatically'))}"></label>
        <label><span>PCD</span><small class="fitment-field-help">${uiLabel('Number of holes × pitch-circle diameter, e.g. 5x112.')}</small><input name="${prefix}_pcd" value="${fitmentDraftValue(`${prefix}_pcd`)}" placeholder="5x112"></label>
        <label><span>${uiLabel('Center bore (mm)')}</span><small class="fitment-field-help">${uiLabel('Custom machining must match the verified vehicle hub.')}</small><input name="${prefix}_center_bore" type="number" step="0.1" value="${fitmentDraftValue(`${prefix}_center_bore`)}" placeholder="${esc(uiLabel('Calculated from vehicle'))}"></label>
        <label><span>${uiLabel('Final spacer (normally 0 mm)')}</span><small class="fitment-field-help">${uiLabel('A custom ET should normally remove the need for a spacer.')}</small><input name="${prefix}_spacer_mm" type="number" step="0.5" min="0" value="${fitmentDraftValue(`${prefix}_spacer_mm`)}" placeholder="0"></label>
      </div>
    </section>
    <section class="fitment-axle-group">
      <div class="fitment-axle-group-head"><h4>${uiLabel('Measured current clearances')}</h4><p>${uiLabel('Measure the current installed setup. The calculator projects the remaining clearance after the new wheel and tire move.')}</p></div>
      <div class="fitment-input-grid">
        <label><span>${uiLabel('Wheel barrel to strut clearance (mm)')}</span><small class="fitment-field-help">${uiLabel('Current wheel barrel to strut or spring perch; use the smallest gap.')}</small><input name="${prefix}_inner_clearance_mm" type="number" step="0.5" min="0" value="${fitmentDraftValue(`${prefix}_inner_clearance_mm`)}" placeholder="${esc(uiLabel('Measured minimum'))}"></label>
        <label><span>${uiLabel('Spoke back to caliper clearance (mm)')}</span><small class="fitment-field-help">${uiLabel('Current spoke back to the caliper highest point; the final wheel still needs its 1:1 template.')}</small><input name="${prefix}_spoke_clearance_mm" type="number" step="0.5" min="0" value="${fitmentDraftValue(`${prefix}_spoke_clearance_mm`)}" placeholder="${esc(uiLabel('Template / measured gap'))}"></label>
        <label><span>${uiLabel('Tire shoulder to fender clearance (mm)')}</span><small class="fitment-field-help">${uiLabel('Current tire shoulder to the inner fender lip at steering lock or axle load.')}</small><input name="${prefix}_fender_clearance_mm" type="number" step="0.5" min="0" value="${fitmentDraftValue(`${prefix}_fender_clearance_mm`)}" placeholder="${esc(uiLabel('Measured minimum'))}"></label>
        <label><span>${uiLabel('Full-compression minimum clearance (mm)')}</span><small class="fitment-field-help">${uiLabel('Current minimum through usable suspension travel, with steering lock where applicable.')}</small><input name="${prefix}_compression_clearance_mm" type="number" step="0.5" min="0" value="${fitmentDraftValue(`${prefix}_compression_clearance_mm`)}" placeholder="${esc(uiLabel('Loaded suspension gap'))}"></label>
        <label><span>${uiLabel('Camber (deg)')}</span><small class="fitment-field-help">${uiLabel('Use the current alignment printout; negative means the top leans inward.')}</small><input name="${prefix}_camber_deg" type="number" step="0.1" value="${fitmentDraftValue(`${prefix}_camber_deg`)}" placeholder="-2.0"></label>
        <label><span>${uiLabel('Toe (deg)')}</span><small class="fitment-field-help">${uiLabel('Use total toe for this axle from the current alignment printout.')}</small><input name="${prefix}_toe_deg" type="number" step="0.01" value="${fitmentDraftValue(`${prefix}_toe_deg`)}" placeholder="0.00"></label>
      </div>
    </section>
    <section class="fitment-axle-group">
      <div class="fitment-axle-group-head"><h4>${uiLabel('Target tire approval')}</h4><p>${uiLabel('Use the exact tire maker data sheet. Size alone is not enough for a production-locked wheel width.')}</p></div>
      <div class="fitment-input-grid">
        <label><span>${uiLabel('Target tire size')}</span><input name="${prefix}_tire" value="${fitmentDraftValue(`${prefix}_tire`)}" placeholder="255/35R19"></label>
        <label><span>${uiLabel('Tire manufacturer')}</span><input name="${prefix}_tire_maker" value="${fitmentDraftValue(`${prefix}_tire_maker`)}" placeholder="Michelin"></label>
        <label><span>${uiLabel('Tire model')}</span><input name="${prefix}_tire_model" value="${fitmentDraftValue(`${prefix}_tire_model`)}" placeholder="Pilot Sport 4 S"></label>
        <label><span>${uiLabel('Load index')}</span><input name="${prefix}_tire_load_index" value="${fitmentDraftValue(`${prefix}_tire_load_index`)}" placeholder="96"></label>
        <label><span>${uiLabel('Speed rating')}</span><input name="${prefix}_tire_speed_rating" value="${fitmentDraftValue(`${prefix}_tire_speed_rating`)}" placeholder="Y"></label>
        <label><span>${uiLabel('Maker-approved rim width (in)')}</span><div class="fitment-range-inputs"><input name="${prefix}_tire_rim_min" type="number" min="3" max="20" step="0.5" value="${fitmentDraftValue(`${prefix}_tire_rim_min`)}" placeholder="8.5"><b>–</b><input name="${prefix}_tire_rim_max" type="number" min="3" max="20" step="0.5" value="${fitmentDraftValue(`${prefix}_tire_rim_max`)}" placeholder="10.0"></div></label>
        <label><span>${uiLabel('Tire fitment style')}</span><select name="${prefix}_tire_fitment_style" data-translate-options><option value="" data-translate-option>${uiLabel('Not specified')}</option><option value="standard" ${fitmentDraftValue(`${prefix}_tire_fitment_style`) === 'standard' ? 'selected' : ''} data-translate-option>${uiLabel('Standard tire')}</option><option value="mild-stretch" ${fitmentDraftValue(`${prefix}_tire_fitment_style`) === 'mild-stretch' ? 'selected' : ''} data-translate-option>${uiLabel('Mild stretch')}</option><option value="aggressive-stretch" ${fitmentDraftValue(`${prefix}_tire_fitment_style`) === 'aggressive-stretch' ? 'selected' : ''} data-translate-option>${uiLabel('Aggressive stretch')}</option></select></label>
      </div>
    </section>
  </article>`;
}

function fitmentStatusLabel(status) {
  return status === 'pass' ? uiLabel('Known rules pass') : status === 'conflict' ? uiLabel('Conflict found') : uiLabel('Needs measurement');
}

function fitmentSolutionStageLabel(stage = '') {
  return ({ identity_required: uiLabel('Vehicle identity required'), measurement_required: uiLabel('Calculated plan · measurements needed'), correction_required: uiLabel('Calculated plan · correction required'), drawing_ready: uiLabel('Ready for drawing'), engineering_ready: uiLabel('Calculated plan · engineering ready'), production_locked: uiLabel('Production-locked specification') })[stage] || uiLabel('Calculated plan · measurements needed');
}

function fitmentSolutionStageCopy(stage = '') {
  return ({
    identity_required: uiLabel('We kept the customer target, but no dimensional plan will pretend the hub data is verified. Confirm the exact vehicle identity first, then the same project will resolve the hub and wheel envelope.'),
    measurement_required: uiLabel('The calculator has produced a specific front/rear plan and marked exactly which measurements still control it. Add those values and calculate again.'),
    correction_required: uiLabel('The requested combination cannot meet every entered constraint. Use the corrected specification below, or change the tire/hardware named in the correction.'),
    drawing_ready: uiLabel('The known vehicle, component and measurement rules are consistent. This plan can move to the final wheel drawing and physical template review.'),
    engineering_ready: uiLabel('The calculated geometry and evidence gates are complete. CIRUI can now attach the named drawing revision and engineering approval.'),
    production_locked: uiLabel('This exact revision has the required drawing, templates, measurements and named engineering approval for production.')
  })[stage] || uiLabel('The calculator has produced a specific front/rear plan and marked exactly which measurements still control it. Add those values and calculate again.');
}

function fitmentSolutionTitle(stage = '') {
  if (stage === 'production_locked') return uiLabel('Production-locked custom specification');
  if (stage === 'engineering_ready') return uiLabel('Final calculated custom specification');
  if (stage === 'correction_required') return uiLabel('Corrected custom specification');
  return uiLabel('Calculated custom specification');
}

function fitmentRequirementLabel(code = '') {
  const axle = code.startsWith('front_') ? uiLabel('Front axle') : code.startsWith('rear_') ? uiLabel('Rear axle') : '';
  const labels = {
    exact_vehicle_identity: uiLabel('Confirm exact trim, chassis code, drive and market from VIN or manufacturer build data.'),
    verified_hub_specification: uiLabel('Verify PCD and hub diameter from an approved vehicle source before machining.'),
    front_brake_template: uiLabel('Provide the front caliper/rotor assembly drawing or a 1:1 wheel-clearance template.'),
    rear_brake_template: uiLabel('Provide the rear caliper/rotor assembly drawing or a 1:1 wheel-clearance template.'),
    front_tire_specification: uiLabel('Choose the complete front tire size with load index and speed rating.'),
    rear_tire_specification: uiLabel('Choose the complete rear tire size with load index and speed rating.'),
    front_tire_load_and_rim_range: uiLabel('Confirm the front tire maker approves the proposed rim width and vehicle load.'),
    rear_tire_load_and_rim_range: uiLabel('Confirm the rear tire maker approves the proposed rim width and vehicle load.'),
    front_current_wheel_baseline: uiLabel('Record the current front wheel diameter, width, ET and spacer.'),
    rear_current_wheel_baseline: uiLabel('Record the current rear wheel diameter, width, ET and spacer.'),
    front_current_tire_baseline: uiLabel('Record the current front tire size.'),
    rear_current_tire_baseline: uiLabel('Record the current rear tire size.'),
    front_clearance_measurements: uiLabel('Measure the current front inner, fender and full-compression clearances.'),
    rear_clearance_measurements: uiLabel('Measure the current rear inner, fender and full-compression clearances.'),
    front_target_width_or_tire_revision: uiLabel('Reduce the front wheel/tire width or revise the hardware until a safe ET window exists.'),
    rear_target_width_or_tire_revision: uiLabel('Reduce the rear wheel/tire width or revise the hardware until a safe ET window exists.'),
    brake_and_suspension_identity: uiLabel('Record whether the brakes and suspension are factory or modified, with exact package or part numbers.'),
    component_application_evidence: uiLabel('Attach exact vehicle application and clearance evidence for every selected modified component.'),
    factory_option_package: uiLabel('Confirm the factory brake and suspension option package by VIN, build sheet or OE part number.'),
    shop_installation_experience_record: uiLabel('Attach the exact successful-install work order and complete all six post-install checks.'),
    post_installation_checks: uiLabel('Complete every post-install clearance and road-test check before treating this record as shop evidence.'),
    interference_correction_and_retest: uiLabel('Correct the recorded interference, recalculate and complete a new installation test.')
  };
  return labels[code] || `${axle}${axle ? ' · ' : ''}${String(code).replaceAll('_', ' ')}`;
}

function fitmentCorrectionFieldLabel(field = '') {
  return ({ vehicle_identity: uiLabel('Vehicle identity'), pcd: 'PCD', center_bore: uiLabel('Center bore'), diameter: uiLabel('Wheel diameter'), width: uiLabel('Wheel width'), offset: uiLabel('ET / offset'), tire: uiLabel('Tire size') })[field] || field;
}

function fitmentCorrectionReasonLabel(reason = '') {
  return ({
    unverified_catalog_combination: uiLabel('The catalog combination is not a verified engineering record.'),
    invalid_input: uiLabel('The entered value is incomplete or outside a physically valid range.'),
    invalid_tire_format: uiLabel('A complete tire size needs width, aspect ratio and rim diameter.'),
    vehicle_hub: uiLabel('Corrected to the verified vehicle/platform hub.'),
    custom_hub_bore: uiLabel('A custom wheel should be machined hub-centric for this vehicle.'),
    brake_minimum: uiLabel('Raised to clear the verified brake diameter requirement.'),
    platform_envelope: uiLabel('Moved inside the year-matched platform starting envelope.'),
    measured_clearance_envelope: uiLabel('Adjusted to preserve the measured inner and outer clearance margins.'),
    tire_approved_rim_range: uiLabel('Adjusted to the selected tire maker approved rim-width range.'),
    wheel_tire_diameter_mismatch: uiLabel('The tire rim diameter must match the proposed wheel diameter.')
  })[reason] || uiLabel('Engineering correction');
}

function fitmentCorrectionValue(field = '', value = '') {
  if (value === '' || value === null || value === undefined) return uiLabel('Verify first');
  if (field === 'center_bore') return `${value} mm`;
  if (field === 'diameter' || field === 'width') return `${value} in`;
  if (field === 'offset') return `ET ${value}`;
  return String(value);
}

function fitmentResultMarkup(result, options = {}) {
  const status = result?.status || 'needs_review';
  const messages = [...(result?.issues || []), ...(result?.warnings || []), ...(result?.missing || [])];
  const chinese = String(state.locale || '').startsWith('zh');
  const inchUnit = chinese ? '英寸' : 'in';
  const rangeJoin = chinese ? ' 至 ' : ' to ';
  const verification = result?.verification_summary || {};
  const baseline = result?.research_baseline;
  const solution = result?.solution || { stage: status === 'pass' ? 'drawing_ready' : 'measurement_required', corrections: [], required_confirmations: [] };
  const calibration = result?.setup_context?.calibration || {};
  const calibrationLabel = ({ current_vehicle_measured: uiLabel('Measured on this vehicle'), same_vehicle_successful_install: uiLabel('Previous successful install on matching vehicle'), manufacturer_drawing: uiLabel('Manufacturer drawing / application'), shop_experience: uiLabel('Shop experience candidate') })[calibration.basis] || uiLabel('Calibration source not recorded');
  const installationLabel = ({ installed_clear: uiLabel('Successful installation record'), installed_after_correction: uiLabel('Correction followed by successful installation'), interference_found: uiLabel('Interference found / needs revision') })[calibration.installation?.outcome] || '';
  const safetyNote = verification.provisional || verification.oem_selected || result?.setup_context?.dynamic_clearance_review_required
    ? uiLabel('OEM, low-stance and unverified component data still require exact template and dynamic-clearance review.')
    : uiLabel('CIRUI will review the final wheel drawing and dynamic clearance before production.');
  const solutionAxles = ['front', 'rear'].map(axle => {
    const data = result?.axles?.[axle] || {};
    const recommendation = data.recommendation || {};
    const axleLabel = axle === 'front' ? uiLabel('Front axle') : uiLabel('Rear axle');
    const wheelSize = recommendation.diameter_in != null && recommendation.width_in != null ? `${recommendation.diameter_in} × ${recommendation.width_in}J` : recommendation.diameter_in != null ? `${recommendation.diameter_in} ${inchUnit}` : uiLabel('Pending vehicle data');
    const etText = recommendation.et_mm != null ? `ET ${recommendation.et_mm}` : uiLabel('Pending measurements');
    const etRange = Array.isArray(recommendation.et_estimate_range) ? `${uiLabel('Working range')}: ET ${recommendation.et_estimate_range[0]}${rangeJoin}${recommendation.et_estimate_range[1]}` : uiLabel('No safe ET range yet');
    const confidence = ({ verified_vehicle: uiLabel('Verified vehicle basis'), platform_reference: uiLabel('Platform starting range'), customer_target_only: uiLabel('Customer target only') })[recommendation.confidence] || uiLabel('Needs verification');
    const geometry = data.geometry || {};
    const clearanceValue = value => Number.isFinite(value) ? `${value} mm` : uiLabel('Measurement needed');
    const movementValue = value => Number.isFinite(value) ? `${value > 0 ? '+' : ''}${value} mm` : '—';
    const geometryMarkup = `<div class="fitment-geometry"><div class="fitment-geometry-head"><strong>${uiLabel('Calculated position and remaining clearance')}</strong><small>${geometry.complete ? uiLabel('Calculated from current installed baseline') : uiLabel('Complete the current baseline to calculate')}</small></div><div class="fitment-geometry-grid"><span><small>${uiLabel('Wheel inner movement')}</small><b>${movementValue(geometry.wheel_inner_movement_mm)}</b></span><span><small>${uiLabel('Wheel outer movement')}</small><b>${movementValue(geometry.wheel_outer_movement_mm)}</b></span><span><small>${uiLabel('Inner clearance remaining')}</small><b>${clearanceValue(geometry.predicted_inner_clearance_mm)}</b></span><span><small>${uiLabel('Fender clearance remaining')}</small><b>${clearanceValue(geometry.predicted_outer_clearance_mm)}</b></span><span><small>${uiLabel('Full-compression clearance')}</small><b>${clearanceValue(geometry.predicted_full_compression_clearance_mm)}</b></span><span><small>${uiLabel('Rolling diameter change')}</small><b>${Number.isFinite(geometry.rolling_diameter_delta_percent) ? `${geometry.rolling_diameter_delta_percent}%` : '—'}</b></span></div></div>`;
    return `<article class="fitment-solution-axle"><div class="fitment-solution-axle-head"><div><small>${axleLabel}</small><strong>${esc(wheelSize)}</strong></div><span class="fitment-evidence fitment-evidence-${esc(recommendation.confidence || 'pending')}">${esc(confidence)}</span></div><dl><div><dt>PCD</dt><dd>${esc(recommendation.pcd || uiLabel('Verify vehicle'))}</dd></div><div><dt>${uiLabel('Machining center bore')}</dt><dd>${recommendation.center_bore_mm != null ? `${esc(recommendation.center_bore_mm)} mm` : uiLabel('Verify vehicle')}</dd></div><div><dt>${uiLabel('Target ET')}</dt><dd>${esc(etText)}<small>${esc(etRange)}</small></dd></div><div><dt>${uiLabel('Tire specification')}</dt><dd>${esc(recommendation.tire_size || uiLabel('Select after OE diameter + tire approval'))}<small>${esc([recommendation.tire_manufacturer, recommendation.tire_model, recommendation.tire_load_index && recommendation.tire_speed_rating ? `${recommendation.tire_load_index}${recommendation.tire_speed_rating}` : ''].filter(Boolean).join(' · '))}</small></dd></div></dl>${geometryMarkup}<p>${esc(recommendation.note || recommendation.basis || safetyNote)}</p></article>`;
  }).join('');
  const corrections = Array.isArray(solution.corrections) ? solution.corrections : [];
  const correctionsMarkup = corrections.length ? `<section class="fitment-corrections"><div><p class="eyebrow">${uiLabel('System corrections')}</p><h3>${uiLabel('What the plan changed for you')}</h3></div><div class="fitment-correction-list">${corrections.map(item => `<article><span>${item.axle === 'front' ? uiLabel('Front axle') : item.axle === 'rear' ? uiLabel('Rear axle') : uiLabel('Vehicle')}</span><strong>${esc(fitmentCorrectionFieldLabel(item.field))}</strong><p><del>${esc(fitmentCorrectionValue(item.field, item.entered))}</del><b>${icons.arrowRight}</b><ins>${esc(fitmentCorrectionValue(item.field, item.recommended))}</ins></p><small>${esc(fitmentCorrectionReasonLabel(item.reason))}</small></article>`).join('')}</div></section>` : `<div class="fitment-no-corrections">${uiLabel('No entered value was silently replaced. The plan preserves valid customer targets and labels every unresolved field.')}</div>`;
  const confirmations = Array.isArray(solution.required_confirmations) ? solution.required_confirmations : [];
  const confirmationMarkup = confirmations.length ? `<section class="fitment-confirmations"><div><p class="eyebrow">${uiLabel('Before production')}</p><h3>${uiLabel('Finish these to lock the wheel drawing')}</h3></div><ol>${confirmations.map(item => `<li>${esc(fitmentRequirementLabel(item))}</li>`).join('')}</ol></section>` : `<section class="fitment-confirmations is-clear"><div><p class="eyebrow">${uiLabel('Next gate')}</p><h3>${uiLabel('Ready for the final drawing review')}</h3></div><p>${esc(safetyNote)}</p></section>`;
  const diagnosticAxles = ['front', 'rear'].map(axle => {
    const data = result?.axles?.[axle] || {};
    const axleLabel = axle === 'front' ? uiLabel('Front axle') : uiLabel('Rear axle');
    return `<article class="fitment-result-axle"><div class="fitment-result-axle-head"><strong>${axleLabel}</strong><span>${esc(data.recommendation?.pcd || uiLabel('PCD pending'))}</span></div><div class="fitment-check-list">${(data.checks || []).map(check => `<span class="fitment-check fitment-check-${esc(check.status)}"><i></i>${esc(check.label)}: ${esc(check.detail)}</span>`).join('') || `<span class="fitment-check fitment-check-review"><i></i>${uiLabel('Enter wheel values for a more precise check.')}</span>`}</div></article>`;
  }).join('');
  const baselineMarkup = baseline ? `<div class="fitment-result-research"><div><strong>${chinese ? '平台研究基线' : 'Platform research baseline'}</strong><span>${esc(baseline.platform)} · ${esc(baseline.year_range || 'year range not listed')}</span></div><p>${chinese ? '以下是来源资料中的非批准范围，只用于提醒核对方向；不替代精确配置、刹车模板、避震型号和动态实测。' : 'This source range is a non-approved reference only. It does not replace exact trim, brake template, coilover model or dynamic measurements.'}</p><div><span>PCD <b>${esc(baseline.pcd || '—')}</b></span><span>CB <b>${baseline.center_bore_mm ? `${esc(baseline.center_bore_mm)} mm` : '—'}</b></span><span>${chinese ? '风险' : 'Risk'} <b>${esc(baseline.installation_risks || '—')}</b></span></div></div>` : '';
  const planAction = !options.shared ? `<button class="btn btn-primary" data-action="fitment-apply-plan">${icons.save} ${uiLabel('Apply plan to the form')}</button>` : '';
  const calibrationMarkup = `<div class="fitment-calibration-record"><span>${icons.shield}</span><div><small>${uiLabel('Shop calibration source')}</small><strong>${esc(calibrationLabel)}</strong>${calibration.reference ? `<p>${esc(calibration.reference)}</p>` : ''}${installationLabel ? `<em>${esc(installationLabel)}${calibration.installation?.reference ? ` · ${esc(calibration.installation.reference)}` : ''}</em>` : ''}</div><b>${uiLabel('Saved with this revision')}</b></div>`;
  const productionLockMarkup = solution.production_release
    ? `<div class="fitment-production-lock is-locked">${icons.shield}<div><small>${uiLabel('Installation commitment')}</small><strong>${uiLabel('Production-locked specification')}</strong><p>${esc(solution.production_lock_reason || '')}</p></div></div>`
    : `<div class="fitment-production-lock">${icons.shield}<div><small>${uiLabel('Installation commitment')}</small><strong>${uiLabel('Not production-locked yet')}</strong><p>${esc(solution.production_lock_reason || uiLabel('The calculated specification becomes an installation commitment only after every evidence gate and the named CIRUI drawing approval.'))}</p></div></div>`;
  const actions = options.shared
    ? `<div class="fitment-result-actions"><button class="btn btn-primary" data-action="workshop-mode" data-mode="ready">${icons.store} ${uiLabel('Choose an existing style')}</button><button class="btn btn-outline" data-action="workshop-mode" data-mode="custom">${icons.spark} ${uiLabel('Create a custom concept')}</button><button class="btn btn-light" data-action="workshop-mode" data-mode="quote">${icons.chat} ${uiLabel('Ask the shop for a quote')}</button></div>`
    : `<div class="fitment-result-actions">${planAction}<button class="btn btn-dark" data-action="workshop-save">${icons.save} ${uiLabel('Save this project')}</button><button class="btn btn-outline" data-action="workshop-share">${icons.share} ${uiLabel('Share with customer')}</button><button class="btn btn-light" data-action="whatsapp-fitment">${icons.whatsapp} ${uiLabel('Send setup via WhatsApp')}</button><button class="btn btn-light" data-action="fitment-chat">${uiLabel('Open CIRUI chat')}</button></div><p class="fitment-whatsapp-note">${uiLabel('Save once, then the same link can carry the vehicle data, design direction and quote conversation.')}</p>`;
  return `<section class="fitment-result fitment-solution" aria-live="polite"><div class="fitment-result-head"><div><p class="eyebrow">${uiLabel('CIRUI custom wheel calculator')}</p><h2>${fitmentSolutionTitle(solution.stage)}</h2><p>${esc(fitmentSolutionStageCopy(solution.stage))}</p></div><span class="fitment-status fitment-status-${esc(solution.stage || status)}">${esc(fitmentSolutionStageLabel(solution.stage))}</span></div>${calibrationMarkup}<div class="fitment-solution-grid">${solutionAxles}</div>${productionLockMarkup}${correctionsMarkup}${confirmationMarkup}<details class="fitment-diagnostics"><summary><span>${uiLabel('Engineering checks and evidence')}</span><small>${messages.length} ${uiLabel('review notes')}</small></summary>${baselineMarkup}<div class="fitment-result-grid">${diagnosticAxles}</div>${messages.length ? `<div class="fitment-result-messages"><h3>${uiLabel('Why the plan is not production-locked yet')}</h3><ul>${messages.slice(0, 14).map(message => `<li>${esc(message)}</li>`).join('')}</ul></div>` : `<div class="fitment-result-clear">${uiLabel('The known inputs are consistent. Final spoke and barrel clearance still require the selected wheel drawing.')}</div>`}</details>${actions}</section>`;
}

function fitmentLegacyPage() {
  const draft = state.fitment.draft || {};
  const project = workshopCurrentProjectView();
  const selectedSuspension = draft.suspension_id || '';
  const stanceProfile = state.fitment.draft?.stance_profile || 'oem';
  const fitmentGoal = state.fitment.draft?.fitment_goal || 'oem_safe';
  const calibrationBasis = state.fitment.draft?.calibration_basis || 'current_vehicle_measured';
  const installationOutcome = state.fitment.draft?.installation_outcome || 'candidate';
  const installationChecked = key => state.fitment.draft?.[`installation_check_${key}`] === 'on' ? 'checked' : '';
  const qualifiedCalibrations = workshopQualifiedCalibrationProjects();
  const stanceControl = `<label class="fitment-inline-control"><span>${uiLabel('Current stance / ride-height profile')}</span><select name="stance_profile" data-translate-options><option value="oem" ${stanceProfile === 'oem' ? 'selected' : ''} data-translate-option>${uiLabel('Factory original / exact trim')}</option><option value="lowered" ${stanceProfile === 'lowered' ? 'selected' : ''} data-translate-option>${uiLabel('Lowered street')}</option><option value="static-low" ${stanceProfile === 'static-low' ? 'selected' : ''} data-translate-option>${uiLabel('Static low / stance')}</option><option value="air-low" ${stanceProfile === 'air-low' ? 'selected' : ''} data-translate-option>${uiLabel('Air suspension low')}</option><option value="track" ${stanceProfile === 'track' ? 'selected' : ''} data-translate-option>${uiLabel('Track alignment')}</option></select></label>`;
  const goalControl = `<label class="fitment-inline-control"><span>${uiLabel('Desired installed result')}</span><select name="fitment_goal" data-translate-options><option value="oem_safe" ${fitmentGoal === 'oem_safe' ? 'selected' : ''}>${uiLabel('OEM-safe street')}</option><option value="flush_street" ${fitmentGoal === 'flush_street' ? 'selected' : ''}>${uiLabel('Flush street')}</option><option value="performance" ${fitmentGoal === 'performance' ? 'selected' : ''}>${uiLabel('Performance / track')}</option><option value="show" ${fitmentGoal === 'show' ? 'selected' : ''}>${uiLabel('Show / low stance')}</option></select></label>`;
  const qualifiedMarkup = qualifiedCalibrations.length ? `<div class="fitment-qualified-records"><div><strong>${uiLabel('Qualified shop records for this exact vehicle')}</strong><small>${uiLabel('Only records with calculated geometry and all six post-install checks appear here. They still pass through the current vehicle calculator.')}</small></div>${qualifiedCalibrations.map(item => `<article><span><b>${esc(item.title || uiLabel('New customer build'))}</b><small>${esc(workshopCalibrationProjectSpec(item))}</small></span><button type="button" class="btn btn-outline btn-small" data-action="workshop-use-calibration" data-token="${esc(item.share_token)}">${uiLabel('Use as candidate')}</button></article>`).join('')}</div>` : '';
  const installationMarkup = `<details class="fitment-installation-record" ${installationOutcome !== 'candidate' ? 'open' : ''}><summary><span><b>${uiLabel('Installation feedback record')}</b><small>${uiLabel('Save what actually happened after installation')}</small></span>${icons.chevron}</summary><div class="fitment-installation-body"><p>${uiLabel('This optional record turns workshop experience into reusable evidence without treating memory as an automatic approval.')}</p><div class="fitment-form-inline"><label><span>${uiLabel('Installation outcome')}</span><select name="installation_outcome"><option value="candidate" ${installationOutcome === 'candidate' ? 'selected' : ''}>${uiLabel('Candidate only / not installed')}</option><option value="installed_clear" ${installationOutcome === 'installed_clear' ? 'selected' : ''}>${uiLabel('Installed and verified clear')}</option><option value="installed_after_correction" ${installationOutcome === 'installed_after_correction' ? 'selected' : ''}>${uiLabel('Installed after specification correction')}</option><option value="interference_found" ${installationOutcome === 'interference_found' ? 'selected' : ''}>${uiLabel('Interference found / needs revision')}</option></select></label><label><span>${uiLabel('Install date')}</span><input name="installation_date" type="date" value="${fitmentDraftValue('installation_date')}"></label><label><span>${uiLabel('Installer / work order')}</span><input name="installation_reference" value="${fitmentDraftValue('installation_reference')}" placeholder="${esc(uiLabel('Example: Alex / work order 024'))}"></label><label><span>${uiLabel('Post-install note')}</span><input name="installation_note" value="${fitmentDraftValue('installation_note')}" placeholder="${esc(uiLabel('Record rubbing, corrections, final spacer, alignment or tire changes.'))}"></label></div><fieldset class="fitment-installation-checks"><legend>${uiLabel('Post-install checks')}</legend><label><input type="checkbox" name="installation_check_caliper" ${installationChecked('caliper')}><span>${uiLabel('Spoke-to-caliper clearance checked')}</span></label><label><input type="checkbox" name="installation_check_suspension" ${installationChecked('suspension')}><span>${uiLabel('Barrel/tire-to-suspension clearance checked')}</span></label><label><input type="checkbox" name="installation_check_steering_lock" ${installationChecked('steering_lock')}><span>${uiLabel('Steering lock clearance checked')}</span></label><label><input type="checkbox" name="installation_check_full_travel" ${installationChecked('full_travel')}><span>${uiLabel('Full suspension travel checked')}</span></label><label><input type="checkbox" name="installation_check_fender_loaded" ${installationChecked('fender_loaded')}><span>${uiLabel('Loaded fender clearance checked')}</span></label><label><input type="checkbox" name="installation_check_road_test" ${installationChecked('road_test')}><span>${uiLabel('Alignment and road test completed')}</span></label></fieldset></div></details>`;
  const calibrationMarkup = `<section class="fitment-form-section fitment-calibration-section"><div class="fitment-section-head"><div><span class="fitment-section-kicker">${uiLabel('Shop calibration')}</span><h2>${uiLabel('Start from what your shop already knows.')}</h2></div><p>${uiLabel('Enter a familiar successful specification as the candidate. CIRUI keeps its source, then checks and corrects it against this customer vehicle.')}</p></div>${qualifiedMarkup}<div class="fitment-form-inline"><label><span>${uiLabel('Candidate specification source')}</span><select name="calibration_basis"><option value="current_vehicle_measured" ${calibrationBasis === 'current_vehicle_measured' ? 'selected' : ''}>${uiLabel('Measured on this vehicle')}</option><option value="same_vehicle_successful_install" ${calibrationBasis === 'same_vehicle_successful_install' ? 'selected' : ''}>${uiLabel('Previous successful install on matching vehicle')}</option><option value="manufacturer_drawing" ${calibrationBasis === 'manufacturer_drawing' ? 'selected' : ''}>${uiLabel('Manufacturer drawing / application')}</option><option value="shop_experience" ${calibrationBasis === 'shop_experience' ? 'selected' : ''}>${uiLabel('Shop experience candidate')}</option></select></label><label><span>${uiLabel('Reference build / calibration note')}</span><input name="calibration_reference" value="${fitmentDraftValue('calibration_reference')}" placeholder="${esc(uiLabel('Example: 2022 C43, same brakes, installed 19x9 ET38 without spacer'))}"></label></div><div class="fitment-inline-note">${uiLabel('Experience is useful as a starting point. Production lock still follows the exact vehicle, current modifications, tire approval and measured clearance.')}</div>${installationMarkup}</section>`;
  const libraryNote = `${state.fitment.loaded ? `${state.fitment.parts.length} ${uiLabel('active component profiles loaded', 'active component profiles loaded')}. ${uiLabel('Exact brake templates and measurements are still reviewed by a specialist.', 'Exact brake templates and measurements are still reviewed by a specialist.')}` : uiLabel('Loading the component library. You can still enter the vehicle and measurements manually.', 'Loading the component library. You can still enter the vehicle and measurements manually.')} ${stanceControl}`;
  return `<main class="fitment-lab-page workshop-lab-page"><div class="container"><section class="fitment-lab-intro workshop-lab-intro"><div><p class="custom-kicker">${uiLabel('CIRUI Workshop Lab')} <span>${uiLabel('Free workspace for tuning shops')}</span></p><h1>${uiLabel('Custom wheel fitment calculator.')}</h1><p>${uiLabel('Start from a shop-proven candidate, calibrate it against the customer vehicle, and save the complete modification record for the next visit.')}</p></div><div class="fitment-lab-facts"><span><strong>${uiLabel('Calculate')}</strong><small>${uiLabel('Turn experience into a checked specification')}</small></span><span><strong>${uiLabel('Archive')}</strong><small>${uiLabel('Keep every customer revision')}</small></span><span><strong>${uiLabel('Share')}</strong><small>${uiLabel('One protected customer link')}</small></span></div></section><div class="workshop-layout workshop-tool-layout"><div class="workshop-main">${state.account ? workshopProjectBarMarkup() : workshopGuestBarMarkup()}<form class="fitment-lab-form" data-form="fitment-check"><section class="fitment-form-section workshop-project-fields"><div class="fitment-section-head"><div><span class="fitment-section-kicker">${uiLabel('Customer modification record')}</span><h2>${uiLabel('Name this customer build.')}</h2></div><p>${uiLabel('Every save creates a new revision, so the shop can reopen the vehicle history later.')}</p></div><div class="fitment-form-inline"><label><span>${uiLabel('Project name')}</span><input name="project_title" value="${esc(draft.project_title || project.title || '')}" placeholder="${esc(uiLabel('Example: C43 street setup'))}"></label><label><span>${uiLabel('Customer reference')}</span><input name="customer_reference" value="${esc(draft.customer_reference || project.customer_reference || '')}" placeholder="${esc(uiLabel('Example: Chris / ticket 024'))}"></label></div>${state.account ? workshopChannelFieldsMarkup(project) : ''}</section><section class="fitment-form-section"><div class="fitment-section-head"><div><span class="fitment-section-kicker">${uiLabel('01 / Vehicle')}</span><h2>${uiLabel('Start with the exact platform.')}</h2></div><p>${uiLabel('Trim and drive can change the original wheel, brake and clearance baseline.')}</p></div>${fitmentVehicleSelector()}<div class="fitment-form-inline"><label><span>${uiLabel('How will you use it?')}</span><select name="usage" data-translate-options><option value="street" ${draft.usage === 'street' ? 'selected' : ''}>${uiLabel('Daily street')}</option><option value="spirited" ${draft.usage === 'spirited' ? 'selected' : ''}>${uiLabel('Spirited road')}</option><option value="show" ${draft.usage === 'show' ? 'selected' : ''}>${uiLabel('Show / stance')}</option><option value="track" ${draft.usage === 'track' ? 'selected' : ''}>${uiLabel('Track / competition')}</option></select></label><label><span>${uiLabel('Current ride-height drop (mm)')}</span><input name="ride_height_drop_mm" type="number" step="1" min="0" value="${fitmentDraftValue('ride_height_drop_mm')}" placeholder="0"></label>${stanceControl}${goalControl}</div></section>${calibrationMarkup}<section class="fitment-form-section"><div class="fitment-section-head"><div><span class="fitment-section-kicker">${uiLabel('Parts library')}</span><h2>${uiLabel('Tell us what is already on the car.')}</h2></div><p>${uiLabel('Known brand and part numbers make the first-pass recommendation much sharper. The library is editable by CIRUI staff.')}</p></div><div class="fitment-parts-grid"><label><span>${uiLabel('Front brake kit / caliper')}</span><select name="front_brake_id">${fitmentPartOptions('brake', draft.front_brake_id)}</select></label><label><span>${uiLabel('Rear brake kit / caliper')}</span><select name="rear_brake_id">${fitmentPartOptions('brake', draft.rear_brake_id)}</select></label><label><span>${uiLabel('Front brake rotor')}</span><select name="front_rotor_id">${fitmentPartOptions('rotor', draft.front_rotor_id)}</select></label><label><span>${uiLabel('Rear brake rotor')}</span><select name="rear_rotor_id">${fitmentPartOptions('rotor', draft.rear_rotor_id)}</select></label><label><span>${uiLabel('Front brake pad')}</span><select name="front_pad_id">${fitmentPartOptions('pad', draft.front_pad_id)}</select></label><label><span>${uiLabel('Rear brake pad')}</span><select name="rear_pad_id">${fitmentPartOptions('pad', draft.rear_pad_id)}</select></label><label><span>${uiLabel('Suspension / coilover')}</span><select name="suspension_id">${fitmentPartOptions('suspension', selectedSuspension)}</select></label></div><div class="fitment-inline-note">${libraryNote}</div></section>${fitmentAxleForm('front', 'Front axle')}${fitmentAxleForm('rear', 'Rear axle')}<div class="fitment-submit-row"><div><strong>${uiLabel('Calculate the custom specification')}</strong><span>${uiLabel('The result gives a corrected plan first, then asks only for evidence still needed to production-lock it.')}</span></div><button class="btn btn-primary" type="submit" ${state.fitment.submitting ? 'disabled' : ''}>${state.fitment.submitting ? uiLabel('Calculating…') : uiLabel('Calculate specification')} ${icons.chevron}</button></div>${state.fitment.error ? `<p class="fitment-form-error">${esc(state.fitment.error)}</p>` : ''}</form>${state.fitment.result ? `${fitmentResultMarkup(state.fitment.result)}${workshopDecisionHub(project)}` : ''}<section class="fitment-lab-note"><div><p class="eyebrow">${uiLabel('Production lock')}</p><h2>${uiLabel('Calculated first. Signed off last.')}</h2></div><p>${uiLabel('The calculator resolves the wheel and tire geometry. A 100% installation commitment is shown only after the exact vehicle, component templates, dynamic measurements and named CIRUI drawing approval are attached to the saved revision.')}</p></section></div></div></div></main>`;
}

function fitmentFlowState() {
  const flow = state.fitment.flow || {};
  return {
    mode: ['style-first', 'fitment-first'].includes(flow.mode) ? flow.mode : (state.fitment.draft?.workflow_mode || 'fitment-first'),
    step: Math.min(5, Math.max(1, Number(flow.step || 1))),
    axle: flow.axle === 'rear' ? 'rear' : 'front',
    panel: flow.panel || '',
    error: flow.error || ''
  };
}

function scrollFitmentFlowTo(element, { block = 'nearest', behavior = 'auto', padding = 16 } = {}) {
  if (!element) return;
  const scroller = element.closest('.fitment-flow-scroll') || document.querySelector('.fitment-flow-scroll');
  if (!scroller) return;
  const modal = scroller.closest('.fitment-flow-modal');
  if (modal) modal.scrollTop = 0;
  const scrollerRect = scroller.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const elementTop = elementRect.top - scrollerRect.top + scroller.scrollTop;
  const elementBottom = elementTop + elementRect.height;
  let nextTop = scroller.scrollTop;
  if (block === 'start') nextTop = elementTop - padding;
  else if (block === 'end') nextTop = elementBottom - scroller.clientHeight + padding;
  else if (elementTop < scroller.scrollTop + padding) nextTop = elementTop - padding;
  else if (elementBottom > scroller.scrollTop + scroller.clientHeight - padding) nextTop = elementBottom - scroller.clientHeight + padding;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  scroller.scrollTo({
    top: Math.max(0, Math.min(nextTop, scroller.scrollHeight - scroller.clientHeight)),
    behavior: reducedMotion ? 'auto' : behavior
  });
}

function fitmentWorkflowModeLabel(mode = '') {
  return mode === 'style-first' ? uiLabel('Style first') : uiLabel('Fitment first');
}

function fitmentSelectedStyle() {
  const id = state.workshop.selectedProductId || state.fitment.draft?.selected_product_id || '';
  return products.find(item => item.id === id && item.category === 'Wheels') || null;
}

function fitmentStylePickerMarkup() {
  const selected = fitmentSelectedStyle();
  const reference = state.fitment.styleReference;
  const catalogState = state.fitment.styleCatalog || { filter: 'all', expanded: false, query: '' };
  const filter = ['all', 'monoblock', 'two-piece'].includes(catalogState.filter) ? catalogState.filter : 'all';
  const query = String(catalogState.query || '').trim();
  const normalizedQuery = query.toLocaleLowerCase();
  const allWheels = homeWheelProducts();
  const constructionWheels = allWheels.filter(item => filter === 'all' || item.construction === filter);
  const filteredWheels = constructionWheels.filter(item => !normalizedQuery || [item.name, item.catalog_display_name, item.part, item.design_family, item.finish, item.color]
    .some(value => String(value || '').toLocaleLowerCase().includes(normalizedQuery)));
  const expanded = Boolean(catalogState.expanded || query);
  const wheels = expanded ? filteredWheels : filteredWheels.slice(0, 8);
  const counts = {
    all: allWheels.length,
    monoblock: allWheels.filter(item => item.construction === 'monoblock').length,
    'two-piece': allWheels.filter(item => item.construction === 'two-piece').length
  };
  const filters = [
    { key: 'all', label: 'All wheels', copy: 'Every available design', code: 'ALL' },
    { key: 'monoblock', label: 'One-piece forged', copy: 'Lightweight single-piece construction', code: '1PC' },
    { key: 'two-piece', label: 'Two-piece forged', copy: 'Separate center and barrel', code: '2PC' }
  ];
  const toggleLabel = catalogState.expanded ? uiLabel('Show preview only') : formatUiLabel('View all {count} wheels', { count: filteredWheels.length });
  const selectionMarkup = selected
    ? `<div class="fitment-style-selection-index">01</div><span class="fitment-flow-style-image"><img src="${assetUrl(selected.image)}" alt="${esc(selected.name)}"></span><div class="fitment-style-selection-copy"><small>${uiLabel('Your current direction')}</small><strong>${esc(homePreviewShortName(selected))}</strong><span>${esc(productFinishText(selected))} · ${uiLabel(productConstructionLabel(selected))}</span></div><div class="fitment-style-selection-state"><small>${uiLabel('Selection status')}</small><strong>${icons.shield} ${uiLabel('Wheel selected')}</strong></div>`
    : reference
      ? `<div class="fitment-style-selection-index">01</div><span class="fitment-flow-style-image"><img src="${esc(reference.url)}" alt="${esc(reference.name)}"></span><div class="fitment-style-selection-copy"><small>${uiLabel('Your current direction')}</small><strong>${esc(reference.name)}</strong><span>${uiLabel('Style drawing check')}</span></div><div class="fitment-style-selection-state"><small>${uiLabel('Selection status')}</small><strong>${icons.image} ${uiLabel('Reference image selected')}</strong></div>`
      : `<div class="fitment-style-selection-index">01</div><span class="fitment-style-selection-placeholder">${icons.image}</span><div class="fitment-style-selection-copy"><small>${uiLabel('Your current direction')}</small><strong>${uiLabel('Choose a wheel')}</strong><span>${uiLabel('Pick an existing CIRUI style or upload one reference image. The style still needs its final spoke and barrel drawing check.')}</span></div><div class="fitment-style-selection-state is-required"><small>${uiLabel('Selection status')}</small><strong>${uiLabel('Required before continuing')}</strong></div>`;
  const cardMarkup = wheels.map((item, index) => {
    const isSelected = selected?.id === item.id;
    const construction = uiLabel(productConstructionLabel(item));
    return `<button type="button" class="fitment-flow-wheel ${isSelected ? 'is-selected' : ''}" data-action="fitment-select-style" data-id="${esc(item.id)}" data-construction="${esc(item.construction || 'unknown')}" aria-label="${esc(`${uiLabel('Select design')}: ${homePreviewShortName(item)}`)}" aria-pressed="${isSelected}"><span class="fitment-flow-wheel-media"><small>${construction}</small><img src="${assetUrl(item.image)}" alt="${esc(item.name)}" loading="${expanded && index < 12 ? 'eager' : 'lazy'}"><b>${icons.shield}</b></span><span class="fitment-flow-wheel-copy"><em>${esc(item.part || 'CIRUI FORGED')}</em><strong>${esc(homePreviewShortName(item))}</strong><small>${esc(productFinishText(item))}</small><span><b>${esc(productPriceText(item))}</b><i>${isSelected ? uiLabel('Selected design') : uiLabel('Select design')} ${icons.arrowRight}</i></span></span></button>`;
  }).join('');
  return `<div class="fitment-flow-style-current ${selected || reference ? '' : 'is-empty'}">${selectionMarkup}</div><section class="fitment-style-catalog ${expanded ? 'is-expanded' : ''}" data-fitment-style-catalog data-filter="${filter}" data-total="${filteredWheels.length}" data-visible="${wheels.length}"><header><div><small>${uiLabel('CIRUI wheel catalog')}</small><strong>${uiLabel('Browse every available wheel')}</strong><span>${formatUiLabel('{count} wheel designs available', { count: allWheels.length })}</span></div><b>${uiLabel('Matching designs')} <span>${filteredWheels.length}</span></b></header><div class="fitment-style-tools"><div class="fitment-style-search" role="search">${icons.search}<input type="search" data-fitment-style-search value="${esc(query)}" aria-label="${esc(uiLabel('Search the wheel catalog'))}" placeholder="${esc(uiLabel('Search wheel name or series'))}">${query ? `<button type="button" data-action="fitment-style-search-clear" aria-label="${esc(uiLabel('Clear search'))}">${icons.close}</button>` : ''}</div><div class="fitment-style-filter" role="group" aria-label="${esc(uiLabel('Filter by construction'))}">${filters.map(item => `<button type="button" class="${filter === item.key ? 'is-active' : ''}" data-action="fitment-style-filter" data-filter="${item.key}" aria-pressed="${filter === item.key}"><span>${item.code}</span><span><strong>${uiLabel(item.label)}</strong><small>${uiLabel(item.copy)}</small></span><b>${counts[item.key]}</b></button>`).join('')}</div></div><div class="fitment-style-results-head"><span><small>${uiLabel('Matching designs')}</small><strong>${formatUiLabel('Showing {visible} of {total}', { visible: wheels.length, total: filteredWheels.length })}</strong></span>${expanded && filteredWheels.length > 8 ? `<small>${uiLabel('Scroll inside the catalog to see every matching design.')}</small>` : ''}</div>${wheels.length ? `<div class="fitment-flow-wheel-grid">${cardMarkup}</div>` : `<div class="fitment-style-empty">${icons.search}<strong>${uiLabel('No wheels match this search.')}</strong><span>${uiLabel('Try another name or clear the current filters.')}</span><button type="button" class="btn btn-outline" data-action="fitment-style-search-clear">${uiLabel('Clear search')}</button></div>`}<footer><span><b>${formatUiLabel('Showing {visible} of {total}', { visible: wheels.length, total: filteredWheels.length })}</b>${filter === 'all' && counts.all > counts.monoblock + counts['two-piece'] ? `<small>${uiLabel('Unconfirmed constructions remain in All until drawing review.')}</small>` : ''}</span><div>${query ? `<button type="button" class="btn btn-outline" data-action="fitment-style-search-clear">${uiLabel('Clear search')}</button>` : ''}${filteredWheels.length > 8 ? `<button type="button" class="btn btn-dark" data-action="fitment-style-toggle" aria-expanded="${catalogState.expanded}">${toggleLabel} ${icons.chevron}</button>` : ''}</div></footer></section><div class="fitment-flow-reference-head"><span>${uiLabel('Or bring your own direction')}</span></div><label class="fitment-flow-reference"><input type="file" data-fitment-style-upload accept="image/jpeg,image/png,image/webp"><span>${icons.image}</span><div><strong>${uiLabel('Upload a reference style')}</strong><small>${uiLabel('JPG, PNG or WebP. Used as a design direction, not as dimensional evidence.')}</small></div><b>${uiLabel('Upload image')} ${icons.arrowRight}</b></label>`;
}

function fitmentStyleInlineSummaryMarkup() {
  const selected = fitmentSelectedStyle();
  const reference = state.fitment.styleReference;
  if (!selected && !reference) return '';
  const image = selected ? assetUrl(selected.image) : reference.url;
  const name = selected ? homePreviewShortName(selected) : reference.name;
  const detail = selected
    ? `${selected.part || 'CIRUI FORGED'} · ${uiLabel(productConstructionLabel(selected))}`
    : uiLabel('Reference image selected');
  const status = selected ? uiLabel('Wheel selected') : uiLabel('Reference image selected');
  return `<div class="fitment-style-inline-summary" data-fitment-selected-style aria-live="polite"><span>${uiLabel('Selected design')}</span><div><span><img src="${esc(image)}" alt="${esc(name)}" loading="eager" decoding="async" fetchpriority="high"></span><p><strong>${esc(name)}</strong><small>${esc(detail)}</small></p><b aria-label="${esc(status)}">${icons.shield}</b></div></div>`;
}

function fitmentAiFieldLabel(key = '') {
  const labels = {
    front_brake: uiLabel('Front brake kit / caliper'),
    rear_brake: uiLabel('Rear brake kit / caliper'),
    front_rotor: uiLabel('Front brake rotor'),
    rear_rotor: uiLabel('Rear brake rotor'),
    suspension: uiLabel('Suspension / coilover'),
    ride_height_drop_mm: uiLabel('Current ride-height drop (mm)'),
    front_camber_deg: `${uiLabel('Front axle')} · ${uiLabel('Camber')}`,
    rear_camber_deg: `${uiLabel('Rear axle')} · ${uiLabel('Camber')}`,
    current_front_wheel: `${uiLabel('Front axle')} · ${uiLabel('Current wheel and tire')}`,
    current_rear_wheel: `${uiLabel('Rear axle')} · ${uiLabel('Current wheel and tire')}`,
    current_front_tire: `${uiLabel('Front axle')} · ${uiLabel('Current tire size')}`,
    current_rear_tire: `${uiLabel('Rear axle')} · ${uiLabel('Current tire size')}`,
    current_wheel_unspecified: uiLabel('Current wheel (axle not specified)'),
    current_tire_unspecified: uiLabel('Current tire (axle not specified)'),
    intended_use: uiLabel('How will you use it?'),
    target_style: uiLabel('Desired installed result'),
    front_brake_id: uiLabel('Front brake kit / caliper'),
    rear_brake_id: uiLabel('Rear brake kit / caliper'),
    suspension_id: uiLabel('Suspension / coilover'),
    front_brake_part_number: `${uiLabel('Front brake kit / caliper')} · ${uiLabel('Model or part number')}`,
    rear_brake_part_number: `${uiLabel('Rear brake kit / caliper')} · ${uiLabel('Model or part number')}`,
    front_rotor_part_number: `${uiLabel('Front brake rotor')} · ${uiLabel('Model or part number')}`,
    rear_rotor_part_number: `${uiLabel('Rear brake rotor')} · ${uiLabel('Model or part number')}`,
    suspension_part_number: `${uiLabel('Suspension / coilover')} · ${uiLabel('Model or part number')}`,
    current_front_diameter: `${uiLabel('Front axle')} · ${uiLabel('Current diameter (in)')}`,
    current_front_width: `${uiLabel('Front axle')} · ${uiLabel('Current width (in)')}`,
    current_front_offset: `${uiLabel('Front axle')} · ${uiLabel('Current ET (mm)')}`,
    current_rear_diameter: `${uiLabel('Rear axle')} · ${uiLabel('Current diameter (in)')}`,
    current_rear_width: `${uiLabel('Rear axle')} · ${uiLabel('Current width (in)')}`,
    current_rear_offset: `${uiLabel('Rear axle')} · ${uiLabel('Current ET (mm)')}`,
    front_inner_clearance_mm: `${uiLabel('Front axle')} · ${uiLabel('Wheel barrel to strut clearance (mm)')}`,
    rear_inner_clearance_mm: `${uiLabel('Rear axle')} · ${uiLabel('Wheel barrel to strut clearance (mm)')}`,
    front_spoke_clearance_mm: `${uiLabel('Front axle')} · ${uiLabel('Spoke back to caliper clearance (mm)')}`,
    rear_spoke_clearance_mm: `${uiLabel('Rear axle')} · ${uiLabel('Spoke back to caliper clearance (mm)')}`,
    front_fender_clearance_mm: `${uiLabel('Front axle')} · ${uiLabel('Tire shoulder to fender clearance (mm)')}`,
    rear_fender_clearance_mm: `${uiLabel('Rear axle')} · ${uiLabel('Tire shoulder to fender clearance (mm)')}`,
    front_compression_clearance_mm: `${uiLabel('Front axle')} · ${uiLabel('Full-compression minimum clearance (mm)')}`,
    rear_compression_clearance_mm: `${uiLabel('Rear axle')} · ${uiLabel('Full-compression minimum clearance (mm)')}`,
    front_pcd: `${uiLabel('Front axle')} · PCD`,
    rear_pcd: `${uiLabel('Rear axle')} · PCD`,
    front_center_bore: `${uiLabel('Front axle')} · ${uiLabel('Center bore (mm)')}`,
    rear_center_bore: `${uiLabel('Rear axle')} · ${uiLabel('Center bore (mm)')}`
  };
  return labels[key] || key.replaceAll('_', ' ');
}

function fitmentAiMissingRecord(name = '') {
  if (!state.fitment.ai?.applied) return null;
  return (state.fitment.ai?.missingFields || []).find(item => item.name === name && item.blocking !== false) || null;
}

function fitmentAiProductionRecord(name = '') {
  if (!state.fitment.ai?.applied) return null;
  return (state.fitment.ai?.missingFields || []).find(item => item.name === name && item.blocking === false) || null;
}

function fitmentAiFieldClass(name = '') {
  return fitmentAiMissingRecord(name) ? ' class="fitment-required-missing"' : '';
}

function fitmentAiFieldHint(name = '') {
  const missing = fitmentAiMissingRecord(name);
  return missing ? `<em class="fitment-required-hint"><b>${uiLabel('Complete this field')}</b>${esc(missing.prompt || missing.reason || uiLabel('Enter or measure this value before the precision calculation.'))}</em>` : '';
}

function fitmentAiSourceUrl(value = '') {
  try {
    const url = new URL(String(value || ''), location.href);
    return /^https?:$/i.test(url.protocol) ? url.href : '';
  } catch { return ''; }
}

function fitmentAiMatchStatus(level = '') {
  return ({
    exact_part_number: uiLabel('Exact part number'),
    vehicle_family: uiLabel('Vehicle-family reference'),
    model_family: uiLabel('Model-family reference'),
    family_reference: uiLabel('Family reference'),
    not_found: uiLabel('Not found')
  })[level] || uiLabel('Reference only');
}

function fitmentAiMatchedPartMarkup(match = {}) {
  const part = match.selected;
  if (!part) return `<article class="fitment-ai-part is-empty"><div><small>${esc(fitmentAiFieldLabel(match.field))}</small><strong>${esc(match.input || uiLabel('Not found'))}</strong></div><b>${uiLabel('Not found')}</b><p>${uiLabel('No component-library match was found.')}</p></article>`;
  const hasNumber = value => value !== null && value !== undefined && String(value).trim() !== '' && Number.isFinite(Number(value));
  const parameters = [
    hasNumber(part.pistons) ? `${Number(part.pistons)} piston` : '',
    hasNumber(part.rotor_diameter_mm) ? `Ø${Number(part.rotor_diameter_mm)} mm` : '',
    hasNumber(part.rotor_thickness_mm) ? `${Number(part.rotor_thickness_mm)} mm rotor` : '',
    hasNumber(part.min_wheel_diameter_in) ? `${Number(part.min_wheel_diameter_in)} in+ wheel` : '',
    hasNumber(part.clearance_a_mm) ? `A ${Number(part.clearance_a_mm)} mm` : '',
    hasNumber(part.clearance_b_mm) ? `B ${Number(part.clearance_b_mm)} mm` : '',
    hasNumber(part.clearance_c_mm) ? `C ${Number(part.clearance_c_mm)} mm` : ''
  ].filter(Boolean);
  const sourceUrl = fitmentAiSourceUrl(part.source_url);
  return `<article class="fitment-ai-part ${match.can_autofill ? 'is-confirmed' : ''}"><div><small>${esc(fitmentAiFieldLabel(match.field))}</small><strong>${esc([part.brand, part.model].filter(Boolean).join(' '))}</strong><span>${esc(part.part_number || match.input || '')}</span></div><b>${esc(fitmentAiMatchStatus(match.match_level))}</b>${parameters.length ? `<p>${parameters.map(value => `<span>${esc(value)}</span>`).join('')}</p>` : ''}${sourceUrl ? `<a href="${esc(sourceUrl)}" target="_blank" rel="noopener noreferrer">${uiLabel('View source')} ${icons.arrowRight}</a>` : ''}</article>`;
}

function fitmentAiReferenceMarkup(plan = {}) {
  const status = ({ verified_vehicle_reference: uiLabel('Verified vehicle reference'), reference_only: uiLabel('Reference baseline'), vehicle_data_required: uiLabel('Vehicle data required') })[plan.status] || uiLabel('Reference only');
  const hasNumber = value => value !== null && value !== undefined && String(value).trim() !== '' && Number.isFinite(Number(value));
  const axle = (name, title) => {
    const data = plan[name] || {};
    return `<article><header><span>${name === 'front' ? 'F' : 'R'}</span><div><small>${title}</small><strong>${esc(data.diameter_reference || uiLabel('Measurement required'))}</strong></div></header><dl><div><dt>${uiLabel('Rotor reference')}</dt><dd>${hasNumber(data.brake_rotor_reference_mm) ? `Ø${Number(data.brake_rotor_reference_mm)} mm` : uiLabel('Pending measurements')}</dd></div><div><dt>${uiLabel('Width and ET')}</dt><dd>${esc(data.width_et_reference || uiLabel('Pending measurements'))}</dd></div><div><dt>${uiLabel('Tire reference')}</dt><dd>${esc(data.tire_reference || uiLabel('Pending measurements'))}</dd></div></dl></article>`;
  };
  return `<section class="fitment-ai-reference"><header><div><small>${uiLabel('Wheel calculation starting point')}</small><strong>${esc(status)}</strong></div><span>${uiLabel('Hub specification')} · <b>${esc(plan.pcd || '—')}</b> / CB <b>${hasNumber(plan.center_bore_mm) ? `${Number(plan.center_bore_mm)} mm` : '—'}</b></span></header><div>${axle('front', uiLabel('Front reference'))}${axle('rear', uiLabel('Rear reference'))}</div><p>${icons.shield} ${esc(plan.note || uiLabel('AI lookup is a starting point, not installation approval. Exact component drawings and physical clearance remain required before production.'))}</p></section>`;
}

function fitmentAiNotesMarkup() {
  const ai = state.fitment.ai || { loading: false, error: '', result: null, applied: false, missingFields: [] };
  const result = ai.result || null;
  const facts = result?.extracted && typeof result.extracted === 'object'
    ? Object.entries(result.extracted).filter(([, value]) => value !== null && value !== undefined && String(value).trim() !== '')
    : [];
  const matches = Array.isArray(result?.matched_parts) ? result.matched_parts : [];
  const matchedCount = matches.filter(item => item.selected).length;
  const missingFields = Array.isArray(result?.missing_fields) ? result.missing_fields : [];
  const questions = Array.isArray(result?.questions) ? result.questions : [];
  const cautions = Array.isArray(result?.cautions) ? result.cautions : [];
  const blockingFields = missingFields.filter(item => item.blocking !== false);
  const productionFields = missingFields.filter(item => item.blocking === false);
  const priorityQuestions = questions.filter(item => !/part number|料号|料號|kit code|套件.*编号|套件.*編號/i.test(item));
  const nextQuestion = priorityQuestions[0] || blockingFields[0]?.reason || uiLabel('No missing inputs were identified.');
  const factsMarkup = `<section class="fitment-ai-facts"><header><h4>${uiLabel('Calculation inputs found')}</h4><b>${facts.length}</b></header>${facts.length ? `<dl>${facts.map(([key, value]) => `<div><dt>${esc(fitmentAiFieldLabel(key))}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>` : `<p>${uiLabel('No explicit hardware facts were found yet.')}</p>`}</section>`;
  const nextMarkup = `<section class="fitment-ai-next"><header><div><small>${uiLabel('What to complete next')}</small><strong>${esc(nextQuestion)}</strong></div><b>${blockingFields.length}</b></header>${priorityQuestions.length > 1 ? `<ol>${priorityQuestions.slice(1).map(item => `<li>${esc(item)}</li>`).join('')}</ol>` : ''}<footer class="fitment-ai-apply"><div><strong>${ai.applied ? uiLabel('Recognized parts recorded') : uiLabel('Confirm the recognized component families')}</strong><span>${ai.applied ? formatUiLabel('{count} measurements remain; production evidence can be added later.', { count: blockingFields.length }) : formatUiLabel('{count} component candidates are ready to confirm.', { count: matchedCount })}</span></div><button type="button" class="btn btn-primary btn-small" data-action="fitment-ai-apply">${icons.shield}<span>${ai.applied ? uiLabel('Continue to measurements') : uiLabel('Confirm matches')}</span>${icons.arrowRight}</button></footer></section>`;
  const technicalMarkup = matches.length || result?.reference_plan ? `<details class="fitment-ai-technical"><summary><span>${icons.shield}</span><div><strong>${uiLabel('Matched component data')}</strong><small>${matchedCount} ${uiLabel('Matched component data')} · ${uiLabel('Wheel calculation starting point')}</small></div><b>${icons.chevron}</b></summary><div class="fitment-ai-technical-body">${matches.length ? `<section class="fitment-ai-matches"><h4>${uiLabel('Matched component data')}</h4><div>${matches.map(fitmentAiMatchedPartMarkup).join('')}</div></section>` : ''}${result?.reference_plan ? fitmentAiReferenceMarkup(result.reference_plan) : ''}</div></details>` : '';
  const evidenceItems = [...productionFields.map(item => item.reason || item.prompt).filter(Boolean), ...cautions];
  const evidenceMarkup = evidenceItems.length ? `<details class="fitment-ai-evidence"><summary><span>${icons.shield}</span><div><strong>${uiLabel('Production verification — add later')}</strong><small>${productionFields.length} ${uiLabel('production checks')}</small></div><b>${icons.chevron}</b></summary><ul>${[...new Set(evidenceItems)].map(item => `<li>${esc(item)}</li>`).join('')}</ul></details>` : '';
  const resultMarkup = result ? `<div class="fitment-ai-result" aria-live="polite"><div class="fitment-ai-result-head"><span>${icons.search}</span><div><small>${uiLabel('AI parameter lookup')}</small><strong>${esc(result.summary || uiLabel('Calculation inputs found'))}</strong></div><b><span>${matchedCount}</span>${uiLabel('Component candidates')}</b></div><div class="fitment-ai-priority">${factsMarkup}${nextMarkup}</div>${technicalMarkup}${evidenceMarkup}</div>` : '';
  const intakeHead = `<div class='fitment-ai-intake-head'><span>${icons.spark}</span><div><small>${uiLabel('AI parameter lookup')}</small><h3>${uiLabel('Describe the vehicle changes. AI will look up the related parameters.')}</h3><p>${uiLabel('Enter the installed brake, rotor, suspension, ride height or measurements you know. AI will match the vehicle and component library, then prepare a wheel-size starting point for the calculator.')}</p></div></div>`;
  const intakeFields = `<label><span>${uiLabel('Installed parts and measurement notes')}</span><textarea name='modification_notes' rows='4' placeholder='${esc(uiLabel('Describe installed parts, ride height and known measurements…'))}'>${fitmentDraftValue('modification_notes')}</textarea></label><div class='fitment-ai-intake-actions'><p>${icons.shield} ${uiLabel('AI looks up reference data and fills confirmed inputs. Final width, ET and tire are calculated from the remaining measurements.')}</p><button type='button' class='btn btn-dark fitment-ai-lookup-button ${ai.loading ? 'is-loading' : ''}' data-action='fitment-ai-interpret' aria-busy='${ai.loading}' ${ai.loading ? 'disabled' : ''}>${ai.loading ? '<span class="fitment-ai-spinner" aria-hidden="true"><i></i></span>' : icons.search}<span>${ai.loading ? uiLabel('Searching vehicle and component data…') : uiLabel('Search parameters with AI')}</span></button></div>${ai.error ? `<p class='fitment-ai-error'>${esc(ai.error)}</p>` : ''}`;
  const editorMarkup = result ? `<details class='fitment-ai-query-editor'><summary><span>${icons.search}</span><div><strong>${uiLabel('Workshop note used for this lookup')}</strong><small>${esc(String(state.fitment.draft?.modification_notes || '').slice(0, 120))}</small></div><b>${uiLabel('Edit and search again')}</b></summary><div>${intakeFields}</div></details>` : intakeFields;
  const intakeBody = `${intakeHead}${editorMarkup}${resultMarkup}`;
  if (ai.applied) return `<details class='fitment-ai-intake is-applied'><summary class='fitment-ai-applied-summary'><span>${icons.shield}</span><div><small>${uiLabel('AI intake completed')}</small><strong>${esc(result?.summary || uiLabel('Recognized parts recorded'))}</strong></div><b>${uiLabel('View or edit analysis')}</b></summary><div class='fitment-ai-intake-body'>${intakeBody}</div></details>`;
  return `<section class='fitment-ai-intake'>${intakeBody}</section>`;
}

function fitmentAxleTabsMarkup(activeAxle = 'front') {
  const complete = axle => [state.fitment.draft?.[`current_${axle}_width`], state.fitment.draft?.[`current_${axle}_offset`], state.fitment.draft?.[`current_${axle}_tire`]].filter(value => String(value || '').trim()).length;
  return `<div class="fitment-flow-axle-tabs" role="tablist"><button type="button" role="tab" aria-selected="${activeAxle === 'front'}" class="${activeAxle === 'front' ? 'is-active' : ''}" data-action="fitment-wizard-axle" data-axle="front"><span>${uiLabel('Front')}</span><small>${complete('front')}/3</small></button><button type="button" role="tab" aria-selected="${activeAxle === 'rear'}" class="${activeAxle === 'rear' ? 'is-active' : ''}" data-action="fitment-wizard-axle" data-axle="rear"><span>${uiLabel('Rear')}</span><small>${complete('rear')}/3</small></button></div>`;
}

function fitmentCurrentMeasureFields(axle = 'front') {
  const missingLabel = name => fitmentAiFieldClass(name);
  const missingHint = name => fitmentAiFieldHint(name);
  return `${fitmentAxleTabsMarkup(axle)}<div class="fitment-flow-section"><div class="fitment-flow-section-head"><div><small>${axle === 'front' ? uiLabel('Front axle') : uiLabel('Rear axle')}</small><h3>${uiLabel('Current wheel and tire')}</h3></div><button type="button" class="btn btn-outline btn-small" data-action="fitment-measurement-help">${icons.image} ${uiLabel('How to measure')}</button></div><div class="fitment-flow-fields fitment-flow-fields-five"><label${missingLabel(`current_${axle}_diameter`)}><span>${uiLabel('Current diameter (in)')}</span><input name="current_${axle}_diameter" type="number" step="0.1" min="12" max="30" value="${fitmentDraftValue(`current_${axle}_diameter`)}" placeholder="18">${missingHint(`current_${axle}_diameter`)}</label><label${missingLabel(`current_${axle}_width`)}><span>${uiLabel('Current width (in)')}</span><input name="current_${axle}_width" type="number" step="0.1" min="4" max="16" value="${fitmentDraftValue(`current_${axle}_width`)}" placeholder="8.0">${missingHint(`current_${axle}_width`)}</label><label${missingLabel(`current_${axle}_offset`)}><span>${uiLabel('Current ET (mm)')}</span><input name="current_${axle}_offset" type="number" step="0.1" value="${fitmentDraftValue(`current_${axle}_offset`)}" placeholder="34">${missingHint(`current_${axle}_offset`)}</label><label><span>${uiLabel('Current spacer (mm)')}</span><input name="current_${axle}_spacer_mm" type="number" step="0.5" min="0" value="${fitmentDraftValue(`current_${axle}_spacer_mm`)}" placeholder="0"></label><label${missingLabel(`current_${axle}_tire`)}><span>${uiLabel('Current tire size')}</span><input name="current_${axle}_tire" value="${fitmentDraftValue(`current_${axle}_tire`)}" placeholder="225/45R18">${missingHint(`current_${axle}_tire`)}</label></div></div><div class="fitment-flow-section"><div class="fitment-flow-section-head"><div><small>${uiLabel('Predicted clearance')}</small><h3>${uiLabel('Clearance and alignment')}</h3></div></div><div class="fitment-flow-fields"><label${missingLabel(`${axle}_inner_clearance_mm`)}><span>${uiLabel('Wheel barrel to strut clearance (mm)')}</span><small>${uiLabel('Current wheel barrel to strut or spring perch; use the smallest gap.')}</small><input name="${axle}_inner_clearance_mm" type="number" step="0.5" min="0" value="${fitmentDraftValue(`${axle}_inner_clearance_mm`)}" placeholder="12">${missingHint(`${axle}_inner_clearance_mm`)}</label><label${missingLabel(`${axle}_spoke_clearance_mm`)}><span>${uiLabel('Spoke back to caliper clearance (mm)')}</span><small>${uiLabel('Current spoke back to the caliper highest point; the final wheel still needs its 1:1 template.')}</small><input name="${axle}_spoke_clearance_mm" type="number" step="0.5" min="0" value="${fitmentDraftValue(`${axle}_spoke_clearance_mm`)}" placeholder="6">${missingHint(`${axle}_spoke_clearance_mm`)}</label><label${missingLabel(`${axle}_fender_clearance_mm`)}><span>${uiLabel('Tire shoulder to fender clearance (mm)')}</span><small>${uiLabel('Current tire shoulder to the inner fender lip at steering lock or axle load.')}</small><input name="${axle}_fender_clearance_mm" type="number" step="0.5" min="0" value="${fitmentDraftValue(`${axle}_fender_clearance_mm`)}" placeholder="15">${missingHint(`${axle}_fender_clearance_mm`)}</label><label${missingLabel(`${axle}_compression_clearance_mm`)}><span>${uiLabel('Full-compression minimum clearance (mm)')}</span><small>${uiLabel('Current minimum through usable suspension travel, with steering lock where applicable.')}</small><input name="${axle}_compression_clearance_mm" type="number" step="0.5" min="0" value="${fitmentDraftValue(`${axle}_compression_clearance_mm`)}" placeholder="15">${missingHint(`${axle}_compression_clearance_mm`)}</label><label${missingLabel(`${axle}_camber_deg`)}><span>${uiLabel('Camber (deg)')}</span><small>${uiLabel('Use the current alignment printout; negative means the top leans inward.')}</small><input name="${axle}_camber_deg" type="number" step="0.1" value="${fitmentDraftValue(`${axle}_camber_deg`)}" placeholder="-1.5">${missingHint(`${axle}_camber_deg`)}</label><label><span>${uiLabel('Toe (deg)')}</span><small>${uiLabel('Use total toe for this axle from the current alignment printout.')}</small><input name="${axle}_toe_deg" type="number" step="0.01" value="${fitmentDraftValue(`${axle}_toe_deg`)}" placeholder="0.00"></label></div></div>`;
}

function fitmentTargetFields(axle = 'front') {
  const missingLabel = name => fitmentAiFieldClass(name);
  const missingHint = name => fitmentAiFieldHint(name);
  return `${fitmentAxleTabsMarkup(axle)}<div class="fitment-flow-section"><div class="fitment-flow-section-head"><div><small>${axle === 'front' ? uiLabel('Front axle') : uiLabel('Rear axle')}</small><h3>${uiLabel('Optional preferred wheel')}</h3></div><span>${uiLabel('Unknown target values may stay blank. Exact tire approval data makes a proposal stronger.')}</span></div><div class="fitment-flow-fields"><label><span>${uiLabel('Target diameter (in)')}</span><input name="${axle}_diameter" type="number" step="0.1" min="12" max="30" value="${fitmentDraftValue(`${axle}_diameter`)}" placeholder="19"></label><label><span>${uiLabel('Target width (in)')}</span><input name="${axle}_width" type="number" step="0.1" min="4" max="16" value="${fitmentDraftValue(`${axle}_width`)}" placeholder="9.0"></label><label><span>${uiLabel('Requested ET (optional)')}</span><small>${uiLabel('Leave blank to calculate; positive ET moves the wheel inward.')}</small><input name="${axle}_offset" type="number" step="0.1" value="${fitmentDraftValue(`${axle}_offset`)}" placeholder="${uiLabel('Pending measurements')}"></label><label${missingLabel(`${axle}_pcd`)}><span>PCD</span><input name="${axle}_pcd" value="${fitmentDraftValue(`${axle}_pcd`)}" placeholder="5x112">${missingHint(`${axle}_pcd`)}</label><label${missingLabel(`${axle}_center_bore`)}><span>${uiLabel('Center bore (mm)')}</span><input name="${axle}_center_bore" type="number" step="0.1" value="${fitmentDraftValue(`${axle}_center_bore`)}" placeholder="72.6">${missingHint(`${axle}_center_bore`)}</label><label><span>${uiLabel('Final spacer (normally 0 mm)')}</span><input name="${axle}_spacer_mm" type="number" step="0.5" min="0" value="${fitmentDraftValue(`${axle}_spacer_mm`)}" placeholder="0"></label></div></div><details class="fitment-flow-advanced" open><summary><span>${icons.chevron}</span><div><strong>${uiLabel('Tire approval data')}</strong><small>${uiLabel('Use the exact tire maker data sheet. Size alone is not enough for a production-locked wheel width.')}</small></div></summary><div class="fitment-flow-fields"><label><span>${uiLabel('Target tire size')}</span><input name="${axle}_tire" value="${fitmentDraftValue(`${axle}_tire`)}" placeholder="255/35R19"></label><label><span>${uiLabel('Tire manufacturer')}</span><input name="${axle}_tire_maker" value="${fitmentDraftValue(`${axle}_tire_maker`)}" placeholder="Michelin"></label><label><span>${uiLabel('Tire model')}</span><input name="${axle}_tire_model" value="${fitmentDraftValue(`${axle}_tire_model`)}" placeholder="Pilot Sport 4 S"></label><label><span>${uiLabel('Load index')}</span><input name="${axle}_tire_load_index" value="${fitmentDraftValue(`${axle}_tire_load_index`)}" placeholder="96"></label><label><span>${uiLabel('Speed rating')}</span><input name="${axle}_tire_speed_rating" value="${fitmentDraftValue(`${axle}_tire_speed_rating`)}" placeholder="Y"></label><label><span>${uiLabel('Maker-approved rim width (in)')}</span><div class="fitment-range-inputs"><input name="${axle}_tire_rim_min" type="number" min="3" max="20" step="0.5" value="${fitmentDraftValue(`${axle}_tire_rim_min`)}" placeholder="8.5"><b>-</b><input name="${axle}_tire_rim_max" type="number" min="3" max="20" step="0.5" value="${fitmentDraftValue(`${axle}_tire_rim_max`)}" placeholder="10"></div></label><label><span>${uiLabel('Tire fitment style')}</span><select name="${axle}_tire_fitment_style"><option value="" ${!state.fitment.draft?.[`${axle}_tire_fitment_style`] ? 'selected' : ''}>${uiLabel('Not specified')}</option><option value="standard" ${state.fitment.draft?.[`${axle}_tire_fitment_style`] === 'standard' ? 'selected' : ''}>${uiLabel('Standard tire')}</option><option value="mild-stretch" ${state.fitment.draft?.[`${axle}_tire_fitment_style`] === 'mild-stretch' ? 'selected' : ''}>${uiLabel('Mild stretch')}</option><option value="aggressive-stretch" ${state.fitment.draft?.[`${axle}_tire_fitment_style`] === 'aggressive-stretch' ? 'selected' : ''}>${uiLabel('Aggressive stretch')}</option></select></label></div></details>`;
}

function fitmentAiComponentDetailsMarkup() {
  const definitions = [
    ['front_brake', 'front_brake_id', uiLabel('Front brake kit / caliper')],
    ['rear_brake', 'rear_brake_id', uiLabel('Rear brake kit / caliper')],
    ['front_rotor', 'front_rotor_id', uiLabel('Front brake rotor')],
    ['rear_rotor', 'rear_rotor_id', uiLabel('Rear brake rotor')],
    ['suspension', 'suspension_id', uiLabel('Suspension / coilover')]
  ];
  const draft = state.fitment.draft || {};
  const rows = definitions.map(([key, idField, label]) => {
    const detail = String(draft[`${key}_detail`] || state.fitment.ai?.result?.extracted?.[key] || '').trim();
    const partNumber = String(draft[`${key}_part_number`] || '').trim();
    const selected = fitmentPartRecord(draft[idField]);
    const pending = fitmentAiProductionRecord(`${key}_part_number`);
    if (!detail && !partNumber && !selected && !pending) return '';
    const identity = detail || fitmentPartLabel(selected, key === 'suspension' ? 'suspension' : key.includes('rotor') ? 'rotor' : 'brake');
    return `<article class='fitment-production-record'><input type='hidden' name='${key}_detail' value='${esc(detail)}'><div><small>${label}</small><strong>${esc(identity)}</strong><span>${selected ? esc(fitmentPartLabel(selected)) : uiLabel('Recognized from workshop notes')}</span></div><label><span>${uiLabel('Exact manufacturer kit code')}</span><small>${uiLabel('Optional now — required only before production approval')}</small><input name='${key}_part_number' value='${esc(partNumber)}' placeholder='${esc(uiLabel('Enter the marking on the caliper, rotor or kit label'))}'></label></article>`;
  }).filter(Boolean);
  if (!rows.length) return '';
  return `<details class='fitment-flow-advanced fitment-ai-component-details fitment-production-details'><summary><span>${icons.chevron}</span><div><strong>${uiLabel('Production verification — add later')}</strong><small>${uiLabel('The recognized description is already saved. Add an exact code or template only when preparing the production drawing.')}</small></div><b>${rows.length}</b></summary><div>${rows.join('')}</div></details>`;
}

function fitmentInstalledPartsMarkup() {
  const draft = state.fitment.draft || {};
  const secondarySelected = ['front_rotor_id', 'rear_rotor_id', 'suspension_id'].filter(name => String(draft[name] || '').trim()).length;
  const secondaryOpen = secondarySelected > 0 || ['front_rotor', 'rear_rotor', 'suspension'].some(key => state.fitment.ai?.result?.extracted?.[key]);
  return `<section class='fitment-installed-workspace'><header><div><small>${uiLabel('Installed hardware')}</small><h3>${uiLabel('Confirm the parts, not the same text twice.')}</h3></div><p>${uiLabel('AI candidates are recorded when you confirm them. Search only when a suggestion needs correction.')}</p></header><div class='fitment-installed-primary'>${fitmentPartPickerMarkup({ name: 'front_brake_id', type: 'brake', label: uiLabel('Front brake kit / caliper'), selected: draft.front_brake_id })}${fitmentPartPickerMarkup({ name: 'rear_brake_id', type: 'brake', label: uiLabel('Rear brake kit / caliper'), selected: draft.rear_brake_id })}</div><details class='fitment-installed-secondary' ${secondaryOpen ? 'open' : ''}><summary><span>${icons.chevron}</span><div><strong>${uiLabel('Rotors, suspension and ride height')}</strong><small>${uiLabel('Open only when these parts or measurements changed.')}</small></div><b>${secondarySelected}</b></summary><div class='fitment-installed-secondary-grid'>${fitmentPartPickerMarkup({ name: 'front_rotor_id', type: 'rotor', label: uiLabel('Front brake rotor'), selected: draft.front_rotor_id })}${fitmentPartPickerMarkup({ name: 'rear_rotor_id', type: 'rotor', label: uiLabel('Rear brake rotor'), selected: draft.rear_rotor_id })}${fitmentPartPickerMarkup({ name: 'suspension_id', type: 'suspension', label: uiLabel('Suspension / coilover'), selected: draft.suspension_id })}<label${fitmentAiFieldClass('ride_height_drop_mm')}><span>${uiLabel('Current ride-height drop (mm)')}</span><small>${uiLabel('Use the measured drop; leave blank for factory height.')}</small><input name='ride_height_drop_mm' type='number' step='1' min='0' value='${fitmentDraftValue('ride_height_drop_mm')}' placeholder='0'>${fitmentAiFieldHint('ride_height_drop_mm')}</label><label><span>${uiLabel('Current stance / ride-height profile')}</span><select name='stance_profile'><option value='oem' ${draft.stance_profile === 'oem' ? 'selected' : ''}>${uiLabel('Factory original / exact trim')}</option><option value='lowered' ${draft.stance_profile === 'lowered' ? 'selected' : ''}>${uiLabel('Lowered street')}</option><option value='static-low' ${draft.stance_profile === 'static-low' ? 'selected' : ''}>${uiLabel('Static low / stance')}</option><option value='air-low' ${draft.stance_profile === 'air-low' ? 'selected' : ''}>${uiLabel('Air suspension low')}</option><option value='track' ${draft.stance_profile === 'track' ? 'selected' : ''}>${uiLabel('Track alignment')}</option></select></label></div></details></section>`;
}

function fitmentWorkshopCalibrationMarkup() {
  const draft = state.fitment.draft || {};
  return `<details class='fitment-flow-advanced'><summary><span>${icons.chevron}</span><div><strong>${uiLabel('Shop experience and calibration')}</strong><small>${uiLabel('Experience is useful as a starting point. Production lock still follows the exact vehicle, current modifications, tire approval and measured clearance.')}</small></div></summary><div class='fitment-flow-fields fitment-flow-fields-two'><label><span>${uiLabel('Candidate specification source')}</span><select name='calibration_basis'><option value='current_vehicle_measured' ${draft.calibration_basis === 'current_vehicle_measured' ? 'selected' : ''}>${uiLabel('Measured on this vehicle')}</option><option value='same_vehicle_successful_install' ${draft.calibration_basis === 'same_vehicle_successful_install' ? 'selected' : ''}>${uiLabel('Previous successful install on matching vehicle')}</option><option value='manufacturer_drawing' ${draft.calibration_basis === 'manufacturer_drawing' ? 'selected' : ''}>${uiLabel('Manufacturer drawing / application')}</option><option value='shop_experience' ${draft.calibration_basis === 'shop_experience' ? 'selected' : ''}>${uiLabel('Shop experience candidate')}</option></select></label><label><span>${uiLabel('Reference build / calibration note')}</span><input name='calibration_reference' value='${fitmentDraftValue('calibration_reference')}' placeholder='${esc(uiLabel('Example: 2022 C43, same brakes, 19x9 ET38'))}'></label></div></details>`;
}

function fitmentWizardStepMarkup(flow) {
  const draft = state.fitment.draft || {};
  if (flow.step === 1) return `<div class="fitment-flow-step-copy"><small>01</small><h2>${flow.mode === 'style-first' ? uiLabel('Select the starting direction.') : uiLabel('Tell us the job and intended result.')}</h2><p>${flow.mode === 'style-first' ? uiLabel('Pick an existing CIRUI style or upload one reference image. The style still needs its final spoke and barrel drawing check.') : uiLabel('These choices control which safety margins and questions the calculator uses.')}</p></div>${flow.mode === 'style-first' ? fitmentStylePickerMarkup() : ''}<div class="fitment-flow-fields" data-fitment-style-continuation><label><span>${uiLabel('Project name')}</span><input name="project_title" value="${esc(draft.project_title || '')}" placeholder="${esc(uiLabel('Example: C43 street setup'))}"></label><label><span>${uiLabel('Customer reference')}</span><input name="customer_reference" value="${esc(draft.customer_reference || '')}" placeholder="${esc(uiLabel('Example: Chris / ticket 024'))}"></label><label><span>${uiLabel('How will you use it?')}</span><select name="usage"><option value="street" ${draft.usage === 'street' ? 'selected' : ''}>${uiLabel('Daily street')}</option><option value="spirited" ${draft.usage === 'spirited' ? 'selected' : ''}>${uiLabel('Spirited road')}</option><option value="show" ${draft.usage === 'show' ? 'selected' : ''}>${uiLabel('Show / stance')}</option><option value="track" ${draft.usage === 'track' ? 'selected' : ''}>${uiLabel('Track / competition')}</option></select></label><label><span>${uiLabel('Desired installed result')}</span><select name="fitment_goal"><option value="oem_safe" ${draft.fitment_goal === 'oem_safe' ? 'selected' : ''}>${uiLabel('OEM-safe street')}</option><option value="flush_street" ${draft.fitment_goal === 'flush_street' ? 'selected' : ''}>${uiLabel('Flush street')}</option><option value="performance" ${draft.fitment_goal === 'performance' ? 'selected' : ''}>${uiLabel('Performance / track')}</option><option value="show" ${draft.fitment_goal === 'show' ? 'selected' : ''}>${uiLabel('Show / low stance')}</option></select></label>${flow.mode === 'style-first' ? fitmentStyleInlineSummaryMarkup() : ''}</div>`;
  if (flow.step === 2) return `<div class="fitment-flow-step-copy"><small>02</small><h2>${uiLabel('Identify the exact vehicle.')}</h2><p>${uiLabel('Use the VIN or manufacturer build record when trim, market or factory options are uncertain.')}</p></div>${fitmentVehicleSelector()}${fitmentVehicleReferenceMarkup()}${fitmentVinLookupMarkup()}`;
  if (flow.step === 3) return `<div class='fitment-flow-step-copy'><small>03</small><h2>${uiLabel('Confirm the installed hardware.')}</h2><p>${uiLabel('AI identifies a component family; the workshop confirms the record. Exact codes and templates are collected later for production approval.')}</p></div>${fitmentAiNotesMarkup()}${fitmentInstalledPartsMarkup()}${fitmentAiComponentDetailsMarkup()}${fitmentWorkshopCalibrationMarkup()}`;
  if (flow.step === 4) return `<div class="fitment-flow-step-copy"><small>04</small><h2>${uiLabel('Measure one axle at a time.')}</h2><p>${uiLabel('Switch between front and rear. Values are saved immediately while you work.')}</p></div>${fitmentCurrentMeasureFields(flow.axle)}`;
  const vehicle = state.fitment.vehicle || {};
  const vehicleLabel = [vehicle.year, vehicle.make, vehicle.model, vehicle.trim, vehicle.drive].filter(Boolean).join(' ') || uiLabel('Vehicle not selected');
  const selected = fitmentSelectedStyle();
  return `<div class="fitment-flow-step-copy"><small>05</small><h2>${uiLabel('Set the target, or leave it for the calculator.')}</h2><p>${uiLabel('Unknown target values may stay blank. Exact tire approval data makes a proposal stronger.')}</p></div>${fitmentTargetFields(flow.axle)}<div class="fitment-flow-review"><div><small>${uiLabel('Exact vehicle')}</small><strong>${esc(vehicleLabel)}</strong></div><div><small>${fitmentWorkflowModeLabel(flow.mode)}</small><strong>${esc(selected ? homePreviewShortName(selected) : state.fitment.styleReference?.name || uiLabel('Fitment proposals'))}</strong></div><span>${icons.shield}<b>${uiLabel('Review and calculate')}</b>${uiLabel('The calculator will only mark a proposal selectable when the entered hard constraints do not conflict.')}</span></div>`;
}

function fitmentMeasurementGuideMarkup() {
  const rows = [[uiLabel('Inner barrel to suspension'), uiLabel('Measure the smallest gap from the wheel barrel or tire to the strut body and spring perch.')], [uiLabel('Spoke back to caliper'), uiLabel('Use the caliper highest point and keep the final 1:1 brake template for drawing approval.')], [uiLabel('Tire shoulder to fender'), uiLabel('Front axle is checked at steering lock; rear axle is checked under realistic load.')], [uiLabel('Full travel minimum'), uiLabel('Check the minimum gap through usable suspension travel, not only at static ride height.')]];
  return `<div class="fitment-flow-guide"><div class="fitment-flow-guide-head"><div><small>${uiLabel('Measurement guide')}</small><h3>${uiLabel('How to measure')}</h3></div><button type="button" class="icon-btn" data-action="fitment-guide-close" aria-label="${esc(uiLabel('Close'))}">${icons.close}</button></div><p>${uiLabel('Measure the smallest real gap on the currently installed setup. Do not estimate from a photo.')}</p><div>${rows.map(([title, copy], index) => `<article><span>0${index + 1}</span><div><strong>${title}</strong><p>${copy}</p></div></article>`).join('')}</div></div>`;
}

function fitmentWizardModalMarkup() {
  const flow = fitmentFlowState();
  const stepLabels = [uiLabel('Build brief'), uiLabel('Exact vehicle'), uiLabel('Installed hardware'), uiLabel('Current measurements'), uiLabel('Target and tires')];
  return `<div class="fitment-flow-overlay" data-action="fitment-wizard-close"><section class="fitment-flow-modal" role="dialog" aria-modal="true" aria-label="${esc(uiLabel('Custom wheel fitment calculator.'))}" data-modal-content><header class="fitment-flow-header"><div><span class="fitment-flow-brand"><i></i> CIRUI</span><small>${fitmentWorkflowModeLabel(flow.mode)}</small></div><button type="button" class="icon-btn" data-action="fitment-wizard-close" aria-label="${esc(uiLabel('Close fitment workspace'))}">${icons.close}</button></header><nav class="fitment-flow-progress" aria-label="Progress">${stepLabels.map((label, index) => `<button type="button" class="${flow.step === index + 1 ? 'is-active' : flow.step > index + 1 ? 'is-complete' : ''}" data-action="fitment-wizard-step" data-step="${index + 1}" ${index + 1 > flow.step ? 'disabled' : ''}><span>${flow.step > index + 1 ? '✓' : index + 1}</span><small>${label}</small></button>`).join('')}</nav><form class="fitment-flow-form" data-form="fitment-wizard" data-step="${flow.step}"><div class="fitment-flow-scroll">${fitmentWizardStepMarkup(flow)}${flow.error ? `<p class="fitment-flow-error">${esc(flow.error)}</p>` : ''}</div><footer class="fitment-flow-footer"><div><small>${uiLabel('Step')} ${flow.step} / 5</small><span><i style="width:${flow.step * 20}%"></i></span></div><div>${flow.step > 1 ? `<button type="button" class="btn btn-outline" data-action="fitment-wizard-back">${icons.arrowLeft} ${uiLabel('Back')}</button>` : ''}${flow.step < 5 ? `<button type="button" class="btn btn-primary" data-action="fitment-wizard-next">${uiLabel('Next')} ${icons.arrowRight}</button>` : `<button class="btn btn-primary" type="submit" ${state.fitment.submitting ? 'disabled' : ''}>${state.fitment.submitting ? uiLabel('Calculating proposals…') : uiLabel('Calculate 1–3 proposals')} ${icons.arrowRight}</button>`}</div></footer></form>${flow.panel === 'measurements' ? fitmentMeasurementGuideMarkup() : ''}</section></div>`;
}

function fitmentPage() {
  const result = state.fitment.result;
  const current = workshopCurrentProjectView();
  const vehicle = state.fitment.vehicle || {};
  const vehicleLabel = [vehicle.year, vehicle.make, vehicle.model, vehicle.trim, vehicle.drive].filter(Boolean).join(' ');
  const projectLabel = vehicleLabel || current?.title || uiLabel('New customer build');
  const stageLabel = result ? fitmentSolutionStageLabel(result.solution?.stage) : uiLabel('Awaiting first calculation');
  const process = [[uiLabel('Exact vehicle'), 'VIN / TRIM / DRIVE'], [uiLabel('Installed hardware'), 'BRAKE / SUSPENSION'], [uiLabel('Current measurements'), 'INNER / OUTER / TRAVEL'], [uiLabel('Fitment proposals'), '1-3 / SAVE / QUOTE']];
  const paths = [
    {
      mode: 'style-first',
      icon: icons.image,
      eyebrow: uiLabel('A wheel style or reference'),
      title: uiLabel('Start from a style'),
      description: uiLabel('Choose a CIRUI wheel or upload a reference image first.'),
      next: uiLabel('Then validate it against the exact vehicle and measured setup.')
    },
    {
      mode: 'fitment-first',
      icon: icons.shield,
      eyebrow: uiLabel('Vehicle data and measurements'),
      title: uiLabel('Start from vehicle data'),
      description: uiLabel('Enter the vehicle, modifications and measurements first.'),
      next: uiLabel('Then compare styles that can support the calculated result.')
    }
  ];
  const pathMarkup = paths.map((path, index) => `<button type="button" class="fitment-entry-path" data-action="fitment-start" data-mode="${path.mode}" aria-describedby="fitment-path-${index + 1}-description"><header><span class="fitment-entry-path-icon">${path.icon}</span><span class="fitment-entry-path-tag"><small>${uiLabel('Route')} ${String.fromCharCode(65 + index)}</small><strong>${path.eyebrow}</strong></span><span class="fitment-entry-path-arrow">${icons.arrowRight}</span></header><div class="fitment-entry-path-copy"><h3>${path.title}</h3><p id="fitment-path-${index + 1}-description">${path.description}</p><span>${icons.shield}<b>${path.next}</b></span></div><footer><span>${uiLabel('Choose this route')}</span><strong>${path.title} ${icons.arrowRight}</strong></footer></button>`).join('');
  return `<main class="fitment-entry-page"><section class="fitment-entry-workspace"><div class="container"><header class="fitment-entry-head"><div class="fitment-entry-copy"><p class="custom-kicker">CIRUI <span>${uiLabel('CIRUI Workshop Lab')}</span></p><h1>${uiLabel('Custom wheel fitment calculator.')}</h1><p>${uiLabel('Enter the exact vehicle, brake and suspension modifications, measured clearances and intended result. The calculator checks PCD and center bore, calculates wheel width, offset and compatible tires, then returns 1–3 proposals ready to save, share or quote. Built for OEM upgrades, big-brake conversions, flush or stance setups and track use.')}</p></div><div class="fitment-entry-continuity">${icons.shield}<span><strong>${uiLabel('One record follows both workflows.')}</strong><small>${uiLabel('Switching the starting route never discards the vehicle, modification or measurement history.')}</small></span></div></header><div class="fitment-entry-layout"><section class="fitment-entry-primary" aria-label="${esc(uiLabel('Choose how this build starts.'))}"><div class="fitment-entry-choice-head"><div><small>${uiLabel('Choose how this build starts.')}</small><h2>${uiLabel('What do you have right now?')}</h2></div><p>${uiLabel('Choose either route. Both use the same engineering record and lead to the same checked result.')}</p></div><div class="fitment-entry-paths" role="group" aria-label="${esc(uiLabel('Choose how this build starts.'))}">${pathMarkup}</div><div class="fitment-entry-process">${process.map(([title, meta], index) => `<span><b>0${index + 1}</b><strong>${title}</strong><small>${meta}</small></span>`).join('')}</div></section><aside class="fitment-entry-status"><header><span>${icons.shield}</span><div><small>${uiLabel('Current engineering file')}</small><strong>${esc(projectLabel)}</strong></div></header><dl><div><dt>${uiLabel('Calculation status')}</dt><dd>${esc(stageLabel)}</dd></div><div><dt>${uiLabel('Current revision')}</dt><dd>${result ? `#${String(current?.revision || 1).padStart(2, '0')}` : '—'}</dd></div></dl>${result ? `<a class="btn btn-dark" href="/fitment-lab/result" data-app-path>${uiLabel('View latest result')} ${icons.arrowRight}</a>` : `<p class="fitment-entry-status-empty">${uiLabel('Start a fitment workflow to create the first checked proposal.')}</p>`}</aside></div><div class="fitment-entry-account">${state.account ? workshopProjectBarMarkup() : workshopGuestBarMarkup()}</div></div></section></main>`;
}

function fitmentWorkspaceHasData() {
  if (state.fitment.result || state.fitment.vehicle || state.vehicle || state.workshop.currentProject || state.workshop.selectedProductId || state.fitment.selectedPackageId || state.fitment.styleReference) return true;
  const defaults = new Map([
    ['usage', 'street'],
    ['stance_profile', 'oem'],
    ['installation_outcome', 'candidate'],
    ['workflow_mode', 'fitment-first']
  ]);
  return Object.entries(state.fitment.draft || {}).some(([key, value]) => {
    if (value === null || value === undefined || value === '' || value === false) return false;
    if (Number(value) === 0 && String(value).trim() !== '') return false;
    if (defaults.has(key) && defaults.get(key) === value) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return Object.keys(value).length > 0;
    return true;
  });
}

function fitmentEntryStatusMarkup() {
  if (!fitmentWorkspaceHasData()) {
    return `<aside class="fitment-entry-status is-empty" aria-live="polite"><header><span>${icons.shield}</span><div><small>${uiLabel('Engineering workspace')}</small><strong>${uiLabel('No current build yet')}</strong></div></header><p class="fitment-entry-status-empty">${uiLabel('Your vehicle, measurements and calculation result will appear here after you begin.')}</p></aside>`;
  }
  const result = state.fitment.result;
  const current = state.workshop.currentProject;
  const vehicle = state.fitment.vehicle || current?.vehicle || state.vehicle || {};
  const vehicleLabel = [vehicle.year, vehicle.make, vehicle.model, vehicle.trim, vehicle.drive].filter(Boolean).join(' ');
  const projectLabel = vehicleLabel || state.fitment.draft?.project_title || current?.title || uiLabel('New customer build');
  const stageLabel = result ? fitmentSolutionStageLabel(result.solution?.stage) : uiLabel('Awaiting first calculation');
  const revision = current?.revision || (result ? 1 : 0);
  return `<aside class="fitment-entry-status has-current-build" aria-live="polite"><header><span>${icons.shield}</span><div><small>${uiLabel('Current engineering file')}</small><strong>${esc(projectLabel)}</strong></div><button type="button" class="fitment-entry-clear" data-action="fitment-clear-open" title="${esc(uiLabel('Clear current build'))}" aria-label="${esc(uiLabel('Clear current build'))}">${icons.close}<b>${uiLabel('Clear')}</b></button></header><dl><div><dt>${uiLabel('Calculation status')}</dt><dd>${esc(stageLabel)}</dd></div><div><dt>${uiLabel('Current revision')}</dt><dd>${revision ? `#${String(revision).padStart(2, '0')}` : '—'}</dd></div></dl>${result ? `<a class="btn btn-dark" href="/fitment-lab/result" data-app-path>${uiLabel('View latest result')} ${icons.arrowRight}</a>` : `<p class="fitment-entry-status-empty">${uiLabel('Start a fitment workflow to create the first checked proposal.')}</p>`}</aside>`;
}

function syncFitmentEntryStatus() {
  const status = document.querySelector('.fitment-entry-status');
  if (state.route.name === 'fitment' && status) status.outerHTML = fitmentEntryStatusMarkup();
}

function fitmentProposalList(result = state.fitment.result) {
  const proposals = Array.isArray(result?.solution?.packages) ? result.solution.packages : [];
  if (proposals.length) return proposals.slice(0, 3);
  if (!result?.axles) return [];
  const blocked = result.status === 'conflict'
    || ['identity_required', 'correction_required'].includes(result.solution?.stage)
    || result.solution?.has_verified_hub !== true
    || result.solution?.has_starting_envelope !== true
    || result.solution?.has_calculated_geometry !== true;
  return [{
    id: 'current-plan',
    profile: result.solution?.stage === 'correction_required' ? 'corrected' : 'customer_target',
    recommended: true,
    selectable: !blocked,
    axles: Object.fromEntries(['front', 'rear'].map(axle => [axle, { recommendation: result.axles?.[axle]?.recommendation || {}, geometry: result.axles?.[axle]?.geometry || {} }]))
  }];
}

function fitmentProposalLabel(proposal = {}) {
  return ({ balanced: uiLabel('Balanced clearance'), flush: uiLabel('Flush appearance'), requested: uiLabel('Customer target'), customer_target: uiLabel('Customer target'), corrected: uiLabel('Corrected starting point') })[proposal.profile] || uiLabel('Recommended starting specification');
}

function fitmentProposalAxle(proposal = {}, axle = 'front', result = state.fitment.result) {
  const source = proposal.axles?.[axle] || {};
  return {
    recommendation: source.recommendation || source.wheel || result?.axles?.[axle]?.recommendation || {},
    geometry: source.geometry || result?.axles?.[axle]?.geometry || {}
  };
}

function fitmentMovementCopy(value, edge = 'inner') {
  if (!Number.isFinite(Number(value))) return { text: uiLabel('Measurement required'), tone: 'unknown' };
  const amount = Math.abs(Number(value));
  if (amount < 0.05) return { text: uiLabel('No position change'), tone: 'neutral' };
  if (edge === 'inner') return { text: `${Number(value) > 0 ? uiLabel('Moves toward suspension') : uiLabel('Moves away from suspension')} ${amount} mm`, tone: Number(value) > 0 ? 'warning' : 'neutral' };
  return { text: `${Number(value) > 0 ? uiLabel('Moves toward fender') : uiLabel('Moves inward from fender')} ${amount} mm`, tone: Number(value) > 0 ? 'warning' : 'neutral' };
}

function fitmentClearanceCopy(value, threshold = 0) {
  if (!Number.isFinite(Number(value))) return { text: uiLabel('Measurement required'), tone: 'unknown' };
  const clearance = Number(value);
  if (clearance < 0) return { text: `${uiLabel('Predicted interference')} ${Math.abs(clearance)} mm`, tone: 'danger' };
  if (clearance < Number(threshold || 0)) return { text: `${uiLabel('Predicted remaining clearance')} ${clearance} mm`, tone: 'warning' };
  return { text: `${uiLabel('Predicted remaining clearance')} ${clearance} mm`, tone: 'safe' };
}

function fitmentProposalGeometryMarkup(geometry = {}) {
  const thresholds = geometry.thresholds || {};
  const cells = [
    [uiLabel('Inner barrel to suspension'), fitmentClearanceCopy(geometry.predicted_inner_clearance_mm, thresholds.inner_barrel_mm)],
    [uiLabel('Tire shoulder to fender'), fitmentClearanceCopy(geometry.predicted_outer_clearance_mm, thresholds.outer_tire_mm)],
    [uiLabel('Full travel minimum'), fitmentClearanceCopy(geometry.predicted_full_compression_clearance_mm, thresholds.full_compression_mm)],
    [uiLabel('Wheel inner movement'), fitmentMovementCopy(geometry.wheel_inner_movement_mm, 'inner')],
    [uiLabel('Wheel outer movement'), fitmentMovementCopy(geometry.wheel_outer_movement_mm, 'outer')]
  ];
  return `<div class="fitment-proposal-geometry">${cells.map(([label, value]) => `<span class="is-${value.tone}"><small>${label}</small><strong>${esc(value.text)}</strong></span>`).join('')}</div>`;
}

function fitmentProposalSpecMarkup(proposal = {}, compact = false) {
  return `<div class="fitment-proposal-specs">${['front', 'rear'].map(axle => {
    const data = fitmentProposalAxle(proposal, axle);
    const wheel = data.recommendation || {};
    const size = wheel.diameter_in != null && wheel.width_in != null ? `${wheel.diameter_in} × ${wheel.width_in}J` : uiLabel('Pending measurements');
    const et = wheel.et_mm == null ? uiLabel('Pending measurements') : `ET ${wheel.et_mm}`;
    const pcd = wheel.pcd || uiLabel('Verify vehicle');
    const centerBore = wheel.center_bore_mm == null ? uiLabel('Verify vehicle') : `${wheel.center_bore_mm} mm`;
    return `<section><div><small>${axle === 'front' ? uiLabel('Front axle') : uiLabel('Rear axle')}</small><strong>${esc(size)}</strong><b>${esc(et)}</b></div><dl><div><dt>PCD</dt><dd>${esc(pcd)}</dd></div><div><dt>${uiLabel('Center bore')}</dt><dd>${esc(centerBore)}</dd></div><div><dt>${uiLabel('Tire')}</dt><dd>${esc(wheel.tire_size || uiLabel('Still needs approval'))}</dd></div></dl>${compact ? '' : fitmentProposalGeometryMarkup(data.geometry)}</section>`;
  }).join('')}</div>`;
}

function fitmentResultHeadline(result = {}) {
  const missingCount = new Set([...(result.missing || []), ...(result.solution?.required_confirmations || [])]).size;
  if (result.status === 'conflict' || result.solution?.stage === 'correction_required') return { tone: 'danger', eyebrow: uiLabel('Current target cannot be approved'), title: uiLabel('A corrected direction is shown, but it cannot be selected until the listed conflict is resolved.'), meta: `${missingCount} ${uiLabel('Missing evidence')}` };
  if (['identity_required', 'measurement_required'].includes(result.solution?.stage)) return { tone: 'warning', eyebrow: uiLabel('A proposal is ready for measurement'), title: uiLabel('Complete the remaining evidence before the wheel drawing is locked.'), meta: `${missingCount} ${uiLabel('Missing evidence')}` };
  return { tone: 'safe', eyebrow: uiLabel('Ready for drawing review'), title: uiLabel('Known constraints are consistent. CIRUI still checks the selected wheel drawing and physical templates.'), meta: uiLabel('Ready for drawing') };
}

function fitmentProposalCardMarkup(proposal, index) {
  const selected = (state.fitment.selectedPackageId || fitmentProposalList().find(item => item.recommended)?.id) === proposal.id;
  const blocked = proposal.selectable === false || state.fitment.resultStale;
  return `<article class="fitment-proposal-card ${selected && !blocked ? 'is-selected' : ''} ${blocked ? 'is-blocked' : ''}"><header><span>0${index + 1}</span><div><small>${proposal.recommended ? uiLabel('Recommended') : uiLabel('Fitment proposals')}</small><h2>${esc(fitmentProposalLabel(proposal))}</h2></div><b class="fitment-proposal-state">${blocked ? uiLabel('Blocked') : selected ? uiLabel('Selected proposal') : uiLabel('Selectable')}</b></header>${fitmentProposalSpecMarkup(proposal, true)}<footer><button type="button" class="btn btn-outline" data-action="fitment-package-details" data-id="${esc(proposal.id)}">${uiLabel('View proposal details')}</button>${blocked ? `<button type="button" class="btn btn-dark" data-action="fitment-missing-evidence">${uiLabel('Missing evidence')}</button>` : `<button type="button" class="btn btn-primary" data-action="fitment-package-select" data-id="${esc(proposal.id)}">${selected ? uiLabel('Selected proposal') : uiLabel('Select this proposal')}</button>`}</footer></article>`;
}

function fitmentResultPage() {
  const result = state.fitment.result;
  if (!result) return `<main class="fitment-result-page"><section class="fitment-result-empty"><div class="container"><span>${icons.shield}</span><p class="custom-kicker">CIRUI <span>${uiLabel('Fitment proposals')}</span></p><h1>${uiLabel('No result has been calculated yet.')}</h1><p>${uiLabel('Start a fitment workflow to create the first checked proposal.')}</p><a class="btn btn-primary" href="/fitment-lab" data-app-path>${uiLabel('Choose how this build starts.')} ${icons.arrowRight}</a></div></section></main>`;
  const headline = fitmentResultHeadline(result);
  const proposals = fitmentProposalList(result);
  const vehicle = result.vehicle || state.fitment.vehicle || {};
  const vehicleLabel = [vehicle.year, vehicle.make, vehicle.model, vehicle.trim, vehicle.drive].filter(Boolean).join(' ') || uiLabel('Vehicle not selected');
  const selectedStyle = fitmentSelectedStyle();
  const selectableCount = state.fitment.resultStale ? 0 : proposals.filter(item => item.selectable !== false).length;
  return `<main class="fitment-result-page"><section class="fitment-result-hero is-${headline.tone}"><div class="container"><a class="fitment-result-back" href="/fitment-lab" data-app-path>${icons.arrowLeft} ${uiLabel('Choose how this build starts.')}</a><div class="fitment-result-hero-grid"><div><p class="custom-kicker">CIRUI <span>${uiLabel('Fitment proposals')}</span></p><small>${headline.eyebrow}</small><h1>${headline.title}</h1><div class="fitment-result-context"><span><small>${uiLabel('Exact vehicle')}</small><strong>${esc(vehicleLabel)}</strong></span><span><small>${uiLabel('Selected wheel style')}</small><strong>${esc(selectedStyle ? homePreviewShortName(selectedStyle) : uiLabel('Style drawing check'))}</strong></span></div></div><div class="fitment-result-score"><span>${icons.shield}</span><small>${esc(fitmentSolutionStageLabel(result.solution?.stage))}</small><strong>${selectableCount}</strong><p>${uiLabel('Selectable')}</p><b>${esc(headline.meta)}</b></div></div>${state.fitment.resultStale ? `<div class="fitment-result-stale">${icons.shield}<span>${uiLabel('The previous result is out of date because the inputs changed. Recalculate before saving or quoting.')}</span><button class="btn btn-light btn-small" data-action="fitment-edit" data-step="1">${uiLabel('Edit inputs')}</button></div>` : ''}</div></section><section class="fitment-result-body"><div class="container">${state.account ? workshopProjectBarMarkup() : workshopGuestBarMarkup()}<div class="fitment-result-toolbar"><div><span>${proposals.length}</span><div><small>${uiLabel('Fitment proposals')}</small><strong>${uiLabel('Choose a usable proposal, then save it to the customer record or continue to a wheel style.')}</strong></div></div><div><button type="button" class="btn btn-outline" data-action="fitment-edit" data-step="1">${icons.arrowLeft} ${uiLabel('Edit inputs')}</button><button type="button" class="btn btn-outline" data-action="fitment-missing-evidence">${uiLabel('Missing evidence')}</button><button type="button" class="btn btn-dark" data-action="fitment-diagnostics">${uiLabel('Professional data')}</button></div></div><div class="fitment-proposal-list">${proposals.map(fitmentProposalCardMarkup).join('')}</div><section class="fitment-result-next"><div><p class="eyebrow">${uiLabel('From fitment to sale')}</p><h2>${uiLabel('Choose the next path with the customer.')}</h2><p>${uiLabel('Use a listed CIRUI style, co-design a new wheel from text and a reference image, or move the complete project into the shop-controlled quote flow.')}</p></div><div><button class="fitment-next-command" data-action="fitment-browse-styles">${icons.store}<span><strong>${uiLabel('Browse matching styles')}</strong><small>${uiLabel('Existing styles')}</small></span>${icons.arrowRight}</button><button class="fitment-next-command" data-action="fitment-open-concept">${icons.spark}<span><strong>${uiLabel('Ask CIRUI to custom build')}</strong><small>${uiLabel('Text + reference image')}</small></span>${icons.arrowRight}</button><button class="fitment-next-command" data-action="workshop-save">${icons.save}<span><strong>${uiLabel('Save customer record')}</strong><small>${uiLabel('Keep every customer revision')}</small></span>${icons.arrowRight}</button></div></section></div></section></main>`;
}

function fitmentPackageModalMarkup(packageId = '') {
  const proposal = fitmentProposalList().find(item => item.id === packageId) || fitmentProposalList()[0];
  if (!proposal) return '';
  const blocked = proposal.selectable === false || state.fitment.resultStale;
  return `<div class="overlay fitment-detail-overlay" data-action="close-modal"><div class="modal modal-wide fitment-detail-modal" data-modal-content><button class="icon-btn modal-close" data-action="close-modal" aria-label="${esc(uiLabel('Close'))}">${icons.close}</button><p class="eyebrow">${uiLabel('Fitment proposals')}</p><h2>${esc(fitmentProposalLabel(proposal))}</h2><p>${uiLabel('The signs have been translated into physical directions. A negative remaining clearance is shown as interference and can never be selected.')}</p>${fitmentProposalSpecMarkup(proposal)}<div class="fitment-detail-actions"><button class="btn btn-outline" data-action="close-modal">${uiLabel('Close')}</button>${blocked ? `<button class="btn btn-dark" data-action="fitment-missing-evidence">${uiLabel('Missing evidence')}</button>` : `<button class="btn btn-primary" data-action="fitment-package-select" data-id="${esc(proposal.id)}">${uiLabel('Select this proposal')}</button>`}</div></div></div>`;
}

function fitmentEvidenceModalMarkup(result = state.fitment.result) {
  const confirmations = Array.isArray(result?.solution?.required_confirmations) ? result.solution.required_confirmations : [];
  const messages = [...(result?.issues || []), ...(result?.missing || [])];
  return `<div class="overlay fitment-detail-overlay" data-action="close-modal"><div class="modal modal-wide fitment-evidence-modal" data-modal-content><button class="icon-btn modal-close" data-action="close-modal" aria-label="${esc(uiLabel('Close'))}">${icons.close}</button><p class="eyebrow">${uiLabel('Engineering evidence')}</p><h2>${confirmations.length || messages.length ? uiLabel('Finish these to lock the wheel drawing') : uiLabel('Ready for the final drawing review')}</h2><div class="fitment-evidence-list">${confirmations.map((item, index) => `<article><span>${String(index + 1).padStart(2, '0')}</span><div><strong>${esc(fitmentRequirementLabel(item))}</strong><small>${uiLabel('Still needs approval')}</small></div></article>`).join('') || `<article class="is-complete">${icons.shield}<div><strong>${uiLabel('Known rules pass')}</strong><small>${uiLabel('CIRUI will review the final wheel drawing and dynamic clearance before production.')}</small></div></article>`}</div>${messages.length ? `<details class="fitment-flow-advanced"><summary><span>${icons.chevron}</span><div><strong>${uiLabel('Why the plan is not production-locked yet')}</strong><small>${messages.length} ${uiLabel('review notes')}</small></div></summary><ul class="fitment-evidence-notes">${messages.slice(0, 12).map(message => `<li>${esc(message)}</li>`).join('')}</ul></details>` : ''}<div class="fitment-detail-actions"><button class="btn btn-outline" data-action="close-modal">${uiLabel('Close')}</button><button class="btn btn-primary" data-action="fitment-edit" data-step="4">${uiLabel('Edit inputs')}</button></div></div></div>`;
}

function fitmentDiagnosticsModalMarkup(result = state.fitment.result) {
  const axles = ['front', 'rear'].map(axle => {
    const data = result?.axles?.[axle] || {};
    return `<section><header><strong>${axle === 'front' ? uiLabel('Front axle') : uiLabel('Rear axle')}</strong><span>${esc(data.recommendation?.pcd || uiLabel('PCD pending'))}</span></header><div>${(data.checks || []).map(check => `<article class="is-${esc(check.status)}"><i></i><span><strong>${esc(check.label)}</strong><small>${esc(check.detail)}</small></span></article>`).join('') || `<article class="is-review"><i></i><span><strong>${uiLabel('Measurement required')}</strong><small>${uiLabel('Enter wheel values for a more precise check.')}</small></span></article>`}</div></section>`;
  }).join('');
  return `<div class="overlay fitment-detail-overlay" data-action="close-modal"><div class="modal modal-wide fitment-diagnostics-modal" data-modal-content><button class="icon-btn modal-close" data-action="close-modal" aria-label="${esc(uiLabel('Close'))}">${icons.close}</button><p class="eyebrow">${uiLabel('Professional data')}</p><h2>${uiLabel('Calculation details')}</h2><p>${uiLabel('The signs have been translated into physical directions. A negative remaining clearance is shown as interference and can never be selected.')}</p><div class="fitment-diagnostics-axles">${axles}</div><div class="fitment-detail-actions"><button class="btn btn-outline" data-action="close-modal">${uiLabel('Close')}</button><button class="btn btn-dark" data-action="fitment-missing-evidence">${uiLabel('Engineering evidence')}</button></div></div></div>`;
}

function fitmentSharePage() {
  if (state.workshop.shareLoading) return `<main class="workshop-share-page"><div class="container"><div class="workshop-share-state"><span class="wheel-progress"><i></i></span><strong>${uiLabel('Opening the shared build…')}</strong><p>${uiLabel('Loading the vehicle, fitment result and shop design room.')}</p></div></div></main>`;
  if (state.workshop.shareError || !state.workshop.shareProject) return `<main class="workshop-share-page"><div class="container"><div class="workshop-share-state is-error"><strong>${uiLabel('This workshop link is not available.')}</strong><p>${esc(state.workshop.shareError || uiLabel('Ask the shop for a new project link.'))}</p><a class="btn btn-dark" href="#fitment">${uiLabel('Open the Workshop Lab')}</a></div></div></main>`;
  const project = state.workshop.shareProject;
  const shop = project.shop || {};
  const result = project.result || {};
  const selectedParts = Array.isArray(result.selected_parts) ? result.selected_parts : [];
  const shopContact = [shop.advisor_name, shop.phone, shop.email, shop.location].filter(Boolean).join(' · ');
  return `<main class="workshop-share-page"><section class="workshop-share-hero"><div class="container"><div class="workshop-share-brand"><span class="workshop-live-dot"></span><div><small>${uiLabel('Shared workshop project')}</small><strong>${esc(shop.shop_name || 'CIRUI Workshop Partner')}</strong></div></div><div class="workshop-share-hero-grid"><div><p class="custom-kicker">${uiLabel('Customer build room')} <span>${esc(workshopProjectStatusLabel(project.status))}</span></p><h1>${esc(project.title)}</h1><p>${uiLabel('Your shop has saved the vehicle and fitment context here. Review the result, choose a listed wheel or co-design a custom direction. The originating shop remains your sales and installation contact.')}</p></div><div class="workshop-share-vehicle"><small>${uiLabel('Vehicle')}</small><strong>${esc(workshopVehicleLabel(project))}</strong><span>${uiLabel('Customer project')}</span>${shopContact ? `<p>${esc(shopContact)}</p>` : ''}</div></div><div class="workshop-share-facts"><span><small>${uiLabel('Parts recorded')}</small><strong>${selectedParts.length}</strong></span><span><small>${uiLabel('Project revision')}</small><strong>${String(project.revision || 1).padStart(2, '0')}</strong></span><span><small>${uiLabel('Fitment status')}</small><strong>${esc(result.status_label || workshopProjectStatusLabel(project.status))}</strong></span></div><div class="workshop-partner-protection">${icons.shield}<div><strong>${uiLabel('Partner-protected customer relationship')}</strong><span>${project.channel?.sales_mode === 'dealer_managed' ? uiLabel('Pricing and the final sale are controlled by this shop. CIRUI provides the platform, engineering and production support.') : uiLabel('This shop remains attributed if CIRUI assists with checkout and fulfillment.')}</span></div></div></div></section><div class="container workshop-share-body">${Object.keys(result).length ? fitmentResultMarkup(result, { shared: true }) : `<section class="fitment-result"><div class="fitment-result-head"><div><p class="eyebrow">${uiLabel('Shop draft')}</p><h2>${uiLabel('Fitment check pending')}</h2><p>${uiLabel('The shop shared this project before completing the engineering check. You can still choose a design direction or send a quote request.')}</p></div></div></section>`}${workshopDecisionHub(project)}<section class="workshop-share-foot"><div><p class="eyebrow">${uiLabel('Shared by')}</p><strong>${esc(shop.shop_name || 'CIRUI Workshop Partner')}</strong><span>${esc(shopContact || uiLabel('Contact the shop that sent this link for installation support.'))}</span></div><p>${uiLabel('Visual concepts help confirm style direction. Final wheel drawings, load requirements and physical clearances must be approved before production.')}</p></section></div></main>`;
}

function accountPage() {
  if (!state.mallToken || !state.account) return `<main class="workshop-account-page"><div class="container"><section class="workshop-account-gate"><p class="custom-kicker">${uiLabel('CIRUI account')} <span>${uiLabel('Private shop workspace')}</span></p><h1>${uiLabel('Your customer projects live here.')}</h1><p>${uiLabel('The fitment tool stays free. Sign in to reopen saved builds, protect customer relationships, set your selling price and publish shop-branded links.')}</p><div><button class="btn btn-primary" data-action="account-login" data-after-login="account">${uiLabel('Sign in')}</button><button class="btn btn-outline" data-action="account-register" data-after-login="account">${uiLabel('Create shop account')}</button></div></section></div></main>`;
  const projects = state.workshop.projects || [];
  const shared = projects.filter(project => ['shared', 'quote_requested'].includes(project.status)).length;
  const quoted = projects.filter(project => project.dealer_quote?.status === 'published').length;
  const current = state.workshop.currentProject;
  return `<main class="workshop-account-page"><div class="container"><section class="workshop-account-hero"><div><p class="custom-kicker">${uiLabel('CIRUI partner workspace')} <span>${esc(state.account.company || state.account.username || '')}</span></p><h1>${uiLabel('Customers, fitment and margin in one place.')}</h1><p>${uiLabel('Use CIRUI as the technical and production platform while your shop keeps the sales relationship, service work and customer-facing price.')}</p></div><div class="workshop-account-actions"><a class="btn btn-primary" href="/fitment-lab" data-app-path>${icons.plus} ${uiLabel('New customer build')}</a><button class="btn btn-outline" data-action="orders">${uiLabel('Track orders')}</button><button class="icon-btn" data-action="account-logout" title="${esc(uiLabel('Sign out'))}">${icons.close}</button></div></section><div class="workshop-account-stats"><span><small>${uiLabel('Saved projects')}</small><strong>${projects.length}</strong></span><span><small>${uiLabel('Customer links')}</small><strong>${shared}</strong></span><span><small>${uiLabel('Published shop quotes')}</small><strong>${quoted}</strong></span><span><small>${uiLabel('Channel default')}</small><strong>${uiLabel('Shop controlled')}</strong></span></div><div class="workshop-account-layout">${workshopProfileMarkup()}<section class="workshop-account-main"><div class="workshop-account-section-head"><div><p class="eyebrow">${uiLabel('Project management')}</p><h2>${uiLabel('Every build stays attached to your account.')}</h2></div><p>${uiLabel('Open a project to update fitment, select a wheel direction, request CIRUI supply pricing or publish your own customer quote.')}</p></div>${state.workshop.projectsLoading ? `<div class="workshop-account-loading">${uiLabel('Loading customer projects…')}</div>` : current ? `<article class="workshop-account-current"><div><small>${uiLabel('Current project')}</small><h3>${esc(current.title)}</h3><p>${esc(workshopVehicleLabel(current))}</p><span class="workshop-status workshop-status-${esc(current.status)}">${esc(workshopProjectStatusLabel(current.status))}</span></div><dl><div><dt>${uiLabel('Sales route')}</dt><dd>${esc(current.channel?.sales_mode === 'dealer_managed' ? uiLabel('Shop controls the sale') : current.channel?.sales_mode === 'attributed_checkout' ? uiLabel('CIRUI collects payment for the shop') : uiLabel('Allow direct CIRUI checkout'))}</dd></div><div><dt>${uiLabel('Customer quote')}</dt><dd>${esc(current.dealer_quote?.status === 'published' ? money(current.dealer_quote.total || 0) : uiLabel('Not published'))}</dd></div><div><dt>${uiLabel('Case visibility')}</dt><dd>${esc(current.seo_status === 'approved' ? uiLabel('Published') : current.seo_status === 'pending' ? uiLabel('Awaiting review') : uiLabel('Private'))}</dd></div></dl><div class="workshop-account-current-actions"><button class="btn btn-primary" data-action="workshop-resume" data-token="${esc(current.share_token)}">${uiLabel('Open workspace')}</button><button class="btn btn-outline" data-action="workshop-copy-link">${icons.copy} ${uiLabel('Copy customer link')}</button></div></article>` : `<div class="workshop-account-empty"><strong>${uiLabel('No project selected.')}</strong><p>${uiLabel('Start a customer build or choose one from the project list.')}</p><a class="btn btn-primary" href="/fitment-lab" data-app-path>${uiLabel('Open the Workshop Lab')}</a></div>`}<section class="workshop-channel-promise"><div><p class="eyebrow">${uiLabel('Partner protection')}</p><h3>${uiLabel('CIRUI supports the sale without taking the customer away.')}</h3></div><ul><li>${uiLabel('Private CIRUI supply cost')}</li><li>${uiLabel('Shop-controlled customer price and service fees')}</li><li>${uiLabel('Persistent inquiry and order attribution')}</li><li>${uiLabel('Direct checkout only when the shop enables it')}</li></ul></section></section></div></div></main>`;
}

function partnerAttributionBar() {
  const referral = state.workshop.referral;
  if (!referral?.share_token || state.route.name === 'fitment-share') return '';
  return `<div class="partner-attribution"><div class="container"><div class="partner-attribution-copy"><span>${icons.shield} ${uiLabel('Partner-protected build')}</span><strong>${esc(referral.shop_name || uiLabel('CIRUI workshop partner'))}</strong><small>${uiLabel('Design, inquiry and order activity remains attributed to this shop.')}</small></div><div class="partner-attribution-actions"><a href="/build/${encodeURIComponent(referral.share_token)}" data-app-path>${uiLabel('Return to shared build')} ${icons.arrowRight}</a><button type="button" class="partner-attribution-clear" data-action="partner-referral-clear-open" title="${esc(uiLabel('Remove partner attribution'))}" aria-label="${esc(uiLabel('Remove partner attribution'))}">${icons.close}</button></div></div></div>`;
}

function header() {
  const active = state.route.name === 'store' ? 'SHOP' : state.route.name === 'about' ? 'ABOUT' : state.route.name === 'ai-wheel-design' ? 'AI-DESIGN' : ['blog', 'blog-post'].includes(state.route.name) ? 'JOURNAL' : ['fitment', 'fitment-result', 'fitment-share'].includes(state.route.name) ? 'FITMENT' : '';
  return `<div class="announcement">策锐锻造 · <span>中国品牌官网</span> · 车型适配与效果生成</div>${partnerAttributionBar()}
  <header class="site-header">
    <div class="container header-main">
      <form class="wf-public-search" data-form="search" role="search"><input name="query" value="${esc(state.search)}" placeholder="搜索轮毂、车型或工艺" aria-label="搜索轮毂、车型或工艺"><button type="submit" aria-label="搜索">${icons.search}</button></form>
      <a class="brand cerui-brand" href="#home" aria-label="策锐锻造首页"><img src="${assetUrl('cerui/cerui-logo-black-v1.webp')}" alt="策锐锻造 CIRUI Forged"><span><strong>策锐锻造</strong><small>CIRUI FORGED · 中国官网</small></span></a>
      <div class="header-actions">
        <button class="hamburger" data-action="mobile-nav" aria-label="打开导航">${icons.menu}</button>
      </div>
    </div>
    <div class="nav-row ${state.mobileNav ? 'is-open' : ''}" id="primary-navigation">
      <div class="container nav-inner">
        <nav class="nav-links">
          <a class="nav-link" href="#home">首页</a>
           <a class="nav-link ${active === 'SHOP' ? 'is-active' : ''}" href="#store" data-category-link="Wheels">轮毂系列</a>
           <a class="nav-link ${active === 'FITMENT' ? 'is-active' : ''}" href="/fitment-lab" data-app-path>适配实验室</a>
          <a class="nav-link nav-link-ai ${active === 'AI-DESIGN' ? 'is-active' : ''}" href="/ai-wheel-studio" data-app-path>AI 原创设计<small>NEW</small></a>
           <a class="nav-link" href="#manufacture">制造实力</a>
          <a class="nav-link" href="#network">全国网络</a>
          <a class="nav-link" href="#videos">视频专区</a>
          <a class="nav-link ${active === 'ABOUT' ? 'is-active' : ''}" href="#about">关于策锐</a>
        </nav>
        <div class="nav-meta"><span>适配咨询</span><a href="tel:${company.tel}">${company.phone}</a></div>
      </div>
    </div>
  </header>`;
}
function megaMenu() {
  return `<div class="mega-menu" id="shop-catalog-menu" aria-label="${esc(uiLabel('Forged wheel catalog'))}"><div class="container mega-grid">
    <div class="mega-col"><h3>${uiLabel('Wheel construction')}</h3><a href="#store" data-action="catalog-collection" data-collection="all">${uiLabel('All forged wheels')}</a><a href="#store" data-action="catalog-collection" data-collection="monoblock">${uiLabel('Monoblock forged')}</a><a href="#store" data-action="catalog-collection" data-collection="two-piece">${uiLabel('2-piece forged')}</a><a href="#store" data-action="catalog-collection" data-collection="aero-floating">${uiLabel('Aero & floating')}</a><a href="#store" data-action="catalog-collection" data-collection="suv-off-road">${uiLabel('SUV & off-road')}</a></div>
    <div class="mega-col"><h3>${uiLabel('Fitment tools')}</h3><a href="/fitment-lab" data-action="open-fitment-lab" data-fitment-focus="vehicle">${uiLabel('Vehicle fitment')}</a><a href="/fitment-lab" data-action="open-fitment-lab" data-fitment-focus="brakes">${uiLabel('Brake clearance')}</a><a href="#store" data-action="catalog-visualizer">${uiLabel('Vehicle photo visualizer')}</a><a href="/fitment-lab" data-action="open-fitment-lab" data-fitment-focus="offset">${uiLabel('Offset & stance calculator')}</a></div>
    <div class="mega-col"><h3>${uiLabel('Customization')}</h3><a href="/ai-wheel-studio" data-app-path>${uiLabel('AI Original Design')}</a><a href="#custom" data-action="custom-section" data-section="finishes">${uiLabel('Finishes & colors')}</a><a href="#custom" data-action="custom-section" data-section="lips">${uiLabel('Lip profiles')}</a><a href="#custom" data-action="custom-section" data-section="caps">${uiLabel('Center caps')}</a><a href="#custom" data-action="custom-section" data-section="hardware">${uiLabel('Hardware options')}</a></div>
    <div class="mega-col"><h3>${uiLabel('Factory & trade')}</h3><a href="#about">${uiLabel('Meet the factory')}</a><a href="#trade">${uiLabel('DDP Europe & North America')}</a><a href="#trade" data-action="trade-rfq" data-buyer-type="dealer">${uiLabel('Dealer & wholesale')}</a><a href="#store">${uiLabel('Browse forged wheels')}</a></div>
  </div></div>`;
}

function fitmentProducts() {
  const preferred = [
    products.find(item => item.category === 'Wheels' && item.diameter === 19),
    products.find(item => item.category === 'Calipers'),
    products.find(item => item.category === 'Rotors'),
    products.find(item => item.category === 'Brake Pads')
  ].filter(Boolean);
  return preferred;
}
function renderFitmentProduct(item) {
  return `<button class="fitment-product spotlight-card" data-action="quick-view" data-id="${item.id}"><span class="fitment-product-image"><img class="${item.image_cutout ? 'is-cutout' : ''}" src="${assetUrl(item.image)}" alt="${esc(productNameText(item))}"></span><span class="fitment-product-copy"><small>${esc(productCategoryText(item))}</small><strong>${esc(productNameText(item))}</strong><span>${productPriceText(item)} <em>· ${item.reviews ? formatUiLabel('{count} reviews', { count: item.reviews }) : uiLabel('No verified reviews yet')}</em></span></span></button>`;
}
function fitmentPreview() {
  if (!state.vehicle?.trim) return '';
  return `<div class="fitment-preview reveal" aria-live="polite"><div class="fitment-preview-head"><div><p class="eyebrow">Fitment matched</p><strong>${esc(currentVehicleLabel())}</strong><span>Recommended CIRUI parts with clearance notes ready.</span></div><button class="icon-btn" data-action="change-vehicle" aria-label="Change vehicle">${icons.close}</button></div><div class="fitment-products">${fitmentProducts().map(renderFitmentProduct).join('')}</div><div class="fitment-preview-foot"><span>${fitmentProducts().length} product families matched to this build</span><button class="btn btn-primary btn-small" data-action="view-fitment-products">View all matching parts</button></div></div>`;
}

const factoryFilm = {
  source: 'domestic/videos/cerui-factory-story-720p30-web.mp4?v=20260829-factory-film-v1',
  poster: 'cerui/cerui-factory-line-v1.webp'
};

function factoryFilmCardMarkup(layout = 'premium') {
  const isPremium = layout === 'premium';
  const isLegacy = layout === 'legacy';
  const figureClass = isPremium ? 'is-primary' : isLegacy ? 'is-wide' : 'is-tall';
  const caption = isPremium
    ? `<figcaption><span>01</span><div><strong>${uiLabel('Watch factory film')}</strong><small>${uiLabel('Inside CIRUI manufacturing')}</small></div></figcaption>`
    : isLegacy
      ? `<figcaption><strong>${uiLabel('Watch factory film')}</strong><span>${uiLabel('Inside CIRUI manufacturing')}</span></figcaption>`
      : `<figcaption>${uiLabel('Watch factory film')}</figcaption>`;
  const posterUrl = assetUrl(factoryFilm.poster);
  return `<figure class="${figureClass} factory-film-card"><button type="button" class="factory-film-trigger" data-action="open-factory-film" aria-label="${esc(uiLabel('Play CIRUI factory film'))}" style="--factory-film-poster:url('${esc(posterUrl)}')"><img src="${posterUrl}" alt="${esc(uiLabel('Inside CIRUI manufacturing'))}" loading="eager" decoding="async"><span class="factory-film-shade" aria-hidden="true"></span><span class="factory-film-play" aria-hidden="true">${icons.play}</span><span class="factory-film-runtime">${uiLabel('Full film · 02:16')}</span></button>${caption}</figure>`;
}

function ceruiHomePage() {
  const process = [
    ['01', 'Share the vehicle + goal', 'Tell us the exact car, brake package, suspension, stance and how you drive.'],
    ['02', 'Approve fitment + design', 'Review diameter, width, PCD, ET, center bore, profile, finish and the visual direction.'],
    ['03', 'Forge, machine + inspect', 'Your set moves through factory production, CNC machining, finishing and final inspection.'],
    ['04', 'DDP delivery', 'For supported destinations, the confirmed quote can include duty-paid delivery to your door.']
  ];
  const factoryProof = [
    ['cerui-factory-line-v1.webp', 'Production line', 'Source manufacturing'],
    ['cerui-factory-machining-v1.webp', 'CNC machining', 'Wheel-specific precision'],
    ['cerui-factory-finished-v1.webp', 'Finished inventory', 'Inspection before packing']
  ];
  const eventGallery = [
    ['cerui-motorsport-rear-v1.webp', 'Motorsport', 'Competition-backed product understanding'],
    ['cerui-event-porsche-v1.webp', 'Brand events', 'CIRUI Forged in the tuning community'],
    ['cerui-event-display-v1.webp', 'Design display', 'Forged directions shown in the real world'],
    ['cerui-event-wheel-wall-v1.webp', 'Finish range', 'Color, profile and detail references']
  ];
  const vehicleCards = ceruiVehicleProducts.map((item, index) => `<a class="cerui-vehicle-card reveal delay-${index % 4}" href="#product/${esc(item.id)}"><figure><img src="${esc(assetUrl(item.image))}" alt="${esc(item.vehicle_label)} custom forged wheel direction" loading="lazy" decoding="async" width="1200" height="1200"></figure><div><span>${esc(item.vehicle_group)}</span><h3>${esc(item.vehicle_label)}</h3><p>${esc(item.name)}</p><b>${productPriceText(item)} <i>View + preview</i></b></div></a>`).join('');
  return `<main class="cerui-home">
  <section class="cerui-hero" id="home"><img class="cerui-hero-media" src="${assetUrl('cerui/cerui-motorsport-53-v1.webp')}" alt="CIRUI Forged supported number 53 race car on circuit" width="1800" height="1200" loading="eager" decoding="async" fetchpriority="high"><div class="cerui-hero-shade"></div><div class="container cerui-hero-grid"><div class="cerui-hero-copy reveal"><p class="cerui-overline"><span></span>CIRUI FORGED · OFFICIAL GLOBAL SITE</p><h1>Forged at the source.<br><em>Fitted to your car.</em></h1><p>策锐官网 is the official overseas website of CIRUI Forged — a source wheel factory turning your exact vehicle, stance and finish into a production-ready forged wheel.</p><div class="cerui-hero-actions"><a class="btn btn-primary" href="/fitment-lab" data-app-path>Build my exact fitment</a><a class="btn btn-light" href="#home#vehicles">Shop by vehicle</a><a class="cerui-text-link" href="#about">Meet the factory ${icons.arrowRight}</a></div><div class="cerui-hero-facts"><span><strong>Factory direct</strong><small>Design · forge · machine · finish</small></span><span><strong>3-angle preview</strong><small>See it on your car before production</small></span><span><strong>DDP available</strong><small>Clearer landed delivery for global buyers</small></span></div></div><div class="custom-wheel-stage cerui-visualizer-stage"><div class="cerui-preview-placeholder"><img src="${assetUrl('cerui/catalog-bmw-v1.webp')}" alt="CIRUI forged wheel preview"><span>Loading CIRUI Visual Studio…</span></div></div></div><div class="container cerui-hero-rail"><span><b>01</b> Exact vehicle fitment</span><span><b>02</b> Custom forged design</span><span><b>03</b> Factory production</span><span><b>04</b> DDP delivery support</span></div></section>
  <section class="cerui-proof"><div class="container cerui-proof-grid"><article>${icons.shield}<div><strong>Source wheel factory</strong><span>Real production, machining and finished inventory.</span></div></article><article>${icons.spark}<div><strong>Made to your numbers</strong><span>Diameter, width, PCD, ET, CB and brake clearance.</span></div></article><article>${icons.image}<div><strong>Preview before production</strong><span>Upload a vehicle photo and generate three wheel views.</span></div></article><article>${icons.truck}<div><strong>About 30 business days</strong><span>Target production + delivery timing, confirmed per destination.</span></div></article></div></section>
  <section class="cerui-fitment section" id="custom-build"><div class="container cerui-fitment-grid"><div class="cerui-section-copy"><p class="cerui-overline"><span></span>FITMENT FIRST</p><h2>Start with the car.<br><em>Not a generic wheel.</em></h2><p>Compatibility is the high-risk part of buying wheels online. Start with the exact platform so the wheel drawing can account for the hub, brakes, suspension, tire envelope and intended use.</p><div class="cerui-fitment-notes"><span>PCD + center bore</span><span>Front + rear ET</span><span>Caliper clearance</span><span>Street + show + track</span></div></div><div class="cerui-fitment-panel"><div class="cerui-panel-head"><span>01 / Vehicle brief</span><strong>Tell CIRUI what you drive.</strong><small>The existing fitment calculator remains the engineering core of the site.</small></div><div class="fitment-card custom-fitment-card">${vehicleSelector('hero')}<button class="btn btn-primary" data-action="open-fitment-lab">Open fitment lab</button></div>${fitmentPreview()}</div></div></section>
  <section class="cerui-vehicles section" id="vehicles"><div class="container"><div class="cerui-section-head"><div><p class="cerui-overline"><span></span>SHOP BY VEHICLE</p><h2>Real CIRUI wheel directions,<br><em>organized around the car.</em></h2></div><p>Open any series to review the product and use the existing vehicle-photo preview. Every wheel remains quote-built to the exact vehicle; vehicle names identify compatibility only.</p></div><div class="cerui-vehicle-grid">${vehicleCards}</div><div class="cerui-collection-foot"><span>Need a different platform? The fitment lab supports a broader vehicle catalog.</span><a class="btn btn-dark" href="/fitment-lab" data-app-path>Check another vehicle</a></div></div></section>
  <section class="cerui-factory section"><div class="container"><div class="cerui-factory-grid"><div class="cerui-factory-copy cerui-factory-copy-overview"><p class="cerui-overline"><span></span>THE CIRUI FACTORY</p><h2>From raw wheel blank<br><em>to finished set.</em></h2><p>The strongest export story is the real one: factory production, CNC machining, finish control, inspection and packaging — handled close to the source.</p><ul><li><b>Custom engineering</b><span>Vehicle and use-case information becomes the production brief.</span></li><li><b>Factory visibility</b><span>Real manufacturing and finished-wheel imagery, not stock photography.</span></li><li><b>Direct export support</b><span>One route from specification confirmation through global delivery.</span></li></ul><a class="btn btn-primary" href="#about">Explore our factory</a></div><div class="cerui-factory-collage">${factoryFilmCardMarkup('legacy')}${factoryProof.slice(1).map(([image, title, meta]) => `<figure><img src="${assetUrl(`cerui/${image}`)}" alt="CIRUI ${esc(title.toLowerCase())}" loading="lazy" decoding="async"><figcaption><strong>${title}</strong><span>${meta}</span></figcaption></figure>`).join('')}</div></div></div></section>
  <section class="cerui-motorsport" id="motorsport"><img src="${assetUrl('cerui/cerui-motorsport-pit-v1.webp')}" alt="CIRUI Forged motorsport program at the circuit" loading="lazy" decoding="async"><div class="cerui-motorsport-shade"></div><div class="container cerui-motorsport-copy"><p class="cerui-overline"><span></span>BUILT CLOSE TO MOTORSPORT</p><h2>Fitment is not theory<br><em>when the car is at speed.</em></h2><p>CIRUI participates in automotive events and motorsport activity, bringing the brand into the same world as brake clearance, tire envelope, vehicle load and real track use.</p><div><span>Race and track participation</span><span>Tuning community presence</span><span>Performance-led fitment culture</span></div><a class="btn btn-light" href="#about">Our story</a></div></section>
  <section class="cerui-process section"><div class="container"><div class="cerui-section-head"><div><p class="cerui-overline"><span></span>FROM BRIEF TO YOUR DOOR</p><h2>A clear custom-wheel<br><em>delivery path.</em></h2></div><p>For supported destinations, CIRUI can quote production and DDP delivery together. The exact destination, specification and final quote control the confirmed schedule.</p></div><div class="cerui-process-grid">${process.map(([number, title, copy]) => `<article><span>${number}</span><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div><div class="cerui-ddp-note">${icons.truck}<div><strong>Target: production + transport in about 30 business days.</strong><span>Timing is confirmed with the final vehicle specification, finish, destination and DDP quote.</span></div><a class="btn btn-dark" href="/fitment-lab" data-app-path>Start the brief</a></div></div></section>
  <section class="cerui-community section"><div class="container"><div class="cerui-section-head"><div><p class="cerui-overline"><span></span>IN THE REAL WORLD</p><h2>Factory, track<br><em>and tuning culture.</em></h2></div><p>Real photographs from CIRUI production, exhibitions and motorsport provide the proof behind the brand.</p></div><div class="cerui-community-grid">${eventGallery.map(([image, title, copy], index) => `<figure class="${index === 0 ? 'is-large' : ''}"><img src="${assetUrl(`cerui/${image}`)}" alt="CIRUI ${esc(title.toLowerCase())}" loading="lazy" decoding="async"><figcaption><span>${title}</span><strong>${copy}</strong></figcaption></figure>`).join('')}</div></div></section>
  <section class="section cerui-ready"><div class="container"><div class="cerui-section-head"><div><p class="cerui-overline"><span></span>READY DESIGN DIRECTIONS</p><h2>Choose a starting point.<br><em>Then make it yours.</em></h2></div><div><p>The existing wheel catalog, product pages, quoting flow and car-photo visualizer stay intact.</p><a class="btn btn-dark" href="#store" data-category-link="Wheels">Browse all forged wheels</a></div></div><div class="product-grid">${products.filter(item => item.category === 'Wheels' && !String(item.id).startsWith('cerui-')).slice(0, 4).map(renderProductCard).join('')}</div></div></section>
  <section class="section" id="resources"><div class="container"><div class="section-heading"><div><p class="eyebrow">Customer feedback</p><h2>Reviews are coming soon.</h2></div><p>See what drivers say after their wheels are on the car.</p></div></div></section>
  <section class="section" id="gallery"><div class="container"><div class="section-heading"><div><p class="eyebrow">Customer cars</p><h2>Customer builds are loading.</h2></div></div></div></section>
  </main>`;
}

function premiumGlobalHomePage() {
  const process = [
    ['01', 'Exact vehicle fitment', 'Compatibility is the high-risk part of buying wheels online. Start with the exact platform so the wheel drawing can account for the hub, brakes, suspension, tire envelope and intended use.'],
    ['02', 'Custom forged design', 'Diameter, width, PCD, ET, CB and brake clearance.'],
    ['03', 'Factory production', 'Design · forge · machine · finish'],
    ['04', 'DDP delivery support', 'Clearer landed delivery for global buyers']
  ];
  const factoryProof = [
    ['cerui-factory-line-v1.webp', 'Factory production', 'Source wheel factory'],
    ['cerui-factory-machining-v1.webp', 'Made to your numbers', 'Design · forge · machine · finish'],
    ['cerui-factory-finished-v1.webp', 'Preview before production', 'Real production, machining and finished inventory.']
  ];
  const featuredWheels = products
    .filter(item => item.category === 'Wheels' && !String(item.id).startsWith('cerui-'))
    .slice(0, 4);
  return `<main class="cerui-home premium-global-home">
    <section class="premium-hero" id="home" aria-labelledby="premium-hero-title">
      <video class="premium-hero-video" autoplay muted loop playsinline preload="auto" poster="${assetUrl('domestic/videos/cerui-global-hero-hd-montage-poster.webp')}" aria-hidden="true">
        <source media="(max-width: 720px)" src="${assetUrl('domestic/videos/cerui-global-hero-hd-montage-720p30-web.mp4?v=20260827-stream-v2')}" type="video/mp4">
        <source src="${assetUrl('domestic/videos/cerui-global-hero-hd-montage-1080p30-web.mp4?v=20260827-stream-v2')}" type="video/mp4">
      </video>
      <div class="premium-hero-shade" aria-hidden="true"></div>
      <div class="container premium-hero-inner">
        <div class="premium-hero-copy">
          <p class="premium-kicker"><span></span>${uiLabel('CIRUI FORGED · OFFICIAL GLOBAL SITE')}</p>
          <h1 id="premium-hero-title">${uiLabel('Forged for your')}<br><em>${uiLabel('exact vehicle.')}</em></h1>
          <p>${uiLabel('策锐官网 is the official overseas website of CIRUI Forged — a source wheel factory turning your exact vehicle, stance and finish into a production-ready forged wheel.')}</p>
          <div class="premium-hero-actions">
            <a class="btn btn-primary" href="/fitment-lab" data-app-path>${uiLabel('Build my exact fitment')}</a>
            <a class="btn btn-light" href="#store" data-category-link="Wheels">${uiLabel('All wheel directions')}</a>
          </div>
        </div>
        <div class="premium-hero-index" aria-hidden="true"><span>01</span><b>CIRUI / GLOBAL</b><small>${uiLabel('Design · forge · machine · finish')}</small></div>
      </div>
      <a class="premium-scroll-cue" href="#custom-build"><span>${uiLabel('FITMENT FIRST')}</span>${icons.chevron}</a>
    </section>

    <section class="premium-proof" aria-label="${esc(uiLabel('CIRUI source factory'))}">
      <div class="container premium-proof-grid">
        <article><span>01</span><div><strong>${uiLabel('Source wheel factory')}</strong><small>${uiLabel('Design · forge · machine · finish')}</small></div></article>
        <article><span>02</span><div><strong>${uiLabel('Exact vehicle fitment')}</strong><small>${uiLabel('Diameter, width, PCD, ET, CB and brake clearance.')}</small></div></article>
        <article><span>03</span><div><strong>${uiLabel('3-angle preview')}</strong><small>${uiLabel('See it on your car before production')}</small></div></article>
        <article><span>04</span><div><strong>${uiLabel('DDP available')}</strong><small>${uiLabel('Clearer landed delivery for global buyers')}</small></div></article>
      </div>
    </section>

    <section class="premium-fitment section" id="custom-build">
      <div class="container premium-fitment-grid">
        <div class="premium-section-copy">
          <p class="premium-kicker"><span></span>${uiLabel('FITMENT FIRST')}</p>
          <h2>${uiLabel('Start with the car.')}<br><em>${uiLabel('Not a generic wheel.')}</em></h2>
          <p>${uiLabel('Compatibility is the high-risk part of buying wheels online. Start with the exact platform so the wheel drawing can account for the hub, brakes, suspension, tire envelope and intended use.')}</p>
          <div class="premium-spec-list"><span>${uiLabel('PCD + center bore')}</span><span>${uiLabel('Front + rear ET')}</span><span>${uiLabel('Caliper clearance')}</span><span>${uiLabel('Street + show + track')}</span></div>
        </div>
        <div class="premium-fitment-panel">
          <div class="premium-panel-head"><span>${uiLabel('01 / Vehicle brief')}</span><strong>${uiLabel('Tell CIRUI what you drive.')}</strong><small>${uiLabel('The existing fitment calculator remains the engineering core of the site.')}</small></div>
          <div class="fitment-card custom-fitment-card">${vehicleSelector('hero')}<button class="btn btn-primary" data-action="open-fitment-lab">${uiLabel('Open fitment lab')}</button></div>
          ${fitmentPreview()}
        </div>
      </div>
    </section>

    <section class="premium-products section" id="vehicles">
      <div class="container">
        <div class="premium-section-head">
          <div><p class="premium-kicker"><span></span>${uiLabel('Custom forged design')}</p><h2>${uiLabel('Made to your numbers')}<br><em>${uiLabel('Preview before production')}</em></h2></div>
          <div><p>${uiLabel('Diameter, width, PCD, ET, CB and brake clearance.')}</p><a class="btn btn-dark" href="#store" data-category-link="Wheels">${uiLabel('All wheel directions')}</a></div>
        </div>
        <div class="product-grid premium-product-grid">${featuredWheels.map(renderProductCard).join('')}</div>
      </div>
    </section>

    <section class="premium-engineering section" id="engineering">
      <div class="container premium-engineering-grid">
        <div class="premium-engineering-copy">
          <p class="premium-kicker"><span></span>${uiLabel('Source wheel factory')}</p>
          <h2>${uiLabel('Factory production')}<br><em>${uiLabel('Made to your numbers')}</em></h2>
          <p>${uiLabel('Real production, machining and finished inventory.')}</p>
          <ul><li><strong>${uiLabel('Custom forged design')}</strong><span>${uiLabel('Made to your numbers')}</span></li><li><strong>${uiLabel('Design · forge · machine · finish')}</strong><span>${uiLabel('Diameter, width, PCD, ET, CB and brake clearance.')}</span></li><li><strong>${uiLabel('Preview before production')}</strong><span>${uiLabel('See it on your car before production')}</span></li></ul>
          <a class="btn btn-primary" href="#about">${uiLabel('Meet the factory')}</a>
        </div>
        <div class="premium-engineering-media">${factoryFilmCardMarkup('premium')}${factoryProof.slice(1).map(([image, title, meta], index) => `<figure><img src="${assetUrl(`cerui/${image}`)}" alt="${esc(`CIRUI ${uiLabel(title)}`)}" loading="lazy" decoding="async"><figcaption><span>0${index + 2}</span><div><strong>${uiLabel(title)}</strong><small>${uiLabel(meta)}</small></div></figcaption></figure>`).join('')}</div>
      </div>
    </section>

    <div class="premium-evidence-grid">
      <section class="section" id="resources"><div class="container"><div class="section-heading"><div><p class="eyebrow">${uiLabel('Customer feedback')}</p><h2>${uiLabel('Product reviews')}</h2></div><p>${uiLabel('See it on your car before production')}</p></div></div></section>
      <section class="section" id="gallery"><div class="container"><div class="section-heading"><div><p class="eyebrow">${uiLabel('Customer feedback')}</p><h2>${uiLabel('Preview before production')}</h2></div></div></div></section>
    </div>

    <section class="premium-delivery section" id="delivery">
      <div class="container">
        <div class="premium-section-head">
          <div><p class="premium-kicker"><span></span>${uiLabel('DDP delivery support')}</p><h2>${uiLabel('About 30 business days')}<br><em>${uiLabel('DDP available')}</em></h2></div>
          <p>${uiLabel('Target production + delivery timing, confirmed per destination.')}</p>
        </div>
        <div class="premium-process-grid">${process.map(([number, title, copy]) => `<article><span>${number}</span><h3>${uiLabel(title)}</h3><p>${uiLabel(copy)}</p></article>`).join('')}</div>
        <div class="premium-final-cta"><div><span>${uiLabel('FITMENT FIRST')}</span><strong>${uiLabel('Fitted to your car.')}</strong></div><a class="btn btn-light" href="/fitment-lab" data-app-path>${uiLabel('Build my exact fitment')}</a></div>
      </div>
    </section>
  </main>`;
}

function ceruiAboutPage() {
  const manufacturing = [
    ['Engineering the brief', 'Exact vehicle, brakes, suspension, use case and aesthetic direction are translated into a production specification.'],
    ['Machining the wheel', 'CNC machining turns the forged blank into the approved spoke, hub and profile direction.'],
    ['Finish + detail', 'Color, gloss level, machined details and center-cap direction complete the visual brief.'],
    ['Inspection + export', 'The finished set is checked, packed and routed through the confirmed export plan.']
  ];
  return `<main class="cerui-about"><section class="cerui-about-hero"><div class="cerui-about-hero-media" aria-hidden="true"><img src="${assetUrl('cerui/cerui-factory-overview-sign-v1.webp')}" alt="" width="1254" height="1254" loading="eager" decoding="async" fetchpriority="high"><img src="${assetUrl('cerui/cerui-factory-exterior-sign-v1.webp')}" alt="" width="1448" height="1086" loading="eager" decoding="async" fetchpriority="high"></div><div class="cerui-about-hero-shade"></div><div class="container"><p class="cerui-overline"><span></span>ABOUT CIRUI FORGED</p><h1>A source wheel factory<br><em>built for global custom projects.</em></h1><p>策锐官网 is the official overseas website of CIRUI Forged, connecting European and North American drivers, tuning shops and partners directly with the people engineering and producing the wheels.</p></div></section>
  <section class="cerui-about-intro section"><div class="container cerui-about-intro-grid"><div><img src="${assetUrl('cerui/cerui-logo-black-v1.webp')}" alt="CIRUI Forged 策锐锻造 logo" width="1500" height="477" loading="lazy" decoding="async"></div><div><p class="cerui-overline"><span></span>策锐锻造 · CIRUI FORGED</p><h2>Factory capability.<br><em>Fitment intelligence.</em></h2><p>CIRUI is positioned around one simple advantage: the product and the technical conversation live close to the source. The same site that helps a buyer calculate fitment and preview the wheel also explains how the wheel moves into production.</p><blockquote>“策锐官网 is CIRUI Forged for the global market.”</blockquote></div></div></section>
  <section class="cerui-about-factory section" id="factory"><div class="container"><div class="cerui-section-head"><div><p class="cerui-overline"><span></span>HOW WE WORK</p><h2>Real production,<br><em>shown clearly.</em></h2></div><p>No invented scale figures and no borrowed factory imagery — only the manufacturing material supplied by CIRUI.</p></div><div class="cerui-about-gallery">${factoryFilmCardMarkup('about')}<figure><img src="${assetUrl('cerui/cerui-factory-cnc-v1.webp')}" alt="CIRUI wheel CNC machining" loading="lazy"><figcaption>CNC machining</figcaption></figure><figure><img src="${assetUrl('cerui/cerui-factory-finished-v1.webp')}" alt="CIRUI finished wheel inventory" loading="lazy"><figcaption>Finished wheels</figcaption></figure><figure class="is-wide"><img src="${assetUrl('cerui/cerui-factory-packaging-v1.webp')}" alt="CIRUI wheel export packaging" loading="lazy"><figcaption>Packaging for delivery</figcaption></figure></div><div class="cerui-manufacturing-grid">${manufacturing.map((item, index) => `<article><span>0${index + 1}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join('')}</div></div></section>
  <section class="cerui-about-racing section"><div class="container cerui-about-racing-grid"><div><img src="${assetUrl('cerui/cerui-motorsport-53-v1.webp')}" alt="CIRUI motorsport number 53 race car" loading="lazy"></div><div><p class="cerui-overline"><span></span>MOTORSPORT + EVENTS</p><h2>Part of the culture<br><em>we build for.</em></h2><p>CIRUI participates in events and motorsport activity, placing the brand in direct contact with modified cars, enthusiast expectations and performance use.</p><ul><li>Track and race participation</li><li>Wheel and tuning exhibitions</li><li>Real-world finish and fitment feedback</li></ul></div></div></section>
  <section class="cerui-global section"><div class="container cerui-global-grid"><div><p class="cerui-overline"><span></span>GLOBAL DELIVERY</p><h2>One technical brief.<br><em>One export route.</em></h2><p>For eligible destinations, CIRUI can quote DDP delivery so the production and landed-delivery conversation is handled together. The confirmed quote defines duties, destination, timing and final scope.</p><div class="cerui-global-facts"><span><strong>Europe + North America</strong><small>Primary overseas market focus</small></span><span><strong>About 30 business days</strong><small>Target production + transport, confirmed per order</small></span></div><a class="btn btn-primary" href="/fitment-lab" data-app-path>Start a global build</a></div><img src="${assetUrl('cerui/cerui-event-porsche-v1.webp')}" alt="CIRUI Forged exhibition with custom vehicles" loading="lazy"></div></section>
  <section class="cerui-about-cta"><div class="container"><img src="${assetUrl('cerui/cerui-mark-black-v1.webp')}" alt="CIRUI Forged mark" loading="lazy"><div><p class="cerui-overline"><span></span>BUILD WITH CIRUI</p><h2>Bring the car.<br><em>We will build the numbers.</em></h2></div><div><a class="btn btn-primary" href="/fitment-lab" data-app-path>Open fitment lab</a><a class="btn btn-light" href="#store" data-category-link="Wheels">Browse wheels</a></div></div></section></main>`;
}

function homePage() {
  return `<section class="hero" id="home"><div class="container hero-content"><div class="hero-copy reveal">
    <div class="hero-kicker">The CIRUI fitment system</div>
    <h1>Find what fits <em>your ride.</em></h1>
    <p class="hero-sub">Wheels, calipers, rotors and pads selected around your car — with real fitment notes, honest reviews and shipping you can track.</p>
    <div class="fitment-card" id="fitment">${vehicleSelector('hero')}<button class="btn btn-primary" data-action="shop-vehicle">Shop now</button></div>${fitmentPreview()}
    <div class="hero-foot"><span><strong>60,000+</strong> builds studied</span><span><strong>4.9/5</strong> verified reviews</span><span><strong>48 hr</strong> brake parts dispatch</span></div>
  </div></div></section>
  <div class="container"><div class="trust-strip"><div class="trust-item"><div class="trust-icon">${icons.shield}</div><div><strong>Fitment checked</strong><span>Confidence before checkout</span></div></div><div class="trust-item"><div class="trust-icon">${icons.truck}</div><div><strong>Fast global delivery</strong><span>Live estimates at checkout</span></div></div><div class="trust-item"><div class="trust-icon">${icons.bolt}</div><div><strong>Build-ready stock</strong><span>In-stock picks ship first</span></div></div><div class="trust-item"><div class="trust-icon">${icons.chat}</div><div><strong>Real human help</strong><span>Talk to a fitment expert</span></div></div></div></div>
  <section class="section" id="gallery"><div class="container"><div class="section-heading"><div><p class="eyebrow">Start with your platform</p><h2>Fitment video guides</h2></div><p>See the stance, clearance and brake-room decisions before you buy. Every guide is built to make the next click feel obvious.</p></div><div class="guide-grid">${guideCards.map(([name, caption, image], i) => `<a class="guide-card spotlight-card reveal delay-${i % 4}" href="#store"><img src="${assetUrl(image)}" alt="${esc(name)} fitment guide" loading="lazy"><div class="guide-label"><small>${caption}</small><strong>${name}</strong></div></a>`).join('')}</div></div></section>
  <section class="section-tight" style="background:#f7f9fa"><div class="container"><div class="section-heading"><div><p class="eyebrow">One catalog, all the pieces</p><h2>Shop the build</h2></div><a class="btn btn-dark" href="#store">View all parts</a></div><div class="category-grid">${categories.map(([name, copy, icon], i) => `<a class="category-card reveal delay-${i % 4}" href="#store" data-category-link="${esc(name.includes('Wheel') ? 'Wheels' : name)}"><div class="category-icon">${iconForCategory(icon)}</div><strong>${name}</strong><span>${copy}</span></a>`).join('')}</div></div></section>
  <section class="section" id="brands"><div class="container"><div class="section-heading"><div><p class="eyebrow">Popular right now</p><h2>Best-selling wheels</h2></div><p>Our most saved silhouettes, translated into CIRUI fitment notes so you can compare the visual and the actual spec.</p></div><div class="product-grid">${products.filter(p => p.category === 'Wheels').slice(0, 4).map(renderProductCard).join('')}</div></div></section>
  <section class="section-tight"><div class="container"><div class="brand-feature"><div><p class="eyebrow" style="color:var(--lime)">CIRUI brake lab</p><h2>Make the <span>stop</span> part of the build.</h2><p>From quiet street pads to six-piston ceramic kits, every braking product is presented with clearance, heat and daily-use context.</p><a class="btn btn-primary" href="#store" data-category-link="Calipers">Explore braking</a></div><div class="brand-carousel">${[['a7dd472643daf9b4.jpg', 'Ceramic Pro'], ['fe1a37ef746c28f0.jpg', 'Street 4P'], ['e78ac1cfdeae4727.jpg', 'Track Slotted'], ['f5effff1812a14eb.jpg', 'Street Blue']].map(([image, label]) => `<div class="brand-item"><img src="${assetUrl(image)}" alt="${label}" loading="lazy"><span>${label}</span></div>`).join('')}</div></div></div></section>
  <section class="section" id="resources"><div class="container"><div class="section-heading"><div><p class="eyebrow">Proof from the community</p><h2>Built by people who drive them.</h2></div><p>4.9/5 from CIRUI customers across daily builds, weekend cars and track setups.</p></div><div class="reviews-layout"><div class="review-score"><strong>4.9</strong>${stars(4.9)}<p>from 16,494 verified reviews</p><div class="review-bars"><div class="review-bar"><span>5★</span><i class="bar-track"><i style="width:94%"></i></i><span>94%</span></div><div class="review-bar"><span>4★</span><i class="bar-track"><i style="width:5%"></i></i><span>5%</span></div><div class="review-bar"><span>3★</span><i class="bar-track"><i style="width:1%"></i></i><span>1%</span></div></div></div><div class="review-list">${reviews.slice(0, 2).map((review, i) => renderReview(review, i)).join('')}</div></div></div></section>`;
}

function customWheelHomePage() {
  const customSpecs = [
    ['01', 'Diameter + width', 'Set the visual stance and usable tire envelope.'],
    ['02', 'PCD + center bore', 'Match the hub, lug pattern and hardware before production.'],
    ['03', 'ET + brake clearance', 'Balance concavity, caliper room and the way you drive.'],
    ['04', 'Finish + center cap', 'Make the final surface, logo and details yours.']
  ];
  const buyerModes = [
    ['Street builds', 'Daily fitment with a cleaner stance, correct clearance and a finish you can live with.', 'Stock, lowered or mildly modified'],
    ['Show cars', 'One-off color combinations, deep lips, custom caps and a wheel that owns the room.', 'Visual impact, built around your brief'],
    ['Track setups', 'Wider grip, brake room and function-first offset decisions for hard laps.', 'Brake clearance and use-case led'],
    ['Dealers + brands', 'Repeatable specs, private-label details and a factory route that scales with your catalog.', 'OEM / ODM / wholesale ready']
  ];
  const customProcess = [
    ['Check the chassis', 'Vehicle, brakes, suspension and current use case.'],
    ['Lock the numbers', 'Diameter, width, PCD, ET, bore and brake clearance.'],
    ['Approve the look', 'Design direction, finish, center cap and brand details.'],
    ['Build + ship', 'Production updates, final inspection and global delivery.']
  ];
  return `<section class="custom-wheel-hero" id="home"><div class="container custom-wheel-hero-grid"><div class="custom-wheel-copy reveal"><p class="custom-kicker">CIRUI Custom Wheel Studio <span>Made to your numbers</span></p><h1>Made for your <em>exact build.</em></h1><p class="custom-hero-sub">Custom forged wheels for drivers who know the difference between a wheel that looks right and a wheel that fits right. Bring us the car, the stance and the finish — we will turn the brief into a build-ready spec.</p><div class="custom-hero-actions"><a class="btn btn-primary" href="#home#custom-build">Start a custom build</a><a class="btn btn-light" href="#fitment" data-action="open-fitment-lab">Check chassis fitment</a><a class="btn btn-light" href="#store" data-category-link="Wheels">Shop finished wheels</a></div><div class="custom-hero-proof"><span><strong>1:1</strong> build brief</span><span><strong>PCD · ET · CB</strong> fitment-led</span><span><strong>Global</strong> delivery support</span></div></div><div class="custom-wheel-stage spotlight-card reveal delay-2"><div class="custom-stage-index">BUILD 001 <span>/ CIRUI CUSTOM</span></div><div class="custom-stage-ring"></div><img src="${assetUrl('rse-01.png')}" alt="CIRUI custom black performance wheel" loading="eager" decoding="async" fetchpriority="high"><div class="custom-stage-caption"><strong>Form follows fitment.</strong><span>Monoblock / satin black / custom spec</span></div></div></div><div class="container custom-wheel-rail"><a href="#home#custom-build"><span>01</span> Configure your spec</a><a href="#fitment" data-action="open-fitment-lab"><span>02</span> Check chassis + parts</a><a href="#home#gallery"><span>03</span> Browse real builds</a><a href="#home#brands"><span>04</span> Shop ready designs</a></div></section>
  <div class="container"><div class="trust-strip custom-trust-strip"><div class="trust-item"><div class="trust-icon">${icons.shield}</div><div><strong>Fitment before finish</strong><span>Numbers first. No guesswork.</span></div></div><div class="trust-item"><div class="trust-icon">${icons.spark}</div><div><strong>Made-to-order options</strong><span>Size, color, cap and detail.</span></div></div><div class="trust-item"><div class="trust-icon">${icons.bolt}</div><div><strong>Proof before production</strong><span>Review the brief before we build.</span></div></div><div class="trust-item"><div class="trust-icon">${icons.chat}</div><div><strong>Human fitment help</strong><span>Talk to a real build specialist.</span></div></div></div></div>
  <section class="custom-build-section section" id="custom-build"><div class="container"><div class="custom-section-heading"><div><p class="eyebrow">The custom brief</p><h2>Spec it once.<br><span>Get the wheel right.</span></h2></div><p>Custom wheel buyers are not choosing a generic product from a shelf. They are choosing a stance, a purpose and a set of numbers that have to work together. CIRUI makes that decision visible before the order moves forward.</p></div><div class="custom-build-grid"><div class="custom-vehicle-card"><div class="custom-card-top"><span class="custom-step-number">01</span><div><p class="eyebrow">Start with the vehicle</p><h3>Tell us what you drive.</h3></div></div><p>Stock car, lowered street build, big-brake setup or full project — start with the platform so the wheel can be designed around the real clearance.</p><div class="fitment-card custom-fitment-card" id="fitment-inline">${vehicleSelector('hero')}<button class="btn btn-primary" data-action="open-fitment-lab">Open the fitment lab</button></div>${fitmentPreview()}</div><div class="custom-spec-card"><p class="eyebrow">What we lock together</p><div class="custom-spec-list">${customSpecs.map(([number, title, copy]) => `<div class="custom-spec-row"><strong>${number}</strong><div><h3>${title}</h3><p>${copy}</p></div></div>`).join('')}</div><div class="custom-spec-tags"><span>Forged / 1-piece / 2-piece</span><span>Deep concave / step lip</span><span>Custom finish / cap / logo</span></div></div></div></div></section>
  <section class="custom-audience section-tight"><div class="container"><div class="custom-section-heading compact"><div><p class="eyebrow">Built around the buyer</p><h2>One wheel studio.<br><span>Four ways to build.</span></h2></div><p>Lead with the use case instead of forcing every visitor through the same catalog path.</p></div><div class="custom-audience-grid">${buyerModes.map(([title, copy, meta], i) => `<article class="custom-audience-card reveal delay-${i % 4}"><span class="custom-audience-index">0${i + 1}</span><h3>${title}</h3><p>${copy}</p><small>${meta}</small></article>`).join('')}</div></div></section>
  <section class="custom-workshop section" id="workshop"><div class="container"><div class="custom-workshop-grid"><div class="custom-workshop-media spotlight-card"><img src="${assetUrl('ff2a26733252a2c8.jpg')}" alt="Custom wheel engineering and finish reference" loading="lazy"><div class="custom-media-stamp"><strong>CIRUI / 001</strong><span>Engineering reference</span></div><div class="custom-media-note">Finished wheel study · finish and spoke direction</div></div><div class="custom-workshop-copy"><p class="eyebrow">From brief to build</p><h2>A custom wheel is a process, not a product card.</h2><p>Strong custom-wheel brands sell confidence: a clear brief, transparent fitment decisions, a finish that feels personal and a human who stays close when the build gets specific.</p><div class="custom-process-list">${customProcess.map(([title, copy], i) => `<div class="custom-process-row"><span>0${i + 1}</span><div><strong>${title}</strong><p>${copy}</p></div></div>`).join('')}</div><div class="custom-workshop-actions"><a class="btn btn-primary" href="#fitment" data-action="open-fitment-lab">Open fitment lab</a><a class="btn btn-dark" href="#home#custom-build">Build my wheel brief</a></div></div></div></div></section>
  <section class="section custom-finish-section"><div class="container"><div class="custom-finish-grid"><div><p class="eyebrow">The details buyers remember</p><h2>Color is only the beginning.</h2><p class="muted">A custom wheel feels premium when the small decisions are easy to compare: satin or gloss, deep or flush, center cap or branded, street-safe or track-led.</p><div class="custom-finish-chips"><span>Gloss / satin / matte</span><span>Brushed / polished / milled</span><span>Custom center caps</span><span>Laser logo details</span><span>1-piece / 2-piece</span><span>Road / show / track</span></div></div><div class="custom-finish-collage"><div class="custom-finish-tile large"><img src="${assetUrl('0938e8f8953be744.jpg')}" alt="Polished multi-spoke custom wheel" loading="lazy"><span>Polished / multi-spoke</span></div><div class="custom-finish-tile"><img src="${assetUrl('038bd6e7abb31b4c.jpg')}" alt="Gloss black custom wheel" loading="lazy"><span>Gloss / deep dish</span></div><div class="custom-finish-tile"><img src="${assetUrl('daff2c93eff5e0db.jpg')}" alt="Graphite custom wheel" loading="lazy"><span>Graphite / performance</span></div></div></div></div></section>
  <section class="section" id="gallery"><div class="container"><div class="section-heading"><div><p class="eyebrow">Verified builds only</p><h2>Customer build gallery.</h2></div><p>See how custom wheels look on real cars and finished builds.</p></div>${fboxCases.length ? `<div class="guide-grid">${fboxCases.map((item, i) => `<article class="guide-card spotlight-card reveal delay-${i % 4}"><img src="${esc(item.image_url)}" alt="${esc(item.title)}" loading="lazy"><div class="guide-label"><small>${esc(item.vehicle || item.product_name || 'CIRUI build')}</small><strong>${esc(item.title)}</strong></div></article>`).join('')}</div>` : '<div class="case-empty"><strong>Customer builds are coming soon.</strong><span>See real wheel fitment and finish examples from new builds.</span></div>'}</div></section>
  <section class="section custom-ready-section" id="brands"><div class="container"><div class="custom-ready-head"><div><p class="eyebrow">For buyers who want it now</p><h2>Start with a proven design.<br><span>Make it yours.</span></h2></div><div><p>These ready-to-buy CIRUI wheels stay in the catalog exactly as before. Use them as a starting point, or ask us to take the fitment and finish further.</p><a class="btn btn-dark" href="#store" data-category-link="Wheels">Browse finished wheels</a></div></div><div class="product-grid">${products.filter(p => p.category === 'Wheels').slice(0, 4).map(renderProductCard).join('')}</div></div></section>
  <section class="section-tight"><div class="container"><div class="brand-feature"><div><p class="eyebrow" style="color:var(--lime)">CIRUI brake lab</p><h2>Make the <span>stop</span> part of the build.</h2><p>From quiet street pads to six-piston ceramic kits, every braking product is presented with clearance, heat and daily-use context.</p><a class="btn btn-primary" href="#store" data-category-link="Calipers">Explore braking</a></div><div class="brand-carousel">${[['a7dd472643daf9b4.jpg', 'Ceramic Pro'], ['fe1a37ef746c28f0.jpg', 'Street 4P'], ['e78ac1cfdeae4727.jpg', 'Track Slotted'], ['f5effff1812a14eb.jpg', 'Street Blue']].map(([image, label]) => `<div class="brand-item"><img src="${assetUrl(image)}" alt="${label}" loading="lazy"><span>${label}</span></div>`).join('')}</div></div></div></section>
  <section class="section" id="resources"><div class="container"><div class="section-heading"><div><p class="eyebrow">Verified customer feedback</p><h2>Reviews will live here.</h2></div><p>Customer experiences will appear here as new builds are completed.</p></div><div class="case-empty"><strong>Customer reviews are coming soon.</strong><span>Share your fitment experience with other drivers.</span></div></div></section>`;
}

function homeReviewSection() {
  const stats = reviewStats(reviews);
  const records = reviews.slice(0, 2);
  if (!records.length) return `<section class="section" id="resources"><div class="container"><div class="section-heading"><div><p class="eyebrow">Customer feedback</p><h2>Reviews are coming soon.</h2></div><p>See what drivers say after their wheels are on the car.</p></div><div class="case-empty"><strong>No customer reviews yet.</strong><span>Share your fitment experience with other drivers.</span></div></div></section>`;
  return `<section class="section" id="resources"><div class="container"><div class="section-heading"><div><p class="eyebrow">Verified customer feedback</p><h2>Built by people who drive them.</h2></div><p>Real feedback from drivers building daily cars, weekend projects and track setups.</p></div><div class="reviews-layout"><div class="review-score"><strong>${stats.rating.toFixed(1)}</strong>${stars(stats.rating)}<p>${formatUiLabel('{count} customer reviews', { count: stats.total })}</p><div class="review-bars">${reviewBars(stats)}</div></div><div class="review-list">${records.map((review, index) => renderReview(review, index)).join('')}</div></div></div></section>`;
}

function sourcePhotoReviewCard(review, index = 0) {
  const photo = assetUrl(review.image_url || '');
  const productImage = assetUrl(review.product_image || review.image_url || '');
  const countryCode = String(review.country_code || review.country || 'INT').slice(0, 3).toUpperCase();
  const dateLabel = review.date_label || reviewDateLabel(review.created_at) || 'Photo review';
  const reply = review.seller_replied
    ? '<div class="source-review-reply"><span>Seller replied</span><span>Customer build photo</span></div>'
    : '<div class="source-review-reply"><span>Photo review</span><span>5-star customer feedback</span></div>';
  return `<article class="source-review-card reveal delay-${index % 4}"><div class="source-review-top"><div class="source-review-buyer"><span class="source-review-country-code">${esc(countryCode)}</span><div><div class="source-review-name"><strong>${esc(review.reviewer || 'Verified buyer')}</strong><span>${esc(review.country || 'International buyer')}</span></div><div class="source-review-rating"><span class="source-review-stars" aria-label="5 out of 5 stars">★★★★★</span><time>${esc(dateLabel)}</time></div></div></div></div><div class="source-review-product"><img src="${esc(productImage)}" alt="${esc(review.product_name || 'Custom forged wheel')}" loading="lazy"><div><span class="source-review-verified">✓ Verified purchase</span><strong>${esc(review.product_name || 'Custom forged wheel')}</strong></div></div><p class="source-review-copy">${esc(review.body || review.title || 'Beautiful custom wheel build.')}</p><a class="source-review-photo" href="${esc(photo)}" target="_blank" rel="noopener noreferrer"><img src="${esc(photo)}" alt="Customer photo for ${esc(review.product_name || 'custom forged wheel')}" loading="lazy"><span>Customer photo</span></a><div class="source-review-footer"><span>Helpful (${Number(review.helpful || 0)})</span><span>${Number(review.rating || 5)}-star review</span></div>${reply}</article>`;
}

function homeCustomerBuildCard(review, index = 0) {
  const photo = assetUrl(review.image_url || '');
  const countryCode = String(review.country_code || review.country || 'INT').slice(0, 3).toUpperCase();
  const dateLabel = reviewDateLabel(review.created_at) || review.date_label || uiLabel('Customer build');
  const productName = ciruiPublicBrandText(review.product_name || 'Custom forged wheel');
  const country = localizedCountryName(review.country_code, review.country || uiLabel('International customer'));
  return `<a class="cerui-customer-build-card reveal delay-${index % 4}" href="${esc(photo)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(uiLabel('Open customer build photo'))}: ${esc(productName)}"><figure><img src="${esc(photo)}" alt="${esc(productName)} · ${esc(uiLabel('fitted to a customer vehicle'))}" loading="lazy" decoding="async"><span>${esc(countryCode)}</span><b>${icons.eye}</b></figure><div><small>${uiLabel('Verified customer build')}</small><strong>${esc(productName)}</strong><span>${esc(country)} · ${esc(dateLabel)}</span></div></a>`;
}

function homePhotoReviewGallery() {
  const records = fboxPhotoReviews.slice(0, 20);
  if (!records.length) return `<section class="section cerui-customer-builds" id="gallery"><div class="container"><div class="cerui-section-head"><div><p class="cerui-overline"><span></span>${uiLabel('CUSTOMER CARS')}</p><h2>${uiLabel('Customer builds')}<br><em>${uiLabel('are coming soon.')}</em></h2></div><p>${uiLabel('Customer-submitted fitment photos will appear here after approval.')}</p></div></div></section>`;
  const expanded = Boolean(state.homeBuildsExpanded);
  const buttonLabel = expanded ? uiLabel('Show fewer customer cars') : formatUiLabel('View all {count} customer cars', { count: records.length });
  return `<section class="section cerui-customer-builds ${expanded ? 'is-expanded' : ''}" id="gallery" data-customer-build-gallery><div class="container"><div class="cerui-section-head"><div><p class="cerui-overline"><span></span>${uiLabel('CUSTOMER CARS')}</p><h2>${uiLabel('See CIRUI wheels')}<br><em>${uiLabel('after fitment.')}</em></h2></div><p>${uiLabel('Explore approved owner photos to compare stance, finish, spoke depth and real-world presence. Start with a quick preview, then open the full gallery.')}</p></div><div class="cerui-customer-build-grid">${records.map(homeCustomerBuildCard).join('')}</div><div class="cerui-customer-build-toggle"><span><strong>${formatUiLabel('{count} approved builds', { count: records.length })}</strong><small>${uiLabel('Open any image for a closer look.')}</small></span><button type="button" class="btn btn-light" data-action="toggle-customer-builds" aria-expanded="${expanded}"><span>${buttonLabel}</span>${icons.chevron}</button></div></div></section>`;
}

function iconForCategory(type) {
  if (type === 'truck') return icons.truck;
  if (type === 'shield') return icons.shield;
  if (type === 'bolt') return icons.bolt;
  if (type === 'disc') return icons.spark;
  if (type === 'arrow') return icons.chevron;
  return icons.spark;
}

const catalogCollections = {
  all: {
    label: 'All forged wheels',
    eyebrow: 'CIRUI FORGED CATALOG',
    title: 'Choose the design. We build the exact specification.',
    copy: 'Browse CIRUI wheel styles and design directions. Open any product to view its images and technical information, then contact CIRUI when you need further confirmation.'
  },
  monoblock: {
    label: 'Monoblock forged',
    eyebrow: 'ONE-PIECE CONSTRUCTION',
    title: 'Monoblock forged wheels.',
    copy: 'Single-piece forged directions for performance, road and luxury builds. Final load target, profile and fitment remain vehicle-specific.'
  },
  'two-piece': {
    label: '2-piece forged',
    eyebrow: 'MODULAR CONSTRUCTION',
    title: '2-piece forged wheels.',
    copy: 'Separate center and barrel/lip directions for deeper profiles and more finish combinations. Visible classifications are verified again on the approved drawing.'
  },
  'aero-floating': {
    label: 'Aero & floating',
    eyebrow: 'AERO DESIGN COLLECTION',
    title: 'Aero and floating-cap directions.',
    copy: 'Full-face, turbine and floating-cap ideas for modern luxury and EV builds. The base construction is confirmed during engineering review.'
  },
  'suv-off-road': {
    label: 'SUV & off-road',
    eyebrow: 'LOAD-LED APPLICATIONS',
    title: 'SUV and off-road directions.',
    copy: 'Wheel directions organized around vehicle load, tire envelope and terrain use. Beadlock-style appearance never replaces the final engineering specification.'
  }
};

function productConstructionLabel(item) {
  return ({ 'monoblock': 'Monoblock', 'two-piece': '2-piece', 'unknown': 'Confirm with drawing' })[item?.construction] || 'Confirm with drawing';
}
function productClassificationLabel(item) {
  return ({ confirmed: 'Confirmed specification', 'visual-inference': 'Classified from supplied views', 'needs-confirmation': 'Engineering confirmation required' })[item?.classification_status] || 'Engineering confirmation required';
}
function productDesignLabel(item) {
  const value = String(item?.design_family || 'custom').replace(/-/g, ' ');
  return value.replace(/\b\w/g, letter => letter.toUpperCase());
}
function publicForgedProducts() {
  return products.filter(item => item
    && item.category === 'Wheels'
    && item.status !== 'draft'
    && item.status !== 'archived'
    && item.public_scope !== false
    && !item.vehicle_label
    && !String(item.id || '').startsWith('cerui-'));
}
function productMatchesCollection(item, collection = state.filters.collection) {
  if (!collection || collection === 'all') return true;
  if (collection === 'monoblock' || collection === 'two-piece') return item.construction === collection;
  if (collection === 'aero-floating') return item.design_family === 'aero-disc' || (item.applications || []).includes('aero-floating');
  if (collection === 'suv-off-road') return item.design_family === 'off-road' || (item.applications || []).includes('suv-off-road');
  return true;
}
function setCatalogCollection(collection = 'all') {
  state.filters.category = 'Wheels';
  state.filters.collection = catalogCollections[collection] ? collection : 'all';
  state.filters.application = 'all';
  state.search = '';
}

function filterProducts() {
  let list = publicForgedProducts().filter(item => {
    const f = state.filters;
    const query = state.search.trim().toLowerCase();
    const applicationMatch = !f.application || f.application === 'all' || (item.applications || []).includes(f.application) || item.design_family === f.application;
    return productMatchesCollection(item, f.collection)
      && applicationMatch
      && (f.finish === 'All' || item.finish === f.finish)
      && (!query || [item.catalog_display_name, item.name, item.brand, item.part, item.meta, item.construction, item.design_family, item.spoke_style, ...(item.applications || []), productSizeNote(item)].join(' ').toLowerCase().includes(query));
  });
  if (state.sort === 'latest') {
    list.sort((left, right) => {
      const leftSort = Math.max(0, Math.floor(Number(left.sort || 0)));
      const rightSort = Math.max(0, Math.floor(Number(right.sort || 0)));
      if (leftSort || rightSort) {
        if (!leftSort) return 1;
        if (!rightSort) return -1;
        if (leftSort !== rightSort) return leftSort - rightSort;
      }
      return String(right.created_at || right.updated_at || '').localeCompare(String(left.created_at || left.updated_at || ''));
    });
  }
  if (state.sort === 'price-low') list.sort((a, b) => a.price - b.price);
  if (state.sort === 'price-high') list.sort((a, b) => b.price - a.price);
  if (state.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
  return list;
}
function renderProductCard(item) {
  const structureClass = item.construction === 'two-piece' ? 'is-two-piece' : item.construction === 'monoblock' ? 'is-monoblock' : 'is-pending';
  return `<article class="product-card forged-product-card spotlight-card reveal"><div class="product-media"><span class="product-badge ${structureClass}">${uiLabel(productConstructionLabel(item))}</span><img class="product-image ${item.image_cutout ? 'is-cutout' : ''}" src="${assetUrl(item.image)}" alt="${esc(productNameText(item))} ${esc(productFinishText(item))}" loading="lazy" decoding="async"></div><div class="product-body"><div class="product-brand">${esc(item.part || 'CIRUI FORGED')} · ${esc(productDesignLabel(item))}</div><h3 class="product-title">${esc(productNameText(item))}</h3><div class="product-meta">${uiLabel(productConstructionLabel(item))} · ${uiLabel(productDesignLabel(item))}</div><div class="product-cta"><a class="btn btn-outline btn-small" href="#product/${item.id}">${uiLabel('View details')}</a><button class="btn btn-primary btn-small" data-action="contact-inquiry" data-id="${item.id}">${uiLabel('Inquire now')}</button></div></div></article>`;
}

function legacyStorePage() {
  const list = filterProducts();
  const fitmentBanner = state.vehicle?.trim ? `<div class="fitment-match-banner"><div><p class="eyebrow">Fitment context</p><strong>${esc(currentVehicleLabel())}</strong><span>Products below are shown with the selected vehicle context.</span></div><button class="btn btn-outline btn-small" data-action="change-vehicle">Change vehicle</button></div>` : '';
  return `<section class="store-hero"><div class="container"><div class="breadcrumbs"><a href="#home">Home</a><span>/</span><span>${state.filters.category === 'All' ? 'Performance parts' : state.filters.category}</span></div><h1>${state.filters.category === 'All' ? 'All performance parts' : state.filters.category}</h1><p class="muted">Fitment-first shopping for wheels, calipers, rotors and pads. Prices, stock and product status are managed by the CIRUI catalog.</p></div></section>
<main class="container store-layout"><aside class="filter-rail"><div class="filter-head"><strong>Filter with CIRUI AI</strong><span>Describe the look or setup you want. We will narrow the catalog.</span></div><div class="filter-section"><input class="filter-input" data-filter="ai" placeholder="e.g. bronze wheels for 2020 Civic" value="${esc(state.search)}"><p class="filter-help">Try “track pads”, “19 inch black wheels”, or a car model.</p></div><div class="filter-section"><h3>Delivery estimate</h3><div class="filter-stack"><input class="filter-input" data-filter="zip" placeholder="Deliver to ZIP / postcode"><button class="btn btn-outline btn-small" data-action="save-zip">Save location</button></div></div><div class="filter-section"><h3>Search by vehicle</h3>${vehicleSelector('store')}<button class="btn btn-dark btn-small filter-apply" data-action="shop-vehicle">Apply vehicle</button></div><div class="filter-section"><h3>Product type</h3><select class="filter-select" data-filter="category">${selectOptions(['All', 'Wheels', 'Calipers', 'Rotors', 'Brake Pads'], state.filters.category, 'All parts')}</select></div><div class="filter-section"><h3>Fitment preferences</h3><label class="check-row"><input type="checkbox" data-filter="saleOnly" ${state.filters.saleOnly ? 'checked' : ''}> In-stock deals only</label><select class="filter-select" data-filter="finish">${selectOptions(['All', 'Satin Black', 'Bronze Machined', 'Gloss Black', 'Matte Bronze', 'Racing Red', 'Electric Blue', 'Black Hat', 'Ceramic'], state.filters.finish, 'All finishes')}</select></div><div class="filter-section"><h3>Wheel diameter <span>inches</span></h3><select class="filter-select" data-filter="diameter">${selectOptions(['All', '17', '18', '19', '20'], state.filters.diameter, 'Any diameter')}</select></div><div class="filter-section"><h3>Price range</h3><div class="filter-row"><input class="filter-input" data-filter="minPrice" placeholder="Min" value="${esc(state.filters.minPrice)}"><input class="filter-input" data-filter="maxPrice" placeholder="Max" value="${esc(state.filters.maxPrice)}"></div></div><div class="filter-section"><h3>Customer rating</h3><select class="filter-select" data-filter="minRating">${selectOptions(['0', '4', '4.5', '4.8'], state.filters.minRating, 'Any rating')}</select></div></aside><section class="store-main"><div class="ai-query"><span style="color:var(--lavender)">${icons.spark}</span><input data-filter="ai" placeholder="CIRUI AI: Search by vehicle, product, finish or use case" value="${esc(state.search)}"><button class="btn btn-primary btn-small" data-action="ai-filter">Search</button></div>${fitmentBanner}<div class="store-toolbar"><div class="result-count">${formatUiLabel('{count} results', { count: list.length })} <span>${state.vehicle ? `· ${formatUiLabel('fits {vehicle}', { vehicle: esc(currentVehicleLabel()) })}` : ''}</span></div><div class="toolbar-actions"><button class="btn btn-outline btn-small" data-action="clear-filters">Clear filters</button><select class="toolbar-select" data-filter="sort"><option value="latest" ${state.sort === 'latest' ? 'selected' : ''}>Newest arrivals</option><option value="price-low" ${state.sort === 'price-low' ? 'selected' : ''}>Price: low to high</option><option value="price-high" ${state.sort === 'price-high' ? 'selected' : ''}>Price: high to low</option><option value="rating" ${state.sort === 'rating' ? 'selected' : ''}>Highest rated</option></select></div></div>${list.length ? `<div class="product-grid">${list.map(renderProductCard).join('')}</div>` : `<div class="empty-state"><h2>No exact matches yet.</h2><p>Try clearing one filter or tell CIRUI what you want in the AI search.</p><button class="btn btn-primary" data-action="clear-filters">Reset catalog</button></div>`}</section></main>`;
}

function storePage() {
  const list = filterProducts();
  const context = catalogCollections[state.filters.collection] || catalogCollections.all;
  const applications = [
    ['all', 'All uses'],
    ['performance', 'Performance'],
    ['luxury', 'Luxury'],
    ['heritage', 'Heritage'],
    ['street', 'Street']
  ];
  const fitmentBanner = '';
  const visualizerNotice = state.catalogNotice === 'visualizer'
    ? `<div class="catalog-visualizer-notice">${icons.image}<div><strong>${uiLabel('Choose a wheel to preview on your car.')}</strong><span>${uiLabel('Open any design, then use the vehicle-photo visualizer on the product page.')}</span></div></div>`
    : '';
  return `<section class="store-hero forged-catalog-hero"><div class="container"><div class="breadcrumbs"><a href="#home">${uiLabel('Home')}</a><span>/</span><span>${uiLabel('Forged wheel catalog')}</span></div><p class="eyebrow">${uiLabel(context.eyebrow)}</p><h1>${uiLabel(context.title)}</h1><p>${uiLabel(context.copy)}</p><div class="catalog-collection-tabs">${Object.entries(catalogCollections).map(([key, item]) => `<a href="#store" class="${state.filters.collection === key ? 'is-active' : ''}" data-action="catalog-collection" data-collection="${key}">${uiLabel(item.label)}</a>`).join('')}</div></div></section>
  <main class="container store-layout forged-store-layout"><aside class="filter-rail forged-filter-rail"><div class="filter-head"><strong>${uiLabel('Find the right starting design')}</strong><span>${uiLabel('Filters update the visible catalog immediately. Contact CIRUI to confirm any technical detail.')}</span></div><div class="filter-section"><h3>${uiLabel('Search designs')}</h3><input class="filter-input" data-filter="ai" placeholder="${esc(uiLabel('Model code, spoke style or finish'))}" value="${esc(state.search)}"></div><div class="filter-section"><h3>${uiLabel('Construction')}</h3><div class="catalog-filter-buttons">${Object.entries(catalogCollections).slice(0, 3).map(([key, item]) => `<button class="${state.filters.collection === key ? 'is-active' : ''}" data-action="catalog-collection" data-collection="${key}">${uiLabel(item.label)}</button>`).join('')}</div></div><div class="filter-section"><h3>${uiLabel('Application')}</h3><select class="filter-select" data-filter="application">${applications.map(([value, label]) => `<option value="${value}" ${state.filters.application === value ? 'selected' : ''}>${uiLabel(label)}</option>`).join('')}</select></div><div class="filter-section"><h3>${uiLabel('Vehicle fitment')}</h3>${vehicleSelector('store')}<button class="btn btn-dark btn-small filter-apply" data-action="shop-vehicle">${uiLabel('Attach vehicle')}</button></div></aside><section class="store-main">${visualizerNotice}${fitmentBanner}<div class="store-toolbar"><div class="result-count">${formatUiLabel('{count} results', { count: list.length })}<span> · ${uiLabel(context.label)}</span></div><div class="toolbar-actions"><button class="btn btn-outline btn-small" data-action="clear-filters">${uiLabel('Reset')}</button></div></div>${list.length ? `<div class="product-grid">${list.map(renderProductCard).join('')}</div>` : `<div class="empty-state"><h2>${uiLabel('No wheel matches every filter.')}</h2><p>${uiLabel('Reset the catalog or send the design reference to CIRUI for a custom direction.')}</p><button class="btn btn-primary" data-action="clear-filters">${uiLabel('Reset catalog')}</button></div>`}</section></main>`;
}

function aiWheelVehicleContext() {
  const vehicle = state.fitment?.vehicle || state.vehicle;
  if (!vehicle) return '';
  return [vehicle.year, vehicle.make, vehicle.model, vehicle.trim, vehicle.drive].filter(Boolean).join(' ');
}

function aiWheelSelectedConcept() {
  const current = state.aiWheelDesign;
  return current.selectedIndex >= 0 ? current.concepts[current.selectedIndex] : null;
}

function aiWheelDesignProgress() {
  const current = state.aiWheelDesign;
  const active = current.stage === 'multiview' ? 3 : current.stage === 'concepts' ? 2 : 1;
  return `<nav class="ai-wheel-progress" aria-label="${esc(uiLabel('AI Wheel Design Studio'))}">${[
    ['01 Brief', 1],
    ['02 Choose', 2],
    ['03 Multi-view', 3]
  ].map(([label, index]) => `<span class="${active === index ? 'is-active' : active > index ? 'is-complete' : ''}"><b>${active > index ? '✓' : String(index).padStart(2, '0')}</b><small>${uiLabel(label)}</small></span>`).join('')}</nav>`;
}

function aiWheelOption(value, selected, label = value) {
  return `<option value="${esc(value)}" ${String(value) === String(selected) ? 'selected' : ''}>${uiLabel(label)}</option>`;
}

function aiWheelBriefMarkup() {
  const current = state.aiWheelDesign;
  const draft = current.draft || {};
  const mode = draft.mode || 'text-reference';
  const showReference = mode !== 'text';
  const vehicleContext = aiWheelVehicleContext();
  const referenceMarkup = current.referenceData
    ? `<div class="ai-wheel-reference-preview"><img src="${esc(current.referenceData)}" alt="${esc(current.referenceName || uiLabel('Optional reference image'))}"><div><strong>${uiLabel('This reference will guide the new design')}</strong><span>${esc(current.referenceName)}</span><button type="button" data-action="ai-design-remove-reference">${uiLabel('Remove reference')}</button></div></div>`
    : `<label class="ai-wheel-upload"><input type="file" accept="image/jpeg,image/png,image/webp" data-ai-design-upload><span>${icons.image}</span><strong>${uiLabel('Upload a wheel image')}</strong><small>${uiLabel('JPG, PNG or WebP · up to 14 MB')}</small></label>`;
  return `<form class="ai-wheel-brief" data-form="ai-wheel-design"><div class="ai-wheel-brief-head"><div><p class="eyebrow">${uiLabel('Write what you want')}</p><h2>${uiLabel('Describe the wheel direction')}</h2></div><span>01</span></div><div class="ai-wheel-mode-tabs" role="group" aria-label="${esc(uiLabel('Describe the wheel direction'))}">${[
    ['text', 'Text only'],
    ['reference', 'Reference + changes'],
    ['text-reference', 'Text + reference']
  ].map(([value, label]) => `<button type="button" class="${mode === value ? 'is-active' : ''}" data-action="ai-design-mode" data-mode="${value}" aria-pressed="${mode === value}">${uiLabel(label)}</button>`).join('')}</div><div class="ai-wheel-brief-grid"><div class="ai-wheel-copy-fields"><label class="ai-wheel-main-prompt"><span>${uiLabel('Describe the wheel direction')} <b>*</b></span><textarea name="prompt" rows="8" minlength="8" maxlength="1600" required placeholder="${esc(uiLabel('Example: an original lightweight 10-spoke forged wheel, deep concavity, thin paired spokes, brushed face and polished step lip; technical motorsport character rather than luxury.'))}">${esc(draft.prompt || '')}</textarea><small>${uiLabel('Be specific about spoke count, spoke shape, concavity, lip, center area and finish. Brand names are treated only as broad inspiration and are never copied.')}</small></label>${showReference ? `<div class="ai-wheel-reference-fields"><div><span>${uiLabel('Optional reference image')}</span>${referenceMarkup}</div><label><span>${uiLabel('What should stay?')}</span><input name="reference_keep" value="${esc(draft.reference_keep || '')}" placeholder="${esc(uiLabel('Example: keep the thin paired-spoke rhythm and deep center.'))}"></label><label><span>${uiLabel('What should change?')}</span><input name="reference_change" value="${esc(draft.reference_change || '')}" placeholder="${esc(uiLabel('Example: change to 10 spokes, cleaner center and bronze brushed finish.'))}"></label></div>` : ''}</div><aside class="ai-wheel-spec-panel"><div class="ai-wheel-spec-grid"><label><span>${uiLabel('Construction')}</span><select name="construction">${['Forged monoblock', 'Forged 2-piece', 'Forged 3-piece'].map(value => aiWheelOption(value, draft.construction)).join('')}</select></label><label><span>${uiLabel('Design character')}</span><select name="character">${['Performance / motorsport', 'Luxury / executive', 'Heritage / classic', 'Aero / technical', 'SUV / off-road'].map(value => aiWheelOption(value, draft.character)).join('')}</select></label><label><span>${uiLabel('Spoke direction')}</span><select name="spoke_count">${aiWheelOption('', draft.spoke_count, 'Let AI propose')}${['5-spoke', '6-spoke', '7-spoke', '8-spoke', '10-spoke', 'Multi-spoke'].map(value => aiWheelOption(value, draft.spoke_count)).join('')}</select></label><label><span>${uiLabel('Finish direction')}</span><select name="finish">${['Brushed clear', 'Satin black', 'Polished silver', 'Bronze', 'Two-tone custom'].map(value => aiWheelOption(value, draft.finish)).join('')}</select></label><label><span>${uiLabel('Visual diameter')}</span><select name="diameter">${aiWheelOption('', draft.diameter, 'Not fixed')}${['17', '18', '19', '20', '21', '22', '23', '24'].map(value => aiWheelOption(value, draft.diameter, `${value} in`)).join('')}</select></label></div><div class="ai-wheel-vehicle-context ${vehicleContext ? 'has-vehicle' : ''}">${icons.shield}<div><small>${vehicleContext ? uiLabel('Vehicle context inherited') : uiLabel('No vehicle selected')}</small><strong>${esc(vehicleContext || uiLabel('Independent wheel concept'))}</strong><p>${uiLabel('The vehicle is used only as design context. Fitment, brake clearance and load are still checked separately in the Fitment Lab.')}</p>${!vehicleContext ? `<a href="/fitment-lab" data-app-path>${uiLabel('Open Fitment Lab')} ${icons.arrowRight}</a>` : ''}</div></div><button class="btn btn-primary ai-wheel-generate" type="submit"><span class="ai-wheel-generate-label">${icons.spark}<span>${uiLabel(state.mallToken && state.account ? 'Generate 4 original concepts' : 'Sign in to generate concepts')}</span></span><span class="ai-wheel-generate-arrow" aria-hidden="true">${icons.arrowRight}</span></button></aside></div></form>`;
}

function aiWheelLoadingMarkup(multiview = false) {
  const count = multiview ? 9 : 4;
  return `<section class="ai-wheel-generating" aria-live="polite"><div class="ai-wheel-generating-copy"><span class="ai-wheel-spinner" aria-hidden="true"></span><div><p class="eyebrow">CIRUI AI DESIGN</p><h2>${uiLabel(multiview ? 'Rendering eight locked angles' : 'Creating four original directions')}</h2><p>${uiLabel(multiview ? 'Each image uses the selected concept as the same identity reference. This may take several minutes.' : 'The studio is varying the spoke rhythm, concavity and surface breaks while keeping your brief fixed.')}</p></div></div><div class="ai-wheel-skeleton-grid ${multiview ? 'is-nine' : ''}">${Array.from({ length: count }, (_, index) => `<span class="${multiview && index === 4 ? 'is-center' : ''}"><i></i><small>${multiview && index === 4 ? uiLabel('Selected concept') : `${index + 1}`}</small></span>`).join('')}</div></section>`;
}

function aiWheelConceptsMarkup() {
  const current = state.aiWheelDesign;
  return `<section class="ai-wheel-concepts"><div class="ai-wheel-section-head"><div><p class="eyebrow">CIRUI ORIGINAL CONCEPTS</p><h2>${uiLabel('Choose one direction')}</h2><p>${uiLabel('The selected image becomes the only visual identity reference for every multi-view angle.')}</p></div><strong>02 / 03</strong></div><div class="ai-wheel-concept-grid">${current.concepts.map((concept, index) => {
    const imageUrl = concept.image_url || concept.url || '';
    const selected = current.selectedIndex === index;
    return `<article class="ai-wheel-concept-card ${selected ? 'is-selected' : ''}"><button type="button" class="ai-wheel-concept-image" data-action="ai-design-select" data-index="${index}" aria-pressed="${selected}"><img src="${esc(imageUrl)}" alt="${esc(`${uiLabel('AI Original Design')} ${index + 1}`)}"><span>${selected ? `✓ ${uiLabel('Selected')}` : String.fromCharCode(65 + index)}</span></button><div><strong>${uiLabel('AI Original Design')} ${String.fromCharCode(65 + index)}</strong><button type="button" data-action="ai-design-view" data-image-url="${esc(imageUrl)}" data-label="${esc(`${uiLabel('AI Original Design')} ${String.fromCharCode(65 + index)}`)}">${uiLabel('View larger')} ↗</button></div></article>`;
  }).join('')}</div><div class="ai-wheel-concept-actions"><button type="button" class="btn btn-outline" data-action="ai-design-edit">${uiLabel('Edit brief')}</button><button type="button" class="btn btn-primary" data-action="ai-design-multiview" ${current.selectedIndex < 0 ? 'disabled' : ''}>${uiLabel('Generate nine-cell multi-view')} ${icons.arrowRight}</button></div></section>`;
}

function aiWheelMultiviewMarkup() {
  const current = state.aiWheelDesign;
  const selected = aiWheelSelectedConcept();
  const selectedUrl = selected?.image_url || selected?.url || '';
  const views = current.views;
  const cells = [views[0], views[1], views[2], views[7], { id: 'selected', angle: uiLabel('Selected concept'), image_url: selectedUrl, selected: true }, views[3], views[6], views[5], views[4]].filter(Boolean);
  return `<section class="ai-wheel-multiview"><div class="ai-wheel-section-head"><div><p class="eyebrow">CIRUI MULTI-VIEW LOCK</p><h2>${uiLabel('Nine-cell concept review')}</h2><p>${uiLabel('Eight generated angles surround the selected hero concept. Review spoke count, center, lip, barrel and finish consistency before sending it to engineering.')}</p></div><strong>03 / 03</strong></div><div class="ai-wheel-nine-grid">${cells.map(cell => {
    const imageUrl = cell.image_url || cell.url || '';
    return `<button type="button" class="${cell.selected ? 'is-selected' : ''}" data-action="ai-design-view" data-image-url="${esc(imageUrl)}" data-label="${esc(cell.angle || uiLabel('AI Original Design'))}"><img src="${esc(imageUrl)}" alt="${esc(cell.angle || uiLabel('AI Original Design'))}"><span>${esc(cell.angle || '')}</span></button>`;
  }).join('')}</div><div class="ai-wheel-safety-note">${icons.shield}<div><strong>${uiLabel('Concept preview only')}</strong><span>${uiLabel('AI images do not approve fitment, strength or manufacturing. Final production requires CIRUI engineering CAD, load review and physical-clearance approval.')}</span></div></div><div class="ai-wheel-concept-actions"><button type="button" class="btn btn-outline" data-action="ai-design-reset">${uiLabel('Start a new design')}</button><button type="button" class="btn btn-outline" data-action="ai-design-multiview">${uiLabel('Regenerate multi-view')}</button><button type="button" class="btn btn-primary" data-action="ai-design-contact">${uiLabel('Discuss with CIRUI')} ${icons.arrowRight}</button></div></section>`;
}

function aiWheelDesignPage() {
  const current = state.aiWheelDesign;
  let content = aiWheelBriefMarkup();
  if (current.status === 'generating-concepts') content = aiWheelLoadingMarkup(false);
  else if (current.status === 'generating-multiview') content = aiWheelLoadingMarkup(true);
  else if (current.stage === 'concepts' && current.concepts.length) content = aiWheelConceptsMarkup();
  else if (current.stage === 'multiview' && current.views.length) content = aiWheelMultiviewMarkup();
  else if (current.stage === 'multiview' && current.concepts.length) content = aiWheelConceptsMarkup();
  const footerSafetyNote = current.stage === 'multiview' && current.views.length
    ? ''
    : `<section class="ai-wheel-safety-note is-footer">${icons.shield}<div><strong>${uiLabel('Concept preview only')}</strong><span>${uiLabel('AI images do not approve fitment, strength or manufacturing. Final production requires CIRUI engineering CAD, load review and physical-clearance approval.')}</span></div></section>`;
  return `<main class="ai-wheel-page"><section class="ai-wheel-hero"><div class="container"><div class="breadcrumbs"><a href="#home">${uiLabel('Home')}</a><span>/</span><a href="#custom">${uiLabel('Customization')}</a><span>/</span><span>${uiLabel('AI Original Design')}</span></div><div class="ai-wheel-hero-grid"><div><p class="eyebrow">${uiLabel('FROM IDEA TO A CONSISTENT CONCEPT')}</p><h1>${uiLabel('Describe it. Reference it. Make it original.')}</h1><p>${uiLabel('Start with words, an optional reference image, or both. CIRUI generates four original wheel directions; after you select one, the studio renders eight locked angles as a nine-cell review board.')}</p></div><div class="ai-wheel-hero-mark"><span>CIRUI</span><strong>AI</strong><small>CONCEPT<br>STUDIO</small></div></div>${aiWheelDesignProgress()}</div></section><div class="container ai-wheel-workspace">${current.error ? `<div class="ai-wheel-error" role="alert"><span>!</span><div><strong>${uiLabel('Generation failed')}</strong><p>${esc(current.error)}</p></div><button type="button" data-action="ai-design-edit">${uiLabel('Return to brief')}</button></div>` : ''}${content}${footerSafetyNote}</div></main>`;
}

function captureAiWheelDraft(form = document.querySelector('[data-form="ai-wheel-design"]')) {
  if (!form) return state.aiWheelDesign.draft;
  const values = Object.fromEntries(new FormData(form).entries());
  state.aiWheelDesign.draft = { ...state.aiWheelDesign.draft, ...values };
  localStorage.setItem('cirui-ai-wheel-draft', JSON.stringify(state.aiWheelDesign.draft));
  return state.aiWheelDesign.draft;
}

async function aiWheelReferenceFile(file) {
  if (!file) return;
  if (!/^image\/(?:jpeg|png|webp)$/i.test(file.type) || file.size > 14 * 1024 * 1024) {
    state.aiWheelDesign.error = uiLabel('Use a JPG, PNG or WebP image smaller than 14 MB.');
    render();
    return;
  }
  captureAiWheelDraft();
  state.aiWheelDesign.error = '';
  try {
    state.aiWheelDesign.referenceData = await wheelVisualizerPrepareImage(file);
    state.aiWheelDesign.referenceName = file.name;
  } catch (error) {
    state.aiWheelDesign.error = error?.message || uiLabel('The selected image could not be read. Please choose a JPG, PNG or WEBP photo.');
  }
  render();
}

async function pollAiWheelDesignJob(jobId, phase) {
  for (let attempt = 0; attempt < 240; attempt += 1) {
    await new Promise(resolve => window.setTimeout(resolve, 3000));
    const response = await fetch(`/api/wheel-design/jobs/${encodeURIComponent(jobId)}`, { headers: { Accept: 'application/json' } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || 'The wheel-design job could not be checked.');
    const result = payload.data || payload;
    if (result.status === 'failed') throw new Error(result.message || 'The wheel-design job failed.');
    if (result.status === 'succeeded' || result.status === 'completed') {
      const images = (result.results || []).filter(item => item.image_url || item.url);
      if (phase === 'multiview') {
        if (images.length !== 8) throw new Error('The multi-view service returned fewer than eight angles.');
        state.aiWheelDesign.views = images;
        state.aiWheelDesign.stage = 'multiview';
      } else {
        if (images.length !== 4) throw new Error('The concept service returned fewer than four designs.');
        state.aiWheelDesign.concepts = images;
        state.aiWheelDesign.selectedIndex = -1;
        state.aiWheelDesign.views = [];
        state.aiWheelDesign.stage = 'concepts';
      }
      state.aiWheelDesign.status = 'idle';
      state.aiWheelDesign.error = '';
      render();
      return;
    }
  }
  throw new Error('The design is still processing. Please return to this page shortly.');
}

async function submitAiWheelDesign(form) {
  const draft = captureAiWheelDraft(form);
  if (!state.mallToken || !state.account) {
    state.modal = { type: 'account', mode: 'login', afterLogin: 'ai-wheel-design' };
    render();
    return;
  }
  if (String(draft.prompt || '').trim().length < 8) {
    state.aiWheelDesign.error = uiLabel('Describe the wheel direction in at least 8 characters.');
    render();
    return;
  }
  state.aiWheelDesign.status = 'generating-concepts';
  state.aiWheelDesign.error = '';
  state.aiWheelDesign.stage = 'concepts';
  render();
  try {
    const response = await fetch('/api/wheel-design/jobs', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: state.mallToken },
      body: JSON.stringify({ ...draft, phase: 'concepts', reference_image: state.aiWheelDesign.referenceData, reference_name: state.aiWheelDesign.referenceName, vehicle_context: aiWheelVehicleContext() })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || 'CIRUI could not start the concept request.');
    state.aiWheelDesign.jobId = payload.data?.job_id || payload.job_id || '';
    state.aiWheelDesign.conceptJobId = state.aiWheelDesign.jobId;
    await pollAiWheelDesignJob(state.aiWheelDesign.jobId, 'concepts');
  } catch (error) {
    state.aiWheelDesign.status = 'idle';
    state.aiWheelDesign.stage = state.aiWheelDesign.concepts.length ? 'concepts' : 'brief';
    state.aiWheelDesign.error = error?.message || 'CIRUI could not generate the concepts.';
    render();
  }
}

async function generateAiWheelMultiview() {
  const selected = aiWheelSelectedConcept();
  if (!selected) {
    setToast(uiLabel('Choose a concept first.'));
    return;
  }
  state.aiWheelDesign.status = 'generating-multiview';
  state.aiWheelDesign.stage = 'multiview';
  state.aiWheelDesign.error = '';
  render();
  try {
    const sourceJobId = state.aiWheelDesign.conceptJobId || state.aiWheelDesign.jobId || '';
    const response = await fetch('/api/wheel-design/jobs', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: state.mallToken },
      body: JSON.stringify({
        ...state.aiWheelDesign.draft,
        phase: 'multiview',
        selected_image: selected.image_url || selected.url,
        selected_concept_id: selected.id || `concept-${state.aiWheelDesign.selectedIndex + 1}`,
        selected_concept_index: state.aiWheelDesign.selectedIndex,
        source_job_id: sourceJobId,
        vehicle_context: aiWheelVehicleContext()
      })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || 'CIRUI could not start the multi-view request.');
    state.aiWheelDesign.jobId = payload.data?.job_id || payload.job_id || '';
    await pollAiWheelDesignJob(state.aiWheelDesign.jobId, 'multiview');
  } catch (error) {
    state.aiWheelDesign.status = 'idle';
    state.aiWheelDesign.stage = 'concepts';
    state.aiWheelDesign.error = error?.message || 'CIRUI could not generate the multi-view set.';
    render();
  }
}

function customizationPage() {
  const sampleProducts = publicForgedProducts().slice(0, 3);
  const options = [
    ['finishes', 'Finishes & colors', 'Brushed, polished, satin, gloss, tinted clear and custom color directions are quoted against the selected wheel and use case.', ['Brushed clear', 'Satin black', 'Polished', 'Custom color'], '/assets/halo-20-spoke-03.webp'],
    ['lips', 'Lip profiles', 'Flat, stepped and deep-lip directions depend on construction, brake package, offset and the approved wheel drawing.', ['Step lip', 'Reverse lip', 'Polished lip', 'Color-matched lip'], '/assets/sv100-03.webp'],
    ['caps', 'Center caps', 'Standard CIRUI caps, custom logo artwork and floating-cap directions are treated as product options, not separate empty products.', ['CIRUI cap', 'Custom artwork', 'Floating cap', 'Color matched'], '/assets/generated/cirui-center-cap-options-v1.webp'],
    ['hardware', 'Hardware options', 'Visible or concealed hardware is available only where the selected construction supports it. Material and finish are confirmed in the quote.', ['Exposed hardware', 'Hidden hardware', 'Color options', 'Drawing review'], '/assets/generated/cirui-wheel-hardware-options-v1.webp']
  ];
  return `<main class="customization-page"><section class="customization-hero"><div class="container"><div class="breadcrumbs"><a href="#home">${uiLabel('Home')}</a><span>/</span><span>${uiLabel('Customization')}</span></div><p class="eyebrow">${uiLabel('BUILT AROUND YOUR BRIEF')}</p><h1>${uiLabel('One wheel direction. Your exact finish and detail.')}</h1><p>${uiLabel('Choose the design first. CIRUI then combines construction, vehicle data, finish, cap, hardware and lip into one production drawing and one RFQ.')}</p><div><a class="btn btn-primary" href="/ai-wheel-studio" data-app-path>${icons.spark} ${uiLabel('AI Original Design')}</a><a class="btn btn-outline" href="#store" data-action="catalog-collection" data-collection="all">${uiLabel('Choose a wheel')}</a><button class="btn btn-outline" data-action="request-rfq">${uiLabel('Request a custom quote')}</button></div></div></section><section class="section customization-options"><div class="container"><div class="customization-option-grid">${options.map(([id, title, copy, tags, image], index) => `<article id="custom-${id}" class="customization-option customization-option-${id} ${state.customSection === id ? 'is-highlighted' : ''}"><figure class="customization-option-media"><img src="${esc(image)}" alt="${esc(uiLabel(title))}" loading="lazy" decoding="async"><span>${String(index + 1).padStart(2, '0')}</span></figure><div class="customization-option-body"><h2>${uiLabel(title)}</h2><p>${uiLabel(copy)}</p><div class="customization-option-tags">${tags.map(tag => `<small>${uiLabel(tag)}</small>`).join('')}</div></div></article>`).join('')}</div></div></section><section class="section customization-process"><div class="container"><div><p class="eyebrow">${uiLabel('HOW IT BECOMES A REAL ORDER')}</p><h2>${uiLabel('Design choice → fitment → options → approved drawing.')}</h2></div><ol><li><b>01</b><span><strong>${uiLabel('Select a wheel direction')}</strong><small>${uiLabel('Monoblock, 2-piece, aero or off-road.')}</small></span></li><li><b>02</b><span><strong>${uiLabel('Attach the exact vehicle')}</strong><small>${uiLabel('Brake package, suspension and intended use matter.')}</small></span></li><li><b>03</b><span><strong>${uiLabel('Specify finish and details')}</strong><small>${uiLabel('Cap, hardware, lip and color are quoted together.')}</small></span></li><li><b>04</b><span><strong>${uiLabel('Approve the production drawing')}</strong><small>${uiLabel('No classification or preview replaces the final drawing.')}</small></span></li></ol></div></section>${sampleProducts.length ? `<section class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">${uiLabel('STARTING DIRECTIONS')}</p><h2>${uiLabel('Choose a wheel to customize.')}</h2></div><a class="btn btn-dark" href="#store">${uiLabel('View full catalog')}</a></div><div class="product-grid">${sampleProducts.map(renderProductCard).join('')}</div></div></section>` : ''}</main>`;
}

function tradePage() {
  return `<main class="trade-page"><section class="trade-hero"><div class="container"><div class="breadcrumbs"><a href="#home">${uiLabel('Home')}</a><span>/</span><span>${uiLabel('Trade & DDP')}</span></div><p class="eyebrow">${uiLabel('EXPORT SUPPORT')}</p><h1>${uiLabel('DDP available across Europe and North America.')}</h1><p>${uiLabel('CIRUI can quote the wheel set and duty-paid delivery together. The confirmed country, postcode, specification and shipment determine the final landed quotation.')}</p><div><button class="btn btn-primary" data-action="trade-rfq" data-buyer-type="retail">${uiLabel('Request a DDP quote')}</button><button class="btn btn-outline" data-action="trade-rfq" data-buyer-type="dealer">${uiLabel('Dealer / wholesale inquiry')}</button></div></div></section><section class="section trade-facts"><div class="container"><div class="trade-fact-grid"><article><span>01</span><h2>${uiLabel('MOQ')}</h2><strong>${uiLabel('4 wheels per design')}</strong><p>${uiLabel('Mixed specifications, staggered sets and larger trade quantities are reviewed in the RFQ.')}</p></article><article><span>02</span><h2>${uiLabel('Production')}</h2><strong>${uiLabel('Made to order')}</strong><p>${uiLabel('Target production and transport is about 30 business days; the final drawing, finish and destination control the confirmed timing.')}</p></article><article><span>03</span><h2>${uiLabel('DDP')}</h2><strong>${uiLabel('Europe + North America')}</strong><p>${uiLabel('Final duty-paid delivery is quoted by destination country and postcode. It is not a universal fixed shipping price.')}</p></article><article><span>04</span><h2>${uiLabel('B2B')}</h2><strong>${uiLabel('Dealer & distributor support')}</strong><p>${uiLabel('Attach company, volume, target market and recurring fitment needs for a trade quotation.')}</p></article></div></div></section><section class="trade-flow"><div class="container"><div><p class="eyebrow">${uiLabel('QUOTE FLOW')}</p><h2>${uiLabel('One brief from wheel choice to landed quote.')}</h2></div><ol><li>${uiLabel('Add one or more wheel directions to the RFQ list.')}</li><li>${uiLabel('Enter vehicle, quantity, finish, country and postcode.')}</li><li>${uiLabel('CIRUI reviews construction, fitment, production and DDP route.')}</li><li>${uiLabel('You receive the final specification and quotation for approval.')}</li></ol><div><a class="btn btn-dark" href="#store">${uiLabel('Browse forged wheels')}</a><button class="btn btn-primary" data-action="request-rfq">${uiLabel('Open RFQ')}</button><button class="btn btn-outline" data-action="orders">${uiLabel('Track an existing order')}</button></div></div></section></main>`;
}

function reviewDateLabel(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  try {
    return new Intl.DateTimeFormat(state.locale || 'en', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  } catch {
    return date.toLocaleDateString();
  }
}

function localizedCountryName(countryCode, fallback = '') {
  const code = String(countryCode || '').trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code) || typeof Intl?.DisplayNames !== 'function') return fallback;
  try {
    return new Intl.DisplayNames([state.locale || 'en'], { type: 'region' }).of(code) || fallback;
  } catch {
    return fallback;
  }
}
function reviewsForProduct(item) {
  return reviews.filter(review => review.product_id === item.id);
}
function reviewStats(records) {
  const total = records.length;
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const sum = records.reduce((value, review) => {
    const rating = Math.max(1, Math.min(5, Math.round(Number(review.rating || 0))));
    counts[rating] += 1;
    return value + Number(review.rating || 0);
  }, 0);
  return { total, counts, rating: total ? Number((sum / total).toFixed(1)) : 0 };
}
function reviewBars(stats) {
  return [5, 4, 3, 2, 1].map(rating => {
    const count = stats.counts[rating] || 0;
    const percent = stats.total ? Math.round((count / stats.total) * 100) : 0;
    return '<div class="review-bar"><span>' + rating + '★</span><i class="bar-track"><i style="width:' + percent + '%"></i></i><span>' + percent + '%</span></div>';
  }).join('');
}
function renderReview(review, index = 0) {
  const meta = [
    review.verified_purchase ? '<span class="review-verified">✓ ' + esc(uiLabel('Verified purchase')) + '</span>' : '',
    review.customer_name ? '<span>' + esc(/^Customer\s+/i.test(review.customer_name) && ['zh-CN', 'zh-TW'].includes(state.locale) ? review.customer_name.replace(/^Customer\s+/i, state.locale === 'zh-TW' ? '客戶 ' : '客户 ') : review.customer_name) + '</span>' : '',
    review.customer_country ? '<span class="review-country">' + esc(review.customer_country) + '</span>' : '',
    review.vehicle ? '<span>' + esc(review.vehicle) + '</span>' : ''
  ].filter(Boolean).join('');
  const photoCount = Number(review.review_images_count || 0);
  const photoBadge = photoCount > 0 ? '<span class="review-photo-badge">' + esc(formatUiLabel(photoCount === 1 ? '{count} photo shared' : '{count} photos shared', { count: photoCount })) + '</span>' : '';
  const reply = review.admin_reply ? '<div class="review-reply"><strong>' + esc(uiLabel('Seller response')) + '</strong><p>' + esc(review.admin_reply) + '</p></div>' : '';
  return '<article class="review-item" style="animation-delay:' + String(index * 80) + 'ms"><div class="review-head"><div><strong>' + esc(review.title) + '</strong><div>' + stars(Number(review.rating || 0)) + photoBadge + '</div></div><small>' + esc(reviewDateLabel(review.created_at)) + '</small></div><p>' + esc(review.body) + '</p>' + reply + '<div class="review-meta">' + meta + '</div></article>';
}
function renderProductReviewSection(item) {
  const productReviews = reviewsForProduct(item);
  const stats = reviewStats(productReviews);
  const summary = stats.total
    ? '<p>' + formatUiLabel(stats.total === 1 ? '{count} review for this product' : '{count} reviews for this product', { count: stats.total }) + '</p>'
    : '<p>' + uiLabel('No customer reviews yet.') + '</p>';
  const list = productReviews.length
    ? productReviews.slice(0, state.reviewLimit).map(renderReview).join('') + (state.reviewLimit < productReviews.length ? '<button class="btn btn-outline" data-action="load-reviews">' + uiLabel('Load more reviews') + '</button>' : '')
    : '<div class="review-empty"><strong>' + uiLabel('Be the first to share your fitment experience.') + '</strong><span>' + uiLabel('Tell other drivers how your build looks and feels.') + '</span></div>';
  return '<section class="detail-section" id="reviews"><div class="section-heading"><div><p class="eyebrow">' + uiLabel('Customer feedback') + '</p><h2>' + uiLabel('Product reviews') + '</h2></div><button class="btn btn-outline" data-action="write-review">' + uiLabel('Write a review') + '</button></div><div class="reviews-layout"><div class="review-score"><strong>' + (stats.total ? stats.rating.toFixed(1) : '—') + '</strong>' + stars(stats.rating) + summary + '<div class="review-bars">' + reviewBars(stats) + '</div></div><div class="review-list">' + list + '</div></div></section>';
}
function wireProductReviews() {
  if (state.route.name !== 'product') return;
  const item = product(state.route.id);
  const section = document.getElementById('reviews');
  if (!item || !section) return;
  section.outerHTML = renderProductReviewSection(item);
  const score = document.querySelector('.detail-rating');
  if (score) {
    const count = Number(item.reviews || 0);
    score.innerHTML = stars(Number(item.rating || 0)) + ' <a href="#reviews">' + (count ? Number(item.rating || 0).toFixed(1) + ' · ' + formatUiLabel('{count} ratings', { count }) : uiLabel('No reviews yet')) + '</a>';
  }
}
function wireReviewForm() {
  const form = document.querySelector('form[data-form="review"]');
  if (!form || form.querySelector('[name="customer_name"]')) return;
  form.insertAdjacentHTML('afterbegin', '<div class="review-form-grid"><input class="text-input" name="customer_name" autocomplete="name" placeholder="Your name" required><input class="text-input" name="customer_email" type="email" autocomplete="email" placeholder="Email for review follow-up" required></div>');
  form.insertAdjacentHTML('beforeend', '<label class="review-consent"><input type="checkbox" name="consent" required> I confirm this is my own experience and allow CIRUI to review it for publication.</label>');
  form.querySelectorAll('.rating-star').forEach(button => {
    button.addEventListener('click', () => {
      form.querySelector('[name="rating"]').value = button.dataset.rating;
      form.querySelectorAll('.rating-star').forEach(item => item.classList.toggle('is-active', Number(item.dataset.rating) <= Number(button.dataset.rating)));
    });
  });
}
function visualizerReferenceImages(item) {
  return productGallery(item);
}
function visualizerReferenceAsset(item, current) {
  const image = current?.referenceImage || item?.image || '';
  return image ? assetUrl(image) : '';
}
function legacyWheelVisualizerTrigger(item) {
  if (item.category !== 'Wheels') return '';
  const referenceImage = state.productImage[item.id] || item.image;
  return `<section class="wheel-visualizer-entry" aria-labelledby="wheel-visualizer-title"><div class="wheel-visualizer-entry-copy"><div class="wheel-visualizer-eyebrow"><span>${icons.spark}</span> See it on your car</div><h2 id="wheel-visualizer-title">Preview this wheel<br><em>before you commit.</em></h2><p>Upload one clear photo of your car and CIRUI will prepare three angles with this exact wheel, finish and fitment as the reference.</p><div class="wheel-visualizer-entry-proof"><span>3 angles</span><span>Fitment-led</span><span>Selected gallery angle</span></div></div><button class="btn btn-primary wheel-visualizer-open" data-action="wheel-open" data-id="${item.id}" data-image="${esc(referenceImage)}"><span>Upload car photo</span><span aria-hidden="true">↗</span></button></section>`;
}
function wheelVisualizerTrigger(item) {
  const referenceImages = visualizerReferenceImages(item);
  const referenceImage = referenceImages.includes(state.productImage[item.id]) ? state.productImage[item.id] : item.image;
  const context = visualizerProductContext(item);
  return `<section class="wheel-visualizer-entry" data-product-category="${esc(item.category)}" aria-labelledby="wheel-visualizer-title"><div class="wheel-visualizer-entry-copy"><div class="wheel-visualizer-eyebrow"><span>${icons.spark}</span> See it on your car</div><h2 id="wheel-visualizer-title">${esc(context.heading)}<br><em>before you commit.</em></h2><p>Upload one clear photo of your car and CIRUI will prepare three angles with this exact ${esc(context.subject)}, finish and fitment as the reference.</p><div class="wheel-visualizer-entry-proof"><span>3 angles</span><span>Fitment-led</span><span>Selected product image</span></div></div><button class="btn btn-primary wheel-visualizer-open" data-action="wheel-open" data-id="${item.id}" data-image="${esc(referenceImage)}"><span>Upload car photo</span><span aria-hidden="true">↗</span></button></section>`;
}
function wireWheelVisualizerEntry() {
  if (state.route.name !== 'product') return;
  const item = product(state.route.id);
  if (item && item.category !== 'Wheels') document.querySelectorAll('.gallery .thumb:not(:first-child)').forEach(thumb => thumb.remove());
  const form = document.querySelector('.detail-form');
  if (item && form && !document.querySelector('.wheel-visualizer-entry')) form.insertAdjacentHTML('beforebegin', wheelVisualizerTrigger(item));
}
let homeWheelAutoTimer = 0;
let homeWheelResumeTimer = 0;
function homeWheelApplyPage(page, animate = true) {
  const carousel = document.querySelector('[data-home-wheel-carousel]');
  if (!carousel) return;
  const total = Math.max(1, Number(carousel.dataset.homeWheelPageCount || 1));
  const next = ((Number(page) || 0) % total + total) % total;
  state.homeWheelPage = next;
  const track = carousel.querySelector('[data-home-wheel-track]');
  if (track) {
    track.style.transition = animate ? '' : 'none';
    track.style.transform = `translate3d(-${((next / total) * 100).toFixed(4)}%, 0, 0)`;
    if (!animate) window.requestAnimationFrame(() => { if (track.isConnected) track.style.transition = ''; });
  }
  carousel.dataset.homeWheelCurrentPage = String(next);
  const label = carousel.querySelector('[data-home-wheel-page-label]');
  if (label) label.textContent = `${String(next + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  carousel.querySelectorAll('[data-home-wheel-page]').forEach((pageNode, index) => {
    const active = index === next;
    pageNode.setAttribute('aria-hidden', String(!active));
    pageNode.querySelectorAll('button').forEach(button => { button.tabIndex = active ? 0 : -1; });
  });
}
function homeWheelStartAuto() {
  window.clearInterval(homeWheelAutoTimer);
  const carousel = document.querySelector('[data-home-wheel-carousel]');
  const total = Number(carousel?.dataset.homeWheelPageCount || 1);
  if (!carousel || total < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  state.homeWheelAutoPausedUntil = 0;
  homeWheelAutoTimer = window.setInterval(() => {
    if (!document.hidden) homeWheelApplyPage(state.homeWheelPage + 1);
  }, 4800);
}
function homeWheelPauseForInteraction() {
  const carousel = document.querySelector('[data-home-wheel-carousel]');
  if (!carousel || Number(carousel.dataset.homeWheelPageCount || 1) < 2) return;
  window.clearInterval(homeWheelAutoTimer);
  window.clearTimeout(homeWheelResumeTimer);
  state.homeWheelAutoPausedUntil = Date.now() + 10000;
  homeWheelResumeTimer = window.setTimeout(() => {
    state.homeWheelAutoPausedUntil = 0;
    homeWheelStartAuto();
  }, 10000);
}
function homeWheelNavigate(delta) {
  homeWheelApplyPage(state.homeWheelPage + delta);
  homeWheelPauseForInteraction();
}
function wireHomeWheelCarousel() {
  window.clearInterval(homeWheelAutoTimer);
  window.clearTimeout(homeWheelResumeTimer);
  const carousel = document.querySelector('[data-home-wheel-carousel]');
  if (!carousel) return;
  homeWheelApplyPage(state.homeWheelPage, false);
  const remaining = Math.max(0, state.homeWheelAutoPausedUntil - Date.now());
  if (remaining) {
    homeWheelResumeTimer = window.setTimeout(() => {
      state.homeWheelAutoPausedUntil = 0;
      homeWheelStartAuto();
    }, remaining);
  } else {
    homeWheelStartAuto();
  }
  const viewport = carousel.querySelector('[data-home-wheel-viewport]');
  if (!viewport) return;
  let startPoint = null;
  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' || event.pointerType === 'pen') startPoint = { x: event.clientX, y: event.clientY };
  });
  viewport.addEventListener('pointerup', event => {
    if (!startPoint) return;
    const deltaX = event.clientX - startPoint.x;
    const deltaY = event.clientY - startPoint.y;
    startPoint = null;
    if (Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY)) {
      event.preventDefault();
      homeWheelNavigate(deltaX < 0 ? 1 : -1);
    }
  });
  viewport.addEventListener('pointercancel', () => { startPoint = null; });
}
function customPreviewStage() {
  const item = homePreviewProduct();
  const selectedImage = state.productImage[item.id] || productGallery(item)[0] || item.image;
  const options = homeWheelProducts();
  const pageSize = 4;
  const pages = [];
  for (let index = 0; index < options.length; index += pageSize) pages.push(options.slice(index, index + pageSize));
  const pageCount = Math.max(1, pages.length);
  const optionButton = option => `<button type="button" class="custom-preview-wheel-option ${option.id === item.id ? 'is-active' : ''}" data-action="home-preview-wheel" data-id="${esc(option.id)}" aria-label="Preview ${esc(homePreviewShortName(option))}" aria-pressed="${option.id === item.id}"><img src="${esc(assetUrl(option.image))}" alt="${esc(option.name)}" loading="lazy" decoding="async" fetchpriority="low"><span>${esc(homePreviewShortName(option))}</span></button>`;
  const pageMarkup = pages.map(page => `<div class="custom-preview-wheel-page" data-home-wheel-page>${page.map(optionButton).join('')}</div>`).join('');
  const arrows = pageCount > 1 ? `<button type="button" class="custom-preview-wheel-arrow is-prev" data-action="home-preview-prev" aria-label="Previous wheels" title="Previous wheels">${icons.arrowLeft}</button><button type="button" class="custom-preview-wheel-arrow is-next" data-action="home-preview-next" aria-label="Next wheels" title="Next wheels">${icons.arrowRight}</button>` : '';
  return `<div class="custom-preview-stage spotlight-card reveal delay-2" data-home-preview-stage><div class="custom-preview-head"><div><span class="custom-preview-kicker">CIRUI VISUAL STUDIO</span><strong>Live fitment preview</strong><small>See the selected wheel on your car before production.</small></div><span class="custom-preview-status"><i></i> Preview included</span></div><div class="custom-preview-canvas"><div class="custom-preview-canvas-grid"></div><div class="custom-preview-canvas-meta"><span>LIVE / 01</span><span>03 ANGLES</span></div><img class="custom-preview-wheel" data-home-preview-image src="${esc(assetUrl(selectedImage))}" alt="${esc(item.name)} preview" loading="eager" decoding="async" fetchpriority="high"><div class="custom-preview-canvas-label"><span>Selected design</span><strong data-home-preview-name>${esc(homePreviewShortName(item))}</strong><em data-home-preview-finish>${esc(item.finish || item.color || 'Custom finish')}</em></div></div><div class="custom-preview-controls"><div class="custom-preview-control-head"><div><span class="custom-preview-step-number">01</span><div><strong>Choose a wheel</strong><small>All sizes · custom fitment</small></div></div><b data-home-preview-price>${productPriceText(item)}</b></div><div class="custom-preview-wheel-selector" data-home-wheel-carousel data-home-wheel-page-count="${pageCount}" role="group" aria-label="Choose a wheel"><div class="custom-preview-wheel-selector-meta"><span>Newest to archive</span><b data-home-wheel-page-label>01 / ${String(pageCount).padStart(2, '0')}</b></div><div class="custom-preview-wheel-viewport" data-home-wheel-viewport><div class="custom-preview-wheel-track" data-home-wheel-track>${pageMarkup}</div>${arrows}</div></div><div class="custom-preview-next"><div class="custom-preview-next-copy"><span class="custom-preview-step-number">02</span><div><strong>Upload your car photo</strong><small>Generate three fitment angles with the selected wheel.</small></div></div><button type="button" class="btn btn-primary custom-preview-open" data-action="wheel-open" data-home-preview-open data-id="${esc(item.id)}" data-image="${esc(selectedImage)}"><span>Upload photo &amp; preview</span><span aria-hidden="true">↗</span></button></div></div></div>`;
}
function wireHomeVisualizerBanner() {
  if (state.route.name !== 'home') return;
  const stage = document.querySelector('.custom-wheel-stage');
  if (!stage) return;
  stage.outerHTML = customPreviewStage();
}
function ensureExternalScript(id, src, attributes = {}) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.src = src;
  script.async = true;
  Object.entries(attributes).forEach(([name, value]) => script.setAttribute(name, value));
  document.head.append(script);
}
function paypalHostedButtonMarkup(item) {
  if (item?.id !== paypalHostedButtonConfig.productId) return '';
  const containerId = `paypal-container-${paypalHostedButtonConfig.buttonId}`;
  const label = key => uiLabel(key, key);
  return `<section class="paypal-hosted-panel" aria-labelledby="paypal-hosted-title"><div class="paypal-hosted-copy"><p class="eyebrow">${label('PayPal checkout')}</p><h2 id="paypal-hosted-title">${label('Pay securely with PayPal.')}</h2><p>${label('The PayPal button below uses the product and amount configured in your PayPal account.')}</p></div><div class="paypal-hosted-container" id="${containerId}" data-paypal-hosted-container></div><p class="paypal-hosted-note">${label('Custom diameter, width, PCD, ET, center bore and brake clearance are confirmed separately before production.')}</p></section>`;
}
function wirePayPalHostedButton() {
  const container = document.querySelector('[data-paypal-hosted-container]');
  if (!container || container.dataset.paypalRendered === 'true') return;
  ensureExternalScript('fbox-paypal-hosted-sdk', paypalHostedButtonConfig.sdkUrl);
  let attempts = 0;
  const showFailure = () => {
    if (!container.isConnected) return;
    container.dataset.paypalRendered = 'failed';
    container.innerHTML = `<p class="paypal-hosted-fallback">${uiLabel('PayPal is temporarily unavailable.', 'PayPal is temporarily unavailable. Please use the CIRUI quote or WhatsApp for this build.')}</p>`;
  };
  const mount = () => {
    if (!container.isConnected || container.dataset.paypalRendered === 'true') return;
    if (!window.paypal?.HostedButtons) {
      attempts += 1;
      if (attempts < 80) window.setTimeout(mount, 250);
      else showFailure();
      return;
    }
    try {
      container.dataset.paypalRendered = 'true';
      const result = window.paypal.HostedButtons({ hostedButtonId: paypalHostedButtonConfig.buttonId }).render(`#${container.id}`);
      Promise.resolve(result).catch(showFailure);
    } catch {
      showFailure();
    }
  };
  mount();
}
function paypalCartButtonMarkup(item) {
  if (item?.id !== paypalCartButtonConfig.productId) return '';
  const label = key => uiLabel(key, key);
  return `<section class="paypal-cart-panel" aria-labelledby="paypal-cart-title"><div class="paypal-hosted-copy"><p class="eyebrow">PayPal cart</p><h2 id="paypal-cart-title">${label('View your PayPal cart')}</h2><p>${label('Review this build in your PayPal cart.')}</p></div><div class="paypal-cart-button-wrap"><paypal-cart-button data-id="${paypalCartButtonConfig.buttonId}" data-paypal-cart-button></paypal-cart-button><p class="paypal-cart-fallback" data-paypal-cart-fallback hidden>${label('PayPal cart is temporarily unavailable. Please use the CIRUI quote or WhatsApp for this build.')}</p></div><p class="paypal-hosted-note">${label('The PayPal cart keeps the four-wheel minimum order. Final custom fitment is confirmed before production.')}</p></section>`;
}
function wirePayPalCartButton() {
  const button = document.querySelector('[data-paypal-cart-button]');
  if (!button || button.dataset.paypalCartRendered === 'true') return;
  ensureExternalScript('fbox-paypal-cart-sdk', paypalCartButtonConfig.sdkUrl, { 'data-merchant-id': paypalCartButtonConfig.merchantId });
  let attempts = 0;
  const showFailure = () => {
    if (!button.isConnected) return;
    button.dataset.paypalCartRendered = 'failed';
    const fallback = button.parentElement?.querySelector('[data-paypal-cart-fallback]');
    if (fallback) fallback.hidden = false;
  };
  const waitForContent = () => {
    if (!button.isConnected || button.dataset.paypalCartRendered === 'true') return;
    const content = `${button.innerText || ''}${button.shadowRoot?.textContent || ''}`.trim();
    if (content) {
      button.dataset.paypalCartRendered = 'true';
      return;
    }
    attempts += 1;
    if (attempts < 80) window.setTimeout(waitForContent, 250);
    else showFailure();
  };
  const mount = () => {
    if (!button.isConnected || button.dataset.paypalCartRendered === 'true') return;
    if (typeof window.cartPaypal?.Cart !== 'function') {
      attempts += 1;
      if (attempts < 80) window.setTimeout(mount, 250);
      else showFailure();
      return;
    }
    try {
      window.cartPaypal.Cart({ id: paypalCartButtonConfig.buttonId });
      waitForContent();
    } catch {
      showFailure();
    }
  };
  window.setTimeout(mount, state.catalogLoaded && state.backend.checked ? 250 : 1000);
}
function legacyProductPage(item) {
  const gallery = productGallery(item);
  const image = state.productImage[item.id] || gallery[0] || item.image;
  const related = products.filter(p => p.category === item.category && p.id !== item.id).slice(0, 4);
  const displayName = productNameText(item);
  const specs = [['Brand', item.brand], ['Model', displayName], ['Part number', item.part], ['Finish', productFinishText(item)], ['Available sizes', uiLabel(productSizeNote(item))], ['Material', productMaterialText(item)], ['Weight', item.weight], ['Fitment', productMetaText(item)]];
  const minimumNote = productMinimumOrderText(item);
  const startingPriceNote = hasStartingPrice(item) ? [uiLabel('The starting price is per wheel.', 'The starting price is per wheel.'), minimumNote, productMinimumOrderSummary(item)].filter(Boolean).join(' ') : '';
  return `<div class="detail-wrap"><div class="container"><div class="breadcrumbs"><a href="#home">Home</a><span>/</span><a href="#store">${uiLabel(item.category)}</a><span>/</span><span>${item.name}</span></div><div class="wf-product-title-band"><span>${esc(item.name)}</span><small>${esc(productMetaText(item))}</small></div><div class="detail-grid"><div class="gallery"><div class="thumbs">${gallery.map((img, i) => `<button class="thumb ${image === img ? 'is-active' : ''}" data-action="product-image" data-id="${item.id}" data-image="${esc(img)}"><img src="${assetUrl(img)}" alt="${esc(item.name)} view ${i + 1}"></button>`).join('')}</div><div class="main-image"><img class="${item.image_cutout ? 'is-cutout' : ''}" src="${assetUrl(image)}" alt="${esc(item.name)} ${esc(item.finish)}"></div></div><div><div class="detail-kicker">${uiLabel(item.category)} · ${item.brand}</div><h1 class="detail-title">${item.name}<br><span style="color:var(--lavender)">${productMetaText(item)}</span></h1><div class="detail-rating">${stars(item.rating)} <a href="#reviews">${item.rating} · ${formatUiLabel('{count} ratings', { count: item.reviews })}</a></div><div class="detail-price">${productPriceText(item)} <small>${uiLabel(hasStartingPrice(item) ? 'starting price / wheel' : 'each')}</small></div><div class="detail-set">${hasStartingPrice(item) ? `${uiLabel('Final price is quoted after fitment, finish, PCD, CB and ET are confirmed.')}${startingPriceNote ? `<br><strong class="minimum-order-note">${startingPriceNote}</strong>` : ''}` : `${money(item.price * 4)} set of four · ${item.oldPrice ? `was ${money(item.oldPrice)} each` : 'build pricing available'}`}</div><div class="financing-note">Pay over time with CIRUI financing. Starting at ${money(Math.max(18, Math.round(item.price / 12)))}/month with approved credit.</div><div class="detail-form"><div><label class="field-label">Check vehicle fitment</label>${vehicleSelector('detail')}</div><div><label class="field-label">Finish</label><div class="finish-options"><button class="finish-option is-active">${item.color}</button><button class="finish-option">Satin Black</button><button class="finish-option">Bronze Machined</button></div></div><div><label class="field-label">Delivery estimate</label><div class="ship-note">${icons.truck}<span>Free delivery to the lower 48 · Aug 19–Aug 21<br>Enter a postcode for an exact estimate.</span></div></div><div class="detail-actions"><button class="btn btn-primary" data-action="add" data-id="${item.id}">Add to cart</button><button class="btn btn-dark" data-action="buy-now" data-id="${item.id}">Buy it now</button></div></div>${paypalHostedButtonMarkup(item)}${paypalCartButtonMarkup(item)}</div></div><div class="specs">${specs.map(([label, value]) => `<div class="spec"><span>${uiLabel(label)}</span><strong>${esc(uiLabel(value))}</strong></div>`).join('')}</div><section class="detail-section" id="reviews"><div class="section-heading"><div><p class="eyebrow">Customer proof</p><h2>Product reviews</h2></div><button class="btn btn-outline" data-action="write-review">Write a review</button></div><div class="reviews-layout"><div class="review-score"><strong>${item.rating}</strong>${stars(item.rating)}<p>${formatUiLabel(item.reviews === 1 ? '{count} review for this product' : '{count} reviews for this product', { count: item.reviews })}</p><div class="review-bars"><div class="review-bar"><span>5★</span><i class="bar-track"><i style="width:94%"></i></i><span>94%</span></div><div class="review-bar"><span>4★</span><i class="bar-track"><i style="width:5%"></i></i><span>5%</span></div><div class="review-bar"><span>3★</span><i class="bar-track"><i style="width:1%"></i></i><span>1%</span></div></div></div><div class="review-list">${reviews.slice(0, state.reviewLimit).map(renderReview).join('')}${state.reviewLimit < reviews.length ? `<button class="btn btn-outline" data-action="load-reviews">Load more reviews</button>` : ''}</div></div></section><section class="detail-section"><div class="section-heading"><div><p class="eyebrow">Keep building</p><h2>${uiLabel(`Related ${item.category}`)}</h2></div><a class="btn btn-dark" href="#store">Shop all</a></div><div class="product-grid">${related.map(renderProductCard).join('')}</div></section></div></div>`;
}

function productPage(item) {
  if (!item || item.public_scope === false || item.vehicle_label || item.category !== 'Wheels') {
    return `<main class="detail-wrap"><div class="container"><div class="empty-state"><h1>${uiLabel('This item is not part of the public forged wheel catalog.')}</h1><p>${uiLabel('Browse current CIRUI forged directions or send a custom reference through the RFQ.')}</p><a class="btn btn-primary" href="#store">${uiLabel('Open forged wheel catalog')}</a></div></div></main>`;
  }
  const gallery = productGallery(item);
  const image = state.productImage[item.id] || gallery[0] || item.image;
  const related = publicForgedProducts().filter(candidate => candidate.id !== item.id && (candidate.design_family === item.design_family || candidate.construction === item.construction)).slice(0, 4);
  const displayName = productNameText(item);
  const specs = [
    ['Model code', item.part || item.id],
    ['Construction', productConstructionLabel(item)],
    ['Design direction', productDesignLabel(item)],
    ['Classification', productClassificationLabel(item)],
    ['Available sizes', productSizeNote(item)],
    ['Material', productMaterialText(item)],
    ['Load target', item.load_rating_note || 'Confirmed against vehicle and use case']
  ];
  const classificationNote = item.classification_note || 'Construction is confirmed on the approved engineering drawing before production.';
  return `<main class="detail-wrap forged-detail"><div class="container"><div class="breadcrumbs"><a href="#home">${uiLabel('Home')}</a><span>/</span><a href="#store">${uiLabel('Forged wheels')}</a><span>/</span><span>${esc(displayName)}</span></div><div class="detail-grid"><div class="gallery"><div class="thumbs">${gallery.map((img, index) => `<button class="thumb ${image === img ? 'is-active' : ''}" data-action="product-image" data-id="${item.id}" data-image="${esc(img)}"><img src="${assetUrl(img)}" alt="${esc(displayName)} view ${index + 1}" loading="lazy" decoding="async"></button>`).join('')}</div><div class="main-image"><img class="${item.image_cutout ? 'is-cutout' : ''}" src="${assetUrl(image)}" alt="${esc(displayName)} ${esc(productFinishText(item))}"><div class="detail-construction-stamp"><small>${uiLabel('Construction')}</small><strong>${uiLabel(productConstructionLabel(item))}</strong><span>${uiLabel(productClassificationLabel(item))}</span></div></div></div><div class="detail-purchase"><div class="detail-kicker">${esc(item.part || 'CIRUI FORGED')} · ${uiLabel(productDesignLabel(item))}</div><h1 class="detail-title">${esc(displayName)}</h1><p class="detail-fitment-meta">${uiLabel(productConstructionLabel(item))} · ${uiLabel('Custom fitment and finish')}</p><div class="detail-classification-note">${icons.shield}<div><strong>${uiLabel(productClassificationLabel(item))}</strong><span>${uiLabel(classificationNote)}</span></div></div><div class="detail-form"><div><label class="field-label">${uiLabel('Attach vehicle context')}</label>${vehicleSelector('detail')}<button class="btn btn-outline btn-small detail-fitment-button" data-action="open-fitment-lab" data-fitment-focus="vehicle">${uiLabel('Run full fitment check')}</button></div><div><label class="field-label">${uiLabel('Customization')}</label><div class="finish-options"><button class="finish-option is-active">${uiLabel('Custom finish')}</button><button class="finish-option">${uiLabel('Center cap')}</button><button class="finish-option">${uiLabel('Hardware / lip')}</button></div><a class="detail-option-link" href="#custom">${uiLabel('Review all finish and detail options')} →</a></div><div class="detail-actions"><button class="btn btn-primary" data-action="contact-inquiry" data-id="${item.id}">${uiLabel('Inquire now')}</button><button class="btn btn-dark" data-action="open-fitment-lab" data-fitment-focus="vehicle">${uiLabel('Check fitment')}</button></div></div></div></div><div class="specs forged-specs">${specs.map(([label, value]) => `<div class="spec"><span>${uiLabel(label)}</span><strong>${esc(uiLabel(String(value || 'To confirm')))}</strong></div>`).join('')}</div>${renderProductReviewSection(item)}${related.length ? `<section class="detail-section"><div class="section-heading"><div><p class="eyebrow">${uiLabel('RELATED DIRECTIONS')}</p><h2>${uiLabel('More forged wheel starting points.')}</h2></div><a class="btn btn-dark" href="#store">${uiLabel('View full catalog')}</a></div><div class="product-grid">${related.map(renderProductCard).join('')}</div></section>` : ''}</div></main>`;
}

function legacyCartPage() {
  const total = cartTotal();
  const minimumIssue = cartMinimumIssue();
  const minimumNotice = minimumIssue ? `<p class="cart-minimum-warning">${esc(productMinimumOrderText(minimumIssue.item))} ${uiLabel('Please update the quantity before checkout.', 'Please update the quantity before checkout.')}</p>` : '';
  const checkoutDisabled = minimumIssue ? ' disabled aria-disabled="true"' : '';
  return `<section class="cart-page"><div class="container"><div class="breadcrumbs"><a href="#home">Home</a><span>/</span><span>Shopping cart</span></div><div class="section-heading"><div><p class="eyebrow">Your saved build</p><h1 class="detail-title">Shopping cart</h1></div><a class="btn btn-outline" href="#store">Continue shopping</a></div>${state.cart.length ? `<div class="cart-layout"><div class="cart-list">${state.cart.map(item => { const p = product(item.id); const displayName = productNameText(p); const minimumText = productMinimumOrderText(p); return `<div class="cart-item"><img class="${p.image_cutout ? 'is-cutout' : ''}" src="${assetUrl(p.image)}" alt="${esc(displayName)}"><div><h3>${esc(displayName)}</h3><p>${productCategoryText(p)} · ${productMetaText(p)}</p>${minimumText ? `<small class="cart-minimum-note">${esc(minimumText)}</small>` : ''}<button class="btn btn-outline btn-small" data-action="remove-cart" data-id="${p.id}" style="margin-top:10px">Remove</button></div><div class="qty-control"><button data-action="qty" data-id="${p.id}" data-delta="-1">−</button><span>${item.qty}</span><button data-action="qty" data-id="${p.id}" data-delta="1">+</button></div><div class="cart-price">${money(p.price * item.qty)}</div></div>`; }).join('')}</div><aside class="summary-card"><h2>Order summary</h2><div class="summary-row"><span>Parts subtotal</span><strong>${money(total)}</strong></div><div class="summary-row"><span>Estimated delivery</span><strong>Calculated at checkout</strong></div><div class="summary-row"><span>Fitment review</span><strong style="color:var(--success)">Included</strong></div><div class="coupon"><input class="text-input" placeholder="Promo code"><button class="btn btn-outline btn-small" data-action="apply-coupon">Apply</button></div><div class="summary-row total"><span>Total</span><strong>${money(total)}</strong></div>${minimumNotice}<button class="btn btn-primary" data-action="checkout"${checkoutDisabled} style="width:100%;margin-top:12px">Continue to checkout</button><p class="filter-help">Orders are created in the CIRUI backend. Payment remains a separate PayPal step.</p></aside></div>` : `<div class="empty-cart"><h2>Your cart is ready for a build.</h2><p class="muted">Add wheels, calipers, rotors or pads and we will keep the fitment context attached.</p><a class="btn btn-primary" href="#store">Start shopping</a></div>`}</div></section>`;
}

function cartPage() {
  const items = state.cart.map(row => ({ row, item: product(row.id) })).filter(entry => entry.item && entry.item.public_scope !== false && entry.item.category === 'Wheels');
  return `<main class="cart-page rfq-page"><div class="container"><div class="breadcrumbs"><a href="#home">${uiLabel('Home')}</a><span>/</span><span>${uiLabel('RFQ list')}</span></div><div class="section-heading rfq-page-heading"><div><p class="eyebrow">${uiLabel('YOUR CUSTOM WHEEL BRIEF')}</p><h1 class="detail-title">${uiLabel('Request for quotation')}</h1><p>${uiLabel('Collect multiple wheel directions, set quantities, then send one vehicle and destination brief to CIRUI.')}</p></div><a class="btn btn-outline" href="#store">${uiLabel('Add more wheels')}</a></div>${items.length ? `<div class="cart-layout rfq-layout"><div><div class="cart-list rfq-list">${items.map(({ row, item }) => `<article class="cart-item rfq-item"><img class="${item.image_cutout ? 'is-cutout' : ''}" src="${assetUrl(item.image)}" alt="${esc(productNameText(item))}"><div><span class="rfq-item-code">${esc(item.part || item.id)} · ${uiLabel(productConstructionLabel(item))}</span><h3>${esc(productNameText(item))}</h3><p>${uiLabel(productDesignLabel(item))} · ${uiLabel('Custom fitment and finish')}</p><small class="cart-minimum-note">${uiLabel(productMinimumOrderText(item))}</small><button class="rfq-remove" data-action="remove-cart" data-id="${item.id}">${uiLabel('Remove')}</button></div><div class="rfq-quantity"><small>${uiLabel('Quantity')}</small><div class="qty-control"><button data-action="qty" data-id="${item.id}" data-delta="-1">−</button><span>${row.qty}</span><button data-action="qty" data-id="${item.id}" data-delta="1">+</button></div></div><div class="rfq-reference-price"><small>${uiLabel('Reference')}</small><strong>${productPriceText(item)}</strong><span>${uiLabel('Final quote after review')}</span></div></article>`).join('')}</div><div class="rfq-scope-note">${icons.shield}<div><strong>${uiLabel('The RFQ is not a checkout.')}</strong><span>${uiLabel('CIRUI confirms construction, fitment, finish, production time and DDP delivery before any final order or payment.')}</span></div></div></div><aside class="summary-card rfq-summary"><p class="eyebrow">${uiLabel('QUOTE INPUTS')}</p><h2>${uiLabel('Ready to send?')}</h2><div class="rfq-summary-list"><span><b>${items.length}</b>${uiLabel(items.length === 1 ? 'wheel direction' : 'wheel directions')}</span><span><b>${items.reduce((sum, entry) => sum + entry.row.qty, 0)}</b>${uiLabel('total wheels')}</span><span><b>DDP</b>${uiLabel('Europe + North America')}</span><span><b>${state.vehicle?.trim ? '✓' : '—'}</b>${uiLabel(state.vehicle?.trim ? currentVehicleLabel() : 'Vehicle pending')}</span></div><button class="btn btn-primary" data-action="request-rfq" style="width:100%">${uiLabel('Complete RFQ brief')}</button><a class="btn btn-outline" href="/fitment-lab" data-app-path style="width:100%;margin-top:8px">${uiLabel('Check fitment first')}</a><p class="filter-help">${uiLabel('Country and postcode are required for a DDP quotation. No fixed duty-paid price is promised before review.')}</p></aside></div>` : `<div class="empty-cart rfq-empty"><h2>${uiLabel('Your RFQ list is empty.')}</h2><p class="muted">${uiLabel('Add one or more forged wheel directions. CIRUI will combine them with your vehicle, finish, quantity and destination in one quotation request.')}</p><a class="btn btn-primary" href="#store">${uiLabel('Browse forged wheels')}</a></div>`}</div></main>`;
}

function legacyWheelVisualizerResultCard(result, index, item, mode) {
  const angle = wheelVisualizerAngleLabel(result.angle);
  const imageUrl = result.imageUrl || result.image_url || result.url || '';
  return `<article class="wheel-result-card"><div class="wheel-result-media"><img class="wheel-result-output is-ai-generated" src="${esc(imageUrl)}" alt="${esc(item.name)} on your vehicle — ${esc(angle)}" loading="lazy"><span class="wheel-result-mode">CIRUI AI visual preview</span></div><div class="wheel-result-copy"><strong>${esc(angle)}</strong><span>Wheel, finish and fitment held as reference</span></div></article>`;
}
function visualizerProductContext(item) {
  const contexts = {
    Wheels: { subject: 'wheel', heading: 'Preview this wheel', resultNote: 'Image 2 wheel installed; vehicle and tire preserved' },
    Calipers: { subject: 'wheel', heading: 'Preview this wheel', resultNote: 'Image 2 wheel installed; vehicle and tire preserved' },
    Rotors: { subject: 'wheel', heading: 'Preview this wheel', resultNote: 'Image 2 wheel installed; vehicle and tire preserved' },
    'Brake Pads': { subject: 'wheel', heading: 'Preview this wheel', resultNote: 'Image 2 wheel installed; vehicle and tire preserved' }
  };
  return contexts[item?.category] || { subject: 'performance part', heading: 'Preview this part', resultNote: 'Product identity, finish and fitment held as reference' };
}
function legacyWheelVisualizerReferencePicker(item, current) {
  const images = [...new Set([item.image, 'a7dd472643daf9b4.jpg', 'ff2a26733252a2c8.jpg'])];
  const selected = current.referenceImage || item.image;
  return `<section class="wheel-reference-switcher" aria-label="Wheel reference"><div class="wheel-reference-copy"><div class="wheel-content-kicker">Wheel reference</div><strong>Choose the gallery image to use.</strong><span>Replace the reference before generating or regenerate with another angle.</span></div><div class="wheel-reference-options">${images.map((image, index) => `<button class="wheel-reference-option ${selected === image ? 'is-active' : ''}" data-action="wheel-reference" data-image="${esc(image)}" aria-label="Use wheel gallery image ${index + 1}" ${current.phase === 'generating' ? 'disabled' : ''}><img src="${assetUrl(image)}" alt="${esc(item.name)} gallery reference ${index + 1}"><span>${String(index + 1).padStart(2, '0')}</span></button>`).join('')}</div></section>`;
}
function wheelVisualizerReferencePicker(item, current) {
  const images = visualizerReferenceImages(item);
  const selected = current.referenceImage || item.image;
  const context = visualizerProductContext(item);
  const options = images.length ? images.map((image, index) => `<button class="wheel-reference-option ${selected === image ? 'is-active' : ''}" data-action="wheel-reference" data-image="${esc(image)}" aria-label="Use ${esc(context.subject)} gallery image ${index + 1}" ${current.phase === 'generating' ? 'disabled' : ''}><img src="${assetUrl(image)}" alt="${esc(item.name)} gallery reference ${index + 1}"><span>${String(index + 1).padStart(2, '0')}</span></button>`).join('') : `<div class="wheel-reference-unavailable"><strong>Brake-part reference image pending</strong><span>This preview uses the selected product category and finish, while the original wheel remains locked.</span></div>`;
  return `<section class="wheel-reference-switcher" aria-label="Image 2 wheel reference"><div class="wheel-reference-copy"><div class="wheel-content-kicker">Image 2 · wheel reference</div><strong>${images.length ? 'Choose the wheel image to place on the vehicle.' : 'Select a wheel reference image.'}</strong><span>${images.length ? 'Image 1 is your car. Image 2 is the wheel that replaces the original wheel.' : 'The model requires a second image showing the selected wheel.'}</span></div><div class="wheel-reference-options">${options}</div></section>`;
}
function wheelVisualizerInquiryDefaults(item) {
  const meta = String(item?.meta || '');
  const sizeMatch = meta.match(/(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)/);
  const pcdMatches = meta.match(/\d+x\d+(?:\.\d+)?/g) || [];
  const offsetMatch = meta.match(/([+-]\d+(?:\.\d+)?)/);
  return {
    diameter: sizeMatch?.[1] || String(item?.diameter || ''),
    width: sizeMatch?.[2] || '',
    pcd: pcdMatches[pcdMatches.length - 1] || '',
    offset: offsetMatch?.[1] || '',
    center_bore: '',
    quantity: '4',
    oem_diameter: '',
    oem_width: '',
    oem_pcd: '',
    oem_center_bore: '',
    oem_offset: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_note: ''
  };
}
function wheelInquirySelect(name, values, selected, label, required = true) {
  return `<select class="text-input" name="${esc(name)}"${required ? ' required' : ''}><option value="">Select ${esc(label)}</option>${values.map(value => `<option value="${esc(value)}" ${String(value) === String(selected) ? 'selected' : ''}>${esc(value)}</option>`).join('')}</select>`;
}
function wheelInquiryOemFields(draft = {}) {
  const diameters = ['15', '16', '17', '18', '19', '20', '21', '22'];
  const widths = ['5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '11.5', '12.0'];
  const pcds = ['4x98', '4x100', '4x108', '5x100', '5x108', '5x112', '5x114.3', '5x115', '5x120', '5x127', '5x130', '5x135', '5x139.7', '5x150', '5x165.1', '6x114.3', '6x120', '6x135', '6x139.7'];
  const offsets = ['-25', '-10', '0', '+10', '+15', '+20', '+25', '+30', '+35', '+40', '+45', '+50', '+55'];
  return `<div class="wheel-oem-panel"><div class="wheel-oem-head"><strong>OEM wheel data</strong><span class="wheel-oem-badge">OEM</span></div><div class="wheel-inquiry-grid"><label><span>OEM diameter</span>${wheelInquirySelect('oem_diameter', diameters, draft.oem_diameter, 'OEM diameter', false)}</label><label><span>OEM width (J)</span>${wheelInquirySelect('oem_width', widths, draft.oem_width, 'OEM J', false)}</label><label><span>OEM PCD</span>${wheelInquirySelect('oem_pcd', pcds, draft.oem_pcd, 'OEM PCD', false)}</label><label><span>OEM center bore (CB)</span><input class="text-input" name="oem_center_bore" value="${esc(draft.oem_center_bore || '')}" inputmode="decimal" placeholder="e.g. 66.1 mm"></label><label><span>OEM offset (ET)</span>${wheelInquirySelect('oem_offset', offsets, draft.oem_offset, 'OEM ET', false)}</label></div></div>`;
}
function wireWheelInquiryDetails() {
  const form = document.querySelector('form[data-form="wheel-inquiry"]');
  if (!form || form.dataset.fitmentEnhanced === 'true') return;
  const section = form.querySelector('.wheel-inquiry-section');
  if (!section) return;
  const draft = state.wheelVisualizer?.inquiry?.draft || wheelVisualizerInquiryDefaults(wheelVisualizerItem());
  section.insertAdjacentHTML('beforeend', wheelInquiryOemFields(draft));
  const labels = {
    diameter: 'Diameter <b>*</b>',
    width: 'Width (J) <b>*</b>',
    pcd: 'PCD <b>*</b>',
    offset: 'Offset (ET) <b>*</b>',
    center_bore: 'Center bore (CB) <b>*</b>',
    quantity: 'Quantity <b>*</b>'
  };
  Object.entries(labels).forEach(([name, html]) => {
    const label = form.querySelector(`[name="${name}"]`)?.closest('label')?.querySelector(':scope > span');
    if (label) label.innerHTML = html;
  });
  form.dataset.fitmentEnhanced = 'true';
}
function wheelVisualizerDownloadName(item, angle, index = 0) {
  const slug = String(item?.id || item?.name || 'fbox-preview').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'fbox-preview';
  const angleSlug = String(angle || `view-${index + 1}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || `view-${index + 1}`;
  return `fbox-${slug}-${angleSlug}.jpg`;
}
function wheelVisualizerSaveLabel() {
  if (state.locale === 'zh-CN') return '保存到相册';
  if (state.locale === 'zh-TW') return '儲存到相簿';
  return 'Save to Photos';
}
function wheelVisualizerMobile() {
  return window.matchMedia?.('(max-width: 760px)').matches || Number(navigator.maxTouchPoints || 0) > 0;
}
async function wheelVisualizerDownload(imageUrl, fileName) {
  if (!imageUrl) return;
  if (wheelVisualizerMobile()) {
    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      if (!response.ok) throw new Error('Image share failed');
      const blob = await response.blob();
      if (!blob.size) throw new Error('Empty image');
      const file = new File([blob], fileName || 'fbox-preview.jpg', { type: blob.type || 'image/jpeg' });
      if (typeof navigator.share === 'function' && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ files: [file], title: 'CIRUI vehicle preview', text: 'CIRUI custom wheel preview' });
        setToast(state.locale === 'zh-CN' ? '请在系统分享面板选择“存储到照片”或“保存图像”。' : 'Choose Save Image or Add to Photos in the system share sheet.');
        return;
      }
    } catch (error) {
      if (error?.name === 'AbortError') return;
    }
    const opened = window.open(imageUrl, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = imageUrl;
    setToast(state.locale === 'zh-CN' ? '图片已打开，请长按图片保存到相册。' : 'Image opened. Long-press it to save to Photos.');
    return;
  }
  try {
    const response = await fetch(imageUrl, { mode: 'cors' });
    if (!response.ok) throw new Error('Image download failed');
    const blob = await response.blob();
    if (!blob.size) throw new Error('Empty image');
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = fileName || 'fbox-preview.jpg';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1200);
    setToast('Image saved to your downloads.');
  } catch {
    window.open(imageUrl, '_blank', 'noopener,noreferrer');
    setToast('The image opened in a new tab. Use Save image there.');
  }
}
function wheelVisualizerResultCard(result, index, item, mode) {
  const angle = wheelVisualizerAngleLabel(result.angle);
  const imageUrl = result.imageUrl || result.image_url || result.url || '';
  const context = visualizerProductContext(item);
  const displayName = productNameText(item);
  const downloadName = wheelVisualizerDownloadName(item, angle, index);
  const imageActions = imageUrl ? `<div class="wheel-result-actions"><button type="button" class="btn btn-outline btn-small" data-action="wheel-image-viewer" data-image-url="${esc(imageUrl)}" data-angle="${esc(angle)}" data-product="${esc(displayName)}" data-download-name="${esc(downloadName)}">View larger <span aria-hidden="true">↗</span></button><button type="button" class="btn btn-outline btn-small" data-action="wheel-image-download" data-image-url="${esc(imageUrl)}" data-download-name="${esc(downloadName)}">${wheelVisualizerSaveLabel()} <span aria-hidden="true">↓</span></button></div>` : '';
  return `<article class="wheel-result-card"><div class="wheel-result-media">${imageUrl ? `<button type="button" class="wheel-result-open" data-action="wheel-image-viewer" data-image-url="${esc(imageUrl)}" data-angle="${esc(angle)}" data-product="${esc(displayName)}" data-download-name="${esc(downloadName)}" aria-label="View enlarged ${esc(angle)} preview"><img class="wheel-result-output is-ai-generated" src="${esc(imageUrl)}" alt="${esc(displayName)} on your vehicle — ${esc(angle)}" loading="lazy"><span class="wheel-result-zoom-hint">Click to enlarge</span></button>` : '<div class="wheel-result-empty">Preview unavailable</div>'}<span class="wheel-result-mode">CIRUI AI visual preview</span></div><div class="wheel-result-copy"><strong>${esc(angle)}</strong><span>${esc(context.resultNote)}</span>${imageActions}</div></article>`;
}
function wheelVisualizerImageViewer() {
  const viewer = state.wheelVisualizer?.resultViewer;
  if (!viewer?.open || !viewer.imageUrl) return '';
  return `<div class="wheel-image-viewer-overlay" data-action="wheel-image-viewer-close"><div class="wheel-image-viewer" data-wheel-image-viewer role="dialog" aria-modal="true" aria-labelledby="wheel-image-viewer-title" tabindex="-1"><header class="wheel-image-viewer-head"><div><div class="wheel-content-kicker">CIRUI preview</div><h3 id="wheel-image-viewer-title">${esc(viewer.angleLabel)}</h3><span>${esc(viewer.productName)} · click outside to close</span></div><button type="button" class="icon-btn wheel-modal-close" data-action="wheel-image-viewer-close" aria-label="Close enlarged preview">${icons.close}</button></header><div class="wheel-image-viewer-stage"><img src="${esc(viewer.imageUrl)}" alt="${esc(viewer.alt)}"></div><p class="wheel-image-viewer-mobile-note">${state.locale === 'zh-CN' ? '手机端可长按图片保存到相册。' : 'On mobile, long-press the image to save it to Photos.'}</p><div class="wheel-image-viewer-actions"><button type="button" class="btn btn-primary" data-action="wheel-image-download" data-image-url="${esc(viewer.imageUrl)}" data-download-name="${esc(viewer.downloadName)}">${wheelVisualizerSaveLabel()} <span aria-hidden="true">↓</span></button><button type="button" class="btn btn-outline" data-action="wheel-image-viewer-close">Close</button></div></div></div>`;
}
function wheelVisualizerInquiryContent(item, current) {
  const displayName = productNameText(item);
  const draft = { ...wheelVisualizerInquiryDefaults(item), ...(current.inquiry?.draft || {}) };
  const vehicleLabel = state.vehicle ? currentVehicleLabel() : current.vehicleName || 'Uploaded vehicle photo';
  const resultImages = current.results.map(result => result.imageUrl || result.image_url || result.url || '').filter(Boolean);
  const error = current.inquiry?.error ? `<div class="wheel-inquiry-error" role="alert">${esc(current.inquiry.error)}</div>` : '';
  if (current.inquiry?.status === 'success') {
    return `<div class="wheel-visualizer-content wheel-inquiry-success"><div class="wheel-success-mark">✓</div><div class="wheel-content-kicker">Inquiry received</div><h3>We have your build brief.<br><em>CIRUI will follow up.</em></h3><p class="wheel-content-lead">Your product, wheel specifications and three generated previews are now attached to inquiry <strong>${esc(current.inquiry.id || 'submitted')}</strong>. A fitment specialist will confirm clearance and final pricing with you.</p><div class="wheel-inquiry-success-meta"><span>${esc(displayName)}</span><span>${resultImages.length} preview images attached</span><span>${esc(vehicleLabel)}</span></div><div class="wheel-inquiry-actions"><button type="button" class="btn btn-outline" data-action="wheel-inquiry-results">Back to previews</button><button type="button" class="btn btn-primary" data-action="wheel-close">Close studio <span aria-hidden="true">↗</span></button></div></div>`;
  }
  const submitting = current.inquiry?.status === 'submitting';
  return `<div class="wheel-visualizer-content wheel-inquiry-content"><div class="wheel-content-kicker">Start your fitment inquiry</div><h3>Tell us the spec.<br><em>We will confirm the build.</em></h3><p class="wheel-content-lead">Your selected product and all three generated previews will be attached. Choose the wheel data below so the CIRUI team can check the exact vehicle fitment before quoting.</p>${error}<div class="wheel-inquiry-preview-strip">${resultImages.map((imageUrl, index) => `<button type="button" class="wheel-inquiry-preview" data-action="wheel-image-viewer" data-image-url="${esc(imageUrl)}" data-angle="${esc(wheelVisualizerAngleLabel(current.results[index]?.angle))}" data-product="${esc(item.name)}" data-download-name="${esc(wheelVisualizerDownloadName(item, current.results[index]?.angle, index))}" aria-label="View preview ${index + 1}"><img src="${esc(imageUrl)}" alt="${esc(item.name)} preview ${index + 1}"></button>`).join('')}</div><form class="wheel-inquiry-form" data-form="wheel-inquiry"><section class="wheel-inquiry-section"><div><strong>Wheel data</strong><span>Required for fitment review</span></div><div class="wheel-inquiry-grid"><label><span>Diameter <b>*</b></span>${wheelInquirySelect('diameter', ['17', '18', '19', '20', '21', '22'], draft.diameter, 'diameter')}</label><label><span>Width <b>*</b></span>${wheelInquirySelect('width', ['7.0', '7.5', '8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '11.5', '12.0'], draft.width, 'width')}</label><label><span>PCD / bolt pattern <b>*</b></span>${wheelInquirySelect('pcd', ['4x100', '5x100', '5x108', '5x112', '5x114.3', '5x120', '5x127', '5x130', '5x135', '5x139.7', '5x150', '6x135', '6x139.7'], draft.pcd, 'PCD')}</label><label><span>Offset / ET <b>*</b></span>${wheelInquirySelect('offset', ['-10', '0', '+15', '+20', '+25', '+30', '+35', '+40', '+45', '+50'], draft.offset, 'offset')}</label><label><span>Center bore <b>*</b></span><input class="text-input" name="center_bore" value="${esc(draft.center_bore)}" required placeholder="e.g. 66.1 mm"></label><label><span>Quantity <b>*</b></span>${wheelInquirySelect('quantity', ['1', '2', '4'], draft.quantity, 'quantity')}</label></div></section><section class="wheel-inquiry-section"><div><strong>Contact details</strong><span>So a fitment specialist can reply</span></div><div class="wheel-inquiry-grid"><label><span>Name <b>*</b></span><input class="text-input" name="customer_name" value="${esc(draft.customer_name)}" required placeholder="Your name"></label><label><span>Email <b>*</b></span><input class="text-input" name="customer_email" type="email" value="${esc(draft.customer_email)}" required placeholder="you@example.com"></label><label><span>Phone / WhatsApp</span><input class="text-input" name="customer_phone" value="${esc(draft.customer_phone)}" placeholder="Optional"></label><label><span>Vehicle reference</span><input class="text-input" value="${esc(vehicleLabel)}" readonly></label><label class="wheel-inquiry-full"><span>Notes for CIRUI</span><textarea class="text-input" name="customer_note" rows="3" placeholder="Tell us about staggered fitment, brake clearance, finish or delivery needs.">${esc(draft.customer_note)}</textarea></label></div></section><div class="wheel-inquiry-form-actions"><button type="button" class="btn btn-outline" data-action="wheel-inquiry-results" ${submitting ? 'disabled' : ''}>Back to previews</button><button type="button" class="btn btn-outline" data-action="whatsapp-visualizer" ${submitting ? 'disabled' : ''}>${icons.whatsapp} ${uiLabel('WhatsApp fitment consultation')}</button><button type="submit" class="btn btn-primary" ${submitting ? 'disabled' : ''}>${submitting ? 'Sending inquiry…' : 'Send inquiry'} <span aria-hidden="true">↗</span></button></div></form></div>`;
}
function wheelVisualizerModalLegacy() {
  const current = state.wheelVisualizer;
  if (!current?.open) return '';
  const item = wheelVisualizerItem();
  const displayName = productNameText(item);
  const phase = current.phase;
  const steps = [['upload', '01', 'Upload'], ['registration', '02', 'Account'], ['crop', '03', 'Frame'], ['reference', '04', 'Reference'], ['generating', '05', 'Generate'], ['results', '06', 'Results'], ['inquiry', '07', 'Inquiry']];
  const stepIndex = phase === 'error' ? 3 : Math.max(0, steps.findIndex(([key]) => key === phase));
  const stepRail = steps.map(([key, number, label], index) => `<div class="wheel-step ${index === stepIndex ? 'is-active' : ''} ${index < stepIndex ? 'is-done' : ''}"><span>${index < stepIndex ? '✓' : number}</span><strong>${label}</strong></div>`).join('');
  let content = '';
  if (phase === 'upload') content = `<div class="wheel-visualizer-content"><div class="wheel-content-kicker">Start with one real photo</div><h3>Show us the car.<br><em>We will show you the stance.</em></h3><p class="wheel-content-lead">Use a clear exterior photo with at least one wheel visible. A front three-quarter or side view gives the best fitment reference.</p><label class="wheel-upload-zone" data-wheel-dropzone><input type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" data-wheel-upload><span class="wheel-upload-icon">＋</span><strong>Drop your car photo here</strong><span>JPG, PNG, WEBP or HEIC · Up to 20 MB · mobile photos are compressed securely</span><span class="btn btn-dark btn-small">Choose a photo</span></label><div class="wheel-visualizer-privacy"><span>${icons.shield}</span><span>Your image is used only to create this preview. No payment or credits are required.</span></div></div>`;
  if (phase === 'registration') {
    const draft = current.registrationDraft || {};
    const registrationError = current.registrationError ? `<div class="wheel-registration-error" role="alert">${esc(current.registrationError)}</div>` : '';
    content = `<div class="wheel-visualizer-content wheel-registration-content"><div class="wheel-content-kicker">One quick account step</div><h3>Keep your preview.<br><em>Tell us who is building.</em></h3><p class="wheel-content-lead">Your photo is ready. Create an CIRUI account before we generate the preview so your task and final fitment conversation stay attached to you.</p>${registrationError}<form class="wheel-registration-form" data-form="visualizer-register"><label><span>Name <b>*</b></span><input class="text-input" name="name" value="${esc(draft.name || '')}" autocomplete="name" required placeholder="Your name"></label><label><span>Email <b>*</b></span><input class="text-input" name="email" type="email" value="${esc(draft.email || '')}" autocomplete="email" required placeholder="you@example.com"></label><label><span>Phone / WhatsApp <small>(optional)</small></span><div class="wheel-phone-field"><span>+1</span><input class="text-input" name="telephone_local" value="${esc(draft.telephone || '')}" autocomplete="tel" inputmode="tel" placeholder="Phone number"></div></label><p class="wheel-registration-note">Name and email are required. The phone field uses the United States +1 code by default and can be left empty.</p><div class="wheel-registration-actions"><button type="submit" class="btn btn-primary" ${current.registrationSubmitting ? 'disabled' : ''}>${current.registrationSubmitting ? 'Creating account…' : 'Create account & continue'} <span aria-hidden="true">↗</span></button></div></form></div>`;
  }
  if (phase === 'crop') content = `<div class="wheel-visualizer-content"><div class="wheel-content-kicker">Frame the reference</div><h3>Keep the whole car.<br><em>Adjust only if needed.</em></h3><p class="wheel-content-lead">Upload the photo as-is. The full image stays available, even when the car sits low in a portrait frame. Drag the image or use the controls below; a wheel only needs to be visible, not centered in a box.</p><div class="wheel-crop-stage" data-wheel-crop-stage><img data-wheel-crop-image src="${esc(current.vehicleUrl)}" alt="${esc(current.vehicleName || 'Uploaded vehicle photo')}" draggable="false" style="${wheelVisualizerCropStyle(current.crop)}"><div class="wheel-crop-guide"><span>Full photo retained · drag to frame</span></div></div><div class="wheel-crop-live-note"><strong>Live framing</strong><span>Changes update the image above.</span></div><div class="wheel-crop-controls"><label><span>Zoom</span><input type="range" min="1" max="1.6" step="0.01" value="${current.crop.zoom}" data-wheel-crop="zoom"><output data-wheel-crop-output="zoom">${Number(current.crop.zoom).toFixed(2)}×</output></label><label><span>Horizontal position</span><input type="range" min="0" max="100" step="1" value="${current.crop.x}" data-wheel-crop="x"><output data-wheel-crop-output="x">${current.crop.x}%</output></label><label><span>Vertical position</span><input type="range" min="0" max="100" step="1" value="${current.crop.y}" data-wheel-crop="y"><output data-wheel-crop-output="y">${current.crop.y}%</output></label></div><div class="wheel-crop-actions"><button class="btn btn-outline btn-small" data-action="wheel-crop-reset">Reset frame</button><button class="btn btn-primary" data-action="wheel-generate">Generate 3 angles <span aria-hidden="true">↗</span></button></div></div>`;
  if (phase === 'generating') { const referenceAsset = visualizerReferenceAsset(item, current); content = `<div class="wheel-visualizer-content wheel-generating-content" aria-live="polite"><div class="wheel-generating-orbit"><div class="wheel-generating-wheel">${referenceAsset ? `<img src="${referenceAsset}" alt="${esc(item.name)}">` : `<span class="wheel-generating-part">${esc(item.category)}</span>`}</div><span></span><span></span><span></span></div><div class="wheel-content-kicker">CIRUI visual studio</div><h3>Matching ${esc(visualizerProductContext(item).subject)} to vehicle<br><em>and checking the stance.</em></h3><p class="wheel-content-lead">We are applying only the selected ${esc(item.category.toLowerCase())} while keeping the original wheel and vehicle geometry locked.</p><div class="wheel-progress"><span></span></div><div class="wheel-generating-meta"><span>Product mask locked</span><span>3 angles requested</span><span>Officially included</span></div></div>`; }
  if (phase === 'results') content = `<div class="wheel-visualizer-content wheel-results-content"><div class="wheel-results-head"><div><div class="wheel-content-kicker">Your preview set</div><h3>See the wheel<br><em>in its natural stance.</em></h3></div><div class="wheel-results-count"><strong>03</strong><span>angles</span></div></div><p class="wheel-content-lead">These views use ${esc(displayName)} in ${esc(productFinishText(item))} as the wheel reference. Keep the final fitment check with the CIRUI team before production.</p><div class="wheel-results-grid">${current.results.map((result, index) => wheelVisualizerResultCard(result, index, item, current.mode)).join('')}</div><div class="wheel-results-actions"><button class="btn btn-outline" data-action="wheel-reset">Try another photo</button><button class="btn btn-outline" data-action="whatsapp-visualizer">${icons.whatsapp} ${uiLabel('WhatsApp fitment consultation')}</button><button class="btn btn-primary" data-action="wheel-inquiry-open">Start an inquiry <span aria-hidden="true">↗</span></button></div></div>`;
  if (phase === 'results' && item.category !== 'Wheels') {
    const context = visualizerProductContext(item);
    content = content.replace('See the wheel', `See the ${context.subject}`).replace('as the wheel reference', `as the ${context.subject} reference`);
  }
  if (phase === 'inquiry') content = wheelVisualizerInquiryContent(item, current);
  if (phase === 'error') content = `<div class="wheel-visualizer-content wheel-error-content" role="alert"><div class="wheel-error-mark">!</div><div class="wheel-content-kicker">Preview not ready</div><h3>We could not finish<br><em>this set of angles.</em></h3><p class="wheel-content-lead">${esc(current.error || 'Please check the image and try again.')}</p><div class="wheel-error-actions"><button class="btn btn-outline" data-action="wheel-reset">Choose another photo</button><button class="btn btn-primary" data-action="wheel-retry">Retry preview</button></div></div>`;
  return `<div class="wheel-visualizer-overlay" data-action="wheel-close"><div class="wheel-visualizer-shell" data-wheel-modal role="dialog" aria-modal="true" aria-labelledby="wheel-visualizer-dialog-title"><header class="wheel-visualizer-header"><div><div class="wheel-visualizer-brand"><span class="wheel-brand-dot"></span> CIRUI VISUAL STUDIO</div><h2 id="wheel-visualizer-dialog-title">${esc(displayName)} <span>· ${esc(productFinishText(item))}</span></h2></div><div class="wheel-visualizer-header-actions"><span class="wheel-included-badge">Included with your build</span><button class="icon-btn wheel-modal-close" data-action="wheel-close" aria-label="Close visual preview">${icons.close}</button></div></header><div class="wheel-visualizer-body"><aside class="wheel-step-rail"><div class="wheel-step-rail-title">Your build preview</div>${stepRail}<div class="wheel-step-rail-foot"><span>${icons.shield}</span><p>CIRUI covers the preview cost. There is no customer charge.</p></div></aside><main class="wheel-visualizer-main">${wheelVisualizerReferencePicker(item, current)}${content}</main></div></div></div>`;
}
function wheelVisualizerModal() {
  const current = state.wheelVisualizer;
  let html = wheelVisualizerModalLegacy();
  if (!current?.open) return html;
  if (current.phase === 'crop') html = html.replace('data-action="wheel-generate">Generate 3 angles', 'data-action="wheel-reference-next">Continue to wheel reference');
  if (current.phase === 'reference') {
    const item = wheelVisualizerItem();
    const referenceAsset = visualizerReferenceAsset(item, current);
    const referenceLabel = 'Image 2 is sent as the authoritative wheel reference. Image 1 remains the ground-truth vehicle photo.';
    const content = `<div class="wheel-visualizer-content wheel-reference-content"><div class="wheel-content-kicker">Confirm image 2 · wheel reference</div><h3>Lock the wheel.<br><em>Then replace it on the car.</em></h3><p class="wheel-content-lead">${referenceLabel} The original wheel is replaced in its existing position while the vehicle identity, tire and camera perspective stay unchanged.</p><div class="wheel-reference-lockup"><div class="wheel-reference-large">${referenceAsset ? `<img src="${referenceAsset}" alt="${esc(item.name)} selected wheel reference">` : `<span class="wheel-reference-missing">Wheel<br>reference pending</span>`}</div><div><strong>${esc(item.name)}</strong><span>${esc(item.finish)} · ${esc(item.meta)}</span><small>Image 2 locked for all three angles</small></div></div><div class="wheel-reference-actions"><button class="btn btn-outline btn-small" data-action="wheel-reference-back">Back to framing</button><button class="btn btn-primary" data-action="wheel-generate">Generate 3 angles <span aria-hidden="true">↗</span></button></div></div>`;
    html = html.replace('</main></div></div></div>', `${content}</main></div></div></div>`);
  }
  return html;
}
// First-party analytics beacon: every page/product view and key CTA click is
// reported to the CIRUI backend so the owner can see where buyers come from.
// Events are fire-and-forget; failures never affect the storefront.
function analyticsRandomId(prefix) {
  const value = typeof crypto?.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;
  return `${prefix}_${value}`;
}

function analyticsStoredId(storage, key, prefix) {
  try {
    const existing = String(storage.getItem(key) || '').trim();
    if (/^[a-z0-9_-]{10,80}$/i.test(existing)) return existing;
    const created = analyticsRandomId(prefix);
    storage.setItem(key, created);
    return created;
  } catch {
    return analyticsRandomId(prefix);
  }
}

const analyticsVisitorId = analyticsStoredId(localStorage, 'fbox-analytics-visitor', 'visitor');
const analyticsSessionId = analyticsStoredId(sessionStorage, 'fbox-analytics-session', 'session');
const analyticsCampaign = (() => {
  const params = new URLSearchParams(location.search);
  const value = name => String(params.get(name) || '').slice(0, 160);
  return {
    utm_source: value('utm_source'),
    utm_medium: value('utm_medium'),
    utm_campaign: value('utm_campaign'),
    utm_content: value('utm_content'),
    // Campaign values are captured separately above. Do not retain arbitrary
    // query-string values because they can contain customer data.
    landing_path: `${location.pathname}${location.hash}`.slice(0, 160)
  };
})();
let analyticsEngagement = null;
const analyticsFitmentInputSteps = new Set();
const analyticsEngagementMilestones = [10, 30, 60, 120, 300, 600];

function analyticsEventBody(type, payload = {}) {
  const meta = {
    ...(type === 'page_view' || type === 'product_view' ? analyticsCampaign : {}),
    ...(payload.meta && typeof payload.meta === 'object' ? payload.meta : {})
  };
  return {
    type,
    locale: state.locale,
    ...payload,
    visitor_id: analyticsVisitorId,
    session_id: analyticsSessionId,
    meta
  };
}

function trackEvent(type, payload = {}) {
  try {
    fetch('/api/fbox-content/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(analyticsEventBody(type, payload)),
      keepalive: true,
      signal: AbortSignal.timeout(4000)
    }).catch(() => {});
  } catch { /* analytics must never break the page */ }
}

function trackEventBeacon(type, payload = {}) {
  try {
    const body = JSON.stringify(analyticsEventBody(type, payload));
    if (navigator.sendBeacon?.('/api/fbox-content/track', new Blob([body], { type: 'application/json' }))) return;
    fetch('/api/fbox-content/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
  } catch { /* leaving the page must never be delayed by analytics */ }
}

function analyticsIsFitmentPath(path = location.pathname + location.hash) {
  return String(path).includes('/fitment-lab') || String(path).includes('#fitment');
}

function analyticsFitmentStep() {
  return Math.max(0, Number(document.querySelector('.fitment-flow-form')?.dataset.step || state.fitment?.flow?.step || 0));
}

function analyticsEngagementPayload(reason) {
  if (!analyticsEngagement) return null;
  const now = Date.now();
  const elapsedSeconds = Math.max(0, Math.round((now - analyticsEngagement.startedAt) / 1000));
  return {
    path: analyticsEngagement.path,
    title: document.title,
    meta: {
      funnel: analyticsIsFitmentPath(analyticsEngagement.path) ? 'fitment_lab' : '',
      action: 'page-engagement',
      reason,
      active_seconds: Math.round(analyticsEngagement.activeSeconds),
      elapsed_seconds: elapsedSeconds,
      max_scroll: Math.round(analyticsEngagement.maxScroll),
      step: analyticsFitmentStep()
    }
  };
}

function analyticsFlushEngagement(reason, final = false) {
  if (!analyticsEngagement || !analyticsIsFitmentPath(analyticsEngagement.path)) return;
  if (final && analyticsEngagement.finalSent) return;
  const payload = analyticsEngagementPayload(reason);
  if (!payload) return;
  if (final) {
    analyticsEngagement.finalSent = true;
    trackEventBeacon('session_end', payload);
  }
  else trackEvent('engagement', payload);
}

function analyticsBeginPage(path) {
  const now = Date.now();
  analyticsEngagement = {
    path,
    startedAt: now,
    lastTickAt: now,
    lastInteractionAt: now,
    activeSeconds: 0,
    maxScroll: 0,
    finalSent: false,
    sentMilestones: new Set()
  };
}

function trackFitmentFunnel(action, extra = {}) {
  const path = location.pathname + location.hash;
  trackEvent('funnel', {
    path,
    title: action,
    meta: {
      funnel: 'fitment_lab',
      action,
      step: Number(extra.step ?? analyticsFitmentStep()),
      mode: extra.mode || state.fitment?.flow?.mode || '',
      reason: extra.reason || '',
      error_code: extra.error_code || '',
      label: extra.label || ''
    }
  });
}

function trackFitmentFieldActivity(element) {
  if (!element?.closest?.('[data-form="fitment-wizard"], [data-form="fitment-check"]')) return;
  const step = analyticsFitmentStep() || 1;
  const key = `${location.pathname}${location.hash}:${step}`;
  if (analyticsFitmentInputSteps.has(key)) return;
  analyticsFitmentInputSteps.add(key);
  trackFitmentFunnel('fitment-field-input', { step });
}

function analyticsTick() {
  if (!analyticsEngagement) return;
  const now = Date.now();
  const delta = Math.min(2, Math.max(0, (now - analyticsEngagement.lastTickAt) / 1000));
  analyticsEngagement.lastTickAt = now;
  if (!document.hidden && now - analyticsEngagement.lastInteractionAt <= 30_000) analyticsEngagement.activeSeconds += delta;
  if (!analyticsIsFitmentPath(analyticsEngagement.path)) return;
  for (const milestone of analyticsEngagementMilestones) {
    if (analyticsEngagement.activeSeconds < milestone || analyticsEngagement.sentMilestones.has(milestone)) continue;
    analyticsEngagement.sentMilestones.add(milestone);
    analyticsFlushEngagement(`active-${milestone}s`);
  }
}

function analyticsUpdateScroll(event) {
  if (!analyticsEngagement || !analyticsIsFitmentPath(analyticsEngagement.path)) return;
  const target = event?.target;
  const scroller = target === document ? document.documentElement : target;
  const scrollTop = target === document ? (window.scrollY || document.documentElement.scrollTop) : Number(scroller?.scrollTop || 0);
  const scrollHeight = target === document ? document.documentElement.scrollHeight : Number(scroller?.scrollHeight || 0);
  const clientHeight = target === document ? window.innerHeight : Number(scroller?.clientHeight || 0);
  const available = Math.max(0, scrollHeight - clientHeight);
  if (!available) return;
  analyticsEngagement.maxScroll = Math.max(analyticsEngagement.maxScroll, Math.min(100, (scrollTop / available) * 100));
}

window.setInterval(analyticsTick, 1000);
['pointerdown', 'keydown', 'touchstart'].forEach(name => document.addEventListener(name, () => {
  if (analyticsEngagement) analyticsEngagement.lastInteractionAt = Date.now();
}, { passive: true, capture: true }));
document.addEventListener('scroll', analyticsUpdateScroll, { passive: true, capture: true });
document.addEventListener('visibilitychange', () => {
  analyticsTick();
  if (document.hidden) analyticsFlushEngagement('page-hidden', true);
  else if (analyticsEngagement) {
    analyticsEngagement.finalSent = false;
    analyticsEngagement.lastInteractionAt = Date.now();
  }
});
window.addEventListener('pagehide', () => { analyticsTick(); analyticsFlushEngagement('pagehide', true); });
let analyticsLastClientError = '';
function analyticsTrackClientError(message, code = 'runtime-error') {
  if (!analyticsIsFitmentPath()) return;
  const label = String(message || '').slice(0, 160);
  const signature = `${code}:${label}`;
  if (!label || signature === analyticsLastClientError) return;
  analyticsLastClientError = signature;
  trackEvent('client_error', {
    path: location.pathname + location.hash,
    title: 'fitment-error',
    meta: { funnel: 'fitment_lab', action: 'fitment-error', step: analyticsFitmentStep(), error_code: code, label }
  });
}
window.addEventListener('error', event => analyticsTrackClientError(event.message, event.error?.name || 'runtime-error'));
window.addEventListener('unhandledrejection', event => analyticsTrackClientError(event.reason?.message || String(event.reason || ''), event.reason?.name || 'unhandled-rejection'));

let lastTrackedPath = '';
function trackPageView() {
  const path = location.pathname + location.hash;
  if (path === lastTrackedPath) return;
  if (analyticsEngagement) analyticsFlushEngagement('route-change');
  lastTrackedPath = path;
  analyticsBeginPage(path);
  const productId = state.route?.name === 'product' ? state.route.id : '';
  trackEvent(productId ? 'product_view' : 'page_view', {
    path,
    title: document.title,
    referrer: document.referrer || '',
    product_id: productId,
    product_name: productId ? (product(productId)?.name || '') : '',
    meta: {
      ...(analyticsIsFitmentPath(path) ? { funnel: 'fitment_lab', action: 'fitment-page-view', step: path.includes('/result') ? 6 : 0 } : {}),
      screen_width: window.innerWidth,
      screen_height: window.innerHeight
    }
  });
}

function workspaceClearModalMarkup(kind = 'fitment') {
  const fitment = kind === 'fitment';
  const title = fitment ? uiLabel('Clear this current build?') : uiLabel('Remove this shop connection?');
  const description = fitment
    ? uiLabel('This removes the vehicle, measurements, selected wheel and latest calculation from this browser.')
    : uiLabel('Future design, inquiry and order activity on this browser will no longer be attributed to this shop.');
  const safeguard = fitment
    ? uiLabel('Projects already saved to your account will remain available in My Account.')
    : uiLabel('This does not delete the shared build or any saved project.');
  const cancelLabel = fitment ? uiLabel('Keep current build') : uiLabel('Keep shop connection');
  const confirmLabel = fitment ? uiLabel('Confirm clear') : uiLabel('Remove connection');
  const confirmAction = fitment ? 'fitment-clear-confirm' : 'partner-referral-clear-confirm';
  return `<div class="overlay" data-action="close-modal"><div class="modal workspace-clear-modal" data-modal-content role="dialog" aria-modal="true" aria-labelledby="workspace-clear-title"><button class="icon-btn modal-close" data-action="close-modal" aria-label="${esc(uiLabel('Close'))}">${icons.close}</button><span class="workspace-clear-icon">${icons.shield}</span><p class="eyebrow">${fitment ? uiLabel('Current engineering file') : uiLabel('Partner-protected build')}</p><h2 id="workspace-clear-title">${title}</h2><p>${description}</p><div class="workspace-clear-safeguard">${icons.shield}<span>${safeguard}</span></div><div class="workspace-clear-actions"><button type="button" class="btn btn-outline" data-action="close-modal">${cancelLabel}</button><button type="button" class="btn workspace-clear-confirm" data-action="${confirmAction}">${confirmLabel}</button></div></div></div>`;
}

function rfqModalMarkup() {
  const draft = state.rfq.draft || {};
  const items = state.cart.map(row => ({ row, item: product(row.id) })).filter(entry => entry.item?.category === 'Wheels' && entry.item.public_scope !== false);
  if (state.rfq.status === 'success') {
    return `<div class="overlay" data-action="close-modal"><div class="modal rfq-modal rfq-success" data-modal-content role="dialog" aria-modal="true"><button class="icon-btn modal-close" data-action="close-modal" aria-label="${esc(uiLabel('Close'))}">${icons.close}</button><span class="rfq-success-mark">✓</span><p class="eyebrow">${uiLabel('RFQ RECEIVED')}</p><h2>${uiLabel('Your custom wheel brief is with CIRUI.')}</h2><p>${uiLabel('A fitment and export specialist will review the wheel directions, vehicle, finish and destination before confirming the final quotation.')}</p><div><span>${uiLabel('Inquiry reference')}</span><strong>${esc(state.rfq.id || 'Submitted')}</strong></div><button class="btn btn-primary" data-action="close-modal">${uiLabel('Continue')}</button></div></div>`;
  }
  const account = state.account || {};
  const submitting = state.rfq.status === 'submitting';
  const vehicleValue = draft.vehicle || (state.vehicle?.trim ? currentVehicleLabel() : '');
  return `<div class="overlay" data-action="close-modal"><div class="modal modal-wide rfq-modal" data-modal-content role="dialog" aria-modal="true" aria-labelledby="rfq-modal-title"><button class="icon-btn modal-close" data-action="close-modal" aria-label="${esc(uiLabel('Close'))}">${icons.close}</button><div class="rfq-modal-head"><div><p class="eyebrow">${uiLabel('CUSTOM FORGED WHEEL RFQ')}</p><h2 id="rfq-modal-title">${uiLabel('Complete the quotation brief.')}</h2><p>${uiLabel('CIRUI will confirm the engineering specification and DDP route before issuing the final price.')}</p></div><span><b>${items.length}</b>${uiLabel(items.length === 1 ? 'design' : 'designs')}</span></div>${state.rfq.error ? `<div class="rfq-form-error">${esc(state.rfq.error)}</div>` : ''}<div class="rfq-modal-items">${items.map(({ row, item }) => `<article><img src="${assetUrl(item.image)}" alt="${esc(productNameText(item))}"><span><strong>${esc(productNameText(item))}</strong><small>${esc(item.part || item.id)} · ${uiLabel(productConstructionLabel(item))}</small></span><b>× ${row.qty}</b></article>`).join('')}</div><form class="rfq-form" data-form="rfq"><section><h3>${uiLabel('Buyer and contact')}</h3><div class="rfq-form-grid"><label><span>${uiLabel('Name')} *</span><input class="text-input" name="customer_name" value="${esc(draft.customer_name || account.name || account.username || '')}" autocomplete="name" required></label><label><span>${uiLabel('Email')} *</span><input class="text-input" type="email" name="customer_email" value="${esc(draft.customer_email || account.email || '')}" autocomplete="email" required></label><label><span>${uiLabel('Phone / WhatsApp')}</span><input class="text-input" name="customer_phone" value="${esc(draft.customer_phone || account.telephone || '')}" autocomplete="tel"></label><label><span>${uiLabel('Company')}</span><input class="text-input" name="company" value="${esc(draft.company || account.company || '')}" autocomplete="organization"></label><label><span>${uiLabel('Buyer type')}</span><select class="filter-select" name="buyer_type"><option value="retail" ${draft.buyer_type === 'retail' || !draft.buyer_type ? 'selected' : ''}>${uiLabel('Private buyer')}</option><option value="dealer" ${draft.buyer_type === 'dealer' ? 'selected' : ''}>${uiLabel('Dealer / tuning shop')}</option><option value="distributor" ${draft.buyer_type === 'distributor' ? 'selected' : ''}>${uiLabel('Distributor')}</option></select></label></div></section><section><h3>${uiLabel('Vehicle and wheel brief')}</h3><div class="rfq-form-grid"><label class="rfq-wide"><span>${uiLabel('Vehicle')} *</span><input class="text-input" name="vehicle" value="${esc(vehicleValue)}" placeholder="2024 BMW G80 M3 / exact trim" required></label><label><span>${uiLabel('Preferred finish')}</span><input class="text-input" name="finish" value="${esc(draft.finish || '')}" placeholder="Brushed clear / satin black"></label><label><span>${uiLabel('Quantity note')}</span><input class="text-input" name="quantity_note" value="${esc(draft.quantity_note || '')}" placeholder="Staggered set / repeat volume"></label></div></section><section><h3>${uiLabel('Destination and DDP')}</h3><div class="rfq-form-grid"><label><span>${uiLabel('Country')} *</span><input class="text-input" name="country" value="${esc(draft.country || '')}" autocomplete="country-name" required></label><label><span>${uiLabel('ZIP / postcode')} *</span><input class="text-input" name="postcode" value="${esc(draft.postcode || '')}" autocomplete="postal-code" required></label><label class="rfq-ddp-choice"><input type="checkbox" name="ddp_requested" ${draft.ddp_requested === false ? '' : 'checked'}><span><strong>${uiLabel('Request DDP quotation')}</strong><small>${uiLabel('Available across Europe and North America; final route and landed price require destination review.')}</small></span></label><label class="rfq-wide"><span>${uiLabel('Notes')}</span><textarea class="text-input" name="customer_note" rows="4" placeholder="${esc(uiLabel('Brake package, suspension, target stance, logo cap, finish reference or trade volume.'))}">${esc(draft.customer_note || '')}</textarea></label></div></section><div class="rfq-form-actions"><button type="button" class="btn btn-outline" data-action="close-modal" ${submitting ? 'disabled' : ''}>${uiLabel('Keep editing later')}</button><button type="submit" class="btn btn-primary" ${submitting || !items.length ? 'disabled' : ''}>${submitting ? uiLabel('Sending RFQ…') : uiLabel('Send RFQ to CIRUI')}</button></div></form></div></div>`;
}

function modal() {
  if (!state.modal) return '';
  if (state.modal.type === 'ai-design-image') return `<div class="overlay ai-wheel-image-overlay" data-action="close-modal"><div class="ai-wheel-image-dialog" data-modal-content role="dialog" aria-modal="true" aria-label="${esc(state.modal.label || uiLabel('AI Original Design'))}"><header><div><p class="eyebrow">${uiLabel('Concept preview only')}</p><h2>${esc(state.modal.label || uiLabel('AI Original Design'))}</h2></div><button class="icon-btn modal-close" data-action="close-modal" aria-label="${esc(uiLabel('Close'))}">${icons.close}</button></header><img src="${esc(state.modal.imageUrl || '')}" alt="${esc(state.modal.label || uiLabel('AI Original Design'))}"><p>${uiLabel('AI images do not approve fitment, strength or manufacturing. Final production requires CIRUI engineering CAD, load review and physical-clearance approval.')}</p></div></div>`;
  if (state.modal.type === 'factory-film') return `<div class="overlay factory-film-overlay" data-action="close-modal"><div class="factory-film-dialog" data-modal-content role="dialog" aria-modal="true" aria-labelledby="factory-film-title"><div class="factory-film-dialog-head"><div><p class="eyebrow">CIRUI FORGED · FACTORY FILM</p><h2 id="factory-film-title">${uiLabel('Inside CIRUI manufacturing')}</h2></div><button class="icon-btn modal-close" data-action="close-modal" aria-label="${esc(uiLabel('Close'))}">${icons.close}</button></div><div class="factory-film-player"><video controls autoplay playsinline preload="metadata" poster="${assetUrl(factoryFilm.poster)}" data-factory-film-player><source src="${assetUrl(factoryFilm.source)}" type="video/mp4"></video></div><div class="factory-film-dialog-foot"><p>${uiLabel('Real factory footage from machining through finishing, inspection and packing.')}</p><span>${uiLabel('Full film · 02:16')}</span></div></div></div>`;
  if (state.modal.type === 'rfq') return rfqModalMarkup();
  if (state.modal.type === 'fitment-wizard') return fitmentWizardModalMarkup();
  if (state.modal.type === 'fitment-package') return fitmentPackageModalMarkup(state.modal.packageId);
  if (state.modal.type === 'fitment-evidence') return fitmentEvidenceModalMarkup();
  if (state.modal.type === 'fitment-diagnostics') return fitmentDiagnosticsModalMarkup();
  if (state.modal.type === 'fitment-concept') return `<div class="overlay fitment-detail-overlay" data-action="close-modal"><div class="modal modal-wide fitment-concept-modal" data-modal-content><button class="icon-btn modal-close" data-action="close-modal" aria-label="${esc(uiLabel('Close'))}">${icons.close}</button>${workshopConceptMarkup(workshopCurrentProjectView())}</div></div>`;
  if (state.modal.type === 'fitment-clear-confirm') return workspaceClearModalMarkup('fitment');
  if (state.modal.type === 'partner-referral-clear-confirm') return workspaceClearModalMarkup('partner');
  if (state.modal.type === 'account-panel') {
    const account = state.account || {};
    return `<div class="overlay" data-action="close-modal"><div class="modal" data-modal-content><button class="icon-btn modal-close" data-action="close-modal">${icons.close}</button><p class="eyebrow">CIRUI account</p><h2>Hi, ${esc(account.name || account.username || 'builder')}.</h2><div class="account-panel"><p>${esc(account.email || '')}${account.company ? ' · ' + esc(account.company) : ''}${account.country ? ' · ' + esc(account.country) : ''}</p><div class="account-panel-actions"><button class="btn btn-outline" data-action="orders">Track my orders</button><button class="btn btn-dark" data-action="account-logout">Sign out</button></div></div></div></div>`;
  }
  if (state.modal.type === 'workshop-profile') {
    const profile = resolvedWorkshopProfile();
    const continueSharing = state.modal.afterSave === 'workshop-share';
    return `<div class="overlay" data-action="close-modal"><div class="modal workshop-profile-quick" data-modal-content><button class="icon-btn modal-close" data-action="close-modal" aria-label="${esc(uiLabel('Close'))}">${icons.close}</button><div class="workshop-profile-quick-head"><span>${icons.store}</span><div><p class="eyebrow">${uiLabel('Customer link setup')}</p><h2>${uiLabel('Complete your shop profile.')}</h2></div></div><p>${uiLabel('Let the customer know who is helping them.')} ${uiLabel('These details appear on your customer link. Save them once and the next share is instant.')}</p><form class="modal-form workshop-profile-quick-form" data-form="workshop-profile-quick"><div class="workshop-profile-quick-grid"><label><span>${uiLabel('Shop name')} *</span><input class="text-input" name="shop_name" value="${esc(profile.shop_name)}" autocomplete="organization" required placeholder="${esc(uiLabel('Your tuning shop'))}"></label><label><span>${uiLabel('Advisor name')}</span><input class="text-input" name="advisor_name" value="${esc(profile.advisor_name)}" autocomplete="name" placeholder="${esc(uiLabel('Fitment advisor'))}"></label><label><span>${uiLabel('Email')} *</span><input class="text-input" name="email" type="email" value="${esc(profile.email)}" autocomplete="email" required placeholder="shop@example.com"></label><label><span>${uiLabel('Phone / WhatsApp')}</span><input class="text-input" name="phone" value="${esc(profile.phone)}" autocomplete="tel" placeholder="+1"></label><label class="workshop-profile-location"><span>${uiLabel('City / location')}</span><input class="text-input" name="location" value="${esc(profile.location)}" autocomplete="address-level2" placeholder="Los Angeles, CA"></label></div>${state.workshop.error ? `<p class="workshop-profile-quick-error">${esc(state.workshop.error)}</p>` : ''}<button class="btn btn-primary" type="submit">${icons.save} ${continueSharing ? uiLabel('Save and create customer link') : uiLabel('Save shop profile')}</button><small class="workshop-profile-quick-note">${uiLabel('You can update these details later in My Account.')}</small></form></div></div>`;
  }
  if (state.modal.type === 'workshop-history') {
    const project = state.workshop.currentProject || {};
    const revisions = [...(project.revision_history || [])].reverse();
    const revisionSpec = revision => ['front', 'rear'].map(axle => {
      const recommendation = revision?.result?.axles?.[axle]?.recommendation || {};
      return recommendation.diameter_in && recommendation.width_in ? `${axle === 'front' ? uiLabel('Front axle') : uiLabel('Rear axle')} ${recommendation.diameter_in}×${recommendation.width_in}J ET${recommendation.et_mm ?? '—'}` : '';
    }).filter(Boolean).join(' · ') || uiLabel('Fitment calculation not saved in this revision');
    return `<div class="overlay" data-action="close-modal"><div class="modal modal-wide workshop-history-modal" data-modal-content><button class="icon-btn modal-close" data-action="close-modal" aria-label="${esc(uiLabel('Close'))}">${icons.close}</button><p class="eyebrow">${uiLabel('Customer modification record')}</p><h2>${uiLabel('Modification history')}</h2><p>${uiLabel('Opening an older version loads it as a draft. Saving it creates a new revision and never deletes the later history.')}</p><div class="workshop-history-current"><span>${uiLabel('Current revision')}</span><strong>${String(project.revision || 1).padStart(2, '0')} · ${esc(workshopVehicleLabel(project))}</strong><small>${esc(revisionSpec(project))}</small></div><div class="workshop-history-list">${revisions.length ? revisions.map(revision => `<article><div><span>${uiLabel('Revision')} ${String(revision.revision || 1).padStart(2, '0')}</span><strong>${esc(revision.title || project.title || uiLabel('Untitled project'))}</strong><small>${esc(revisionSpec(revision))}</small><time>${esc(revision.saved_at ? new Date(revision.saved_at).toLocaleString() : '')}</time></div><button type="button" class="btn btn-outline btn-small" data-action="workshop-restore-revision" data-revision="${esc(revision.revision)}">${uiLabel('Open as new draft')}</button></article>`).join('') : `<div class="workshop-project-empty"><strong>${uiLabel('No earlier revisions yet.')}</strong><span>${uiLabel('Save after the next calibration and the previous customer setup will appear here.')}</span></div>`}</div></div></div>`;
  }
  if (!state.modal) return '';
  if (state.modal.type === 'ai-design-contact') {
    const selected = aiWheelSelectedConcept();
    const selectedImage = selected?.image_url || selected?.url || '';
    const wechatQr = assetUrl('domestic/media/cerui-wechat-contact-qr.webp');
    return `<div class="overlay contact-inquiry-overlay" data-action="close-modal"><div class="modal contact-inquiry-modal" data-modal-content role="dialog" aria-modal="true" aria-labelledby="ai-design-contact-title"><button class="icon-btn modal-close" data-action="close-modal" aria-label="${esc(uiLabel('Close'))}">${icons.close}</button><div class="contact-inquiry-head"><p class="eyebrow">${uiLabel('AI Original Design')}</p><h2 id="ai-design-contact-title">把选中的概念交给策锐继续深化</h2><p>请联系策锐确认车型、尺寸和设计方向，工程师将进一步转换为制造级 CAD 并完成强度与间隙审核。</p></div>${selectedImage ? `<div class="contact-inquiry-product"><img src="${esc(selectedImage)}" alt="${esc(uiLabel('Selected concept'))}" loading="eager"><div><small>AI 概念预览</small><strong>${esc(uiLabel('Selected concept'))}</strong><span>不是生产图纸 · 需工程审核</span></div></div>` : ''}<div class="contact-inquiry-grid"><a class="contact-inquiry-phone" href="tel:${company.tel}"><span>${icons.phone || icons.chat}</span><small>${esc(company.contactName)} · 电话咨询</small><strong>${company.phone}</strong></a><section class="contact-inquiry-wechat"><div class="contact-inquiry-wechat-title"><small>${esc(company.contactName)} · ${uiLabel('WeChat consultation')}</small><strong>${uiLabel('Scan the QR code to add CIRUI on WeChat.')}</strong></div><div class="contact-inquiry-qr"><a href="${wechatQr}" target="_blank" rel="noopener" aria-label="${esc(uiLabel('WeChat consultation'))}"><img data-contact-qr src="${wechatQr}" alt="${esc(uiLabel('WeChat consultation'))}"></a><div class="contact-inquiry-qr-missing" hidden>${uiLabel('The WeChat QR code has not been uploaded yet.')}</div></div></section></div></div></div>`;
  }
  if (state.modal.type === 'contact-inquiry') {
    const item = product(state.modal.id);
    if (!item) return '';
    const displayName = productNameText(item);
    const wechatQr = assetUrl('domestic/media/cerui-wechat-contact-qr.webp');
    return `<div class="overlay contact-inquiry-overlay" data-action="close-modal"><div class="modal contact-inquiry-modal" data-modal-content role="dialog" aria-modal="true" aria-labelledby="contact-inquiry-title"><button class="icon-btn modal-close" data-action="close-modal" aria-label="${esc(uiLabel('Close'))}">${icons.close}</button><div class="contact-inquiry-head"><p class="eyebrow">${uiLabel('Product inquiry')}</p><h2 id="contact-inquiry-title">${uiLabel('Contact CIRUI directly')}</h2><p>${uiLabel('Mention this model when contacting us')}：<strong>${esc(item.part || displayName)}</strong></p></div><div class="contact-inquiry-product"><img src="${assetUrl(item.image)}" alt="${esc(displayName)}" loading="eager"><div><small>${esc(item.part || 'CIRUI FORGED')}</small><strong>${esc(displayName)}</strong><span>${uiLabel('Price on request')} · ${uiLabel(productConstructionLabel(item))}</span></div></div><div class="contact-inquiry-grid"><a class="contact-inquiry-phone" href="tel:${company.tel}"><span>${icons.phone || icons.chat}</span><small>${esc(company.contactName)} · ${uiLabel('Call us')}</small><strong>${company.phone}</strong></a><section class="contact-inquiry-wechat"><div class="contact-inquiry-wechat-title"><small>${esc(company.contactName)} · ${uiLabel('WeChat consultation')}</small><strong>${uiLabel('Scan the QR code to add CIRUI on WeChat.')}</strong></div><div class="contact-inquiry-qr"><a href="${wechatQr}" target="_blank" rel="noopener" aria-label="${esc(uiLabel('WeChat consultation'))}"><img data-contact-qr src="${wechatQr}" alt="${esc(uiLabel('WeChat consultation'))}"></a><div class="contact-inquiry-qr-missing" hidden>${uiLabel('The WeChat QR code has not been uploaded yet.')}</div></div></section></div></div></div>`;
  }
  if (state.modal.type === 'quick') { const item = product(state.modal.id); const displayName = productNameText(item); return `<div class="overlay" data-action="close-modal"><div class="modal" data-modal-content><button class="icon-btn modal-close" data-action="close-modal">${icons.close}</button><p class="eyebrow">${uiLabel('Quick view')}</p><h2>${esc(displayName)}</h2><div class="quick-product"><img src="${assetUrl(item.image)}" alt="${esc(displayName)}"><div><div class="product-brand">${esc(item.part || item.brand)} · ${uiLabel(productConstructionLabel(item))}</div><p>${uiLabel(productDesignLabel(item))}<br>${uiLabel(productClassificationLabel(item))}</p><strong style="font-size:22px">${uiLabel('Price on request')}</strong><button class="btn btn-primary" data-action="contact-inquiry" data-id="${item.id}" style="width:100%;margin-top:15px">${uiLabel('Inquire now')}</button><a class="btn btn-outline" href="#product/${item.id}" style="width:100%;margin-top:8px">${uiLabel('View full details')}</a></div></div></div></div>`; }
  if (state.modal.type === 'account') { const register = state.modal.mode === 'register'; return `<div class="overlay" data-action="close-modal"><div class="modal" data-modal-content><button class="icon-btn modal-close" data-action="close-modal" aria-label="关闭">${icons.close}</button><p class="eyebrow">CIRUI 账号</p><h2>${register ? '创建您的定制账号' : '登录后保存设计方案'}</h2><p>${register ? '保存适配方案、原创设计和询价记录；车行客户可填写公司信息，便于后续沟通。' : '登录后可继续生成 AI 原创轮毂方案，并同步保存您的设计记录。'}</p><form class="modal-form" data-form="account" data-mode="${register ? 'register' : 'login'}"><input class="text-input" name="username" placeholder="用户名" autocomplete="username" required><input class="text-input" name="password" type="password" placeholder="密码（至少 6 位）" autocomplete="${register ? 'new-password' : 'current-password'}" minlength="6" required>${register ? '<input class="text-input" name="email" type="email" autocomplete="email" placeholder="邮箱（用于询价与进度通知）" required><input class="text-input" name="telephone" autocomplete="tel" placeholder="联系电话（选填）"><input class="text-input" name="company" autocomplete="organization" placeholder="公司名称（车行或经销商选填）">' : ''}<button class="btn btn-primary">${register ? '创建账号并登录' : '登录'}</button><button class="btn btn-outline" type="button" data-action="${register ? 'account-login' : 'account-register'}">${register ? '已有账号，直接登录' : '创建新账号'}</button></form></div></div>`; }
  if (state.modal.type === 'orders') return `<div class="overlay" data-action="close-modal"><div class="modal modal-wide" data-modal-content><button class="icon-btn modal-close" data-action="close-modal">${icons.close}</button><p class="eyebrow">CIRUI account</p><h2>Track my orders.</h2><p>订单状态来自 CIRUI 自有订单服务；发货后可在这里继续查看物流信息。</p>${state.accountOrdersLoading ? '<div class="loading-copy">正在读取订单…</div>' : state.accountOrders.length ? `<div class="account-order-list">${state.accountOrders.map(order => `<article class="account-order"><div><strong>${esc(order.orderSn || order.id || 'Order')}</strong><small>${esc(order.createTime || '')}</small></div><div><span>${esc(order.productName || order.receiverName || 'CIRUI order')}</span><small>${esc(order.status === 0 ? '待付款' : order.status === 1 ? '待发货' : order.status === 2 ? '已发货' : order.status === 3 ? '已完成' : order.status === 4 ? '已关闭' : '处理中')}</small></div><strong>${money(order.payAmount || order.totalAmount || 0)}</strong></article>`).join('')}</div>` : '<div class="empty-state"><h3>暂无订单</h3><p>登录后创建的 CIRUI 订单会出现在这里。</p></div>'}</div></div>`;
  if (state.modal.type === 'review') return `<div class="overlay" data-action="close-modal"><div class="modal" data-modal-content><button class="icon-btn modal-close" data-action="close-modal">${icons.close}</button><p class="eyebrow">Your experience</p><h2>Write a review.</h2><form class="modal-form" data-form="review"><div class="review-rating-input" role="radiogroup" aria-label="Rating"><input type="hidden" name="rating" value="5">${[5,4,3,2,1].map(n => `<button type="button" class="rating-star ${n === 5 ? 'is-active' : ''}" data-rating="${n}" aria-label="${n} stars">★</button>`).join('')}</div><input class="text-input" name="title" placeholder="Review title" required><textarea class="text-input" name="body" rows="5" placeholder="What did you install? How does it fit?" required></textarea><input class="text-input" name="vehicle" placeholder="Your vehicle (e.g. 2023 BMW M340i)"><button class="btn btn-primary">Submit review</button></form></div></div>`;
  if (state.modal.type === 'checkout') { const f = state.checkoutForm || {}; return `<div class="overlay" data-action="close-modal"><div class="modal" data-modal-content><button class="icon-btn modal-close" data-action="close-modal">${icons.close}</button><p class="eyebrow">Secure checkout</p><h2>创建 CIRUI 订单</h2><div class="checkout-steps">${['客户信息', '收货信息', '创建订单'].map((label, i) => `<div class="checkout-step ${state.checkoutStep === i + 1 || state.checkoutStep === 3 ? 'is-active' : ''}">${i + 1}. ${label}</div>`).join('')}</div>${state.checkoutStep === 4 ? `<div class="success-box"><h3>订单已创建。</h3><p>订单号：${esc(state.lastOrder?.orderSn || state.lastOrder?.id || '已提交')}。你可以在后台“订单 > 订单列表”继续处理。</p><button class="btn btn-dark" data-action="close-modal">返回商城</button></div>` : `<form class="modal-form" data-form="checkout"><input class="text-input" name="name" value="${esc(f.name || '')}" required placeholder="Full name"><input class="text-input" name="phone" value="${esc(f.phone || '')}" required placeholder="Phone number"><input class="text-input" name="email" value="${esc(f.email || '')}" type="email" required placeholder="Email address"><input class="text-input" name="address" value="${esc(f.address || '')}" required placeholder="Street address"><div class="filter-row"><input class="text-input" name="city" value="${esc(f.city || '')}" required placeholder="City"><input class="text-input" name="province" value="${esc(f.province || '')}" placeholder="State / Province"></div><div class="filter-row"><input class="text-input" name="region" value="${esc(f.region || '')}" placeholder="Region"><input class="text-input" name="postCode" value="${esc(f.postCode || '')}" required placeholder="Postcode"></div><p class="filter-help">订单会先创建为“待付款”，支付由后台配置的支付渠道处理。</p><button class="btn btn-primary" data-submit-order>${state.checkoutStep === 3 ? '提交并创建订单' : '继续填写并创建订单'}</button></form>`}</div></div>`; }
  return '';
}
function chat() {
  const messages = state.chatMessages.length
    ? state.chatMessages.map(message => message.kind === 'quote' && message.quote ? `<div class="chat-bubble is-agent">${esc(message.text)}${quoteCardMarkup(message.quote)}</div>` : `<div class="chat-bubble ${message.role === 'customer' ? 'is-customer' : 'is-agent'}">${esc(message.text)}</div>`).join('')
    : '<div class="chat-bubble">Hey — tell us what you are building. A fitment specialist will follow up here.</div>';
  return `<button class="chat-fab" data-action="chat" aria-label="Open chat">${icons.chat}${state.chatMessages.length ? `<span class="chat-fab-dot" aria-label="Chat active"></span>` : ''}</button>${state.chatOpen ? `<div class="chat-panel"><div class="chat-head"><div><strong>CIRUI fitment help</strong><small>Usually replies in a few minutes</small></div><button class="icon-btn" data-action="chat">${icons.close}</button></div><div class="chat-body"><div class="chat-thread">${messages}</div><div class="chat-quick"><button data-action="chat-reply" data-message="I need help checking my wheel fitment.">Check my wheel fitment</button><button data-action="chat-reply" data-message="Can you recommend brake pads for my car?">Recommend brake pads</button><button data-action="chat-reply" data-message="I need help tracking my order.">Track my order</button></div><form class="chat-compose" data-form="site-chat"><input class="chat-input" name="message" placeholder="Type your message…" autocomplete="off" ${state.chatSending ? 'disabled' : ''}><button class="btn btn-primary chat-send" type="submit" ${state.chatSending ? 'disabled' : ''}>${state.chatSending ? 'Sending…' : 'Send'}</button></form></div></div>` : ''}`;
}

function quoteCardMarkup(quote) {
  const spec = [quote.customer_wheel_specs?.diameter && `${quote.customer_wheel_specs.diameter} × ${quote.customer_wheel_specs.width || '—'}`, quote.customer_wheel_specs?.pcd, quote.customer_wheel_specs?.center_bore && `CB ${quote.customer_wheel_specs.center_bore}`, quote.customer_wheel_specs?.offset && `ET ${quote.customer_wheel_specs.offset}`].filter(Boolean).join(' · ');
  const paid = quote.payment_status === 'paid';
  return `<div class="chat-quote-card"><div class="chat-quote-head"><span>CIRUI QUOTATION</span><strong>${paid ? 'Paid' : 'Ready to review'}</strong></div><div class="chat-quote-product">${quote.product_image ? `<img src="${esc(quote.product_image)}" alt="${esc(quote.product_name || 'CIRUI product')}">` : ''}<div><strong>${esc(quote.product_name || 'CIRUI custom quote')}</strong><small>${esc(spec || 'Custom fitment specification')}</small></div></div><div class="chat-quote-grid"><span>Product × Qty<strong>${money(quote.unit_price)} × ${quote.quantity || 1}</strong></span><span>Shipping<strong>${money(quote.shipping_fee || 0)}</strong></span><span>Production<strong>${quote.production_time_days ? `${quote.production_time_days} days` : 'To confirm'}</strong></span><span>Transit estimate<strong>${quote.shipping_estimate_days ? `${quote.shipping_estimate_days} days` : 'To confirm'}</strong></span></div><div class="chat-quote-total"><span>Total</span><strong>${money(quote.total)}</strong></div>${quote.logistics_method ? `<p class="chat-quote-note">${esc(quote.logistics_method)}</p>` : ''}${quote.note ? `<p class="chat-quote-note">${esc(quote.note)}</p>` : ''}${paid ? '<div class="chat-quote-paid">Payment received — CIRUI will continue with production and shipping.</div>' : quote.payment_ready && quote.checkout_token ? `<button class="btn btn-primary chat-quote-pay" data-action="pay-quote" data-quote-id="${esc(quote.id)}" data-payment-token="${esc(quote.checkout_token)}">Pay with PayPal ↗</button>` : '<div class="chat-quote-pending">Payment setup is being prepared. Please message us for assistance.</div>'}</div>`;
}

async function submitWebsiteChat(message) {
  const text = String(message || '').trim();
  if (!text || state.chatSending) return;
  state.chatSending = true;
  state.chatMessages = [...state.chatMessages, { role: 'customer', text }];
  render();
  try {
    const response = await fetch('/api/fbox-content/chat', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversation_id: state.chatSessionId,
        message: text,
        locale: state.locale,
        vehicle: currentVehicleLabel(),
        vehicle_selection: state.vehicle || {},
        official_wheel_specs: currentOfficialWheelSpecs(),
        product_id: state.route.name === 'product' ? state.route.id : '',
        product_name: state.route.name === 'product' ? product(state.route.id).name : '',
        product_category: state.route.name === 'product' ? product(state.route.id).category : '',
        product_finish: state.route.name === 'product' ? product(state.route.id).finish : '',
        product_image: state.route.name === 'product' ? new URL(assetUrl(product(state.route.id).image), location.href).href : '',
        product_display_price: state.route.name === 'product' ? product(state.route.id).price : 0
      })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || 'Message could not be sent.');
    state.chatSessionId = payload.data?.id || state.chatSessionId;
    if (state.chatSessionId) localStorage.setItem('fbox-chat-session', state.chatSessionId);
    state.chatMessages = payload.data?.messages || state.chatMessages;
  } catch (error) {
    state.chatMessages = state.chatMessages.slice(0, -1);
    setToast(error?.message || '客服消息发送失败，请稍后再试。');
  } finally {
    state.chatSending = false;
    render();
  }
}
async function loadWebsiteChat() {
  if (!state.chatSessionId) return;
  try {
    const response = await fetch(`/api/fbox-content/chat/${encodeURIComponent(state.chatSessionId)}`, { headers: { Accept: 'application/json' } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) return;
    state.chatMessages = payload.data?.messages || state.chatMessages;
    render();
  } catch { /* Chat remains usable when the customer is offline. */ }
}
async function payQuote(quoteId, paymentToken) {
  try {
    const response = await fetch(`/api/fbox-content/quotes/${encodeURIComponent(quoteId)}/paypal`, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ payment_token: paymentToken }) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || 'PayPal checkout could not be started.');
    if (!payload.data?.approval_url) throw new Error('PayPal did not return an approval link.');
    window.location.href = payload.data.approval_url;
  } catch (error) { setToast(error?.message || 'PayPal checkout could not be started.'); }
}
async function captureReturnedPayPalPayment() {
  const query = new URLSearchParams(location.search);
  const quoteId = query.get('paypal_quote');
  const paymentToken = query.get('paypal_token');
  const orderId = query.get('token');
  if (!quoteId || !paymentToken || !orderId) return;
  try {
    const response = await fetch('/api/fbox-content/paypal/capture', { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ quote_id: quoteId, payment_token: paymentToken, order_id: orderId }) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || 'PayPal payment confirmation failed.');
    if (payload.data?.inquiry?.messages) state.chatMessages = payload.data.inquiry.messages;
    setToast(payload.data?.status === 'paid' ? 'PayPal payment received. CIRUI will continue your order.' : 'PayPal payment is still processing.');
  } catch (error) { setToast(error?.message || 'PayPal payment confirmation failed.'); }
  history.replaceState({}, document.title, `${location.pathname}${location.hash || '#home'}`);
}
function legacyFooter() {
  const whatsapp = generalWhatsAppContext();
  return `<footer class="footer cerui-footer"><div class="container"><div class="footer-top"><div class="cerui-footer-brand"><a class="brand" href="#home"><img src="${assetUrl('cerui/cerui-logo-black-v1.webp')}" alt="CIRUI Forged 策锐锻造"><span><strong>CIRUI FORGED</strong><small>${uiLabel('策锐官网 · OFFICIAL GLOBAL SITE')}</small></span></a><p class="footer-slogan">${uiLabel('Factory-direct custom forged wheels built around the exact vehicle, fitment and finish.')}</p><div class="company-meta"><strong>${company.legalName}</strong><a href="tel:${company.tel}">${company.phone}</a><a href="${esc(whatsappHref(whatsapp.message))}" data-action="whatsapp" target="_blank" rel="noopener">WhatsApp · ${company.whatsapp}</a></div></div><div class="footer-grid"><div class="footer-col"><h3>${uiLabel('Forged wheels')}</h3><a href="#home#vehicles">${uiLabel('Shop by vehicle')}</a><a href="#store" data-category-link="Wheels">${uiLabel('All wheel directions')}</a><a href="/fitment-lab" data-app-path>${uiLabel('Custom fitment')}</a><a href="#home#engineering">${uiLabel('Engineering')}</a></div><div class="footer-col"><h3>${uiLabel('Tools')}</h3><a href="/fitment-lab" data-app-path>${uiLabel('Fitment Lab')}</a><a href="#product/cerui-bmw-forged-fitment">${uiLabel('Vehicle photo preview')}</a><a href="#blog">${uiLabel('Fitment journal')}</a><a href="#home#resources">${uiLabel('Customer feedback')}</a></div><div class="footer-col"><h3>${uiLabel('Factory + delivery')}</h3><a href="#about">${uiLabel('About CIRUI')}</a><a href="#about">${uiLabel('Manufacturing')}</a><a href="#about">${uiLabel('DDP delivery')}</a><a href="tel:${company.tel}">${uiLabel('Contact')} · ${company.phone}</a></div><div class="footer-col"><h3>${uiLabel('Orders + partners')}</h3><a href="#home" data-action="orders">${uiLabel('Track order')}</a><a href="#account">${uiLabel('My account')}</a><a href="#about">${uiLabel('Wholesale program')}</a><a href="${esc(whatsappHref(whatsapp.message))}" data-action="whatsapp" target="_blank" rel="noopener">${uiLabel('WhatsApp fitment help')}</a></div></div></div><div class="cerui-footer-disclaimer">${uiLabel('Vehicle manufacturer names are used only to identify compatibility. CIRUI Forged is not affiliated with or endorsed by those vehicle manufacturers.')}</div><div class="footer-bottom"><span>© 2026 ${company.legalName} · CIRUI Forged / 策锐官网</span><span>${uiLabel('Terms · Privacy · CCPA')}</span></div></div></footer>`;
}

function footer() {
  return `<footer class="footer cerui-footer cn-footer"><div class="container"><div class="footer-top"><div class="cerui-footer-brand"><a class="brand" href="#home"><img src="${assetUrl('cerui/cerui-logo-black-v1.webp')}" alt="策锐锻造 CIRUI Forged"><span><strong>策锐锻造</strong><small>CIRUI FORGED · 中国官网</small></span></a><p class="footer-slogan">围绕真实车型、姿态与制动空间，提供锻造轮毂设计、参数适配、效果生成、生产与交付。</p><div class="company-meta"><strong>杭州策锐贸易有限公司</strong><a href="tel:${company.tel}">${company.phone}</a></div></div><div class="footer-grid"><div class="footer-col"><h3>轮毂定制</h3><a href="#wheels">轮毂系列</a><a href="/fitment-lab" data-app-path>按款式选购</a><a href="/fitment-lab" data-app-path>按车型选购</a></div><div class="footer-col"><h3>适配工具</h3><a href="/fitment-lab" data-app-path>轮毂参数计算</a><a href="/fitment-lab" data-app-path>车辆照片效果生成</a><a href="/fitment-lab" data-app-path>制动空间校验</a></div><div class="footer-col"><h3>品牌与制造</h3><a href="#manufacture">制造实力</a><a href="#network">全国网络</a><a href="#videos">视频专区</a><a href="#about">品牌历程</a></div><div class="footer-col"><h3>业务咨询</h3><a href="tel:${company.tel}">适配咨询 · ${company.phone}</a><a href="/fitment-lab" data-app-path>提交定制需求</a></div></div></div><div class="cerui-footer-disclaimer">车型与汽车品牌名称仅用于识别兼容性，策锐锻造与相关汽车制造商不存在品牌隶属或背书关系。地图及企业信息依据用户提供的策锐企业资料整理。</div><div class="footer-bottom"><span>© 2026 杭州策锐贸易有限公司 · CIRUI Forged</span><span>中国品牌官网 · <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">浙ICP备2026075816号-1</a></span></div></div></footer>`;
}

function localizedDynamicChineseText(value = '') {
  if (!['zh-CN', 'zh-TW'].includes(state.locale)) return '';
  const traditional = state.locale === 'zh-TW';
  let match = String(value).match(/^(.+?) set of four · was (.+?) each$/);
  if (match) return traditional ? `四件套 ${match[1]} · 原價每件 ${match[2]}` : `四件套 ${match[1]} · 原价每件 ${match[2]}`;
  match = String(value).match(/^(.+?) set of four · build pricing available$/);
  if (match) return traditional ? `四件套 ${match[1]} · 可詢價訂製` : `四件套 ${match[1]} · 可询价定制`;
  match = String(value).match(/^Pay over time with CIRUI financing\. Starting at (.+?)\/month with approved credit\.$/);
  if (match) return traditional ? `支援 CIRUI 分期付款。信用審核通過後，每月 ${match[1]} 起。` : `支持 CIRUI 分期付款。信用审核通过后，每月 ${match[1]} 起。`;
  match = String(value).match(/^(\d+(?:\.\d+)?) lb$/i);
  if (match) return `${match[1]} 磅`;
  match = String(value).match(/^(\d+) results$/);
  if (match) return `${match[1]} ${traditional ? '個結果' : '个结果'}`;
  match = String(value).match(/^(\d+) ratings$/);
  if (match) return `${match[1]} ${traditional ? '條評分' : '条评分'}`;
  match = String(value).match(/^(\d+) reviews? for this product$/);
  if (match) return traditional ? `這款商品有 ${match[1]} 條評價` : `这款商品有 ${match[1]} 条评价`;
  return '';
}

function applyTranslations() {
  document.documentElement.lang = state.locale;
  document.documentElement.dir = state.locale === 'ar' ? 'rtl' : 'ltr';
  const dictionary = localeDictionaries[state.locale];
  if (!dictionary) return;
  const root = document.querySelector('#app');
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const raw = node.nodeValue;
    const key = raw.trim();
    const translated = dictionary[key] || localizedDynamicChineseText(key);
    if (!key || !translated) return;
    const leading = raw.match(/^\s*/)?.[0] || '';
    const trailing = raw.match(/\s*$/)?.[0] || '';
    node.nodeValue = `${leading}${translated}${trailing}`;
  });
  root.querySelectorAll('[placeholder]').forEach(element => {
    const translated = dictionary[element.getAttribute('placeholder')];
    if (translated) element.setAttribute('placeholder', translated);
  });
  root.querySelectorAll('[aria-label]').forEach(element => {
    const translated = dictionary[element.getAttribute('aria-label')];
    if (translated) element.setAttribute('aria-label', translated);
  });
}

const TRANSLATION_CACHE_KEY = 'fbox-translation-cache-v2';
let translationCache = {};
try {
  translationCache = JSON.parse(localStorage.getItem(TRANSLATION_CACHE_KEY) || '{}') || {};
} catch {
  localStorage.removeItem(TRANSLATION_CACHE_KEY);
}
let translationRun = 0;
const translationProtectedClasses = ['brand', 'brand-mark', 'company-meta', 'product-brand', 'fitment-selects', 'locale-select', 'cart-count', 'stars', 'part-number'];
function isProtectedTranslationNode(node, root) {
  let element = node.parentElement;
  while (element && element !== root) {
    if (['SCRIPT', 'STYLE', 'OPTION', 'SELECT', 'TEXTAREA'].includes(element.tagName)) return true;
    if (translationProtectedClasses.some(className => element.classList.contains(className))) return true;
    element = element.parentElement;
  }
  return false;
}
function translationLocale(code) { return code === 'pt-BR' ? 'pt' : code; }
function preserveTextWhitespace(source, translated) {
  const leading = source.match(/^\s*/)?.[0] || '';
  const trailing = source.match(/\s*$/)?.[0] || '';
  return `${leading}${translated.trim()}${trailing}`;
}
function collectTranslationTargets(root) {
  const targets = [];
  // Visible document text comes first so the heading and primary actions are
  // translated before long form controls and their option lists.
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const source = node.nodeValue || '';
    const key = source.trim();
    if (!key || key.length < 2 || /^[-+·•\d\s$€£¥%/.,:;!?]+$/.test(key) || /[\u0400-\u04FF\u0600-\u06FF\u3040-\u30FF\u3400-\u9FFF\uAC00-\uD7AF]/.test(key) || isProtectedTranslationNode(node, root)) continue;
    targets.push({ node, source, key, kind: 'text' });
  }
  root.querySelectorAll('select:not(.locale-select) option').forEach(option => {
    const node = option.firstChild;
    const source = node?.nodeValue || '';
    const key = source.trim();
    if (!node || !key || key.length < 2 || /[\u0400-\u04FF\u0600-\u06FF\u3040-\u30FF\u3400-\u9FFF\uAC00-\uD7AF]/.test(key)) return;
    targets.push({ node, source, key, kind: 'text' });
  });
  root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(element => {
    if (translationProtectedClasses.some(className => element.classList.contains(className))) return;
    ['placeholder', 'aria-label', 'title'].forEach(attribute => {
      const key = element.getAttribute(attribute);
      if (!key || key.length < 2 || /[\u0400-\u04FF\u0600-\u06FF\u3040-\u30FF\u3400-\u9FFF\uAC00-\uD7AF]/.test(key)) return;
      targets.push({ element, source: key, key, kind: 'attribute', attribute });
    });
  });
  return targets;
}
async function translatePhrases(sources, locale, signal) {
  const response = await fetch('/api/fbox-content/translate', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ locale, texts: sources }),
    signal
  });
  if (!response.ok) throw new Error(`Translation request failed: ${response.status}`);
  const payload = await response.json();
  const translations = Array.isArray(payload?.data?.translations) ? payload.data.translations : [];
  return sources.map((source, index) => translations[index] || source);
}
async function translatePageFull() {
  const run = ++translationRun;
  if (state.locale === 'en') return;
  const root = document.querySelector('#app');
  if (!root) return;
  const controller = new AbortController();
  const dictionary = localeDictionaries[state.locale] || {};
  // Reviewed dictionary entries are applied synchronously after this function
  // starts. Only send genuinely missing English copy to the fallback service;
  // otherwise Latin-language labels would be translated a second time.
  const targets = collectTranslationTargets(root).filter(target => !dictionary[target.key]);
  const targetsByKey = new Map();
  targets.forEach(target => {
    if (!targetsByKey.has(target.key)) targetsByKey.set(target.key, []);
    targetsByKey.get(target.key).push(target);
  });
  const pendingKeys = new Set();
  const pending = targets.filter(target => {
    const cacheKey = `${state.locale}::${target.key}`;
    if (translationCache[cacheKey] || pendingKeys.has(target.key)) return false;
    pendingKeys.add(target.key);
    return true;
  });
  const apply = (target, translated) => {
    if (target.kind === 'text' && target.node.isConnected) target.node.nodeValue = preserveTextWhitespace(target.source, translated);
    if (target.kind === 'attribute' && target.element.isConnected) target.element.setAttribute(target.attribute, translated);
  };
  const cached = targets.filter(target => translationCache[`${state.locale}::${target.key}`]);
  cached.forEach(target => apply(target, translationCache[`${state.locale}::${target.key}`]));
  const batches = [];
  for (let index = 0; index < pending.length; index += 10) batches.push(pending.slice(index, index + 10));
  let batchIndex = 0;
  const translateWorker = async () => {
    while (batchIndex < batches.length) {
      if (run !== translationRun) { controller.abort(); return; }
      const batch = batches[batchIndex++];
      try {
        const translations = await translatePhrases(batch.map(target => target.key), state.locale, controller.signal);
        if (run !== translationRun) return;
        batch.forEach((target, translationIndex) => {
          const translated = translations[translationIndex];
          // The backend returns the source when both providers fail. Leave it
          // uncached so a later render can retry instead of persisting English.
          if (!translated || translated === target.key) return;
          translationCache[`${state.locale}::${target.key}`] = translated;
          (targetsByKey.get(target.key) || []).forEach(candidate => apply(candidate, translated));
        });
        localStorage.setItem(TRANSLATION_CACHE_KEY, JSON.stringify(translationCache));
      } catch {
        // Keep reviewed local labels visible and allow other batches to finish.
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(2, batches.length) }, () => translateWorker()));
}

async function detectLocaleByIp() {
  if (state.localeMode === 'manual') return;
  // A supported browser language is a stronger signal than the server-side IP
  // guess. This keeps a Chinese browser in Chinese even when the visitor is
  // travelling or using a network that geolocates elsewhere.
  const preferredBrowserLocale = browserLocale();
  if (preferredBrowserLocale !== 'en') {
    if (state.locale !== preferredBrowserLocale) {
      state.locale = preferredBrowserLocale;
      render();
    }
    return;
  }
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 2600);
  try {
    const response = await fetch('https://ipapi.co/json/', { signal: controller.signal, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`IP locale request failed: ${response.status}`);
    const data = await response.json();
    const detected = countryLocale(data.country_code);
    state.localeCountry = data.country_code || '';
    if (state.localeMode === 'auto' && detected !== state.locale) {
      state.locale = detected;
      render();
    }
  } catch {
    // Privacy extensions, offline previews and rate limits fall back to navigator.language or English.
  } finally {
    window.clearTimeout(timeout);
  }
}

function productFromCard(card) {
  const name = card.querySelector('.product-title')?.textContent?.trim() || '';
  return products.find(item => item.name === name);
}
function quoteActionButton(label, className, productId, action = 'customize') {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.dataset.action = action;
  button.dataset.id = productId;
  button.textContent = label;
  return button;
}
function wireProductGallery() {
  if (state.route.name !== 'product') return;
  const item = product(state.route.id);
  const images = productGallery(item);
  if (!item || !images.length) return;
  const active = images.includes(state.productImage[item.id]) ? state.productImage[item.id] : images[0];
  state.productImage[item.id] = active;
  const thumbs = document.querySelector('.gallery .thumbs');
  if (thumbs) {
    thumbs.replaceChildren();
    images.forEach((image, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'thumb' + (image === active ? ' is-active' : '');
      button.dataset.action = 'product-image';
      button.dataset.id = item.id;
      button.dataset.image = image;
      button.setAttribute('aria-label', item.name + ' image ' + (index + 1));
      const preview = document.createElement('img');
      preview.src = assetUrl(image);
      preview.alt = item.name + ' view ' + (index + 1);
      button.append(preview);
      thumbs.append(button);
    });
  }
  const mainImage = document.querySelector('.gallery .main-image img');
  if (mainImage) {
    mainImage.src = assetUrl(active);
    mainImage.alt = item.name + ' ' + (item.finish || '');
  }
}
function wireStartingPrices() {
  if (document.body.classList.contains('fbox-global-premium')) return;
  document.querySelectorAll('.product-card').forEach(card => {
    const item = productFromCard(card);
    if (!item || !hasStartingPrice(item)) return;
    const price = card.querySelector('.price');
    if (price) price.textContent = productPriceText(item);
    const add = card.querySelector('[data-action="add"]');
    if (add) {
      const link = document.createElement('a');
      link.className = add.className;
      link.href = '#product/' + item.id;
      link.textContent = 'Customize & quote';
      add.replaceWith(link);
    }
  });
  if (state.route.name === 'product') {
    const item = product(state.route.id);
    if (!item || !hasStartingPrice(item)) return;
    const price = document.querySelector('.detail-price');
    if (price) {
      const note = document.createElement('small');
      note.textContent = 'starting price / wheel';
      price.replaceChildren(document.createTextNode(productPriceText(item) + ' '), note);
    }
    const set = document.querySelector('.detail-set');
    if (set) {
      const minimumNote = [uiLabel('The starting price is per wheel.', 'The starting price is per wheel.'), productMinimumOrderText(item), productMinimumOrderSummary(item)].filter(Boolean).join(' ');
      set.replaceChildren(document.createTextNode('Final price is quoted after fitment, finish, PCD, CB and ET are confirmed.'));
      if (minimumNote) {
        set.append(document.createElement('br'));
        const strong = document.createElement('strong');
        strong.className = 'minimum-order-note';
        strong.textContent = minimumNote;
        set.append(strong);
      }
    }
    const financing = document.querySelector('.financing-note');
    if (financing) financing.textContent = 'Made to order. Start the visual fitment preview or send an inquiry to receive your exact USD quote.';
    const actions = document.querySelector('.detail-actions');
    if (actions) {
      actions.replaceChildren(
        quoteActionButton('Upload car photo', 'btn btn-primary', item.id),
        quoteActionButton('Ask CIRUI', 'btn btn-dark', item.id, 'chat'),
        quoteActionButton('WhatsApp quote', 'btn btn-outline', item.id, 'whatsapp-product')
      );
    }
  }
  if (state.modal?.type === 'quick') {
    const item = product(state.modal.id);
    if (!item || !hasStartingPrice(item)) return;
    const quick = document.querySelector('.quick-product');
    const quickImage = quick?.querySelector('img');
    if (quickImage) quickImage.src = assetUrl(productGallery(item)[0] || item.image);
    const quickPrice = quick?.querySelector('strong');
    if (quickPrice) quickPrice.textContent = productPriceText(item);
    const add = quick?.querySelector('[data-action="add"]');
    if (add) {
      const link = document.createElement('a');
      link.className = add.className;
      link.href = '#product/' + item.id;
      link.textContent = 'Customize & quote';
      add.replaceWith(link);
    }
  }
}
function syncRouteDocumentTitle() {
  if (state.route.name === 'home') {
    document.title = '策锐锻造中国官网｜定制轮毂参数计算与效果生成';
    return;
  }
  if (state.route.name === 'about') {
    document.title = uiLabel('About CIRUI Forged | Source Custom Wheel Factory');
    return;
  }
  if (state.route.name === 'fitment' || state.route.name === 'fitment-result') {
    document.title = `${uiLabel('CIRUI Wheel Fitment Lab for Tuning Shops')} | CIRUI Forged`;
    return;
  }
  if (state.route.name === 'account') {
    document.title = `${uiLabel('My CIRUI Workshop Account')} | CIRUI`;
    return;
  }
  if (state.route.name === 'fitment-share') {
    const project = state.workshop.shareProject;
    const title = project?.title || uiLabel('Shared Wheel Build');
    const shop = project?.shop?.shop_name || 'CIRUI';
    document.title = `${title} | ${shop}`;
    return;
  }
  if (state.route.name === 'ai-wheel-design') {
    document.title = `${uiLabel('AI Wheel Design Studio')} | CIRUI Forged`;
    return;
  }
  if (state.route.name === 'store') { document.title = uiLabel('CIRUI Performance Parts'); return; }
  if (state.route.name === 'cart') { document.title = uiLabel('CIRUI Request for Quotation'); return; }
  if (state.route.name === 'custom') { document.title = uiLabel('CIRUI Wheel Customization | Finishes, Caps and Hardware'); return; }
  if (state.route.name === 'trade') { document.title = uiLabel('CIRUI Trade & DDP | Europe and North America'); return; }
  if (state.route.name === 'blog') { document.title = uiLabel('CIRUI Journal | Fitment and Wheel Engineering'); return; }
  if (state.route.name === 'blog-post') {
    const post = state.blogPosts.find(item => item.slug === state.route.slug);
    document.title = `${uiLabel(post?.title || 'Journal')} | CIRUI`;
    return;
  }
  if (state.route.name === 'product') document.title = `${uiLabel(product(state.route.id).name)} | CIRUI`;
}

function render() {
  state.route = getRoute();
  if (location.pathname !== '/' && location.hash && ['fitment', 'fitment-result', 'fitment-share', 'ai-wheel-design', 'account'].includes(state.route.name)) {
    history.replaceState({}, '', `${location.pathname}${location.search}`);
  }
  syncRouteDocumentTitle();
  const fitmentModuleActive = ['fitment', 'fitment-result', 'fitment-share'].includes(state.route.name)
    || String(state.modal?.type || '').startsWith('fitment-');
  const premiumSurfaceActive = fitmentModuleActive || ['store', 'product', 'ai-wheel-design'].includes(state.route.name);
  document.body.classList.toggle('fbox-global-premium', premiumSurfaceActive);
  const fitmentModuleStyles = document.querySelector('#fitment-module-styles');
  if (fitmentModuleStyles) fitmentModuleStyles.media = premiumSurfaceActive ? 'all' : 'not all';
  document.body.classList.toggle('domestic-home-active', state.route.name === 'home');
  document.body.classList.toggle('wf-public-page', state.route.name !== 'home');
  document.body.dataset.publicRoute = state.route.name;
  const page = state.route.name === 'home' ? domesticHomePage(icons) : state.route.name === 'about' ? ceruiAboutPage() : state.route.name === 'ai-wheel-design' ? aiWheelDesignPage() : state.route.name === 'fitment' ? fitmentPage() : state.route.name === 'fitment-result' ? fitmentResultPage() : state.route.name === 'fitment-share' ? fitmentSharePage() : state.route.name === 'account' ? accountPage() : state.route.name === 'store' ? storePage() : state.route.name === 'cart' ? cartPage() : state.route.name === 'blog' ? blogPage() : state.route.name === 'blog-post' ? blogArticlePage(state.blogPosts.find(post => post.slug === state.route.slug)) : productPage(product(state.route.id));
  const pageWithJournal = page;
  const appRoot = document.querySelector('#app');
  const existingHostedContainer = appRoot.querySelector('[data-paypal-hosted-container]');
  const existingHeroVideo = appRoot.querySelector('.premium-hero-video');
  const nextRoot = document.createElement('div');
  nextRoot.innerHTML = `${header()}${pageWithJournal}${footer()}${chat()}${whatsappFab()}${state.cookie ? `<div class="cookie-banner"><span>${uiLabel('By using CIRUI, you agree to our cookie policy and fitment analytics.')}</span><button data-action="dismiss-cookie">${uiLabel('Dismiss')}</button></div>` : ''}${modal()}${wheelVisualizerModal()}${wheelVisualizerImageViewer()}${state.toast ? `<div class="toast">${esc(state.toast)}</div>` : ''}`;
  const nextHostedContainer = nextRoot.querySelector('[data-paypal-hosted-container]');
  if (existingHostedContainer && nextHostedContainer) nextHostedContainer.replaceWith(existingHostedContainer);
  const nextHeroVideo = nextRoot.querySelector('.premium-hero-video');
  const preservedHeroVideo = Boolean(existingHeroVideo && nextHeroVideo);
  if (preservedHeroVideo) nextHeroVideo.replaceWith(existingHeroVideo);
  appRoot.replaceChildren(...nextRoot.childNodes);
  if (preservedHeroVideo && existingHeroVideo.paused) void existingHeroVideo.play().catch(() => {});
  syncFitmentEntryStatus();
  wireProductGallery();
  wireStartingPrices();
  wireProductReviews();
  wireReviewForm();
  wireWheelVisualizerEntry();
  wireWheelInquiryDetails();
  wireHomeVisualizerBanner();
  wirePayPalHostedButton();
  wirePayPalCartButton();
  wireHomeWheelCarousel();
  wireDomesticHome();
  applyTranslations();
  wireSpotlights();
  animateIn();
}

function wireSpotlights() {
  document.querySelectorAll('.spotlight-card').forEach(card => card.addEventListener('pointermove', event => { const rect = card.getBoundingClientRect(); card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`); card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`); }));
}
async function animateIn() {
  try {
    const mod = await import('https://cdn.jsdelivr.net/npm/animejs@4.0.2/+esm');
    const animate = mod.animate;
    const targets = document.querySelectorAll('.reveal:not(.premium-hero-copy)');
    if (typeof animate === 'function' && targets.length) animate(targets, { opacity: [0, 1], translateY: [14, 0], duration: 560, delay: mod.stagger ? mod.stagger(45) : 0, ease: 'outCubic' });
  } catch { /* CSS reveal is the offline fallback. */ }
}

function updateVehicle(field, value) {
  const v = { ...(state.vehicle || {}) };
  if (field === 'year') { state.vehicle = value ? { year: value } : null; }
  else { v[field] = value; if (field === 'make') { delete v.model; delete v.trim; delete v.drive; } if (field === 'model') { delete v.trim; delete v.drive; } if (field === 'trim') delete v.drive; state.vehicle = v; }
  persist(); render();
  if (state.vehicle?.trim) void loadSelectedVehicleRecord(state.vehicle);
  if (state.vehicle?.trim) window.setTimeout(() => document.querySelector('.fitment-preview')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
}
function updateFitmentVehicle(field, value) {
  captureFitmentDraft();
  const v = { ...(state.fitment.vehicle || {}) };
  const normalizedValue = String(value || '').trim();
  const previousValue = String(v[field] || '').trim();
  const changed = normalizedValue !== previousValue;
  if (field === 'year') state.fitment.vehicle = normalizedValue ? (changed ? { year: normalizedValue } : v) : null;
  else {
    if (normalizedValue) v[field] = normalizedValue;
    else delete v[field];
    if (changed && field === 'make') { delete v.model; delete v.trim; delete v.chassis; delete v.body_style; delete v.drive; }
    if (changed && field === 'model') { delete v.trim; delete v.chassis; delete v.body_style; delete v.drive; }
    if (changed && field === 'trim') delete v.drive;
    state.fitment.vehicle = v;
  }
  state.vehicle = state.fitment.vehicle;
  state.fitment.resultStale = Boolean(state.fitment.result);
  const flow = fitmentFlowState();
  if (flow.step === 2 && flow.error && fitmentVehicleIsComplete(state.fitment.vehicle)) state.fitment.flow = { ...flow, error: '' };
  persist();
  render();
  if (state.fitment.vehicle?.year && state.fitment.vehicle?.make && state.fitment.vehicle?.model) void loadFitmentVehicleReference(state.fitment.vehicle);
  if (state.fitment.vehicle?.trim) void loadSelectedVehicleRecord(state.fitment.vehicle);
}
function clearFilters() { state.search = ''; state.filters = { category: 'Wheels', collection: 'all', application: 'all', saleOnly: false, finish: 'All', diameter: 'All', minPrice: '', maxPrice: '', minRating: '0' }; state.sort = 'latest'; render(); }

function workshopDraftFromProject(project = {}) {
  const request = project.request || {};
  const front = request.wheels?.front || {};
  const rear = request.wheels?.rear || {};
  const currentFront = request.current_setup?.wheels?.front || {};
  const currentRear = request.current_setup?.wheels?.rear || {};
  const currentFrontTire = request.current_setup?.tires?.front || {};
  const currentRearTire = request.current_setup?.tires?.rear || {};
  const frontTire = request.tires?.front || {};
  const rearTire = request.tires?.rear || {};
  const installation = request.calibration?.installation || {};
  const tireValue = (source, key = 'size') => typeof source === 'string' ? (key === 'size' ? source : '') : source?.[key] ?? '';
  return {
    project_title: project.title || '',
    customer_reference: project.customer_reference || '',
    sales_mode: project.channel?.sales_mode || 'dealer_managed',
    price_visibility: project.channel?.price_visibility || 'quote_only',
    publish_case: project.seo_status === 'pending' || project.seo_status === 'approved' ? 'on' : '',
    usage: request.usage || 'street',
    fitment_goal: request.fitment_goal || 'oem_safe',
    calibration_basis: request.calibration?.basis || 'current_vehicle_measured',
    calibration_reference: request.calibration?.reference || '',
    installation_outcome: installation.outcome || 'candidate',
    installation_date: installation.installed_at || '',
    installation_reference: installation.reference || '',
    installation_note: installation.note || '',
    ...Object.fromEntries(workshopInstallationCheckKeys.map(key => [`installation_check_${key}`, installation.checks?.[key] === true ? 'on' : ''])),
    stance_profile: request.stance_profile || 'oem',
    ride_height_drop_mm: request.suspension?.ride_height_drop_mm || '',
    front_brake_id: request.front_brake_id || '',
    rear_brake_id: request.rear_brake_id || '',
    front_rotor_id: request.front_rotor_id || '',
    rear_rotor_id: request.rear_rotor_id || '',
    front_pad_id: request.front_pad_id || '',
    rear_pad_id: request.rear_pad_id || '',
    suspension_id: request.suspension_id || '',
    ...Object.fromEntries(['diameter', 'width', 'offset', 'pcd', 'center_bore', 'spacer_mm', 'inner_clearance_mm', 'spoke_clearance_mm', 'camber_deg', 'toe_deg', 'fender_clearance_mm', 'compression_clearance_mm', 'tire_fitment_style'].flatMap(key => [[`front_${key}`, front[key] ?? ''], [`rear_${key}`, rear[key] ?? '']])),
    ...Object.fromEntries(['diameter', 'width', 'offset', 'spacer_mm'].flatMap(key => [[`current_front_${key}`, currentFront[key] ?? ''], [`current_rear_${key}`, currentRear[key] ?? '']])),
    current_front_tire: tireValue(currentFrontTire),
    current_rear_tire: tireValue(currentRearTire),
    front_tire: tireValue(frontTire),
    rear_tire: tireValue(rearTire),
    front_tire_maker: tireValue(frontTire, 'manufacturer'),
    rear_tire_maker: tireValue(rearTire, 'manufacturer'),
    front_tire_model: tireValue(frontTire, 'model'),
    rear_tire_model: tireValue(rearTire, 'model'),
    front_tire_load_index: tireValue(frontTire, 'load_index'),
    rear_tire_load_index: tireValue(rearTire, 'load_index'),
    front_tire_speed_rating: tireValue(frontTire, 'speed_rating'),
    rear_tire_speed_rating: tireValue(rearTire, 'speed_rating'),
    front_tire_rim_min: tireValue(frontTire, 'approved_rim_min_in'),
    rear_tire_rim_min: tireValue(rearTire, 'approved_rim_min_in'),
    front_tire_rim_max: tireValue(frontTire, 'approved_rim_max_in'),
    rear_tire_rim_max: tireValue(rearTire, 'approved_rim_max_in')
  };
}

function upsertLocalWorkshopProject(project, editToken = '') {
  const stored = { ...project, edit_token: editToken || state.workshop.currentProject?.edit_token || project.edit_token || '' };
  const index = state.workshop.projects.findIndex(item => item.share_token === stored.share_token);
  if (index >= 0) state.workshop.projects[index] = stored;
  else state.workshop.projects.unshift(stored);
  state.workshop.projects.sort((a, b) => String(b.updated_at || '').localeCompare(String(a.updated_at || '')));
  state.workshop.currentProject = stored;
  persistWorkshopProjects();
  return stored;
}

function workshopProjectPayload(status = '') {
  const form = document.querySelector('[data-form="fitment-wizard"], [data-form="fitment-check"]');
  const draft = captureFitmentDraft(form);
  const current = state.workshop.currentProject || {};
  const request = Object.keys(draft || {}).length ? fitmentPayloadFromValues(draft) : (current.request || {});
  return {
    title: draft.project_title || current.title || uiLabel('New customer build'),
    customer_reference: draft.customer_reference || current.customer_reference || '',
    shop: state.workshop.profile,
    vehicle: state.fitment.vehicle || current.vehicle || {},
    request,
    result: state.fitment.result || current.result || {},
    selected_product_id: state.workshop.selectedProductId || current.selected_product_id || '',
    design: current.design || {},
    channel: {
      sales_mode: draft.sales_mode || current.channel?.sales_mode || 'dealer_managed',
      price_visibility: draft.price_visibility || current.channel?.price_visibility || 'quote_only',
      attribution_days: current.channel?.attribution_days || 90
    },
    publish_case: draft.publish_case === 'on',
    platform_quote: current.platform_quote || {},
    dealer_quote: current.dealer_quote || {},
    preview_images: current.preview_images || [],
    status: status || current.status || (state.fitment.result ? 'checked' : 'draft')
  };
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const input = document.createElement('textarea');
    input.value = value;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand('copy');
    input.remove();
    return copied;
  }
}

async function workshopSaveProject({ share = false } = {}) {
  if (state.workshop.saving) return null;
  captureFitmentDraft();
  if (!state.mallToken || !state.account) {
    state.modal = { type: 'account', mode: 'login', afterLogin: share ? 'workshop-share' : 'workshop-save' };
    render();
    return null;
  }
  const profile = resolvedWorkshopProfile();
  if (share && (!profile.shop_name || !profile.email)) {
    state.workshop.error = '';
    state.modal = { type: 'workshop-profile', afterSave: 'workshop-share' };
    render();
    window.setTimeout(() => document.querySelector(`[data-form="workshop-profile-quick"] [name="${profile.shop_name ? 'email' : 'shop_name'}"]`)?.focus(), 40);
    return null;
  }
  state.workshop.profile = profile;
  const current = state.workshop.currentProject;
  state.workshop.saving = true;
  state.workshop.error = '';
  render();
  try {
    const status = share ? 'shared' : state.fitment.result ? 'checked' : 'draft';
    const body = workshopProjectPayload(status);
    const editing = Boolean(current?.share_token);
    if (editing && current.edit_token) body.edit_token = current.edit_token;
    const response = await fetch(editing ? `/api/fbox-content/workshop/projects/${encodeURIComponent(current.share_token)}` : '/api/fbox-content/workshop/projects', {
      method: editing ? 'PUT' : 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: state.mallToken },
      body: JSON.stringify(body)
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || uiLabel('The project could not be saved.'));
    const saved = upsertLocalWorkshopProject(payload.data, current?.edit_token || '');
    state.fitment.result = saved.result && Object.keys(saved.result).length ? saved.result : state.fitment.result;
    state.workshop.saving = false;
    render();
    if (share) {
      const link = workshopProjectLink(saved.share_token);
      await copyText(link);
      setToast(uiLabel('Customer share link copied.'));
    } else setToast(uiLabel('Workshop project saved.'));
    return saved;
  } catch (error) {
    state.workshop.saving = false;
    state.workshop.error = error?.message || uiLabel('The project could not be saved.');
    render();
    return null;
  }
}

function workshopResumeProject(shareToken) {
  const project = state.workshop.projects.find(item => item.share_token === shareToken);
  if (!project) return;
  state.workshop.currentProject = project;
  state.workshop.selectedProductId = project.selected_product_id || '';
  state.fitment.vehicle = project.vehicle || null;
  state.vehicle = state.fitment.vehicle;
  state.fitment.draft = workshopDraftFromProject(project);
  state.fitment.result = project.result && Object.keys(project.result).length ? project.result : null;
  state.workshop.error = '';
  localStorage.setItem('fbox-fitment-draft', JSON.stringify(state.fitment.draft));
  persist();
  persistWorkshopProjects();
  if (state.route.name === 'account') goPath('/fitment-lab');
  else render();
  setToast(uiLabel('Customer project opened.'));
}

function workshopNewProject() {
  state.workshop.currentProject = null;
  state.workshop.selectedProductId = '';
  state.workshop.mode = 'ready';
  state.workshop.error = '';
  state.workshop.quote = { status: 'idle', error: '', id: '' };
  state.fitment.vehicle = null;
  state.vehicle = null;
  state.fitment.draft = {};
  state.fitment.result = null;
  state.fitment.resultStale = false;
  state.fitment.selectedPackageId = '';
  state.fitment.styleReference = null;
  state.fitment.styleCatalog = { filter: 'all', expanded: false, query: '' };
  state.fitment.error = '';
  state.fitment.submitting = false;
  state.fitment.flow = { mode: '', step: 1, axle: 'front', panel: '', error: '' };
  state.fitment.ai = { loading: false, error: '', result: null, applied: false, missingFields: [] };
  state.fitment.reference = { key: '', loading: false, error: '', data: null };
  state.fitment.vinLookup = { loading: false, error: '', data: null, queriedVin: '' };
  state.modal = null;
  localStorage.removeItem('fbox-fitment-draft');
  localStorage.removeItem('fbox-fitment-result');
  localStorage.removeItem('fbox-fitment-package');
  localStorage.removeItem('fbox-vehicle');
  persistWorkshopProjects();
  if (state.route.name === 'fitment-result') goPath('/fitment-lab');
  else render();
  setToast(uiLabel('Current build cleared.'));
}

function clearPartnerReferral() {
  state.workshop.referral = null;
  state.modal = null;
  localStorage.removeItem('fbox-workshop-referral');
  render();
  setToast(uiLabel('Partner attribution cleared.'));
}

async function loadWorkshopShare(shareToken = state.route.token, { force = false } = {}) {
  if (!shareToken || state.workshop.shareLoading || (!force && state.workshop.shareProject?.share_token === shareToken)) return;
  state.workshop.shareLoading = true;
  state.workshop.shareError = '';
  state.workshop.shareProject = null;
  render();
  try {
    const response = await fetch(`/api/fbox-content/workshop/projects/${encodeURIComponent(shareToken)}`, { headers: { Accept: 'application/json' } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || uiLabel('This shared project could not be opened.'));
    const project = payload.data;
    if (project?.request && Object.keys(project.request).length) {
      try {
        const checkResponse = await fetch('/api/fbox-content/fitment/check', { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ ...project.request, locale: state.locale }) });
        const checkPayload = await checkResponse.json().catch(() => ({}));
        if (checkResponse.ok && checkPayload.data) project.result = checkPayload.data;
      } catch { /* The saved result remains the offline-safe shared fallback. */ }
    }
    state.workshop.shareProject = project;
    const attributionDays = Math.max(30, Number(project.channel?.attribution_days || 90));
    state.workshop.referral = {
      share_token: project.share_token,
      referral_code: project.referral_code || '',
      shop_name: project.shop?.shop_name || '',
      sales_mode: project.channel?.sales_mode || 'dealer_managed',
      price_visibility: project.channel?.price_visibility || 'quote_only',
      expires_at: Date.now() + attributionDays * 24 * 60 * 60 * 1000
    };
    localStorage.setItem('fbox-workshop-referral', JSON.stringify(state.workshop.referral));
    state.workshop.selectedProductId = project.selected_product_id || '';
    state.workshop.quote = { status: 'idle', error: '', id: '' };
    state.vehicle = project.vehicle || null;
  } catch (error) {
    state.workshop.shareError = error?.message || uiLabel('This shared project could not be opened.');
  } finally {
    state.workshop.shareLoading = false;
    render();
  }
}

function workshopStartConcept(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  const referenceFile = form.querySelector('[name="reference_image"]')?.files?.[0];
  if (!referenceFile) throw new Error(uiLabel('Upload a wheel reference image first.'));
  if (!/^image\/(?:jpeg|png|webp)$/i.test(referenceFile.type) || referenceFile.size > 14 * 1024 * 1024) throw new Error(uiLabel('Use a JPG, PNG or WebP image smaller than 14 MB.'));
  const project = state.route.name === 'fitment-share' ? state.workshop.shareProject : workshopCurrentProjectView();
  const referenceObjectUrl = URL.createObjectURL(referenceFile);
  const designParts = [values.design_prompt, `Construction: ${values.construction || 'custom forged'}`, `Finish: ${values.finish || 'custom finish'}`, values.diameter ? `Diameter: ${values.diameter} in` : '', values.front_spec ? `Front: ${values.front_spec}` : '', values.rear_spec ? `Rear: ${values.rear_spec}` : '', `Vehicle: ${workshopVehicleLabel(project)}`].filter(Boolean);
  const customProduct = {
    id: `workshop-concept-${project?.share_token || Date.now().toString(36)}`,
    category: 'Wheels',
    brand: 'CIRUI',
    name: uiLabel('CIRUI custom wheel concept'),
    finish: values.finish || uiLabel('Custom finish'),
    meta: [values.construction, values.diameter ? `${values.diameter} in` : '', values.front_spec ? `front ${values.front_spec}` : '', values.rear_spec ? `rear ${values.rear_spec}` : '', 'final engineering review required'].filter(Boolean).join(' · '),
    image: referenceObjectUrl,
    images: [referenceObjectUrl],
    price: 0,
    price_mode: 'from',
    minimum_quantity: 4,
    visualizer_enabled: true,
    dynamic_wheel_effect: true
  };
  const design = { prompt: values.design_prompt || '', reference_name: referenceFile.name, finish: values.finish || '', construction: values.construction || '', diameter: values.diameter || '', front_width: String(values.front_spec || '').split('/')[0]?.trim() || '', front_offset: String(values.front_spec || '').split('/')[1]?.trim() || '', rear_width: String(values.rear_spec || '').split('/')[0]?.trim() || '', rear_offset: String(values.rear_spec || '').split('/')[1]?.trim() || '' };
  if (state.workshop.currentProject && state.route.name !== 'fitment-share') state.workshop.currentProject.design = design;
  state.wheelVisualizer = {
    ...wheelVisualizerDefaults(),
    open: true,
    productId: customProduct.id,
    referenceImage: referenceObjectUrl,
    referenceObjectUrl,
    customProduct,
    designPrompt: designParts.join('\n'),
    workshopProjectToken: project?.share_token || '',
    workshopProjectTitle: project?.title || '',
    workshopShopName: project?.shop?.shop_name || '',
    phase: 'upload'
  };
  render();
}

async function workshopSubmitQuote(values) {
  if (state.workshop.quote.status === 'submitting') return;
  const project = state.route.name === 'fitment-share' ? state.workshop.shareProject : workshopCurrentProjectView();
  const selectedId = state.workshop.selectedProductId || project.selected_product_id || '';
  const selected = selectedId ? product(selectedId) : null;
  const result = project.result || state.fitment.result || {};
  const selectedParts = Array.isArray(result.selected_parts) ? result.selected_parts.map(part => `${part.brand} ${part.model}`).slice(0, 12).join(', ') : '';
  const message = [`Workshop project: ${project.title}.`, `Shop: ${project.shop?.shop_name || 'not supplied'}.`, `Vehicle: ${workshopVehicleLabel(project)}.`, `Fitment status: ${result.status_label || result.status || 'pending'}.`, selectedParts ? `Recorded parts: ${selectedParts}.` : '', selected ? `Selected wheel direction: ${selected.name}.` : 'Selected wheel direction: custom / pending.', project.design?.prompt ? `Design brief: ${project.design.prompt}.` : '', `Customer note: ${values.customer_note || 'None'}`].filter(Boolean).join(' ');
  state.workshop.quote = { status: 'submitting', error: '', id: '' };
  render();
  try {
    const response = await fetch('/api/fbox-content/inquiries', { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({
      topic: 'workshop-project-quote',
      channel: 'workshop-share',
      locale: state.locale,
      message,
      customer_name: values.customer_name,
      customer_email: values.customer_email,
      customer_phone: values.customer_phone,
      vehicle: workshopVehicleLabel(project),
      vehicle_selection: project.vehicle || {},
      product_id: selected?.id || '',
      product_name: selected?.name || uiLabel('Custom wheel concept'),
      product_category: 'Wheels',
      product_finish: selected?.finish || project.design?.finish || '',
      product_image: selected?.image ? assetUrl(selected.image) : '',
      product_display_price: selected?.price || 0,
      wheel_specs: { diameter: project.design?.diameter || result.axles?.front?.recommendation?.diameter_min_in || '', width: project.design?.front_width || result.axles?.front?.recommendation?.width_baseline_in || '', pcd: result.axles?.front?.recommendation?.pcd || '', offset: project.design?.front_offset || result.axles?.front?.recommendation?.et_baseline || '', center_bore: result.axles?.front?.recommendation?.center_bore_min_mm || '', quantity: '4' },
      workshop_project_token: project.share_token || '',
      workshop_project_title: project.title || '',
      workshop_shop_name: project.shop?.shop_name || '',
      workshop_referral_code: project.referral_code || '',
      workshop_sales_mode: project.channel?.sales_mode || 'dealer_managed',
      design_prompt: project.design?.prompt || '',
      customer_note: values.customer_note || ''
    }) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || uiLabel('The quote request could not be sent.'));
    state.workshop.quote = { status: 'success', error: '', id: payload.data?.id || 'submitted' };
    if (state.workshop.currentProject?.share_token === project.share_token) {
      state.workshop.currentProject.status = 'quote_requested';
      upsertLocalWorkshopProject(state.workshop.currentProject, state.workshop.currentProject.edit_token);
    }
    render();
  } catch (error) {
    state.workshop.quote = { status: 'error', error: error?.message || uiLabel('The quote request could not be sent.'), id: '' };
    render();
  }
}

async function workshopSaveDealerQuote(form) {
  const project = state.workshop.currentProject;
  if (!project?.share_token) return workshopSaveProject();
  const values = Object.fromEntries(new FormData(form).entries());
  const services = [
    ['design', 'Design service', values.service_design],
    ['fitment', 'Measurement + fitment', values.service_fitment],
    ['installation', 'Installation labor', values.service_installation],
    ['tires', 'Tires / mounting', values.service_tires],
    ['other', 'Other service', values.service_other]
  ].filter(([, , amount]) => Number(amount || 0) > 0).map(([id, label, amount]) => ({ id, label, amount: Number(amount) }));
  project.dealer_quote = {
    ...project.dealer_quote,
    status: values.publish_quote === 'on' ? 'published' : 'draft',
    wheel_unit_price: Number(values.wheel_unit_price || 0),
    quantity: Number(values.quantity || 4),
    service_items: services,
    shipping: Number(values.shipping || 0),
    tax: Number(values.tax || 0),
    discount: Number(values.discount || 0),
    deposit_percent: Number(values.deposit_percent ?? 50),
    valid_until: values.valid_until || '',
    note: values.note || ''
  };
  upsertLocalWorkshopProject(project, project.edit_token);
  const saved = await workshopSaveProject();
  if (saved) setToast(values.publish_quote === 'on' ? uiLabel('Customer quote published.') : uiLabel('Customer quote saved as a private draft.'));
}

async function wheelVisualizerSubmitInquiry(values) {
  const current = state.wheelVisualizer;
  if (!current?.open || current.phase !== 'inquiry' || current.inquiry?.status === 'submitting') return;
  const item = wheelVisualizerItem();
  const resultImages = current.results.map(result => result.imageUrl || result.image_url || result.url || '').filter(Boolean).slice(0, 3);
  const vehicleLabel = state.vehicle ? currentVehicleLabel() : current.vehicleName || 'Uploaded vehicle photo';
  const wheelSpecs = { diameter: values.diameter, width: values.width, pcd: values.pcd, offset: values.offset, center_bore: values.center_bore, quantity: values.quantity, oem_diameter: values.oem_diameter, oem_width: values.oem_width, oem_pcd: values.oem_pcd, oem_center_bore: values.oem_center_bore, oem_offset: values.oem_offset };
  const fitmentText = Object.entries(wheelSpecs).map(([key, value]) => `${key}: ${value}`).join(', ');
  const message = [`Visual fitment inquiry for ${item.name}.`, `Wheel data — ${fitmentText}.`, `Vehicle reference: ${vehicleLabel}.`, current.designPrompt ? `Custom design brief: ${current.designPrompt}` : '', current.workshopProjectToken ? `Workshop project: ${current.workshopProjectTitle || current.workshopProjectToken} · shop: ${current.workshopShopName || 'not supplied'}.` : '', `Generated preview images attached: ${resultImages.length}.`, `Customer note: ${values.customer_note || 'None'}`].filter(Boolean).join(' ');
  current.inquiry = { status: 'submitting', draft: values, error: '' };
  render();
  try {
    const response = await fetch('/api/fbox-content/inquiries', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: 'visualizer-wheel-inquiry',
        message,
        customer_name: values.customer_name,
        customer_email: values.customer_email,
        customer_phone: values.customer_phone,
        vehicle: vehicleLabel,
        vehicle_selection: state.vehicle || {},
        official_wheel_specs: currentOfficialWheelSpecs(),
        vehicle_file_name: current.vehicleName,
        product_id: item.id,
        product_name: item.name,
        product_category: item.category,
        product_finish: item.finish,
        product_image: visualizerReferenceAsset(item, current),
        product_display_price: item.price,
        preview_images: resultImages,
        wheel_specs: wheelSpecs,
        workshop_project_token: current.workshopProjectToken,
        workshop_project_title: current.workshopProjectTitle,
        workshop_shop_name: current.workshopShopName,
        design_prompt: current.designPrompt,
        customer_note: values.customer_note
      })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || 'The inquiry could not be submitted.');
    current.inquiry = { status: 'success', id: payload.data?.id || 'submitted', draft: values, error: '' };
    render();
  } catch (error) {
    current.inquiry = { status: 'error', draft: values, error: error?.message || 'The inquiry could not be submitted. Please try again.' };
    render();
  }
}
async function submitRfq(values) {
  if (state.rfq.status === 'submitting' || !cartCount()) return;
  const entries = state.cart.map(row => ({ row, item: product(row.id) })).filter(entry => entry.item?.category === 'Wheels' && entry.item.public_scope !== false);
  if (!entries.length) {
    state.rfq.error = uiLabel('Add at least one forged wheel direction before sending the RFQ.');
    render();
    return;
  }
  const draft = { ...values, ddp_requested: values.ddp_requested === 'on' };
  state.rfq = { ...state.rfq, status: 'submitting', error: '', draft };
  localStorage.setItem('cirui-rfq-draft', JSON.stringify(draft));
  render();
  const productsPayload = entries.map(({ row, item }) => ({
    id: item.id,
    name: productNameText(item),
    part: item.part || '',
    image: assetUrl(item.image),
    construction: item.construction || 'unknown',
    design_family: item.design_family || 'custom',
    finish: values.finish || item.finish || 'Custom finish',
    quantity: row.qty
  }));
  const productSummary = productsPayload.map(item => `${item.part || item.id} ${item.name} (${item.construction}) × ${item.quantity}`).join('; ');
  const message = [
    `Multi-product forged wheel RFQ: ${productSummary}.`,
    `Vehicle: ${values.vehicle}.`,
    `Preferred finish: ${values.finish || 'to confirm'}.`,
    `Destination: ${values.country}, ${values.postcode}.`,
    `DDP requested: ${values.ddp_requested === 'on' ? 'yes' : 'no'}.`,
    `Buyer type: ${values.buyer_type || 'retail'}.`,
    values.company ? `Company: ${values.company}.` : '',
    values.quantity_note ? `Quantity note: ${values.quantity_note}.` : '',
    `Customer note: ${values.customer_note || 'None'}`
  ].filter(Boolean).join(' ');
  try {
    const response = await fetch('/api/fbox-content/inquiries', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: 'multi-product-forged-wheel-rfq',
        channel: 'website-rfq-list',
        locale: state.locale,
        message,
        customer_name: values.customer_name,
        customer_email: values.customer_email,
        customer_phone: values.customer_phone,
        company: values.company,
        buyer_type: values.buyer_type,
        country: values.country,
        postcode: values.postcode,
        ddp_requested: values.ddp_requested === 'on',
        vehicle: values.vehicle,
        vehicle_selection: state.vehicle || {},
        product_id: productsPayload[0]?.id || '',
        product_name: productsPayload[0]?.name || '',
        product_category: 'Wheels',
        product_finish: values.finish || 'Custom finish',
        product_image: productsPayload[0]?.image || '',
        product_display_price: entries[0]?.item?.price || 0,
        products: productsPayload,
        wheel_specs: { quantity: String(productsPayload.reduce((sum, item) => sum + item.quantity, 0)), source: 'RFQ list' },
        customer_note: values.customer_note || ''
      })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || uiLabel('The RFQ could not be submitted.'));
    state.rfq = { status: 'success', id: payload.data?.id || 'submitted', error: '', draft };
    state.cart = [];
    persist();
    render();
  } catch (error) {
    state.rfq = { ...state.rfq, status: 'error', error: error?.message || uiLabel('The RFQ could not be submitted. Please try again.'), draft };
    render();
  }
}

async function addToCart(id, options = {}) {
  const item = product(id);
  if (!item || item.category !== 'Wheels' || item.public_scope === false || item.vehicle_label) return;
  const minimum = productMinimumQuantity(item);
  const existing = state.cart.find(row => row.id === id);
  if (existing) existing.qty = Math.max(minimum, existing.qty);
  else state.cart.push({ id, qty: minimum });
  persist();
  if (options.openRfq) {
    state.rfq = { ...state.rfq, status: 'idle', error: '', id: '' };
    state.modal = { type: 'rfq' };
    render();
    return;
  }
  setToast(`${productNameText(item)} ${uiLabel('added to your RFQ list.')}`);
}

function openFitmentWizard(mode = 'fitment-first', step = 1) {
  const nextMode = ['style-first', 'fitment-first'].includes(mode) ? mode : 'fitment-first';
  state.fitment.flow = { mode: nextMode, step: Math.min(5, Math.max(1, Number(step || 1))), axle: state.fitment.flow?.axle === 'rear' ? 'rear' : 'front', panel: '', error: '' };
  state.fitment.draft = { ...(state.fitment.draft || {}), workflow_mode: nextMode };
  localStorage.setItem('fbox-fitment-draft', JSON.stringify(state.fitment.draft));
  state.modal = { type: 'fitment-wizard' };
  void loadFitmentPartsContent();
  void loadFitmentVehicleReference(state.fitment.vehicle);
  render();
}

async function interpretFitmentNotes() {
  const form = document.querySelector('[data-form="fitment-wizard"]');
  const draft = captureFitmentDraft(form);
  const notes = String(draft?.modification_notes || '').trim();
  state.fitment.ai = { ...(state.fitment.ai || {}), loading: false, error: '', result: state.fitment.ai?.result || null, applied: false, missingFields: [] };
  if (notes.length < 8) {
    state.fitment.ai.error = uiLabel('Please enter a description first.');
    render();
    return;
  }
  state.fitment.ai = { loading: true, error: '', result: state.fitment.ai?.result || null, applied: false, missingFields: [] };
  render();
  try {
    const response = await fetch('/api/fbox-content/fitment/interpret', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes, locale: state.locale, vehicle: state.fitment.vehicle || {}, draft })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || uiLabel('AI parameter lookup is temporarily unavailable. You can continue by entering the known data manually.'));
    state.fitment.ai = { loading: false, error: '', result: payload.data || payload, applied: false, missingFields: [] };
  } catch (error) {
    state.fitment.ai = { loading: false, error: error?.message || uiLabel('AI parameter lookup is temporarily unavailable. You can continue by entering the known data manually.'), result: state.fitment.ai?.result || null, applied: false, missingFields: [] };
  }
  render();
}

function applyFitmentAiResult() {
  const result = state.fitment.ai?.result;
  if (!result) return;
  captureFitmentDraft(document.querySelector('[data-form="fitment-wizard"]'));
  const nextDraft = { ...(state.fitment.draft || {}) };
  Object.entries(result.form_patch || {}).forEach(([name, value]) => {
    if ((nextDraft[name] === undefined || nextDraft[name] === null || String(nextDraft[name]).trim() === '') && value !== null && value !== undefined && String(value).trim() !== '') nextDraft[name] = value;
  });
  const missingFields = (Array.isArray(result.missing_fields) ? result.missing_fields : []).filter(item => {
    const value = nextDraft[item.name];
    return value === undefined || value === null || String(value).trim() === '';
  });
  const blockingFields = missingFields.filter(item => item.blocking !== false);
  state.fitment.draft = nextDraft;
  state.fitment.ai = { ...state.fitment.ai, applied: true, missingFields };
  state.fitment.resultStale = Boolean(state.fitment.result);
  localStorage.setItem('fbox-fitment-draft', JSON.stringify(nextDraft));
  const earliestStep = Math.min(...blockingFields.map(item => Number(item.step) || 5), 5);
  state.fitment.flow = { ...fitmentFlowState(), step: Number.isFinite(earliestStep) ? earliestStep : 4, axle: blockingFields.some(item => item.name.includes('rear')) && !blockingFields.some(item => item.name.includes('front')) ? 'rear' : 'front', error: '' };
  render();
  requestAnimationFrame(() => (document.querySelector('.fitment-required-missing') || document.querySelector('.fitment-flow-section'))?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

function filterFitmentPartPicker(input) {
  const picker = input?.closest('[data-fitment-part-picker]');
  if (!picker) return;
  const query = String(input.value || '').trim().toLowerCase();
  const hasSelection = picker.dataset.selected === 'true';
  let visible = 0;
  picker.querySelectorAll('.fitment-part-option').forEach(option => {
    const recommended = option.dataset.recommended === 'true';
    const matches = query.length >= 2 ? String(option.dataset.partSearchText || '').includes(query) : recommended && !hasSelection;
    option.hidden = !matches || visible >= 8;
    if (matches && visible < 8) visible += 1;
  });
  const empty = picker.querySelector('.fitment-part-empty');
  if (empty) {
    empty.hidden = visible > 0;
    empty.textContent = query.length < 2
      ? uiLabel(hasSelection ? 'Selected. Search only if this component needs to be changed.' : 'Enter at least two characters to search the component catalog.')
      : uiLabel('No matching component. Keep the workshop note and add the exact code later.');
  }
}

function setFitmentPartSelection(field = '', id = '') {
  const form = document.querySelector('[data-form="fitment-wizard"]');
  const scrollTop = form?.querySelector('.fitment-flow-scroll')?.scrollTop || 0;
  captureFitmentDraft(form);
  const draft = { ...(state.fitment.draft || {}), [field]: id };
  const part = fitmentPartRecord(id);
  const base = field.replace(/_id$/, '');
  if (part) {
    draft[`${base}_detail`] = [part.brand, part.model].filter(Boolean).join(' ');
    const familyOnly = /alias|umbrella|family reference/i.test(String(part.model || '')) || ['GT6', 'F40'].includes(String(part.part_number || '').toUpperCase());
    if (part.part_number && !familyOnly) draft[`${base}_part_number`] = part.part_number;
    if (state.fitment.ai?.applied) {
      state.fitment.ai.missingFields = (state.fitment.ai.missingFields || []).filter(item => item.name !== field && (familyOnly || item.name !== `${base}_part_number`));
    }
  } else {
    delete draft[`${base}_part_number`];
  }
  state.fitment.draft = draft;
  state.fitment.resultStale = Boolean(state.fitment.result);
  localStorage.setItem('fbox-fitment-draft', JSON.stringify(draft));
  render();
  requestAnimationFrame(() => {
    const scroll = document.querySelector('[data-form="fitment-wizard"] .fitment-flow-scroll');
    if (scroll) scroll.scrollTop = scrollTop;
    document.querySelector(`[data-fitment-part-picker][data-field="${CSS.escape(field)}"] [data-fitment-part-search]`)?.focus({ preventScroll: true });
  });
}

function fitmentWizardAdvance(delta = 1) {
  const form = document.querySelector('[data-form="fitment-wizard"]');
  captureFitmentDraft(form);
  captureFitmentVehicle(form);
  const flow = fitmentFlowState();
  if (delta > 0 && flow.step === 1 && flow.mode === 'style-first' && !fitmentSelectedStyle() && !state.fitment.styleReference) {
    state.fitment.flow = { ...flow, error: uiLabel('Complete the selected wheel style or upload a reference before continuing.') };
    render();
    return;
  }
  const vehicle = state.fitment.vehicle || {};
  if (delta > 0 && flow.step === 2 && !fitmentVehicleIsComplete(vehicle)) {
    state.fitment.flow = { ...flow, error: fitmentVehicleMissingMessage(vehicle) };
    render();
    scheduleFitmentVehicleMissingFocus();
    return;
  }
  state.fitment.flow = { ...flow, step: Math.min(5, Math.max(1, flow.step + delta)), panel: '', error: '' };
  render();
}

function applyFitmentProposal(proposal = {}) {
  const draft = { ...(state.fitment.draft || {}), selected_package_id: proposal.id || '' };
  ['front', 'rear'].forEach(axle => {
    const recommendation = fitmentProposalAxle(proposal, axle).recommendation || {};
    if (recommendation.diameter_in != null) draft[`${axle}_diameter`] = recommendation.diameter_in;
    if (recommendation.width_in != null) draft[`${axle}_width`] = recommendation.width_in;
    if (recommendation.et_mm != null) {
      draft[`${axle}_offset`] = recommendation.et_mm;
      draft[`${axle}_offset_basis_width`] = recommendation.width_in ?? '';
      draft[`${axle}_offset_source`] = 'calculated_package';
    }
    if (recommendation.pcd) draft[`${axle}_pcd`] = recommendation.pcd;
    if (recommendation.center_bore_mm != null) draft[`${axle}_center_bore`] = recommendation.center_bore_mm;
    if (recommendation.tire_size) draft[`${axle}_tire`] = recommendation.tire_size;
    if (recommendation.tire_manufacturer) draft[`${axle}_tire_maker`] = recommendation.tire_manufacturer;
    if (recommendation.tire_model) draft[`${axle}_tire_model`] = recommendation.tire_model;
    if (recommendation.tire_load_index) draft[`${axle}_tire_load_index`] = recommendation.tire_load_index;
    if (recommendation.tire_speed_rating) draft[`${axle}_tire_speed_rating`] = recommendation.tire_speed_rating;
  });
  state.fitment.draft = draft;
  state.fitment.selectedPackageId = proposal.id || '';
  localStorage.setItem('fbox-fitment-draft', JSON.stringify(draft));
  localStorage.setItem('fbox-fitment-package', state.fitment.selectedPackageId);
}

document.addEventListener('click', async event => {
  const menuNavigationLink = event.target.closest('.nav-row a, .mega-menu a');
  if (menuNavigationLink) {
    state.mobileNav = false;
    state.menuOpen = false;
  }
  if (event.target.closest('.mobile-nav-shortcut')) {
    state.mobileNav = false;
    state.menuOpen = false;
  }
  const appPath = event.target.closest('a[data-app-path]');
  if (appPath) {
    event.preventDefault();
    if (state.route.name === 'account' && appPath.getAttribute('href') === '/fitment-lab') workshopNewProject();
    goPath(appPath.getAttribute('href'));
    return;
  }
  const anchor = event.target.closest('a[href^="#home#"]');
  if (anchor) {
    event.preventDefault();
    const sectionId = anchor.getAttribute('href').split('#home#')[1];
    go('#home');
    window.setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
    return;
  }
  const routeAnchor = event.target.closest('a[href^="#"]:not([data-action]):not([data-category-link])');
  if (routeAnchor) {
    const href = routeAnchor.getAttribute('href') || '';
    const isApplicationRoute = /^#(?:home|about|account|blog|cart|custom|fitment|store|trade)$/.test(href)
      || /^#(?:product|blog)\//.test(href);
    if (isApplicationRoute) {
      event.preventDefault();
      go(href);
      return;
    }
  }
  const target = event.target.closest('[data-action], [data-category-link]');
  if (!target) return;
  const action = target.dataset.action;
  if (action?.startsWith('fitment-')) {
    trackFitmentFunnel(action, {
      step: action === 'fitment-start' ? 1 : analyticsFitmentStep(),
      mode: target.dataset.mode || state.fitment?.flow?.mode || '',
      label: target.dataset.id || target.dataset.field || ''
    });
  }
  if (['add', 'buy-now', 'request-rfq', 'checkout', 'chat', 'write-review', 'customize', 'quote', 'whatsapp', 'whatsapp-fitment', 'whatsapp-product', 'whatsapp-visualizer', 'home-preview-wheel', 'home-preview-prev', 'home-preview-next'].includes(action)) {
    trackEvent('click', { path: location.pathname + location.hash, title: action, meta: { action, product_id: target.dataset.id || '' } });
  }
  if (target.dataset.categoryLink !== undefined) { setCatalogCollection('all'); state.catalogNotice = ''; state.menuOpen = false; if (state.route.name === 'store') render(); else go('#store'); return; }
  if (action === 'catalog-collection') { event.preventDefault(); setCatalogCollection(target.dataset.collection || 'all'); state.catalogNotice = ''; state.menuOpen = false; if (state.route.name === 'store') render(); else go('#store'); return; }
  if (action === 'catalog-visualizer') { event.preventDefault(); setCatalogCollection('all'); state.catalogNotice = 'visualizer'; state.menuOpen = false; if (state.route.name === 'store') render(); else go('#store'); return; }
  if (action === 'custom-section') {
    event.preventDefault();
    state.customSection = target.dataset.section || 'overview';
    state.menuOpen = false;
    if (state.route.name === 'custom') render();
    else go('#custom');
    window.setTimeout(() => document.getElementById(`custom-${state.customSection}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
    return;
  }
  if (action === 'trade-rfq') {
    event.preventDefault();
    state.rfq.draft = { ...(state.rfq.draft || {}), buyer_type: target.dataset.buyerType || 'retail', ddp_requested: true };
    if (!cartCount()) { setCatalogCollection('all'); go('#store'); window.setTimeout(() => setToast(uiLabel('Choose at least one wheel direction, then open the RFQ.')), 80); }
    else { state.rfq = { ...state.rfq, status: 'idle', id: '', error: '' }; state.modal = { type: 'rfq' }; render(); }
    return;
  }
  if (action === 'fitment-start') { openFitmentWizard(target.dataset.mode || 'fitment-first', 1); return; }
  if (action === 'fitment-edit') { state.modal = null; openFitmentWizard(state.fitment.draft?.workflow_mode || 'fitment-first', Number(target.dataset.step || 1)); return; }
  if (action === 'fitment-vin-decode') { await decodeFitmentVin(); return; }
  if (action === 'fitment-wizard-next') { fitmentWizardAdvance(1); return; }
  if (action === 'fitment-wizard-back') { fitmentWizardAdvance(-1); return; }
  if (action === 'fitment-wizard-step') {
    const flow = fitmentFlowState();
    const step = Math.min(flow.step, Math.max(1, Number(target.dataset.step || 1)));
    captureFitmentDraft(document.querySelector('[data-form="fitment-wizard"]'));
    state.fitment.flow = { ...flow, step, panel: '', error: '' };
    render();
    return;
  }
  if (action === 'fitment-wizard-axle') {
    captureFitmentDraft(document.querySelector('[data-form="fitment-wizard"]'));
    state.fitment.flow = { ...fitmentFlowState(), axle: target.dataset.axle === 'rear' ? 'rear' : 'front', error: '' };
    render();
    return;
  }
  if (action === 'fitment-part-select') {
    setFitmentPartSelection(target.dataset.field || '', target.dataset.id || '');
    return;
  }
  if (action === 'fitment-part-clear') {
    setFitmentPartSelection(target.dataset.field || '', '');
    return;
  }
  if (action === 'fitment-ai-interpret') { await interpretFitmentNotes(); return; }
  if (action === 'fitment-ai-apply') { applyFitmentAiResult(); return; }
  if (action === 'fitment-wizard-close') {
    if (event.target.closest('[data-modal-content]') && !target.closest('.icon-btn')) return;
    captureFitmentDraft(document.querySelector('[data-form="fitment-wizard"]'));
    state.modal = null;
    render();
    return;
  }
  if (action === 'fitment-measurement-help') { state.fitment.flow = { ...fitmentFlowState(), panel: 'measurements' }; render(); return; }
  if (action === 'fitment-guide-close') { state.fitment.flow = { ...fitmentFlowState(), panel: '' }; render(); return; }
  if (action === 'fitment-style-filter') {
    const filter = ['all', 'monoblock', 'two-piece'].includes(target.dataset.filter) ? target.dataset.filter : 'all';
    state.fitment.styleCatalog = { ...(state.fitment.styleCatalog || {}), filter, expanded: false };
    render();
    requestAnimationFrame(() => {
      const catalog = document.querySelector('[data-fitment-style-catalog]');
      scrollFitmentFlowTo(catalog, { block: 'nearest' });
      catalog?.querySelector(`[data-action="fitment-style-filter"][data-filter="${filter}"]`)?.focus({ preventScroll: true });
    });
    return;
  }
  if (action === 'fitment-style-toggle') {
    const current = state.fitment.styleCatalog || {};
    const filter = ['all', 'monoblock', 'two-piece'].includes(current.filter) ? current.filter : 'all';
    state.fitment.styleCatalog = { ...current, filter, expanded: !current.expanded };
    render();
    requestAnimationFrame(() => {
      const catalog = document.querySelector('[data-fitment-style-catalog]');
      const browseTarget = state.fitment.styleCatalog.expanded ? catalog?.querySelector('.fitment-style-results-head') : catalog;
      scrollFitmentFlowTo(browseTarget, { block: state.fitment.styleCatalog.expanded ? 'start' : 'nearest', padding: 10 });
      catalog?.querySelector('[data-action="fitment-style-toggle"]')?.focus({ preventScroll: true });
    });
    return;
  }
  if (action === 'fitment-style-search-clear') {
    state.fitment.styleCatalog = { ...(state.fitment.styleCatalog || {}), query: '', expanded: false };
    render();
    requestAnimationFrame(() => document.querySelector('[data-fitment-style-search]')?.focus({ preventScroll: true }));
    return;
  }
  if (action === 'fitment-select-style') {
    const item = products.find(candidate => candidate.id === target.dataset.id && candidate.category === 'Wheels');
    if (!item) return;
    const catalogGridScrollTop = target.closest('[data-fitment-style-catalog]')?.querySelector('.fitment-flow-wheel-grid')?.scrollTop || 0;
    state.workshop.selectedProductId = item.id;
    state.fitment.styleReference = null;
    state.fitment.draft = { ...(state.fitment.draft || {}), selected_product_id: item.id, style_reference_name: '' };
    state.fitment.resultStale = Boolean(state.fitment.result);
    localStorage.setItem('fbox-fitment-draft', JSON.stringify(state.fitment.draft));
    render();
    requestAnimationFrame(() => {
      const catalogGrid = document.querySelector('[data-fitment-style-catalog] .fitment-flow-wheel-grid');
      if (catalogGrid) catalogGrid.scrollTop = catalogGridScrollTop;
      scrollFitmentFlowTo(document.querySelector('[data-fitment-style-continuation]'), { block: 'end', padding: 44 });
    });
    return;
  }
  if (action === 'fitment-package-details') { state.modal = { type: 'fitment-package', packageId: target.dataset.id || '' }; render(); return; }
  if (action === 'fitment-package-select') {
    const proposal = fitmentProposalList().find(item => item.id === target.dataset.id);
    if (!proposal || proposal.selectable === false || state.fitment.resultStale) return;
    applyFitmentProposal(proposal);
    state.modal = null;
    render();
    setToast(uiLabel('Selected proposal'));
    return;
  }
  if (action === 'fitment-missing-evidence') { state.modal = { type: 'fitment-evidence' }; render(); return; }
  if (action === 'fitment-diagnostics') { state.modal = { type: 'fitment-diagnostics' }; render(); return; }
  if (action === 'fitment-browse-styles') { state.filters.category = 'Wheels'; state.search = ''; go('#store'); return; }
  if (action === 'fitment-open-concept') { state.modal = { type: 'fitment-concept' }; render(); return; }
  if (action === 'blog-filter') { state.blogCategory = target.dataset.blogCategory || 'All'; render(); return; }
  if (action === 'mega') { state.menuOpen = !state.menuOpen; render(); return; }
  if (action === 'mobile-nav') {
    state.mobileNav = !state.mobileNav;
    if (!state.mobileNav) state.menuOpen = false;
    render();
    return;
  }
  if (action === 'cart') { go('#cart'); return; }
  if (action === 'account') { if (state.mallToken && state.account) goPath('/account'); else { state.modal = { type: 'account', mode: 'login' }; render(); } return; }
  if (action === 'account-logout') { await mallLogout(); state.modal = null; if (state.route.name === 'account') goPath('/'); else render(); setToast('Signed out. Your local cart stays on this device.'); return; }
  if (action === 'account-register') { state.modal = { type: 'account', mode: 'register', afterLogin: state.modal?.afterLogin || target.dataset.afterLogin || '' }; render(); return; }
  if (action === 'account-login') { state.modal = { type: 'account', mode: 'login', afterLogin: state.modal?.afterLogin || target.dataset.afterLogin || '' }; render(); return; }
  if (action === 'orders') { if (!state.mallToken) { state.modal = { type: 'account', mode: 'login', afterLogin: 'orders' }; render(); } else { state.modal = { type: 'orders' }; loadMemberOrders(); } return; }
  if (action === 'dismiss-cookie') { state.cookie = false; localStorage.setItem('fbox-cookie', 'dismissed'); render(); return; }
  if (action === 'workshop-new' || action === 'fitment-clear-open') { state.modal = { type: 'fitment-clear-confirm' }; render(); return; }
  if (action === 'fitment-clear-confirm') { workshopNewProject(); return; }
  if (action === 'partner-referral-clear-open') { state.modal = { type: 'partner-referral-clear-confirm' }; render(); return; }
  if (action === 'partner-referral-clear-confirm') { clearPartnerReferral(); return; }
  if (action === 'workshop-resume') { workshopResumeProject(target.dataset.token); return; }
  if (action === 'workshop-history') { state.modal = { type: 'workshop-history' }; render(); return; }
  if (action === 'workshop-use-calibration') {
    const source = (state.workshop.projects || []).find(item => item.share_token === target.dataset.token);
    if (!source || !workshopQualifiedCalibrationProjects().some(item => item.share_token === source.share_token)) return;
    const draft = { ...captureFitmentDraft() };
    ['front', 'rear'].forEach(axle => {
      const recommendation = source.result?.axles?.[axle]?.recommendation || {};
      const targetWheel = source.result?.axles?.[axle]?.geometry?.target_wheel || {};
      draft[`${axle}_diameter`] = targetWheel.diameter_in ?? recommendation.diameter_in ?? '';
      draft[`${axle}_width`] = targetWheel.width_in ?? recommendation.width_in ?? '';
      draft[`${axle}_offset`] = targetWheel.et_mm ?? recommendation.et_mm ?? '';
      draft[`${axle}_pcd`] = recommendation.pcd || '';
      draft[`${axle}_center_bore`] = recommendation.center_bore_mm ?? '';
      draft[`${axle}_spacer_mm`] = targetWheel.spacer_mm ?? 0;
      draft[`${axle}_tire`] = recommendation.tire_size || targetWheel.tire_size || '';
      draft[`${axle}_tire_maker`] = recommendation.tire_manufacturer || '';
      draft[`${axle}_tire_model`] = recommendation.tire_model || '';
      draft[`${axle}_tire_load_index`] = recommendation.tire_load_index || '';
      draft[`${axle}_tire_speed_rating`] = recommendation.tire_speed_rating || '';
      if (Array.isArray(recommendation.tire_approved_rim_range_in)) {
        draft[`${axle}_tire_rim_min`] = recommendation.tire_approved_rim_range_in[0];
        draft[`${axle}_tire_rim_max`] = recommendation.tire_approved_rim_range_in[1];
      }
    });
    draft.calibration_basis = 'same_vehicle_successful_install';
    draft.calibration_reference = `${source.title || uiLabel('Successful installation record')} · ${workshopCalibrationProjectSpec(source)} · ${source.request?.calibration?.installation?.reference || `revision ${source.revision || 1}`}`;
    draft.installation_outcome = 'candidate';
    draft.installation_date = '';
    draft.installation_reference = '';
    draft.installation_note = '';
    workshopInstallationCheckKeys.forEach(key => { draft[`installation_check_${key}`] = ''; });
    state.fitment.draft = draft;
    localStorage.setItem('fbox-fitment-draft', JSON.stringify(draft));
    render();
    setToast(uiLabel('A previous successful record was loaded as a candidate. Recalculate it against this customer vehicle.'));
    document.querySelector('.fitment-calibration-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  if (action === 'workshop-restore-revision') {
    const project = state.workshop.currentProject || {};
    const revision = (project.revision_history || []).find(item => String(item.revision) === String(target.dataset.revision));
    if (!revision) return;
    const snapshot = { ...project, title: revision.title || project.title, vehicle: revision.vehicle || project.vehicle, request: revision.request || {}, result: revision.result || {} };
    state.fitment.vehicle = snapshot.vehicle || null;
    state.vehicle = state.fitment.vehicle;
    state.fitment.draft = workshopDraftFromProject(snapshot);
    state.fitment.result = snapshot.result && Object.keys(snapshot.result).length ? snapshot.result : null;
    state.modal = null;
    localStorage.setItem('fbox-fitment-draft', JSON.stringify(state.fitment.draft));
    persist();
    render();
    setToast(uiLabel('Older revision opened as a draft. Saving will create a new revision.'));
    return;
  }
  if (action === 'fitment-apply-plan') {
    const result = state.fitment.result;
    if (!result?.axles) return;
    const draft = { ...(state.fitment.draft || {}) };
    ['front', 'rear'].forEach(axle => {
      const recommendation = result.axles?.[axle]?.recommendation || {};
      draft[`${axle}_diameter`] = recommendation.diameter_in ?? '';
      draft[`${axle}_width`] = recommendation.width_in ?? '';
      draft[`${axle}_offset`] = recommendation.et_mm ?? '';
      draft[`${axle}_pcd`] = recommendation.pcd || '';
      draft[`${axle}_center_bore`] = recommendation.center_bore_mm ?? '';
      if (recommendation.tire_size) draft[`${axle}_tire`] = recommendation.tire_size;
      if (recommendation.tire_manufacturer) draft[`${axle}_tire_maker`] = recommendation.tire_manufacturer;
      if (recommendation.tire_model) draft[`${axle}_tire_model`] = recommendation.tire_model;
      if (recommendation.tire_load_index) draft[`${axle}_tire_load_index`] = recommendation.tire_load_index;
      if (recommendation.tire_speed_rating) draft[`${axle}_tire_speed_rating`] = recommendation.tire_speed_rating;
      if (Array.isArray(recommendation.tire_approved_rim_range_in)) {
        draft[`${axle}_tire_rim_min`] = recommendation.tire_approved_rim_range_in[0];
        draft[`${axle}_tire_rim_max`] = recommendation.tire_approved_rim_range_in[1];
      }
    });
    state.fitment.draft = draft;
    localStorage.setItem('fbox-fitment-draft', JSON.stringify(draft));
    render();
    setToast(uiLabel('The corrected starting plan has been applied. Recheck after adding the missing vehicle and measurement evidence.'));
    document.querySelector('[data-form="fitment-check"]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  if (action === 'workshop-save') { await workshopSaveProject(); return; }
  if (action === 'workshop-share') { await workshopSaveProject({ share: true }); return; }
  if (action === 'workshop-copy-link') {
    const token = state.workshop.currentProject?.share_token;
    if (!token) return;
    await copyText(workshopProjectLink(token));
    setToast(uiLabel('Customer share link copied.'));
    return;
  }
  if (action === 'workshop-mode') {
    state.workshop.mode = ['ready', 'custom', 'quote'].includes(target.dataset.mode) ? target.dataset.mode : 'ready';
    render();
    window.setTimeout(() => document.getElementById('workshop-next')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
    return;
  }
  if (action === 'workshop-select-product') {
    state.workshop.selectedProductId = target.dataset.id || '';
    if (state.workshop.currentProject) {
      state.workshop.currentProject.selected_product_id = state.workshop.selectedProductId;
      upsertLocalWorkshopProject(state.workshop.currentProject, state.workshop.currentProject.edit_token);
    }
    render();
    setToast(uiLabel('Wheel direction attached to this project.'));
    return;
  }
  if (action === 'workshop-contact-shop') {
    const shop = state.workshop.shareProject?.shop || {};
    const phone = String(shop.phone || '').replace(/\D/g, '');
    if (phone.length >= 8) window.open(`https://wa.me/${phone}?text=${encodeURIComponent(`Hello ${shop.shop_name || 'there'}, I would like to continue with the wheel build you shared through CIRUI.`)}`, '_blank', 'noopener');
    else if (shop.email) location.href = `mailto:${encodeURIComponent(shop.email)}?subject=${encodeURIComponent('Wheel build follow-up')}`;
    else setToast(uiLabel('Contact details are not available. Send the protected request instead.'));
    return;
  }
  if (['whatsapp', 'whatsapp-fitment', 'whatsapp-product', 'whatsapp-visualizer'].includes(action)) { event.preventDefault(); void openWhatsAppContext(whatsappContext(action, target.dataset.id)); return; }
  if (action === 'chat') { state.chatOpen = !state.chatOpen; render(); if (state.chatOpen) void loadWebsiteChat(); return; }
  if (action === 'pay-quote') { void payQuote(target.dataset.quoteId, target.dataset.paymentToken); return; }
  if (action === 'chat-reply') {
    const message = target.dataset.message || 'I need fitment help.';
    await submitWebsiteChat(message);
    return;
  }
  if (action === 'open-fitment-lab') {
    state.fitment.vehicle = state.vehicle || state.fitment.vehicle;
    const focus = target.dataset.fitmentFocus || 'vehicle';
    state.fitment.draft = { ...(state.fitment.draft || {}), entry_focus: focus, workflow_mode: 'fitment-first' };
    localStorage.setItem('fbox-fitment-draft', JSON.stringify(state.fitment.draft));
    void loadFitmentPartsContent();
    goPath('/fitment-lab');
    if (target.dataset.fitmentFocus) window.setTimeout(() => openFitmentWizard('fitment-first', 1), 50);
    return;
  }
  if (action === 'fitment-chat') {
    const result = state.fitment.result;
    if (!result) return;
    state.vehicle = state.fitment.vehicle || state.vehicle;
    persist();
    const vehicle = currentVehicleLabel();
    const summary = [`Fitment lab result: ${result.status_label || result.status}`, `Vehicle: ${vehicle}`, `Front: ${result.axles?.front?.recommendation?.pcd || 'PCD pending'} / ET ${result.axles?.front?.recommendation?.et_estimate_range?.join(' to ') || 'pending'}`, `Rear: ${result.axles?.rear?.recommendation?.pcd || 'PCD pending'} / ET ${result.axles?.rear?.recommendation?.et_estimate_range?.join(' to ') || 'pending'}`, result.next_step || 'Please confirm the final wheel drawing.'].join('\n');
    state.chatOpen = true;
    render();
    await submitWebsiteChat(summary);
    return;
  }
  if (action === 'home-preview-prev') { homeWheelNavigate(-1); return; }
  if (action === 'home-preview-next') { homeWheelNavigate(1); return; }
  if (action === 'home-preview-wheel') {
    const item = products.find(candidate => candidate.id === target.dataset.id && candidate.category === 'Wheels');
    if (!item) return;
    homeWheelPauseForInteraction();
    state.homePreviewProductId = item.id;
    const referenceImage = state.productImage[item.id] || productGallery(item)[0] || item.image;
    const stage = document.querySelector('[data-home-preview-stage]');
    const image = stage?.querySelector('[data-home-preview-image]');
    if (image) {
      image.src = assetUrl(referenceImage);
      image.alt = `${item.name} preview`;
    }
    const name = stage?.querySelector('[data-home-preview-name]');
    const finish = stage?.querySelector('[data-home-preview-finish]');
    const price = stage?.querySelector('[data-home-preview-price]');
    const open = stage?.querySelector('[data-home-preview-open]');
    if (name) name.textContent = homePreviewShortName(item);
    if (finish) finish.textContent = item.finish || item.color || 'Custom finish';
    if (price) price.textContent = productPriceText(item);
    if (open) {
      open.dataset.id = item.id;
      open.dataset.image = referenceImage;
    }
    stage?.querySelectorAll('[data-action="home-preview-wheel"]').forEach(button => {
      const active = button.dataset.id === item.id;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    return;
  }
  if (action === 'wheel-open') { state.wheelVisualizer = wheelVisualizerState(target.dataset.id, target.dataset.image); render(); return; }
  if (action === 'wheel-reference') {
    const current = state.wheelVisualizer;
    const nextImage = target.dataset.image;
    if (!current?.open || !nextImage || current.phase === 'generating' || current.referenceImage === nextImage) return;
    current.referenceImage = nextImage;
    state.productImage[current.productId] = nextImage;
    current.results = [];
    current.jobId = '';
    current.error = '';
    current.errorCode = '';
    current.mode = 'fbox-lingkeai';
    if (current.phase === 'results' || current.phase === 'error') current.phase = current.vehicleFile ? 'reference' : 'upload';
    render();
    return;
  }
  if (action === 'wheel-reference-next') { if (state.wheelVisualizer.vehicleFile) { state.wheelVisualizer.phase = 'reference'; render(); } return; }
  if (action === 'wheel-reference-back') { if (state.wheelVisualizer.vehicleFile) { state.wheelVisualizer.phase = 'crop'; render(); } return; }
  if (action === 'wheel-image-viewer') {
    const imageUrl = target.dataset.imageUrl;
    if (!state.wheelVisualizer?.open || !imageUrl) return;
    state.wheelVisualizer.resultViewer = {
      open: true,
      imageUrl,
      angleLabel: target.dataset.angle || 'Generated view',
      productName: target.dataset.product || wheelVisualizerItem().name,
      alt: `${target.dataset.product || wheelVisualizerItem().name} on your vehicle — ${target.dataset.angle || 'generated view'}`,
      downloadName: target.dataset.downloadName || 'fbox-preview.jpg'
    };
    render();
    return;
  }
  if (action === 'wheel-image-download') { void wheelVisualizerDownload(target.dataset.imageUrl, target.dataset.downloadName || 'fbox-preview.jpg'); return; }
  if (action === 'wheel-image-viewer-close') {
    if (target.classList.contains('wheel-image-viewer-overlay') && event.target !== target) return;
    if (state.wheelVisualizer?.resultViewer) { state.wheelVisualizer.resultViewer = null; render(); }
    return;
  }
  if (action === 'wheel-inquiry-open') {
    if (state.wheelVisualizer?.phase === 'results' && state.wheelVisualizer.results.length) {
      state.wheelVisualizer.phase = 'inquiry';
      state.wheelVisualizer.resultViewer = null;
      state.wheelVisualizer.inquiry = { status: 'idle', draft: wheelVisualizerInquiryDefaults(wheelVisualizerItem()), error: '' };
      render();
    }
    return;
  }
  if (action === 'wheel-inquiry-results') { if (state.wheelVisualizer?.open && state.wheelVisualizer.results.length) { state.wheelVisualizer.phase = 'results'; state.wheelVisualizer.resultViewer = null; render(); } return; }
  if (action === 'wheel-close') { if (event.target.closest('[data-wheel-modal]') && !target.classList.contains('wheel-modal-close')) return; wheelVisualizerClose(); return; }
  if (action === 'wheel-generate') { if (state.wheelVisualizer.phase === 'reference') wheelVisualizerStart(); return; }
  if (action === 'wheel-reset') { wheelVisualizerReset('upload'); return; }
  if (action === 'wheel-retry') { if (state.wheelVisualizer.vehicleFile) { if (state.wheelVisualizer.jobId && !['JOB_FAILED', 'JOB_CANCELED'].includes(state.wheelVisualizer.errorCode)) wheelVisualizerResume(); else wheelVisualizerStart(); } else wheelVisualizerReset('upload'); return; }
  if (action === 'wheel-crop-reset') { state.wheelVisualizer.crop = { zoom: 1, x: 50, y: 50 }; render(); return; }
  if (action === 'quick-view') { state.modal = { type: 'quick', id: target.dataset.id }; render(); return; }
  if (action === 'contact-inquiry') { state.modal = { type: 'contact-inquiry', id: target.dataset.id }; render(); return; }
  if (action === 'open-factory-film') {
    state.modal = { type: 'factory-film' };
    render();
    const player = document.querySelector('[data-factory-film-player]');
    void player?.play().catch(() => {});
    return;
  }
  if (action === 'ai-design-contact') {
    state.modal = { type: 'ai-design-contact' };
    render();
    return;
  }
  if (action === 'ai-design-mode') {
    captureAiWheelDraft();
    state.aiWheelDesign.draft.mode = ['text', 'reference', 'text-reference'].includes(target.dataset.mode) ? target.dataset.mode : 'text-reference';
    localStorage.setItem('cirui-ai-wheel-draft', JSON.stringify(state.aiWheelDesign.draft));
    render();
    return;
  }
  if (action === 'ai-design-remove-reference') {
    captureAiWheelDraft();
    state.aiWheelDesign.referenceData = '';
    state.aiWheelDesign.referenceName = '';
    state.aiWheelDesign.error = '';
    render();
    return;
  }
  if (action === 'ai-design-select') {
    state.aiWheelDesign.selectedIndex = Math.max(0, Math.min(state.aiWheelDesign.concepts.length - 1, Number(target.dataset.index || 0)));
    state.aiWheelDesign.views = [];
    state.aiWheelDesign.error = '';
    render();
    return;
  }
  if (action === 'ai-design-edit') {
    state.aiWheelDesign.stage = 'brief';
    state.aiWheelDesign.status = 'idle';
    state.aiWheelDesign.error = '';
    render();
    return;
  }
  if (action === 'ai-design-reset') {
    localStorage.removeItem('cirui-ai-wheel-draft');
    state.aiWheelDesign = {
      ...aiWheelDesignDefaults(),
      draft: { mode: 'text-reference', prompt: '', reference_keep: '', reference_change: '', construction: 'Forged monoblock', character: 'Performance / motorsport', spoke_count: '', finish: 'Brushed clear', diameter: '' }
    };
    render();
    return;
  }
  if (action === 'ai-design-multiview') {
    await generateAiWheelMultiview();
    return;
  }
  if (action === 'ai-design-view') {
    if (!target.dataset.imageUrl) return;
    state.modal = { type: 'ai-design-image', imageUrl: target.dataset.imageUrl, label: target.dataset.label || uiLabel('AI Original Design') };
    render();
    return;
  }
  if (action === 'close-modal') { if (event.target.closest('[data-modal-content]') && !target.classList.contains('modal-close')) return; state.modal = null; render(); return; }
  if (action === 'wishlist') {
    const id = target.dataset.id;
    const item = product(id);
    const wasSaved = state.wishlist.includes(id);
    state.wishlist = wasSaved ? state.wishlist.filter(x => x !== id) : [...state.wishlist, id];
    persist();
    if (state.mallToken && item) {
      try {
        if (wasSaved) await mallRequest(mallConfig.portalBase, `/wishlist/${encodeURIComponent(item.id)}`, { method: 'DELETE' });
        else await mallRequest(mallConfig.portalBase, '/wishlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ product_id: item.id }) });
      } catch (error) { setToast(error?.message || '收藏同步失败，已保存在当前设备。'); }
    }
    render();
    return;
  }
  if (action === 'customize') {
    const item = product(target.dataset.id);
    if (item?.category === 'Wheels') state.wheelVisualizer = wheelVisualizerState(item.id, state.productImage[item.id] || productGallery(item)[0] || item.image);
    else state.chatOpen = true;
    render();
    return;
  }
  if (action === 'add') { await addToCart(target.dataset.id); return; }
  if (action === 'buy-now') { await addToCart(target.dataset.id, { openRfq: true }); return; }
  if (action === 'request-rfq') {
    if (target.dataset.id) { await addToCart(target.dataset.id, { openRfq: true }); return; }
    if (!cartCount()) {
      setCatalogCollection('all');
      state.catalogNotice = '';
      if (state.route.name === 'store') render();
      else go('#store');
      window.setTimeout(() => setToast(uiLabel('Choose at least one wheel direction, then open the RFQ.')), 80);
      return;
    }
    state.rfq = { ...state.rfq, status: 'idle', id: '', error: '' };
    state.modal = { type: 'rfq' };
    render();
    return;
  }
  if (action === 'product-image') { state.productImage[target.dataset.id] = target.dataset.image; render(); return; }
  if (action === 'view-fitment-products') { setCatalogCollection('all'); go('#store'); return; }
  if (action === 'change-vehicle') { state.vehicle = null; localStorage.removeItem('fbox-vehicle'); go('#home'); return; }
  if (action === 'shop-vehicle') { if (!state.vehicle?.trim) { setToast('Choose Year, Make, Model and Trim first.'); return; } setToast(`Fitment saved for ${currentVehicleLabel()}.`); if (state.route.name !== 'store') go('#store'); else render(); return; }
  if (action === 'clear-filters') { clearFilters(); return; }
  if (action === 'ai-filter') { const input = document.querySelector('.ai-query input'); state.search = input?.value || ''; render(); return; }
  if (action === 'save-zip') { setToast('Delivery estimate saved for this session.'); return; }
  if (action === 'remove-cart') { state.cart = state.cart.filter(row => row.id !== target.dataset.id); persist(); render(); return; }
  if (action === 'qty') { const item = state.cart.find(x => x.id === target.dataset.id); if (item) { const productItem = product(item.id); item.qty = Math.max(productMinimumQuantity(productItem), item.qty + Number(target.dataset.delta)); } state.cart = state.cart.filter(x => x.qty > 0); persist(); render(); return; }
  if (action === 'apply-coupon') { setToast(state.mallToken ? '优惠码将在 CIRUI 结算规则中校验；当前订单按商品美元售价创建。' : '请先登录 CIRUI 账户，再选择可用优惠。'); return; }
  if (action === 'checkout') { if (!cartCount()) { setToast(uiLabel('Your RFQ list is empty.')); return; } state.rfq = { ...state.rfq, status: 'idle', id: '', error: '' }; state.modal = { type: 'rfq' }; render(); return; }
  if (action === 'toggle-customer-builds') { state.homeBuildsExpanded = !state.homeBuildsExpanded; render(); window.setTimeout(() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30); return; }
  if (action === 'load-reviews') { state.reviewLimit = reviews.length; render(); return; }
  if (action === 'write-review') { state.modal = { type: 'review', id: state.route.name === 'product' ? state.route.id : '' }; render(); return; }
});

document.addEventListener('change', event => {
  const el = event.target;
  trackFitmentFieldActivity(el);
  if (el.matches('[data-ai-design-upload]')) { void aiWheelReferenceFile(el.files?.[0]); return; }
  if (el.matches('[data-fitment-style-upload]')) {
    const file = el.files?.[0];
    if (!file || !/^image\/(?:jpeg|png|webp)$/i.test(file.type)) return;
    if (state.fitment.styleReference?.url) URL.revokeObjectURL(state.fitment.styleReference.url);
    state.fitment.styleReference = { name: file.name, url: URL.createObjectURL(file) };
    state.workshop.selectedProductId = '';
    state.fitment.draft = { ...(state.fitment.draft || {}), selected_product_id: '', style_reference_name: file.name };
    state.fitment.resultStale = Boolean(state.fitment.result);
    localStorage.setItem('fbox-fitment-draft', JSON.stringify(state.fitment.draft));
    render();
    requestAnimationFrame(() => scrollFitmentFlowTo(document.querySelector('[data-fitment-style-continuation]'), { block: 'end', padding: 44 }));
    return;
  }
  if (el.matches('[data-wheel-upload]')) { wheelVisualizerHandleFile(el.files?.[0]); return; }
  if (el.matches('[data-locale]')) {
    if (el.value === 'auto') {
      localStorage.removeItem('fbox-locale');
      localStorage.removeItem('fbox-locale-mode');
      state.localeMode = 'auto';
      state.locale = browserLocale() || 'en';
      render();
      if (state.route.name === 'fitment-share') void loadWorkshopShare(state.route.token, { force: true });
      detectLocaleByIp();
    } else {
      state.localeMode = 'manual';
      state.locale = localeOptions.some(([code]) => code === el.value) ? el.value : 'en';
      localStorage.setItem('fbox-locale', state.locale);
      localStorage.setItem('fbox-locale-mode', 'manual');
      render();
      if (state.route.name === 'fitment-share') void loadWorkshopShare(state.route.token, { force: true });
    }
    return;
  }
  if (el.matches('[data-fitment-field]')) { updateFitmentVehicle(el.dataset.fitmentField, el.value); return; }
  if (el.matches('[data-field]')) { updateVehicle(el.dataset.field, el.value); return; }
  if (el.matches('[data-filter]')) {
    const key = el.dataset.filter;
    if (key === 'ai') state.search = el.value;
    else if (key === 'sort') state.sort = el.value;
    else if (key === 'saleOnly') state.filters.saleOnly = el.checked;
    else state.filters[key] = el.value;
    render();
  }
});
let wheelCropDrag = null;
document.addEventListener('pointerdown', event => {
  const stage = event.target.closest('[data-wheel-crop-stage]');
  if (!stage || !state.wheelVisualizer?.vehicleUrl) return;
  wheelCropDrag = { stage, startX: event.clientX, startY: event.clientY, x: Number(state.wheelVisualizer.crop.x), y: Number(state.wheelVisualizer.crop.y) };
  stage.classList.add('is-dragging');
  stage.setPointerCapture?.(event.pointerId);
});
document.addEventListener('pointermove', event => {
  if (!wheelCropDrag) return;
  const rect = wheelCropDrag.stage.getBoundingClientRect();
  const nextX = wheelCropDrag.x - ((event.clientX - wheelCropDrag.startX) / rect.width) * 100;
  const nextY = wheelCropDrag.y - ((event.clientY - wheelCropDrag.startY) / rect.height) * 100;
  state.wheelVisualizer.crop.x = Math.min(100, Math.max(0, Math.round(nextX)));
  state.wheelVisualizer.crop.y = Math.min(100, Math.max(0, Math.round(nextY)));
  wheelVisualizerUpdateCropPreview();
});
function endWheelCropDrag() {
  wheelCropDrag?.stage.classList.remove('is-dragging');
  wheelCropDrag = null;
}
document.addEventListener('pointerup', endWheelCropDrag);
document.addEventListener('pointercancel', endWheelCropDrag);
let catalogSearchTimer = 0;
let fitmentStyleSearchTimer = 0;
document.addEventListener('input', event => {
  const el = event.target;
  trackFitmentFieldActivity(el);
  if (el.closest('[data-form="ai-wheel-design"]')) {
    captureAiWheelDraft(el.form);
    state.aiWheelDesign.error = '';
    return;
  }
  if (el.matches('[data-fitment-part-search]')) {
    filterFitmentPartPicker(el);
    return;
  }
  if (el.matches('[data-fitment-style-search]')) {
    const query = el.value;
    state.fitment.styleCatalog = { ...(state.fitment.styleCatalog || {}), query };
    window.clearTimeout(fitmentStyleSearchTimer);
    const caret = el.selectionStart;
    fitmentStyleSearchTimer = window.setTimeout(() => {
      if (!document.querySelector('.fitment-flow-modal')) return;
      render();
      const replacement = document.querySelector('[data-fitment-style-search]');
      replacement?.focus({ preventScroll: true });
      if (Number.isInteger(caret)) replacement?.setSelectionRange(caret, caret);
    }, 140);
    return;
  }
  if (el.matches('[data-filter="ai"]') && state.route.name === 'store') {
    state.search = el.value;
    window.clearTimeout(catalogSearchTimer);
    const caret = el.selectionStart;
    catalogSearchTimer = window.setTimeout(() => {
      if (state.route.name !== 'store') return;
      render();
      const replacement = document.querySelector('[data-filter="ai"]');
      replacement?.focus({ preventScroll: true });
      if (Number.isInteger(caret)) replacement?.setSelectionRange(caret, caret);
    }, 180);
    return;
  }
  if (el.matches('[data-fitment-vin-input]')) {
    const vin = fitmentVinValue(el.value);
    if (el.value !== vin) el.value = vin;
    state.fitment.draft = { ...(state.fitment.draft || {}), vin_reference: vin };
    localStorage.setItem('fbox-fitment-draft', JSON.stringify(state.fitment.draft));
    if (state.fitment.vinLookup?.queriedVin && state.fitment.vinLookup.queriedVin !== vin) {
      state.fitment.vinLookup = { loading: false, error: '', data: null, queriedVin: '' };
    }
    state.fitment.resultStale = Boolean(state.fitment.result);
    return;
  }
  if (el.matches('input[data-fitment-field]')) {
    const field = el.dataset.fitmentField;
    const value = String(el.value || '').trim();
    const vehicle = { ...(state.fitment.vehicle || {}) };
    const previousValue = String(vehicle[field] || '').trim();
    if (value) vehicle[field] = value;
    else delete vehicle[field];
    if (field === 'trim' && value !== previousValue) {
      delete vehicle.drive;
      const driveControl = el.closest('[data-fitment-vehicle]')?.querySelector('[data-fitment-field="drive"]');
      if (driveControl) driveControl.value = '';
    }
    state.fitment.vehicle = Object.keys(vehicle).length ? vehicle : null;
    state.vehicle = state.fitment.vehicle;
    state.fitment.resultStale = Boolean(state.fitment.result);
    const flow = fitmentFlowState();
    if (flow.step === 2 && flow.error && fitmentVehicleIsComplete(state.fitment.vehicle)) {
      state.fitment.flow = { ...flow, error: '' };
      document.querySelector('.fitment-flow-error')?.remove();
    }
    persist();
    return;
  }
  if (el.matches('[data-wheel-crop]')) {
    const key = el.dataset.wheelCrop;
    state.wheelVisualizer.crop[key] = Number(el.value);
    wheelVisualizerUpdateCropPreview();
    return;
  }
  if (el.closest('[data-form="fitment-wizard"], [data-form="fitment-check"]')) {
    captureFitmentDraft(el.form);
    if (el.name === 'modification_notes' && (state.fitment.ai?.result || state.fitment.ai?.error)) {
      state.fitment.ai = { loading: false, error: '', result: null, applied: false, missingFields: [] };
    } else if (el.name && state.fitment.ai?.applied && String(el.value ?? '').trim() !== '') {
      state.fitment.ai.missingFields = (state.fitment.ai.missingFields || []).filter(item => item.name !== el.name);
      const field = el.closest('.fitment-required-missing');
      field?.classList.remove('fitment-required-missing');
      field?.querySelector('.fitment-required-hint')?.remove();
    }
    const widthMatch = String(el.name || '').match(/^(front|rear)_width$/);
    if (widthMatch) {
      const axle = widthMatch[1];
      const basisWidth = state.fitment.draft?.[`${axle}_offset_basis_width`];
      const generated = state.fitment.draft?.[`${axle}_offset_source`] === 'calculated_package';
      if (generated && String(basisWidth) !== String(el.value)) {
        state.fitment.draft[`${axle}_offset`] = '';
        delete state.fitment.draft[`${axle}_offset_basis_width`];
        delete state.fitment.draft[`${axle}_offset_source`];
        const offsetInput = el.form?.elements?.namedItem(`${axle}_offset`);
        if (offsetInput) offsetInput.value = '';
        localStorage.setItem('fbox-fitment-draft', JSON.stringify(state.fitment.draft));
      }
    }
    state.fitment.resultStale = Boolean(state.fitment.result);
  }
});
document.addEventListener('dragover', event => {
  if (event.target.closest('[data-wheel-dropzone]')) event.preventDefault();
});
document.addEventListener('drop', event => {
  const zone = event.target.closest('[data-wheel-dropzone]');
  if (!zone) return;
  event.preventDefault();
  wheelVisualizerHandleFile(event.dataTransfer?.files?.[0]);
});
function fitmentPayloadFromValues(values = {}) {
  const selectedVehicle = state.fitment.vehicle || {};
  const allowedDrives = driveOptions(selectedVehicle.make, selectedVehicle.model);
  const vehicle = {
    ...selectedVehicle,
    vin_reference: values.vin_reference || selectedVehicle.vin_reference || '',
    drive: allowedDrives.includes(selectedVehicle.drive) ? selectedVehicle.drive : ''
  };
  const axlePayload = axle => ({
    diameter: values[`${axle}_diameter`],
    width: values[`${axle}_width`],
    offset: values[`${axle}_offset`],
    pcd: values[`${axle}_pcd`],
    center_bore: values[`${axle}_center_bore`],
    spacer_mm: values[`${axle}_spacer_mm`],
    inner_clearance_mm: values[`${axle}_inner_clearance_mm`],
    spoke_clearance_mm: values[`${axle}_spoke_clearance_mm`],
    camber_deg: values[`${axle}_camber_deg`],
    toe_deg: values[`${axle}_toe_deg`],
    fender_clearance_mm: values[`${axle}_fender_clearance_mm`],
    compression_clearance_mm: values[`${axle}_compression_clearance_mm`],
    tire_fitment_style: values[`${axle}_tire_fitment_style`]
  });
  const currentAxlePayload = axle => ({
    diameter: values[`current_${axle}_diameter`],
    width: values[`current_${axle}_width`],
    offset: values[`current_${axle}_offset`],
    spacer_mm: values[`current_${axle}_spacer_mm`]
  });
  const targetTirePayload = axle => ({
    size: values[`${axle}_tire`],
    manufacturer: values[`${axle}_tire_maker`],
    model: values[`${axle}_tire_model`],
    load_index: values[`${axle}_tire_load_index`],
    speed_rating: values[`${axle}_tire_speed_rating`],
    approved_rim_min_in: values[`${axle}_tire_rim_min`],
    approved_rim_max_in: values[`${axle}_tire_rim_max`]
  });
  return {
    vehicle,
    locale: state.locale,
    workflow_mode: values.workflow_mode || 'fitment-first',
    selected_product_id: values.selected_product_id || state.workshop.selectedProductId || '',
    selected_package_id: values.selected_package_id || state.fitment.selectedPackageId || '',
    style_reference_name: values.style_reference_name || state.fitment.styleReference?.name || '',
    modification_notes: values.modification_notes || '',
    usage: values.usage,
    fitment_goal: values.fitment_goal,
    calibration: {
      basis: values.calibration_basis,
      reference: values.calibration_reference,
      installation: {
        outcome: values.installation_outcome || 'candidate',
        installed_at: values.installation_date || '',
        reference: values.installation_reference || '',
        note: values.installation_note || '',
        checks: Object.fromEntries(workshopInstallationCheckKeys.map(key => [key, values[`installation_check_${key}`] === 'on']))
      }
    },
    front_brake_id: values.front_brake_id,
    rear_brake_id: values.rear_brake_id,
    front_rotor_id: values.front_rotor_id,
    rear_rotor_id: values.rear_rotor_id,
    front_pad_id: values.front_pad_id,
    rear_pad_id: values.rear_pad_id,
    suspension_id: values.suspension_id,
    custom_components: {
      front_brake: { description: values.front_brake_detail || '', part_number: values.front_brake_part_number || '' },
      rear_brake: { description: values.rear_brake_detail || '', part_number: values.rear_brake_part_number || '' },
      front_rotor: { description: values.front_rotor_detail || '', part_number: values.front_rotor_part_number || '' },
      rear_rotor: { description: values.rear_rotor_detail || '', part_number: values.rear_rotor_part_number || '' },
      suspension: { description: values.suspension_detail || '', part_number: values.suspension_part_number || '' }
    },
    stance_profile: values.stance_profile || (values.usage === 'show' ? 'static-low' : Number(values.ride_height_drop_mm || 0) > 0 ? 'lowered' : 'oem'),
    suspension: { ride_height_drop_mm: values.ride_height_drop_mm },
    current_setup: {
      wheels: { front: currentAxlePayload('front'), rear: currentAxlePayload('rear') },
      tires: { front: { size: values.current_front_tire }, rear: { size: values.current_rear_tire } }
    },
    wheels: { front: axlePayload('front'), rear: axlePayload('rear') },
    tires: { front: targetTirePayload('front'), rear: targetTirePayload('rear') }
  };
}
function fitmentPayloadFromForm(form) {
  return fitmentPayloadFromValues(Object.fromEntries(new FormData(form).entries()));
}
async function submitFitmentForm(form) {
  if (state.fitment.submitting) return;
  const values = Object.fromEntries(new FormData(form).entries());
  const payload = fitmentPayloadFromForm(form);
  state.fitment.draft = values;
  localStorage.setItem('fbox-fitment-draft', JSON.stringify(values));
  state.fitment.submitting = true;
  state.fitment.error = '';
  trackFitmentFunnel('fitment-submit', { step: analyticsFitmentStep() || 5 });
  render();
  try {
    const response = await fetch('/api/fbox-content/fitment/check', { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.detail || 'Fitment check failed.');
    state.fitment.result = result.data || result;
    trackFitmentFunnel('fitment-complete', { step: 6 });
  } catch (error) {
    state.fitment.error = error?.message || 'Fitment check failed. Please try again.';
    trackFitmentFunnel('fitment-error', { step: analyticsFitmentStep() || 5, error_code: 'fitment-check-failed' });
  } finally {
    state.fitment.submitting = false;
    render();
  }
}
async function submitFitmentWizard(form) {
  if (state.fitment.submitting) return;
  const values = captureFitmentDraft(form);
  const payload = fitmentPayloadFromValues(values);
  state.fitment.submitting = true;
  state.fitment.error = '';
  state.fitment.flow = { ...fitmentFlowState(), error: '' };
  trackFitmentFunnel('fitment-submit', { step: analyticsFitmentStep() || 5 });
  render();
  try {
    const response = await fetch('/api/fbox-content/fitment/check', { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.detail || 'Fitment check failed.');
    state.fitment.result = result.data || result;
    state.fitment.resultStale = false;
    const recommended = fitmentProposalList(state.fitment.result).find(item => item.recommended && item.selectable !== false) || fitmentProposalList(state.fitment.result).find(item => item.selectable !== false);
    state.fitment.selectedPackageId = recommended?.id || '';
    localStorage.setItem('fbox-fitment-result', JSON.stringify(state.fitment.result));
    if (state.fitment.selectedPackageId) localStorage.setItem('fbox-fitment-package', state.fitment.selectedPackageId);
    else localStorage.removeItem('fbox-fitment-package');
    state.modal = null;
    state.fitment.submitting = false;
    trackFitmentFunnel('fitment-complete', { step: 6 });
    goPath('/fitment-lab/result');
  } catch (error) {
    state.fitment.error = error?.message || 'Fitment check failed. Please try again.';
    state.fitment.flow = { ...fitmentFlowState(), error: state.fitment.error };
    state.fitment.submitting = false;
    trackFitmentFunnel('fitment-error', { step: analyticsFitmentStep() || 5, error_code: 'fitment-check-failed' });
    render();
  }
}
document.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.target;
  if (form.dataset.form === 'ai-wheel-design') { await submitAiWheelDesign(form); return; }
  if (form.dataset.form === 'visualizer-register') { await submitWheelVisualizerRegistration(Object.fromEntries(new FormData(form).entries())); return; }
  if (form.dataset.form === 'fitment-wizard') { await submitFitmentWizard(form); return; }
  if (form.dataset.form === 'fitment-check') { await submitFitmentForm(form); return; }
  if (form.dataset.form === 'workshop-profile' || form.dataset.form === 'workshop-profile-quick') {
    const quickProfile = form.dataset.form === 'workshop-profile-quick';
    const continueSharing = quickProfile && state.modal?.afterSave === 'workshop-share';
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    state.workshop.error = '';
    try {
      await saveWorkshopProfile(form);
      if (quickProfile) state.modal = null;
      render();
      if (continueSharing) await workshopSaveProject({ share: true });
      else setToast(uiLabel('Shop profile saved.'));
    } catch (error) {
      state.workshop.error = error?.message || uiLabel('Shop profile could not be saved.');
      render();
    }
    return;
  }
  if (form.dataset.form === 'workshop-concept') {
    try {
      workshopStartConcept(form);
    } catch (error) {
      state.workshop.error = error?.message || uiLabel('The visual concept could not be started.');
      render();
    }
    return;
  }
  if (form.dataset.form === 'workshop-quote') {
    await workshopSubmitQuote(Object.fromEntries(new FormData(form).entries()));
    return;
  }
  if (form.dataset.form === 'workshop-dealer-quote') {
    await workshopSaveDealerQuote(form);
    return;
  }
  if (form.dataset.form === 'search') { state.search = new FormData(form).get('query') || ''; go('#store'); }
  if (form.dataset.form === 'site-chat') { await submitWebsiteChat(new FormData(form).get('message')); return; }
  if (form.dataset.form === 'wheel-inquiry') { await wheelVisualizerSubmitInquiry(Object.fromEntries(new FormData(form).entries())); return; }
  if (form.dataset.form === 'rfq') { await submitRfq(Object.fromEntries(new FormData(form).entries())); return; }
  if (form.dataset.form === 'account') {
    const values = new FormData(form);
    try {
      if (form.dataset.mode === 'register') {
        const registered = await mallRegister(Object.fromEntries(values.entries()));
        const registerToken = `${registered?.tokenHead || 'Bearer '}${registered?.token || ''}`.trim();
        if (registerToken && registered?.token) {
          state.mallToken = registerToken;
          localStorage.setItem('fbox-mall-token', state.mallToken);
          state.account = registered?.data?.member || registered?.member || null;
          await syncMallWishlist();
          const next = state.modal?.afterLogin;
          state.modal = next === 'checkout' ? { type: 'checkout' } : next === 'orders' ? { type: 'orders' } : null;
          state.checkoutStep = next === 'checkout' ? 3 : state.checkoutStep;
          if (next === 'orders') await loadMemberOrders();
          await loadWorkshopProjects();
          if (next === 'workshop-save' || next === 'workshop-share') await workshopSaveProject({ share: next === 'workshop-share' });
          if (next === 'account') goPath('/account');
          setToast('Welcome to CIRUI — your account is ready.');
        } else {
          state.modal = { type: 'account', mode: 'login' };
          setToast('账户已创建，请登录 CIRUI。');
        }
        return;
      }
      const result = await mallLogin(values.get('username'), values.get('password'));
      state.mallToken = `${result?.tokenHead || 'Bearer '}${result?.token || ''}`.trim();
      if (state.mallToken) localStorage.setItem('fbox-mall-token', state.mallToken);
      state.account = result?.data?.member || result?.member || null;
      const next = state.modal?.afterLogin;
      await syncMallWishlist();
      state.modal = next === 'checkout' ? { type: 'checkout' } : next === 'orders' ? { type: 'orders' } : null;
      state.checkoutStep = next === 'checkout' ? 3 : state.checkoutStep;
      if (next === 'orders') await loadMemberOrders();
      await loadWorkshopProjects();
      if (next === 'workshop-save' || next === 'workshop-share') await workshopSaveProject({ share: next === 'workshop-share' });
      if (next === 'account') goPath('/account');
      setToast('Signed in through the CIRUI account service.');
    } catch (error) {
      setToast(error?.message || 'CIRUI account sign-in failed.');
    }
  }
  if (form.dataset.form === 'review') {
    const values = new FormData(form);
    if (!values.get('consent')) {
      setToast('Please confirm that this is your own experience before submitting.');
      return;
    }
    try {
      const reviewResponse = await fetch('/api/fbox-content/reviews', { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ product_id: state.modal?.id || '', product_name: state.modal?.id ? product(state.modal.id).name : '', customer_name: values.get('customer_name'), customer_email: values.get('customer_email'), title: values.get('title'), body: values.get('body'), vehicle: values.get('vehicle'), rating: Math.min(5, Math.max(1, Number(values.get('rating') || 5))) }) });
      const reviewPayload = await reviewResponse.json().catch(() => ({}));
      if (!reviewResponse.ok) throw new Error(reviewPayload.detail || 'Review could not be submitted.');
      state.modal = null;
      setToast('Thanks — 评价已提交，等待 CIRUI 审核后展示。');
    } catch (error) { setToast(error?.message || '评价提交失败，请稍后再试。'); }
  }
  if (form.dataset.form === 'checkout') {
    const minimumIssue = cartMinimumIssue();
    if (minimumIssue) {
      setToast(`${productMinimumOrderText(minimumIssue.item)} ${uiLabel('Please update the quantity before checkout.', 'Please update the quantity before checkout.')}`);
      return;
    }
    state.checkoutForm = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem('fbox-checkout-form', JSON.stringify(state.checkoutForm));
    try {
      state.lastOrder = await createMallOrder(state.checkoutForm);
      state.checkoutStep = 4;
      state.cart = [];
      persist();
      render();
    } catch (error) {
      setToast(error?.message || '订单创建失败，请检查登录状态、地址和库存。');
    }
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Enter' && event.target.matches?.('[data-fitment-vin-input]')) {
    event.preventDefault();
    void decodeFitmentVin();
    return;
  }
  if (event.key !== 'Escape') return;
  if (state.wheelVisualizer?.resultViewer?.open) { state.wheelVisualizer.resultViewer = null; render(); return; }
  if (String(state.modal?.type || '').startsWith('fitment-')) {
    if (state.modal.type === 'fitment-wizard') captureFitmentDraft(document.querySelector('[data-form="fitment-wizard"]'));
    state.modal = null;
    state.fitment.flow = { ...fitmentFlowState(), panel: '' };
    render();
    return;
  }
  if (state.modal) { state.modal = null; render(); return; }
  if (state.wheelVisualizer?.open) wheelVisualizerClose();
});
window.addEventListener('hashchange', () => { state.menuOpen = false; state.mobileNav = false; state.modal = null; state.reviewLimit = 3; render(); if (state.route.name === 'fitment') void loadFitmentPartsContent(); if (state.route.name === 'fitment-share') void loadWorkshopShare(state.route.token); window.scrollTo({ top: 0, behavior: 'instant' }); trackPageView(); });
window.addEventListener('popstate', () => { state.menuOpen = false; state.mobileNav = false; state.modal = null; render(); if (state.route.name === 'fitment') void loadFitmentPartsContent(); if (state.route.name === 'fitment-share') void loadWorkshopShare(state.route.token); if (state.route.name === 'account') void loadWorkshopProjects(); window.scrollTo({ top: 0, behavior: 'instant' }); trackPageView(); });
window.addEventListener('languagechange', () => {
  if (state.localeMode !== 'auto') return;
  const nextLocale = browserLocale();
  if (nextLocale !== state.locale) {
    state.locale = nextLocale;
    render();
    if (state.route.name === 'fitment-share') void loadWorkshopShare(state.route.token, { force: true });
  }
});
render();
loadVehicleDirectory();
void captureReturnedPayPalPayment();
detectLocaleByIp();
checkMallBackend();
loadMallCatalog();
loadFBoxContent();
void loadSelectedVehicleRecord(state.vehicle);
if (state.route.name === 'fitment') void loadFitmentPartsContent();
if (state.route.name === 'fitment-share') void loadWorkshopShare(state.route.token);
loadBlogContent();
loadFBoxSettings();
void loadAccountInfo();
trackPageView();
