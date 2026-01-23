/**
 *
 * @Name : MysqlExpressJs/app.js
 * @Version : 1.1
 * @Programmer : Max (fixed & stabilized)
 *
 */

const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const util = require('util')
const path = require('path')

const app = express()

/* ==========================
   DATABASE CONFIG
========================== */

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'nodeuser',
    password: 'Strong@123',
    database: 'asrez'
})

db.connect((err) => {
    if (err) {
        console.error('❌ MySQL connection failed:', err.message)
        process.exit(1)
    }
    console.log('✅ Connected to database')
})

const query = util.promisify(db.query).bind(db)

/* ==========================
   EXPRESS CONFIG
========================== */

app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'static')))
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* ==========================
   GLOBAL CONFIG
========================== */

const config = {
    site: 'http://localhost:8081/'
}

/* ==========================
   DATA FUNCTIONS
========================== */

const data = {
    countPosts: async () => {
        const rows = await query('SELECT COUNT(*) AS count FROM post')
        return rows[0].count
    },

    getPosts: async () => {
        const posts = await query('SELECT * FROM post ORDER BY id DESC')

        for (let i = 0; i < posts.length; i++) {
            posts[i].tags = await query(
                'SELECT * FROM post_tag WHERE post_id = ? ORDER BY id DESC',
                [posts[i].id]
            )
        }

        return posts
    }
}

/* ==========================
   ROUTES
========================== */

app.get('/', async (req, res) => {
    try {
        const totalPosts = await data.countPosts()
        const posts = await data.getPosts()

        res.render('main', {
            config,
            posts,
            totalPosts
        })
    } catch (err) {
        console.error('❌ Route error:', err)
        res.status(500).send('Internal Server Error')
    }
})

/* ==========================
   SERVER START
========================== */

const PORT = 8081
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 MysqlExpressJs App running on http://0.0.0.0:${PORT}`)
})

