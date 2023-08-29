class Product {
  constructor(name, id, price, category, src) {
    this.name = name;
    this.id = id;
    this.price = price;
    this.category = category;
    this.src = src;
  }
  addToCart() {}
}
class Shirt extends Product {
  constructor(name, id, price, category, src) {
    super(name, id, price, category, src);
  }
}
class Pants extends Product {
  constructor(name, id, price, category, src) {
    super(name, id, price, category, src);
  }
}
class Shoes extends Product {
  constructor(name, id, price, category, src) {
    super(name, id, price, category, src);
  }
}

export { Shirt, Pants, Shoes };
