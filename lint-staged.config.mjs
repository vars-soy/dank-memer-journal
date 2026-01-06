/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
const config = {
  "*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}": ["eslint --fix", "prettier --write"],
  "!(*.{js,cjs,mjs,jsx,ts,cts,mts,tsx})": "prettier --write --ignore-unknown",
};

export default config;
