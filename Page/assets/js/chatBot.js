async function askQuestion() {
    const userInput = document.getElementById("user-input").value;
    const responseDiv = document.getElementById("response");
    responseDiv.textContent = "Esperando respuesta...";

    if (!userInput) {
        responseDiv.textContent = "Por favor, escribe una pregunta.";
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: userInput,
                parameters: {
                    max_new_tokens: 100, // Cambia a 'max_new_tokens' en lugar de 'max_length'
                    temperature: 0.7,
                },
            }),
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Error de la API:", errorDetails);
            responseDiv.textContent = `Error de la API: ${errorDetails.error || response.statusText}`;
            return;
        }

        const data = await response.json();

        // Verificar si se generó texto
        const answer = data[0]?.generated_text || "No pude obtener una respuesta.";
        responseDiv.textContent = answer;
    } catch (error) {
        console.error("Error al obtener respuesta:", error);
        responseDiv.textContent = "Hubo un problema al obtener la respuesta.";
    }

    // Limpiar campo de entrada
    document.getElementById("user-input").value = "";
}
