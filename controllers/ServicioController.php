<?php

namespace Controllers;

use MVC\Router;
use Model\Servicio;

class ServicioController
{
    public static function index(Router $router)
    {
        $servicios = Servicio::all();

        $router->render('/servicios/index', [
            "servicios"=>$servicios
        ]);
    }
    public static function crear(Router $router)
    {
        $servicio = new Servicio;
        $alertas = [];
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $servicio->sincronizar($_POST);
            $alertas = $servicio->validar();

            if (empty($alertas)) {
                $servicio->guardar();
                header('Location: /servicios');
            }
        }

        $router->render('/servicios/crear', [
            "nombre" => $_SESSION['nombre'],
            "servicio" => $servicio,
            "alertas" => $alertas
        ]);
    }

    public static function actualizar(Router $router)
    {
        echo 'Desde actualizar';

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        }
        $router->render('/servicios/actualizar', []);
    }

    public static function eliminar(Router $router)
    {
        echo 'Desde eliminar';

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        }
    }
}
