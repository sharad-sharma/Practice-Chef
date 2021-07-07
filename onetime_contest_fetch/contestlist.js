
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
})

// Normalize all contests
async function allContests() {
  const initial_data = await getContests();
}

// Fetching all contests
const getContests = (access_token) => {
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