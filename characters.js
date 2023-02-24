  // Define the game's characters
  
  class Character {
    id;
    name = '';
    description = '';
    room  = '';
    constructor (x) {
        this.id = x.id;
        this.name = x.name;
        this.description = x.description;
        this.room = x.room;
    }

  }
  
  const characters = {
    poltergeist: new Character ({ id: 0, name: "poltergeist", description: "A mischievous poltergeist.", room: 'hallway' }),
    bride: new Character ({ id: 1, name: "bride", description: "A ghostly bride.", room: 'attic' }),
    caretaker: new Character({ id: 2, name: "caretaker", description: "A grumpy caretaker.", room: 'cemetary gate' }),
    ghost : new Character ({ id: 3, name: "ghost", description: "A friendly but forgetful ghost.", room: 'foyer' })
  };
  