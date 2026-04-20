const form = document.getElementById("form");
const input = document.getElementById("input");
const result = document.getElementById("result");
const error = document.getElementById("error");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const word = input.value.trim();

  if (word === "") return;

  result.textContent = "Loading...";
  error.textContent = "";

  fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then(function(data) {
      const wordData = data[0];

      const meaning = wordData.meanings[0];
      const definitionObj = meaning.definitions[0];

      result.innerHTML = `
        <h2>${wordData.word}</h2>
        <p><strong>Pronunciation:</strong> ${wordData.phonetic || "N/A"}</p>
        <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
        <p><strong>Definition:</strong> ${definitionObj.definition}</p>
        <p><strong>Example:</strong> ${definitionObj.example || "No example available"}</p>
      `;
    })
    .catch(function(err) {
      result.innerHTML = "";
      error.textContent = err.message;
    });
});