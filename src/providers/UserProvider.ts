const MongoClient = require('mongodb').MongoClient 
const ObjectId = require('mongodb').ObjectId
const config = require('../config.json')

import { UserModel } from '../model/user'
import { MailHelper } from '../helpers/mail'

export class UserProvider{
	
	constructor(){}

	public static createOne(user: UserModel){
		return new Promise((resolve, reject) => {
			MongoClient.connect(config.clusters.users, (err, db) => {
				if(err) 
					reject(err)

				db.collection("users")
				.insertOne(user, (err, result) => {
					db.close()
					if(err)
						reject(err)
						resolve(result)
				})
			})
		})
	}

	public static getAll(){
		return new Promise((resolve, reject) => {
			MongoClient.connect(config.clusters.users, (err, db) => {
				if(err){
					reject(err)
				}else{
					db.collection("users")
					.find({})
					.toArray((err, users) => {
						db.close()
						if(err)
							reject(err)
							resolve(users)
					})
				}
			})
		})
	}

	public static getOne(id: string){
		return new Promise((resolve, reject) => {
			MongoClient.connect(config.clusters.users, (err, db) => {
				if(err){
					reject(err)
				}else{
					db.collection("users")
					.findOne({
						"_id": ObjectId(id)
					}, (err, user) => {
						db.close()
						if(err) 
							reject(err)
							resolve(user)
					})	
				}
			})
		})
	}

	public static verifyPassword(id: string, password: string){

		return new Promise((resolve, reject) => {
			MongoClient.connect(config.clusters.users, (err, db) => {
				if(err){
					reject(err)
				}else{
					db.collection("users")
					.findOne({
						"_id": ObjectId(id)
					}, (err, user) => {
						if(err){
							db.close()
							reject(err)
						}else if(user.password === password){
							resolve()
						}else{
							db.close()
							reject({
								message: "invalid_password"
							})
						}
					})	
				}
			})
		})
	}

	public static verifyEmail(email: string){
		return new Promise((resolve, reject) => {
			MongoClient.connect(config.clusters.users, (err, db) => {
				if(err){
					reject(err)
				}else{
					db.collection("users")
					.findOne({
						"email": email
					}, (err, user) => {
						if(err){
							db.close()
							reject(err)	
						}else if(user){
							resolve()
						}else {
							db.close()
							reject({
								message: 'email_not_found'
							})
						}
					})	
				}
			})
		})
	}

	public static sendRecoverPasswordEmail(email: string, newPassword: string){
		return MailHelper.sendMail(
			email, 
			'Recover password', 
			`Your new password is: ${newPassword}`, 
			`<p>Your new password is: <b>${newPassword}</b></p>`)
	}

	public static changePasswordByEmail(email: string, newPassword: string){
		return new Promise((resolve, reject) => {
			MongoClient.connect(config.clusters.users, (err, db) => {
				if(err){
					reject(err)
				}else{
					db.collection("users")
					.findOne({email}, (err, user) => {
						if(err){
							db.close()
							reject(err)
						}else{
							user.password = newPassword
							db.collection("users")
							.update({email}, user, (err, user) => {
								db.close()
								if(err) 
									reject(err)
									resolve()
							})
						}
					})	
				}
			})
		})
	}

	public static changePassword(id: string, newPassword: string){
		let criteria = {"_id": ObjectId(id)}

		return new Promise((resolve, reject) => {
			MongoClient.connect(config.clusters.users, (err, db) => {
				if(err){
					reject(err)
				}else{
					db.collection("users")
					.findOne(criteria, (err, user) => {
						if(err){
							db.close()
							reject(err)
						}else{
							user.password = newPassword
							db.collection("users")
							.update(criteria, user, (err, user) => {
								db.close()
								if(err)
									reject(err)
									resolve("password_changed")
							})
						}
					})	
				}
			})
		})
	}
}