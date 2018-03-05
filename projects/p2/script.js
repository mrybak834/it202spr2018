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

        selectedItems.forEach(function(element){
            $("#map").append("<p>"+ element +"<p>")
        });
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




    
});