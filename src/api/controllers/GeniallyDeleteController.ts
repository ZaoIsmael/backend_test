import { Request, Response } from "express";
import httpStatus from "http-status";
import DeleteGeniallyService from "../../contexts/core/genially/application/DeleteGeniallyService";
import GeniallyNotExist from "../../contexts/core/genially/domain/GeniallyNotExist";

export class GeniallyDeleteController {
    constructor(private service: DeleteGeniallyService) {
        this.service = service;
    }

    async execute(req: Request, res: Response) {
        const id: string = req.params.id;

        try {
            await this.service.execute({id});
        } catch (error) {
            if (error instanceof GeniallyNotExist) {
                res.status(httpStatus.NOT_FOUND).send(error.message);
            } else {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
            }
        }

        res.status(httpStatus.OK).send();
    }
}
