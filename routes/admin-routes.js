const User = require("../models/user-model");
const LongChallenge = require("../models/longchallenge-model");
const https = require("https");
const router = require("express").Router();

const contest_type = ["JAN", "FEB", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC", "COOK", "LTIME"]

// admin can load contests
router.get("/loadcontests", async (req, res) => {
  if(req.session.username != "codedontlie") {
    res.send("You are not admin");
  }
  const admindata = await User.findOne({ username: req.session.username });
  const initial_data = await getContests(admindata.access_token);

  const contest_list = [];
  // console.log(initial_data);
  try {
    console.log(initial_data.contestList.length);
    for(let j=0; j<initial_data.contestList.length; j++) {
      const name = initial_data.contestList[j].code;
      let is_push = false;
      for(let i=0; i<14-2; i++) {
        if(name.includes(contest_type[i])) {
          is_push = true;
          break;
        }
      }
      if(is_push) {
        contest_list.push(name);
      }
    }
  } catch(err) {
    console.log("something went wrong");
  }
  var fs = require('fs');

  var file = fs.createWriteStream('contest_codes.txt');
  file.on('error', function(err) { /* error handling */ });
  contest_list.forEach(function(v) { file.write(v + '\n'); });
  file.end();
  res.send(contest_list);
})

// Fetching all contests
const getContests = (access_token) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      host: "api.codechef.com",
      path: `/contests?fields=code&status=past&offset=1`,
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      }
    };
    const request = https.request(options, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        data = JSON.parse(data);
        resolve(data.result.data.content);
      });
    });
    request.end();
  });
};

// for each contest_code load problemList and store it
router.get("/loadproblems", async (req, res) => {
  if(req.session.username != "codedontlie") {
    res.send("You are not admin");
  }
  const admindata = await User.findOne({ username: req.session.username });

  var fs = require('fs');
  
  // Use fs.readFile() method to read the file
  var list_form = fs.readFileSync('contest_codes.txt', 'utf8').split('\n');

  var myVar = setInterval(myTimer, 10000);

  let pos = 238;
  async function myTimer() {
    if(pos == list_form.length - 1) myStopFunction();
    let temp = list_form[pos].replace(/(\r\n|\n|\r)/gm, "");

    // I'm supposed to make api request for temp and then store the data into my database
    
    try {
      const initial_data = await getproblemsList(admindata.access_token, temp);
      //console.log(initial_data.problemsList);

      try {
        LongChallenge.findOne({ code: temp })
          .then((Challenge) => {
            if (Challenge) {
              // already have the contest
              console.log("We already have contests upto here");
              // Even i can break here.
            } else {
              // if not, create this challenge in our db
              new LongChallenge({
                code: temp,
                name: initial_data.name,
                problemsList: initial_data.problemsList
              })
                .save()
                .then((newContest) => {
                  console.log("new user added");
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => {
            console.log("Error in mongodb", err);
          });
      } catch (err) {
          console.log("Error in dealing with mongodb");
      }

    } catch(err) {
      console.log("something wrong", err);
    }

    console.log(temp, pos);
    pos++;
  }

  function myStopFunction() {
    clearInterval(myVar);
  }
  res.send("ok I will fix it");

  // const initial_data = await getproblemsList(admindata.access_token);

})

// Fetching contest problemsList
const getproblemsList = (access_token, which_contest) => {
  console.log("get called", which_contest);
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      host: "api.codechef.com",
      path: `/contests/${which_contest}?fields=code%2Cname%2CproblemsList`,
      
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      }
    };
    const request = https.request(options, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        data = JSON.parse(data);
        resolve(data.result.data.content);
      });
    });
    request.end();
  });
};

module.exports = router;