module.exports = {
    clientUrl: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000',
    serverUrl: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080',
    serverApiUrl: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080/api',
    publicDir: '/',
};
