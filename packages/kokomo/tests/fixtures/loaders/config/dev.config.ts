export default {
  middlewares: [
    {
      path: "timer.ts",
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
