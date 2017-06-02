import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core'

@Injectable()
export class UserModel {
	public email: string
	public name: string
	public password: string
	public confirmPassword: string
	public phone: string
	public company: number

	constructor(){}

	mapper(user: UserModel){
		this.company = Number(user.company)
		this.email = user.email
		this.confirmPassword = user.confirmPassword
		this.password = user.password
		this.name = user.name
		this.phone = user.phone
	}

	isValidPassword(){
		return this.password !== undefined 
		&& this.confirmPassword !== undefined 
		&& this.password !== "" 
		&& this.confirmPassword !== "" 		
		&& this.password === this.confirmPassword
		&& this.password.match(/[0-9]/g) !== null
		&& this.password.match(/[a-zA-Z]/g) !== null
		&& this.password.match(/[^A-Za-z0-9]/g) !== null
		&& this.password.length >= 6
	}

	isValidName(){
		return this.name !== undefined 
		&& this.name !== "" 
		&& this.name.match(/\w/g) !== null 
		&& this.name.match(/\w/g).length >= 2
		&& this.name.match(/\s{2,}/g) === null
		&& this.name.match(/\d/g) === null
		&& this.name.match(/^\s/g) === null
		&& this.name.match(/[^A-Za-z0-9\s\.\-\']/g) === null
	}

	isValidPhone(){
		return this.phone !== undefined 
		&& this.phone !== ""
		&& this.phone.match(/\d/g) !== null 
		&& this.phone.match(/\d/g).length >= 10
		&& this.phone.match(/\s{2,}/g) === null
		&& this.phone.match(/^\s/g) === null
		&& this.phone.match(/[^A-Za-z0-9\s]/g) === null
	}

	isValidCompany(){
		return this.company !== undefined 
		&& this.company > 0
	}

	isValid(){
		return this.isValidCompany()
		&& this.isValidName()
		&& this.isValidPassword()
		&& this.isValidPhone()
	}
}