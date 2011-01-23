_.mixin
  replaceBetween: (str, start, between, end) ->
    
    pos = str.indexOf start
    if pos is -1 then return str
    endpos = str.indexOf end, pos + start.length
    if endpos is -1 then return str
    return _.s(str, 0, pos + start.length) + between + _.s(str, endpos)
