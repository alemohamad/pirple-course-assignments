/**
 * Homework #18: The W3C Geolocation API
 * Keeping Up With the Javascripts - Part 1: ES6
 * Pirple
 * Alejandro Mohamad
 */

/**
 * 1.  Prompt the user to allow the use of Geolocation API.
 * 2. If the user allows the API, use the Google maps API
 *    to display a large map of their current area, with
 *    a pin on their exact location.
 * 3. If the user doesn't allow the API, display an error
 *    message on the page instead.
 * 
 * Extra Credit:
 * Instead of showing a pin of their current location,
 * show the user driving directions from their current
 * location to the nearest library.
 */

function geoFindMe() {

  const status = document.querySelector('#status');
  const mapIframe = document.querySelector('#map-iframe');

  mapIframe.innerHTML = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';

    const gmKey = 'GOOGLE_MAPS_KEY';

    let mapUrl = `https://www.google.com/maps/embed/v1/directions?key=${gmKey}`;
    mapUrl += `&origin=${latitude},${longitude}`;
    mapUrl += '&destination=nearest+library';
    mapUrl += '&mode=walking';
    mapIframe.innerHTML = `<iframe src="${mapUrl}"></iframe>`;
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

document.querySelector('#find-me').addEventListener('click', geoFindMe);
