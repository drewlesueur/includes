(function() {
  window.xml_to_obj = function(xml, callback) {
    var current, last_parent, obj, parser;
    obj = {};
    obj.children = [];
    current = obj.children;
    parser = sax.parser;
    parser.onerror = function() {
      return alert("there was an error");
    };
    last_parent = obj;
    parser.onopentag = function(node) {
      node.children = [];
      current.push(node);
      last_parent = node;
      return (current = node.children);
    };
    parser.onclosetag = function(node) {
      obj = last_parent;
      return (current = obj.children);
    };
    return (parser.onend = function() {
      return callback(obj);
    });
  };
}).call(this);
