import { Router, Request, Response, NextFunction } from 'express'
import { UserModel } from '../model/user'
import { TokenHelper } from '../helpers/token'
import { AuthProvider } from '../providers/AuthProvider'

export class AuthRouter{
	public router: Router

	constructor(){
		this.router = Router() 
		this.init()
	}

	private getToken(req: Request, res: Response, next: NextFunction){
		res.send(TokenHelper.generatePublic())
	}

	private auth(req: Request, res: Response, next: NextFunction){
		let user = new UserModel()
		user.email = req.body.email
		user.password = req.body.password

		TokenHelper.verify(req.headers['x-access-token'])
		.then(() => AuthProvider.authUser(user))
		.then(token => res.send(token))
		.catch(err => res.status(401).send(err))
	}

	init(){
		this.router.get('/', this.getToken) 
		this.router.post('/', this.auth)
	}
}

const authRoutes = new AuthRouter() 
authRoutes.init() 

export default authRoutes.router 
