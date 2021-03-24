import winston from 'winston'

const errorHandler = function(err, req, res, next) {
  winston.error(err.messege, err);
  res.status(500).send("Something went wrong.")
}

export default errorHandler;