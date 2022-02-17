const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
app.use(express.json());
function connect() {
  return mongoose.connect("mongodb://127.0.0.1:27017/intern");
}

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs"); // root directory for views views/
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));

const itSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    descp: { type: String, required: false },
    emi: { type: String, required: true },
    old_price: { type: Number, required: true },
    new_price: { type: Number, required: true },
    img_source: { type: String, required: true },
    btn_option: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const It = mongoose.model("products", itSchema);

app.get("/index", async (req, res) => {
  try {
    const items = await It.find().lean().exec();
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
    img: { type: String, required: true },
    apply: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const publicPath = path.join(__dirname, "views");

const Intern = mongoose.model("interns", internSchema);

app.get("/intern", async (req, res) => {
  try {
    const items = await Intern.find().lean().exec();
    console.log(items);
    //      return res.render("index");
    return res.render("intern", {
      items: items,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.get("/cart", async (req, res) => {
  try {
    //const items = await Intern.find().lean().exec();
    //console.log(items);
    return res.render("cart");
    // return res.render("intern", {
    //   items: items,
    // });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.get("/contact", (req, res) => {
  res.sendFile(`${publicPath}/contact.html`);
});

app.get("/", function (req, res) {
  res.render("index", { user: "John Smith" });
  // pass main ejs file name, pass any data variables
});

app.listen(2345, async () => {
  await connect();

  console.log("server is running");
});
