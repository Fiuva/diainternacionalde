module.exports.handler = async (event) => {
    const { path } = event;

    const split = path.split('/custom')[1].split("/")

    if (split.length >= 2) {
        const mes = split[1];
        const dia = split[2];
        // Lógica para la ruta /custom/:mes/:dia
        return {
            body: `Custom Function - Mes: ${mes}, Día: ${dia}`,
            statusCode: 200
        };
    } else {
        // Ruta no encontrada
        return {
            body: "/.netlify/functions/custom/:mes/:dia",
            statusCode: 404
        };
    }
};