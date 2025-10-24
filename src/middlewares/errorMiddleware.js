const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const bodyStatus = statusCode >= 500 ? 'error' : 'fail';

    res.status(statusCode).json({
        status: bodyStatus,
        message: err.message || 'Internal Server Error',
    });
}