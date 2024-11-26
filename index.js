const express = require("express");
const app = express();
const port = 8080;
const mysql = require('mysql2');
const { faker } = require('@faker-js/faker');
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.set("view engine","views");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@#abhishek',
    database: 'delta_college'
  });
//all data


  app.get("/count",(req,res)=>{
    let q = `SELECT COUNT(*) FROM user `;
    connection.query(q,(err,result)=>{
        try{
          
          if(err) throw err;
          let count = result[0]["COUNT(*)"];
          res.render("index.ejs",{count});
        }catch(err){
          console.log(err);
        }
    });
  
  });

//table data
app.get("/users",(req,res)=>{
    let q = `SELECT * FROM user ORDER BY username ASC`;
    connection.query(q,(err,result)=>{
      try{
        if(err) throw err;
         res.render("users.ejs",{result});
      }catch(err){

        console.log(err);
      }

    });
});


app.get("/users/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/users",(req,res)=>{
    let id = uuidv4();
    let {username,email,password} =  req.body;
    let q = `INSERT INTO user (id,username,email,password)VALUES('${id}','${username}','${email}','${password}' )`;
    connection.query(q,(err,result)=>{
       
        try{
          if(err) throw err;
          res.redirect("/users");

        }catch(err){
          console.log(err);
        }
    });
});


  //home route
    app.get("/",(req,res)=>{
    res.send("Port is running");
});

app.listen(port,()=>{
    console.log("App is listening on port");
})

