function filterHandler(courseList, filterMap) {
    $.map(filterMap, function(val, i) {
        switch(i) {
            case "day":
                courseList = filterDay(courseList, val);
                break;
            case "time":
                // courseList = filterTime(courseList, val);
                break;
            default:
                break;
        }
    });

    return courseList;
}

/**
 * Receives a list of courses and returns only the courses that adhere to
 * the specified day filter.
 * @param courseList
 * @param dayFilter
 *              A regular expression for the days to include
 *              i.e. ^(M|W|MW)$ will return all courses that
 *              are on Monday, Wednesday, or Monday and Wednesday
 * @returns {Array}
 */
function filterDay(courseList, dayFilter) {
    var courseListReturn = [];

    // Iterate through each course
    $.each(courseList, function(index, course) {
        var meetings = course.meetings;

        // Iterate through each meeting day for a course
        // If the meeting day is in the filter then push the
        // course onto the list and create a new meeting array for it
        // with the matching meeting day
        var returnCourse = course;
        var inFilter = false;
        returnCourse.meetings = [];
        $.each(meetings, function(index, meeting) {
            if(meeting.days.match(dayFilter)) {
                returnCourse.meetings.push(meeting);
                inFilter = true;
            }
        });
        if(inFilter) {
            courseListReturn.push(returnCourse);
        }
    });
    return courseListReturn;
}
