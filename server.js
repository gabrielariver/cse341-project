const express = require('express');
const mongodb = require('./data/contacts'); 
const app = express();



const port = process.env.PORT || 3000;
app.use(express.json());

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        const swaggerUi = require('swagger-ui-express');
        const swaggerFile = require('./swagger.json');
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
        app.listen(port, () => { console.log(`The database is running on port ${port}`) });
    }
});