console.log("In this website we can fetch data");

/* Getting the image of rainbow by using the fetch method */

catchRainbow()
  .then((response) => {
    console.log("Yay!");
  })
  .catch((error) => {
    console.log("Error!");
    console.log(error);
  });

async function catchRainbow() {
  const response = await fetch("rainbow.jpg");
  const data = await response.blob();
  document.getElementById("rainbow").src = URL.createObjectURL(data);
  console.log(data);
}

// fetch("rainbow.jpg").then(response => {
//   console.log(response);
//   return response.blob();
// }).then(blob => {
//   console.log(blob);
//   document.getElementById("raifnbow").src = URL.createObjectURL(blob);
// }).catch(error => {
//   console.log("Error!");
//   console.log(error);
// })

/* The above functionality is completed here */

/* Tabular data from csv files */
/* Combined Land-Surface, air and Sea-Water temperature in °C */

async function getData() {
  const xs = [];
  const ys = [];
  const response = await fetch("ZonAnn.Ts+dSST.csv");
  // console.log(response);
  const text = await response.text();
  // console.log(text);
  const table = text.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");
    const year = column[0];
    const temp = column[1];
    console.log(year, temp);
    xs.push(year);
    ys.push(temp);
    console.log(parseFloat(temp));
  });
  return { xs, ys };
}

chartIt();
async function chartIt() {
  const data = await getData();
  const ctx = document.getElementById("chart");
  const xlabels = data.xs;
  const ylabels = data.ys;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: xlabels,
      datasets: [
        {
          label:
            "Combined Land-Surface Air and Sea-surface Water temperature in °C",
          data: ylabels,
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

/* Data is charted on the chart .csv file from above code */


/* Getting real time location of ISS */
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getISS() {
  const response = await fetch(api_url);
  console.log(response);
  const data = await response.json();
  console.log(data);
  const {latitude, longitude} = data;
  console.log(latitude);
  console.log(longitude);
  document.getElementById('lat').textContent = latitude;
  document.getElementById('lon').textContent = longitude;
}

getISS();