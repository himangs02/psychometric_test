/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/career',
        destination: '/',
        permanent: false,
      },
      {
        source: '/career/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/careers',
        destination: '/',
        permanent: false,
      },
      {
        source: '/careers/:path*',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
