(function() {
  _.mixin({
    replaceBetween: function(str, start, between, end) {
      var endpos, pos;
      pos = str.indexOf(start);
      if (pos === -1) {
        return str;
      }
      endpos = str.indexOf(end, pos + start.length);
      if (endpos === -1) {
        return str;
      }
      return _.s(str, 0, pos + start.length) + between + _.s(str, endpos);
    }
  });
}).call(this);
