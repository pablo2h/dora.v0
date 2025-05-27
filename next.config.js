/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals = [...(config.externals || []), {
            'mercadopago': 'MercadoPago'
        }];
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.mercadopago.com',
                port: '',
                pathname: '/**',
            },
        ],
    }
}

module.exports = nextConfig