/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/products/**",
      },
      {
        protocol: "https",
        hostname: "https://week10-assignment-five.vercel.app",
        pathname: "/products/**",
      },
    ],
  },
};

export default nextConfig;
