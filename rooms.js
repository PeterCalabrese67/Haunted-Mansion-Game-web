class Room  {
    name =  "";
    description =  "";
    items =  [];
    exits =  {};
    characters = [];
    constructor (x) {
       this.name = x.name;
       this.description = x.description;
       if (x.items) this.items = x.items;
       if (x.exits) this.exits = x.exits;
       if (x.characters) this.characters = x.characters;
       
    };

    containsItem (item) {
        if (this.items.indexOf (item)> -1) return true
        else return false;
   };

   describe () {
    let output = this.description + "<br>";

    this.characters.forEach ((ch) => {
      output +="you see a " + ch + "<br>";
    });

    if (this.items.length > 0) {
      output += "You see the following items in the room:<br>";
      this.items.forEach((item) => {
        output += item + "<br>";
      });
    
    }
    const exits = Object.keys(this.exits).join(", ");
    
    output += (`<br>Exits: ${exits}`);
    return output;
   }
}

const rooms = {
    foyer: new Room ({
                  name: 'foyer',
                  description: "You are standing in the foyer of the Haunted Mansion. The room is dimly lit and full of cobwebs. A picture of a young man hangs over a fireplace. A door leads to the west.",
                  items: ["candlestick"],
                  characters: ['ghost'],
                  exits: {
                    north: "hallway",
                    west: "stretchingRoom"
                  }}),
    hallway: new Room ({
                    name: "hallway",
                    description: "You are in a long hallway. The walls are lined with portraits of stern-looking men and women. There is a door to the south, and another door to the north.",
                    exits: {
                      south: "foyer",
                      north: "library"
                    },
                    items: [],
                    characters: ['poltergeist']
                  }),
    library: new Room ({
                    name: "library",
                    description: "You are in the library. The room is musty and smells of old books. There are rows of bookshelves lining the walls, and a large desk in the center of the room. On the desk, you see a thick, leather-bound book with strange symbols on the cover.",
                    items: ["book"],
                    characters: [],
                    exits: {
                      south: "hallway",
                      north: "conservatory"
                    }}),
    conservatory: new Room ({
                    name: "conservatory",
                    description: "You are in the conservatory. There is a coffin in the middle of the room and dead flowers all around.",
                    items: [],
                    characters: [],
                    exits: {
                       south: "library" 
                    }
                  }),

    stretchingRoom: new Room ({
                    name: 'stretchingRoom',
                    description: "You are in a octogon shaped room with four pictures of nicely dressed men and women high on each wall. You see no windows and no doors.",
                    items: ["portrait1","portrait2", "portrait3","portrait4"],
                    
                    characters: [],
                    exits: {
                      
                    }}),
                

    
    
};