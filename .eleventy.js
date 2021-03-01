const filters = require('./utils/filters.js')
const transforms = require('./utils/transforms.js')
const collections = require('./utils/collections.js')
const svgContents = require('eleventy-plugin-svg-contents')
const Image = require('@11ty/eleventy-img')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPassthroughCopy("src/_assets/icons");
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

  // shortcodes
  eleventyConfig.addNunjucksAsyncShortcode('Image', async (src, alt, classes) => {
    if (!alt) {
      throw new Error('Missing alt on image.')
    }
    

    const stats = await Image(src, {
      formats: ['webp'],
      widths: [225],
      outputDir: './dist/img/',
    })

    return Image.generateHTML(stats, {
      alt,
      class: classes,
      loading: 'lazy',
      decoding: 'async'
    })
  })

  // This allows Eleventy to watch for file changes during local development.
  eleventyConfig.setUseGitIgnore(false);

  // Inline svg
  eleventyConfig.addPlugin(svgContents)

  return {
    dir: {
      input: "src/",
      output: "dist",
      includes: '_includes',
      layouts: "_layouts"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true
  };
};
