const bcrypt = require('bcrypt');

const saltRounds = 12;
const myPlaintextPassword = '🤗💩😎😬🥥🤷‍♂️';

const hashedPassword = bcrypt.hashSync(myPlaintextPassword, saltRounds);

console.log(myPlaintextPassword, hashedPassword);

// console.log(bcrypt.compareSync(myPlaintextPassword, hashedPassword));