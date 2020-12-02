const express = require('express');
const config = require('./config/index');
const database = require('./config/database');

const app = express();

const routers = require('./routes/index');

config.express(app);

routers.authRouter(app);
routers.userDataRouter(app);
routers.userRouter(app);
routers.columnRouter(app);
routers.noteRouter(app);


database()
    .then((info) => {
        console.log(`${info.host}:${info.port}:${info.name}`);
        app.listen(config.app.PORT, () => console.log(`твой порт ${config.app.PORT}`));
    })
    .catch((error) => {
        console.log(error);
    });
