
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let ques = "question";
let ans = "answer";

getinfo();

document.getElementById('jokeQuestion').value = ques;
document.getElementById('jokeAnswer').value = ans;

document.getElementById('jokeForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  let jokeQuestion = document.getElementById('jokeQuestion').value ;
  const jokeAnswer = document.getElementById('jokeAnswer').value ;

  // document.getElementById('jokeQuestion').value = "jo";
  //document.getElementById('jokeAnswer').value = "fo";
  
  
  try {
    const response = await fetch(`/jokes/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        
        answer: jokeAnswer,
        question: jokeQuestion,
      })
    });

    if (response.ok) {
      // Joke added successfully
      
      alert('Joke added successfully!');
      window.location.href ="../admin/manage.html"
      
      // You can redirect or perform any other action here
    } else {
      // If the server returns an error response
      const errorMessage = await response.text();
      alert(`Error: ${errorMessage}`);
    }
  } catch (error) {
    // If there's a network error or other issue with the request
    console.error('Error adding joke:', error);
    alert('Error adding joke. Please try again later.');
  }
});




async function getinfo () {
  try {
    const response = await fetch(`/jokes/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch joke data');
    }
    
    const data = await response.json();
    
    ques = data.jokeQuestion;
    ans = data.jokeAnswer
    
  document.getElementById('jokeQuestion').value = ques;
  document.getElementById('jokeAnswer').value = ans;

  } catch (error) {
    console.error('Error fetching joke data:', error);
  }
}