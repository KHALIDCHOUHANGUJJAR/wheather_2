// const apiKey = "db73d6cbbee4957d21c10c25681d6567";
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// const searchBox = document.querySelector(".search input")
// const searchBtn = document.querySelector(".search button ")

// async function checkWeather(city){
//     const Response = await  fetch (apiUrl + city + `&appid=${apiKey}`);
//     var data = await Response.json();
    
//     console.log(data);
    
//    document.querySelector(".city").innerHTML =  data.name;
//     document.querySelector(".tem").innerHTML = Math.round(data.main.temp) + "°c"
//     document.querySelector(".humidity").innerHTML =  data.main.humidity + 
//     "%"; 
//    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

// }
// searchBtn.addEventListener("click", () => {
//     checkWeather();
// })

const apiKey = "db73d6cbbee4957d21c10c25681d6567";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=      ";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status === 404){

        document.querySelector(".error").style.display = "block";
         document.querySelector(".weather").style.display ="none";
          
    }else{
// paste
   var data = await response.json();
    

    
document.querySelector(".city").innerHTML = data.name;
document.querySelector(".tem").innerHTML = Math.round(data.main.temp) + "°C";
document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; 
document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
 
// images of weather
if (data.weather[0].main == "Clouds"){
    weatherIcon.src ="images/clouds.png"
}
else  if (data.weather[0].main == "Clear"){
    weatherIcon.src = "images/clear.png";
}
else  if (data.weather[0].main == "Rain"){
    weatherIcon.src = "images/rain.png";
}
else  if (data.weather[0].main == "Drizzie"){
    weatherIcon.src = "images/drizzie.png";
}
else  if (data.weather[0].main == "Mist"){
    weatherIcon.src = "images/mist.png";
}


document.querySelector(".weather").style.display ="block"
document.querySelector(".error").style.display = "none";

    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    checkWeather(city);
});
