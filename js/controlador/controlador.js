/*
 * Controlador
 */
var Controlador = function(modelo) {
    this.modelo = modelo;
};

Controlador.prototype = {
    agregarPregunta: function(pregunta, respuestas) {
        this.modelo.agregarPregunta(pregunta, respuestas);
    },
    borrarPregunta: function(id) {
        this.modelo.borrarPregunta(id);
    },
    editarPregunta: function(id, textoPregunta) {
        this.modelo.editarPregunta(id, textoPregunta);
    },
    borrarTodo: function() {
        this.modelo.borrarTodo();
    },
    guardar: function() {
        this.modelo.guardar();
    },
    agregarVoto: function(nombrePregunta, nombreRespuesta) {

        this.modelo.agregarVoto(nombrePregunta, nombreRespuesta);
    },
};