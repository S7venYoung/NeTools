// 雅迪智行接口定位 - Loon

const url = $request.url;
const method = $request.method || "GET";
const isResponse = typeof $response !== "undefined";
const markers = /(ad|ads|advert|banner|splash|popup|pop|launch|startup|marketing|promotion|activity|recommend|coupon|window|modal)/i;

function preview(text, max = 1200) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

function findKeys(value, path = "", out = []) {
  if (!value || typeof value !== "object" || out.length > 80) return out;
  if (Array.isArray(value)) {
    value.slice(0, 20).forEach((item, index) => findKeys(item, `${path}[${index}]`, out));
    return out;
  }
  Object.keys(value).forEach((key) => {
    const next = path ? `${path}.${key}` : key;
    if (markers.test(key)) out.push(next);
    findKeys(value[key], next, out);
  });
  return out;
}

try {
  if (!isResponse) {
    console.log(`[Yadea][REQ] ${method} ${url}`);
  } else {
    const body = $response.body || "";
    let hit = markers.test(url);
    let keys = [];
    try {
      const json = JSON.parse(body);
      keys = findKeys(json);
      hit = hit || keys.length > 0;
    } catch (_) {
      hit = hit || markers.test(body);
    }

    if (hit) {
      console.log(`[Yadea][RESP] ${method} ${url}`);
      if (keys.length) console.log(`[Yadea][KEYS] ${keys.join(", ")}`);
      console.log(`[Yadea][BODY] ${preview(body)}`);
    }
  }
} catch (e) {
  console.log(`[Yadea][ERR] ${e.message || e}`);
}

$done(isResponse ? { body: $response.body } : {});
