var {ipcRenderer, remote} = require('electron');

onload = function() {
  var getInfo = document.getElementById('getinfo');
  var login = document.getElementById('login');
  var statusDiv = document.getElementById('status');

  window.fbAsyncInit = function() {
    FB.init({
          appId: '196762700753455',
          status: true,
          cookie: false
          xfbml: true,
          version: 'v2.5'
      });
  }
      // Login with FB with no permissions
    document.getElementById('login').onclick = function() {
        FB.login(function(response) {
            if (response.status === 'connected') {
                document.getElementById('status').innerHTML = 'Connected.';
                document.getElementById('login').style.visibility = 'hidden';
            } else {
                document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
            }
        }, {scope: '', display: 'window'});
    }
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
          document.getElementById('status').innerHTML = 'We are connected.';
            document.getElementById('login').style.visibility = 'hidden';
            function getInfo() {
        FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function(response) {
            document.getElementById('status').innerHTML = response.first_name + ' ' + response.last_name +': ' + response.id;
            if (response.id) {
              ipcRenderer.send('async', true);
            }
          });
      }
    function getInfo() {
      FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function(response) {
        document.getElementById('status').innerHTML = 
        response.first_name + ' ' + response.last_name +': ' + response.id;

      });
    }
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Getting basic user info
//  document.getElementById('getinfo').onclick = function() {