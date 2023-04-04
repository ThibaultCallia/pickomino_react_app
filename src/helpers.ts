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
            face: faces[randomNum - 1]
        });
    }
    return result;
};