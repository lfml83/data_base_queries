import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";
import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
    private repository: Repository<Game>;

    constructor() {
        this.repository = getRepository(Game);
    }

    async findByTitleContaining(param: string): Promise<Game[]> {
        // Complete usando query builder
        const title = param.toLowerCase();
        const user = await this.repository
            .createQueryBuilder("game")
            .where(`LOWER(game.title) ILIKE :title`, {
                title: `%${title}%`,
            })
            .getMany();

        return user;
    }
    async countAllGames(): Promise<[{ count: string }]> {
        const count = await this.repository.query("SELECT count(*) FROM games"); // Complete usando raw query

        return count;
    }

    async findUsersByGameId(id: string): Promise<User[]> {
        // Complete usando query builder
        const user = await getRepository(User)
            .createQueryBuilder("user")
            .innerJoin("user.games", "usegames")
            .where("usegames.id = :id", { id })
            .getMany();

        return user;
    }
}
