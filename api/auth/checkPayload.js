module.exports = (req, res, next) => {
    const { email, password } = req.body;
    const valid = Boolean(email && password && typeof password === "string");
  
    if (valid) {
      next();
    } else {
      next({
        status: 422,
        message: 'Please provide email and password and the password shoud be alphanumeric',
      });
    }
  };
  