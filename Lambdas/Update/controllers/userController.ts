import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
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

    async updateUser(event: any): Promise<APIGatewayProxyResult> {
        const {ID} = event.body;
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
            } ;
            const solicitudActualizada = await this.userModel.updateSolicitud(ID, updateData);

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Solicitud actualizada exitosamente',
                    solicitud: solicitudActualizada
                })
            };
        } catch (error) {
            console.error('Error en el controlador:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: error instanceof Error ? error.message : 'Error interno del servidor' })
            };
        }
    }
}