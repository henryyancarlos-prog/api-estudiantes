# API de Gestión de Estudiantes

Proyecto escolar desarrollado con Node.js y Express para gestionar una lista de estudiantes en memoria.

## Instrucciones de ejecución
1. Clonar el repositorio.
2. Instalar las dependencias con: `pnpm install`
3. Iniciar el servidor con: `pnpm start`

## Tabla de Endpoints Disponibles

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/estudiantes` | Obtiene la lista completa de estudiantes. |
| **GET** | `/estudiantes/:id` | Busca un estudiante por su ID único. |
| **POST** | `/estudiantes` | Agrega un nuevo estudiante enviando un JSON. |
| **PUT** | `/estudiantes/:id` | Modifica los datos de un estudiante por su ID. |
| **DELETE** | `/estudiantes/:id` | Elimina un estudiante del array por su ID. |
