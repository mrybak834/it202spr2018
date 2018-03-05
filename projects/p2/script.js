$( document ).ready(function() {
    selectedItems = [];
    $("#title").toggle();
    $("#startButton").click(function(){
        $("#title").toggle();
        $("#input").toggle();
    });
    $("#searchButton").click(function(){
        $("#input").toggle();
        $("#map").toggle();

        // selectedItems.forEach(function(element){
        //     $("#map").append("<p>"+ element +"</p>")
        // });

        for (i = 0; i < 20; i++) { 
            $("#map").append("<p>aasdfasdfasdfasfasdfffffffffffffffffffffff<p>")
        }
    });

    // Get school type list
    $.get("https://data.cityofchicago.org/resource/76dk-7ieb.json?$SELECT=school_type&$group=school_type", function(data){
        data.forEach(function(element){
            console.log(element.school_type);
            $("select").append("<option>" + element.school_type + "</option>");
        });
    });


    // Get items user selected
    $( "select" )
    .change(function() {
      selectedItems = [];
      $( "select option:selected" ).each(function() {
        // str += $( this ).text() + " ";
        selectedItems.push($(this).text())
      });
    })
    .trigger( "change" );

    $.ajax({
        url: "https://data.cityofchicago.org/resource/qjqj-a2d9.json",
        method: 'GET',
    }).done(function (result) {
        $.each(result, function (key, value) {
            console.log("Lat: " + value.latitude + ", Long: " + value.longitude);
            label = "Lat: " + value.latitude + ", Long: " + value.longitude;
            var myLatLng = { lat: parseFloat(value.latitude), lng: parseFloat(value.longitude) };
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map
            });

            var infowindow = new google.maps.InfoWindow({
                content: label
            });

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });

        });

    }).fail(function (err) {
        throw err;
    });


});

function initMap() {
    var Chicago = { lat: 41.8781, lng: -87.6298 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: Chicago
    });
}