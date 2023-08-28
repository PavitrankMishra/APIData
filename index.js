console.log("This website gets data on request");

console.log("About to fetch a rainbow");

// Making a map and tiles
const mymap = L.map('issMap').setView([0,0], 1);

// Making a mrker with custom icon
var issIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [50,32],
    iconAnchor: [25,16],
});
const marker = L.marker([0,0], { icon:issIcon}).addTo(mymap);

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

const tileUrl = 'https://{s}.title.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

// fetch("rainbow.jpg").then(response => {
//     console.log(response);
//     return response.blob();
// }).then(blob => {
//     console.log(blob);
//     document.getElementById("raifnbow").src = URL.createObjectURL(blob);
// }).catch(error => {
//     console.log("Error!");
//     console.log(error);
// })

/* Getting data as image */
// First we fetch image by using fetch function it is returned as a response that the response is converted into the blob format the blob format gets converted into url format that is accepted by the image attribute.

catchRainbow()
  .then((response) => {
    console.log("Yay");
  })
  .catch((error) => {
    console.log("error!");
    console.log(error);
  });

async function catchRainbow() {
  const response = await fetch("rainbow.jpg");
  const blob = await response.blob();
  document.getElementById("rainbow").src = URL.createObjectURL(blob);
}

/* Getting the Combined Land-Surface Air and Sea-surface Water temperature in °C*/
chartIt();

async function chartIt() {
  const data = await getData();
  const ctx = document.getElementById("chart");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.xs,
      datasets: [
        {
          label: "Combined Land-Surface Air and Sea-surface Water temperature in °C",
          data: data.ys,
          fill:false,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

getData();
async function getData() {
    const xs = [];
    const ys = [];
  const response = await fetch("ZonAnn.Ts+dSST.csv");
  const data = await response.text();
  console.log(data);

  const table = data.split('\n').slice(1);
  console.log(table);
  table.forEach(row => {
    const columns = row.split(',');
    const year = columns[0];
    const temp = columns[1];
    xs.push(year);
    ys.push(parseFloat(temp));
    console.log(year, temp);
  });
  return {xs, ys};
  
}

/* Getting realtime location of international space station */ 

// const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';


async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    // console.log(data.latitude);
    const {latitude, longitude} = data;
    console.log(latitude);
    console.log(longitude);
    // L.marker([latitude, longitude]).addTo(mymap);
    marker.setLatLng([latitude, longitude]);
    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;
}

getISS();



// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '© OpenStreetMap'
// }).addTo(map);