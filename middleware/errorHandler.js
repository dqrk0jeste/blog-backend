const errorHandler = (err, req, res, next) => {
  //console.error(err.message)
  res.sendStatus(500);
}

module.exports = errorHandler;