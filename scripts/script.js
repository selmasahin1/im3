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

document.addEventListener('DOMContentLoaded', function () {
    new IconChanger('.lampIcon', '/im3/icons/lamp.svg', '/im3/icons/lampFilled.svg');
    new IconChanger('.cloudIcon', '/im3/icons/WolkeLeer.png', '/im3/icons/WolkeFilled.png');

});

// Display Chart
let chart1 = null;
let chart2 = null;
let stromverbrauchData = [];
let regenData = [];
let temperaturData = [];
let labels = [];

const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('myChart2');

getApiData();

chart1 = new Chart(ctx, {
    data: {
        labels: labels,
        datasets: [{
            type: 'line',
            label: 'Stromverbrauch',
            data: stromverbrauchData,
            fill: false,
            borderColor: 'rgb(232, 205, 94)',
            tension: 0.0,
            yAxisID: 'A',
        }, {
            type: 'bar',
            label: 'Niederschlag',
            data: regenData,
            fill: true,
            backgroundColor: 'rgb(200, 202, 220)',
            yAxisID: 'B',
            tension: 0.0
        }]
    },
    options: {
        scales: {
            A: {
                type: 'linear',
                position: 'left',
            },
            B: {
                type: 'linear',
                position: 'right',
                ticks: {
                    max: 1,
                    min: 0
                }
            }
        },
        maintainAspectRatio: false,
    }
});

chart2 = new Chart(ctx2, {
    data: {
        labels: labels,
        datasets: [{
            type: 'line',
            label: 'Stromverbrauch',
            data: stromverbrauchData,
            fill: false,
            borderColor: 'rgb(232, 205, 94)',
            tension: 0.0,
            yAxisID: 'A',
        }, {
            type: 'line',
            label: 'Temperatur',
            data: temperaturData,
            fill: false,
            borderColor: 'rgb(116, 126, 184)',
            yAxisID: 'B',
            tension: 0.0
        }]
    },
    options: {
        scales: {
            A: {
                type: 'linear',
                position: 'left',
            },
            B: {
                type: 'linear',
                position: 'right',
                ticks: {
                    max: 1,
                    min: 0
                }
            }
        },
        maintainAspectRatio: false,
    }
});

function getApiData() {

    const energyURL = "https://im3.selmasahin.ch/unloadEnergy.php";
    const weatherURL = "https://im3.selmasahin.ch/unloadRain.php";

    Promise.all([
        fetch(energyURL).then(response => response.json()),
        fetch(weatherURL).then(response => response.json())
    ]).then(([energyData, weatherData]) => {

        chart1.data.labels = energyData.map(entry => entry.datum);
        chart2.data.labels = energyData.map(entry => entry.datum);

        chart1.data.datasets[0].data = energyData.map(entry => parseFloat(entry.durchschnitt_energie));
        chart2.data.datasets[0].data = energyData.map(entry => parseFloat(entry.durchschnitt_energie));

        chart1.data.datasets[1].data = weatherData.map(entry => parseFloat(entry.anz_regen));
        chart2.data.datasets[1].data = weatherData.map(entry => parseFloat(entry.durchschnitt_temp));

        console.log(labels, stromverbrauchData, regenData, temperaturData);

        chart1.update();
        chart2.update();
    });
};