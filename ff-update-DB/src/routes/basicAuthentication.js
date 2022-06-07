module.exports = async (req, res, next) => {
  try {
    // check for basic auth header
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf("Basic ") === -1
    ) {
      return res.status(401).json({ message: "Missing Authorization Header" });
    }

    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );

    const [username, password] = credentials.split(":");
    // check if credentials are valid
    if (
      username !== process.env.AUTH_USERNAME ||
      password !== process.env.AUTH_PASSWORD
    ) {
      return res
        .status(401)
        .json({ message: "Invalid Authentication Credentials" });
    }
    // go to next middleware
    next();
  } catch (e) {
    res.status(411).send({ error: "Please authenticate." });
  }
};
