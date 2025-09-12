import config from 'auth_config.json';

const {
  domain,
  clientId,
  authorizationParams: { audience },
  apiUri,
  errorPath,
} = config as {
  domain: string;
  clientId: string;
  authorizationParams: {
    audience?: string;
  };
  apiUri: string;
  errorPath: string;
};

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    authorizationParams: {
      ...(audience &&
      audience !== 'https://dev-nmbylzh4wid0l5sy.us.auth0.com/api/v2/'
        ? { audience }
        : null),
      redirect_uri: window.location.origin,
    },
    errorPath,
  },
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  },
};
