import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            backgroundColor: {
                '#778da9': '#778da9',
                '#4a4e69': '#4a4e69',
                '#6a0572': '#6a0572',
                '#1b98e0': '#1b98e0',
                '#e0f7fa': '#e0f7fa',
                '#9e9d89': '#9e9d89',
                '#f0c929': '#f0c929',
            },
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                raindrop: {
                    '0%': {
                        top: '-50px',
                        transform: 'translate3d(40px, 0, 0) scaleX(1) scaleY(1) rotate(17deg)',
                        opacity: '1',
                    },
                    '85%': {
                        top: 'calc(100% - 5px)',
                        transform: 'translate3d(0, 0, 0) scaleX(1) scaleY(1) rotate(17deg)',
                        opacity: '1',
                    },
                    '100%': {
                        top: 'calc(100% - 5px)',
                        transform: 'translate3d(0, 0, 0) scaleX(3) scaleY(0) rotate(0deg)',
                        opacity: '0',
                    },
                },
                lightning: {
                    '0%': {
                        opacity: '0',
                        clipPath: 'inset(100% 0 0 0)',
                        filter: 'brightness(1)',
                    },
                    '2%': {
                        opacity: '1',
                        clipPath: 'inset(0% 0 0% 0)',
                        filter: 'brightness(3)',
                    },
                    '3%': {
                        opacity: '0.9',
                        clipPath: 'inset(0% 0 0% 0)',
                        filter: 'brightness(2.5)',
                    },
                    '4%': {
                        opacity: '1',
                        clipPath: 'inset(0% 0 0% 0)',
                        filter: 'brightness(3.5)',
                    },
                    '5%': {
                        opacity: '0.7',
                        clipPath: 'inset(0% 0 0% 0)',
                        filter: 'brightness(2)',
                    },
                    '6%': {
                        opacity: '0',
                        clipPath: 'inset(0% 0 100% 0)',
                        filter: 'brightness(1)',
                    },
                    '100%': {
                        opacity: '0',
                        clipPath: 'inset(0% 0 100% 0)',
                        filter: 'brightness(1)',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                raindrop: 'raindrop 1s linear infinite',
                lightning: 'lightning 4s ease-in-out infinite',
            },
            fontFamily: {
                sans: ['var(--font-sans)', ...fontFamily.sans],
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
