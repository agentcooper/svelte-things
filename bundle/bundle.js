var app = (function () {
'use strict';

function noop() {}

function assign(target) {
	var k,
		source,
		i = 1,
		len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) target[k] = source[k];
	}

	return target;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function destroyEach(iterations) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d();
	}
}

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function createComment() {
	return document.createComment('');
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function setStyle(node, key, value) {
	node.style.setProperty(key, value);
}

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function destroyDev(detach) {
	destroy.call(this, detach);
	this.destroy = function() {
		console.warn('Component was already destroyed');
	};
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function init(component, options) {
	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function observe(key, callback, options) {
	var group = options && options.defer
		? this._observers.post
		: this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function observeDev(key, callback, options) {
	var c = (key = '' + key).search(/[^\w]/);
	if (c > -1) {
		var message =
			'The first argument to component.observe(...) must be the name of a top-level property';
		if (c > 0)
			message += ", i.e. '" + key.slice(0, c) + "' rather than '" + key + "'";

		throw new Error(message);
	}

	return observe.call(this, key, callback, options);
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function onDev(eventName, handler) {
	if (eventName === 'teardown') {
		console.warn(
			"Use component.on('destroy', ...) instead of component.on('teardown', ...) which has been deprecated and will be unsupported in Svelte 2"
		);
		return this.on('destroy', handler);
	}

	return on.call(this, eventName, handler);
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	for (var key in newState) {
		if (differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}
}

function setDev(newState) {
	if (typeof newState !== 'object') {
		throw new Error(
			this._debugName + '.set was called without an object of data key-values to update.'
		);
	}

	this._checkReadOnly(newState);
	set.call(this, newState);
}

function callAll(fns) {
	while (fns && fns.length) fns.pop()();
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

var protoDev = {
	destroy: destroyDev,
	get: get,
	fire: fire,
	observe: observeDev,
	on: onDev,
	set: setDev,
	teardown: destroyDev,
	_recompute: noop,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount
};

/* src/ToggleIcon.html generated by Svelte v1.52.0 */
function data$3() {
  return {
    isOpen: false
  };
}

var methods$2 = {
  reset(event) {
    if (event.target.contains(this.refs.root)) {
      return;
    }

    this.set({ isOpen: false });
  },

  click(event) {
    this.set({ isOpen: true });
  }
};

function oncreate() {
  const rect = this.refs.text.getBoundingClientRect();
  this.fullWidth = this.refs.root.scrollWidth + this.refs.root.offsetWidth;

  this.observe('isOpen', isOpen => {
    this.refs.root.style.width = isOpen ? `calc(${this.fullWidth}px + 2em)` : `1em`;
  });
}

function encapsulateStyles$2(node) {
	setAttribute(node, "svelte-951484143", "");
}

function create_main_fragment$2(state, component) {
	var span, i, i_class_value, text, span_1, text_1, span_class_value;

	function onwindowclick(event) {
		component.reset(event);
	}
	window.addEventListener("click", onwindowclick);

	function click_handler(event) {
		component.click(event);
	}

	return {
		c: function create() {
			span = createElement("span");
			i = createElement("i");
			text = createText("\n  ");
			span_1 = createElement("span");
			text_1 = createText(state.text);
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles$2(span);
			encapsulateStyles$2(i);
			i.className = i_class_value = "toggle-icon__icon fas " + state.icon;
			span_1.className = "toggle-icon__text";
			span.className = span_class_value = "" + (state.isOpen ? 'toggle-icon--open' : '') + " toggle-icon";
			addListener(span, "click", click_handler);
		},

		m: function mount(target, anchor) {
			insertNode(span, target, anchor);
			appendNode(i, span);
			appendNode(text, span);
			appendNode(span_1, span);
			appendNode(text_1, span_1);
			component.refs.text = span_1;
			component.refs.root = span;
		},

		p: function update(changed, state) {
			if ((changed.icon) && i_class_value !== (i_class_value = "toggle-icon__icon fas " + state.icon)) {
				i.className = i_class_value;
			}

			if (changed.text) {
				text_1.data = state.text;
			}

			if ((changed.isOpen) && span_class_value !== (span_class_value = "" + (state.isOpen ? 'toggle-icon--open' : '') + " toggle-icon")) {
				span.className = span_class_value;
			}
		},

		u: function unmount() {
			detachNode(span);
		},

		d: function destroy$$1() {
			window.removeEventListener("click", onwindowclick);

			if (component.refs.text === span_1) component.refs.text = null;
			removeListener(span, "click", click_handler);
			if (component.refs.root === span) component.refs.root = null;
		}
	};
}

function ToggleIcon(options) {
	this._debugName = '<ToggleIcon>';
	if (!options || (!options.target && !options.root)) throw new Error("'target' is a required option");
	init(this, options);
	this.refs = {};
	this._state = assign(data$3(), options.data);
	if (!('isOpen' in this._state)) console.warn("<ToggleIcon> was created without expected data property 'isOpen'");
	if (!('icon' in this._state)) console.warn("<ToggleIcon> was created without expected data property 'icon'");
	if (!('text' in this._state)) console.warn("<ToggleIcon> was created without expected data property 'text'");

	var _oncreate = oncreate.bind(this);

	if (!options.root) {
		this._oncreate = [_oncreate];
	} else {
	 	this.root._oncreate.push(_oncreate);
	 }

	this._fragment = create_main_fragment$2(this._state, this);

	if (options.target) {
		if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		callAll(this._oncreate);
	}
}

assign(ToggleIcon.prototype, methods$2, protoDev);

ToggleIcon.prototype._checkReadOnly = function _checkReadOnly(newState) {
};

/* src/Todo.html generated by Svelte v1.52.0 */
function restartAnimation(element, animationClassName) {
  element.classList.remove(animationClassName);
  void element.offsetWidth; // flush styles
  element.classList.add(animationClassName);
}

function data$2() {
  return {
    edit: false,
  };
}

var methods$1 = {
  change(...args) {
    const { todo } = this.refs;
    restartAnimation(todo, 'todo-flash');
    this.fire(...args);
  },

  edit(event, id) {
    if (!event.target.matches("input[type='checkbox']")) {
      this.fire('edit', { id });
    }
  },

  click(event, id) {
    if (!event.target.matches("input[type='checkbox']")) {
      event.stopPropagation();
      this.fire('select', { id });
    }
  }
};

function encapsulateStyles$1(node) {
	setAttribute(node, "svelte-2449100740", "");
}

function create_main_fragment$1(state, component) {
	var div, div_1, input, text, text_1, text_3, textarea, text_4, div_2, div_3, text_5, div_4, text_6, text_7, text_8, div_class_value;

	function input_change_handler() {
		component.set({ done: input.checked });
	}

	function change_handler(event) {
		var state = component.get();
		component.change("change", { id: state.id, done: state.done });
	}

	var toggleicon = new ToggleIcon({
		root: component.root,
		data: { text: "When", icon: "icon-calendar" }
	});

	var toggleicon_1 = new ToggleIcon({
		root: component.root,
		data: { text: "Tags", icon: "icon-tag" }
	});

	var toggleicon_2 = new ToggleIcon({
		root: component.root,
		data: {
			text: "Checklist",
			icon: "icon-list-bullet"
		}
	});

	var toggleicon_3 = new ToggleIcon({
		root: component.root,
		data: { text: "Deadline", icon: "icon-flag" }
	});

	function click_handler(event) {
		var state = component.get();
		component.click(event, state.id);
	}

	function dblclick_handler(event) {
		var state = component.get();
		component.edit(event, state.id);
	}

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			input = createElement("input");
			text = createText(" ");
			text_1 = createText(state.title);
			text_3 = createText("\n  ");
			textarea = createElement("textarea");
			text_4 = createText("\n  ");
			div_2 = createElement("div");
			div_3 = createElement("div");
			text_5 = createText("\n    ");
			div_4 = createElement("div");
			toggleicon._fragment.c();
			text_6 = createText("\n      ");
			toggleicon_1._fragment.c();
			text_7 = createText("\n      ");
			toggleicon_2._fragment.c();
			text_8 = createText("\n      ");
			toggleicon_3._fragment.c();
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles$1(div);
			addListener(input, "change", input_change_handler);
			input.type = "checkbox";
			addListener(input, "change", change_handler);
			encapsulateStyles$1(textarea);
			textarea.placeholder = "Notes";
			textarea.className = "textarea";
			encapsulateStyles$1(div_2);
			setStyle(div_3, "flex", "1");
			div_2.className = "todo-controls";
			div.className = div_class_value = "" + (state.done ? 'todo--done' : '') + " " + (state.edit ? 'todo--edit' : '') + " " + ((state.active && !state.edit) ? 'todo--active' : '') + " todo";
			addListener(div, "click", click_handler);
			addListener(div, "dblclick", dblclick_handler);
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(input, div_1);

			input.checked = state.done;

			appendNode(text, div_1);
			appendNode(text_1, div_1);
			appendNode(text_3, div);
			appendNode(textarea, div);
			appendNode(text_4, div);
			appendNode(div_2, div);
			appendNode(div_3, div_2);
			appendNode(text_5, div_2);
			appendNode(div_4, div_2);
			toggleicon._mount(div_4, null);
			appendNode(text_6, div_4);
			toggleicon_1._mount(div_4, null);
			appendNode(text_7, div_4);
			toggleicon_2._mount(div_4, null);
			appendNode(text_8, div_4);
			toggleicon_3._mount(div_4, null);
			component.refs.todo = div;
		},

		p: function update(changed, state) {
			input.checked = state.done;
			if (changed.title) {
				text_1.data = state.title;
			}

			if ((changed.done || changed.edit || changed.active) && div_class_value !== (div_class_value = "" + (state.done ? 'todo--done' : '') + " " + (state.edit ? 'todo--edit' : '') + " " + ((state.active && !state.edit) ? 'todo--active' : '') + " todo")) {
				div.className = div_class_value;
			}
		},

		u: function unmount() {
			detachNode(div);
		},

		d: function destroy$$1() {
			removeListener(input, "change", input_change_handler);
			removeListener(input, "change", change_handler);
			toggleicon.destroy(false);
			toggleicon_1.destroy(false);
			toggleicon_2.destroy(false);
			toggleicon_3.destroy(false);
			removeListener(div, "click", click_handler);
			removeListener(div, "dblclick", dblclick_handler);
			if (component.refs.todo === div) component.refs.todo = null;
		}
	};
}

function Todo(options) {
	this._debugName = '<Todo>';
	if (!options || (!options.target && !options.root)) throw new Error("'target' is a required option");
	init(this, options);
	this.refs = {};
	this._state = assign(data$2(), options.data);
	if (!('id' in this._state)) console.warn("<Todo> was created without expected data property 'id'");
	if (!('done' in this._state)) console.warn("<Todo> was created without expected data property 'done'");
	if (!('edit' in this._state)) console.warn("<Todo> was created without expected data property 'edit'");
	if (!('active' in this._state)) console.warn("<Todo> was created without expected data property 'active'");
	if (!('title' in this._state)) console.warn("<Todo> was created without expected data property 'title'");

	if (!options.root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment$1(this._state, this);

	if (options.target) {
		if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(Todo.prototype, methods$1, protoDev);

Todo.prototype._checkReadOnly = function _checkReadOnly(newState) {
};

/* src/Sidebar.html generated by Svelte v1.52.0 */
function getIcon$1(category) {
  if (category === "Inbox") {
    return 'icon-inbox things-inbox';
  }

  if (category === 'Upcoming') {
    return 'icon-calendar things-upcoming';
  }

  if (category === 'Anytime') {
    return 'icon-stackoverflow things-anytime';
  }

  if (category === 'Someday') {
    return 'icon-box things-someday';
  }

  if (category === "Today") {
    return 'icon-star things-star';
  }
}

function encapsulateStyles$3(node) {
	setAttribute(node, "svelte-1345177302", "");
}

function create_main_fragment$3(state, component) {
	var div, ul;

	var categories = state.categories;

	var each_blocks = [];

	for (var i = 0; i < categories.length; i += 1) {
		each_blocks[i] = create_each_block$1(state, categories, categories[i], i, component);
	}

	return {
		c: function create() {
			div = createElement("div");
			ul = createElement("ul");

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles$3(div);
			encapsulateStyles$3(ul);
			ul.className = "sidebar-items";
			div.className = "sidebar";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(ul, div);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}
		},

		p: function update(changed, state) {
			var categories = state.categories;

			if (changed.categories || changed.currentCategory) {
				for (var i = 0; i < categories.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].p(changed, state, categories, categories[i], i);
					} else {
						each_blocks[i] = create_each_block$1(state, categories, categories[i], i, component);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
					each_blocks[i].d();
				}
				each_blocks.length = categories.length;
			}
		},

		u: function unmount() {
			detachNode(div);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].u();
			}
		},

		d: function destroy$$1() {
			destroyEach(each_blocks);
		}
	};
}

// (3:4) {{#each categories as category}}
function create_each_block$1(state, categories, category, category_index, component) {
	var li, i, i_class_value, text, text_1_value = category.title, text_1, text_2, li_class_value;

	var if_block = (category.left > 0) && create_if_block$1(state, categories, category, category_index, component);

	return {
		c: function create() {
			li = createElement("li");
			i = createElement("i");
			text = createText("\n      ");
			text_1 = createText(text_1_value);
			text_2 = createText(" ");
			if (if_block) if_block.c();
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles$3(li);
			encapsulateStyles$3(i);
			i.className = i_class_value = "fas " + getIcon$1(category.title);
			li.className = li_class_value = "" + (category.title === state.currentCategory ? " sidebar-item--selected ": " ") + " sidebar-item";
			addListener(li, "click", click_handler);

			li._svelte = {
				component: component,
				categories: categories,
				category_index: category_index
			};
		},

		m: function mount(target, anchor) {
			insertNode(li, target, anchor);
			appendNode(i, li);
			appendNode(text, li);
			appendNode(text_1, li);
			appendNode(text_2, li);
			if (if_block) if_block.m(li, null);
		},

		p: function update(changed, state, categories, category, category_index) {
			if ((changed.categories) && i_class_value !== (i_class_value = "fas " + getIcon$1(category.title))) {
				i.className = i_class_value;
			}

			if ((changed.categories) && text_1_value !== (text_1_value = category.title)) {
				text_1.data = text_1_value;
			}

			if (category.left > 0) {
				if (if_block) {
					if_block.p(changed, state, categories, category, category_index);
				} else {
					if_block = create_if_block$1(state, categories, category, category_index, component);
					if_block.c();
					if_block.m(li, null);
				}
			} else if (if_block) {
				if_block.u();
				if_block.d();
				if_block = null;
			}

			if ((changed.categories || changed.currentCategory) && li_class_value !== (li_class_value = "" + (category.title === state.currentCategory ? " sidebar-item--selected ": " ") + " sidebar-item")) {
				li.className = li_class_value;
			}

			li._svelte.categories = categories;
			li._svelte.category_index = category_index;
		},

		u: function unmount() {
			detachNode(li);
			if (if_block) if_block.u();
		},

		d: function destroy$$1() {
			if (if_block) if_block.d();
			removeListener(li, "click", click_handler);
		}
	};
}

// (6:25) {{#if category.left > 0}}
function create_if_block$1(state, categories, category, category_index, component) {
	var span, text_value = category.left, text;

	return {
		c: function create() {
			span = createElement("span");
			text = createText(text_value);
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles$3(span);
			span.className = "number";
		},

		m: function mount(target, anchor) {
			insertNode(span, target, anchor);
			appendNode(text, span);
		},

		p: function update(changed, state, categories, category, category_index) {
			if ((changed.categories) && text_value !== (text_value = category.left)) {
				text.data = text_value;
			}
		},

		u: function unmount() {
			detachNode(span);
		},

		d: noop
	};
}

function click_handler(event) {
	var component = this._svelte.component;
	var categories = this._svelte.categories, category_index = this._svelte.category_index, category = categories[category_index];
	component.fire( 'change', { category: category.title });
}

function Sidebar(options) {
	this._debugName = '<Sidebar>';
	if (!options || (!options.target && !options.root)) throw new Error("'target' is a required option");
	init(this, options);
	this._state = assign({}, options.data);
	if (!('categories' in this._state)) console.warn("<Sidebar> was created without expected data property 'categories'");
	if (!('currentCategory' in this._state)) console.warn("<Sidebar> was created without expected data property 'currentCategory'");

	this._fragment = create_main_fragment$3(this._state, this);

	if (options.target) {
		if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);
	}
}

assign(Sidebar.prototype, protoDev);

Sidebar.prototype._checkReadOnly = function _checkReadOnly(newState) {
};

/* src/NewTodo.html generated by Svelte v1.52.0 */
function data$4() {
  return {
    title: "",
    notes: ""
  };
}

function create_main_fragment$4(state, component) {
	var input, input_updating = false, text, textarea, textarea_updating = false, text_1, button;

	function input_input_handler() {
		input_updating = true;
		component.set({ title: input.value });
		input_updating = false;
	}

	function textarea_input_handler() {
		textarea_updating = true;
		component.set({ notes: textarea.value });
		textarea_updating = false;
	}

	function click_handler(event) {
		var state = component.get();
		component.fire('create', { title: state.title, notes: state.notes });
	}

	return {
		c: function create() {
			input = createElement("input");
			text = createText("\n");
			textarea = createElement("textarea");
			text_1 = createText("\n");
			button = createElement("button");
			button.textContent = "Create";
			this.h();
		},

		h: function hydrate() {
			addListener(input, "input", input_input_handler);
			addListener(textarea, "input", textarea_input_handler);
			addListener(button, "click", click_handler);
		},

		m: function mount(target, anchor) {
			insertNode(input, target, anchor);

			input.value = state.title;

			insertNode(text, target, anchor);
			insertNode(textarea, target, anchor);

			textarea.value = state.notes;

			insertNode(text_1, target, anchor);
			insertNode(button, target, anchor);
		},

		p: function update(changed, state) {
			if (!input_updating) input.value = state.title;
			if (!textarea_updating) textarea.value = state.notes;
		},

		u: function unmount() {
			detachNode(input);
			detachNode(text);
			detachNode(textarea);
			detachNode(text_1);
			detachNode(button);
		},

		d: function destroy$$1() {
			removeListener(input, "input", input_input_handler);
			removeListener(textarea, "input", textarea_input_handler);
			removeListener(button, "click", click_handler);
		}
	};
}

function NewTodo(options) {
	this._debugName = '<NewTodo>';
	if (!options || (!options.target && !options.root)) throw new Error("'target' is a required option");
	init(this, options);
	this._state = assign(data$4(), options.data);
	if (!('title' in this._state)) console.warn("<NewTodo> was created without expected data property 'title'");
	if (!('notes' in this._state)) console.warn("<NewTodo> was created without expected data property 'notes'");

	this._fragment = create_main_fragment$4(this._state, this);

	if (options.target) {
		if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);
	}
}

assign(NewTodo.prototype, protoDev);

NewTodo.prototype._checkReadOnly = function _checkReadOnly(newState) {
};

/* src/Controls.html generated by Svelte v1.52.0 */
function encapsulateStyles$4(node) {
	setAttribute(node, "svelte-845333765", "");
}

function create_main_fragment$5(state, component) {
	var div, div_1, span, text_1, span_1, text_3, span_2, text_5, span_3;

	function click_handler(event) {
		component.fire('create');
	}

	function click_handler_1(event) {
		component.fire('calendar');
	}

	function click_handler_2(event) {
		component.fire('move');
	}

	function click_handler_3(event) {
		component.fire('search');
	}

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			span = createElement("span");
			span.innerHTML = "<i svelte-845333765 class=\"control-icon icon-plus\"></i>";
			text_1 = createText("\n    ");
			span_1 = createElement("span");
			span_1.innerHTML = "<i svelte-845333765 class=\"control-icon icon-calendar\"></i>";
			text_3 = createText("\n    ");
			span_2 = createElement("span");
			span_2.innerHTML = "<i svelte-845333765 class=\"control-icon icon-right\"></i>";
			text_5 = createText("\n    ");
			span_3 = createElement("span");
			span_3.innerHTML = "<i svelte-845333765 class=\"control-icon icon-search\"></i>";
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles$4(div);
			encapsulateStyles$4(div_1);
			addListener(span, "click", click_handler);
			addListener(span_1, "click", click_handler_1);
			addListener(span_2, "click", click_handler_2);
			addListener(span_3, "click", click_handler_3);
			div_1.className = "controls";
			div.className = "controls-container";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(span, div_1);
			appendNode(text_1, div_1);
			appendNode(span_1, div_1);
			appendNode(text_3, div_1);
			appendNode(span_2, div_1);
			appendNode(text_5, div_1);
			appendNode(span_3, div_1);
		},

		p: noop,

		u: function unmount() {
			detachNode(div);
		},

		d: function destroy$$1() {
			removeListener(span, "click", click_handler);
			removeListener(span_1, "click", click_handler_1);
			removeListener(span_2, "click", click_handler_2);
			removeListener(span_3, "click", click_handler_3);
		}
	};
}

