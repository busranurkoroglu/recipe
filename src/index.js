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
  let languageSelect = document.querySelector("#languageSelect");
  let selectedLanguage = languageSelect.value;

  let apiKey = "8ob48e0d163fa039b10t18b602a5fad5";

  let languageNames = {
    en: "English",
    nl: "Dutch",
    tr: "Turkish",
  };

  let context =
    "You are a cooking expert. Generate a single recipe using all provided ingredient(s). Write the recipe only in ${languageNames[selectedLanguage]}. Make the recipe title bold using <strong> tags. Separate each line of the recipe using <br /><br />. Use all ingredients. Follow the user's instructions exactly. Complete the entire recipe without stopping halfway.";

  let prompt = `User instructions: Generate a recipe about ${instructionsInput.value}`;

  let encodedPrompt = encodeURIComponent(prompt);
  let encodedContext = encodeURIComponent(context);

  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodedPrompt}&context=${encodedContext}&key=${apiKey}`;

  let recipeElement = document.querySelector("#recipe");
  recipeElement.classList.remove("hidden");
  recipeElement.innerHTML = `<div class = "generating"> ⏳ Generating a recipe about ${instructionsInput.value} in ${languageNames[selectedLanguage]}...</div>`;

  axios.get(apiURL).then(displayRecipe);
}

let recipeFormElemement = document.querySelector("#recipe-generator-form");
recipeFormElemement.addEventListener("submit", generateRecipe);
