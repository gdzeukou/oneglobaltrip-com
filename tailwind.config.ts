import type { Config } from "tailwindcss";

/**
 * OGT Tailwind config — Stitch-inspired (ported from Houston Signing Pro).
 * Tokens are driven by CSS variables in src/index.css. Legacy aliases
 * (deep-blue, luxury-*, display-*) are kept and re-mapped to the new Stitch
 * palette so every existing className re-skins automatically.
 */
export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
					50: 'hsl(var(--primary-50) / <alpha-value>)',
					100: 'hsl(var(--primary-100) / <alpha-value>)',
					200: 'hsl(var(--primary-200) / <alpha-value>)',
					300: 'hsl(var(--primary-300) / <alpha-value>)',
					400: 'hsl(var(--primary-400) / <alpha-value>)',
					500: 'hsl(var(--primary-500) / <alpha-value>)',
					600: 'hsl(var(--primary-600) / <alpha-value>)',
					700: 'hsl(var(--primary-700) / <alpha-value>)',
					800: 'hsl(var(--primary-800) / <alpha-value>)',
					900: 'hsl(var(--primary-900) / <alpha-value>)',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
					hover: 'hsl(var(--accent-hover) / <alpha-value>)',
					50: 'hsl(var(--accent-50) / <alpha-value>)',
					100: 'hsl(var(--accent-100) / <alpha-value>)',
					200: 'hsl(var(--accent-200) / <alpha-value>)',
					300: 'hsl(var(--accent-300) / <alpha-value>)',
					400: 'hsl(var(--accent-400) / <alpha-value>)',
					500: 'hsl(var(--accent-500) / <alpha-value>)',
					600: 'hsl(var(--accent-600) / <alpha-value>)',
					700: 'hsl(var(--accent-700) / <alpha-value>)',
					800: 'hsl(var(--accent-800) / <alpha-value>)',
					900: 'hsl(var(--accent-900) / <alpha-value>)',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
					border: 'hsl(var(--card-border) / <alpha-value>)',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background) / <alpha-value>)',
					foreground: 'hsl(var(--sidebar-foreground) / <alpha-value>)',
					primary: 'hsl(var(--sidebar-primary) / <alpha-value>)',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground) / <alpha-value>)',
					accent: 'hsl(var(--sidebar-accent) / <alpha-value>)',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground) / <alpha-value>)',
					border: 'hsl(var(--sidebar-border) / <alpha-value>)',
					ring: 'hsl(var(--sidebar-ring) / <alpha-value>)'
				},
				chart: {
					'1': 'hsl(var(--chart-1) / <alpha-value>)',
					'2': 'hsl(var(--chart-2) / <alpha-value>)',
					'3': 'hsl(var(--chart-3) / <alpha-value>)',
					'4': 'hsl(var(--chart-4) / <alpha-value>)',
					'5': 'hsl(var(--chart-5) / <alpha-value>)',
				},
				status: {
					online: 'rgb(34 197 94)',
					away: 'rgb(245 158 11)',
					busy: 'rgb(239 68 68)',
					offline: 'rgb(156 163 175)',
				},
				/* Stitch verified-green badge color */
				'verified-green': {
					DEFAULT: 'hsl(var(--verified-green) / <alpha-value>)',
					foreground: 'hsl(var(--verified-green-foreground) / <alpha-value>)',
				},
				/* Legacy alias — every `bg-deep-blue-*`, `text-deep-blue-*`
				   on existing OGT pages now renders as Stitch navy */
				'deep-blue': {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					50:  'hsl(var(--primary-50) / <alpha-value>)',
					100: 'hsl(var(--primary-100) / <alpha-value>)',
					200: 'hsl(var(--primary-200) / <alpha-value>)',
					300: 'hsl(var(--primary-300) / <alpha-value>)',
					400: 'hsl(var(--primary-400) / <alpha-value>)',
					500: 'hsl(var(--primary-500) / <alpha-value>)',
					600: 'hsl(var(--primary-600) / <alpha-value>)',
					700: 'hsl(var(--primary-700) / <alpha-value>)',
					800: 'hsl(var(--primary-800) / <alpha-value>)',
					900: 'hsl(var(--primary-900) / <alpha-value>)',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',                            /* 9px Stitch */
				md: 'calc(var(--radius) - 0.1875rem)',          /* 6px */
				sm: 'calc(var(--radius) - 0.375rem)'            /* 3px */
			},
			fontFamily: {
				sans: ['var(--font-sans)'],
				serif: ['var(--font-serif)'],
				mono: ['var(--font-mono)'],
				display: ['var(--font-serif)'],
			},
			fontSize: {
				/* Tightened display scale to match Stitch geometry — no longer
				   the 5–6rem luxury extremes; legacy class names still resolve. */
				'display-xl': ['4.5rem',  { lineHeight: '1',    letterSpacing: '-0.03em' }],
				'display-lg': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
				'display-md': ['3rem',    { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
				'display-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
				'luxury-xl':  ['5rem',    { lineHeight: '0.95', letterSpacing: '-0.03em' }],
				'luxury-lg':  ['4rem',    { lineHeight: '1',    letterSpacing: '-0.025em' }],
				'luxury-md':  ['3.25rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
				'luxury-sm':  ['2.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
			},
			perspective: {
				'500': '500px',
				'1000': '1000px',
				'1500': '1500px',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in-up': {
					'0%':   { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%':   { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%':      { transform: 'translateY(-6px)' }
				},
				'glow': {
					'0%, 100%': { opacity: '0.6' },
					'50%':      { opacity: '1' }
				},
				'shimmer': {
					'0%':   { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up':   'accordion-up 0.2s ease-out',
				'fade-in-up':     'fade-in-up 0.6s ease-out forwards',
				'scale-in':       'scale-in 0.5s ease-out forwards',
				'float':          'float 3s ease-in-out infinite',
				'glow':           'glow 2.4s ease-in-out infinite',
				'shimmer':        'shimmer 2s linear infinite',
			},
			boxShadow: {
				'luxury':       'var(--luxury-shadow)',
				'luxury-lg':    'var(--luxury-shadow-lg)',
				'luxury-xl':    'var(--luxury-shadow-lg)',
				'premium':      'var(--luxury-shadow)',
				'premium-hover':'var(--shadow-card-hover)',
				'glass':        'var(--luxury-shadow)',
				'glow':         'var(--shadow-glow)',
				'travel-card':  'var(--shadow-travel-card)',
				'travel-card-hover': 'var(--shadow-travel-card-hover)',
			},
			transitionDuration: {
				'600': '600ms',
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
