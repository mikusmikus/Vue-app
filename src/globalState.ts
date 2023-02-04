import { reactive } from "vue";

type Theme = "light" | "dark";

export const store = reactive({
  theme: "light" as Theme,

  toggleThem: () => {
    if (store.theme === "light") {
      store.theme = "dark";
    } else {
      store.theme = "light";
    }
  },
});
