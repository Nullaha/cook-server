var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const multer  = require('multer')
const upload = multer()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const recipeRouter = require('./routes/recipe')
const recipeDetailsRouter = require('./routes/details')
const uploadRecipeRouter = require('./routes/upload')
const uploadFileRouter = require('./routes/uploadFile')


var app = express();
var http = require('http');
var server = http.createServer(app);
app.set('data',path.join(__dirname,'data'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*")
    next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipe',recipeRouter);
app.use('/recipe/details',recipeDetailsRouter)

app.use('/upload',uploadRecipeRouter)
app.use('/uploadFile',uploadFileRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen('3002')
