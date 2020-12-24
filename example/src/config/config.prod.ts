import * as path from "path";

export default {
  middlewares: [
    {
      path: "timer.ts",
    },
    {
      package: "koa2-cors",
      options: {
        origin: function (ctx: any) {
          return ctx.get("Origin");
        },
        credentials: true,
      },
    },
    {
      package: "koa-views",
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
  ],
};
