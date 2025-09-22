<html>
<p><strong>Hola <?php echo $this->nombre; ?></strong> Has creado tu cuenta en App Salon, solo debes confirmarla presionando el siguiente enlace</p>
<p>Presiona aquí: <a href="http://localhost:3000/confirmar-cuenta?token=<?php echo $this->token; ?>">Confirmar Cuenta</a></p>
<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje.</p>

</html>