import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'grey-0': '#18212f',
  			'grey-50': '#111827',
  			'grey-100': '#1f2937',
  			'grey-200': '#374151',
  			'grey-300': '#4b5563',
  			'grey-400': '#6b7280',
  			'grey-500': '#9ca3af',
  			'grey-600': '#d1d5db',
  			'grey-700': '#e5e7eb',
  			'grey-800': '#f3f4f6',
  			'grey-900': '#f9fafb',
  			'brand-50': '#eef2ff',
  			'brand-100': '#e0e7ff',
  			'brand-200': '#c7d2fe',
  			'brand-500': '#6366f1',
  			'brand-600': '#4f46e5',
  			'brand-700': '#4338ca',
  			'brand-800': '#3730a3',
  			'brand-900': '#312e81',
  			'blue-100': '#075985',
  			'blue-700': '#e0f2fe',
  			'green-100': '#166534',
  			'green-700': '#dcfce7',
  			'yellow-100': '#854d0e',
  			'yellow-700': '#fef9c3',
  			'red-100': '#fee2e2',
  			'red-700': '#b91c1c',
  			'red-800': '#991b1b',
  			'silver-100': '#374151',
  			'silver-700': '#f3f4f6',
  			'indigo-100': '#3730a3',
  			'indigo-700': '#e0e7ff',
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
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
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
  		boxShadow: {
  			sm: '0 1px 2px rgba(0, 0, 0, 0.4)',
  			md: '0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3)',
  			lg: '0 2.4rem 3.2rem rgba(0, 0, 0, 0.4)'
  		},
  		borderRadius: {
  			tiny: '3px',
  			sm: 'calc(var(--radius) - 4px)',
  			md: 'calc(var(--radius) - 2px)',
  			lg: 'var(--radius)'
  		},
  		transitionProperty: {
  			colors: 'background-color, border-color, color, fill, stroke'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
