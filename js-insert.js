(function(window, document, $) {
    var EVENT_NAME = 'insert',
        CLASS_NAME = 'js-insert',
        CLASS_NAME_SELECTOR = '.' + CLASS_NAME,
        ANIMATION_NAME = 'js-insert-animation',
        ANIMATION_EVENT_NAMES = ['animationstart', 'MSAnimationStart', 'webkitAnimationStart'],
        BODY_ANIMATION_CLASS_NAME = 'js-insert-animation-event',
        BODY_MUTATION_OBSERVER_CLASS_NAME = 'js-insert-mutation-observer',
        BODY_NODE_INSERTED_CLASS_NAME = 'js-insert-event',
        TIMER_INVERVAL = 50,
        BODY_TIMER_CLASS_NAME = 'js-insert-timer';

    function supportAnimationStart(){
      return !!window.AnimationEvent;
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
      return !!MutationObserverClass();
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

    function MutationObserverClass(){
      var prefixes = ['', 'WebKit', 'Moz', 'O', 'Ms']
      for(var i=0; i < prefixes.length; i++) {
        if(prefixes[i] + 'MutationObserver' in window) {
          return window[prefixes[i] + 'MutationObserver'];
        }
      }
      return false;
    };

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
      // IE11+, Edge 13+, Firefox 47+, Chrome 49+, Safari 9.1+, Opera 39+, IOS Safari 9.2+, Android Browser 4.4+, Chrome for Android 51+
      useAnimationEvent();
    } else if(supportMutationObserver()){
      // Edge 12+, Firefox 46+, Safari 8+, Opera 36+, IOS Safari 8.1+, Blackberry browser 10+, Opera Mobile 37+, Firefox for Android 51+, IE Mobile 11+
      useMutationObserver();
    } else if(supportNodeInsertedEvent()){
      //  Not supported by IE8-
      useNodeInsertedEvent();
    } else {
      // IE8-
      useTimer();
    }

})(window, document, jQuery);
