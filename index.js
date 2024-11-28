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

button = document.getElementById("entry_submission");
inputText = document.getElementById("entry");
resultText = document.getElementById("result");

const languagePair = {
    sourceLanguage: 'en', // Or detect the source language with the Language Detection API
    targetLanguage: 'es',
  };
  

async function getTranslator() {
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
    // console.log(res);
    // console.log(inputText.value)
}

async function translateText(translator) {
    resultText.value = await translator.translate(inputText.value);
}

button.addEventListener("click", getTranslator);