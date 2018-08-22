/*
    Student Name: GIRI,SUNITA
     Student_id: 1001339980
     Project name:Web Mashup-Display House Address on a Map with Weather details
     Project_no: 2
     Project due_date :26th october 2016
     API key:AIzaSyC1kK4hn9Q448HLA83iMO8dXtIygguwvSY
     Username:sunitagiri
*/

var username = "sunitagiri";
var request = new XMLHttpRequest();
var requestxml=new XMLHttpRequest();
var positionclick;
var geocoder;
var infowindow;
var add;
function cleardiv(elementID)
{
    document.getElementById("result").innerHTML = "";
}

//initMap() which initiates map to a location

function initMap(){

 

       var myLatLng = {lat: 32.75, lng:-97.13};
       
      
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: myLatLng
        });

          geocoder = new google.maps.Geocoder();
          infowindow = new google.maps.InfoWindow();
          var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          draggable:true,
         // title: 'Hello World!'
        });
          reversegeocode(map,marker);
        }


// Reserse Geocoding 
var latitude;
var longtitude;
function reversegeocode(map,marker) {

 
    google.maps.event.addListener(map, 'click', function(e) {


         positionclick = e.latLng;
           add=getAddress(positionclick,map,infowindow,geocoder,marker);
       // alert("sunita"+add);
          latitude=e.latLng.lat();
         longtitude=e.latLng.lng();
        marker.setPosition(positionclick);
        sendRequest(latitude,longtitude);
      
});



}// end of geocodeLatLng()

  function getAddress(latLng,map,infowindow,geocoder,marker) {
   // alert("sunita");
    geocoder.geocode( {'latLng': latLng},
      function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
          if(results[0]) {
               
              add= results[0].formatted_address;
              infowindow.setContent(results[1].formatted_address);
              infowindow.open(map, marker);
             // alert(add);
              return add;
         
          }
          else {
            add = "No results";
          }
        }
        else {
           add = status;
        }

      });
    
    }



function displayResult () {
    if (request.readyState == 4) {

        if (request.status == 200){
        var xml = request.responseXML.documentElement;
        var temperature = xml.getElementsByTagName("temperature")[0].childNodes[0].nodeValue;
      var windspeed = xml.getElementsByTagName("windSpeed")[0].childNodes[0].nodeValue;
      var clouds = xml.getElementsByTagName("clouds")[0].childNodes[0].nodeValue;;

        var weather="<b>Temperature:</b>  &nbsp"+temperature+" &deg C"+'<br>'+"<b>Windspeed:</b> &nbsp "+windspeed+" mps"+'<br>'+"<b>Clouds:</b>  &nbsp"+clouds+'<br>'
       
       //alert(add);
          var finalresult="<br>"+weather  +"<b>Address:</b> &nbsp   "+add+"<br>";
           document.getElementById("result").innerHTML += finalresult;

        }
    }

    
          
  

        
  

    
     
}

function sendRequest (latitude,longtitude) {
    request.onreadystatechange = displayResult;
   // requestxml.onreadystatechange=displayResult;
    var lat = latitude;
    var lng = longtitude;
    request.open("GET"," http://api.geonames.org/findNearByWeatherXML?lat="+lat+"&lng="+lng+"&username="+username);
    //requestxml.open("GET","http://api.geonames.org/findNearestAddress?lat="+lat+"&lng="+lng+"&username="+username);

    request.send(null);
    //requestxml.send(null);
}

