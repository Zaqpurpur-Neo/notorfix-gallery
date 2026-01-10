import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig(({ command, mode, isPreview }) => {
	const env = loadEnv(mode, process.cwd(), '')
	let target = command === "build" ? env.WORKER_URL : "http://localhost:9980"

	if(isPreview) target = "http://localhost:9980"

	return {
		plugins: [svelte()],
		server: {
			proxy: {
				'/api': {
					target, changeOrigin: true,
					secure: true,
				}
			}
		}
	}
})
