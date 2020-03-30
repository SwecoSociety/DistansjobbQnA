function generateHtmlTable(data) {
	var html = '<table  class="table table-condensed table-hover table-striped">';
	  if(typeof(data[0]) === 'undefined') {
		 return null;
	  } else {
	  $.each(data, function( index, row ) {
		 //bind header
		 if(index == 0) {
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
		 } else {
		  html += '<tr>';
		  $.each(row, function( index, colData ) {
			  html += '<td>';
			  html += colData;
			  html += '</td>';
		  });
		  html += '</tr>';
		 }
	  });
	  html += '</tbody>';
	  html += '</table>';
	  //alert(html);
	  $('body').append(html);
	 }
  }	

$(document).ready(function() {
	$.get( "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEnQLr27BEw356nJFgxk6iMdCq53DLXiWEV-LdNZks6wXMNLqp1RlT_n1tIwg1v7avYZDdIkY-Viwq/pub?gid=0&single=true&output=csv", function( data ) {
	//$( ".result" ).html( data );
	console.log(data)
	//alert( "Load was performed." );
	generateHtmlTable(data)
		});
	});
