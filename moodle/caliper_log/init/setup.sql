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

CREATE TABLE IF NOT EXISTS scorm_scoes_track_execution_logs
(
    id SERIAL PRIMARY KEY,
    translated INTEGER NOT NULL,
    failed INTEGER NOT NULL,
    last_id INTEGER NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS scorm_scoes_track_failed_logs
(
    id SERIAL PRIMARY KEY,
    execution_id INTEGER,
    model VARCHAR(32) NOT NULL,
    model_id TEXT NOT NULL,
    FOREIGN KEY (execution_id) REFERENCES scorm_scoes_track_execution_logs(id)
);
