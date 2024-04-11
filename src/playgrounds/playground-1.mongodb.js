// MongoDB Playground
// Create a new document in the collection.

db.getCollection('patients').insertOne({
  name: 'Maria Cedenilla',
  age: 42,
  diagnosis: 'Covid-19',
  createdBy: ObjectId('5f4c8f9f7e7c4d2f8c3c7b1c'),
  createdAt: new Date()
});

db.getCollection('users').insertOne({
  name: 'Maria Cedenilla',
  email: 'proyectosferron@gmail.com',
  passwordHash: '123456',
  createdAt: new Date(),
  patient: savedPatient._id,
  role: 'user'
});

