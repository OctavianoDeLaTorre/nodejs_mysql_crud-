const express = require('express');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const morgan = require('morgan');

const app = express();

// Importando rutas
const customerRout = require('./routes/customer');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

//middleware
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host:'127.0.0.1',
    user:'root',
    password: '',
    port:'3306',
    database:'crudnode'
},'single'));

app.use(express.urlencoded({extended: false}));
//routers
app.use('/',customerRout);
app.use(express.static(path.join(__dirname,'public')));

//  Archivos estaticos


// Iniciando servidor
app.listen(app.get('port'),()=>{
    console.log('Server on port 3000');
});