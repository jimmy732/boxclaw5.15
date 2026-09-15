import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const targets = [
  path.join(root, 'data', 'fbox-store.seed.json'),
  path.join(root, 'work', 'runtime-cn', 'fbox-store.json')
];

const legacyNames = new Map(Object.entries({
  'Axis 19': 'Axis 19 轮毂',
  'Velocity 18': 'Velocity 18 轮毂',
  'Forge 20': 'Forge 20 轮毂',
  'Drift 18': 'Drift 18 轮毂',
  'Lumen 19': 'Lumen 19 轮毂',
  'Track 17': 'Track 17 轮毂',
  'Ceramic Pro 6P': 'Ceramic Pro 六活塞卡钳',
  'Street 4P': 'Street 四活塞卡钳',
  'Track Slotted 380': 'Track 380 毫米划线刹车盘',
  'Street Drilled 330': 'Street 330 毫米打孔刹车盘',
  'R-Compound Pads': 'R-Compound 竞技刹车片',
  'Quiet Street Pads': 'Quiet Street 舒适型刹车片'
}));

const stockNames = new Map(Object.entries({
  'Audi': '奥迪',
  'BMW': '宝马',
  'BMW 1-7 Series 5x120': '宝马 1-7 系 5x120',
  'BMW 19New X5 20New 3 Series 5-7 Series 5x112': '宝马 2019 款 X5 / 2020 款 3 系 / 5-7 系 5x112',
  'Porsche': '保时捷',
  'Porsche Porsche 718': '保时捷 718',
  'Porsche Porsche 911': '保时捷 911',
  'Porsche Porsche 卡宴': '保时捷卡宴',
  'Porsche Porsche 帕拉梅拉': '保时捷帕拉梅拉',
  'Porsche Porsche macan': '保时捷 Macan',
  'Mercedes-Benz': '奔驰',
  'Mercedes-Benz G-Class Off-Road': '奔驰 G 级越野',
  'Mercedes-Benz A/B/C/S-Class': '奔驰 A/B/C/S 级轿车',
  'Buick': '别克',
  'Bentley': '宾利',
  'GAC Trumpchi': '广汽传祺',
  'Volkswagen': '大众',
  'Toyota': '丰田',
  'Toyota Land Cruiser Prado': '丰田普拉多',
  'Toyota Alphard': '丰田埃尔法',
  'Toyota Hiace': '丰田海狮',
  'Custom Designs': '自定义款式',
  'Hongqi': '红旗',
  'Zeekr': '极氪',
  'Jaguar': '捷豹',
  'Cadillac': '凯迪拉克',
  'Rolls-Royce': '劳斯莱斯',
  'Lexus': '雷克萨斯',
  'Li Auto': '理想汽车',
  'Lincoln': '林肯',
  'Land Rover': '路虎',
  'Land Rover Evoque / Discovery Sport / Velar / Discovery': '路虎揽胜极光 / 发现运动 / 星脉 / 发现',
  'Land Rover Range Rover / Defender': '路虎揽胜 / 卫士',
  'Land Rover New Range Rover': '路虎新款揽胜',
  'Alfa Romeo': '阿尔法·罗密欧',
  'Maserati': '玛莎拉蒂',
  'Tank': '坦克',
  'Tesla': '特斯拉',
  'Nissan Patrol': '日产途乐',
  'NIO': '蔚来',
  'AITO': '问界',
  'Xiaomi': '小米汽车',
  'BBS': 'BBS'
}));

