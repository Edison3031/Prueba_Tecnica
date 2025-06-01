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
    async updateSolicitud(ID, updateData) {
        const updateExpression = [];
        const expressionAttributeValues = {};
        const expressionAttributeNames = {};
        Object.entries(updateData).forEach(([key, value]) => {
            if (value !== undefined && ['Aprovacion1', 'Aprovacion2', 'Aprovacion3'].includes(key)) {
                const expressionKey = `#${key}`;
                const expressionValue = `:${key}`;
                updateExpression.push(`${expressionKey} = ${expressionValue}`);
                expressionAttributeValues[expressionValue] = value;
                expressionAttributeNames[expressionKey] = key;
            }
        });
        if (updateExpression.length === 0) {
            throw new Error('No se proporcionaron campos válidos para actualizar');
        }
        const params = {
            TableName: this.tableName,
            Key: { ID },
            UpdateExpression: `SET ${updateExpression.join(', ')}`,
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
            ReturnValues: "ALL_NEW"
        };
        const result = await this.docClient.send(new lib_dynamodb_1.UpdateCommand(params));
        return result.Attributes;
    }
}
exports.UserModel = UserModel;
