// Só o que capi-param-builder-nodejs usa de 'net'. O Worker não tem require de
// builtin em tempo de execução, então as duas checagens vivem aqui.
const V4 = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

exports.isIPv4 = (s) => typeof s === 'string' && V4.test(s);

// O parser de URL já valida IPv6 (inclusive ::ffff:1.2.3.4); só entre colchetes.
exports.isIPv6 = (s) => {
  if (typeof s !== 'string' || !s.includes(':') || /[[\]/%]/.test(s)) return false;
  try { new URL(`http://[${s}]/`); return true; } catch { return false; }
};
