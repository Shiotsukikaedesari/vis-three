import pkg from "../../package.json";
import { defineConfig } from "vitepress";
import path from "path";

export default defineConfig({
  base: "/vis-three/docs",
  lang: "zh-cn",
  title: "VIS-THREE",
  description: "more convenient development for three.js",
  outDir: path.resolve(__dirname, "../../website/public/docs"),
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "开始", link: "/start/start" },
      { text: "API", link: "/api/engine" },
      { text: "版本", link: "/version/version0-1-13" },
      {
        text: "website",
        link: "https://shiotsukikaedesari.gitee.io/vis-three/",
      },
    ],
    sidebar: {
      "/start/": [
        { text: "开始", link: "/start/start" },
        { text: "TODO", link: "/start/todo" },
      ],
      "/api/": [
        { text: "引擎", link: "/api/engine" },
        { text: "引擎插件", link: "/api/plugins" },
        { text: "支持模块", link: "/api/support" },
        { text: "事件库", link: "/api/eventLibrary" },
        { text: "脚本动画库", link: "/api/aniScriptLibrary" },
        { text: "shader库", link: "/api/shaderLibrary" },
        { text: "便利工具", link: "/api/convenient" },
        { text: "展示器", link: "/api/displayer" },
        { text: "管理器", link: "/api/manager" },
        { text: "修改器", link: "/api/modifier" },
        { text: "物体辅助", link: "/api/helper" },
        { text: "加载器", link: "/api/loader" },
        { text: "核心", link: "/api/core" },
        { text: "拓展", link: "/api/extends" },
      ],
      "/version/": [
        { text: "version0.0.3", link: "/version/version0-0-3" },
        { text: "version0.0.4", link: "/version/version0-0-4" },
        { text: "version0.0.5", link: "/version/version0-0-5" },
        { text: "version0.0.6", link: "/version/version0-0-6" },
        { text: "version0.0.7", link: "/version/version0-0-7" },
        { text: "version0.0.8", link: "/version/version0-0-8" },
        { text: "version0.0.9", link: "/version/version0-0-9" },
        { text: "version0.0.10", link: "/version/version0-0-10" },
        { text: "version0.0.11", link: "/version/version0-0-11" },
        { text: "version0.0.12", link: "/version/version0-0-12" },
        { text: "version0.0.13", link: "/version/version0-0-13" },
        { text: "version0.1.0", link: "/version/version0-1-0" },
        { text: "version0.1.13", link: "/version/version0-1-13" },
      ],
    },
    repo: pkg.repository,
    repoLabel: "github",

    docsDir: "docs",
    editLinkText: "编辑此页面",
    editLinks: true,
  },
});
