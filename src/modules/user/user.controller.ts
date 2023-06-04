import express, { Request, Response, Router } from "express";
import { UserService } from "./user.service";

export class UserController{
    constructor(private userService: UserService){}

    router(): Router{
        const router = express.Router();
        router.get('/', this.getAllUsers.bind(this));
        router.get('/:id', this.getUserById.bind(this));
        router.post('/', this.createUser.bind(this));
        router.put('/:id/profile-picture', this.updateProfilePicture.bind(this));
        router.put('/:id', this.updateUser.bind(this));
        router.delete('/:id', this.deleteUser.bind(this));        
        return router;
    }

    private validateId(id: string): boolean{
        if (!id) {
            return false;
        }
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return false;
        }
        return true;
    }

    async getAllUsers(_req: Request, res: Response){
        const users = await this.userService.getAllUsers();
        return res.json(users);
    }

    async getUserById(req: Request, res: Response){
        const { id } = req.params;
        if (!this.validateId(id)) {
            return res.status(400).json({ message: 'Id is not valid' });
        }
        const user = await this.userService.getUserById(id);
        return res.json(user);
    }

    async createUser(req: Request, res: Response){
        const { name, email, lastName, birthDate, phone, address, city, state } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }


        const userAlreadyExists = await this.userService.checkIfEmailExists(email);
        if (userAlreadyExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const user = await this.userService.createUser(name, email, lastName, new Date(birthDate), phone, address, city, state);
        return res.json(user);
    }

    async updateProfilePicture(req: Request, res: Response){
        const { id } = req.params;
        const { profilePicture } = req.body;
        if (!this.validateId(id)) {
            return res.status(400).json({ message: 'Id is not valid' });
        }
        if (!profilePicture) {
            return res.status(400).json({ message: 'Profile picture is required' });
        }
        const user = await this.userService.updateProfilePicture(id, profilePicture);
        return res.json(user);
    }

    async updateUser(req: Request, res: Response){
        const { id } = req.params;
        const { name, email, lastName, birthDate, phone, address, city, state } = req.body;
        if (!this.validateId(id)) {
            return res.status(400).json({ message: 'Id is not valid' });
        }
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }
        const user = await this.userService.updateUser(id, name, email, lastName, new Date(birthDate), phone, address, city, state);
        return res.json(user);
    }

    async deleteUser(req: Request, res: Response){
        const { id } = req.params;
        if (!this.validateId(id)) {
            return res.status(400).json({ message: 'Id is not valid' });
        }
        const user = await this.userService.deleteUser(id);
        return res.json(user);
    }
}