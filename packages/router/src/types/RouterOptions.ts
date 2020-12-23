import type { Config, HTTPVersion } from "find-my-way";

export declare interface RouterOptions<V extends HTTPVersion = HTTPVersion.V1> {
  controllers: any[];
  config?: Config<V>;
}
