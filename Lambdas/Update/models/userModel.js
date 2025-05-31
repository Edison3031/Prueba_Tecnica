const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, UpdateCommand } = require('@aws-sdk/lib-dynamodb');

class UserModel {
    constructor() {
        this.tableName = 'Users';
        const client = new DynamoDBClient({});
        this.docClient = DynamoDBDocumentClient.from(client);
    }

    async updateUser(userId, userData) {
        // Crear la expresión de actualización dinámicamente
        const updateExpression = [];
        const expressionAttributeValues = {};
        const expressionAttributeNames = {};

        Object.keys(userData).forEach((key) => {
            if (key !== 'userId') { // No actualizamos la clave primaria
                updateExpression.push(`#${key} = :${key}`);
                expressionAttributeValues[`:${key}`] = userData[key];
                expressionAttributeNames[`#${key}`] = key;
            }
        });

        const params = {
            TableName: this.tableName,
            Key: {
                userId: userId
            },
            UpdateExpression: `SET ${updateExpression.join(', ')}`,
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
            ReturnValues: 'ALL_NEW'
        };

        try {
            const { Attributes } = await this.docClient.send(new UpdateCommand(params));
            return Attributes;
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw error;
        }
    }
}

module.exports = UserModel;