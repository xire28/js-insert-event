(function(window, document, $) {
    var EVENT_NAME = 'insert',
        CLASS_NAME = 'js-insert-event',
        CLASS_NAME_SELECTOR = '.' + CLASS_NAME,
        ANIMATION_NAME = 'js-insert-animation',
        ANIMATION_EVENT_NAMES = ['animationstart', 'webkitAnimationStart', 'mozAnimationStart', 'MSAnimationStart', 'oanimationstart'],
        BODY_ANIMATION_CLASS_NAME = 'js-insert-animation-event',
        BODY_MUTATION_OBSERVER_CLASS_NAME = 'js-insert-mutation-observer',
        BODY_NODE_INSERTED_CLASS_NAME = 'js-insert-event',
        TIMER_INVERVAL = 50,
        BODY_TIMER_CLASS_NAME = 'js-insert-timer';

    function globalOrPrefixed(className){
      var prefixes = ['', 'WebKit', 'Moz', 'Ms', 'O'],
          klass;
      for(var i=0; !klass && i < prefixes.length; i++) {
        if(prefixes[i] + className in window) {
          klass = window[prefixes[i] + className];
        }
      }
      return klass;
    }

    function supportAnimationStart(){
      return !!globalOrPrefixed('AnimationEvent');
    }

    function useAnimationEvent(){
      $.each(ANIMATION_EVENT_NAMES, function(_, animationName){
        document.addEventListener(animationName, function(event){
            if(event.animationName == ANIMATION_NAME) $(event.target).trigger(EVENT_NAME);
        }, false);
      });

      $(function(){
        $(document.body).addClass(BODY_ANIMATION_CLASS_NAME);
      });
    }

    function supportMutationObserver(){
      return !!globalOrPrefixed('MutationObserver');
    }

    function useMutationObserver(){
      var MutationObserver = MutationObserverClass(),
          observer = new MutationObserver(function(mutations) {
            $.each(mutations, function(_, mutation){
              var newNodes = mutation.addedNodes;
              if(newNodes !== null) $(newNodes).filter(CLASS_NAME_SELECTOR).trigger(EVENT_NAME);
            })
          });

      observer.observe(document, {childList: true, subtree: true});
      $(function(){
        $(CLASS_NAME_SELECTOR).trigger(EVENT_NAME);
        $(document.body).addClass(BODY_MUTATION_OBSERVER_CLASS_NAME);
      })
    }

    function supportNodeInsertedEvent(){
      return !!document.addEventListener;
    }

    function useNodeInsertedEvent(){
      $(document).on('DOMNodeInserted', CLASS_NAME_SELECTOR, function(e){
         $(e.target).trigger(EVENT_NAME);
      })

      $(function(){
        $(CLASS_NAME_SELECTOR).trigger(EVENT_NAME);
        $(document.body).addClass(BODY_NODE_INSERTED_CLASS_NAME);
      });
    }

    function useTimer(){
      $(function(){
        var triggerInsert = function(){
          $(CLASS_NAME_SELECTOR).removeClass(CLASS_NAME).trigger(EVENT_NAME);
        };
        window.setInterval(triggerInsert, TIMER_INVERVAL);
        triggerInsert();
        $(document.body).addClass(BODY_TIMER_CLASS_NAME);
      });
    }

    if(supportAnimationStart()){
      // IE10+, Edge, Firefox 5+, Chrome 4+, Safari 4+, Opera 12.1+
      useAnimationEvent();
    } else if(supportMutationObserver()){
      // Mobile browsers
      useMutationObserver();
    } else if(supportNodeInsertedEvent()){
      // Every browsers except IE8-
      useNodeInsertedEvent();
    } else {
      // IE8-
      useTimer();
    }

})(window, document, jQuery);