function Controls(options) {
	this._debugName = '<Controls>';
	if (!options || (!options.target && !options.root)) throw new Error("'target' is a required option");
	init(this, options);
	this._state = assign({}, options.data);

	this._fragment = create_main_fragment$5(this._state, this);

	if (options.target) {
		if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);
	}
}

assign(Controls.prototype, protoDev);

Controls.prototype._checkReadOnly = function _checkReadOnly(newState) {
};

/* src/Things.html generated by Svelte v1.52.0 */
function nextId(todos) {
  if (todos.length === 0) {
    return 0;
  }

  return todos.map(todo => todo.id).sort((a, b) => b - a)[0] + 1;
}

function categories(todos) {
	return Object.entries(todos.reduce((acc, todo) => {
  if (!acc[todo.category]) {
    acc[todo.category] = 0;
  }

  if (!todo.done) {
    acc[todo.category]++;
  }

  return acc;
}, {
    'Upcoming': 0,
    'Anytime': 0,
    'Someday': 0,
  })).map(([key, value]) => ({ title: key, left: value }));
}

function data$1() {
  return {
    creatingTodo: false,
    currentTodo: -1,
    currentEdit: -1,
    currentCategory: 'Today',
  };
}

function getIcon(category) {
  if (category === "Inbox") {
    return 'icon-inbox things-inbox';
  }

  if (category === "Today") {
    return 'icon-star things-star';
  }
}

