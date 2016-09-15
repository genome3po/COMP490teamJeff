var url = 'http://curriculum.ptg.csun.edu/api/courses/comp';
$(document).ready(function() {

	// perform a shorthand AJAX call to grab the information
	$.get(url, function(data) {

		// iterate over the returned courses
		var courses = data.courses;
		$(courses).each(function(index, course) {

			// append each course to the content of the element
			$('#course-results').append('<p>' + course.subject + ' ' + course.catalog_number + '</p>');

		});
		
	});

});