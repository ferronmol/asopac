export const logCookies = (req, res, next) => {
  const originalCookieSetter = res.cookie;
  res.cookie = function (name, value, options) {
    //console.log(`Se creó una nueva cookie: ${name}=${value}`);
    if (options && options.sameSite === "none") {
      options = {
        ...options,
        sameSite: "None",
        secure: true,
      };
    }
    originalCookieSetter.call(this, name, value, options);
  };
  next();
};
