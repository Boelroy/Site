/*
 * RouterSingleton
 */

const find = require('lodash/find');
const utils = require('./utils');
const getRouterReg = utils.getRouterReg;
const parseQueryString = utils.parseQueryString;
const testPredicate = (path) => (route) => route.reg.test(path);

let RouterInstance_ = null;

class RouterSingleton {

  /*
   * singleton of the router
   */
  static getRouter(app) {
    if (RouterInstance_ === null) {
      RouterInstance_ = new Router(app);
    }
    return RouterInstance_;
  }

  /*
   * call back for the link element
   */
  static clickCallBack(e) {
    e.preventDefault();
    let router = RouterSingleton.getRouter();
    router.goToPath(e.target.href);
  }
}

/*
 * Router instance
 */
class Router {
  constructor(app) {
    this.routes = [];
    this.currentPath = null;
    this.defaulRoute = null;
    this.app = app;
    window.addEventListener('popstate', (e) => {
      this.onPopState(e);
    });
  }

  addRoute(path, component) {
    if (typeof path === 'object') {
      for (let p in path) {
        this._addRoute(p, path[p]);
      }
    } else {
      this._addRoute(path, component);
    }
  }

  _addRoute(path, component) {
    const route = {
      reg : getRouterReg(path),
      component: component
    }; 
    this.routes.push(route);
    if (path === '/') {
      this.setDefaultComponent(route);
    }
  }

  setDefaultRoute(route) {
    if (this.defaulRoute) {
      throw 'A default handler already exists';
    }
    this.defaulRoute = route;
  }

  requestStateUpdate() {
    requestAnimationFrame(() => {
      this.manageState();
    })
  }

  manageState() {
    var newPath = document.location.pathname;
    var newRoute = find(this.routes, testPredicate(newPath));

    if (!newRoute && this.defaulRoute) {
      newRoute = this.defaulRoute;
    }

    if (this.currentPath === newPath) {
      //TODO: may be refresh the view
      return false;
    }

    if (newRoute) {
      this.currentPath = newPath;
      this._updateAppState(newRoute, newPath);
    } else {
      this.currentPath = null;
    }
  }

  _updateAppState(newRoute, newPath) {
    const reg = newRoute.reg;
    var matches = newPath.match(reg);
    this.app.$data.route = {
      path: newPath,
      params: matches.slice(1),
      fragment: location.hash,
      query: parseQueryString(location.search)
    };
    this.app.currentView = newRoute.component;
  }

  goToPath(path, title=null) {
    if (path === window.location.pathname) {
      return;
    }
    history.pushState(undefined, title, path);
    this.requestStateUpdate();
  }

  onPopState(e) {
    e.preventDefault();
    this.requestStateUpdate();
  }
}

module.exports = RouterSingleton;