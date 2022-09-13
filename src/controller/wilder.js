const dataSource = require('../utils').dataSource
const Skill = require('../entity/Skill')
const Wilder = require('../entity/Wilder')

module.exports = {
	create: async (req, res) => {
		try {
			await dataSource.getRepository(Wilder).save(req.body)
			res.status(201).send('Wilder Created !')
		} catch (error) {
			console.error('Error ->', error)
			res.status(500).send(`Error while creating Wilder : ${error}`)
		}
	},
	findAll: async (req, res) => {
		try {
			const wilders = await dataSource.getRepository(Wilder).find()
			if (wilders.length > 0) {
				res.status(200).send(wilders)
			} else {
				res.status(404).send('No Wilders found ...')
			}
		} catch (error) {
			console.error(error)
			res.status(500).send(`Error fetching Wilders : ${error}`)
		}
	},
	update: async (req, res) => {
		try {
			const { id, name } = req.body
			const wilderToUpdate = await dataSource
				.getRepository(Wilder)
				.findOneBy({ id: id })
			if (wilderToUpdate === null) {
				res.status(404).send('Wilder Not found')
			} else {
				try {
					const updatedWilder = await dataSource
						.getRepository(Wilder)
						.save(req.body)
					//.update(id, { name: name })
					res.status(200).send(updatedWilder)
				} catch (error) {
					res.status(500).send(
						`An error occured updating Wilder : ${error}`
					)
				}
			}
		} catch (error) {
			console.error(error)
			res.status(500).send(`Error while updating Wilder : ${error}`)
		}
	},
	addSkill: async (req, res) => {
		try {
			const { id, skillName } = req.body
			const wilderToUpdate = await dataSource
				.getRepository(Wilder)
				.findOneBy({ id: id })
			if (wilderToUpdate === null) {
				res.status(404).send('Wilder Not found')
			} else {
				const skillToAdd = await dataSource
					.getRepository(Skill)
					.findOneBy({ name: skillName })
				console.log(skillToAdd)
				if (skillToAdd === null) {
					res.status(404).send('Skill not found.')
				} else {
					wilderToUpdate.skills = [
						...wilderToUpdate.skills,
						skillToAdd,
					]
					const updatedWilder = await dataSource
						.getRepository(Wilder)
						.save(wilderToUpdate)
					res.status(200).send(updatedWilder)
				}
			}
		} catch (error) {
			console.error(error)
			res.status(500).send(
				`Error while adding skill to Wilder : ${error}`
			)
		}
	},
	delete: async (req, res) => {
		try {
			const { id } = req.body
			const deletedWilder = await dataSource
				.getRepository(Wilder)
				.delete(id)
			console.log(deletedWilder)
			if (deletedWilder.affected === 0)
				res.status(404).send('Could not delete. Wilder not found')
			res.status(202).send('Wilder deleted successfully')
		} catch (error) {
			console.error(error)
			res.status(500).send(`Error while deleting Wilder : ${error}`)
		}
	},
}
