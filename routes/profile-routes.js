const User = require("../models/user-model");
const LongChallenge = require("../models/longchallenge-model");
const router = require("express").Router();
const https = require("https");

// user's dashboard
// router.get("/dashboard", (req, res) => {
//   res.send("Hello user, consider it's your dashboard for now");
// });

// to-do
// I'm supposed to pass problem data and to-do list data from here.

// contest List
router.get("/fetchContests", (req, res) => {
  try {
    if(req.session.username) {
      LongChallenge.find({})
      .then((collection) => {
        res.send(collection);
      }).catch((err) => {
        console.log("Error in mongodb", err);
        res.send("error in mongodb");
      });
    }
  } catch(err) {
    console.log(err);
    res.send("error");
  }
});

// fetch user's submissions
router.get("/fetchSubmissions", async (req, res) => {
  try {
    const userdata = await User.findOne({ username: req.session.username });
    try {
      const initial_data = await getUserSubmissions(userdata.access_token);
      res.send(initial_data);
    } catch(err) {
      console.log('349 session expired', err);
      delete req.session.username;
      res.send('session expired');
    }
  } catch (err) {
    console.log(err);
    res.send("probably mongodb is not connected");
  }
  
  
})

// Fetching User details
const getUserSubmissions = (access_token) => {
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
          partiallySolved: data.result.data.content.problemStats.partiallySolved,
          solved: data.result.data.content.problemStats.solved,
          attempted: data.result.data.content.problemStats.attempted,
        });
      });
    });
    request.end();
  });
};

module.exports = router;