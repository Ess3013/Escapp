let email, password, signIn, puzzle1, puzzle2, time, progress;

function setup() {
  
  
  var socket = io('ws://escapp.es/', {query: {
  "escapeRoom": '80',
  "email": 'eslamessam3013@gmail.com',
  "token": "RHxqej6vYx2Q3zv4eD9NFm",
  // Optional (if you don't have the token)
  // "password": 'ziCY8AgsX7u3NSh'
  }});

// socket.emit("START_PLAYING");
socket.on("connect", (payload)=> append(payload))




//   email = select('#email');
//   password = select('#pwd');
//   signIn = select('#submit');
//   noCanvas();
//   signIn.mousePressed(() => escappStart(80, email, password));
//   createElement("h3", "Solve the puzzles to escape.");

//   puzzle1 = createPuzzle("The key to escape is to look up and count. ");
//   puzzle1.button.mousePressed(() => solve(1, puzzle1.input.value(), puzzle1.message, email, password));
//   puzzle1.hint.mousePressed(() => puzzle1.message.html('Count the paintings on ceilings.'))
//   puzzle2 = createPuzzle("The Bishop is praying now. Where is he? ");
//   puzzle2.button.mousePressed(() => solve(2, puzzle2.input.value(), puzzle2.message, email, password));
//   puzzle2.hint.mousePressed(() => puzzle2.message.html('Look for a place where the bishop stays during worship.'))

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


// function createPuzzle(prompt) {
//   let puzzle = createElement('span', prompt);
//   let input = createInput();
//   let button = createButton("submit");
//   let hint = createButton('hint')
//   let message = createSpan();
//   createP();
//   return { puzzle: puzzle, input: input, button: button, hint: hint, message: message };
// }


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
