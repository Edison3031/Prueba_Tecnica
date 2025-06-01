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
    async getSolicitudes(event) {
        try {
            const result = await this.userModel.getAllSolicitudes();
            return {
                statusCode: 200,
                body: JSON.stringify({
                    items: result.items,
                    message: result.message
                }),
            };
        }
        catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: error instanceof Error ? error.message : 'Error interno del servidor' }),
            };
        }
    }
}
exports.UserController = UserController;
