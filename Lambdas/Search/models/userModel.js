const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');

class UserModel {
    constructor() {
        this.tableName = 'Users';
        const client = new DynamoDBClient({});
        this.docClient = DynamoDBDocumentClient.from(client);
    }

    async getUser(userId) {
        const params = {
            TableName: this.tableName,
            Key: {
                userId: userId
            }
        };

        try {
            const { Item } = await this.docClient.send(new GetCommand(params));
            return Item;
        } catch (error) {
            console.error('Error al buscar usuario:', error);
            throw error;
        }
    }

    async getAllUsers() {
        const params = {
            TableName: this.tableName
        };

        try {
            const { Items } = await this.docClient.send(new ScanCommand(params));
            return Items;
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            throw error;
        }
    }
}

module.exports = UserModel;