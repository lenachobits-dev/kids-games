/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true }, // чтобы PWA/статик работали без внешних оптимизаторов
};
export default nextConfig;
