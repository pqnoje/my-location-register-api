import { Router, Request, Response, NextFunction } from 'express'
import { UserProvider } from '../providers/UserProvider'
import { UserModel } from '../model/user'
import { TokenHelper } from '../helpers/token'
import { RandomHelper } from '../helpers/random'

export class UserRouter{
	public router: Router
	private userProvider: UserProvider

	constructor(){
		this.router = Router()
		this.init()
	}

	private createOne(req: Request, res: Response, next: NextFunction){
		let user = new UserModel()
		user.mapper(req.body)
		
		if(user.isValid()){
			TokenHelper.verify(req.headers['x-access-token'])
			.then(() => UserProvider.createOne(user))
			.then(status => res.send(status))
			.catch(err => {
				switch(err.code){
					case 11000:
						res.status(401).send('email_already_exists')
						break
					default:
						res.status(500).send()
						break
				}
			})
		}else{
			res.status(406).send('not_valid')
		}
	}

	private getAll(req: Request, res: Response, next: NextFunction){
		TokenHelper.verify(req.headers['x-access-token'])
		.then(() => UserProvider.getAll())
		.then(users => res.send(users))
		.catch(err => res.status(401).send(err))
	}

	private getOne(req: Request, res: Response, next: NextFunction){
		let id = req.params.id

		TokenHelper.verify(req.headers['x-access-token'])
		.then(() => UserProvider.getOne(id))
		.then(user => res.send(user))
		.catch(err => res.status(401).send(err))
	}

	private changePassword(req: Request, res: Response, next: NextFunction){
		let id = req.params.id
		let oldPassword = req.body.old_password
		let newPassword = req.body.new_password

		TokenHelper.verify(req.headers['x-access-token'])
		.then(() => UserProvider.verifyPassword(id, oldPassword))
		.then(() => UserProvider.changePassword(id, newPassword))
		.then(status => res.send(status))
		.catch(err => res.status(401).send(err))
	}

	private recoverPassword(req: Request, res: Response, next: NextFunction){
		let email = req.body.email
		let newPassword = RandomHelper.generatePassword(8)

		TokenHelper.verify(req.headers['x-access-token'])
		.then(() => UserProvider.verifyEmail(email))
		.then(() => UserProvider.changePasswordByEmail(email, newPassword))
		.then(() => UserProvider.sendRecoverPasswordEmail(email, newPassword))
		.then(status => res.send(status))
		.catch(err => res.status(401).send(err))
	}

	init(){
		this.router.get('/', this.getAll)
		this.router.get('/:id', this.getOne)
		this.router.post('/:id/change_password', this.changePassword)
		this.router.post('/recover_password', this.recoverPassword)
		this.router.post('/', this.createOne)
	}

}

const userRoutes = new UserRouter()
userRoutes.init()

export default userRoutes.router