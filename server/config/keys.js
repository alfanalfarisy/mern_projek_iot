module.exports = {
  mongoURI: "mongodb://projek20:projek20@localhost/siagabanjir?replicaSet=rs0",
  secretOrKey: "projek20"
};

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production' 
  ? process.env.CLIENT_ORIGIN
  : 'http://localhost:4000'