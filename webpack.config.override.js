module.exports = function override(config, env) {
  if (env === "development") {
    config.devServer.disableHostCheck = true;
  }
  return config;
};