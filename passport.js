const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');
const User = require('./models/user');

// Configurazione della strategia di autenticazione di Twitter
passport.use(
  new TwitterTokenStrategy(
    {
      consumerKey: 'RlA1fCNERODv6XX08RyEX3Naa',
      consumerSecret: 'aVNJjmQ7cTlQNma51SrtdcVPYUWJ4xlmgHX7z1osfcoTXkCBWC'
    },
    async (accessToken, profile, done) => {
      try {
        const user = await User.findOne({ twitterId: profile.id });

        if (!user) {
          const newUser = new User({
            twitterId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            image: profile.photos[0].value,
            accessToken: accessToken,
          });
          await newUser.save();
          done(null, newUser);
        } else {
          done(null, user);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

// Serializzazione e deserializzazione dell'utente
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
