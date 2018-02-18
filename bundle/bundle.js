var app=function(){"use strict";function t(){}function e(t){for(var e,n,o=1,i=arguments.length;o<i;o++){n=arguments[o];for(e in n)t[e]=n[e]}return t}function n(t,e){e.appendChild(t)}function o(t,e,n){e.insertBefore(t,n)}function i(t){t.parentNode.removeChild(t)}function r(t){for(;t.nextSibling;)t.parentNode.removeChild(t.nextSibling)}function c(t){for(var e=0;e<t.length;e+=1)t[e]&&t[e].d()}function a(t){return document.createElement(t)}function s(t){return document.createTextNode(t)}function u(){return document.createComment("")}function l(t,e,n){t.addEventListener(e,n,!1)}function f(t,e,n){t.removeEventListener(e,n,!1)}function d(t,e,n){t.setAttribute(e,n)}function h(t,e,n){t.style.setProperty(e,n)}function g(){return Object.create(null)}function m(e){this.destroy=t,this.fire("destroy"),this.set=this.get=t,!1!==e&&this._fragment.u(),this._fragment.d(),this._fragment=this._state=null}function _(t,e){return t!==e||t&&"object"==typeof t||"function"==typeof t}function v(t,e,n,o,i){for(var r in e)if(n[r]){var c=o[r],a=i[r],s=e[r];if(s)for(var u=0;u<s.length;u+=1){var l=s[u];l.__calling||(l.__calling=!0,l.call(t,c,a),l.__calling=!1)}}}function p(t,e){t._observers={pre:g(),post:g()},t._handlers=g(),t._bind=e._bind,t.options=e,t.root=e.root||t,t.store=t.root.store||e.store}function y(t){for(;t&&t.length;)t.pop()()}var b={destroy:m,get:function(t){return t?this._state[t]:this._state},fire:function(t,e){var n=t in this._handlers&&this._handlers[t].slice();if(n)for(var o=0;o<n.length;o+=1)n[o].call(this,e)},observe:function(t,e,n){var o=n&&n.defer?this._observers.post:this._observers.pre;return(o[t]||(o[t]=[])).push(e),n&&!1===n.init||(e.__calling=!0,e.call(this,this._state[t]),e.__calling=!1),{cancel:function(){var n=o[t].indexOf(e);~n&&o[t].splice(n,1)}}},on:function(t,e){if("teardown"===t)return this.on("destroy",e);var n=this._handlers[t]||(this._handlers[t]=[]);return n.push(e),{cancel:function(){var t=n.indexOf(e);~t&&n.splice(t,1)}}},set:function(t){this._set(e({},t)),this.root._lock||(this.root._lock=!0,y(this.root._beforecreate),y(this.root._oncreate),y(this.root._aftercreate),this.root._lock=!1)},teardown:m,_recompute:t,_set:function(t){var n=this._state,o={},i=!1;for(var r in t)_(t[r],n[r])&&(o[r]=i=!0);i&&(this._state=e({},n,t),this._recompute(o,this._state),this._bind&&this._bind(o,this._state),this._fragment&&(v(this,this._observers.pre,o,this._state,n),this._fragment.p(o,this._state),v(this,this._observers.post,o,this._state,n)))},_mount:function(t,e){this._fragment.m(t,e)},_unmount:function(){this._fragment&&this._fragment.u()}};function k(t){d(t,"svelte-951484143","")}function x(t){p(this,t),this.refs={},this._state=e({isOpen:!1},t.data);var r=function(){var t=this;this.refs.text.getBoundingClientRect(),this.fullWidth=this.refs.root.scrollWidth+this.refs.root.offsetWidth,this.observe("isOpen",function(e){t.refs.root.style.width=e?"calc("+t.fullWidth+"px + 2em)":"1em"})}.bind(this);t.root?this.root._oncreate.push(r):this._oncreate=[r],this._fragment=function(t,e){var r,c,u,d,h,g,m;function _(t){e.reset(t)}function v(t){e.click(t)}return window.addEventListener("click",_),{c:function(){r=a("span"),c=a("i"),d=s("\n  "),h=a("span"),g=s(t.text),this.h()},h:function(){k(r),k(c),c.className=u="toggle-icon__icon fas "+t.icon,h.className="toggle-icon__text",r.className=m=(t.isOpen?"toggle-icon--open":"")+" toggle-icon",l(r,"click",v)},m:function(t,i){o(r,t,i),n(c,r),n(d,r),n(h,r),n(g,h),e.refs.text=h,e.refs.root=r},p:function(t,e){t.icon&&u!==(u="toggle-icon__icon fas "+e.icon)&&(c.className=u),t.text&&(g.data=e.text),t.isOpen&&m!==(m=(e.isOpen?"toggle-icon--open":"")+" toggle-icon")&&(r.className=m)},u:function(){i(r)},d:function(){window.removeEventListener("click",_),e.refs.text===h&&(e.refs.text=null),f(r,"click",v),e.refs.root===r&&(e.refs.root=null)}}}(this._state,this),t.target&&(this._fragment.c(),this._fragment.m(t.target,t.anchor||null),y(this._oncreate))}e(x.prototype,{reset:function(t){t.target.contains(this.refs.root)||this.set({isOpen:!1})},click:function(t){this.set({isOpen:!0})}},b);var N={change:function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var n,o,i,r=this.refs.todo;o="todo-flash",(n=r).classList.remove(o),n.offsetWidth,n.classList.add(o),(i=this).fire.apply(i,t)},edit:function(t,e){t.target.matches("input[type='checkbox']")||this.fire("edit",{id:e})},click:function(t,e){t.target.matches("input[type='checkbox']")||(t.stopPropagation(),this.fire("select",{id:e}))}};function C(t){d(t,"svelte-3202716482","")}function T(t){p(this,t),this.refs={},this._state=e({edit:!1},t.data),t.root||(this._oncreate=[],this._beforecreate=[],this._aftercreate=[]),this._fragment=function(t,e){var c,u,d,g,m,_,v,p,y,b,k,N,T,w,E,L;function O(){e.set({done:d.checked})}function j(t){var n=e.get();e.change("change",{id:n.id,done:n.done})}var A=new x({root:e.root,data:{text:"When",icon:"icon-calendar"}}),H=new x({root:e.root,data:{text:"Tags",icon:"icon-tag"}}),M=new x({root:e.root,data:{text:"Checklist",icon:"icon-list-bullet"}}),S=new x({root:e.root,data:{text:"Deadline",icon:"icon-flag"}});function W(t){var n=e.get();e.click(t,n.id)}function B(t){var n=e.get();e.edit(t,n.id)}return{c:function(){c=a("div"),u=a("div"),d=a("input"),g=s(" "),m=a("noscript"),_=s("\n  "),v=a("textarea"),p=s("\n  "),y=a("div"),b=a("div"),k=s("\n    "),N=a("div"),A._fragment.c(),T=s("\n      "),H._fragment.c(),w=s("\n      "),M._fragment.c(),E=s("\n      "),S._fragment.c(),this.h()},h:function(){C(c),l(d,"change",O),d.type="checkbox",l(d,"change",j),C(v),v.placeholder="Notes",v.className="textarea",C(y),h(b,"flex","1"),y.className="todo-controls",c.className=L=(t.done?"todo--done":"")+" "+(t.edit?"todo--edit":"")+" "+(t.active&&!t.edit?"todo--active":"")+" todo",l(c,"click",W),l(c,"dblclick",B)},m:function(i,r){o(c,i,r),n(u,c),n(d,u),d.checked=t.done,n(g,u),n(m,u),m.insertAdjacentHTML("afterend",t.title),n(_,c),n(v,c),n(p,c),n(y,c),n(b,y),n(k,y),n(N,y),A._mount(N,null),n(T,N),H._mount(N,null),n(w,N),M._mount(N,null),n(E,N),S._mount(N,null),e.refs.todo=c},p:function(t,e){d.checked=e.done,t.title&&(r(m),m.insertAdjacentHTML("afterend",e.title)),(t.done||t.edit||t.active)&&L!==(L=(e.done?"todo--done":"")+" "+(e.edit?"todo--edit":"")+" "+(e.active&&!e.edit?"todo--active":"")+" todo")&&(c.className=L)},u:function(){r(m),i(c)},d:function(){f(d,"change",O),f(d,"change",j),A.destroy(!1),H.destroy(!1),M.destroy(!1),S.destroy(!1),f(c,"click",W),f(c,"dblclick",B),e.refs.todo===c&&(e.refs.todo=null)}}}(this._state,this),t.target&&(this._fragment.c(),this._fragment.m(t.target,t.anchor||null),this._lock=!0,y(this._beforecreate),y(this._oncreate),y(this._aftercreate),this._lock=!1)}function w(t){return"Inbox"===t?"icon-inbox things-inbox":"Upcoming"===t?"icon-calendar things-upcoming":"Anytime"===t?"icon-stackoverflow things-anytime":"Someday"===t?"icon-box things-someday":"Today"===t?"icon-star things-star":void 0}function E(t){d(t,"svelte-1345177302","")}function L(t,e,r,c,u){var d,h,g,m,_,v,p,y=r.title,b=r.left>0&&O(t,e,r,c,u);return{c:function(){d=a("li"),h=a("i"),m=s("\n      "),_=s(y),v=s(" "),b&&b.c(),this.h()},h:function(){E(d),E(h),h.className=g="fas "+w(r.title),d.className=p=(r.title===t.currentCategory?" sidebar-item--selected ":" ")+" sidebar-item",l(d,"click",j),d._svelte={component:u,categories:e,category_index:c}},m:function(t,e){o(d,t,e),n(h,d),n(m,d),n(_,d),n(v,d),b&&b.m(d,null)},p:function(t,e,n,o,i){t.categories&&g!==(g="fas "+w(o.title))&&(h.className=g),t.categories&&y!==(y=o.title)&&(_.data=y),o.left>0?b?b.p(t,e,n,o,i):((b=O(e,n,o,i,u)).c(),b.m(d,null)):b&&(b.u(),b.d(),b=null),(t.categories||t.currentCategory)&&p!==(p=(o.title===e.currentCategory?" sidebar-item--selected ":" ")+" sidebar-item")&&(d.className=p),d._svelte.categories=n,d._svelte.category_index=i},u:function(){i(d),b&&b.u()},d:function(){b&&b.d(),f(d,"click",j)}}}function O(e,r,c,u,l){var f,d,h=c.left;return{c:function(){f=a("span"),d=s(h),this.h()},h:function(){E(f),f.className="number"},m:function(t,e){o(f,t,e),n(d,f)},p:function(t,e,n,o,i){t.categories&&h!==(h=o.left)&&(d.data=h)},u:function(){i(f)},d:t}}function j(t){var e=this._svelte.component,n=this._svelte.categories[this._svelte.category_index];e.fire("change",{category:n.title})}function A(t){p(this,t),this._state=e({},t.data),this._fragment=function(t,e){for(var r,s,u=t.categories,l=[],f=0;f<u.length;f+=1)l[f]=L(t,u,u[f],f,e);return{c:function(){r=a("div"),s=a("ul");for(var t=0;t<l.length;t+=1)l[t].c();this.h()},h:function(){E(r),E(s),s.className="sidebar-items",r.className="sidebar"},m:function(t,e){o(r,t,e),n(s,r);for(var i=0;i<l.length;i+=1)l[i].m(s,null)},p:function(t,n){var o=n.categories;if(t.categories||t.currentCategory){for(var i=0;i<o.length;i+=1)l[i]?l[i].p(t,n,o,o[i],i):(l[i]=L(n,o,o[i],i,e),l[i].c(),l[i].m(s,null));for(;i<l.length;i+=1)l[i].u(),l[i].d();l.length=o.length}},u:function(){i(r);for(var t=0;t<l.length;t+=1)l[t].u()},d:function(){c(l)}}}(this._state,this),t.target&&(this._fragment.c(),this._fragment.m(t.target,t.anchor||null))}function H(t){p(this,t),this._state=e({title:"",notes:""},t.data),this._fragment=function(t,e){var n,r,c,u,d,h=!1,g=!1;function m(){h=!0,e.set({title:n.value}),h=!1}function _(){g=!0,e.set({notes:c.value}),g=!1}function v(t){var n=e.get();e.fire("create",{title:n.title,notes:n.notes})}return{c:function(){n=a("input"),r=s("\n"),c=a("textarea"),u=s("\n"),(d=a("button")).textContent="Create",this.h()},h:function(){l(n,"input",m),l(c,"input",_),l(d,"click",v)},m:function(e,i){o(n,e,i),n.value=t.title,o(r,e,i),o(c,e,i),c.value=t.notes,o(u,e,i),o(d,e,i)},p:function(t,e){h||(n.value=e.title),g||(c.value=e.notes)},u:function(){i(n),i(r),i(c),i(u),i(d)},d:function(){f(n,"input",m),f(c,"input",_),f(d,"click",v)}}}(this._state,this),t.target&&(this._fragment.c(),this._fragment.m(t.target,t.anchor||null))}function M(t){d(t,"svelte-845333765","")}function S(r){p(this,r),this._state=e({},r.data),this._fragment=function(e,r){var c,u,d,h,g,m,_,v,p;function y(t){r.fire("create")}function b(t){r.fire("calendar")}function k(t){r.fire("move")}function x(t){r.fire("search")}return{c:function(){c=a("div"),u=a("div"),(d=a("span")).innerHTML='<i svelte-845333765 class="control-icon icon-plus"></i>',h=s("\n    "),(g=a("span")).innerHTML='<i svelte-845333765 class="control-icon icon-calendar"></i>',m=s("\n    "),(_=a("span")).innerHTML='<i svelte-845333765 class="control-icon icon-right"></i>',v=s("\n    "),(p=a("span")).innerHTML='<i svelte-845333765 class="control-icon icon-search"></i>',this.h()},h:function(){M(c),M(u),l(d,"click",y),l(g,"click",b),l(_,"click",k),l(p,"click",x),u.className="controls",c.className="controls-container"},m:function(t,e){o(c,t,e),n(u,c),n(d,u),n(h,u),n(g,u),n(m,u),n(_,u),n(v,u),n(p,u)},p:t,u:function(){i(c)},d:function(){f(d,"click",y),f(g,"click",b),f(_,"click",k),f(p,"click",x)}}}(this._state,this),r.target&&(this._fragment.c(),this._fragment.m(r.target,r.anchor||null))}function W(t){return"Inbox"===t?"icon-inbox things-inbox":"Today"===t?"icon-star things-star":void 0}e(T.prototype,N,b),e(A.prototype,b),e(H.prototype,b),e(S.prototype,b);var B={shortcut:function(t){78===t.keyCode&&t.ctrlKey&&(t.preventDefault(),this.create())},reset:function(){this.set({currentTodo:-1,currentEdit:-1})},create:function(){var t,e=this,n=this.get(),o=0===(t=n.todos).length?0:t.map(function(t){return t.id}).sort(function(t,e){return e-t})[0]+1,i=[{id:o,title:"New to-do",notes:"",done:!1,category:n.currentCategory}].concat(n.todos);this.set({todos:i}),setTimeout(function(){e.set({currentEdit:o,currentTodo:o})},0)},changeCategory:function(t){this.set({currentCategory:t})},edit:function(t){var e=t.id;this.set({currentTodo:e,currentEdit:e})},select:function(t){var e=t.id;this.set({currentTodo:e})},change:function(t){var e=t.id,n=t.done,o=this.get().todos.map(function(t){return t.id===e?Object.assign({},t,{done:n}):t});this.set({todos:o})}};function I(t){d(t,"svelte-99304421","")}function P(t,e){var n=new H({root:e.root});return n.on("create",function(t){e.create(t)}),{c:function(){n._fragment.c()},m:function(t,e){n._mount(t,e)},u:function(){n._unmount()},d:function(){n.destroy(!1)}}}function D(t,e,n,r,c){var a,s=n.category===t.currentCategory&&U(t,e,n,r,c);return{c:function(){s&&s.c(),a=u()},m:function(t,e){s&&s.m(t,e),o(a,t,e)},p:function(t,e,n,o,i){o.category===e.currentCategory?s?s.p(t,e,n,o,i):((s=U(e,n,o,i,c)).c(),s.m(a.parentNode,a)):s&&(s.u(),s.d(),s=null)},u:function(){s&&s.u(),i(a)},d:function(){s&&s.d()}}}function U(t,e,n,r,c){var s,u=new T({root:c.root,data:{edit:t.currentEdit===n.id,active:t.currentTodo===n.id,id:n.id,done:n.done,title:n.title}});return u.on("edit",function(t){c.edit(t)}),u.on("select",function(t){c.select(t)}),u.on("change",function(t){c.change(t)}),{c:function(){s=a("li"),u._fragment.c(),this.h()},h:function(){s.className="todo"},m:function(t,e){o(s,t,e),u._mount(s,null)},p:function(t,e,n,o,i){var r={};(t.currentEdit||t.todos)&&(r.edit=e.currentEdit===o.id),(t.currentTodo||t.todos)&&(r.active=e.currentTodo===o.id),t.todos&&(r.id=o.id),t.todos&&(r.done=o.done),t.todos&&(r.title=o.title),u._set(r)},u:function(){i(s)},d:function(){u.destroy(!1)}}}function q(t){p(this,t),this._state=e({creatingTodo:!1,currentTodo:-1,currentEdit:-1,currentCategory:"Today"},t.data),this._recompute({todos:1},this._state),t.root||(this._oncreate=[],this._beforecreate=[],this._aftercreate=[]),this._fragment=function(t,e){var r,d,g,m,_,v,p,y,b,k,x,N,C,T,w,E;function L(t){e.shortcut(t)}window.addEventListener("keydown",L);var O=new A({root:e.root,data:{categories:t.categories,currentCategory:t.currentCategory}});O.on("change",function(t){e.changeCategory(t.category)});for(var j=t.creatingTodo&&P(0,e),H=t.todos,M=[],B=0;B<H.length;B+=1)M[B]=D(t,H,H[B],B,e);var U=new S({root:e.root});function q(t){e.reset()}return U.on("create",function(t){e.create()}),{c:function(){r=a("div"),O._fragment.c(),d=s("\n  "),g=a("div"),m=a("div"),_=a("h1"),v=a("i"),y=s("\n        "),b=a("span"),k=s(t.currentCategory),x=s("\n      "),N=a("div"),C=a("ul"),j&&j.c(),T=u();for(var e=0;e<M.length;e+=1)M[e].c();w=s("\n    "),U._fragment.c(),this.h()},h:function(){I(r),I(g),I(m),I(v),v.className=p="fas "+W(t.currentCategory),h(b,"margin-left","0.1em"),I(N),I(C),C.className="category-todo-list",N.className="category-todos",m.className="category-area",g.className="category",r.className=E=(-1!=t.currentEdit?"container--has-edit":"")+" container",h(r,"display","flex"),h(r,"height","100%"),l(r,"click",q)},m:function(t,e){o(r,t,e),O._mount(r,null),n(d,r),n(g,r),n(m,g),n(_,m),n(v,_),n(y,_),n(b,_),n(k,b),n(x,m),n(N,m),n(C,N),j&&j.m(C,null),n(T,C);for(var i=0;i<M.length;i+=1)M[i].m(C,null);n(w,g),U._mount(g,null)},p:function(t,n){var o={};t.categories&&(o.categories=n.categories),t.currentCategory&&(o.currentCategory=n.currentCategory),O._set(o),t.currentCategory&&p!==(p="fas "+W(n.currentCategory))&&(v.className=p),t.currentCategory&&(k.data=n.currentCategory),n.creatingTodo?j||((j=P(0,e)).c(),j.m(C,T)):j&&(j.u(),j.d(),j=null);var i=n.todos;if(t.todos||t.currentCategory||t.currentEdit||t.currentTodo){for(var c=0;c<i.length;c+=1)M[c]?M[c].p(t,n,i,i[c],c):(M[c]=D(n,i,i[c],c,e),M[c].c(),M[c].m(C,null));for(;c<M.length;c+=1)M[c].u(),M[c].d();M.length=i.length}t.currentEdit&&E!==(E=(-1!=n.currentEdit?"container--has-edit":"")+" container")&&(r.className=E)},u:function(){i(r),j&&j.u();for(var t=0;t<M.length;t+=1)M[t].u()},d:function(){window.removeEventListener("keydown",L),O.destroy(!1),j&&j.d(),c(M),U.destroy(!1),f(r,"click",q)}}}(this._state,this),t.target&&(this._fragment.c(),this._fragment.m(t.target,t.anchor||null),this._lock=!0,y(this._beforecreate),y(this._oncreate),y(this._aftercreate),this._lock=!1)}e(q.prototype,B,b),q.prototype._recompute=function(t,e){var n;t.todos&&_(e.categories,e.categories=(n=e.todos,Object.entries(n.reduce(function(t,e){return t[e.category]||(t[e.category]=0),e.done||t[e.category]++,t},{Upcoming:0,Anytime:0,Someday:0})).map(function(t){return{title:t[0],left:t[1]}})))&&(t.categories=!0)};var F,K,R={todos:(F=[{title:"Buy Things 3 app",done:!0,category:"Inbox"},{title:"Learn guitar",done:!1,category:"Someday"},{title:"Finish this app",done:!1,category:"Anytime"},{title:'Open source at <a href="https://github.com/agentcooper/svelte-things">https://github.com/agentcooper/svelte-things</a>',done:!0},{title:"Todo: select animation",done:!0},{title:"Todo: double click animation",done:!0},{title:"Ctrl + N shortcut",done:!0},{title:"Todo: checkbox checked animation",done:!1},{title:"Popups",done:!1},{title:"New todo: edit title",done:!1}],void 0===K&&(K="Today"),F.map(function(t,e){return Object.assign({id:e,notes:"",category:K},t)}))};return new q({target:document.querySelector("main"),data:R})}();
//# sourceMappingURL=bundle.js.map
