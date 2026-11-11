# Backend de Tareas con autenticación JWT

API REST en **Node.js + Express + MongoDB (Mongoose)**. Permite registrar usuarios, iniciar sesión con un token **JWT** y ofrece un CRUD de tareas protegido con **Bearer Token**: cada usuario solo puede ver, modificar y eliminar sus propias tareas.

## Tecnologías

- Express 5
- Mongoose (MongoDB Atlas)
- jsonwebtoken (JWT)
- bcrypt (hash de contraseñas)
- dotenv, colors, express-async-handler
- nodemon (desarrollo)

## Instalación

```bash
git clone https://github.com/emiliovegadellergo/backend-software.git
cd backend-software
npm install
```

Crea un archivo `.env` en la raíz copiando `.env.example` y llena los valores:

```
PORT=5001
MONGO_DB=<cadena de conexión de MongoDB Atlas>
JWT_SECRET=<un texto secreto largo>
```

> El archivo `.env` nunca se sube al repositorio (está en `.gitignore`).

## Ejecución

```bash
npm run server   # modo desarrollo con nodemon
npm start        # modo normal
```

El servidor queda en `http://localhost:<PORT>`.

## Endpoints

### Usuarios (`/api/users`)

| Método | Ruta | Descripción | Token |
|---|---|---|---|
| POST | `/api/users` | Crear usuario (`nombre`, `email`, `password`) | No |
| POST | `/api/users/login` | Iniciar sesión, devuelve el JWT | No |
| GET | `/api/users/datos` | Datos del usuario dueño del token | Sí |

### Tareas (`/api/tareas`)

Todas las rutas usan el middleware `protect`.

| Método | Ruta | Descripción | Token |
|---|---|---|---|
| GET | `/api/tareas` | Lista solo las tareas del usuario logueado | Sí |
| POST | `/api/tareas` | Crea una tarea (`descripcion`) asignada al usuario logueado | Sí |
| PUT | `/api/tareas/:id` | Modifica una tarea propia | Sí |
| DELETE | `/api/tareas/:id` | Elimina una tarea propia | Sí |

Header de autorización:

```
Authorization: Bearer <token>
```

## Seguridad

- El middleware `protect` valida el header `Authorization: Bearer <token>`. Si no hay token o es inválido responde **401**.
- El id del usuario se obtiene del token (`req.user.id`), nunca del body ni de la URL.
- Cada tarea guarda el id de su dueño (`user`) y las consultas filtran por ese id.
- Si un usuario intenta modificar o eliminar una tarea ajena, la API responde **401** y la tarea no cambia.
- Las contraseñas se guardan con hash (bcrypt).

## Estructura

```
backend/
├── config/db.js
├── controllers/
│   ├── tareasController.js
│   └── usersController.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/
│   ├── tareasModel.js
│   └── usersModel.js
├── routes/
│   ├── tareasRoutes.js
│   └── usersRoutes.js
└── server.js
```
