const healthyFoods = [
  {
    name: "Ensalada de Quinoa y Verduras",
    image: "https://media.istockphoto.com/id/1292202102/es/foto/ensalada-de-aguacate-tradicional-con-quinua.jpg?s=612x612&w=0&k=20&c=HWNXD6941ArGETstPPD2FO2YYr79d8vBmbD14gUs_sM=",
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
    image: "https://img-global.cpcdn.com/recipes/8541937a876eae59/1280x1280sq70/photo.webp",
    description: "Filete de salmón dorado acompañado de espárragos verdes.",
    keyIngredients: ["Salmón", "Espárragos", "Limón", "Ajo"],
    benefits: [
      "Rico en ácidos grasos omega-3, que favorecen la salud cardiovascular.",
      "Los espárragos aportan fibra y antioxidantes.",
    ],
  },
  {
    name: "Avena con Frutas y Semillas",
    image: "https://img-global.cpcdn.com/recipes/f1e3b76cd7d59d54/1280x1280sq70/photo.webp",
    description: "Tazón de avena con plátano, fresas y un toque de chía.",
    keyIngredients: ["Avena", "Plátano", "Fresas", "Semillas de chía"],
    benefits: [
      "La avena estabiliza el azúcar en la sangre.",
      "Las frutas aportan vitaminas esenciales y antioxidantes.",
      "Las chía proporcionan omega-3 y fibra.",
    ],
  },
];

// Función para mostrar una comida aleatoria
function showRandomFood() {
  const randomFood =
    healthyFoods[Math.floor(Math.random() * healthyFoods.length)];

  document.getElementById("food-name").innerText = randomFood.name;
  document.getElementById("food-image").src = randomFood.image;
  document.getElementById("food-description").innerText =
    randomFood.description;

  const ingredientsList = document.getElementById("food-ingredients");
  ingredientsList.innerHTML = "";
  randomFood.keyIngredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.innerText = ingredient;
    ingredientsList.appendChild(li);
  });

  const benefitsList = document.getElementById("food-benefits");
  benefitsList.innerHTML = "";
  randomFood.benefits.forEach((benefit) => {
    const li = document.createElement("li");
    li.innerText = benefit;
    benefitsList.appendChild(li);
  });
}

showRandomFood();
setInterval(showRandomFood, 360000);
