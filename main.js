const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit', function (e) {
    e.preventDefault();

    procesarDatos();

   
})


function procesarDatos() {
    //validación
    aparecerResultado()
    // obtener datos del formulario y enviarlos a la funcion calcularCalorias
    const datos = {
        nombre: document.getElementById('nombre').value,
        tipoDocumento: document.getElementById('tipo_documento').value,
        numeroDocumento: document.getElementById('numero_documento').value,
        edad: document.getElementById('edad').value,
        genero: document.querySelector('input[name="genero"]:checked').value,
        peso: document.getElementById('peso').value,
        altura: document.getElementById('altura').value,
        actividad: document.getElementById('actividad').value,
        kcal: 0
    }

    //verifica que los campos no esten vacios de lo contrario envia un mensaje
    if (datos.nombre === '' || datos.tipoDocumento === '' || datos.numeroDocumento === '' || datos.edad === '' || datos.genero === '' || datos.peso === '' || datos.altura === '' || datos.actividad === '') {
        resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Formulario incompleto</h5>
            <div class="mb-3 w-100">
                <p class="form-control text-center" style="font-size: 2rem"> Por favor llena todos los campos </p>
              
             </div>
        </div>
    `   
   
    }else{
        calcularCalorias(datos);
    }

}

function calcularCalorias(datos) {
    aparecerResultado();

    let calculoCalorias = datos.genero === 'M' ? (parseFloat( datos.actividad ))*(10 * datos.peso) + (6.25 * datos.altura) - (5 * datos.edad) + 5 : (parseFloat( datos.actividad ))*(10 * datos.peso) + (6.25 * datos.altura) - (5 * datos.edad) - 161;
    console.log(datos);
    //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
    //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
    // totalCalorias.value = `${Math.floor(calculoCalorias)} kcal`;

    //calcular informar el grupo poblacional segunla edad sumistrada
    let poblacion=""
        switch(true){
            case datos.edad >= 15 && datos.edad <= 29:
               poblacion="Joven"
               break
            case datos.edad >=30 && datos.edad <=59:
                poblacion="Adulto"
                break
            case datos.edad >= 60:
                poblacion= "Dulto mayor"
                break
            case datos.edad <=14 || datos.edad >=61:
                poblacion= "sin grupo pobalcional"
                break
            }
    
    resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            <div class="mb-3 w-100">
                <p class="form-control text-center" style="font-size: 2rem"> El paciente ${datos.nombre} identificado con el tipo de documento ${datos.tipoDocumento === '1' ? 'Tarjeta de identidad' : 'Cedula de ciudadania'} NO. ${datos.numeroDocumento}, requiere un total de ${Math.floor(calculoCalorias)} kcal para el sostenimiento de su TBM.</p>
                <p class="form-control text-center" style="font-size: 1.5rem "> El paciente pertenece al grupo poblacional ${poblacion} </p>   
             </div>
        </div>
    `




    // Volver a limpiar variables
    formularioCalculadora.reset()
}


function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#resltado');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';

    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}