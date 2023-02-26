

  // Define the objects
const objects = {
    candlestick: {
      name: "candlestick",
      description: "An old, rusty candlestick. It looks like it hasn't been used in years.",
      canPickUp: true
    },
    book: {
      name: "book",
      description: "A thick, leather-bound book with strange symbols on the cover. It's written in a language you don't recognize.",
      canPickUp: true
    }
  };
  
  // Define the player's inventory
  const inventory = [];
  
  // Define the current room
  let currentRoom = "foyer";
  let roamingGhost = 'poltergeist';
 

function describeRoom (room) {
 print (rooms[room].describe ());
}

 
  function processCommand(command) {
    const parts = command.split(" ");
    const action = parts[0];
    const target = parts[1];
    print (command + "<br>");
    if (!action) {
      printResponse("I don't understand what you want me to do.");
    } else if (action === "look") {
       look (target);
    } else if (action === "go" || action === "walk") {
       go (target);
    } else if (action == 'take' || action == 'get') {
        take (target);
    }
    else if (action == 'drop') {
        drop (target);
    }
    else if (action == 'inv' || action == 'inventory') {
        print('You are carrying the following:<br>');
        inventory.forEach((item) => {
            print(item);
          });
    }
    else {
      printResponse("I don't know how to do that.");
    }
    clearCommand();
  }

  

// Move to another room
function go(direction) {
    const exit = rooms[currentRoom].exits[direction];
    if (exit) {
      currentRoom = exit;
      //describeRoom(currentRoom);
      print (rooms[currentRoom].describe());
    } else {
      print("You can't go that way.");
    }
  }
  
  // Look at an object or the room
  function look(noun) {
    if (noun) {
      let  obj = objects[noun];
      if (obj) { // the noun is an item
        if (rooms[currentRoom].containsItem(noun)) {
            print(obj.description + "<br>");
        }
        else print ("You don't see that here<br>");

      } // item
      else if ( (obj = characters[noun] ) != undefined) {
        if (characters[noun].room == currentRoom) {
            print (characters[noun].description + "<br>");
        }
        else print ("You don't see that here<br>");
       
      } // noun is a character
       else {
        print("You don't see that here.<br>");
      }
    } // if theres a noun
    
    else { // no noun just show room 
      //describeRoom(currentRoom);
      print (rooms[currentRoom].describe());
    }
  }
  
  
  // Take an object
  function take(noun) {
    if (noun) {
      const item = objects[noun];
      if (!rooms[currentRoom].containsItem(noun) ) {
        printResponse (" I don't see a " + noun + " here.");
        return;
      }

      if (item && item.canPickUp) {
        inventory.push(item.name);
        const index = rooms[currentRoom].items.indexOf(item.name);
       // rooms[currentRoom].items = rooms[currentRoom].items.splice (index,1);
       delete rooms[currentRoom].items[index];
       print ("ok, you pick up the " + noun + "<br>");
       //describeRoom (currentRoom);
      }
    }
}

function drop (noun) {
    const item = objects[noun];
    if (item && inventory.indexOf(item.name) > -1) {
        inventory.pop (item.name);
        rooms[currentRoom].items.push (item.name);
        print ("ok, you dropped the " + item.name);

    }
    else {
        print ("you don't have that.");
    }
}

function moveGhost () {
    let possibleRooms = Object.keys (rooms);
    let rm = Math.floor(Math.random() * possibleRooms.length);
    console.log ("move ghost to " + possibleRooms[rm]);
    rooms [possibleRooms[rm]].characters.push(roamingGhost);
    characters[roamingGhost] = possibleRooms[rm];

    setTimeout ( moveGhost , 15000);
}



print (rooms[currentRoom].describe());
const commandTextbox = document.getElementById("command");
commandTextbox.addEventListener("keydown", function (event){
    if (event.key == 'Enter') processCommand (commandTextbox.value);
});
setTimeout (moveGhost  , 15000);

