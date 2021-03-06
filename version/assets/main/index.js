window.__require = function t(e, o, i) {
function n(a, s) {
if (!o[a]) {
if (!e[a]) {
var r = a.split("/");
r = r[r.length - 1];
if (!e[r]) {
var l = "function" == typeof __require && __require;
if (!s && l) return l(r, !0);
if (c) return c(r, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = r;
}
var u = o[a] = {
exports: {}
};
e[a][0].call(u.exports, function(t) {
return n(e[a][1][t] || t);
}, u, u.exports, t, e, o, i);
}
return o[a].exports;
}
for (var c = "function" == typeof __require && __require, a = 0; a < i.length; a++) n(i[a]);
return n;
}({
AgentView: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "ea23eHGVJBPaYZjIqvZVeFA", "AgentView");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MAgent = void 0;
var c = t("../../common/MyAnimation"), a = t("../../common/Toast"), s = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.S_loginAgent = BUTTON_STATE.OFF;
return e;
}
e.prototype.getLoginAgentButtonState = function() {
return this.S_loginAgent;
};
e.prototype.getAgentUrlButtonState = function() {
return this.S_agentUrl;
};
return e;
}(c.default);
o.MAgent = s;
var r = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_toast = cc.find("common/toast", o.node);
o.m_mask = cc.find("popup/mask", o.node);
o.m_root = cc.find("popup/agent", o.node);
o.i_loginAgent = cc.find("popup/agent/button_loginagent", o.node);
o.i_close = cc.find("popup/agent/button_close", o.node);
o.m_root.active = !1;
return o;
}
e.prototype.click_LoginAgent = function() {
switch (this.getLoginAgentButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
return;
}
};
e.prototype.show = function() {
this.popupOpenScaleXY(this.m_root, this.m_mask, this.addEvent.bind(this));
};
e.prototype.hide = function() {
this.popupCloseScaleXY(this.m_root, this.m_mask, this.hideEvent.bind(this));
};
e.prototype.hideEvent = function() {
this.i_loginAgent.off("touchend");
this.i_close.off("touchend");
};
e.prototype.addEvent = function() {
var t = this;
this.i_loginAgent.on("touchend", function() {
t.click_LoginAgent();
}, this);
this.i_close.on("touchend", function() {
t.hide();
}, this);
};
e.prototype.start = function() {};
e.prototype.onDestory = function() {};
return e;
}(s);
o.default = r;
cc._RF.pop();
}, {
"../../common/MyAnimation": "MyAnimation",
"../../common/Toast": "Toast"
} ],
AtlasLib: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "caba1gtnCpMbJkK7CzToDnW", "AtlasLib");
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = function() {
function t() {
this.cache = [];
}
t.getInstance = function() {
if (!t.m_instance) {
t.m_instance = new t();
return t.m_instance;
}
return t.m_instance;
};
t.prototype.cleanAtlas = function(t) {
if (this.cache) if (this.cache[t]) {
cc.resources.release(this.cache[t].path);
delete this.cache[t];
} else {
for (var e in this.cache) cc.resources.release(this.cache[e].path);
this.cache = [];
}
};
t.prototype.loadAtlas = function(t, e, o) {
void 0 === o && (o = null);
if (t && e && "string" == typeof t && "string" == typeof e) if (this.cache && this.cache[t] && this.cache[t].path == e) o && o(null, this.cache[t].atlas); else {
this.cache || (this.cache = []);
cc.resources.load(e, cc.SpriteAtlas, function(i, n) {
if (!i) {
var c = {
path: e,
atlas: n
};
this.cache[t] = c;
}
o && o(i, n);
}.bind(this));
}
};
t.prototype.getSpriteFrame = function(t, e) {
if (!this.cache[t]) return null;
var o = this.cache[t].atlas.getSpriteFrame(e);
return o instanceof cc.SpriteFrame ? o : null;
};
return t;
}();
o.default = i;
cc._RF.pop();
}, {} ],
AudioManager: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "830f0/LN+lJD4LcVuhJMhN9", "AudioManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = t("./UserConfig"), n = function() {
function t() {}
t.getInstance = function() {
if (!t.m_instance) {
t.m_instance = new t();
t.m_bgmCode = BGM_CODE.BGM_NONE;
}
return t.m_instance;
};
t.prototype.playBgmFromURL = function(t, e) {
void 0 === e && (e = !0);
if (i.default.getInstance().getAudioConfig().openBgm) {
cc.audioEngine.stopMusic();
cc.assetManager.loadRemote(t, function(t, o) {
if (!t) {
cc.audioEngine.setMusicVolume(i.default.getInstance().getAudioConfig().bgmVol);
cc.audioEngine.playMusic(o, e);
}
});
}
};
t.prototype.playEffect = function(t, e) {
void 0 === e && (e = !1);
i.default.getInstance().getAudioConfig().openEff && cc.assetManager.loadRemote(t, function(t, o) {
if (!t) {
cc.audioEngine.setEffectsVolume(i.default.getInstance().getAudioConfig().effVol);
cc.audioEngine.playEffect(o, e);
}
});
};
t.prototype.playBgmFromLocal = function(e, o) {
void 0 === o && (o = !1);
cc.audioEngine.stopMusic();
t.m_bgmCode = e;
cc.resources.load(i.default.getInstance().getBgmNameFronCode(e), cc.AudioClip, function(t, e) {
cc.audioEngine.setMusicVolume(i.default.getInstance().getAudioConfig().bgmVol);
return cc.audioEngine.playMusic(e, o);
});
};
t.prototype.playEffectFromLocal = function(t, e) {
void 0 === e && (e = !1);
i.default.getInstance().getAudioConfig().openEff && cc.resources.load(i.default.getInstance().getEffNameFronCode(t), cc.AudioClip, function(t, o) {
cc.audioEngine.setEffectsVolume(i.default.getInstance().getAudioConfig().effVol);
return cc.audioEngine.playEffect(o, e);
});
};
t.prototype.isMusicPlaying = function() {
return cc.audioEngine.isMusicPlaying();
};
t.prototype.getBgmCode = function() {
return t.m_bgmCode;
};
t.prototype.stopBgm = function() {
if (this.isMusicPlaying()) {
t.m_bgmCode = BGM_CODE.BGM_NONE;
cc.audioEngine.stopMusic();
}
};
t.prototype.stopAll = function() {
cc.audioEngine.stopAll();
};
t.prototype.stopEff = function(t) {
cc.audioEngine.stopEffect(t);
};
t.prototype.pauseBgm = function() {
cc.audioEngine.pauseMusic();
};
t.prototype.resumeBgm = function() {
cc.audioEngine.resumeMusic();
};
t.prototype.setBgmVol = function(t) {
void 0 === t && (t = null);
cc.audioEngine.setMusicVolume(t || 0 === t ? t : i.default.getInstance().getAudioConfig().bgmVol);
};
t.prototype.setEffVol = function(t) {
void 0 === t && (t = null);
cc.audioEngine.setEffectsVolume(t || 0 === t ? t : i.default.getInstance().getAudioConfig().effVol);
};
return t;
}();
o.default = n;
cc._RF.pop();
}, {
"./UserConfig": "UserConfig"
} ],
BetManager: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "9ac475BaCdF9a8VMgP8ec0v", "BetManager");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), c = this && this.__decorate || function(t, e, o, i) {
var n, c = arguments.length, a = c < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (c < 3 ? n(a) : c > 3 ? n(e, o, a) : n(e, o)) || a);
return c > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = cc._decorator, s = a.ccclass, r = a.property, l = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.slider = null;
e.bar = null;
e.min = null;
e.max = null;
e.bet = null;
e.i_confirm = null;
return e;
}
Object.defineProperty(e.prototype, "minValue", {
get: function() {
return this._minValue;
},
set: function(t) {
this._minValue = t;
this.min.string = "底注: " + t;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "maxValue", {
get: function() {
return this._maxValue;
},
set: function(t) {
this._maxValue = t;
this.max.string = "封顶: " + t;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "betValue", {
get: function() {
return this._betValue;
},
set: function(t) {
this._betValue = Math.floor(t);
this.bet.string = "下注: " + this._betValue;
var e = (this._betValue - this.minValue) / (this.maxValue - this.minValue);
this.bar.width = e * this.barWidth;
this.slider.getComponent(cc.Slider).progress = e;
},
enumerable: !1,
configurable: !0
});
e.prototype.onLoad = function() {
this.barWidth = this.bar.width;
};
e.prototype.start = function() {};
e.prototype.show = function(t, e, o, i) {
void 0 === o && (o = null);
void 0 === i && (i = null);
this.i_confirm.active = !0;
this.callBackFunction = i;
this.node.active = !0;
this.setBetNumber(t, e, o);
this.addEvent();
};
e.prototype.hide = function() {
if (this.i_confirm.active && this.callBackFunction) {
this.betValue = this.minValue;
this.callBackFunction();
}
this.node.active = !1;
};
e.prototype.setBetNumber = function(t, e, o) {
void 0 === o && (o = null);
this.minValue = t;
this.maxValue = e;
this.betValue = o || 0 === o ? o : this.minValue;
};
e.prototype.setView = function() {
var t = this.slider.getComponent(cc.Slider).progress;
this.betValue = (this.maxValue - this.minValue) * t + this.minValue;
};
e.prototype.addEvent = function() {
var t = this;
this.slider.on("slide", function() {
t.setView();
});
this.i_confirm.on("touchend", function() {
t.i_confirm.active = !1;
t.callBackFunction();
t.hide();
}, this);
};
c([ r(cc.Node) ], e.prototype, "slider", void 0);
c([ r(cc.Node) ], e.prototype, "bar", void 0);
c([ r(cc.Label) ], e.prototype, "min", void 0);
c([ r(cc.Label) ], e.prototype, "max", void 0);
c([ r(cc.Label) ], e.prototype, "bet", void 0);
c([ r(cc.Node) ], e.prototype, "i_confirm", void 0);
return c([ s ], e);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {} ],
CardLib: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "6dea3ZDMydBVKkDtHtXQq/9", "CardLib");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), c = this && this.__decorate || function(t, e, o, i) {
var n, c = arguments.length, a = c < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (c < 3 ? n(a) : c > 3 ? n(e, o, a) : n(e, o)) || a);
return c > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = t("../common/AtlasLib"), s = t("../common/NodePool"), r = t("../units/AudioManager"), l = t("../units/UserConfig"), u = cc._decorator, h = u.ccclass, d = u.menu, p = u.property, f = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.cardPrefab = null;
return e;
}
e.prototype.onLoad = function() {
this.Tween = [];
this.children = [];
s.default.getInstance().createrNodePool("card", this.cardPrefab, 54);
};
e.prototype.setCardBase = function(t, e) {
if (this.children) for (var o = 0; o < this.children.length; ++o) {
var i = this.children[o].width, n = this.children[o].height;
this.children[o].getComponent("switchsp").updateFrame(t, e);
this.children[o].width = i;
this.children[o].height = n;
}
};
e.prototype.shuffleCard = function(t, e, o) {
var i = this;
void 0 === o && (o = null);
var n = l.default.getInstance().getSgSetViewConfig().cardid, c = t.length * e;
for (var r in this.Tween) if (this.Tween[r]) {
this.Tween[r].stop();
this.Tween[r] = null;
}
for (var u = 0; u < this.node.children.length; ++u) {
s.default.getInstance().destroyNode("card", this.node.children[u]);
this.children[u] = null;
}
for (u = 0; u < c; ++u) {
var h = s.default.getInstance().getNodeFromPool("card");
this.children[u] = h;
this.node.addChild(h);
h.getComponent("switchsp").updateFrame(0, a.default.getInstance().getSpriteFrame("card", "base" + n));
h.width = 83;
h.height = 111;
}
var d = new cc.Vec3(0, 0, 0), p = new cc.Vec3(-80, 0, 0), f = new cc.Vec3(80, 0, 0), m = this.node.children.length;
this.node.children.forEach(function(n, a) {
a > Math.floor(c / 2) ? i.Tween[a] = cc.tween(n).delay(.2 * a).to(.3, {
position: p
}).to(.3, {
position: f
}).to(.3, {
position: d
}).call(function() {
i.Tween[a] = null;
0 == --m && i.SendCardToPlayer(t, e, o);
}).start() : i.Tween[a] = cc.tween(n).delay(.2 * a).to(.3, {
position: f
}).to(.3, {
position: p
}).to(.3, {
position: d
}).call(function() {
i.Tween[a] = null;
0 == --m && i.SendCardToPlayer(t, e, o);
}).start();
}, this);
};
e.prototype.SendCardToPlayer = function(t, e, o) {
for (var i = this, n = t.length * e, c = function(c) {
var s, l = t[c], u = l.convertToWorldSpaceAR(l.getChildByName("cardList").position), h = a.node.convertToNodeSpaceAR(u);
s = "player1" === l.name ? new cc.Vec2(83, 111) : new cc.Vec2(57, 76);
for (var d = function(t) {
var u = a.children[c * e + t];
u ? a.Tween[t] = cc.tween(u).delay(.5 + .5 * c + .1 * t).call(function() {
r.default.getInstance().playEffectFromLocal(EFF_CODE.EFF_SG_SENDCARD, !1);
}).to(.1, {
position: new cc.Vec3(h.x + 27 * t, h.y, h.z),
width: s.x,
height: s.y
}).call(function() {
i.Tween[t] = null;
0 == --n && o && o();
u.y = 0;
u.parent = l.getChildByName("cardList");
}).start() : cc.error("节点错误", u, c * e + t);
}, p = 0; p < e; ++p) d(p);
}, a = this, s = 0; s < t.length; ++s) c(s);
};
e.prototype.StopShuffleCard = function() {
for (var t in this.Tween) if (this.Tween[t]) {
this.Tween[t].stop();
this.Tween[t] = null;
}
for (var e = 0; e < this.node.children.length; ++e) {
s.default.getInstance().destroyNode("card", this.node.children[e]);
this.children[e] = null;
}
};
e.prototype.onDestroy = function() {};
c([ p(cc.Prefab) ], e.prototype, "cardPrefab", void 0);
return c([ h, d("三公/牌库") ], e);
}(cc.Component);
o.default = f;
cc._RF.pop();
}, {
"../common/AtlasLib": "AtlasLib",
"../common/NodePool": "NodePool",
"../units/AudioManager": "AudioManager",
"../units/UserConfig": "UserConfig"
} ],
CountDown: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "1cc1b0pppdKUr1kDhb66fik", "CountDown");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), c = this && this.__decorate || function(t, e, o, i) {
var n, c = arguments.length, a = c < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (c < 3 ? n(a) : c > 3 ? n(e, o, a) : n(e, o)) || a);
return c > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = t("./TimerStruct"), s = cc._decorator, r = s.ccclass, l = (s.property, s.menu), u = s.disallowMultiple, h = s.executeInEditMode;
cc.macro.ENABLE_WEBGL_ANTIALIAS = !0;
var d = function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {
this.countDownFinish = !0;
};
Object.defineProperty(e.prototype, "countDownFinish", {
get: function() {
return this._countDownFinish;
},
set: function(t) {
this.node.parent.getChildByName("icon").getComponent(cc.Button).interactable = t;
this._countDownFinish = t;
},
enumerable: !1,
configurable: !0
});
e.prototype.show = function(t, e) {
var o = this;
void 0 === e && (e = null);
this.m_timeDown = new a.default(t / 1e3);
var i = Math.floor(t / 50), n = null === e ? i : e;
null === e && (this.m_allcount = i);
this.fillRange = 1;
this.countDownFinish = !1;
this.m_timer = setInterval(function() {
i -= 1;
o.fillRange = 1 * i / n;
if (0 == i) {
o.fillRange = 0;
clearInterval(o.m_timer);
o.m_timer = null;
o.m_timeDown = null;
o.m_allcount = null;
o.countDownFinish = !0;
}
}, 50);
};
e.prototype.start = function() {
this.fillRange = 0;
};
e.prototype.activeOn = function() {
if (this.m_timeDown) if (this.m_timeDown.getSurPlusMilliSecond() > 0) {
this.countDownFinish = !1;
this.show(this.m_timeDown.getSurPlusMilliSecond(), this.m_allcount);
} else {
this.m_timeDown = null;
this.fillRange = 0;
this.countDownFinish = !0;
}
};
e.prototype.activeOff = function() {
if (this.m_timer) {
clearInterval(this.m_timer);
this.m_timer = null;
}
};
e.prototype.onDestroy = function() {
if (this.m_timer) {
clearInterval(this.m_timer);
this.m_timer = null;
this.m_allcount = null;
}
};
return c([ r(), u(), h(), l("公共/倒计时冷却") ], e);
}(cc.Sprite);
o.default = d;
cc._RF.pop();
}, {
"./TimerStruct": "TimerStruct"
} ],
Dialog: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "99a25Efc79ICJtfIAmw9jps", "Dialog");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.queenData = [];
return e;
}
e.getInstance = function() {
if (!e.m_instance) {
e.m_instance = new e();
return e.m_instance;
}
return e.m_instance;
};
e.prototype.setRootNode = function(t) {
this.m_root = t;
this.parent = cc.find("common", t), this.rootNode = cc.find("common/dialog", t), 
this.root = cc.find("common/dialog/root", t), this.mask = cc.find("common/dialog/mask", t), 
this.tittle = cc.find("common/dialog/root/tittle", t).getComponent(cc.Label), this.icon = cc.find("common/dialog/root/content/icon", t).getComponent("switchsp"), 
this.label = cc.find("common/dialog/root/content/value", t).getComponent(cc.Label), 
this.button_yes = cc.find("common/dialog/root/button_layout/button_confirm", t), 
this.button_no = cc.find("common/dialog/root/button_layout/button_cancle", t), this.reset();
this.addEvent();
};
e.prototype.cleanData = function() {
this.m_root.parent.active && (this.m_root.parent.active = !1);
this.m_root.active && (this.m_root.active = !1);
this.queenData = [];
};
e.prototype.reset = function() {
this.label.fontSize = 30;
this.label.lineHeight = 30;
this.root.scaleY = 0;
this.parent.active = !0;
this.mask.active = !1;
this.root.active = !1;
this.icon.setSpriteFrame(-1);
this.label.string = "";
this.tittle.string = "";
this.button_no.active = !1;
this.button_yes.active = !1;
this.queenData = [];
this.unlock = !0;
};
e.prototype.push = function(t, e, o, i, n, c) {
if ("string" == typeof t && "number" == typeof e && "string" == typeof o && "number" == typeof i) {
for (var a = "", s = 0; s < o.length; ++s) switch (s) {
case 17:
case 32:
case 45:
case 56:
a += o[s];
a += "\n";
break;

case 62:
a += "...";
s = o.length;
break;

default:
a += o[s];
}
this.queenData.push({
tittle: t,
label: a,
iconID: e,
buttonStyle: i,
callback: n,
parms: c
});
this.show();
}
};
e.prototype.show = function() {
if (this.unlock) {
this.unlock = !1;
this.rootNode.active = !0;
var t = this.queenData.shift();
if (t) {
this.curBuStyle = t.buttonStyle;
this.curCallBack = t.callback;
this.curParms = t.parms;
this.tittle.string = t.tittle;
this.label.string = t.label;
this.icon.setSpriteFrame(t.iconID);
-1 == t.iconID && (this.icon.node.width = this.icon.node.height = 0);
switch (this.curBuStyle) {
case DIALOG.MB_YES:
this.button_yes.active = !0;
break;

case DIALOG.MB_YESNO:
this.button_yes.active = !0;
this.button_no.active = !0;
}
this.popupOpenScaleXY(this.root, this.mask);
}
}
};
e.prototype.hide = function() {
var t = this;
this.popupCloseScaleXY(this.root, this.mask, function() {
t.icon.setSpriteFrame(-1);
t.label.string = "";
t.tittle.string = "";
t.button_no.active = !1;
t.button_yes.active = !1;
t.root.active = !1;
t.curBuStyle = null;
t.curCallBack = null;
t.curParms = null;
t.unlock = !0;
if (0 === t.queenData.length) {
t.mask.active = !1;
t.rootNode.active = !0;
} else t.show();
});
};
e.prototype.result = function(t) {
if (this.curCallBack) if (this.curBuStyle === DIALOG.MB_YESNO) switch (t) {
case DIALOG.MB_YES:
case DIALOG.MB_NO:
this.curCallBack({
ctrl: t,
params: this.curParms
});
} else this.curBuStyle === DIALOG.MB_NO && t === DIALOG.MB_NO ? this.curCallBack({
ctrl: t,
params: this.curParms
}) : this.curBuStyle === DIALOG.MB_YES && t === DIALOG.MB_YES && this.curCallBack({
ctrl: t,
params: this.curParms
});
this.hide();
};
e.prototype.addEvent = function() {
var t = this;
this.button_yes.on("touchend", function() {
t.result(DIALOG.MB_YES);
}, this);
this.button_no.on("touchend", function() {
t.result(DIALOG.MB_NO);
}, this);
};
return e;
}(t("./MyAnimation").default);
o.default = c;
cc._RF.pop();
}, {
"./MyAnimation": "MyAnimation"
} ],
EmitterCode: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "69ab4JN1ghEjKjL2+lVdTLY", "EmitterCode");
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = function() {
function t() {}
t.MODE_HOMESTARTPARTICLE = 0;
t.MODE_HOMECLICKDLM = 1;
t.MODE_HOMECLICKJLB = 2;
t.MODE_HOMECLICKCTM = 3;
t.MODE_LEFTCLICKJOINROOM = 4;
t.MODE_LEFTCLICKOPENDROOM = 5;
t.MODE_NAVCLICKSHARE = 6;
t.MODE_NAVCLICKPLAY = 7;
t.MODE_NAVCLICKRECORD = 8;
t.MODE_NAVCLICKMENU = 9;
t.CTRL_HOMEDLMCLICK = 1e3;
t.CTRL_HOMEJLBCLICK = 1001;
t.CTRL_HOMECTMCLICK = 1002;
t.CTRL_LEFTCLICKJOINROOM = 1003;
t.CTRL_LEFTCLICKOPENDROOM = 1004;
t.CTRL_NAVCLICKSHARE = 1005;
t.CTRL_NAVCLICKPLAY = 1006;
t.CTRL_NAVCLICKRECORD = 1007;
t.CTRL_NAVCLICKMENU = 1008;
return t;
}();
o.default = i;
cc._RF.pop();
}, {} ],
Emitter: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "5bd62a08URGVbJvGMo8Q94d", "Emitter");
var i = this && this.__spreadArrays || function() {
for (var t = 0, e = 0, o = arguments.length; e < o; e++) t += arguments[e].length;
var i = Array(t), n = 0;
for (e = 0; e < o; e++) for (var c = arguments[e], a = 0, s = c.length; a < s; a++, 
n++) i[n] = c[a];
return i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("./Observer"), c = function() {
function t() {}
t.register = function(e, o, i) {
t.listeners[e] || (t.listeners[e] = []);
t.listeners[e].push(new n.default(o, i));
};
t.remove = function(e, o, i) {
var n = t.listeners[e];
if (n) {
for (var c = n.length, a = 0; a < c; a++) if (n[a].compar(i)) {
n.splice(a, 1);
break;
}
0 == n.length && delete t.listeners[e];
}
};
t.fire = function(e) {
for (var o = [], n = 1; n < arguments.length; n++) o[n - 1] = arguments[n];
console.log("fire", e);
var c = t.listeners[e];
if (c) for (var a = c.length, s = 0; s < a; s++) {
var r = c[s];
r.notify.apply(r, i([ e ], o));
}
};
t.listeners = {};
return t;
}();
o.default = c;
cc._RF.pop();
}, {
"./Observer": "Observer"
} ],
FlashLightUBO: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "0455aIAZxJK64E4WRjlA3bq", "FlashLightUBO");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.default = function() {
this.lightColor = cc.color(130, 99, 68);
this.lightCenterPoint = cc.v2(.5, .5);
this.lightAngle = 45;
this.lightWidth = .1;
this.enableGradient = !0;
this.cropAlpha = !0;
this.enableFog = !1;
};
cc._RF.pop();
}, {} ],
ForgetPd: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "586fbKd0mZNDrADfH0UX2MH", "ForgetPd");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("../common/MyAnimation"), a = t("../common/TimerStruct"), s = t("../common/Toast"), r = t("../units/Tool"), l = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_root = cc.find("popup/forgetpd", o.node);
o.m_mask = cc.find("popup/mask", o.node);
o.m_toast = cc.find("common/toast", o.node);
o.i_cancle = cc.find("popup/forgetpd/button_cancle", o.node);
o.i_confirm = cc.find("popup/forgetpd/button_confirm", o.node);
o.i_getVerify = cc.find("popup/forgetpd/getverify", o.node);
o.c_inputPhone = cc.find("popup/forgetpd/input_phone/input", o.node).getComponent(cc.EditBox);
o.c_inputVerify = cc.find("popup/forgetpd/input_verify/input", o.node).getComponent(cc.EditBox);
o.c_inputNewPd = cc.find("popup/forgetpd/input_newpd/input", o.node).getComponent(cc.EditBox);
o.c_inputRepeatPd = cc.find("popup/forgetpd/input_repeatpd/input", o.node).getComponent(cc.EditBox);
o.reset();
return o;
}
Object.defineProperty(e.prototype, "forgetPdParam", {
get: function() {
return {
phone: this.c_inputPhone.string,
verify: this.c_inputVerify.string,
newPd: this.c_inputNewPd.string,
repeatPd: this.c_inputRepeatPd.string
};
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "verifyPhoneParam", {
get: function() {
return {
phone: this.c_inputPhone.string
};
},
enumerable: !1,
configurable: !0
});
e.prototype.reset = function() {
this.m_root.active = !1;
this.m_root.parent.active = !0;
this.m_mask.active = !1;
};
e.prototype.show = function() {
this.m_verifyCoutDown && this.m_verifyCoutDown.getSurPlus() > 0 && this.setVerifyCountDown(this.m_verifyCoutDown.getSurPlus());
this.popupOpenScaleXY(this.m_root, this.m_mask);
this.addEvent();
};
e.prototype.hide = function() {
var t = this;
this.popupCloseScaleXY(this.m_root, this.m_mask, function() {
t.c_inputPhone.string = "";
t.c_inputVerify.string = "";
t.c_inputNewPd.string = "";
t.c_inputRepeatPd.string = "";
});
this.closeEvent();
};
e.prototype.requestForgetPd = function() {
0 !== this.forgetPdParam.phone.length ? r.default.getInstance().isPhoneNumber(this.forgetPdParam.phone) ? 6 === this.forgetPdParam.verify.length ? this.forgetPdParam.newPd.length < 6 ? s.default.getInstance().show("新密码长度限制6--16位", this.m_toast) : 0 !== this.forgetPdParam.repeatPd.length ? this.forgetPdParam.newPd === this.forgetPdParam.repeatPd ? s.default.getInstance().show("ERRORCODE:500 请求服务器失败!", this.m_toast) : s.default.getInstance().show("两次输入的密码不相同,请确认", this.m_toast) : s.default.getInstance().show("再次输入新密码不能为空", this.m_toast) : s.default.getInstance().show("验证码长度应为6位", this.m_toast) : s.default.getInstance().show("请输入正确的手机号", this.m_toast) : s.default.getInstance().show("手机号不能为空", this.m_toast);
};
e.prototype.requestVerify = function() {
var t = this;
if ("获取验证码" !== this.i_getVerify.getComponent(cc.Label).string) return !1;
this.m_verifyCoutDown = new a.default(60);
var e = this.m_verifyCoutDown.coutDown;
this.i_getVerify.getComponent(cc.Label).string = e + "s";
this.t_timerVerfyCountDown = setInterval(function() {
if (0 == --e) {
t.i_getVerify.getComponent(cc.Label).string = "获取验证码";
t.m_verifyCoutDown = null;
clearInterval(t.t_timerVerfyCountDown);
t.t_timerVerfyCountDown = null;
} else t.i_getVerify.getComponent(cc.Label).string = e + "s";
}, 1e3);
return !0;
};
e.prototype.setVerifyCountDown = function(t) {
var e = this, o = t;
this.i_getVerify.getComponent(cc.Label).string = o + "s";
if (this.t_timerVerfyCountDown) {
clearInterval(this.t_timerVerfyCountDown);
this.t_timerVerfyCountDown = null;
}
this.t_timerVerfyCountDown = setInterval(function() {
if (0 == --o) {
e.i_getVerify.getComponent(cc.Label).string = "获取验证码";
e.m_verifyCoutDown = null;
clearInterval(e.t_timerVerfyCountDown);
e.t_timerVerfyCountDown = null;
} else e.i_getVerify.getComponent(cc.Label).string = o + "s";
}, 1e3);
return !0;
};
e.prototype.addEvent = function() {
var t = this;
this.i_getVerify.on("touchend", function() {
r.default.getInstance().isPhoneNumber(t.verifyPhoneParam.phone) ? t.requestVerify() || s.default.getInstance().show("请在倒计时结束后获取验证码", t.m_toast) : s.default.getInstance().show("请输入正确的手机号", t.m_toast);
}, this);
this.i_confirm.on("touchend", function() {
t.requestForgetPd();
}, this);
this.i_cancle.on("touchend", function() {
t.hide();
}, this);
};
e.prototype.closeEvent = function() {
this.i_getVerify.off("touchend");
this.i_confirm.off("touchend");
this.i_cancle.off("touchend");
};
return e;
}(c.default);
o.default = l;
cc._RF.pop();
}, {
"../common/MyAnimation": "MyAnimation",
"../common/TimerStruct": "TimerStruct",
"../common/Toast": "Toast",
"../units/Tool": "Tool"
} ],
GameView: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "ac7d6jLVB9AKaDE344uh+wn", "GameView");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MGame = void 0;
var c = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.S_GameSanGongBJH = e.S_GameTuiTongZi = e.S_GameCowCow = e.S_GameLongHu = BUTTON_STATE.OFF;
e.S_GameSanGong = BUTTON_STATE.ON;
return e;
}
e.prototype.getGameSanGongState = function() {
return this.S_GameSanGong;
};
e.prototype.getGameCowCowState = function() {
return this.S_GameCowCow;
};
e.prototype.getGameSanGongBJHState = function() {
return this.S_GameSanGongBJH;
};
e.prototype.getGameTuiTongZiState = function() {
return this.S_GameTuiTongZi;
};
e.prototype.getGameLongHuState = function() {
return this.S_GameLongHu;
};
return e;
}(t("../common/MyAnimation").default);
o.MGame = c;
var a = function(t) {
n(e, t);
function e(e, o) {
var i = t.call(this) || this;
i.node = e;
i.m_root = cc.find("gameview", i.node);
i.m_gameLayout = cc.find("gameview/view/content", i.node).children;
i.m_toast = cc.find("common/toast", i.node);
i.m_gameName = cc.find("top/center/gamename", i.node).getComponent(cc.Label);
i.cl_roomView = o;
i.m_root.active = !1;
return i;
}
e.prototype.InitView = function() {
var t = this;
this.m_gameLayout.forEach(function(e) {
switch (e.name) {
case "game_sangong":
e.active = Boolean(t.getGameSanGongState());
break;

case "game_cowcow":
e.active = Boolean(t.getGameCowCowState());
break;

case "game_bijinghua":
e.active = Boolean(t.getGameSanGongBJHState());
break;

case "game_tuitongzi":
e.active = Boolean(t.getGameTuiTongZiState());
break;

case "game_longhu":
e.active = Boolean(t.getGameLongHuState());
}
}, this);
for (var e = 0; e < this.m_gameLayout.length; ++e) if (this.m_gameLayout[e].active) {
this.ClickGame(this.m_gameLayout[e], e);
break;
}
this.addEvent();
this.m_root.active = !0;
};
e.prototype.ClickGame = function(t, e) {
var o = this;
this.curentRoomViewID = e;
this.m_gameLayout.forEach(function(t, i) {
switch (t.name) {
case "game_sangong":
i === e && (o.m_gameName.string = "三 公");
break;

case "game_cowcow":
i === e && (o.m_gameName.string = "牛 牛");
break;

case "game_bijinghua":
i === e && (o.m_gameName.string = "三公比金花");
break;

case "game_tuitongzi":
i === e && (o.m_gameName.string = "推 筒 子");
break;

case "game_longhu":
i === e && (o.m_gameName.string = "龙 虎");
}
o.ButtonIsChooseMove(t, i === e, function() {
o.flushRoomView(e);
});
}, this);
this.cl_roomView.show(e);
};
e.prototype.flushRoomView = function() {};
e.prototype.addEvent = function() {
var t = this;
this.m_gameLayout.forEach(function(e, o) {
e.on("touchend", function() {
o !== t.curentRoomViewID && t.ClickGame(e, o);
}, t);
}, this);
};
e.prototype.start = function() {
this.InitView();
};
e.prototype.onDestroy = function() {};
return e;
}(c);
o.default = a;
cc._RF.pop();
}, {
"../common/MyAnimation": "MyAnimation"
} ],
GoldChange: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "5f425JKIWxE5JXNi5BkKaOB", "GoldChange");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), c = this && this.__decorate || function(t, e, o, i) {
var n, c = arguments.length, a = c < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (c < 3 ? n(a) : c > 3 ? n(e, o, a) : n(e, o)) || a);
return c > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = cc._decorator, s = a.ccclass, r = a.property, l = a.menu, u = a.disallowMultiple, h = a.executeInEditMode;
cc.macro.ENABLE_WEBGL_ANTIALIAS = !0;
var d = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e._addFount = null;
e._subFount = null;
e.addNode = null;
e.subNode = null;
return e;
}
Object.defineProperty(e.prototype, "addFount", {
get: function() {
return this._addFount;
},
set: function(t) {
this._addFount = t;
var e = this.node.getChildByName("addNode").getComponent(cc.Label);
e.font = this.addFount;
e.lineHeight = e.fontSize = 32;
e.verticalAlign = cc.Label.VerticalAlign.CENTER;
e.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "subFount", {
get: function() {
return this._subFount;
},
set: function(t) {
this._subFount = t;
var e = this.node.getChildByName("subNode").getComponent(cc.Label);
e.font = this.subFount;
e.lineHeight = e.fontSize = 32;
e.verticalAlign = cc.Label.VerticalAlign.CENTER;
e.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "string", {
get: function() {
return this._string;
},
set: function(t) {
var e = this;
this.checkNode();
this.node.active = !0;
if (t >= 0) {
this.addNode.active = !0;
this.addNode.opacity = 255;
this.subNode.active = !1;
this.addNode.getComponent(cc.Label).string = String("+" + t);
cc.tween(this.addNode).delay(1.5).to(.5, {
opacity: 0
}, {
easing: "quadOut"
}).call(function() {
e.addNode.active = !1;
}).start();
} else {
this.addNode.active = !1;
this.subNode.opacity = 255;
this.subNode.active = !0;
this.subNode.getComponent(cc.Label).string = String("-" + t);
cc.tween(this.subNode).delay(1.5).to(.5, {
opacity: 0
}, {
easing: "quadOut"
}).call(function() {
e.subNode.active = !1;
}).start();
}
},
enumerable: !1,
configurable: !0
});
e.prototype.onLoad = function() {};
e.prototype.checkNode = function() {
if (2 === this.node.children.length) {
var t = this.node.getChildByName("addNode");
if (t) {
if (t.getComponent(cc.Label)) return;
t.removeComponent(cc.Label);
t.addComponent(cc.Label).font = this.addFount;
} else this.createAddNode();
var e = this.node.getChildByName("addNode");
if (e) {
if (e.getComponent(cc.Label)) return;
e.removeComponent(cc.Label);
e.addComponent(cc.Label).font = this.subFount;
} else this.createAddNode();
} else {
this.node.removeAllChildren();
this.createAddNode();
this.createSubNode();
}
};
e.prototype.createAddNode = function() {
this.addNode = new cc.Node("addNode");
this.addNode.addComponent(cc.Label);
this.node.addChild(this.addNode);
};
e.prototype.createSubNode = function() {
this.subNode = new cc.Node("subNode");
this.subNode.addComponent(cc.Label);
this.node.addChild(this.subNode);
};
e.prototype.start = function() {
this.checkNode();
};
c([ r(cc.Font) ], e.prototype, "_addFount", void 0);
c([ r(cc.Font) ], e.prototype, "addFount", null);
c([ r(cc.Font) ], e.prototype, "_subFount", void 0);
c([ r(cc.Font) ], e.prototype, "subFount", null);
c([ r(cc.Node) ], e.prototype, "addNode", void 0);
c([ r(cc.Node) ], e.prototype, "subNode", void 0);
return c([ s(), u(), h(), l("渲染组件/加减分") ], e);
}(cc.Component);
o.default = d;
cc._RF.pop();
}, {} ],
HallModelManager: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "6d0f1fKw9FG8Imd0T2o0x11", "HallModelManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = t("./base/Home"), n = t("./base/Left"), c = t("./base/Navbar"), a = t("./popup/ShareView"), s = t("./popup/PlayView"), r = t("./popup/MsgView"), l = t("../common/SetView"), u = t("./popup/AgentView"), h = t("../common/MyAnimation"), d = t("./base/User"), p = t("./popup/ResetPdView"), f = t("./popup/RealNameView"), m = t("./popup/MoneyFlowView"), _ = t("./popup/RecordView"), g = function() {
function t(t, e) {
void 0 === t && (t = null);
void 0 === e && (e = null);
this.node = t;
this.m_PrefabArr = e;
}
t.getInstance = function(e, o) {
void 0 === e && (e = null);
void 0 === o && (o = null);
if (!t.m_instance) {
t.m_instance = new t(e, o);
return t.m_instance;
}
o || cc.error("ErrorCode 404: 预制体数组仍未赋值,将可能导致视图组件异常");
return t.m_instance;
};
t.prototype.setMainNode = function(t) {
this.node = t;
};
t.prototype.init = function() {
this.cl_Home = new i.default(this.node);
this.cl_Left = new n.default(this.node);
this.cl_ShareView = new a.default(this.node);
this.cl_SetView = new l.default(this.node);
this.cl_AgentView = new u.default(this.node);
if (this.m_PrefabArr) {
this.cl_PlayView = new s.default(this.node, this.m_PrefabArr.PopupLeftButton);
this.cl_MsgView = new r.default(this.node, this.m_PrefabArr.PopupLeftButton);
this.cl_RecordView = new _.default(this.node, this.m_PrefabArr.PopupLeftButton);
}
this.cl_Navbar = new c.default(this.node, this.cl_ShareView, this.cl_PlayView, this.cl_MsgView, this.cl_SetView, this.cl_AgentView, this.cl_RecordView);
this.cl_ResetPdView = new p.default(this.node);
this.cl_RealNameView = new f.default(this.node);
this.cl_MoneyFlowView = new m.default(this.node);
this.cl_UserView = new d.default(this.node, this.cl_ResetPdView, this.cl_RealNameView, this.cl_MoneyFlowView);
};
t.prototype.start = function() {
this.cl_SetView.start();
this.cl_Home.start();
this.cl_Left.start();
this.cl_ShareView.start();
this.cl_PlayView.start();
this.cl_MsgView.start();
this.cl_AgentView.start();
this.cl_RecordView.start();
this.cl_Navbar.start();
this.cl_ResetPdView.start();
this.cl_RealNameView.start();
this.cl_MoneyFlowView.start();
this.cl_UserView.start();
};
t.prototype.onDestroy = function() {
t.m_instance = null;
h.default.onDestory();
this.cl_Home.onDestory();
this.cl_Left.onDestory();
this.cl_ShareView.onDestory();
this.cl_PlayView.onDestory();
this.cl_MsgView.onDestory();
this.cl_AgentView.onDestory();
this.cl_SetView.onDestory();
this.cl_RecordView.onDestroy();
this.cl_Navbar.onDestory();
this.cl_ResetPdView.onDestory();
this.cl_RealNameView.onDestory();
this.cl_MoneyFlowView.onDestory();
this.cl_UserView.onDestory();
};
return t;
}();
o.default = g;
cc._RF.pop();
}, {
"../common/MyAnimation": "MyAnimation",
"../common/SetView": "SetView",
"./base/Home": "Home",
"./base/Left": "Left",
"./base/Navbar": "Navbar",
"./base/User": "User",
"./popup/AgentView": "AgentView",
"./popup/MoneyFlowView": "MoneyFlowView",
"./popup/MsgView": "MsgView",
"./popup/PlayView": "PlayView",
"./popup/RealNameView": "RealNameView",
"./popup/RecordView": "RecordView",
"./popup/ResetPdView": "ResetPdView",
"./popup/ShareView": "ShareView"
} ],
Hall: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "36a43mk+wBAr7qzazC6kNzP", "Hall");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), c = this && this.__decorate || function(t, e, o, i) {
var n, c = arguments.length, a = c < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (c < 3 ? n(a) : c > 3 ? n(e, o, a) : n(e, o)) || a);
return c > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = t("../common/Notice"), s = t("../common/SceneManager"), r = t("../common/Toast"), l = t("../units/AudioManager"), u = t("./HallModelManager"), h = cc._decorator, d = h.ccclass, p = h.menu, f = h.property, m = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.popupLeftButton = null;
return e;
}
e.prototype.onLoad = function() {
this.initAudio();
s.default.getInstance().setScene(cc.director.getScene());
r.default.getInstance().setRootNode(cc.find("common/toast", this.node));
a.default.getInstance().setRootNode(cc.find("top/notice", this.node));
a.default.getInstance().debug();
this.m_hallPrefabArr = {
PopupLeftButton: null
};
this.m_hallPrefabArr.PopupLeftButton = this.popupLeftButton;
this.cl_ModelManager = u.default.getInstance(this.node, this.m_hallPrefabArr);
this.cl_ModelManager.init();
};
e.prototype.initAudio = function() {
if (l.default.getInstance().getBgmCode() !== BGM_CODE.BGM_PASSPORT) {
l.default.getInstance().playBgmFromLocal(BGM_CODE.BGM_PASSPORT, !0);
l.default.getInstance().setBgmVol();
l.default.getInstance().setEffVol();
}
};
e.prototype.RenderMoneyFlow = function(t, e) {
this.cl_ModelManager.cl_MoneyFlowView.renderMoneyFlowFunction(t, e);
};
e.prototype.RenderMainRecord = function(t, e) {
this.cl_ModelManager.cl_RecordView.RenderMainFunction(t, e);
};
e.prototype.RenderPopupRecord = function(t, e) {
this.cl_ModelManager.cl_RecordView.RenderPopupFunction(t, e);
};
e.prototype.ClickRecordMainNode = function(t, e, o) {
this.cl_ModelManager.cl_RecordView.clickMainItemFunction(t, e, o);
};
e.prototype.ClickRecordPopupNode = function(t, e, o) {
this.cl_ModelManager.cl_RecordView.clickPopupItemFunction(t, e, o);
};
e.prototype.start = function() {
this.cl_ModelManager.start();
};
e.prototype.Toast = function(t, e, o) {
r.default.getInstance().show("文件路径" + t + "图像宽" + e + "图像高" + o, this.node.getChildByName("common/toast"));
};
e.prototype.onDestroy = function() {
a.default.getInstance().onDestroy();
this.cl_ModelManager.onDestroy();
};
c([ f(cc.Prefab) ], e.prototype, "popupLeftButton", void 0);
return c([ d, p("场景主脚本/Hall") ], e);
}(cc.Component);
o.default = m;
cc._RF.pop();
}, {
"../common/Notice": "Notice",
"../common/SceneManager": "SceneManager",
"../common/Toast": "Toast",
"../units/AudioManager": "AudioManager",
"./HallModelManager": "HallModelManager"
} ],
Home: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "f8bce5hVzpIDaA5E/dbAW2Q", "Home");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MHome = o.ParticleStruct = void 0;
var c = t("../../common/MyAnimation"), a = t("../../common/SceneManager"), s = t("../../common/Toast"), r = t("../../units/Tool"), l = function(t, e) {
this.id = t;
this.node = e;
};
o.ParticleStruct = l;
var u = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.S_jlbState = e.S_ctmState = BUTTON_STATE.OFF;
e.S_dlmState = BUTTON_STATE.ON;
e.a_particleOnePos = [ new cc.Vec2(-190, 0), new cc.Vec2(0, 190), new cc.Vec2(190, 0), new cc.Vec2(0, -190) ];
e.a_particleTwoPos = [ new cc.Vec2(190, 0), new cc.Vec2(0, -190), new cc.Vec2(-190, 0), new cc.Vec2(0, 190) ];
e.m_curParticleOnePosIndex = e.m_curParticleTwoPosIndex = 0;
return e;
}
e.prototype.getParticleOnePos = function(t) {
return t < 0 || t > this.a_particleOnePos.length - 1 ? null : new cc.Vec3(this.a_particleOnePos[t].x, this.a_particleOnePos[t].y, 0);
};
e.prototype.getParticleTwoPos = function(t) {
return t < 0 || t > this.a_particleTwoPos.length - 1 ? null : new cc.Vec3(this.a_particleTwoPos[t].x, this.a_particleTwoPos[t].y, 0);
};
e.prototype.getParticleNextIndex = function(t) {
var e, o;
switch (t) {
case 0:
e = this.m_curParticleOnePosIndex;
o = this.a_particleOnePos.length;
break;

case 1:
e = this.m_curParticleTwoPosIndex;
o = this.a_particleTwoPos.length;
break;

default:
cc.error("没有该ID的粒子");
return null;
}
(e += 1) > o - 1 && (e = 0);
this.setParticleCurentIndex(t, e);
return e;
};
e.prototype.setParticleCurentIndex = function(t, e) {
switch (t) {
case 0:
this.m_curParticleOnePosIndex = e;
break;

case 1:
this.m_curParticleTwoPosIndex = e;
break;

default:
cc.error("没有该ID的粒子");
return null;
}
};
e.prototype.getParticleNextPos = function(t) {
switch (t) {
case 0:
return this.getParticleOnePos(this.getParticleNextIndex(0));

case 1:
return this.getParticleTwoPos(this.getParticleNextIndex(1));

default:
cc.error("没有该ID的粒子");
return null;
}
};
e.prototype.getDLMButtonState = function() {
return this.S_dlmState;
};
e.prototype.getJLBButtonState = function() {
return this.S_jlbState;
};
e.prototype.getCTMButtonState = function() {
return this.S_ctmState;
};
return e;
}(c.default);
o.MHome = u;
var h = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_particalOne = new l(0, cc.find("home/home_dlm/particle1", o.node));
o.m_particalTwo = new l(1, cc.find("home/home_dlm/particle2", o.node));
o.i_hoomeDLM = cc.find("home/home_dlm", o.node);
o.i_homeJLB = cc.find("home/home_jlb", o.node);
o.i_homeCTM = cc.find("home/home_ctm", o.node);
o.m_toast = cc.find("common/toast", o.node);
o.addevent();
return o;
}
e.prototype.resetParticlePos = function(t) {
switch (t) {
case 0:
this.m_particalOne.node.position = this.getParticleOnePos(0);
break;

case 1:
this.m_particalTwo.node.position = this.getParticleTwoPos(0);
break;

default:
cc.error("ERROR CODE 404:找不到该粒子 SCRIPT POS CLASS:VHOM METHOD:resetParticlePos PARAMS:ParticleId = " + t);
return;
}
};
e.prototype.resetAllParticlePos = function() {
this.resetParticlePos(0);
this.resetParticlePos(1);
};
e.prototype.enableParticle = function(t) {
var e = this.getParticleFromId(t);
e && (e.node.active = !0);
};
e.prototype.disableParticle = function(t) {
var e = this.getParticleFromId(t);
e && (e.node.active = !1);
};
e.prototype.runPartiCle = function(t, e) {
var o = this;
this.enableParticle(t);
this.movePos(e, this.getParticleFromId(t).node, this.getParticleNextPos(t), function() {
o.runPartiCle(t, e);
});
};
e.prototype.stopPartiCle = function(t) {
this.stopMovePos(t);
};
e.prototype.getParticleFromId = function(t) {
switch (t) {
case 0:
if (this.m_particalOne && this.m_particalOne.id === t) return this.m_particalOne;
cc.error("ERROR CODE 503:该粒子尚未赋值");
break;

case 1:
if (this.m_particalTwo && this.m_particalTwo.id === t) return this.m_particalTwo;
cc.error("ERROR CODE 503:该粒子尚未赋值");
break;

default:
cc.error("ERROR CODE 404:找不到该粒子 SCRIPT POS CLASS:VHOM METHOD:runPartiCle PARAMS:ParticleId = " + t);
return null;
}
};
e.prototype.runParticleRender = function(t, e, o) {
this.resetParticlePos(e);
this.runPartiCle(e, o);
};
e.prototype.click_DLM = function() {
switch (this.getDLMButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("连接服务器失败!", this.m_toast);
break;

case BUTTON_STATE.ON:
a.default.getInstance().loadScene("room");
}
};
e.prototype.click_JLB = function() {
switch (this.getJLBButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
return;
}
};
e.prototype.click_CTM = function() {
switch (this.getCTMButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
return;
}
};
e.prototype.addevent = function() {
var t = this;
this.i_hoomeDLM.on("touchend", function() {
t.click_DLM();
}, this);
this.i_homeJLB.on("touchend", function() {
t.click_JLB();
}, this);
this.i_homeCTM.on("touchend", function() {
t.click_CTM();
}, this);
};
e.prototype.start = function() {
this.resetAllParticlePos();
this.runPartiCle(0, r.default.getInstance().genNonDuplicateID());
this.runPartiCle(1, r.default.getInstance().genNonDuplicateID());
};
e.prototype.onDestory = function() {};
return e;
}(u);
o.default = h;
cc._RF.pop();
}, {
"../../common/MyAnimation": "MyAnimation",
"../../common/SceneManager": "SceneManager",
"../../common/Toast": "Toast",
"../../units/Tool": "Tool"
} ],
Left: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "bf654gX995LaaV6r/MeOuP3", "Left");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MLeft = void 0;
var c = t("../../common/MyAnimation"), a = t("../../common/Toast"), s = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.S_joinRoomState = e.S_opendRoomState = BUTTON_STATE.OFF;
return e;
}
e.prototype.getJoinRoomButtonState = function() {
return this.S_joinRoomState;
};
e.prototype.getOpendRoomButtonState = function() {
return this.S_opendRoomState;
};
return e;
}(c.default);
o.MLeft = s;
var r = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_toast = cc.find("common/toast", o.node);
o.i_joinRoom = cc.find("left/button_join", o.node);
o.i_opendRoom = cc.find("left/button_opend", o.node);
o.addEvent();
return o;
}
e.prototype.click_JoinRoom = function() {
switch (this.getJoinRoomButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
return;
}
};
e.prototype.click_OpendRoom = function() {
switch (this.getOpendRoomButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
return;
}
};
e.prototype.addEvent = function() {
var t = this;
this.i_joinRoom.on("touchend", function() {
t.click_JoinRoom();
}, this);
this.i_opendRoom.on("touchend", function() {
t.click_OpendRoom();
}, this);
};
e.prototype.start = function() {};
e.prototype.onDestory = function() {};
return e;
}(s);
o.default = r;
cc._RF.pop();
}, {
"../../common/MyAnimation": "MyAnimation",
"../../common/Toast": "Toast"
} ],
ListItem: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "de86aUtk1BLNpDi6UBh0tBp", "ListItem");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), c = this && this.__decorate || function(t, e, o, i) {
var n, c = arguments.length, a = c < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (c < 3 ? n(a) : c > 3 ? n(e, o, a) : n(e, o)) || a);
return c > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a, s = cc._decorator, r = s.ccclass, l = s.property, u = s.disallowMultiple, h = s.menu, d = s.executionOrder;
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.TOGGLE = 1] = "TOGGLE";
t[t.SWITCH = 2] = "SWITCH";
})(a || (a = {}));
var p = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.icon = null;
e.title = null;
e.selectedMode = a.NONE;
e.selectedFlag = null;
e.selectedSpriteFrame = null;
e._unselectedSpriteFrame = null;
e.adaptiveSize = !1;
e._selected = !1;
e._eventReg = !1;
return e;
}
Object.defineProperty(e.prototype, "selected", {
get: function() {
return this._selected;
},
set: function(t) {
this._selected = t;
if (this.selectedFlag) switch (this.selectedMode) {
case a.TOGGLE:
this.selectedFlag.active = t;
break;

case a.SWITCH:
var e = this.selectedFlag.getComponent(cc.Sprite);
e && (e.spriteFrame = t ? this.selectedSpriteFrame : this._unselectedSpriteFrame);
}
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "btnCom", {
get: function() {
if (!this._btnCom) switch (this.node.name) {
case "sangongrecorditem":
this._btnCom = cc.find("button_detail", this.node).getComponent(cc.Button);
break;

case "sgdetail":
this._btnCom = cc.find("briefly/button_open", this.node).getComponent(cc.Button);
break;

default:
this._btnCom = this.node.getComponent(cc.Button);
}
return this._btnCom;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "btnUpCom", {
get: function() {
this._btnUpCom || (this._btnUpCom = this.node.getChildByName("up").getComponent(cc.Button));
return this._btnUpCom;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "btnDownCom", {
get: function() {
this._btnDownCom || (this._btnDownCom = this.node.getChildByName("down").getComponent(cc.Button));
return this._btnDownCom;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "btmCom_UpTableRule", {
get: function() {
this._btmCom_UpTableRule || (this._btmCom_UpTableRule = cc.find("up/detail", this.node).getComponent(cc.Button));
return this._btmCom_UpTableRule;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "btmCom_DownTableRule", {
get: function() {
this._btmCom_DownTableRule || (this._btmCom_DownTableRule = cc.find("down/detail", this.node).getComponent(cc.Button));
return this._btmCom_DownTableRule;
},
enumerable: !1,
configurable: !0
});
e.prototype.onLoad = function() {
if (this.selectedMode == a.SWITCH) {
var t = this.selectedFlag.getComponent(cc.Sprite);
this._unselectedSpriteFrame = t.spriteFrame;
}
};
e.prototype.onDestroy = function() {
this.node.off(cc.Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
};
e.prototype._registerEvent = function() {
if ("table" === this.node.name) {
console.log("add");
if (!this._eventReg) {
this.btnUpCom && this.list.selectedMode > 0 && this.btnUpCom.clickEvents.unshift(this.createEvt(this, "onClickUp"));
this.btnDownCom && this.list.selectedMode > 0 && this.btnDownCom.clickEvents.unshift(this.createEvt(this, "onClickDown"));
this.btmCom_DownTableRule && this.list.selectedMode > 0 && this.btmCom_DownTableRule.clickEvents.unshift(this.createEvt(this, "onClickDownRule"));
this.btmCom_UpTableRule && this.list.selectedMode > 0 && this.btmCom_UpTableRule.clickEvents.unshift(this.createEvt(this, "onClickUpRule"));
this.adaptiveSize && this.node.on(cc.Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
this._eventReg = !0;
}
} else if (!this._eventReg) {
this.btnCom && this.list.selectedMode > 0 && this.btnCom.clickEvents.unshift(this.createEvt(this, "onClickThis"));
this.adaptiveSize && this.node.on(cc.Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
this._eventReg = !0;
}
};
e.prototype._onSizeChange = function() {
this.list._onItemAdaptive(this.node);
};
e.prototype.createEvt = function(t, e, o) {
void 0 === o && (o = null);
if (t.isValid) {
t.comName = t.comName || t.name.match(/\<(.*?)\>/g).pop().replace(/\<|>/g, "");
var i = new cc.Component.EventHandler();
i.target = o || t.node;
i.component = t.comName;
i.handler = e;
return i;
}
};
e.prototype.showAni = function(t, e, o) {
var i, n = this;
switch (t) {
case 0:
i = [ cc.scaleTo(.2, .7), cc.moveBy(.3, 0, 2 * this.node.height) ];
break;

case 1:
i = [ cc.scaleTo(.2, .7), cc.moveBy(.3, 2 * this.node.width, 0) ];
break;

case 2:
i = [ cc.scaleTo(.2, .7), cc.moveBy(.3, 0, -2 * this.node.height) ];
break;

case 3:
i = [ cc.scaleTo(.2, .7), cc.moveBy(.3, -2 * this.node.width, 0) ];
break;

default:
i = [ cc.scaleTo(.3, .1) ];
}
(e || o) && i.push(cc.callFunc(function() {
if (o) {
n.list._delSingleItem(n.node);
for (var t = n.list.displayData.length - 1; t >= 0; t--) if (n.list.displayData[t].id == n.listId) {
n.list.displayData.splice(t, 1);
break;
}
}
e();
}));
this.node.runAction(cc.sequence(i));
};
e.prototype.onClickThis = function() {
this.list.selectedId = this.listId;
};
e.prototype.onClickUp = function() {
console.log("11111");
this.list.addRommRuleID = {
id: this.listId,
pos: ROOM_CLICK_POS.UPTABLE
};
};
e.prototype.onClickDown = function() {
console.log("222222");
this.list.addRommRuleID = {
id: this.listId,
pos: ROOM_CLICK_POS.DOWNTABLE
};
};
e.prototype.onClickUpRule = function() {
console.log("33333");
this.list.addRommRuleID = {
id: this.listId,
pos: ROOM_CLICK_POS.UPRULE
};
};
e.prototype.onClickDownRule = function() {
console.log("44444");
this.list.addRommRuleID = {
id: this.listId,
pos: ROOM_CLICK_POS.DOWNRULE
};
};
c([ l({
type: cc.Sprite,
tooltip: !1
}) ], e.prototype, "icon", void 0);
c([ l({
type: cc.Node,
tooltip: !1
}) ], e.prototype, "title", void 0);
c([ l({
type: cc.Enum(a),
tooltip: !1
}) ], e.prototype, "selectedMode", void 0);
c([ l({
type: cc.Node,
tooltip: !1,
visible: function() {
return this.selectedMode > a.NONE;
}
}) ], e.prototype, "selectedFlag", void 0);
c([ l({
type: cc.SpriteFrame,
tooltip: !1,
visible: function() {
return this.selectedMode == a.SWITCH;
}
}) ], e.prototype, "selectedSpriteFrame", void 0);
c([ l({
tooltip: !1
}) ], e.prototype, "adaptiveSize", void 0);
return c([ r, u(), h("自定义组件/List Item"), d(-5001) ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {} ],
ListOpacity: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "a4c5dUc0OtKQKxvL1Z7f+hO", "ListOpacity");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), c = this && this.__decorate || function(t, e, o, i) {
var n, c = arguments.length, a = c < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (c < 3 ? n(a) : c > 3 ? n(e, o, a) : n(e, o)) || a);
return c > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = cc._decorator, s = a.ccclass, r = (a.property, function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {
this.scrollview = this.node;
this.content = cc.find("view/content", this.node);
this.view = cc.find("view", this.node);
this.scrollview && this.view && this.content || cc.error("节点不符合要求scorllview\n -view\n  -content");
};
e.prototype.onEnable = function() {
this.scrollview.on("scrolling", this.setListOpcaty.bind(this));
this.content.on("size-changed", this.setListOpcaty.bind(this));
};
e.prototype.start = function() {};
e.prototype.setListOpcaty = function() {
for (var t = this.content.children.length, e = cc.rect(-this.view.width / 2, -this.content.y - this.view.height, this.view.width, this.view.height), o = 0; o < t; o++) {
var i = this.content.children[o];
e.intersects(i.getBoundingBox()) ? i.opacity = 255 : i.opacity = 0;
}
};
e.prototype.onDestroy = function() {
this.scrollview.off("scrolling");
this.content.off("size-changed");
};
return c([ s ], e);
}(cc.Component));
o.default = r;
cc._RF.pop();
}, {} ],
List: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "ef439OeVM9Jo7phvLCI9Byq", "List");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), c = this && this.__decorate || function(t, e, o, i) {
var n, c = arguments.length, a = c < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (c < 3 ? n(a) : c > 3 ? n(e, o, a) : n(e, o)) || a);
return c > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a, s, r, l = cc._decorator, u = l.ccclass, h = l.property, d = l.disallowMultiple, p = l.menu, f = l.executionOrder, m = l.requireComponent, _ = t("./ListItem");
(function(t) {
t[t.NODE = 1] = "NODE";
t[t.PREFAB = 2] = "PREFAB";
})(a || (a = {}));
(function(t) {
t[t.NORMAL = 1] = "NORMAL";
t[t.ADHERING = 2] = "ADHERING";
t[t.PAGE = 3] = "PAGE";
})(s || (s = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.SINGLE = 1] = "SINGLE";
t[t.MULT = 2] = "MULT";
})(r || (r = {}));
var g = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.templateType = a.NODE;
e.tmpNode = null;
e.tmpPrefab = [];
e._slideMode = s.NORMAL;
e.pageDistance = .3;
e.pageChangeEvent = new cc.Component.EventHandler();
e._virtual = !0;
e.cyclic = !1;
e.lackCenter = !1;
e.lackSlide = !1;
e._updateRate = 0;
e.frameByFrameRenderNum = 0;
e.renderEvent = new cc.Component.EventHandler();
e.selectedMode = r.NONE;
e.repeatEventSingle = !1;
e.selectedEvent = null;
e._selectedId = -1;
e._addRommRuleID = null;
e._PrefabIndex = 0;
e._forceUpdate = !1;
e._updateDone = !0;
e._numItems = 0;
e._inited = !1;
e._needUpdateWidget = !1;
e._aniDelRuning = !1;
e._doneAfterUpdate = !1;
e.adhering = !1;
e._adheringBarrier = !1;
e.curPageNum = 0;
return e;
}
Object.defineProperty(e.prototype, "slideMode", {
get: function() {
return this._slideMode;
},
set: function(t) {
this._slideMode = t;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "virtual", {
get: function() {
return this._virtual;
},
set: function(t) {
null != t && (this._virtual = t);
0 != this._numItems && this._onScrolling();
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "updateRate", {
get: function() {
return this._updateRate;
},
set: function(t) {
t >= 0 && t <= 6 && (this._updateRate = t);
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "addRommRuleID", {
set: function(t) {
var e, o = this;
e = o.getItemByListId(t.id);
o.selectedEvent && cc.Component.EventHandler.emitEvents([ o.selectedEvent ], e, t.id % this._actualNumItems, null == o._lastSelectedId ? null : o._lastSelectedId % this._actualNumItems, t);
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "selectedId", {
get: function() {
return this._selectedId;
},
set: function(t) {
var e, o = this;
switch (o.selectedMode) {
case r.SINGLE:
if (!o.repeatEventSingle && t == o._selectedId) return;
e = o.getItemByListId(t);
var i = void 0;
o._selectedId >= 0 ? o._lastSelectedId = o._selectedId : o._lastSelectedId = null;
o._selectedId = t;
e && ((i = e.getComponent(_.default)).selected = !0);
if (o._lastSelectedId >= 0 && o._lastSelectedId != o._selectedId) {
var n = o.getItemByListId(o._lastSelectedId);
n && (n.getComponent(_.default).selected = !1);
}
o.selectedEvent && cc.Component.EventHandler.emitEvents([ o.selectedEvent ], e, t % this._actualNumItems, null == o._lastSelectedId ? null : o._lastSelectedId % this._actualNumItems);
break;

case r.MULT:
if (!(e = o.getItemByListId(t))) return;
i = e.getComponent(_.default);
o._selectedId >= 0 && (o._lastSelectedId = o._selectedId);
o._selectedId = t;
var c = !i.selected;
i.selected = c;
var a = o.multSelected.indexOf(t);
c && a < 0 ? o.multSelected.push(t) : !c && a >= 0 && o.multSelected.splice(a, 1);
o.selectedEvent && cc.Component.EventHandler.emitEvents([ o.selectedEvent ], e, t % this._actualNumItems, null == o._lastSelectedId ? null : o._lastSelectedId % this._actualNumItems, c);
}
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "PrefabIndex", {
get: function() {
return this._PrefabIndex ? this._PrefabIndex : 0;
},
set: function(t) {
if (!(t > this.tmpPrefab.length - 1)) {
this._PrefabIndex = t;
if (this.templateType == a.PREFAB) {
this.onDestroy();
this._inited = !1;
this._init();
}
this.numItems = 0;
}
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "numItems", {
get: function() {
return this._actualNumItems;
},
set: function(t) {
var e = this;
if (e.checkInited(!1)) if (null == t || t < 0) cc.error("numItems set the wrong::", t); else {
e._actualNumItems = e._numItems = t;
e._forceUpdate = !0;
if (e._virtual) {
e._resizeContent();
e.cyclic && (e._numItems = e._cyclicNum * e._numItems);
e._onScrolling();
e.frameByFrameRenderNum || e.slideMode != s.PAGE || (e.curPageNum = e.nearestListId);
} else {
var o = e.content.getComponent(cc.Layout);
o && (o.enabled = !0);
e._delRedundantItem();
e.firstListId = 0;
if (e.frameByFrameRenderNum > 0) {
for (var i = e.frameByFrameRenderNum > e._numItems ? e._numItems : e.frameByFrameRenderNum, n = 0; n < i; n++) e._createOrUpdateItem2(n);
if (e.frameByFrameRenderNum < e._numItems) {
e._updateCounter = e.frameByFrameRenderNum;
e._updateDone = !1;
}
} else {
for (n = 0; n < t; n++) e._createOrUpdateItem2(n);
e.displayItemNum = t;
}
}
}
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "scrollView", {
get: function() {
return this._scrollView;
},
enumerable: !1,
configurable: !0
});
e.prototype.onLoad = function() {
this._init();
};
e.prototype.onDestroy = function() {
var t = this;
t._itemTmp && t._itemTmp.isValid && t._itemTmp.destroy();
t.tmpNode && t.tmpNode.isValid && t.tmpNode.destroy();
for (;t._pool.size(); ) t._pool.get().destroy();
};
e.prototype.onEnable = function() {
this._registerEvent();
this._init();
};
e.prototype.onDisable = function() {
this._unregisterEvent();
};
e.prototype._registerEvent = function() {
var t = this;
t.node.on(cc.Node.EventType.TOUCH_START, t._onTouchStart, t, !0);
t.node.on("touch-up", t._onTouchUp, t);
t.node.on(cc.Node.EventType.TOUCH_CANCEL, t._onTouchCancelled, t, !0);
t.node.on("scroll-began", t._onScrollBegan, t, !0);
t.node.on("scroll-ended", t._onScrollEnded, t, !0);
t.node.on("scrolling", t._onScrolling, t, !0);
t.node.on(cc.Node.EventType.SIZE_CHANGED, t._onSizeChanged, t);
};
e.prototype._unregisterEvent = function() {
var t = this;
t.node.off(cc.Node.EventType.TOUCH_START, t._onTouchStart, t, !0);
t.node.off("touch-up", t._onTouchUp, t);
t.node.off(cc.Node.EventType.TOUCH_CANCEL, t._onTouchCancelled, t, !0);
t.node.off("scroll-began", t._onScrollBegan, t, !0);
t.node.off("scroll-ended", t._onScrollEnded, t, !0);
t.node.off("scrolling", t._onScrolling, t, !0);
t.node.off(cc.Node.EventType.SIZE_CHANGED, t._onSizeChanged, t);
};
e.prototype._init = function() {
var t = this;
if (!t._inited) {
t._scrollView = t.node.getComponent(cc.ScrollView);
t.content = t._scrollView.content;
if (t.content) {
t._layout = t.content.getComponent(cc.Layout);
t._align = t._layout.type;
t._resizeMode = t._layout.resizeMode;
t._startAxis = t._layout.startAxis;
t._topGap = t._layout.paddingTop;
t._rightGap = t._layout.paddingRight;
t._bottomGap = t._layout.paddingBottom;
t._leftGap = t._layout.paddingLeft;
t._columnGap = t._layout.spacingX;
t._lineGap = t._layout.spacingY;
t._colLineNum;
t._verticalDir = t._layout.verticalDirection;
t._horizontalDir = t._layout.horizontalDirection;
t.setTemplateItem(cc.instantiate(t.templateType == a.PREFAB ? t.tmpPrefab[t.PrefabIndex] : t.tmpNode));
if (t._slideMode == s.ADHERING || t._slideMode == s.PAGE) {
t._scrollView.inertia = !1;
t._scrollView._onMouseWheel = function() {};
}
t.virtual || (t.lackCenter = !1);
t._lastDisplayData = [];
t.displayData = [];
t._pool = new cc.NodePool();
t._forceUpdate = !1;
t._updateCounter = 0;
t._updateDone = !0;
t.curPageNum = 0;
if (t.cyclic) {
t._scrollView._processAutoScrolling = this._processAutoScrolling.bind(t);
t._scrollView._startBounceBackIfNeeded = function() {
return !1;
};
}
switch (t._align) {
case cc.Layout.Type.HORIZONTAL:
switch (t._horizontalDir) {
case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
t._alignCalcType = 1;
break;

case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
t._alignCalcType = 2;
}
break;

case cc.Layout.Type.VERTICAL:
switch (t._verticalDir) {
case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
t._alignCalcType = 3;
break;

case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
t._alignCalcType = 4;
}
break;

case cc.Layout.Type.GRID:
switch (t._startAxis) {
case cc.Layout.AxisDirection.HORIZONTAL:
switch (t._verticalDir) {
case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
t._alignCalcType = 3;
break;

case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
t._alignCalcType = 4;
}
break;

case cc.Layout.AxisDirection.VERTICAL:
switch (t._horizontalDir) {
case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
t._alignCalcType = 1;
break;

case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
t._alignCalcType = 2;
}
}
}
t.content.removeAllChildren();
t._inited = !0;
} else cc.error(t.node.name + "'s cc.ScrollView unset content!");
}
};
e.prototype._processAutoScrolling = function(t) {
this._scrollView._autoScrollAccumulatedTime += 1 * t;
var e = Math.min(1, this._scrollView._autoScrollAccumulatedTime / this._scrollView._autoScrollTotalTime);
if (this._scrollView._autoScrollAttenuate) {
var o = e - 1;
e = o * o * o * o * o + 1;
}
var i = this._scrollView._autoScrollStartPosition.add(this._scrollView._autoScrollTargetDelta.mul(e)), n = this._scrollView.getScrollEndedEventTiming(), c = Math.abs(e - 1) <= n;
if (Math.abs(e - 1) <= this._scrollView.getScrollEndedEventTiming() && !this._scrollView._isScrollEndedWithThresholdEventFired) {
this._scrollView._dispatchEvent("scroll-ended-with-threshold");
this._scrollView._isScrollEndedWithThresholdEventFired = !0;
}
c && (this._scrollView._autoScrolling = !1);
var a = i.sub(this._scrollView.getContentPosition());
this._scrollView._moveContent(this._scrollView._clampDelta(a), c);
this._scrollView._dispatchEvent("scrolling");
if (!this._scrollView._autoScrolling) {
this._scrollView._isBouncing = !1;
this._scrollView._scrolling = !1;
this._scrollView._dispatchEvent("scroll-ended");
}
};
e.prototype.setTemplateItem = function(t) {
if (t) {
var e = this;
e._itemTmp = t;
e._resizeMode == cc.Layout.ResizeMode.CHILDREN ? e._itemSize = e._layout.cellSize : e._itemSize = cc.size(t.width, t.height);
var o = t.getComponent(_.default), i = !1;
o || (i = !0);
i && (e.selectedMode = r.NONE);
(o = t.getComponent(cc.Widget)) && o.enabled && (e._needUpdateWidget = !0);
e.selectedMode == r.MULT && (e.multSelected = []);
switch (e._align) {
case cc.Layout.Type.HORIZONTAL:
e._colLineNum = 1;
e._sizeType = !1;
break;

case cc.Layout.Type.VERTICAL:
e._colLineNum = 1;
e._sizeType = !0;
break;

case cc.Layout.Type.GRID:
switch (e._startAxis) {
case cc.Layout.AxisDirection.HORIZONTAL:
var n = e.content.width - e._leftGap - e._rightGap;
e._colLineNum = Math.floor((n + e._columnGap) / (e._itemSize.width + e._columnGap));
e._sizeType = !0;
break;

case cc.Layout.AxisDirection.VERTICAL:
var c = e.content.height - e._topGap - e._bottomGap;
e._colLineNum = Math.floor((c + e._lineGap) / (e._itemSize.height + e._lineGap));
e._sizeType = !1;
}
}
}
};
e.prototype.checkInited = function(t) {
void 0 === t && (t = !0);
if (!this._inited) {
t && cc.error("List initialization not completed!");
return !1;
}
return !0;
};
e.prototype._resizeContent = function() {
var t, e = this;
switch (e._align) {
case cc.Layout.Type.HORIZONTAL:
if (e._customSize) {
var o = e._getFixedSize(null);
t = e._leftGap + o.val + e._itemSize.width * (e._numItems - o.count) + e._columnGap * (e._numItems - 1) + e._rightGap;
} else t = e._leftGap + e._itemSize.width * e._numItems + e._columnGap * (e._numItems - 1) + e._rightGap;
break;

case cc.Layout.Type.VERTICAL:
if (e._customSize) {
o = e._getFixedSize(null);
t = e._topGap + o.val + e._itemSize.height * (e._numItems - o.count) + e._lineGap * (e._numItems - 1) + e._bottomGap;
} else t = e._topGap + e._itemSize.height * e._numItems + e._lineGap * (e._numItems - 1) + e._bottomGap;
break;

case cc.Layout.Type.GRID:
e.lackCenter && (e.lackCenter = !1);
switch (e._startAxis) {
case cc.Layout.AxisDirection.HORIZONTAL:
var i = Math.ceil(e._numItems / e._colLineNum);
t = e._topGap + e._itemSize.height * i + e._lineGap * (i - 1) + e._bottomGap;
break;

case cc.Layout.AxisDirection.VERTICAL:
var n = Math.ceil(e._numItems / e._colLineNum);
t = e._leftGap + e._itemSize.width * n + e._columnGap * (n - 1) + e._rightGap;
}
}
var c = e.content.getComponent(cc.Layout);
c && (c.enabled = !1);
e._allItemSize = t;
e._allItemSizeNoEdge = e._allItemSize - (e._sizeType ? e._topGap + e._bottomGap : e._leftGap + e._rightGap);
if (e.cyclic) {
var a = e._sizeType ? e.node.height : e.node.width;
e._cyclicPos1 = 0;
a -= e._cyclicPos1;
e._cyclicNum = Math.ceil(a / e._allItemSizeNoEdge) + 1;
var s = e._sizeType ? e._lineGap : e._columnGap;
e._cyclicPos2 = e._cyclicPos1 + e._allItemSizeNoEdge + s;
e._cyclicAllItemSize = e._allItemSize + e._allItemSizeNoEdge * (e._cyclicNum - 1) + s * (e._cyclicNum - 1);
e._cycilcAllItemSizeNoEdge = e._allItemSizeNoEdge * e._cyclicNum;
e._cycilcAllItemSizeNoEdge += s * (e._cyclicNum - 1);
}
e._lack = !e.cyclic && e._allItemSize < (e._sizeType ? e.node.height : e.node.width);
var r = e._lack && e.lackCenter || !e.lackSlide ? .1 : 0, l = e._lack ? (e._sizeType ? e.node.height : e.node.width) - r : e.cyclic ? e._cyclicAllItemSize : e._allItemSize;
l < 0 && (l = 0);
e._sizeType ? e.content.height = l : e.content.width = l;
};
e.prototype._onScrolling = function(t) {
void 0 === t && (t = null);
null == this.frameCount && (this.frameCount = this._updateRate);
if (!this._forceUpdate && t && "scroll-ended" != t.type && this.frameCount > 0) this.frameCount--; else {
this.frameCount = this._updateRate;
if (!this._aniDelRuning) {
if (this.cyclic) {
var e = this.content.getPosition();
e = this._sizeType ? e.y : e.x;
var o = this._allItemSizeNoEdge + (this._sizeType ? this._lineGap : this._columnGap), i = this._sizeType ? cc.v2(0, o) : cc.v2(o, 0);
switch (this._alignCalcType) {
case 1:
if (e > -this._cyclicPos1) {
this.content.x = -this._cyclicPos2;
this._scrollView.isAutoScrolling() && (this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.sub(i));
} else if (e < -this._cyclicPos2) {
this.content.x = -this._cyclicPos1;
this._scrollView.isAutoScrolling() && (this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.add(i));
}
break;

case 2:
if (e < this._cyclicPos1) {
this.content.x = this._cyclicPos2;
this._scrollView.isAutoScrolling() && (this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.add(i));
} else if (e > this._cyclicPos2) {
this.content.x = this._cyclicPos1;
this._scrollView.isAutoScrolling() && (this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.sub(i));
}
break;

case 3:
if (e < this._cyclicPos1) {
this.content.y = this._cyclicPos2;
this._scrollView.isAutoScrolling() && (this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.add(i));
} else if (e > this._cyclicPos2) {
this.content.y = this._cyclicPos1;
this._scrollView.isAutoScrolling() && (this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.sub(i));
}
break;

case 4:
if (e > -this._cyclicPos1) {
this.content.y = -this._cyclicPos2;
this._scrollView.isAutoScrolling() && (this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.sub(i));
} else if (e < -this._cyclicPos2) {
this.content.y = -this._cyclicPos1;
this._scrollView.isAutoScrolling() && (this._scrollView._autoScrollStartPosition = this._scrollView._autoScrollStartPosition.add(i));
}
}
}
this._calcViewPos();
var n, c, a, s;
if (this._sizeType) {
n = this.viewTop;
a = this.viewBottom;
} else {
c = this.viewRight;
s = this.viewLeft;
}
if (this._virtual) {
this.displayData = [];
var r = void 0, l = 0, u = this._numItems - 1;
if (this._customSize) for (var h = !1; l <= u && !h; l++) {
r = this._calcItemPos(l);
switch (this._align) {
case cc.Layout.Type.HORIZONTAL:
r.right >= s && r.left <= c ? this.displayData.push(r) : 0 != l && this.displayData.length > 0 && (h = !0);
break;

case cc.Layout.Type.VERTICAL:
r.bottom <= n && r.top >= a ? this.displayData.push(r) : 0 != l && this.displayData.length > 0 && (h = !0);
break;

case cc.Layout.Type.GRID:
switch (this._startAxis) {
case cc.Layout.AxisDirection.HORIZONTAL:
r.bottom <= n && r.top >= a ? this.displayData.push(r) : 0 != l && this.displayData.length > 0 && (h = !0);
break;

case cc.Layout.AxisDirection.VERTICAL:
r.right >= s && r.left <= c ? this.displayData.push(r) : 0 != l && this.displayData.length > 0 && (h = !0);
}
}
} else {
var d = this._itemSize.width + this._columnGap, p = this._itemSize.height + this._lineGap;
switch (this._alignCalcType) {
case 1:
l = (s + this._leftGap) / d;
u = (c + this._rightGap) / d;
break;

case 2:
l = (-c - this._rightGap) / d;
u = (-s - this._leftGap) / d;
break;

case 3:
l = (-n - this._topGap) / p;
u = (-a - this._bottomGap) / p;
break;

case 4:
l = (a + this._bottomGap) / p;
u = (n + this._topGap) / p;
}
l = Math.floor(l) * this._colLineNum;
u = Math.ceil(u) * this._colLineNum;
l < 0 && (l = 0);
--u >= this._numItems && (u = this._numItems - 1);
for (;l <= u; l++) this.displayData.push(this._calcItemPos(l));
}
this._delRedundantItem();
if (this.displayData.length <= 0 || !this._numItems) {
this._lastDisplayData = [];
return;
}
this.firstListId = this.displayData[0].id;
this.displayItemNum = this.displayData.length;
var f = this._lastDisplayData.length, m = this.displayItemNum != f;
if (m) {
this.frameByFrameRenderNum > 0 && this._lastDisplayData.sort(function(t, e) {
return t - e;
});
m = this.firstListId != this._lastDisplayData[0] || this.displayData[this.displayItemNum - 1].id != this._lastDisplayData[f - 1];
}
if (this._forceUpdate || m) if (this.frameByFrameRenderNum > 0) if (this._numItems > 0) {
this._updateDone ? this._updateCounter = 0 : this._doneAfterUpdate = !0;
this._updateDone = !1;
} else {
this._updateCounter = 0;
this._updateDone = !0;
} else {
this._lastDisplayData = [];
for (var _ = 0; _ < this.displayItemNum; _++) this._createOrUpdateItem(this.displayData[_]);
this._forceUpdate = !1;
}
this._calcNearestItem();
}
}
}
};
e.prototype._calcViewPos = function() {
var t = this.content.getPosition();
switch (this._alignCalcType) {
case 1:
this.elasticLeft = t.x > 0 ? t.x : 0;
this.viewLeft = (t.x < 0 ? -t.x : 0) - this.elasticLeft;
this.viewRight = this.viewLeft + this.node.width;
this.elasticRight = this.viewRight > this.content.width ? Math.abs(this.viewRight - this.content.width) : 0;
this.viewRight += this.elasticRight;
break;

case 2:
this.elasticRight = t.x < 0 ? -t.x : 0;
this.viewRight = (t.x > 0 ? -t.x : 0) + this.elasticRight;
this.viewLeft = this.viewRight - this.node.width;
this.elasticLeft = this.viewLeft < -this.content.width ? Math.abs(this.viewLeft + this.content.width) : 0;
this.viewLeft -= this.elasticLeft;
break;

case 3:
this.elasticTop = t.y < 0 ? Math.abs(t.y) : 0;
this.viewTop = (t.y > 0 ? -t.y : 0) + this.elasticTop;
this.viewBottom = this.viewTop - this.node.height;
this.elasticBottom = this.viewBottom < -this.content.height ? Math.abs(this.viewBottom + this.content.height) : 0;
this.viewBottom += this.elasticBottom;
break;

case 4:
this.elasticBottom = t.y > 0 ? Math.abs(t.y) : 0;
this.viewBottom = (t.y < 0 ? -t.y : 0) - this.elasticBottom;
this.viewTop = this.viewBottom + this.node.height;
this.elasticTop = this.viewTop > this.content.height ? Math.abs(this.viewTop - this.content.height) : 0;
this.viewTop -= this.elasticTop;
}
};
e.prototype._calcItemPos = function(t) {
var e, o, i, n, c, a, s, r;
switch (this._align) {
case cc.Layout.Type.HORIZONTAL:
switch (this._horizontalDir) {
case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
if (this._customSize) {
var l = this._getFixedSize(t);
c = this._leftGap + (this._itemSize.width + this._columnGap) * (t - l.count) + (l.val + this._columnGap * l.count);
e = (u = this._customSize[t]) > 0 ? u : this._itemSize.width;
} else {
c = this._leftGap + (this._itemSize.width + this._columnGap) * t;
e = this._itemSize.width;
}
a = c + e;
if (this.lackCenter) {
c += h = this.content.width / 2 - this._allItemSizeNoEdge / 2;
a += h;
}
return {
id: t,
left: c,
right: a,
x: c + this._itemTmp.anchorX * e,
y: this._itemTmp.y
};

case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
if (this._customSize) {
l = this._getFixedSize(t);
a = -this._rightGap - (this._itemSize.width + this._columnGap) * (t - l.count) - (l.val + this._columnGap * l.count);
e = (u = this._customSize[t]) > 0 ? u : this._itemSize.width;
} else {
a = -this._rightGap - (this._itemSize.width + this._columnGap) * t;
e = this._itemSize.width;
}
c = a - e;
if (this.lackCenter) {
c -= h = this.content.width / 2 - this._allItemSizeNoEdge / 2;
a -= h;
}
return {
id: t,
right: a,
left: c,
x: c + this._itemTmp.anchorX * e,
y: this._itemTmp.y
};
}
break;

case cc.Layout.Type.VERTICAL:
switch (this._verticalDir) {
case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
if (this._customSize) {
l = this._getFixedSize(t);
i = -this._topGap - (this._itemSize.height + this._lineGap) * (t - l.count) - (l.val + this._lineGap * l.count);
o = (u = this._customSize[t]) > 0 ? u : this._itemSize.height;
} else {
i = -this._topGap - (this._itemSize.height + this._lineGap) * t;
o = this._itemSize.height;
}
n = i - o;
if (this.lackCenter) {
i -= h = this.content.height / 2 - this._allItemSizeNoEdge / 2;
n -= h;
}
return {
id: t,
top: i,
bottom: n,
x: this._itemTmp.x,
y: n + this._itemTmp.anchorY * o
};

case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
if (this._customSize) {
var u;
l = this._getFixedSize(t);
n = this._bottomGap + (this._itemSize.height + this._lineGap) * (t - l.count) + (l.val + this._lineGap * l.count);
o = (u = this._customSize[t]) > 0 ? u : this._itemSize.height;
} else {
n = this._bottomGap + (this._itemSize.height + this._lineGap) * t;
o = this._itemSize.height;
}
i = n + o;
if (this.lackCenter) {
var h;
i += h = this.content.height / 2 - this._allItemSizeNoEdge / 2;
n += h;
}
return {
id: t,
top: i,
bottom: n,
x: this._itemTmp.x,
y: n + this._itemTmp.anchorY * o
};
}

case cc.Layout.Type.GRID:
var d = Math.floor(t / this._colLineNum);
switch (this._startAxis) {
case cc.Layout.AxisDirection.HORIZONTAL:
switch (this._verticalDir) {
case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
r = (n = (i = -this._topGap - (this._itemSize.height + this._lineGap) * d) - this._itemSize.height) + this._itemTmp.anchorY * this._itemSize.height;
break;

case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
i = (n = this._bottomGap + (this._itemSize.height + this._lineGap) * d) + this._itemSize.height;
r = n + this._itemTmp.anchorY * this._itemSize.height;
}
s = this._leftGap + t % this._colLineNum * (this._itemSize.width + this._columnGap);
switch (this._horizontalDir) {
case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
s += this._itemTmp.anchorX * this._itemSize.width;
s -= this.content.anchorX * this.content.width;
break;

case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
s += (1 - this._itemTmp.anchorX) * this._itemSize.width;
s -= (1 - this.content.anchorX) * this.content.width;
s *= -1;
}
return {
id: t,
top: i,
bottom: n,
x: s,
y: r
};

case cc.Layout.AxisDirection.VERTICAL:
switch (this._horizontalDir) {
case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
a = (c = this._leftGap + (this._itemSize.width + this._columnGap) * d) + this._itemSize.width;
s = c + this._itemTmp.anchorX * this._itemSize.width;
s -= this.content.anchorX * this.content.width;
break;

case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
s = (c = (a = -this._rightGap - (this._itemSize.width + this._columnGap) * d) - this._itemSize.width) + this._itemTmp.anchorX * this._itemSize.width;
s += (1 - this.content.anchorX) * this.content.width;
}
r = -this._topGap - t % this._colLineNum * (this._itemSize.height + this._lineGap);
switch (this._verticalDir) {
case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
r -= (1 - this._itemTmp.anchorY) * this._itemSize.height;
r += (1 - this.content.anchorY) * this.content.height;
break;

case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
r -= this._itemTmp.anchorY * this._itemSize.height;
r += this.content.anchorY * this.content.height;
r *= -1;
}
return {
id: t,
left: c,
right: a,
x: s,
y: r
};
}
}
};
e.prototype._calcExistItemPos = function(t) {
var e = this.getItemByListId(t);
if (!e) return null;
var o = {
id: t,
x: e.x,
y: e.y
};
if (this._sizeType) {
o.top = e.y + e.height * (1 - e.anchorY);
o.bottom = e.y - e.height * e.anchorY;
} else {
o.left = e.x - e.width * e.anchorX;
o.right = e.x + e.width * (1 - e.anchorX);
}
return o;
};
e.prototype.getItemPos = function(t) {
return this._virtual ? this._calcItemPos(t) : this.frameByFrameRenderNum ? this._calcItemPos(t) : this._calcExistItemPos(t);
};
e.prototype._getFixedSize = function(t) {
if (!this._customSize) return null;
null == t && (t = this._numItems);
var e = 0, o = 0;
for (var i in this._customSize) if (parseInt(i) < t) {
e += this._customSize[i];
o++;
}
return {
val: e,
count: o
};
};
e.prototype._onScrollBegan = function() {
this._beganPos = this._sizeType ? this.viewTop : this.viewLeft;
};
e.prototype._onScrollEnded = function() {
var t = this;
if (null != t.scrollToListId) {
var e = t.getItemByListId(t.scrollToListId);
t.scrollToListId = null;
e && e.runAction(cc.sequence(cc.scaleTo(.1, 1.06), cc.scaleTo(.1, 1)));
}
t._onScrolling();
t._slideMode != s.ADHERING || t.adhering ? t._slideMode == s.PAGE && (null != t._beganPos ? this._pageAdhere() : t.adhere()) : t.adhere();
};
e.prototype._onTouchStart = function(t, e) {
if (!this._scrollView._hasNestedViewGroup(t, e) && (t.eventPhase !== cc.Event.AT_TARGET || t.target !== this.node)) {
for (var o = t.target; null == o._listId && o.parent; ) o = o.parent;
this._scrollItem = null != o._listId ? o : t.target;
}
};
e.prototype._onTouchUp = function() {
var t = this;
t._scrollPos = null;
if (t._slideMode == s.ADHERING) {
this.adhering && (this._adheringBarrier = !0);
t.adhere();
} else t._slideMode == s.PAGE && (null != t._beganPos ? this._pageAdhere() : t.adhere());
this._scrollItem = null;
};
e.prototype._onTouchCancelled = function(t, e) {
var o = this;
if (!o._scrollView._hasNestedViewGroup(t, e) && !t.simulate) {
o._scrollPos = null;
if (o._slideMode == s.ADHERING) {
o.adhering && (o._adheringBarrier = !0);
o.adhere();
} else o._slideMode == s.PAGE && (null != o._beganPos ? o._pageAdhere() : o.adhere());
this._scrollItem = null;
}
};
e.prototype._onSizeChanged = function() {
this.checkInited(!1) && this._onScrolling();
};
e.prototype._onItemAdaptive = function(t) {
if (!this._sizeType && t.width != this._itemSize.width || this._sizeType && t.height != this._itemSize.height) {
this._customSize || (this._customSize = {});
var e = this._sizeType ? t.height : t.width;
if (this._customSize[t._listId] != e) {
this._customSize[t._listId] = e;
this._resizeContent();
this.updateAll();
if (null != this._scrollToListId) {
this._scrollPos = null;
this.unschedule(this._scrollToSo);
this.scrollTo(this._scrollToListId, Math.max(0, this._scrollToEndTime - new Date().getTime() / 1e3));
}
}
}
};
e.prototype._pageAdhere = function() {
var t = this;
if (t.cyclic || !(t.elasticTop > 0 || t.elasticRight > 0 || t.elasticBottom > 0 || t.elasticLeft > 0)) {
var e = t._sizeType ? t.viewTop : t.viewLeft, o = (t._sizeType ? t.node.height : t.node.width) * t.pageDistance;
if (Math.abs(t._beganPos - e) > o) switch (t._alignCalcType) {
case 1:
case 4:
t._beganPos > e ? t.prePage(.5) : t.nextPage(.5);
break;

case 2:
case 3:
t._beganPos < e ? t.prePage(.5) : t.nextPage(.5);
} else t.elasticTop <= 0 && t.elasticRight <= 0 && t.elasticBottom <= 0 && t.elasticLeft <= 0 && t.adhere();
t._beganPos = null;
}
};
e.prototype.adhere = function() {
var t = this;
if (t.checkInited() && !(t.elasticTop > 0 || t.elasticRight > 0 || t.elasticBottom > 0 || t.elasticLeft > 0)) {
t.adhering = !0;
t._calcNearestItem();
var e = (t._sizeType ? t._topGap : t._leftGap) / (t._sizeType ? t.node.height : t.node.width);
t.scrollTo(t.nearestListId, .7, e);
}
};
e.prototype.update = function() {
if (!(this.frameByFrameRenderNum <= 0 || this._updateDone)) if (this._virtual) {
for (var t = this._updateCounter + this.frameByFrameRenderNum > this.displayItemNum ? this.displayItemNum : this._updateCounter + this.frameByFrameRenderNum, e = this._updateCounter; e < t; e++) {
var o = this.displayData[e];
o && this._createOrUpdateItem(o);
}
if (this._updateCounter >= this.displayItemNum - 1) if (this._doneAfterUpdate) {
this._updateCounter = 0;
this._updateDone = !1;
this._doneAfterUpdate = !1;
} else {
this._updateDone = !0;
this._delRedundantItem();
this._forceUpdate = !1;
this._calcNearestItem();
this.slideMode == s.PAGE && (this.curPageNum = this.nearestListId);
} else this._updateCounter += this.frameByFrameRenderNum;
} else if (this._updateCounter < this._numItems) {
for (t = this._updateCounter + this.frameByFrameRenderNum > this._numItems ? this._numItems : this._updateCounter + this.frameByFrameRenderNum, 
e = this._updateCounter; e < t; e++) this._createOrUpdateItem2(e);
this._updateCounter += this.frameByFrameRenderNum;
} else {
this._updateDone = !0;
this._calcNearestItem();
this.slideMode == s.PAGE && (this.curPageNum = this.nearestListId);
}
};
e.prototype._createOrUpdateItem = function(t) {
var e = this.getItemByListId(t.id);
if (e) {
if (this._forceUpdate && this.renderEvent) {
e.setPosition(cc.v2(t.x, t.y));
this._resetItemSize(e);
this.renderEvent && cc.Component.EventHandler.emitEvents([ this.renderEvent ], e, t.id % this._actualNumItems);
}
} else {
var o = this._pool.size() > 0;
if ((e = o ? this._pool.get() : cc.instantiate(this._itemTmp))._listId != t.id) {
e._listId = t.id;
e.setContentSize(this._itemSize);
}
e.setPosition(cc.v2(t.x, t.y));
this._resetItemSize(e);
this.content.addChild(e);
if (o && this._needUpdateWidget) {
var i = e.getComponent(cc.Widget);
i && i.updateAlignment();
}
e.setSiblingIndex(this.content.childrenCount - 1);
var n = e.getComponent(_.default);
e.listItem = n;
if (n) {
n.listId = t.id;
n.list = this;
n._registerEvent();
}
this.renderEvent && cc.Component.EventHandler.emitEvents([ this.renderEvent ], e, t.id % this._actualNumItems);
}
this._resetItemSize(e);
this._updateListItem(e.listItem);
this._lastDisplayData.indexOf(t.id) < 0 && this._lastDisplayData.push(t.id);
};
e.prototype._createOrUpdateItem2 = function(t) {
var e, o = this.content.children[t];
if (o) {
if (this._forceUpdate && this.renderEvent) {
o._listId = t;
e && (e.listId = t);
this.renderEvent && cc.Component.EventHandler.emitEvents([ this.renderEvent ], o, t);
}
} else {
(o = cc.instantiate(this._itemTmp))._listId = t;
this.content.addChild(o);
e = o.getComponent(_.default);
o.listItem = e;
if (e) {
e.listId = t;
e.list = this;
e._registerEvent();
}
this.renderEvent && cc.Component.EventHandler.emitEvents([ this.renderEvent ], o, t);
}
this._updateListItem(e);
this._lastDisplayData.indexOf(t) < 0 && this._lastDisplayData.push(t);
};
e.prototype._updateListItem = function(t) {
if (t && this.selectedMode > r.NONE) {
var e = t.node;
switch (this.selectedMode) {
case r.SINGLE:
t.selected = this.selectedId == e._listId;
break;

case r.MULT:
t.selected = this.multSelected.indexOf(e._listId) >= 0;
}
}
};
e.prototype._resetItemSize = function() {};
e.prototype._updateItemPos = function(t) {
var e = isNaN(t) ? t : this.getItemByListId(t), o = this.getItemPos(e._listId);
e.setPosition(o.x, o.y);
};
e.prototype.setMultSelected = function(t, e) {
var o = this;
if (o.checkInited()) {
Array.isArray(t) || (t = [ t ]);
if (null == e) o.multSelected = t; else {
var i = void 0, n = void 0;
if (e) for (var c = t.length - 1; c >= 0; c--) {
i = t[c];
(n = o.multSelected.indexOf(i)) < 0 && o.multSelected.push(i);
} else for (c = t.length - 1; c >= 0; c--) {
i = t[c];
(n = o.multSelected.indexOf(i)) >= 0 && o.multSelected.splice(n, 1);
}
}
o._forceUpdate = !0;
o._onScrolling();
}
};
e.prototype.updateItem = function(t) {
if (this.checkInited()) {
Array.isArray(t) || (t = [ t ]);
for (var e = 0, o = t.length; e < o; e++) {
var i = t[e], n = this.getItemByListId(i);
n && cc.Component.EventHandler.emitEvents([ this.renderEvent ], n, i % this._actualNumItems);
}
}
};
e.prototype.updateAll = function() {
this.checkInited() && (this.numItems = this.numItems);
};
e.prototype.getItemByListId = function(t) {
if (this.content) for (var e = this.content.childrenCount - 1; e >= 0; e--) {
var o = this.content.children[e];
if (o._listId == t) return o;
}
};
e.prototype._getOutsideItem = function() {
for (var t, e = [], o = this.content.childrenCount - 1; o >= 0; o--) {
t = this.content.children[o];
this.displayData.find(function(e) {
return e.id == t._listId;
}) || e.push(t);
}
return e;
};
e.prototype._delRedundantItem = function() {
if (this._virtual) for (var t = this._getOutsideItem(), e = t.length - 1; e >= 0; e--) {
var o = t[e];
if (!this._scrollItem || o._listId != this._scrollItem._listId) {
this._pool.put(o);
for (var i = this._lastDisplayData.length - 1; i >= 0; i--) if (this._lastDisplayData[i] == o._listId) {
this._lastDisplayData.splice(i, 1);
break;
}
}
} else for (;this.content.childrenCount > this._numItems; ) this._delSingleItem(this.content.children[this.content.childrenCount - 1]);
};
e.prototype._delSingleItem = function(t) {
t.removeFromParent();
t.destroy && t.destroy();
t = null;
};
e.prototype.aniDelItem = function(t, e, o) {
var i = this;
if (!i.checkInited() || i.cyclic || !i._virtual) return cc.error("This function is not allowed to be called!");
if (i._aniDelRuning) return cc.warn("Please wait for the current deletion to finish!");
var n, c = i.getItemByListId(t);
if (c) {
n = c.getComponent(_.default);
i._aniDelRuning = !0;
var a = i.displayData[i.displayData.length - 1].id, s = n.selected;
n.showAni(o, function() {
var o, n, l;
a < i._numItems - 2 && (o = a + 1);
if (null != o) {
var u = i._calcItemPos(o);
i.displayData.push(u);
i._virtual ? i._createOrUpdateItem(u) : i._createOrUpdateItem2(o);
} else i._numItems--;
if (i.selectedMode == r.SINGLE) s ? i._selectedId = -1 : i._selectedId - 1 >= 0 && i._selectedId--; else if (i.selectedMode == r.MULT && i.multSelected.length) {
var h = i.multSelected.indexOf(t);
h >= 0 && i.multSelected.splice(h, 1);
for (var d = i.multSelected.length - 1; d >= 0; d--) (m = i.multSelected[d]) >= t && i.multSelected[d]--;
}
if (i._customSize) {
i._customSize[t] && delete i._customSize[t];
var p = {}, f = void 0;
for (var m in i._customSize) {
f = i._customSize[m];
var _ = parseInt(m);
p[_ - (_ >= t ? 1 : 0)] = f;
}
i._customSize = p;
}
for (d = null != o ? o : a; d >= t + 1; d--) if (c = i.getItemByListId(d)) {
var g = i._calcItemPos(d - 1);
n = [ cc.moveTo(.2333, cc.v2(g.x, g.y)) ];
if (d <= t + 1) {
l = !0;
n.push(cc.callFunc(function() {
i._aniDelRuning = !1;
e(t);
}));
}
n.length > 1 ? c.runAction(cc.sequence(n)) : c.runAction(n[0]);
}
if (!l) {
i._aniDelRuning = !1;
e(t);
}
}, !0);
} else e(t);
};
e.prototype.scrollTo = function(t, e, o, i) {
void 0 === e && (e = .5);
void 0 === o && (o = null);
void 0 === i && (i = !1);
var n = this;
if (n.checkInited(!1)) {
null == e ? e = .5 : e < 0 && (e = 0);
t < 0 ? t = 0 : t >= n._numItems && (t = n._numItems - 1);
!n._virtual && n._layout && n._layout.enabled && n._layout.updateLayout();
var c, a, s = n.getItemPos(t);
switch (n._alignCalcType) {
case 1:
c = s.left;
c -= null != o ? n.node.width * o : n._leftGap;
s = cc.v2(c, 0);
break;

case 2:
c = s.right - n.node.width;
c += null != o ? n.node.width * o : n._rightGap;
s = cc.v2(c + n.content.width, 0);
break;

case 3:
a = s.top;
a += null != o ? n.node.height * o : n._topGap;
s = cc.v2(0, -a);
break;

case 4:
a = s.bottom + n.node.height;
a -= null != o ? n.node.height * o : n._bottomGap;
s = cc.v2(0, -a + n.content.height);
}
var r = n.content.getPosition();
r = Math.abs(n._sizeType ? r.y : r.x);
var l = n._sizeType ? s.y : s.x;
if (Math.abs((null != n._scrollPos ? n._scrollPos : r) - l) > .5) {
n._scrollView.scrollToOffset(s, e);
n._scrollToListId = t;
n._scrollToEndTime = new Date().getTime() / 1e3 + e;
n._scrollToSo = n.scheduleOnce(function() {
n._adheringBarrier || (n.adhering = n._adheringBarrier = !1);
n._scrollPos = n._scrollToListId = n._scrollToEndTime = n._scrollToSo = null;
if (i) {
var e = n.getItemByListId(t);
e && e.runAction(cc.sequence(cc.scaleTo(.1, 1.05), cc.scaleTo(.1, 1)));
}
}, e + .1);
e <= 0 && n._onScrolling();
}
}
};
e.prototype._calcNearestItem = function() {
var t, e, o, i, n, c, a = this;
a.nearestListId = null;
a._virtual && a._calcViewPos();
o = a.viewTop;
i = a.viewRight;
n = a.viewBottom;
c = a.viewLeft;
for (var s = !1, r = 0; r < a.content.childrenCount && !s; r += a._colLineNum) if (t = a._virtual ? a.displayData[r] : a._calcExistItemPos(r)) {
e = a._sizeType ? (t.top + t.bottom) / 2 : e = (t.left + t.right) / 2;
switch (a._alignCalcType) {
case 1:
if (t.right >= c) {
a.nearestListId = t.id;
c > e && (a.nearestListId += a._colLineNum);
s = !0;
}
break;

case 2:
if (t.left <= i) {
a.nearestListId = t.id;
i < e && (a.nearestListId += a._colLineNum);
s = !0;
}
break;

case 3:
if (t.bottom <= o) {
a.nearestListId = t.id;
o < e && (a.nearestListId += a._colLineNum);
s = !0;
}
break;

case 4:
if (t.top >= n) {
a.nearestListId = t.id;
n > e && (a.nearestListId += a._colLineNum);
s = !0;
}
}
}
if ((t = a._virtual ? a.displayData[a.displayItemNum - 1] : a._calcExistItemPos(a._numItems - 1)) && t.id == a._numItems - 1) {
e = a._sizeType ? (t.top + t.bottom) / 2 : e = (t.left + t.right) / 2;
switch (a._alignCalcType) {
case 1:
i > e && (a.nearestListId = t.id);
break;

case 2:
c < e && (a.nearestListId = t.id);
break;

case 3:
n < e && (a.nearestListId = t.id);
break;

case 4:
o > e && (a.nearestListId = t.id);
}
}
};
e.prototype.prePage = function(t) {
void 0 === t && (t = .5);
this.checkInited() && this.skipPage(this.curPageNum - 1, t);
};
e.prototype.nextPage = function(t) {
void 0 === t && (t = .5);
this.checkInited() && this.skipPage(this.curPageNum + 1, t);
};
e.prototype.skipPage = function(t, e) {
var o = this;
if (o.checkInited()) {
if (o._slideMode != s.PAGE) return cc.error("This function is not allowed to be called, Must SlideMode = PAGE!");
if (!(t < 0 || t >= o._numItems) && o.curPageNum != t) {
o.curPageNum = t;
o.pageChangeEvent && cc.Component.EventHandler.emitEvents([ o.pageChangeEvent ], t);
o.scrollTo(t, e);
}
}
};
e.prototype.calcCustomSize = function(t) {
var e = this;
if (e.checkInited()) {
if (!e._itemTmp) return cc.error("Unset template item!");
if (!e.renderEvent) return cc.error("Unset Render-Event!");
e._customSize = {};
var o = cc.instantiate(e._itemTmp);
e.content.addChild(o);
for (var i = 0; i < t; i++) {
cc.Component.EventHandler.emitEvents([ e.renderEvent ], o, i);
o.height == e._itemSize.height && o.width == e._itemSize.width || (e._customSize[i] = e._sizeType ? o.height : o.width);
}
Object.keys(e._customSize).length || (e._customSize = null);
o.removeFromParent();
o.destroy && o.destroy();
return e._customSize;
}
};
c([ h({
type: cc.Enum(a),
tooltip: !1
}) ], e.prototype, "templateType", void 0);
c([ h({
type: cc.Node,
tooltip: !1,
visible: function() {
return this.templateType == a.NODE;
}
}) ], e.prototype, "tmpNode", void 0);
c([ h({
type: [ cc.Prefab ],
tooltip: !1,
visible: function() {
return this.templateType == a.PREFAB;
}
}) ], e.prototype, "tmpPrefab", void 0);
c([ h() ], e.prototype, "_slideMode", void 0);
c([ h({
type: cc.Enum(s),
tooltip: !1
}) ], e.prototype, "slideMode", null);
c([ h({
type: cc.Float,
range: [ 0, 1, .1 ],
tooltip: !1,
slide: !0,
visible: function() {
return this._slideMode == s.PAGE;
}
}) ], e.prototype, "pageDistance", void 0);
c([ h({
type: cc.Component.EventHandler,
tooltip: !1,
visible: function() {
return this._slideMode == s.PAGE;
}
}) ], e.prototype, "pageChangeEvent", void 0);
c([ h() ], e.prototype, "_virtual", void 0);
c([ h({
type: cc.Boolean,
tooltip: !1
}) ], e.prototype, "virtual", null);
c([ h({
tooltip: !1,
visible: function() {
var t = this.virtual && this.slideMode == s.NORMAL;
t || (this.cyclic = !1);
return t;
}
}) ], e.prototype, "cyclic", void 0);
c([ h({
tooltip: !1,
visible: function() {
return this.virtual;
}
}) ], e.prototype, "lackCenter", void 0);
c([ h({
tooltip: !1,
visible: function() {
var t = this.virtual && !this.lackCenter;
t || (this.lackSlide = !1);
return t;
}
}) ], e.prototype, "lackSlide", void 0);
c([ h({
type: cc.Integer
}) ], e.prototype, "_updateRate", void 0);
c([ h({
type: cc.Integer,
range: [ 0, 6, 1 ],
tooltip: !1,
slide: !0
}) ], e.prototype, "updateRate", null);
c([ h({
type: cc.Integer,
range: [ 0, 12, 1 ],
tooltip: !1,
slide: !0
}) ], e.prototype, "frameByFrameRenderNum", void 0);
c([ h({
type: cc.Component.EventHandler,
tooltip: !1
}) ], e.prototype, "renderEvent", void 0);
c([ h({
type: cc.Enum(r),
tooltip: !1
}) ], e.prototype, "selectedMode", void 0);
c([ h({
tooltip: !1,
visible: function() {
return this.selectedMode == r.SINGLE;
}
}) ], e.prototype, "repeatEventSingle", void 0);
c([ h({
type: cc.Component.EventHandler,
tooltip: !1,
visible: function() {
return this.selectedMode > r.NONE;
}
}) ], e.prototype, "selectedEvent", void 0);
c([ h({
serializable: !1
}) ], e.prototype, "_numItems", void 0);
return c([ u, d(), p("自定义组件/List"), m(cc.ScrollView), f(-5e3) ], e);
}(cc.Component);
o.default = g;
cc._RF.pop();
}, {
"./ListItem": "ListItem"
} ],
Loading: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "f1ef6tMv9lCwp/Au2+U1a1p", "Loading");
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = t("../common/SceneManager"), n = t("../common/FlashLightUBO"), c = function() {
function t(t, e) {
this.shader_flashLightUBO = new n.default();
this.node = t;
this.m_flashLightAppName = cc.find("logo/appname", this.node);
this.m_loadingBar = cc.find("loading/progress", this.node).getComponent(cc.ProgressBar);
this.m_loadingDetail = cc.find("loading/progress/state/detail", this.node).getComponent(cc.Label);
this.m_loadingContent = cc.find("loading/progress/state/content", this.node).getComponent(cc.Label);
this.m_star = cc.find("logo/star", this.node);
this.m_rootNode = cc.find("loading", this.node);
this.f_lauchingFinishCallBack = e;
this.m_rootNode.active = !0;
}
t.prototype.hide = function() {
this.m_rootNode.active = !1;
};
t.prototype.Startlauching = function() {
var t = this;
cc.find("loading", this.node).active = !0;
this.m_loadingContent.string = "加载中...";
i.default.getInstance().preloadScene(function(e) {
var o;
o = 100 !== e ? Math.ceil(e) + "%" : "100%";
t.m_loadingBar.progress = e / 100;
t.m_loadingDetail.string = o;
if (100 === e) {
t.m_loadingContent.string = "加载完成";
t.t_timerLoading = setTimeout(function() {
cc.tween(t.m_rootNode).to(.2, {
scaleY: 0
}, {
easing: "quadOut"
}).call(function() {
t.m_rootNode.active = !1;
t.f_lauchingFinishCallBack && t.f_lauchingFinishCallBack();
}).start();
t.t_timerLoading = null;
}, 1e3);
}
});
};
t.prototype.runShader = function() {
var t = this;
this.shader_flashLightUBO.lightAngle = 75;
this.shader_flashLightUBO.lightColor = cc.color(130, 99, 68);
this.shader_flashLightUBO.lightWidth = .05;
this.shader_flashLightUBO.enableGradient = !0;
this.shader_flashLightUBO.cropAlpha = !0;
this.shader_flashLightUBO.enableFog = !1;
var e = 0;
this.t_timerMovex = setInterval(function() {
t.shader_flashLightUBO.lightCenterPoint = cc.v2(e += .02, .5);
var o = t.m_flashLightAppName.getComponent(cc.Sprite).getMaterial(0);
o.setProperty("lightColor", t.shader_flashLightUBO.lightColor);
o.setProperty("lightCenterPoint", t.shader_flashLightUBO.lightCenterPoint);
o.setProperty("lightAngle", t.shader_flashLightUBO.lightAngle);
o.setProperty("lightWidth", t.shader_flashLightUBO.lightWidth);
o.setProperty("enableGradient", t.shader_flashLightUBO.enableGradient);
o.setProperty("cropAlpha", t.shader_flashLightUBO.cropAlpha);
o.setProperty("enableFog", t.shader_flashLightUBO.enableFog);
t.m_flashLightAppName.getComponent(cc.Sprite).setMaterial(0, o);
e > 1 && (e = 0);
}, 33);
};
t.prototype.onDestory = function() {
if (this.t_timerMovex) {
clearInterval(this.t_timerMovex);
this.t_timerMovex = null;
}
if (this.t_timerLoading) {
clearTimeout(this.t_timerLoading);
this.t_timerLoading = null;
}
};
return t;
}();
o.default = c;
cc._RF.pop();
}, {
"../common/FlashLightUBO": "FlashLightUBO",
"../common/SceneManager": "SceneManager"
} ],
Login: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "18066XdGzxPRJF1CeNnLC3T", "Login");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("../common/SceneManager"), a = t("../common/MyAnimation"), s = t("../common/Toast"), r = t("./ForgetPd"), l = t("../common/TimerStruct"), u = t("../units/Tool"), h = t("./Regist"), d = t("../units/UserConfig"), p = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_loginMethod = 0;
o.m_pdView = cc.find("login/view/password", o.node);
o.m_verifyView = cc.find("login/view/verify", o.node);
o.m_chooseList = cc.find("login/choose", o.node).children;
o.m_root = cc.find("login", o.node);
o.m_popup = cc.find("popup", o.node);
o.m_popupMask = cc.find("popup/mask", o.node);
o.m_popupUserAgreeview = cc.find("popup/useragree", o.node);
o.m_toastParent = cc.find("common", o.node);
o.m_toast = cc.find("common/toast", o.node);
o.m_toastMask = cc.find("common/mask", o.node);
o.i_quit = cc.find("login/button_quit", o.node), o.i_choosePd = cc.find("login/choose/pdlogin", o.node);
o.i_chooseVerify = cc.find("login/choose/velogin", o.node);
o.i_chooseUserAgree = cc.find("login/useragree/base", o.node);
o.i_confirm = cc.find("login/button_confirm", o.node);
o.i_remember = cc.find("login/view/password/remeberpd/base", o.node);
o.i_getVerify = cc.find("login/view/verify/getverify", o.node);
o.i_forgetPd = cc.find("login/view/password/forgetpd", o.node);
o.i_regist = cc.find("login/button_regist", o.node);
o.i_remember.parent.getChildByName("isagree").active = !1;
o.i_chooseUserAgree.parent.getChildByName("isagree").active = !1;
o.c_verifyViewPhoneInput = cc.find("login/view/verify/input_phone/input", o.node).getComponent(cc.EditBox);
o.c_verifyViewVerfyInput = cc.find("login/view/verify/input_verify/input", o.node).getComponent(cc.EditBox);
o.c_pdViewPhoneInput = cc.find("login/view/password/input_phone/input", o.node).getComponent(cc.EditBox);
o.c_pdViewPdInput = cc.find("login/view/password/input_pd/input", o.node).getComponent(cc.EditBox);
o.cl_forgetPd = new r.default(o.node);
o.cl_regist = new h.default(o.node);
o.reset();
o.hide();
return o;
}
Object.defineProperty(e.prototype, "pdLoginParam", {
get: function() {
return {
phone: this.c_pdViewPhoneInput.string,
password: this.c_pdViewPdInput.string
};
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "verifyLoginParam", {
get: function() {
return {
phone: this.c_verifyViewPhoneInput.string,
verify: this.c_verifyViewVerfyInput.string
};
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "verifyPhoneParam", {
get: function() {
return {
phone: this.c_verifyViewPhoneInput.string
};
},
enumerable: !1,
configurable: !0
});
e.prototype.requestPdLogin = function() {
if (0 != this.pdLoginParam.phone.length) if (u.default.getInstance().isPhoneNumber(this.pdLoginParam.phone)) if (this.pdLoginParam.password.length < 6) s.default.getInstance().show("密码长度限制6--16位", this.m_toast); else if (this.i_chooseUserAgree.parent.getChildByName("isagree").active) {
cc.sys.localStorage.setItem("remberpd", JSON.stringify(this.pdLoginParam));
d.default.getInstance().setUserInfo({
phone: this.pdLoginParam.phone
});
c.default.getInstance().loadScene("hall");
} else s.default.getInstance().show("请先同意勾选用户协议", this.m_toast); else s.default.getInstance().show("请输入正确的手机号", this.m_toast); else s.default.getInstance().show("手机号不能为空", this.m_toast);
};
e.prototype.requestVerifyLogin = function() {
0 != this.verifyLoginParam.phone.length ? u.default.getInstance().isPhoneNumber(this.verifyLoginParam.phone) ? 6 === this.verifyLoginParam.verify.length ? this.i_chooseUserAgree.parent.getChildByName("isagree").active ? c.default.getInstance().loadScene("hall") : s.default.getInstance().show("请先勾选同意用户协议", this.m_toast) : s.default.getInstance().show("验证码长度应为6位", this.m_toast) : s.default.getInstance().show("请输入正确的手机号", this.m_toast) : s.default.getInstance().show("手机号不能为空", this.m_toast);
};
e.prototype.requestVerify = function() {
var t = this;
if ("获取验证码" !== this.i_getVerify.getComponent(cc.Label).string) return !1;
this.m_verifyCoutDown = new l.default(60);
var e = this.m_verifyCoutDown.coutDown;
this.i_getVerify.getComponent(cc.Label).string = e + "s";
this.t_timerVerfyCountDown = setInterval(function() {
if (0 == --e) {
t.i_getVerify.getComponent(cc.Label).string = "获取验证码";
t.m_verifyCoutDown = null;
clearInterval(t.t_timerVerfyCountDown);
t.t_timerVerfyCountDown = null;
} else t.i_getVerify.getComponent(cc.Label).string = e + "s";
}, 1e3);
return !0;
};
e.prototype.setVerifyCountDown = function(t) {
var e = this, o = t;
this.i_getVerify.getComponent(cc.Label).string = o + "s";
if (this.t_timerVerfyCountDown) {
clearInterval(this.t_timerVerfyCountDown);
this.t_timerVerfyCountDown = null;
}
this.t_timerVerfyCountDown = setInterval(function() {
if (0 == --o) {
e.i_getVerify.getComponent(cc.Label).string = "获取验证码";
e.m_verifyCoutDown = null;
clearInterval(e.t_timerVerfyCountDown);
e.t_timerVerfyCountDown = null;
} else e.i_getVerify.getComponent(cc.Label).string = o + "s";
}, 1e3);
return !0;
};
e.prototype.reset = function() {
var t = JSON.parse(cc.sys.localStorage.getItem("remberpd")), e = JSON.parse(cc.sys.localStorage.getItem("userAgree"));
this.i_chooseUserAgree.parent.getChildByName("isagree").active = e;
if (t) {
this.c_pdViewPhoneInput.string = t.phone;
this.c_pdViewPdInput.string = t.password;
this.i_remember.parent.getChildByName("isagree").active = !0;
} else {
this.c_pdViewPhoneInput.string = "";
this.c_pdViewPdInput.string = "";
this.i_remember.parent.getChildByName("isagree").active = !1;
}
this.c_verifyViewPhoneInput.string = "";
this.c_verifyViewVerfyInput.string = "";
};
e.prototype.switchLoginMethod = function(t) {
this.m_verifyCoutDown && this.m_verifyCoutDown.getSurPlus() > 0 && this.setVerifyCountDown(this.m_verifyCoutDown.getSurPlus());
this.m_loginMethod = t;
this.i_choosePd.parent.sortAllChildren();
if (0 == t) {
this.i_choosePd.getChildByName("value").getComponent("switchsp").setSpriteFrame(1);
this.i_chooseVerify.getChildByName("value").getComponent("switchsp").setSpriteFrame(0);
this.m_pdView.active = !0;
this.m_verifyView.active = !1;
} else if (1 == t) {
this.i_choosePd.getChildByName("value").getComponent("switchsp").setSpriteFrame(0);
this.i_chooseVerify.getChildByName("value").getComponent("switchsp").setSpriteFrame(1);
this.m_pdView.active = !1;
this.m_verifyView.active = !0;
}
this.reset();
};
e.prototype.show = function() {
var t = this;
this.popupOpenScaleXY(this.m_root);
this.m_chooseList.forEach(function(e) {
e.on("touchend", function() {
if ("velogin" == e.name) {
t.i_chooseVerify.zIndex = 1;
t.i_choosePd.zIndex = 0;
t.switchLoginMethod(LOGIN_METHOD.PHONE_VERIFY);
} else {
t.i_chooseVerify.zIndex = 0;
t.i_choosePd.zIndex = 1;
t.switchLoginMethod(LOGIN_METHOD.PASSWORD);
}
});
}, this);
this.addEvent();
};
e.prototype.hide = function() {
this.m_chooseList.forEach(function(t) {
t.off("touchend");
}, this);
this.m_root.active = !1;
};
e.prototype.showUserAgree = function() {
var t = this;
this.i_chooseUserAgree.parent.getChildByName("label").off("touchend");
this.popupOpenScaleY(this.m_popupUserAgreeview, this.m_popupMask, function() {
t.m_popupUserAgreeview.getChildByName("button_confirm").on("touchend", function() {
t.hideUserAgree();
}, t);
});
};
e.prototype.hideUserAgree = function() {
var t = this;
this.i_chooseUserAgree.parent.getChildByName("label").on("touchend", function() {
t.showUserAgree();
}, this);
this.popupCloseScaleY(this.m_popupUserAgreeview, this.m_popupMask, function() {
t.m_popupUserAgreeview.getChildByName("button_confirm").off("touchend");
});
};
e.prototype.addEvent = function() {
var t = this;
this.i_chooseUserAgree.on("touchend", function() {
t.i_chooseUserAgree.parent.getChildByName("isagree").active = !t.i_chooseUserAgree.parent.getChildByName("isagree").active;
t.i_chooseUserAgree.parent.getChildByName("isagree").active ? cc.sys.localStorage.setItem("userAgree", JSON.stringify(!0)) : cc.sys.localStorage.removeItem("userAgree");
}, this);
this.i_chooseUserAgree.parent.getChildByName("label").on("touchend", function() {
t.showUserAgree();
}, this);
this.i_remember.on("touchend", function() {
t.i_remember.parent.getChildByName("isagree").active = !t.i_remember.parent.getChildByName("isagree").active;
t.i_remember.parent.getChildByName("isagree").active ? cc.sys.localStorage.setItem("remberpd", JSON.stringify(t.pdLoginParam)) : cc.sys.localStorage.removeItem("remberpd");
}, this);
this.i_quit.on("touchend", function() {
c.default.getInstance().endgame();
}, this);
this.i_forgetPd.on("touchend", function() {
t.cl_forgetPd.show();
}, this);
this.i_regist.on("touchend", function() {
t.cl_regist.show();
}, this);
this.i_confirm.on("touchend", function() {
switch (t.m_loginMethod) {
case LOGIN_METHOD.PASSWORD:
t.requestPdLogin();
break;

case LOGIN_METHOD.PHONE_VERIFY:
t.requestVerifyLogin();
}
}, this);
this.i_getVerify.on("touchend", function() {
if (!u.default.getInstance().isPhoneNumber(t.verifyPhoneParam.phone)) {
s.default.getInstance().show("请输入正确的手机号", t.m_toast);
return !1;
}
t.requestVerify() || s.default.getInstance().show("请在倒计时结束后获取验证码", t.m_toast);
}, this);
};
e.prototype.onDestroy = function() {
if (this.t_timerVerfyCountDown) {
clearInterval(this.t_timerVerfyCountDown);
this.t_timerVerfyCountDown = null;
}
this.m_verifyCoutDown = null;
};
return e;
}(a.default);
o.default = p;
cc._RF.pop();
}, {
"../common/MyAnimation": "MyAnimation",
"../common/SceneManager": "SceneManager",
"../common/TimerStruct": "TimerStruct",
"../common/Toast": "Toast",
"../units/Tool": "Tool",
"../units/UserConfig": "UserConfig",
"./ForgetPd": "ForgetPd",
"./Regist": "Regist"
} ],
MainSg: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "a878eQghqFHPqLzCy76SeLi", "MainSg");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), c = this && this.__decorate || function(t, e, o, i) {
var n, c = arguments.length, a = c < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (c < 3 ? n(a) : c > 3 ? n(e, o, a) : n(e, o)) || a);
return c > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = t("../common/NodePool"), s = t("../common/SceneManager"), r = t("../common/Toast"), l = t("../units/AudioManager"), u = t("./Player"), h = t("./SGView"), d = cc._decorator, p = d.ccclass, f = d.menu, m = d.property, _ = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.tomato = null;
e.flower = null;
e.boom = null;
e.water = null;
e.hand = null;
e.goldPrefab = null;
return e;
}
e.prototype.onLoad = function() {
this.initAudio();
a.default.getInstance().createrNodePool("SgGold", this.goldPrefab, 100);
s.default.getInstance().setScene(cc.director.getScene());
r.default.getInstance().setRootNode(cc.find("common/toast", this.node));
this.AnimPrefab = {
tomato: this.tomato,
flower: this.flower,
boom: this.boom,
water: this.water,
hand: this.hand
};
this.cl_SGView = new h.default(this.node);
this.cl_Player = new u.default(this.node, this.AnimPrefab);
};
e.prototype.initAudio = function() {
if (l.default.getInstance().getBgmCode() !== BGM_CODE.BGM_GAME_SG) {
l.default.getInstance().playBgmFromLocal(BGM_CODE.BGM_GAME_SG, !0);
l.default.getInstance().setBgmVol();
l.default.getInstance().setEffVol();
}
};
e.prototype.start = function() {
this.cl_SGView.start();
this.cl_Player.start();
};
e.prototype.onDestroy = function() {
this.cl_Player.onDestroy();
this.cl_SGView.onDestroy();
this.cl_SGView = null;
a.default.getInstance().cleanPool("SGgold");
};
c([ m(cc.Prefab) ], e.prototype, "tomato", void 0);
c([ m(cc.Prefab) ], e.prototype, "flower", void 0);
c([ m(cc.Prefab) ], e.prototype, "boom", void 0);
c([ m(cc.Prefab) ], e.prototype, "water", void 0);
c([ m(cc.Prefab) ], e.prototype, "hand", void 0);
c([ m(cc.Prefab) ], e.prototype, "goldPrefab", void 0);
return c([ p, f("场景主脚本/MainSg") ], e);
}(cc.Component);
o.default = _;
cc._RF.pop();
}, {
"../common/NodePool": "NodePool",
"../common/SceneManager": "SceneManager",
"../common/Toast": "Toast",
"../units/AudioManager": "AudioManager",
"./Player": "Player",
"./SGView": "SGView"
} ],
MoneyFlowView: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "eb69fdP1+RCyKA0bBr2qWm9", "MoneyFlowView");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MMoneyFlow = void 0;
var c = t("../../common/MyAnimation"), a = t("../../units/Tool"), s = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.m_pageShowNum = 20;
e.payTypeArr = [ "充值", "提现", "转账", "游戏下注", "游戏输赢", "系统加钱", "系统扣钱", "退还下注" ];
e.init();
return e;
}
Object.defineProperty(e.prototype, "curentPage", {
get: function() {
return this._curentPage;
},
set: function(t) {
t > this.totalCount ? cc.error("设置的当前页数超过总页数,该设置无法生效") : this._curentPage = t;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "totalCount", {
get: function() {
return this._totalCount;
},
set: function(t) {
this._totalCount = t;
},
enumerable: !1,
configurable: !0
});
e.prototype.getMoneyFlowInfoFromIndex = function(t) {
return t > this.m_cache.length - 1 ? null : this.m_cache[t];
};
e.prototype.init = function() {
this.curentPage = 0;
this.totalCount = 0;
this.m_cache = [];
};
e.prototype.addData = function(t) {
var e = this;
t && t.forEach(function(t) {
e.m_cache.push(t);
});
};
e.prototype.RequestMoneyFlowData = function(t) {
var e = this.curentPage + 1, o = this.m_pageShowNum;
this.totalCount = 73;
for (var i = e * o > this.totalCount ? this.totalCount % this.m_pageShowNum : this.m_pageShowNum, n = 0; n < i; n++) {
var c = Math.ceil(1e5 * Math.random()), s = 10 * Math.random() > 5 ? Math.ceil(Math.random() * (c / .4)) : -Math.ceil(Math.random() * (c / .4)), r = c + s, l = {
orderid: (Date.now() + 8e3 * (this.curentPage * this.m_pageShowNum + n)).toString(16) + (Date.now() + 8e3 * (this.curentPage * this.m_pageShowNum + n)).toString(16),
before: c,
amount: s,
after: r,
type: Math.ceil(7 * Math.random()),
date: a.default.getInstance().getCurentTime(Date.now() + 8e3 * (this.curentPage * this.m_pageShowNum + n))
};
this.m_cache.push(l);
}
this.curentPage += 1;
t(this.m_cache.length);
};
return e;
}(c.default);
o.MMoneyFlow = s;
var r = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_toast = cc.find("common/toast", o.node);
o.m_mask = cc.find("popup/moneyflow/mask", o.node);
o.m_root = cc.find("popup/moneyflow/root", o.node);
o.m_mainRoot = cc.find("popup/moneyflow", o.node);
o.m_itemLayout = cc.find("popup/moneyflow/root/scrollview/view/content", o.node);
o.m_noneData = cc.find("popup/moneyflow/root/none", o.node);
o.m_scrollview = cc.find("popup/moneyflow/root/scrollview", o.node);
o.i_back = cc.find("popup/moneyflow/root/button_back", o.node);
o.c_list = cc.find("popup/moneyflow/root/scrollview", o.node).getComponent("List");
o.removeAllChild();
o.m_mainRoot.active = !0;
return o;
}
e.prototype.removeAllChild = function() {
var t = this;
this.m_itemLayout.children.forEach(function(e) {
t.c_list._delSingleItem(e);
});
this.c_list.numItems = 0;
};
e.prototype.show = function() {
this.removeAllChild();
this.c_list.scrollTo(0);
this.RequestMoneyFlowData(this.addItemNumber.bind(this));
this.popupOpenScaleY(this.m_root, this.m_mask, this.addEvent.bind(this));
};
e.prototype.addItemNumber = function(t) {
this.c_list.numItems = t;
this.m_noneData.active = 0 === t;
};
e.prototype.scrollToButtom = function() {
Math.ceil(this.totalCount / this.m_pageShowNum) !== this.curentPage && 0 !== this.totalCount && this.RequestMoneyFlowData(this.addItemNumber.bind(this));
};
e.prototype.hide = function() {
this.init();
this.popupCloseScaleY(this.m_root, this.m_mask, this.hideEvent.bind(this));
};
e.prototype.hideEvent = function() {
this.i_back.off("touchend");
this.m_scrollview.off("scroll-to-bottom");
};
e.prototype.addEvent = function() {
this.i_back.on("touchend", this.hide.bind(this));
this.m_scrollview.on("scroll-to-bottom", this.scrollToButtom.bind(this));
};
e.prototype.renderMoneyFlowFunction = function(t, e) {
var o = this.getMoneyFlowInfoFromIndex(e);
if (o) {
t.getChildByName("orderid").getComponent(cc.Label).string = o.orderid;
t.getChildByName("before").getComponent(cc.Label).string = String(o.before);
t.getChildByName("amount").getComponent(cc.Label).string = String(o.amount);
o.amount > 0 ? t.getChildByName("amount").color = new cc.Color(255, 0, 0) : o.amount < 0 ? t.getChildByName("amount").color = new cc.Color(0, 255, 0) : t.getChildByName("amount").color = new cc.Color(255, 255, 255);
t.getChildByName("after").getComponent(cc.Label).string = String(o.after);
t.getChildByName("type").getComponent(cc.Label).string = this.payTypeArr[o.type];
t.getChildByName("date").getComponent(cc.Label).string = o.date;
}
};
e.prototype.start = function() {
this.m_mainRoot.active = !1;
};
e.prototype.onDestory = function() {};
return e;
}(s);
o.default = r;
cc._RF.pop();
}, {
"../../common/MyAnimation": "MyAnimation",
"../../units/Tool": "Tool"
} ],
MsgView: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "00303fLPd5DYLAUQOv9VhM5", "MsgView");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MMsg = void 0;
var c = t("../../common/MyAnimation"), a = t("../../units/Tool"), s = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.m_cache = [];
return e;
}
e.prototype.getMsgNum = function() {
return this.m_cache.length;
};
e.prototype.getMsgInfoFromIndex = function(t) {
return t > this.m_cache.length - 1 ? null : this.m_cache[t];
};
e.prototype.getForeach = function(t) {
this.m_cache.forEach(function(e, o) {
t(e.tittle, e.content, o);
});
};
e.prototype.requestMessageData = function(t) {
void 0 === t && (t = null);
this.m_cache.push({
tittle: "版本信息",
content: "appName:港澳联盟\n版本Ver:1.0.0.0\nDESIGNED BY COCOS COREATOR 2.4.3-RC7 ©2020 XIAMEN YAJI \nPROGECTNAME:APP0910 PACKAGENAME:COM.MEIJI.GALM"
});
this.m_cache.push({
tittle: "当前时间",
content: "本次请求时间: " + a.default.getInstance().getCurentTime()
});
t();
};
return e;
}(c.default);
o.MMsg = s;
var r = function(t) {
n(e, t);
function e(e, o) {
var i = t.call(this) || this;
i.node = e;
i.m_toast = cc.find("common/toast", i.node);
i.m_curentKey = -1;
i.m_root = cc.find("popup/message", i.node);
i.m_mask = cc.find("popup/mask", i.node);
i.m_noneData = cc.find("popup/message/layout/nonedata", i.node);
i.m_chooseLayout = cc.find("popup/message/layout/choose/layout", i.node).children;
i.m_chooseRoot = cc.find("popup/message/layout/choose", i.node);
i.m_scrollviewRoot = cc.find("popup/message/layout/scrollview", i.node);
i.m_viewLabel = cc.find("popup/message/layout/scrollview/view/content/item", i.node).getComponent(cc.Label);
i.i_close = cc.find("popup/message/button_close", i.node);
i.m_chooseRoot.getChildByName("layout").removeAllChildren();
i.p_buttonPrefab = o;
i.m_viewLabel.string = null;
i.m_root.active = !1;
return i;
}
e.prototype.setLeftButtonInfo = function(t, e) {
t.getChildByName("value").getComponent(cc.Label).string = e;
t.getChildByName("bg").getChildByName("value").getComponent(cc.Label).string = e;
};
e.prototype.setView = function() {
var t = this;
this.getForeach(function(e) {
var o = cc.instantiate(t.p_buttonPrefab);
t.setLeftButtonInfo(o, e);
t.m_chooseRoot.getChildByName("layout").addChild(o);
});
};
e.prototype.show = function() {
this.m_chooseRoot.active = this.m_scrollviewRoot.active = !(this.m_noneData.active = 0 === this.getMsgNum());
this.popupOpenScaleXY(this.m_root, this.m_mask);
this.UpdateView(0 == this.getMsgNum() ? -1 : 0);
this.addEvent();
};
e.prototype.hide = function() {
var t = this;
this.popupCloseScaleXY(this.m_root, this.m_mask, function() {
t.hideEvent();
t.m_curentKey = -1;
t.m_viewLabel.getComponent(cc.Label).string = "";
});
};
e.prototype.UpdateView = function(t) {
var e = this;
if (-1 !== t && t !== this.m_curentKey) {
this.m_curentKey = t;
this.m_chooseLayout.forEach(function(o, i) {
o.getChildByName("value").active = !(i === t);
o.getChildByName("bg").active = i === t;
t === i && (e.m_viewLabel.string = e.getMsgInfoFromIndex(i).content);
}, this);
}
};
e.prototype.addEvent = function() {
var t = this;
this.i_close.on("touchend", function() {
t.hide();
}, this);
this.m_chooseLayout.forEach(function(e, o) {
e.on("touchend", function() {
t.UpdateView(o);
}, t);
});
};
e.prototype.hideEvent = function() {
this.i_close.off("touchend");
this.m_chooseLayout.forEach(function(t) {
t.off("touchend");
});
};
e.prototype.start = function() {
this.requestMessageData(this.setView.bind(this));
};
e.prototype.onDestory = function() {};
return e;
}(s);
o.default = r;
cc._RF.pop();
}, {
"../../common/MyAnimation": "MyAnimation",
"../../units/Tool": "Tool"
} ],
MyAnimation: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "035acCR2uhGM5XkRFSaMM0U", "MyAnimation");
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = t("../units/AudioManager"), n = t("./SceneManager"), c = function() {
function t() {}
t.prototype.popupOpenScaleXY = function(t, e, o) {
void 0 === e && (e = null);
void 0 === o && (o = null);
t.scaleY = t.scaleX = 0;
t.active = !0;
e && (e.active = !0);
cc.tween(t).to(.15, {
scaleY: 1.2,
scaleX: 1.2
}, {
easing: "quadIn"
}).to(.1, {
scaleY: 1,
scaleX: 1
}, {
easing: "quadIn"
}).call(o).start();
};
t.prototype.popupCloseScaleXY = function(t, e, o) {
void 0 === e && (e = null);
void 0 === o && (o = null);
t.scaleY = t.scaleX = 1;
t.active = !0;
cc.tween(t).to(.1, {
scaleY: 1.2,
scaleX: 1.2
}, {
easing: "quadOut"
}).to(.15, {
scaleY: 0,
scaleX: 0
}, {
easing: "quadOut"
}).call(o).call(function() {
e && (e.active = !1);
t.active = !1;
}).start();
};
t.prototype.popupOpenScaleY = function(t, e, o) {
void 0 === e && (e = null);
void 0 === o && (o = null);
t.parent.active = !0;
e && (e.active = !0);
t.active = !0;
t.scaleY = 0;
cc.tween(t).to(.2, {
scaleY: 1
}, {
easing: "quadIn"
}).call(o).start();
};
t.prototype.popupCloseScaleY = function(t, e, o) {
void 0 === e && (e = null);
void 0 === o && (o = null);
t.parent.active = !0;
t.active = !0;
t.scaleY = 1;
cc.tween(t).to(.2, {
scaleY: 0
}, {
easing: "quadOut"
}).call(o).call(function() {
if (e) {
e.active = !1;
t.active = !1;
}
}).start();
};
t.prototype.toastFadeIn = function(e, o, i, n) {
void 0 === n && (n = null);
o.getChildByName("toast").getChildByName("value").getComponent(cc.Label).string = e;
i && (i.active = !0);
o.parent.active = !0;
o.active = !0;
o.getChildByName("toast").active = !0;
cc.isValid(o, !0) && (t.m_toastCurTween = cc.tween(o.getChildByName("toast")).to(.2, {
scaleY: 1.2,
scaleX: 1.2
}, {
easing: "quadIn"
}).to(.1, {
scaleY: 1,
scaleX: 1
}, {
easing: "quadIn"
}).delay(1).to(.7, {
opacity: 0
}, {
easing: "quadOut"
}).call(function() {
i && (i.active = !1);
o.getChildByName("toast").active = !1;
o.getChildByName("toast").opacity = 255;
n();
}).start());
};
t.prototype.OpenScaleX = function(t, e, o) {
void 0 === e && (e = null);
void 0 === o && (o = null);
t.parent.active = !0;
e && (e.active = !0);
t.active = !0;
t.scaleX = 0;
cc.tween(t).to(.2, {
scaleX: 1
}, {
easing: "quadIn"
}).call(o()).start();
};
t.prototype.CloseScaleX = function(t, e, o) {
void 0 === e && (e = null);
void 0 === o && (o = null);
t.parent.active = !0;
e && (e.active = !0);
t.active = !0;
t.scaleX = 1;
cc.tween(t).to(.2, {
scaleX: 0
}, {
easing: "quadOut"
}).call(o()).call(function() {
e && (e.active = !1);
t.active = !1;
}).start();
};
t.prototype.movePos = function(e, o, i, n) {
void 0 === n && (n = null);
t.m_tweenMap.get(e) && t.m_tweenMap.get(e).stop();
t.m_tweenMap.set(e, cc.tween(o).to(2, {
x: i.x,
y: i.y
}).call(n).call(function() {
t.m_tweenMap.delete(e);
}).start());
};
t.prototype.stopMovePos = function(e) {
t.m_tweenMap.get(e) && t.m_tweenMap.get(e).stop();
};
t.onDestory = function() {
if (t.m_toastCurTween) {
t.m_toastCurTween.stop();
t.m_toastCurTween = null;
}
t.m_tweenMap.forEach(function(t) {
t.stop();
});
};
t.prototype.noticeMove = function() {};
t.prototype.StartRecordSgDetailRotation = function(t, e, o, i) {
void 0 === i && (i = null);
if (o) {
cc.tween(t).to(.2, {
angle: 90,
color: new cc.Color(251, 249, 190)
}, {
easing: "quadIn"
}).call(i).start();
cc.tween(e).to(.2, {
scaleY: 0,
color: new cc.Color(251, 249, 190)
}, {
easing: "quadIn"
}).call(i).call(function() {
e.active = !1;
e.scaleY = 1;
}).start();
} else {
e.active = !0;
e.scaleY = 0;
cc.tween(t).to(.2, {
angle: 0,
color: new cc.Color(4, 255, 187)
}, {
easing: "quadOut"
}).call(i).start();
cc.tween(e).to(.2, {
scaleY: 1
}, {
easing: "quadOut"
}).call(i).start();
}
};
t.prototype.ButtonIsChooseMove = function(t, e, o) {
void 0 === o && (o = null);
if (e) {
t.getComponent("switchsp").setSpriteFrame(1);
cc.tween(t).to(.1, {
x: -5
}, {
easing: "quadIn"
}).call(o).start();
} else {
t.getComponent("switchsp").setSpriteFrame(0);
cc.tween(t).to(.1, {
x: -30
}, {
easing: "quadOut"
}).call(o).start();
}
};
t.prototype.RunAnimtation = function(t, e, o) {
t.active = !0;
var c = t.getComponent(cc.Animation);
c.on("finished", function() {
cc.tween(t).to(.5, {
opacity: 0
}, {
easing: "quadOut"
}).call(function() {
cc.isValid(t, !0) && t.destroy();
}).start();
});
c.defaultClip.curveData.props.position[0].value = [ e.x, e.y, e.z ];
c.defaultClip.curveData.props.position[1].value = [ o.x, o.y, o.z ];
c.play();
setTimeout(function() {
if ("game_sg" == n.default.getInstance().getSceneName()) {
var e = void 0;
switch (t.name) {
case "chicken":
e = EFF_CODE.EFF_BQANIM_CHICKEN;
break;

case "tomato":
e = EFF_CODE.EFF_BQANIM_TOMATO;
break;

case "flower":
e = EFF_CODE.EFF_BQANIM_FLOWER;
break;

case "boom":
e = EFF_CODE.EFF_BQANIM_BOOM;
break;

case "water":
e = EFF_CODE.EFF_BQANIM_WATER;
}
i.default.getInstance().playEffectFromLocal(e, !1);
}
}, 800);
};
t.prototype.RunBetAnim = function(t, e, o, i) {
cc.tween(t).to(.2, {
x: e.x,
y: e.y
}, {
easing: "quadOut"
}).delay(.5).to(.4, {
x: o.x,
y: o.y
}, {
easing: "quadOut"
}).call(i).start();
};
t.prototype.RunOpenCard = function(t) {
var e = t.getComponent("switchsp");
e ? cc.tween(t).to(.2, {
scaleX: 0
}).call(function() {
e.setSpriteFrame(1);
}).to(.2, {
scaleX: 1
}).start() : cc.warn("没有组件 switchsp");
};
t.m_tweenMap = new Map();
return t;
}();
o.default = c;
cc._RF.pop();
}, {
"../units/AudioManager": "AudioManager",
"./SceneManager": "SceneManager"
} ],
Navbar: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "595f9hnl9dJ47AshZLzqsMK", "Navbar");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MNavbar = void 0;
var c = t("../../common/MyAnimation"), a = t("../../common/Toast"), s = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.S_recordState = e.S_palyState = e.S_shareState = e.S_menuState = BUTTON_STATE.ON;
e.S_messageState = e.S_setState = e.S_agentState = BUTTON_STATE.ON;
e.S_feedBackState = BUTTON_STATE.OFF;
return e;
}
e.prototype.getShareButtonState = function() {
return this.S_shareState;
};
e.prototype.getPlayButtonState = function() {
return this.S_palyState;
};
e.prototype.getRecordButtonState = function() {
return this.S_recordState;
};
e.prototype.getMenuButtonState = function() {
return this.S_menuState;
};
e.prototype.getAgentButtonState = function() {
return this.S_agentState;
};
e.prototype.getFeedbackButtonState = function() {
return this.S_feedBackState;
};
e.prototype.getMessageButtonState = function() {
return this.S_messageState;
};
e.prototype.getSetButtonState = function() {
return this.S_setState;
};
return e;
}(c.default);
o.MNavbar = s;
var r = function(t) {
n(e, t);
function e(e, o, i, n, c, a, s) {
var r = t.call(this) || this;
r.node = e;
r.m_toast = cc.find("common/toast", r.node);
r.m_menuSecond = cc.find("navmenu/layout/menu/alltouch/secondmenu", r.node);
r.i_allTouch = cc.find("navmenu/layout/menu/alltouch", r.node);
r.i_share = cc.find("navmenu/layout/share/icon", r.node);
r.i_play = cc.find("navmenu/layout/play/icon", r.node);
r.i_record = cc.find("navmenu/layout/record/icon", r.node);
r.i_menu = cc.find("navmenu/layout/menu/icon", r.node);
r.i_agent = cc.find("navmenu/layout/menu/alltouch/secondmenu/icon_agent", r.node);
r.i_feedBack = cc.find("navmenu/layout/menu/alltouch/secondmenu/icon_feedback", r.node);
r.i_message = cc.find("navmenu/layout/menu/alltouch/secondmenu/icon_message", r.node);
r.i_set = cc.find("navmenu/layout/menu/alltouch/secondmenu/icon_set", r.node);
r.cl_ShareView = o;
r.cl_PlayView = i;
r.cl_MsgView = n;
r.cl_SetView = c;
r.cl_AgentView = a;
r.cl_RecordView = s;
r.m_menuSecond.active = !1;
r.addevent();
return r;
}
e.prototype.showSecondMenu = function() {
this.OpenScaleX(this.m_menuSecond, null, this.secondMenuAddEvent.bind(this));
};
e.prototype.hideSecondMenu = function() {
this.CloseScaleX(this.m_menuSecond, null, this.secondMenuHideEvent.bind(this));
};
e.prototype.secondMenuAddEvent = function() {
var t = this;
this.i_allTouch.on("touchend", function() {
t.hideSecondMenu();
t.secondMenuHideEvent();
}, this);
this.i_agent.on("touchend", function() {
if (t.click_Agent()) {
t.hideSecondMenu();
t.secondMenuHideEvent();
}
}, this);
this.i_feedBack.on("touchend", function() {
if (t.click_FeedBack()) {
t.hideSecondMenu();
t.secondMenuHideEvent();
}
}, this);
this.i_message.on("touchend", function() {
if (t.click_Message()) {
t.hideSecondMenu();
t.secondMenuHideEvent();
}
}, this);
this.i_set.on("touchend", function() {
if (t.click_Set()) {
t.hideSecondMenu();
t.secondMenuHideEvent();
}
}, this);
};
e.prototype.secondMenuHideEvent = function() {
this.i_allTouch.off("touchend");
this.i_agent.off("touchend");
this.i_feedBack.off("touchend");
this.i_message.off("touchend");
this.i_set.off("touchend");
};
e.prototype.addevent = function() {
var t = this;
this.i_share.on("touchend", function() {
t.click_Share();
}, this);
this.i_play.on("touchend", function() {
t.click_Play();
}, this);
this.i_record.on("touchend", function() {
t.click_Record();
}, this);
this.i_menu.on("touchend", function() {
t.click_Menu();
}, this);
};
e.prototype.click_Share = function() {
switch (this.getShareButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.cl_ShareView.show();
}
};
e.prototype.click_Play = function() {
switch (this.getPlayButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.cl_PlayView.show();
}
};
e.prototype.click_Record = function() {
switch (this.getRecordButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.cl_RecordView.show();
}
};
e.prototype.click_Menu = function() {
switch (this.getMenuButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.showSecondMenu();
}
};
e.prototype.click_Agent = function() {
switch (this.getAgentButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.cl_AgentView.show();
return !0;
}
return !1;
};
e.prototype.click_FeedBack = function() {
switch (this.getFeedbackButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
return !0;
}
return !1;
};
e.prototype.click_Message = function() {
switch (this.getMessageButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.cl_MsgView.show();
return !0;
}
return !1;
};
e.prototype.click_Set = function() {
switch (this.getSetButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.cl_SetView.show();
return !0;
}
return !1;
};
e.prototype.start = function() {};
e.prototype.onDestory = function() {};
return e;
}(s);
o.default = r;
cc._RF.pop();
}, {
"../../common/MyAnimation": "MyAnimation",
"../../common/Toast": "Toast"
} ],
NodePool: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "e699dErF9tHFaX8M1zoFVK7", "NodePool");
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = function() {
function t() {
this.nodePool = [];
}
t.getInstance = function() {
if (!t.m_instance) {
t.m_instance = new t();
return t.m_instance;
}
return t.m_instance;
};
t.prototype.cleanPool = function(t) {
void 0 === t && (t = null);
if (this.nodePool) if (t) {
if (this.nodePool[t]) {
this.nodePool[t].prefab = null;
this.nodePool[t].pool.clear();
delete this.nodePool[t];
return;
}
} else {
for (var e in this.nodePool) this.nodePool[e].pool.clear();
this.nodePool = [];
}
};
t.prototype.createrNodePool = function(t, e, o) {
if (t && e && o && (!this.nodePool || !this.nodePool[t])) {
this.nodePool || (this.nodePool = []);
var i = {
prefab: e,
pool: new cc.NodePool()
};
this.nodePool[t] = i;
for (var n = 0; n < o; ++n) {
var c = cc.instantiate(e);
this.nodePool[t].pool.put(c);
}
}
};
t.prototype.getNodeFromPool = function(t) {
return this.nodePool[t] ? this.nodePool[t].pool.size() > 0 ? this.nodePool[t].pool.get() : cc.instantiate(this.nodePool[t].prefab) : null;
};
t.prototype.destroyNode = function(t, e) {
this.nodePool[t] ? this.nodePool[t].pool.put(e) : e.destory();
};
t.prototype.onDestroy = function() {
this.cleanPool();
};
return t;
}();
o.default = i;
cc._RF.pop();
}, {} ],
Notice: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "36147TY17hJ04yPwYA+1Lmt", "Notice");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = function(t) {
n(e, t);
function e(e) {
void 0 === e && (e = null);
var o = t.call(this) || this;
o.m_debug = !1;
o.isRun = !1;
o.m_isLoop = !0;
o.m_moveSpeed = 10;
o.m_runFlag = -1;
o.m_cache = [];
if (e) {
o.setRootNode(e);
o.m_root.active = !1;
}
return o;
}
e.prototype.setDataArr = function(t) {
this.m_cache = t;
this.show();
};
e.prototype.setSpeed = function(t) {
this.m_moveSpeed = t;
};
e.getInstance = function(t) {
void 0 === t && (t = null);
if (!e.m_instance) {
e.m_instance = new e(t);
return e.m_instance;
}
return e.m_instance;
};
e.prototype.addText = function(t) {
this.m_debug && (this.m_cache[0] = "通知配置信息: 循环模式" + (this.m_isLoop ? "ON" : "OFF ") + "当前缓存信息数量:" + this.m_cache.length + "当前移动配速: " + this.m_moveSpeed);
this.m_cache.push(t);
this.show();
};
e.prototype.hide = function() {
var t = this;
cc.tween(this.m_root).delay(.5).to(.3, {
opacity: 0
}, {
easing: "quadOut"
}).call(function() {
if (cc.isValid(t.m_root)) {
t.m_root.active = !1;
t.show();
}
}).start();
};
e.prototype.debug = function() {
this.m_debug = !0;
this.addText("DESIGNED BY COCOS COREATOR 2.4.3-RC7 ©2020 XIAMEN YAJI PROGECTNAME:APP0910 PACKAGENAME:COM.MEIJI.GALM");
};
e.prototype.show = function() {
if (!this.isRun) if (0 != this.m_cache.length) {
var t;
if (this.m_isLoop) {
this.m_runFlag += 1;
this.m_runFlag > this.m_cache.length - 1 && (this.m_runFlag = 0);
t = this.m_cache[this.m_runFlag];
} else {
this.m_runFlag = -1;
t = this.m_cache.shift();
}
this.run(t);
} else this.hide();
};
e.prototype.setRootNode = function(t) {
this.m_root = t;
this.m_bgNode = cc.find("bg", this.m_root);
this.m_labelNode = cc.find("bg/mask/value", this.m_root);
};
e.prototype.cleanData = function() {
this.m_cache = [];
};
e.prototype.run = function(t) {
var e = this;
this.isRun = !0;
this.m_labelNode.getComponent(cc.Label).string = t;
this.m_labelNode.x = this.m_bgNode.width + 30;
this.m_root.active = !0;
this.m_labelNode.active = !0;
this.m_labelNode.getComponent(cc.Label)._forceUpdateRenderData();
var o = this.m_labelNode.width, i = this.m_bgNode.width + o + 30;
this.m_labelNode.x;
this.m_runTween = cc.tween(this.m_labelNode).by(i / (10 * this.m_moveSpeed), {
x: -i
}, {
easing: "linear"
}).call(function() {
e.isRun = !1;
e.show();
}).start();
};
e.prototype.onDestroy = function() {
this.m_runTween.stop();
e.m_instance = null;
};
return e;
}(t("./MyAnimation").default);
o.default = c;
cc._RF.pop();
}, {
"./MyAnimation": "MyAnimation"
} ],
Observer: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "a1e9cFXOslNZ6S+0ynZbh/6", "Observer");
var i = this && this.__spreadArrays || function() {
for (var t = 0, e = 0, o = arguments.length; e < o; e++) t += arguments[e].length;
var i = Array(t), n = 0;
for (e = 0; e < o; e++) for (var c = arguments[e], a = 0, s = c.length; a < s; a++, 
n++) i[n] = c[a];
return i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function t(t, e) {
this.callback = null;
this.context = null;
this.callback = t;
this.context = e;
}
t.prototype.notify = function() {
for (var t, e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
var n = this;
(t = n.callback).call.apply(t, i([ n.context ], e));
};
t.prototype.compar = function(t) {
return t == this.context;
};
return t;
}();
o.default = n;
cc._RF.pop();
}, {} ],
OpenCard: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "35988Mn30ZOtYGfBFYHfSBs", "OpenCard");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), c = this && this.__awaiter || function(t, e, o, i) {
return new (o || (o = Promise))(function(n, c) {
function a(t) {
try {
r(i.next(t));
} catch (t) {
c(t);
}
}
function s(t) {
try {
r(i.throw(t));
} catch (t) {
c(t);
}
}
function r(t) {
t.done ? n(t.value) : (e = t.value, e instanceof o ? e : new o(function(t) {
t(e);
})).then(a, s);
var e;
}
r((i = i.apply(t, e || [])).next());
});
}, a = this && this.__generator || function(t, e) {
var o, i, n, c, a = {
label: 0,
sent: function() {
if (1 & n[0]) throw n[1];
return n[1];
},
trys: [],
ops: []
};
return c = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (c[Symbol.iterator] = function() {
return this;
}), c;
function s(t) {
return function(e) {
return r([ t, e ]);
};
}
function r(c) {
if (o) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (o = 1, i && (n = 2 & c[0] ? i.return : c[0] ? i.throw || ((n = i.return) && n.call(i), 
0) : i.next) && !(n = n.call(i, c[1])).done) return n;
(i = 0, n) && (c = [ 2 & c[0], n.value ]);
switch (c[0]) {
case 0:
case 1:
n = c;
break;

case 4:
a.label++;
return {
value: c[1],
done: !1
};

case 5:
a.label++;
i = c[1];
c = [ 0 ];
continue;

case 7:
c = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(n = a.trys, n = n.length > 0 && n[n.length - 1]) && (6 === c[0] || 2 === c[0])) {
a = 0;
continue;
}
if (3 === c[0] && (!n || c[1] > n[0] && c[1] < n[3])) {
a.label = c[1];
break;
}
if (6 === c[0] && a.label < n[1]) {
a.label = n[1];
n = c;
break;
}
if (n && a.label < n[2]) {
a.label = n[2];
a.ops.push(c);
break;
}
n[2] && a.ops.pop();
a.trys.pop();
continue;
}
c = e.call(t, a);
} catch (t) {
c = [ 6, t ];
i = 0;
} finally {
o = n = 0;
}
if (5 & c[0]) throw c[1];
return {
value: c[0] ? c[1] : void 0,
done: !0
};
}
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var s = t("../common/AtlasLib"), r = t("../common/MyAnimation"), l = t("../common/PeekCard"), u = t("../common/SceneManager"), h = t("../units/UserConfig"), d = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_root = cc.find("popup/opencard", o.node);
o.m_mask = cc.find("popup/mask", o.node);
o.m_root.active = !1;
return o;
}
e.prototype.setCardBase = function(t) {
cc.isValid(this.m_peekNode, !0) && this.m_peekNode.getComponent(l.default).setCardBack(t);
};
e.prototype.show = function(t, e) {
for (var o = this, i = function(e) {
setTimeout(function() {
if ("game_sg" === u.default.getInstance().getSceneName()) {
var i = o.m_root.children[e].getComponent("switchsp");
i.setSpriteFrame(0);
i.updateFrame(1, s.default.getInstance().getSpriteFrame("card", "x" + t[e]));
o.RunOpenCard(o.m_root.children[e]);
}
}, 250 + 500 * e);
}, n = 0; n < 2; ++n) i(n);
this.buildPeekCard(l.default.DirType.horizontal, "peekcard/base" + h.default.getInstance().getSgSetViewConfig().cardid, "peekcard/x" + t[2], e);
this.popupOpenScaleXY(this.m_root, this.m_mask);
};
e.prototype.buildPeekCard = function(t, e, o, i) {
void 0 === i && (i = null);
return c(this, void 0, void 0, function() {
var n;
return a(this, function(c) {
switch (c.label) {
case 0:
console.log(e, o);
console.log("动态创建搓牌节点 ", l.default.DirType[t]);
this.m_peekNode = new cc.Node("PeekCard");
(n = this.m_peekNode.addComponent(l.default)).onLoad();
this.m_root.addChild(this.m_peekNode);
this.m_peekNode.position = new cc.Vec3(37, 0, 0);
n._originalDir = n._dirType = l.default.DirType.vertical;
n.setTouchAreaSize(cc.size(253, 370));
n.setCardSize(cc.size(253, 370));
n.dirType = t;
n.setFinishCallBack(i);
return [ 4, n.setCardBack(e) ];

case 1:
c.sent();
return [ 4, n.setCardFace(o) ];

case 2:
c.sent();
return [ 4, n.setShadow("shadow") ];

case 3:
c.sent();
return [ 4, n.setFinger(null) ];

case 4:
c.sent();
n.directionLength = 20;
n.moveSpeed = .6;
n.angleFixed = 5;
n.init();
return [ 2 ];
}
});
});
};
e.prototype.hide = function() {
var t = this;
setTimeout(function() {
if ("game_sg" === u.default.getInstance().getSceneName()) {
t.m_root.removeChild(t.m_peekNode);
t.popupCloseScaleXY(t.m_root, t.m_mask, t.hideEvent.bind(t));
}
}, 1500);
};
e.prototype.addEvent = function() {};
e.prototype.hideEvent = function() {};
return e;
}(r.default);
o.default = d;
cc._RF.pop();
}, {
"../common/AtlasLib": "AtlasLib",
"../common/MyAnimation": "MyAnimation",
"../common/PeekCard": "PeekCard",
"../common/SceneManager": "SceneManager",
"../units/UserConfig": "UserConfig"
} ],
Passoprt: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "eff49Ph30NH4LICxMygS7NU", "Passoprt");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), c = this && this.__decorate || function(t, e, o, i) {
var n, c = arguments.length, a = c < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (c < 3 ? n(a) : c > 3 ? n(e, o, a) : n(e, o)) || a);
return c > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = t("../common/MyAnimation"), s = t("../common/SceneManager"), r = t("../common/Toast"), l = t("../units/AudioManager"), u = t("../units/UserConfig"), h = t("./Loading"), d = t("./Login"), p = t("./Version"), f = t("../common/Dialog"), m = t("../common/AtlasLib"), _ = cc._decorator, g = _.ccclass, y = _.menu, v = (_.property, 
function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.lauchingFinished = function() {
this.cl_login.show();
};
e.prototype.resetView = function() {
cc.find("logo", this.node).active = !0;
cc.find("login", this.node).active = !1;
cc.find("loading", this.node).active = !0;
cc.find("tiplabel", this.node).active = !0;
cc.find("popup", this.node).active = !1;
cc.find("popup/mask", this.node).active = !1;
cc.find("popup/forgetpd", this.node).active = !1;
cc.find("popup/regist", this.node).active = !1;
cc.find("popup/useragree", this.node).active = !1;
cc.find("common", this.node).active = !0;
cc.find("common/mask", this.node).active = !1;
cc.find("common/toast", this.node).active = !1;
};
e.prototype.onLoad = function() {
this.resetView();
u.default.getInstance();
s.default.getInstance().setScene(cc.director.getScene());
r.default.getInstance().setRootNode(cc.find("common/toast", this.node));
f.default.getInstance().setRootNode(this.node);
this.cl_version = this.node.getComponent(p.default);
this.cl_loading = new h.default(this.node, this.lauchingFinished.bind(this));
this.cl_login = new d.default(this.node);
cc.sys.localStorage.getItem("hotUpdateVer") ? cc.find("loading/version/value", this.node).getComponent(cc.Label).string = "版本号: " + cc.sys.localStorage.getItem("hotUpdateVer") : cc.find("loading/version/value", this.node).getComponent(cc.Label).string = "版本号: " + JSON.parse(JSON.parse(this.cl_version.manifest._nativeAsset).version).hotUpdate;
};
e.prototype.initAudio = function() {
if (l.default.getInstance().getBgmCode() !== BGM_CODE.BGM_PASSPORT) {
l.default.getInstance().playBgmFromLocal(BGM_CODE.BGM_PASSPORT, !0);
l.default.getInstance().setBgmVol();
l.default.getInstance().setEffVol();
}
};
e.prototype.start = function() {
var t = this;
this.cl_loading.runShader();
if (s.default.getInstance().getIsFirstLoad()) {
this.initAudio();
this.cl_version.validate(function(e) {
switch (e) {
case 1:
f.default.getInstance().push("提示", 1, "本地更新文件查找失败,请重新下载安装本应用!", DIALOG.MB_YES, t.versionResult.bind(t), {
code: 1
});
break;

case 2:
f.default.getInstance().push("提示", 1, "远程更新文件下载失败,请稍后再试!", DIALOG.MB_YES, t.versionResult.bind(t), {
code: 2
});
break;

case 3:
f.default.getInstance().push("提示", 1, "读取本地更新文件失败,请重启应用后再试!", DIALOG.MB_YES, t.versionResult.bind(t), {
code: 3
});
break;

case 4:
f.default.getInstance().push("错误", 0, "android版本包版本不是最新的,请下载最新安装包安装!", DIALOG.MB_YES, t.versionResult.bind(t), {
code: 4
});
break;

case 5:
f.default.getInstance().push("警告", 2, "当前运行环境为非原生系统无法热更新,未更新的版本可能出现错误!", DIALOG.MB_YES, t.versionResult.bind(t), {
code: 5
});
break;

case 0:
m.default.getInstance().loadAtlas("card", "card/card");
t.cl_loading.Startlauching();
}
});
} else {
this.cl_loading.hide();
this.lauchingFinished();
}
};
e.prototype.versionResult = function(t) {
if (t.ctrl === DIALOG.MB_YES) switch (t.params.code) {
case 1:
case 2:
case 3:
case 4:
cc.game.end();
break;

case 5:
m.default.getInstance().loadAtlas("card", "card/card");
this.cl_loading.Startlauching();
}
};
e.prototype.onDestroy = function() {
a.default.onDestory();
this.cl_login.onDestroy();
this.cl_loading.onDestory();
};
return c([ g, y("场景主脚本/Passport") ], e);
}(cc.Component));
o.default = v;
cc._RF.pop();
}, {
"../common/AtlasLib": "AtlasLib",
"../common/Dialog": "Dialog",
"../common/MyAnimation": "MyAnimation",
"../common/SceneManager": "SceneManager",
"../common/Toast": "Toast",
"../units/AudioManager": "AudioManager",
"../units/UserConfig": "UserConfig",
"./Loading": "Loading",
"./Login": "Login",
"./Version": "Version"
} ],
PeekCard: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "b2731TdgddP1rcEzWZqyIH4", "PeekCard");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), c = this && this.__decorate || function(t, e, o, i) {
var n, c = arguments.length, a = c < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (c < 3 ? n(a) : c > 3 ? n(e, o, a) : n(e, o)) || a);
return c > 3 && a && Object.defineProperty(e, o, a), a;
}, a = this && this.__awaiter || function(t, e, o, i) {
return new (o || (o = Promise))(function(n, c) {
function a(t) {
try {
r(i.next(t));
} catch (t) {
c(t);
}
}
function s(t) {
try {
r(i.throw(t));
} catch (t) {
c(t);
}
}
function r(t) {
t.done ? n(t.value) : (e = t.value, e instanceof o ? e : new o(function(t) {
t(e);
})).then(a, s);
var e;
}
r((i = i.apply(t, e || [])).next());
});
}, s = this && this.__generator || function(t, e) {
var o, i, n, c, a = {
label: 0,
sent: function() {
if (1 & n[0]) throw n[1];
return n[1];
},
trys: [],
ops: []
};
return c = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (c[Symbol.iterator] = function() {
return this;
}), c;
function s(t) {
return function(e) {
return r([ t, e ]);
};
}
function r(c) {
if (o) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (o = 1, i && (n = 2 & c[0] ? i.return : c[0] ? i.throw || ((n = i.return) && n.call(i), 
0) : i.next) && !(n = n.call(i, c[1])).done) return n;
(i = 0, n) && (c = [ 2 & c[0], n.value ]);
switch (c[0]) {
case 0:
case 1:
n = c;
break;

case 4:
a.label++;
return {
value: c[1],
done: !1
};

case 5:
a.label++;
i = c[1];
c = [ 0 ];
continue;

case 7:
c = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(n = a.trys, n = n.length > 0 && n[n.length - 1]) && (6 === c[0] || 2 === c[0])) {
a = 0;
continue;
}
if (3 === c[0] && (!n || c[1] > n[0] && c[1] < n[3])) {
a.label = c[1];
break;
}
if (6 === c[0] && a.label < n[1]) {
a.label = n[1];
n = c;
break;
}
if (n && a.label < n[2]) {
a.label = n[2];
a.ops.push(c);
break;
}
n[2] && a.ops.pop();
a.trys.pop();
continue;
}
c = e.call(t, a);
} catch (t) {
c = [ 6, t ];
i = 0;
} finally {
o = n = 0;
}
if (5 & c[0]) throw c[1];
return {
value: c[0] ? c[1] : void 0,
done: !0
};
}
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var r, l = cc._decorator, u = l.ccclass, h = l.property;
(function(t) {
t[t.horizontal = 1] = "horizontal";
t[t.vertical = 2] = "vertical";
})(r || (r = {}));
var d = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e._originalDir = r.vertical;
e._dirType = r.vertical;
e._cardSize = cc.size(0, 0);
e.mask = void 0;
e.cardBack = void 0;
e.cardFace = void 0;
e.shadowMask = void 0;
e.shadow = void 0;
e.finger1 = void 0;
e.finger2 = void 0;
e.directionLength = 5;
e.moveSpeed = .5;
e.angleFixed = 10;
e._isOpenCard = !1;
e._isMoveStart = !1;
e._tStartPos = void 0;
e._tMoveVec = void 0;
e._rotation = 0;
e._inFingers = [];
e._finishCallBack = void 0;
return e;
}
Object.defineProperty(e.prototype, "originalDirType", {
get: function() {
return this._originalDir;
},
set: function(t) {
this._originalDir != t && (this._originalDir = t);
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "dirType", {
get: function() {
return this._dirType;
},
set: function(t) {
t != this.dirType && (this._dirType = t);
var e = t != this.originalDirType, o = this.cardBack.getComponent(cc.Sprite), i = o.spriteFrame;
o.spriteFrame = null;
this._setSpriteFrameRotate(i, e);
o.spriteFrame = i;
i = (o = this.cardFace.getComponent(cc.Sprite)).spriteFrame;
o.spriteFrame = null;
this._setSpriteFrameRotate(i, e);
o.spriteFrame = i;
this.init();
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "cardSize", {
get: function() {
return this._cardSize;
},
set: function(t) {
this.setCardSize(t);
this.init();
},
enumerable: !1,
configurable: !0
});
e.prototype.resetInEditor = function() {
console.log("reset111");
this.node.destroyAllChildren();
this._initNodes();
};
e.prototype._initNodes = function() {
function t(t) {
var e = t.addComponent(cc.Sprite);
e.sizeMode = cc.Sprite.SizeMode.CUSTOM;
return e;
}
var e = cc.director.getScene().getComponentInChildren(cc.Canvas);
this.setTouchAreaSize(e.designResolution);
this.mask = new cc.Node("mask").addComponent(cc.Mask);
this.node.addChild(this.mask.node);
this.cardBack = new cc.Node("cardBack");
t(this.cardBack);
this.mask.node.addChild(this.cardBack);
this.cardFace = new cc.Node("cardFace");
t(this.cardFace);
this.mask.node.addChild(this.cardFace);
this.shadowMask = new cc.Node("shadowMask").addComponent(cc.Mask);
this.shadowMask.type = cc.Mask.Type.IMAGE_STENCIL;
this.shadowMask.alphaThreshold = .1;
this.cardFace.addChild(this.shadowMask.node);
this.shadow = new cc.Node("shadow");
t(this.shadow);
this.shadow.parent = this.shadowMask.node;
this.shadow.setAnchorPoint(0, .5);
this.finger1 = new cc.Node("finger1");
this.finger2 = new cc.Node("finger2");
t(this.finger1);
t(this.finger2);
this.node.addChild(this.finger1);
this.node.addChild(this.finger2);
};
e.prototype.onLoad = function() {
null == this.node.getChildByName("mask") && this._initNodes();
};
e.prototype.start = function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._touchStart, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this);
this.node.on(cc.Node.EventType.TOUCH_END, this._touchEnd, this);
};
e.prototype.onEnable = function() {};
e.prototype.setFinishCallBack = function(t) {
this._finishCallBack = t;
};
e.prototype.init = function() {
this._cardSize || (this._cardSize = this.cardBack.getContentSize());
this._initCardNode(this.mask.node, this._cardSize, this.dirType != this.originalDirType);
this._initCardNode(this.cardBack, this._cardSize, this.dirType != this.originalDirType);
this._initCardNode(this.cardFace, this._cardSize, this.dirType != this.originalDirType);
this._initCardNode(this.shadowMask.node, this._cardSize, this.dirType != this.originalDirType);
this.cardFace.setPosition(-this.mask.node.width, 0);
this.shadow.angle = 0;
this.shadow.height = 2 * Math.sqrt(Math.pow(this._cardSize.height, 2) + Math.pow(this._cardSize.width, 2));
this.shadow.width = 40;
var t = this.cardFace.width / 2 + this.shadowMask.node.width / 2, e = this.cardFace.height / 2 + this.shadowMask.node.height / 2;
this.shadow.setPosition(t, e);
this._initFinger();
this._initStatus();
};
e.prototype._touchStart = function(t) {
this._isOpenCard || (this._tStartPos = t.getLocation());
};
e.prototype._touchMove = function(t) {
if (!this._isOpenCard && this._tStartPos) {
var e = t.getLocation(), o = t.getPreviousLocation();
if (!e.equals(o)) {
var i = e.sub(this._tStartPos), n = e.sub(o), c = i.mag();
if (0 == this._isMoveStart && c >= this.directionLength) {
this._isMoveStart = !0;
this._tMoveVec = this._fixedDirection(i);
this._rotation = this._getSignAngle(this._tMoveVec, cc.v2(1, 0));
var a = this._getOutRectSize(this.cardBack, this._rotation);
this.mask.node.setContentSize(a);
this.mask.node.angle = -this._rotation;
this.cardBack.angle = this._rotation;
this.cardFace.angle = -this._rotation;
this.shadow.angle = this._rotation;
this.cardFace.angle = -this._rotation;
this.shadow.angle = this._rotation;
var s = this._getQuadrant(this._tMoveVec), r = this._getNodeVertexByNodeSpaceAR(this.cardFace);
switch (s) {
case 1:
case 5:
this.cardFace.setPosition(-this.mask.node.width, this.cardBack.y);
this.shadow.setPosition(r[2]);
break;

case 2:
case 6:
this.cardFace.setPosition(-this.mask.node.width, -this.cardBack.y);
this.shadow.setPosition(r[3]);
break;

case 3:
case 7:
this.cardFace.setPosition(-this.mask.node.width, -this.cardBack.y);
this.shadow.setPosition(r[0]);
break;

case 4:
case 8:
this.cardFace.setPosition(-this.mask.node.width, this.cardBack.y);
this.shadow.setPosition(r[1]);
break;

default:
cc.error("移动的方向向量为cc.Vec2(0, 0)");
this._isMoveStart = !1;
}
} else if (this._isMoveStart) {
var l = n.project(cc.v2(this._tMoveVec)), u = l.neg();
if (0 == l.mag()) return;
var h = this.moveSpeed;
this._moveByVec2(this.mask.node, l, h);
this._moveByVec2(this.cardBack, u, h);
this._moveByVec2(this.cardFace, l, h);
this._moveByVec2(this.shadow, u, h);
var d = this._getNodeVertexByWorldSpaceAR(this.cardFace, -10), p = this._getNodeVertexByWorldSpaceAR(this.mask.node);
this._inFingers = [];
for (var f = 0; f < d.length; f++) cc.Intersection.pointInPolygon(d[f], p) && this._inFingers.push(f);
for (f = 0; f < this._inFingers.length; f++) {
var m = this._inFingers[f], _ = this["finger" + (f + 1)];
if (_) {
_.active = !0;
_.setPosition(_.parent.convertToNodeSpaceAR(d[m]));
_.angle = this._rotation - 90;
}
}
if (0 == (c = this._inFingers.length)) {
this.finger1.active = !1;
this.finger2.active = !1;
} else 1 == c && (this.finger2.active = !1);
this._canOpen() && this.openCard();
if (l.x * this._tMoveVec.x <= 0 && l.y * this._tMoveVec.y <= 0 && 0 == c) {
this._touchEnd();
this._tStartPos = void 0;
console.log("禁止继续回退");
}
}
}
}
};
e.prototype._touchEnd = function() {
!this._isOpenCard && this._tStartPos && this.init();
};
e.prototype.setTouchAreaSize = function(t, e) {
var o = this._getSize(t, e);
this.node.setContentSize(o);
};
e.prototype.setCardSize = function(t, e) {
var o = this._getSize(t, e);
this._cardSize = o;
this.dirType != this.originalDirType && (o = cc.size(o.height, o.width));
this.mask.node.setContentSize(o);
this.cardBack.setContentSize(o);
this.cardFace.setContentSize(o);
this.shadowMask.node.setContentSize(o);
};
e.prototype.setCardBack = function(t) {
return a(this, void 0, void 0, function() {
return s(this, function(e) {
switch (e.label) {
case 0:
return [ 4, this._setNodeSpriteFrame(this.cardBack, t, this.dirType != this.originalDirType) ];

case 1:
t = e.sent();
this.shadowMask.spriteFrame = t;
this.shadowMask.type = cc.Mask.Type.IMAGE_STENCIL;
this.shadowMask.alphaThreshold = .1;
return [ 2 ];
}
});
});
};
e.prototype.setCardFace = function(t) {
return a(this, void 0, void 0, function() {
return s(this, function(e) {
switch (e.label) {
case 0:
return [ 4, this._setNodeSpriteFrame(this.cardFace, t, this.dirType != this.originalDirType) ];

case 1:
e.sent();
return [ 2 ];
}
});
});
};
e.prototype.setShadow = function(t) {
return a(this, void 0, void 0, function() {
return s(this, function(e) {
switch (e.label) {
case 0:
return [ 4, this._setNodeSpriteFrame(this.shadow, t) ];

case 1:
e.sent();
return [ 2 ];
}
});
});
};
e.prototype.setFinger = function(t, e) {
return a(this, void 0, void 0, function() {
return s(this, function(o) {
switch (o.label) {
case 0:
return [ 4, this._setNodeSpriteFrame(this.finger1, t) ];

case 1:
o.sent();
return [ 4, this._setNodeSpriteFrame(this.finger2, t) ];

case 2:
o.sent();
e instanceof cc.Size && this.setFingerSize(e);
return [ 2 ];
}
});
});
};
e.prototype.setFingerSize = function(t, e) {
var o = this._getSize(t, e);
this.finger1.setContentSize(o);
this.finger2.setContentSize(o);
};
e.prototype._canOpen = function() {
return this._getMoveLength() > this._getMoveMaxLength() / 2;
};
e.prototype._getMoveLength = function() {
return this.mask.node.getPosition().mag();
};
e.prototype._getMoveMaxLength = function() {
return this.mask.node.width;
};
e.prototype.openCard = function() {
cc.log("开牌");
this.init();
this.cardFace.setPosition(0, 0);
this._isOpenCard = !0;
"function" == typeof this._finishCallBack && this._finishCallBack();
};
e.prototype._getOutRectSize = function(t, e) {
(e = Math.abs(e)) > 90 && e <= 180 && (e = 180 - e);
var o = Math.PI / 180 * e, i = t.height * Math.sin(o) + t.width * Math.cos(o), n = t.height * Math.cos(o) + t.width * Math.sin(o);
return cc.size(i, n);
};
e.prototype._moveByVec2 = function(t, e, o) {
void 0 === o && (o = 1);
var i = t.parent.convertToWorldSpaceAR(t.getPosition()), n = cc.v2(i.x + e.x * o, i.y + e.y * o), c = t.parent.convertToNodeSpaceAR(n);
t.setPosition(c);
};
e.prototype._getSignAngle = function(t, e) {
var o = t.signAngle(e);
return 180 / Math.PI * o;
};
e.prototype._fixedDirection = function(t) {
if (this.angleFixed) {
var e = this.angleFixed, o = cc.v2(1, 0);
if ((i = this._getSignAngle(t, o)) <= e + 0 && i >= 0 - e || i <= e + -180 || i >= 180 - e) return t.project(o);
var i, n = cc.v2(0, 1);
if ((i = this._getSignAngle(t, n)) <= e + 0 && i >= 0 - e || i <= e + -180 || i >= 180 - e) return t.project(n);
}
return t;
};
e.prototype._getNodeVertexByWorldSpaceAR = function(t, e) {
void 0 === e && (e = 0);
for (var o = this._getNodeVertexByNodeSpaceAR(t, e), i = 0; i < o.length; i++) o[i] = t.convertToWorldSpaceAR(o[i]);
return o;
};
e.prototype._getNodeVertexByNodeSpaceAR = function(t, e) {
void 0 === e && (e = 0);
var o = t.width * t.anchorX + e, i = t.width * (1 - t.anchorX) + e, n = t.height * t.anchorY + e, c = t.height * (1 - t.anchorY) + e;
return [ cc.v2(-o, c), cc.v2(i, c), cc.v2(i, -n), cc.v2(-o, -n) ];
};
e.prototype._getQuadrant = function(t) {
var e = t.x, o = t.y;
if (0 == e) {
if (0 == o) return 9;
if (o > 0) return 6;
if (o < 0) return 8;
} else if (e > 0) {
if (0 == o) return 5;
if (o > 0) return 1;
if (o < 0) return 4;
} else if (e < 0) {
if (0 == o) return 7;
if (o > 0) return 2;
if (o < 0) return 3;
}
cc.error("参数错误::" + JSON.stringify(t));
return 0;
};
e.prototype._initCardNode = function(t, e) {
if (e) {
this.dirType != this.originalDirType ? t.setContentSize(e.height, e.width) : t.setContentSize(e);
t.angle = 0;
t.setPosition(0, 0);
}
};
e.prototype._initFinger = function() {
this._inFingers = [];
this.finger1.active = !1;
this.finger2.active = !1;
};
e.prototype._initStatus = function() {
this._isOpenCard = !1;
this._isMoveStart = !1;
this._rotation = 0;
};
e.prototype._getSize = function(t, e) {
return null == t ? cc.size(0, 0) : t instanceof cc.Size ? t : null != e ? cc.size(t, e) : cc.size(t, t);
};
e.prototype._loadSpriteFrameSync = function(t) {
return a(this, void 0, void 0, function() {
return s(this, function() {
return [ 2, new Promise(function(e) {
cc.resources.load(t, cc.SpriteFrame, function(t, o) {
e(t ? null : o);
});
}) ];
});
});
};
e.prototype._setNodeSpriteFrame = function(t, e, o) {
void 0 === o && (o = !1);
return a(this, void 0, void 0, function() {
return s(this, function(i) {
switch (i.label) {
case 0:
return "string" != typeof e ? [ 3, 2 ] : [ 4, this._loadSpriteFrameSync(e) ];

case 1:
e = i.sent();
i.label = 2;

case 2:
if (null == e) return [ 2 ];
this._setSpriteFrameRotate(e, o);
t.getComponent(cc.Sprite).spriteFrame == e && (t.getComponent(cc.Sprite).spriteFrame = null);
t.getComponent(cc.Sprite).spriteFrame = e;
return [ 2, e ];
}
});
});
};
e.prototype._setSpriteFrameRotate = function(t, e) {
if (!t) return !1;
if (t.isRotated() != e) {
var o, i = t.getRect(), n = t.getTexture();
if (0 == n.isValid) return !1;
o = 0 == this._checkDynamicAtlas(n) ? new cc.Rect(0, 0, i.height, i.width) : new cc.Rect(i.x, i.y, i.height, i.width);
t.setRect(o);
var c = t.getOriginalSize(), a = cc.size(c.height, c.width);
t.setOriginalSize(a);
t.setRotated(e);
return !0;
}
return !1;
};
e.prototype._checkDynamicAtlas = function(t) {
var e = cc.dynamicAtlasManager;
return 0 != e.enabled && t instanceof cc.RenderTexture && t.width == e.textureSize && t.height == e.textureSize;
};
e.DirType = r;
c([ h ], e.prototype, "_originalDir", void 0);
c([ h({
type: cc.Enum(r),
tooltip: "原始扑克牌纹理的方向"
}) ], e.prototype, "originalDirType", null);
c([ h ], e.prototype, "_dirType", void 0);
c([ h({
type: cc.Enum(r),
tooltip: "搓牌时扑克牌纹理的方向"
}) ], e.prototype, "dirType", null);
c([ h ], e.prototype, "_cardSize", void 0);
c([ h({
type: cc.Size,
tooltip: "设置扑克牌的大小"
}) ], e.prototype, "cardSize", null);
c([ h({
type: cc.Mask,
readonly: !0
}) ], e.prototype, "mask", void 0);
c([ h({
type: cc.Node,
readonly: !0
}) ], e.prototype, "cardBack", void 0);
c([ h({
type: cc.Node,
readonly: !0
}) ], e.prototype, "cardFace", void 0);
c([ h({
type: cc.Mask,
readonly: !0
}) ], e.prototype, "shadowMask", void 0);
c([ h({
type: cc.Node,
readonly: !0
}) ], e.prototype, "shadow", void 0);
c([ h({
type: cc.Node,
readonly: !0
}) ], e.prototype, "finger1", void 0);
c([ h({
type: cc.Node,
readonly: !0
}) ], e.prototype, "finger2", void 0);
return c([ u ], e);
}(cc.Component);
o.default = d;
cc._RF.pop();
}, {} ],
PlayView: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "da501sIZJVKq4MRFN7jiSKg", "PlayView");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MPlay = void 0;
var c = t("../../common/MyAnimation"), a = t("../../units/Tool"), s = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.m_cache = [];
return e;
}
e.prototype.getPlayNum = function() {
return this.m_cache.length;
};
e.prototype.getPlayInfoFromIndex = function(t) {
return t > this.m_cache.length - 1 ? null : this.m_cache[t];
};
e.prototype.getForeach = function(t) {
this.m_cache.forEach(function(e, o) {
t(e.tittle, e.contentUrl, o);
});
};
e.prototype.requestPlayData = function(t) {
void 0 === t && (t = null);
this.m_cache.push({
tittle: "测试",
contentUrl: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2865588960,3182946800&fm=26&gp=0.jpg"
});
this.m_cache.push({
tittle: "数据",
contentUrl: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2549460017,2289431805&fm=26&gp=0.jpg"
});
this.m_cache.push({
tittle: "Other",
contentUrl: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1526579720,3267137196&fm=26&gp=0.jpg"
});
t();
};
return e;
}(c.default);
o.MPlay = s;
var r = function(t) {
n(e, t);
function e(e, o) {
var i = t.call(this) || this;
i.node = e;
i.m_toast = cc.find("common/toast", i.node);
i.m_curentKey = -1;
i.m_root = cc.find("popup/play", i.node);
i.m_mask = cc.find("popup/mask", i.node);
i.m_noneData = cc.find("popup/play/layout/nonedata", i.node);
i.m_chooseLayout = cc.find("popup/play/layout/choose/layout", i.node).children;
i.m_chooseRoot = cc.find("popup/play/layout/choose", i.node);
i.m_scrollviewRoot = cc.find("popup/play/layout/scrollview", i.node);
i.m_viewSprite = cc.find("popup/play/layout/scrollview/view/content/item", i.node);
i.i_close = cc.find("popup/play/button_close", i.node);
i.m_chooseRoot.getChildByName("layout").removeAllChildren();
i.p_buttonPrefab = o;
i.m_viewSprite.getComponent(cc.Sprite).spriteFrame = null;
i.m_root.active = !1;
return i;
}
e.prototype.setLeftButtonInfo = function(t, e) {
t.getChildByName("value").getComponent(cc.Label).string = e;
t.getChildByName("bg").getChildByName("value").getComponent(cc.Label).string = e;
};
e.prototype.setView = function() {
var t = this;
this.getForeach(function(e) {
var o = cc.instantiate(t.p_buttonPrefab);
t.setLeftButtonInfo(o, e);
t.m_chooseRoot.getChildByName("layout").addChild(o);
});
};
e.prototype.show = function() {
this.m_chooseRoot.active = this.m_scrollviewRoot.active = !(this.m_noneData.active = 0 === this.getPlayNum());
this.popupOpenScaleXY(this.m_root, this.m_mask);
this.UpdateView(0 == this.getPlayNum() ? -1 : 0);
this.addEvent();
};
e.prototype.hide = function() {
var t = this;
this.popupCloseScaleXY(this.m_root, this.m_mask, function() {
t.hideEvent();
t.m_curentKey = -1;
t.m_viewSprite.getComponent(cc.Sprite).spriteFrame = null;
});
};
e.prototype.UpdateView = function(t) {
var e = this;
if (-1 !== t && t !== this.m_curentKey) {
this.m_curentKey = t;
this.m_viewSprite.parent.parent.parent.getComponent(cc.ScrollView).scrollToTop();
this.m_viewSprite.getComponent(cc.Sprite).spriteFrame = null;
this.m_chooseLayout.forEach(function(o, i) {
o.getChildByName("value").active = !(i === t);
o.getChildByName("bg").active = i === t;
t === i && a.default.getInstance().LoadImageRemote(e.m_viewSprite, e.getPlayInfoFromIndex(i).contentUrl);
}, this);
}
};
e.prototype.addEvent = function() {
var t = this;
this.i_close.on("touchend", function() {
t.hide();
}, this);
this.m_chooseLayout.forEach(function(e, o) {
e.on("touchend", function() {
t.UpdateView(o);
}, t);
});
};
e.prototype.hideEvent = function() {
this.i_close.off("touchend");
this.m_chooseLayout.forEach(function(t) {
t.off("touchend");
});
};
e.prototype.start = function() {
this.requestPlayData(this.setView.bind(this));
};
e.prototype.onDestory = function() {};
return e;
}(s);
o.default = r;
cc._RF.pop();
}, {
"../../common/MyAnimation": "MyAnimation",
"../../units/Tool": "Tool"
} ],
PlayerGold: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "9b0237/Nu9IgpI7LspOvtS1", "PlayerGold");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("../common/GoldChange"), a = t("../common/MyAnimation"), s = t("../common/NodePool"), r = t("../common/SceneManager"), l = t("../units/AudioManager"), u = t("../units/Tool"), h = function(t) {
n(e, t);
function e(e, o, i) {
var n = t.call(this) || this;
n.minBet = o;
n.maxBet = i;
n.m_betBase = e;
n.m_betBaseChild = [];
return n;
}
e.prototype.getCreateNum = function(t) {
return t - this.minBet == 0 ? 1 : Math.ceil((t - this.minBet) / (this.maxBet - this.minBet) * 10);
};
e.prototype.getBackNum = function(t, e) {
var o = this.m_allCount - Math.floor(this.m_allCount / t) * t;
return e ? Math.floor(this.m_allCount / t) + o : Math.floor(this.m_allCount / t);
};
e.prototype.setAllCount = function() {
var t = this;
setTimeout(function() {
if ("game_sg" === r.default.getInstance().getSceneName() && cc.isValid(t.m_betBase)) {
t.m_allCount = t.m_betBase.children.length;
t.m_betBaseChild = [];
for (var e = 0; e < t.m_allCount; ++e) t.m_betBaseChild[e] = t.m_betBase.children[e];
}
}, 1500);
};
e.prototype.showAddGold = function(t, e) {
setTimeout(function() {
"game_sg" === r.default.getInstance().getSceneName() && cc.isValid(t) && (t.getChildByName("addgold").getComponent(c.default).string = e);
}, 1e3);
};
e.prototype.getPos = function(t, e, o) {
var i = o * Math.PI / 180;
return new cc.Vec2(t.x + e * Math.cos(i), t.y + e * Math.sin(i));
};
e.prototype.playBetAnim = function(t, e) {
var o = this;
setTimeout(function() {
"game_sg" === r.default.getInstance().getSceneName() && l.default.getInstance().playEffectFromLocal(EFF_CODE.EFF_SG_GOLD_ADD, !1);
}, 800);
t.getChildByName("bet").getChildByName("value").getComponent(cc.Label).string = String(e);
var i = t.getChildByName("gold"), n = this.getCreateNum(e);
console.log("add", t, n);
for (var c = u.default.getInstance().randomAccess(-100, 100), a = function() {
var t = s.default.getInstance().getNodeFromPool("SgGold");
t.active = !0;
t.parent = i;
t.position = new cc.Vec3(0, 0, 0);
var e = h.getPos(new cc.Vec2(0, 0), u.default.getInstance().randomAccess(-40, 40), u.default.getInstance().randomAccess(0, 360)), n = h.m_betBase.parent.convertToWorldSpaceAR(h.m_betBase.position), a = i.convertToNodeSpaceAR(n);
a.x += e.x + c;
a.y += e.y;
h.RunBetAnim(t, e, new cc.Vec2(a.x, a.y), function() {
var e = t.parent.convertToWorldSpaceAR(a), i = o.m_betBase.convertToNodeSpaceAR(e);
t.parent = o.m_betBase;
t.position = i;
});
}, h = this, d = 0; d < n; ++d) a();
};
e.prototype.playBetAnimBack = function(t, e, o) {
var i = t.getChildByName("avatar").getChildByName("gold"), n = this.getBackNum(e, o);
console.log(this.m_betBaseChild.length);
console.log("bofang", t, n);
for (var c = function() {
var t = a.m_betBaseChild.shift(), e = a.getPos(new cc.Vec2(0, 0), u.default.getInstance().randomAccess(-20, 20), u.default.getInstance().randomAccess(0, 360)), o = i.parent.convertToWorldSpaceAR(i.position), n = a.m_betBase.convertToNodeSpaceAR(o);
n.x += e.x;
n.y += e.y;
a.RunBetAnim(t, e, new cc.Vec2(n.x, n.y), function() {
setTimeout(function() {
cc.isValid(t) && t.destroy();
}, 1e3);
});
}, a = this, s = 0; s < n; ++s) c();
};
return e;
}(a.default);
o.default = h;
cc._RF.pop();
}, {
"../common/GoldChange": "GoldChange",
"../common/MyAnimation": "MyAnimation",
"../common/NodePool": "NodePool",
"../common/SceneManager": "SceneManager",
"../units/AudioManager": "AudioManager",
"../units/Tool": "Tool"
} ],
PlayerInfo: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "10c86NkrD5BVovywQ8ru1B2", "PlayerInfo");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MPlayerInfo = void 0;
var c = t("../common/CountDown"), a = t("../common/MyAnimation"), s = t("../units/Tool"), r = t("../units/UserConfig"), l = function(t) {
n(e, t);
function e() {
return t.call(this) || this;
}
e.prototype.HttpReauest = function(t) {
this.sendAnimation(t);
};
e.prototype.getMyInfo = function() {
return r.default.getInstance().getUserInfo();
};
e.prototype.sendAnimation = function() {};
return e;
}(a.default);
o.MPlayerInfo = l;
var u = function(t) {
n(e, t);
function e(e, o) {
var i = t.call(this) || this;
i.node = e;
i.m_animList = cc.find("playerinfo/layout/animation", i.node).children;
i.m_layoutInfo = cc.find("playerinfo/layout/info", i.node);
i.m_layoutAnim = cc.find("playerinfo/layout/animation", i.node);
i.m_root = cc.find("playerinfo", i.node);
i.m_mask = cc.find("mask", i.node);
i.i_close = cc.find("playerinfo/button_close", i.node);
i.c_nickname = cc.find("playerinfo/layout/info/nickname", i.node).getComponent(cc.Label);
i.c_avatar = cc.find("playerinfo/layout/info/avatar/mask/avatar", i.node);
i.c_id = cc.find("playerinfo/layout/info/id", i.node).getComponent(cc.Label);
i.c_balance = cc.find("playerinfo/layout/info/balance", i.node).getComponent(cc.Label);
i.m_root.active = !1;
i.cl_Player = o;
return i;
}
e.prototype.show = function(t) {
if (t) {
this.m_receiver = t;
this.m_layoutInfo.active = !0;
this.m_layoutAnim.active = this.m_receiver.id !== this.getMyInfo().id;
this.c_balance.string = "余额: " + String(this.m_receiver.gold);
this.c_id.string = "玩家ID: " + String(this.m_receiver.id);
this.c_nickname.string = "昵称: " + String(this.m_receiver.nickname);
s.default.getInstance().LoadImageRemote(this.c_avatar, this.m_receiver.avatar, new cc.Vec2(128, 128));
this.node.active = !0;
this.popupOpenScaleXY(this.m_root, this.m_mask, this.addEvent.bind(this));
this.m_animList.forEach(function(t) {
t.getChildByName("mask").getComponent(c.default).activeOn();
});
}
};
e.prototype.hide = function() {
this.popupCloseScaleXY(this.m_root, this.m_mask, this.hideEvent.bind(this));
this.m_animList.forEach(function(t) {
t.getChildByName("mask").getComponent(c.default).activeOff();
});
this.m_receiver = null;
};
e.prototype.addEvent = function() {
var t = this;
this.i_close.on("touchend", this.hide.bind(this));
this.m_animList.forEach(function(e, o) {
e.getChildByName("icon").on("touchend", function() {
if (e.getChildByName("mask").getComponent(c.default).countDownFinish) {
t.cl_Player.sendAnimation({
sendid: String(t.getMyInfo().id),
receive: t.m_receiver.id,
animationid: o
});
t.allAnimHide(1e4);
t.hide();
}
});
}, this);
};
e.prototype.allAnimHide = function(t) {
this.m_animList.forEach(function(e) {
e.getChildByName("mask").getComponent(c.default).show(t);
});
};
e.prototype.hideEvent = function() {
this.i_close.off("touchend");
this.m_animList.forEach(function(t) {
t.getChildByName("icon").off("touchend");
}, this);
};
e.prototype.sendAnimation = function(t) {
this.cl_Player.sendAnimation(t);
};
return e;
}(l);
o.default = u;
cc._RF.pop();
}, {
"../common/CountDown": "CountDown",
"../common/MyAnimation": "MyAnimation",
"../units/Tool": "Tool",
"../units/UserConfig": "UserConfig"
} ],
Player: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "507b0vkhyhI66uJoG7pREgZ", "Player");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MPlayer = void 0;
var c = t("../common/AtlasLib"), a = t("../common/MyAnimation"), s = t("../common/SceneManager"), r = t("../units/AudioManager"), l = t("../units/Tool"), u = t("../units/UserConfig"), h = t("./BetManager"), d = t("./CardLib"), p = t("./OpenCard"), f = t("./PlayerGold"), m = t("./PlayerInfo"), _ = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.m_cache = [];
var o = e.getMyInfo();
e.m_cache.push({
charid: 0,
id: o.id,
bet: 0,
gold: o.gold,
avatar: o.avatar,
nickname: o.nickname,
gender: 0
});
e.m_playrNum = l.default.getInstance().randomAccess(4, 10);
e.timer = setInterval(function() {
if (e.m_cache.length != e.m_playrNum) {
e.m_cache.push({
charid: e.m_cache.length,
id: l.default.getInstance().randomNumber(5),
bet: 0,
gold: l.default.getInstance().randomAccess(4e3, 2e5),
avatar: o.avatar,
nickname: l.default.getInstance().getRandomName(3),
gender: 0
});
e.updateView();
} else {
clearInterval(e.timer);
e.Startbet();
}
}, 2e3);
return e;
}
e.prototype.getMyInfo = function() {
return u.default.getInstance().getUserInfo();
};
e.prototype.WebsocketData = function() {
this.updateView();
};
e.prototype.getUserInfoFromIndex = function(t) {
return this.m_cache && this.m_cache[t] ? this.m_cache[t] : null;
};
e.prototype.getSetDownIsFinish = function() {
return this.m_cache.length === this.m_playrNum;
};
e.prototype.getplayrNum = function() {
return this.m_cache.length;
};
e.prototype.getUsesIndexFromUserID = function(t) {
if (this.m_cache) for (var e = 0; e < this.m_cache.length; ++e) if (this.m_cache[e].id === t) return e;
return null;
};
e.prototype.Startbet = function() {};
e.prototype.updateView = function() {};
e.prototype.getTableInfo = function() {
return u.default.getInstance().getTableInfo();
};
return e;
}(a.default);
o.MPlayer = _;
var g = function(t) {
n(e, t);
function e(e, o) {
var i = t.call(this) || this;
i.node = e;
i.m_playerList = cc.find("player", i.node).children;
i.m_BuRoot = cc.find("ctrlbutton", i.node);
i.i_openCardBu = cc.find("ctrlbutton/opencard", i.node);
i.i_peekCardBu = cc.find("ctrlbutton/peekcard", i.node);
i.cl_cardLib = cc.find("state/cardLib", i.node).getComponent(d.default);
i.cl_playerInfo = new m.default(cc.find("popup", i.node), i);
i.cl_playerGold = new f.default(cc.find("state/goldtarget", i.node), i.getTableInfo().min, i.getTableInfo().min + 1e3);
i.cl_openCard = new p.default(i.node);
i.m_prefab_anim = o;
i.c_state = cc.find("state/gamestate/value", i.node).getComponent(cc.Label);
i.cl_betManager = cc.find("bet", i.node).getComponent(h.default);
i.c_goldBase = cc.find("state/goldbase", i.node).getComponent(cc.Label);
i.m_BuRoot.active = !1;
i.cl_betManager.hide();
i.resetView();
i.updateView();
i.addEvent();
return i;
}
e.prototype.sendAnimation = function(t) {
var e;
switch (t.animationid) {
case 0:
e = this.m_prefab_anim.hand;
break;

case 1:
e = this.m_prefab_anim.tomato;
break;

case 2:
e = this.m_prefab_anim.flower;
break;

case 3:
e = this.m_prefab_anim.boom;
break;

case 4:
e = this.m_prefab_anim.water;
}
var o = cc.instantiate(e);
o.parent = this.m_playerList[0].parent;
var i = this.getPosFromUserid(this.getUsesIndexFromUserID(t.receive)), n = this.getPosFromUserid(this.getUsesIndexFromUserID(t.sendid));
this.RunAnimtation(o, n, i);
};
e.prototype.getPosFromUserid = function(t) {
var e = this.m_playerList[t].parent, o = this.m_playerList[t].getChildByName("avatar"), i = o.parent.convertToWorldSpaceAR(o.position);
return e.convertToNodeSpaceAR(i);
};
e.prototype.resetView = function() {
this.c_goldBase.string = "池底:0";
this.c_state.string = "等待玩家中...";
this.m_playerList.forEach(function(t) {
if ("player" === t.name.substr(0, 6)) {
var e = cc.find("avatar/name", t).getComponent(cc.Label), o = cc.find("avatar/gold", t).getComponent(cc.Label), i = cc.find("bet/value", t).getComponent(cc.Label), n = cc.find("avatar/avatar/image", t), c = cc.find("cardList", t), a = cc.find("type", t), s = cc.find("addgold", t);
e.string = "";
n.getComponent(cc.Sprite).spriteFrame = null;
o.string = String(0);
i.string = String(0);
c.removeAllChildren();
c.active = !0;
a.active = !1;
s.active = !1;
i.node.parent.active = !0;
}
});
};
e.prototype.Startbet = function() {
var t = this;
r.default.getInstance().playEffectFromLocal(EFF_CODE.EFF_SG_NEWGAME, !1);
this.BetCountDown(20);
this.m_playerList[0].getChildByName("bet").active = !1;
this.m_playerList[0].getChildByName("cardList").active = !1;
this.cl_betManager.show(this.getTableInfo().min, this.getTableInfo().max, this.getTableInfo().min + Math.floor((this.getTableInfo().max - this.getTableInfo().min) / 2), this.getBetValue.bind(this));
var e, o = [], i = [], n = [];
i.push(0);
for (var c = 1; c < this.getplayrNum(); ++c) {
o.push(c);
i.push(c);
}
for (c = 1; c < this.getplayrNum(); ++c) setTimeout(function() {
if ("game_sg" === s.default.getInstance().getSceneName()) {
var e = l.default.getInstance().randomAccess(0, o.length - 1);
t.cl_playerGold.playBetAnim(t.m_playerList[o[e]], t.getTableInfo().min + l.default.getInstance().randomAccess(0, 1e3));
o.splice(e, 1);
}
setTimeout(function() {
"game_sg" === s.default.getInstance().getSceneName() && t.calcGoldBase();
}, 300);
}, 18e3 * Math.random());
var a = l.default.getInstance().randomAccess(1, this.getplayrNum() - 1);
for (c = 0; c < a; ++c) {
var u = l.default.getInstance().randomAccess(0, i.length - 1);
n.push(i[u]);
i.splice(u, 1);
}
e = i;
console.log("win", n);
console.log("lose", e);
setTimeout(function() {
if ("game_sg" === s.default.getInstance().getSceneName()) {
r.default.getInstance().playEffectFromLocal(EFF_CODE.EFF_SG_GOLD_SUB, !1);
for (var o = 0; o < n.length; ++o) {
t.cl_playerGold.playBetAnimBack(t.m_playerList[n[o]], n.length, 0 === o);
t.cl_playerGold.showAddGold(t.m_playerList[n[o]], l.default.getInstance().randomAccess(500, 1e4));
}
for (o = 0; o < e.length; ++o) t.cl_playerGold.showAddGold(t.m_playerList[e[o]], l.default.getInstance().randomAccess(-1e4, 500));
}
setTimeout(function() {
"game_sg" === s.default.getInstance().getSceneName() && (t.c_goldBase.string = "池底:0");
}, 300);
}, 35e3);
};
e.prototype.calcGoldBase = function() {
var t = this, e = 0;
this.m_playerList.forEach(function(o, i) {
if ("player" === o.name.substr(0, 6) && o.active) {
t.getUserInfoFromIndex(i);
var n = cc.find("bet/value", o).getComponent(cc.Label);
e += Number(n.string);
t.c_goldBase.string = "池底:" + e;
}
});
};
e.prototype.getBetValue = function() {
var t = this;
setTimeout(function() {
"game_sg" === s.default.getInstance().getSceneName() && t.calcGoldBase();
}, 300);
this.m_playerList[0].getChildByName("bet").active = !0;
this.m_playerList[0].getChildByName("bet").getChildByName("value").getComponent(cc.Label).string = String(this.cl_betManager.betValue);
this.m_playerList[0].getChildByName("cardList").active = !0;
this.cl_playerGold.playBetAnim(this.m_playerList[0], this.cl_betManager.betValue);
this.cl_playerGold.setAllCount();
};
e.prototype.shuffleCard = function() {
this.cardArr = [];
for (var t = [], e = 0; e < 54; ++e) t.push(e);
for (e = 0; e < 3; ++e) {
var o = l.default.getInstance().randomAccess(0, t.length - 1);
this.cardArr.push(t[o]);
t.splice(o, 1);
}
this.cl_playerGold.setAllCount();
this.cl_betManager.hide();
this.c_state.string = "洗牌中...";
var i = [];
for (e = 0; e < this.getplayrNum(); ++e) i.push(this.m_playerList[e]);
this.cl_cardLib.shuffleCard(i, 3);
};
e.prototype.BetCountDown = function(t, e) {
var o = this;
void 0 === e && (e = "下注倒计时 ");
this.c_state.string = e + t + " 秒";
this.timer = setInterval(function() {
o.c_state.string = e + t + " 秒";
if (0 === t) {
clearInterval(o.timer);
o.timer = null;
if ("下注倒计时 " === e) {
o.BetCountDown(13, "金币回收倒计时 ");
o.shuffleCard();
} else "金币回收倒计时 " === e ? o.BetCountDown(7, "开牌按钮激活剩余时间 ") : "开牌按钮激活剩余时间 " === e && o.showButton(CTRLBUTTON.OPENCARD);
}
t--;
}, 1e3);
};
e.prototype.openCardFinish = function(t) {
var e = this;
if (Array.isArray(t)) {
console.log(this.m_playerList[0].getChildByName("cardList").children);
for (var o = function(o) {
setTimeout(function() {
if ("game_sg" === s.default.getInstance().getSceneName()) {
var i = e.m_playerList[0].getChildByName("cardList").children[o];
i.getComponent("switchsp").updateFrame(1, c.default.getInstance().getSpriteFrame("card", "x" + t[o]));
e.RunOpenCard(i);
}
}, 270 + 500 * o);
}, i = 0; i < t.length; ++i) o(i);
} else {
this.cl_openCard.hide();
this.m_playerList[0].getChildByName("cardList").children[2].getComponent("switchsp").updateFrame(1, c.default.getInstance().getSpriteFrame("card", "x" + t));
this.RunOpenCard(this.m_playerList[0].getChildByName("cardList").children[2]);
}
};
e.prototype.hideButton = function() {
this.i_openCardBu.off("touchend");
this.i_peekCardBu.off("touchend");
this.popupCloseScaleXY(this.m_BuRoot, null);
};
e.prototype.showButton = function(t) {
console.log(t);
this.m_buttonCode = t;
if (t !== CTRLBUTTON.NONE) {
this.i_openCardBu.on("touchend", this.openCard.bind(this));
this.i_openCardBu.getComponent(cc.Button).interactable = !0;
this.i_openCardBu.getComponent("switchsp").setSpriteFrame(CTRLBUTTON.OPENCARD);
switch (this.m_buttonCode) {
case CTRLBUTTON.OPENCARD:
this.i_peekCardBu.on("touchend", this.peekCard.bind(this));
this.i_openCardBu.getComponent(cc.Button).interactable = !0;
break;

default:
this.i_openCardBu.getComponent(cc.Button).interactable = !1;
}
this.popupOpenScaleXY(this.m_BuRoot, null);
} else {
console.log("finish");
this.hideButton();
}
};
e.prototype.updateView = function() {
var t = this;
this.m_playerList.forEach(function(e, o) {
if ("player" === e.name.substr(0, 6)) {
var i = t.getUserInfoFromIndex(o);
if (i) {
var n = cc.find("avatar/name", e).getComponent(cc.Label), c = cc.find("avatar/gold", e).getComponent(cc.Label), a = cc.find("bet/value", e).getComponent(cc.Label), s = cc.find("avatar/avatar/image", e);
n.string = i.nickname;
c.string = l.default.getInstance().forMat(i.gold, 1e4);
a.string = String(i.bet);
l.default.getInstance().LoadImageRemote(s, i.avatar, new cc.Vec2(65, 65));
e.active = !0;
} else e.active = !1;
}
});
};
e.prototype.openCard = function() {
console.log("开牌");
this.showButton(CTRLBUTTON.NONE);
this.openCardFinish(this.cardArr);
};
e.prototype.peekCard = function() {
var t = this;
console.log("搓牌");
this.showButton(CTRLBUTTON.NONE);
this.openCardFinish([ this.cardArr[0], this.cardArr[1] ]);
this.cl_openCard.show(this.cardArr, function() {
t.openCardFinish(t.cardArr[2]);
});
};
e.prototype.addEvent = function() {
var t = this;
this.m_playerList.forEach(function(e, o) {
e.getChildByName("avatar").on("touchend", function() {
t.cl_playerInfo.show(t.getUserInfoFromIndex(o));
}, t);
});
};
e.prototype.onMessage = function(t) {
this.WebsocketData(t);
};
e.prototype.start = function() {};
e.prototype.onDestroy = function() {
for (var t = setTimeout(";"), e = 0; e < t; e++) clearTimeout(e);
if (this.timer) {
clearInterval(this.timer);
this.timer = null;
}
};
return e;
}(_);
o.default = g;
cc._RF.pop();
}, {
"../common/AtlasLib": "AtlasLib",
"../common/MyAnimation": "MyAnimation",
"../common/SceneManager": "SceneManager",
"../units/AudioManager": "AudioManager",
"../units/Tool": "Tool",
"../units/UserConfig": "UserConfig",
"./BetManager": "BetManager",
"./CardLib": "CardLib",
"./OpenCard": "OpenCard",
"./PlayerGold": "PlayerGold",
"./PlayerInfo": "PlayerInfo"
} ],
RealNameView: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "6b78azbbFdKWYtZT8gSORBG", "RealNameView");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MRealName = void 0;
var c = t("../../common/MyAnimation"), a = t("../../common/Toast"), s = t("../../units/Tool"), r = t("../../units/UserConfig"), l = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.realNameArr = [ "实名认证失败!", "实名认证成功!", "真实姓名不能为空", "身份证号不能为空!", "请输入正确的身份证号!", "输入信息无法被验证,请稍后再试或联系客服" ];
e.S_realName = BUTTON_STATE.ON;
return e;
}
e.prototype.getRealNameButtonState = function() {
return this.S_realName;
};
e.prototype.getRealNameInfo = function() {
var t = r.default.getInstance().getRealNameInfo();
return t.idnumber === t.realname && "" === t.realname ? null : r.default.getInstance().getRealNameInfo();
};
e.prototype.RequestRealName = function(t, e) {
if (0 === t.realname.length) return REALNAME_RESULT.REALNAME_LENGTH_NONE;
if (0 === t.idnumber.length) return REALNAME_RESULT.ID_LENGTH_NONE;
if (!s.default.getInstance().isIdCardNumber(t.idnumber)) return REALNAME_RESULT.ID_CHECK_ERR;
r.default.getInstance().setRealNameInfo(t);
e();
return REALNAME_RESULT.SUCCESS;
};
return e;
}(c.default);
o.MRealName = l;
var u = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_toast = cc.find("common/toast", o.node);
o.m_mask = cc.find("popup/realname/mask", o.node);
o.m_root = cc.find("popup/realname/root", o.node);
o.m_mainRoot = cc.find("popup/realname", o.node);
o.m_inputRoot = cc.find("popup/realname/root/input", o.node);
o.m_showRoot = cc.find("popup/realname/root/show", o.node);
o.i_cancle = cc.find("popup/realname/root/button_layout/button_cancle", o.node);
o.i_confirm = cc.find("popup/realname/root/button_layout/button_confirm", o.node);
o.c_inputRealName = cc.find("popup/realname/root/input/input_realname/input", o.node).getComponent(cc.EditBox);
o.c_inputIdNumber = cc.find("popup/realname/root/input/input_idcardnumber/input", o.node).getComponent(cc.EditBox);
o.c_realName = cc.find("popup/realname/root/show/realname", o.node).getComponent(cc.Label);
o.c_idNumber = cc.find("popup/realname/root/show/idcardnumber", o.node).getComponent(cc.Label);
o.m_mainRoot.active = !1;
return o;
}
Object.defineProperty(e.prototype, "realNameParam", {
get: function() {
return {
realname: this.c_inputRealName.string,
idnumber: this.c_inputIdNumber.string
};
},
enumerable: !1,
configurable: !0
});
e.prototype.click_confirm = function() {
switch (this.getRealNameButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
var t = this.RequestRealName(this.realNameParam, this.setView.bind(this));
a.default.getInstance().show(this.realNameArr[t], this.m_toast);
}
};
e.prototype.setView = function() {
var t = this.getRealNameInfo();
if (t) {
this.m_inputRoot.active = !(this.m_showRoot.active = !0);
this.c_realName.string = "真实姓名: " + t.realname;
this.c_idNumber.string = "身份证号: " + t.idnumber.substr(0, 3) + "***********" + t.idnumber.substr(t.idnumber.length - 4);
this.i_cancle.active = !(this.i_confirm.active = !1);
} else {
this.m_inputRoot.active = !(this.m_showRoot.active = !1);
this.c_inputIdNumber.string = "";
this.c_inputRealName.string = "";
this.i_cancle.active = this.i_confirm.active = !0;
}
};
e.prototype.show = function() {
this.setView();
this.popupOpenScaleY(this.m_root, this.m_mask, this.addEvent.bind(this));
};
e.prototype.hide = function() {
this.popupCloseScaleY(this.m_root, this.m_mask, this.hideEvent.bind(this));
};
e.prototype.hideEvent = function() {
this.i_cancle.off("touchend");
this.i_confirm.off("touchend");
};
e.prototype.addEvent = function() {
this.i_cancle.on("touchend", this.hide.bind(this));
this.i_confirm.on("touchend", this.click_confirm.bind(this));
};
e.prototype.start = function() {};
e.prototype.onDestory = function() {};
return e;
}(l);
o.default = u;
cc._RF.pop();
}, {
"../../common/MyAnimation": "MyAnimation",
"../../common/Toast": "Toast",
"../../units/Tool": "Tool",
"../../units/UserConfig": "UserConfig"
} ],
RecordView: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "f4feaRcZYJMPJhDMMEr6YaH", "RecordView");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MRecord = void 0;
var c = t("../../common/MyAnimation"), a = t("../../scrollviewData/SanGongData"), s = t("../../units/Tool"), r = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.m_pageShowNum = 20;
e.payTypeArr = [ "充值", "提现", "转账", "游戏下注", "游戏输赢", "系统加钱", "系统扣钱", "退还下注" ];
e.init();
return e;
}
Object.defineProperty(e.prototype, "curentPage", {
get: function() {
return this._curentPage;
},
set: function(t) {
t > this.totalCount ? cc.error("设置的当前页数超过总页数,该设置无法生效") : this._curentPage = t;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "totalCount", {
get: function() {
return this._totalCount;
},
set: function(t) {
this._totalCount = t;
},
enumerable: !1,
configurable: !0
});
e.prototype.getDataFromIndex = function(t) {
return t > this.m_cache.length - 1 ? null : this.m_cache[t];
};
e.prototype.init = function() {
this.curentPage = 0;
this.totalCount = 0;
this.m_cache = [];
};
e.prototype.addData = function(t) {
var e = this;
t && t.forEach(function(t) {
e.m_cache.push(t);
});
};
e.prototype.RequestMoneyFlowData = function(t) {
var e = {
page: this.curentPage + 1,
limit: this.m_pageShowNum
};
this.totalCount = 10;
var o = e.page * e.limit > this.totalCount ? this.totalCount % this.m_pageShowNum : this.m_pageShowNum;
console.log(e.page, e.limit, this.totalCount, o);
for (var i = 0; i < o; i++) {
var n = Math.ceil(1e5 * Math.random()), c = 10 * Math.random() > 5 ? Math.ceil(Math.random() * (n / .4)) : -Math.ceil(Math.random() * (n / .4)), a = n + c, r = {
orderid: (Date.now() + 8e3 * (this.curentPage * this.m_pageShowNum + i)).toString(16) + (Date.now() + 8e3 * (this.curentPage * this.m_pageShowNum + i)).toString(16),
before: n,
amount: c,
after: a,
type: Math.ceil(7 * Math.random()),
date: s.default.getInstance().getCurentTime(Date.now() + 8e3 * (this.curentPage * this.m_pageShowNum + i))
};
this.m_cache.push(r);
}
this.curentPage += 1;
t(this.m_cache.length);
};
return e;
}(c.default);
o.MRecord = r;
var l = function(t) {
n(e, t);
function e(e, o) {
var i = t.call(this) || this;
i.node = e;
i.m_toast = cc.find("common/toast", i.node);
i.m_mainNode = cc.find("popup/record", i.node);
i.m_mask = cc.find("popup/mask", i.node);
i.m_root = cc.find("popup/record/base", i.node);
i.m_itemLayout = cc.find("popup/record/base/scrollview/view/content", i.node);
i.m_noneData = cc.find("popup/record/base/none", i.node);
i.m_scrollview = cc.find("popup/record/base/scrollview", i.node);
i.i_close = cc.find("popup/record/base/button_close", i.node);
i.c_list = cc.find("popup/record/base/scrollview", i.node).getComponent("List");
i.m_prefab = o;
i.p_renderData = new a.default(cc.find("popup/record", i.node));
i.m_mainNode.active = !0;
i.m_root.active = !0;
return i;
}
e.prototype.removeAllChild = function(t) {
var e = this;
this.m_itemLayout.children.forEach(function(t) {
e.c_list._delSingleItem(t);
});
this.m_itemLayout.removeAllChildren();
this.c_list.PrefabIndex = t;
this.init();
};
e.prototype.show = function() {
this.m_mainNode.active = !0;
this.removeAllChild(0);
this.c_list.scrollTo(0);
this.RequestMoneyFlowData(this.addItemNumber.bind(this));
this.popupOpenScaleXY(this.m_root, this.m_mask, this.addEvent.bind(this));
};
e.prototype.addItemNumber = function(t) {
this.c_list.numItems = t;
this.m_noneData.active = 0 === t;
};
e.prototype.scrollToButtom = function() {
Math.ceil(this.totalCount / this.m_pageShowNum) !== this.curentPage && 0 !== this.totalCount && this.RequestMoneyFlowData(this.addItemNumber.bind(this));
};
e.prototype.hide = function() {
this.init();
this.popupCloseScaleXY(this.m_root, this.m_mask, this.hideEvent.bind(this));
};
e.prototype.hideEvent = function() {
this.i_close.off("touchend");
this.m_scrollview.off("scroll-to-bottom");
this.m_mainNode.active = !1;
};
e.prototype.addEvent = function() {
this.i_close.on("touchend", this.hide.bind(this));
this.m_scrollview.on("scroll-to-bottom", this.scrollToButtom.bind(this));
};
e.prototype.start = function() {
this.m_root.active = !1;
this.m_mainNode.active = !1;
};
e.prototype.clickMainItemFunction = function(t, e, o) {
this.p_renderData.ClickMain(t, e, o, this.getDataFromIndex(e));
};
e.prototype.clickPopupItemFunction = function(t, e, o) {
this.p_renderData.ClickPopup(t, e, o, this.getDataFromIndex(e));
};
e.prototype.RenderMainFunction = function(t, e) {
this.p_renderData.RenderMain(t, e, this.getDataFromIndex(e));
};
e.prototype.RenderPopupFunction = function(t, e) {
this.p_renderData.RenderPopup(t, e, this.getDataFromIndex(e));
};
e.prototype.onDestroy = function() {};
return e;
}(r);
o.default = l;
cc._RF.pop();
}, {
"../../common/MyAnimation": "MyAnimation",
"../../scrollviewData/SanGongData": "SanGongData",
"../../units/Tool": "Tool"
} ],
Regist: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "011dbY+XVtLJpGdzaqg+y0w", "Regist");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("../common/MyAnimation"), a = t("../common/TimerStruct"), s = t("../common/Toast"), r = t("../units/Tool"), l = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_root = cc.find("popup/regist", o.node);
o.m_mask = cc.find("popup/mask", o.node);
o.m_toast = cc.find("common/toast", o.node);
o.i_cancle = cc.find("popup/regist/button_cancle", o.node);
o.i_confirm = cc.find("popup/regist/button_confirm", o.node);
o.i_getVerify = cc.find("popup/regist/getverify", o.node);
o.c_inputInvateCode = cc.find("popup/regist/input_invatecode/input", o.node).getComponent(cc.EditBox);
o.c_inputPhone = cc.find("popup/regist/input_phone/input", o.node).getComponent(cc.EditBox);
o.c_inputVerify = cc.find("popup/regist/input_verify/input", o.node).getComponent(cc.EditBox);
o.c_inputNewPd = cc.find("popup/regist/input_newpd/input", o.node).getComponent(cc.EditBox);
o.c_inputRepeatPd = cc.find("popup/regist/input_repeatpd/input", o.node).getComponent(cc.EditBox);
o.reset();
return o;
}
Object.defineProperty(e.prototype, "registParam", {
get: function() {
return {
invateCode: this.c_inputInvateCode.string,
phone: this.c_inputPhone.string,
verify: this.c_inputVerify.string,
newPd: this.c_inputNewPd.string,
repeatPd: this.c_inputRepeatPd.string
};
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "verifyPhoneParam", {
get: function() {
return {
phone: this.c_inputPhone.string
};
},
enumerable: !1,
configurable: !0
});
e.prototype.reset = function() {
this.m_root.active = !1;
this.m_root.parent.active = !0;
this.m_mask.active = !1;
};
e.prototype.show = function() {
this.m_verifyCoutDown && this.m_verifyCoutDown.getSurPlus() > 0 && this.setVerifyCountDown(this.m_verifyCoutDown.getSurPlus());
this.popupOpenScaleXY(this.m_root, this.m_mask);
this.addEvent();
};
e.prototype.hide = function() {
var t = this;
this.popupCloseScaleXY(this.m_root, this.m_mask, function() {
t.c_inputInvateCode.string = "";
t.c_inputPhone.string = "";
t.c_inputVerify.string = "";
t.c_inputNewPd.string = "";
t.c_inputRepeatPd.string = "";
});
this.closeEvent();
};
e.prototype.requestForgetPd = function() {
0 !== this.registParam.invateCode.length ? 0 !== this.registParam.phone.length ? r.default.getInstance().isPhoneNumber(this.registParam.phone) ? 6 === this.registParam.verify.length ? this.registParam.newPd.length < 6 ? s.default.getInstance().show("新密码长度限制6--16位", this.m_toast) : 0 !== this.registParam.repeatPd.length ? this.registParam.newPd === this.registParam.repeatPd ? s.default.getInstance().show("ERRORCODE:500 请求服务器失败!", this.m_toast) : s.default.getInstance().show("两次输入的密码不相同,请确认", this.m_toast) : s.default.getInstance().show("再次输入新密码不能为空", this.m_toast) : s.default.getInstance().show("验证码长度应为6位", this.m_toast) : s.default.getInstance().show("请输入正确的手机号", this.m_toast) : s.default.getInstance().show("手机号不能为空", this.m_toast) : s.default.getInstance().show("邀请码不能为空", this.m_toast);
};
e.prototype.requestVerify = function() {
var t = this;
if ("获取验证码" !== this.i_getVerify.getComponent(cc.Label).string) return !1;
this.m_verifyCoutDown = new a.default(60);
var e = this.m_verifyCoutDown.coutDown;
this.i_getVerify.getComponent(cc.Label).string = e + "s";
this.t_timerVerfyCountDown = setInterval(function() {
if (0 == --e) {
t.i_getVerify.getComponent(cc.Label).string = "获取验证码";
t.m_verifyCoutDown = null;
clearInterval(t.t_timerVerfyCountDown);
t.t_timerVerfyCountDown = null;
} else t.i_getVerify.getComponent(cc.Label).string = e + "s";
}, 1e3);
return !0;
};
e.prototype.setVerifyCountDown = function(t) {
var e = this, o = t;
this.i_getVerify.getComponent(cc.Label).string = o + "s";
if (this.t_timerVerfyCountDown) {
clearInterval(this.t_timerVerfyCountDown);
this.t_timerVerfyCountDown = null;
}
this.t_timerVerfyCountDown = setInterval(function() {
if (0 == --o) {
e.i_getVerify.getComponent(cc.Label).string = "获取验证码";
e.m_verifyCoutDown = null;
clearInterval(e.t_timerVerfyCountDown);
e.t_timerVerfyCountDown = null;
} else e.i_getVerify.getComponent(cc.Label).string = o + "s";
}, 1e3);
return !0;
};
e.prototype.addEvent = function() {
var t = this;
this.i_getVerify.on("touchend", function() {
r.default.getInstance().isPhoneNumber(t.verifyPhoneParam.phone) ? t.requestVerify() || s.default.getInstance().show("请在倒计时结束后获取验证码", t.m_toast) : s.default.getInstance().show("请输入正确的手机号", t.m_toast);
}, this);
this.i_confirm.on("touchend", function() {
t.requestForgetPd();
}, this);
this.i_cancle.on("touchend", function() {
t.hide();
}, this);
};
e.prototype.closeEvent = function() {
this.i_getVerify.off("touchend");
this.i_confirm.off("touchend");
this.i_cancle.off("touchend");
};
return e;
}(c.default);
o.default = l;
cc._RF.pop();
}, {
"../common/MyAnimation": "MyAnimation",
"../common/TimerStruct": "TimerStruct",
"../common/Toast": "Toast",
"../units/Tool": "Tool"
} ],
ResetPdView: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "a17f2raUmdHjowk1QIkTAHN", "ResetPdView");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MResetPd = void 0;
var c = t("../../common/MyAnimation"), a = t("../../common/SceneManager"), s = t("../../common/Toast"), r = t("../../units/UserConfig"), l = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.resetPdStateArr = [ "密码修改失败!", "输入密码不能为空!", "密码长度不正确,限制6-16位!", "确认新密码和新密码不一致!", "原密码不正确!", "密码修改成功,正在注销登录" ];
e.S_resetPd = BUTTON_STATE.ON;
return e;
}
e.prototype.getResetPdButtonState = function() {
return this.S_resetPd;
};
e.prototype.getUserInfo = function() {
return r.default.getInstance().getUserInfo();
};
e.prototype.RequestChangePd = function(t) {
if (0 === t.oldPd.length || 0 === t.newPd.length || 0 === t.confirmPd.length) return RESETPD_RESULT.PASSWORD_LENGTH_NONE;
if (t.oldPd.length < 6 || t.newPd.length < 6 || t.confirmPd.length < 6) return RESETPD_RESULT.PASSWORD_LENGTH_ERROR;
if (t.newPd !== t.confirmPd) return RESETPD_RESULT.PASSWORD_NO_SAME;
r.default.getInstance().setUserInfo({
pd: t.newPd
});
return RESETPD_RESULT.SUCCESS;
};
return e;
}(c.default);
o.MResetPd = l;
var u = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_toast = cc.find("common/toast", o.node);
o.m_mask = cc.find("popup/resetpd/mask", o.node);
o.m_root = cc.find("popup/resetpd/root", o.node);
o.m_mainRoot = cc.find("popup/resetpd", o.node);
o.i_cancle = cc.find("popup/resetpd/root/button_cancle", o.node);
o.i_confirm = cc.find("popup/resetpd/root/button_confirm", o.node);
o.c_inputOldPd = cc.find("popup/resetpd/root/input_oldpd/input", o.node).getComponent(cc.EditBox);
o.c_inputNewPd = cc.find("popup/resetpd/root/input_newpd/input", o.node).getComponent(cc.EditBox);
o.c_inputConfirmPd = cc.find("popup/resetpd/root/input_confirmpd/input", o.node).getComponent(cc.EditBox);
o.m_mainRoot.active = !1;
return o;
}
Object.defineProperty(e.prototype, "resetPdParam", {
get: function() {
return {
oldPd: this.c_inputOldPd.string,
newPd: this.c_inputNewPd.string,
confirmPd: this.c_inputConfirmPd.string
};
},
enumerable: !1,
configurable: !0
});
e.prototype.click_confirm = function() {
switch (this.getResetPdButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
var t = this.RequestChangePd(this.resetPdParam);
if (t === RESETPD_RESULT.SUCCESS) {
s.default.getInstance().show(this.resetPdStateArr[t], this.m_toast);
setTimeout(function() {
a.default.getInstance().loadScene("passport");
}, 1500);
} else s.default.getInstance().show(this.resetPdStateArr[t], this.m_toast);
}
};
e.prototype.show = function() {
this.c_inputConfirmPd.string = this.c_inputNewPd.string = this.c_inputOldPd.string = "";
this.popupOpenScaleY(this.m_root, this.m_mask, this.addEvent.bind(this));
};
e.prototype.hide = function() {
this.popupCloseScaleY(this.m_root, this.m_mask, this.hideEvent.bind(this));
};
e.prototype.hideEvent = function() {
this.i_cancle.off("touchend");
this.i_confirm.off("touchend");
};
e.prototype.addEvent = function() {
this.i_cancle.on("touchend", this.hide.bind(this));
this.i_confirm.on("touchend", this.click_confirm.bind(this));
};
e.prototype.start = function() {};
e.prototype.onDestory = function() {};
return e;
}(l);
o.default = u;
cc._RF.pop();
}, {
"../../common/MyAnimation": "MyAnimation",
"../../common/SceneManager": "SceneManager",
"../../common/Toast": "Toast",
"../../units/UserConfig": "UserConfig"
} ],
RoomView: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "1d6d2hy0EJBDJ7eX5ypigoO", "RoomView");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MRoom = void 0;
var c = t("../common/MyAnimation"), a = t("../common/SceneManager"), s = t("../common/Toast"), r = t("../units/Tool"), l = t("../units/UserConfig"), u = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.m_cache = [];
e.S_tableToRule = BUTTON_STATE.ON;
e.S_tableTogame = BUTTON_STATE.ON;
e.Init();
return e;
}
e.prototype.ReSet = function() {
this.m_cache = [];
};
e.prototype.Init = function() {
var t = this;
this.ti = setInterval(function() {
if (!(t.m_cache.length > 5)) {
for (var e = 100 * Math.ceil(100 * Math.random()), o = {
max: r.default.getInstance().randomAccess(e, 1e4),
rule: r.default.getInstance().getRandomName(56),
gamenum: r.default.getInstance().randomAccess(400, 6e3),
player: [],
maxPlayer: r.default.getInstance().randomAccess(6, 10),
bet: e,
tableNum: r.default.getInstance().randomNumber(5)
}, i = 0; i < o.maxPlayer; ++i) o.player.push({
name: r.default.getInstance().getRandomName(3),
active: !0
});
t.m_cache.push(o);
t.OnWebsocketMessage();
}
}, 2e3);
this.tic = setTimeout(function() {
t.tie = setInterval(function() {
var e = Math.ceil(Math.random() * (t.m_cache.length - 1));
if (t.m_cache[e]) {
var o = Math.ceil(Math.random() * t.m_cache[e].maxPlayer - 1);
if (t.m_cache[e].player[o].active) t.m_cache[e].player[o].active = !1; else {
t.m_cache[e].player[o].name = r.default.getInstance().getRandomName(3);
t.m_cache[e].player[o].active = !0;
}
}
t.OnWebsocketMessage();
}, 2e3);
t.tic = null;
}, 2e3);
};
e.prototype.getDataFromIndex = function(t, e) {
return e ? this.m_cache[2 * t + 1] : this.m_cache[2 * t];
};
e.prototype.getRoomNum = function() {
var t = {
numItems: 0,
activeDown: !0
};
t.numItems = Math.ceil(this.m_cache.length / 2);
this.m_cache.length % 2 == 1 && (t.activeDown = !1);
return t;
};
e.prototype.getTableButtonState = function() {
return this.S_tableTogame;
};
e.prototype.getTableRuleButtonState = function() {
return this.S_tableToRule;
};
e.prototype.OnWebsocketMessage = function() {
this.flushRoomViewFunction();
};
return e;
}(c.default);
o.MRoom = u;
var h = function(t) {
n(e, t);
function e(e, o) {
var i = t.call(this) || this;
i.node = e;
i.flushRoomViewFunction = i.FlushRoomView;
i.m_toast = cc.find("common/toast", i.node);
i.m_root = cc.find("roomview", i.node);
i.m_itemLayout = cc.find("roomview/view/content", i.node);
i.c_list = cc.find("roomview", i.node).getComponent("List");
i.cl_RuleView = o;
return i;
}
e.prototype.show = function(t) {
this.ReSet();
this.RemoveAllChild(t);
this.FlushRoomView();
this.m_root.active = !0;
};
e.prototype.RemoveAllChild = function(t) {
var e = this;
this.m_curentGameID = t;
this.m_itemLayout.children.forEach(function(t) {
e.c_list._delSingleItem(t);
});
this.m_itemLayout.removeAllChildren();
this.c_list.PrefabIndex = t;
};
e.prototype.clickMainFunction = function(t, e, o, i) {
switch (i.pos) {
case ROOM_CLICK_POS.UPTABLE:
switch (this.getTableButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
var n = this.getDataFromIndex(e, !1);
l.default.getInstance().setTableInfo({
tablenum: n.tableNum,
min: n.bet,
max: n.max,
gamenum: n.gamenum,
rule: n.rule
});
a.default.getInstance().loadScene("game_sg");
}
break;

case ROOM_CLICK_POS.DOWNTABLE:
switch (this.getTableButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
n = this.getDataFromIndex(e, !0);
l.default.getInstance().setTableInfo({
tablenum: n.tableNum,
min: n.bet,
max: n.max,
gamenum: n.gamenum,
rule: n.rule
});
a.default.getInstance().loadScene("game_sg");
}
break;

case ROOM_CLICK_POS.UPRULE:
switch (this.getTableRuleButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
n = this.getDataFromIndex(e, !1);
this.cl_RuleView.show({
tablenum: n.tableNum,
min: n.bet,
max: n.max,
gamenum: n.gamenum,
rule: n.rule
});
}
break;

case ROOM_CLICK_POS.DOWNRULE:
switch (this.getTableRuleButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
n = this.getDataFromIndex(e, !0);
this.cl_RuleView.show({
tablenum: n.tableNum,
min: n.bet,
max: n.max,
gamenum: n.gamenum,
rule: n.rule
});
}
}
};
e.prototype.RenderMainFunction = function(t, e) {
if (e == this.getRoomNum().numItems - 1 && 0 == this.getRoomNum().activeDown) t.getChildByName("down").active = !1; else {
var o = this.getDataFromIndex(e, !0), i = 0;
cc.find("down/palyerlist", t).children.forEach(function(t, e) {
!0 === t.getChildByName("isopen").active && (i += 1);
t.getChildByName("isclose").active = Boolean(e > o.maxPlayer - 1);
t.active = !0;
if (e < o.maxPlayer) {
cc.find("isopen/name", t).getComponent(cc.Label).string = o.player[e].name;
t.getChildByName("isopen").active = o.player[e].active;
} else t.getChildByName("isopen").active = !1;
}, this);
cc.find("down/tableid", t).getComponent(cc.Label).string = String(2 * e + 2);
cc.find("down/bet", t).getComponent(cc.Label).string = "底注: " + o.bet;
cc.find("down/room", t).getComponent(cc.Label).string = "房号:" + o.tableNum;
cc.find("down/peoplestate", t).getComponent(cc.Label).string = i === o.maxPlayer ? "客满" : i + "/" + o.maxPlayer;
t.getChildByName("down").active = !0;
}
var n = this.getDataFromIndex(e, !1), c = 0;
cc.find("up/palyerlist", t).children.forEach(function(t, e) {
!0 === t.getChildByName("isopen").active && (c += 1);
t.getChildByName("isclose").active = Boolean(e > n.maxPlayer - 1);
t.active = !0;
if (e < n.maxPlayer) {
cc.find("isopen/name", t).getComponent(cc.Label).string = n.player[e].name;
t.getChildByName("isopen").active = n.player[e].active;
} else t.getChildByName("isopen").active = !1;
}, this);
cc.find("up/tableid", t).getComponent(cc.Label).string = String(2 * e + 1);
cc.find("up/bet", t).getComponent(cc.Label).string = "底注: " + n.bet;
cc.find("up/room", t).getComponent(cc.Label).string = "房号:" + n.tableNum;
cc.find("up/peoplestate", t).getComponent(cc.Label).string = c === n.maxPlayer ? "客满" : c + "/" + n.maxPlayer;
};
e.prototype.FlushRoomView = function() {
this.c_list.numItems = this.getRoomNum().numItems;
this.c_list.updateAll();
};
e.prototype.OnDestroy = function() {
clearInterval(this.ti);
clearInterval(this.tie);
this.tic && clearInterval(this.tic);
};
e.prototype.Start = function() {};
return e;
}(u);
o.default = h;
cc._RF.pop();
}, {
"../common/MyAnimation": "MyAnimation",
"../common/SceneManager": "SceneManager",
"../common/Toast": "Toast",
"../units/Tool": "Tool",
"../units/UserConfig": "UserConfig"
} ],
Room: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "f07d0uMR7lKYIjGVcNMUTwd", "Room");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), c = this && this.__decorate || function(t, e, o, i) {
var n, c = arguments.length, a = c < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (c < 3 ? n(a) : c > 3 ? n(e, o, a) : n(e, o)) || a);
return c > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = t("../common/MyAnimation"), s = t("../common/SceneManager"), r = t("../common/Toast"), l = t("../hall/popup/RecordView"), u = t("../common/SetView"), h = t("./GameView"), d = t("./RoomView"), p = t("./RuleView"), f = t("./TopView"), m = t("../units/AudioManager"), _ = cc._decorator, g = _.ccclass, y = _.menu, v = _.property, S = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.PopupButton = null;
return e;
}
e.prototype.onLoad = function() {
this.initAudio();
s.default.getInstance().setScene(cc.director.getScene());
r.default.getInstance().setRootNode(cc.find("common/toast", this.node));
this.cl_RecordView = new l.default(this.node, this.PopupButton);
this.cl_SetView = new u.default(this.node);
this.cl_TopView = new f.default(this.node, this.cl_RecordView, this.cl_SetView);
this.cl_RuleView = new p.default(cc.find("popup", this.node));
this.cl_RoomView = new d.default(this.node, this.cl_RuleView);
this.cl_GameView = new h.default(this.node, this.cl_RoomView);
};
e.prototype.initAudio = function() {
if (m.default.getInstance().getBgmCode() !== BGM_CODE.BGM_PASSPORT) {
m.default.getInstance().playBgmFromLocal(BGM_CODE.BGM_PASSPORT, !0);
m.default.getInstance().setBgmVol();
m.default.getInstance().setEffVol();
}
};
e.prototype.RenderRoom = function(t, e) {
this.cl_RoomView.RenderMainFunction(t, e);
};
e.prototype.ClickTable = function(t, e, o, i) {
this.cl_RoomView.clickMainFunction(t, e, o, i);
};
e.prototype.RenderMainRecord = function(t, e) {
this.cl_RecordView.RenderMainFunction(t, e);
};
e.prototype.RenderPopupRecord = function(t, e) {
this.cl_RecordView.RenderPopupFunction(t, e);
};
e.prototype.ClickRecordMainNode = function(t, e, o) {
this.cl_RecordView.clickMainItemFunction(t, e, o);
};
e.prototype.ClickRecordPopupNode = function(t, e, o) {
this.cl_RecordView.clickPopupItemFunction(t, e, o);
};
e.prototype.button_back = function() {
s.default.getInstance().loadScene("hall");
};
e.prototype.start = function() {
this.cl_SetView.start();
this.cl_GameView.start();
this.cl_RecordView.start();
};
e.prototype.onDestroy = function() {
a.default.onDestory();
this.cl_RoomView.OnDestroy();
this.cl_GameView.onDestroy();
this.cl_RecordView.onDestroy();
};
c([ v(cc.Prefab) ], e.prototype, "PopupButton", void 0);
return c([ g, y("场景主脚本/Room") ], e);
}(cc.Component);
o.default = S;
cc._RF.pop();
}, {
"../common/MyAnimation": "MyAnimation",
"../common/SceneManager": "SceneManager",
"../common/SetView": "SetView",
"../common/Toast": "Toast",
"../hall/popup/RecordView": "RecordView",
"../units/AudioManager": "AudioManager",
"./GameView": "GameView",
"./RoomView": "RoomView",
"./RuleView": "RuleView",
"./TopView": "TopView"
} ],
RuleView: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "79242tGBc5GkL/F/79xPlFW", "RuleView");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MRule = void 0;
var c = t("../common/MyAnimation"), a = t("../common/Toast"), s = t("../units/UserConfig"), r = function(t) {
n(e, t);
function e() {
return t.call(this) || this;
}
e.prototype.getUserInfo = function() {
return s.default.getInstance().getUserInfo();
};
return e;
}(c.default);
o.MRule = r;
var l = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_toast = cc.find("common/toast", o.node.parent);
o.m_mask = cc.find("mask", o.node);
o.m_root = cc.find("gamerule", o.node);
o.c_max = cc.find("gamerule/maxbet/value", o.node).getComponent(cc.Label);
o.c_min = cc.find("gamerule/minbet/value", o.node).getComponent(cc.Label);
o.c_rule = cc.find("gamerule/rule/value", o.node).getComponent(cc.Label);
o.c_gamenum = cc.find("gamerule/gamenum/value", o.node).getComponent(cc.Label);
o.i_close = cc.find("gamerule/button_close", o.node);
o.m_mask.active = !1;
o.m_root.active = !1;
return o;
}
e.prototype.show = function(t) {
if (t && t.min && t.max && t.rule) {
this.node.active = !0;
this.c_min.string = "底注: " + String(t.min);
this.c_max.string = "下注封顶: " + String(t.max);
this.c_rule.string = String(t.rule);
this.c_gamenum.string = "局数: " + String(t.gamenum);
this.popupOpenScaleXY(this.m_root, this.m_mask, this.addEvent.bind(this));
} else a.default.getInstance().show("数据错误!", this.m_toast);
};
e.prototype.hide = function() {
this.popupCloseScaleXY(this.m_root, this.m_mask, this.HideEvent.bind(this));
};
e.prototype.HideEvent = function() {
this.i_close.off("touchend");
};
e.prototype.addEvent = function() {
this.i_close.on("touchend", this.hide.bind(this));
};
e.prototype.start = function() {};
e.prototype.onDestory = function() {};
return e;
}(r);
o.default = l;
cc._RF.pop();
}, {
"../common/MyAnimation": "MyAnimation",
"../common/Toast": "Toast",
"../units/UserConfig": "UserConfig"
} ],
SGSetView: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "040c4xoN7BIUJX9bzorSi8d", "SGSetView");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MSet = void 0;
var c = t("../common/AtlasLib"), a = t("../common/MyAnimation"), s = t("../units/AudioManager"), r = t("../units/UserConfig"), l = t("./CardLib"), u = function(t) {
n(e, t);
function e() {
return t.call(this) || this;
}
e.prototype.getSgSetViewConfig = function() {
return r.default.getInstance().getSgSetViewConfig();
};
e.prototype.setSgSetViewConfig = function(t) {
r.default.getInstance().setSgSetViewConfig(t);
};
e.prototype.getAudioConfig = function() {
return r.default.getInstance().getAudioConfig();
};
return e;
}(a.default);
o.MSet = u;
var h = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_toast = cc.find("common/toast", o.node);
o.m_mask = cc.find("popup/mask", o.node);
o.m_root = cc.find("popup/set", o.node);
o.m_playerList = cc.find("player", o.node).children;
o.m_table = o.node.getComponent("switchsp");
o.m_musicBarWidth = cc.find("popup/set/layout_music/progress/bar", o.node).width;
o.m_effectBarWidth = cc.find("popup/set/layout_eff/progress/bar", o.node).width;
o.m_topMusicBar = cc.find("popup/set/layout_music/progress/bar", o.node);
o.m_topEffectBar = cc.find("popup/set/layout_eff/progress/bar", o.node);
o.m_cardSelect = cc.find("popup/set/layout_card/isok", o.node);
o.m_tableSelect = cc.find("popup/set/layout_table/isok", o.node);
o.i_close = cc.find("popup/set/button_close", o.node);
o.i_iconMusic = cc.find("popup/set/layout_music/icon_music", o.node);
o.i_iconEffect = cc.find("popup/set/layout_eff/icon_eff", o.node);
o.i_sliderMusic = cc.find("popup/set/layout_music/progress", o.node);
o.i_sliderEffect = cc.find("popup/set/layout_eff/progress", o.node);
o.i_cardSelect = cc.find("popup/set/layout_card", o.node).children;
o.i_tableSelect = cc.find("popup/set/layout_table", o.node).children;
o.cl_cardLib = cc.find("state/cardLib", o.node).getComponent(l.default);
o.m_root.active = !0;
o.updateView();
o.setChoose(o.getSgSetViewConfig());
o.m_cardSelect.position = o.i_cardSelect[o.getSgSetViewConfig().cardid + 1].position;
o.m_tableSelect.position = o.i_tableSelect[o.getSgSetViewConfig().tableid + 1].position;
o.m_root.active = !1;
return o;
}
e.prototype.setChoose = function(t) {
var e = this;
this.m_playerList.forEach(function(o) {
o.getChildByName("cardList").children.forEach(function(e) {
var o = e.width, i = e.height;
e.getComponent("switchsp").updateFrame(0, c.default.getInstance().getSpriteFrame("card", "base" + t.cardid));
e.width = o;
e.height = i;
}, e);
}, this);
this.m_table.setSpriteFrame(t.tableid);
this.cl_cardLib.setCardBase(0, c.default.getInstance().getSpriteFrame("card", "base" + t.cardid));
};
e.prototype.click_CardChoose = function(t, e) {
var o = this.getSgSetViewConfig();
this.m_cardSelect.position = t.position;
this.m_cardSelect.active = !0;
this.setSgSetViewConfig({
cardid: e - 1,
tableid: o.tableid
});
this.setChoose({
cardid: e - 1,
tableid: o.tableid
});
};
e.prototype.click_TableChoose = function(t, e) {
var o = this.getSgSetViewConfig();
this.m_tableSelect.position = t.position;
this.m_tableSelect.active = !0;
this.setSgSetViewConfig({
cardid: o.cardid,
tableid: e - 1
});
this.setChoose({
cardid: o.cardid,
tableid: e - 1
});
};
e.prototype.show = function() {
this.popupOpenScaleXY(this.m_root, this.m_mask, this.addEvent.bind(this));
};
e.prototype.hide = function() {
this.popupCloseScaleXY(this.m_root, this.m_mask, this.hideEvent.bind(this));
};
e.prototype.hideEvent = function() {
this.i_sliderMusic.off("slide");
this.i_sliderEffect.off("slide");
this.i_iconMusic.off("touchend");
this.i_iconEffect.off("touchend");
this.i_close.off("touchend");
};
e.prototype.addEvent = function() {
var t = this;
this.i_sliderMusic.on("slide", function() {
r.default.getInstance().setBgmVolConfig(t.i_sliderMusic.getComponent(cc.Slider).progress);
t.updateView();
});
this.i_sliderEffect.on("slide", function() {
r.default.getInstance().setEffVolConfig(t.i_sliderEffect.getComponent(cc.Slider).progress);
t.updateView();
});
this.i_iconMusic.on("touchend", function() {
r.default.getInstance().setBgmState(!r.default.getInstance().getAudioConfig().openBgm);
s.default.getInstance().setBgmVol(r.default.getInstance().getAudioConfig().openBgm ? r.default.getInstance().getAudioConfig().bgmVol : 0);
t.updateView();
}, this);
this.i_iconEffect.on("touchend", function() {
r.default.getInstance().setEffState(!r.default.getInstance().getAudioConfig().openEff);
s.default.getInstance().setEffVol(r.default.getInstance().getAudioConfig().openEff ? r.default.getInstance().getAudioConfig().effVol : 0);
t.updateView();
}, this);
this.i_close.on("touchend", function() {
t.hide();
}, this);
this.i_cardSelect.forEach(function(e, o) {
"icon" !== e.name && "isok" !== e.name && e.on("touchend", function() {
t.click_CardChoose(e, o);
});
}, this);
this.i_tableSelect.forEach(function(e, o) {
"icon" !== e.name && "isok" !== e.name && e.on("touchend", function() {
t.click_TableChoose(e, o);
});
}, this);
this.updateView();
};
e.prototype.updateView = function() {
var t = this.getAudioConfig();
this.i_iconMusic.getComponent("switchsp").setSpriteFrame(!1 === t.openBgm ? 0 : 1);
this.i_iconEffect.getComponent("switchsp").setSpriteFrame(!1 === t.openEff ? 0 : 1);
if (t.openBgm) {
s.default.getInstance().setBgmVol();
this.i_sliderMusic.getComponent(cc.Slider).progress = t.bgmVol;
} else this.i_sliderMusic.getComponent(cc.Slider).progress = 0;
if (t.openEff) {
s.default.getInstance().setEffVol();
this.i_sliderEffect.getComponent(cc.Slider).progress = t.effVol;
} else this.i_sliderEffect.getComponent(cc.Slider).progress = 0;
this.m_topMusicBar.width = this.i_sliderMusic.getComponent(cc.Slider).progress * this.m_musicBarWidth;
this.m_topEffectBar.width = this.i_sliderEffect.getComponent(cc.Slider).progress * this.m_effectBarWidth;
r.default.getInstance().saveMusicConfig();
cc.sys.localStorage.setItem("music", JSON.stringify(t));
};
e.prototype.start = function() {};
e.prototype.onDestory = function() {};
return e;
}(u);
o.default = h;
cc._RF.pop();
}, {
"../common/AtlasLib": "AtlasLib",
"../common/MyAnimation": "MyAnimation",
"../units/AudioManager": "AudioManager",
"../units/UserConfig": "UserConfig",
"./CardLib": "CardLib"
} ],
SGView: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "c5a49+xxehMoYgjbaNtHuqS", "SGView");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.SanGong = void 0;
var c = t("../common/MyAnimation"), a = t("../common/SceneManager"), s = t("../common/Toast"), r = t("../room/RuleView"), l = t("../units/UserConfig"), u = t("./SGSetView"), h = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.S_Chat = e.S_BiaoQin = BUTTON_STATE.OFF;
e.S_Set = e.S_Rule = e.S_BackToRoom = BUTTON_STATE.ON;
return e;
}
e.prototype.getRuleButtonState = function() {
return this.S_Rule;
};
e.prototype.getSetButtonState = function() {
return this.S_Set;
};
e.prototype.getBackToRoomButtonState = function() {
return this.S_BackToRoom;
};
e.prototype.getChatButtonState = function() {
return this.S_Chat;
};
e.prototype.getBiaoQinButtonState = function() {
return this.S_BiaoQin;
};
e.prototype.getTableInfo = function() {
return l.default.getInstance().getTableInfo();
};
return e;
}(c.default);
o.SanGong = h;
var d = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_toast = cc.find("common/toast", o.node);
o.i_rule = cc.find("mainbutton/button_rule", o.node);
o.i_set = cc.find("mainbutton/button_set", o.node);
o.i_backRomm = cc.find("mainbutton/button_back", o.node);
o.i_chat = cc.find("mainbutton/button_chat", o.node);
o.i_biaoQin = cc.find("mainbutton/button_bq", o.node);
o.c_tableInfo = cc.find("tableInfo", o.node).getComponent(cc.Label);
o.cl_RuleView = new r.default(cc.find("popup", o.node));
o.cl_SGSetViw = new u.default(o.node);
o.addEvent();
return o;
}
e.prototype.setTableInfo = function() {
var t = this.getTableInfo();
this.c_tableInfo.string = "房号: " + t.tablenum + "\n底注: " + t.min + "\n封顶: " + t.max + "\n局数: " + t.gamenum;
};
e.prototype.ClickRule = function() {
switch (this.getRuleButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.cl_RuleView.show(this.getTableInfo());
}
};
e.prototype.ClickBackToRoom = function() {
switch (this.getBackToRoomButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
a.default.getInstance().loadScene("room");
}
};
e.prototype.ClickSet = function() {
switch (this.getSetButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.cl_SGSetViw.show();
}
};
e.prototype.ClickChat = function() {
switch (this.getChatButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
return;
}
};
e.prototype.ClickBiaoQin = function() {
switch (this.getBiaoQinButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
return;
}
};
e.prototype.addEvent = function() {
this.i_rule.on("touchend", this.ClickRule.bind(this));
this.i_set.on("touchend", this.ClickSet.bind(this));
this.i_backRomm.on("touchend", this.ClickBackToRoom.bind(this));
this.i_chat.on("touchend", this.ClickChat.bind(this));
this.i_biaoQin.on("touchend", this.ClickBiaoQin.bind(this));
};
e.prototype.start = function() {
this.setTableInfo();
};
e.prototype.onDestroy = function() {};
return e;
}(h);
o.default = d;
cc._RF.pop();
}, {
"../common/MyAnimation": "MyAnimation",
"../common/SceneManager": "SceneManager",
"../common/Toast": "Toast",
"../room/RuleView": "RuleView",
"../units/UserConfig": "UserConfig",
"./SGSetView": "SGSetView"
} ],
SanGongData: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "93a48UjpgNCgoWN9wvP4c2a", "SanGongData");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_mainNode = e.getChildByName("second");
o.m_mask = cc.find("second/mask", e);
o.m_root = cc.find("second/root", e);
o.i_back = cc.find("second/root/button_back", e);
o.c_list = cc.find("second/root/scrollview", e).getComponent("List");
o.m_itemLayout = cc.find("second/root/scrollview/view/content", e);
o.m_mainNode.active = !1;
return o;
}
e.prototype.show = function(t) {
this.removeAllChild();
this.c_list.scrollTo(0);
this.m_mainNode.active = !0;
this.popupOpenScaleY(this.m_root, this.m_mask, this.addEvent.bind(this));
this.c_list.numItems = t;
};
e.prototype.hide = function() {
this.m_mainNode.active = !1;
this.node.getChildByName("base").active = !0;
this.popupCloseScaleY(this.m_root, this.m_mask, this.hideEvent.bind(this));
};
e.prototype.addEvent = function() {
this.node.getChildByName("base").active = !1;
this.i_back.on("touchend", this.hide.bind(this));
};
e.prototype.hideEvent = function() {
this.i_back.off("touchend");
};
e.prototype.removeAllChild = function() {
var t = this;
this.m_itemLayout.children.forEach(function(e) {
t.c_list._delSingleItem(e);
});
this.m_itemLayout.removeAllChildren();
};
e.prototype.RenderMain = function() {};
e.prototype.RenderPopup = function(t, e) {
cc.find("briefly/gamenum", t).getComponent(cc.Label).string = "第" + e + "局";
};
e.prototype.ClickMain = function() {
this.show(10);
};
e.prototype.ClickPopup = function(t) {
this.StartRecordSgDetailRotation(cc.find("briefly/button_open", t), t.getChildByName("detail"), t.getChildByName("detail").active);
};
return e;
}(t("../common/ScrollViewRenderData").default);
o.default = c;
cc._RF.pop();
}, {
"../common/ScrollViewRenderData": "ScrollViewRenderData"
} ],
SceneManager: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "4995fb4175I0405RpaIQWfV", "SceneManager");
var i = this && this.__decorate || function(t, e, o, i) {
var n, c = arguments.length, a = c < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (c < 3 ? n(a) : c > 3 ? n(e, o, a) : n(e, o)) || a);
return c > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, c = n.ccclass, a = (n.property, function() {
function t() {
this.m_isFirstLogin = !0;
this.loadIndex = 1;
this.m_sceneNameArr = [ "passport", "hall", "room", "game_sg" ];
}
e = t;
t.getInstance = function() {
if (!e.m_instance) {
e.m_instance = new e();
return e.m_instance;
}
return e.m_instance;
};
t.prototype.preloadScene = function(t, e) {
void 0 === t && (t = null);
void 0 === e && (e = null);
this.m_isFirstLogin = !1;
this.preloadSceneForeach(t, e);
};
t.prototype.preloadSceneForeach = function(t, e) {
var o = this;
void 0 === t && (t = null);
void 0 === e && (e = null);
var i = 100 / (this.m_sceneNameArr.length - 1), n = i * (this.loadIndex - 1), c = 0;
cc.director.preloadScene(this.m_sceneNameArr[this.loadIndex], function(a, s) {
var r = n + a / s * i;
r < c && (r = c);
c = r;
t && t(r);
if (a === s) {
if (o.loadIndex === o.m_sceneNameArr.length - 1) return;
o.loadIndex += 1;
o.preloadSceneForeach(t, e);
}
}, function(t) {
e && e(t);
});
};
t.prototype.setScene = function(t) {
this.m_curScene = t;
};
t.prototype.getSceneName = function() {
return this.m_curScene.name;
};
t.prototype.endgame = function() {
cc.game.end();
};
t.prototype.getIsFirstLoad = function() {
return this.m_isFirstLogin;
};
t.prototype.loadScene = function(t) {
if (this.m_sceneNameArr.includes(t)) {
cc.director.loadScene(t);
return !0;
}
return !1;
};
var e;
return e = i([ c ], t);
}());
o.default = a;
cc._RF.pop();
}, {} ],
ScrollViewRenderData: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "df9f7QA5elGfIf5knAS4fJl", "ScrollViewRenderData");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = function(t) {
n(e, t);
function e() {
return t.call(this) || this;
}
return e;
}(t("./MyAnimation").default);
o.default = c;
cc._RF.pop();
}, {
"./MyAnimation": "MyAnimation"
} ],
SetView: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "51c638K6IhNo5KHN8k96EEe", "SetView");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MSet = void 0;
var c = t("./MyAnimation"), a = t("./SceneManager"), s = t("./Toast"), r = t("../units/Tool"), l = t("../units/UserConfig"), u = t("../units/AudioManager"), h = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.S_quitLoginState = e.S_privateState = BUTTON_STATE.ON;
e.U_privateUrl = "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1029112456,3968662380&fm=26&gp=0.jpg";
return e;
}
e.prototype.getprivateButtonState = function() {
return this.S_privateState;
};
e.prototype.getPrivateUrl = function() {
return this.U_privateUrl;
};
e.prototype.getQuitLoginButtonState = function() {
return this.S_quitLoginState;
};
return e;
}(c.default);
o.MSet = h;
var d = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_toast = cc.find("common/toast", o.node);
o.m_mask = cc.find("popup/mask", o.node);
o.m_root = cc.find("popup/set", o.node);
o.m_musicBarWidth = cc.find("popup/set/layout_music/progress/bar", o.node).width;
o.m_effectBarWidth = cc.find("popup/set/layout_eff/progress/bar", o.node).width;
o.m_topMusicBar = cc.find("popup/set/layout_music/progress/bar", o.node);
o.m_topEffectBar = cc.find("popup/set/layout_eff/progress/bar", o.node);
o.i_private = cc.find("popup/set/button_private", o.node);
o.i_close = cc.find("popup/set/button_close", o.node);
o.i_quitLogin = cc.find("popup/set/button_quitlogin", o.node);
o.i_iconMusic = cc.find("popup/set/layout_music/icon_music", o.node);
o.i_iconEffect = cc.find("popup/set/layout_eff/icon_eff", o.node);
o.i_sliderMusic = cc.find("popup/set/layout_music/progress", o.node);
o.i_sliderEffect = cc.find("popup/set/layout_eff/progress", o.node);
o.m_privateRoot = cc.find("popup/set/private", o.node);
o.i_confirm = cc.find("popup/set/private/button_confirm", o.node);
o.m_privateSpriteNode = cc.find("popup/set/private/scrollview/view/content/item", o.node);
o.m_root.active = !0;
o.m_privateRoot.active = !1;
o.updateView();
o.m_root.active = !1;
return o;
}
e.prototype.click_PrivateRoom = function() {
switch (this.getprivateButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.showPrivate();
}
};
e.prototype.click_QuitLogin = function() {
switch (this.getQuitLoginButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.hideEvent();
a.default.getInstance().loadScene("passport");
}
};
e.prototype.show = function() {
this.popupOpenScaleXY(this.m_root, this.m_mask, this.addEvent.bind(this));
};
e.prototype.hide = function() {
this.popupCloseScaleXY(this.m_root, this.m_mask, this.hideEvent.bind(this));
};
e.prototype.addPrivateEvent = function() {
var t = this;
this.i_confirm.on("touchend", function() {
t.hidePrivate();
}, this);
};
e.prototype.hidePrivateEvent = function() {
this.i_confirm.off("touchend");
};
e.prototype.showPrivate = function() {
this.setPrivateView();
this.popupOpenScaleY(this.m_privateRoot, null, this.addPrivateEvent.bind(this));
};
e.prototype.hidePrivate = function() {
this.popupCloseScaleY(this.m_privateRoot, null, this.hidePrivateEvent.bind(this));
};
e.prototype.hideEvent = function() {
this.i_private.off("touchend");
this.i_quitLogin.off("touchend");
this.i_sliderMusic.off("slide");
this.i_sliderEffect.off("slide");
this.i_iconMusic.off("touchend");
this.i_iconEffect.off("touchend");
this.i_close.off("touchend");
};
e.prototype.addEvent = function() {
var t = this;
this.i_private.on("touchend", function() {
t.click_PrivateRoom();
}, this);
this.i_quitLogin.on("touchend", function() {
t.click_QuitLogin();
}, this);
this.i_sliderMusic.on("slide", function() {
l.default.getInstance().setBgmVolConfig(t.i_sliderMusic.getComponent(cc.Slider).progress);
t.updateView();
});
this.i_sliderEffect.on("slide", function() {
l.default.getInstance().setEffVolConfig(t.i_sliderEffect.getComponent(cc.Slider).progress);
t.updateView();
});
this.i_iconMusic.on("touchend", function() {
l.default.getInstance().setBgmState(!l.default.getInstance().getAudioConfig().openBgm);
u.default.getInstance().setBgmVol(l.default.getInstance().getAudioConfig().openBgm ? l.default.getInstance().getAudioConfig().bgmVol : 0);
t.updateView();
}, this);
this.i_iconEffect.on("touchend", function() {
l.default.getInstance().setEffState(!l.default.getInstance().getAudioConfig().openEff);
u.default.getInstance().setEffVol(l.default.getInstance().getAudioConfig().openEff ? l.default.getInstance().getAudioConfig().effVol : 0);
t.updateView();
}, this);
this.i_close.on("touchend", function() {
t.hide();
}, this);
this.updateView();
};
e.prototype.setPrivateView = function() {
this.m_privateSpriteNode.getComponent(cc.Sprite).spriteFrame = null;
r.default.getInstance().LoadImageRemote(this.m_privateSpriteNode, this.getPrivateUrl());
};
e.prototype.updateView = function() {
var t = l.default.getInstance().getAudioConfig();
this.i_iconMusic.getComponent("switchsp").setSpriteFrame(!1 === t.openBgm ? 0 : 1);
this.i_iconEffect.getComponent("switchsp").setSpriteFrame(!1 === t.openEff ? 0 : 1);
if (t.openBgm) {
u.default.getInstance().setBgmVol();
this.i_sliderMusic.getComponent(cc.Slider).progress = t.bgmVol;
} else this.i_sliderMusic.getComponent(cc.Slider).progress = 0;
if (t.openEff) {
u.default.getInstance().setEffVol();
this.i_sliderEffect.getComponent(cc.Slider).progress = t.effVol;
} else this.i_sliderEffect.getComponent(cc.Slider).progress = 0;
this.m_topMusicBar.width = this.i_sliderMusic.getComponent(cc.Slider).progress * this.m_musicBarWidth;
this.m_topEffectBar.width = this.i_sliderEffect.getComponent(cc.Slider).progress * this.m_effectBarWidth;
l.default.getInstance().saveMusicConfig();
cc.sys.localStorage.setItem("music", JSON.stringify(t));
};
e.prototype.start = function() {};
e.prototype.onDestory = function() {};
return e;
}(h);
o.default = d;
cc._RF.pop();
}, {
"../units/AudioManager": "AudioManager",
"../units/Tool": "Tool",
"../units/UserConfig": "UserConfig",
"./MyAnimation": "MyAnimation",
"./SceneManager": "SceneManager",
"./Toast": "Toast"
} ],
ShareView: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "05406a+pa5LJIgedgSmURWQ", "ShareView");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MShareView = void 0;
var c = t("../../common/MyAnimation"), a = t("../../common/Toast"), s = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.m_shareCode = "PC121387";
e.S_saveImageState = BUTTON_STATE.ON;
e.S_copyCodeState = BUTTON_STATE.ON;
e.S_closeState = BUTTON_STATE.ON;
return e;
}
e.prototype.setImagePathRoot = function() {
cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? this.m_pathRoot = jsb.reflection.callStaticMethod(className, "getImagePathRoot", "()Ljava/lang/String;") : this.m_pathRoot = "/storage/emulated/0/DCIM/Screenshots/";
};
e.prototype.getShareCode = function() {
return this.m_shareCode;
};
e.prototype.getImagePathRoot = function() {
return this.m_pathRoot;
};
e.prototype.getCloseButtonState = function() {
return this.S_closeState;
};
e.prototype.getSaveImageButtonState = function() {
return this.S_saveImageState;
};
e.prototype.getCopyCodeButtonState = function() {
return this.S_copyCodeState;
};
e.prototype.savePic = function(t) {
if (cc.sys.isNative && t) {
var e = this.m_pathRoot;
if (cc.sys.os == cc.sys.OS_ANDROID) {
var o = new Date(), i = o.getFullYear().toString() + (o.getMonth() + 1) + o.getDate() + "_" + o.getHours() + o.getMinutes() + o.getSeconds() + ".png";
jsb.fileUtils.isDirectoryExist(e) || jsb.fileUtils.createDirectory(e);
var n = jsb.saveImageData(t, this.m_width, this.m_hight, e + i);
n && jsb.reflection.callStaticMethod(className, "noticeImageMedia", "(Ljava/lang/String;)V", e + i);
return n;
}
if (cc.sys.os === cc.sys.OS_WINDOWS || cc.sys.os === String(cc.sys.DESKTOP_BROWSER)) return !0;
}
return !0;
};
e.prototype.filpYImage = function(t) {
for (var e = this.m_width, o = this.m_hight, i = new Uint8Array(e * o * 4), n = 4 * e, c = 0; c < o; c++) for (var a = (o - 1 - c) * e * 4, s = c * e * 4, r = 0; r < n; r++) i[s + r] = t[a + r];
return i;
};
return e;
}(c.default);
o.MShareView = s;
var r = function(t) {
n(e, t);
function e(e) {
var o = t.call(this) || this;
o.node = e;
o.m_toast = cc.find("common/toast", o.node);
o.m_mask = cc.find("popup/mask", o.node);
o.m_root = cc.find("popup/share", o.node);
o.i_closeView = cc.find("popup/share/button_close", o.node);
o.i_saveImage = cc.find("popup/share/button_saveImage", o.node);
o.i_copyCode = cc.find("popup/share/sharecode/button_copy", o.node);
o.c_qrcode = cc.find("popup/share/frame/qr_frame/mask/qrcode", o.node).getComponent(cc.Sprite);
o.setImagePathRoot();
o.initCrema();
o.m_mask.active = !1;
o.m_root.active = !1;
o.addEvent();
return o;
}
e.prototype.initCrema = function() {
this.m_touchend = !0;
this.m_camera = new cc.Node();
this.node.addChild(this.m_camera);
this.m_camera.x = this.m_camera.y = 0;
this.c_camera = this.m_camera.addComponent(cc.Camera);
this.c_camera.cullingMask = -2;
this.m_camera.active = !1;
};
e.prototype.createTex = function() {
this.m_camera.active = !0;
var t = new cc.RenderTexture(), e = cc.game._renderContext;
t.initWithSize(807, 543, e.STENCIL_INDEX8);
this.c_camera.targetTexture = t;
this.m_texture = t;
};
e.prototype.createSprite = function() {
var t = this, e = cc.blink(.3, 1);
this.node.runAction(e);
var o = this.m_texture.readPixels();
this.m_width = this.m_texture.width;
this.m_hight = this.m_texture.height;
var i = this.filpYImage(o);
if (this.savePic(i)) {
var n = new cc.Texture2D();
n.initWithData(i, 32, this.m_width, this.m_hight);
var c = new cc.SpriteFrame();
c.setTexture(n);
var s = new cc.Node(), r = s.addComponent(cc.Sprite);
s.addComponent(cc.BlockInputEvents);
r.spriteFrame = c;
s.zIndex = cc.macro.MAX_ZINDEX;
this.node.addChild(s);
var l = cc.winSize.width, u = cc.winSize.height;
s.x = s.y = 0;
var h = cc.v3(l / 2 - s.width / 2 * .3, u / 2 - s.height / 2 * .3, 0);
cc.tween(s).to(.7, {
position: h,
scale: .3
}, {
easing: "quadIn"
}).delay(2).call(function() {
s.destroy();
i = null;
s = null;
t.m_camera.active = !1;
t.m_touchend = !0;
cc.sys.os == cc.sys.OS_IOS && a.default.getInstance().show("请手动截图分享!", t.m_toast);
}).start();
}
};
e.prototype.show = function() {
this.m_root.parent.active = !0;
this.popupOpenScaleXY(this.m_root, this.m_mask);
};
e.prototype.hide = function() {
this.popupCloseScaleXY(this.m_root, this.m_mask);
};
e.prototype.click_SaveImage = function() {
var t = this;
switch (this.getSaveImageButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
if (this.m_touchend) {
this.createTex();
setTimeout(function() {
t.createSprite();
}, 1e3);
this.m_touchend = !1;
} else a.default.getInstance().show("请等待截图完成!", this.m_toast);
}
};
e.prototype.click_CopyCode = function() {
switch (this.getCopyCodeButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
cc.sys.isNative && jsb.copyTextToClipboard(this.getShareCode());
a.default.getInstance().show("分享码复制成功!", this.m_toast, !1);
}
};
e.prototype.click_Close = function() {
switch (this.getCloseButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.hide();
}
};
e.prototype.addEvent = function() {
var t = this;
this.i_closeView.on("touchend", function() {
t.click_Close();
}, this);
this.i_saveImage.on("touchend", function() {
t.click_SaveImage();
}, this);
this.i_copyCode.on("touchend", function() {
t.click_CopyCode();
}, this);
};
e.prototype.start = function() {};
e.prototype.onDestory = function() {};
return e;
}(s);
o.default = r;
cc._RF.pop();
}, {
"../../common/MyAnimation": "MyAnimation",
"../../common/Toast": "Toast"
} ],
TimerStruct: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "e31f1MzSddAua/EK0df+eOo", "TimerStruct");
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = function() {
function t(t) {
this.coutDown = t;
this.timeStamp = Date.now();
}
t.prototype.getSurPlus = function() {
var t = this.timeStamp + 1e3 * this.coutDown - Date.now();
console.log(t > 1e3 ? Math.floor(t / 1e3) : 0);
return t > 1e3 ? Math.floor(t / 1e3) : 0;
};
t.prototype.getSurPlusMilliSecond = function() {
var t = this.timeStamp + Math.floor(1e3 * this.coutDown) - Date.now();
return t > 0 ? t : 0;
};
return t;
}();
o.default = i;
cc._RF.pop();
}, {} ],
Toast: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "bd5bd3PZfNOQ7Bel3H6/ZQK", "Toast");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.ToastStruct = void 0;
var c = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.m_cache = [];
return e;
}
e.getInstance = function() {
if (!e.m_instance) {
e.m_instance = new e();
return e.m_instance;
}
return e.m_instance;
};
e.prototype.show = function(t, e, o) {
void 0 === o && (o = !0);
this.m_cache.push(new a(t, e, o ? e.getChildByName("mask") : null));
this.run();
};
e.prototype.setRootNode = function(t) {
this.m_root = t;
};
e.prototype.cleanData = function() {
this.m_root.parent.active && (this.m_root.parent.active = !1);
this.m_root.active && (this.m_root.active = !1);
this.m_cache = [];
};
e.prototype.run = function() {
var t = this;
if (!this.isRun && 0 != this.m_cache.length) {
var e = this.m_cache.shift();
this.isRun = !0;
this.toastFadeIn(e.str, e.root, e.mask, function() {
t.isRun = !1;
t.run();
});
}
};
return e;
}(t("./MyAnimation").default);
o.default = c;
var a = function(t, e, o) {
void 0 === e && (e = null);
void 0 === o && (o = null);
this.str = "";
this.root = null;
this.mask = null;
this.str = t;
this.root = e;
this.mask = o;
};
o.ToastStruct = a;
cc._RF.pop();
}, {
"./MyAnimation": "MyAnimation"
} ],
Tool: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "1dc337bhK5CobshrCtOr1lw", "Tool");
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = function() {
function t() {
this.ImageExt = [ ".png", ".jpg", ".Png", ".Jpj", ".PNG", ".JPG", ".PNg", ".JPg", "jpeg" ];
this.nonDuplicateID = Date.now();
}
t.getInstance = function() {
if (!t.m_instance) {
t.m_instance = new t();
return t.m_instance;
}
return t.m_instance;
};
t.prototype.isIdCardNumber = function(t) {
return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(t);
};
t.prototype.isNickName = function(t) {
return /^[A-Za-z0-9-\u4e00-\u9fa5\_]*$/g.test(t);
};
t.prototype.isPhoneNumber = function(t) {
return /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(t);
};
t.prototype.genNonDuplicateID = function() {
this.nonDuplicateID -= 1;
return this.nonDuplicateID;
};
t.prototype.LoadImageRemote = function(t, e, o) {
void 0 === o && (o = null);
e && this.ImageExt.includes(e.substr(e.length - 4)) && cc.assetManager.loadRemote(e, function(e, i) {
if (!e && cc.isValid(t, !0)) {
t.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(i);
if (o) {
t.width = o.x;
t.height = o.y;
}
}
});
};
t.prototype.forMat = function(t, e) {
e > 1e3 && e % 10 != 0 && 1e3 !== e && 1e4 !== e && 1e8 !== e && cc.error("倍率值不正确请使用1000,10000,100000000");
return t < e ? String(t) : 1e3 == e ? Math.floor(t / e * 100) / 100 + "K" : 1e4 == e ? Math.floor(t / e * 100) / 100 + "万" : 1e8 == e ? Math.floor(t / e * 100) / 100 + "亿" : void 0;
};
t.prototype.getCurentTime = function(t) {
void 0 === t && (t = null);
return "0000-00-00 00:00:00";
};
t.prototype.randomAccess = function(t, e) {
return Math.floor(Math.random() * (t - e) + e);
};
t.prototype.randomNumber = function(t) {
for (var e = "", o = 0; o < t; ++o) e += String(Math.ceil(9 * Math.random()));
return e;
};
t.prototype.decodeUnicode = function(t) {
t = (t = "\\u" + t).replace(/\\/g, "%");
return (t = unescape(t)).replace(/%/g, "\\");
};
t.prototype.getRandomName = function(t) {
for (var e = "", o = 0; o < t; o++) {
var i;
i = this.randomAccess(19968, 40869).toString(16);
e += this.decodeUnicode(i);
}
return e;
};
return t;
}();
o.default = i;
cc._RF.pop();
}, {} ],
TopView: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "e18f5mVOwFKOrxPG0kGG+JA", "TopView");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MTOP = void 0;
var c = t("../common/MyAnimation"), a = t("../common/SceneManager"), s = t("../common/Toast"), r = t("../units/Tool"), l = t("../units/UserConfig"), u = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.S_hallAddGold = e.S_set = e.S_back = e.S_record = BUTTON_STATE.ON;
return e;
}
e.prototype.getUserInfo = function() {
return l.default.getInstance().getUserInfo();
};
e.prototype.getSetButtonState = function() {
return this.S_set;
};
e.prototype.getRecordButtonState = function() {
return this.S_record;
};
e.prototype.getBackButtonState = function() {
return this.S_back;
};
e.prototype.getHallAddGoldButtonState = function() {
return this.S_hallAddGold;
};
return e;
}(c.default);
o.MTOP = u;
var h = function(t) {
n(e, t);
function e(e, o, i) {
var n = t.call(this) || this;
n.node = e;
n.m_toast = cc.find("common/toast", n.node);
n.m_mask = cc.find("popup/mask", n.node);
n.m_nickName = cc.find("top/left/userinfo/userinfo/name", n.node).getComponent(cc.Label);
n.m_Id = cc.find("top/left/userinfo/userinfo/id", n.node).getComponent(cc.Label);
n.m_gold = cc.find("top/left/gold/value", n.node).getComponent(cc.Label);
n.m_avatar = cc.find("top/left/userinfo/avatar/mask/avatar", n.node);
n.i_addGold = cc.find("top/left/gold/add", n.node);
n.i_set = cc.find("top/right/button_set", n.node);
n.i_record = cc.find("top/right/button_record", n.node);
n.i_back = cc.find("top/right/button_back", n.node);
n.cl_RecordView = o;
n.cl_SetView = i;
n.UpdateUserInfo();
n.addEvent();
return n;
}
e.prototype.click_AddGold = function() {
switch (this.getHallAddGoldButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
s.default.getInstance().show("请联系上级充值!", this.m_toast);
}
};
e.prototype.click_Record = function() {
switch (this.getRecordButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.cl_RecordView.show();
}
};
e.prototype.click_Set = function() {
switch (this.getSetButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.cl_SetView.show();
}
};
e.prototype.click_BackToHall = function() {
switch (this.getBackButtonState()) {
case BUTTON_STATE.OFF:
s.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
a.default.getInstance().loadScene("hall");
}
};
e.prototype.UpdateUserInfo = function() {
var t = this.getUserInfo();
this.m_nickName.string = "昵称:" + t.nickname;
this.m_Id.string = "ID: " + t.id;
this.m_gold.string = String(t.gold);
this.UpdateAvatar(t.avatar);
};
e.prototype.UpdateAvatar = function(t) {
r.default.getInstance().LoadImageRemote(this.m_avatar, t, new cc.Vec2(60, 60));
};
e.prototype.HideEvent = function() {
this.i_addGold.off("touchend");
this.i_record.off("touchend");
this.i_set.off("touchend");
this.i_back.off("touchend");
};
e.prototype.addEvent = function() {
this.i_addGold.on("touchend", this.click_AddGold.bind(this));
this.i_record.on("touchend", this.click_Record.bind(this));
this.i_set.on("touchend", this.click_Set.bind(this));
this.i_back.on("touchend", this.click_BackToHall.bind(this));
};
e.prototype.start = function() {
this.addEvent();
};
e.prototype.onDestory = function() {
this.HideEvent();
};
return e;
}(u);
o.default = h;
cc._RF.pop();
}, {
"../common/MyAnimation": "MyAnimation",
"../common/SceneManager": "SceneManager",
"../common/Toast": "Toast",
"../units/Tool": "Tool",
"../units/UserConfig": "UserConfig"
} ],
UserConfig: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "afe296oseNC3re893ByDpbE", "UserConfig");
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = function() {
function t() {
cc.sys.localStorage.getItem("rememberAudio") ? this.AudioConfig = JSON.parse(cc.sys.localStorage.getItem("rememberAudio")) : this.AudioConfig = {
openBgm: !0,
openEff: !0,
bgmVol: 1,
effVol: 1
};
this.BgmNameArr = [ "", "bgm/hzj", "", "", "bgm/gtm" ];
this.EffNameArr = [ "eff/animbq/chicken", "eff/animbq/tomato", "eff/animbq/flower", "eff/animbq/boom", "eff/animbq/water", "eff/card/send_card", "eff/newgame", "eff/gold/add_gold", "eff/gold/sub_gold" ];
this.userinfo = {
gold: 0,
phone: "13345671231",
avatar: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3087570435,2147751204&fm=26&gp=0.jpg",
id: "12138",
nickname: "虹之间",
pd: "1233333333",
parentID: "12137"
};
this.realNameInfo = {
realname: "",
idnumber: ""
};
}
t.getInstance = function() {
if (!t.m_instance) {
t.m_instance = new t();
return t.m_instance;
}
return t.m_instance;
};
t.prototype.getAudioConfig = function() {
return this.AudioConfig;
};
t.prototype.getBgmNameFronCode = function(t) {
return this.BgmNameArr[t];
};
t.prototype.getEffNameFronCode = function(t) {
return this.EffNameArr[t];
};
t.prototype.getUserInfo = function() {
return this.userinfo;
};
t.prototype.getRealNameInfo = function() {
return this.realNameInfo;
};
t.prototype.getTableInfo = function() {
return this.TableInfo;
};
t.prototype.getSgSetViewConfig = function() {
return cc.sys.localStorage.getItem("sgSetView") ? JSON.parse(cc.sys.localStorage.getItem("sgSetView")) : {
tableid: 0,
cardid: 0
};
};
t.prototype.setSgSetViewConfig = function(t) {
cc.sys.localStorage.setItem("sgSetView", JSON.stringify(t));
};
t.prototype.setBgmVolConfig = function(t) {
t < 0 || t > 1 || (this.AudioConfig.bgmVol = t);
};
t.prototype.setEffVolConfig = function(t) {
t < 0 || t > 1 || (this.AudioConfig.effVol = t);
};
t.prototype.setBgmState = function(t) {
this.AudioConfig.openBgm = t;
};
t.prototype.setEffState = function(t) {
this.AudioConfig.openEff = t;
};
t.prototype.saveMusicConfig = function() {
cc.sys.localStorage.setItem("rememberAudio", JSON.stringify(this.AudioConfig));
};
t.prototype.setUserInfo = function(t) {
var e = t;
e.gold && (this.userinfo.gold = e.gold);
e.avatar && (this.userinfo.avatar = e.avatar);
e.phone && (this.userinfo.phone = e.phone);
e.id && (this.userinfo.id = e.id);
e.parentID && (this.userinfo.parentID = e.parentID);
e.nickname && (this.userinfo.nickname = e.nickname);
};
t.prototype.setRealNameInfo = function(t) {
this.realNameInfo.idnumber = t.idnumber;
this.realNameInfo.realname = t.realname;
};
t.prototype.setTableInfo = function(t) {
this.TableInfo = t;
};
return t;
}();
o.default = i;
cc._RF.pop();
}, {} ],
User: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "dd2e2+MDWhIj6kXrwS3HA11", "User");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MUser = void 0;
var c = t("../../common/MyAnimation"), a = t("../../common/Toast"), s = t("../../units/Tool"), r = t("../../units/UserConfig"), l = function(t) {
n(e, t);
function e() {
var e = t.call(this) || this;
e.changeNameState = [ "昵称长度不正确4-12位!", "昵称只能为英文汉字或下滑线", "昵称修改成功!", "昵称修改失败" ];
e.S_moneyFlow = e.S_realName = e.S_changeName = e.S_changePD = e.S_hallAvatarToUser = e.S_updataAvatar = e.S_hallAddGold = BUTTON_STATE.ON;
return e;
}
e.prototype.getUserInfoButtonState = function() {
return this.S_hallAvatarToUser;
};
e.prototype.getChangeNameButtonState = function() {
return this.S_changeName;
};
e.prototype.getHallAddGoldButtonState = function() {
return this.S_hallAddGold;
};
e.prototype.getRealNameButtonState = function() {
return this.S_realName;
};
e.prototype.getChangePDButtonState = function() {
return this.S_changePD;
};
e.prototype.getMoneyFlowButtonState = function() {
return this.S_moneyFlow;
};
e.prototype.getAvatarButtonState = function() {
return this.S_updataAvatar;
};
e.prototype.getUserInfo = function() {
return r.default.getInstance().getUserInfo();
};
e.prototype.changeName = function(t) {
if (t.nickname.length < 4 || t.nickname.length > 12) return CHANGE_NAME_RESULT.NAME_LENGTH_ERROR;
if (!s.default.getInstance().isNickName(t.nickname)) return CHANGE_NAME_RESULT.NAME_CHECK_ERROR;
r.default.getInstance().setUserInfo({
nickname: t.nickname
});
return CHANGE_NAME_RESULT.SUCCESS;
};
return e;
}(c.default);
o.MUser = l;
var u = function(t) {
n(e, t);
function e(e, o, i, n) {
var c = t.call(this) || this;
c.node = e;
c.m_toast = cc.find("common/toast", c.node);
c.m_mask = cc.find("popup/mask", c.node);
c.m_root = cc.find("popup/userinfo", c.node);
c.m_hallNickName = cc.find("top/userinfo/userinfo/name", c.node).getComponent(cc.Label);
c.m_hallId = cc.find("top/userinfo/userinfo/id", c.node).getComponent(cc.Label);
c.m_hallgold = cc.find("top/gold/value", c.node).getComponent(cc.Label);
c.m_inputName = cc.find("popup/userinfo/nickname/inputname", c.node);
c.m_id = cc.find("popup/userinfo/id", c.node).getComponent(cc.Label);
c.m_parentID = cc.find("popup/userinfo/parentid", c.node).getComponent(cc.Label);
c.m_phone = cc.find("popup/userinfo/phone", c.node).getComponent(cc.Label);
c.i_editName = cc.find("popup/userinfo/nickname/icon_change", c.node);
c.i_hallAddGold = cc.find("top/gold/add", c.node);
c.i_hallAvatarSpriteNode = cc.find("top/userinfo/avatar/mask", c.node);
c.i_avatarNode = cc.find("popup/userinfo/avatar/mask", c.node);
c.i_realName = cc.find("popup/userinfo/button_realname", c.node);
c.i_resetPd = cc.find("popup/userinfo/button_resetpd", c.node);
c.i_moneyflow = cc.find("popup/userinfo/button_moneyflow", c.node);
c.i_close = cc.find("popup/userinfo/button_close", c.node);
c.m_root.active = !1;
c.cl_ResetPdView = o;
c.cl_RealNameView = i;
c.cl_MoneyFlowView = n;
c.UpdateBaseInfo();
c.addEvent();
return c;
}
Object.defineProperty(e.prototype, "changeNameParam", {
get: function() {
return {
nickname: this.m_inputName.getComponent(cc.EditBox).string
};
},
enumerable: !1,
configurable: !0
});
e.prototype.click_AvatarToUser = function() {
switch (this.getUserInfoButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.show();
}
};
e.prototype.click_AddGold = function() {
switch (this.getHallAddGoldButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
a.default.getInstance().show("请联系上级充值!", this.m_toast);
}
};
e.prototype.click_Realname = function() {
switch (this.getRealNameButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.cl_RealNameView.show();
}
};
e.prototype.click_ResetPD = function() {
switch (this.getChangePDButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.cl_ResetPdView.show();
}
};
e.prototype.click_MoneyFlow = function() {
switch (this.getMoneyFlowButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
this.cl_MoneyFlowView.show();
}
};
e.prototype.click_Avatar = function() {
var t = this;
switch (this.getAvatarButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
a.default.getInstance().show("正在读取文件...", this.m_toast);
setTimeout(function() {
cc.sys.isNative ? cc.sys.os === cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(className, "getImgData", "()V") : cc.sys.os === cc.sys.OS_IOS || cc.sys.os === cc.sys.OS_WINDOWS && a.default.getInstance().show("TIP 浏览器下无法上传头像,请使用APP上传!", t.m_toast) : a.default.getInstance().show("TIP 浏览器下无法上传头像,请使用APP上传!", t.m_toast);
}, 1e3);
return;
}
};
e.prototype.click_ChangeName = function() {
switch (this.getChangeNameButtonState()) {
case BUTTON_STATE.OFF:
a.default.getInstance().show("暂未开放!", this.m_toast);
break;

case BUTTON_STATE.ON:
var t = this.changeName(this.changeNameParam);
a.default.getInstance().show(this.changeNameState[t], this.m_toast);
this.UpdateBaseInfo();
return;
}
};
e.prototype.show = function() {
this.UpdateUserInfo();
this.popupOpenScaleXY(this.m_root, this.m_mask, this.addUserInfoEvent.bind(this));
};
e.prototype.hide = function() {
this.popupCloseScaleXY(this.m_root, this.m_mask, this.hideUserInfoEvent.bind(this));
};
e.prototype.UpdateUserInfo = function() {
var t = this.getUserInfo();
this.m_phone.string = "手机号: " + t.phone;
this.m_id.string = "ID: " + t.id;
this.m_parentID.string = "上级ID: " + t.parentID;
this.UpdateAvatar(t.avatar);
this.m_inputName.getComponent(cc.EditBox).string = t.nickname;
};
e.prototype.clearName = function() {
this.m_inputName.getComponent(cc.EditBox).string = "";
this.m_inputName.getComponent(cc.EditBox).focus();
};
e.prototype.UpdateAvatar = function(t) {
s.default.getInstance().LoadImageRemote(this.i_avatarNode.getChildByName("avatar"), t, new cc.Vec2(82, 82));
s.default.getInstance().LoadImageRemote(this.i_hallAvatarSpriteNode.getChildByName("avatar"), t, new cc.Vec2(82, 82));
};
e.prototype.UpdateBaseInfo = function() {
var t = this.getUserInfo();
this.m_hallgold.string = String(t.gold);
this.m_hallId.string = "ID: " + t.id;
this.m_hallNickName.string = "昵称: " + t.nickname;
this.m_inputName.getComponent(cc.EditBox).string = t.nickname;
this.UpdateAvatar(t.avatar);
};
e.prototype.hideUserInfoEvent = function() {
this.i_moneyflow.off("touchend");
this.i_realName.off("touchend");
this.i_resetPd.off("touchend");
this.i_close.off("touchend");
this.i_avatarNode.off("touchend");
this.i_editName.off("touchend");
this.m_inputName.off("editing-did-ended");
};
e.prototype.addUserInfoEvent = function() {
this.i_moneyflow.on("touchend", this.click_MoneyFlow.bind(this));
this.i_realName.on("touchend", this.click_Realname.bind(this));
this.i_resetPd.on("touchend", this.click_ResetPD.bind(this));
this.i_avatarNode.on("touchend", this.click_Avatar.bind(this));
this.i_close.on("touchend", this.hide.bind(this));
this.i_editName.on("touchend", this.clearName.bind(this));
this.m_inputName.on("editing-did-ended", this.click_ChangeName.bind(this));
};
e.prototype.addEvent = function() {
var t = this;
this.i_hallAvatarSpriteNode.on("touchend", function() {
t.click_AvatarToUser();
}, this);
this.i_hallAddGold.on("touchend", function() {
t.click_AddGold();
}, this);
};
e.prototype.start = function() {};
e.prototype.onDestory = function() {};
return e;
}(l);
o.default = u;
cc._RF.pop();
}, {
"../../common/MyAnimation": "MyAnimation",
"../../common/Toast": "Toast",
"../../units/Tool": "Tool",
"../../units/UserConfig": "UserConfig"
} ],
Version: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "503df4XCuVDmIpOhrRLcGvs", "Version");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), c = this && this.__decorate || function(t, e, o, i) {
var n, c = arguments.length, a = c < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (c < 3 ? n(a) : c > 3 ? n(e, o, a) : n(e, o)) || a);
return c > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = t("../common/SceneManager"), s = t("../units/AudioManager"), r = cc._decorator, l = r.ccclass, u = r.property, h = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.manifest = null;
e.onDestroy = function() {
this.speedtimer && clearTimeout(this.speedtimer);
this.timer && clearTimeout(this.timer);
this.timer = null;
this.speedtimer = null;
};
return e;
}
e.prototype.onLoad = function() {
this.am = null;
this.downloadUrl = null;
this.root = cc.find("loading", this.node);
this.stateStr = cc.find("loading/progress/state/content", this.node).getComponent(cc.Label);
this.detailStr = cc.find("loading/progress/state/detail", this.node).getComponent(cc.Label);
this.verStr = cc.find("loading/version/value", this.node).getComponent(cc.Label);
this.bar = cc.find("loading/progress", this.node).getComponent(cc.ProgressBar);
this.index = this.index2 = this.byte = 0;
this.flush = 0;
};
e.prototype.show = function() {
this.bar.progress = 0;
this.root.active = !0;
};
e.prototype.hide = function() {
this.bar.progress = 0;
this.root.active = !1;
};
e.prototype.compare = function(t, e) {
if (t && e) {
for (var o = t.split("."), i = e.split("."), n = Math.min(o.length, i.length), c = 0, a = 0; c < n && 0 == (a = parseInt(o[c]) - parseInt(i[c])); ) c++;
return (a = 0 != a ? a : o.length - i.length) < 0 ? -1 : 1;
}
return 1;
};
e.prototype.validate = function(t) {
var e = this;
this.stateStr.string = "状态: 非原生,系统将不进行更新!";
cc.sys.localStorage.getItem("hotUpdateVer") ? this.verStr.string = "版本号: " + cc.sys.localStorage.getItem("hotUpdateVer") : this.verStr.string = "版本号: " + JSON.parse(JSON.parse(this.manifest._nativeAsset).version).hotUpdate;
if (!cc.sys.isNative || this.am) {
this.stateStr.string = "状态: 非原生,系统将不进行更新!";
this.timer = setTimeout(function() {
e.hide();
t(5);
}, 2e3);
return !0;
}
this.stateStr.string = "状态: 正在检查更新...";
this.callback = t;
var o = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "testupdate/";
cc.sys.localStorage.setItem("storagePath", o);
jsb.fileUtils.isDirectoryExist(o) || jsb.fileUtils.createDirectory(o);
this.am = new jsb.AssetsManager("", o);
this.am.setVersionCompareHandle(function(t, e) {
var o = JSON.parse(t).hotUpdate, i = JSON.parse(e).hotUpdate, n = JSON.parse(t).android, c = JSON.parse(e).android;
if (cc.sys.OS_IOS === cc.sys.os) cc.sys.localStorage.setItem("isNewAndroidVersion", !1); else if (cc.sys.OS_ANDROID === cc.sys.os || cc.sys.OS_WINDOWS === cc.sys.os) {
if (-1 == this.compare(n, c)) {
cc.sys.localStorage.setItem("isNewAndroidVersion", !0);
return 1;
}
cc.sys.localStorage.setItem("isNewAndroidVersion", !1);
}
return this.compare(o, i);
}.bind(this));
this.am.setMaxConcurrentTask(4);
if (this.am.getState() === jsb.AssetsManager.State.UNINITED) {
var i = this.manifest.nativeUrl;
cc.loader.md5Pipe && (i = cc.loader.md5Pipe.transformURL(i));
this.am.loadLocalManifest(i);
}
cc.sys.os, cc.sys.OS_IOS, this.verStr.string = "版本号: " + JSON.parse(this.am.getLocalManifest().getVersion()).hotUpdate;
if (this.am.getLocalManifest() && this.am.getLocalManifest().isLoaded()) {
this.am.setEventCallback(this.checkCb.bind(this));
setTimeout(function() {
"passport" == a.default.getInstance().getSceneName() && e.am.checkUpdate();
}, 1e3);
} else {
this.stateStr.string = "状态: 获取本地 manifest文件失败!";
t(3);
}
};
e.prototype.checkCb = function(t) {
var e = this;
cc.log("Code:----------- " + t.getEventCode());
switch (t.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
this.stateStr.string = "状态: 本地manifest文件查找失败,请重新下载安装本应用!";
this.callback(1);
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
this.stateStr.string = "状态: 下载manifest文件失败,请稍后再试!";
this.callback(2);
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
if ("true" == cc.sys.localStorage.getItem("isNewAndroidVersion")) {
var o = this.am.getRemoteManifest().getVersion(), i = JSON.parse(o).android;
this.stateStr.string = "状态: 当前安装包文件不是最新版本  " + i + "  请下载最新安装包安装!";
this.callback(4);
} else {
this.stateStr.string = "状态: 当前已经是最新版本,更新完成!";
this.bar.progress = 1;
setTimeout(function() {
if ("passport" == a.default.getInstance().getSceneName()) {
e.hide();
e.callback(0);
}
}, 3e3);
}
break;

case jsb.EventAssetsManager.NEW_VERSION_FOUND:
var n = this.am.getRemoteManifest().getVersion(), c = JSON.parse(n).hotUpdate;
this.stateStr.string = "状态: 发现新版本" + c + "   准备更新文件...";
this.remoteVersion = c;
this.bar.progress = 0;
setTimeout(function() {
"passport" == a.default.getInstance().getSceneName() && e.hotUpdate();
}, 3e3);
break;

default:
return;
}
this.am.setEventCallback(null);
this.updating = !1;
};
e.prototype.hotUpdate = function() {
var t = this;
this.speedtimer && clearTimeout(this.speedtimer);
this.timer && clearTimeout(this.timer);
this.timer = null;
this.speedtimer = null;
this.stateStr.string = "状态: 正在更新";
var e = 0, o = "";
this.timer = setInterval(function() {
if (e > 2) {
e = 0;
o = "";
} else {
o += ".";
e++;
}
t.stateStr.string = "状态: 正在更新" + o;
}, 1e3);
if (this.am && !this.updating) {
this.am.setEventCallback(this.updateCb.bind(this));
if (this.am.getState() === jsb.AssetsManager.State.UNINITED) {
var i = this.manifest.nativeUrl;
cc.loader.md5Pipe && (i = cc.loader.md5Pipe.transformURL(i));
this.am.loadLocalManifest(i);
}
this.am.update();
this.updating = !0;
}
};
e.prototype.updateCb = function(t) {
var e = this, o = !1, i = !1;
switch (t.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
i = !0;
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
this.bar.progress = t.getPercent();
this.index = (t.getDownloadedBytes() / 1024 / 1024).toString().indexOf(".");
this.downSize = (t.getDownloadedBytes() / 1024 / 1024).toString().slice(0, this.index + 3) + "M";
this.index2 = (t.getTotalBytes() / 1024 / 1024).toString().indexOf(".");
this.totalSize = (t.getTotalBytes() / 1024 / 1024).toString().slice(0, this.index2 + 3) + "M";
if (!this.speedtimer) {
this.detailStr.string = this.downSize + " / " + this.totalSize;
this.speedtimer = setInterval(function() {
var o = Math.ceil((t.getDownloadedBytes() - e.byte) / 1024);
if (e.flush % 5 == 0) if (o >= 1024) {
var i = (o /= 1024).toString().indexOf(".");
o = Number(o.toString().slice(0, i + 3));
e.detailStr.string = o + "MB/s  " + e.downSize + " / " + e.totalSize;
} else e.detailStr.string = o + "KB/s  " + e.downSize + " / " + e.totalSize; else if (o >= 1024) {
i = (o /= 1024).toString().indexOf(".");
o = Number(o.toString().slice(0, i + 3));
e.detailStr.string = 5 * o + "MB/s  " + e.downSize + " / " + e.totalSize;
} else e.detailStr.string = 5 * o + "KB/s  " + e.downSize + " / " + e.totalSize;
e.byte = t.getDownloadedBytes();
e.flush += 1;
}, 200);
}
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
i = !0;
break;

case jsb.EventAssetsManager.UPDATE_FINISHED:
o = !0;
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
this.stateStr.string = "状态: 发现有下载失败的文件,准备重新下载...";
setTimeout(function() {
if ("passport" == a.default.getInstance().getSceneName()) {
e.am.downloadFailedAssets();
e.updating = !1;
}
}, 2e3);
break;

case jsb.EventAssetsManager.ERROR_UPDATING:
o = !1;
this.stateStr.string = "状态: 资源更新错误  文件: " + t.getAssetId();
break;

case jsb.EventAssetsManager.ERROR_DECOMPRESS:
this.stateStr.string = "状态: " + t.getMessage();
}
if (i) {
this.am.setEventCallback(null);
this.updating = !1;
}
if (o) {
cc.sys.localStorage.setItem("hotUpdateVer", this.remoteVersion);
this.speedtimer && clearTimeout(this.speedtimer);
this.timer && clearTimeout(this.timer);
this.timer = null;
this.speedtimer = null;
this.am.setEventCallback(null);
var n = jsb.fileUtils.getSearchPaths(), c = this.am.getLocalManifest().getSearchPaths();
n[0] != c && Array.prototype.unshift.apply(n, c);
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(n));
cc.sys.localStorage.removeItem("showUpdateLog");
jsb.fileUtils.setSearchPaths(n);
this.stateStr.string = "状态: 更新完成正在重新启动...";
this.bar.progress = 1;
setTimeout(function() {
s.default.getInstance().stopAll();
cc.game.restart();
}, 2e3);
}
};
c([ u(cc.Asset) ], e.prototype, "manifest", void 0);
return c([ l ], e);
}(cc.Component);
o.default = h;
cc._RF.pop();
}, {
"../common/SceneManager": "SceneManager",
"../units/AudioManager": "AudioManager"
} ],
rectframe: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "8d9f8WXcrhIfZ70g4nzwi6F", "rectframe");
var i, n = this && this.__extends || (i = function(t, e) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
i(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), c = this && this.__decorate || function(t, e, o, i) {
var n, c = arguments.length, a = c < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (c < 3 ? n(a) : c > 3 ? n(e, o, a) : n(e, o)) || a);
return c > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = cc._decorator, s = a.ccclass, r = a.property, l = a.menu, u = a.requireComponent, h = a.disallowMultiple, d = a.executeInEditMode;
cc.macro.ENABLE_WEBGL_ANTIALIAS = !0;
var p = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.radius = 20;
e.size = new cc.Vec2();
e.image = null;
return e;
}
Object.defineProperty(e.prototype, "boxRadius", {
get: function() {
return this.radius;
},
set: function(t) {
this.radius = t;
this.drawRadius();
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "boxSize", {
get: function() {
return this.size;
},
set: function(t) {
this.size = t;
this.node.setContentSize(t.x, t.y);
this.image.setContentSize(t.x, t.y);
this.drawRadius();
},
enumerable: !1,
configurable: !0
});
e.prototype.drawRadius = function() {
var t = this.node.getContentSize(), e = cc.rect(-t.width / 2, -t.height / 2, t.width, t.height), o = this.getComponent(cc.Mask)._graphics;
this.drawRoundRect(o, e);
};
e.prototype.drawRoundRect = function(t, e) {
var o = e.x, i = e.y, n = e.width, c = e.height;
t.clear();
t.lineWidth = 1;
t.roundRect(o, i, n, c, this.radius);
t.fill();
t.stroke();
};
e.prototype.createImage = function() {
if (!this.node.children[0]) {
this.image = new cc.Node("image");
this.image.parent = this.node;
this.image.addComponent(cc.Sprite);
this.image.getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.CUSTOM;
}
};
e.prototype.onEnable = function() {
this.drawRadius();
};
e.prototype.start = function() {
this.createImage();
this.node.on("position-changed", this.drawRadius.bind(this));
};
c([ r({
visible: !1
}) ], e.prototype, "radius", void 0);
c([ r({
visible: !1
}) ], e.prototype, "size", void 0);
c([ r({
displayName: "圆角半径"
}) ], e.prototype, "boxRadius", null);
c([ r({
displayName: "矩形大小"
}) ], e.prototype, "boxSize", null);
c([ r({
visible: !1
}) ], e.prototype, "image", void 0);
return c([ s(), h(), d(), u(cc.Mask), l("公共/矩形圆角遮罩") ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {} ],
switchsp: [ function(t, e) {
"use strict";
cc._RF.push(e, "66152Xfz6RHdKNFKSQv85Yd", "switchsp");
cc.Class({
extends: cc.Sprite,
editor: {
menu: "渲染组件/switchSp",
executeInEditMode: !0,
disallowMultiple: !0
},
properties: {
cacheArr: {
tooltip: !1,
type: [ cc.SpriteFrame ],
default: [],
notify: function() {
this._show = !1;
for (var t = 0; t < this.cacheArr.length; ++t) if (this.cacheArr[t] && this.cacheArr[t] instanceof cc.SpriteFrame) {
this._show = !0;
break;
}
this.curSp = this._curID;
}
},
_curID: -1,
_show: !1,
curSp: {
tooltip: !1,
type: cc.Integer,
get: function() {
return this._curID;
},
set: function(t) {
if (!(t < -1 || !Array.isArray(this.cacheArr) || t > this.cacheArr.length - 1) && cc.isValid(this.node, !0)) if (-1 != t && this.cacheArr[t] && this.cacheArr[t] instanceof cc.SpriteFrame) {
this.spriteFrame = this.cacheArr[t];
this._curID = t;
} else {
this.spriteFrame = null;
this._curID = t;
}
},
visible: function() {
return this._show;
}
}
},
updateFrame: function(t, e) {
if (t > this.cacheArr.length - 1 || !(e instanceof cc.SpriteFrame)) return !1;
this.cacheArr[t] = e;
this.getShowID() === t && this.setSpriteFrame(t);
return !0;
},
pushFrame: function(t) {
if (t instanceof cc.SpriteFrame) {
this.cacheArr.push(t);
return this.spriteArr.length - 1;
}
return -1;
},
setSpriteFrame: function(t) {
this.curSp = t;
},
getShowID: function() {
return this.curSp;
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "AtlasLib", "CountDown", "Dialog", "Emitter", "FlashLightUBO", "GoldChange", "MyAnimation", "NodePool", "Notice", "Observer", "PeekCard", "SceneManager", "ScrollViewRenderData", "SetView", "TimerStruct", "Toast", "rectframe", "Hall", "HallModelManager", "Home", "Left", "Navbar", "User", "AgentView", "MoneyFlowView", "MsgView", "PlayView", "RealNameView", "RecordView", "ResetPdView", "ShareView", "ForgetPd", "Loading", "Login", "Passoprt", "Regist", "Version", "GameView", "Room", "RoomView", "RuleView", "TopView", "SanGongData", "BetManager", "CardLib", "MainSg", "OpenCard", "Player", "PlayerGold", "PlayerInfo", "SGSetView", "SGView", "AudioManager", "EmitterCode", "List", "ListItem", "ListOpacity", "Tool", "UserConfig", "switchsp" ]);