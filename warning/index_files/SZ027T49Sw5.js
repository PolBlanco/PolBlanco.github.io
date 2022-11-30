;/*FB_PKG_DELIM*/

__d("isAdsExcelAddinURI",[],(function(a,b,c,d,e,f){var g=new RegExp("(^|\\.)fbaddins\\.com$","i"),h=["https"];function a(a){if(a.isEmpty()&&a.toString()!=="#")return!1;return!a.getDomain()&&!a.getProtocol()?!1:h.indexOf(a.getProtocol())!==-1&&g.test(a.getDomain())}f["default"]=a}),66);
__d("isValidAsyncSignalURI",[],(function(a,b,c,d,e,f){var g=new RegExp("((^|\\.)instagram\\.com$)|((^|\\.)wit\\.ai$)|((^|\\.)accountkit\\.com$)","i"),h=["https"];function a(a){if(a.isEmpty()&&a.toString()!=="#")return!1;return!a.getDomain()&&!a.getProtocol()?!1:h.includes(a.getProtocol())&&g.test(a.getDomain())}f["default"]=a}),66);
__d("AsyncSignal",["ErrorGuard","Promise","QueryString","Run","TimeSlice","TrackingConfig","URI","ZeroRewrites","getAsyncParams","isAdsExcelAddinURI","isFacebookURI","isMessengerDotComURI","isValidAsyncSignalURI","isWorkplaceDotComURI","memoize","promiseDone"],(function(a,b,c,d,e,f){var g,h,i;function a(a,c){this.data=c||{},this.uri=a.toString(),b("TrackingConfig").domain&&this.uri.charAt(0)=="/"&&(this.uri=b("TrackingConfig").domain+this.uri)}a.prototype.setHandler=function(a){this.handler=a;return this};a.prototype.setTimeout=function(a){this.timeout=a;return this};a.prototype.send=function(){b("TimeSlice").guard(this._send.bind(this),"AsyncSignal send",{propagationType:b("TimeSlice").PropagationType.ORPHAN})()};a.prototype._send=function(){var a=this.handler,c=this.data;c.asyncSignal=(Math.random()*1e4|0)+1;var d=b("ZeroRewrites").rewriteURI(new(g||(g=b("URI")))(this.uri));d=b("isFacebookURI")(d)||b("isMessengerDotComURI")(d)||b("isAdsExcelAddinURI")(d)||b("isWorkplaceDotComURI")(d)||b("isValidAsyncSignalURI")(d);if(d)Object.assign(c,b("getAsyncParams")("POST"));else throw new Error("'"+this.uri+"' is an external URL, you should not send async signals to offsite links.");var e=b("QueryString").appendToUrl(this.uri,c);i||(i=new(b("Promise"))(function(a){b("Run").onAfterLoad(a)}));d=i.then(function(){return new(b("Promise"))(function(a,b){var c=new Image();c.onload=a;c.onerror=c.onabort=b;c.src=e})});if(a){var f=!1,j=b("memoize")(function(){(h||(h=b("ErrorGuard"))).applyWithGuard(a,null,[f])});b("promiseDone")(d.then(function(){f=!0,j()},j));this.timeout&&setTimeout(j,this.timeout)}return this};e.exports=a}),null);
__d("DetectBrokenProxyCache",["AsyncSignal","Cookie","URI"],(function(a,b,c,d,e,f){var g;function a(a,c){var d=b("Cookie").get(c);if(d!=a&&d!=null&&a!="0"){c={c:"si_detect_broken_proxy_cache",m:c+" "+a+" "+d};a=new(g||(g=b("URI")))("/platform/scribe_endpoint.php").getQualifiedURI().toString();new(b("AsyncSignal"))(a,c).send()}}e.exports={run:a}}),null);
__d("AsyncTypedRequest",["AsyncRequest"],(function(a,b,c,d,e,f,g){"use strict";a=function(a){babelHelpers.inheritsLoose(b,a);function b(b){b=a.call(this,b)||this;b.setReplaceTransportMarkers();return b}var c=b.prototype;c.promisePayload=function(b){return a.prototype.promisePayload.call(this,b)};c.setPayloadHandler=function(b){a.prototype.setPayloadHandler.call(this,b);return this};return b}(c("AsyncRequest"));g["default"]=a}),98);
__d("ClickRefUtils",["DataAttributeUtils"],(function(a,b,c,d,e,f){var g={get_intern_ref:function(a){if(a){var b={profile_minifeed:1,gb_content_and_toolbar:1,gb_muffin_area:1,ego:1,bookmarks_menu:1,jewelBoxNotif:1,jewelNotif:1,BeeperBox:1,searchBarClickRef:1};for(a=a;a&&a!=document.body;a=a.parentNode){if(!a.id||typeof a.id!=="string")continue;if(a.id.substr(0,8)=="pagelet_")return a.id.substr(8);if(a.id.substr(0,8)=="box_app_")return a.id;if(b[a.id])return a.id}}return"-"},get_href:function(a){a=a.getAttribute&&(a.getAttribute("ajaxify")||a.getAttribute("data-endpoint"))||a.action||a.href||a.name;return typeof a==="string"?a:null},should_report:function(a,c){if(c=="FORCE")return!0;return c=="INDIRECT"?!1:a&&(g.get_href(a)||a.getAttribute&&b("DataAttributeUtils").getDataFt(a))}};e.exports=g}),null);
__d("ClickRefLogger",["Arbiter","Banzai","ClickRefUtils","ScriptPath","SessionName","Vector","collectDataAttributes","ge","pageID"],(function(a,b,c,d,e,f){var g={delay:0,retry:!0};function h(a){if(!b("ge")("content"))return[0,0,0,0];a=b("Vector").getEventPosition(a);return[a.x,a.y,0,0]}function i(c,d,e,f){var g="r",i=[0,0,0,0],j,k;if(e){j=e.type;j=="click"&&b("ge")("content")&&(i=h(e));var l=0;e.ctrlKey&&(l+=1);e.shiftKey&&(l+=2);e.altKey&&(l+=4);e.metaKey&&(l+=8);l&&(j+=l)}d&&(k=b("ClickRefUtils").get_href(d));l=b("collectDataAttributes")(e?e.target||e.srcElement:d,["ft","gt"]);Object.assign(l.ft,f.ft);Object.assign(l.gt,f.gt);typeof l.ft.ei==="string"&&delete l.ft.ei;e&&e.which&&(l.ft.click_type=e.which===1?"left":e.which===2?"middle":"right");return[c.ue_ts,c.ue_count,k||"-",c.context,j||"-",b("ClickRefUtils").get_intern_ref(d),g,a.URI?a.URI.getRequestURI(!0,!0).getUnqualifiedURI().toString():location.pathname+location.search+location.hash,l].concat(i).concat(b("pageID")).concat(b("ScriptPath").getTopViewEndpoint())}b("Arbiter").subscribe("ClickRefAction/new",function(a,c){if(b("ClickRefUtils").should_report(c.node,c.mode)){a=i(c.cfa,c.node,c.event,c.extra_data);c=[b("SessionName").getName(),Date.now(),"act"];b("Banzai").post("click_ref_logger",Array.prototype.concat(c,a),g)}});b("Arbiter").subscribe("ClickRefAction/contextmenu",function(a,c){if(b("ClickRefUtils").should_report(c.node,c.mode)){a=i(c.cfa,c.node,c.event,c.extra_data);c=[b("SessionName").getName(),Date.now(),"act"];b("Banzai").post("click_ref_logger",Array.prototype.concat(c,a),g)}})}),null);
__d("DimensionTracking",["Cookie","Event","debounce","getViewportDimensions","isInIframe"],(function(a,b,c,d,e,f,g){function a(){var a=c("getViewportDimensions")();c("Cookie").set("wd",a.width+"x"+a.height)}c("isInIframe")()||(setTimeout(a,100),c("Event").listen(window,"resize",c("debounce")(a,250)),c("Event").listen(window,"focus",a))}),34);
__d("StringTransformations",[],(function(a,b,c,d,e,f){"use strict";a={unicodeEscape:function(a){return a.replace(/[^A-Za-z0-9\-\.\:\_\$\/\+\=]/g,function(a){a=a.charCodeAt(0).toString(16);return"\\u"+("0000"+a.toUpperCase()).slice(-4)})},unicodeUnescape:function(a){return a.replace(/(\\u[0-9A-Fa-f]{4})/g,function(a){return String.fromCharCode(parseInt(a.slice(2),16))})}};f["default"]=a}),66);
__d("TimeSpentArray",["Banzai","TimeSlice","clearTimeout","pageID","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f,g){var h=2,i=h*32,j,k,l,m,n,o,p,q,r,s,t={},u;function v(){return{timeoutDelayMap:t,nextDelay:u,timeoutInSeconds:m}}function w(){if(j){var a=Date.now();a>o&&(q=Math.min(i,Math.ceil(a/1e3-n)));a=B();a&&j(a,u)}A()}function x(){y(),l=c("setTimeoutAcrossTransitions")(c("TimeSlice").guard(w,"TimeSpentArray Timeout",{propagationType:c("TimeSlice").PropagationType.ORPHAN}),m*1e3)}function y(){l&&(c("clearTimeout")(l),l=null)}function z(a){n=a;o=n*1e3;p=[1];for(a=1;a<h;a++)p.push(0);q=1;r+=1;s+=1;a=s.toString()+"_delay";u=t[a];u===void 0&&(u=t.delay);a=s.toString()+"_timeout";a=t[a];a===void 0&&(a=t.timeout);a=Math.min(a,i);m=a||i;x()}function A(){y(),p=null}function B(){return!p?null:{tos_id:c("pageID"),start_time:n,tos_array:p.slice(0),tos_len:q,tos_seq:s,tos_cum:r}}function C(a){if(a>=o&&a-o<1e3)return;k&&k(a);D(Math.floor(a/1e3))}function D(a){var b=a-n;(b<0||b>=i)&&w();!p?z(a):(p[b>>5]|=1<<(b&31),q=b+1,r+=1,o=a*1e3)}function a(a,b,d,e){r=0,s=-1,j=a,k=e,typeof b==="object"&&b!==null?t=b:t={},z(Math.floor((d===void 0||d===null||d===0?Date.now():d)/1e3)),c("Banzai").subscribe(c("Banzai").SHUTDOWN,w)}function b(a){C(a)}function d(){return B()}function e(){w()}function f(){A()}function E(){return v()}g.init=a;g.update=b;g.get=d;g.ship=e;g.reset=f;g.testState=E}),98);
__d("TimeSpentImmediateActiveSecondsLogger",["cr:844180"],(function(a,b,c,d,e,f,g){"use strict";g["default"]=b("cr:844180")}),98);
__d("WebTimeSpentBitArrayFalcoEvent",["FalcoLoggerInternal","getFalcoLogPolicy_DO_NOT_USE"],(function(a,b,c,d,e,f){"use strict";a=b("getFalcoLogPolicy_DO_NOT_USE")("1829320");c=b("FalcoLoggerInternal").create("web_time_spent_bit_array",a);e.exports=c}),null);
__d("TimeSpentBitArrayLogger",["Arbiter","Env","LogHistory","ODS","TimeSpentArray","TimeSpentConfig","TimeSpentImmediateActiveSecondsLogger","UserActivity","WebSession","WebTimeSpentBitArrayFalcoEvent","cr:1187159","isInIframe"],(function(a,b,c,d,e,f,g){var h,i="";function j(a){a=k();a!==i&&(b("TimeSpentArray").ship(),i=a)}function k(){b("WebSession").extend();return b("WebSession").getId()}function l(a,d){a.sid_raw=i,b("Arbiter").inform("timespent/tosbitdataposted",babelHelpers["extends"]({},a)),c("WebTimeSpentBitArrayFalcoEvent").logImmediately(function(){return{sid_raw:a.sid_raw,start_time:a.start_time,tos_array:a.tos_array,tos_cum:a.tos_cum,tos_id:a.tos_id,tos_len:a.tos_len,tos_seq:a.tos_seq}})}f.exports={init:function(a){if(b("isInIframe")()&&!(h||(h=b("Env"))).isCQuick)return;if((h||(h=b("Env"))).isCQuick){b("cr:1187159")!=null?b("UserActivity").subscribe(function(a,c){b("cr:1187159").sendMessage({compatAction:"update_time_spent_bit_array_from_boc",eventTimeInMs:c.last_inform})}):b("ODS").bumpEntityKey(223,"core_metrics.time_spent.www","blue_on_comet_without_compat_broker");return}i=k();b("UserActivity").subscribe(function(a,c){a=c.last_inform;b("TimeSpentArray").update(a);b("TimeSpentImmediateActiveSecondsLogger").maybeReportActiveSecond(a)});a=Date.now();b("TimeSpentArray").init(l,b("TimeSpentConfig"),a,j);b("TimeSpentImmediateActiveSecondsLogger").maybeReportActiveSecond(a);b("ODS").bumpEntityKey(2966,"ms.time_spent.qa.www","time_spent.bits.js_initialized")}}}),34);
__d("Chromedome",["fbt"],(function(a,b,c,d,e,f,g,h){function a(a){if(top!==window||document.domain==null||!/(^|\.)facebook\.(com|sg)$/.test(document.domain))return;a=h._("\u00a1Detente!");var b=h._("Esta funci\u00f3n del navegador est\u00e1 pensada para desarrolladores. Si alguien te ha indicado que copiaras y pegaras algo aqu\u00ed para habilitar una funci\u00f3n de Facebook o para \"hackear\" la cuenta de alguien, se trata de un fraude. Si lo haces, esta persona podr\u00e1 acceder a tu cuenta."),c=h._("Ver {url} para obtener m\u00e1s informaci\u00f3n.",[h._param("url","https://www.facebook.com/selfxss")]);if(window.chrome||window.safari){var d="font-family:helvetica; font-size:20px; ";[[a,d+"font-size:50px; font-weight:bold; color:red; -webkit-text-stroke:1px black;"],[b,d],[c,d],["",""]].map(function(a){window.setTimeout(console.log.bind(console,"\n%c"+a[0].toString(),a[1]))})}else{a=[""," .d8888b.  888                       888","d88P  Y88b 888                       888","Y88b.      888                       888",' "Y888b.   888888  .d88b.  88888b.   888','    "Y88b. 888    d88""88b 888 "88b  888','      "888 888    888  888 888  888  Y8P',"Y88b  d88P Y88b.  Y88..88P 888 d88P",' "Y8888P"   "Y888  "Y88P"  88888P"   888',"                           888","                           888","                           888"];d=(""+b.toString()).match(/.{35}.+?\s+|.+$/g);if(d!=null){b=Math.floor(Math.max(0,(a.length-d.length)/2));for(var e=0;e<a.length||e<d.length;e++){var f=a[e];a[e]=f+new Array(45-f.length).join(" ")+(d[e-b]||"")}}console.log("\n\n\n"+a.join("\n")+"\n\n"+c.toString()+"\n");return}}g.start=a}),98);
__d("NavigationClickPointHandler",["Event","ScriptPath","collectDataAttributes"],(function(a,b,c,d,e,f,g){function h(a){var b=null,d=c("collectDataAttributes")(a,["ft"],["href","data-click"]),e=d.normal.href;if(!e||e==="#")return!1;e=d.normal["data-click"];b===null&&e&&(b={click:e});e=d.ft.tn;b===null&&e&&(b={tn:e});if(b===null&&a.getAttribute){d=a.getAttribute("class");d!=null&&(b={"class":d})}return b}function a(a){a=a.target||a.srcElement;a=h(a);typeof a!="boolean"&&d("ScriptPath").setClickPointInfo(a)}document.documentElement!==null&&c("Event").listen(document.documentElement,{click:a});g.getClickPointInfo=h}),98);
__d("WebPerfDeviceInfoLogFalcoEvent",["FalcoLoggerInternal","getFalcoLogPolicy_DO_NOT_USE"],(function(a,b,c,d,e,f){"use strict";a=b("getFalcoLogPolicy_DO_NOT_USE")("1871697");c=b("FalcoLoggerInternal").create("web_perf_device_info_log",a);e.exports=c}),null);
__d("XDeviceClassRealtimeController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/web_perf/get_perf_level/",{})}),null);
__d("WebDevicePerfInfoLogging",["AsyncTypedRequest","JSScheduler","Promise","WebDevicePerfInfoData","WebPerfDeviceInfoLogFalcoEvent","XDeviceClassRealtimeController","regeneratorRuntime"],(function(a,b,c,d,e,f,g){"use strict";function h(a){var b=document.createElement("canvas");b=b.getContext("webgl")||b.getContext("experimental-webgl");if(!b)return;var c=b.getExtension("WEBGL_debug_renderer_info");if(!c)return;var d=b.getParameter(c.UNMASKED_RENDERER_WEBGL);b=b.getParameter(c.UNMASKED_VENDOR_WEBGL);a.gpu_vendor=b;a.gpu_renderer=d}function i(){var a=window.navigator,b={};a&&a.hardwareConcurrency!==void 0&&(b.cpu_cores=a.hardwareConcurrency);a&&a.deviceMemory!==void 0&&(b.ram=a.deviceMemory);c("WebDevicePerfInfoData").needsFullUpdate&&h(b);return b}function j(){var a=i();c("WebPerfDeviceInfoLogFalcoEvent").log(function(){var b;return{cpu_cores:(b=a.cpu_cores)!=null?b:null,ram:(b=a.ram)!=null?b:null,gpu_renderer:(b=a.gpu_renderer)!=null?b:null,gpu_vendor:(b=a.gpu_vendor)!=null?b:null}})}function k(){var a,d;return b("regeneratorRuntime").async(function(e){while(1)switch(e.prev=e.next){case 0:a=i();e.next=3;return b("regeneratorRuntime").awrap(new(c("AsyncTypedRequest"))(c("XDeviceClassRealtimeController").getURIBuilder().getURI()).setData(a).promisePayload());case 3:d=e.sent;return e.abrupt("return",d.devicePerfClassLevel);case 5:case"end":return e.stop()}},null,this)}function a(){(c("WebDevicePerfInfoData").needsFullUpdate||c("WebDevicePerfInfoData").needsPartialUpdate)&&d("JSScheduler").scheduleSpeculativeCallback(j)}function e(){return new(b("Promise"))(function(a,b){c("WebDevicePerfInfoData").needsFullUpdate||c("WebDevicePerfInfoData").needsPartialUpdate?d("JSScheduler").scheduleSpeculativeCallback(function(){k().then(a)["catch"](b)}):a()})}g.doLog=a;g.doLogPromise=e}),98);
__d("WebStorageMonster",["AsyncRequest","CacheStorage","Event","ExecutionEnvironment","NetworkStatus","StringTransformations","UserActivity","WebStorage","WebStorageMonsterLoggingURI","ifRequired","isEmpty","killswitch","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f,g){"use strict";var h=1e4,i=5,j=!1;function k(a){var b={};for(var d in a){var e=a.getItem(d),f=c("StringTransformations").unicodeEscape(d);typeof e==="string"&&(b[f]=e.length)}return b}function l(a){var b=c("WebStorage").getLocalStorage();if(!b||a==null||!a.keys)return;o._getLocalStorageKeys().forEach(function(c){a.keys.includes(c)&&b.removeItem(c)})}function m(a){var b=c("WebStorage").getLocalStorage();b&&o._getLocalStorageKeys().forEach(function(c){a.some(function(a){return new RegExp(a).test(c)})||b.removeItem(c)})}function n(a,b){a===void 0&&(a=!1);b===void 0&&(b=h);if(c("UserActivity").isActive(b)){var d=Math.max(h,Math.floor(b/i));c("setTimeoutAcrossTransitions")(function(){n(a,d)},d)}else{o.cleanNow(a);var e=!c("killswitch")("WEB_STORAGE_MONSTER_DONT_RESCHEDULE_ON_RUN");if(e){var f=b*i;c("setTimeoutAcrossTransitions")(function(){n(a,f)},f)}}}var o={registerLogoutForm:function(a,b){c("Event").listen(a,"submit",function(a){o.cleanOnLogout(b)})},schedule:function(a){a===void 0&&(a=!1);if(j||!c("ExecutionEnvironment").isInBrowser)return;j=!0;n(a)},cleanNow:function(a){a===void 0&&(a=!1);var b=Date.now(),d={},e=c("WebStorage").getLocalStorage();e&&(d.local_storage=k(e));e=c("WebStorage").getSessionStorage();e&&(d.session_storage=k(e));e=!c("isEmpty")(d);var f=Date.now();d.logtime=f-b;if(e){var g,h=c("WebStorageMonsterLoggingURI").uri;if(h===null)return null;var i=function(){new(c("AsyncRequest"))(h).setData(d).setHandler(function(b){b=b.getPayload();b&&b.keys&&(b.keys=b.keys.map(c("StringTransformations").unicodeUnescape));a||l(b);c("NetworkStatus").reportSuccess()}).setErrorHandler(function(){c("NetworkStatus").reportError()}).setOption("retries",2).send()};if(c("NetworkStatus").isOnline())i();else{f=function(a){a=a.online;a&&(i(),g.remove())};g=c("NetworkStatus").onChange(f)}}},cleanOnLogout:function(a){c("CacheStorage").disablePersistentWrites();c("ifRequired")("WebAsyncStorage",function(a){a.disablePersistentWrites()});a?m(a):m([]);a=c("WebStorage").getSessionStorage();a&&a.clear();c("ifRequired")("WebAsyncStorage",function(a){a.clear(function(){})})},_getLocalStorageKeys:function(){var a=c("WebStorage").getLocalStorage();return a?Object.keys(a):[]}};a=o;g["default"]=a}),98);
__d("ArtillerySegment",["invariant","performanceAbsoluteNow"],(function(a,b,c,d,e,f,g,h){var i=0;a=function(){function a(a){a||h(0,1496),"category"in a&&"description"in a||h(0,3138,JSON.stringify(a)),this.$1=!1,this.$2=babelHelpers["extends"]({},a,{id:(i++).toString(36)}),this.$3=[]}var b=a.prototype;b.getID=function(){return this.$2.id};b.begin=function(){this.$2.begin=c("performanceAbsoluteNow")();return this};b.end=function(){this.$2.end=c("performanceAbsoluteNow")();return this};b.appendChild=function(){var a=this;this.$1&&h(0,37302,this.$2.description);for(var b=arguments.length,c=new Array(b),d=0;d<b;d++)c[d]=arguments[d];c.forEach(function(b){a.$3.push(b.getID())});return this};b.setPosted=function(){this.$1=!0;return this};b.getPostData=function(){return babelHelpers["extends"]({},this.$2,{id:this.$2.id,children:this.$3.slice()})};return a}();g["default"]=a}),98);
__d("ArtillerySequence",["invariant"],(function(a,b,c,d,e,f,g,h){var i=0;a=function(){function a(a){a||h(0,1496),"description"in a||h(0,1497,JSON.stringify(a)),this.$1=!1,this.$2=babelHelpers["extends"]({},a,{id:(i++).toString(36)}),this.$3=[]}var b=a.prototype;b.getID=function(){return this.$2.id};b.addSegment=function(){var a=this;this.$1&&h(0,37342,this.$2.description);for(var b=arguments.length,c=new Array(b),d=0;d<b;d++)c[d]=arguments[d];c.forEach(function(b){a.$3.push(b.getID())});return this};b.setPosted=function(){this.$1=!0;return this};b.getPostData=function(){return babelHelpers["extends"]({},this.$2,{id:this.$2.id,segments:this.$3.slice()})};return a}();g["default"]=a}),98);
__d("ArtilleryTrace",["invariant","ArtillerySegment","ArtillerySequence"],(function(a,b,c,d,e,f,g,h){a=function(){function a(){this.$1=!1,this.$3=void 0,this.$4={},this.$5={},this.$6=[],this.$7=[],this.$8={},this.$9=[],this.$10=null}var b=a.prototype;b.createSequence=function(a){this.$1&&h(0,4917);a=new(c("ArtillerySequence"))(a);this.$6.push(a);return a};b.createSegment=function(a){this.$1&&h(0,4918);a=new(c("ArtillerySegment"))(a);this.$7.push(a);return a};b.markSegment=function(a,b){this.$1&&h(0,4919);this.$8[b]=a.getID();return this};b.connectTrace=function(a,b){this.$1&&h(0,4919);b=b||this.$2;b||h(0,4920);this.$9.push({segment:a.getID(),trace:b});return this};b.setID=function(a,b){!this.$2&&!this.$3||h(0,4921);this.$2=a;this.$3=b;return this};b.getID=function(){return this.$2};b.getArtillery2ID=function(){return this.$3};b.addProperty=function(a,b){this.$4[a]=b;return this};b.addTagset=function(a,b){this.$5[a]=b;return this};b.addActivePolicies=function(a){this.addTagset("active_policies",a);this.addTagset("policy",a);return this};b.getProperty=function(a){return this.$4[a]};b.getTagset=function(a){return this.$5[a]};b.getActivePolicies=function(){return this.getTagset("active_policies")};b.post=function(){this.$1&&h(0,37290,this.$2);this.$1=!0;var a=this.$10;a&&a({id:this.$2,artillery2Id:this.$3,properties:this.$4,tagsets:this.$5,sequences:this.$6.map(function(a){return a.setPosted().getPostData()}),segments:this.$7.map(function(a){return a.setPosted().getPostData()}),marks:babelHelpers["extends"]({},this.$8),connections:this.$9.slice()})};b.setOnPost=function(a){this.$10&&h(0,4923);this.$10=a;return this};b.isPosted=function(){return this.$1};return a}();g["default"]=a}),98);
__d("ServiceWorkerRegistration",["BrowserPaymentHandlerConfig","ClientServiceWorkerMessage","EventListener","Promise","Run","promiseDone"],(function(a,b,c,d,e,f){var g=!!navigator.serviceWorker,h={},i={name:"Facebook Pay",method:self.location.origin+"/pay"};function j(a){if(!b("BrowserPaymentHandlerConfig").enabled)return;(a=a.paymentManager)==null?void 0:(a=a.instruments)==null?void 0:a.set("Facebook",i)}function k(){var a=navigator.serviceWorker;if(!g||!a)throw new Error("serviceWorker is not supported in this browser");return a}var l={isSupported:function(){return g},registerWorkerIfUnregisteredAfterDD:function(a){b("Run").onAfterLoad(function(){l.registerWorkerIfUnregistered(a)})},registerWorkerIfUnregistered:function(a){if(h[a])return h[a];var c=k(),d=h[a]=new(b("Promise"))(function(d,e){b("promiseDone")(l.getWorkerRegistration(a),function(f){if(!f){var g=b("EventListener").listen(window,"message",function(a){(a==null?void 0:(a=a.data)==null?void 0:a.command)==="ServiceWorkerInstallError"&&e()});b("promiseDone")(b("Promise").resolve(c.register(a,{updateViaCache:"all"})),function(){g.remove(),b("promiseDone")(b("Promise").resolve(c.ready),d)})}else d(f)})});b("promiseDone")(d,function(b){h[a]=null,j(b)});return d},unregisterControllingWorker:function(){return new(b("Promise"))(function(a,c){c=new(b("ClientServiceWorkerMessage"))("unregister",{},function(){a(!0)});c.sendViaController()})},getWorkerRegistration:function(a){var b=k();return b.getRegistration(a)},isAWorkerActivated:function(){return!navigator.serviceWorker||!navigator.serviceWorker.getRegistration?b("Promise").resolve(!1):navigator.serviceWorker.getRegistration().then(function(a){return!!(a&&a.active)})}};e.exports=l}),null);
__d("Artillery",["invariant","ArtilleryTrace","Banzai","ClientServiceWorkerMessage","Run","ServiceWorkerRegistration","forEachObject","mixInEventEmitter","performance"],(function(a,b,c,d,e,f,g,h){var i=!1,j=!1,k=[],l,m,n,o={},p={},q=!1,r=!1;function s(){if(i)return;i=!0;c("Banzai").subscribe(c("Banzai").SHUTDOWN,function(){u._postAll()})}function t(){m=null,l=null,p={},o={},n=null,r=!1}var u={isEnabled:function(){return j},createTrace:function(){s();var a=new(c("ArtilleryTrace"))();a.setOnPost(function(a){u.emitAndHold("posttrace",a)});k.push(a);return a},getPageTrace:function(){l||h(0,4261);if(n)return n;var a=u.createTrace().setID(l,m);c("forEachObject")(o,function(b,c,d){a.addProperty(c,b)});c("forEachObject")(p,function(b,c,d){a.addTagset(c,b)});n=a;return a},setPageProperties:function(a){o=a},addPageTagset:function(a,b){n==null?p[a]=b:n.addTagset(a,b)},setActivePolicies:function(a){u.addPageTagset("active_policies",a),u.addPageTagset("policy",a)},getPageActivePolicies:function(){return u.getPageTagset("active_policies")},enableLogServiceWorker:function(){c("ServiceWorkerRegistration").isSupported()&&(q=!0)},getPageProperty:function(a){if(n==null)return o[a];else return n.getProperty(a)},getPageTagset:function(a){if(n==null)return p[a];else return n.getTagset(a)},enable:function(){j=!0,r||(d("Run").onLeave(t),r=!0)},disable:function(){j=!1},setPageTraceID:function(a,b){if(l===a&&m===b)return;!l&&!m||h(0,4262);l=a;m=b;if(q&&c("performance")&&c("performance").timing&&c("performance").timing.navigationStart){a=new(c("ClientServiceWorkerMessage"))("asw-sendStartupData",{traceID:m,windowStart:c("performance").timing.navigationStart},null);a.sendViaController()}},addPiggyback:function(a,b){window.CavalryLogger&&window.CavalryLogger.getInstance().addPiggyback(a,b)},_postAll:function(){k.forEach(function(a){return!a.isPosted()&&a.post()})}};c("mixInEventEmitter")(u,{posttrace:!0});a=u;g["default"]=a}),98);
__d("WebBlueTimeSpentNavigationFalcoEvent",["FalcoLoggerInternal","getFalcoLogPolicy_DO_NOT_USE"],(function(a,b,c,d,e,f){"use strict";a=b("getFalcoLogPolicy_DO_NOT_USE")("1829319");c=b("FalcoLoggerInternal").create("web_blue_time_spent_navigation",a);e.exports=c}),null);
__d("WebImmediateActiveSecondsFalcoEvent",["FalcoLoggerInternal","getFalcoLogPolicy_DO_NOT_USE"],(function(a,b,c,d,e,f){"use strict";a=b("getFalcoLogPolicy_DO_NOT_USE")("1843988");c=b("FalcoLoggerInternal").create("web_immediate_active_seconds",a);e.exports=c}),null);
__d("FalcoLoggerTransports",["AnalyticsCoreData","Banzai","JSResource","ODS","PersistedQueue","Queue","WebSession","performanceAbsoluteNow","promiseDone","uuid"],(function(a,b,c,d,e,f,g){"use strict";var h=5*1024,i=(b=c("AnalyticsCoreData").max_delay_br_queue)!=null?b:60*1e3,j=(e=c("AnalyticsCoreData").max_delay_br_queue_immediate)!=null?e:1e3,k="falco:",l=new(c("Queue"))(),m=5e3,n=6e4,o=c("uuid")(),p="ods_web_batch",q=new Map(),r=new Set(),s=[],t=0,u,v=!1,w=!1,x=!1,y=!0,z=!1,A=Date.now()-n,B=1;((f=c("AnalyticsCoreData").fix_br_init_rc)!=null?f:!1)&&R();for(e=(b=c("AnalyticsCoreData").stateful_events_list_for_br)!=null?b:[],f=Array.isArray(e),b=0,e=f?e:e[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var C;if(f){if(b>=e.length)break;C=e[b++]}else{b=e.next();if(b.done)break;C=b.value}C=C;r.add(C)}function D(a,b){K(b.item.name,"js.br.add_to_batch",1,!0);var c=b.item.extra.length;t+c>h&&(clearTimeout(u),E());s.push([a,b]);t+=c}function E(){u=null;v=!1;var a=s;I("js.br.send_batch",a.map(function(a){return a[1].item}));if(!z){J("js.br.init_not_complete.log",a.length);var b=function(){var b=a[d],e=b[0],f=b[1];K(f.item.name,"js.br.banzai_fallback_for_init_not_complete",1,!0);if((b=f.item.logImmediate)!=null?b:!1){((b=c("AnalyticsCoreData").use_critical_for_fallback_from_immediate)!=null?b:!1)?L.logCritical([f.item],function(a){return e.markItem(f,a)}):L.logImmediately([f.item],function(a){return e.markItem(f,a)})}else L.log([f.item],function(a){return e.markItem(f,a)})};for(var d=0;d<a.length;d++)b()}else l.enqueue(function(b){return b.log(a.map(function(a){return a[1].item}),function(b){if(!b){J("js.br.banzai_fallback",a.length);var d=function(){var d=a[e],b=d[0],f=d[1];K(f.item.name,"js.br.banzai_fallback_for_failure",1,!0);if((d=f.item.logImmediate)!=null?d:!1){((d=c("AnalyticsCoreData").use_critical_for_fallback_from_immediate)!=null?d:!1)?L.logCritical([f.item],function(a){return b.markItem(f,a)}):L.logImmediately([f.item],function(a){return b.markItem(f,a)})}else L.log([f.item],function(a){return b.markItem(f,a)})};for(var e=0;e<a.length;e++)d();return}for(d=0;d<a.length;d++){var f=a[d],g=f[0];f=f[1];K(f.item.name,"js.br.success_callback.batch.send_batch",1,!0);g.markItem(f,b)}})});s=[];t=0}function F(a){return{events:a.map(function(a){return{name:a.name,extra:a.extra,rate:a.policy.r,time:a.time/1e3,shouldAddState:a.shouldAddState}})}}function G(a){var b;a={deviceId:c("AnalyticsCoreData").device_id,sessionId:a,appId:c("AnalyticsCoreData").app_id,pushPhase:c("AnalyticsCoreData").push_phase};((b=(b=c("AnalyticsCoreData").stateful_events_list_for_br)==null?void 0:b.length)!=null?b:0)>0&&(a.ambientState=c("AnalyticsCoreData").state_for_br);return Object.freeze(a)}function H(a,b){for(var e=0;e<a.length;e++){var f,g=a[e];K(g.name,"js.banzai.posting_event",1,!1);f=(f={},f.e=g.extra,f.r=g.policy.r,f.d=c("AnalyticsCoreData").device_id,f.s=d("WebSession").getId(),f.t=g.time,f);g.privacyContext&&(f.p=g.privacyContext);var h=g.identity;h&&(f.id=h);c("Banzai").post(k+g.name,f,b)}I("planes.banzai.write_to_transport",a)}function I(a,b){var c=0;for(var d=0;d<b.length;d++){var e=b[d];e.name!==p&&(c+=1)}c>0&&J(a,c)}function J(a,b){var e,f="falco.fabric.www."+c("AnalyticsCoreData").push_phase;((e=c("AnalyticsCoreData").queue_activation_experiment)!=null?e:!1)&&(f+=".queue_activation_experiment");d("ODS").bumpEntityKey(1344,f,a,b)}function K(a,b,c,e){if(a===p)return!1;d("ODS").bumpEntityKey(1344,"falco.event."+a,b,c);e&&J(b,c);return!0}var L={log:function(a,b){I("js.banzai.post.log",a),H(a,c("Banzai").BASIC),b(!0)},logImmediately:function(a,b){I("js.banzai.post.log_immediately",a),H(a,c("Banzai").VITAL),b(!0)},logCritical:function(a,b){I("js.banzai.post.log_critical",a),H(a,{signal:!0,retry:!0}),b(!0)}};function M(a){R();var b=N(a,"banzai_data_loss","log"),d=N(a,"banzai_data_loss","logImmediately"),e=N(a,"banzai_data_loss","logCritical"),f=N(a,"bladerunner_data_loss","");J("js.br_data_loss.posted."+a,1);if(z&&y)try{l.enqueue(function(b){return b.log([f],function(b){if(!b){J("js.br.transport_failure."+a,1);L.logCritical([f],function(b){J("js.br.failure_fallback_success_callback."+a,1)});return}J("js.br.success_callback."+a,1)})})}catch(b){J("js.br.error_enqueueing."+a,1),L.logCritical([f],function(b){J("js.br.enqueuing_fallback_success_callback."+a,1)})}else y||J("js.br.failed."+a,1),z||J("js.br.init_not_complete."+a,1),L.logCritical([f],function(b){J("js.br.init_fallback_success_callback."+a,1)});H([b],c("Banzai").BASIC);H([d],c("Banzai").VITAL);H([e],{signal:!0,retry:!0})}function N(a,b,d){return{name:b,time:c("performanceAbsoluteNow")(),policy:{r:1},extra:JSON.stringify({event_index:a,falco_js_connection_id:o,logging_mode:d,logging_flow_flag:((b=c("AnalyticsCoreData").fix_br_init_rc)!=null?b:!1)?"race_condition_fixed":"original_flow"})}}function O(){A+m<Date.now()&&(M(B),A=Date.now(),B++)}function P(){window.setTimeout(function(){O(),B<=40&&P()},n)}function Q(a){l.start(function(b){return b({log:function(d,b){I("planes.bladerunner.write_to_transport",d);var e=JSON.stringify(F(d));a?c("AnalyticsCoreData").enable_ack?c("promiseDone")(a.amendWithAck(e),function(a){I("planes.bladerunner.ack_received"+a.toString(),d),b(a)},function(){I("planes.bladerunner.ack_failure",d),b(!1)}):(a.amendWithoutAck(e),I("planes.bladerunner.write_without_ack",d)):(I("planes.bladerunner.request_stream_null",d),b(!1))},logImmediately:function(b,a){this.log(b,a)},logCritical:function(b,a){this.log(b,a)}})})}function R(){var a;if(w)return;z=!1;if(!c("AnalyticsCoreData").enable_bladerunner&&((a=c("AnalyticsCoreData").fix_br_init_rc)!=null?a:!1))return;c("JSResource").loadAll([c("JSResource")("TransportSelectingClientSingleton").__setRef("FalcoLoggerTransports"),c("JSResource")("RequestStreamCommonRequestStreamCommonTypes").__setRef("FalcoLoggerTransports")],function(a,b){var e=b.FlowStatus,f;b={onTermination:function(a){a.message==="Stream closed"?(l.stop(!0),w=!1):(y=!1,l.start(function(a){return a(L)}))},onFlowStatus:function(a){a===e.Started&&!((a=c("AnalyticsCoreData").fix_br_init_rc)!=null?a:!1)&&Q(f)}};c("promiseDone")(a.requestStream({method:"Falco"},JSON.stringify(G(d("WebSession").getId())),b,{requestId:""}).then(function(a){f=a;((a=c("AnalyticsCoreData").fix_br_init_rc)!=null?a:!1)&&Q(f);z=!0})["catch"](function(a){l.stop(!0),w=!1}))});w=!0}function S(a){var b=a.policy,d=a.name;r.has(d)&&(a.shouldAddState=!0);return c("AnalyticsCoreData").enable_bladerunner&&y&&(b.s===1||r.has(d))}function T(a){if(a==="")return null;if(q.has(a))return q.get(a);else{var b={claim:""},c=a.split("^#");if(c.length>=4){var d=c[0],e=c[1],f=c[2];c=c[3];f!==""?b={appScopedIdentity:f,claim:c}:d!==""&&(b={fbIdentity:{accountId:d,actorId:e},claim:c});q.set(a,b)}return b}}function a(){var a;if(x)return;x=!0;c("PersistedQueue").setHandler("falco_queue_log",function(a){var b,c=T(a.getQueueNameSuffix());while(b=a.dequeueItem())(function(b){S(b.item)?(K(b.item.name,"js.use_bladerunner.log",1,!0),R(),u==null&&(u=setTimeout(E,i)),D(a,b)):(K(b.item.name,"js.use_banzai.log",1,!0),c&&(b.item.identity=c),L.log([b.item],function(c){return a.markItem(b,c)}))})(b)});c("PersistedQueue").setHandler("falco_queue_immediately",function(a){var b,d=T(a.getQueueNameSuffix());while(b=a.dequeueItem())(function(b){S(b.item)?(K(b.item.name,"js.use_bladerunner.log_immediately",1,!0),R(),(u==null||!v)&&(clearTimeout(u),u=setTimeout(E,j),v=!0),b.item.logImmediate=!0,D(a,b),c("PersistedQueue").isPersistenceAllowed()||(K(b.item.name,"js.br.send_immediately_no_persistence",1,!0),E())):(K(b.item.name,"js.use_banzai.log_immediately",1,!0),d&&(b.item.identity=d),L.logImmediately([b.item],function(c){return a.markItem(b,c)}))})(b)});c("PersistedQueue").setHandler("falco_queue_critical",function(a){var b,c=T(a.getQueueNameSuffix());while(b=a.dequeueItem())(function(b){var d=b.item;S(d)?(K(d.name,"js.use_bladerunner.log_critical",1,!0),R(),!z?(K(d.name,"js.br.init_not_complete.logCritical",1,!0),c&&(d.identity=c),L.logCritical([d],function(c){return a.markItem(b,c)})):l.enqueue(function(e){return e.logCritical([d],function(e){if(!e){J("js.br.banzai_fallback.critical",1);K(b.item.name,"js.br.banzai_fallback_for_failure.critical",1,!0);c&&(d.identity=c);L.logCritical([d],function(c){return a.markItem(b,c)});return}K(b.item.name,"js.br.success_callback.batch.critical",1,!0);a.markItem(b,e)})})):(c&&(d.identity=c),K(d.name,"js.use_banzai.log_critical",1,!0),L.logCritical([d],function(c){return a.markItem(b,c)}))})(b)});((a=c("AnalyticsCoreData").queue_activation_experiment)!=null?a:!1)&&(c("PersistedQueue").setOnQueueActivateExperiment(),c("PersistedQueue").eventEmitter.emit("active",null));c("AnalyticsCoreData").enable_dataloss_timer&&(R(),O(),P())}g.attach=a}),98);
__d("ScriptPathLogger",["Banzai","LogHistory","ScriptPath","URI","WebBlueTimeSpentNavigationFalcoEvent","WebSession","isInIframe"],(function(a,b,c,d,e,f,g){"use strict";f="script_path_change";var h={scriptPath:null,categoryToken:null,extraData:{}},i=!1,j="imp_id";function k(a){var b=c("URI").getNextURI?c("URI").getNextURI():new(c("URI"))(window.location.href),d=b.getQueryData();b=b.getPath();b.endsWith("/")&&(b=b.substr(0,b.length-1));d.comment_id&&(a.extra_data=babelHelpers["extends"]({},a.extra_data,{graphql_comment_id:d.comment_id}));var e=l(b,d);if(e){a.content_id=e;return}e=m(b);if(e!==""){a.dest_topic_feed=e;return}if(n(b)){e=d.queue_id;e&&(a.dest_srt_queue_id=e);b=d.job_in_review;b&&(a.dest_srt_reviewing_job_id=b);return}}function l(a,b){if(b.story_fbid)return b.story_fbid;if(b.fbid)return b.fbid;if(b.view==="permalink"&&b.id)return b.id;b=/\/(posts|videos|notes|groups\/.*\/permalink)\//;var c=/^[0-9]+$/;if(b.test(a)){b=a.split("/");a=b[b.length-1];if(c.test(a))return a}return""}function m(a){if(!a||a.search("/feed/topics/")==-1)return"";a=a.split("/");return a[a.length-1]}function n(a){return!!a&&a.search("/intern/review/")!==-1}function o(a,b,e,f){d("WebSession").extend();if(!i||c("isInIframe")())return;var g={source_path:a.scriptPath,source_token:a.categoryToken,dest_path:b.scriptPath,dest_token:b.categoryToken,impression_id:b.extraData?b.extraData.imp_id:null,cause:e,sid_raw:d("WebSession").getId()};e=e==="unload";e||k(g);if(f!=null){var h=f.snowlift_content_id;!e&&h!=null&&(g.content_id=h,delete f.snowlift_content_id);g.extra_data=babelHelpers["extends"]({},g.extra_data,f)}a.scriptPath===null&&(g.referrer=document.referrer);e=d("ScriptPath").getClickPointInfo();e&&(g.click_point_info=e);if(a.extraData)for(h in a.extraData)h!=j&&(g["source_"+h]=a.extraData[h]);if(b.extraData)for(f in b.extraData)f!=j&&(g["dest_"+f]=b.extraData[f]);a.topViewEndpoint&&(g.source_endpoint=a.topViewEndpoint);b.topViewEndpoint&&(g.dest_endpoint=b.topViewEndpoint);a.restored&&(g.source_restored=!0);c("WebBlueTimeSpentNavigationFalcoEvent").logImmediately(function(){return{json_data:JSON.stringify(g)}});d("ScriptPath").setClickPointInfo(null)}function p(){o(d("ScriptPath").getSourcePageInfo()||h,d("ScriptPath").getPageInfo()||h,"load")}function q(a,b,c){o(a,b,"transition",c)}function a(){o(d("ScriptPath").getPageInfo()||h,h,"unload"),d("ScriptPath").shutdown()}var r=d("ScriptPath").subscribe(function(a){if(i){var b=a.source,c=a.dest,d=a.cause;a=a.extraData;d?o(b||h,c||h,d,a):b?q(b,c||h,a):p()}});c("Banzai").subscribe(c("Banzai").SHUTDOWN,a);function b(){i=!0,d("ScriptPath").getPageInfo()&&p()}function e(){i=!1,r.remove()}g.BANZAI_LOGGING_ROUTE=f;g.startLogging=b;g.stopLogging=e}),98);
__d("ServiceWorkerURLCleaner",[],(function(a,b,c,d,e,f){var g=/sw_fnr_id=\d+&?/,h=/fnr_t=\d+&?/,i=!1,j=!1;function a(){if(i)return j;i=!0;if(location.search&&g.test(location.search)){j=!0;if(history!==void 0&&typeof history.replaceState==="function"){var a=location.toString().replace(g,"").replace(h,"").replace(/\?$/,"");history.replaceState({},document.title,a)}}return j}f.removeRedirectID=a}),66);
__d("TimeSpentImmediateActiveSecondsLoggerBlue",["ImmediateActiveSecondsConfig","ScriptPath","WebImmediateActiveSecondsFalcoEvent"],(function(a,b,c,d,e,f,g){var h=0;function i(a){if(c("ImmediateActiveSecondsConfig").sampling_rate<=0)return!1;a=Math.floor(a/1e3)%c("ImmediateActiveSecondsConfig").sampling_rate;return a===c("ImmediateActiveSecondsConfig").ias_bucket}function a(a){if(a>=h&&a-h<1e3)return;i(a)&&c("WebImmediateActiveSecondsFalcoEvent").logImmediately(function(){return{activity_time_ms:a,last_activity_time_ms:h,script_path:c("ScriptPath").getTopViewEndpoint()}});h=Math.floor(a/1e3)*1e3}f.exports={maybeReportActiveSecond:a}}),34);