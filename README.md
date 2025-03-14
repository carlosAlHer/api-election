Este proyecto es una **API RESTful** para un sistema de votación donde:
- Los votantes (`Voter`) pueden registrarse y emitir un voto.
- Los candidatos (`Candidate`) reciben votos.
- Se protege la votación con **tokens JWT**.
- Se implementa **paginación** y **estadísticas de votación**.

  Tecnologías Utilizadas
- Backend Node.js, Express.js
- **Base de Datos: MySQL con Sequelize ORM
- Autenticación: JWT (jsonwebtoken)
- Gestión de Variables de Entorno: dotenv

 Requisitos Previos:
- [Node.js](https://nodejs.org/) (v16 o superior)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)
- Un cliente de API como [Postman](https://www.postman.com/) o `cURL`

  confi db: npx sequelize-cli db:migrate
  Inicio serve: npm start

End points:
const candidateRoutes = require('./routes/candidate.js');
router.get('/', candidateController.getAll);
router.get('/:id', candidateController.getById);
router.post('/', candidateController.createCandidate);
router.delete('/:id', candidateController.deleteCandidate);

const voterRoutes = require('./routes/voter.js');
router.get('/', voterController.getAll);
router.get('/:id', voterController.getById);
router.post('/', voterController.createVoter);
router.delete('/:id', voterController.deleteVoter);

const voteRoutes = require('./routes/vote.js')
router.post('/',checkAuth.auth, routerVote.createVote);
router.post('/auth', routerVote.generateTkVoter);
router.get('/statistics', routerVote.getStatistics);


Autor: carlos alvarez hernandez.

