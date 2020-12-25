import Koa from "koa";
import * as path from "path";
import * as http from "http";
import * as https from "https";
import { createRouter } from "@kokomo/router";

import { ENV } from "../config";
import { merge, mixin } from "../utils";
import { ControllerStore, packageInfo } from "../store";

import ServiceLoader from "../loaders/ServiceLoader";
import ControllerLoader from "../loaders/ControllerLoader";
import AspectLoader from "../loaders/AspectLoader";
import ConfigLoader from "../loaders/ConfigLoader";
import PluginLoader from "../loaders/PluginLoader";
import MiddlewareLoader from "../loaders/MiddlewareLoader";

import { Context } from "../extends/Context";
import { Request } from "../extends/Request";
import { Response } from "../extends/Response";

import type { KokomoOptions, KokomoContext } from "../types";

let instance = (null as unknown) as Kokomo;

class Kokomo {
  app: Koa<Koa.DefaultState, KokomoContext>;
  server!: http.Server | https.Server;
  port!: number;
  callback!: (app: Kokomo) => void;
  options: KokomoOptions;

  constructor(options?: KokomoOptions, app?: Koa<Koa.DefaultState, KokomoContext>) {
    console.assert(
      options && options.root,
      `Kokomo options.root must set value. e.g { root: __dirnames }, now ${JSON.stringify(options)}`
    );
    this.app = app || new Koa();
    this.options = merge(options, {});

    const { env } = this.options;

    if (env) process.env.KOKOMO_SERVER_ENV = env;

    mixin(false, this.app.context, Context);
    mixin(false, this.app.request, Request);
    mixin(false, this.app.response, Response);

    instance = this;
  }

  private load() {
    this.loadConfig();
    this.loadMiddleware();
    this.loadPlugin();
    this.loadAspect();
    this.loadService();
    this.loadController();
  }

  private loadConfig() {
    ConfigLoader.loadConfigDir(path.resolve(this.options.root, "config"));
  }

  private loadAspect() {
    AspectLoader.loadAspectDir(path.resolve(this.options.root, "aspects"));
  }

  private loadPlugin() {
    PluginLoader.loadPlugins(path.resolve(this.options.root, "plugins"));
  }

  private loadService() {
    ServiceLoader.loadServiceDir(path.resolve(this.options.root, "services"));
  }

  private loadController() {
    ControllerLoader.loadControllerDir(path.resolve(this.options.root, "controllers"));
  }
  private loadMiddleware() {
    MiddlewareLoader.loadMiddlewares(path.resolve(this.options.root, "middlewares"));
  }
  get context(): KokomoContext {
    return this.app.context as KokomoContext;
  }

  get env(): string {
    const { KOKOMO_SERVER_ENV } = process.env;
    switch (KOKOMO_SERVER_ENV) {
      case "dev":
        return ENV.dev;
      case "prod":
        return ENV.prod;
      default:
        return ENV.default;
    }
  }

  use(mw: any): void {
    this.app.use(mw);
  }

  async start(port: number, callback?: (app: Kokomo) => void): Promise<void> {
    if (!this.port) this.port = port;
    if (callback) this.callback = callback;
    const { app } = this;
    // 加载 loaders
    this.load();
    // 注册 router 中间件
    this.use(
      createRouter({
        config: {
          defaultRoute(req, res) {
            res.statusCode = 404;
            res.end();
          },
        },
        controllers: ControllerStore.all(),
      })
    );
    const koaCallback = app.callback();

    this.server = http.createServer(koaCallback);

    this.server.listen(this.port, async () => {
      console.log(`Kokomo server running at port: ${this.port} `);

      if (typeof this.callback === "function") {
        await Promise.resolve(Reflect.apply(this.callback, this, []));
      }
    });
  }

  static version: string = packageInfo.version;

  static get context(): KokomoContext {
    return Kokomo.instance().context;
  }

  static instance(options?: KokomoOptions): Kokomo {
    if (instance) return instance;

    instance = new Kokomo(options);

    return instance;
  }
}

export default Kokomo;
