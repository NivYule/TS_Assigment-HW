function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

class Product {
    name: String;
    price: Number;
    weight: Number;
    isKosher: Boolean;
    manufacturer: String;
    date: any;
    constructor(_name: String, _price: Number, _weight: Number, _isKosher: Boolean, _manufacturer: String){
        this.name = _name;
        this.price = _price;
        this.weight = _weight;
        this.isKosher = _isKosher;
        this.manufacturer = _manufacturer;
        this.date = randomDate(new Date(2012, 0, 1), new Date(2025, 0, 1));
    }

    pricePerKilo() {
        return (this.price / this.weight);
    }

    expirationDate(product1, product2) {
        if (product1.date > product2.date) {
            return (`${product2.name} will expire first than the ${product1.name}`);
        }
        else {
            return (`${product1.name} will expire first first than the ${product2.name}`);
        }
    }

    isExpired() {
        if (this.date > new Date()) {
            return false;
        }
        else {
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
        tdName.innerText = product.name;
        tdWeight.innerText = `${product.weight} g`;
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
}

const container = document.getElementById("container");

const product1 = new Product("Twix", 7, 47, true, "Mars");
const product2 = new Product("Bamba", 2.86, 80, true, "Osem");
const product3 = new Product("Hershey's", 8, 2.5, false, "Hershey");
const product4 = new Product("Milk Chocolate", 4.5, 100, true, "Elite");
container.innerText += returnHigherPrice(product1, product2);
container.innerHTML += "<br></br>";
container.innerText += returnHigherPrice(product2, product4);
container.innerHTML += "<br></br>";
container.innerText += product1.expirationDate(product1, product2);
product1.drawProductToTable(product1);
product2.drawProductToTable(product2);
product3.drawProductToTable(product3);
product4.drawProductToTable(product4);
const btn = document.getElementById("btn");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const weightInput = document.getElementById("weight");

btn.addEventListener("click", () => {
    const addedProduct = new Product(nameInput.value, priceInput.value, weightInput.value, true, "International");
    addedProduct.drawProductToTable(addedProduct);
});

function _getTd() {
    const tdName = document.createElement("td");
    return tdName;
}

function returnHigherPrice(product1, product2) {
    if (product1.price > product2.price) {
        return (`${product1.name} costs more than the ${product2.name}`);
    }
    else {
        return (`${product2.name} costs more than the ${product1.name}`);
    }
}
