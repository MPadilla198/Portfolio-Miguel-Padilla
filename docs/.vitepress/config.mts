import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Miguel Padilla's Portfolio",
  description: "6.1040 Fall 2024",  
  base: "/portfolio-miguel-padilla/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      // { text: "Blogs", link: "/blogs" },
      { text: "About Me", link: "about.md"},
    ],

    sidebar: [
      {
        text: "Blogs",
        link: "/blogs",
      },
      {
	text: "Assignments",
	link: "/assignments"
      }
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/MPadilla198" }],
  },
});
