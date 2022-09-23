module.exports = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"]
		});

		return config;
	},
	env: {
		SERVER: process.env.SERVER_URL,
	},
	api: {
		bodyParser: true,
	},
	images: {
		domains: [
			'imdb-api.com',
			'mosaic.scdn.co',
			"m.media-amazon.com"
		],
	},
};