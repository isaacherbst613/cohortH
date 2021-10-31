/* global google */
(function () {
    'use strict';

    const input = $('#sidebar input');
    const submit = $('#submit');
    const sidebarLi = $('#locList');
    const boundsBtn = $('#showAll');
    let markers = [];

    const theMap = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.09572118344493, lng: -74.22206599308187 },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.MAP
    });

    const infoWindow = new google.maps.InfoWindow();
    let bounds;

    submit.click(() => {
        const location = input.val().replace(' ', '%20');
        fetch(`http://api.geonames.org/wikipediaSearch?q=${location}&maxRows=10&username=isaacHerbst&type=json`)
            .then(response => {
                if (!response.ok) {
                    return console.log(`${response.status}, ${response.statusText}`);
                } else {
                    return response.json()
                }
            })
            .then(r => {
                deletePrevQuery();
                bounds = new google.maps.LatLngBounds();
                r.geonames.forEach(loc => {
                    addMarker({ lat: loc.lat, lng: loc.lng }, loc.title, loc.thumbnailImg, loc.wikipediaUrl, loc.summary);
                    bounds.extend({ lat: loc.lat, lng: loc.lng });
                    const smryPic = $(`<img class="sidebarImg" src="${loc.thumbnailImg}" alt="${loc.title}"  onError="this.onerror=null;this.src='items/noImg.png';">`)
                                    .click(()=>{
                                        theMap.setZoom(13);
                                        theMap.panTo({ lat: loc.lat, lng: loc.lng });
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
            })
            .then(()=>{
                setMaps(theMap);

            });
    });

    boundsBtn.click(()=>{
        theMap.fitBounds(bounds);
        boundsBtn.hide();
    })
    
    function addMarker(pos, title, pic, wiki, summary) {
        const mark = new google.maps.Marker({
            position: pos,
            animation: google.maps.Animation.DROP,
            title: title,
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
            theMap.setZoom(15);
            boundsBtn.show();  
        });
        markers.push(mark);
    }
   
    function setMaps(map) {//display marker on map
        markers.forEach(marker => {
            marker.setMap(map);
        })
    }

    function deletePrevQuery(){
        setMaps(null);
        markers.length = 0; //empty array
        sidebarLi.empty();
        boundsBtn.hide();
    }

    $('.sidebarImg').click
    

}())