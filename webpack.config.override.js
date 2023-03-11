module.exports = function override(config, env) {
  if (env === "development") {
    config.devServer.headers = { "Access-Control-Allow-Origin": "*" };
    config.devServer.disableHostCheck = true;
  }
  return config;
};