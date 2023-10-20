const handleLogout = (req, res, next) => {
  res.clearCookie('jwt');
  res.json({
    message: 'logged out'
  })
};

module.exports = handleLogout;