const express = require('express');
const mongodb = require('./data/contacts'); 
const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`The database is running on port ${port}`)});
    }
}); 