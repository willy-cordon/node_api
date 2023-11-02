const express = require('express');
const routes = require('./routes');
// const mongoose = require('mongoose');
const cors = require('cors')

// require('dotenv').config({path: 'variables.env'});


// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.DB_URL, {
//     useUnifiedTopology:true,
//     useNewUrlParser: true 
// });
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// const whitelist = [process.env.PORTFOLIO_URL];
// const corsOptions = {
//     origin:(origin, callback) =>{
//         const existe = whitelist.some( dominio => dominio === origin)
//         if(existe){
//             callback(null, true)
//         }else{
//             callback(new Error('No permitido por CORS'))
//         }
//     }
// }

app.use(
    cors({
        origin: "*",
        credentials:true,
    })
)

// app.use(
//     cors(corsOptions)
// )


app.use('/', routes());

// app.listen(5000);

// const host = process.env.HOST || '0.0.0.0';
// const port = process.env.PORT || 5000;

// app.listen(port, host, () =>{
//     console.log('server init');
// })