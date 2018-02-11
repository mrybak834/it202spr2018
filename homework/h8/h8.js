$('#searchButton').click(function() {
    search();
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

            switch (text) {
                case '':
                    break;
                default:
                    $('.thunder-cloud').show();
                    break;
            }

            $('#results').html(
                '&nbsp;&nbsp;&nbsp;' +
                    temp +
                    'F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                    text
            );
            $('#date').text(date);
            $('#description').text(description);
        }
    );
}
