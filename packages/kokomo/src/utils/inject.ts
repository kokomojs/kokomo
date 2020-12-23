const inject = {
  default(filepath: string): any {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(filepath);
    return module && typeof module === "object" && "default" in module ? module.default : module;
  },
};
export { inject };
