const authenticateToken = (request, response, next) => {
  const token = request.header("Authorization");
  if (!token) return response.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return response.status(403).json({ error: "Invalid Token" });

    request.user = user; // Attach user info to the request
    next();
  });
};

module.exports = authenticateToken;
