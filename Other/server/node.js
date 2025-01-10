const http = require('http');
const url = require('url');
const { parse } = require('querystring');

// Almacenamos los contextos de los usuarios en memoria
const contexts = {};

// Función para manejar las solicitudes HTTP
const requestHandler = (req, res) => {
    const reqUrl = url.parse(req.url, true);

    // Solo procesamos solicitudes POST en /chat
    if (req.method === 'POST' && reqUrl.pathname === '/chat') {
        let body = '';

        // Acumulamos los datos del cuerpo de la solicitud
        req.on('data', chunk => {
            body += chunk;
        });

        // Cuando el cuerpo se haya recibido completamente
        req.on('end', () => {
            // Parseamos los datos del JSON recibido
            let parsedBody;
            try {
                parsedBody = JSON.parse(body);
            } catch (error) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Formato de JSON incorrecto' }));
                return;
            }

            const { userId, message } = parsedBody;

            if (!userId || !message) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Se requiere userId y mensaje' }));
                return;
            }

            // Obtenemos o inicializamos el contexto del usuario
            if (!contexts[userId]) {
                contexts[userId] = { context: '' };
            }

            const userContext = contexts[userId];

            // Aquí agregamos la lógica del bot
            let botResponse = `No sé qué decir sobre "${message}".`;

            if (message.toLowerCase().includes('hola')) {
                botResponse = "¡Hola! ¿Cómo puedo ayudarte hoy?";
            } else if (message.toLowerCase().includes('adiós')) {
                botResponse = "¡Adiós! ¡Que tengas un buen día!";
            } else {
                // Actualizamos el contexto con el último mensaje
                userContext.context = message;
                botResponse = `Recibí tu mensaje: "${message}". ¿En qué más puedo ayudarte?`;
            }

            // Respondemos con el mensaje del bot y el contexto actualizado
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ response: botResponse, context: userContext.context }));
        });
    } else {
        // Si la ruta o el método no coinciden
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }
};

// Creamos el servidor HTTP
const server = http.createServer(requestHandler);

// Iniciamos el servidor en el puerto 3000
server.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});