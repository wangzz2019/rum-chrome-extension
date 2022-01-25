// Saves options to chrome.storage
function save_options() {
    var match=document.getElementById('match').value;
    var applicationid = document.getElementById('appid').value;
    var clienttoken = document.getElementById('clienttoken').value;
    var version=document.getElementById('version').value;
    var site=document.getElementById('site').value;
    var service=document.getElementById('service').value;
    var env=document.getElementById('env').value;
    //session replay
    var enableSessionReplay=document.getElementById('sessionreplay').checked;
    var privacy='mask-user-input';
    if (document.getElementById('mask').checked){
      privacy='mask';
    }
    else if (document.getElementById('allow').checked){
      privacy='allow';
    }
    //trace connect
    var enableTraceConnect=document.getElementById('trace').checked;
    var traceorigins=document.getElementById('traceorigins').value;
    console.log(traceorigins);
    //user session
    var enableUserSession=document.getElementById('usersession').checked;
    var userid=document.getElementById('userid').value;
    var username=document.getElementById('username').value;
    var useremail=document.getElementById('useremail').value;
    // console.log(enableSessionReplay);
    chrome.storage.sync.set({
      match: match,
      appid: applicationid,
      clitoken: clienttoken,
      version: version,
      site: site,
      service: service,
      env: env,
      //sessionreplay
      enableSessionReplay: enableSessionReplay,
      privacy: privacy,
      //trace connect
      enableTraceConnect: enableTraceConnect,
      traceorigins: traceorigins,
      //user session data
      enableUserSession: enableUserSession,
      userid: userid,
      username: username,
      useremail: useremail
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
      match: 'xxx',
      appid: 'xxx',
      clitoken: 'xxx',
      site: 'datadoghq.com',
      service: 'rumdemo',
      version: '1.0.0',
      env: 'demo',
      //sessionreplay
      enableSessionReplay: true,
      privacy: 'mask-user-input',
      //trace connect
      enableTraceConnect: false,
      traceorigins:'',
      //user session data
      enableUserSession: false,
      userid: '123456',
      username: 'Jack Wang',
      useremail: 'wangzz@datadoghq.com'
    }, function(items) {
      document.getElementById('match').value = items.match;
      document.getElementById('appid').value = items.appid;
      document.getElementById('clienttoken').value = items.clitoken;
      document.getElementById('site').value = items.site;
      document.getElementById('service').value = items.service;
      document.getElementById('version').value = items.version;
      document.getElementById('env').value = items.env;
      //sessionreplay
      document.getElementById('sessionreplay').checked = items.enableSessionReplay;
      if (items.privacy == 'allow'){
        document.getElementById('allow').checked = true;
      }
      else if (items.privacy == 'mask'){
        document.getElementById('mask').checked = true;
      }
      else{
        document.getElementById('maskuserinput').checked = true;
      }
      if (items.enableSessionReplay){
        showSessionReplay();
      }
      //trace connect
      document.getElementById('trace').checked = items.enableTraceConnect;
      document.getElementById('traceorigins').value = items.traceorigins;
      if (items.enableTraceConnect){
        showTraceConnect();
      }
      //user session
      document.getElementById('usersession').checked = items.enableUserSession;
      document.getElementById('userid').value = items.userid;
      document.getElementById('username').value = items.username;
      document.getElementById('useremail').value = items.useremail;
      if (items.enableUserSession){
        showUserSession();
      }
    });
  }
  function cleardata(){
    document.getElementById('match').value='';
      document.getElementById('appid').value='';
      document.getElementById('clienttoken').value='';
      document.getElementById('env').value='demo';
      document.getElementById('service').value='rumdemo';
      document.getElementById('site').value='datadoghq.com';
      document.getElementById('version').value='1.0.0';
      //session replay
      document.getElementById('sessionreplay').checked = true;
      document.getElementById('maskuserinput').checked = true;
      //trace connect
      document.getElementById('trace').checked = false;
      document.getElementById('traceorigins').value = '';
      //user session
      document.getElementById('usersession').checked = false;
      document.getElementById('userid').value='123456';
      document.getElementById('username').value='Jack Wang';
      document.getElementById('useremail').value='wangzz@datadoghq.com';

  }
  function showUserSession(){
    divUs=document.getElementById('divUsersession')
    if (divUs.style.display=='none'){
      divUs.style.display='block';
    }
    else{
      divUs.style.display="none";
    }
  }
  function showSessionReplay(){
    divUs=document.getElementById('defaultPrivacyLevel')
    if (divUs.style.display=='block'){
      divUs.style.display='none';
    }
    else{
      divUs.style.display="block";
    }
  }
  function showTraceConnect(){
    divUs=document.getElementById('divTraceConnect')
    if (divUs.style.display=='none'){
      divUs.style.display='block';
    }
    else{
      divUs.style.display="none";
    }
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',save_options);
  document.getElementById('clear').addEventListener('click',cleardata);
  document.getElementById('usersession').addEventListener('click',showUserSession);
  document.getElementById('sessionreplay').addEventListener('click',showSessionReplay);
  document.getElementById('trace').addEventListener('click',showTraceConnect);

  
