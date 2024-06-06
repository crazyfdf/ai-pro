var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __defProp2 = Object.defineProperty;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField2 = (obj, key, value) => {
  __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var Detect_platform = class {
  constructor() {
    __publicField2(this, "platform", "unknown");
    this.platform = this.parse_platform();
  }
  get if_unknown_platform() {
    return this.platform === "unknown";
  }
  if_ui() {
    let result = false;
    try {
      if (window)
        result = true;
    } catch (e) {
      result = false;
    }
    return result;
  }
  if_js_design() {
    let result = false;
    try {
      if (jsDesign)
        result = true;
    } catch (e) {
      result = false;
    }
    return result;
  }
  if_figma() {
    let result = false;
    try {
      if (figma)
        result = true;
    } catch (e) {
      result = false;
    }
    return result;
  }
  if_mg() {
    let result = false;
    try {
      if (mg)
        result = true;
    } catch (e) {
      result = false;
    }
    return result;
  }
  get host() {
    var _a;
    if (!this.parse_platform().match(/ui/))
      return "";
    return (_a = location.ancestorOrigins[0]) != null ? _a : "";
  }
  get ui_client() {
    if (!this.if_ui())
      return 3;
    else if (this.host.match(/mastergo\.com/))
      return 1;
    else if (this.host.match(/figma\.com/))
      return 0;
    else if (this.host.match(/js\.design/))
      return 2;
    else
      return 3;
  }
  parse_platform() {
    let result;
    if (this.if_mg())
      result = "mg";
    else if (this.if_js_design())
      result = "jsDesign";
    else if (this.if_figma())
      result = "figma";
    else if (this.if_ui())
      result = "ui";
    else
      result = "unknown";
    return result;
  }
};
var Kiss = class {
  constructor() {
    __publicField2(this, "platform", "unknown");
    __publicField2(
      this,
      "ui_client",
      3
      /* unknown */
    );
    __publicField2(this, "_client");
    this.parsePlatForm();
    this.initClient();
  }
  get client() {
    return this._client;
  }
  parsePlatForm() {
    const detect = new Detect_platform();
    this.platform = detect.platform;
    this.ui_client = detect.ui_client;
    if (detect.if_unknown_platform)
      throw new Error("unknown platform,only support figma,mg,jsDesign");
  }
  initClient() {
    switch (this.platform) {
      case "figma":
        this._client = figma;
        break;
      case "mg":
        this._client = mg;
        break;
      case "jsDesign":
        this._client = jsDesign;
        break;
      case "ui":
        this._client = {};
        break;
    }
  }
  get inUi() {
    return this.platform === "ui";
  }
  get inMg() {
    return this.platform === "mg";
  }
  get inFigma() {
    return this.platform === "figma";
  }
  get inJsDesign() {
    return this.platform === "jsDesign";
  }
  get inMgUi() {
    return this.ui_client === 1;
  }
  get uiClient() {
    return this.ui_client;
  }
  showUI(args) {
    if (this.inUi)
      return;
    this._client.showUI(args);
  }
};
var kiss = new Kiss();
var _client = kiss.inUi ? {} : kiss.client;
var client = Object.create(_client);
client.mg = kiss.inMg ? mg : _client;
client.figma = kiss.inFigma ? figma : _client;
client.jsDesign = kiss.inJsDesign ? jsDesign : _client;
var env = {
  platform: kiss.platform,
  ui_client: kiss.ui_client,
  inUi: kiss.inUi,
  inMgUi: kiss.inMgUi,
  inMg: kiss.inMg,
  uiClient: kiss.uiClient
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var eventemitter3 = { exports: {} };
(function(module) {
  var has = Object.prototype.hasOwnProperty, prefix = "~";
  function Events() {
  }
  if (Object.create) {
    Events.prototype = /* @__PURE__ */ Object.create(null);
    if (!new Events().__proto__)
      prefix = false;
  }
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }
  function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function");
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt])
      emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn)
      emitter._events[evt].push(listener);
    else
      emitter._events[evt] = [emitter._events[evt], listener];
    return emitter;
  }
  function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0)
      emitter._events = new Events();
    else
      delete emitter._events[evt];
  }
  function EventEmitter2() {
    this._events = new Events();
    this._eventsCount = 0;
  }
  EventEmitter2.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0)
      return names;
    for (name in events = this._events) {
      if (has.call(events, name))
        names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
  };
  EventEmitter2.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers)
      return [];
    if (handlers.fn)
      return [handlers.fn];
    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
      ee[i] = handlers[i].fn;
    }
    return ee;
  };
  EventEmitter2.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners)
      return 0;
    if (listeners.fn)
      return 1;
    return listeners.length;
  };
  EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, void 0, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1); i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length, j;
      for (i = 0; i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, void 0, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter2.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
  };
  EventEmitter2.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
  };
  EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length; i < length; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }
      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events;
      else
        clearEvent(this, evt);
    }
    return this;
  };
  EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt])
        clearEvent(this, evt);
    } else {
      this._events = new Events();
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
  EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
  EventEmitter2.prefixed = prefix;
  EventEmitter2.EventEmitter = EventEmitter2;
  {
    module.exports = EventEmitter2;
  }
})(eventemitter3);
var eventemitter3Exports = eventemitter3.exports;
const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports);
function randomId() {
  return Math.random().toString(16).slice(2, 6);
}
function genRespEventName(eventName, id) {
  return `Res_${eventName}#${id}`;
}
var utils = {
  randomId,
  genRespEventName
};
var MyEvent = class extends EventEmitter {
  constructor(ifRenderUI = false, ifMg = false, ifMgUi = false) {
    super();
    __publicField(this, "ifUI");
    __publicField(this, "ifMg");
    __publicField(this, "ifMgUi");
    this.ifUI = ifRenderUI;
    this.ifMg = ifMg;
    this.ifMgUi = ifMgUi;
    this.init();
  }
  init() {
    const receive = (result) => {
      if (result && result.event) {
        this.emit(result.event, result.data);
      }
    };
    if (this.ifUI) {
      if (this.ifMgUi) {
        try {
          window.onmessage = (ev) => receive(ev.data);
        } catch (e) {
        }
      } else {
        window.onmessage = (ev) => receive(ev.data.pluginMessage);
      }
    } else {
      client.ui.onmessage = (data) => {
        receive(data);
      };
    }
  }
  send(event, data = "") {
    if (typeof event !== "string")
      throw new Error("Expected first argument to be an event name string");
    const postData = {
      event,
      data
    };
    if (this.ifUI) {
      if (this.ifMgUi) {
        try {
          window.parent.postMessage(postData, "*");
        } catch (e) {
        }
      } else {
        parent.postMessage({ pluginMessage: postData }, "*");
      }
    } else {
      client.ui.postMessage(postData);
    }
  }
  // type support
  answer(event, handler) {
    return super.on(event, handler);
  }
  query(event, data) {
    this.send(event, data);
  }
  //answer and back data by RespEventName to ui
  answerBack(event, handler) {
    return super.on(event, async (data) => {
      const id = data.id;
      const respEventName = utils.genRespEventName(event, id);
      const respData = handler(data);
      this.send(respEventName, respData);
    });
  }
  //query and back data by RespEventName to ui
  queryBack(event, data) {
    const id = utils.randomId();
    const respEventName = utils.genRespEventName(event, id);
    console.log("respEventName", respEventName);
    return new Promise((resolve, reject) => {
      super.once(respEventName, (data2) => {
        if (data2.success) {
          resolve(data2.data);
        } else {
          reject(data2.data);
        }
      });
      this.send(event, { data, id });
    });
  }
  // queryBack and set max timeout
  queryBackMaxWait(event, data, timeout = 3e3) {
    const id = utils.randomId();
    const respEventName = utils.genRespEventName(event, id);
    return new Promise((resolve, reject) => {
      super.once(respEventName, (data2) => {
        if (data2.success) {
          resolve(data2.data);
        } else {
          reject(data2.data);
        }
      });
      this.send(event, { data, id });
      setTimeout(() => {
        reject("timeout");
      }, timeout);
    });
  }
};
kiss.inUi ? new MyEvent(true, kiss.inMg, kiss.inMgUi) : void 0;
var io_hook = kiss.inUi ? void 0 : new MyEvent(false, kiss.inMg, kiss.inMgUi);
if (!env.inMg) {
  client.figma.showUI(__html__, {
    width: 400,
    height: 700
  });
} else {
  client.mg.showUI(__html__, {
    width: 400,
    height: 700
  });
}
io_hook == null ? void 0 : io_hook.send("hook:hello", "hello ss from hook");
io_hook == null ? void 0 : io_hook.on("create-rectangles", (count) => {
  const nodes = [];
  for (let i = 0; i < count; i++) {
    const rect = client.createRectangle();
    rect.x = i * 150;
    if (!env.inMg) {
      rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
      client.figma.currentPage.appendChild(rect);
    } else {
      rect.fills = [{ type: "SOLID", color: { r: 0, g: 0.5, b: 1, a: 1 } }];
      client.mg.document.currentPage.appendChild(rect);
    }
    nodes.push(rect);
  }
  if (!env.inMg) {
    client.figma.currentPage.selection = nodes;
  } else {
    client.mg.document.currentPage.selection = nodes;
  }
  client.viewport.scrollAndZoomIntoView(nodes);
});
io_hook == null ? void 0 : io_hook.on("ui:cancel", () => {
  client.closePlugin();
});
io_hook == null ? void 0 : io_hook.answerBack("hello", (data) => {
  return {
    success: true,
    data: "hello from hook"
  };
});
//# sourceMappingURL=index.js.map
