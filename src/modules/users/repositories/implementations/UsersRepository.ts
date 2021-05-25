import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async findUserWithGamesById({
        user_id,
    }: IFindUserWithGamesDTO): Promise<User> {
        const user = await this.repository.findOne({
            where: { user_id },
            relations: ["games"],
        });

        // pode ser assim tbm
        // const user = await this.repository.findOne(user_id, {
        //     relations: ["games"],
        // });
        if (!user) {
            throw new Error("User does not exist!");
        }

        return user;
    }

    async findAllUsersOrderedByFirstName(): Promise<User[]> {
        return this.repository.query(
            "select * from users order by first_name asc"
        ); // Complete usando raw query
    }

    async findUserByFullName({
        first_name,
        last_name,
    }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
        return this.repository.query(); // Complete usando raw query
    }
}
