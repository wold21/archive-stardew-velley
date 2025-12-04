import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            screens: {
                xs: '320px',
                sm: '430px',
                md: '744px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1600px',
            },
            backgroundImage: {
                forest: "url('/assets/images/main-lg.jpg')",
                lightwood: "url('/assets/images/lightWood.svg')",
                brownwood: "url('/assets/images/brownWood.svg')",
                'box-background': 'linear-gradient(to bottom, #e2985f, #f3be6d, #e2985f)',
            },
            fontFamily: {
                esamanru: ['Esamanru', 'sans-serif'],
                stardew: ['Stardew-Valley', 'sans-serif'],
                neodgm: ['neodgm', 'sans-serif'],
            },
        },
    },
    plugins: [
        function ({ matchUtilities }: { matchUtilities: any }) {
            matchUtilities(
                {
                    'text-shadow': (value: string) => ({
                        textShadow: value,
                    }),
                },
                {
                    values: {
                        DEFAULT: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                        sm: '-1px 1px 1px rgba(0, 0, 0, 0.4)',
                    },
                }
            );
        },
    ],
};

export default config;
