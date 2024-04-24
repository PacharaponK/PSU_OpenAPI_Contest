const conf = {
    urlPrefix: 'http://localhost:1337',
    clientPreflix: 'http://localhost:3000',
    loginEndpoint: '/auth/local',
    registerEndpoint: '/auth/local/register',
    jwtUserEndpoint: '/users/me?populate=role&&populate=image&&populate=login_streak',
    jwtSessionStorageKey: 'auth.jwt',
}

export default conf;