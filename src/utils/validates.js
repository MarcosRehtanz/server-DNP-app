

class Validates {
	someNull() {
		return Object.values(arguments).some(value => !value);
	}
}

module.exports = new Validates();