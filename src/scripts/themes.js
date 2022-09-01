const shadow = color => "0px 8px 15px " + color;

const themes = {
  "Default": {
    accent: "rgb(6 40 50 / 90%)",
    bg: "#011d25",
    gradientColors: ["#25E7B8", "#92E93B"],
    medium: "#38464a",
    text: "#fff",
    shadow: shadow("#111"),
  },
  "Neon": {
    accent: "rgb(74 84 69 / 90%)",
    bg: "#414a3d",
    gradientColors: ["#f04f87", "#f7a025", "#70d941"],
    medium: "#606e59",
    text: "#fff",
    shadow: shadow("#333"),
  },
  "Purple": {
    accent: "rgb(34 9 62 / 90%)",
    bg: "#251833",
    gradientColors: ["#598eeb", "#b986f0"],
    medium: "#432267",
    text: "#fff",
    shadow: shadow("#121111"),
  },
  "Dark-Rainbow": {
    accent: "rgb(20 20 20 / 90%)",
    bg: "#101112",
    gradientColors: ["#f00", "#0f0", "#3c76e8"],
    medium: "#303236",
    text: "#fff",
    shadow: shadow("#000"),
  },
  "Earth": {
    accent: "rgb(14 77 100 / 80%)",
    bg: "#0A2F51",
    gradientColors: ["#1D9A6C", "#4ec756"],
    medium: "#0E4D64",
    text: "#fff",
    shadow: shadow("#0a394a"),
  },
  "Wine": {
    accent: "rgb(79 3 16 / 90%)",
    bg: "#30020a",
    gradientColors: ["#a8162f", "#f9c7c0"],
    medium: "#540311",
    text: "#f9e8c0",
    shadow: shadow("#42131c"),
  },
  "America": {
    accent: "rgb(38 38 71 / 90%)",
    bg: "#070029",
    gradientColors: ["#fff", "#f00"],
    medium: "#21116b",
    text: "#4171f0",
    shadow: shadow("#14142b"),
  },
  // "Halloween": {
  //   accent: "rgb(38 23 43/ 90%)",
  //   bg: "#141414",
  //   gradientColors: ["#1cff33", "#f58e20"],
  //   medium: "#3b2642",
  //   text: "#a85de3",
  //   shadow: shadow("#19101c"),
  // },
  "Retro": {
    accent: "rgb(135 134 95/ 90%)",
    bg: "#666547",
    gradientColors: ["#6fcb9f", "#eb6b26"],
    medium: "#78764e",
    text: "#ffe28a",
    shadow: shadow("#4f4e34"),
  },
  "Berry": {
    accent: "rgb(99 1 61/ 90%)",
    bg: "#400027",
    gradientColors: ["#6837cc", "#ab1a40"],
    medium: "#700044",
    text: "#cab9ed",
    shadow: shadow("#42052b"),
  },
  "Summer": {
    accent: "rgb(29 91 125/ 90%)",
    bg: "#15435c",
    gradientColors: ["#ffd700", "#f3872f", "#ff598f"],
    medium: "#215f80",
    text: "#499fcc",
    shadow: shadow("#184d69"),
  },
};

export default themes;