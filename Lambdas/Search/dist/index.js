"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const userController_1 = require("./controllers/userController");
const handler = async (event) => {
    const userController = new userController_1.UserController();
    // Configurar CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    };
    try {
        const response = await userController.getSolicitudes(event);
        return {
            ...response,
            headers
        };
    }
    catch (error) {
        console.error('Error en el handler:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                message: 'Error interno del servidor'
            })
        };
    }
};
exports.handler = handler;
