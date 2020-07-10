"use babel";

import chroma from "chroma-js";

const CONFIG_KEY_ACCENT_COLOR = "inkdrop-accent-color.accentColor";
const CONFIG_KEY_IS_SOLID = "inkdrop-accent-color.isSolid";

const updateColor = () => {
  const color = inkdrop.config.get(CONFIG_KEY_ACCENT_COLOR);
  const isSolid = inkdrop.config.get(CONFIG_KEY_IS_SOLID);

  if (!chroma.valid(color)) {
    return;
  }

  const accentColor = chroma(color).hex();
  const accentColorBackground = chroma(color)
    .alpha(isSolid ? 1 : 0.2)
    .hex();
  const borderWidth = isSolid ? "0px" : "2px";

  document.documentElement.style.setProperty(
    "--inkdrop-accent-color_accent-color",
    accentColor
  );

  document.documentElement.style.setProperty(
    "--inkdrop-accent-color_accent-color-background",
    accentColorBackground
  );

  document.documentElement.style.setProperty(
    "--inkdrop-accent-color_right-border-width",
    borderWidth
  );
};

module.exports = {
  config: {
    accentColor: {
      title: "Accent Color",
      description:
        "A color keyword (like 'red') or a hex color value (like '#FF0000')",
      type: "string",
      default: "#009EEA",
    },
    isSolid: {
      title: "Solid Background",
      description: "Background color has alpha or not.",
      type: "boolean",
      default: false,
    },
  },
  activate: () => {
    inkdrop.config.observe(CONFIG_KEY_ACCENT_COLOR, updateColor);
    inkdrop.config.observe(CONFIG_KEY_IS_SOLID, updateColor);
  },
  deactivate: () => {},
};
