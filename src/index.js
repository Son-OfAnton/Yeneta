const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")

const templatePath = path.join(__dirname,'../sampleSignup')



app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended:false}))

// there might be login below
app.get("/",(req, res)=>{
    res.render("login2")
})

app.get("/signUp",(req, res)=>{
    res.render("signUp")
})

// this one does not check if an email alredy exists
// app.post("/signUp",async (req, res)=>{

// const data = {
//     name:req.body.name,
//     email:req.body.email,
//     password:req.body.password
// }

// await collection.insertMany([data])

// res.render("home")
// })

app.post("/signUp", async (req, res) => {
    try {
      const check = await collection.findOne({email: req.body.email})
  
      if (check) {
        res.send("Email already exists. Please use a different email.")
      } else {
        const data = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        }
        await collection.insertMany([data])
        res.render("home")
      }
    } catch {
      res.send("Error checking email")
    }
})
  

// app.post("/login2",async (req, res)=>{
    
//     try {
//         const check = await collection.findOne({email:req.body.email})

//         if(check.password === req.body.password) {
//             res.render("home")
//             // res.send({ message: "success" });
//         }
//         else {
//             res.send("wrong password")
//             // res.send({ message: "wrong password" });
//         }
//     } catch{
//         // the user does not exist in the database

//         res.send("wrong email")
//         // res.send({ message: "wrong details" });
        
//     }
// })

app.post("/login2", async (req, res) => {
  try {
    const check = await collection.findOne({ email: req.body.email });

    if (check.password === req.body.password) {
      res.render("home");
    } else {
      res.send(
        "<script>alert('Incorrect password. Please try again.')</script>"
      );
    }
  } catch {
    // the user does not exist in the database
    res.send("<script>alert('User does not exist. Please try again.')</script>");
  }
});


app.listen(3000,()=>{
    console.log("port connected");
})   