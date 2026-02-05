# 📘 Guía Completa: CRUD API con Laravel 12

Esta guía te llevará paso a paso desde cero hasta crear una API REST completa, escalable y mantenible para gestionar Posts usando Laravel 12.

---

## 📋 Requisitos Previos

- **PHP 8.2+**
- **Composer**
- **SQLite** (incluido por defecto en PHP)
- **Postman/Insomnia** (para probar los endpoints)
- **Herd/Laravel Valet/Laragon** (opcional, para desarrollo local)

---

## 🚀 Paso 1: Crear el Proyecto Laravel 12

```bash
composer create-project laravel/laravel crud
cd crud
```

---

## 🔧 Paso 2: Configurar la Base de Datos

Edita el archivo `.env`:

```env
DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=
```

Crea el archivo de base de datos SQLite:

```bash
touch database/database.sqlite
```

> **Nota:** En Windows, si `touch` no funciona, usa:
> ```powershell
> New-Item database/database.sqlite
> ```

---

## 🛠️ Paso 3: Instalar la API

Laravel 12 incluye un comando para configurar la API automáticamente:

```bash
php artisan install:api
```

Este comando:
- Instala y configura Laravel Sanctum
- Publica las migraciones necesarias
- Ejecuta las migraciones automáticamente
- Configura las rutas API

---

## 📦 Paso 4: Crear la Migración de Posts

```bash
php artisan make:migration create_posts_table
```

Edita `database/migrations/xxxx_create_posts_table.php`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->enum('status', ['draft','published'])->default('draft');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
```

Ejecuta la migración:

```bash
php artisan migrate
```

---

## 🎯 Paso 5: Crear el Modelo Post

```bash
php artisan make:model Post
```

Edita `app/Models/Post.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'content', 'status'];
    
    public const PAGINATE = 10;
}
```

---

## ✅ Paso 6: Crear Form Requests para Validación

### Request para Crear Posts

```bash
php artisan make:request Post/CreatePostRequest
```

Edita `app/Http/Requests/Post/CreatePostRequest.php`:

```php
<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

class CreatePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
            'status'  => 'required|in:draft,published'
        ];
    }
}
```

### Request para Actualizar Posts (Parcial)

```bash
php artisan make:request Post/CreateUpdateRequest
```

Edita `app/Http/Requests/Post/CreateUpdateRequest.php`:

```php
<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

class CreateUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Usa 'sometimes' para permitir actualización parcial (PATCH)
     */
    public function rules(): array
    {
        return [
            'title'   => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'status'  => 'sometimes|required|in:draft,published'
        ];
    }
}
```

---

## 🏗️ Paso 7: Crear el Service Layer (Capa de Servicio)

Crea el directorio y el servicio:

```bash
mkdir -p app/Services/Post
```

Crea `app/Services/Post/PostService.php`:

```php
<?php

namespace App\Services\Post;

use App\Models\Post;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PostService
{
    /**
     * Obtener todos los posts con filtros opcionales
     */
    public function getAll(array $filters = []): LengthAwarePaginator
    {
        $query = Post::latest();

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->paginate(Post::PAGINATE);
    }

    /**
     * Buscar un post por ID
     */
    public function find(int $id): Post
    {
        return Post::findOrFail($id);
    }

    /**
     * Crear un nuevo post
     */
    public function create(array $data): Post
    {
        return Post::create($data);
    }

    /**
     * Actualizar un post existente
     */
    public function edit(Post $post, array $data): Post
    {
        $post->update($data);
        return $post;
    }

    /**
     * Eliminar un post
     */
    public function delete(int $id): bool
    {
        return Post::where('id', $id)->delete();
    }
}
```

---

## 🎮 Paso 8: Crear el Controlador

```bash
php artisan make:controller PostController
```

Edita `app/Http/Controllers/PostController.php`:

```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\Post\CreatePostRequest;
use App\Http\Requests\Post\CreateUpdateRequest;
use App\Services\Post\PostService;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function __construct(protected PostService $service)
    {}

    /**
     * GET /api/posts
     * Listar todos los posts (con paginación y filtros opcionales)
     */
    public function index(Request $request)
    {
        $posts = $this->service->getAll($request->only('status'));

        return response()->json([
            'message' => 'Elementos listados correctamente',
            'data'    => $posts,
        ], 200);
    }

    /**
     * POST /api/posts
     * Crear un nuevo post
     */
    public function store(CreatePostRequest $request)
    {
        $post = $this->service->create($request->validated());

        return response()->json([
            'message' => 'Post creado exitosamente',
            'data'    => $post,
        ], 201);
    }

    /**
     * GET /api/posts/{id}
     * Mostrar un post específico
     */
    public function show(string $id)
    {
        $post = $this->service->find($id);
        
        return response()->json([
            'message' => 'Post encontrado exitosamente',
            'data'    => $post,
        ], 200);
    }

    /**
     * PATCH /api/posts/{id}
     * Actualizar un post (parcial o completo)
     */
    public function edit(CreateUpdateRequest $request, string $id)
    {
        $updatedPost = $this->service->edit(
            $this->service->find($id), 
            $request->validated()
        );

        return response()->json([
            'message' => 'Post actualizado exitosamente',
            'data'    => $updatedPost,
        ], 200);
    }

    /**
     * DELETE /api/posts/{id}
     * Eliminar un post
     */
    public function destroy(string $id)
    {
        $this->service->delete($id);
        
        return response()->json([
            'message' => 'Post eliminado exitosamente',
        ], 204);
    }
}
```

---

## 🛤️ Paso 9: Configurar las Rutas API

Edita `routes/api.php`:

```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

