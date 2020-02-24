module.exports = {
  checkValidSession: (req, res, next) => {
    if (req.headers.authorization !== undefined) {
      next();
    } else {
      res.json({ forbidden: true })
    }
  }
};