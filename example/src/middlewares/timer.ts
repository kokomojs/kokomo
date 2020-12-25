import type { KokomoContext, Next } from "kokomo";

export default function () {
  return async function (ctx: KokomoContext, next: Next): Promise<void> {
    const startTime = Date.now();
    await next();
    console.log(`${ctx.method} ${ctx.url} - ${Date.now() - startTime}ms`);
  };
}
