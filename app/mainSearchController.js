$(document).ready(function() {

	// perform a shorthand AJAX call to grab the informatiom
	$(subjects).each(function(index,subject) {
		$('#subjects').append('<option>' + subject + '</option>');
	});
	var courses;
	$('#department-submit-button').click(function() {
		var selected = $('#subjects').val();
		url = baseurl + 'classes/' + selected;
		$.get(url, function(data) {

			var courseMap = Object();

			// iterate over the returned courses
			courses = data.classes;
			$('#course-results').empty();
			$(courses).each(function(index, course) {
				var courseInfo;
				if(courseMap[course.catalog_number] === undefined) {
					courseInfo = Object();
					courseInfo.subject = course.subject;
					courseInfo.title = course.title;
					courseInfo.catalog_number = course.catalog_number;
					courseInfo.description = course.description;
					//concatInstructors(course.instructors, courseInfo.);
					courseMap[course.catalog_number] = courseInfo;
				} else {
					courseInfo = courseMap[course.catalog_number];
					//concatInstructors(course.instructors, courseInfo.);
				}

			});

			displayClasses(courseMap);
		});
	});

	function displayClasses(courseMap) {
		$.map(courseMap, function(value, index) {
			console.log(value.title + " " + index);

			// append each course to the content of the element
			$('#course-results').append('<p>' + value.subject + ' ' + value.catalog_number + ' ' + value.title +
				'<br>' + value.description + '</p>');
		});
	}

	function dayFilter(courseList, filter) {
		if(courseList != null) {

		}
	}

	$('#instructor-submit-button').click(function() {
		var firstName = $('#firstName').val();
		var lastName = $('#lastName').val();
		url = baseurl + 'classes?instructor=' + firstName + '.' + lastName + '@csun.edu';
		$.get(url, function(data) {

			// iterate over the returned courses
			classes = data.classes;
			$('#course-results').empty();
			$(classes).each(function(index, course) {

				// append each course to the content of the element
				$('#course-results').append('<p>' + course.subject + ' ' + course.catalog_number + '</p>');
			});
		});
	});
});
