import bodyParser from "body-parser";
import compression from "compression";
import express, {Request, Response} from "express";
import lusca from "lusca";

import {MongoFactory} from "../contexts/shared/infrastructure/MongoFactory";

// Controllers (route handlers)
import * as healthController from "./controllers/health";
import {GeniallyPostController} from "./controllers/GeniallyPostController";
import CreateGeniallyService from "../contexts/core/genially/application/CreateGeniallyService";
import InMemoryGeniallyRepository from "../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import {GeniallyDeleteController} from "./controllers/GeniallyDeleteController";
import DeleteGeniallyService from "../contexts/core/genially/application/DeleteGeniallyService";
import {GeniallyPutController} from "./controllers/GeniallyPutController";
import RenameGeniallyService from "../contexts/core/genially/application/RenameGeniallyService";
import MongoGeniallyRepository from "../contexts/core/genially/infrastructure/MongoGeniallyRepository";
import EventBus from "../contexts/shared/infrastructure/EventBus";
import {GeniallyCounterIncrementHandler} from "../contexts/core/geniallyCounter/application/GeniallyCounterIncrementHandler";
import UpdateGeniallyCounterService from "../contexts/core/geniallyCounter/application/UpdateGeniallyCounterService";
import MongoGeniallyCounterRepository
    from "../contexts/core/geniallyCounter/infrastructure/MongoGeniallyCounterRepository";

// Create Express server
const app = express();

const mongoConnection = MongoFactory.getClient();

const repository = new InMemoryGeniallyRepository();
const mongoGeniallyRepository = new MongoGeniallyRepository(mongoConnection);
const mongoGeniallyCounterRepository = new MongoGeniallyCounterRepository(mongoConnection);
const service = new UpdateGeniallyCounterService(mongoGeniallyCounterRepository);
const subscriber = new GeniallyCounterIncrementHandler(service);
const bus = new EventBus();

bus.addSubscriber([subscriber]);

const createGeniallyService = new CreateGeniallyService(mongoGeniallyRepository, bus);
const deleteGeniallyService = new DeleteGeniallyService(repository);
const renameGeniallyService = new RenameGeniallyService(repository);
const geniallyPostController = new GeniallyPostController(createGeniallyService);
const geniallyDeleteController = new GeniallyDeleteController(deleteGeniallyService);
const geniallyPutController = new GeniallyPutController(renameGeniallyService);

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// Primary app routes
app.get("/", healthController.check);
app.post("/genially/:id", (req: Request, res: Response) => geniallyPostController.execute(req, res));
app.delete("/genially/:id", (req: Request, res: Response) => geniallyDeleteController.execute(req, res));
app.put("/genially/:id", (req: Request, res: Response) => geniallyPutController.execute(req, res));

export default app;
