
export interface Provider{
	createOne(object: Object) : Promise<Object>
	getAll(): Promise<Array<Object>>
	getOne(id: string): Promise<Object>
}