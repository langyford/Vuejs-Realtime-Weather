


const app = new Vue({

    el: "#appDiv",
    data: {
        weather: [],
        url: "http://api.openweathermap.org/data/2.5/weather?lat=",
        appID: "&appid=60a59a9068bcbe5381c86ecb005d9adc",
        currentLocation: {
            lat: 0,
            lon: 0
        }
    },
    mounted() {

        this.getCurrentLocation();
        this.updateWeather();

    },
    methods: {

        updateWeather() {
            axios.get(this.url + this.currentLocation["lat"] + "&lon=" + this.currentLocation["lon"] + this.appID).then(response => {this.weather = response.data});
            setTimeout(this.updateWeather, 5000);
        },
        getCurrentLocation() {
            axios.get("http://ip-api.com/json/").then(response => {this.currentLocation = response.data});
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
        location() {
            if (this.weather.length != 0)
                return this.weather['name'];
        },
        country() {
            if (this.weather.length != 0)
                return this.weather['sys']["country"];
        },
        description() {
            if (this.weather.length != 0)
                return this.weather['weather'][0]['description'];
        }

    },
    filters: {

        celcius(kelvinVal) {
            return (kelvinVal- 273.15).toFixed(2);
        }

    }

});
