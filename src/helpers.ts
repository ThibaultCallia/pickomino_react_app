import { DieInterface } from "./components";
export const createUniqueNameArray = (numOfNames: number) => {
    const adjectives = ['Celestial',
    'Galactic',
    'Nebulous',
    'Interstellar',
    'Astral',
    'Extraterrestrial',
    'Cosmic',
    'Starry',
    'Lunar',
    'Solar',
    'Swashbuckling',
    'Buccaneering',
    'Seafaring',
    'Plundering',
    'Marauding',
    'Corsair',
    'Nautical',
    'Treasure-laden',
    'Grog-swigging',
    'Peg-legged'
];
    const nouns = ['Galaxy',
    'Nebula',
    'Spaceship',
    'Astronaut',
    'Black hole',
    'Comet',
    'Meteor',
    'Constellation',
    'Satellite',
    'Space station',
    'Buccaneer',
    'Cutlass',
    'Galleon',
    'Jolly Roger',
    'Plunder',
    'Treasure chest',
    'Skull and crossbones',
    'Parrot',
    'Privateer',
    'Eye patch'
];
const uniqueNames: Set<string> = new Set();
 
while (uniqueNames.size < numOfNames) {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const name = `${adjective} ${noun}`;

    uniqueNames.add(name);
}
return Array.from(uniqueNames);
};

export const rollDice = (numOfDice: number) => {
    let result = [];
    let faces = ["1", "2", "3", "4", "5", "R"];
    for (let i = 0; i < numOfDice; i++) {
        const randomNum = Math.floor(Math.random() * 6) + 1;
        result.push({
            value: randomNum,
            face: faces[randomNum - 1],
            selected: false
        });
    }
    return result;
};

export const canSelect = (selectedDice : DieInterface[], currentDiceRoll: DieInterface[]) =>{
    if(selectedDice.length === 0){
        return true;
    }
    const selectedDie = currentDiceRoll.find(die => die.selected)?.face;
    if(selectedDice.every(die => die.face !== selectedDie)){
        return true;
    }
    return false;
}

export const hasSelectableDice = (selectedDice: DieInterface[], currentRoll: DieInterface[]): boolean => {
    const facesInArr1 = new Set(selectedDice.map(die => die.face));
    return currentRoll.some(die => !facesInArr1.has(die.face));
  }

  export const totalSelectedDice = (selectedDice: DieInterface[]) => {
    return selectedDice.reduce((acc, die) => acc + (die.value === 6 ? 5 : die.value), 0);
  }

  export const includesRocket = (selectedDice: DieInterface[]) => {
    return selectedDice.some(die => die.face === "R");
  }