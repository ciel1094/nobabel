const express = require("express");
const morgan = require("morgan");
const User = require("./db")

const app = express();
const PORT = 3050;

app.get("/user/list", (req, res, next) => {
    const userList = User;

    return res.status(200).json(userList);
});

app.get("/user/age/avg", async(req, res, next) => {
    const cnt = User.length;
    let totalAge = 0;

    await Promise.all(User.map((u) => {
        totalAge = totalAge + u.age;
    })
);
        const avg = parseFloat(totalAge / cnt);
          return res.status(200).json({
            TOTAL_CNT: cnt,
            AVERAGE_AGE: avg,  
          });
});



app.use(morgan(`dev`));

app.listen(PORT, () => {
    console.log(`${PORT} BackEnd REST api Server Start`)
});
