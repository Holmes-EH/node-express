module.exports = {
	create: (req, res) => {
		console.log(req.body)
		res.send('Got request from client')
	},
}
