// TODO: Update to es6 imports
const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: sveltePreprocess({
    scss: {
      includePaths: ['theme'],
    },
  }),
};