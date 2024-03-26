//#region module
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Fetch your API_KEY
const API_KEY = "AIzaSyBBnnMxEha01UMoT40vJDVrDlpn6wuE5fc";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

async function run(inPrompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = inPrompt;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

//#endregion


const mainSketch = (p) => {
  p.setup = () => {
    p.noCanvas();
    var email = p.select('#email');
    var password = p.select('#pwd');
    p.createP();
    // var signIn = p.createButton('submit');
    var signIn = p.select('#submit');
    signIn.mousePressed(()=>escappStart(80, email, password))
    p.createElement("h3", "Solve the puzzles to escape.");

    let puzzle1 = createPuzzle("The key to escape is to look up and count.");
    puzzle1.button.mousePressed(() => solve(1, puzzle1.input.value(), puzzle1.message, email, password)) //Check thisssssssss

    let puzzle2 = createPuzzle("The Bishop is praying now. Where is he?");
    puzzle2.button.mousePressed(() => solve(2, puzzle2.input.value(), puzzle2.message, email, password));

    p.createElement('hr');
    p.createElement("h3", "You can ask Gemini if you need some help");

    let gemini =
    {
      input: p.createInput(),
      button: p.createButton("Ask Gemini"),
      response: p.createElement('pre')
    }

    gemini.button.mousePressed(() =>
      run(gemini.input.value()).then((data) => gemini.response.html(data))
    );
  };

  p.draw = () => { };

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
    let puzzle = p.createP(prompt);
    // puzzle.position(x, y - 2 * input.height);

    let input = p.createInput();
    // input.position(x, y);

    let button = p.createButton("submit");

    let message = p.createSpan();
    // button.position(input.x + input.width, y);

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
};

new p5(mainSketch);