var methods = {
  shortcut(event) {
    // console.log(event);
    if (event.keyCode === 78 && event.ctrlKey) {
      event.preventDefault();
      this.create();
    }
  },

  reset() {
    this.set({ currentTodo: -1, currentEdit: -1 });
  },

  create() {
    const model = this.get();

    const id = nextId(model.todos);

    const todos = [
      {
        id,
        title: "New to-do",
        notes: "",
        done: false,
        category: model.currentCategory
      },
      ...model.todos
    ];

    this.set({
      todos,
    });

    setTimeout(() => {
      this.set({
        currentEdit: id,
        currentTodo: id
      });
    }, 0);
  },

  changeCategory(category) {
    this.set({ currentCategory: category });
  },

  edit({ id }) {
    this.set({ currentTodo: id, currentEdit: id });
  },

  select({ id }) {
    this.set({ currentTodo: id });
  },

  change({ id, done }) {
    const model = this.get();

    const todos = model.todos.map(todo => {
      if (todo.id === id) {
        return Object.assign({}, todo, { done });
      }
      return todo;
    });

    this.set({
      todos
    });
  },
};

function encapsulateStyles(node) {
	setAttribute(node, "svelte-99304421", "");
}

function create_main_fragment(state, component) {
	var div, text, div_1, div_2, h1, i, i_class_value, text_1, span, text_2, text_4, div_3, ul, if_block_anchor, text_7, div_class_value;

	function onwindowkeydown(event) {
		component.shortcut(event);
	}
	window.addEventListener("keydown", onwindowkeydown);

	var sidebar = new Sidebar({
		root: component.root,
		data: {
			categories: state.categories,
			currentCategory: state.currentCategory
		}
	});

	sidebar.on("change", function(event) {
		component.changeCategory(event.category);
	});

	var if_block = (state.creatingTodo) && create_if_block(state, component);

	var todos_1 = state.todos;

	var each_blocks = [];

	for (var i_1 = 0; i_1 < todos_1.length; i_1 += 1) {
		each_blocks[i_1] = create_each_block(state, todos_1, todos_1[i_1], i_1, component);
	}

	var controls = new Controls({
		root: component.root
	});

	controls.on("create", function(event) {
		component.create();
	});

	function click_handler(event) {
		component.reset();
	}

	return {
		c: function create() {
			div = createElement("div");
			sidebar._fragment.c();
			text = createText("\n  ");
			div_1 = createElement("div");
			div_2 = createElement("div");
			h1 = createElement("h1");
			i = createElement("i");
			text_1 = createText("\n        ");
			span = createElement("span");
			text_2 = createText(state.currentCategory);
			text_4 = createText("\n      ");
			div_3 = createElement("div");
			ul = createElement("ul");
			if (if_block) if_block.c();
			if_block_anchor = createComment();

			for (var i_1 = 0; i_1 < each_blocks.length; i_1 += 1) {
				each_blocks[i_1].c();
			}

			text_7 = createText("\n    ");
			controls._fragment.c();
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles(div);
			encapsulateStyles(div_1);
			encapsulateStyles(div_2);
			encapsulateStyles(i);
			i.className = i_class_value = "fas " + getIcon(state.currentCategory);
			setStyle(span, "margin-left", "0.1em");
			encapsulateStyles(div_3);
			encapsulateStyles(ul);
			ul.className = "category-todo-list";
			div_3.className = "category-todos";
			div_2.className = "category-area";
			div_1.className = "category";
			div.className = div_class_value = "" + (state.currentEdit != -1 ? 'container--has-edit': '') + " container";
			setStyle(div, "display", "flex");
			setStyle(div, "height", "100%");
			addListener(div, "click", click_handler);
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			sidebar._mount(div, null);
			appendNode(text, div);
			appendNode(div_1, div);
			appendNode(div_2, div_1);
			appendNode(h1, div_2);
			appendNode(i, h1);
			appendNode(text_1, h1);
			appendNode(span, h1);
			appendNode(text_2, span);
			appendNode(text_4, div_2);
			appendNode(div_3, div_2);
			appendNode(ul, div_3);
			if (if_block) if_block.m(ul, null);
			appendNode(if_block_anchor, ul);

			for (var i_1 = 0; i_1 < each_blocks.length; i_1 += 1) {
				each_blocks[i_1].m(ul, null);
			}

			appendNode(text_7, div_1);
			controls._mount(div_1, null);
		},

		p: function update(changed, state) {
			var sidebar_changes = {};
			if (changed.categories) sidebar_changes.categories = state.categories;
			if (changed.currentCategory) sidebar_changes.currentCategory = state.currentCategory;
			sidebar._set(sidebar_changes);

			if ((changed.currentCategory) && i_class_value !== (i_class_value = "fas " + getIcon(state.currentCategory))) {
				i.className = i_class_value;
			}

			if (changed.currentCategory) {
				text_2.data = state.currentCategory;
			}

			if (state.creatingTodo) {
				if (!if_block) {
					if_block = create_if_block(state, component);
					if_block.c();
					if_block.m(ul, if_block_anchor);
				}
			} else if (if_block) {
				if_block.u();
				if_block.d();
				if_block = null;
			}

			var todos_1 = state.todos;

			if (changed.todos || changed.currentCategory || changed.currentEdit || changed.currentTodo) {
				for (var i_1 = 0; i_1 < todos_1.length; i_1 += 1) {
					if (each_blocks[i_1]) {
						each_blocks[i_1].p(changed, state, todos_1, todos_1[i_1], i_1);
					} else {
						each_blocks[i_1] = create_each_block(state, todos_1, todos_1[i_1], i_1, component);
						each_blocks[i_1].c();
						each_blocks[i_1].m(ul, null);
					}
				}

				for (; i_1 < each_blocks.length; i_1 += 1) {
					each_blocks[i_1].u();
					each_blocks[i_1].d();
				}
				each_blocks.length = todos_1.length;
			}

			if ((changed.currentEdit) && div_class_value !== (div_class_value = "" + (state.currentEdit != -1 ? 'container--has-edit': '') + " container")) {
				div.className = div_class_value;
			}
		},

		u: function unmount() {
			detachNode(div);
			if (if_block) if_block.u();

			for (var i_1 = 0; i_1 < each_blocks.length; i_1 += 1) {
				each_blocks[i_1].u();
			}
		},

		d: function destroy$$1() {
			window.removeEventListener("keydown", onwindowkeydown);

			sidebar.destroy(false);
			if (if_block) if_block.d();

			destroyEach(each_blocks);

			controls.destroy(false);
			removeListener(div, "click", click_handler);
		}
	};
}

