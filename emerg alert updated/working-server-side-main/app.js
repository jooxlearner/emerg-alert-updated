
let map = L.map('map');
map.setView([13.13798423, 80.20428], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


let carIcon = L.icon({
    iconUrl: 'img/lovepik-rhino-modeling-muscle-car-png-image_401778890_wh860.png',
    iconSize: [35, 35]
});
let car2Icon = L.icon({
    iconUrl: 'img/sport-car-transparent-background-3d-rendering-illustration_494250-39270.avif',
    iconSize: [35, 35]
});



let ambulanceIcon = L.icon({
    iconUrl: 'img/8232-png_860.png',
    iconSize: [50, 50]
});

let hospitalIcon = L.icon({
    iconUrl: 'img/lovepik-hospital-png-image_401563532_wh860.png',
    iconSize: [50, 50]
});



// Define an array of cars
let cars = [
    {icon:carIcon, position: [13.13699244684699,80.2082812574747], destination: [13.133229776409305,80.21139641977246]},
    {icon:car2Icon, position: [13.13087615643674,80.21266490239442], destination: [13.1342994343876, 80.21040455915]}
];



let circle = L.circle([13.13798423, 80.20428], {radius: 300}).addTo(map);

let ambulances = [
    { position: [13.13798423, 80.20428],destination: [13.13084,80.21397]},
    // Add more Ambulances as per requirement
];

let hospitals = [
    {destination: [13.13084,80.21397]},
    // Add more hospitals as per requirement
];

// Create markers for each car and add them to the map
cars.forEach(car => {
    car.marker = L.marker(car.position,{icon: car.icon} ).addTo(map);
    car.previousDistance = Infinity;
    car.popupShown = false;
});

// Create markers for each ambulance and add them to the map
ambulances.forEach(ambulance => {
    ambulance.marker = L.marker(ambulance.position, {icon: ambulanceIcon}).addTo(map);
    ambulance.end = L.marker(ambulance.destination, {icon: hospitalIcon}).addTo(map);
    ambulance.previousDistance = Infinity;
    ambulance.popupShown = false;
});

// Create markers for each hospital and add them to the map
hospitals.forEach(hospital => {
    hospital.marker = L.marker(hospital.destination, {icon: hospitalIcon});
});


map.on('click', function(e) {

   


    // Create routing controls for each car
    cars.forEach(car => {
        car.routingControl = L.Routing.control({
            waypoints: [
                L.latLng(...car.position),
                L.latLng(...car.destination)
            ],
            show: false,
            addWaypoints: false,
            fitSelectedRoutes: false,
            createMarker: function() { return null; },
        }).addTo(map);

        car.routingControl.on('routesfound', function(e) {
            e.routes[0].coordinates.forEach(function(coord, index) {
                setTimeout(() => {
                    car.marker.setLatLng([coord.lat, coord.lng]);
                    car.routingControl.setWaypoints([
                        L.latLng(coord.lat, coord.lng),
                        L.latLng(...car.destination)
                    ]);
                }, 3000 * index);
            });
        });
    });
          

 
    ambulances.forEach(ambulance => {
        ambulance.routingControl = L.Routing.control({
            waypoints: [
                L.latLng(...ambulance.position),
                L.latLng(...ambulance.destination)
            ],
            show: false,
            addWaypoints: false,
            fitSelectedRoutes: false,
            createMarker: function() { return null; },
        }).addTo(map);
       

        ambulance.routingControl.on('routesfound', function(e) {
            e.routes[0].coordinates.forEach(function(coord, index) {
                setTimeout(() => {
                    ambulance.marker.setLatLng([coord.lat, coord.lng]);
                    circle.setLatLng([coord.lat,coord.lng]);
                    ambulance.routingControl.setWaypoints([
                        L.latLng(coord.lat, coord.lng),
                        L.latLng(...ambulance.destination)
                    ]);
               




cars.forEach(car => {
   
    let currentDistanceHospital = ambulance.end.getLatLng().distanceTo(car.marker.getLatLng());
    
    let currentDistanceEmergency = ambulance.marker.getLatLng().distanceTo(car.marker.getLatLng());

    if (currentDistanceHospital < car.previousDistance && currentDistanceEmergency <= 300 && !car.popupShown) {
        car.marker.bindPopup(`The marker is within 300 meters of ${car.marker}`);
        map.openPopup(`The marker is within 300 meters of ${car.marker}`, car.marker.getLatLng(), {autoPan: false});
        car.popupShown = true;
    }
    else if (currentDistanceHospital > car.previousDistance && currentDistanceEmergency <= 300 && !car.popupShown) {
        car.marker.bindPopup('dont givemarker is within 300 meters of markercar1');
        map.openPopup('did not recieved alert markercar1', car.marker.getLatLng(), {autoPan: false});
        car.popupShown = true;
    }

    car.previousDistance = currentDistanceHospital;

});

}, 1000 * index);
});
});
});
    
});