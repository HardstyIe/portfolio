-- ============================================
-- SCRIPT D'IMPORT COMPLET - PORTFOLIO PROJECTS
-- Date: 2024-11-16
-- ============================================

-- Suppression de la table si elle existe (ATTENTION: supprime toutes les données)
DROP TABLE IF EXISTS projects CASCADE;

-- ============================================
-- CRÉATION DE LA TABLE
-- ============================================
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  project_id VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'production',
  type VARCHAR(100),
  short_description TEXT,
  full_description TEXT,
  features JSONB,
  technologies JSONB,
  tags TEXT[],
  tech_stack TEXT[],
  highlights TEXT[],
  url VARCHAR(500),
  github_url VARCHAR(500),
  demo_url VARCHAR(500),
  homepage VARCHAR(500),
  image_url VARCHAR(500),
  language VARCHAR(100),
  category VARCHAR(100),
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- CRÉATION DES INDEX POUR PERFORMANCES
-- ============================================
CREATE INDEX idx_projects_project_id ON projects(project_id);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_language ON projects(language);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_order ON projects(order_index);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_tags ON projects USING GIN(tags);

-- ============================================
-- INSERTION DES PROJETS
-- ============================================

INSERT INTO projects (
  project_id,
  name,
  status,
  type,
  short_description,
  full_description,
  features,
  technologies,
  tags,
  tech_stack,
  highlights,
  url,
  github_url,
  demo_url,
  homepage,
  image_url,
  language,
  category,
  is_featured,
  order_index
) VALUES 

-- ============================================
-- PROJET 1: Application de Gestion des Salaires
-- ============================================
(
  'salaires-app',
  'Application de Gestion des Salaires',
  'production',
  'data-application',
  'Application interactive avec interface Streamlit permettant de filtrer et visualiser les données salariales.',
  'Application interactive de gestion des salaires développée avec Streamlit. Elle permet de calculer automatiquement les salaires mensuels avec heures supplémentaires, d''exporter les données en CSV, et d''afficher des statistiques par filiale et globales. Interface avec filtres dynamiques et visualisation des données avec Pandas.',
  '[
    "Calcul automatique des salaires mensuels avec heures supplémentaires",
    "Export des données en format CSV",
    "Interface interactive avec filtres (salaire, poste)",
    "Statistiques par filiale et globales",
    "Visualisation des données avec tableaux Pandas",
    "Gestion des heures supplémentaires (majoration 1.5x)"
  ]'::jsonb,
  '{
    "backend": ["Python 3.8+", "Pandas", "JSON"],
    "frontend": ["Streamlit", "Dataframes interactifs"],
    "tools": ["CSV Export", "Data Visualization"]
  }'::jsonb,
  ARRAY['Python', 'Streamlit', 'Pandas', 'JSON', 'CSV', 'Data Analysis'],
  ARRAY['Python', 'Streamlit', 'Pandas', 'JSON', 'CSV'],
  ARRAY[
    'Support de plusieurs filiales d''entreprise',
    'Gestion de différents postes (Chef de projet, Développeur, Testeur)',
    'Calcul du salaire moyen global : 7229,16€',
    'Interface trilingue (français)'
  ],
  'https://brief-simplon.streamlit.app/',
  'https://github.com/HardstyIe/brief_simplon_employee_data',
  'https://brief-simplon.streamlit.app/',
  'https://brief-simplon.streamlit.app/',
  '/assets/salaires.webp',
  'Python',
  'ai_data',
  true,
  1
),

-- ============================================
-- PROJET 2: DUCSMAN - Hôtel de Luxe Paris
-- ============================================
(
  'ducsman-hotel',
  'DUCSMAN - Hôtel de Luxe Paris',
  'production',
  'website',
  'Site vitrine pour un hôtel 5 étoiles fictif basé à Paris. Projet de groupe avec design élégant et responsive.',
  'Site vitrine complet pour un hôtel 5 étoiles fictif situé à Paris. Projet de groupe mettant l''accent sur une expérience utilisateur élégante, un design responsive, et une navigation fluide à travers plusieurs pages : accueil, chambres, contact, et services de l''hôtel. Utilisation de SASS pour une architecture CSS modulaire.',
  '[
    "Page d''accueil avec présentation de l''hôtel",
    "Galerie des chambres avec descriptions détaillées",
    "Formulaire de contact fonctionnel",
    "Navigation fluide entre les sections",
    "Design responsive pour tous les écrans",
    "Animations CSS élégantes"
  ]'::jsonb,
  '{
    "frontend": ["HTML5", "CSS3", "SASS", "JavaScript"],
    "design": ["Responsive Design", "Animations CSS"],
    "tools": ["Git", "GitHub", "Vercel"]
  }'::jsonb,
  ARRAY['HTML5', 'CSS3', 'SASS', 'JavaScript', 'Site Vitrine', 'Responsive'],
  ARRAY['HTML5', 'CSS3', 'SASS', 'JavaScript'],
  ARRAY[
    'Design moderne et élégant',
    'Architecture SASS modulaire',
    'Code HTML sémantique et accessible',
    'Optimisation des performances'
  ],
  'https://projet-groupe-ducman.vercel.app/',
  'https://github.com/HardstyIe/Projet-groupe-Ducman',
  'https://projet-groupe-ducman.vercel.app/',
  'https://projet-groupe-ducman.vercel.app/',
  '/assets/ducsman.webp',
  'JavaScript',
  'frontend',
  true,
  2
),

