import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add allowed quality values
    qualities: [75, 90],
    
    // Other image configurations
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    
    // Allow local images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },
  
  // Allow network access (for development)
  allowedDevOrigins: ['192.168.100.11', 'localhost', '127.0.0.1'],
};

export default nextConfig;