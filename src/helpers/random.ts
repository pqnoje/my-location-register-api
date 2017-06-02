var generator = require('generate-password')

export class RandomHelper {
	constructor(){}

	public static generatePassword(length: number) {
		return generator.generate({
			length,
			numbers: true,
			symbols: true,
			uppercase: false,
			excludeSimilarCharacters: true
		})
	}
}