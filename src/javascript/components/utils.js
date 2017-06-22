export default {
    rndRange: () => {
        return Math.floor(Math.random() * 10 % 5) / 10;
    },

    add: (a,b) => {
        return a+b;
    },

    sub: (a,b) => {
        return a-b;
    },

    plusMinus: (base, op) => {
        return parseInt(Math.random() * 10) % 2 ? add(base, op) : sub(base, op);
    },

    randTime: () => {
        return (
            new Date(Date.now() - (Math.floor(Math.random() * 3000)))
        ).toString().slice(16,24);
    },

    prepNumbers: (obj) => {
        for (let prop in obj) {
            if (typeof obj[prop] === 'number') {
                obj[prop] = obj[prop].toFixed(2);
            }
        }
        return obj;
    },

    lt: (a,b) => {
        return a < b;
    },

    gt: (a,b) => {
        return a > b;
    },

}