import { Json } from "sequelize/types/utils";

export class CreateMissionDto {
    title: Json;
    description: Json;
    platformID: number;
    stars: number;
    expirationDate: Date;
    status: string;
    type: string;
    actions: Json;
    constructor(
        title: Json,
        description: Json,
        platformID: number,
        stars: number,
        expirationDate: Date,
        status: string,
        type: string,
        actions: Json
    ) {
        this.title = title;
        this.description = description;
        this.platformID = platformID;
        this.stars = stars;
        this.expirationDate = expirationDate;
        this.status = status;
        this.type = type;
        this.actions = actions;
    }
}