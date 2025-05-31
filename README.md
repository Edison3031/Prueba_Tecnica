# AWS Lambda DynamoDB CRUD Operations

Este proyecto implementa operaciones CRUD (Create, Read, Update) utilizando AWS Lambda y DynamoDB, siguiendo una arquitectura MVC. Cada operación está implementada como una función Lambda independiente.

## Estructura del Proyecto

```
├── Lambdas/
│   ├── Add/                  # Lambda función para crear usuarios
│   │   ├── controllers/
│   │   │   └── userController.js
│   │   ├── models/
│   │   │   └── userModel.js
│   │   ├── index.js
│   │   ├── package.json
│   │   └── build.ps1
│   ├── Search/               # Lambda función para buscar usuarios
│   │   ├── controllers/
│   │   │   └── userController.js
│   │   ├── models/
│   │   │   └── userModel.js
│   │   ├── index.js
│   │   ├── package.json
│   │   └── build.ps1
│   └── Update/               # Lambda función para actualizar usuarios
│       ├── controllers/
│       │   └── userController.js
│       ├── models/
│       │   └── userModel.js
│       ├── index.js
│       ├── package.json
│       └── build.ps1
```

## Funciones Lambda

### Add Lambda
- **Propósito**: Crear nuevos usuarios en DynamoDB
- **Características**:
  - Validación de campos requeridos (userId y name)
  - Manejo de errores y respuestas HTTP
  - Configuración CORS incluida

### Search Lambda
- **Propósito**: Buscar usuarios en DynamoDB
- **Características**:
  - Búsqueda por ID de usuario
  - Obtención de todos los usuarios
  - Manejo de casos de usuario no encontrado

### Update Lambda
- **Propósito**: Actualizar información de usuarios
- **Características**:
  - Actualización dinámica de campos
  - Validación de datos de entrada
  - Retorno de datos actualizados

## Instalación y Build

Cada función Lambda tiene su propia configuración y script de build. Para preparar una función para su despliegue:

1. Navegar al directorio de la Lambda deseada:
```bash
cd Lambdas/[Add|Search|Update]
```

2. Instalar dependencias y crear el archivo ZIP para AWS:
```bash
npm run build
```

Esto ejecutará el script PowerShell que:
- Instalará las dependencias necesarias
- Creará una carpeta dist con todos los archivos requeridos
- Generará un archivo function.zip listo para subir a AWS

## Configuración de AWS

1. Crear una tabla en DynamoDB:
   - Nombre de tabla: 'Users'
   - Clave primaria: 'userId'

2. Para cada Lambda:
   - Crear una nueva función Lambda en AWS
   - Subir el archivo function.zip generado
   - Configurar variables de entorno necesarias
   - Asignar rol IAM con permisos para DynamoDB

## SDK de AWS

Este proyecto utiliza AWS SDK v3 para Node.js, que ofrece:
- Mejor modularidad
- Menor tamaño de paquete
- Soporte para middleware
- Mejor manejo de errores

Dependencias principales:
```json
{
  "@aws-sdk/client-dynamodb": "^3.405.0",
  "@aws-sdk/lib-dynamodb": "^3.405.0"
}
```

## Seguridad

- Implementar autenticación y autorización según requisitos
- Revisar y ajustar la configuración CORS para producción
- Utilizar variables de entorno para configuraciones sensibles
- Asegurar que los roles IAM sigan el principio de mínimo privilegio

## Manejo de Errores

Cada Lambda implementa manejo de errores para:
- Errores de validación (400)
- Recursos no encontrados (404)
- Errores internos del servidor (500)

## Pruebas

Para probar las funciones localmente, se recomienda usar AWS SAM CLI o herramientas similares que permitan emular el entorno Lambda.