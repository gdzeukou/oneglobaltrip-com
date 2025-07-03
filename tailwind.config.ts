import type { Config } from "tailwindcss";

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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Streamlined brand colors
				'deep-blue': {
					DEFAULT: 'hsl(214, 100%, 12%)',
					800: 'hsl(214, 100%, 15%)',
					900: 'hsl(214, 100%, 12%)',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				serif: ['Playfair Display', 'Georgia', 'serif'],
				display: ['Playfair Display', 'Georgia', 'serif'],
			},
			fontSize: {
				'display-xl': ['5rem', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
				'display-lg': ['4rem', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
				'display-md': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
				'display-sm': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'luxury-xl': ['6rem', { lineHeight: '0.85', letterSpacing: '-0.035em' }],
				'luxury-lg': ['5rem', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
				'luxury-md': ['4rem', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
				'luxury-sm': ['3rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
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
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { opacity: '0.5' },
					'50%': { opacity: '1' }
				},
				'tilt': {
					'0%': { transform: 'rotateY(0deg)' },
					'25%': { transform: 'rotateY(1deg)' },
					'75%': { transform: 'rotateY(-1deg)' },
					'100%': { transform: 'rotateY(0deg)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.5s ease-out forwards',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'tilt': 'tilt 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
			},
			boxShadow: {
				'luxury': 'var(--luxury-shadow)',
				'luxury-lg': 'var(--luxury-shadow-lg)',
				'luxury-xl': '0 45px 90px -20px hsl(var(--primary) / 0.3)',
				'premium': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
				'premium-hover': '0 32px 64px -12px rgba(0, 0, 0, 0.25)',
				'glass': '0 8px 32px 0 rgba(255, 255, 255, 0.1)',
				'glow': '0 0 40px hsl(var(--accent) / 0.3)',
			},
			transitionDuration: {
				'600': '600ms',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
