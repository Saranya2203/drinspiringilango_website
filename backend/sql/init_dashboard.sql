CREATE TABLE dashboard (
    id SERIAL PRIMARY KEY,
    blogs JSONB DEFAULT '[]',
    gallery JSONB DEFAULT '[]',
    testimonials JSONB DEFAULT '[]',
    materials JSONB DEFAULT '[]',
    brochures JSONB DEFAULT '[]',
    batchPassword TEXT DEFAULT '',
    passwordExpiry TIMESTAMP NULL,
    lastUpdated TIMESTAMP DEFAULT NOW()
);

INSERT INTO dashboard DEFAULT VALUES;
