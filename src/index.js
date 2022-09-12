const express = require('express')
const typeorm = require('typeorm')

const app = express()
const port = 3000

const dataSource = new typeorm.DataSource({
	type: 'sqlite',
	database: './wildersdb.sqlite',
	synchronize: true,
	entities: [require('./entity/Wilder')],
})

app.get('/', (req, res) => {
	res.send('Hello World!')
})

const start = async () => {
	await dataSource.initialize()
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
	})
}

start()
