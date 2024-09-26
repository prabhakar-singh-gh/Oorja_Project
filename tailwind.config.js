/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 
  plugins: [
    require("tailwindcss-animate"), // Existing animate plugin
    require("@tailwindcss/line-clamp"), // Added line-clamp plugin
  ],
  theme: {
  	extend: {
  		colors: {
			'custom-green' : ' #48A244',
			'custom-blue' : '  #4493A22E',
			'custom-green1' : ' #8CC58A',
			'custom-nav' :'#EDF9EC',
  			'custom-gray': '#FAFAFA',
  			'custom-gray1': '#F4F4F4',
  			'custom-black': '#2D2931',
  			'text-color': '#9D9D9D',
  			'text-color2': '#676767',
  			'text-colorRed': ' #EB5627',
  			'btn-color': '#E5E5E5',
			'background-color' :'#F9F9F9',
			'background-color1' :'#F9FFFA',
			'background-color2' :'#F0F0F0',
			'background-color3' :'#EEEEEE',
			'bg-btn':'#F6F6F6',
			'custom-gray2' :' #AEAEAE',
			'custom-gray3' :' #787878',
			'custom-border' :' #D7D7D7',
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
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	fontFamily: {
  		inter: ['Inter', 'sans-serif']
  	},
  	fontSize: {
  		'24px': '24px'
  	},
  	lineHeight: {
  		'29px': '29.05px'
  	}
  },
}