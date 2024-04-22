let email, password;
let puzzles = [0];

function setup() {
  noCanvas();
  // alert('Welcome to our educational escape room! \nPlease insert your Escapp email and password in their respective boxes.');
  // email = select('#email');
  // password = select('#pwd');
  // let start = false;
  // let signIn = select('#submit');
  // signIn.mousePressed(() => {
  //   escappStart(80, email, password);
  //   start = true;
  //   alert('Start the 3D model by pressing the play button in the middle. \nExplore the model by: \n - Click left mouse button and drag to Rotate. \n - Click right mouse button and drag to Pan \n - Zoom in and out using the scroll wheel.');
  //   alert('- You can also explore the model by clicking on the numbered annotations to move you through the model and give you useful information about it. \n- Read the puzzles carefully and try to solve them before the time ends. \n- You can also ask Gemini for help if you need. (for example: you can describe the escape room environment to Gemini and ask for its help with the puzzles)');
  // });
  
  email = localStorage.getItem("email");
  email = localStorage.getItem("password");

  addPuzzle(3, "The key to escape is to look up and count. ")

  addPuzzle(4, "The Bishop is praying now. Where is he? ")

  createSpan('Remaining time: ');
  let time = createElement('b', 'time');

  var geminiScript = document.createElement('script');
  geminiScript.src = "gemini.js";
  geminiScript.type = "module";
  document.getElementsByTagName('head')[0].appendChild(geminiScript);


  setInterval(() => {

    if (password.value() && start) {
      escappAuth(80, email, password)
        .then(res => {
          time.html((res.erState.remainingTime / 60).toFixed(2) + ' minutes');
          res.erState.puzzlesSolved.forEach(puzzle => {
            console.log(res.erState);
            puzzles[puzzle].input.value(res.erState.puzzleData[puzzle].solution);
            puzzles[puzzle].input.attribute('disabled', 'true');
            puzzles[puzzle].button.attribute('disabled', 'true');
            puzzles[puzzle].message.html('Puzzle Solved! ');
          });
        })
    }

  }, 1000);

}


function escappAuth(roomNumber, email, password) {
  const URI = "https://escapp.es/api/escapeRooms/" + roomNumber + "/auth";
  var response;
  return fetch(URI, {
    method: "POST",
    body: JSON.stringify({
      email: email.value(),
      password: password.value(),
    }),
    headers: {
      "Content-type": "application/json",
      "Accept-Language": "es-ES",
    },
  })
    .then((res) => res.json())
    .then((res) => { return res });
}


function escappStart(roomNumber, email, password) {
  const URI = "https://escapp.es/api/escapeRooms/" + roomNumber + "/start";
  var response;
  fetch(URI, {
    method: "POST",
    body: JSON.stringify({
      email: email.value(),
      password: password.value(),
    }),
    headers: {
      "Content-type": "application/json",
      "Accept-Language": "es-ES",
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
}


function addPuzzle(puzzleNum, prompt) {
  append(puzzles, createPuzzle(puzzleNum, prompt));
}


function createPuzzle(puzzleNum, prompt) {
  let puzzle = createElement('span', prompt);
  let input = createInput();
  let button = createButton("submit");
  let message = createSpan('Press submit');
  createP();
  button.mousePressed(() => solve(puzzleNum, input.value())
    .then(res => {
      message.html(res.msg);
      if (res.code == 'OK') input.attribute('disabled', 'true');
    }))
  return { puzzle: puzzle, input: input, button: button, message: message };
}


function solve(puzzleNum, input) {
  const solution = input;
  const URI =
    "https://escapp.es/api/escapeRooms/80/puzzles/" + puzzleNum + "/submit";
  return fetch(URI, {
    method: "POST",
    body: JSON.stringify({
      email: email.value(),
      password: password.value(),
      solution: solution,
    }),
    headers: {
      "Content-type": "application/json",
      "Accept-Language": "es-ES",
    },
  })
    .then((res) => res.json())
    .then((res) => { console.log(res); return res; });
}
