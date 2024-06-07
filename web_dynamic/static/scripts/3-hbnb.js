$(document).ready(function () {
  // Objects to keep track of selected amenities
  const selectedAmenities = {};

  // Listen for changes on each input checkbox
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      // Add the amenity to the selected list
      selectedAmenities[amenityId] = amenityName;
    } else {
      // Remove the amenity from the selected list
      delete selectedAmenities[amenityId];
    }

    // Update the h4 tag inside the div Amenities with the list of selected amenities
    const amenitiesList = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text('Selected Amenities: ' + amenitiesList);
  });
	 // Fetch places
	 fetch('http://0.0.0.0:5001/api/v1/places_search/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then(places => {
      const placesSection = document.querySelector('.places');
      placesSection.innerHTML = ''; // Clear any existing content
      places.forEach(place => {
        // Create article for each place
        const placeArticle = document.createElement('article');

        // Populate the article with place details
        placeArticle.innerHTML = `
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guests</div>
                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                </div>
                <div class="description">
                    ${place.description}
                </div>
            `;
        // Append the article to the places section
        placesSection.appendChild(placeArticle);
      });
    })
    .catch(error => {
      console.error('Error fetching places:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const apiStatus = document.getElementById('api_status');

  // Fetch API status
  fetch('http://0.0.0.0:5001/api/v1/status/')
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        apiStatus.classList.add('available');
      } else {
        apiStatus.classList.remove('available');
      }
    })
    .catch(error => {
      console.error('Error fetching API status:', error);
      apiStatus.classList.remove('available');
    });
});
