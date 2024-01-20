/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@shur/ui"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};
