module.exports = {
  extends: "airbnb",
  plugins: ["react", "jsx-a11y", "import", "prettier"],
  env: {
    browser: true,
    jest: true
  },
  rules: {
    "no-underscore-dangle": "off",
    quotes: "off",
    "comma-dangle": "off",
    "prettier/prettier": "error"
  }
};
