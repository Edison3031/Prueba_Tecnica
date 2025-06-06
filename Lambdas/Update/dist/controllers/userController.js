"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const userModel_1 = require("../models/userModel");
class UserController {
    constructor() {
        this.userModel = new userModel_1.UserModel();
        const client = new client_dynamodb_1.DynamoDBClient({});
        this.ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
    }
    async updateUser(event) {
        const { ID } = event.body;
        try {
            if (!ID) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Se requiere el ID' })
                };
            }
            if (!event.body) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'No se proporcionó el cuerpo de la solicitud' })
                };
            }
            const updateData = {
                Aprovacion1: event.body.Aprovacion1,
                Aprovacion2: event.body.Aprovacion2,
                Aprovacion3: event.body.Aprovacion3
            };
            const solicitudActualizada = await this.userModel.updateSolicitud(ID, updateData);
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Solicitud actualizada exitosamente',
                    solicitud: solicitudActualizada
                })
            };
        }
        catch (error) {
            console.error('Error en el controlador:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: error instanceof Error ? error.message : 'Error interno del servidor' })
            };
        }
    }
}
exports.UserController = UserController;
