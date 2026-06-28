const { supabase } = require('./supabase');
require('dotenv').config();

// Sample data for Supabase/PostgreSQL
const sampleMovies = [
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genre_name: "Sci-Fi",
    genre_description: "Science fiction film",
    director_name: "Christopher Nolan",
    director_bio: "British-American film director known for complex narratives.",
    director_birth: 1970,
    director_death: null,
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    image_path: "/images/inception.jpg",
    featured: true
  },
  {
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    genre_name: "Sci-Fi",
    genre_description: "Science fiction film",
    director_name: "Wachowski Sisters",
    director_bio: "Sisters who directed this groundbreaking sci-fi film.",
    director_birth: 1965,
    director_death: null,
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    image_path: "/images/matrix.jpg",
    featured: true
  },
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre_name: "Drama",
    genre_description: "Dramatic film",
    director_name: "Frank Darabont",
    director_bio: "American director known for Stephen King adaptations.",
    director_birth: 1959,
    director_death: null,
    actors: ["Tim Robbins", "Morgan Freeman"],
    image_path: "/images/shawshank.jpg",
    featured: true
  },
  {
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    genre_name: "Crime",
    genre_description: "Crime film",
    director_name: "Quentin Tarantino",
    director_bio: "American director known for nonlinear storytelling.",
    director_birth: 1963,
    director_death: null,
    actors: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
    image_path: "/images/pulpfiction.jpg",
    featured: false
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre_name: "Sci-Fi",
    genre_description: "Science fiction film",
    director_name: "Christopher Nolan",
    director_bio: "British-American film director known for complex narratives.",
    director_birth: 1970,
    director_death: null,
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    image_path: "/images/interstellar.jpg",
    featured: true
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests.",
    genre_name: "Action",
    genre_description: "Action film",
    director_name: "Christopher Nolan",
    director_bio: "British-American film director known for complex narratives.",
    director_birth: 1970,
    director_death: null,
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    image_path: "/images/darkknight.jpg",
    featured: true
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to Supabase...');

    // Clear existing data
    await supabase.from('movies').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    console.log('Cleared existing movies');

    // Insert sample movies
    const { data, error } = await supabase.from('movies').insert(sampleMovies).select();
    if (error) throw error;
    console.log(`Inserted ${data.length} movies`);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
}

seedDatabase();
