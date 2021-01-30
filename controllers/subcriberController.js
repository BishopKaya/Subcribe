const Subscriber=require("../models/Subscriber");

exports.listSubscribers=(req,res)=>{
    Subscriber.find({},function(error,data){
        if(error)console.log(error)
        req.data=data;
        res.render("subscribers",{subscriber:req.data})
    })
    
}

exports.saveSubscriber=(req,res,next)=>{
    Subscriber.create({
        name:req.body.name,
        email:req.body.email,
        zipCode:req.body.zipCode
    }).then(s=>{
        res.render("thanks");
        next()
    }).catch(error=>{
        console.log(error)
        next(error)
    })
}