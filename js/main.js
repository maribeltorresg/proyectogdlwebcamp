(function() {
    "use strict";
    // DOM CONTENT LOADED
    
    document.addEventListener('DOMContentLoaded', function() {

        var mapa = document.getElementById('mapa');

        if(mapa) {

            var map = L.map('mapa').setView([-12.156085, -76.990995], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([-12.156085, -76.990995]).addTo(map)
            .bindPopup('GDLWebCamp 2018 <br> Boletos ya disponibles.')
            .openPopup()
            .bindTooltip('Un Tooltip')
            .openTooltip();

        }
        
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

// Usando jQuery

$(document).ready(function() {

    // Plugin Lettering
    $('.nombre-sitio').lettering();

    // $('.ocultar').hide();

    // Programa de conferencias (talleres)
    $('.programa-evento .info-curso:first').show();
    $('.menu-programa a:first').addClass('activo');

    $('.menu-programa a').on('click', function() {
        $('.menu-programa a').removeClass('activo'); //quitar la clase a todos

        $(this).addClass('activo'); //se le agrega la clase al que se da click

        $('.ocultar').hide();

        var enlace = $(this).attr('href');
        // console.log(enlace);
        $(enlace).fadeIn(1000);

        return false;
    });

    // Animaciones para los numeros (contadores)
    $('.resumen-evento li:nth-child(1) p').animateNumber({number: 6}, 1200);
    $('.resumen-evento li:nth-child(2) p').animateNumber({number: 15}, 1500);
    $('.resumen-evento li:nth-child(3) p').animateNumber({number: 3}, 1300);
    $('.resumen-evento li:nth-child(4) p').animateNumber({number: 9}, 1500);

    // Cuenta regresiva
    $('.cuenta-regresiva').countdown('2018/12/25 11:00:00', function(event) {
        $('#dias').html(event.strftime('%D'));
        $('#horas').html(event.strftime('%H'));
        $('#minutos').html(event.strftime('%M'));
        $('#segundos').html(event.strftime('%S'));
    });

});