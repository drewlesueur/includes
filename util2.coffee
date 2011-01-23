# Drew LeSueur @drewlesueur
# An abstraction for calling multiple asynchronous
# functions at once, and calling a callback 
# with the "return values" of all functions
# when they are all done.
# requires underscore.js

_.mixin # underscore.js mixin
  do_these: (to_dos, callback) ->
    return_values = if _.isArray(to_dos) then [] else {}
    make_jobs_done = (id) ->
      return (ret) ->
        return_values[id] = ret
        all_done = true
        _.each to_dos, (func, id) ->
          if not(id of return_values)
            all_done = false
            _.breakLoop()
        if all_done is true
          callback(return_values)
    _.each to_dos, (to_do, id) ->
      jobs_done = make_jobs_done(id)
      to_do(jobs_done)

##  Example usage
# get_pics = (done) ->
#   API.getPictures "houses", (urls) ->
#     done urls
#
# get_videos = (done) ->
#   API2.login, "user", "password", (access) ->
#     access.getVideos (videos) ->
#       done videos
#           
# _.do_these [get_pics, get_videos], (ret) ->
#   console.log "pics are", ret[0]
#   console.log "videos are", ret[1]
#
##  OR 
#
# _.do_these {pics: get_pics, videos: get_videos}, (ret) ->
#   console.log "pics are ", ret.pics
#   console.log "videos are", ret.videos
#
