# Js-insert-event
Cross-browser node insert event

## Requirements
- JQuery (1.8.x or higher) or zepto

## Browser support

Several methods are used to provide cross-browser support:

- Insert animation event ([fastest](http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted/)): IE10+, Edge, Firefox 5+, Chrome 4+, Safari 4+, Opera 12.1+
- Mutation observer
- Node inserted event: Every browsers except IE8-
- Timer: IE8-

## Usage
Add the class `js-insert-event` to any node and a bubbling `insert` event will be triggered when inserted in the DOM.

## Example
```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="js-insert.css">
  </head>
  <body>
    <input type="date" class="js-insert-event js-date"/>
    <script src="jquery.js"></script>
    <script src="js-insert.js"></script>
    <script>
      $(document).on('insert', '.js-date', function(){
        $(this).datepicker();
      });
    </script>
  </body>
<html>
```
