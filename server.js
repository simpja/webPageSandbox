const express = require("express");
const app = express();
const http = require("http").createServer(app);
const port = 3000;
const path = require("path");
const router = express.Router();
// const routes = require("./routes/index");

// For our home screen we add a route to the empty directory
// the route simply serves the static html file in the home folder.
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/home/index.html"));
});
/*
...And in order for this static HTML-file to reach its CSS- and js files (static assets), 
we need to serve the home folder directory as static assets using app.use('path')
However, this approach puts all assets in the same root folder
Better then to add a virtual server path like this: app.use('virtual server path', 'local asset path');
In that way, we can categorize all our assets in folders
*/
app.use("/home", express.static(__dirname + "/home/"));

// Following the same approach as our home screen, we can serve our routes and their static assets the same way
router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname + "/about/index.html"));
});
app.use("/about", express.static(__dirname + "/about/"));
app.use("/assets", express.static(__dirname + "/assets/"));

app.use("/", router);

http.listen(port, function () {
  console.log(`listening on: ${port}`);
});
