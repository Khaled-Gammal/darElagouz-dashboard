/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{js,jsx}',
	  './components/**/*.{js,jsx}',
	  './app/**/*.{js,jsx}',
	  './src/**/*.{js,jsx}',
	],
	prefix: "",
	theme: {
		fontFamily: {
			sans: ['var(--font-inter)'],
			mono: ['var(--font-roboto-mono)'],
		  },
	  container: {
		center: true,
		padding: "2rem",
		screens: {
		  "2xl": "1400px",
		},
		margin: 'auto',
	  },
	  extend: {
		colors: {
		  gray: {
			100:"#E7E4E899" ,
			200:"#D9D9D969",
			300: "#B1B1B1",
			400:"#8D8D8D" ,
			500: "#56555CCC",
			600:"#808080" ,
			700: "#5B5B5B",
		  },
		  'black-blue':{
			100:"#667085"
		  },
		  gold:"#BF9E5C",
		  green:"#29B84F",
		  "white-table": "#F7F7F7",
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
		  text: {
			xs: "12px",
  
		  },
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
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
		  pulse: {
			'0%, 100%': { opacity: 1 },
			'50%': { opacity: 0.5 },
		  },
		  slideRight: {
			'0%': { transform: 'translateX(0)' },
			'50%': { transform: 'translateX(5px)' },
			'100%': { transform: 'translateX(0)' },
		  },
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		  'pulse-slow': 'pulse 1.5s infinite',
		  'slideRight': "slideRight 0.8s infinite ease-in-out",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }