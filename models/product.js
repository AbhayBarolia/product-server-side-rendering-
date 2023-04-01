const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id!=null)
      {
        const existingProdIndex=products.findIndex(prod=>prod.id===this.id);
        const updateProduct = [...products];
        updateProduct[existingProdIndex]=this;
        fs.writeFile(p, JSON.stringify(updateProduct), err => {
          console.log(err);
        });
      }
      else{
        this.id=Math.random();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
      }
      
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }


  static deleteProduct(pId)
  { 
    getProductsFromFile(products => {
      const existingProdIndex=products.findIndex(prod=>prod.id==pId);
      console.log(existingProdIndex+" index");
    const updateProduct = [...products];
    updateProduct.splice(existingProdIndex,1);
    fs.writeFile(p, JSON.stringify(updateProduct), err => {
    console.log(err);
     });
    });
  }

  static findById(id,cb) {
    getProductsFromFile(products => {
     const product = products.find(p=> p.id===id);
     cb(product);
    });
  }
};
