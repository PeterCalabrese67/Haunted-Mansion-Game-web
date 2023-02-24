
/*
const rooms = {
    foyer: {
      description: "You are standing in the foyer of the Haunted Mansion. The room is dimly lit and full of cobwebs. A grand staircase leads up to the second floor, and a hallway leads to the north.",
      items: ["candlestick"],
      exits: {
        north: "hallway"
      }
    },
    hallway: {
      description: "You are in a long hallway. The walls are lined with portraits of stern-looking men and women. There is a door to the south, and another door to the north.",
      exits: {
        south: "foyer",
        north: "library"
      },
      items: []
    },
    library: {
      description: "You are in the library. The room is musty and smells of old books. There are rows of bookshelves lining the walls, and a large desk in the center of the room. On the desk, you see a thick, leather-bound book with strange symbols on the cover.",
      items: ["book"],
      exits: {
        south: "hallway"
      }
    },
   
  };
*/

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
  
  // Show the current room



  function describeRoom(room) {
    //console.log(rooms[room].name);
    if (room){
    print(rooms[room].description);

    rooms[room].characters.forEach ((ch) => {
      print ("you see a " + characters[ch].name);
    });

    if (rooms[room].items.length > 0) {
      print("You see the following items in the room:");
      rooms[room].items.forEach((item) => {
        print(objects[item].name);
      });
    
    }

    //const currentRoom = rooms[room];
    const exits = Object.keys(rooms[room].exits).join(", ");
    
    print(`Exits: ${exits}`);
    print ("<br><br> What do you want to do now?");
   } // if room
  } //describeRoom

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
      describeRoom(currentRoom);
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
      showRoom();
    }
  }
  
  /*function objectIn (item, room) {
    if (rooms[room].items.indexOf(item) > -1) return true
    else return false;
  }
*/
 /* function isObject (noun) {
    if (objects.indexOf(noun) > -1) return true
    else return false;
  }
  */
/*
  function displayCharacters (room) {
    characters.forEach((ch) => {
        if (ch.room == room) {
          print('You see a ' + ch.name + ' in here.');
        }
      });
  }
  */
 /* function isRoom (noun) {
    if (rooms[noun] != undefined) return true
    else return false;
  }
  */
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
       describeRoom (currentRoom);
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
describeRoom (currentRoom);