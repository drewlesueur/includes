function draggable(i, options) {
  i = $(i)
  i.mousedown(function(e){
      if (options.start) {
          options.start(i)
        }
      e.preventDefault();            
      /*var was_selected = is_selected(i);
      if (!was_selected) {
          make_selected(i);
      }*/
      var moved = 0; //weather the user has moved the mouse 
      e.stopPropagation();
      var targetX = e.pageX - $(this).offset().left   //todo: more standard way of target?
      var targetY = e.pageY - $(this).offset().top
      
      /*
      var other_selecteds = [];
      selecteds().each(function(index){
          other_selecteds.push({
              targetX : e.pageX - $(this).offset().left,
              targetY : e.pageY - $(this).offset().top,
              el : $(this)
          }) 
      })
      */
      
      
      function body_move(e) {
        moved = 1
        if (options.drag) {
          options.drag(i);
        }
        /*
        if (was_selected == false) {
            make_selected(i)
            other_selecteds = [];
        }
        */
        i.css({left: e.pageX - ($('#page').offset().left + targetX)  + 'px', top: e.pageY - targetY + 'px'})
        
        /*
        var group
        for (var index in other_selecteds) {
           group = other_selecteds[index];
           group.el.css({left: e.pageX - ($('#page').offset().left + group.targetX)  + 'px', top: e.pageY - group.targetY + 'px'})
        }
        */
      }
      function mouseup_func(e){
        $(document.body).unbind('mousemove', body_move)
        $(document.body).unbind('mouseup', mouseup_func) //get rid of the mouseup func
        /*if (was_selected) {                    
            if (moved == 0) {
                make_selected(i)
            } else if (was_selected == false){
                
            }
        }
        */
        if (options.stop) {
          options.stop(i)
        }
      }
      $(document.body)
          .mousemove(body_move)
          .mouseup(mouseup_func);
  })
  return i;
}