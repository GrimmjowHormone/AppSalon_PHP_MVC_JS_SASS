<html>
<p><strong>Hola <?php echo $this->nombre; ?></strong> Has creado/reestablecido tu cuenta en App Salon, solo debes confirmar presionando el siguiente enlace</p>
<p>Presiona aquí: <a href="http://localhost:3000/confirmar-cuenta?token=<?php echo $this->token; ?>">Restablecer Password</a></p>
<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje.</p>

</html>