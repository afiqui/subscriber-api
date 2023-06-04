import { PrismaService } from "../../services/prisma/prisma.service";

export class UserService {
    constructor(private prismaService: PrismaService) { }

    async getAllUsers() {
        const users = await this.prismaService.user.findMany();
        return users;
    }

    async getUserById(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        });
        return user;
    }

    async createUser(name: string, email: string, lastName: string, birthDate: Date, phone: string, address: string, city: string, state: string) {

        const user = await this.prismaService.user.create({
            data: {
                name,
                email,
                lastName,
                birthDate,
                phone,
                address,
                city,
                state,
                status: true
            }
        });
        return user;
    }

    updateProfilePicture(id: string, profilePicture: string) {
        return this.prismaService.user.update({
            where: {
                id
            },
            data: {
                profilePicture
            }
        });
    }

    async updateUser(id: string, name?: string, email?: string, lastName?: string, birthDate?: Date, phone?: string, address?: string, city?: string, state?: string) {
        const user = await this.prismaService.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                lastName,
                birthDate,
                phone,
                address,
                city,
                state
            }
        });
        return user;
    }

    async checkIfEmailExists(email: string): Promise<boolean> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        });
        return !!user;
    }

    async deleteUser(id: string) {
        return this.prismaService.user.delete({
            where: {
                id
            }
        });
    }
}