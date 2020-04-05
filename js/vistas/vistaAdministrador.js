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
    this.modelo.preguntaBorrada.suscribir(function() {
        contexto.reconstruirLista();
    });
    this.modelo.preguntasBorradas.suscribir(function() {
        contexto.reconstruirLista();
    });
};


VistaAdministrador.prototype = {
    //lista
    inicializar: function() {
        this.reconstruirLista();
        this.configuracionDeBotones();
        validacionDeFormulario();

    },

    construirElementoPregunta: function(pregunta) {
        var contexto = this;
        var nuevoItem = $('<li/>', { 'id': pregunta.id, 'class': 'list-group-item' }).text(pregunta.texto);
        var interiorItem = $('.d-flex');
        var titulo = interiorItem.find('h5');
        titulo.text(pregunta.texto);
        interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp) {
            return " " + resp.textoRespuesta;
        }));
        nuevoItem.html($('.d-flex').html());
        return nuevoItem;
    },

    reconstruirLista: function() {
        var lista = this.elementos.lista;
        lista.html('');
        var preguntas = this.modelo.getPreguntas();
        for (var i = 0; i < preguntas.length; ++i) {
            lista.append(this.construirElementoPregunta(preguntas[i]));
        }

    },

    configuracionDeBotones: function() {
        var e = this.elementos;
        var contexto = this;


        //asociacion de eventos a boton
        e.botonAgregarPregunta.click(function() {
            var pregunta = e.pregunta.val();
            var respuestas = [];

            $('[name="option[]"]').each(function() {
                var respuesta = { 'textoRespuesta': $(this).val(), 'cantidad': 0 };
                if ($(this).val() != "") { //pongo este if porque esta agregando siempre una respuesta vacía al final
                    respuestas.push(respuesta);
                }
            });


            if (pregunta != "") {
                contexto.controlador.agregarPregunta(pregunta, respuestas);
            } else {
                alert("Debe ingresar una pregunta para agregar");
            }
            contexto.reconstruirLista();
            contexto.limpiarFormulario();

        });
        e.botonBorrarPregunta.click(function() {
            var id = ($('.list-group-item.active').attr('id'));
            contexto.controlador.borrarPregunta(id);
            contexto.reconstruirLista();
            contexto.limpiarFormulario();

        });
        e.botonEditarPregunta.click(function() {
            var id = ($('.list-group-item.active').attr('id'));
            do {
                var textoPregunta = prompt("Edite el nombre de la pregunta");
            } while (textoPregunta == "");
            contexto.controlador.editarPregunta(id, textoPregunta);
            contexto.reconstruirLista();
            contexto.limpiarFormulario();

        });
        e.borrarTodo.click(function() {
            contexto.controlador.borrarTodo();
            contexto.reconstruirLista();
            contexto.limpiarFormulario();
        });

    },

    limpiarFormulario: function() {
        $('.form-group.answer.has-feedback.has-success').remove();
    },
};