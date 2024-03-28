export const images = {
  domains: ['res.cloudinary.com'],
};

export function webpack(config) {
  config.module.rules.push({
    test: /\.svg$/,
    use: ["@svgr/webpack"]
  });

  return config;
}
