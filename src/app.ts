import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json';
import { UserControllerFactory } from './modules/user/user.factory';

const app = express();
const port = 3000;


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const userController = UserControllerFactory.create();

app.use('/user', userController.router());

app.get('/', (req, res) => {
    res.send('Ok');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
