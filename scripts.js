// Return array of string values, or NULL if CSV string not well formed.
function CSVtoArray(text) {
	var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
	var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
	// Return NULL if input string is not well formed CSV string.
	if (!re_valid.test(text)) return null;
	var a = [];                     // Initialize array to receive values.
	text.replace(re_value, // "Walk" the string using replace with callback.
		 function(m0, m1, m2, m3) {
			  // Remove backslash from \' in single quoted values.
			  if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
			  // Remove backslash from \" in double quoted values.
			  else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
			  else if (m3 !== undefined) a.push(m3);
			  return ''; // Return empty string.
		 });
	// Handle special case of empty last value.
	if (/,\s*$/.test(text)) a.push('');
	return a;
};

function generateHtmlTable(data) {
	var html = '<div class="container">';
	if(typeof(data[0]) === 'undefined') {
		return null;
	} else {
		$.each(data, function( index, row ) {
			//bind header
			/*if(index == 0) {
			html += '<thead>';
			html += '<tr>';
			$.each(row, function( index, colData ) {
				html += '<th>';
				html += colData;
				html += '</th>';
			});
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
			} else {*/
			
			html += '<div>';
			$.each(row, function( index, colData ) {
				html += '<p>';
				html += colData;
				html += '</p>';
			});
			html += '</div>';
			//}
		});
		html += '</div>';
		//alert(html);
		$('body').append(html);
	}
}	

$(document).ready(function() {
	$.get( "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEnQLr27BEw356nJFgxk6iMdCq53DLXiWEV-LdNZks6wXMNLqp1RlT_n1tIwg1v7avYZDdIkY-Viwq/pub?gid=0&single=true&output=csv", function( csv ) {
		//$( ".result" ).html( data );
		console.log(csv)
		//alert( "Load was performed." );
		data = CSVtoArray(csv)//$.csv.toObjects(csv)
		generateHtmlTable(data)
		});
	});
