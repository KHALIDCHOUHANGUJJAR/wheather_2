

const apiKey = "db73d6cbbee4957d21c10c25681d6567";
let weather = document.querySelector('.weather')
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")
let body = document.querySelector('body')
let card = document.querySelector('.card')

function checkWeather() {
    if (searchBox.value.trim() === "") {
        weather.innerHTML = `<p class="Error">Please Enter a City name</p>`;
    } else {
        weather.innerHTML = `<p>Loading...</p>`;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&units=metric&appid=${apiKey}`;
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                weatherShow(data);
            })
            .catch((err) => {
                weather.innerHTML = `<img src="./images/6167023.webp" class="not_found">`;
                body.classList.remove('thunderstorms', 'drizzle', 'rain', 'snow', 'cloudy', 'clouds', 'sun');
                // console.log(err);
            });
    }
    searchBox.value = '';
}

   const weatherShow=(data)=>{
    
    const { country } = data.sys;
    const { temp } = data.main;
    let upTemp = Math.floor(temp);
    let { main, id } = data.weather[0];
     let img;
     
     body.classList.remove('thunderstorms', 'drizzle', 'rain', 'snow', 'cloudy', 'clouds', 'sun');

     if (id >= 200 && id <= 232) {
         img = './images/scattered-thunderstorms.png';
         body.classList.add('thunderstorms');
         card.classList.add('thunderstorms');
         card.classList.remove('sun');

        } else if (id >= 300 && id <= 321) {
         img = './images/drizzle.png';
         body.classList.add('drizzle');
         card.classList.add('drizzle');
         card.classList.remove('sun');

     } else if (id >= 500 && id <= 531) {
         img = './images/rain.png';
         body.classList.add('rain');
         card.classList.add('rain');
         card.classList.remove('sun');
         
         card.classList.remove('sun');
 
        } else if (id >= 600 && id <= 622) {
         img = './images/snow.png';
         body.classList.add('snow');
         card.classList.add('snow');
         card.classList.remove('sun');
 
        } else if (id >= 701 && id <= 781) {
         img = './images/cloudy.png';
         body.classList.add('cloudy');
         card.classList.add('cloudy');
         card.classList.remove('sun');

        } else if (id >= 801 && id <= 804) {
         img = './images/clouds.png';
         body.classList.add('clouds');
         card.classList.add('clouds');
         card.classList.remove('sun');


        } else {
         img = './images/clear.png';
         body.classList.add('sun');
         card.classList.add('sun');
 
        }
 
   
weather.innerHTML = `
<img src="${img}" alt="" class="weather-icon" />
<h2 class="city">${data.name}, ${country}</h2>
<h1 class="temp">${upTemp}°C</h1>
<div class="details">
    <div class="col">
        <img src="./images/humidity.png" />
        <div>
            <p class="humidity">${data.main.humidity}%</p>
            <div>Humidity</div>
        </div>
    </div>
    <div class="col">
        <img src="./images/wind.png" />
        <div>
            <p class="wind">${data.wind.speed} m/s</p>
            <div>Wind Speed</div>
        </div>
    </div>
</div>
`  
}
function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            let Currenturl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
            fetch(Currenturl)
                .then((res) => res.json())
                .then((data) => weatherShow(data))
                .catch((err) => {
                    weather.innerHTML = `<img src="./images/6167023.webp" class="not_found"/>`;
                    // console.log(err);
                });
        },
        (error) => {
            const { message } = error;
            box.innerHTML = `<p class="Error">${message}</p>`;
            body.classList.remove('thunderstorms', 'drizzle', 'rain', 'snow', 'cloudy', 'clouds', 'sun');
            card.classList.remove('thunderstorms', 'drizzle', 'rain', 'snow', 'cloudy', 'clouds', 'sun');
        }
    );
}


searchBtn.addEventListener("click", () => {
let sec = searchBox.value  
    checkWeather();

});
searchBox.addEventListener("keyup",(e)=>{
 let srch = searchBox.value
    if (e.key === "Enter") {
        checkWeather(srch)        
    }
})
