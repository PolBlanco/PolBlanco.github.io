;/*FB_PKG_DELIM*/

__d("camelize",[],(function(a,b,c,d,e,f){var g=/-(.)/g;function a(a){return a.replace(g,function(a,b){return b.toUpperCase()})}f["default"]=a}),66);
__d("getOpacityStyleName",[],(function(a,b,c,d,e,f){var g=!1,h=null;function a(){if(!g){if(document.body&&"opacity"in document.body.style)h="opacity";else{var a=document.createElement("div");a.style.filter="alpha(opacity=100)";a.style.filter&&(h="filter")}g=!0}return h}f["default"]=a}),66);
__d("hyphenate",[],(function(a,b,c,d,e,f){var g=/([A-Z])/g;function a(a){return a.replace(g,"-$1").toLowerCase()}f["default"]=a}),66);
__d("getStyleProperty",["camelize","hyphenate"],(function(a,b,c,d,e,f,g){function h(a){return a==null?"":String(a)}function a(a,b){var d;if(window.getComputedStyle){d=window.getComputedStyle(a,null);if(d)return h(d.getPropertyValue(c("hyphenate")(b)))}if(document.defaultView&&document.defaultView.getComputedStyle){d=document.defaultView.getComputedStyle(a,null);if(d)return h(d.getPropertyValue(c("hyphenate")(b)));if(b==="display")return"none"}return a.currentStyle?b==="float"?h(a.currentStyle.cssFloat||a.currentStyle.styleFloat):h(a.currentStyle[c("camelize")(b)]):h(a.style&&a.style[c("camelize")(b)])}g["default"]=a}),98);
__d("StyleCore",["invariant","camelize","containsNode","err","getOpacityStyleName","getStyleProperty","hyphenate"],(function(a,b,c,d,e,f,g,h){function i(a,b){a=o.get(a,b);return a==="auto"||a==="scroll"}var j=new RegExp("\\s*([^\\s:]+)\\s*:\\s*([^;('\"]*(?:(?:\\([^)]*\\)|\"[^\"]*\"|'[^']*')[^;(?:'\"]*)*)(?:;|$)","g");function k(a){var b={};a.replace(j,function(a,c,d){b[c]=d;return d});return b}function l(a){var b="";for(var c in a)a[c]&&(b+=c+":"+a[c]+";");return b}function m(a){return a!==""?"alpha(opacity="+a*100+")":""}function n(a,b,d){switch(c("hyphenate")(b)){case"font-weight":case"line-height":case"opacity":case"z-index":case"animation-iteration-count":case"-webkit-animation-iteration-count":break;case"width":case"height":var e=parseInt(d,10)<0;e&&h(0,11849,a,b,d);default:isNaN(d)||!d||d==="0"||h(0,11850,a,b,d,d+"px");break}}var o={set:function(a,b,d){n("Style.set",b,d);if(a==null)return;a=a.style;switch(b){case"opacity":c("getOpacityStyleName")()==="filter"?a.filter=m(d):a.opacity=d;break;case"float":a.cssFloat=a.styleFloat=d||"";break;default:try{a[c("camelize")(b)]=d}catch(a){throw c("err")('Style.set: "%s" argument is invalid: %s',b,d)}}},apply:function(a,b){var d;for(d in b)n("Style.apply",d,b[d]);"opacity"in b&&c("getOpacityStyleName")()==="filter"&&(b.filter=m(b.opacity),delete b.opacity);var e=k(a.style.cssText);for(d in b){var f=b[d];delete b[d];var g=c("hyphenate")(d);for(var h in e)(h===g||h.indexOf(g+"-")===0)&&delete e[h];b[g]=f}Object.assign(e,b);a.style.cssText=l(e)},get:c("getStyleProperty"),getFloat:function(a,b){return parseFloat(o.get(a,b),10)},getOpacity:function(a){if(c("getOpacityStyleName")()==="filter"){var b=o.get(a,"filter");if(b){b=/(\d+(?:\.\d+)?)/.exec(b);if(b)return parseFloat(b.pop())/100}}return o.getFloat(a,"opacity")||1},isFixed:function(a){while(c("containsNode")(document.body,a)){if(o.get(a,"position")==="fixed")return!0;a=a.parentNode}return!1},getScrollParent:function(a){if(!a)return null;while(a&&a!==document.body){if(i(a,"overflow")||i(a,"overflowY")||i(a,"overflowX"))return a;a=a.parentNode}return window}};a=o;g["default"]=a}),98);
__d("Style",["$","StyleCore"],(function(a,b,c,d,e,f,g){a=babelHelpers["extends"]({},c("StyleCore"),{get:function(a,b){typeof a==="string"&&(a=c("$")(a));return c("StyleCore").get(a,b)},getFloat:function(a,b){typeof a==="string"&&(a=c("$")(a));return c("StyleCore").getFloat(a,b)}});b=a;g["default"]=b}),98);
__d("cssVar",[],(function(a,b,c,d,e,f){function a(a){throw new Error('cssVar("'+a+'"): Unexpected class transformation.')}f["default"]=a}),66);