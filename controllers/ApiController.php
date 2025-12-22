<?php

namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
use Model\Servicio;

class ApiController
{
    public static function index()
    {
        $servicios = Servicio::all();
        echo json_encode($servicios);
    }


    public static function guardar()
    {
        //Almacena la Cita y devuelve el ID
        $cita = new Cita($_POST);

        $resultado = $cita->guardar();
        $id = $resultado['id'];

        //Almacena los servicios con el id de la cita
        $idServicios = explode(",", $_POST['servicios']);

        foreach ($idServicios as $idServicio) {
            $args = [
                'citaId' => $id,
                'servicioId' => $idServicio
            ];
            $citaServicio = new CitaServicio($args);
            $citaServicio->guardar();
        }


        //retorna la respuesta de la cita guardada
        echo json_encode( ['resultado' => $resultado]);
    }
}
