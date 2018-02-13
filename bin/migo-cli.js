// Generated by ToffeeScript 1.6.3-4
(function() {
  var VERSION, conf, data, err, fs, m, migo, ok, opt,
    _this = this;

  fs = require('fs');

  migo = require('..');

  ok = migo.ok;

  VERSION = '0.1.1';

  opt = require('node-getopt').create([['c', 'conf=CONFILE', 'configure file'], ['h', 'help']]).bindHelp("migo v" + VERSION + " - PostgreSQL Database Migration\n\nUsage:\n  migo.js [OPTION] MIGOFILE [VERSION]\n\nOptions:\n[[OPTIONS]]\n\nMore help on https://github.com/jiangmiao/migo").parseSystem();

  conf = opt.options.conf;

  if (conf == null) {
    conf = 'migo.conf';
  }

  fs.readFile(conf, 'UTF-8', function() {
    err = arguments[0], data = arguments[1];
    ok(err);
    conf = {};
    data.replace(/^(.*?)=(.*)/m, function(_, k, v) {
      k = k.trim();
      v = v.trim();
      return conf[k] = v;
    });
    m = migo.init(conf);
    if (!opt.argv[0]) {
      ok("MIGOFILE is missing");
      process.exit(1);
    }
    m.parseFile(opt.argv[0], function() {
      m.migrate(opt.argv[1], function() {
        return migo.close();
      });
    });
  });

}).call(this);
