const btns = document.querySelectorAll(".btn");
const slider = document.querySelector(".slider");
const navigatorsEl = document.querySelector(".navigators");
const iconCodes = [];
let currentCardIndex = 0;
let firstIcon;

API_KEY = "860f567a841abfe0fe6b26c3c7fb78b9";

slider.innerHTML = "";



// CREATE WEATHER CARD
function createWeatherCard () {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    slider.appendChild(cardEl);
}

// FETCH DATA
async function getWeatherData (cityName) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`);
    const data = await res.json();
    return data;
}

// GET ICON CODE
function getIconLink(iconCode) {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// UPDATE WEATHER CARD
function updateWeatherCard(data, index) {
    const countryCode = data.sys.country;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    if (index == 0) {
        firstIcon = iconCode;
    }
    iconCodes.push([index,iconCode])
    const ICON_URL = getIconLink(iconCode);
    const name = data.name;

    const cards = document.querySelectorAll(".card");
    cards[index].innerHTML = `
    <div class="card__header">
        <h2 class="card__city">${name}</h2>
        <span class="card__country-code">${countryCode}</span>
    </div>
    <div class="card__main">
        <p class="card__temperature">${temperature}<span>°C</span></p>
        <img src="${ICON_URL}" alt="" class="card__icon">
    </div>
    <div class="card__footer">
        <p class="card__description">${description}</p>
    </div>
`
}

// GET ICON CODE
function getIconCode(index) {

}

// ADD WEATHER CARD
function addWeatherCards(cityNames) {
    cityNames.forEach((cityName, index) => {
        createWeatherCard();
        getWeatherData (cityName).then (data => updateWeatherCard(data,index));
    })
}

addWeatherCards(["Kathmandu", "Barcelona", "Adelaide", "Vancouver", "Buenos Aires", "Paris", "Manchester", "Tokyo", "Siberia", "São Paulo"]);

const cards = document.querySelectorAll(".card");

let cardsLength = cards.length;
const slideWidth = cards[0].clientWidth + 16;





// NAVIGATORS
navigatorsEl.innerHTML = "";

for(let i=0;i<cardsLength;i++) {
    let circle = document.createElement("i");
    circle.classList.add("fa-circle");
    circle.classList.add("fa-regular");
    navigatorsEl.appendChild(circle);
}

const navigators = document.querySelectorAll(".navigators i");

navigators.forEach((navigator,index) => {
    navigator.addEventListener("click", () => {
        if (index != currentCardIndex) {
            currentCardIndex = index;
            updateNavigators();
            updateButtons();
            slideCard();
        }
    })
});

function updateNavigators() {
    navigators.forEach((navigator,index) => {
        if (index == currentCardIndex) {
        navigator.classList.remove("fa-regular");
        navigator.classList.add("fa-solid");
        } else {
            navigator.classList.add("fa-regular");
            navigator.classList.remove("fa-solid");
        }
    })
}

// BUTTON
btns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        if (!btn.classList.contains("disabled")) {
            currentCardIndex += index==0?-1:+1;
            updateButtons();
            updateNavigators();
            slideCard();
        }
    })
})

function enablebuttons() {
    btns.forEach(btn => {
        btn.classList.remove("disabled");
    })
}

function updateButtons() {
    enablebuttons();
    if (currentCardIndex == 0) {
        btns[0].classList.add("disabled");
    }
    if (currentCardIndex == cardsLength - 1) {
        btns[1].classList.add("disabled");
    }
}



// SLIDE CARD

function slideCard() {
    slider.style.transform = `translateX(${-slideWidth * currentCardIndex}px)`;
    updateColor();
}

// CHANGE COLOR


function updateColor () {
    let iconCode;
    iconCodes.forEach(iconCodeArray => {
        if (iconCodeArray[0] == currentCardIndex) {
            iconCode = iconCodeArray[1];
        }
    })
    switch (iconCode){
        case "01d":
        case "02d":
            document.documentElement.style.setProperty("--clr-background", "rgb(115, 205, 221)");
            document.documentElement.style.setProperty("--clr-transparent", "rgba(255, 255, 255, 0.3)");
            document.documentElement.style.setProperty("--clr-neutral", "black");
            document.documentElement.style.setProperty("--clr-neutral-invert", "white");
            break;    

        case "03d":
        case "04d":
        case "09d":
        case "10d":
        case "11d":
        case "13d":
        case "50d":
            document.documentElement.style.setProperty("--clr-background", "rgb(116, 136, 139)");
            document.documentElement.style.setProperty("--clr-transparent", "rgba(255, 255, 255, 0.3)");
            document.documentElement.style.setProperty("--clr-neutral", "black");
            document.documentElement.style.setProperty("--clr-neutral-invert", "white");
            break;

        case "01n":
        case "02n":
            document.documentElement.style.setProperty("--clr-background", "rgb(38, 18, 65)");
            document.documentElement.style.setProperty("--clr-transparent", "rgba(0, 0, 0, 0.3)");
            document.documentElement.style.setProperty("--clr-neutral", "white");
            document.documentElement.style.setProperty("--clr-neutral-invert", "black");
            break;    
                
        case "03n":
        case "04n":
        case "09n":
        case "10n":
        case "11n":
        case "13n":
        case "50n":
            document.documentElement.style.setProperty("--clr-background", "rgb(32, 29, 41)");
            document.documentElement.style.setProperty("--clr-transparent", "rgba(0, 0, 0, 0.3)");
            document.documentElement.style.setProperty("--clr-neutral", "white");
            document.documentElement.style.setProperty("--clr-neutral-invert", "black");
            break;
            
    }
}


// REFRESH
updateNavigators();
updateButtons();


