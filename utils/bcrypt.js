const bcryptjs = require('bcryptjs');

const encrypt = plain => {
    try {
        const hash = bcryptjs.hashSync(plain, 10);
        return hash;
    } catch (error) {
        console.log(error);
    }
}

const decrypt = (plain, hash) => {
    try {
        const compare = bcryptjs.compareSync(plain, hash);
        return compare;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    encrypt,
    decrypt
}