const conf = {
    apiUrlPrefix: 'https://api-gateway.psu.ac.th/Test',
    urlPrefix: 'https://api-gateway.psu.ac.th',
    loginEndpoint: '/auth/local',
    registerEndpoint: '/auth/local/register',
    jwtUserEndpoint: '/users/me?populate=role&&populate=image&&populate=login_streak',
    jwtSessionStorageKey: 'auth.jwt',
}

export default conf;