const awesomeFunction = (req, res, next) => {
    res.json("Awesome person");
};
const personIKnow = (req, res, next) => {
    res.json("Yazvinskaya Anastasia");
};

module.exports = { awesomeFunction, personIKnow };