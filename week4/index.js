const axios = require("axios");
const http = require("http");
const url = require("url");
const querystring = require("querystring");

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  let query = querystring.parse(url.parse(req.url).query);
  let repo = query.repo;
  let basicURL = "https://api.github.com/repos/";
  axios.get(basicURL + repo)
  .then(function (response) {
    let result = "Repo: " + repo + "\n";
    result += "stargazers_count: " + response.data.stargazers_count + "\n";
    result += "open_issues_count: " + response.data.open_issues_count + "\n";
    res.end(result);
  })
  .catch(function (error) {
    if(!repo)
    {
      console.log(error.message);
      res.end("Invalid Query!")
    }
    else
    {
      res.end("Repository not found!");
    }
  })
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

