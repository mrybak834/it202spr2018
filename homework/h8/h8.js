$(document).ready(function() {
    $('#searchButton').click(function() {
        search();
    });

    $('.centered').fadeIn(3000);
    $('#title').fadeIn(3000);
});

function search() {
    var zipCode = $('#zipCode').val();

    $.get(
        "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" +
            zipCode +
            "')&format=json",
        function(data) {
            var description = data.query.results.channel.description;
            var date = data.query.results.channel.item.condition.date;
            var temp = data.query.results.channel.item.condition.temp;
            var text = data.query.results.channel.item.condition.text;
            var humidity = data.query.results.channel.atmosphere.humidity;
            var pressure = data.query.results.channel.atmosphere.pressure;
            var visibility = data.query.results.channel.atmosphere.visibility;

            console.log('Description: ' + description);
            console.log('Date: ' + date);
            console.log('Temp: ' + temp + 'F');
            console.log('Text: ' + text);
            console.log('Humidity: ' + humidity);
            console.log('Pressure: ' + pressure);
            console.log('Visibility: ' + visibility);

            $('#title').fadeTo(1000, 0);

            console.log('THE TEXT IS : ' + text);
            switch (text.toLowerCase()) {
                case 'severe thunderstorms':
                case 'thunderstorms':
                case 'isolated thunderstorms':
                case 'scattered thunderstorms':
                case 'thundershowers':
                    $('.thunder-cloud').fadeIn(2000);
                    break;
                case 'tropical storm':
                case 'hurricane':
                case 'mixed rain and sleet':
                case 'fleeting drizzle':
                case 'drizzle':
                case 'freezing rain':
                case 'showers':
                case 'mixed rain and hail':
                case 'scattered showers':
                    $('.rain-cloud').fadeIn(2000);
                    break;
                case 'mixed rain and snow':
                case 'mixed snow and sleet':
                case 'snow flurries':
                case 'light snow showers':
                case 'blowing snow':
                case 'snow':
                case 'hail':
                case 'sleet':
                case 'heavy snow':
                case 'scattered snow showers':
                case 'snow showers':
                    $('.snow-cloud').fadeIn(2000);
                    break;
                case 'dust':
                case 'foggy':
                case 'haze':
                case 'smoky':
                case 'blustery':
                case 'cloudy':
                case 'mostly cloudy (night)':
                case 'mostly cloudy (day)':
                case 'partly cloudy (night)':
                case 'partly cloudy (day)':
                case 'partly cloudy':
                    $('.sun-cloud').fadeIn(2000);
                    break;
                case 'cold':
                case 'clear (night)':
                case 'sunny':
                case 'fair (night)':
                case 'fair (day)':
                case 'hot':
                    $('.sunshine').fadeIn(2000);
                    break;
                case 'tornado':
                case 'windy':
                    $('.windy-cloud').fadeIn(2000);
                    break;
                default:
                    $('.sunshine').fadeIn(2000);
                    break;
            }

            $('#output').fadeIn(2000);
            $('.extra').fadeIn(2000);

            $('#results').html(temp + '<br>' + text);
            $('#date').text(date);
            $('#description').text(description);
        }
    );
}
