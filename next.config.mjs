/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    '*.replit.dev',
    '*.repl.co',
    '*.kirk.replit.dev',
    '*.sisko.replit.dev',
    '*.spock.replit.dev',
  ],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
