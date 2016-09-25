$(document).ready(function() {

    $('#filter-submit-button').click(function() {
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

        var filterMap = new Object();
        filterMap.day = dayRegex;
        var courseMap = filterHandler(COURSE_CALL, filterMap);

        displayClasses(courseMap);
    });

});