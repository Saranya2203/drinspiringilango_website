CREATE TABLE IF NOT EXISTS social_posts (
id SERIAL PRIMARY KEY,
platform TEXT NOT NULL,
caption TEXT,
media_url TEXT,
post_url TEXT NOT NULL,
created_at TIMESTAMP DEFAULT NOW()
);