
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
				// Enhanced brand colors - Deep Blue Focus
				navy: {
					700: 'hsl(214, 88%, 20%)',
					800: 'hsl(214, 100%, 15%)',
					900: 'hsl(214, 100%, 12%)',
				},
				'deep-blue': {
					DEFAULT: 'hsl(214, 100%, 12%)',
					50: 'hsl(214, 100%, 97%)',
					100: 'hsl(214, 100%, 94%)',
					200: 'hsl(214, 100%, 87%)',
					300: 'hsl(214, 100%, 78%)',
					400: 'hsl(214, 100%, 65%)',
					500: 'hsl(214, 100%, 50%)',
					600: 'hsl(214, 100%, 35%)',
					700: 'hsl(214, 100%, 25%)',
					800: 'hsl(214, 100%, 15%)',
					900: 'hsl(214, 100%, 12%)',
				},
				blue: {
					DEFAULT: 'hsl(214, 100%, 15%)',
					50: 'hsl(214, 100%, 97%)',
					100: 'hsl(214, 100%, 94%)',
					200: 'hsl(214, 100%, 87%)',
					300: 'hsl(214, 100%, 78%)',
					400: 'hsl(214, 100%, 65%)',
					500: 'hsl(214, 100%, 50%)',
					600: 'hsl(214, 100%, 35%)',
					700: 'hsl(214, 100%, 25%)',
					800: 'hsl(214, 100%, 15%)',
					900: 'hsl(214, 100%, 12%)',
				},
				gold: {
					400: 'hsl(var(--gold-400))',
					500: 'hsl(var(--gold-500))',
					600: 'hsl(var(--gold-600))',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				serif: ['Playfair Display', 'Georgia', 'serif'],
				display: ['Playfair Display', 'Georgia', 'serif'],
			},
			fontSize: {
				'display-xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
				'display-lg': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
				'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(40px) scale(0.98)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)'
					}
				},
				'scale-in-bounce': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.8)'
					},
					'50%': {
						transform: 'scale(1.05)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'float-gentle': {
					'0%, 100%': {
						transform: 'translateY(0px) rotate(0deg)'
					},
					'33%': {
						transform: 'translateY(-8px) rotate(1deg)'
					},
					'66%': {
						transform: 'translateY(-4px) rotate(-1deg)'
					}
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-200% 0'
					},
					'100%': {
						backgroundPosition: '200% 0'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 0 0 rgba(252, 211, 77, 0.4)',
						transform: 'scale(1)'
					},
					'50%': {
						boxShadow: '0 0 0 30px rgba(252, 211, 77, 0)',
						transform: 'scale(1.02)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'scale-in-bounce': 'scale-in-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
				'float-gentle': 'float-gentle 4s ease-in-out infinite',
				'shimmer': 'shimmer 1.5s infinite',
				'pulse-glow': 'pulse-glow 2s infinite',
			},
			backdropBlur: {
				xs: '2px',
			},
			boxShadow: {
				'premium': '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
				'premium-hover': '0 32px 64px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
				'glow': '0 0 20px rgba(252, 211, 77, 0.3)',
				'glow-lg': '0 0 40px rgba(252, 211, 77, 0.4)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E\")",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
