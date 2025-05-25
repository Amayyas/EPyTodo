#!/bin/bash

# Test script for EPyTodo API
# Make sure the server is running before executing this script

BASE_URL="http://localhost:3000"

echo "🚀 Testing EPyTodo API..."
echo "=============================="

# Test 1: Register a new user
echo "📝 Testing user registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test",
    "firstname": "User",
    "password": "testpassword123"
  }')

echo "Register Response: $REGISTER_RESPONSE"

# Extract token from response (assuming JSON response)
TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Registration failed - no token received"
  exit 1
fi

echo "✅ Registration successful - Token: $TOKEN"
echo ""

# Test 2: Login
echo "🔑 Testing user login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }')

echo "Login Response: $LOGIN_RESPONSE"
echo ""

# Test 3: Get user info
echo "👤 Testing get user info..."
USER_INFO=$(curl -s -X GET "$BASE_URL/user" \
  -H "Authorization: Bearer $TOKEN")

echo "User Info: $USER_INFO"
echo ""

# Test 4: Create a todo
echo "📋 Testing create todo..."
TODO_RESPONSE=$(curl -s -X POST "$BASE_URL/todos" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Test Todo",
    "description": "This is a test todo",
    "due_time": "2024-12-31 23:59:59",
    "user_id": 1,
    "status": "todo"
  }')

echo "Todo Creation Response: $TODO_RESPONSE"
echo ""

# Test 5: Get all todos
echo "📋 Testing get all todos..."
ALL_TODOS=$(curl -s -X GET "$BASE_URL/todos" \
  -H "Authorization: Bearer $TOKEN")

echo "All Todos: $ALL_TODOS"
echo ""

echo "🎉 API testing completed!"
