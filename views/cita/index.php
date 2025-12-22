<h1 class="nombre-pagina">Crear Nueva Cita</h1>
<p class="descripcion-pagina">Elige tus servicios y coloca tus datos</p>

<div class="barra">
    <p>Hola: <?php echo $nombre ?? '' ;?> </p>
</div>
<div id="app">
    <nav class="tabs">
        <button class="actual" data-paso="1">Servicios</button>
        <button data-paso="2">Información Cita</button>
        <button data-paso="3">Resumen</button>
    </nav>
    <div id="paso-1" class="seccion">
        <h2>Servicios</h2>
        <p class="text-center">Elige tus servicios a continuación</p>
        <div id="servicios" class="listado-servicios">

        </div>
    </div>
    <div id="paso-2" class="seccion">
        <h2>Tus Datos y Cita</h2>
        <p class="text-center">Coloca tus datos y fecha de tu cita</p>

        <form class="formulario">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" value="<?php echo $nombre; ?>"
                    placeholder="Tu nombre" disabled>
            </div>
            <div class="campo">
                <label for="fecha">fecha</label>
                <input type="date" id="fecha"
                    placeholder="Tu fecha"
                    min="<?php echo date('Y-m-d') ;?>">
            </div>
            <div class="campo">
                <label for="hora">hora</label>
                <input type="time" id="hora"
                    placeholder="Tu hora">
            </div>
            <input type="hidden" id="id" name="" value="<?php echo $id ;?>">
        </form>
    </div>
    <div id="paso-3" class="seccion contenido-resumen">
        <h2>Resumen</h2>
        <p class="text-center">Verifica que la información sea correcta</p>
    </div>
    <div class="paginacion">
        <button id="anterior" class="boton">
            &laquo; anterior
        </button>
        <button id="siguiente" class="boton">
            siguiente &raquo;
        </button>
    </div>
</div>
<?php
$script = "
    <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
    <script src='build/js/app.js'></script>
    
    "; ?>