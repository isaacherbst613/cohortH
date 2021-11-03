/* global google */
(function () {
    'use strict';

    const input = $('#sidebar input');
    const submit = $('#submit');
    const sidebarLi = $('#locList');
    const boundsBtn = $('#showAll');
    const maxRows = $('#numRows');
    let markers = [];

    const theMap = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.09572118344493, lng: -74.22206599308187 },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.MAP
    });

    const infoWindow = new google.maps.InfoWindow();
    let bounds = new google.maps.LatLngBounds();
    submit.click(async () => {
        const location = input.val().replace(' ', '%20');
        try{
        const response = await fetch(`http://api.geonames.org/wikipediaSearch?q=${location}&maxRows=${maxRows.val()}&username=isaacHerbst&type=json`);
                if (!response.ok) {
                    throw new Error(`${response.status}, ${response.statusText}`);
                }
        const data = await response.json();
                deletePrevQuery();
                
                data.geonames.forEach(loc => {
                    const latLng = { lat: loc.lat, lng: loc.lng };
                    addMarker(latLng, loc.title, loc.thumbnailImg, loc.wikipediaUrl, loc.summary, false);
                    bounds.extend(latLng);
                    const smryPic = $(`<img class="sidebarImg" src="${loc.thumbnailImg}" alt="${loc.title}"  onError="this.onerror=null;this.src='items/noImg.png';">`)
                        .click(() => {
                            theMap.panTo(latLng);
                            boundsBtn.show();
                        })
                    const smryP1 = $(`<li class="nav-item">
                                        <a href="https://${loc.wikipediaUrl}" target="_blank" class="nav-link text-white" aria-current="page">${loc.title}</a>
                                    </li>`);
                    smryP1.append(smryPic, `<p class="fw-lighter fs-6"">${loc.summary}</p>        
                                        <hr>`);


                    sidebarLi.append(smryP1);

                });
                theMap.fitBounds(bounds);
                setMaps(theMap);

            }catch(e){
                console.log(e);
            }
    });

    boundsBtn.click(() => {
        theMap.fitBounds(bounds);
        boundsBtn.hide();
    })

    function addMarker(pos, title, pic, wiki=null, summary='No info found', custom = true) {
        const mark = new google.maps.Marker({
            position: pos,
            animation: google.maps.Animation.DROP,
            title: title,
            map: theMap
        });
        if (pic) {
            mark.setIcon({
                url: pic,
                scaledSize: new google.maps.Size(50, 50)
            });
        }
        mark.addListener('click', () => {
            infoWindow.setContent(`
                        ${summary}
                        <hr>
                        <a target="_blank" href="https://${wiki}">more info</a>
                        `);
            infoWindow.open(theMap, mark);
            theMap.panTo(mark.getPosition());
            setTimeout(() => {theMap.setZoom(18);}, 500); 
            boundsBtn.show();
        });
        if(!custom){
            markers.push(mark);
        }
        return mark;
    }

    function setMaps(map) {//toggle marker on map
        markers.forEach(marker => {
            marker.setMap(map);
        })
    }

    function deletePrevQuery() {
        setMaps(null);
        markers.length = 0; //empty array
        bounds.length = 0; //reset bounds
        sidebarLi.empty();
        boundsBtn.hide();
    }


///////////////////////////
    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
                google.maps.drawing.OverlayType.MARKER,
                google.maps.drawing.OverlayType.CIRCLE,
                google.maps.drawing.OverlayType.POLYGON,
                google.maps.drawing.OverlayType.POLYLINE,
                google.maps.drawing.OverlayType.RECTANGLE,
            ],
        },
        markerOptions: {
            icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
            clickable: true
        },
        circleOptions: {
            fillColor: "#55cc55",
            fillOpacity: .7,
            strokeWeight: 2,
            clickable: true,
            editable: true,
            zIndex: 1,
            draggable: true,
            geodesic: true
        },
        rectangleOptions:{
            fillColor: "#55ccdd",
            fillOpacity: 0.7,
            strokeWeight: 2,
            clickable: true,
            editable: true,
            zIndex: 1,
            draggable: true,
            geodesic: true
        },
        polygonOptions:{
            fillColor: "#ddcc55",
            fillOpacity: 0.7,
            strokeWeight: 2,
            clickable: true,
            editable: true,
            zIndex: 1,
            draggable: true,
            geodesic: true
        },
        polylineOptions:{
            strokeWeight: 3,
            strokeColor: "#dd5555",
            clickable: true,
            editable: true,
            zIndex: 1,
            draggable: true,
            geodesic: true
        }
        
    });

    drawingManager.setMap(theMap);


    let drawings = [];
    
    drawingSaver('circle', m => {return {pos: m.getCenter(), radius: m.getRadius()} });
    drawingSaver('marker', m => {return {pos: m.getPosition()} });
    drawingSaver('rectangle', m => {return {pos: m.getBounds()} });
    drawingSaver('polyline', m => {return {pos: m.getPath().getArray()} });
    drawingSaver('polygon', m => {return {pos: m.getPath().getArray()} });


    function drawingSaver(type, deets){
        google.maps.event.addListener(drawingManager,  `${type}complete`, m =>{
            drawings.push({
                type: type,
                details: deets(m)
            });
            localStorage.setItem('drawings', JSON.stringify(drawings));
        })     
    }

    // function recordChange(type, deets){  right now if drawing is changed, change will not be stored
    //     google.maps.event.addListener(type, 'dragend', function(e) {
    //         console.log(e.getCenter()|| e.getPosition());

    //         localStorage.setItem('drawings', JSON.stringify(drawings));
    //       });
    // }

    function reDrawStorage(){

        drawings = JSON.parse(localStorage.getItem('drawings')) || [];
        drawings.forEach(e=>{
            if(e.type === 'marker'){
                const newMark = addMarker(e.details.pos, 'custom marker');
                newMark.setIcon({
                    url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                    scaledSize: null
                });
            }else if (e.type === 'circle'){
                makeCircle(e.details.pos, e.details.radius);
            }else if (e.type === 'rectangle'){
                makeRec(e.details.pos);
            }else if (e.type === 'polygon'){
                makePG(e.details.pos);
            }else if (e.type === 'polyline'){
                makePL(e.details.pos);
            }
        })

    }
    reDrawStorage();

    function makeCircle(pos, radius){
        new google.maps.Circle({
            strokeColor: "#000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#77ee77",
            fillOpacity: 0.35,
            map: theMap,
            center: pos,
            radius: radius,
            editable: true,
            clickable: true,
            zIndex: 1,
            draggable: true,
            geodesic: true
        });
    }
    function makeRec(bounds){
        new google.maps.Rectangle({
            bounds: bounds,
            strokeColor: "#000",
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: "#77eeff",
            fillOpacity: 0.35,
            map: theMap,
            editable: true,
            draggable: true,
            geodesic: true
        });
    }
    function makePG(paths){
        new google.maps.Polygon({
            paths: paths,
            strokeColor: "#000",
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: "#ffee77",
            fillOpacity: 0.35,
            map: theMap,
            editable: true,
            draggable: true,
            geodesic: true
        });
    }
    function makePL(paths){
        console.log(paths);
        new google.maps.Polyline({
            path: paths,
            strokeColor: "#ee7777",
            strokeOpacity: 0.7,
            strokeWeight: 2,
            map: theMap,
            editable: true,
            draggable: true,
            geodesic: true
        });
    }
    


}())