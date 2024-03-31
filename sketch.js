let email, password, signIn, puzzle1, puzzle2, time, progress;

var ws = new WebSocket("wss://escapp-server.glitch.me");

ws.onopen = function () {
  console.log('WS connected');
}

ws.onclose = function () {

}

ws.onmessage = function (msg) {
  if (msg.data.type) console.log(msg.data.type);
  console.log(msg.data);
}

function wsSend (type, data){
  ws.send(JSON.stringify({type: type, data}))
}

function setup() {

  email = select('#email');
  password = select('#pwd');
  signIn = select('#submit');
  noCanvas();
  signIn.mousePressed(()=> wsSend('connecting', {id:'80', email:email.value(), password: password.value()}));
  createElement("h3", "Solve the puzzles to escape.");

  puzzle1 = createPuzzle("The key to escape is to look up and count. ");
  puzzle1.button.mousePressed(() => wsSend('SOLVE_PUZZLE', {puzzleOrder: 1, sol: puzzle1.input.value()}));
  puzzle1.hint.mousePressed(() => puzzle1.message.html('Count the paintings on ceilings.'))
  puzzle2 = createPuzzle("The Bishop is praying now. Where is he? ");
  puzzle2.button.mousePressed(() => solve(2, puzzle2.input.value(), puzzle2.message, email, password));
  puzzle2.hint.mousePressed(() => puzzle2.message.html('Look for a place where the bishop stays during worship.'))

//   createSpan('Remaining time: ');
//   time = createElement('b', 'time')
//   setInterval(() => {
//     if (password.value()) {
//       escappAuth(80, email, password);
//     }
//   }, 1000);

// }


// function escappAuth(roomNumber, email, password) {
//   const URI = "https://escapp.es/api/escapeRooms/" + roomNumber + "/auth";
//   var response;
//   fetch(URI, {
//     method: "POST",
//     body: JSON.stringify({
//       email: email.value(),
//       password: password.value(),
//     }),
//     headers: {
//       "Content-type": "application/json",
//       "Accept-Language": "es-ES",
//     },
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res); 
//       time.html((res.erState.remainingTime / 60).toFixed(2) + ' minutes')
//     });
// }
// function escappStart(roomNumber, email, password) {
//   const URI = "https://escapp.es/api/escapeRooms/" + roomNumber + "/start";
//   var response;
//   fetch(URI, {
//     method: "POST",
//     body: JSON.stringify({
//       email: email.value(),
//       password: password.value(),
//     }),
//     headers: {
//       "Content-type": "application/json",
//       "Accept-Language": "es-ES",
//     },
//   })
//     .then((res) => res.json())
//     .then((res) => console.log(res));
// }


function createPuzzle(prompt) {
  let puzzle = createElement('span', prompt);
  let input = createInput();
  let button = createButton("submit");
  let hint = createButton('hint')
  let message = createSpan();
  createP();
  return { puzzle: puzzle, input: input, button: button, hint: hint, message: message };
}


// function solve(puzzleNum, input, text, email, password) {
//   const solution = input;
//   const URI =
//     "https://escapp.es/api/escapeRooms/80/puzzles/" + puzzleNum + "/submit";
//   fetch(URI, {
//     method: "POST",
//     body: JSON.stringify({
//       email: email.value(),
//       password: password.value(),
//       solution: solution,
//     }),
//     headers: {
//       "Content-type": "application/json",
//       "Accept-Language": "es-ES",
//     },
//   })
//     .then((res) => res.json())
//     .then((res) => { console.log(res); text.html(res.msg) });
}
