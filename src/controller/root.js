import { authController } from "./auth.js";

export const rootController = (app) => {
    app.get('/', (_request, respond) => {
        respond.status(200).json({
            message: 'Welcome to Project Support',
        });
    });

    authController(app)
}