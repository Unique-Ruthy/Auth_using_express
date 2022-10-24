const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
console.log(salt);
const password = "password";

app.use(express.json({ limit: "5kb" }));
app.use(express.urlencoded({ extended: false }));

const port = 5000;

const posts = [{ title: "my blog post" }];

const DB = {
  users: [],
  admin: [],
};

function Home(req, res) {
  res.status(200).send("App running on localhost:2000");
}

function inputUser(req, res) {
  res.status(202).json({ status: "success", data: DB.users });
}

function addUser(req, res) {
  const newUser = req.body;
  // finds the new users index in the list of users
  const userIndex = DB.users.findIndex((user) => {
    return user.email === newUser.email;
  });

  //   checks if the users index is greater than -1
  if (userIndex > -1) {
    res.status(400).json({
      success: false,
      message: "User already exist",
    });
  } else {
    const passwordHash = bcrypt.hashSync(newUser.password, salt);

    newUser.password = passwordHash;
    // creates the new user
    DB.users.push(newUser);
    // responds to the client
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  }
}

app.get("/", (req, res) => {
  res.send("Hello my World!");
});

app.get("/user", inputUser);

let userLogin = (req, res) => {
  let { email, password } = req.body;
  if (email == "" || password == "") {
    res.status(405).json({
      status: "failed",
      message: "incorrect email or password",
    });
  } else {
    let existUser = DB.users.filter((user) => user.email === email);
    if (existUser.length == 0) {
      res.status(401).json({ status: "failed", message: "User not found" });
    } else {
      if (bcrypt.compareSync(password, existUser[0].password)) {
        res
          .status(200)
          .json({ status: "sucess", message: "Loggedin Successfully" });
      } else {
        res
          .status(404)
          .json({ status: "failed", message: "User does not exist" });
      }
    }
  }
};

app.get("/admin", (req, res) => {
  res.status(200).json({ status: "Success", data: DB.admin });
});

app.post("/", (req, res) => {
  const user = req.body;
  DB.users.push(user);
  res.status(201).send("Hello my World!, This is a post request");
});

app.post("/admin", (req, res) => {
  const admin = req.body;
  DB.admin.push(admin);
  // console.log(req.body);
  res.status(201).send("Hello my World!, This is a post request");
});

app.post("/users", userLogin);

app.post("/user", addUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
