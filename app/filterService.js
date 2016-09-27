/**
 * filterMap layers:
 * day             (regular expression)
 * time
 *      start_time (HH:MM 24h)
 *      end_time   (HH:MM 24h)
 */

function setupFiltering() {
    var filterMap = new Object();

    checkDayInput(filterMap);
    checkTimeInput(filterMap);

    filterHandler(COURSE_CALL, filterMap);
}


/**
 * Checks which day checkboxes are selected and creates a regular expression
 * with their values.
 * @param filterMap
 */
function checkDayInput(filterMap) {
    var selectedDay = [];
    $('#dayCheckboxes input:checked').each(function() {
        selectedDay.push($(this).val());
    });

    var dayRegex = "^(";
    $.each(selectedDay, function(index, value) {
        dayRegex += value;
        dayRegex += (index < selectedDay.length-1 ? "|" : "");
    });
    dayRegex += ")$";

    filterMap.day = dayRegex;
}


/**
 * Checks if time is input for filtering and add their values to
 * the filterMap if they are present.
 * @param filterMap
 */
function checkTimeInput(filterMap) {

    var start_time = $("#start_time").val();
    var end_time = $("#end_time").val();

    start_time = (start_time === "" ? undefined : start_time);
    end_time = (end_time === "" ? undefined : end_time);

    if(start_time != undefined && end_time != undefined) {
        if(start_time > end_time) {
            alert("Start time must be before end time.");
            return;
        }
    }

    if(start_time != undefined || end_time != undefined) {
        filterMap.time = new Object();
        filterMap.time.start_time = (start_time != undefined ? start_time : null );
        filterMap.time.end_time = (end_time != undefined ? end_time : null );
    } else {
        return;
    }
}

function filterHandler(courseList, filterMap) {

    $.each(courseList, function(index, course) {
        $.map(filterMap, function (val, i) {
            switch (i) {
                case "day":
                    filterDay(course, val);
                    break;
                case "time":
                    filterTime(course, val);
                    break;
                default:
                    break;
            }
        });
    }); // end course iteration
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
function filterDay(course, dayFilter) {

    // Iterate through each course
    var meetings = course.meetings;

    // Iterate through each meeting day for a course
    // If the meeting day is in the filter then push the
    // course onto the list and create a new meeting array for it
    // with the matching meeting day
    var validMeeting = false;
    $.each(meetings, function(index, meeting) {
        if(meeting.days.match(dayFilter)) {
            meeting.show = true;
            validMeeting = true;
        } else {
            meeting.show = false;
        }
    }); // end meeting iteration
    course.show = validMeeting;

}


/**
 * Receives a list of courses and returns only the courses that adhere to
 * the specified time filter. Courses are hidden if they do not start after
 * the specified start time or end before the specified end time.
 * @param courseList
 * @param timeFilter
 *              Time filter is structured as start_time and end_time
 */
function filterTime(course, timeFilter) {
    // Check if the course was hidden in the day filterer
    if(course.show === false)
        return;

    var meetings = course.meetings;

    var validMeeting = false;
    $.each(meetings, function (index, meeting) {

        // Check if the meeting was hidden in the day filterer
        if(meeting.show !== false) {

            $.map(timeFilter, function (val, i) {
                switch (i) {
                    case "start_time":
                        if (meeting.start_time < val) {
                            meeting.show = false;
                            validMeeting = false;
                        } else if (val === null) {
                            meeting.show = meeting.show;
                        } else {
                            meeting.show = true;
                            validMeeting = true;
                        }
                        break;
                    case "end_time":
                        if (meeting.end_time > val) {
                            meeting.show = false;
                            validMeeting = false;
                        } else if (val === null) {
                            meeting.show = meeting.show;
                        } else {
                            meeting.show = true;
                            validMeeting = true;
                        }
                        break;
                    default:
                        break;
                }
            });
        }

    }); // end meeting iteration
    course.show = validMeeting;

}
