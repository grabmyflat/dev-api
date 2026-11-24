const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GrabMyFlat API',
      version: '1.0.0',
      description: 'GrabMyFlat API Documentation'
    },
    servers: [
      {
        url: 'https://api.grabmyflat.com'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
