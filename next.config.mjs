const nextConfig = {
  output: 'standalone',
  experimental: {
    agentUpgrade: 'security'
  },
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
    ,{ protocol: 'https', hostname: 'northernestflooring.ca' }
    ,{ protocol: 'https', hostname: 'grandeurflooring.ca', pathname: '/images/products-collections/**', search: '' }
    ,{ protocol: 'https', hostname: 'grandeurflooring.ca', pathname: '/images/products/thumb/**', search: '' }
    ,{ protocol: 'https', hostname: 'simbaflooringcorp.com', pathname: '/wp-content/uploads/2024/01/**', search: '' }
    ,{ protocol: 'https', hostname: 'simbaflooringcorp.com', pathname: '/wp-content/uploads/2022/03/**', search: '' }
    ,{ protocol: 'https', hostname: 'simbaflooringcorp.com', pathname: '/wp-content/uploads/2024/12/**', search: '' }
    ,{ protocol: 'https', hostname: 'simbaflooringcorp.com', pathname: '/wp-content/uploads/2026/08/**', search: '' }
    ,{ protocol: 'https', hostname: 'simbaflooringcorp.com', pathname: '/wp-content/uploads/2026/10/**', search: '' }
    ,{ protocol: 'https', hostname: 'simbaflooringcorp.com', pathname: '/wp-content/uploads/2021/03/**', search: '' }
    ,{ protocol: 'https', hostname: 'simbaflooringcorp.com', pathname: '/wp-content/uploads/2021/12/**', search: '' }
    ,{ protocol: 'https', hostname: 'img1.wsimg.com', pathname: '/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/**', search: '' }
    ,{ protocol: 'https', hostname: 'static.wixstatic.com', pathname: '/media/d8ccde_*~mv2.jpg/**', search: '' }
    ,{ protocol: 'https', hostname: 'static.wixstatic.com', pathname: '/media/d8ccde_*~mv2.png/**', search: '' }
    ,{ protocol: 'https', hostname: 'static.wixstatic.com', pathname: '/media/084e8e_*~mv2.jpg/**', search: '' }
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
