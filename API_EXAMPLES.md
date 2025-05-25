# API Testing Examples

## 1. Register a new user
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "name": "Doe",
    "firstname": "John",
    "password": "securepassword123"
  }'
```

## 2. Login
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

## 3. Get current user info (requires token)
```bash
curl -X GET http://localhost:3000/user \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 4. Get current user's todos
```bash
curl -X GET http://localhost:3000/user/todos \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 5. Get user by ID
```bash
curl -X GET http://localhost:3000/users/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 6. Update user
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "email": "updated@example.com",
    "name": "Updated",
    "firstname": "User",
    "password": "newpassword123"
  }'
```

## 7. Create a new todo
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete project",
    "description": "Finish the EPyTodo project",
    "due_time": "2024-12-31 23:59:59",
    "user_id": 1,
    "status": "todo"
  }'
```

## 8. Get all todos
```bash
curl -X GET http://localhost:3000/todos \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 9. Get todo by ID
```bash
curl -X GET http://localhost:3000/todos/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 10. Update a todo
```bash
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Updated todo title",
    "description": "Updated description",
    "due_time": "2024-12-31 23:59:59",
    "user_id": 1,
    "status": "in progress"
  }'
```

## 11. Delete a todo
```bash
curl -X DELETE http://localhost:3000/todos/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 12. Delete a user
```bash
curl -X DELETE http://localhost:3000/users/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Error Responses

### No token provided
```json
{ "msg": "No token, authorization denied" }
```

### Invalid token
```json
{ "msg": "Token is not valid" }
```

### Not found
```json
{ "msg": "Not found" }
```

### Bad parameters
```json
{ "msg": "Bad parameter" }
```

### Account already exists (registration)
```json
{ "msg": "Account already exists" }
```

### Invalid credentials (login)
```json
{ "msg": "Invalid Credentials" }
```

### Internal server error
```json
{ "msg": "Internal server error" }
```
