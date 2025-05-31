const UserModel = require('../models/userModel');

class UserController {
    constructor() {
        this.userModel = new UserModel();
    }

    async getUser(event) {
        try {
            const userId = event.pathParameters?.userId;

            if (!userId) {
                // Si no hay userId, retornar todos los usuarios
                const users = await this.userModel.getAllUsers();
                return {
                    statusCode: 200,
                    body: JSON.stringify(users)
                };
            }

            const user = await this.userModel.getUser(userId);

            if (!user) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({
                        message: 'Usuario no encontrado'
                    })
                };
            }

            return {
                statusCode: 200,
                body: JSON.stringify(user)
            };
        } catch (error) {
            console.error('Error en el controlador:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Error interno del servidor'
                })
            };
        }
    }
}

module.exports = UserController;