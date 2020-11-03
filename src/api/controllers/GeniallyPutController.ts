import { Request, Response } from "express";
import httpStatus from "http-status";
import GeniallyNameInvalid from "../../contexts/core/genially/domain/GeniallyNameInvalid";
import RenameGeniallyService from "../../contexts/core/genially/application/RenameGeniallyService";
import GeniallyNotExist from "../../contexts/core/genially/domain/GeniallyNotExist";

export class GeniallyPutController {
    constructor(private service: RenameGeniallyService) {
        this.service = service;
    }

    async execute(req: Request, res: Response) {
        const id: string = req.params.id;
        const name: string = req.body.name;

        try {
            await this.service.execute({id, name});
        } catch (error) {
            if (error instanceof GeniallyNotExist) {
                res.status(httpStatus.NOT_FOUND).send(error.message);
            }else if (error instanceof GeniallyNameInvalid) {
                res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
            } else {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
            }
        }

        res.status(httpStatus.OK).send();
    }
}
