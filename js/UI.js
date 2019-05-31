
var ui = {
    settingsOpen: false,
    settingsIcon: document.querySelector('#settings-icon'),
    settings: document.querySelector('#settings'),

    init() {
        this.settingsIcon.addEventListener('click', this.settingsClick)

        let themeselect = document.querySelector('#theme');
        themeselect.addEventListener('input', (e) => {
            game.loadDuckTheme(e.target.value)

        })

        let bgselect = document.querySelector('#bg');
        bgselect.addEventListener('input', (e) => {
            game.loadBackgroundTheme(e.target.value)

        })
    },

    settingsClick(e) {
        if (this.settingsOpen) {
            this.settingsOpen = false;
            settings.style.display = "none"

        }
        else {
            this.settingsOpen = true;
            settings.style.display = "block"

        }

    },

    renderSettings(bgs, themes) {
        let bgselect = document.querySelector('#bg');
        for (let bg of bgs) {
            let option = document.createElement('option');
            option.innerText = bg;
            bgselect.appendChild(option);
        }

        let themeselect = document.querySelector('#theme');
        for (let theme of themes) {
            let option = document.createElement('option');
            option.innerText = theme;
            themeselect.appendChild(option);
        }

    },

    updateScore(s) {
        document.querySelector('#score').innerText = "Score: " + s;
    },

    updateCoins(c) {
        document.querySelector('#coins').innerText = "Coins: " + c;
    },

    updateLevel(s) {
        document.querySelector('#level').innerText = "Level: " + s;
    },

}
ui.init();