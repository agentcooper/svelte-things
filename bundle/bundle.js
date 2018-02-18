var app=function(){"use strict";function t(){}function e(t){for(var e,n,o=1,i=arguments.length;o<i;o++){n=arguments[o];for(e in n)t[e]=n[e]}return t}function n(t,e){e.appendChild(t)}function o(t,e,n){e.insertBefore(t,n)}function i(t){t.parentNode.removeChild(t)}function r(t){for(var e=0;e<t.length;e+=1)t[e]&&t[e].d()}function c(t){return document.createElement(t)}function a(t){return document.createTextNode(t)}function s(){return document.createComment("")}function u(t,e,n){t.addEventListener(e,n,!1)}function l(t,e,n){t.removeEventListener(e,n,!1)}function f(t,e,n){t.setAttribute(e,n)}function d(t,e,n){t.style.setProperty(e,n)}function h(){return Object.create(null)}function g(e){this.destroy=t,this.fire("destroy"),this.set=this.get=t,!1!==e&&this._fragment.u(),this._fragment.d(),this._fragment=this._state=null}function m(t,e){return t!==e||t&&"object"==typeof t||"function"==typeof t}function _(t,e,n,o,i){for(var r in e)if(n[r]){var c=o[r],a=i[r],s=e[r];if(s)for(var u=0;u<s.length;u+=1){var l=s[u];l.__calling||(l.__calling=!0,l.call(t,c,a),l.__calling=!1)}}}function v(t,e){t._observers={pre:h(),post:h()},t._handlers=h(),t._bind=e._bind,t.options=e,t.root=e.root||t,t.store=t.root.store||e.store}function p(t){for(;t&&t.length;)t.pop()()}var y={destroy:g,get:function(t){return t?this._state[t]:this._state},fire:function(t,e){var n=t in this._handlers&&this._handlers[t].slice();if(n)for(var o=0;o<n.length;o+=1)n[o].call(this,e)},observe:function(t,e,n){var o=n&&n.defer?this._observers.post:this._observers.pre;return(o[t]||(o[t]=[])).push(e),n&&!1===n.init||(e.__calling=!0,e.call(this,this._state[t]),e.__calling=!1),{cancel:function(){var n=o[t].indexOf(e);~n&&o[t].splice(n,1)}}},on:function(t,e){if("teardown"===t)return this.on("destroy",e);var n=this._handlers[t]||(this._handlers[t]=[]);return n.push(e),{cancel:function(){var t=n.indexOf(e);~t&&n.splice(t,1)}}},set:function(t){this._set(e({},t)),this.root._lock||(this.root._lock=!0,p(this.root._beforecreate),p(this.root._oncreate),p(this.root._aftercreate),this.root._lock=!1)},teardown:g,_recompute:t,_set:function(t){var n=this._state,o={},i=!1;for(var r in t)m(t[r],n[r])&&(o[r]=i=!0);i&&(this._state=e({},n,t),this._recompute(o,this._state),this._bind&&this._bind(o,this._state),this._fragment&&(_(this,this._observers.pre,o,this._state,n),this._fragment.p(o,this._state),_(this,this._observers.post,o,this._state,n)))},_mount:function(t,e){this._fragment.m(t,e)},_unmount:function(){this._fragment&&this._fragment.u()}};function b(t){f(t,"svelte-951484143","")}function k(t){v(this,t),this.refs={},this._state=e({isOpen:!1},t.data);var r=function(){var t=this;this.refs.text.getBoundingClientRect(),this.fullWidth=this.refs.root.scrollWidth+this.refs.root.offsetWidth,this.observe("isOpen",function(e){t.refs.root.style.width=e?"calc("+t.fullWidth+"px + 2em)":"1em"})}.bind(this);t.root?this.root._oncreate.push(r):this._oncreate=[r],this._fragment=function(t,e){var r,s,f,d,h,g,m;function _(t){e.reset(t)}function v(t){e.click(t)}return window.addEventListener("click",_),{c:function(){r=c("span"),s=c("i"),d=a("\n  "),h=c("span"),g=a(t.text),this.h()},h:function(){b(r),b(s),s.className=f="toggle-icon__icon fas "+t.icon,h.className="toggle-icon__text",r.className=m=(t.isOpen?"toggle-icon--open":"")+" toggle-icon",u(r,"click",v)},m:function(t,i){o(r,t,i),n(s,r),n(d,r),n(h,r),n(g,h),e.refs.text=h,e.refs.root=r},p:function(t,e){t.icon&&f!==(f="toggle-icon__icon fas "+e.icon)&&(s.className=f),t.text&&(g.data=e.text),t.isOpen&&m!==(m=(e.isOpen?"toggle-icon--open":"")+" toggle-icon")&&(r.className=m)},u:function(){i(r)},d:function(){window.removeEventListener("click",_),e.refs.text===h&&(e.refs.text=null),l(r,"click",v),e.refs.root===r&&(e.refs.root=null)}}}(this._state,this),t.target&&(this._fragment.c(),this._fragment.m(t.target,t.anchor||null),p(this._oncreate))}e(k.prototype,{reset:function(t){t.target.contains(this.refs.root)||this.set({isOpen:!1})},click:function(t){this.set({isOpen:!0})}},y);var x={change:function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var n,o,i,r=this.refs.todo;o="todo-flash",(n=r).classList.remove(o),n.offsetWidth,n.classList.add(o),(i=this).fire.apply(i,t)},edit:function(t,e){t.target.matches("input[type='checkbox']")||this.fire("edit",{id:e})},click:function(t,e){t.target.matches("input[type='checkbox']")||(t.stopPropagation(),this.fire("select",{id:e}))}};function N(t){f(t,"svelte-2449100740","")}function C(t){v(this,t),this.refs={},this._state=e({edit:!1},t.data),t.root||(this._oncreate=[],this._beforecreate=[],this._aftercreate=[]),this._fragment=function(t,e){var r,s,f,h,g,m,_,v,p,y,b,x,C,T,w,E;function L(){e.set({done:f.checked})}function O(t){var n=e.get();e.change("change",{id:n.id,done:n.done})}var W=new k({root:e.root,data:{text:"When",icon:"icon-calendar"}}),j=new k({root:e.root,data:{text:"Tags",icon:"icon-tag"}}),A=new k({root:e.root,data:{text:"Checklist",icon:"icon-list-bullet"}}),H=new k({root:e.root,data:{text:"Deadline",icon:"icon-flag"}});function M(t){var n=e.get();e.click(t,n.id)}function S(t){var n=e.get();e.edit(t,n.id)}return{c:function(){r=c("div"),s=c("div"),f=c("input"),h=a(" "),g=a(t.title),m=a("\n  "),_=c("textarea"),v=a("\n  "),p=c("div"),y=c("div"),b=a("\n    "),x=c("div"),W._fragment.c(),C=a("\n      "),j._fragment.c(),T=a("\n      "),A._fragment.c(),w=a("\n      "),H._fragment.c(),this.h()},h:function(){N(r),u(f,"change",L),f.type="checkbox",u(f,"change",O),N(_),_.placeholder="Notes",_.className="textarea",N(p),d(y,"flex","1"),p.className="todo-controls",r.className=E=(t.done?"todo--done":"")+" "+(t.edit?"todo--edit":"")+" "+(t.active&&!t.edit?"todo--active":"")+" todo",u(r,"click",M),u(r,"dblclick",S)},m:function(i,c){o(r,i,c),n(s,r),n(f,s),f.checked=t.done,n(h,s),n(g,s),n(m,r),n(_,r),n(v,r),n(p,r),n(y,p),n(b,p),n(x,p),W._mount(x,null),n(C,x),j._mount(x,null),n(T,x),A._mount(x,null),n(w,x),H._mount(x,null),e.refs.todo=r},p:function(t,e){f.checked=e.done,t.title&&(g.data=e.title),(t.done||t.edit||t.active)&&E!==(E=(e.done?"todo--done":"")+" "+(e.edit?"todo--edit":"")+" "+(e.active&&!e.edit?"todo--active":"")+" todo")&&(r.className=E)},u:function(){i(r)},d:function(){l(f,"change",L),l(f,"change",O),W.destroy(!1),j.destroy(!1),A.destroy(!1),H.destroy(!1),l(r,"click",M),l(r,"dblclick",S),e.refs.todo===r&&(e.refs.todo=null)}}}(this._state,this),t.target&&(this._fragment.c(),this._fragment.m(t.target,t.anchor||null),this._lock=!0,p(this._beforecreate),p(this._oncreate),p(this._aftercreate),this._lock=!1)}function T(t){return"Inbox"===t?"icon-inbox things-inbox":"Upcoming"===t?"icon-calendar things-upcoming":"Anytime"===t?"icon-stackoverflow things-anytime":"Someday"===t?"icon-box things-someday":"Today"===t?"icon-star things-star":void 0}function w(t){f(t,"svelte-1345177302","")}function E(t,e,r,s,f){var d,h,g,m,_,v,p,y=r.title,b=r.left>0&&L(t,e,r,s,f);return{c:function(){d=c("li"),h=c("i"),m=a("\n      "),_=a(y),v=a(" "),b&&b.c(),this.h()},h:function(){w(d),w(h),h.className=g="fas "+T(r.title),d.className=p=(r.title===t.currentCategory?" sidebar-item--selected ":" ")+" sidebar-item",u(d,"click",O),d._svelte={component:f,categories:e,category_index:s}},m:function(t,e){o(d,t,e),n(h,d),n(m,d),n(_,d),n(v,d),b&&b.m(d,null)},p:function(t,e,n,o,i){t.categories&&g!==(g="fas "+T(o.title))&&(h.className=g),t.categories&&y!==(y=o.title)&&(_.data=y),o.left>0?b?b.p(t,e,n,o,i):((b=L(e,n,o,i,f)).c(),b.m(d,null)):b&&(b.u(),b.d(),b=null),(t.categories||t.currentCategory)&&p!==(p=(o.title===e.currentCategory?" sidebar-item--selected ":" ")+" sidebar-item")&&(d.className=p),d._svelte.categories=n,d._svelte.category_index=i},u:function(){i(d),b&&b.u()},d:function(){b&&b.d(),l(d,"click",O)}}}function L(e,r,s,u,l){var f,d,h=s.left;return{c:function(){f=c("span"),d=a(h),this.h()},h:function(){w(f),f.className="number"},m:function(t,e){o(f,t,e),n(d,f)},p:function(t,e,n,o,i){t.categories&&h!==(h=o.left)&&(d.data=h)},u:function(){i(f)},d:t}}function O(t){var e=this._svelte.component,n=this._svelte.categories[this._svelte.category_index];e.fire("change",{category:n.title})}function W(t){v(this,t),this._state=e({},t.data),this._fragment=function(t,e){for(var a,s,u=t.categories,l=[],f=0;f<u.length;f+=1)l[f]=E(t,u,u[f],f,e);return{c:function(){a=c("div"),s=c("ul");for(var t=0;t<l.length;t+=1)l[t].c();this.h()},h:function(){w(a),w(s),s.className="sidebar-items",a.className="sidebar"},m:function(t,e){o(a,t,e),n(s,a);for(var i=0;i<l.length;i+=1)l[i].m(s,null)},p:function(t,n){var o=n.categories;if(t.categories||t.currentCategory){for(var i=0;i<o.length;i+=1)l[i]?l[i].p(t,n,o,o[i],i):(l[i]=E(n,o,o[i],i,e),l[i].c(),l[i].m(s,null));for(;i<l.length;i+=1)l[i].u(),l[i].d();l.length=o.length}},u:function(){i(a);for(var t=0;t<l.length;t+=1)l[t].u()},d:function(){r(l)}}}(this._state,this),t.target&&(this._fragment.c(),this._fragment.m(t.target,t.anchor||null))}function j(t){v(this,t),this._state=e({title:"",notes:""},t.data),this._fragment=function(t,e){var n,r,s,f,d,h=!1,g=!1;function m(){h=!0,e.set({title:n.value}),h=!1}function _(){g=!0,e.set({notes:s.value}),g=!1}function v(t){var n=e.get();e.fire("create",{title:n.title,notes:n.notes})}return{c:function(){n=c("input"),r=a("\n"),s=c("textarea"),f=a("\n"),(d=c("button")).textContent="Create",this.h()},h:function(){u(n,"input",m),u(s,"input",_),u(d,"click",v)},m:function(e,i){o(n,e,i),n.value=t.title,o(r,e,i),o(s,e,i),s.value=t.notes,o(f,e,i),o(d,e,i)},p:function(t,e){h||(n.value=e.title),g||(s.value=e.notes)},u:function(){i(n),i(r),i(s),i(f),i(d)},d:function(){l(n,"input",m),l(s,"input",_),l(d,"click",v)}}}(this._state,this),t.target&&(this._fragment.c(),this._fragment.m(t.target,t.anchor||null))}function A(t){f(t,"svelte-845333765","")}function H(r){v(this,r),this._state=e({},r.data),this._fragment=function(e,r){var s,f,d,h,g,m,_,v,p;function y(t){r.fire("create")}function b(t){r.fire("calendar")}function k(t){r.fire("move")}function x(t){r.fire("search")}return{c:function(){s=c("div"),f=c("div"),(d=c("span")).innerHTML='<i svelte-845333765 class="control-icon icon-plus"></i>',h=a("\n    "),(g=c("span")).innerHTML='<i svelte-845333765 class="control-icon icon-calendar"></i>',m=a("\n    "),(_=c("span")).innerHTML='<i svelte-845333765 class="control-icon icon-right"></i>',v=a("\n    "),(p=c("span")).innerHTML='<i svelte-845333765 class="control-icon icon-search"></i>',this.h()},h:function(){A(s),A(f),u(d,"click",y),u(g,"click",b),u(_,"click",k),u(p,"click",x),f.className="controls",s.className="controls-container"},m:function(t,e){o(s,t,e),n(f,s),n(d,f),n(h,f),n(g,f),n(m,f),n(_,f),n(v,f),n(p,f)},p:t,u:function(){i(s)},d:function(){l(d,"click",y),l(g,"click",b),l(_,"click",k),l(p,"click",x)}}}(this._state,this),r.target&&(this._fragment.c(),this._fragment.m(r.target,r.anchor||null))}function M(t){return"Inbox"===t?"icon-inbox things-inbox":"Today"===t?"icon-star things-star":void 0}e(C.prototype,x,y),e(W.prototype,y),e(j.prototype,y),e(H.prototype,y);var S={shortcut:function(t){78===t.keyCode&&t.ctrlKey&&(t.preventDefault(),this.create())},reset:function(){this.set({currentTodo:-1,currentEdit:-1})},create:function(){var t,e=this,n=this.get(),o=0===(t=n.todos).length?0:t.map(function(t){return t.id}).sort(function(t,e){return e-t})[0]+1,i=[{id:o,title:"New to-do",notes:"",done:!1,category:n.currentCategory}].concat(n.todos);this.set({todos:i}),setTimeout(function(){e.set({currentEdit:o,currentTodo:o})},0)},changeCategory:function(t){this.set({currentCategory:t})},edit:function(t){var e=t.id;this.set({currentTodo:e,currentEdit:e})},select:function(t){var e=t.id;this.set({currentTodo:e})},change:function(t){var e=t.id,n=t.done,o=this.get().todos.map(function(t){return t.id===e?Object.assign({},t,{done:n}):t});this.set({todos:o})}};function B(t){f(t,"svelte-99304421","")}function I(t,e){var n=new j({root:e.root});return n.on("create",function(t){e.create(t)}),{c:function(){n._fragment.c()},m:function(t,e){n._mount(t,e)},u:function(){n._unmount()},d:function(){n.destroy(!1)}}}function P(t,e,n,r,c){var a,u=n.category===t.currentCategory&&D(t,e,n,r,c);return{c:function(){u&&u.c(),a=s()},m:function(t,e){u&&u.m(t,e),o(a,t,e)},p:function(t,e,n,o,i){o.category===e.currentCategory?u?u.p(t,e,n,o,i):((u=D(e,n,o,i,c)).c(),u.m(a.parentNode,a)):u&&(u.u(),u.d(),u=null)},u:function(){u&&u.u(),i(a)},d:function(){u&&u.d()}}}function D(t,e,n,r,a){var s,u=new C({root:a.root,data:{edit:t.currentEdit===n.id,active:t.currentTodo===n.id,id:n.id,done:n.done,title:n.title}});return u.on("edit",function(t){a.edit(t)}),u.on("select",function(t){a.select(t)}),u.on("change",function(t){a.change(t)}),{c:function(){s=c("li"),u._fragment.c(),this.h()},h:function(){s.className="todo"},m:function(t,e){o(s,t,e),u._mount(s,null)},p:function(t,e,n,o,i){var r={};(t.currentEdit||t.todos)&&(r.edit=e.currentEdit===o.id),(t.currentTodo||t.todos)&&(r.active=e.currentTodo===o.id),t.todos&&(r.id=o.id),t.todos&&(r.done=o.done),t.todos&&(r.title=o.title),u._set(r)},u:function(){i(s)},d:function(){u.destroy(!1)}}}function U(t){v(this,t),this._state=e({creatingTodo:!1,currentTodo:-1,currentEdit:-1,currentCategory:"Today"},t.data),this._recompute({todos:1},this._state),t.root||(this._oncreate=[],this._beforecreate=[],this._aftercreate=[]),this._fragment=function(t,e){var f,h,g,m,_,v,p,y,b,k,x,N,C,T,w,E;function L(t){e.shortcut(t)}window.addEventListener("keydown",L);var O=new W({root:e.root,data:{categories:t.categories,currentCategory:t.currentCategory}});O.on("change",function(t){e.changeCategory(t.category)});for(var j=t.creatingTodo&&I(0,e),A=t.todos,S=[],D=0;D<A.length;D+=1)S[D]=P(t,A,A[D],D,e);var U=new H({root:e.root});function q(t){e.reset()}return U.on("create",function(t){e.create()}),{c:function(){f=c("div"),O._fragment.c(),h=a("\n  "),g=c("div"),m=c("div"),_=c("h1"),v=c("i"),y=a("\n        "),b=c("span"),k=a(t.currentCategory),x=a("\n      "),N=c("div"),C=c("ul"),j&&j.c(),T=s();for(var e=0;e<S.length;e+=1)S[e].c();w=a("\n    "),U._fragment.c(),this.h()},h:function(){B(f),B(g),B(m),B(v),v.className=p="fas "+M(t.currentCategory),d(b,"margin-left","0.1em"),B(N),B(C),C.className="category-todo-list",N.className="category-todos",m.className="category-area",g.className="category",f.className=E=(-1!=t.currentEdit?"container--has-edit":"")+" container",d(f,"display","flex"),d(f,"height","100%"),u(f,"click",q)},m:function(t,e){o(f,t,e),O._mount(f,null),n(h,f),n(g,f),n(m,g),n(_,m),n(v,_),n(y,_),n(b,_),n(k,b),n(x,m),n(N,m),n(C,N),j&&j.m(C,null),n(T,C);for(var i=0;i<S.length;i+=1)S[i].m(C,null);n(w,g),U._mount(g,null)},p:function(t,n){var o={};t.categories&&(o.categories=n.categories),t.currentCategory&&(o.currentCategory=n.currentCategory),O._set(o),t.currentCategory&&p!==(p="fas "+M(n.currentCategory))&&(v.className=p),t.currentCategory&&(k.data=n.currentCategory),n.creatingTodo?j||((j=I(0,e)).c(),j.m(C,T)):j&&(j.u(),j.d(),j=null);var i=n.todos;if(t.todos||t.currentCategory||t.currentEdit||t.currentTodo){for(var r=0;r<i.length;r+=1)S[r]?S[r].p(t,n,i,i[r],r):(S[r]=P(n,i,i[r],r,e),S[r].c(),S[r].m(C,null));for(;r<S.length;r+=1)S[r].u(),S[r].d();S.length=i.length}t.currentEdit&&E!==(E=(-1!=n.currentEdit?"container--has-edit":"")+" container")&&(f.className=E)},u:function(){i(f),j&&j.u();for(var t=0;t<S.length;t+=1)S[t].u()},d:function(){window.removeEventListener("keydown",L),O.destroy(!1),j&&j.d(),r(S),U.destroy(!1),l(f,"click",q)}}}(this._state,this),t.target&&(this._fragment.c(),this._fragment.m(t.target,t.anchor||null),this._lock=!0,p(this._beforecreate),p(this._oncreate),p(this._aftercreate),this._lock=!1)}e(U.prototype,S,y),U.prototype._recompute=function(t,e){var n;t.todos&&m(e.categories,e.categories=(n=e.todos,Object.entries(n.reduce(function(t,e){return t[e.category]||(t[e.category]=0),e.done||t[e.category]++,t},{Upcoming:0,Anytime:0,Someday:0})).map(function(t){return{title:t[0],left:t[1]}})))&&(t.categories=!0)};var q,F,K={todos:(q=[{title:"Buy Things 3 app",done:!0,category:"Inbox"},{title:"Learn guitar",done:!1,category:"Someday"},{title:"Finish this app",done:!1,category:"Anytime"},{title:"Todo: select animation",done:!0},{title:"Todo: double click animation",done:!0},{title:"Ctrl + N shortcut",done:!0},{title:"Todo: checkbox checked animation",done:!1},{title:"Popups",done:!1},{title:"New todo: edit title",done:!1}],void 0===F&&(F="Today"),q.map(function(t,e){return Object.assign({id:e,notes:"",category:F},t)}))};return new U({target:document.querySelector("main"),data:K})}();
//# sourceMappingURL=bundle.js.map
