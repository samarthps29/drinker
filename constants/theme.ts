const COLORS = {
	primary: "#186F65",
	secondary: "#9ADE7B",
	tertiary: "#DDF7E3",

	gray: "#969696",
	gray2: "#C1C0C8",

	white: "#dadada",
	lightWhite: "#FAFAFC",
	dark: "#121212",
	lightBg: "#fcf8e9",
	darkBg: "#121212",
	active: "#161A30",
	inactive: "#B6BBC4",
};

const FONT = {
	regular: "DMRegular",
	medium: "DMMedium",
	bold: "DMBold",
};

const SIZES = {
	xxSmall: 8,
	xSmall: 10,
	small: 12,
	medium: 16,
	large: 20,
	xLarge: 24,
	xxLarge: 32,
	xxlLarge: 34,
};

const SHADOWS = {
	small: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 2,
	},
	medium: {
		shadowColor: "#A6FF96",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 5.84,
		elevation: 5,
	},
};

export { COLORS, FONT, SIZES, SHADOWS };
