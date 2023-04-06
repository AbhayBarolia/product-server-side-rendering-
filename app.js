const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const sequelize = require('./util/database');

const Product= require('./models/product');
const User= require('./models/user');
const Cart= require('./models/cart');
const CartItems= require('./models/cart-items');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findByPk(1)
    .then((user)=>{
        req.user = user;
        next();
    })
    .catch((err)=>{console.log(err);})
});



app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);

Product.belongsTo(User, {constraints:true, onDelete: 'cascade'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItems});
Product.belongsToMany(Cart,{through:CartItems});

sequelize.sync()
.then((results)=>{
    return User.findByPk(1);
})
.then(user=>{
    if(!user)
    { return User.create({name:'Abhay', email:"test@test.com"});}
    return user;
})
.then((user)=>{
    user.createCart();
    app.listen(3000);
    })
.catch((err)=>{console.log(err);});

