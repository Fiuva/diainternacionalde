module.exports.handler = async (event) => {
    const { path, params } = event;

    

    if (path === "/.netlify/functions/custom/:mes/:dia") {
        const { mes, dia } = params;
        // Lógica para la ruta /custom/:mes/:dia
        return {
            body: `Custom Function - Mes: ${mes}, Día: ${dia}`,
            statusCode: 200
        };
    } else {
        // Ruta no encontrada
        return {
            body: JSON.stringify(event),
            statusCode: 404
        };
    }
};