const express = require("express");
const app = express();
const cors = require("cors");
const bodyParse = require("body-parser");
app.use(express.json());
app.use(cors());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

app.listen(3001, function () {
  console.log("listening on 3001");
});

//이 주소에서 get 요청을 하면 보내주세요
app.get("/", (req, res) => {
  res.send("통신 성공");
});

app.post("/user", (req, res) => {
  console.log(req.body.authorizationCode);
  res.send("코드 받아옴");
});
