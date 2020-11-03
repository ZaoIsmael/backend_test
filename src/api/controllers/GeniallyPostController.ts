import { Request, Response } from "express";
import httpStatus from "http-status";
import CreateGeniallyService from "../../contexts/core/genially/application/CreateGeniallyService";
import GeniallyDescriptionInvalid from "../../contexts/core/genially/domain/GeniallyDescriptionInvalid";
import GeniallyNameInvalid from "../../contexts/core/genially/domain/GeniallyNameInvalid";

export class GeniallyPostController {
    constructor(private service: CreateGeniallyService) {
        this.service = service;
    }

    async execute(req: Request, res: Response) {
        const id: string = req.params.id;
        const name: string = req.body.name;
        const description: string = req.body.description;

        try {
            await this.service.execute({id, name, description});
        } catch (error) {
            if (error instanceof GeniallyDescriptionInvalid || error  instanceof GeniallyNameInvalid) {
                res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
            } else {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
            }
        }

        res.status(httpStatus.CREATED).send();
    }
}
