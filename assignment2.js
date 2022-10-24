const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 4000;

const posts = [{ title: "my blog post" }];

const users = [
  { name: "John", age: 24 },
  { name: "Jane", age: 60 },
  { name: "Joe", age: 50 },
];

app.get("/", (req, res) => {
  res.send("Hello my World!");
});

app.get("/user", (req, res) => {
  res.status(200).json({ status: "Success", data: users });
});

app.post("/", (req, res) => {
  const user = req.body;
  users.push(user);
  // console.log(req.body);
  res.status(201).send("Hello my World!, This is a post request");
});

app.post("/posts", (req, res) => {
  const { authorization } = req.headers;
  if (authorization && authorization === "1234") {
    const post = req.body;
    console.log(post);
    posts.push(post);
    res.status(201).send(post);
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.get("/posts", (req, res) => {
  res.status(200).json({ status: "Success", data: posts });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
