// https://geo.ipify.org/
// https://leafletjs.com/
//result.ip + result.isp + result.location.city+postalcode result.location.lat/lng 
const apiKey = 'at_s2BFufCtCQyvWaYXpCixy7315g4Ym';
const input = document.getElementById('search');
const btn = document.getElementById('btn');



//setting up the map : 
const myIcon = L.icon({
    iconUrl: '/images/icon-location.svg',
    iconSize: [40, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});
const mymap = L.map('cart').setView([0,0], 13);
const marker = L.marker([0, 0],{icon:myIcon}).addTo(mymap);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
//this is just the format of any url for any given tile
//so if you want a particular tile for this (x,y)location with (z)this zoom value and with this (s)style it will give you that tile.
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl , {attribution});
tiles.addTo(mymap);




const getData = async () =>
{
       const response =  await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${input.value}`);
       const data = await response.json();
       console.log(data);
       setData(data)();
    
}



function setData(data){
    const ipaddress = document.getElementById('ip');
    const location = document.getElementById('location');
    const timezone = document.getElementById('timezone');
    const isp = document.getElementById('isp');
    return () => {
      ipaddress.innerText = data.ip;
      location.innerText = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
      timezone.innerText = data.location.timezone;
      isp.innerText = data.isp;
      mymap.setView([data.location.lat,data.location.lng] ,12)
      marker.setLatLng([data.location.lat,data.location.lng]);
    }
   


}


getData();



btn.addEventListener('click',getData);

// L.marker([50.5, -0.10]).addTo(mymap);