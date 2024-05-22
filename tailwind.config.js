const { hairlineWidth } = require("nativewind/theme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderWidth: {
				hairline: hairlineWidth(),
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			fontFamily: {
				interbolditalic: "Inter-BoldItalic",
				interblack: "Inter-Black",
				interblackitalic: "Inter-BlackItalic",
				interextrabold: "Inter-ExtraBold",
				interextrabolditalic: "Inter-ExtraBoldItalic",
				interextralight: "Inter-ExtraLight",
				interitalic: "Inter-Italic",
				interlightitalic: "Inter-LightItalic",
				intermediumitalic: "Inter-MediumItalic",
				interregular: "Inter-Regular",
				intersemibold: "Inter-SemiBold",
				interthinitalic: "Inter-ThinItalic",
				interbold: "Inter-Bold",
				interextralightitalic: "Inter-ExtraLightItalic",
				interlight: "Inter-Light",
				intermedium: "Inter-Medium",
				intersemibolditalic: "Inter-SemiBoldItalic",
				interthin: "Inter-Thin",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}
