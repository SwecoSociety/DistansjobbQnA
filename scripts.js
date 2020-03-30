function tsvToArray(allText) {
	var rows = allText.split(/\r\n|\n/);
	//var headers = rows[0].split(',');
	data = []
	for (var i=1; i<rows.length; i++) {
		var row = rows[i].split('	');
		data.push(row)
	}
	return data;
}

function generateHtmlTable(data) {
	var html = '<div class="container"><h1>Frågor och svar rörande distansarbete</h1>';
	if(typeof(data[0]) === 'undefined') {
		return null;
	} else {
		$.each(data, function( index, row ) {
			html += '<div class="QnA">';
			$.each(row, function( index, colData ) {
				html += '<p>';
				if(index===0){
					
					html += '<br><b>';
				}
				html += colData;
				if(index===0){
					html += '</b>';
				}
				html += '</p>';
			});
			html += '</div>';
		});
		html += '</div>';
		$('body').append(html);
	}
}	

$(document).ready(function() {
	$.get( "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEnQLr27BEw356nJFgxk6iMdCq53DLXiWEV-LdNZks6wXMNLqp1RlT_n1tIwg1v7avYZDdIkY-Viwq/pub?gid=0&single=true&output=tsv", function( tsv ) {
		//$( ".result" ).html( data );
		console.log(tsv)
		//alert( "Load was performed." );
		data = tsvToArray(tsv)//$.tsv.toObjects(tsv)
		generateHtmlTable(data)
		});
	});
