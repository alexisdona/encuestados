/*
 * Modelo
 */
var Modelo = function() {
    this.preguntas = [];
    this.ultimoId = 0;

    //inicializacion de eventos
    this.preguntaAgregada = new Evento(this);
    this.preguntaBorrada = new Evento(this);
    this.preguntaEditada = new Evento(this);
    this.preguntasBorradas = new Evento(this);
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
    borrarTodo: function() {
        this.preguntas = [];
        this.preguntasBorradas.notificar();
    },

    borrarPregunta: function(id) {
        this.preguntas.splice(id, 1);
        this.preguntaBorrada.notificar();
    },
    editarPregunta: function(id) {
        var nombrePregunta = prompt("Edite el nombre de la pregunta");
        this.preguntas[id].texto = nombrePregunta;
        this.preguntaEditada.notificar();
    },

    //se guardan las preguntas
    guardar: function() {},
};