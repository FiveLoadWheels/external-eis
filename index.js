var express = require('express');
var app = express();
var verbose = process.env.NODE_ENV != 'test';

app.map = function (a, route) {
  route = route || '';
  for (var key in a) {
    switch (typeof a[key]) {
      // { '/path': { ... }}
      case 'object':
        app.map(a[key], route + key);
        break;
      // get: function(){ ... }
      case 'function':
        if (verbose) console.log('%s %s', key, route);
        app[key](route, a[key]);
        break;
    }
  }
};

var product = {
  list: function (req, res) {

  },
  show: function (req, res) {

  }
}

var user = {
  show: function (req, res) {

  },

  login: function (req, res) {

  },

  register: function (req, res) {

  }
}

var cart = {
  show: function (req, res) {

  },
  addItem: function (req, res) {

  },
  delItem: function (req, res) {

  }
}

var order = {
  list: function (req, res) {

  },
  show: function (req, res) {

  }
}

app.map = ({
  '/user': {
    '/:uid': {
      get: user.show,
      'order': {
        get: order.list,
        '/:pid': {
          get: order.show
        }
      }// order
    },
    '/login': {
      post: user.login
    },
    '/register': {
      post: user.register
    }
  },//user

  '/product': {
    get: product.list,
    '/:pid': {
      get: product.show,
      '/cart': {
        get: cart.show,
        '/add_item': {
          get: cart.addItem,
        },
        '/del_item': {
          get: cart.delItem
        }
      }
    }
  },// product

});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});