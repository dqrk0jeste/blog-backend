const handleLogout = (req, res, next) => {
  res.json({
    message: 'logged out'
  })
};

module.exports = handleLogout;