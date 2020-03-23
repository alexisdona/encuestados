/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
    this.modelo = modelo;
    this.controlador = controlador;
    this.elementos = elementos;
    var contexto = this;

    // suscripción de observadores
    this.modelo.preguntaAgregada.suscribir(function() {
        contexto.reconstruirLista();
    });
};


VistaAdministrador.prototype = {
    //lista
    inicializar: function() {
        //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
        this.reconstruirLista();
        this.configuracionDeBotones();
        validacionDeFormulario();

    },

    construirElementoPregunta: function(pregunta) {
        var contexto = this;
        var nuevoItem = $('li#' + pregunta.id + '.list-group-item').text(pregunta.texto);
        var interiorItem = $('.d-flex');
        var titulo = interiorItem.find('h5');
        titulo.text(pregunta.texto);
        interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp) {
            return " " + resp.textoRespuesta;
        }));
        nuevoItem.html($('.d-flex').html());
        console.log(nuevoItem);
        return nuevoItem;
    },

    reconstruirLista: function() {
        var lista = this.elementos.lista;
        lista.html('');
        var preguntas = this.modelo.preguntas;
        for (var i = 0; i < preguntas.length; ++i) {
            lista.append(this.construirElementoPregunta(preguntas[i]));
            console.log('agregando elemento');
        }
    },

    configuracionDeBotones: function() {
        var e = this.elementos;
        var contexto = this;

        //asociacion de eventos a boton
        e.botonAgregarPregunta.click(function() {
            var value = e.pregunta.val();
            var respuestas = [];

            $('[name="option[]"]').each(function() {

                var respuesta = { 'textoRespuesta': $(this).val(), 'cantidad': 0 };
                if ($(this).val() != "") { //pongo este if porque esta agregando siempre una respuesta vacía al final
                    respuestas.push(respuesta);
                }
            });

            contexto.limpiarFormulario();
            contexto.controlador.agregarPregunta(value, respuestas);
            contexto.reconstruirLista();
        });
        e.botonBorrarPregunta.click(function() {
            var id = ($('.list-group-item.active').attr('id'));
            console.log("id de la pregunta" + id);
        });
        //asociar el resto de los botones a eventos
    },

    limpiarFormulario: function() {
        $('.form-group.answer.has-feedback.has-success').remove();
    }
};