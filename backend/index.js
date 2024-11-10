const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // For token creation
const secret_ecom = "yourSuperSecretKey"; // Define your secret key for signing tokens
// const Product = require("./models/Product");
const app = express();
app.use(cors());
app.use(express.json());



// Define your secret key
//onst secret_ecom = 'your_super_secret_key'; // Make sure to keep this safe!

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://senthilkumarharini2002:Ecommerce-Site1@ecommerce-site1.jiwlc.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce-Site1",
);

// Ensure upload directory exists
const uploadDir = "./upload/images";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// API Creation
app.get("/", (req, res) => {
  res.send("Express server is running");
});

// Image storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the defined upload directory
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Serve static images
app.use("/images", express.static(uploadDir));

// Image upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  // Inga naama image nu oru variable expect panrom Backend la
  if (req.file) {
    // Check if file exists
    res.json({
      success: 1,
      image_url: `http://localhost:${port}/images/${req.file.filename}`,
    });
  } else {
    res.status(400).json({ success: 0, message: "File not uploaded" });
  }
});
//scheme for creating product

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});
// creating api for deleting products

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("deleted");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// creating api for getting all products

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({}); // Neenga neraya product add panna thaan show aagum bro product ipo nan backend la add panan bro,

  console.log("all products fetched");
  res.send(products);
});
// Shema creating for user model1

const Users = mongoose.model("Users", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartDate: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating endpoint for registering user
app.post("/signup", async (req, res) => {
  console.log(req.body);
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({
        success: false,
        errors: "Existing user found with the same email ID.",
      });
  } else {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cartDate: cart,
    });

    await user.save();
    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, secret_ecom);
    res.json({
      success: true,
      token: token,
    });
  }
});

// creating endpoint for user login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data,  secret_ecom); // What is this vedio la add panirunthanga bro, | Is it variable or string in this line? Adhu variable

      res.json({
        success: true,
        token: token,
      });
    } else {
      res.json({ success: false, errors: "Incorrect password." });
    }
  } else {
    res.json({ success: false, errors: "Wrong email or password" });
  }
});

// Creating endpoint for new collections data
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newCollections = products.slice(-8); // Fetch the last 8 items
  console.log("new collections fetched");
  res.send(newCollections); // Corrected variable name here
});


// Creating endpoint for popular items in vegetarian section
app.get("/popularinvegetarian", async (req, res) => {
  let products = await Product.find({});
  let popular_in_Vegetarian = products.slice(0, 4);
  console.log(popular_in_Vegetarian);
  res.send(popular_in_Vegetarian);
});

//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  console.log("token", token);


  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  } 
  else{
    try{
      const data = jwt.verify(token, secret_ecom); // Inga adhu string ah variable ah?? indha line la its  a string, try the API now
      req.user = data.user; 
      next();

    }catch(error){
      console.log("error: ", error);
      res.status(401).send({ error: "Please authenticate using a valid token" });
    }
  }
  
}



// creating endpoint for adding products in cartdate
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData  = await Users.findOne({ _id: req.user.id });
  userData.cartDate[req.body.itemId] +=1;
  console.log("product: ", userData.cartDate[req.body.itemId]);

  // await userData.save();
  await Users.findOneAndUpdate({ _id: req.user.id },{cartDate: userData.cartDate}); // video duration find panni solringla, indha endpoint  
  //8hrs 57 min andha dureaction varu video again share pannunga
  // idhu la tha bro varum
  res.send("Added to cart");
// Database epdi view pann
  // console.log(req.body, req.user);
})


// creating endpoint to remove product from cart
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed",req.body.itemId);
  let userData  = await Users.findOne({ _id: req.user.id });
 if ( userData.cartDate[req.body.itemId] >0)
  userData.cartDate[req.body.id] -=1;
  await Users.findOneAndUpdate({ _id: req.user.id },{cartDate: userData.cartDate});
  res.send("Removed from cart");
  // console.log(req.body, req.user);
})

// creating endpoint for getting cart data
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("get cart data");
  let userData  = await Users.findOne({ _id: req.user.id });
  res.json (userData.cartDate);

})




// Start the server
app.listen(port, (error) => {
  if (!error) {
    console.log("Server is successfully running on port " + port);
  } else {
    console.log("Error: " + error);
  }
});
