function displayRecipe(response) {
  new Typewriter("#recipe", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function generateRecipe(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");

  let apiKey = "8ob48e0d163fa039b10t18b602a5fad5";

  let context =
    "You are a cooking expert and love to share amazing recipes. Your mission is to generate a recipe and separate each line with a <br /> . Make sure to follow the user instructions. Do not include a title to the recipe. Sign the recipe with 'SheCodes AI' inside a <strong> element at the end of the recipe and NOT at the beginning";
  let prompt = `User instructions: Generate a recipe about ${instructionsInput.value}`;
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let recipeElement = document.querySelector("#recipe");
  recipeElement.classList.remove("hidden");
  recipeElement.innerHTML = `<div class = "generating"> ⏳ Generating a recipe about ${instructionsInput.value}...</div>`;

  axios.get(apiURL).then(displayRecipe);
}

let recipeFormElemement = document.querySelector("#recipe-generator-form");
recipeFormElemement.addEventListener("submit", generateRecipe);
