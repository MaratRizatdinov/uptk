
class Product {
  constructor(name, fuse, code) {
    this.productName = name;
    this.fuse = fuse;
    this.code = code;
    this.value = 0;
    this.address = "";
    this.documents = [];
  }
  get fullName() {
    return this.productName + "_" + this.fuse + "_" + this.code;
  }
  arrivalProduct({ id, number, date, type, provider, address, value }) {
    const arrivalDoc = { id, number, date, type, provider, address, value };
    this.value += arrivalDoc.value;
    this.address = arrivalDoc.address;
    this.documents.push(arrivalDoc);
    return this;
  }
  moveProduct({ id, number, date, type, address }) {
    const moveDoc = { id, number, date, type, address };
    this.address = moveDoc.address;
    this.documents.push(moveDoc);
    return this;
  }
  shipmentProduct({ id, number, date, type, consignee, value }) {
    const shipmentDoc = { id, number, date, type, consignee, value };
    if (this.value < shipmentDoc.value) {
      alert("Указано некорректное количество товара");
      return this;
    } else if (this.value === shipmentDoc.value) {
      this.address = "Товар отгружен";
      this.documents.push(shipmentDoc);
      this.value = 0;
    } else {
      this.value -= shipmentDoc.value;
      this.documents.push(shipmentDoc);
    }
  }
}

const product = new Product("Арматура_A500_d14", 2415684, 123);
console.log(product);

product.arrivalProduct({
  id: 1,
  number: 15,
  date: "10.12.2024",
  type: "arrival",
  provider: "Тэмпо",
  address: "Кассета 5",
  value: 2896,
});
console.log(product);

product.moveProduct({
  id: 2,
  number: 16,
  date: "11.12.2024",
  type: "move",
  address: "Кассета 15",
});
console.log(product);
product.shipmentProduct({
  id: 3,
  number: 17,
  date: "12.12.2024",
  type: "shipment",
  consignee: "Global plus",
  value: 1896,
});
console.log(product);
product.shipmentProduct({
  id: 3,
  number: 17,
  date: "12.12.2024",
  type: "shipment",
  consignee: "Global plus",
  value: 1000,
});
console.log(product.fullName);
