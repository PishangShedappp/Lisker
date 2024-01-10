/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    output: 'export',
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
