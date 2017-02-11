# Js-insert
Cross-browser node insert event

## Requirements
- JQuery 1.8.x or higher

## Browser support

Several methods are used to provide cross-browser support:

- Insert animation event ([fastest](http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted/)): IE11+, Edge 13+, Firefox 47+, Chrome 49+, Safari 9.1+, Opera 39+, IOS Safari 9.2+, Android Browser 4.4+, Chrome for Android 51+
- Mutation observer: Edge 12+, Firefox 46+, Safari 8+, Opera 36+, IOS Safari 8.1+, Blackberry browser 10+, Opera Mobile 37+, Firefox for Android 51+, IE Mobile 11+
- Node inserted event: Every browser except IE8-
- Timer: IE8-

## Usage
Add the class `js-insert` to any node and a bubbling `insert` event will be triggered when inserted.

## Example
```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="js-insert.css">
  </head>
  <body>
    <input type="date" class="js-insert js-date"/>
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
