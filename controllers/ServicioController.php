<?php 
namespace Controllers;
use MVC\Router;
class ServicioController{
    public static function index(Router $router){
       $router->render('/servicios/index',[]);
    }
    public static function crear(Router $router){
        echo 'Desde crear';

        if ($_SERVER['REQUEST_METHOD']==='POST'){

        }

         $router->render('/servicios/crear',[]);

    }

    public static function actualizar(Router $router){
        echo 'Desde actualizar';

        if ($_SERVER['REQUEST_METHOD']==='POST'){
            
        }
         $router->render('/servicios/actualizar',[]);
    }

    public static function eliminar(Router $router){
        echo 'Desde eliminar';

        if ($_SERVER['REQUEST_METHOD']==='POST'){
            
        }
    }
}