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
    p.noCanvas()
    p.createElement('hr');
    p.createElement("h3", "You can ask Gemini if you need some help");
    let gemini =
    {
      input: p.createInput(),
      button: p.createButton("Ask Gemini"),
    }
    
    let response = createElement('pre');

    gemini.button.mousePressed(() =>
      run(gemini.input.value()).then((data) => response.html(data))
    );
    // gemini.input.changed(() =>
    //   run(gemini.input.value()).then((data) => {p.createElement('pre', data); p.createElement('hr')}))
  };

  p.draw = () => { };

}

setTimeout(() => {
  new p5(mainSketch);
}, 3000); 
