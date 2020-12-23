import Koa from "koa";
import * as path from "path";
import * as http from "http";
import * as https from "https";
import { createRouter } from "@kokomo/router";

import { merge, mixin } from "../utils";
import { ControllerStore, packageInfo } from "../store";
import ServiceLoader from "../loaders/ServiceLoader";
import ControllerLoader from "../loaders/ControllerLoader";

import { Context } from "../extends/Context";
import { Request } from "../extends/Request";
import { Response } from "../extends/Response";

import type { Middleware } from "koa";
import type { KokomoOptions, KokomoContext } from "../types";

let instance = (null as unknown) as Kokomo;

class Kokomo {
  app: Koa;
  server!: http.Server | https.Server;
  port!: number;
  callback!: (app: Kokomo) => void;
  options: KokomoOptions;

  constructor(options?: KokomoOptions) {
    this.app = new Koa();
    this.options = merge(options, {});

    mixin(false, this.app.context, Context);
    mixin(false, this.app.request, Request);
    mixin(false, this.app.response, Response);
  }

  private load() {
    this.loadConfig();
    this.loadAspect();
    this.loadPlugin();
    this.loadService();
    this.loadController();
  }

  private loadAspect() {
    // TODO
  }
  private loadConfig() {
    // TODO
  }
  private loadPlugin() {
    // TODO
  }
  private loadService() {
    // TODO
    ServiceLoader.loadServiceDir(path.resolve(this.options.root, "services"));
  }
  private loadController() {
    ControllerLoader.loadControllerDir(path.resolve(this.options.root, "controllers"));
  }

  get context(): KokomoContext {
    return this.app.context as KokomoContext;
  }

  use(mw: Middleware): void {
    this.app.use(mw);
  }

  async start(port: number, callback?: (app: Kokomo) => void): Promise<void> {
    if (!this.port) this.port = port;
    if (callback) this.callback = callback;
    const { app } = this;

    this.load();

    this.use(
      createRouter({
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
