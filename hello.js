var url = 'http://curriculum.ptg.csun.edu/api/courses/';
function makeURL(val) {
	url = url + val;
}

$(document).ready(function() {

	// perform a shorthand AJAX call to grab the informatiom

	$('#departmentSubmitButton').click(function() {
		makeURL($('#formValueId').value);
		$.get(url, function(data) {
			var courses = data.courses;
			$(courses).each(function(index, course) {
				// append each course to the content of the element
				$('#course-results').append('<p>' + course.subject + ' ' + course.catalog_number + '</p>');
			});

		});
		
	});

});