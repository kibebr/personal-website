const { DateTime } = require('luxon')
const { minify } = require('terser')
const isProduction = process.env.ELEVENTY_ENV === 'production'

module.exports = {
  universalFilters: {
    htmlDateString: (dateObj) => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat('yyyy-LL-dd');
    }
  },
  nunjucksAsyncFilters: {
    jsmin: async (code, cb) => {
      if (!isProduction) {
        cb(null, code)
      } else {
        try {
          const minified = await minify(code, {
            module: true
          })
          cb(null, minified.code)
        } catch (err) {
          console.error(err)
          cb(null, code)
        }
      }
    }
  }
}
