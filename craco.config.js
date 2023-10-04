const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@api": path.resolve(__dirname, "src/api"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@interfaces": path.resolve(__dirname, "src/interfaces"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@reducers": path.resolve(__dirname, "src/reducers"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@component": path.resolve(__dirname, "src/component"),
    },
  },
};
