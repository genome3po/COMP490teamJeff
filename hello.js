var baseurl = 'http://curriculum.ptg.csun.edu/api/';

var subjects = ["A/R","AAS","ACCT","AE","AFRS","AIS","AM","ANTH","ARAB","ARMN","ART",
"ASTR","ATHL","ATHS","BIOL","BLAW","BUS","CADV","CAS","CD","CE","CECS","CHEM","CHIN",
"CHS","CIT","CLAS","CM","CMT","COMP","COMS","CTVA","DEAF","ECE","ECON","EDUC","EED",
"ELPS","ENGL","EOH","EPC","FCCA","FCFC","FCHC","FCS","FCSB","FCUD","FIN","FLIT","FREN",
"GBUS","GEOG","GEOL","GWS","HEBR","HHD","HIST","HSCI","HUM","HUMA","IS","ITAL","JAPN",
"JOUR","JS","KIN","KOR","LING","LRS","MATH","MCOM","ME","MGT","MKT","MPA","MSE","MUS",
"NURS","PERS","PHIL","PHSC","PHYS","POLS","PSY","PT","QS","RS","RTM","RUSS","SBS","SCI",
"SCM","SED","SOC","SOM","SPAN","SPED","SUST","SWRK","TH","UDFC","UNIV","URBS","URBSFal"];

function courseClick() {
    document.getElementByName("p").innerHTML = "YOU CLICKED ME!";
}

$(document).ready(function() {

	// perform a shorthand AJAX call to grab the informatiom
	$(subjects).each(function(index,subject) {
		$('#subjects').append('<option>' + subject + '</option>');
	});
	var courses;
	$('#department-submit-button').click(function() {
		var selected = $('#subjects').val();
		url = baseurl + 'courses/' + selected;
		$.get(url, function(data) {

			// iterate over the returned courses
			courses = data.courses;
			$('#course-results').empty();
			$(courses).each(function(index, course) {

				// append each course to the content of the element
				$('#course-results').append('<p onclick="courseClick()">' + course.subject + ' ' + course.catalog_number + '</p>');
			});
		});
	});

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
