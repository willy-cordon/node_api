const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapi', {
    useUnifiedTopology:true,
    useNewUrlParser: true 
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/', routes());

app.listen(5000);