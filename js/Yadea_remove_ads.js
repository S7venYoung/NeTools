// 雅迪智行去广告 - Loon

let body = $response.body || "";

const keyBlock = /^(ad|ads|advert|advertise|advertisement|banner|banners|splash|splashAd|openAd|openScreen|startup|launchAd|popup|popUp|pop|modal|float|floating|marketing|promotion|promotions|coupon|redPacket|recommendAd)$/i;
const weakKeyBlock = /(adInfo|adList|adData|advert|banner|splash|popup|marketing|promotion|floatWindow|startupAd|launchAd|openScreen)/i;
const valueBlock = /(ad|advert|banner|splash|popup|marketing|promotion|openScreen|launchAd)/i;

function isBlockedKey(key) {
  return keyBlock.test(key) || weakKeyBlock.test(key);
}

function looksLikeAdItem(item) {
  if (!item || typeof item !== "object" || Array.isArray(item)) return false;
  const pairs = Object.entries(item);
  return pairs.some(([key, value]) => {
    if (isBlockedKey(key)) return true;
    if (/^(type|position|module|scene|code|name|bizType|template|slot|source)$/i.test(key) && typeof value === "string") {
      return valueBlock.test(value);
    }
    return false;
  });
}

function clean(value) {
  if (Array.isArray(value)) {
    return value.map(clean).filter((item) => !looksLikeAdItem(item));
  }
  if (!value || typeof value !== "object") return value;

  Object.keys(value).forEach((key) => {
    if (isBlockedKey(key)) {
      if (Array.isArray(value[key])) value[key] = [];
      else if (value[key] && typeof value[key] === "object") value[key] = {};
      else delete value[key];
      return;
    }
    value[key] = clean(value[key]);
  });

  return value;
}

try {
  const obj = JSON.parse(body);
  body = JSON.stringify(clean(obj));
} catch (_) {}

$done({ body });
