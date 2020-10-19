CREATE USER caliper_cli;
CREATE DATABASE caliper_log WITH OWNER caliper_cli;
\c caliper_log;
\c - caliper_cli;

CREATE TABLE IF NOT EXISTS execution_logs
(
    id SERIAL PRIMARY KEY,
    translated INTEGER NOT NULL,
    failed INTEGER NOT NULL,
    last_id INTEGER NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS failed_logs
(
    id SERIAL PRIMARY KEY,
    execution_id INTEGER,
    model VARCHAR(32) NOT NULL,
    model_id TEXT NOT NULL,
    FOREIGN KEY (execution_id) REFERENCES execution_logs(id)
);

