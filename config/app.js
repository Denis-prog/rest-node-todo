module.exports = {
    PORT: 4000,
    MONGO_URL: 'mongodb+srv://dbadmin:643764107@cluster0-bwwos.mongodb.net/todoDB?retryWrites=true&w=majority',
    jwt: {
        jwtKey: 'fgfhgherrttyuyiujk',
        tokens: {
            access: {
                type: 'access',
                expiresIn: '200m',
            },
            refresh: {
                type: 'refresh',
                expiresIn: '3m',
            },
        },
    },
};
