let email, password;

function setup() {
  noCanvas();
  email = select('#email');
  password = select('#pwd');
  let signIn = select('#submit');
  signIn.mousePressed(() => escappStart(80, email, password));

  let puzzle1 = createPuzzle(1, "The key to escape is to look up and count. ");
  // puzzle1.button.mousePressed(() => solve(1, puzzle1.input.value(), puzzle1.message, email, password));
 
  let puzzle2 = createPuzzle(2, "The Bishop is praying now. Where is he? ");
  // puzzle2.button.mousePressed(() => solve(2, puzzle2.input.value(), puzzle2.message, email, password));

  createSpan('Remaining time: ');
  let time = createElement('b', 'time');
  setInterval(() => {

    if (password.value()) {
      escappAuth(80, email, password)
      .then(res => time.html((res.erState.remainingTime / 60).toFixed(2) + ' minutes'));
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
    .then((res) => {return res});
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



function createPuzzle(puzzleNum, prompt) {
  let puzzle = createElement('span', prompt);
  let input = createInput();
  let button = createButton("submit");
  let message = createSpan('Press submit');
  createP();
  button.mousePressed(()=> solve(puzzleNum, input.value())
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
    .then((res) => { console.log(res); return res;});
}
