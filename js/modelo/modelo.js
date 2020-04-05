/*
 * Modelo
 */
var Modelo = function() {

    var listaPreguntas = JSON.parse(localStorage.getItem('preguntas'));
    if (listaPreguntas == null) {
        this.preguntas = [];
    } else {
        this.preguntas = listaPreguntas;
    }

    this.ultimoId = 0;

    //inicializacion de eventos
    this.preguntaAgregada = new Evento(this);
    this.preguntaBorrada = new Evento(this);
    this.preguntaEditada = new Evento(this);
    this.preguntasBorradas = new Evento(this);
    this.preguntaVotada = new Evento(this);
};


Modelo.prototype = {

    //se obtiene el id más grande asignado a una pregunta
    obtenerUltimoId: function() {
        return this.preguntas.length;
    },

    //se agrega una pregunta dado un nombre y sus respuestas
    agregarPregunta: function(pregunta, respuestas) {
        var id = this.obtenerUltimoId();
        var nuevaPregunta = { 'texto': pregunta, 'id': id, 'cantidadPorRespuesta': respuestas };
        this.preguntas.push(nuevaPregunta);
        this.guardar();
        this.preguntaAgregada.notificar();

    },
    borrarTodo: function() {
        this.preguntas = [];
        this.guardar();
        this.preguntasBorradas.notificar();

    },

    borrarPregunta: function(id) {
        this.preguntas.splice(id, 1);
        this.guardar();
        this.preguntaBorrada.notificar();

    },
    editarPregunta: function(id, textoPregunta) {
        this.preguntas[id].texto = textoPregunta;
        this.guardar();
        this.preguntaEditada.notificar();
    },

    buscarIdPregunta: function(nombrePregunta) {
        var pregunta = this.preguntas.find(pregunta => pregunta.texto == nombrePregunta);
        return pregunta.id;

    },
    agregarVotoARespuesta: function(idPregunta, nombreRespuesta) {
        this.preguntas[idPregunta].cantidadPorRespuesta.find(respuesta => respuesta.textoRespuesta == nombreRespuesta).cantidad++;

    },
    agregarVoto: function(nombrePregunta, nombreRespuesta) {
        var idPregunta = this.buscarIdPregunta(nombrePregunta);
        this.agregarVotoARespuesta(idPregunta, nombreRespuesta);
        this.guardar();
        this.preguntaVotada.notificar();
    },

    //se guardan las preguntas
    guardar: function() {
        localStorage.setItem('preguntas', JSON.stringify(this.preguntas));


    },
    getPreguntas: function() {

        return this.preguntas;

    },
};