// API Post Routes
Route::post('posts', [PostController::class, 'store']);
Route::get('posts', [PostController::class, 'index']);
Route::get('posts/{id}', [PostController::class, 'show']);
Route::patch('posts/{id}', [PostController::class, 'edit']);
Route::delete('posts/{id}', [PostController::class, 'destroy']);
```

---

## ▶️ Paso 10: Iniciar el Servidor

```bash
php artisan serve
```

O si usas **Herd/Valet**, accede a `http://crud.test`

---

## 🧪 Paso 11: Probar los Endpoints

### 1. Crear un Post (POST)

**Endpoint:** `POST http://127.0.0.1:8000/api/posts`

**Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Body:**
```json
{
  "title": "Mi Primer Post",
  "content": "Este es el contenido de mi primer post",
  "status": "draft"
}
```

**Respuesta esperada (201):**
```json
{
  "message": "Post creado exitosamente",
  "data": {
    "id": 1,
    "title": "Mi Primer Post",
    "content": "Este es el contenido de mi primer post",
    "status": "draft",
    "created_at": "2026-02-04T20:00:00.000000Z",
    "updated_at": "2026-02-04T20:00:00.000000Z"
  }
}
```

---

### 2. Listar Posts (GET)

**Endpoint:** `GET http://127.0.0.1:8000/api/posts`

**Respuesta esperada (200):**
```json
{
  "message": "Elementos listados correctamente",
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "title": "Mi Primer Post",
        "content": "Este es el contenido de mi primer post",
        "status": "draft",
        "created_at": "2026-02-04T20:00:00.000000Z",
        "updated_at": "2026-02-04T20:00:00.000000Z"
      }
    ],
    "per_page": 10,
    "total": 1
  }
}
```

**Con filtro por status:**  
`GET http://127.0.0.1:8000/api/posts?status=published`

---

### 3. Obtener un Post (GET)

**Endpoint:** `GET http://127.0.0.1:8000/api/posts/1`

**Respuesta esperada (200):**
```json
{
  "message": "Post encontrado exitosamente",
  "data": {
    "id": 1,
    "title": "Mi Primer Post",
    "content": "Este es el contenido de mi primer post",
    "status": "draft",
    "created_at": "2026-02-04T20:00:00.000000Z",
    "updated_at": "2026-02-04T20:00:00.000000Z"
  }
}
```

---

### 4. Actualizar un Post - Parcial (PATCH)

**Endpoint:** `PATCH http://127.0.0.1:8000/api/posts/1`

**Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Body (solo actualizar el título):**
```json
{
  "title": "Título Actualizado"
}
```

**O actualizar varios campos:**
```json
{
  "title": "Título Actualizado",
  "status": "published"
}
```

**Respuesta esperada (200):**
```json
{
  "message": "Post actualizado exitosamente",
  "data": {
    "id": 1,
    "title": "Título Actualizado",
    "content": "Este es el contenido de mi primer post",
    "status": "published",
    "created_at": "2026-02-04T20:00:00.000000Z",
    "updated_at": "2026-02-04T20:05:00.000000Z"
  }
}
```

---

### 5. Eliminar un Post (DELETE)

**Endpoint:** `DELETE http://127.0.0.1:8000/api/posts/1`

**Respuesta esperada (204):**
```json
{
  "message": "Post eliminado exitosamente"
}
```

---

## 🏛️ Arquitectura del Proyecto

