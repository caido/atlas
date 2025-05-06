import tailwindcssCaido from '@caido/tailwindcss';
import tailwindcssPrimeui from 'tailwindcss-primeui';
import typography from '@tailwindcss/typography';   

export default {
    content: [
        "components/**/*.{vue,ts}",
        "pages/**/*.{vue,ts}",
        "./node_modules/@caido/primevue/dist/primevue.mjs"
    ],
    darkMode: ["selector", "[data-mode='dark']"],
    plugins: [
        tailwindcssCaido,
        tailwindcssPrimeui,
        typography
    ]
};