// (14:10) {{#if creatingTodo}}
function create_if_block(state, component) {

	var newtodo = new NewTodo({
		root: component.root
	});

	newtodo.on("create", function(event) {
		component.create(event);
	});

	return {
		c: function create() {
			newtodo._fragment.c();
		},

		m: function mount(target, anchor) {
			newtodo._mount(target, anchor);
		},

		u: function unmount() {
			newtodo._unmount();
		},

		d: function destroy$$1() {
			newtodo.destroy(false);
		}
	};
}

// (15:56) {{#each todos as todo}}
function create_each_block(state, todos_1, todo, todo_index, component) {
	var if_block_anchor;

	var if_block = (todo.category === state.currentCategory) && create_if_block_1(state, todos_1, todo, todo_index, component);

	return {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = createComment();
		},

		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insertNode(if_block_anchor, target, anchor);
		},

		p: function update(changed, state, todos_1, todo, todo_index) {
			if (todo.category === state.currentCategory) {
				if (if_block) {
					if_block.p(changed, state, todos_1, todo, todo_index);
				} else {
					if_block = create_if_block_1(state, todos_1, todo, todo_index, component);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.u();
				if_block.d();
				if_block = null;
			}
		},

		u: function unmount() {
			if (if_block) if_block.u();
			detachNode(if_block_anchor);
		},

		d: function destroy$$1() {
			if (if_block) if_block.d();
		}
	};
}

