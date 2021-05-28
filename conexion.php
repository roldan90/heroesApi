<?php 

	function conexion(){
		$conexion = mysqli_connect("localhost","root","","heroes");
		return $conexion;
	}
 ?>