function filterHandler(courseList, filterMap) {
    var returnCourseList = courseList;

    $.map(filterMap, function(val, i) {
        switch(i) {
            case "day":
                returnCourseList = filterDay(returnCourseList, val);
                break;
            case "time":
                returnCourseList = filterTime(returnCourseList, val);
                break;
            default:
                break;
        }
    });

    return returnCourseList;
}

/**
 * Receives a list of courses and returns only the courses that adhere to
 * the specified day filter.
 * @param courseList
 * @param dayFilter
 *              A regular expression for the days to include
 *              i.e. ^(M.*|.*W.*)$ will return all courses that
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

function filterTime(courseList, timeFilter) {
    var courseListReturn = courseList;

    $.each(courseList, function(index, course) {
        var meetings = course.meetings;

        var returnCourse = course;
        var inFilter = false;
        returnCourse.meetings = [];
        $.each(meetings, function(index, meeting) {
            if( (timeFilter.start_time != undefined) && (timeFilter.end_time != undefined) ) {
                if (meeting.start_time >= timeFilter.start_time && meeting.end_time <= timeFilter.end_time) {
                    returnCourse.meetings.push(meeting);
                    inFilter = true;
                }
            } else if ( timeFilter.start_time != undefined ) {
                if (meeting.start_time >= timeFilter.start_time) {
                    returnCourse.meetings.push(meeting);
                    inFilter = true;
                }
            } else if ( timeFilter.end_time != undefined ) {
                if (meeting.end_time <= timeFilter.end_time) {
                    returnCourse.meetings.push(meeting);
                    inFilter = true;
                }
            }
        });

        if(inFilter) {
            courseListReturn.push(returnCourse);
        }
    });
    return courseListReturn;
}
