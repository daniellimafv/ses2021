const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const config     = require('config');
const consign    = require('consign');
/*const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');*/

module.exports = () => {
  const app = express();

/*  const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://dev-ses21.eu.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'https://dev-ses21.eu.auth0.com/api/v2/',
    issuer: [`https://dev-ses21.eu.auth0.com/`],
    algorithms: ['RS256']
  });*/
  
  app.use(cors())
  /*app.use(checkJwt)*/

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  // MIDDLEWARES
  app.use(bodyParser.json());

  //require('../api/routes/RoUsers')(app);

  // ENDPOINTS
  consign({cwd: 'api'})
  .then('data')
  .then('controllers')
  .then('routes')
  .into(app);

  return app;
};