const inject = {
  default(filepath: string): any {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const module = require(filepath);
      if (!module) return module;
      if (module.__esModule) return typeof module === "object" && "default" in module ? module.default : module;
      return module;
    } catch (err) {
      err.message = `[Kokomo] load package: ${filepath}, error: ${err.message}`;
      throw err;
    }
  },
};
export { inject };
