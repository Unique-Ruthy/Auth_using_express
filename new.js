const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
console.log(salt);
const password = "Hello Vicky";

app.use(express.json({ limit: "5kb" }));
app.use(express.urlencoded({ extended: false }));

const port = 4000;

const posts = [{ title: "my blog post" }];

const DB = {
  users: [],
  admin: [],
};

function displayHome(req, res) {
  res.status(200).send("App running on localhost:5000");
}

function getUser(req, res) {
  res.status(202).json({ status: "success", data: DB.users });
}

function createUser(req, res) {
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

//   if (DB.users.length <1) {

//   }else {
//   DB.users.map((item) =>   {
//     if (item.email=== req.body.email){
//     res.status(400).json({success:"false", "User already" });
//   }else{
//      //logic for creating a new user
//     DB.users.push(user);
//   res
//     .status(201)
//     .json({ success:"true", message: "User successfully created" });

// }

app.get("/", (req, res) => {
  res.send("Hello my World!");
});

app.get("/user", getUser);

app.get("/admin", (req, res) => {
  res.status(200).json({ status: "Success", data: DB.admin });
});

app.post("/", (req, res) => {
  const user = req.body;
  DB.users.push(user);
  // console.log(req.body);
  res.status(201).send("Hello my World!, This is a post request");
});

app.post("/admin", (req, res) => {
  const admin = req.body;
  DB.admin.push(admin);
  // console.log(req.body);
  res.status(201).send("Hello my World!, This is a post request");
});

app.post("/user", createUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
