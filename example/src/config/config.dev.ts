import * as path from "path";

export default {
  middlewares: [
    {
      path: "timer.ts",
    },
    {
      pkg: "koa2-cors",
      options: {
        origin: function (ctx: any) {
          return ctx.get("Origin");
        },
        credentials: true,
      },
    },
    {
      pkg: "koa-views",
      options: [
        path.join(__dirname, "./../view"),
        {
          map: {
            html: "ejs",
          },
        },
      ],
    },
  ],
  plugins: [
    {
      name: "clock",
      path: "Clock.ts",
    },
    {
      name: "now",
      path: "now.ts",
    },
  ],
};
