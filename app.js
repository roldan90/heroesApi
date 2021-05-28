$(document).ready(function(){
	$('#btnObtenerTodo').click(function(){
		insertarHeroes();
	});
});

function insertarHeroes() {
	let img = "https://acegif.com/wp-content/uploads/loading-25.gif";
	$('#seccionCarga').html('<img src="'+ img +'">');

	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json",
		success:function(respuesta) {

			let datosTotales = [];
			$.each(respuesta, function(index, value) {
				//nombre de heroe
				let heroe = value["name"];
				let power = value["powerstats"]["power"];
				let nombre = value["biography"]["fullName"];
				let genero = value["appearance"]["gender"];
				let publicado = value["biography"]["publisher"];
				let imagen = value["images"]["sm"];
				datosTotales+= `${heroe},${power},${nombre},${genero},${publicado},${imagen}||`;
			});

			$.ajax({
				type:"POST",
				data:"heroes=" + datosTotales,
				url:"server.php",
				success:function(respuesta) {
					
					if (respuesta == 1) {
						$('#seccionCarga').html("<p>Terminado</p>");
						terminado();
					} else {
						$('#seccionCarga').html("<p>No terminado!!!</p>");
						malTerminado();
					}
					
				}
			});

			
		}
	});
}

function malTerminado(){
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: 'Se inserto mal :(',
		footer: 'Vuelve a intentarlo!'
	})
}

function terminado(){
	Swal.fire({
		title: '<strong>El proceso ha terminado</strong>',
		icon: 'success',
		html:
		'Ir a la tabla generada</b>, ' +
		'<a href="tablaHeroes.php">Tabla de heroes obtenidos</a>',
		showCloseButton: true,
		showCancelButton: true,
		focusConfirm: false
	})
}