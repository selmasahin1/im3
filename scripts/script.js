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

const ctx = document.getElementById('rainChart');
const ctx2 = document.getElementById('temperaturChart');
const dateInput = document.getElementById('date');

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const formattedToday = `${yyyy}-${mm}-${dd}`;
dateInput.value = formattedToday;


getApiData(dateInput.value);

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
                title: {
                    display: true,
                    text: 'Stromverbrauch in kWh',
                    color: 'rgb(200, 202, 220)',
                },
                ticks: {
                    color: 'rgb(200, 202, 220)',
                }
            },
            B: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Niederschlag in mm',
                    color: 'rgb(200, 202, 220)'
                },
                ticks: {
                    color: 'rgb(200, 202, 220)',
                }
            },
            x: {
                title: {
                    color: 'rgb(200, 202, 220)',
                },
                ticks: {
                    color: 'rgb(200, 202, 220)',
                }
            },
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
                title: {
                    display: true,
                    text: 'Stromverbrauch in kWh',
                    color: 'rgb(200, 202, 220)',
                },
                ticks: {
                    color: 'rgb(200, 202, 220)',
                }
            },
            B: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Temperaur in °C',
                    color: 'rgb(200, 202, 220)'
                },
                ticks: {
                    color: 'rgb(200, 202, 220)',
                }
            },
            x: {
                title: {
                    color: 'rgb(200, 202, 220)',
                },
                ticks: {
                    color: 'rgb(200, 202, 220)',
                }
            },
        },
        maintainAspectRatio: false,
    }
});

dateInput.addEventListener('change', function () {
    getApiData(dateInput.value);
});

function formatLabels(data) {
    const daysOfWeek = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    return data.map(entry => {
        const date = new Date(entry.datum);
        const day = daysOfWeek[date.getUTCDay()];
        const formattedDate = `${day} ${date.getUTCDate()}.${date.getUTCMonth() + 1}.`;
        return formattedDate;
    });
}

function getApiData(date) {

    const energyURL = "https://im3.selmasahin.ch/unloadEnergy.php?date=" + date;
    const weatherURL = "https://im3.selmasahin.ch/unloadRain.php?date=" + date;


    Promise.all([
        fetch(energyURL).then(response => response.json()),
        fetch(weatherURL).then(response => response.json())
    ]).then(([energyData, weatherData]) => {

        chart1.data.labels = formatLabels(energyData);
        chart2.data.labels = formatLabels(energyData);

        chart1.data.datasets[0].data = energyData.map(entry => parseFloat(entry.durchschnitt_energie));
        chart2.data.datasets[0].data = energyData.map(entry => parseFloat(entry.durchschnitt_energie));

        chart1.data.datasets[1].data = weatherData.map(entry => parseFloat(entry.anz_regen));
        chart2.data.datasets[1].data = weatherData.map(entry => parseFloat(entry.durchschnitt_temp));


        chart1.update();
        chart2.update();
    });
};