// (15:80) {{#if todo.category === currentCategory }}
function create_if_block_1(state, todos_1, todo, todo_index, component) {
	var li;

	var todo_1 = new Todo({
		root: component.root,
		data: {
			edit: state.currentEdit === todo.id,
			active: state.currentTodo === todo.id,
			id: todo.id,
			done: todo.done,
			title: todo.title
		}
	});

	todo_1.on("edit", function(event) {
		component.edit(event);
	});
	todo_1.on("select", function(event) {
		component.select(event);
	});
	todo_1.on("change", function(event) {
		component.change(event);
	});

	return {
		c: function create() {
			li = createElement("li");
			todo_1._fragment.c();
			this.h();
		},

		h: function hydrate() {
			li.className = "todo";
		},

		m: function mount(target, anchor) {
			insertNode(li, target, anchor);
			todo_1._mount(li, null);
		},

		p: function update(changed, state, todos_1, todo, todo_index) {
			var todo_1_changes = {};
			if (changed.currentEdit || changed.todos) todo_1_changes.edit = state.currentEdit === todo.id;
			if (changed.currentTodo || changed.todos) todo_1_changes.active = state.currentTodo === todo.id;
			if (changed.todos) todo_1_changes.id = todo.id;
			if (changed.todos) todo_1_changes.done = todo.done;
			if (changed.todos) todo_1_changes.title = todo.title;
			todo_1._set(todo_1_changes);
		},

		u: function unmount() {
			detachNode(li);
		},

		d: function destroy$$1() {
			todo_1.destroy(false);
		}
	};
}

