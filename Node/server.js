const http = require('http');
const url = require('url');
const { parse } = require('querystring');
const fs = require('fs');
const path = require('path');

// Ruta base para almacenar los contextos
const baseDir = path.join(__dirname, 'contexts');

// Asegúrate de que el directorio base exista
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}

// Reglas de lógica para el bot
const rules = [
    { pattern: /\b(hola|buenos días|saludos)\b/i, response: "¡Hola! ¿Cómo estás?" },
    { pattern: /\b(precio|costo|tarifa)\b/i, response: "Dime, ¿sobre qué producto o servicio necesitas información?" },
    { pattern: /\b(problema|error|fallo)\b/i, response: "Lamento escuchar eso. ¿Puedes darme más detalles?" },
    { pattern: /\b(gracias|muy amable)\b/i, response: "¡De nada! ¿Hay algo más en lo que pueda asistirte?" },
    { pattern: /\b(adiós|chau|hasta luego)\b/i, response: "¡Adiós! ¡Que tengas un buen día!" },
];

// Función para leer el contexto desde un archivo
const loadContext = (userId) => {
    const userDir = path.join(baseDir, userId);
    const contextFile = path.join(userDir, 'context.json');

    if (fs.existsSync(contextFile)) {
        const data = fs.readFileSync(contextFile, 'utf-8');
        return JSON.parse(data);
    } else {
        return { context: '', history: [] };
    }
};

// Función para guardar el contexto en un archivo
const saveContext = (userId, context) => {
    const userDir = path.join(baseDir, userId);

    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
    }

    const contextFile = path.join(userDir, 'context.json');
    fs.writeFileSync(contextFile, JSON.stringify(context, null, 2), 'utf-8');
};

// Función para manejar las solicitudes HTTP
const requestHandler = (req, res) => {
    const reqUrl = url.parse(req.url, true);

    if (req.method === 'POST' && reqUrl.pathname === '/chat') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
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

            // Cargar el contexto del usuario desde el archivo
            const userContext = loadContext(userId);

            // Agregar el mensaje del usuario al historial
            userContext.history.push({ role: 'user', message });

            // Lógica del bot usando las reglas
            let botResponse = "No estoy seguro de cómo responder a eso.";
            for (const rule of rules) {
                if (message.match(rule.pattern)) {
                    botResponse = rule.response;
                    break;
                }
            }

            // Actualizar el contexto del usuario
            userContext.context = message;

            // Agregar la respuesta al historial
            userContext.history.push({ role: 'bot', message: botResponse });

            // Guardar el contexto del usuario en el archivo
            saveContext(userId, userContext);

            // Responder al cliente
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ response: botResponse, context: userContext.context }));
        });
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }
};

// Crear servidor HTTP
const server = http.createServer(requestHandler);

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
