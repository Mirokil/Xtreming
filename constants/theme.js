import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const colors = {
    red: '#fa2d48',
    gray: '#7d7d7d',
    darkgray: "#121312",
    white: '#ffffff',
    black: '#000000',
    transparentBlack: 'rgba(0, 0, 0, 0.4)',
    transparentWhite: 'rgba(255, 255, 255, 0.2)'
};

export const sizes = {
    width,
    height
};

export const fonts = {
    h1: { fontFamily: "MuseoSansRounded1000" },
    h2: { fontFamily: "MuseoSansRounded900" },
    h3: { fontFamily: "MuseoSansRounded700" },
    h4: { fontFamily: "MuseoSansRounded500" },
    h5: { fontFamily: "MuseoSansRounded300" }
};

const appTheme = { colors, sizes, fonts };

export default appTheme;