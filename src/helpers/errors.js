export default app => {
    app.use((err, req, res, next) => {
        console.log(err);
        res.status(err.statusCode).json(err);
    });
};