const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const err404 = document.querySelector('.not-found');
const hideCity = document.querySelector('.hide-city');

search.addEventListener('click', () => {

  const APIKey = '19f2f8bd2712664dd862115c19cf9a17';
  const city = document.querySelector('.search-box input').value;

  if (city == '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

      if (json.cod == '404') {
        hideCity.textContent = city;
        container.style.height = '25rem';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        err404.classList.add('active');
        return;
      }
      
      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      if (hideCity.textContent == city) {
        return;
      }
      else {
        hideCity.textContent = 'weather in ' + city;
        container.style.height = '35rem';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        err404.classList.remove('active');

        setTimeout(() => {
          container.classList.remove('active');
        }, 2500);

        switch (json.weather[0].main) {
          case 'Thunderstorm':
            image.src = 'images/thunderstorm.png';
            break;
          
          case 'Drizzle':
            image.src = 'images/rain.png';
            break;
          
          case 'Rain':
            image.src = 'images/rain.png';
            break;

          case 'Snow':
            image.src = 'images/snow.png';
            break;

          case 'Atmosphere':
            image.src = 'images/atmosphere.png';
            break;

          case 'Clear':
            image.src = 'images/clear.png';
            break;
          
          case 'Clouds':
            image.src = 'images/cloud.png';
            break;
          
          default:
            image.src = 'images/cloud.png';   
        }
  
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span> `;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        const infoWeather = document.querySelector('.info-weather');
        const infoHumidity = document.querySelector('.info-humidity');
        const infoWind = document.querySelector('.info-wind');

        const elCloneinfoWeather = infoWeather.cloneNode(true);
        const elCloneinfoHumidity = infoHumidity.cloneNode(true);
        const elCloneinfoWind = infoWind.cloneNode(true);

        elCloneinfoWeather.id = 'clone-info-weather';
        elCloneinfoWeather.classList.add('active-clone');

        elCloneinfoHumidity.id = 'clone-info-humidity';
        elCloneinfoHumidity.classList.add('active-clone');

        elCloneinfoWind.id = 'clone-info-wind';
        elCloneinfoWind.classList.add('active-clone');

        setTimeout(() => {
          infoWeather.insertAdjacentElement("afterend", elCloneinfoWeather);
          infoHumidity.insertAdjacentElement("afterend", elCloneinfoHumidity);
          infoWind.insertAdjacentElement("afterend", elCloneinfoWind);
        }, 2200);

        const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone')
        const totalCloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];

        const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone')
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];

        const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone')
        const cloneInfoWindFirst = cloneInfoWind[0];

        if (totalCloneInfoWeather > 0) {
          cloneInfoWeatherFirst.classList.remove('active-clone');
          cloneInfoHumidityFirst.classList.remove('active-clone');
          cloneInfoWindFirst.classList.remove('active-clone');

          setTimeout(() => {
            cloneInfoWeatherFirst.remove();
            cloneInfoHumidityFirst.remove();
            cloneInfoWindFirst.remove();
          }, 2200);
        }

      }

    });

});