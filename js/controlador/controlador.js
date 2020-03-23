/*
 * Controlador
 */
var Controlador = function(modelo) {
    this.modelo = modelo;
};

Controlador.prototype = {
    agregarPregunta: function(pregunta, respuestas) {
        // console.log('Entra en controlador.agregarPregunta');
        this.modelo.agregarPregunta(pregunta, respuestas);
    },
};