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
    },
    portrait1: {
        name: "portrait1",
        description: "It's a portrait of a young woman holding a parasol.",
        description2: "You now see that the woman is on a tightrope over an alligator",
        canPickUp: false,
        image: 'images/port1a.png'
      },
     portrait2: {
        name: "portrait2",
        description: "It's a portrait of an older woman holding a rose.",
        description2: "You now see that the woman is sitting on a tombstone",
        canPickUp: false,
        image: 'images/port2a.png'
      },
     portrait3: {
        name: "portrait3",
        description: "It's a portrait of a man in a bowler hat with crossed arms.",
        description2: "You now see that the man is on the shoulders of a second man who is on the shoulders of a third man and that they are sinking in quicksand",
        canPickUp: false,
        image: 'images/port3a.png'
      },
     portrait4: {
        name: "portrait4",
        description: "It's a portrait of an official,distinguished looking man holding a paper.",
        description2: "You now see that the man is standing on a barrel of dynamite ",
        canPickUp: false,
        image: 'images/port4a.png'
      },
      steak: {
        name: "steak",
        description:"a raw piece of steak",
        canPickUp: true,
        used: false,
        drop : function () {
          if (currentRoom == 'stretchingRoom' && _StretchCount > 0) {
            print ("the alligator grabs the steak and disappears. The girl waves and runs off the rope and disappears.");
            inventory.pop (this.name);
            this.used = true;
            objects['water'].canPickUp = true;
          }
        }
      },
      bottle: {
        name:"bottle",
        description:"an empty bottle",
        canPickUp: true,
      },
      water: {
        name:"water",
        description: "there's water in the portrait1",
        canPickUp: false,
        negativeMessage: "the alligator won't let you",
        used: false,
        take: function () {
          if (!inventory.contains ('bottle')) {
            return false;
          }
          objects['bottle'].description = "a bottle filled with water.";
          objects['rope'].canPickUp = true;
          return true;
        }
      },
      rope: {
        name:"rope",
        description: "a piece of rope",
        canPickUp: false,
        negativeMessage: "you can't get that with the alligator under it and the girl on it",
        used: false,
        throw: function () {
          print ("you throw the rope to the men in the quicksand. The one on the bottom grabs it and pulls them out.  They tip their hats and disappear one by one.  THe last one tosses a bottle into the room.");
          rooms['stretchingRoom'].items.push ('bottle');
        }
      }

  };
  