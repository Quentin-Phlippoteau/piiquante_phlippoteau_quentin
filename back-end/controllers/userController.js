const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));

  };

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));

  };













  ///// ******************************************



//  app.post('/api/auth/signup', (req, res, next) => {
//     delete req.body._id;
//     const user = new user({
//       ...req.body
//     });
//     user.save()
//       .then(() => res.status(201).json({ message: 'votre compte est créé !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

//   app.use('/api/auth/signup', (req, res, next) => {
//     user.find()
//       .then(user => res.status(200).json(user))
//       .catch(error => res.status(400).json({ error }));
//   });


