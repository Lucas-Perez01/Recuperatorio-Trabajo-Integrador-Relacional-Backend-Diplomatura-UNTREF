-- Insertar categorías
INSERT INTO categoria (id_categoria, nombre) VALUES
(1, 'Serie');

-- Insertar géneros
INSERT INTO genero (id_genero, nombre) VALUES
(1, 'Sci-Fi'),
(2, 'Fantasía'),
(3, 'Acción'),
(4, 'Drama'),
(5, 'Ficción'),
(6, 'Sucesos'),
(7, 'Misterio'),
(8, 'Suceso Real');

-- Insertar actores
INSERT INTO actor (id_actor, nombre) VALUES
(1, 'Pedro Pascal'), (2, 'Carl Weathers'), (3, 'Misty Rosas'), (4, 'Chris Bartlett'), (5, 'Rio Hackford'), (6, 'Giancarlo Esposito'),
(7, 'Tom Hopper'), (8, 'David Castañeda'), (9, 'Emmy Raver-Lampman'), (10, 'Robert Sheehan'), (11, 'Aidan Gallagher'), (12, 'Elliot Page'),
(13, 'Anya Taylor-Joy'), (14, 'Thomas Brodie-Sangster'), (15, 'Harry Melling'), (16, 'Moses Ingram'), (17, 'Chloe Pirrie'), (18, 'Janina Elkin'),
(19, 'Lili Reinhart'), (20, 'Casey Cott'), (21, 'Camila Mendes'), (22, 'Marisol Nichols'), (23, 'Madelaine Petsch'), (24, 'Mädchen Amick'),
(25, 'Claire Fox'), (26, 'Olivia Colman'), (27, 'Matt Smith'), (28, 'Tobias Menzies'), (29, 'Vanesa Kirby'), (30, 'Helena Bonham Carter');

-- Insertar contenidos
INSERT INTO contenido (id_contenido, titulo, resumen, temporadas, trailer_url, id_categoria, poster) VALUES
(1, 'The Mandalorian', 'Ambientada tras la caída del Imperio y antes de la aparición de la Primera Orden, la Serie sigue los pasos de un pistolero solitario en las aventuras que protagoniza en los confines de la galaxia, donde no alcanza la autoridad de la Nueva República.', 2, 'https://www.youtube.com/embed/aOC8E8z_ifw', 1, './posters/3.jpg'),
(2, 'The Umbrella Academy', 'La muerte de su padre reúne a unos hermanos distanciados y con extraordinarios poderes que descubren impactantes secretos y una amenaza que se cierne sobre la humanidad.', 1, 'https://www.youtube.com/embed/KHucKOK-Vik', 1, './posters/4.jpg'),
(3, 'Gambito de Dama', 'En los cincuenta, una joven de un orfanato descubre que tiene un increíble don para el ajedrez y recorre el arduo camino a la fama mientras lucha contra las adicciones.', 1, 'https://www.youtube.com/embed/lbleRbyGKL4', 1, './posters/5.jpg'),
(4, 'Riverdale', 'El paso a la edad adulta incluye sexo, romance, escuela y familia. Para Archie y sus amigos, también hay misterios oscuros.', 5, 'https://www.youtube.com/embed/HxtLlByaYTc', 1, './posters/2.jpg'),
(5, 'The Crown', 'Este drama narra las rivalidades políticas y el romance de la reina Isabel II, así como los sucesos que moldearon la segunda mitad del siglo XX.', 4, 'https://www.youtube.com/embed/JWtnJjn6ng0', 1, './posters/1.jpg');

-- Insertar relaciones contenido-género
INSERT INTO contenido_genero (id_contenido, id_genero) VALUES
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 2), (2, 4),
(3, 4), (3, 5), (3, 6),
(4, 4), (4, 5), (4, 7),
(5, 4), (5, 8);

-- Insertar relaciones contenido-actor
INSERT INTO contenido_actor (id_contenido, id_actor) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
(2, 7), (2, 8), (2, 9), (2, 10), (2, 11), (2, 12),
(3, 13), (3, 14), (3, 15), (3, 16), (3, 17), (3, 18),
(4, 19), (4, 20), (4, 21), (4, 22), (4, 23), (4, 24),
(5, 25), (5, 26), (5, 27), (5, 28), (5, 29), (5, 30);
