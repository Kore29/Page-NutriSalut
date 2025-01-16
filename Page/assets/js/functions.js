const healthyFoods = [
  {
      name: "Ensalada de Quinoa y Verduras",
      description: "Quinoa con pimientos, pepino y zanahorias frescas.",
      keyIngredients: ["Quinoa", "Pepino", "Pimientos", "Zanahorias", "Limón"],
      benefits: [
          "Rica en proteínas vegetales completas.",
          "Fuente de fibra para mejorar la digestión.",
          "Vitaminas C y A por las verduras.",
      ],
  },
  {
      name: "Salmón al Horno con Espárragos",
      description: "Filete de salmón dorado acompañado de espárragos verdes.",
      keyIngredients: ["Salmón", "Espárragos", "Limón", "Ajo"],
      benefits: [
          "Rico en ácidos grasos omega-3, que favorecen la salud cardiovascular.",
          "Los espárragos aportan fibra y antioxidantes.",
      ],
  },
  {
      name: "Avena con Frutas y Semillas",
      description: "Tazón de avena con plátano, fresas y un toque de chía.",
      keyIngredients: ["Avena", "Plátano", "Fresas", "Semillas de chía"],
      benefits: [
          "La avena estabiliza el azúcar en la sangre.",
          "Las frutas aportan vitaminas esenciales y antioxidantes.",
          "Las chía proporcionan omega-3 y fibra.",
      ],
  },
  {
      name: "Tacos de Pollo con Aguacate",
      description: "Tacos de pollo asado con aguacate, cilantro y salsa ligera.",
      keyIngredients: ["Pollo", "Aguacate", "Cilantro", "Tortillas de maíz", "Lima"],
      benefits: [
          "Proteínas magras del pollo.",
          "Grasas saludables del aguacate.",
          "Fibra de las tortillas de maíz.",
      ],
  },
  {
      name: "Smoothie Verde",
      description: "Smoothie refrescante con espinacas, pepino, manzana y limón.",
      keyIngredients: ["Espinacas", "Pepino", "Manzana", "Limón", "Jengibre"],
      benefits: [
          "Rico en antioxidantes de las espinacas.",
          "Refrescante y revitalizante.",
          "Desintoxica y mejora la digestión.",
      ],
  },
  {
      name: "Sopa de Lentejas",
      description: "Sopa caliente de lentejas con zanahorias, cebolla y apio.",
      keyIngredients: ["Lentejas", "Zanahorias", "Cebolla", "Apio", "Tomate"],
      benefits: [
          "Alto contenido de fibra.",
          "Fuente excelente de hierro y proteínas vegetales.",
          "Bajo en calorías.",
      ],
  },
  {
      name: "Batido de Mango y Coco",
      description: "Batido cremoso con mango, leche de coco y un toque de miel.",
      keyIngredients: ["Mango", "Leche de coco", "Miel", "Yogur natural"],
      benefits: [
          "Alto en vitamina C.",
          "Grasas saludables del coco.",
          "Aporta energía natural.",
      ],
  },
  {
      name: "Ensalada Mediterránea",
      description: "Ensalada fresca con tomates, pepinos, aceitunas y queso feta.",
      keyIngredients: ["Tomates", "Pepinos", "Aceitunas", "Queso feta", "Aceite de oliva"],
      benefits: [
          "Rica en antioxidantes.",
          "Grasas saludables del aceite de oliva.",
          "Aporta calcio del queso feta.",
      ],
  },
  {
      name: "Pechuga de Pollo al Limón",
      description: "Pechuga de pollo marinada con limón, ajo y hierbas, luego asada.",
      keyIngredients: ["Pechuga de pollo", "Limón", "Ajo", "Romero", "Tomillo"],
      benefits: [
          "Alto en proteínas magras.",
          "Rico en vitamina C.",
          "Aporta minerales como el potasio.",
      ],
  },
  {
      name: "Pizza de Coliflor",
      description: "Pizza con base de coliflor, tomate, queso mozzarella y albahaca.",
      keyIngredients: ["Coliflor", "Tomate", "Mozzarella", "Albahaca", "Aceite de oliva"],
      benefits: [
          "Bajo en carbohidratos.",
          "Rica en fibra y antioxidantes.",
          "Apta para dietas sin gluten.",
      ],
  },
];

// Función para mostrar dos productos aleatorios
function showRandomFoods() {
  const shuffledFoods = [...healthyFoods].sort(() => Math.random() - 0.5).slice(0, 2);

  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = '';  // Limpiar el contenedor antes de agregar nuevos productos

  shuffledFoods.forEach(food => {
      const card = document.createElement("div");
      card.classList.add("card", "shadow-sm", "mb-4");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title", "text-center");
      cardTitle.innerText = food.name;

      const cardDescription = document.createElement("p");
      cardDescription.classList.add("card-text");
      cardDescription.innerText = food.description;

      const ingredientsTitle = document.createElement("h6");
      ingredientsTitle.innerText = "Ingredientes:";

      const ingredientsList = document.createElement("ul");
      ingredientsList.classList.add("list-group", "list-group-flush");
      food.keyIngredients.forEach(ingredient => {
          const li = document.createElement("li");
          li.classList.add("list-group-item");
          li.innerText = ingredient;
          ingredientsList.appendChild(li);
      });

      const benefitsTitle = document.createElement("h6");
      benefitsTitle.classList.add("mt-3");
      benefitsTitle.innerText = "Beneficios:";

      const benefitsList = document.createElement("ul");
      benefitsList.classList.add("list-group", "list-group-flush");
      food.benefits.forEach(benefit => {
          const li = document.createElement("li");
          li.classList.add("list-group-item");
          li.innerText = benefit;
          benefitsList.appendChild(li);
      });

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardDescription);
      cardBody.appendChild(ingredientsTitle);
      cardBody.appendChild(ingredientsList);
      cardBody.appendChild(benefitsTitle);
      cardBody.appendChild(benefitsList);

      card.appendChild(cardBody);
      productContainer.appendChild(card);
  });
}

showRandomFoods();  // Llamar para generar productos al cargar la página
setInterval(showRandomFoods, 360000);  // Regenerar productos aleatorios cada 6 minutos
