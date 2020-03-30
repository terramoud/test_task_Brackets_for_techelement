'use strict';
import './index.html';
import './jquery-3.4.1.min';
import './index.scss' ;

let checkField = document.querySelector('.check-field');
checkField.addEventListener('input', checkUnpairedBrackets, false);
function checkUnpairedBrackets(e) { // the function that is checking the paired brackets or unpaired brackets is contained in the input field
  let hasBrackets = e.target.value.match(/\(|\{|\[|\]|\}|\)/g); // search all brackets
  (hasBrackets !== null) ? e.target.value = hasBrackets.join('') : e.target.value = ''; // this is remove any symbol besides brackets
  let eTargetVal = e.target.value;
  let isTargetEmpty = eTargetVal === ''; // check if input field is empty

  /**
  * while in input field is contained paired brackets remove all paired brackets,
  * if after the cycle variable the eTargetVal is empty, then all brackets were paired brackets
  */
  while (eTargetVal.search(/\(\)|\[\]|\{\}/g) !== -1) {
    eTargetVal = eTargetVal.replace(/\(\)|\[\]|\{\}/g, '');  // remove all paired brackets
  }

  if (isTargetEmpty) { // if textarea is empty then it setting default style for the results field
    jQuery('.check-result').text('').removeClass('check-result_theme_false').removeClass('check-result_theme_true');
  } else {
    if (eTargetVal === '') {
      /*
      * if input field is empty after checked of the unpaired brackets,
      * then it setting the "true" style for the results field and it write "true"
      */
      jQuery('.check-result').text('true').removeClass('check-result_theme_false').addClass('check-result_theme_true');
    } else {
      /*
      * if input field is not empty after checked of the unpaired brackets,
      * then it setting the "false" style for the results field and it write "false"
      */
      jQuery('.check-result').text('false').removeClass('check-result_theme_true').addClass('check-result_theme_false');
    }
  }
}

function isRoundBrackets(arg) {
  return arg < 0.3
}

function isSquareBrackets(arg) {
  return arg >= 0.3 && arg < 0.7
}

function isBraces(arg) {
  return arg >= 0.7
}

function isNotNestedBrackets(arg) {
  return arg < 0.5
}

let inputField = document.querySelector('.input-field');
inputField.addEventListener('input', handleInput, false);
function handleInput() { // the function, that create random the paired brackets
  if (event.target.value <= 0) event.target.value = 1; // this allows you to create only natural numbers
  let targetVal = event.target.value;
  let resultOutput = []; // the array, that will be contained paired brackets
  let typeBrackets = false;

  for (let i = 0; i < targetVal; i++) {
    let randNum = Math.random();
    // random choose brackets
    if (isRoundBrackets(randNum)) typeBrackets = '()';
    if (isSquareBrackets(randNum)) typeBrackets = '[]';
    if (isBraces(randNum)) typeBrackets = '{}';

    if (isNotNestedBrackets(randNum) || resultOutput[0] === undefined) { // random choose add or insert brackets
      resultOutput.push(typeBrackets); // this is adding brackets to the end of array of brackets
    } else {
      // random choose the element of array of brackets for inserting brackets
      let resultOutputLength = (resultOutput.length - 1 > 0 ) ? resultOutput.length - 1 : 0 ; // get the length of array or set the length is 0
      let randIndexOfArray = Math.round((resultOutputLength * (randNum * 100)) / 100); // get the random index of array that contain brackets

      // this is random choose the level of deep where need add a pair of brackets
      let resArray = resultOutput[randIndexOfArray].matchAll(/\(|\{|\[/g); // this is creating the object that contain all left brackets in the chosen element of array
      resArray = Array.from(resArray); // now it is array
      let resArrayLength = (resArray.length - 1 > 0 ) ? resArray.length - 1 : 0 ; // get the length of array or set the length is 0
      let randIndexOfResArray = Math.round((resArrayLength * (randNum * 100)) / 100); // get the random index of array that contain all "left" brackets

      // it is inserting the paired brackets in chosen place
      let indexPosWhereInsBrackets = resArray[randIndexOfResArray].index; // get the position in string of brackets, where need is adding the selected pair of brackets
      // get the first part of string until the position where need is adding the selected pair of brackets
      let startStr = resultOutput[randIndexOfArray].slice(0, indexPosWhereInsBrackets + 1);
      // get the second part of string since the position where need is adding the selected pair of brackets and until the end of string
      let endStr = resultOutput[randIndexOfArray].slice(indexPosWhereInsBrackets + 1);
      // this is insert selected the pair of brackets in the selected place of the string
      resultOutput[randIndexOfArray] = startStr + typeBrackets + endStr;
    }
  }
  jQuery('.output-field').text(resultOutput.join('')); // this is changing the array of brackets to string of brackets and display it
}



