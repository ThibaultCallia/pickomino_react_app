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