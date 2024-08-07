let fruits = [];
let addedFruits = [];

function fetchFruits() {
	const url = "./static/fruit_data.json";
	fetch(url)
	.then(response => response.json())
	.then(data => {
		console.log('Data:', data);
		fruits = data;
	})
}

function render() {
	const {value, nameFromInput} = getInputValues();
	console.log('the input Value is:', value, nameFromInput);

	let buttonsDiv = document.querySelector('#buttons');
	let resultsDiv = document.querySelector('#results');
	
	if (addedFruits.includes(nameFromInput)) {
		console.log('Fruit already added:', nameFromInput)
		return;
	}

	let newButton = document.createElement('button')
	newButton.classList.add('fruit-button');
	newButton.innerText = nameFromInput;

	newButton.onclick = function() {
        removeBar(nameFromInput);
    };

	buttonsDiv.appendChild(newButton);

	// pull data from array based on input
	let result = fruits.find(({name}) => name === nameFromInput);
	console.log('Result:', result);
	if (result) {
		let newDiv = document.createElement('div');
		newDiv.classList.add('BarChart-bar');
		
		// adjust which data is pulled from array
		height = 0
		if (value === "calories") {
			height = result.nutritions.calories;
		} else if (value === "carbs") {
			height = result.nutritions.carbohydrates;
		} else {
			height = result.nutritions.sugar;
		}
		
		newDiv.textContent = result.name + ' (' + height + ')';
		newDiv.style.height = height + "%";
		newDiv.dataset.fruitName = nameFromInput;
		resultsDiv.appendChild(newDiv);
		addedFruits.push(nameFromInput);
		console.log(addedFruits);
	} else {
		console.log('Fruit not found:', nameFromInput);
	}
	document.querySelector('#name-input').value = '';
}

function getInputValues() {
	// get Selected Choice (calories, carbs or sugar)
	const value = document.querySelector('#choices').value;

	// get fruit name input
	const nameFromInput = document.querySelector('#name-input').value;
	console.log('Values:', nameFromInput);
	return {value, nameFromInput};
}

function updateBarHeights() {
	console.log('Starting...', addedFruits);
	const {value, nameFromInput} = getInputValues();
	let resultsDiv = document.querySelector('#results');
	for (let i = 0; i < addedFruits.length; i++) {
		let result = fruits.find(({name}) => name === addedFruits[i]);
		let div = resultsDiv.children[i];
		console.log(i, result, div);
		if (result) {
			let height = 0
			if (value === "calories") {
				height = result.nutritions.calories;
			} else if (value === "carbs") {
				height = result.nutritions.carbohydrates;
			} else {
				height = result.nutritions.sugar;
			}
			div.textContent = result.name + ' (' + height + ')';
			div.style.height = height + "%";
		}
	}
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#choices').addEventListener('change', updateBarHeights);
});

function removeBar(fruitName) {
	//remove button
	let buttonsDiv = document.querySelector('#buttons');
	let buttonToRemove = Array.from(buttonsDiv.querySelectorAll('.fruit-button')).find(button => button.innerText === fruitName);
	if (buttonToRemove) {
		buttonToRemove.remove();
	}
	//remove bar
	let resultsDiv = document.querySelector('#results');
	let barToRemove = Array.from(resultsDiv.querySelectorAll('.BarChart-bar')).find(bar => bar.dataset.fruitName === fruitName);
	if (barToRemove) {
		barToRemove.remove();
	}
	addedFruits.delete(fruitName);
	console.log(addedFruits);
}

fetchFruits();