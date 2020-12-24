export declare interface KokomoConfig {
  middlewares?: KokomoConfigMiddleware[];
  plugins?: KokomoConfigPlugin[];
}

export declare interface KokomoConfigMiddleware {
  path?: string;
  pkg?: string;
  options?: Record<string, unknown>;
}

export declare interface KokomoConfigPlugin {
  name: string;
  path: string;
}
