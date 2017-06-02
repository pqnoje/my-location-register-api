const nodemailer = require('nodemailer')


export class MailHelper {
	constructor(){}

	public static sendMail(to: string, subject: string, text: string, html: string) {
		return new Promise((resolve, reject) => {
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'user@gmail.com',
					pass: 'p4sswOrd!'
				}
			})

			transporter.sendMail({
				from: 'user@gmail.com',
				to,
				subject,
				text,
				html
			}, (err, info) => {
				if(err)
					reject(err)
					resolve(info)
			})
		})
	}
}
