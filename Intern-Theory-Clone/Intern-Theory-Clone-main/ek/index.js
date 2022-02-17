const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
function connect(){
    return mongoose.connect('mongodb://127.0.0.1:27017/intern')
   
}


app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs"); // root directory for views views/
app.use(express.static("public"));


  const itSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    descp: { type: String, required: false },
    emi: { type: String, required: true },
    old_price: { type: Number, required: true },
    new_price: { type: Number, required: true},
    img_source:{ type: String, required: true},
    btn_option: { type:String, required: true },

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const It = mongoose.model("it", itSchema); 

app.get('/index', async(req,res) => {
  try {
     const items = await It.find().lean().exec();
 console.log(items)
//      return res.render("index");
    return res.render("index", {
      items: items,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});


const internSchema = new mongoose.Schema(
  {
    text1: { type: String, required: true },
    text2: { type: String, required: false },
    text3: { type: String, required: true },
    test4: { type: String, required: false },
    text5: { type: String, required: true },
    img:{ type: String, required: true},
   apply: { type:String, required: true },

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Intern = mongoose.model("intrns", internSchema);



app.get('/intern', async(req,res) => {
  try {
     const items = await Intern.find().lean().exec();
 console.log(items)
//      return res.render("index");
    return res.render("intern", {
      items: items,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.get('/', function(req, res){ 
  res.render('index',{user:"John Smith"}) 
// pass main ejs file name, pass any data variables 
}); 

app.listen(2345,async()=>{
    await connect();
    
    console.log("server is running");
})