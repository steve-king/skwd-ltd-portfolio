var express = require('express');
var app = express();

// View engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

// Routes
// -----------------------------------------------
// Static assets
app.use(express.static(process.cwd() + '/public'));

// Index view
app.get('/', function(req, res){
  res.render('index.html', {
    meta: {
      title: "Stephen King | Portfolio",
      desc: "Here is the meta description for steveking.info"
    }
  });
});

// Listen
app.listen(process.env.PORT, function(){
  console.log('Listening at http://localhost:' + process.env.PORT);
});
