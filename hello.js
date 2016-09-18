var url = 'http://curriculum.ptg.csun.edu/api/courses/';

var subjects = ["A/R","AAS","ACCT","AE","AFRS","AIS","AM","ANTH","ARAB","ARMN","ART",
"ASTR","ATHL","ATHS","BIOL","BLAW","BUS","CADV","CAS","CD","CE","CECS","CHEM","CHIN",
"CHS","CIT","CLAS","CM","CMT","COMP","COMS","CTVA","DEAF","ECE","ECON","EDUC","EED",
"ELPS","ENGL","EOH","EPC","FCCA","FCFC","FCHC","FCS","FCSB","FCUD","FIN","FLIT","FREN",
"GBUS","GEOG","GEOL","GWS","HEBR","HHD","HIST","HSCI","HUM","HUMA","IS","ITAL","JAPN",
"JOUR","JS","KIN","KOR","LING","LRS","MATH","MCOM","ME","MGT","MKT","MPA","MSE","MUS",
"NURS","PERS","PHIL","PHSC","PHYS","POLS","PSY","PT","QS","RS","RTM","RUSS","SBS","SCI",
"SCM","SED","SOC","SOM","SPAN","SPED","SUST","SWRK","TH","UDFC","UNIV","URBS","URBSFal"];

function makeURL(val) {
	url = url + val;
}

$(document).ready(function() {

	// perform a shorthand AJAX call to grab the informatiom

	$('#departmentSubmitButton').click(function() {
		makeURL($('#formValueId').value);
		$.get(url, function(data) {
			var courses = data.courses;
			$(courses).each(function(index, course) {
				// append each course to the content of the element
				$('#course-results').append('<p>' + course.subject + ' ' + course.catalog_number + '</p>');
			});

		});
		
	});

});