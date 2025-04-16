module.exports = {
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				tls: false,
				net: false,
				fs: false,
			};
		}
		return config;
	},
};