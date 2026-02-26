import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: {
    "postcss-nesting": {},   // recomendado para CSS moderno
    tailwindcss,
    autoprefixer,
  },
};