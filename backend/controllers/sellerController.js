require("dotenv").config();
const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {sellerValidationSchema,loginValidationSchema} = require("./validations/validationSchema");

// register

exports.sellerRegister = async (req, res, next) => {
  const token = req.header("auth-token");
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

bcrypt.hash(req.body.password, 10, function(err, hashPassword) {

  if (err) {
    res.json({error : err})
    
  }

const full_name = req.body.full_name;
const email= req.body.email;
const type= "Starter";
const phone= req.body.phone;
const password= hashedPassword;
const address=req.body.address;
const turnOver= 0;
const productsCount= 0;
const identity= req.body.identity,

  seller = new Seller({
    full_name,
    email,
    type,
    phone,
    password,
    address,
    turnOver,
    productsCount,
    identity
  });

seller
.save()
.then(() => res.json("Admin successfully added"))
.catch((err) => res.status(400).json("Error :" + err));
});
};





exports.resetPassword = async (req, res, next) => {
  const token = req.header("auth-token");
  const sellerEmail = jwt.verify(token, process.env.SELLER_TOKEN).email;

  const { password, newPassword } = req.body;
  try {
    const seller = await Seller.findOne({ email: sellerEmail });
    if (seller) {
      bcrypt.compare(password, seller.password, async (err, result) => {
        if (result) {
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          seller.password = hashedPassword;
          seller.isReseted = true
          const newPass = await seller.save();
          res.status(201).send(newPass);
        } else {
          res.status(401).send("password incorrect check your email");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.sellerLogin = async (req, res, next) => {
  const { error } = loginValidationSchema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  const seller = await Seller.findOne({ email: req.body.email });
  if (!seller) return res.status(400).send("Email  not found");

  const validPass = await bcrypt.compare(req.body.password, seller.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const token = jwt.sign(
    { _id: seller._id, email: seller.email ,role :'seller', isReseted : seller.isReseted , isValid : seller.isValid},
    process.env.SELLER_TOKEN
  );
  res.header("auth-token", token).send(token);
};

exports.validSeller = async (req, res, next) => {


  const id_seller = req.body.id_seller

  const seller = await Seller.findById({ _id: id_seller });
  res.send(seller);
  if (!seller) {
    res.status(404).send({ message: "Seller not found" });
  } else {
    seller.isValid = true;
    const validSeller = await seller.save();
    res.status(201).send(validSeller);
  }
};

exports.getAllSellers = async (req, res, next) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sellerPack = async (req, res, next) => {
  const token = req.header("auth-token");

  const id_seller = jwt.verify(token, process.env.SELLER_TOKEN)._id;

  const type = req.body.type;

  const seller = await Seller.findById({ _id: id_seller });
  if (type == "Pro") {
    seller.type = type;
    seller.turnOver += 5000;

    const updateSeller = await seller.save();
    res.status(201).send(updateSeller);
  } else if (type == "Expert") {
    seller.type = type;
    seller.turnOver += 20000;
    const updateSeller = await seller.save();
    res.status(201).send(updateSeller);
  }
};


exports.deleteSeller = async (req, res, next) => {
  try {
    const sellerDelete = await Seller.deleteOne({
      _id: req.params.id,
    });
    res.status(201).send(sellerDelete);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.getSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findOne({ _id: req.params.id });
    res.status(201).send(seller);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};