(function() {
  _.mixin({
    do_these: function(to_dos, callback) {
      var make_jobs_done, return_values;
      return_values = _.isArray(to_dos) ? [] : {};
      make_jobs_done = function(id) {
        return function(ret) {
          var all_done;
          return_values[id] = ret;
          all_done = true;
          _.each(to_dos, function(func, id) {
            if (!(id in return_values)) {
              all_done = false;
              return _.breakLoop();
            }
          });
          return all_done === true ? callback(return_values) : null;
        };
      };
      return _.each(to_dos, function(to_do, id) {
        var jobs_done;
        jobs_done = make_jobs_done(id);
        return to_do(jobs_done);
      });
    }
  });
}).call(this);
