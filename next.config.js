/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals = [...(config.externals || []), {
            'mercadopago': 'MercadoPago'
        }];
        return config;
    },
    images: {
        domains: ['www.mercadopago.com'],
    }
}

module.exports = nextConfig