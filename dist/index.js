function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

class Product {
  constructor(_name, _price, _weight, _unit, _isKosher, _manufacturer) {
    this.name = _name;
    this.price = _price;
    this.weight = _weight;
    this.unit = _unit;
    this.isKosher = _isKosher;
    this.manufacturer = _manufacturer;
    this.date = randomDate(new Date(2000, 0, 1), new Date(2025, 0, 1));
  }

  pricePerKilo() {
    return Number(this.price) / Number(this.weight);
  }

  expirationDate(product1, product2) {
    if (product1.date > product2.date) {
      return `${product2.name} will expire first than the ${product1.name}`;
    } else {
      return `${product1.name} will expire first first than the ${product2.name}`;
    }
  }

  isExpired() {
    if (this.date > new Date()) {
      return false;
    } else {
      return true;
    }
  }

  drawProductToTable(product) {
    const tableBody = document.getElementById("tbody");
    const tr = document.createElement("tr");
    const tdName = _getTd();
    const tdPrice = _getTd();
    const tdIsKosher = _getTd();
    const tdWeight = _getTd();
    const tdManufacturer = _getTd();
    const pricePerKiloT = _getTd();
    const dateProduct = _getTd();
    const isProductExp = _getTd();
    tdPrice.innerText = `${product.price} ₪`;
    tdPrice.setAttribute("id", `${product.name}_price`);
    tdName.innerText = product.name;
    tdName.setAttribute("id", `${product.name}`);
    tdWeight.innerText = `${product.weight}${product.unit}`;
    tdIsKosher.innerText = product.isKosher;
    tdManufacturer.innerText = product.manufacturer;
    pricePerKiloT.innerText = product.pricePerKilo();
    dateProduct.innerText = product.date;
    isProductExp.innerText = product.isExpired();
    tr.append(tdName);
    tr.append(tdPrice);
    tr.append(tdWeight);
    tr.append(tdIsKosher);
    tr.append(tdManufacturer);
    tr.append(pricePerKiloT);
    tr.append(dateProduct);
    tr.append(isProductExp);
    tableBody.append(tr);
  }

  drawProductsToSelectForCompare(product) {
    const select1 = document.getElementById("productToCompare1");
    const select2 = document.getElementById("productToCompare2");
    const option1 = _getOptions(product);
    const option2 = _getOptions(product);
    select1.append(option1);
    select2.append(option2);
  }
}

const product1 = new Product("Twix", 7, 47, "g", true, "Mars");
const product2 = new Product("Bamba", 2.86, 80, "g", true, "Osem");
const product3 = new Product("Hershey's", 8, 2.5, "g", false, "Hershey");
const product4 = new Product("Cola", 8, 1, "L", true, "Elite");
const container = document.getElementById("container");
const buttonToCompare = document.getElementById("buttonToCompare");
const select1Value = document.getElementById("productToCompare1");
const select2Value = document.getElementById("productToCompare2");
product1.drawProductToTable(product1);
product2.drawProductToTable(product2);
product3.drawProductToTable(product3);
product4.drawProductToTable(product4);
product1.drawProductsToSelectForCompare(product1);
product2.drawProductsToSelectForCompare(product2);
product3.drawProductsToSelectForCompare(product3);
product4.drawProductsToSelectForCompare(product4);
const button = document.getElementById("buttonThatAddToTable");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const weightInput = document.getElementById("weight");
const unitInput = document.getElementById("unit");
const isKosherInput = document.getElementById("isKosher");
const manufacturerInput = document.getElementById("manufacturer");
button.addEventListener("click", () => {
  const addProduct = new Product(
    nameInput.value,
    Number(priceInput.value),
    Number(weightInput.value),
    unitInput.value,
    Boolean(isKosherInput.value),
    manufacturerInput.value
  );
  addProduct.drawProductToTable(addProduct);
  addProduct.drawProductsToSelectForCompare(addProduct);
});

function _getTd() {
  const tdName = document.createElement("td");
  return tdName;
}

function _getOptions(product) {
  const option = document.createElement("option");
  option.value = product.name;
  option.innerText = product.name;
  return option;
}

function returnTheHigherPrice(product1, product2) {
  const prod1Name = document.getElementById(`${product1}`).innerText;
  const prod1Price = document.getElementById(`${product1}_price`).innerText;
  const prod2Name = document.getElementById(`${product2}`).innerText;
  const prod2Price = document.getElementById(`${product2}_price`).innerText;
  console.log(prod1Name);
  console.log(prod1Price);
  console.log(prod2Name);
  console.log(prod2Price);
  switch (true) {
    case prod1Price > prod2Price:
      return `${prod1Name} costs more than the ${prod2Name}`;
      break;

    case prod1Price < prod2Price:
      return `${prod2Name} costs more than the ${prod1Name}`;
      break;

    default:
      return `both products costs same`;
      break;
  }
}

buttonToCompare.addEventListener("click", (product) => {
  container.innerText = returnTheHigherPrice(
    select1Value.value,
    select2Value.value
  );
});
