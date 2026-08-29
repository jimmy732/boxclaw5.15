import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function patchFile(relativePath, replacements) {
  const filePath = path.join(projectDir, relativePath);
  let source = await fs.readFile(filePath, 'utf8');
  for (const [before, after] of replacements) {
    if (!source.includes(before)) {
      throw new Error(`${relativePath}: expected admin bundle fragment not found: ${before.slice(0, 80)}`);
    }
    source = source.replace(before, after);
  }
  await fs.writeFile(filePath, source, 'utf8');
  process.stdout.write(`${relativePath}: inquiry-only catalog controls patched\n`);
}

await patchFile('admin-dist/assets/editor-B9801bQF.js', [
  ['price:0,price_mode:"fixed"', 'price:null,price_mode:"inquiry"'],
  ['!o.name.trim()||!o.category||!o.price||!f.value.length', '!o.name.trim()||!o.category||!f.value.length'],
  ['请填写商品名称、分类、美元售价，并至少上传一张商品图片。', '请填写商品名称、分类，并至少上传一张商品图片。价格可留空，前台统一显示“价格请咨询”。'],
  ['i=o.price_mode==="from"?"from":"fixed"', 'i=["from","fixed"].includes(o.price_mode)?o.price_mode:"inquiry"'],
  ['price:Number(o.price)', 'price:o.price===null||o.price===""||o.price===void 0?null:Number(o.price)'],
  ['商品、图片、起售价和库存都保存到 F-Box 自有后台；发布后会直接同步到 4174 前台。', '商品、图片和库存都保存到策锐自有后台；价格留空时前台统一显示“价格请咨询”。'],
  ['把销售参数写清楚。', '维护商品展示信息。'],
  ['r("span",{class:"fbox-usd"},"USD")', 'r("span",{class:"fbox-usd"},"价格可留空")'],
  ['label:"美元售价 *"', 'label:"参考价格（可留空）"'],
  ['label:"售价性质"', 'label:"价格展示"'],
  ['a($,{label:"fixed"},{default:s(()=>[...e[43]||(e[43]=[x("固定价",-1)])]),_:1}),a($,{label:"from"},{default:s(()=>[...e[44]||(e[44]=[x("起售价",-1)])]),_:1})', 'a($,{label:"inquiry"},{default:s(()=>[x("价格请咨询")]),_:1}),a($,{label:"fixed"},{default:s(()=>[...e[43]||(e[43]=[x("固定价",-1)])]),_:1}),a($,{label:"from"},{default:s(()=>[...e[44]||(e[44]=[x("起售价",-1)])]),_:1})']
]);

await patchFile('admin-dist/assets/index-Cj747VX4.js', [
  ['这里读写 F-Box 自有商品数据；图片、美元售价、库存和发布状态会直接同步到 4174 前台。', '这里读写策锐自有商品数据；图片、库存和发布状态会直接同步到前台，价格留空时显示“价格请咨询”。'],
  ['label:"售价 / 库存"', 'label:"价格状态 / 库存"'],
  ['n(e.price_mode==="from"?"US$"+Number(e.price||0).toFixed(2)+" 起":"US$"+Number(e.price||0).toFixed(2))', 'n(e.price_mode==="inquiry"||e.price===null||e.price===""?"价格请咨询":e.price_mode==="from"?"US$"+Number(e.price||0).toFixed(2)+" 起":"US$"+Number(e.price||0).toFixed(2))']
]);
