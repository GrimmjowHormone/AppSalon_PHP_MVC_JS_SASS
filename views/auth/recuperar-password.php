<h1 class="nombre-pagina">Recuperar Password</h1>

<?php include_once __DIR__ . '/../templates/alertas.php'; ?>
<?php if (!$error) {; ?>
    <p class="descripcion-pagina">Coloca tu nuevo password acontinuación</p>
    <form method="post">

        <div class="campo">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Tu nuevo password">
        </div>
        <input type="submit" value="Guardar" class="boton">
    </form>
<?php }; ?>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? inicia sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Registrate</a>
</div>