module.exports = function override(config, env) {
  if (env === "development") {
    config.devServer.headers = { "Access-Control-Allow-Origin": "*" };
    config.devServer.disableHostCheck = true;
  }
  return config;
};

module.exports = function override(config, env) {
  if (env === "development") {
    config.devServer.proxy = {
      "/api": {
        target: "https://api-englishapp-production.up.railway.app",
        changeOrigin: true,
      },
    };
    config.devServer.headers = { "Access-Control-Allow-Origin": "*" };
    config.devServer.disableHostCheck = true;
    ;
  }
  return config;
};
