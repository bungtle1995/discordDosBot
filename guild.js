const { Schema, model } = require('mongoose');

const Guild = Schema({
	id: String
});

module.exports = model('Guild', Guild);