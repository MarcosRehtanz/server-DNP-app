

class Validates {
    someNull() {
        return Object.values(arguments).some(value => !Boolean(value))
    }
}

module.exports = new Validates();