import express from "express"


const app = express();


app.get("/", (req, res) => {
    res.send("Working")
})

app.listen(3000, () => {
    console.log('====================================');
    console.log("App Listening on 3000");
    console.log('====================================');
})