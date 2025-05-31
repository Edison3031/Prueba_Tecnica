const UserModel = require('../models/userModel');

class UserController {
    constructor() {
        this.userModel = new UserModel();
    }

    async updateUser(event) {
        try {
            const userId = event.pathParameters?.userId;
            const userData = JSON.parse(event.body);

            if (!userId) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        message: 'Se requiere el userId'
                    })
                };
            }

            // Validar que haya datos para actualizar
            if (Object.keys(userData).length === 0) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        message: 'No se proporcionaron datos para actualizar'
                    })
                };
            }

            const updatedUser = await this.userModel.updateUser(userId, userData);

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Usuario actualizado exitosamente',
                    user: updatedUser
                })
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