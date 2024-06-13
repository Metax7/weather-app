/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images3.alphacoders.com", "cdn.weatherapi.com"],
  },
  env: {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  },
};

export default nextConfig;
