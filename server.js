const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const bodyParse = require("body-parser");
app.use(express.json());
app.use(cors());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

app.listen(3001, function () {
  console.log("listening on 3001");
});

var userInfo = "응답없음";

const kakaoLogin = async (req, res) => {
  const grant_type = req.body.grant_type;
  const client_id = req.body.client_id;
  const redirect_uri = req.body.redirect_uri;
  const KAKAO_CODE = req.body.authorizationCode;
  const url = `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${KAKAO_CODE}`;

  try {
    const response = await axios
      .post(url, {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        const accessToken = res.data.access_token;
        //개인 정보 가져오기
        axios
          .get(`https://kapi.kakao.com/v2/user/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            userInfo = res.data.properties;
            return userInfo;
          });
      });
  } catch (error) {
    console.log(error);
  }
};

//이 주소에서 get 요청을 하면 보내주세요
app.get("/", (req, res) => {
  res.send("통신 성공");
});

app.post("/user", async (req, res) => {
  console.log(req.body.authorizationCode);
  await kakaoLogin(req, res);
  setTimeout(() => {
    console.log(userInfo);
    res.send(userInfo);
  }, 100);
});
