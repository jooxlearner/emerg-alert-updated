

var map = L.map('map');
map.setView([13.13798423, 80.20428], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let carIcon = L.icon({
    iconUrl: 'sport-car-transparent-background-3d-rendering-illustration_494250-39270.avif',
    iconSize: [50, 50]
});

let ambulanceIcon = L.icon({
    iconUrl: '8232-png_860.png',
    iconSize: [50, 50]
});

let hospitalIcon = L.icon({
    iconUrl: 'lovepik-hospital-png-image_401563532_wh860.png',
    iconSize: [50, 50]
});

let car2Icon = L.icon({
    iconUrl: 'lovepik-rhino-modeling-muscle-car-png-image_401778890_wh860.png',
    iconSize: [50, 50]
});

let ambulance = L.marker([13.13798423, 80.20428],{icon: ambulanceIcon}).addTo(map);
let hospital = L.marker([13.13084,80.21397],{icon: hospitalIcon}).addTo(map);  // Added markersecond back into the code
let markercar1 = L.marker([13.13699244684699,80.2082812574],{icon: carIcon}).addTo(map);
let markercar2 = L.marker([13.13087615643674,80.21266490239442],{icon: car2Icon}).addTo(map);
let previousDistance1 = Infinity;
let previousDistance2 = Infinity;

let circle = L.circle([13.13798423, 80.20428], {radius: 300}).addTo(map);
//let alertcircle = L.circle([13.13798423, 80.20428], {radius: 75}).addTo(map);

map.on('click', function(e) {
    let routingControl = L.Routing.control({
        waypoints: [
            L.latLng(13.13798,80.20428),
            L.latLng(13.13084,80.21397)
        ],
        show: false,
        addWaypoints: false,
        fitSelectedRoutes: false,
        createMarker: function() { return null; },


    }).addTo(map);
    
    let routingControlcar1 = L.Routing.control({
        waypoints: [
            L.latLng(13.13699244684699,80.2082812574747),
            L.latLng(13.133229776409305,80.21139641977246)
        ],
        show: false,
        addWaypoints: false,
        fitSelectedRoutes: false,
        createMarker: function() { return null; },
    }).addTo(map);

    let routingControlcar2 = L.Routing.control({
        waypoints: [
            L.latLng(13.13087615643674,80.21266490239442),
            L.latLng(13.1342994343876, 80.21040455915)
        ],
        show: false,
        addWaypoints: false,
        fitSelectedRoutes: false,
        createMarker: function() { return null; },
    }).addTo(map);


    routingControlcar1.on('routesfound',function(e){
        e.routes[0].coordinates.forEach(function(coord,index){
            setTimeout(()=>{
                markercar1.setLatLng([coord.lat,coord.lng]);
                routingControlcar1.setWaypoints([
                    L.latLng(coord.lat, coord.lng),
                    L.latLng(13.133229776409305,  80.21139641977246)
                ])
            },3000*index);
        });
    });

    routingControlcar2.on('routesfound',function(e){
        e.routes[0].coordinates.forEach(function(coord,index){
            setTimeout(()=>{
               
                markercar2.setLatLng([coord.lat,coord.lng]);
                routingControlcar2.setWaypoints([
                    L.latLng(coord.lat, coord.lng),
                    L.latLng(13.1342994343876, 80.21040455915)
                ]);

            },3000*index);
        });
    });

    let popupShown1 = false;
    let popupShown2 = false;

    routingControl.on('routesfound',function(e){
        e.routes[0].coordinates.forEach(function(coord,index){
            setTimeout(()=>{
                ambulance.setLatLng([coord.lat,coord.lng]);
                circle.setLatLng([coord.lat,coord.lng]);
                
                routingControl.setWaypoints([
                    L.latLng(coord.lat, coord.lng),
                    L.latLng(13.13084,80.21397)
                ]);

                let currentDistanceHospital1 = hospital.getLatLng().distanceTo(markercar1.getLatLng());
                let currentDistanceHospital2 = hospital.getLatLng().distanceTo(markercar2.getLatLng());
                let currentDistanceEmergency1 = ambulance.getLatLng().distanceTo(markercar1.getLatLng());
                let currentDistanceEmergency2 = ambulance.getLatLng().distanceTo(markercar2.getLatLng());

     
                     // If the distance is decreasing and less than or equal to 300 meters and the popup has not been shown, display a popup
                     if (currentDistanceHospital1 < previousDistance1 && currentDistanceEmergency1 <= 300 && !popupShown1) {
                         markercar1.bindPopup('The marker is  with 300 meters of markercar1');
                         map.openPopup('The marker is within 300 meters of markercar1', markercar1.getLatLng(), {autoPan: false});
                         popupShown1 = true;
                     }
                     else if (currentDistanceHospital2 < previousDistance2 && currentDistanceEmergency2 <= 300 && !popupShown2) {
                        markercar2.bindPopup('The marker is with 300 meters of markercar2');
                        map.openPopup('dont recive  300 meters of markercar2', markercar2.getLatLng(), {autoPan: false});
                        popupShown2 = true;
                    }
                    
                     // Update the previous distance
                     previousDistance1 = currentDistanceHospital1;
                     previousDistance2 = currentDistanceHospital2;
                   
            },1000*index)
        });
    });
   
});