function Things(options) {
	this._debugName = '<Things>';
	if (!options || (!options.target && !options.root)) throw new Error("'target' is a required option");
	init(this, options);
	this._state = assign(data$1(), options.data);
	this._recompute({ todos: 1 }, this._state);
	if (!('todos' in this._state)) console.warn("<Things> was created without expected data property 'todos'");
	if (!('currentEdit' in this._state)) console.warn("<Things> was created without expected data property 'currentEdit'");
	if (!('categories' in this._state)) console.warn("<Things> was created without expected data property 'categories'");
	if (!('currentCategory' in this._state)) console.warn("<Things> was created without expected data property 'currentCategory'");
	if (!('creatingTodo' in this._state)) console.warn("<Things> was created without expected data property 'creatingTodo'");
	if (!('currentTodo' in this._state)) console.warn("<Things> was created without expected data property 'currentTodo'");

	if (!options.root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(Things.prototype, methods, protoDev);

Things.prototype._checkReadOnly = function _checkReadOnly(newState) {
	if ('categories' in newState && !this._updatingReadonlyProperty) throw new Error("<Things>: Cannot set read-only property 'categories'");
};

Things.prototype._recompute = function _recompute(changed, state) {
	if (changed.todos) {
		if (differs(state.categories, (state.categories = categories(state.todos)))) changed.categories = true;
	}
};

const withId = (arr, category = "Today") =>
  arr.map((todo, index) =>
    Object.assign({ id: index, notes: "", category }, todo),
  );

const data = {
  todos: withId([
    {
      title: "Buy Things 3 app",
      done: true,
      category: "Inbox",
    },
    {
      title: "Learn guitar",
      done: false,
      category: "Someday",
    },
    {
      title: "Finish this app",
      done: false,
      category: "Anytime",
    },
    {
      title: "Todo: select animation",
      done: true,
    },
    {
      title: "Todo: double click animation",
      done: true,
    },
    {
      title: "Ctrl + N shortcut",
      done: true,
    },
    {
      title: "Todo: checkbox checked animation",
      done: false,
    },
    {
      title: "Popups",
      done: false,
    },
    {
      title: "New todo: edit title",
      done: false,
    },
  ]),
};

var app = new Things({
  target: document.querySelector("main"),
  data,
});

return app;

}());
//# sourceMappingURL=bundle.js.map
