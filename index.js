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

// Section for the starting page (text entry)

// Button for text submission
const button = document.getElementById("entry_submission");

// Entry textbox
const inputText = document.getElementById("entry");
const resultText = document.getElementById("result");

// Section for text entry 
const entryPage = document.getElementById("entryPage");

// Getting the character limit
const charCount = document.getElementById("char_limit");

// const sentencesPage = document.getElementById("sentencesPage");

// English punctuation marks:
const punctuation = {
    "en": "!?.",
    "es": ".¿?¡!",
    "ja": "。！？!?."
};

// Event Listener to update the char count element so that the user can track their character count
// 
inputText.addEventListener("input", () => {
    charCount.textContent = `${inputText.textContent.length}/1000`
    if (inputText.textContent.length > 1000) {
        charCount.style.color = "red";
    }
    else {
        charCount.style.color = "black";
    }
})


async function translateText(translator) {
    console.log(inputText.textContent);
    resultText.textContent = await translator.translate(inputText.textContent);
    // console.log(await translator.translate(inputText.textContent));
}

// function to obtain the languages from the forms 
function getLanguages(form) {
    const selected = document.querySelector(`input[name="${form}"]:checked`);
    // If a language is selected, reutrn it 
    if (selected){
        return selected.value;;
    }
    // Else, return "null"
    else {
        return "null";
    }
}

function verifyEntry() {
    // Calling to get the languages selected
    const languageA = getLanguages("languageA");
    const languageB = getLanguages("languageB");
    // console.log(languageA, languageB);

    // if either language is unselected, alert user
    if (languageA === "null" || languageB === "null") {
        alert("select a language");
        return;
    }

    // Currently, the translation API is said to only support bi-directional translations bettwen English-Spanish and English-Japanese
    // https://docs.google.com/document/d/1bzpeKk4k26KfjtR-_d9OuXLMpJdRMiLZAOVNMuFIejk/edit?tab=t.0
    // Will remove/edit this as support changes
    if ((languageA === "es" && languageB === "ja") || (languageA === "ja" && languageB === "es")) {
        alert("Bi-directional Translations Between Spanish and Japanese are not yet Supported");
        return;
    }

    // if both languages are the same, alert user 
    if (languageA === languageB) {
        alert("Please Select Two Different Languages");
        return;
    }

    // If the entry textbox is empty, alert use
    if (inputText.textContent === "") {
        alert("Plase Enter Text");
        return;
    }



    // If everything is valid, start the game
    gameStart(languageA, languageB, inputText.textContent)
}

async function gameStart(languageA, languageB, entryText){
    console.log(languageA, languageB);
    let score = 0;

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
        return;
    }

    // By default, the entry text will be spliced by punctuation
    // At first, I thought of using split with multiple parameters, but I would end up losing the punctuation marks I was using to split
    // Doing it manually would be a easier to maintain the entire sentence as a whole, 
    // and would allow me to make unique parameters for each language. For example, "upside down ?" for spanish

    // List of sentences to then be iterated through
    let sentences = [];
    let currentSentence = []; // Each sentence will be built with a list, then turned to string with .join 
    for (let char of entryText) {
        // If a punctuation mark is found, add it to the built sentence and add it as a string to the sentences list
        if (punctuation[languageA].includes(char)) {
            if (currentSentence.length === 0){
                continue;
            }
            currentSentence.push(char);
            sentences.push(currentSentence.join("")); // According to some sources, this is vastly more optimal than continuous "+" 
            currentSentence = []; // Reset the currentSentence list to build the next string
        }
        // If there is empty space that is not apart of a sentence, ignore it 
        else if ((char === ' ' || char.charCodeAt(0) === 160) && currentSentence.length === 0) { // " " seems to have the code of 160, so its included here
            continue;
        }
        else {
            currentSentence.push(char);
        }
    }

    // Catches if a sentence is built without a punctation mark at the end. Ex: "hello"
    if (sentences.len !== 0) {
        currentSentence.push(".");
        sentences.push(currentSentence.join("")); // According to some sources, this is vastly more optimal than continuous "+" 
    } 
    
    for (let sentence of sentences) {
        setTimeout(async () => {
            // translateText(sentence);
            console.log(sentence);
            resultText.textContent = await translator.translate(sentence);
        }, 2000);
    }
    
    // I'll add a way for users to manually enter sentences themselves
}

// button.addEventListener("click", getTranslator);
button.addEventListener("click", verifyEntry);
// button.addEventListener("click", testingJS);

function testingJS() {
    if (english.includes("!")) {
        console.log("True");
    }
    else{
        console.log("False");
    }
}
