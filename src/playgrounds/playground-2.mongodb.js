// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// Create a new document in the collection.
db.getCollection('users').insertOne({
    name: 'Juan Ferron',
    email: 'proyectosferron@gmail.com',
    password: '123456',
    role: 'admin',
    status: 'active',
    createdAt: new Date(),

});
