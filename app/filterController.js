$(document).ready(function() {

    $('#filter-submit-button').click(function() {
        setupFiltering();
        
        displayClasses(COURSE_CALL);
    });

});