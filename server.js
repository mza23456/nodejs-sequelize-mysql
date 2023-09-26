const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(express.urlencoded({extended: true}));

var corsOptions = {
    origin: 'http://localhost:3000', // อนุญาตให้เฉพาะคำขอจากโดเมนนี้
};

app.use(cors(corsOptions));

const db = require("./app/model");
db.sequelize.sync()
    .then(() => {
        console.log("Sysned DB")
    })
    .catch(() => {
        console.log("Failed to sync DB")
    });

app.get("/", (req, res)=>{
    res.json({message: "Welcome to default route"});
});

require("./app/routes/tutorial.routes.js")(app);

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});