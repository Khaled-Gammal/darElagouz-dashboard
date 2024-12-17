/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'sadakatcdn.cyparta.com',
          pathname: '/**', // Allows all paths under the domain
        },
        {
          protocol: 'https',
          hostname: 'via.placeholder.com',
          pathname: '/**', // Allows all paths under the domain
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3000', // Specify the port for localhost, if applicable
          pathname: '/**', // Allows all paths
        },
        {
          protocol: 'http',
          hostname: '192.168.88.95',
          port: '8000', // Specify the port for the IP address
          pathname: '/**', // Allows all paths
        },
      ],
    },
  };
  
  export default nextConfig;