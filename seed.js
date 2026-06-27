const mongoose = require('mongoose');
require('dotenv').config();

// Models
const Models = require('./model.js');
const Movie = Models.Movie;
const User = Models.User;

// Sample data
const sampleMovies = [
  {
    Title: "Inception",
    Description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    Genre: { Name: "Sci-Fi", Description: "Science fiction film" },
    Director: { Name: "Christopher Nolan", Bio: "British-American film director known for complex narratives." },
    Actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    ImagePath: "/images/inception.jpg",
    Featured: true
  },
  {
    Title: "The Matrix",
    Description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    Genre: { Name: "Sci-Fi", Description: "Science fiction film" },
    Director: { Name: "Wachowski Sisters", Bio: "Sisters who directed this groundbreaking sci-fi film." },
    Actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    ImagePath: "/images/matrix.jpg",
    Featured: true
  },
  {
    Title: "The Shawshank Redemption",
    Description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Genre: { Name: "Drama", Description: "Dramatic film" },
    Director: { Name: "Frank Darabont", Bio: "American director known for Stephen King adaptations." },
    Actors: ["Tim Robbins", "Morgan Freeman"],
    ImagePath: "/images/shawshank.jpg",
    Featured: true
  },
  {
    Title: "Pulp Fiction",
    Description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    Genre: { Name: "Crime", Description: "Crime film" },
    Director: { Name: "Quentin Tarantino", Bio: "American director known for nonlinear storytelling." },
    Actors: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
    ImagePath: "/images/pulpfiction.jpg",
    Featured: false
  },
  {
    Title: "Interstellar",
    Description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    Genre: { Name: "Sci-Fi", Description: "Science fiction film" },
    Director: { Name: "Christopher Nolan", Bio: "British-American film director known for complex narratives." },
    Actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    ImagePath: "/images/interstellar.jpg",
    Featured: true
  },
  {
    Title: "The Dark Knight",
    Description: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests.",
    Genre: { Name: "Action", Description: "Action film" },
    Director: { Name: "Christopher Nolan", Bio: "British-American film director known for complex narratives." },
    Actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    ImagePath: "/images/darkknight.jpg",
    Featured: true
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    
    // Try connecting to local MongoDB first, fall back if needed
    const dbUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/myFlixDB';
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Movie.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample movies
    const inserted = await Movie.insertMany(sampleMovies);
    console.log(`Inserted ${inserted.length} movies`);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    // If MongoDB isn't running locally, that's okay for now
    process.exit(1);
  }
}

seedDatabase();
