
class GameManager {
    constructor() {

        this.objects = [] //tablica objektów w grze
        this.width = canvas.offsetWidth;
        this.height = canvas.offsetHeight;

        this.background = new Image();
        this.duckManager;
        this.backgroundThemes = ['lake.png', 'desert.jpg'];
        this.duckThemes = ['standard', 'dark']
        this.coins = 600;
        this.score = 0;
        this.level = 1;
        this.levelsPoint = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340];
        this.equipment = [];
        this.equipmentDiv = document.querySelector('#equipment .item-container');
        this.archer;

        this.init();
    }

    init() {
        this.archer = new Archer();
        this.objects.push(this.archer);
        this.duckManager = new DuckManager();
        this.objects.push(this.duckManager);

        this.loadBackgroundTheme(this.backgroundThemes[0]);
        this.loadDuckTheme(this.duckThemes[0])

        ui.renderSettings(this.backgroundThemes, this.duckThemes);
        this.GameLoop();
    }

    addObject(obj) {
        this.objects.push(obj)
    }

    GameLoop() {

        requestAnimationFrame(() => {// requestAnimationFrame wywołuje funkcje przekaząw argumencie optymalnie do aktualnych zasobów procesora.
            this.GameLoop()
        });

        this.render();
    }

    render() {
        ctx.clearRect(0, 0, width, height);

        ctx.drawImage(this.background, 0, 0, width, height);//rysujemy tło na naszej scenie

        for (let [i, obj] of this.objects.entries()) {
            if (obj instanceof Duck) {
                this.checkDuckHit(obj);
            }
            switch (obj.update()) {
                case 'delete': {
                    if (obj instanceof Duck)
                        console.log('deleted');

                    this.objects.splice(i, 1)
                }
            }


        }
        this.checkLevelUpdate();

    }

    checkDuckHit(duck) {
        for (let [i, obj] of this.objects.entries()) {
            if (obj instanceof Arrow) {
                if (duck.checkHit(obj.getArrowheadPosition(), obj.getDamage())) {
                    this.objects.splice(i, 1)

                }
            }
        }
    }

    loadDuckTheme(name) {
        for (let duck of ducks) {
            for (let i = 0; i < duck.animations.length; i++) {
                let tab = duck.animations[i].split('/')
                tab[3] = name;
                duck.animations[i] = tab.join('/');
            }
        }
    }

    loadBackgroundTheme(name) {
        this.background.src = "./assets/backgrounds/" + name;
    }

    addScore(s) {
        this.score += s
        ui.updateScore(this.score);
    }

    addCoins(c) {
        this.coins += c
        ui.updateCoins(this.coins);
    }

    buyItem(item) {
        this.addCoins(-item.item.cost);
        this.equipment.push(item);
        this.updateEquipment();
    }

    updateEquipment() {
        this.equipmentDiv.innerHTML = "";

        for (let item of this.equipment) {
            this.equipmentDiv.appendChild(item.domElement);
        }
    }

    checkLevelUpdate() {
        if (this.score >= this.levelsPoint[this.level - 1]) {
            this.nextLevel();
        }
    }

    nextLevel() {
        this.level++;
        this.duckManager.nextLevel();
        ui.updateLevel(this.level);
    }


}