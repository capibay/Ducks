

class Item {
    constructor(item, inShop = true) {
        this.item = item;
        this.domElement;
        this.inShop = inShop;
        this.init()
    }

    init() {

        let itemDiv = document.createElement('div');


        itemDiv.classList.add('item');

        itemDiv.innerHTML = `
            <img src="${this.item.src}">
            <div class="item-name">${this.item.name}(<b class="gold">${this.item.cost}</b>)</div>
            <div class="item-props">${this.itemProps()}</div>
        `
        if (this.inShop) {
            itemDiv.ondblclick = () => {
                if (game.coins >= this.item.cost) {
                    game.buyItem(new Item(this.item, false));
                    this.domElement.style.backgroundColor = "rgb(226, 228, 231)"
                }
            }
        }
        else {
            itemDiv.ondblclick = () => {
                game.archer.changeBow(this.item);
                this.used();

            }

        }
        this.domElement = itemDiv;


    }



    itemProps() {
        let text = "";
        for (let [key, value] of Object.entries(this.item.itemProps)) {
            text += `<b>${key}:</b> ${value}</br>`


        }
        return text
    }

    used() {
        let items = document.querySelectorAll('#equipment .item');

        for (let item of items) {
            item.style.backgroundColor = "#ffffff"
        }
        this.domElement.style.backgroundColor = "orange"
    }
}

class Shop {
    constructor() {
        this.items = [];
        this.shopDiv = document.querySelector('#shop .item-container');
    }

    createItem(item) {
        this.items.push(new Item(item));
        this.updateShopOffer()
    }

    updateShopOffer() {
        this.shopDiv.innerHTML = "";

        for (let item of this.items) {
            this.shopDiv.appendChild(item.domElement);
        }
    }

}

let shop = new Shop();
shop.createItem(bows[0])
shop.createItem(bows[1])
shop.createItem(bows[2])
shop.createItem(bows[3])
shop.createItem(bows[4])
// shop.createItem(arrows[0])
