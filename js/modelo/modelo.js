/*
 * Modelo
 */
var Modelo = function() {
    this.preguntas = [];
    this.ultimoId = 0;

    //inicializacion de eventos
    this.preguntaAgregada = new Evento(this);
    this.preguntaBorrada = new Evento(this);
};


Modelo.prototype = {

    //se obtiene el id más grande asignado a una pregunta
    obtenerUltimoId: function() {
        return this.preguntas.length;
    },

    //se agrega una pregunta dado un nombre y sus respuestas
    agregarPregunta: function(nombre, respuestas) {
        var id = this.obtenerUltimoId();
        var nuevaPregunta = { 'texto': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
        this.preguntas.push(nuevaPregunta);
        this.guardar();
        this.preguntaAgregada.notificar();
    },

    borrarPregunta: function(id) {
        this.preguntas.splice(id, 1);
        this.preguntaBorrada.notificar();
    },

    //se guardan las preguntas
    guardar: function() {},
};