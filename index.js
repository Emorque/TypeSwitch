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

// Getting both the collapsible button and content 
const collapsibleButton = document.getElementById("collapsible");
const collapsible_content = document.getElementById("collapsible_content");

const collapsibleButton2 = document.getElementById("collapsible2");
const collapsible_content2 = document.getElementById("collapsible_content2");

// Adding collapsible animation for when button is clicked
collapsibleButton.addEventListener("click", () => {
    // collapsibleButton.classList.toggle("active");
    // if (collapsible_content.style.display === "none") {
    //     collapsible_content.style.display = "block";
    // }
    // else {
    //     collapsible_content.style.display = "none";
    // }
    if (collapsible_content.style.maxHeight) {
        collapsible_content.style.maxHeight = null;
    }
    else {
        collapsible_content.style.maxHeight = collapsible_content.scrollHeight + "px";
    }
})


// Adding collapsible animation for when button is clicked
collapsibleButton2.addEventListener("click", () => {
    // collapsibleButton.classList.toggle("active");
    // if (collapsible_content.style.display === "none") {
    //     collapsible_content.style.display = "block";
    // }
    // else {
    //     collapsible_content.style.display = "none";
    // }
    if (collapsible_content2.style.maxHeight) {
        collapsible_content2.style.maxHeight = null;
    }
    else {
        collapsible_content2.style.maxHeight = collapsible_content2.scrollHeight + "px";
    }
})


// Button for text submission
const button = document.getElementById("entry_submission");

// Textbox for the user to enter their paragraph/sentence
const inputText = document.getElementById("entry");

// The entire Entry Page Section
const entryPage = document.getElementById("entryPage");

// Element recording the character count for the initial text entry
const charCount = document.getElementById("char_limit");

// const sentencesPage = document.getElementById("sentencesPage");

// Punctuation Marks:
const punctuation = {
    "en": "!?.",
    "es": ".?!", //I did have "¡" and "¿" here, but I do want to keep these p. marks 
    "ja": "。！？!?."
};

// Event Listener to update the charCount element so that the user can track their character count
inputText.addEventListener("input", () => {
    charCount.textContent = `${inputText.textContent.length}/1000`
    if (inputText.textContent.length > 1000) {
        charCount.style.color = "#E44A36"; // Highlight the charCount once the user exceeds the limit
    }
    else {
        charCount.style.color = "white";
    }
})

// Once the first button is clicked, check if everything is valid
button.addEventListener("click", verifyEntry);

// Function to confirm that langauge selection and text entry is valid
function verifyEntry() {
    // Calling to get the languages
    const languageA = getLanguages("languageA");
    const languageB = getLanguages("languageB");

    // If either language is unselected, alert user
    if (languageA === "null" || languageB === "null") {
        alert("Select A Language");
        return;
    }

    // Currently, the translation API is said to only support bi-directional translations bettwen English-Spanish and English-Japanese
    // https://docs.google.com/document/d/1bzpeKk4k26KfjtR-_d9OuXLMpJdRMiLZAOVNMuFIejk/edit?tab=t.0
    // Will remove/edit this as support changes
    if ((languageA === "es" && languageB === "ja") || (languageA === "ja" && languageB === "es")) {
        alert("Bi-directional Translations Between Spanish and Japanese are not yet Supported");
        return;
    }

    // If both languages are the same, alert user 
    if (languageA === languageB) {
        alert("Please Select Two Different Languages");
        return;
    }

    // If the entry textbox is empty, alert user
    if (inputText.textContent === "") {
        alert("Plase Enter Text");
        return;
    }

    // If the entry is above the limit, alert user 
    // I may want to make this into a variable initialized at the start, and then call here and other places; so I can easily adjust the limit
    if (inputText.textContent.length > 1000) {
        alert("Please Shorten Your Entry");
        return; 
    }

    // If everything is valid, start the game
    gameStart(languageA, languageB, inputText.textContent)
}

// Function to obtain the Languages from the Forms 
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

