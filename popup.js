function checkreg(){
    var regmatch=document.getElementById('match').value;
    var site=document.getElementById('site').value
    var result = document.getElementById('checkresult');
    result.style.fontWeight='bold';
    if (site.match(regmatch)) {
        result.textContent = 'OK';
        result.style.color='green';
        // result.style.fontWeight='bold';
    }
    else{
        result.textContent = 'NG';
        result.style.color='red';
    }
    // document.getElementById('checkresult').value=result;
  }

  function initialize(){
    chrome.storage.sync.get({
        match: 'xxx'
      }, function(items) {
        document.getElementById('match').value = items.match;
      });
      chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        // console.log(url);
        if (url.startsWith('http')) {
            document.getElementById("site").value = url;
        }
    });
    // document.getElementById("site").value = "abc";
  }

document.addEventListener('DOMContentLoaded', initialize);
document.getElementById('check').addEventListener('click',checkreg);