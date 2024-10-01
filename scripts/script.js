class IconChanger {
    constructor(element, defaultSrc, hoverSrc) {
        this.element = document.querySelector(element);
        this.defaultSrc = defaultSrc;
        this.hoverSrc = hoverSrc;
        this.addEventListeners();
    }

    addEventListeners() {
        this.element.addEventListener('mouseover', () => {
            this.element.src = this.hoverSrc;
        });

        this.element.addEventListener('mouseout', () => {
            this.element.src = this.defaultSrc;
        });
    }
}

class Graph {
    constructor(element) {
        this.element = document.querySelector(element);
        this.createGraph();
    }

}

document.addEventListener('DOMContentLoaded', function () {
    new IconChanger('.lampIcon', 'icons/lamp.svg', 'icons/lampFilled.svg');
    new IconChanger('.cloudIcon', 'icons/WolkeLeer.png', 'icons/WolkeFilled.png');

});

document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        data: {
            labels: ['one', 'two', 'three', 'four', 'five', 'six', 'seven'],
            datasets: [{
                type: 'line',
                label: 'Stromverbrauch',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(232, 205, 94)',
                tension: 0.0
            },
            {
                type: 'line',
                label: 'Temperatur',
                data: [10, 16, 18, 22, 20, 18, 15],
                fill: false,
                borderColor: 'rgb(116, 126, 184)',
                tension: 0.0
            }, {
                type: 'bar',
                label: 'Niederschlag',
                data: [12, 6, 5, 20, 13, 0, 50],
                fill: true,
                backgroundColor: 'rgb(200, 202, 220)',
                tension: 0.0
            }]
        }
    });
});