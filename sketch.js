// //#region module
// import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// // Fetch your API_KEY
// const API_KEY = "AIzaSyBBnnMxEha01UMoT40vJDVrDlpn6wuE5fc";

// // Access your API key (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI(API_KEY);

// async function run(inPrompt) {
//   // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//   const prompt = inPrompt;
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   return text;
// }

// //#endregion


function setup() {
  noCanvas();
  var email = select('#email');
  var password = select('#pwd');
  var signIn = select('#submit');
  signIn.mousePressed(() => escappStart(80, email, password))
  createElement("h3", "Solve the puzzles to escape.");

  let puzzle1 = createPuzzle("The key to escape is to look up and count. ");
  puzzle1.button.mousePressed(() => solve(1, puzzle1.input.value(), puzzle1.message, email, password)) //Check thisssssssss

  let puzzle2 = createPuzzle("The Bishop is praying now. Where is he? ");
  puzzle2.button.mousePressed(() => solve(2, puzzle2.input.value(), puzzle2.message, email, password));

}


function escappStart(roomNumber, email, password) {
  const URI = "https://escapp.es/api/escapeRooms/" + roomNumber + "/start";
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

function createPuzzle(prompt) {
  let puzzle = createElement('span',prompt);
  let input = createInput();
  let button = createButton("submit");
  let message = createSpan();
  createP();


  return { input: input, button: button, message: message, puzzle: puzzle };
}

function solve(puzzleNum, input, text, email, password) {
  const solution = input;
  const URI =
    "https://escapp.es/api/escapeRooms/80/puzzles/" + puzzleNum + "/submit";
  fetch(URI, {
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
    .then((res) => { console.log(res); text.html(res.msg) });
}


