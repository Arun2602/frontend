/** @type {import('vite').UserConfig} */

import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";
import { dependencies } from "./package.json";

const globalVendorPackages = ["react", "react-dom", "react-router-dom", "keen-slider", "react-hook-form"];

function renderChunks(deps: Record<string, string>) {
	const chunks = {};
	Object.keys(deps).forEach(key => {
		if (globalVendorPackages.includes(key)) return;
		chunks[key] = [key];
	});
	return chunks;
}

export default defineConfig(option => ({
	plugins: [react(), WindiCSS()],
	json: {
		stringify: true
	},
	resolve: {
		alias: {
			"~": resolve(__dirname, "./src")
		}
	},
	server: { port: 3001 },
	build: {
		cssCodeSplit: false,
		sourcemap: option.mode === "development",
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: globalVendorPackages,
					...renderChunks(dependencies)
				}
			}
		}
	}
}));
