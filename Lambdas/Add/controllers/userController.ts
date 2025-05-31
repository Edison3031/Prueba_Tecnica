import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
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

    async addUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        try {
            if (!event.body) {
                throw new Error('No se proporcionó el cuerpo de la solicitud');
            }
            const book = JSON.parse(event.body);
            
            const newBook = {
                ...book,
            };
            await this.ddbDocClient.send(new PutCommand({
                TableName: "Solicitudes",
                Item: newBook,
            }));
    
            return {
                statusCode: 201,
                body: JSON.stringify(newBook),
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