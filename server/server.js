const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST || 'postgres',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
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
        const result = await pool.query(`
            UPDATE counter 
            SET value = value + 1 
            RETURNING value
        `);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка обновления счётчика' });
    }
});

const serverPort = process.env.SERVER_PORT;
app.listen(serverPort, async () => {
    isConnected = false;
    timeSeconds = 5;
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    while(!isConnected) {
        try {
            await pool.connect();
            isConnected = true;
            console.log('Успешное подключение к БД.');
        } catch (error) {
            console.error(`Не удаётся подключится к БД. Повторное подключение через ${timeSeconds} секунд.`);
            await delay(timeSeconds*1000);
        }
    }

    try {
        // Выполняем SQL-запрос для создания таблицы, если она не существует
        await pool.query(`
            CREATE TABLE IF NOT EXISTS counter (
                value INTEGER NOT NULL DEFAULT 0
            );
        `);
        await pool.query(`
            INSERT INTO counter (value)
            SELECT 0
            WHERE NOT EXISTS (SELECT 1 FROM counter)
        `)
        console.log('БД успешно инициализирована.');
    } catch (error) {
        console.error('Ошибка при инициализации БД.\n', error);
    }
    console.log(`Сервер запущен на http://localhost:${serverPort}`);
});
