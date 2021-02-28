const filters = require('./utils/filters.js')
const transforms = require('./utils/transforms.js')
const collections = require('./utils/collections.js')
const svgContents = require('eleventy-plugin-svg-contents')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPassthroughCopy("src/_assets/icons");
  eleventyConfig.addPassthroughCopy("src/_assets/scripts");
  eleventyConfig.addPassthroughCopy("src/_assets/videos");
  eleventyConfig.addPassthroughCopy("src/_assets/images");

  // Filters 
  Object.keys(filters.universalFilters).forEach(filter => eleventyConfig.addFilter(filter, filters.universalFilters[filter]))
  Object.keys(filters.nunjucksAsyncFilters).forEach(filter => eleventyConfig.addNunjucksAsyncFilter(filter, filters.nunjucksAsyncFilters[filter]))

  // Transforms
  Object.keys(transforms).forEach((transformName) => {
    eleventyConfig.addTransform(transformName, transforms[transformName])
  })

  // Collections
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName])
  })

  // This allows Eleventy to watch for file changes during local development.
  eleventyConfig.setUseGitIgnore(false);

  // Inline svg
  eleventyConfig.addPlugin(svgContents)

  return {
    dir: {
      input: "src/",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true
  };
};
