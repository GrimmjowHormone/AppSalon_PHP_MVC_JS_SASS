let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;
const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}
document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
})


function iniciarApp() {
    mostrarSeccion()
    tabs();//cambia la seccion cuando se presionan los tabs
    paginador();//agrega o quita los botones del paginador
    paginaSiguiente()
    paginaAnterior()
    consultarApi()
    nombreCliente()//añade el nombre del cliente al objeto de cita
    idCliente()
    seleccionarFecha()//agrega la fecha de la cita al objeto de cita
    seleccionarHora()//agrega la hora de la cita al objeto de cita
    mostrarResumen()//muestra el resumen de la cita
}

function mostrarSeccion() {
    //ocultar la seccion que tenga la clase d emostrar
    const seccionAnterior = document.querySelector('.mostrar');
    if (seccionAnterior) {
        seccionAnterior.classList.remove("mostrar");

    }
    //seleccionar la sección con el paso...
    const seccion = document.querySelector(`#paso-${paso}`);
    seccion.classList.add('mostrar')


    //tab anterior
    const tabAnterior = document.querySelector('.actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual')
    }
    //Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');

}

function tabs() {
    const botones = document.querySelectorAll('.tabs button');
    botones.forEach((boton) => {
        boton.addEventListener('click', function (e) {
            paso = parseInt(e.target.dataset.paso)
            mostrarSeccion()
            paginador();//agrega o quita los botones del paginador

        })
    })
}

function paginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (paso === 1) {
        paginaAnterior.classList.add('ocultar')
        paginaSiguiente.classList.remove('ocultar')
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar')
        paginaSiguiente.classList.add('ocultar')

        mostrarResumen()
    } else {
        paginaSiguiente.classList.remove('ocultar')
        paginaAnterior.classList.remove('ocultar')

    }

}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function () {
        if (paso <= pasoInicial) return;
        paso--
        paginador()
        mostrarSeccion()
    })
}
function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function () {
        if (paso >= pasoFinal) return;
        paso++
        paginador()
        mostrarSeccion()
    })
}

//consulta la api 
async function consultarApi() {
    try {
        const url = 'http://localhost:3000/api/servicios'
        const resultado = await fetch(url)
        const servicios = await resultado.json()
        mostrarServicios(servicios)
    } catch (error) {
        console.log(error)
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        const { id, nombre, precio } = servicio;
        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio')
        nombreServicio.textContent = nombre
        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio')
        precioServicio.textContent = `$${precio}`

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio')
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function () {
            seleccionarServicio(servicio)
        };
        servicioDiv.appendChild(nombreServicio)
        servicioDiv.appendChild(precioServicio)

        document.querySelector('#servicios').appendChild(servicioDiv)
    });
}

function seleccionarServicio(servicio) {
    const { id } = servicio
    const { servicios } = cita
    //identificar el elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);
    //comprobar si un servicio ya fue agregado
    if (servicios.some(agregado => agregado.id === id)) {
        //eliminarlo
        cita.servicios = servicios.filter(agregado => agregado.id !== id)
        divServicio.classList.remove('seleccionado')

    } else {
        //agregarlo
        cita.servicios = [...servicios, servicio]
        divServicio.classList.add('seleccionado')


    }




}

function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;

}
function idCliente() {
    cita.id = document.querySelector('#id').value;

}
function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function (e) {
        const dia = new Date(e.target.value).getUTCDay();

        if ([0, 6].includes(dia)) {
            e.target.value = '';
            e.target.value = '';
            mostrarAlerta('Fines de semana no son permitidos', 'error', '.formulario')
        } else {
            cita.fecha = e.target.value;
        }
    })
}

function seleccionarHora() {
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function (e) {
        console.log(e.target.value)

        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];
        if (hora < 10 || hora >= 18) {
            mostrarAlerta('Hora no valida', 'error', '.formulario')
            e.target.value = '';
            cita.hora = '';

        } else {
            console.log('hora valida')
            cita.hora = horaCita;
        }

    })
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
    //previene que se creen multiples alertas
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    //crear la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta')
    alerta.classList.add(tipo)
    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if (desaparece) {
        //eliminar la alerta despues de 3 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }




}

function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen');

    // limpiar el resumen previo
    while (resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }
    if (Object.values(cita).includes('') || cita.servicios.length === 0) {
        mostrarAlerta('Faltan datos de Servicios, Fecha u Hora', 'error', '.contenido-resumen', false)
        return
    }
    //formatear el div de resumen
    const { nombre, fecha, hora, servicios } = cita;

    //heading de resumen
    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    //formatear la fecha en español
    const fechaObj = new Date(fecha.replaceAll('-', '/')); //se reemplazan los guiones por slash para que no reste un dia
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opciones);

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora}`;

    //heading de servicios
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(headingServicios);

    //iterar sobre los servicios

    servicios.forEach(servicio => {
        const { id, nombre, precio } = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio: $${precio}</span>`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    })

    //informacion cita
    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Datos de la persona y cita';
    headingCita.style.paddingTop = '1rem';
    resumen.appendChild(headingCita);

    //boton para crear la cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    botonReservar.onclick = reservaCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReservar);
}

async function reservaCita() {
    const { nombre, fecha, hora, servicios, id } = cita;

    const idServicios = servicios.map(servicio => servicio.id)

    const datos = new FormData();
    datos.append('usuarioId', id);
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('servicios', idServicios);

    console.log(...datos)
    //peticion hacia la api

    try {
        const url = 'http://localhost:3000/api/citas';

        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        })
        const resultado = await respuesta.json()
        console.log(resultado.resultado)
        if (resultado.resultado) {
            Swal.fire({
                icon: "success",
                title: "Cita Creada",
                text: "Tu cita fue creada correctamente",
                button: 'OK',
                width: '20%',
                heigh: '20%',

            }).then(() => {
                window.location.reload();
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
    }

}