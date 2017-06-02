import { Router, Request, Response, NextFunction } from 'express'

export class GeoLocationRouter{
	public router: Router

	constructor(){
		this.router = Router() 
		this.init()
	}
	

	init(){
		
	}
}

const geoLocationRouter = new GeoLocationRouter() 
geoLocationRouter.init() 

export default geoLocationRouter.router 