```
app/
├── Http/
│   ├── Controllers/
│   │   └── PostController.php        # Maneja las peticiones HTTP
│   └── Requests/
│       └── Post/
│           ├── CreatePostRequest.php      # Validación para crear
│           └── CreateUpdateRequest.php    # Validación para actualizar
├── Models/
│   └── Post.php                      # Modelo Eloquent
└── Services/
    └── Post/
        └── PostService.php           # Lógica de negocio

routes/
└── api.php                           # Rutas de la API

database/
└── migrations/
    └── xxxx_create_posts_table.php   # Esquema de la BD
```

---

## ✨ Características Implementadas

### ✅ Separación de Responsabilidades
- **Controller:** Maneja requests/responses HTTP
- **Service:** Contiene la lógica de negocio
- **Model:** Representa la entidad de la base de datos
- **Form Requests:** Valida datos de entrada

### ✅ Validación Robusta
- **CreatePostRequest:** Requiere todos los campos (POST)
- **CreateUpdateRequest:** Campos opcionales con `sometimes` (PATCH)

### ✅ Actualización Parcial (PATCH)
Puedes actualizar solo los campos que necesites sin enviar todos los datos.

### ✅ Paginación Automática
Los listados usan paginación (10 elementos por defecto).

### ✅ Filtros en el Listado
Filtra por `status`: `GET /api/posts?status=published`

### ✅ Códigos HTTP Correctos
- `200` OK (éxito)
- `201` Created (recurso creado)
- `204` No Content (eliminado)
- `404` Not Found (no encontrado)
- `422` Unprocessable Entity (error de validación)

### ✅ Respuestas JSON Estandarizadas
Todas las respuestas siguen el formato:
```json
{
  "message": "Descripción de la operación",
  "data": { /* datos */ }
}
```

---

## 🔐 Nota sobre Autenticación

Este proyecto **NO** incluye autenticación para simplificar el aprendizaje. En producción, deberías agregar:

- **Laravel Sanctum** para API tokens
- Middleware `auth:sanctum` en las rutas protegidas
- Registro y login de usuarios

---

## 🚀 Comandos Útiles

```bash
# Ver todas las rutas
php artisan route:list

# Limpiar caché
php artisan cache:clear
php artisan config:clear

# Crear nueva migración
php artisan make:migration nombre_migracion

# Ejecutar migraciones
php artisan migrate

# Revertir última migración
php artisan migrate:rollback

# Recrear base de datos SQLite (borra todos los datos)
php artisan migrate:fresh

# Ver logs en tiempo real (Windows PowerShell)
Get-Content storage/logs/laravel.log -Wait -Tail 50

# Ver logs en tiempo real (Linux/Mac)
tail -f storage/logs/laravel.log
```

---

## 📚 Mejores Prácticas Aplicadas

1. **Service Layer Pattern:** Lógica de negocio separada del controlador
2. **Form Request Validation:** Validación centralizada y reutilizable
3. **RESTful API Design:** Endpoints claros y semánticos
4. **Type Hinting:** Código más seguro con PHP 8.2+
5. **Constructor Property Promotion:** Sintaxis moderna de PHP
6. **Paginación:** Evita sobrecarga con grandes datasets
7. **Soft Deletes** (opcional): Considera usar `SoftDeletes` trait en el modelo

---

## 🐛 Solución de Problemas Comunes

### Error: "The title field is required"
- Verifica que estés usando **comillas dobles** `"` en JSON, no simples `'`
- Asegúrate de tener el header `Content-Type: application/json`

### Error 404 en rutas API
- Verifica que la URL incluya `/api/` (ej: `http://127.0.0.1:8000/api/posts`)
- Revisa las rutas con `php artisan route:list`

### Error de conexión a BD con SQLite
- Verifica que el archivo `database/database.sqlite` exista
- Si no existe, créalo: `touch database/database.sqlite` (Linux/Mac) o `New-Item database/database.sqlite` (Windows)
- Asegúrate de que `.env` tenga `DB_CONNECTION=sqlite`
- Ejecuta las migraciones: `php artisan migrate`

---

## 🎯 Próximos Pasos Sugeridos

1. **Agregar autenticación con Sanctum**
2. **Implementar relaciones** (Post → User)
3. **Agregar API Resources** para formatear respuestas
4. **Implementar tests** (PHPUnit/Pest)
5. **Agregar Rate Limiting** para proteger la API
6. **Documentar con Swagger/OpenAPI**
7. **Implementar búsqueda y ordenamiento avanzado**

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**¡Felicidades! 🎉** Has creado una API REST completa, escalable y mantenible con Laravel 12.
