import { PrismaService } from "../../services/prisma/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

export class UserControllerFactory {
    static create() {
        const prismaService = new PrismaService();
        const userService = new UserService(prismaService);
        return new UserController(userService);
    }
}