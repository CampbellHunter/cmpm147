// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  
  const fillers = {
    greet: ["Wazzup?!", "How's it hangin'?", "Hey!", "What's goin' on!?", "Hey dude!"],
    desc: ["cool", "radical", "show-stopping", "impossible", "crazy", "unbelievable", "shifty", "weird", "terrable", "mispeled"],
    promise: ["knock your socks off!?", "blow your mind!?", "scramble your gourd!?", "kill you instantly!?"],
    num: ["two", "four", "ten", "one and a half", "fourty-seven", "an infinite number of", "way too many"],
    item1: ["pirates", "eagels", "spacemen", "bartenders", "a gameshow host", "a cyborg", "god", "little babies", "a forgoten pair of sneakers"],
    item2: ["parrots", "raiders", "aliens", "a guy down on his luck", "show contestants", "their dog", "biblically accurate angels", "massive babies", "a singular aglet"],
    action: ["promising to try harder next time", "fighting in an embarassing way", "killing JFK", "ordering drugs on the internet", "trying to find love", "taking over the world", "driving to the hospital", "naming all of the US presidents they can think of", "withering away"],
    thing: ["yelling fire in a theater", "killing them off one-by-one", "grieving this terrable loss", "telling them all to jump", "leaving", "falling asleap", "giving new notes every seven and a half seconds", "killing JFK for real", "starting an actual riot", "brining audience members on-stage, where they will remain forever"],
  };

  const template = `$greet

  Wanna hear a $desc new improv game that will $promise

  The game starts with $num players who are acting out a scene where $item1 and $item2 are $action. Then, the show runner will add to the fun by $thing.

  Doesn't that sound totally $desc!?
  `;


  // STUDENTS: You don't need to edit code below this line.

  const slotPattern = /\$(\w+)/;

  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }

  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }

    /* global box */
    $("#box").text(story);
  }

  /* global clicker */
  
  $("#clicker").click(generate);

  generate();
}

// let's get this party started - uncomment me
main();