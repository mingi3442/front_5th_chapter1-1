import { config } from "../config";

class Router {
  constructor() {
    // ? 1-4 SPA를 만들기 위한 지식 뭉치에서 나오는 코드 패턴
    // if (Router.instance) return Router.instance;
    // Router.instance = this;
    this.routes = {};
    this.basePath = config.basePath;
    window.addEventListener("popstate", this.handlePopState.bind(this));
    window.addEventListener("hashchange", this.handleHashChange.bind(this));
  }

  get isHashMode() {
    return (
      window.location.pathname.includes("index.hash.html") ||
      window.location.hash !== ""
    );
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    if (this.isHashMode) {
      window.location.hash = path;
      const routePath = path || "/";
      this.handleRoute(routePath);
    } else {
      history.pushState(null, "", `${this.basePath}${path}`);
      this.handleRoute(path);
    }
  }

  handlePopState() {
    if (!this.isHashMode) {
      let path = window.location.pathname;

      if (this.basePath !== "") {
        if (path === this.basePath || path === this.basePath + "/") {
          path = "/";
        } else if (path.startsWith(this.basePath)) {
          path = path.substring(this.basePath.length);
        }
      }

      this.handleRoute(path);
    }
  }

  handleHashChange() {
    if (this.isHashMode) {
      const path = window.location.hash.substring(1) || "/";
      this.handleRoute(path);
    }
  }

  handleRoute(path) {
    const handler = this.routes[path] || this.routes["*"];

    if (handler) {
      handler();
    }
  }
}

// ? singleton pattern을 위한 export
export const router = new Router();
