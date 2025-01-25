async function displayCityName() {
    const currLocation = await getCurrLocation();
    if (currLocation) {
        console.log("Geolocation available");
        changeContents(currLocation);
    } else {
        document.getElementById("searchbar").placeholder="Unable to access location";
        document.getElementById("searchbar").value="";
    }
}
function changeContents(currLocation){   
    document.getElementById("cityName").innerHTML = currLocation.location.name;
    document.getElementById("weather").innerHTML = currLocation.current.condition.text;
    document.getElementById("humid").innerHTML = currLocation.current.humidity;
    document.getElementById("pressure").innerHTML = currLocation.current.pressure_in;
    document.getElementById("icon").src = `https:${currLocation.current.condition.icon}`;
    document.getElementById("temp").innerHTML = currLocation.current.temp_c;
    document.getElementById("feels").innerHTML = currLocation.current.feelslike_c;
    document.getElementById("wind").innerHTML = currLocation.current.wind_mph;
}
window.onload = displayCityName;
async function getCurrLocation(){
    let curr;
    if(navigator.geolocation){
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            curr = await getCityName(lat, long); 

        } catch (error) {
            console.log(error);
            document.getElementById("searchbar").placeholder="Error accessing location";
            document.getElementById("searchbar").value="";
        }
    }
    else{
        document.getElementById("searchbar").placeholder="Can't access location";
        document.getElementById("searchbar").value="";
    }
    return curr;
}

async function getCityName(lat,long){
    try{
        const response=await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${lat},${long}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '75477c6dcamsh874ee45ea96470ep1004bajsnbea63950883b',
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
            }
    });
        if(!response.ok){
            throw new Error("Error accessing your location");
        }
        const data=await response.json();
        return data;
    }
    catch(error){
        console.log(error);
        document.getElementById("searchbar").placeholder="Enter a valid city name";
        document.getElementById("searchbar").value="";
    }
}
async function fetchWeather(){
    const locName=document.getElementById("searchbar").value.toLowerCase();
    if(locName){
        try{
            const response=await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${locName}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '75477c6dcamsh874ee45ea96470ep1004bajsnbea63950883b',
                    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
                }
        });
            if(!response.ok){
                throw new Error("Error accessing your location");
            }
            const data=await response.json();
            changeContents(data);
        }
        catch(error){
            console.log(error);
            document.getElementById("searchbar").placeholder="Enter a valid city name";
            document.getElementById("searchbar").value="";
        }
    }
    else{
        document.getElementById("searchbar").placeholder="Enter a valid city name";
        document.getElementById("searchbar").value="";
    }
}