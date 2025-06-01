"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
class UserModel {
    constructor() {
        this.tableName = 'Solicitudes';
        const client = new client_dynamodb_1.DynamoDBClient({});
        this.docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
    }
    async getAllSolicitudes() {
        const params = {
            TableName: this.tableName,
            ProjectionExpression: "ID, Titulo, Descripcion, Monto, Estado"
        };
        try {
            const result = await this.docClient.send(new lib_dynamodb_1.ScanCommand(params));
            return {
                items: result.Items,
                message: 'Solicitudes obtenidas exitosamente'
            };
        }
        catch (error) {
            console.error('Error al obtener solicitudes:', error);
            throw error;
        }
    }
}
exports.UserModel = UserModel;
