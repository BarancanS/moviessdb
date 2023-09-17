/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "assets.vogue.com",
      "m.media-amazon.com",
      "upload.wikimedia.org",
      "images-na.ssl-images-amazon.com",
      "ia.media-imdb.com",
      "images.moviesanywhere.com",
      "image.tmdb.org",
    ],
  },
};

module.exports = nextConfig;
