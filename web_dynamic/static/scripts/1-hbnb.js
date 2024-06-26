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
});
