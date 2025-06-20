# 📘 SenecaRide API Documentation

## 🌐 Base URL
https://senecaride-backend.onrender.com

---

## 🔐 POST /api/rides

**Description:** Create a ride (requires Firebase token)

- Method: `POST`
- URL: `/api/rides`
- Headers:
  - Authorization: Bearer `<Firebase_ID_Token>`
  - Content-Type: `application/json`

  > The Firebase ID Token must be retrieved from the frontend using:
```js
const token = await firebase.auth().currentUser.getIdToken();

### Request Body:
```json
{
  "userId": "abc123",
  "departure": "Seneca Newnham",
  "destination": "Union Station",
  "date": "2025-06-21",
  "time": "08:30",
  "seats": 3,
  "cost": 5
}

🔹 Error Responses
Code	Message
401	Missing auth token
403	Invalid or expired Firebase token
500	Failed to post ride

GET /api/rides
Purpose: Fetch all available rides, or filter rides based on query parameters.

Authentication Notes
Only POST /api/rides requires an Authorization header

The token must be a valid Firebase ID Token

GET requests are public (unless restricted later by Firestore rules)


Status Codes Summary
Status	Meaning
200 OK	Successful GET
201 Created	Successful POST
400 Bad Request	Invalid data format
401 Unauthorized	No token provided
403 Forbidden	Invalid token
500 Internal Server Error	Backend failed to process request


Testing From Frontend (How-To)
js
Copy code
const token = await firebase.auth().currentUser.getIdToken();

await fetch("https://senecaride-backend.onrender.com/api/rides", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(rideData)
});