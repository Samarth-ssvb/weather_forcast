const apikey = "43626a15b156fc4f56e181ad768cebf0";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const input2 = document.getElementById("form1");
const searchField = document.getElementById("search-focus");

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

//   api call to perform weather 
/**
 * @param {string} city it takes the parameter from the input field
 *  it adds the response from the response data to weather card 
 */



async function getWhetherByLocation(city) {

  try {
    const resp = await fetch(url(city), { origin: "cros" });
    const resoData = await resp.json();
    // addWhetherToPage(resoData);
    addWhetherToPage2(resoData)
    searchField.value = '';
  } catch (error) {
    console.log(error);
    alert("Please enter the correct city name");
    searchField.value = '';
  }
}


const KToC = (K) => {
  return Math.floor(K - 273.15);
}






// Search field validation
input2.addEventListener('submit', (event) => {
  event.preventDefault();
  const cityCard = searchField.value;
  try {
    if (cityCard) {
      getWhetherByLocation(cityCard);
    }
  } catch (error) {
    alert("Please enter a valid city name.");
  }
})


// Weather card UI
function addWhetherToPage2(data) {
  console.log(data);
  const tempinC = KToC(data.main.temp)
  const [imageLink , textColor] = generateImageLink(data.weather[0].main);
  console.log(imageLink);
  const cardWeather = document.getElementById("card2")
  cardWeather.innerHTML = `
          <div class="container py-5">
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col-md-9 col-lg-7 col-xl-5">
                <div id="wrapper-bg" class="card text-white bg-image shadow-4-strong"
                    style="background-image: url(${imageLink})">
                    <!-- Main current data -->
                     <div class="card-header p-4 border-0" style = "color: ${textColor === 'dark' ? 'Black' : 'white'}">
                      <div class="text-center mb-3">
                        <p class="h2 mb-1" id="wrapper-name">${data.name}</p>
                        <p class="mb-1" id="wrapper-description">${data.weather[0].description}</p>
                        <p class="display-1 mb-1" id="wrapper-temp">${tempinC}<sup>&deg;</sup>C</p>
                        <span class="">Pressure: <span id="wrapper-pressure">${data.main.pressure} Pa</span></span>
                        <span class="mx-2">|</span>
                        <span class="">Humidity: <span id="wrapper-humidity">${data.main.humidity} g.m<sup>-3</sup></span></span>
                        
                      </div>
                      <div class="text-right mt-5">
                        <p> <i class="fa-solid fa-wind fa-bounce fa-xl"></i> ${data.wind.speed} km/h<p>
                      </div>
                    </div>
                    
                    <!-- Hourly forecast -->                   
                    <div class="card-container" style = "color: ${textColor === 'dark' ? 'Black' : 'white'}">
                     <div class='details'>
                           <p class="card-min&max">Max</p>
                           <span class="card-span">${KToC(data.main.temp_max)}<sup>&deg</sup>C</span>
                       </div>
                       <div class='details'>
                       <p class="card-min&max">Min</p>
                       <span class="card-span">${KToC(data.main.temp_min)}<sup>&deg</sup>C</span>
                   </div>
                   </div>
                    
                    </div>
                  </div>
          
                </div>
              </div>
          
            </div>
`
}



// Dynamic weather images


function generateImageLink(data) {
  console.log(data);
  switch (data) {
    case 'Rain':
      return ['https://giffiles.alphacoders.com/105/105296.gif'];
    case 'Clouds':
      return ['https://media.giphy.com/media/KwZoSJlvep6Vy/giphy.gif','dark'];
    case 'Drizzle':
      return ['https://media.tenor.com/jOjF9a-DUToAAAAC/rain-drizzle.gif'];
    case 'Haze':
      return ['https://media.giphy.com/media/n3xSURtNE62t2/200.gif']
    case 'Clear':
      return ['https://th.bing.com/th/id/R.46b1f03356038f37b36c37c5d7d96d29?rik=Wzz637vT6rR3Sw&riu=http%3a%2f%2fres.publicdomainfiles.com%2fpdf_view%2f65%2f13920112214859.png&ehk=7uKLyr3A04XAJ4KwrSHv5XxqfScTsSFIT7NeE1qg%2bN4%3d&risl=&pid=ImgRaw&r=0','dark']
    default:
      return ['https://mir-s3-cdn-cf.behance.net/project_modules/disp/c6023f30971807.563b2b13a55cc.gif']
  }
}


