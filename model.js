const bcrypt = require('bcryptjs');
const { supabase } = require('./supabase');

async function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

async function validatePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

// Movies module - maps to PostgreSQL 'movies' table
const Movies = {
  async findAll() {
    const { data, error } = await supabase.from('movies').select('*');
    if (error) throw new Error(error.message);
    return data || [];
  },

  async findByTitle(title) {
    const { data, error } = await supabase.from('movies')
      .select('*')
      .eq('title', title)
      .single();
    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data || null;
  },

  async findByGenreName(name) {
    const { data, error } = await supabase.from('movies')
      .select('*')
      .eq('genre_name', name)
      .single();
    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data || null;
  },

  async findByDirectorName(name) {
    const { data, error } = await supabase.from('movies')
      .select('*')
      .eq('director_name', name)
      .single();
    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data || null;
  },

  // Unique directors from all movies
  async findAllDirectors() {
    const { data, error } = await supabase.from('movies').select('*');
    if (error) throw new Error(error.message);
    
    const seen = new Set();
    const unique = [];
    for (const movie of (data || [])) {
      if (movie.director_name && !seen.has(movie.director_name)) {
        seen.add(movie.director_name);
        unique.push({ Name: movie.director_name, Bio: movie.director_bio });
      }
    }
    return unique;
  },

  async create(movieData) {
    const { data, error } = await supabase.from('movies')
      .insert([{
        title: movieData.Title || movieData.title,
        description: movieData.Description || movieData.description,
        genre_name: movieData.Genre?.Name || movieData.genre_name,
        genre_description: movieData.Genre?.Description || movieData.genre_description,
        director_name: movieData.Director?.Name || movieData.director_name,
        director_bio: movieData.Director?.Bio || movieData.director_bio,
        director_birth: movieData.Director?.Birth || movieData.director_birth,
        director_death: movieData.Director?.Death || movieData.director_death,
        actors: movieData.Actors || movieData.actors || [],
        image_path: movieData.ImagePath || movieData.image_path,
        featured: movieData.Featured !== undefined ? movieData.Featured : false
      }])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async updateById(id, updates) {
    const { data, error } = await supabase.from('movies')
      .update({
        title: updates.title || updates.Title,
        description: updates.description || updates.Description,
        genre_name: updates.genre?.Name || updates.genre_name,
        genre_description: updates.genre?.Description || updates.genre_description,
        director_name: updates.director?.Name || updates.director_name,
        director_bio: updates.director?.Bio || updates.director_bio,
        director_birth: updates.director?.Birth || updates.director_birth,
        director_death: updates.director?.Death || updates.director_death,
        actors: updates.actors || updates.Actors || [],
        image_path: updates.imagePath || updates.ImagePath,
        featured: updates.featured !== undefined ? updates.featured : false
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async deleteById(id) {
    const { error } = await supabase.from('movies').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }
};

// Users module - maps to PostgreSQL 'users' table
const Users = {
  hashPassword,
  validatePassword,

  async findOne({ Username }) {
    const { data, error } = await supabase.from('users')
      .select('*')
      .eq('username', Username)
      .single();
    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data || null;
  },

  async create(userData) {
    const hashedPassword = await hashPassword(userData.Password);
    const { data, error } = await supabase.from('users')
      .insert([{
        username: userData.Username,
        password: hashedPassword,
        email: userData.Email,
        birthday: userData.Birthday ? new Date(userData.Birthday) : null,
        favorite_movies: []
      }])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async findAll() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw new Error(error.message);
    return data || [];
  },

  async updateByUsername(username, updates) {
    const hashedPassword = updates.Password ? await hashPassword(updates.Password) : undefined;
    const { data, error } = await supabase.from('users')
      .update({
        username: updates.Username || username, // rename case handled by app
        password: hashedPassword,
        email: updates.Email,
        birthday: updates.Birthday ? new Date(updates.Birthday) : undefined
      })
      .eq('username', username)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async addFavoriteMovie(username, movieId) {
    const { data: user, error } = await supabase.from('users')
      .select('favorite_movies')
      .eq('username', username)
      .single();
    if (error) throw new Error(error.message);
    
    const existingFavorites = user.favorite_movies || [];
    const newFavorites = [...existingFavorites, movieId];

    const { data: updatedUser, error: updateError } = await supabase.from('users')
      .update({ favorite_movies: newFavorites })
      .eq('username', username)
      .select()
      .single();
    if (updateError) throw new Error(updateError.message);
    return updatedUser;
  },

  async removeFavoriteMovie(username, movieId) {
    const { data: user, error } = await supabase.from('users')
      .select('favorite_movies')
      .eq('username', username)
      .single();
    if (error) throw new Error(error.message);
    
    const existingFavorites = user.favorite_movies || [];
    const newFavorites = existingFavorites.filter(id => id !== movieId);

    const { data: updatedUser, error: updateError } = await supabase.from('users')
      .update({ favorite_movies: newFavorites })
      .eq('username', username)
      .select()
      .single();
    if (updateError) throw new Error(updateError.message);
    return updatedUser;
  },

  async deleteByUsername(username) {
    const { error } = await supabase.from('users').delete().eq('username', username);
    if (error) throw new Error(error.message);
    return true;
  }
};

module.exports.Movie = Movies;
module.exports.User = Users;
