/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ hostname: 'i-invdn-com.investing.com' },
			{ hostname: 'lh3.googleusercontent.com' },
			{ hostname: 'media.cnn.com' },
			{ hostname: 'image.cnbcfm.com' },
		],
	}
};

export default nextConfig;
