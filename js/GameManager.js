
class GameManager {
    constructor() {

        this.objects = []
        this.width = canvas.offsetWidth;
        this.height = canvas.offsetHeight;

        this.background = new Image();

        this.backgroundThemes = ['lake.png', 'desert.jpg'];
        this.duckThemes = ['standard', 'dark']
        this.coins = 0;
        this.score = 0;

        this.init();
    }

    init() {
        // this.resize()

        this.objects.push(new Archer())
        this.objects.push(new DuckManager())

        // window.addEventListener('resize', (e) => {
        //     console.log(window.outerWidth);
        //     this.resize()
        // })
        this.loadBackgroundTheme(this.backgroundThemes[0]);
        this.loadDuckTheme(this.duckThemes[0])

        ui.renderSettings(this.backgroundThemes, this.duckThemes)
        this.GameLoop();
    }

    addObject(obj) {
        this.objects.push(obj)
    }

    GameLoop() {

        requestAnimationFrame(() => {
            this.GameLoop()
        });

        // setInterval(() => {
        //     this.GameLoop()
        // }, 500)



        this.render();
    }

    render() {
        ctx.clearRect(0, 0, width, height);

        ctx.drawImage(this.background, 0, 0, width, height);

        for (let [i, obj] of this.objects.entries()) {
            if (obj instanceof Duck) {
                this.checkDuckHit(obj);
            }
            switch (obj.update()) {
                case 'delete': {
                    this.objects.splice(i, 1)
                }
            }


        }

    }
    resize() {
        return
        width = window.outerWidth / 2
        height = window.outerHeight / 2
        // console.log(width, height);

        const pixelRatio = window.devicePixelRatio || 1;

        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;

        canvas.style.width = `${window.outerWidth / 2}px`;
        canvas.style.height = `${window.outerHeight / 2}px`;

        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        ctx.scale(pixelRatio, pixelRatio);
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
        console.log('s');

        for (let duck of ducks) {
            for (let i = 0; i < duck.animations.length; i++) {
                let tab = duck.animations[i].split('/')
                tab[3] = name;
                duck.animations[i] = tab.join('/');

            }
            // // animation = animation.split('/')
            // // animation[3] = name;
            // // animation = animation.join('/');
            // // animation = "s"
            // // console.log(animation);
            // animation = "as"

        }
        console.log(ducks);


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
}