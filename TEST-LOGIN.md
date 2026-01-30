# Test Login Credentials

After creating a user, you can use these credentials to test the login:

## How to Register a Test User

### Option 1: Using API directly
Open your browser console or use a tool like Postman:

```javascript
fetch('http://localhost:3000/api/user', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test Author',
    email: 'author@test.com',
    password: 'password123',
    role: 'author'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Option 2: Using cURL in terminal

```bash
curl -X POST http://localhost:3000/api/user \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test Author\",\"email\":\"author@test.com\",\"password\":\"password123\",\"role\":\"author\"}"
```

## Test Credentials

After registration, use these credentials to login at `/author-login`:

- **Email**: author@test.com
- **Password**: password123
- **Role**: author

## Login Issues Fixed

1. ✅ Added user `id` to login response
2. ✅ Updated logout redirect to `/author-login`
3. ✅ Changed cookie `sameSite` from `strict` to `lax` for better compatibility
4. ✅ Updated secure flag to only be true in production
5. ✅ Extended cookie expiration to 7 days
6. ✅ Added console error logging for debugging

## What to Check

1. Make sure MongoDB is connected
2. Check browser console for any errors
3. Check Network tab to see the API response
4. Verify cookies are being set (check Application > Cookies in DevTools)
