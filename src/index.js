import OpenAI from 'openai';

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const openai = new OpenAI({ 
			apiKey: env.OPENAI_API_KEY 
		});
		
		try {

			// const chatCompletion = await openai.chat.completions.create({
			// 	model: "gpt-3.5-turbo",
			// 	messages: [{ role: "user", content: "Should I trust stock predictions from Dodgy Dave?" }],
			// 	temperature: 1.1,
			// 	presence_penalty: 0,
			// 	frequency_penalty: 0
			// });

			// const response = chatCompletion.choices[0].message.content;
			// return new Response(JSON.stringify(response), {
			// 	headers: { 'content-type': 'application/json' },
			// });

			const url = "https://openai-api-worker.guil-9d2.workers.dev";

			const response = await this.fetch(url, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: ''
			});

			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error(`Error: ${error.message}`);
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
				headers: { 'content-type': 'application/json' },
			});
		}
	},
};
