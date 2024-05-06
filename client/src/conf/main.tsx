const conf = {
    urlPrefix: 'http://localhost:1337',
    categoryUrlPrefix: 'http://localhost:1337/categories',
    clientPreflix: 'http://localhost:3000',
    loginEndpoint: '/auth/login',
    registerEndpoint: '/auth/local/register',
    jwtUserEndpoint: '/members/profile',
    jwtSessionStorageKey: 'auth.jwt',
}

export default conf;