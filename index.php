<html>
<head>
    <title>Link Demo</title>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" ></script>
  <script src="jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js" ></script>
  <script src="jquery-ui-1.10.3.custom/development-bundle/ui/minified/jquery.ui.core.min.js" type="text/javascript"></script>
  <script src="jquery-ui-1.10.3.custom/development-bundle/ui/minified/jquery.ui.widget.min.js" type="text/javascript"></script>
  <script src="controls.js"></script>
  <link rel="stylesheet" href="link.css">
</head>
<body>
<div id="screen">
    <div id="screen-dummy"></div>
      <header></header>
      <div id="playable-area">
        <div id="link" class='link-back'></div>
    </div>
</div>

  <script>
$('#link').controls();

  </script>
</body>
</html>