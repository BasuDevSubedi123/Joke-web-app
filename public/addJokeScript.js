document.getElementById('jokeForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const jokeQuestion = document.getElementById('jokeQuestion').value;
  const jokeAnswer = document.getElementById('jokeAnswer').value;



   document.getElementById("jokeQuestion").value="  ";
  document.getElementById("jokeAnswer").value=" ";

  try {
    const response = await fetch('/jokes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: jokeQuestion,
        answer: jokeAnswer
      })
    });

    if (response.ok) {
      // Joke added successfully
      
      alert('Joke added successfully!');
      jokeQuestion.text = '';
      jokeAnswer.text = '';
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
