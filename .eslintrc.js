module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:react/jsx-runtime",
    "plugin:cypress/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
  ],
  rules: {
    "linebreak-style": 0,
    quotes: [
      "error",
      "double",
    ],
    "react/button-has-type": "off",
    "react/prop-types": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "cypress/no-unnecessary-waiting": "off",
    "default-param-last": "off",
    "no-restricted-globals": "off", // Global environment variables of the web like scrollTo()
    "import/no-unresolved": "off",
    "import/extensions": "off",
    camelcase: "off",
    "import/no-cycle": "off",
    "consistent-return": "off",
  },
};
