/**
 * @overview
 *
 * @author
 * @version 2013/07/25
 */

var cfg = {
  "mail": {
    "user": process.env.emailuser
    "password" : process.env.emailpwd
  },
  receiver: process.env.receiver
};

module.exports = cfg;