-- ============================================
-- PROJET 3: Application Météo
-- ============================================
(
  'weather-app',
  'Application Météo',
  'production',
  'web-application',
  'Application météo moderne permettant d''afficher les prévisions météorologiques actuelles avec géolocalisation automatique.',
  'Application météo moderne développée en JavaScript permettant d''afficher les prévisions météorologiques actuelles avec géolocalisation automatique de l''utilisateur et recherche manuelle de villes. Intégration avec l''API OpenWeather pour des données en temps réel. Interface intuitive et responsive.',
  '[
    "Affichage température actuelle et ressentie",
    "Géolocalisation automatique",
    "Recherche manuelle de villes",
    "Prévisions météo détaillées",
    "Interface moderne et intuitive",
    "Données en temps réel via OpenWeather API"
  ]'::jsonb,
  '{
    "frontend": ["JavaScript ES6+", "CSS3"],
    "api": ["OpenWeather API", "Geolocation API"],
    "deployment": ["Vercel"],
    "tools": ["Git"]
  }'::jsonb,
  ARRAY['JavaScript', 'OpenWeather API', 'Vercel', 'API REST'],
  ARRAY['JavaScript', 'OpenWeather API', 'CSS3'],
  ARRAY[
    'Appels API asynchrones',
    'Error handling et loading states'
  ],
  'https://weather-app-eight-sigma-31.vercel.app/',
  'https://github.com/HardstyIe/weather-app',
  'https://weather-app-eight-sigma-31.vercel.app/',
  'https://weather-app-eight-sigma-31.vercel.app/',
  '/assets/weather.webp',
  'JavaScript',
  'frontend',
  true,
  3
),

-- ============================================
-- PROJET 4: Devatopia - Agence Web
-- ============================================
(
  'devatopia',
  'Devatopia - Agence Web',
  'production',
  'website',
  'Refonte moderne du site vitrine d''une agence web spécialisée en développement mobile et web.',
  'Refonte complète du site vitrine d''une agence de développement web dans le cadre d''un projet de formation. En 2 semaines, j''ai modernisé et optimisé leur site existant en respectant leur identité UI/UX tout en améliorant les performances et l''expérience utilisateur. Le site présente les services de l''agence, l''équipe, et intègre un formulaire de contact fonctionnel.',
  '[
    "Design moderne et responsive",
    "Formulaire de contact avec envoi d''email (Nodemailer)",
    "Section présentation de l''équipe",
    "Présentation des services et technologies",
    "Galerie de projets réalisés",
    "Mentions légales et politique de confidentialité intégrées"
  ]'::jsonb,
  '{
    "frontend": ["SvelteKit", "TypeScript", "TailwindCSS", "DaisyUI"],
    "backend": ["Node.js", "Nodemailer"],
    "deployment": ["Vercel"],
    "tools": ["Vite", "PostCSS"]
  }'::jsonb,
  ARRAY['SvelteKit', 'TypeScript', 'TailwindCSS', 'DaisyUI', 'Nodemailer', 'Vercel'],
  ARRAY['SvelteKit', 'TypeScript', 'TailwindCSS', 'DaisyUI', 'Nodemailer'],
  ARRAY[
    'Refonte complète en 2 semaines',
    'Respect de l''identité UI/UX de l''agence',
    'Architecture SvelteKit moderne et performante',
    'Formulaire de contact avec validation et envoi d''email',
    'Design responsive et optimisé'
  ],
  'https://portfolio-deva.vercel.app/',
  'https://github.com/HardstyIe/portfolio-deva',
  'https://portfolio-deva.vercel.app/',
  'https://portfolio-deva.vercel.app/',
  '/assets/devatopia.webp',
  'TypeScript',
  'frontend',
  true,
  4
);

-- ============================================
-- VÉRIFICATION DES DONNÉES INSÉRÉES
-- ============================================
SELECT 
  project_id,
  name,
  language,
  category,
  is_featured,
  url
FROM projects
ORDER BY order_index;
