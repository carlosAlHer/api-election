const { Voter } = require('../models');


const getAll = async (req, res) => {
    try {

        let { page, limit } = req.query;//se recibe la información de la paginacion por params
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 3;
        if( page < 1 || limit < 1)  return res.status(400).json({ error: "Page and limit must be positive numbers" });
        const offset = (page - 1) * limit;

        const { rows: voters, count: total } = await Voter.findAndCountAll({
            limit,
            offset
        });
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            totalVoters: total,
            totalPages,
            currentPage: page,
            pageSize: limit,
            voters
        });
    } catch (error) {
        res.status(500).json({ error: error.message, message:"Error when consulting voters"});
    }
};

const getById = async (req, res) => {
    try {
        const voter = await Voter.findByPk(req.params.id);
        if (!voter) return res.status(404).json({ error: 'Voter not found' });
        res.status(200).json(voter);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error getting voter' });
    }
};

const createVoter = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newVoter = await Voter.create({ name, email });
        res.status(201).json(newVoter);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error creating voter' });//
    }
};


const deleteVoter = async (req, res) => {
    try {
        const deleted = await Voter.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: 'Voter not found' });
        res.status(200).json({ message: 'Eliminated voter' });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error deleting voter' });
    }
};

module.exports = { getAll, getById, createVoter, deleteVoter}
