/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'inter': ['"Inter"', 'sans-serif'],
		  },
		colors: {
			"primary":{
				light: "rgba(0, 106, 245, 1)",
				dark: "rgba(12, 108, 233, 1)"
			},
			base: {
				light: "rgba(255, 255, 255, 1)",
				dark: "rgba(34, 51, 72, 1)"
			},
			icon: {
				light: "rgba(97, 109, 124, 1)",
				dark: "rgba(228, 239, 252, 1)"
			}
		},
		extend: {
			strokeWidth: {
				'3': '3',
			},
		},
	},
	plugins: [],
}
