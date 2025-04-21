module.exports = {
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				tls: false,
				net: false,
				fs: false,
				child_process: false, // Added to resolve the error
			};
		}
		return config;
	},
};