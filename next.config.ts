import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
  },
  async redirects() {
    return [
      {
        source: "/lead",
        destination:
          "https://script.google.com/macros/s/AKfycbxlPtT64oW3Wh8TcRy6LR9lFtHvg0BqBNbIYZGFYYokms6RVsbUTIF8K4RnWQ7KzV-p/exec?source=seropcomp-lead",
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
