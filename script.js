console.log("Hello Ram");
const API_KEY = "1cedd1eb88e9ba7be30f5519393a1d27";

function getDataAtUI(data){
    let newPara=document.createElement("p");
    newPara.textContent=`${data?.main?.temp.toFixed(2)}°C`;
    document.body.appendChild(newPara);
}

async function showWeather() {
    try{
    let city = "pune";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    let data = await response.json();
    console.log("Weather data:-> " , data);


    getDataAtUI(data);
    }
    catch(err){
    console.log("Error found",err);
    }
}

async function customWhether(){
    let lat=18.516220;
    let lon=73.740669;
    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    console.log("Weather data:-> " , data);

    getDataAtUI(data);
    }
    catch(err){
        console.log("Error Occured",err);
    }
}


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showposition);
    }
    else{
        console.log("No Location Support");
    }
}

function showposition(position){
    let lattitude= position.coords.latitude;
    let longitude= position.coords.longitude;

    console.log(lattitude);
    console.log(longitude);
}