// Function to start the game (grab the text entry)
async function gameStart(languageA, languageB, entryText){
    const languagePair = {
        sourceLanguage: languageA, // Or detect the source language with the Language Detection API, like Google Translate
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

    // By default, the entry text will be spliced by punctuation marks
    // At first, I thought of using split with multiple parameters, but I would end up losing the punctuation marks I was using to split
    // Doing it manually would be a easier to maintain the each sentence as a whole, 
    // and would allow me to make unique parameters for each language. For example, "¿" for spanish

    let sentences = []; // Will contain all the sentences
    let currentSentence = []; // Each sentence will be built with a list, then turned to string with .join('')
    for (let char of entryText) {
        // If a punctuation mark is found, add it to the built sentence and add it as a string to the sentences list
        if (punctuation[languageA].includes(char)) {
            if (currentSentence.length > 0) {
                currentSentence.push(char);
                sentences.push(currentSentence.join('')); // According to some sources, this is vastly more optimal (building a string with a list) than continuous "+"
            }
            currentSentence = [] // Reset the currentSentence list to build the next sentence
        }
        // If there is whitespace unnecessarily added to the beginning of a sentence, ignore it
        else if ((char === ' ' || char.charCodeAt(0) === 160) && currentSentence.length === 0) { // " " seems to have the code of 160, so its included here
                continue;
            }
        // For all other characters, add them to the currentSentence
        else {
            currentSentence.push(char);
        }
    }

    // if (currentSentence.length !== 0 || (currentSentence[0] !== ' ' || currentSentence.charCodeAt(0) !== 160)) {
    //     sentences.push(currentSentence.join(""));  
    // } 

    // Catches if a sentence is built without a punctation mark at the end. Ex: "hello"
    if (currentSentence.length > 0) {
        sentences.push(currentSentence.join('').trim()); // trim takes care of any extra whitespace at the end
    }
    
    // Future feature will be to allow users to manually add each sentence themselves
    entryPage.remove(); // Removes the initial entry section
    gamePhase(sentences, translator);  // Time to enter gamePhase()
}

// Function for the gamePhase (user translates the sentence themselves)
async function gamePhase(sentences, translator) {
    let score = 0; // Score starts at 0 

    const geminiTranslations = []; // List to contain all of the translations made by Translation API
    const userTranslations = []; // List to contain all of the translations made by the User

    const gameTemplate = document.querySelector('.game'); // Grab the template 

    const gameTemplate_prime = gameTemplate.content.cloneNode(true); // Create a clone

    // Grab each element from the clone
    const gameEntry = gameTemplate_prime.querySelector(".gameEntry");
    const gameResult = gameTemplate_prime.querySelector(".gameResult");
    const gameButton = gameTemplate_prime.querySelector('.gameSubmission');
    const gameCharLimit = gameTemplate_prime.querySelector('.game_char_limit');
    document.body.appendChild(gameTemplate_prime); // Append the clone to the document

    // Same as the charCount element from the previous phase
    gameEntry.addEventListener("input", () => {
        gameCharLimit.textContent = `${gameEntry.textContent.length}/1000`
        if (gameEntry.textContent.length > 1000) {
            gameCharLimit.style.color = "#E44A36";
        }
        else {
            gameCharLimit.style.color = "white";
        }
    })

    // Starting at index 0, and since I had an alert from the previous phase, there will always be at least one sentence
    index = 0

    let currentTranslation = await translator.translate(sentences[index]); // Grab the translation from Translation API
    gameResult.textContent = sentences[index]; // Display the sentence untranslated

    // Listener for when the user confirms their translation
    gameButton.addEventListener("click", async () => {
        // If the translation is too long, alert user
        if (gameEntry.textContent.length > 1000) {
            alert("Please Shorten Your Translation");
            return;
        }

        // Push the two translations to their corresponding list 
        geminiTranslations.push(currentTranslation);
        userTranslations.push(gameEntry.textContent);

        // Call getScore to get the score for this translation
        score += getScore(gameEntry.textContent, currentTranslation);
        index += 1 
        gameEntry.textContent = ""; // Reset the textbox for the user 
        
        // Execute this once the last sentence has been translated by the user
        if (index >= sentences.length) {
            // Remove all the elements introduced from this phase 
            gameEntry.remove();
            gameResult.remove();
            gameButton.remove();
            document.querySelectorAll(".gameRemove").forEach(e => e.remove());
            gotoResults(sentences, userTranslations, geminiTranslations, score / sentences.length); // Enter the next phase to 
        }
        gameResult.textContent = sentences[index]; // Set to the next untranslated sentence
        currentTranslation = await translator.translate(sentences[index]); // Grab the translation for that sentence
    })
}

// async function translateText(translator) {
//     console.log(inputText.textContent);
//     resultText.textContent = await translator.translate(inputText.textContent);
// }

function getScore(entry, translation) {
    // There are many ways of implementing how I could score how well the user translated their sentences
    // Some of them involve could involve dealing with NLP and different models, but for simplicity, I'll use dp approach for edit distance
    // I'll get the min edit distance, return the calculated score

    // This won't account for mistakes in grammer or syntax, but by adding special characters buttons like "á" for the user should make the score more in their favor
    
    // If the user did not enter anything, just return 0 
    if (entry === "") {
        return 0;
    }

    // Create a 2d matrix, where the row/col are determined by the length of entry/translation
    const matrix = new Array(entry.length + 1).fill(0).map(
        () => new Array(translation.length + 1).fill(0));

    // Initialize the rightmost column and bottommost row, as they represent the whole string's edit distance to a substring of the other
    for (let c = 0; c <= translation.length; c++){
        matrix[entry.length][c] = translation.length - c;
    }
    for (let r = 0; r <= entry.length; r++){
        matrix[r][translation.length] = entry.length - r;
    }

    // Each cell in the matrix represents the number of changes those current indexes (r,c) for "entry" to change to "translation"
    // Since this is a bottom-up approach where previous change scores are pushed back up, matrix[0][0] will have the min number of changes
    for (let r = entry.length - 1; r >= 0; r--){
        for (let c = translation.length - 1; c >= 0; c--) {
            // If the characters are that index match, no need for a change, so just grab what is at matrix[r + 1][c+1], since it is like these two characters are not even in either string
            if (entry[r] === translation[c]) {
                matrix[r][c] = matrix[r + 1][c + 1];
            }
            // Else, a change needs to be made, grab which ever path (deletion: matrix[r + 1][c], insertion: matrix[r][c + 1], replace: matrix[r + 1][c + 1]) has the lowest score, and add 1 to represent the need for a change here
            else {
                matrix[r][c] = 1 + (Math.min(matrix[r + 1][c + 1], 
                    Math.min(matrix[r + 1][c], matrix[r][c + 1])));
            }
        }
    }

    // matrix[0][0] now houses the minimum number of changes needed to convert gameEntry (user's translation) to gameResult (gemini Translation)
    // The score for this translation will be this score over the length of whichever string is the largest
    // This should normalize the score 

    // The "1-" and "*100" are for returning a percentage score instead of a decimal
    return (1 - (matrix[0][0] / Math.max(entry.length, translation.length))) * 100;
}

// Function for displaying the overall score, and all the translations from both the Translation API and the User
function gotoResults(sentences, userTranslations, geminiTranslations, score) {
    // Results Template houses just the overall score 
    const resultsTemplate = document.getElementById('resultsPage');
    document.body.appendChild(resultsTemplate.content);

    const scoreText = document.getElementById('score');
    scoreText.textContent = `Your average score is ${score.toFixed(2)}`; // Cut the final score at the hundredths place and display

    // Obtain the template for displaying one set of translations (1 of API and User)
    const translationsTemplate = document.querySelector('.translationsList');
    for (let i = 0; i < userTranslations.length; i++) {
        const translations_prime = translationsTemplate.content.cloneNode(true); // Create a clone of the template
        
        // Set the values of each textbox from its corresponding list
        const ogSentence = translations_prime.querySelector('.ogSentence');
        const gTranslation = translations_prime.querySelector('.geminiTranslation');
        const uTranslation = translations_prime.querySelector('.userTranslation');
        
        ogSentence.textContent = sentences[i]
        gTranslation.textContent = geminiTranslations[i];
        uTranslation.textContent = userTranslations[i];
                
        document.body.appendChild(translations_prime); // Append the clone to the document 
    }

    const buttonTemplate = document.querySelector('.homeButton');
    const button_prime = buttonTemplate.content.cloneNode(true); // Create a clone

    const backHomeButton = button_prime.querySelector('#goToHome');
    backHomeButton.addEventListener("click", () => {
        location.reload();
    })

    document.body.appendChild(button_prime);

}

// button.addEventListener("click", testing);
function testing() {
    const gameEntry = "hello";
    const gameResult = "Hyllo";

    const matrix = new Array(gameEntry.length + 1).fill(0).map(() => new Array(gameResult.length + 1).fill(0));

    for (let i = 0; i <= gameResult.length; i++){
        matrix[i][gameResult.length] = gameResult.length - i;
    }
    for (let j = 0; j <= gameEntry.length; j++){
        matrix[gameEntry.length][j] = gameEntry.length - j;
    }

    for (let r = gameEntry.length - 1; r >= 0; r--){
        for (let c = gameResult.length - 1; c >= 0; c--) {
            if (gameEntry[r] === gameResult[c]) {
                matrix[r][c] = matrix[r + 1][c + 1];
            }
            else {
                matrix[r][c] = 1 + (Math.min(matrix[r + 1][c + 1], 
                    Math.min(matrix[r + 1][c], matrix[r][c + 1])));
            }
        }
    }

    // matrix[0][0] now houses the minimum number of changes needed to convert gameEntry (user's translation) to gameResult (gemini Translation)
    // The score for this translation will be this score over the length of whichever string is the largest
    // This should normalize the score 

    // The "1-" and "*100" are for returning a percentage score instead of decimal
    // console.log(Math.max(gameEntry.length, gameResult.length));
    // console.log(matrix[0][0] / Math.max(gameEntry.length, gameResult.length));
    // console.log((1 - (matrix[0][0] / Math.max(gameEntry.length, gameResult.length))) * 100);
    return (1 - (matrix[0][0] - Math.max(gameEntry.length, gameResult.length))) * 100;
}