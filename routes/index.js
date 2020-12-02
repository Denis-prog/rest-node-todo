const columnRouter = require('./column/columnRouter');
const noteRouter = require('./note/noteRouter');
const userRouter = require('./user/userRouter');
const userDataRouter = require('./userData/userDataRoutes');
const authRouter = require('./auth/authRouter');

module.exports = {
    columnRouter,
    noteRouter,
    userRouter,
    userDataRouter,
    authRouter,
};
