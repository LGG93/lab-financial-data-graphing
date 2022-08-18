let fromDate = "2022-01-01";
let toDate = "2022-07-01";
let dates 
let prices 

const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`

function getData(){
    let chartStatus = Chart.getChart("myChart");
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
  
axios
  .get(apiUrl)
  .then(responseFromAPI => {
    dates = Object.keys(responseFromAPI.data.bpi)
    prices =Object.values(responseFromAPI.data.bpi)
    //console.log("prices and dates", `${dates}, ${prices}`)
    //console.log('API data', responseFromAPI.data.bpi); printTheChart(responseFromAPI.data.bpi)
    printTheChart();
})
  .catch(err => console.log('Error while getting the data: ', err));


  function printTheChart() {
   
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Bitcoin Price History",
              data: prices,
              backgroundColor: ["rgba(75, 192, 192, .5)"],
              borderColor: ["rgb(75, 192, 192)"],
              borderWidth: 3,
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
    };
}

getData();


let dateFromElement= document.getElementById("dateFrom")
dateFromElement.addEventListener("change", ()=>{
    fromDate = dateFromElement.value;
    getData();
});
    
let dateToElement= document.getElementById("dateTo")
dateToElement.addEventListener("change", ()=>{
    toDate = dateToElement.value;
    getData();
    });

    
    
   // closes printTheChart()
