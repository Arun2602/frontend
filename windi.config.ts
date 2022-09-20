import { defineConfig } from 'windicss/helpers';

export default defineConfig({
	darkMode: 'class',
	preflight: true,
	theme: {
		extend: {
			backgroundImage: {
				banner: "url('/assets/images/banner_bg.png')",
				blue: "url('/assets/images/blue_bg.png')"
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif']
			}
		}
	},
	plugins: []
});
