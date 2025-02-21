let numeroSecreto = 0;
let intentos = 0;
let numeroMaximo = 10;
let win;
let palabra;
let lista = [];
condicionesIniciales();


function verificar(){
    
    // lee el numero ingresado en el input
    let numeroUsuario = parseInt(document.getElementById('numero').value);
    
        
    if(win){ // verifica que el jugador no haya ganado para no seguir intentando.
            asignarTextoElemento('Ya has ganado','p');


        }else if(numeroUsuario > numeroMaximo || numeroUsuario < 0 ){ // verifica rango de 1 a 10 (si esta fuera de rango no ejecuta las demás, no incrementa contador)
            asignarTextoElemento('Solo números del 1 al '+numeroMaximo,'p');


        }else{ //Numero en rango correcto, pocos intentos. verifica si ganó o si se equivocó. (cuenta el turno)
            
            if(numeroSecreto == numeroUsuario){ // si gana cambia token para que no intente más y habilita reiniciar
                asignarTextoElemento('Has ganado en '+intentos+' '+palabra,'p');
                win = true;
                document.querySelector('#reiniciar').removeAttribute('disabled');

                    }else { // si pierde le da las pistas, incrementa contador, limpia casilla y verifica si le quedan intentos (si no le quedan deshabilita intentar y habilita reniciar)
                        if(numeroSecreto > numeroUsuario){
                            asignarTextoElemento('Es mayor','p');
                            
                        }else{
                            asignarTextoElemento('Es menor','p');
                             
                        };
                        intentos = intentos + 1;
                        palabra = 'intentos';
                        limpiar();
                        if(intentos > 3){
                            asignarTextoElemento('Usaste todos tus intentos','p');
                            document.querySelector('#reiniciar').removeAttribute('disabled');
                            document.querySelector('#intentar').setAttribute('disabled', 'true');
                        }
                    };

                
        };

    return;
};

function reiniciar(){
    limpiar();
    condicionesIniciales();

    return;
};

function limpiar(){
    document.querySelector('#numero').value = '';
    
};

function asignarTextoElemento(texto, elemento){
    let a = document.querySelector(elemento);
    a.innerHTML = texto;
    return;
};

function getRandom(){
    
    let generado = Math.floor(Math.random() * numeroMaximo) + 1;
    //si ya sorteamos todos los numeros, cerramos el juego.
    if(lista.length >= 10){
        asignarTextoElemento('Ya no hay numeros', 'p');
        document.querySelector('#reiniciar').setAttribute('disabled','true');
        document.querySelector('#intentar').setAttribute('disabled','true');


    }else{
        // si el generado esta en la lista hacemos algo, sino no.
        if(lista.includes(generado)){
            return getRandom();
        }else{
            lista.push(generado);
            return generado;
            
        };
    };

    
};

function condicionesIniciales(){
    asignarTextoElemento('GuessNumber2', 'h1');
    asignarTextoElemento('Digita un número del 1 al 10: ', 'p');
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    document.querySelector('#intentar').removeAttribute('disabled');
    numeroSecreto = getRandom();
    intentos = 1;
    win = false;
    palabra = 'intento';
};