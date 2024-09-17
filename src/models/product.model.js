
export default class ProductModel {
  constructor(_id, _name, _desc, _price, _imageUrl) {
    this.id = _id;
    this.name = _name;
    this.desc = _desc;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }

  static get() {
    return products;
  }

  static update(productObj) {
    const productIndex = products.findIndex(product => product.id === parseInt(productObj.id));

    products[productIndex] = productObj;

  }

  static delete(id) {
    const productId = Number(id);
    const index = products.findIndex((product) => product.id === productId);

    if (index !== -1) {
      products.splice(index, 1);
      console.log(`Product with id ${id} deleted`);
    } else {
      console.log(`Product with id ${id} not found`);
    }
  }




  static add(newProductObj) {
    let newProduct = new ProductModel(products.length + 1, newProductObj.name, newProductObj.price, newProductObj.desc, newProductObj.imageUrl)
    products.push(newProduct)
  }



  static getById(id) {
    return products.find((p) => p.id === id);
  }
}

var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 1',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    29.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
  ),
]
