const { Vote, Candidate, Voter } = require('../models');

const createVote = async (req, res) => {

    const { voter_id, candidate_id } = req.body;
    try {

        //verificar existencia del voter y si emitió su voto previamente
        const voter = await Voter.findByPk(voter_id);
        if (!voter) {
            return res.status(404).json({ error: "Voter does not exist." });
        }

        if (voter.has_voted) {
            return res.status(400).json({ error: "This voter has already cast his vote." });
        }

        //verificar si el id candidate es valido
        const candidate = await Candidate.findByPk(candidate_id);
        if (!candidate) {
            return res.status(404).json({ error: "Candidate does not exist." });
        }

      
        await Vote.create({ voter_id, candidate_id });//registro voto
        await Voter.update({ has_voted: true }, { where: { id: voter_id } });//acturalización del campo has_voted a true
        await Candidate.increment('votes', { by: 1, where: { id: candidate_id } });//actuza el número de votos del candidato

        return res.status(201).json({ message: "Vote registered correctly." });

    } catch (error) {
        return res.status(500).json({ error: "Error when casting vote" });
    }
}

const getStatistics = async (req, res) =>{

    try {
        
        const totalVotersVoted = await Voter.count({ where: { has_voted: true } });//votantes que an votado
        const votesCandidate = await Candidate.findAll({
            attributes: ['name', 'votes'],
            order: [['votes', 'DESC']]
        });//numero de votos por candidato

        const totalVotes = await Vote.count();
        const candidatesPercent =  votesCandidate.map(candidate => {
            const percentage = totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(2) : 0;
            return {
               
                name: candidate.name,
                party: candidate.party,
                percentage: `${percentage}%`
            };
        })

        return res.status(200).json({
            totalVotersVoted,
            votesCandidate,
            candidatesPercent
        })
        
        
    } catch (error) {
        
    }
}

module.exports = { createVote, getStatistics }