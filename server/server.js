const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

app.get('/counter', async (req, res) => {
    try {
        const result = await pool.query('SELECT value FROM counter LIMIT 1');
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка получения счётчика' });
    }
});

app.post('/counter/increment', async (req, res) => {
    try {
        const result = await pool.query('UPDATE counter SET value = value + 1 RETURNING value');
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка обновления счётчика' });
    }
});

const serverPort = process.env.SERVER_PORT;
app.listen(serverPort, async () => {
    try {
        // Выполняем SQL-запрос для создания таблицы, если она не существует
        await pool.query(`
            CREATE TABLE IF NOT EXISTS counter (
                value INTEGER NOT NULL DEFAULT 0
            );
        `);
        console.log('База данных успешно инициализирована.');
    } catch (error) {
        console.error('Ошибка при инициализации базы данных:', error);
    }
    console.log(`Сервер запущен на http://localhost:${serverPort}`);
});
