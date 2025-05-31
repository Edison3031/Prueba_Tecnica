import { UserController } from './controllers/userController';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userController = new UserController();
    
    // Configurar CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    };

    try {
        const response = await userController.addUser(event);
        return {
            ...response,
            headers
        };
    } catch (error) {
        console.error('Error en el handler:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                message: 'Error interno del servidor'
            })
        };
    }
};