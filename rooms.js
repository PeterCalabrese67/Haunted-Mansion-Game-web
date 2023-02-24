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
}

const rooms = {
    foyer: new Room ({name: 'foyer',
                  description: "You are standing in the foyer of the Haunted Mansion. The room is dimly lit and full of cobwebs. A grand staircase leads up to the second floor, and a hallway leads to the north.",
                  items: ["candlestick"],
                  characters: ['ghost'],
                  exits: {
                    north: "hallway"
                  }}),
    hallway: new Room ({
                    description: "You are in a long hallway. The walls are lined with portraits of stern-looking men and women. There is a door to the south, and another door to the north.",
                    exits: {
                      south: "foyer",
                      north: "library"
                    },
                    items: []
                  }),

    library: new Room ({
      description: "You are in the library. The room is musty and smells of old books. There are rows of bookshelves lining the walls, and a large desk in the center of the room. On the desk, you see a thick, leather-bound book with strange symbols on the cover.",
      items: ["book"],
      exits: {
        south: "hallway"
      }
    }),
}