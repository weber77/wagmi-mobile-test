const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    maxWidth: {
      '9xl':'1700px',
      '8xl': '1400px',
      '6xxl':'1402px',
      '6bxl':'1320px',
      '6xl': '1260px',
      '5xxl':' 1180px',
      '5mx':'1350px',
      '5xl': '1300px',
      '4xxl':'1260px',
      '4xl': '1100px',
      '3xl': '1090px',
      'xl': '680px'
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "1xl":"375px",
        "2xl": "1400px",
        "4xl": "2560px",
        "6xl": "4096px",
        
      },
    },
    fontSize: {
      ssm:'0.70rem',
      m:'0.75rem',
      mm:'0.83rem',
      sm: '0.87rem',
      md: '0.95rem',
      base: '1rem',
      xl: '1.25rem',
      xxl:'1.4rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '8vw',
      '6xl':'2.5rem',
      '7xl':'3rem',
      '8xl': '3.5rem',
      '10xl': '9.5rem',
    },
    extend: {
      transitionDuration: {
        '3000': '3000ms',
      },
      boxShadow: {
        'custom': '0px 4px 25px 0px #22FFBF24'
      },
      fontFamily: {
        'anton': ['Anton', 'sans-serif'],
        'worksans': ['"Work Sans"', 'sans-serif'],
        'latin': ['Inter','sans-serif'],
        'lato' :['Lato','sans-serif']
      },
      backgroundImage: {
        'custom-gradient': "linear-gradient(to right bottom, #fff 30%, hsla(0, 0%, 100%, 0.5))",
        'custom-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.02)'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E\")",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        "paalBackground":"#100725",
        "colorAI":"#aa54df",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        'slide-in-out': {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '50%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 },
        },
        slideIn: {
          from: { opacity: 0, transform: 'translateY(-30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideOut: {
          from: { opacity: 1, transform: 'translateY(0)' },
          to: { opacity: 0, transform: 'translateY(-30px)' },
        },

        slideContent: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        scroll: {
          to: {
            transform: "translate(calc(-30% - 0.5rem))",
          },
          shimmer: {
            from: {
              "backgroundPosition": "0 0"
            },
            to: {
              "backgroundPosition": "-200% 0"
            }
          },
          spotlight: {
            "0%": {
              opacity: 0,
              transform: "translate(-72%, -62%) scale(0.5)",
            },
            "100%": {
              opacity: 1,
              transform: "translate(-50%,-40%) scale(1)",
            },
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'slide-out': 'slideOut 0.3s ease-out forwards',
        'slide-in-out': 'slide-in-out 3s ease-in-out forwards',
        shimmer: "shimmer 2s linear infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        slideDown: "slideContent 0.7s ease-out",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
    },
  },
  variants: {
    extend: {
      padding: ['1xl'], // Adiciona a variante mobile para padding
    },
  },
  plugins: [require("tailwindcss-animate"),
  addVariablesForColors,
  ],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}