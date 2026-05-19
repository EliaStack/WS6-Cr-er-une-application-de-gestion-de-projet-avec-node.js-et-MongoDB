const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require('supertest');
const app = require("../app");

jest.mock('../middleware/auth', () => { //Sert à bypass ce qui gène en gavant les fcts
    return (req, res, next) => {
        req.user = { userId: '68af615bf89e7453e0bd7d64' };
        next();
    }
});

const app = require("../app");

let mongoServer;

beforAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'test' });
})


afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
})

//////////////////////////////////////////////////////////////////////////////////
describe('POST /projects/:id/like', () => { //Nom de la méthode et la route testée
    //Regroupement des tests

    ///////////////// CONFIGURATION DU TEST ///////////////////
    it('Like un projet', async () => {
        const projectResponse = await request(app) //app nom de l'application
            .post('/api/projects') //Création du projet
            .send({ title: 'Mon projet' }) //Donner à tester
            .set('Authorization', 'Bearer token');
        const projectId = projectResponse.body._id;
        ////////////////////////////////////////////////////////////

        ///////////////// SCENARIO DU TEST ///////////////////
        const res = await request(app)
            .post('/api/projects/' + projectId + '/like')
            .set('Authorization', 'Bearer token');
        ////////////////////////////////////////////////////////////

        expect(res.statusCode).toBe(200);
        expect(res.body.likes).toHaveLength(1);
    });

});

