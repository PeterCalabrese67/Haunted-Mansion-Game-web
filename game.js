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
    }
  };

  // Define the game's characters
const characters = [
    { id: 0, name: "poltergeist", description: "A mischievous poltergeist.", room: 2 },
    { id: 1, name: "bride", description: "A ghostly bride.", room: 9 },
    { id: 2, name: "caretaker", description: "A grumpy caretaker.", room: 3 },
    { id: 3, name: "ghost", description: "A friendly but forgetful ghost.", room: 5 }
  ];
  
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
    if (rooms[room].items.length > 0) {
      print("You see the following items in the room:");
      rooms[room].items.forEach((item) => {
        print(objects[item].name);
      });
    
    }

    const currentRoom = rooms[room];
   //const exits = [...currentRoom.exits.keys()].join(", ");
   const exits = Object.keys(currentRoom.exits).join(", ");
    //const exits = [...rooms[room].exits.keys()].join(", ");
    print(`Exits: ${exits}`);
    print ("<br><br> What do you want to do now?");
   } // if room
  } //describeRoom

  function processCommand(command) {
    const parts = command.split(" ");
    const action = parts[0];
    const target = parts[1];
  
    if (!action) {
      printResponse("I don't understand what you want me to do.");
    } else if (action === "look") {
        if (isRoom (target)) {
            describeRoom(currentRoom);
        }
        else {
            look (target);
        }
    } else if (action === "go") {
       go (target);
      /*if (newRoom === null) {
        printResponse("You can't go that way.");
      } else {
        currentRoom = newRoom;
        describeRoom(currentRoom);
      }*/
    } else if (action == 'take' || action == 'get') {
        take (target);
    }
    else if (action == 'inv' || action == 'inventory') {
        print('You are carrying the following:<br>');
        inventory.forEach((item) => {
            print(item.name);
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
      console.log("You can't go that way.");
    }
  }
  
  // Look at an object or the room
  function look(noun) {
    if (noun) {
      const item = objects[noun];
      if (item) {
        print(item.description + "<br>");
      } else {
        print("You don't see that here.<br>");
      }
    } else {
      showRoom();
    }
  }
  
  function objectIn (item, room) {
    if (rooms[room].items.indexOf(item) > -1) return true
    else return false;
  }

  function isObject (noun) {
    if (objects.indexOf(noun) > -1) return true
    else return false;
  }

  function isRoom (noun) {
    if (rooms[noun] != undefined) return true
    else return false;
  }
  // Take an object
  function take(noun) {
    if (noun) {
      const item = objects[noun];
      if (!objectIn (noun,currentRoom)) {
        printResponse (" I don't see a " + noun + " here.");
        return;
      }

      if (item && item.canPickUp) {
        inventory.push(item);
        const index = rooms[currentRoom].items.indexOf(item.name);
       // rooms[currentRoom].items = rooms[currentRoom].items.splice (index,1);
       delete rooms[currentRoom].items[index];
       print ("ok, you pick up the " + noun + "<br>");
       describeRoom (currentRoom);
      }
    }
}

describeRoom (currentRoom);