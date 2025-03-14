const { Voter } = require('../models');


const getAll = async (req, res) => {
    try {
        const voters = await Voter.findAll();
        res.status(200).json(voters);
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
