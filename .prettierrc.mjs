/** @type {import("prettier").Config} */
export default {
  printWidth: 79,
  trailingComma: "es5",
  bracketSameLine: true,

  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
