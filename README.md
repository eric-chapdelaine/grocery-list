# Grocery List

## Dependencies

- [Node.js](https://nodejs.org/en/download) (version 21.7.1 or later)
- React (version 18.2.0 or later)
- Express js (version 4.19.2 or later)
- MySQL

## Installation

1. Install Node.js from the link above
2. Clone the project repository:

```bash
git clone https://github.com/eric-chapdelaine/grocery-list
```

3. Navigate to project directory:

```bash
cd grocery-list/
```

4. Install the backend dependencies:

```bash
cd server
npm install
```

5. Install the frontend dependencies:

```bash
cd ../client
npm install
```

6. Restore the database dump file
    - You can alternatively run the `./server/database/script.sql` file
7. Configure the backend server
   - Open the `./server/utils.js` file and update the database connection details (host, user, password, database name) to match your local setup.
   - In `./server/server.js` update the `CLIENT_URL` and `LOCAL_URL` variables to match your local development environment. (Although if you plan to use the app from the same computer as it's being hosted, this may not need to be updated)
8. Start the backend server

```bash
cd ../server
node ./server.js
```

9. Start the frontend server:

```bash
cd ../client
npm start
```

The application should now be available at `http://localhost:3000`