const styleTerms = [
  ['Deep-Lip Split-5 2-Piece', '深唇分叉五辐双片式'],
  ['Heritage Mesh 2-Piece', '经典网状双片式'],
  ['Heritage Disc 2-Piece', '经典碟盘双片式'],
  ['Grand Touring Multi-Spoke', '豪华巡航多辐'],
  ['Executive Multi-Spoke', '行政多辐'],
  ['Feather Multi-Spoke', '羽翼多辐'],
  ['Vector Multi-Spoke', '矢量多辐'],
  ['Flow Multi-Spoke', '流线多辐'],
  ['Motorsport Split-5', '赛车分叉五辐'],
  ['Motorsport Mesh', '赛车网状'],
  ['Dynamic Split-5', '动感分叉五辐'],
  ['Track Split-5', '赛道分叉五辐'],
  ['Hexa Split-5', '六角分叉五辐'],
  ['Aero Split-5', '空力分叉五辐'],
  ['Axis Split-5', '轴向分叉五辐'],
  ['Arc Split-5', '弧形分叉五辐'],
  ['20-Spoke Deep-Lip', '20 辐深唇'],
  ['Luxury Turbine', '豪华涡轮'],
  ['Turbine 2-Piece', '涡轮双片式'],
  ['Floating Aero', '悬浮空力'],
  ['Floating Disc', '悬浮碟盘'],
  ['Aero Tri-Spoke', '空力三辐'],
  ['Diamond Mesh', '钻石网状'],
  ['Crystal Mesh', '水晶网状'],
  ['Double-Y Mesh', '双 Y 网状'],
  ['Lattice Mesh', '格栅网状'],
  ['Disc Classic', '经典碟盘式'],
  ['Turbine Aero', '空力涡轮'],
  ['Multi-Spoke', '多辐'],
  ['Split-Spoke', '分叉辐条'],
  ['10-Spoke', '10 辐'],
  ['2-Piece', '双片式'],
  ['Competition 5', '竞技五辐'],
  ['Terrain Beadlock', '越野防脱圈'],
  ['Classic 8', '经典八辐'],
  ['Classic 5', '经典五辐'],
  ['Heritage 6', '经典六辐'],
  ['Racing 6', '赛车六辐'],
  ['Blade 5', '刀锋五辐'],
  ['Track 10', '赛道十辐'],
  ['Twin-10', '双十辐'],
  ['V-5', 'V 型五辐'],
  ['Performance', '性能型']
];

const exactTranslations = {
  meta: new Map(Object.entries({
    '6 piston · front axle · 380 mm': '六活塞 · 前轴 · 380 毫米',
    '4 piston · front axle · 330 mm': '四活塞 · 前轴 · 330 毫米',
    '2-piece · slotted · 380 mm': '双片式 · 划线盘 · 380 毫米',
    '1-piece · drilled & slotted · 330 mm': '单片式 · 打孔划线盘 · 330 毫米',
    'Low dust · high bite · front axle': '低粉尘 · 高摩擦力 · 前轴',
    'Low noise · low dust · front axle': '低噪音 · 低粉尘 · 前轴',
    'Custom construction forged wheel · Diameter / width / PCD / ET / CB built to order': '定制结构锻造轮毂 · 直径 / J 值 / PCD / ET / CB 按需定制',
    'Monoblock forged wheel · Diameter / width / PCD / ET / CB built to order': '单片式锻造轮毂 · 直径 / J 值 / PCD / ET / CB 按需定制',
    '2-piece forged wheel · Diameter / width / PCD / ET / CB built to order': '双片式锻造轮毂 · 直径 / J 值 / PCD / ET / CB 按需定制',
    'Stock style showcase · exact size, inventory and vehicle fitment confirmed during inquiry': '原厂风格展示 · 具体尺寸、库存及车型适配请在询价时确认'
  })),
  finish: new Map(Object.entries({
    'Satin Black': '缎面黑', 'Bronze Machined': '古铜车面', 'Gloss Black': '亮黑', 'Matte Bronze': '哑光古铜',
    'Machined Silver': '车面银', 'Hyper Silver': '高亮银', 'Ceramic White': '陶瓷白', 'Electric Blue': '电光蓝',
    'Black Hat': '黑色盘帽', 'Geomet Coat': '达克罗涂层', 'Carbon Ceramic': '碳陶瓷', 'Ceramic': '陶瓷',
    'Custom finish': '支持定制颜色'
  })),
  material: new Map(Object.entries({
    'Rotary Forged': '旋压成型铝合金', 'Cast Aluminum': '铸造铝合金', 'Forged Aluminum': '锻造铝合金',
    'Iron + Aluminum': '高碳铸铁盘面＋铝合金盘帽', 'High Carbon Iron': '高碳铸铁',
    'Carbon Ceramic': '碳陶瓷', 'Ceramic': '陶瓷', 'Forged Aluminum Alloy': '锻造铝合金'
  })),
  badge: new Map(Object.entries({ Hot: '热门', Sale: '特惠', New: '新品', 'Stock Gallery': '现货图库' })),
  size_note: new Map(Object.entries({
    'All sizes supported - custom diameter, width and fitment': '支持定制直径、J 值及车型适配参数',
    'All sizes supported - custom fitment built to order': '支持按车型定制适配，最终参数以工程审核为准',
    'Custom diameter, width, PCD, ET and center bore — final drawing required': '支持定制直径、J 值、PCD、ET 及中心孔，最终以工程图纸为准',
    'All sizes supported - custom diameter, width, PCD, ET and center bore': '支持定制直径、J 值、PCD、ET 及中心孔'
  })),
  storefront_note: new Map(Object.entries({
    'Archived from the custom forged wheel export catalog; retained for existing records.': '原外贸定制目录归档商品，仅保留用于历史记录。'
  })),
  load_rating_note: new Map(Object.entries({
    'Specified against the exact vehicle and use case at quotation': '承载等级根据具体车型与使用场景在报价时确定',
    'Specified against the exact vehicle and use case at inquiry': '承载等级根据具体车型与使用场景在询价时确定'
  })),
  classification_note: new Map(Object.entries({
    'Design family is visible in the supplied views; final construction must be confirmed from the engineering drawing.': '可从现有图片判断设计类型，最终结构仍需以工程图纸确认。',
    'Classification is based on the supplied product views and remains subject to the approved engineering drawing.': '当前分类依据现有产品图片，最终以审核通过的工程图纸为准。',
    'Construction is confirmed by the existing product specification.': '产品结构已由现有规格资料确认。',
    'Monoblock classification is based on the supplied product views and remains subject to the approved engineering drawing.': '当前单片式分类依据现有产品图片，最终以审核通过的工程图纸为准。',
    'Separate center, lip/barrel and exposed assembly hardware are visible in the supplied product views.': '现有产品图片中可见独立轮心、轮辋以及外露装配螺丝。',
    'Off-road / beadlock-style design visible; final construction must be confirmed from the engineering drawing.': '可见越野防脱圈风格，最终结构仍需以工程图纸确认。',
    'This collection groups supplied stock and vehicle-reference photos. Exact construction and fitment are confirmed during inquiry.': '该图库汇总现货与车辆参考图片，具体结构及适配参数请在询价时确认。'
  })),
  product_family: new Map(Object.entries({
    'CIRUI Forged Series': '策锐锻造系列', 'CIRUI Heritage Mesh': '策锐经典网状系列', 'CIRUI Aero Disc': '策锐空力碟盘系列'
  }))
};

