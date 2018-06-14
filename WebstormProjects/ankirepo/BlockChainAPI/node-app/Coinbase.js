const coinbase = require('coinbase');

var client = new coinbase.Client({'accessToken': "60e0deb50c36ab59c6c63b893d772da9b0c08d8dce61aee3da4a9eceb0556e5c", 'refreshToken': "1546f1238c1f9d6bdec70be5eac9b5c0b62c99e2b19f74b7286639c283e2db10"});

client.getAccounts({}, function(err, accounts) {
   console.log("accounts:", err);
});