function displayClasses(courseMap) {
    $('#course-results').empty();
    $.map(courseMap, function(value, index) {

        console.log(value.title + " " + index);

        // append each course to the content of the element
        $('#course-results').append('<p>' + value.subject + ' ' + value.catalog_number + ' ' + value.title +
            '<br>' + value.description);
        $.each(value.meetings, function(index, meetings) {
            $('#course-results').append('<br>' + meetings.days);
        });
        $('#course-results').append('</p>');
    });
}