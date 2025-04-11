require('dotenv').config()

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/review");
const policyRoutes = require("./routes/policy");
const userRoutes = require("./routes/user");
const paymentRoutes=require("./routes/payment")
const categoryRoutes=require("./routes/category")
const cartRoutes = require('./routes/cart');
const buyRoutes = require('./routes/buy');
const expressSession = require("express-session");
const mongoStore=require('connect-mongo')
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const Cart = require('./models/cart');
const MongoStore = require('connect-mongo');

const dbUrl=process.env.ATLAS_URL
async function main() {
    await mongoose.connect(dbUrl);
}

main().then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log(err);
});

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24* 3600,
})
store.on('err',()=>{
    console.log('error in mongo session store')
})
app.use(expressSession({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(async (req, res, next) => {
    res.locals.msg = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curUser = req.user;

    if (req.user) {
        const cart = await Cart.findOne({ user: req.user._id });
        let totalItems = 0;
        if (cart) {
            for (let item of cart.items) {
                totalItems += item.quantity;
            }
        }
        res.locals.cartCount = totalItems;
    } else {
        res.locals.cartCount = 0;
    }

    next();
});

app.get('/', (req, res) => {
    res.redirect(301, '/product');
  });
 
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use('/product', productRoutes); 
app.use('/product/:id/review', reviewRoutes); 
app.use('/user', userRoutes); 
app.use('/', policyRoutes);
app.use('/', paymentRoutes);
app.use('/', cartRoutes); 
app.use('/product', buyRoutes); 
app.use('/',categoryRoutes)

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Some error occurred" } = err;
    res.status(statusCode).render("error", { message });
});

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});
