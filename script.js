window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            lon = position.coords.longitude;
            lat = position.coords.latitude;
            let weatherAPI = "513b643f3771aaf11c3048739341119a"
            fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${weatherAPI}`).
                then((actualdata) => {
                    return actualdata.json()        // json parsing
                }).then((data) => {
                    // console.log(data)

                    document.getElementById("city").innerHTML = (data.name) + " , " + (data.sys.country);

                    document.getElementById("hm").innerHTML = data.main.humidity + ' %'
                    document.getElementById("feels_like").innerHTML = data.main.feels_like + "°C";
                    document.getElementById("temp").innerHTML = data.main.temp + "°C"
                    document.getElementById("des").innerHTML = data.weather[0].description;

                    let icon = data.weather[0].icon;
                    document.getElementById("imgicon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

                }).catch((error) => {
                    console.log(error)
                })
        })
    }
});

timediv = document.getElementById("date")
setInterval(() => {
    let currenttime = new Date();
    onlyhour = currenttime.getHours()
    onlyminute = currenttime.getMinutes()
    onlyseconds = currenttime.getSeconds()

    if (onlyhour <= 12) {
        onlyhour = currenttime.getHours()
    }
    else {
        onlyhour = onlyhour - 12
    }

    timediv.innerText = (onlyhour < 10 ? "0" + onlyhour : onlyhour) + ':' + (onlyminute < 10 ? "0" + onlyminute : onlyminute) + ':' + (onlyseconds < 10 ? "0" + onlyseconds : onlyseconds);
});

showdata = () => {
    let userinput = document.getElementById("inputtext").value;
    console.log(userinput)
}
function getdata() {
    console.clear()
    let weatherAPI = "513b643f3771aaf11c3048739341119a"
    let userinput = document.getElementById("inputtext").value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userinput}&units=metric&exclude=hourly,minutes&appid=${weatherAPI}`)

        .then((actualdata) => {
            return actualdata.json()        // json parsing
        })
        .then((data) => {
            console.log(data)
            document.getElementById("city").innerHTML = (data.name) + " , " + (data.sys.country);
            document.getElementById("feels_like").innerHTML = (data.main.feels_like) + '°C'
            document.getElementById("temp").innerHTML = (data.main.temp) + '°C';
            document.getElementById("des").innerHTML = (data.weather[0].description).toUpperCase()
            let icon = data.weather[0].icon

            document.getElementById("imgicon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

        }).catch((error) => {
            console.log(error)
        })
}