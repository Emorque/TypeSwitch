![TypeSwitch Logo](/Logo/TypeSwitch.svg)
# TypeSwitch - A Language Learning Application

TypeSwitch is a language learning application the goal of helping you level up with writing proficiency when learning a new language, built with the Translation API from the Google Chrome Built-in AI - Early Preview Program. 

## Demo
<img src="TypeSwitch_demo.gif">

## Technologies Used
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Inkscape](https://img.shields.io/badge/Inkscape-e0e0e0?style=for-the-badge&logo=inkscape&logoColor=080A13)

## Installation
1. Clone the Repo
```sh
https://github.com/Emorque/TypeSwitch.git
```
2. Run index.html on a Chrome Browser

## Setup
*TypeScript requires an experimental flag from Chrome 131+ on desktop platforms*
*It is recommended to use with [Chrome Canary](https://www.google.com/chrome/canary/) or [Chrome Dev](https://www.google.com/chrome/dev/?extra=devchannel)*
####
1) Go to: <strong>chrome://flags/#translation-api</strong> and enable "Experimental translation API"
2) Navigate to <strong><a href="https://translation-demo.glitch.me/" target="_blank">here</a></strong>
3) Click “from en to es” and “from en to ja” under canTranslate().
*Please wait as language models and translation components are downloaded in the background*
4) Go to: <strong>chrome://components</strong> and look for TranslateKit components to monitor progress                       
5) Translation API is now ready to translate English ⇔ Spanish and English ⇔ Japanese
6) Go to <strong>chrome://on-device-translation-internals/</strong> to install all other needed pairs

*Since the API is build into your browser, TypeSwitch can work offline*


## How to Use

- Copy & Paste a piece of text (Can be from an article, book, blog, etc.)
- Select your base and target language
- As of 12.10.24, 18 Language Pairs are supported
- All Pairs:
1. English ⇔ Spanish
2. English ⇔ Japanese
3. English → Arabic
4. English → French
5. English → Korean
6. English → Russian
7. English → Chinese
8. English → Chinese (Traditional)
9. English → Bengali
10. English → Hindi
11. English → Dutch
12. English → Thai
13. English → German
14. English → Italian
15. English → Polish
16. English → Turkish
17. English → Portuguese
18. English → Vietnamese
    </details>   
- Try your best to translate the original sentence to your selected target language
- Once all sentences are translated, you will see a page of translations from you and Translation API
- A general score is given to give a estimate of how you did, Grammar/syntax is not fully accounted for, so don't take the score to heart
- Compare your translations to that of Translation API and see how you did. 

## Features to work on in the future: 
1. Create a backend to house user data and authentication. 
2. Create a complementary extension.  
3. Have a daily sentence! Kind of like how Wordle has a daily word people try to guess. 
4. Improve the UI/UX.

## License
MIT
