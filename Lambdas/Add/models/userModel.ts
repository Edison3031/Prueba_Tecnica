import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

export interface UserData {
    userId: string;
    [key: string]: any;
}

export class UserModel {
    private tableName: string;
    private docClient: DynamoDBDocumentClient;
    constructor() {
        this.tableName = 'Users';
        const client = new DynamoDBClient({});
        this.docClient = DynamoDBDocumentClient.from(client);
    }

    async createUser(userData: UserData): Promise<{ success: boolean; message: string }> {
        const params = {
            TableName: this.tableName,
            Item: userData
        };

        try {
            await this.docClient.send(new PutCommand(params));
            return { success: true, message: 'Usuario creado exitosamente' };
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }
}