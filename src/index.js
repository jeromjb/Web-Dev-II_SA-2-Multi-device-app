const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")
const { template } = require("handlebars")
const templatePath=path.join(__dirname,'../templates')
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
});

app.use(express.json())
app.set("veiw engine","hbs")
app.set("views",templatePath)

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})


app.post("/signup",async (req,res)=>{
    
const data={
    name:req.body.name,
    password:req.body.password
}

await collection.insertMany([data])

res.render("home")

})

app.post("/login",async (req,res)=>{

    try{
        const check=await collection.findone({name:req.body.name})

        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("Wrong Password")
        }
    }
    catch{
        res.send("Wrong Details")
    }
})

app.listen(3000,()=>{
    console.log("port connected");
})