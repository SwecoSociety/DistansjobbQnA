function csvJSON(csv){

	var lines=csv.split("\n");
 
	var result = [];
 
	// NOTE: If your columns contain commas in their values, you'll need
	// to deal with those before doing the next step 
	// (you might convert them to &&& or something, then covert them back later)
	// jsfiddle showing the issue https://jsfiddle.net/
	var headers=lines[0].split(",");
 
	for(var i=1;i<lines.length;i++){
 
		 var obj = {};
		 var currentline=lines[i].split(",");
 
		 for(var j=0;j<headers.length;j++){
			  obj[headers[j]] = currentline[j];
		 }
 
		 result.push(obj);
 
	}
 
	//return result; //JavaScript object
	return JSON.stringify(result); //JSON
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
	$.get( "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEnQLr27BEw356nJFgxk6iMdCq53DLXiWEV-LdNZks6wXMNLqp1RlT_n1tIwg1v7avYZDdIkY-Viwq/pub?gid=0&single=true&output=csv", function( csv ) {
		//$( ".result" ).html( data );
		console.log(csv)
		//alert( "Load was performed." );
		json = csvJSON(csv)//$.csv.toObjects(csv)
		data = JSON.parse(json)
		generateHtmlTable(data)
		});
	});
