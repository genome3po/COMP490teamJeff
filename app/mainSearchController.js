var COURSE_CALL;

$(document).ready(function() {

	// perform a shorthand AJAX call to grab the information
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
			$(courses).each(function(index, course) {
				var courseInfo;
				if(courseMap[course.catalog_number] === undefined) {
					courseInfo = Object();
					courseInfo.subject = course.subject;
					courseInfo.title = course.title;
					courseInfo.catalog_number = course.catalog_number;
					courseInfo.description = course.description;
					courseInfo.meetings = [];
					appendMeetingTime(course, courseInfo);
					//concatInstructors(course.instructors, courseInfo.);

					courseMap[course.catalog_number] = courseInfo;

				} else {
					courseInfo = courseMap[course.catalog_number];
					//concatInstructors(course.instructors, courseInfo.);
					appendMeetingTime(course, courseInfo);
				}

			});

			COURSE_CALL = courseMap;
			displayClasses(courseMap);
		});
	});

	function appendMeetingTime(course, courseInfo) {
		$.each(course.meetings, function(index, value) {
			var meeting = [];
			meeting.days = value.days;
			meeting.start_time = convertTime(value.start_time);
			meeting.end_time = convertTime(value.end_time);
			courseInfo.meetings.push(meeting);
		});
	}

	function convertTime(time) {
		var convertedTime = "";

		convertedTime += time[0] + time[1] + ":" +
				time[2] + time[3];

		return convertedTime;
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
