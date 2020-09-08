const express=require('express')
const request=require('request');
const cheerio=require('cheerio');
const app = express();
const router=express.Router()
app.use('/',router)
router.use(express.json())

app.get('/',(req,res)=>{
    res.send("home")
    console.log("connected")
})

router.use("/data",router)
require("./imdb/task1")(router,request,cheerio);



app.listen(3000,()=>{
    console.log("server is running on port 3000");
})