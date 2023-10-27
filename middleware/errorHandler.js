const errorHandler = (err, req, res, next) => {
  console.log(err.message)
  res.sendStatus(500);
}

module.exports = errorHandler;