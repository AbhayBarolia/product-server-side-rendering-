const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price:price,
    imageURL: imageUrl,
    description: description
  })
  .then((result)=>{
    console.log('created');
  })
  .catch((err)=>{console.log(err)});
 
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([products]) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch((err)=>{console.log(err);});
};


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId= req.params.productId;
  Product.findById(prodId, product=>{
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  
};

exports.postEditProduct = (req, res, next) => {
    const prodId=req.body.productId;
    const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(prodId, title, imageUrl, description, price);
  product.save();
  res.redirect('/admin/products');

}


exports.postDeleteProduct = (req, res, next) => {
  const prodId= req.params.productId;
 Product.deleteProduct(prodId).then(()=>{
  res.redirect('/admin/products');
 }).catch((err)=>{
  console.log(err);
 });   


}
