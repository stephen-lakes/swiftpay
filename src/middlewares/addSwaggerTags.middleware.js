// middleware/addSwaggerTags.js
module.exports = (tag) => (req, res, next) => {
  if (!req.swaggerDoc) {
    req.swaggerDoc = {};
  }
  req.swaggerDoc.tags = [tag];
  next();
};
