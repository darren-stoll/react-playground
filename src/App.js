import React from 'react';
import './App.css';

/* APPLICATION START */
const App = () => {

  // useState variables that are used to set visibility on main + toys
  const [mainVisibility, setMainVisibility] = React.useState(true);
  const [colorCVisibility, setColorCVisibility] = React.useState(false);
  const [optionToggleVisibility, setOptionToggleVisibility] = React.useState(false);

  // Toggle function that sets the main div visibility to false and the associated button component's div to true
  const setVisibility = (compVis, compVisFunction) => {
    setMainVisibility(!mainVisibility);
    compVisFunction(!compVis);
  }

  return (
    <div className="container">
      {/* shorthand syntax to determine if main div is visible */}
      {mainVisibility && 
        <div className="main">
          <h1>Pick a toy:</h1>
          {/* Showcases the toys that are in the playground to play with */}
          <div className="playgroundSet">
            <button onClick={() => {setVisibility(colorCVisibility, setColorCVisibility)}}>
              Color Changer
            </button>
            <button onClick={() => {setVisibility(optionToggleVisibility, setOptionToggleVisibility)}}>
              Option Toggle
            </button>
          </div>
        </div>
      }
      {/* shorthand syntax to determine if any component is visible */}
      {colorCVisibility && <ColorChanger visFunction={setColorCVisibility} setVisibility={setVisibility} />}
      {optionToggleVisibility && <OptionToggle text="Test2" visFunction={setOptionToggleVisibility} setVisibility={setVisibility} />}
    </div>
  );
}
/* APPLICATION END */

// ColorChanger component: It will change the background color depending on the color you pick
const ColorChanger = ({ visFunction, setVisibility }) => {
  // Store the colors in an array
  const colors = ["#ff0000", "#00ff00", "#0000ff"]
  return (
    <div className="colorC">
      {colors.map((c) => <ColorButton color={c} />)}
      {/* Return to main button, reset the background */}
      <div className="returnButton"><button onClick={() => {setVisibility(true, visFunction); document.body.style.background=""}}>Return to Playground</button></div>
    </div>
  )
}

// ColorButton component for each button in ColorChanger
const ColorButton = ({ color }) => {
  const fadedColor = fadeColor(color);
  return (
    <button 
      className="colorButton" 
      style={{'backgroundColor' : color}} 
      onClick={() => {styleTransition(fadedColor)}}>
        &nbsp;
    </button>
  )
}

// fadeColor function
const fadeColor = (color) => {
  // Extract just the hexadecimal values
  const regex = /\d|[a-f]/g;
  color = color.match(regex);
  // Convert each color part from hexadecimal to decimal
  let colorR = parseInt("0x" + color[0] + color[1]);
  let colorG = parseInt("0x" + color[2] + color[3]);
  let colorB = parseInt("0x" + color[4] + color[5]);
  // Convert color to rgba to take advantage of alpha for fading
  color = `rgba(${colorR}, ${colorG}, ${colorB}, 0.6)`;

  return color;
}

// TextDisplay component: It will log text onto the page depending on what you type in to the textbox
const OptionToggle = ({ text, visFunction, setVisibility }) => {


  return (
    <div className="optionT">
      <button>Option 1</button>
      <button>Option 2</button>
      <button>Option 3</button>
      {/* Return to main button */}
      <div className="returnButton"><button onClick={() => {setVisibility(true, visFunction)}}>Return to Playground</button></div>
    </div>
  )
}

// styleTransition function that handles changing the style of the body when switching apps
const styleTransition = (color) => {
  if (typeof color !== "undefined") document.body.style.background = color;
  document.body.style.transition = "ease-in-out 0.7s";
}

export default App;
