const nextConfig = {
  poweredByHeader: false,
  images: { remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'floorsatwork.com' },
    { protocol: 'https', hostname: 'cdn.shopify.com' },
    { protocol: 'https', hostname: 'toscaflooring.com' }
    ,{ protocol: 'https', hostname: 'vidarflooring.com' }
    ,{ protocol: 'https', hostname: 'www.vidarflooring.com' }
    ,{ protocol: 'https', hostname: 'leeflooring.ca' }
    ,{ protocol: 'https', hostname: 'wickhamhardwood.com' }
  ] },
  async headers() {
    return [{ source: '/(.*)', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' }
    ] }];
  }
};
export default nextConfig;
