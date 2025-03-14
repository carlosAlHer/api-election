Este proyecto es una **API RESTful** para un sistema de votación donde:
- Los votantes (`Voter`) pueden registrarse y emitir un voto.
- Los candidatos (`Candidate`) reciben votos.
- Se protege la votación con **tokens JWT**.
- Se implementa **paginación** y **estadísticas de votación**.

  Tecnologías Utilizadas
- Backend Node.js, Express.js
- Base de Datos: MySQL con Sequelize ORM
- Autenticación: JWT (jsonwebtoken)
- Gestión de Variables de Entorno: dotenv

 Requisitos Previos:
- [Node.js](https://nodejs.org/) (v16 o superior)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)
- Un cliente de API como Postman) o Insomnia

  confi db: npx sequelize-cli db:migrate
  Inicio serve: npm start

End points:
/election/voter -> POST, crea voter, body json con name, email.
/election/voter -> GET, obtiene lista de voters.
/election/voter/id_voter -> GET, obtiene datos de voter.
/election/voter/id_voter -> DELETE 

/election/candidate -> POST, crea candidate, body json con name, party(optional).
/election/candidate -> GET, obtiene lista de candidate.
/election/candidate/id_candidate -> GET, obtiene datos de candidate.
/election/candidate/id_candidate -> DELETE 

/election/vote/auth -> POST, crea token necesario para realizar votación, body json con id_voter.
/election/vote -> POST, crea vote, body json con id_voter, id_candidate. en la cabecera en Authorization se ingresa el token generado en el end point auth.
/election/vote/statistics -> GET, obtiene datos stadisticos.



Autor: carlos alvarez hernandez.

