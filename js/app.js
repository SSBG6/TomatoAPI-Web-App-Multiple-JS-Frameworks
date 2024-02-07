const buttons = [];
// Get the JSON file from the link (Tomato.API)
async function question() {
    const response = await fetch("https://marcconrad.com/uob/tomato/api.php");
    const json = await response.json();
    LoadImg(json.question);
    ButtEvent(json.solution);
    timeRemaining = 60;
  }
//LoadImg so that this class only has one responsibility - load img on the frontend
function LoadImg(question){
  const imageElement = document.getElementById('qimg');
  imageElement.src = question;
}
    for (let i = 0; i < 10; i++) {
      const button = document.createElement('button');
      button.textContent = `Button ${i + 1}`;
      button.textContent = `${[i]}`;
      buttons.push(button);
}
    

// Create a div element.
  const div = document.createElement('div');
// Add the div element to the document body.
  document.body.append(div);
// Append the buttons to the document body.
  div.append(...buttons);

  function ButtEvent(solution){
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
          if (button.textContent==solution){
            points("correct");
          } else {
            points("wrong");
          }
        });
      });
  }
  //Score Handling
  function points(result) {
    if (result === "correct") {
      score += 10;
    } else if (result === "wrong") {
      score -= 5;
    }
  
    /* Check if the player has any chances left */
    if (score <= -5) {
      /* Game over */
      alert("Game over!");
      score = score;
  
      /* Reset the game */
      question();
    }}

/* Create a function to update the countdown timer */
function updateCountdown() {
  timeRemaining--;

  /* Check if the timer has expired */
  if (timeRemaining <= 0) {
    /* Game over */
    alert("Game over!");
    wond
  }

  /* Update the timer display */
  document.getElementById("time").textContent = "Time Remaining: "+timeRemaining;
}

/* Start the countdown timer */
setInterval(updateCountdown, 1000);
question();
