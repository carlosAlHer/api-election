const { Candidate } = require('../models');


const getAll = async (req, res) => {
    try {

        let { page, limit } = req.query;//se recibe la información de la paginacion por params
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 3;
        if( page < 1 || limit < 1)  return res.status(400).json({ error: "Page and limit must be positive numbers" });
        const offset = (page - 1) * limit;

        const { rows: candidates, count: total } = await Candidate.findAndCountAll({
            limit,
            offset
        });

        const totalPages = Math.ceil(total / limit);
     
        res.status(200).json({
            totalCandidates: total,
            totalPages,
            currentPage: page,
            pageSize: limit,
            candidates
        });
    } catch (error) {
        res.status(500).json({ error: error.message, message:"Error when consulting candidate"});
    }
};

const getById = async (req, res) => {
    try {
        const candidate = await Candidate.findByPk(req.params.id);
        if (!candidate) return res.status(404).json({ error: 'Candidate not found' });
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error getting candidate' });
    }
};

const createCandidate = async (req, res) => {
    try {
        const { name, party } = req.body;
        const newCandidate = await Candidate.create({ name, party });
        res.status(201).json(newCandidate);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error creating candidate' });//
    }
};


const deleteCandidate = async (req, res) => {
    try {
        const deleted = await Candidate.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: 'Candidate not found' });
        res.status(200).json({ message: 'Eliminated candidate' });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error deleting candidate' });
    }
};

module.exports = { getAll, getById, createCandidate, deleteCandidate}
