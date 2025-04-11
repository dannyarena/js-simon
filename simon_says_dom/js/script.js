const numbersList = document.getElementById('numbers-list');
const countdownElement = document.getElementById('countdown');
const form = document.getElementById('answers-form');
const inputGroup = document.getElementById('input-group');
const message = document.getElementById('message');


const randomNumbers = generateRandomNumbers(5, 1, 50);
console.log("Numeri generati:", randomNumbers);