require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');
const mongoose = require('mongoose');
const User = require('../models/user');

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  session({
    secret: 'somesecret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Connessione al database MongoDB
mongoose
  .connect("mongodb+srv://alessandrodecastiglione:Aledeca1992@cluster0.i8evfyz.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err));

// Configurazione della strategia di autenticazione di Twitter
passport.use(
  new TwitterTokenStrategy(
    {
      consumerKey: "RlA1fCNERODv6XX08RyEX3Naa",
      consumerSecret: "aVNJjmQ7cTlQNma51SrtdcVPYUWJ4xlmgHX7z1osfcoTXkCBWC"
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

// Rotte API

// Ottenere un tweet casuale
app.get('/api/tweets/random', async (req, res) => {
  try {
    // Esegui la logica per ottenere un tweet casuale utilizzando le API di Twitter e l'access token dell'utente autenticato

    res.status(200).json({ content: 'Random tweet content', user: 'random_user' });
  } catch (error) {
    console.error('Error fetching random tweet:', error);
    res.status(500).json({ error: 'Error fetching random tweet' });
  }
});

// Creare un nuovo tweet
app.post('/api/tweets', async (req, res) => {
  const { content } = req.body;

  try {
    // Esegui la logica per creare un nuovo tweet utilizzando l'access token dell'utente autenticato

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error creating tweet:', error);
    res.status(500).json({ success: false, error: 'Error creating tweet' });
  }
});
// Rotta per iniziare l'autenticazione con Twitter
app.get('/api/auth/twitter', (req, res, next) => {
  passport.authenticate('twitter-token', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

// Rotta di callback per l'autenticazione con Twitter
app.get(
  '/api/auth/twitter/callback',
  passport.authenticate('twitter-token', { session: false }),
  function(req, res) {
    // Autenticazione riuscita, puoi eseguire le azioni desiderate qui
    res.json(req.user);
  }
);

// Avvio del server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
