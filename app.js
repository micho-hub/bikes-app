var express                 = require("express"),
    mongoose                = require("mongoose"),
    bodyParser              = require("body-parser"),
    methodOverride          = require("method-override"),
    passport                = require("passport"),
    localStrategy           = require("passport-local"),
    expressSession          = require("express-session"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    flash                   = require("connect-flash"),
    sokcetio                = require("socket.io")
    Bikes         = require("./models/bikes"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    Budget        = require("./models/budget"),
    Budtotal      = require("./models/budtotal"),
    Msn           = require('./models/historyMsg');
    seedDB        = require("./seeds");

var app = express();
var commentRoutes = require("./routes/comments"),
    bikesRoutes   = require("./routes/bikes"),
    indexRoutes   = require("./routes/index"),
    budgetRoutes  = require('./routes/budget'),
    calcRoutes    = require('./routes/calc'),
    msnRoutes     = require('./routes/msn')

// seedDB();
mongoose.connect("mongodb://127.0.0.1:27017/newOne",{useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({secret:"na troj deloj mobilite", resave:false, saveUninitialized:false}));
app.use(methodOverride("_method"));
app.use(express.static("public"))
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.use(function(req,res,next){
  res.locals.currentUser=req.user;
  next();
});
app.use(function(req,res,next){
  res.locals.usr=req.usr;

  next();
});

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.total = req.budget;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/",indexRoutes);
app.use("/bikes",bikesRoutes);
app.use("/bikes/:id/comments",commentRoutes);
app.use(budgetRoutes);
app.use(calcRoutes);
app.use(msnRoutes);

app.listen(27017, function(){
  console.log("server is started");
});
