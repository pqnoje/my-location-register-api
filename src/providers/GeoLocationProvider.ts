const MongoClient = require('mongodb').MongoClient 
const config = require('../config.json')

import { MailHelper } from '../helpers/mail'
import { Provider } from './interfaces/IProvider'

export class GeoLocationProvider implements Provider{
	
	constructor(){}

	public createOne(geoLocation: Object): Promise<Object>{
		return new Promise((resolve, reject) => {
			resolve(Object)
		})
	}

	public getAll(): Promise<Array<Object>>{
		return new Promise((resolve, reject) => {
			resolve()	
		})
	}

	public getOne(id: string): Promise<Object>{
		return new Promise((resolve, reject) => {
			resolve()
		})
	}

	
}