'use strict';var _createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}module.exports=function(){function a(b,c){return _classCallCheck(this,a),this.edlink=b,this.user=c,this}return _createClass(a,[{key:'list',value:function b(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return this.user.request({method:'get',url:'/v1/my/courses',params:a}).then(function(a){return a.$data})}},{key:'fetch',value:function b(a){return this.user.request({method:'get',url:'/v1/my/courses/'+a}).then(function(a){return a.$data})}}]),a}();