const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Parallel lines have so much in common. It’s a shame they’ll never meet.",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "What do you call fake spaghetti? An impasta!",
  "I'm reading a book on anti-gravity. It's impossible to put down!",
  "What do you call a bear with no teeth? A gummy bear!",
  "I used to play piano by ear, but now I use my hands.",
  "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
  "Why did the tomato turn red? Because it saw the salad dressing!"
];




document.getElementById("jokeBtn").addEventListener("click", tellJoke);

const button = document.createElement('button');
button.addEventListener("click", showAnswer)

button.textContent = 'Answer'; // Set button text
button.setAttribute('class', 'showbutton');


let questionNumber ;
let dataFetched = false;
const dataList = [];
const dataAnswer =[];

// Function to fetch data from an API endpoint and store it in an array
async function fetchDataAndStoreInArray(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    // Store the fetched data in the array only if it hasn't been fetched before
    if (!dataFetched) {
      dataList.push(...data.map(obj => obj.jokeQuestion));
      dataAnswer.push(...data.map(obj => obj.jokeAnswer))
      dataFetched = true;
      console.log('Data fetched and stored in array:', dataList);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Example usage: Fetch data from an API endpoint and store it in an array (if not already fetched)
const apiUrl = '/jokes';

fetchDataAndStoreInArray(apiUrl);



function tellJoke() {
  const randomIndex = Math.floor(Math.random() * dataList.length);
  questionNumber= randomIndex;
  const jokeElement = document.getElementById("joke");
  jokeElement.textContent = dataList[randomIndex] 
  jokeElement.appendChild(button)
  document.getElementById("jokeBtn").innerHTML= "Get Another Joke"
}

function showAnswer(){
  const jokeElement = document.getElementById("joke");
   jokeElement.innerHTML = dataList[questionNumber]  +" <br>" + dataAnswer[questionNumber];
  
}