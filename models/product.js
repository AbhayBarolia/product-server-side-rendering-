const cart = require('./cart');
const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
   return db.execute('INSERT INTO products (title,price, description, imageURL) VALUES(?, ?, ?, ?)',
   [this.title,this.price,this.description,this.imageUrl]
   )
  }

  static fetchAll() {
   return db.execute('SELECT * FROM PRODUCTS');
  }


  static deleteProduct(pId)
  { 
   return db.execute('DELETE from products where id= ?',[pId]);
  }

  static findById(id) {
    return db.execute('SELECT * FROM PRODUCTS WHERE id= ?',[id]);
}

}