export const logCookies = (req, res, next) => {
  const originalCookieSetter = res.cookie;
  res.cookie = function (name, value, options) {
    //console.log(`Se creó una nueva cookie: ${name}=${value}`);
    originalCookieSetter.call(this, name, value, options);
  };
  next();
};
