const app = new Vue({

    el: "#appDiv",
    data: {
        weather: [],
        url: "http://api.openweathermap.org/data/2.5/weather?lat=",
        appID: "&appid=60a59a9068bcbe5381c86ecb005d9adc",
        currentLocation: [],
        currentTime: "00:00:00"
    },
    mounted() {

        this.getCurrentLocation();
        this.updateWeather();
        this.showTime();

    },
    methods: {

        updateWeather() {
            if (this.currentLocation.length != 0) {
                axios.get(this.url + this.currentLocation["lat"] + "&lon=" + this.currentLocation["lon"] + this.appID).then(response => {
                    this.weather = response.data;
                });
            }
            setTimeout(this.updateWeather, 1000);
        },
        getCurrentLocation() {
            axios.get("http://ip-api.com/json/").then(response => {this.currentLocation = response.data});
        },
        showTime() {
            // For the time now
            Date.prototype.timeNow = function () {
                 return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
            }
            var newDate = new Date();
            this.currentTime = newDate.timeNow();
            setTimeout(this.showTime, 500);
        },
        hideLoader() {
            document.getElementById("loader").style.display = "none";
            document.getElementById("appDiv").style.display = "block";
        }

    },
    computed: {

        temperature() {
            if (this.weather.length != 0)
                return this.weather['main']['temp']; // convert from kelvin to celcius
        },
        humidity() {
            if (this.weather.length != 0)
                return this.weather['main']['humidity'];
        },
        cloudCoverage() {
            if (this.weather.length != 0)
                return this.weather['clouds']['all'];
        },
        description() {
            if (this.weather.length != 0)
                return this.weather['weather'][0]['main'];
        },
        location() {
            if (this.weather.length != 0)
                return this.weather['name'];
        },
        country() {
            if (this.weather.length != 0)
                return this.weather['sys']["country"];
        }

    },
    watch: {

        weather: function() {
            this.hideLoader();
        }

    },
    filters: {

        celcius(kelvinVal) {
            return (kelvinVal- 273.15).toFixed(2);
        }

    }

});
