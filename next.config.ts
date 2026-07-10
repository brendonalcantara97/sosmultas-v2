import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/termos-de-uso.html",
        destination: "/termos-de-uso",
        permanent: true,
      },
      {
        source: "/privacidade.html",
        destination: "/privacidade",
        permanent: true,
      },
      {
        source: "/como-funciona.html",
        destination: "/como-funciona",
        permanent: true,
      },
      {
        source: "/locais.html",
        destination: "/locais",
        permanent: true,
      },
      {
        source: "/unidades.html",
        destination: "/unidades",
        permanent: true,
      },
      {
        source: "/porto-alegre.html",
        destination: "/porto-alegre",
        permanent: true,
      },
      {
        source: "/capao-da-canoa.html",
        destination: "/capao-da-canoa",
        permanent: true,
      },
      {
        source: "/politica-de-privacidade",
        destination: "/privacidade",
        permanent: true,
      },
      {
        source: "/politica-de-privacidade/",
        destination: "/privacidade",
        permanent: true,
      },
      {
        source: "/caxias-do-sul",
        destination: "/unidades",
        permanent: true,
      },
      {
        source: "/caxias-do-sul/",
        destination: "/unidades",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
