
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
					DEFAULT: '#0066FF',
					foreground: 'hsl(var(--primary-foreground))',
					50: '#E6F0FF',
					100: '#CCE1FF',
					500: '#0066FF',
					600: '#0052CC',
					700: '#003D99'
				},
				secondary: {
					DEFAULT: '#00C2FF',
					foreground: 'hsl(var(--secondary-foreground))',
					50: '#E6F9FF',
					100: '#CCF3FF',
					500: '#00C2FF',
					600: '#009BCC',
					700: '#007399'
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
				// Enhanced high-tech color palette
				'tech-blue': {
					DEFAULT: '#0066FF',
					50: '#E6F0FF',
					100: '#CCE1FF',
					500: '#0066FF',
					600: '#0052CC',
					700: '#003D99',
					800: '#002966',
					900: '#001A33'
				},
				'tech-cyan': {
					DEFAULT: '#00C2FF',
					50: '#E6F9FF',
					100: '#CCF3FF',
					500: '#00C2FF',
					600: '#009BCC',
					700: '#007399'
				},
				'neon-accent': '#00FF88',
				'glass-white': 'rgba(255, 255, 255, 0.1)',
				'glass-dark': 'rgba(0, 0, 0, 0.1)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				// High-tech specific radius values
				'button': '12px',
				'card': '16px',
				'pill': '999px'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				'space-grotesk': ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				'display-xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
				'display-lg': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
				'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.5s ease-out forwards',
				'pulse-glow': 'pulse-glow 2s cubic-bezier(0.25, 0.8, 0.25, 1) infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'neon-underline': 'neon-underline 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) forwards',
				'card-hover': 'card-hover 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
				'button-lift': 'button-lift 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
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
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 5px rgba(0, 102, 255, 0.5)',
					},
					'50%': {
						boxShadow: '0 0 20px rgba(0, 102, 255, 0.8), 0 0 30px rgba(0, 194, 255, 0.4)',
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
				'neon-underline': {
					'0%': {
						width: '0%',
						left: '0%'
					},
					'100%': {
						width: '100%',
						left: '0%'
					}
				},
				'card-hover': {
					'0%': {
						transform: 'translateY(0) rotateX(0) rotateY(0)',
						boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
					},
					'100%': {
						transform: 'translateY(-2px) rotateX(2deg) rotateY(1deg)',
						boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
					}
				},
				'button-lift': {
					'0%': {
						transform: 'translateY(0)',
						boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
					},
					'100%': {
						transform: 'translateY(-2px)',
						boxShadow: '0 12px 20px -5px rgba(0, 0, 0, 0.15)'
					}
				}
			},
			boxShadow: {
				'premium': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
				'premium-hover': '0 32px 64px -12px rgba(0, 0, 0, 0.25)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
				'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
				'neon': '0 0 5px rgba(0, 255, 136, 0.5), 0 0 20px rgba(0, 255, 136, 0.3)',
				'elevation-1': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				'elevation-2': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'elevation-3': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'elevation-4': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
			},
			backdropBlur: {
				'glass': '16px',
			},
			transitionTimingFunction: {
				'tech': 'cubic-bezier(0.25, 0.8, 0.25, 1)',
			}
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
