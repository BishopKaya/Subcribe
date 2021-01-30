const express=require("express")
const app=express();
const mongoose=require("mongoose");
const errorController=require("./controllers/errorController");
const subscriberController=require("./controllers/subcriberController");

mongoose.Promise=global.Promise;

mongoose.connect(
    "mongodb://localhost:27017/our_sub",
    {useNewUrlParser:true}
)
let db=mongoose.connection;

db.once("open",()=>{
    console.log(`Mongoose is successfully connected to mongodb`)
})

app.set("port",process.env.PORT||4000);
app.set("view engine","ejs");

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get("/",(req,res)=>{
    res.render("index")
});
app.get("/subscriber",subscriberController.listSubscribers);
app.get("/contact",(req,res)=>{
    res.render("contact");
});
app.post("/subscribe",subscriberController.saveSubscriber);


// app.use(/* not found */)
// app.use(/* internal server error */)

app.listen(app.get("port"),()=>{
    console.log(`Server runnning on port:${app.get("port")}`)
})