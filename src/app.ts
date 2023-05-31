import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { rateLimit, RateLimitRequestHandler } from "express-rate-limit";
import categoryRouter from "./features/categories/category.router";
import authRouter from "./features/users/auth/auth.router";
import userRouter from "./features/users/user.router";
import videoRouter from "./features/videos/video.router";
import roleRouter from "./features/roles/role.router";
import permissionRouter from "./features/permissions/permission.router";
import AppError from "./shared/app-error";
import errorMiddleware from "./middlewares/errors";
import { ROUTE_PREFIX } from "./shared/constants";
import i18n from "./configs/il8n/generated";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./configs/swagger";
const app: Application = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(i18n.init);

app.use(express.json());

// request security
app.use(helmet());

// Limit requests from same API
const limiter: RateLimitRequestHandler = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/v1", limiter);

// Routing
app.use(`${ROUTE_PREFIX}/auth`, authRouter);
app.use(`${ROUTE_PREFIX}/roles`, roleRouter);
app.use(`${ROUTE_PREFIX}/permissions`, permissionRouter);
app.use(`${ROUTE_PREFIX}/categories`, categoryRouter);
app.use(`${ROUTE_PREFIX}/videos`, videoRouter);
app.use(`${ROUTE_PREFIX}/users`, userRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  return next(new AppError(req.__("not-found"), 404));
});

app.use(errorMiddleware);

export default app;
