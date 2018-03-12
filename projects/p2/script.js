$( document ).ready(function() {
    selected = [];
    markers = [];
    $("#main").toggle();
    $("#title").toggle();
    $("#startButton").click(function(){
        $("#title").toggle();
        $("#input").toggle();
    });
    $("#searchButton").click(function(){
        $("#input").toggle();
        $("#main").toggle();
        $("#map").toggle();


        
        queryString = "https://data.cityofchicago.org/resource/76dk-7ieb.json?$where=school_type IN (";

        selected.forEach(function(element){
            queryString += "'" + element + "'" + ",";
        });

        queryString = queryString.substring(0, queryString.length - 1);
        queryString += ")";

        console.log(queryString);

        var icons = {
            "Career academy" :{
                url: "./resources/images/careerAcademy.jpg", 
                scaledSize: new google.maps.Size(50, 50), 
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
            },
            "Charter" :{
                url: "./resources/images/charter.png", 
                scaledSize: new google.maps.Size(50, 50), 
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
            },
            "Citywide-Option" :{
                url: "./resources/images/citywide-option.jpg", 
                scaledSize: new google.maps.Size(50, 50), 
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
            },
            "Classical" :{
                url: "./resources/images/classical.png", 
                scaledSize: new google.maps.Size(50, 50), 
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
            },
            "Contract" :{
                url: "./resources/images/contract.jpg", 
                scaledSize: new google.maps.Size(50, 50), 
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
            },
            "Magnet" :{
                url: "./resources/images/magnet.jpg", 
                scaledSize: new google.maps.Size(50, 50), 
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
            },
            "Military academy" :{
                url: "./resources/images/militaryAcademy.jpg", 
                scaledSize: new google.maps.Size(50, 50), 
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
            },
            "Neighborhood" :{
                url: "./resources/images/neighborhood.jpg", 
                scaledSize: new google.maps.Size(50, 50), 
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
            },
            "Regional gifted center" :{
                url: "./resources/images/regionalGiftedCenter.jpg", 
                scaledSize: new google.maps.Size(50, 50), 
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
            },
            "Selective enrollment" :{
                url: "./resources/images/selectiveEnrollment.png", 
                scaledSize: new google.maps.Size(50, 50), 
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
            },
            "Small" :{
                url: "./resources/images/small.jpg", 
                scaledSize: new google.maps.Size(50, 50), 
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
            },
            "Special Education" :{
                url: "./resources/images/specialEducation.jpg", 
                scaledSize: new google.maps.Size(50, 50), 
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
            },
            
        };
        

        $.ajax({
            url: queryString,
            method: 'GET',
        }).done(function (result) {
            $.each(result, function (key, value) {
                console.log(value);
                console.log("Lat: " + value.location.coordinates[1] + ", Long: " + value.location.coordinates[0]);
                label = "Name: " + value.long_name + ", Type: " + value.school_type;
                var myLatLng = { lat: parseFloat(value.location.coordinates[1]), lng: parseFloat(value.location.coordinates[0]) };
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: icons[value.school_type]
                });
    
                markers.push(marker);

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
    $("#backButton").click(function(){
        $("#main").toggle();
        $("#map").toggle();
        $("#input").toggle();

        for (var i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
          }
          markers.length = 0;
        
        markers = [];

        selected = [];
    });


    // Get school type list
    $.get("https://data.cityofchicago.org/resource/76dk-7ieb.json?$SELECT=school_type&$group=school_type", function(data){
        data.forEach(function(element){
            console.log(element.school_type);
            $("select").append("<option>" + element.school_type + "</option>");
        });
    });


    // Get items user selected
    selected = [];
    $( "select" )
    .change(function() {
      $( "select option:selected" ).each(function() {
        selected.push($(this).text());
      });
    })
    .trigger( "change" );


});

function initMap() {
    var Chicago = { lat: 41.8781, lng: -87.6298 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: Chicago
    });
}