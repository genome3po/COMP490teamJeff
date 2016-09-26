$(document).ready(function() {

    $('#filter-submit-button').click(function() {
        var filterMap = new Object();

        checkDayInput(filterMap);
        checkTimeInput(filterMap);

        var courseMap = filterHandler(COURSE_CALL, filterMap);

        displayClasses(courseMap);
    });

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

    function checkTimeInput(filterMap) {

        var start_time = $("#start_time").val();
        var end_time = $("#end_time").val();

        start_time = (start_time === "" ? undefined : start_time);
        end_time = (end_time === "" ? undefined : end_time);

        if(start_time != undefined || end_time != undefined) {
            filterMap.time = [];
            filterMap.time.start_time = (start_time != undefined ? start_time : null );
            filterMap.time.end_time = (end_time != undefined ? end_time : null );
            debugger;
        } else {
            return;
        }
    }

});