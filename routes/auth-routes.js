const router = require("express").Router();
require("dotenv").config();
const https = require("https");
const mongoose = require("mongoose");
const User = require("../models/user-model");
const session = require("express-session");

// auth login
router.get("/login", (req, res) => {
  res.send("It basically show login button and other details about app");
});

// auth logout
router.get("/logout", (req, res) => {
  console.log("user", req.session.username, "just logged out")
  delete req.session.username;
  res.redirect('https://practicechef.herokuapp.com/Login')
  //res.send("Logging out");
});

// is authenticated
router.get("/isAuthenticated", (req, res) => {
  if(req.session.username) {
    //console.log(req.session);
    res.send(req.session.username);
  } else {
    //console.log(req.session);
    res.send("NO");
  }
})

// auth with codechef
router.get("/loginwithcodechef", (req, res) => {
  res.redirect(
    `https://api.codechef.com/oauth/authorize?response_type=code&client_id=${process.env.Client_ID}&state=xyz&redirect_uri=${process.env.redirectURL}`
  );
});

// codechef is supposed to redirect here
router.get("/codechef/redirect", (req, res) => {
  const options = {
    method: "POST",
    host: "api.codechef.com",
    path: "/oauth/token",
    headers: {
      "content-Type": "application/json",
    },
  };
  const post_body = {
    grant_type: "authorization_code",
    code: req.query.code,
    client_id: process.env.Client_ID,
    client_secret: process.env.Client_Secret,
    redirect_uri: process.env.redirectURL,
  };
  const request = https.request(options, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });
    response.on("end", async () => {
      data = JSON.parse(data);
      try {
        //res.send(data);
        const userDetails = await getUserName(data.result.data.access_token);

        res.send(userDetails.username);
        try {
          req.session.username = userDetails.username;
          User.findOne({ username: userDetails.username })
            .then((currentUser) => {
              if (currentUser) {
                // already have the user
                console.log("user is ", currentUser);
                User.updateOne(
                  { username: userDetails.username },
                  {
                    access_token: data.result.data.access_token,
                    refresh_token: data.result.data.refresh_token,
                  },
                  (err, docs) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("Updated", docs);
                    }
                  }
                );
              } else {
                // if not, create user in our db
                new User({
                  username: userDetails.username,
                  fullname: userDetails.fullname,
                  access_token: data.result.data.access_token,
                  refresh_token: data.result.data.refresh_token,
                })
                  .save()
                  .then((newUser) => {
                    console.log("new user created: " + newUser);
                  })
                  .catch((err) => {
                    console.log(err)
                    res.send(err);
                  });
              }
            })
            .catch((err) => {
              console.log("Error in mongodb", err);
              res.send(err);
            });
        } catch (err) {
          console.log("Error in dealing with mongodb");
        }

        req.session.username = await userDetails.username;
        res.redirect('https://practicechef.herokuapp.com/');
        //res.redirect('/profile/dashboard');
        //res.status('Success').send(userDetails.username);
      } catch (err) {
        console.log("349 session expired");
        delete req.session.username;
        res.send("session expired");
      }
    });
  });
  request.write(JSON.stringify(post_body));
  request.end();
});

// Fetching User details
const getUserName = (access_token) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      host: "api.codechef.com",
      path: "/users/me",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };
    const request = https.request(options, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        data = JSON.parse(data);
        resolve({
          username: data.result.data.content.username,
          fullname: data.result.data.content.fullname,
        });
      });
    });
    request.end();
  });
};

module.exports = router;
