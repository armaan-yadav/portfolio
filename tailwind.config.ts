/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class",], // Enable dark mode based on the 'class' strategy
  theme: {
  	extend: {
  		colors: {
  			black: '#121212',
  			light: '#f5f5f5',
  			dark: '#181818',
  			primary: {
  				light: '#1a73e8',
  				dark: '#8ab4f8',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			text: {
  				light: '#333',
  				dark: '#e5e5e5'
  			},
  			codeBg: {
  				light: '#f0f0f0',
  				dark: '#1e1e1e'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		typography: '(theme: any) => ({\r\n        DEFAULT: {\r\n          css: {\r\n            color: theme("colors.text.light"), // Default text color\r\n            a: {\r\n              color: theme("colors.primary.light"),\r\n              "&:hover": {\r\n                color: theme("colors.primary.dark"),\r\n              },\r\n            },\r\n            h1: { color: theme("colors.text.light") },\r\n            h2: { color: theme("colors.text.light") },\r\n            h3: { color: theme("colors.text.light") },\r\n            blockquote: {\r\n              color: theme("colors.text.light"),\r\n              borderLeftColor: theme("colors.primary.light"),\r\n            },\r\n            code: {\r\n              color: theme("colors.primary.light"),\r\n              backgroundColor: theme("colors.codeBg.light"),\r\n              padding: "2px 4px",\r\n              borderRadius: "4px",\r\n            },\r\n            "code::before": false,\r\n            "code::after": false,\r\n            pre: {\r\n              backgroundColor: theme("colors.codeBg.light"),\r\n              color: theme("colors.text.light"),\r\n              borderRadius: "8px",\r\n              padding: "1rem",\r\n              overflowX: "auto", // Horizontal scroll if content is too long\r\n            },\r\n          },\r\n        },\r\n        dark: {\r\n          css: {\r\n            color: theme("colors.text.dark"), // Dark mode text color\r\n            a: {\r\n              color: theme("colors.primary.dark"),\r\n              "&:hover": {\r\n                color: theme("colors.primary.light"),\r\n              },\r\n            },\r\n            h1: { color: theme("colors.text.dark") },\r\n            h2: { color: theme("colors.text.dark") },\r\n            h3: { color: theme("colors.text.dark") },\r\n            h4: { color: theme("colors.text.dark") },\r\n            strong: { color: theme("colors.text.dark") },\r\n            blockquote: {\r\n              color: theme("colors.text.dark"),\r\n              borderLeftColor: theme("colors.primary.dark"),\r\n            },\r\n            code: {\r\n              color: theme("colors.primary.dark"),\r\n              backgroundColor: theme("colors.codeBg.dark"),\r\n              padding: "2px 4px",\r\n              borderRadius: "4px",\r\n              overflowX: "auto",\r\n            },\r\n            "code::before": false,\r\n            "code::after": false,\r\n            pre: {\r\n              backgroundColor: theme("colors.codeBg.dark"),\r\n              color: theme("colors.text.dark"),\r\n              borderRadius: "8px",\r\n              padding: "1rem",\r\n              overflowX: "auto",\r\n            },\r\n          },\r\n        },\r\n      })',
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")], // Use typography plugin for styling blog content
};
