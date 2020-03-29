"use strict"

let inputField = document.querySelector('.input-field');
let outputField = document.querySelector('.output-field');

inputField.addEventListener('input', handleInput, false);

function handleInput(event) {
	console.log(event.target.value);	

	if (event.target.value <= 0) event.target.value = 1;

	

	let resultOutput = []; 
	for (var i = 0; i < event.target.value; i++) {
		let randNum = Math.random();
		console.log(randNum);
		if (isAddNewArray(randNum)) {
			resultOutput[i] = [];
			if (isRoundBrackets(randNum)) resultOutput[i] = '()';
			if (isSquareBrackets(randNum)) resultOutput[i] = '[]';
			if (isBraces(randNum)) resultOutput[i] = '{}';
		}


		

	}

	console.log(resultOutput);
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

function isAddNewArray(arg) {
	return arg < 0.5
}


/*
1) создат массив
2) определить тип скобки
3) определить индекс вставки в масив
4)ЕСЛИ 
	а) пустой то просто вставить скобку
	б) не пустой то запускаем регулярку режем половину скобок и вставляем вибраные скобки в центр строки
*/