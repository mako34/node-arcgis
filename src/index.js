/**
 * Wrapper for arcgis api
 */
var rq = require('./lib/rq')
var uniq = require('./lib/uniq')

/**
 * Sets up a new arcgis client
 * @param {String} Valid Token
 * @returns {Object} Object with methods for necessary routes
 */
let client = token => {
  let ago = {
    /* Automatically add client id, base url */
    /**
     * Sets ups base request to ArcGIS
     * @param {String} URL to append to root URL
     * @param {Object} Options to pass as query parameters
     * @returns {Promise} On resolution will return results
     */
    request: (url, form = {}, rootUrl = 'http://www.arcgis.com/sharing/rest/') => {
      if (!form.public){
        form.token = token
      }
      form.f     = 'pjson'
      return rq.get(`${rootUrl}${url}`, form)
    },
    getUser: require('./user/get-user'),
    user: {
      getContent: require('./user/get-user-content')
    },
    getOrganization: require('./org/get-organization'),
    organization: {
      getUsers: require('./org/get-organization-users'),
      getContent: require('./org/get-organization-content'),
      getSummary: require('./org/get-organization-summary')
    },
    getGroup: require('./group/get-group'),
    group: {
      getContent: require('./group/get-group-content'),
      getUsers: function(){console.log('returns users in a group')}
    },
    getItem: require('./items/get-item'),
    item: {
      favorite: function () {console.log('adds item to favorites')},
      rate: function () {console.log('adds rating to item')}
    },
    getFavorites: function () {console.log('get the current users favorites')},
    items: {
      getTags: require('./items/get-tags')
    },
    getUsage: require('./usage/usage'),
    usage: {
      getSummary: require('./usage/get-summary'),
      stypeToService: require('./usage/stype-to-service'),
      parseProduct: require('./usage/parse-product'),
      flatten: require('./usage/flatten-data'),
      periodToMs: require('./usage/period-to-ms')
    },
    getBilling: require('./billing/billing'),
    billing: {
      status: function(){console.log('checks status of billing')}
    }
  }
  return ago
}

module.exports = client