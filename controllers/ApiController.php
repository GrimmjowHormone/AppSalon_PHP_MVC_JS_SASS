<?php

namespace Controllers;

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
        $respuesta = ['datos' => $_POST];
        echo json_encode($respuesta);
    }
}
