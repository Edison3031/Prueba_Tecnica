import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

export interface SolicitudData {
    ID: string;
    Aprovacion1?: boolean;
    Aprovacion2?: boolean;
    Aprovacion3?: boolean;
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

    async updateSolicitud(ID: string, updateData: Partial<SolicitudData>): Promise<any> {
        const updateExpression: string[] = [];
        const expressionAttributeValues: Record<string, any> = {};
        const expressionAttributeNames: Record<string, string> = {};

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
            UpdateExpression: `SET ${(updateExpression as string[]).join(', ')}`,
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
            ReturnValues: "ALL_NEW" as const
        };

        const result = await this.docClient.send(new UpdateCommand(params));
        return result.Attributes;
    }
}