const express = require('express');

const cors = require('cors');

const morgan = require('morgan');

const swaggerExpress = require('swagger-ui-express');

const swaggerJsDoc = require('swagger-jsdoc');

const userController = require('./endpoints/userController');

const authController = require('./endpoints/authController');

const contactController = require('./endpoints/contactController');

const app = express();

app.use(express.json());

app.use(morgan('tiny'));

app.use(cors());

app.use('/api/v1/users', userController);

app.use('/api/v1/auth', authController);

app.use('/api/v1/contacts', contactController);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Name',
            version: '1.0.0',
            description: 'API Description',
        },
    },
    apis: ['./swagger/swagger'], // Replace this with the path to your API routes
};

const swaggerSpec = swaggerJsDoc(options);

app.use('/api-docs', swaggerExpress.serve, swaggerExpress.setup(swaggerSpec));

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.listen(3000, () => {
    console.log('phone book backend app is running on 3000');
});