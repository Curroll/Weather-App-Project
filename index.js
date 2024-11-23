const weatherform = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const Apikey = "6dcb60675386aa9bf78ce14f5166b486";

weatherform.addEventListener('submit', async event => {

    event.preventDefault();
    
    const city = cityInput.value.trim();
    
    if(city){
        try{
            const weatherData = await getweatherData(city);
            displayweatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);      
        }
    }
    else{
        displayError("Please enter the city");
    }
});

async function getweatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Apikey}`
    const response = await fetch(apiUrl);


    if(!response.ok){
        const errorDetail = await response.json();
        throw new Error(errorDetail.message ||'Could not fetch weather Dat') 
    }
    return await response.json()
    


}
function displayweatherInfo(data){
  
  const{ name:city,timezone:time, main:{temp,humidity},weather:[{description,id}]} = data
  console.log(data)
  card.textContent="";
  card.style.display = "flex";

    const cityDiaplay = document.createElement("h1");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const tempDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    const timezone = document.createElement("p");
    
    
    const timezoneOffset = time;
    const utcDate = new Date();
    const offsetMilliseconds = timezoneOffset * 1000;
    const localDate = new Date(utcDate.getTime() + offsetMilliseconds);

    function formatTime(date) {
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        return date.toLocaleTimeString('en-US', options); 
    }
    



    cityDiaplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity:${humidity}`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);
    timezone.textContent = `Local Time : ${formatTime(localDate)} (GMT${timezoneOffset/3600>=0?'+' : ''}${timezoneOffset/3600})`;
    
    cityDiaplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("windspeed");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    timezone.classList.add("timeZone");
    


    card.appendChild(cityDiaplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
    card.appendChild(timezone);



}
function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
        return `🌩️`;

        case(weatherId >= 300 && weatherId < 400):
        return `🌦️`;

        case(weatherId >= 500 && weatherId < 531):
        return `🌧️`;

        case(weatherId >= 600 && weatherId < 622):
        return `🌨️`;

        case(weatherId >= 700 && weatherId < 800):
        return `☁️ `;

        case(weatherId === 800):
        return `☀️`;

        case(weatherId >= 800 && weatherId < 900):
        return `🌤️`;

        default:
         return "❓"
    
    }
}
function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay")

    console.log(message)


    card.innerHTML = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}


