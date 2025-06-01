import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

export interface SolicitudData {
    ID: string;
    Titulo: string;
    Descripcion: string;
    Monto: number;
    Estado: string;
    Aprovacion1?: string;
    Aprovacion2?: string;
    Aprovacion3?: string;
    [key: string]: any;
}

export class UserModel {
    private tableName: string;
    private docClient: DynamoDBDocumentClient;
    constructor() {
        this.tableName = 'Solicitudes';
        const client = new DynamoDBClient({});
        this.docClient = DynamoDBDocumentClient.from(client);
    }

    async getAllSolicitudes(): Promise<{ items: SolicitudData[]; message: string }> {
        const params = {
            TableName: this.tableName,
            ProjectionExpression: "ID, Titulo, Descripcion, Monto, Estado"
        };

        try {
            const result = await this.docClient.send(new ScanCommand(params));
            return { 
                items: result.Items as SolicitudData[], 
                message: 'Solicitudes obtenidas exitosamente' 
            };
        } catch (error) {
            console.error('Error al obtener solicitudes:', error);
            throw error;
        }
    }
}