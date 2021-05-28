<?php 
    include "conexion.php";
    $conexion = conexion();
    $datos = explode("||", $_POST['heroes']);
    $bandera = 0;
    array_pop($datos);
    $success = 0;

    for ($i=0; $i < count($datos); $i++) { 

        $heroeDatos = explode(",", $datos[$i]);
        $heroe = $heroeDatos[0];
        $power = $heroeDatos[1];
        $nombre = $heroeDatos[2];
        $genero = $heroeDatos[3];
        $publicado = $heroeDatos[4];
        $imagen = $heroeDatos[5];

        $sql = "INSERT INTO t_heroes (heroe,
                                    power,
                                    nombre,
                                    genero,
                                    publicado,
                                    imagen) 
                    VALUES ('$heroe',
                            '$power',
                            '$nombre',
                            '$genero',
                            '$publicado',
                            '$imagen')";
        $result = mysqli_query($conexion, $sql);
        $success += $result;
    }

    if ($success > 0) {
        $bandera = 1;
    }

    echo $bandera;
    
?>