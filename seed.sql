-- GuntFlix Seed Data
-- Run this in your Supabase SQL Editor (https://supabase.com → SQL Editor → New Query)

-- Clear existing data (safe to run even if tables are empty)
TRUNCATE TABLE movies RESTART IDENTITY CASCADE;

INSERT INTO movies (title, description, genre_name, genre_description, director_name, director_bio, image_path, featured) VALUES
(
  'The Shawshank Redemption',
  'Over the course of several years, two convicts form a friendship, seeking consolation and eventual redemption through basic compassion.',
  'Drama',
  'Drama films focus on character development and emotional themes, often dealing with realistic conflicts and human struggles.',
  'Frank Darabont',
  'Frank Darabont is a Hungarian-American film director, screenwriter and producer who has been nominated for three Academy Awards.',
  '',
  true
),
(
  'The Godfather',
  'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.',
  'Crime',
  'Crime films explore the lives of criminals, their organizations, and the moral conflicts that arise from their actions.',
  'Francis Ford Coppola',
  'Francis Ford Coppola is an American film director, producer and screenwriter. He was a central figure of the New Hollywood film movement.',
  '',
  true
),
(
  'The Dark Knight',
  'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  'Action',
  'Action films feature high-energy sequences, physical stunts, chases, and confrontations with clear heroes and villains.',
  'Christopher Nolan',
  'Christopher Nolan is a British-American film director known for his Hollywood blockbusters with complex storytelling.',
  '',
  true
),
(
  'Pulp Fiction',
  'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
  'Crime',
  'Crime films explore the lives of criminals, their organizations, and the moral conflicts that arise from their actions.',
  'Quentin Tarantino',
  'Quentin Tarantino is an American film director, screenwriter and actor known for his nonlinear storytelling and stylized violence.',
  '',
  true
),
(
  'Inception',
  'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project.',
  'Sci-Fi',
  'Science fiction films explore speculative concepts like advanced technology, space exploration, time travel, and parallel realities.',
  'Christopher Nolan',
  'Christopher Nolan is a British-American film director known for his Hollywood blockbusters with complex storytelling.',
  '',
  true
),
(
  'Fight Club',
  'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
  'Drama',
  'Drama films focus on character development and emotional themes, often dealing with realistic conflicts and human struggles.',
  'David Fincher',
  'David Fincher is an American film director known for his dark, stylish thrillers and meticulous attention to visual detail.',
  '',
  false
),
(
  'Forrest Gump',
  'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
  'Drama',
  'Drama films focus on character development and emotional themes, often dealing with realistic conflicts and human struggles.',
  'Robert Zemeckis',
  'Robert Zemeckis is an American film director and producer known for his innovative use of visual effects.',
  '',
  true
),
(
  'The Matrix',
  'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth — the life he knows is the elaborate deception of an evil cyber-intelligence.',
  'Sci-Fi',
  'Science fiction films explore speculative concepts like advanced technology, space travel, time travel, and parallel realities.',
  'Lana Wachowski',
  'Lana Wachowski is an American film director, screenwriter and producer best known for the Matrix trilogy.',
  '',
  true
),
(
  'Goodfellas',
  'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.',
  'Crime',
  'Crime films explore the lives of criminals, their organizations, and the moral conflicts that arise from their actions.',
  'Martin Scorsese',
  'Martin Scorsese is an American film director, producer and screenwriter. He is one of the most significant directors in cinema history.',
  '',
  false
),
(
  'Interstellar',
  'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot Joseph Cooper is tasked with piloting a spacecraft along with a team of researchers to find a new planet for humans.',
  'Sci-Fi',
  'Science fiction films explore speculative concepts like advanced technology, space travel, time travel, and parallel realities.',
  'Christopher Nolan',
  'Christopher Nolan is a British-American film director known for his Hollywood blockbusters with complex storytelling.',
  '',
  true
),
(
  'Parasite',
  'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
  'Thriller',
  'Thriller films create suspense, tension, and excitement, often involving plot twists and high stakes.',
  'Bong Joon-ho',
  'Bong Joon-ho is a South Korean film director and screenwriter whose film Parasite won the Academy Award for Best Picture.',
  '',
  true
),
(
  'Spirited Away',
  'During her familys move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, a world where humans are changed into beasts.',
  'Animation',
  'Animated films are created through illustration and computer-generated techniques, bringing imaginative worlds and characters to life.',
  'Hayao Miyazaki',
  'Hayao Miyazaki is a Japanese animator, filmmaker and manga artist. He is widely regarded as one of the greatest animation directors.',
  '',
  false
),
(
  'Gladiator',
  'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
  'Action',
  'Action films feature high-energy sequences, physical stunts, chases, and confrontations with clear heroes and villains.',
  'Ridley Scott',
  'Ridley Scott is an English film director and producer known for his atmospheric, highly concentrated visual style.',
  '',
  false
),
(
  'The Silence of the Lambs',
  'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
  'Thriller',
  'Thriller films create suspense, tension, and excitement, often involving plot twists and high stakes.',
  'Jonathan Demme',
  'Jonathan Demme was an American film director, producer and screenwriter known for his work in both documentaries and feature films.',
  '',
  false
),
(
  'Whiplash',
  'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a students potential.',
  'Drama',
  'Drama films focus on character development and emotional themes, often dealing with realistic conflicts and human struggles.',
  'Damien Chazelle',
  'Damien Chazelle is an American film director and screenwriter known for his emotionally charged musical and drama films.',
  '',
  false
),
(
  'The Lion King',
  'Lion prince Simba flees his kingdom after the murder of his father, only to learn the true meaning of responsibility and bravery.',
  'Animation',
  'Animated films are created through illustration and computer-generated techniques, bringing imaginative worlds and characters to life.',
  'Roger Allers',
  'Roger Allers is an American film director, screenwriter and animator known for his work at Walt Disney Animation Studios.',
  '',
  false
);
