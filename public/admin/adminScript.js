// const main = document.getElementById("main");

// // Function to fetch data from an API endpoint and display it
// async function fetchDataAndDisplay(url) {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }
//     const data = await response.json();
//     // Display the fetched data
//     displayData(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// // Function to display the fetched data
// function displayData(data) {
//   data.forEach(obj => {
//     let div = document.createElement("div");
//     div.setAttribute("Class", "jokes")
//     let jokeQuestion = document.createElement("h1"); 
//     let jokeAnswer = document.createElement("p"); 

//     let admincontrol = document.createElement("div");
//     admincontrol.setAttribute("Class", "adminControl")

//     let editbutton = document.createElement("button"); 
//     editbutton.setAttribute("Class", "editbutton");
//     editbutton.innerHTML ="Edit"

//     let deletebutton = document.createElement("button"); 
//     deletebutton.setAttribute("Class", "deletebutton");
//     deletebutton.innerHTML ="Delete"
    
    
   

//     const id = obj.id;

//     deletebutton.addEventListener("click", (id)=> {
//       console.log(id);
//     })
//     jokeQuestion.textContent = obj.jokeQuestion;
//     jokeAnswer.textContent = obj.jokeAnswer;
    

//     div.appendChild(jokeQuestion);
//     div.appendChild(jokeAnswer);
//     admincontrol.appendChild(editbutton);
//     admincontrol.appendChild(deletebutton); 
//     div.appendChild(admincontrol)

//     main.appendChild(div);
//   });
// }

// // Example usage: Fetch data from an API endpoint and display it
// const apiUrl = '/jokes';
// fetchDataAndDisplay(apiUrl);








// --------------------------

const main = document.getElementById("main");

// Function to fetch data from an API endpoint and display it
async function fetchDataAndDisplay(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    // Display the fetched data
    displayData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to display the fetched data
function displayData(data) {
  data.forEach(obj => {
    let div = document.createElement("div");
    div.setAttribute("Class", "jokes")
    let jokeQuestion = document.createElement("h1"); 
    let jokeAnswer = document.createElement("p"); 

    myObjectId = obj._id
    myObjectIdString = myObjectId.toString()

    let admincontrol = document.createElement("div");
    admincontrol.setAttribute("Class", "adminControl")

    const link = document.createElement('a');

// Set the href attribute to the URL
    link.href = `../edit/edit.html?id=${myObjectIdString}`;

    let editbutton = document.createElement("button"); 
    editbutton.setAttribute("Class", "editbutton");
    editbutton.innerHTML = "Edit";

    editbutton.addEventListener("click", async()=>{
      
    })

    link.appendChild(editbutton);
    let deletebutton = document.createElement("button"); 
    deletebutton.setAttribute("Class", "deletebutton");
    deletebutton.innerHTML = "Delete";

    deletebutton.addEventListener("click", async () => {
      try {
      
      console.log(myObjectIdString);
        const response = await fetch(`/jokes/${myObjectIdString}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
            // Add any additional headers if needed
          }
        });

        if (!response.ok) {
          throw new Error("Failed to delete joke");
        }

        // Remove the joke from the DOM after successful deletion
        div.remove();
        console.log("Joke deleted successfully");
      } catch (error) {
        console.error("Error deleting joke:", error);
      }
    });
    
    jokeQuestion.textContent = obj.jokeQuestion;
    jokeAnswer.textContent = obj.jokeAnswer;
    

    div.appendChild(jokeQuestion);
    div.appendChild(jokeAnswer);
    admincontrol.appendChild(link);
    //admincontrol.appendChild(editbutton);
    admincontrol.appendChild(deletebutton); 
    div.appendChild(admincontrol);

    main.appendChild(div);
  });
}

// Example usage: Fetch data from an API endpoint and display it
const apiUrl = '/jokes';
fetchDataAndDisplay(apiUrl);


