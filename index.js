// const someUserText = 'Hello and a warm welcome to the Early Preview Program!';
// const translation = await translator.translate(someUserText);

// console.log(translation);
// // Logs "¡Hola y una cálida bienvenida al programa de previsualización anticipada!"  

// const languagePair = {
//     sourceLanguage: 'en', // Or detect the source language with the Language Detection API
//     targetLanguage: 'es',
//   };
  
//   const canTranslate = await translation.canTranslate(languagePair);
//   let translator;
//   if (canTranslate !== 'no') {
//     if (canTranslate === 'readily') {
//       // The translator can immediately be used.
//       translator = await translation.createTranslator(languagePair);
//     }/* else {
//       // The translator can be used after the model download.
//       translator = await translation.createTranslator(languagePair);
//       translator.addEventListener('downloadprogress', (e) => {
//         console.log(e.loaded, e.total);
//       });
//       await translator.ready;
//     } */
//   } else {
//       // The translator can't be used at all.
//   }

// Button for translating
button = document.getElementById("entry_submission");

// Grabbing entry and result textboxes
inputText = document.getElementById("entry");
resultText = document.getElementById("result");

// Getting Language A and B
// const formA = document.getElementById("formA");
// const formB = document.getElementById("formB"); 

async function getTranslator() {
    const languageA = getLanguages("languageA");
    const languageB = getLanguages("languageB");
    console.log(languageA, languageB);

    if (languageA === "null" || languageB === "null") {
        alert("select a language");
        return;
    }

    if (languageA === languageB) {
        alert("same language selected");
        return;
    }

    const languagePair = {
        sourceLanguage: languageA, // Or detect the source language with the Language Detection API
        targetLanguage: languageB,
      };

    const canTranslate = await translation.canTranslate(languagePair);
    let translator; 

    if (canTranslate !== 'no') {
        if (canTranslate === 'readily') {
            translator = await translation.createTranslator(languagePair);
        }
    }
    else {
        console.log("Translator cannot be used");
    }
    translateText(translator);
}

async function translateText(translator) {
    console.log(inputText.textContent);
    resultText.textContent = await translator.translate(inputText.textContent);
}

button.addEventListener("click", getTranslator);

function getLanguages(form) {
    const selected = document.querySelector(`input[name="${form}"]:checked`);
    if (selected){
        const language = selected.value;
        // console.log(language);
        return language;
    }
    else {
        // console.log("null");
        return "null";
    }
}
console.log(formA);