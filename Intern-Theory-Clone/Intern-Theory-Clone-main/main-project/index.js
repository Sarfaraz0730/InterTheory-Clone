const express=require("express");

const path=require("path");


const app=express();

const publicPath=path.join(__dirname,'public')

app.get('',(req,res) => {
    res.sendFile(`${publicPath}/index.html`);
})
app.get('/contact',(req,res) => {
    res.sendFile(`${publicPath}/contact.html`);
});

 app.use(express.json());

app.listen(2345,async()=>{
   
    console.log("server is running");
});
