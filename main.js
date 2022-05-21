const searchForm = document.querySelector('.search-form')
const search = document.querySelector('.search') 
const cityName = document.querySelector('.city-name')
const currentDegree = document.querySelector('.current-degree')
const currentWeather = document.querySelector('.current-weather')
const min = document.querySelector('.min')
const max = document.querySelector('.max')

const api = {
    key: '79c55b2c4b2772606ccd1d50eed8d89a',
    base: 'https://api.openweathermap.org/data/2.5/'
}

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const nameCity = search.value  
    try {
        const fetchData = await fetch(`${api.base}weather?q=${nameCity}&units=metric&appid=${api.key}`)
        if(!fetchData.ok) {
            throw new Error(fetchData.statusText)
        }
        const data = await fetchData.json()
        getWeather(data)
    }  catch (err) {
        cityName.textContent = err.message
    }
})


function getWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`
    currentDegree.textContent = `${Math.round(data.main.temp)}℃`
    currentWeather.textContent = `${data.weather[0].main}`
    min.textContent = `${Math.round(data.main.temp_min)}℃`
    max.textContent = `${Math.round(data.main.temp_max)}℃`
}