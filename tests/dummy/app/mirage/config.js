export default function() {
  this.namespace = 'api';

  this.get('/users', function(db, req) {
    let users = db.users;
    let avatars = db.avatars;
    if (req.queryParams.q) {
      return {
        users: [users[0]],
        meta: {
          total: 1
        },
        avatars: [avatars[0]]
      };
    }
    var perPage = +req.queryParams.perPage;
    var page = +req.queryParams.page;
    let usersArray = users.slice((page - 1) * perPage, page * perPage);
    if (req.queryParams.sort) {
      let sort = req.queryParams.sort;
      usersArray.sort(function(prev, next) {
        if (prev[sort] < next[sort]) {
          return -1;
        } else if (prev[sort] === next[sort]) {
          return 0;
        } else {
          return 1;
        }
      });
      if (!JSON.parse(req.queryParams.orderAscending)) {
        usersArray.reverse();
      }
    }
    let avatarsArray = avatars.slice((page - 1) * perPage, page * perPage);
    return {
      users: usersArray,
      meta: {
        total: 50
      },
      avatars: avatarsArray
    };
  });

  this.get('/users/autocomplete', 'users');

  this.del('/users/:id', 'user');
  this.get('/users/:id', function(db, req) {
    let user = db.users.find(req.params.id);
    let avatar = db.avatars.find(req.params.id);
    return {user: user, avatars: [avatar]};
  });
  this.put('/users/:id', 'user');
  this.post('/users', 'user');


  this.put('/avatars/:id', 'avatar');
  this.post('/avatars', 'avatar');

  this.post('/users/sign_in', function() {
    return {token: 'token123456', email: 'test@example.com', id: "1"};
  });

}
