import fs from 'node:fs/promises';
import path from 'node:path';

const configPath = process.argv[2];
if (!configPath) throw new Error('Usage: node scripts/configure-cn-runtime-contact.mjs <runtime-config.json>');

const raw = await fs.readFile(configPath, 'utf8');
const config = JSON.parse(raw);
config.storefront = {
  ...(config.storefront || {}),
  company_name: '杭州策锐贸易有限公司',
  phone: '+86 186 5819 1106',
  whatsapp_number: '8618658191106',
  default_locale: 'zh-CN'
};

const tempPath = `${configPath}.next`;
await fs.writeFile(tempPath, `${JSON.stringify(config, null, 2)}\n`, { encoding: 'utf8', mode: 0o640 });
await fs.rename(tempPath, configPath);
process.stdout.write(`Updated CIRUI China storefront contact settings in ${path.basename(configPath)}\n`);
