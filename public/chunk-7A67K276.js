var m=Object.defineProperty,j=Object.defineProperties;var x=Object.getOwnPropertyDescriptors;var _=Object.getOwnPropertySymbols,S=Object.getPrototypeOf,P=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable,T=Reflect.get;var w=(e,r,t)=>r in e?m(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,D=(e,r)=>{for(var t in r||={})P.call(r,t)&&w(e,t,r[t]);if(_)for(var t of _(r))E.call(r,t)&&w(e,t,r[t]);return e},R=(e,r)=>j(e,x(r));var A=(e,r)=>{for(var t in r)m(e,t,{get:r[t],enumerable:!0})};var I=(e,r,t)=>T(S(e),t,r);var C=(e,r,t)=>new Promise((n,i)=>{var o=c=>{try{u(t.next(c))}catch(l){i(l)}},f=c=>{try{u(t.throw(c))}catch(l){i(l)}},u=c=>c.done?n(c.value):Promise.resolve(c.value).then(o,f);u((t=t.apply(e,r)).next())});function M(e,r){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(e);i<n.length;i++)r.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(t[n[i]]=e[n[i]]);return t}function G(e,r,t,n){function i(o){return o instanceof t?o:new t(function(f){f(o)})}return new(t||(t=Promise))(function(o,f){function u(s){try{l(n.next(s))}catch(y){f(y)}}function c(s){try{l(n.throw(s))}catch(y){f(y)}}function l(s){s.done?o(s.value):i(s.value).then(u,c)}l((n=n.apply(e,r||[])).next())})}function v(e){var r=typeof Symbol=="function"&&Symbol.iterator,t=r&&e[r],n=0;if(t)return t.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(r?"Object is not iterable.":"Symbol.iterator is not defined.")}function d(e){return this instanceof d?(this.v=e,this):new d(e)}function V(e,r,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t.apply(e,r||[]),i,o=[];return i=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),u("next"),u("throw"),u("return",f),i[Symbol.asyncIterator]=function(){return this},i;function f(a){return function(p){return Promise.resolve(p).then(a,y)}}function u(a,p){n[a]&&(i[a]=function(h){return new Promise(function(g,O){o.push([a,h,g,O])>1||c(a,h)})},p&&(i[a]=p(i[a])))}function c(a,p){try{l(n[a](p))}catch(h){b(o[0][3],h)}}function l(a){a.value instanceof d?Promise.resolve(a.value.v).then(s,y):b(o[0][2],a)}function s(a){c("next",a)}function y(a){c("throw",a)}function b(a,p){a(p),o.shift(),o.length&&c(o[0][0],o[0][1])}}function q(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=e[Symbol.asyncIterator],t;return r?r.call(e):(e=typeof v=="function"?v(e):e[Symbol.iterator](),t={},n("next"),n("throw"),n("return"),t[Symbol.asyncIterator]=function(){return this},t);function n(o){t[o]=e[o]&&function(f){return new Promise(function(u,c){f=e[o](f),i(u,c,f.done,f.value)})}}function i(o,f,u,c){Promise.resolve(c).then(function(l){o({value:l,done:u})},f)}}export{D as a,R as b,A as c,I as d,C as e,M as f,G as g,d as h,V as i,q as j};
