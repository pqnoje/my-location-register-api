const jwt = require('jsonwebtoken')
const config = require('../config')

export class Config{
	constructor(){}

	static config(){
		return config
	}
}