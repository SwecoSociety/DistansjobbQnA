function processData(allText) {
	var rows = allText.split(/\r\n|\n/);
	//var headers = rows[0].split(',');
	data = []
	for (var i=1; i<rows.length; i++) {
		var row = rows[i].split('	');
		data.push(row)
		/*if (data.length == headers.length) {
			var tarr = [];
			for (var j=0; j<headers.length; j++) {
				tarr.push(headers[j]+":"+data[j]);
			}
			lines.push(tarr);
		}*/
	}
	// alert(lines);
	return data;
}

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
	$.get( "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEnQLr27BEw356nJFgxk6iMdCq53DLXiWEV-LdNZks6wXMNLqp1RlT_n1tIwg1v7avYZDdIkY-Viwq/pub?gid=0&single=true&output=tsv", function( csv ) {
		//$( ".result" ).html( data );
		console.log(csv)
		//alert( "Load was performed." );
		data = processData(csv)//$.csv.toObjects(csv)
		generateHtmlTable(data)
		});
	});
