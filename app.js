// app.js
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Configuración de Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Definición del modelo de la tabla
const Movie = sequelize.define('Movie', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

// Sincronización del modelo con la base de datos
(async () => {
  await sequelize.sync({ force: true });
  console.log('Database synchronized');
})();

// Configuración de Express
const app = express();
app.use(express.json());

// Rutas
app.get('/movies', async (req, res) => {
  const movies = await Movie.findAll();
  res.json(movies);
});

app.post('/movies', async (req, res) => {
  const { name, description, score, duration } = req.body;
  try {
    const newMovie = await User.create({ name, description, score, duration });
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
