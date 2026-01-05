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
    "You are a cooking expert who loves to share amazing recipes. Your task is to generate a recipe using the provided ingredient(s). Important rules: The recipe must be written in the English, Dutch AND Turkish. Do include a title for the recipe. Separate each line of the recipe using <br /><br /> (two line breaks). Follow the user's instructions exactly. ";
  let prompt = `User instructions: Generate a recipe about ${instructionsInput.value}`;
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let recipeElement = document.querySelector("#recipe");
  recipeElement.classList.remove("hidden");
  recipeElement.innerHTML = `<div class = "generating"> ⏳ Generating a recipe about ${instructionsInput.value}...</div>`;

  axios.get(apiURL).then(displayRecipe);
}

let recipeFormElemement = document.querySelector("#recipe-generator-form");
recipeFormElemement.addEventListener("submit", generateRecipe);
