function displayClasses(courseMap) {
    $('#course-results').empty();
    $.map(courseMap, function(value, index) {

        console.log(value.title + " " + index);

        if(value.show === true) {
            // append each course to the content of the element
            $('#course-results').append('<p>' + value.subject + ' ' + value.catalog_number + ' ' + value.title +
                '<br>' + value.description);
            $.each(value.meetings, function (index, meetings) {
                if(meetings.show === true) {
                    $('#course-results').append('<br>' + meetings.days + " " + meetings.start_time + "-" + meetings.end_time);
                }
            });
            $('#course-results').append('</p>');
        }

    });
}