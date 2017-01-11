module.exports = {
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost/vanc-app',
  secret: process.env.SECRET || 'wow this is secret.'
};