const categoryLabels = { Wheels: '轮毂', Calipers: '卡钳', Rotors: '刹车盘', 'Brake Pads': '刹车片' };

function localizeName(value = '') {
  const name = String(value || '').trim();
  if (!name || name.startsWith('策锐 ') || /(?:轮毂|卡钳|刹车盘|刹车片)$/.test(name)) return name;
  if (legacyNames.has(name)) return legacyNames.get(name);
  const stockMatch = name.match(/^CIRUI (.+) Stock Wheel Collection$/);
  if (stockMatch) return `策锐 ${stockNames.get(stockMatch[1]) || stockMatch[1]}原厂风格轮毂图库`;
  const forgedMatch = name.match(/^CIRUI (.+) Forged Wheel$/);
  if (forgedMatch) {
    let style = forgedMatch[1];
    for (const [source, translated] of styleTerms) style = style.replace(source, translated);
    return `策锐 ${style}锻造轮毂`;
  }
  return name.replace(/^CIRUI\s+/, '策锐 ');
}

function localizeProduct(product) {
  const localized = { ...product };
  localized.name = localizeName(product.name);
  if (product.catalog_display_name) localized.catalog_display_name = localizeName(product.catalog_display_name);
  if (product.public_scope !== false || product.brand === 'CIRUI') localized.brand = '策锐锻造';
  localized.category_zh = categoryLabels[product.category] || product.category;
  for (const [field, translations] of Object.entries(exactTranslations)) {
    if (translations.has(product[field])) localized[field] = translations.get(product[field]);
  }
  if (exactTranslations.finish.has(product.color)) localized.color = exactTranslations.finish.get(product.color);
  return localized;
}

let total = 0;
for (const target of targets) {
  try {
    const raw = JSON.parse(await fs.readFile(target, 'utf8'));
    if (!Array.isArray(raw.products)) throw new Error('products 数组不存在');
    raw.products = raw.products.map(localizeProduct);
    await fs.writeFile(target, `${JSON.stringify(raw, null, 2)}\n`, 'utf8');
    total += raw.products.length;
    console.log(`已中文化 ${raw.products.length} 条商品：${path.relative(root, target)}`);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      console.log(`跳过尚未生成的运行数据：${path.relative(root, target)}`);
      continue;
    }
    throw error;
  }
}

console.log(`完成，共处理 ${total} 条国内站商品记录。`);
