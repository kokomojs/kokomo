/* eslint-disable @typescript-eslint/no-var-requires */
type TPackageInfo = {
  version: string;
};

export const packageInfo: TPackageInfo = require("../../package.json");
