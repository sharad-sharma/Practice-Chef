const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const adminRoutes = require("./routes/admin-routes");
const mongoose = require("mongoose");
const cors = require('cors');
const session = require("express-session");
require("dotenv").config();
const path = require('path');

const app = express();
// CORS Middleware
app.use(cors({credentials: true}));

// session to store username
app.use(session({
  secret: 'this is supposed to be secret',
  saveUninitialized: true,
  //cookie: { sameSite: 'strict', maxAge: 24*60 * 60 * 1000 },
  resave: true, secure: true}));

// User redirect when any webpage url hitted
// app.use('/', (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://practicechef.herokuapp.com");

//   if(!req.session.username && req.path !== '/auth/login' && req.path !== '/auth/loginwithcodechef' && req.path !== '/auth/codechef/redirect' && req.path !== '/auth/isAuthenticated') {
//     console.log('new user redirect');
//     //res.redirect('/auth/login');
//     res.redirect('https://practicechef.herokuapp.com/Login')
//   } else {
//     next();
//   }
// });

// redirect already logged in user
// app.get('/', (req, res) => {
//   if(req.session.username) {
//     console.log('existing user redirect', req.session.username);
//     //res.redirect('/profile/dashboard');
//     res.redirect('http://localhost:3000');  // this is dashboard in frontend
//   } else {
//     console.log('new user redirect');
//     res.redirect('/auth/login');
//   }
// });

// connect to mongodb
mongoose.connect(process.env.mongodbURI, { useNewUrlParser: true }).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);

// create home route
// app.get("/", (req, res) => {
//   res.send("hello im working");
// });

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app now listening for requests on port ${port}`);
});
