'use strict';
import './index.html';
import './jquery-3.4.1.min';
// import './index.scss' ;

function isRoundBrackets(arg) {
  return arg < 0.3
}

function isSquareBrackets(arg) {
  return arg >= 0.3 && arg < 0.7
}

function isBraces(arg) {
  return arg >= 0.7
}

function isAddNewArray(arg) {
  return arg > 0.5
}

let inputField = document.querySelector('.input-field');
let outputField = document.querySelector('.output-field');

inputField.addEventListener('input', handleInput, false);
function handleInput() {
  if (event.target.value <= 0) event.target.value = 1;
  let targetVal = event.target.value;
  let resultOutput = [];
  let typeBrackets = false;

  for (let i = 0; i < targetVal; i++) {
    let randNum = Math.random();
    // Random choose brackets
    if (isRoundBrackets(randNum)) typeBrackets = '()';
    if (isSquareBrackets(randNum)) typeBrackets = '[]';
    if (isBraces(randNum)) typeBrackets = '{}';

    if (isAddNewArray(randNum) || resultOutput[0] === undefined) {     // Random choose add or insert brackets
      resultOutput.push(typeBrackets);
    } else {
      // Random choose element of array brackets
      let resultOutputLength = (resultOutput.length - 1 > 0 ) ? resultOutput.length - 1 : 0 ;
      let randIndexOfArray = Math.round((resultOutputLength * (randNum * 100)) / 100);
      console.log('resultOutputLength', resultOutputLength);
      console.log('randIndexOfArray', randIndexOfArray);

      // Random choose bracket for insert choose brackets
      let resArray = resultOutput[randIndexOfArray].matchAll(/\(|\{|\[/g);
      resArray = Array.from(resArray); // теперь массив
      let resArrayLength = (resArray.length - 1 > 0 ) ? resArray.length - 1 : 0 ;
      let randIndexOfResArray = Math.round((resArrayLength * (randNum * 100)) / 100);

      // Insert choose bracket
      let indexPosWhereInsBrackets = resArray[randIndexOfResArray].index;
      let startStr = resultOutput[randIndexOfArray].slice(0, indexPosWhereInsBrackets + 1);
      let endStr = resultOutput[randIndexOfArray].slice(indexPosWhereInsBrackets + 1);
      resultOutput[randIndexOfArray] = startStr + typeBrackets + endStr;
    }
  }
  jQuery(outputField).text(resultOutput.join(''));
}


