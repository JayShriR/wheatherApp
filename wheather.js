const userTab=document.querySelector("[data-userWheather]");
const searchTab=document.querySelector("[data-searchWheather]");
const userContainer=document.querySelector(".wheather-container");
const grantAccessContainer=document.querySelector(".grant-location-container");
const searchForm=document.querySelector("[data-searchForm");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");


const API_KEY = "1cedd1eb88e9ba7be30f5519393a1d27";
let currentTab=userTab;
currentTab.classList.add("current-tab");

function switchTab(clickedTab){
    if(clickedTab!=currentTab){

        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            //if search container is invisible then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            //before i am in search tab and now i want to switch to your wheather
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //access yout location from local storage or aldedy saved in above varible
            getFromSessionStorage();
        }
    }
}

userTab.addEventListener("click",()=>{
    switchTab(userTab);
});

searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
});

//check if coordinate are present in session storage
function getFromSessionStorage(){
    const localCoordinate=sessionStorage.getItem("user-coordinate");
    if(!localCoordinate){
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinate=JSON.parse("localCoordinate");
        fetchUserWheatherInfo(coordinate);
    }
}


async function fetchUserWheatherInfo(coordinate){
    const{lat,lon}=coordinate;
    //make grant container invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");
    //API Call

    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data=await response.json();
        //make loader invisible

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWheatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");
        console.warn(err);
    }
}


function renderWheatherInfo(weatherInfo){
    //firstly we have to fetch the element
    const cityName=document.querySelector("[data-cityName]");
    const countryIcon=document.querySelector("[data-countryIcon]");
    const desc=document.querySelector("[data-wheatherDesc]");
    const wheatherIcon=document.querySelector("[data-wheatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windspeed=document.querySelector("[data-windSpeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-cloudiness]");

    
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText=weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = weatherInfo?.main?.temp;
    windspeed.innertext = weatherInfo?.wind?.speed;
    humidity.innertext = weatherInfo?.main?.humidity;
    cloudiness.innerText = weatherInfo?.clouds?.all;
}