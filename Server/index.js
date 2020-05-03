const mongoose = require('mongoose');
const express = require('express');
const cors= require('cors')
const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT;

const app = express();
app.use(cors());

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/goodReadsDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(!err) console.log("Started connection to mongo");
    else console.log(err);
});

app.listen(PORT, (err) => {
    
    if(!err) console.log(`App Started on port: ${PORT}`);
    
});