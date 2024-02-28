exports.sanitizeObject = (params) => {
  const obj = { ...params };

  Object.keys(obj).forEach(
    (k) => (obj[k] === undefined || obj[k] === null) && delete obj[k],
  );

  return obj;
};

exports.object2QueryString = (params) => {
  const obj = this.sanitizeObject(params);

  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join('&');
};

exports.createSlug = (string) => string
  .toLowerCase()
  .replace(/ /g, '-')
  .replace(/[^\w-]+/g, '')
  .replace(/-{2,}/g, '-');

exports.sanitizeEmail = (string) => {
  if (!string) {
    return null;
  }

  const [name, domain] = string.split('@');
  const [realname, extra] = name.split('+');

  return `${realname}@${domain}`.trim().toLowerCase();
};

exports.parseSortBy = (sortBy) => {
  let sortField = {};

  sortBy.split(",").forEach((sortOption) => {
      const [key, order] = sortOption.split(":");
      sortField[key] = order === "desc" ? -1 : 1;
  });

  return sortField;
};