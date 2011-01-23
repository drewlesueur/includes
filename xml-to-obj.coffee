# requires sax
window.xml_to_obj = (xml, callback) ->
  obj = {}

  obj.children = []
  current = obj.children
  parser = sax.parser
  parser.onerror = () ->
    alert "there was an error"

  last_parent = obj

  parser.onopentag = (node) ->
    node.children = []
    current.push node
    last_parent = node
    current = node.children
  parser.onclosetag = (node) ->
    obj = last_parent
    current = obj.children
    
  parser.onend = () ->
    callback obj

    
