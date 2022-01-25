var applicationid;
var clienttoken;
var site;
var env;
var service;
var version;
//sessionreplay
var enableSessionReplay;
var privacy;
//trace connect
var enableTraceConnect;
var traceorigins;
//user session
var enableUserSession;
var userid;
var username;
var useremail;

// console.log("contentjs run...")

chrome.storage.sync.get({
    appid:'xxx',
    clitoken:'xxx',
    site: 'datadoghq.com',
    env: 'demo',
    service: 'rumdemo',
    version: '1.0.0',
    //sessionreplay
    enableSessionReplay: true,
    privacy: 'mask-user-input',
    //trace connect
    enableTraceConnect: false,
    traceorigins:'',
    //user session
    enableUserSession: false,
    userid: '123456',
    username: 'Jack Wang',
    useremail: 'wangzz@datadoghq.com'
    },function(items){
    //console.log("appid is:" + items.appid + " and clienttoken is: " + items.clitoken);
    applicationid=items.appid;
    clienttoken=items.clitoken;
    site=items.site;
    env=items.env;
    service=items.service;
    version=items.version;
    //session replay
    enableSessionReplay=items.enableSessionReplay;
    privacy=items.privacy;
    //trace connect
    enableTraceConnect=items.enableTraceConnect;
    traceorigins=items.traceorigins;
    //user session
    enableUserSession=items.enableUserSession;
    userid=items.userid;
    username=items.username;
    useremail=items.useremail;

    //console.log("get method appid is:" + applicationid + " and clienttoken is: " + clienttoken1);
    // if (window.DD_RUM && window.DD_RUM.) {ddruminit();}
    ddruminit();
    
    //simpletest();
    // ddruminitasync();
});

function simpletest(){
    window.DD_RUM && window.DD_RUM.init({
        applicationId: 'xxx',
        clientToken: 'xxx',
        site: 'datadoghq.com',
        service: 'chrometestservice',
        // Specify a version number to identify the deployed version of your application in Datadog 
        // version: '1.0.0',
        sampleRate: 100,
        trackInteractions: true,
        //allowedTracingOrigins: ["chrometest", /http:\/\/18\.180\.59\.191:8080/]
        allowedTracingOrigins: [/[\s]*/]
     });
}

function ddruminitasync(){
    window.DD_RUM.onReady(function() {
        window.DD_RUM.init({
          clientToken: clienttoken,
          applicationId: applicationid,
          site: site,
          service: service,
            env: env,
            version: version,
            sampleRate: 100,
            trackInteractions: true,
            trackSessionAcrossSubdomains: true
        })
    })
}

function ddruminit(){
    var initparameters={
        applicationId: applicationid,
        clientToken: clienttoken,
        site: site,
        service: service,
        env: env,
        version: version,
        sampleRate: 100,
        trackInteractions: true,
        silentMultipleInit: true,
        trackSessionAcrossSubdomains: true
    };
    if (enableSessionReplay!=false){
        initparameters['defaultPrivacyLevel']=privacy;
    }
    // if (enableTraceConnect!=false){
    //     console.log(traceorigins);
    //     strTraceorigins=traceorigins.slice(1,-1)
    //     console.log(strTraceorigins);
    //     // teststring='"abc",def';
    //     // arrayS=teststring.split(',')
    //     // arrayS.forEach(element => {
    //     //     console.log(element);
    //     // });
    //     var arrayTraceorigins=strTraceorigins.split(',');
    //     var arrayT=[];
    //     arrayTraceorigins.forEach(element => {
    //         var tempvalue=element.trim();
    //         if (tempvalue.substr(0,1)=='/' && tempvalue.substr(-1) == '/'){
    //             arrayT.push(new RegExp(tempvalue.slice(1,-1)));
    //         }
    //         else if (tempvalue.substr(0,1)=='"' && tempvalue.substr(-1) == '"'){
    //             arrayT.push(element.slice(1,-1));
    //         }
    //     });
    //     console.log(arrayT);
    //     var tempReg=new RegExp('http:\/\/18\.180\.59\.191:8080');
    //     console.log(tempReg);
    //     //arrayT.push(tempReg);
    //     console.log(arrayT);
    //     console.log(arrayT.toString());

    //     // initparameters['allowedTracingOrigins']=traceorigins;
    //     //initparameters['allowedTracingOrigins']='["http://18.180.59.191:8080"]';
    //     console.log(initparameters);
    // }
    

    window.DD_RUM && window.DD_RUM.init(initparameters);
    if (enableSessionReplay!=false){
        window.DD_RUM && window.DD_RUM.startSessionReplayRecording();
    }

    // if (enableSessionReplay!=false){
    //     window.DD_RUM && window.DD_RUM.init({
    //         applicationId: applicationid,
    //         clientToken: clienttoken,
    //         site: site,
    //         service: service,
    //         env: env,
    //         version: version,
    //         sampleRate: 100,
    //         trackInteractions: true,
    //         silentMultipleInit: true,
    //         trackSessionAcrossSubdomains: true,
    //         defaultPrivacyLevel: privacy
    //         //allowedTracingOrigins: ["http://18.180.59.191:8080"]
    //     });
    //     window.DD_RUM && window.DD_RUM.startSessionReplayRecording();
    // }
    // else{
    //     window.DD_RUM && window.DD_RUM.init({
    //         applicationId: applicationid,
    //         clientToken: clienttoken,
    //         site: site,
    //         service: service,
    //         env: env,
    //         version: version,
    //         sampleRate: 100,
    //         trackInteractions: true,
    //         silentMultipleInit: true,
    //         trackSessionAcrossSubdomains: true
    //     });
    // }

    if (enableUserSession!=false){
        window.DD_RUM && window.DD_RUM.setUser({
            id: userid,
            name: username,
            email: useremail
        });
    }
}

