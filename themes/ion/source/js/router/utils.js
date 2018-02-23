const optionalParam = /\((.*?)\)/g;
const namedParam = /(\(\?)?:\w+/g;
const splatParam = /\*\w+/g;
const escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
const routerRegCache = {};

// 将路由替换成正则
function getRouterReg(router) {
  if (routerRegCache[router] == null) {
    const route = router.replace(escapeRegExp, '\\$&')
     .replace(optionalParam, '(?:$1)?')
     .replace(namedParam,
      (match, optional) => (optional ? match : '([^/?]+)'))
     .replace(splatParam, '([^?]*?)');
    routerRegCache[router] = new RegExp(`^${route}(?:\\?([\\s\\S]*))?$`);
  }
  return routerRegCache[router];
}

var parseQueryString = function (queryString) {
  if (queryString && queryString[0] == '?') {
    queryString = queryString.slice(1);
  }
    var params = {};
    if (queryString) {
      var query = queryString.split(/&/g);
      for (var i = 0; i < query.length; i++) {
        var aux = query[i].split('=');
        if (aux.length >= 1) {
          var val;
          if ( aux.length == 2) {
            val = decodeURIComponent(aux[1]);
          }
          if(typeof params[aux[0]] === 'string') {
            params[aux[0]] = [params[aux[0]], val]
          } else if( typeof params[aux[0]] === 'object') {
            params[aux[0]].push(val);
          } else {
            params[aux[0]] = val;
          }
        }
      }
    }
    return params;
};

module.exports = {
  getRouterReg: getRouterReg,
  parseQueryString: parseQueryString
}