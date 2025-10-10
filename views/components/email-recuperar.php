<html>
<p><strong>Hola <?php echo $this->nombre; ?></strong> Has reestablecido tu cuenta en App Salon, solo debes confirmar presionando el siguiente enlace</p>
<p>Presiona aquí: <a href="http://localhost:3000/recuperar?token=<?php echo $this->token; ?>">Recuperar Cuenta</a></p>
<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje.</p>

</html>