function cleanBlocks() {
  const allBlocks = document.querySelectorAll('.Tix-hour-block, .Tix-minute-block');
  allBlocks.forEach(block => {
  block.style.backgroundColor = 'white'; // Reset to default color
  block.style.background = '';
  });
}
// how many of the first/second value to paint
function arrayOfValue(value,max) {
  const array = [];
  const arraySeen = [];
  while(array.length !== value) {
    randomNumber = 1 + Math.floor(Math.random() * max);
    if (arraySeen.includes(randomNumber.toString())){
      continue;
    } else {
      array.push(randomNumber.toString());
      arraySeen.push(randomNumber.toString());
    }
  }

  //check
  console.log(array);
  return array;
}

//list of random colors that can be used to paint the blocks
//delete the whole function if you want to have only 4 colors
function randomColors() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return [r,g,b]; //like 245, 74, 23;
}


function quary() {
  if(!mode_blink("false")) {
    return;
  }
  // Query all elements with id that starts with 'minute_'
  var minutes = document.querySelectorAll("[id^='minute_']");
  
  // Query all elements with id that starts with 'hour_'
  var hours = document.querySelectorAll("[id^='hour_']");

  // Initialize an array to store all the ids
  var allIds = [];

  // Push all minute ids into the array
  minutes.forEach(function(element) {
    allIds.push(element.id);
  });

  // Push all hour ids into the array
  hours.forEach(function(element) {
    allIds.push(element.id);
  });

  bright(allIds);
};

var counter = 0;

function bright(elements) {
  // Iterate over each element
  elements.forEach(function(name) {
    var element = document.getElementById(name);
    var color = element.style.background;

    // Log the current color to a text element (optional)
    let seconds = new Date().getSeconds();

    // Determine the desired alpha value
    let alpha = (counter % 2 === 0) ? "1" : "0.5";

    // Check if color contains an RGBA value and update it
    if (color.includes("rgba")) {
      // Replace the alpha value in the rgba color
      color = color.replace(/rgba\(([^,]+),([^,]+),([^,]+),([^)]*)\)/, `rgba($1,$2,$3,${alpha})`);
    } else if (color.includes("rgb")) {
      // If it’s rgb (without alpha), add alpha value
      color = color.replace(/rgb\(([^,]+),([^,]+),([^)]*)\)/, `rgba($1,$2,$3,${alpha})`);
    }

    // Apply the updated color
    element.style.background = color;
    // Update the text element with the new color
  });

  // Increment the counter
  counter++;
}

appeared = false;

function appear_call() {
if(!appeared) {
  appeared = true;
  let element = document.getElementById("Tix");
  let opacity_value = 0;
  let interval = setInterval(function() {
    opacity_value += 0.01;

    element.style.opacity = opacity_value;

    if(opacity_value>=1) {
      clearInterval(interval);
    }
  })
}
}

// idea of different modes
//works badly
var mode_normal_count = 0;
function mode_normal(not_html) {
  appear_call()
  if(mode_normal_count%2 === 0) {
      if(not_html !== "false") {
          mode_normal_count++;
          document.getElementById("button_color").textContent = "on";
      }
      return false;
  } else {
      if(not_html !== "false") {
          document.getElementById("button_color").textContent = "off";
          mode_normal_count++;
      }
      return true;
  }
}

var mode_frequent_change_count = 0;
function mode_frequent_change(not_html) {
  appear_call()
  if(mode_frequent_change_count%2 === 0) {
      if(not_html !== "false") {
          mode_frequent_change_count++;
          document.getElementById("button_frequency").textContent = "on";
      }
      return false;
  } else {
      if(not_html !== "false") {
          document.getElementById("button_frequency").textContent = "off";
          mode_frequent_change_count++;
      }
      return true;
  }
}

var mode_blink_count = 0;
function mode_blink(not_html) {
  appear_call()
  if(mode_blink_count%2 === 0) {
      if(not_html !== "false") {
          mode_blink_count++;
          document.getElementById("button_blinking").textContent = "on";
      }
      return false;
  } else {
      if(not_html !== "false") {
          document.getElementById("button_blinking").textContent = "off";
          mode_blink_count++;
      }
      return true;
  }
}


//make menu where those functions can be changed in real time
//make the menu full-screen before the user chooses something
//make it become smaller and be a bit to another side, so it can be changed again

// is not used for now
function mode_random_colors() {
  return 0;
}

function painter_send(firstDigit,secondDigit,minutes,hours) {
  //put the next line in the beginning of the function if you want to keep only 4 colors
  cleanBlocks()
    //(digit,max,string)
  painter(firstDigit,6,"minute_","243, 24, 24", "157, 36, 36")

    //(digit,max,string)
  painter(secondDigit,9,"minute__","48, 94, 237", "34, 58, 132")


  hours_string = hours.toString();
  if (hours >= 10) {
    // Extract the first and second digits
    firstDigit = parseInt(hours_string[0]);
    secondDigit = parseInt(hours_string[1]);
  } else {

    firstDigit = "no";
    secondDigit = hours; // Value is the time unit(because second digit is located on the right)
  }

  //when we have random numbers, the 4th and 5th arguments are not needed, but kept to bring to the initial colors - yellow, blue, red and smth else I don't remember
  painter(firstDigit,3,"hour_","230, 231, 73", "176, 176, 52")

  painter(secondDigit,9,"hour__","81, 206, 41", "69, 139, 46")
  //delete if you want to have only 4 colors
  minuteCash = minutes;
}

// painting the blocks
function painter(digit,max,string,color1,color2) {
  if(digit === "no"){
    return;
  }
  var result = arrayOfValue(digit,max);
  for(let i = 0; i < digit; i++) {
    let nameOfId = string + result[i];
    let element = document.getElementById(nameOfId);
    //delete the next 3 lines if you want to have only 4 colors
    if (!mode_normal("false")) {
      var [r, g, b] = randomColors();
      color1 = r.toString() + ", " + g.toString() + ", " + b.toString(); // the lighter color
      color2 = (r - 50).toString() + ", " + (g - 50).toString() + ", " + (b - 50).toString(); // the darker color
    }

    //the brightness not needed when the "bright()" function is involved
    element.style.background = "radial-gradient(rgba(" + color1.toString() + "), rgba(" + color2.toString() + "))";
    console.log(nameOfId, "has been painted");
  }
}
let firstDigit, secondDigit;
//delete if you want to have only 4 colors
var minuteCash;

async function date() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  minutes_string = minutes.toString();
  if (minutes >= 10) {
    // Extract the first and second digits
    firstDigit = parseInt(minutes_string[0]);
    secondDigit = parseInt(minutes_string[1]);
  } else {
    // For single-digit numbers, set the second digit to null or handle accordingly
    firstDigit = "no";
    secondDigit = minutes; // Or set to a default value like 0 if needed
  }

  //painter_send(firstDigit,secondDigit,minutes,hours)
  if(mode_frequent_change("false")) {
    painter_send(firstDigit,secondDigit,minutes,hours)
  } else {
    if (minuteCash !== minutes) {
      painter_send(firstDigit,secondDigit,minutes,hours)
    }
  }
}

//date()

var called_once = false;

// Call the date function every second, but is meant to be an accuracy tool when the program updates every minute
function startFunction() {
  if(!called_once) {
      setInterval(() => {
          date();
          quary(); //exists for blinking. Comment the line to make it stop blinking
      }, 1000);
  } else {
      return;
  }
  called_once = true;
}