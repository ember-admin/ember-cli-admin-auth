module.exports = function(app) {
  var express = require('express');
  var appRouter = express.Router();
  users = [];
  avatars = [];
  for (i = 0; i < 50; i++) {
    avatars.push({id: i, thumb_url: 'http://media-cache-ak0.pinimg.com/236x/0c/e6/7f/0ce67fa7c94da77ab90877e65f3fda87.jpg', url: 'http://www.londra.us/Bristol_Castle.jpg'});
    users.push({id: i, name: 'testuser'+i, lat: 50, long: 40, zoom: 3, avatar_id: i, birthdate: new Date()});
  }
  users[0].email = 'test@example.com';
  appRouter.get('/users', function(req, res) {
    if (req.query.q) {
      return res.send({users: [users[0]], meta:{total: 1}, avatars: [avatars[0]]});
    }
    var perPage = +req.query.perPage;
    var page = +req.query.page;
    usersArray = users.slice((page-1)*perPage, page*perPage);
    if (req.query.sort) {
      usersArray.sort(function(prev,next) {
        if (prev[req.query.sort] < next[req.query.sort]) {
          return -1
        } else if (prev[req.query.sort] == next[req.query.sort]) {
          return 0
        } else {
          return 1
        }
      });
      if (!JSON.parse(req.query.orderAscending)) {
        usersArray.reverse();
      }
    }
    avatarsArray = avatars.slice((page-1)*perPage, page*perPage);
    res.send({users: usersArray, meta:{total: 50}, avatars: avatarsArray});
  });

  appRouter.get('/users/autocomplete', function(req, res){
    res.send(users);
  });

  appRouter.delete('/users/:id', function(req, res) {
    res.send({});
  });

  appRouter.get('/users/:id', function(req, res) {
    if(req.params.id === 'admin'){
      return res.send({user: {id: 1, name: 'Admin', lat: 50, long: 40, zoom: 3, avatar_id: 1}, avatars: [{id: 1, thumb_url: 'http://placehold.it/50x50', url: 'http://placehold.it/350x350'}]});
    }
    res.send({user: {id: req.params.id, name: 'testuser', lat: 50, long: 40, zoom: 3}});
  });

  appRouter.post('/users/sign_in', function(req, res) {
    res.send({user_token: 'token123456', user_email: 'test@example.com'});
  });

  appRouter.put('/users/:id', function(req, res) {
    res.send({user: {id: req.params.id, name: req.body.user.name, lat: req.body.user.lat, long: req.body.user.long, zoom: req.body.user.zoom}});
  });

  appRouter.post('/avatars', function(req, res) {
    res.send({avatar: {id: 1, thumb_url: 'http://media-cache-ak0.pinimg.com/236x/0c/e6/7f/0ce67fa7c94da77ab90877e65f3fda87.jpg', url: 'http://www.londra.us/Bristol_Castle.jpg'}});
  });

  app.use('/api', appRouter);
};
