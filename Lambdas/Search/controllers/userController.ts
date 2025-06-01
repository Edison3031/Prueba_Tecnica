import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { UserModel } from '../models/userModel';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export class UserController {
    private userModel: UserModel;
    private ddbDocClient: DynamoDBDocumentClient;
    constructor() {
        this.userModel = new UserModel();
        const client = new DynamoDBClient({});
        this.ddbDocClient = DynamoDBDocumentClient.from(client);
    }

    async getSolicitudes(event: any): Promise<APIGatewayProxyResult> {
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