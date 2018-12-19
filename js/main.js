(function() {
    "use strict";
    // DOM CONTENT LOADED
    document.addEventListener('DOMContentLoaded', function() {
        // console.log("listo");
        // Campos datos usuarios
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');

        // Campos pases
        var pase_dia = document.getElementById('pase_dia');
        var pase_dosdias = document.getElementById('pase_dosdias');
        var pase_completo = document.getElementById('pase_completo');
    
        // Botones y divs
        var calcular = document.getElementById('calcular');
        var errorDiv = document.getElementById('error');
        var botonRegistro = document.getElementById('btnRegistro');
        var lista_productos = document.getElementById('lista-productos');
        var suma = document.getElementById('suma-total');

        // Pagos y extras
        var camisas = document.getElementById('camisa_evento');
        var etiquetas = document.getElementById('etiquetas');

        // eventos
        calcular.addEventListener('click', calcularMontos);

        pase_dia.addEventListener('blur', mostrarDias);
        pase_dosdias.addEventListener('blur', mostrarDias);
        pase_completo.addEventListener('blur', mostrarDias);

        nombre.addEventListener('blur', validarDatosPersonales);
        apellido.addEventListener('blur', validarDatosPersonales);
        email.addEventListener('blur', validarDatosPersonales);
        email.addEventListener('blur', validarMail);

        function validarDatosPersonales() {
            if(this.value == '') {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = '* Este campo es obligatorio';
                this.style.border = '1px solid red';
                errorDiv.style.border = '1px solid red';
            }else {
                errorDiv.style.display = 'none';
                this.style.border = '1px solid #cccccc';
            }
        }

        function validarMail() {
            if(this.value.indexOf('@') > -1) {
                errorDiv.style.display = 'none';
                this.style.border = '1px solid #cccccc';
            }else {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = 'Email inválido';
                this.style.border = '1px solid red';
                errorDiv.style.border = '1px solid red';
            }
        }

        function calcularMontos(event){
            event.preventDefault();
            // console.log('has hecho chik');
            if(regalo.value === '') {
                alert('Debes elegir un regalo');
                regalo.focus;
            }else {
                // console.log('Ya elegiste un regalo!');
                // Cantidad de boletos y extras
                var boletoDia = parseInt(pase_dia.value, 10) || 0,
                    boleto2Dias = parseInt(pase_dosdias.value, 10) || 0,
                    boletoCompleto = parseInt(pase_completo.value, 10) || 0,
                    cantCamisas = parseInt(camisas.value, 10) || 0,
                    cantEtiquetas = parseInt(etiquetas.value, 10) || 0;

                var totalPagar = (boletoDia * 30) + (boleto2Dias * 45) + (boletoCompleto * 50) + ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
                // console.log(totalPagar);

                var listadoProductos = [];

                if(boletoDia >= 1) {
                    listadoProductos.push(boletoDia + ' Pases por día');
                }
                if(boleto2Dias >= 1) {
                    listadoProductos.push(boleto2Dias + ' Pases por 2 días');
                }
                if(boletoCompleto >= 1) {
                    listadoProductos.push(boletoCompleto + ' Pases completos');
                }
                if(cantCamisas >= 1) {
                    listadoProductos.push(cantCamisas + ' Camisas');
                }
                if(cantEtiquetas >= 1) {
                    listadoProductos.push(cantEtiquetas + ' Etiquetas');
                }

                lista_productos.style.display = 'block';
                lista_productos.innerHTML = '';
                for(var i = 0; i < listadoProductos.length; i++) {
                    lista_productos.innerHTML += listadoProductos[i] + '<br>';
                }
                
                suma.innerHTML = '$' + totalPagar.toFixed(2);
            }
        }

        function mostrarDias() {
            var boletoDia = parseInt(pase_dia.value, 10) || 0,
                boleto2Dias = parseInt(pase_dosdias.value, 10) || 0,
                boletoCompleto = parseInt(pase_completo.value, 10) || 0;
                
            var diasElegidos = [];

            if(boletoDia > 0) {
                diasElegidos.push('viernes');
            }
            if(boleto2Dias > 0) {
                diasElegidos.push('viernes','sabado');
            }
            if(boletoCompleto > 0) {
                diasElegidos.push('viernes','sabado','domingo');
            }

            for(var i = 0; i < diasElegidos.length; i++) {
                document.getElementById(diasElegidos[i]).style.display = 'block';
            }
        }



    }); 
})();