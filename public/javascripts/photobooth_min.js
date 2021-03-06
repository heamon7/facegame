/**
 *
 * Photobooth.js version 0.7
 *
 * build Thu Oct 17 2013 16:43:37 GMT-0700 (Pacific Daylight Time)
 *
 * CSS
 */
window.addEventListener("load", function() {
    var s = document.createElement("style");
    s.innerHTML = ".photobooth{position:relative;font:11px arial,sans-serif;overflow:hidden;user-select:none;-webkit-user-select:none;-moz-user-select:none;-o-user-select:none}.photobooth canvas{position:absolute;left:0;top:0}.photobooth .blind{position:absolute;left:0;top:0;opacity:0;width:100%;height:100%;background:#fff;z-index:1}.photobooth .blind.anim{transition:opacity 1500ms ease-out;-o-transition:opacity 1500ms ease-out;-moz-transition:opacity 1500ms ease-out;-webkit-transition:opacity 1500ms ease-out}.photobooth .warning{position:absolute;top:45%;background:#ffebeb;color:#cf0000;border:1px solid #cf0000;width:60%;left:50%;margin-left:-30%;display:none;padding:5px;z-index:10;text-align:center}.photobooth .warning span{text-decoration:underline;cursor:pointer;color:#333}background-position:top left;background-repeat:no-repeat}";
    document.head.appendChild(s);
}, false);
/**
 * JS
 */
Photobooth = function(e) {
    e.length && (e = e[0]);
    var t = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.oGetUserMedia || navigator.msieGetUserMedia || !1;
    this.onImage = function() {}, this.getHueOffset = function() {
        return o
    }, this.setHueOffset = function(e) {
        v(e, "hue") && (o = e)
    }, this.getBrightnessOffset = function() {
        return a
    }, this.setBrightnessOffset = function(e) {
        v(e, "brightness") && (a = e)
    }, this.getSaturationOffset = function() {
        return u
    }, this.setSaturationOffset = function(e) {
        v(e, "saturation") && (u = e)
    }, this.pause = function() {
        l === !1 && (l = !0, c && c.stop && c.stop())
    }, this.resume = function() {
        l === !0 && (l = !1, M())
    }, this.destroy = function() {
        this.pause(), e.removeChild(b)
    }, this.forceHSB = !1, this.isSupported = !! t, this.resize = function(e, t) {
        if (e < 200 || t < 200) throw "Error: Not enough space for Photobooth. Min height / width is 200 px";
        p = e, d = t, C.setMax(p, d), b.style.width = e + "px", b.style.height = t + "px", w.width = e, w.height = t, S.width = e, S.height = t, T.width = e, T.height = t
    };
    var n = function(e) {
        e.stopPropagation(), e.cancelBubble = !0
    }, r = function(e) {
        this.startX = 0, this.startY = 0, e.addEventListener("mousedown", this, !1)
    };
    r.prototype.onStart = function(e, t) {}, r.prototype.onMove = function(e, t) {}, r.prototype.onStop = function(e, t) {}, r.prototype.handleEvent = function(e) {
        this["fon" + e.type](e)
    }, r.prototype.fonmousedown = function(e) {
        e.preventDefault(), this.startX = e.clientX, this.startY = e.clientY, this.onStart(this.startX, this.startY), document.addEventListener("mousemove", this, !1), document.addEventListener("mouseup", this, !1)
    }, r.prototype.fonmousemove = function(e) {
        this.onMove(e.clientX - this.startX, e.clientY - this.startY)
    }, r.prototype.fonmouseup = function(e) {
        this.onStop(e.clientX - this.startX, e.clientY - this.startY), document.removeEventListener("mousemove", this), document.removeEventListener("mouseup", this)
    };
    var i = function(e, t) {
            e.innerHTML = '<div class="submenu"><div class="tip"></div><div class="slider"><div class="track"></div><div class="handle" style="left:50px"><div></div></div></div></div>';
            var i = 50,
                s = 50,
                o = e.getElementsByClassName("handle")[0],
                u = e.getElementsByClassName("slider")[0],
                a = new r(o);
            a.onMove = function(e) {
                f(i + e)
            }, a.onStop = function(e) {
                i = s
            };
            var f = function(e) {
                e > 0 && e < 100 && (s = e, o.style.left = e + "px", t((e - 50) / 100))
            }, l = function(e) {
                f(e.layerX), i = s
            };
            u.addEventListener("click", l, !1), o.addEventListener("click", n, !1)
        }, s = function(e, t, i) {
            this.setMax = function(e, n) {
                t = e, i = n
            }, this.getData = function() {
                return {
                    x: s,
                    y: o,
                    width: u,
                    height: a
                }
            }, this.isActive = function() {
                return p
            }, this.toggle = function() {
                p === !1 ? (d.style.opacity = 1, p = !0) : (d.style.opacity = 0, p = !1)
            };
            var s = 30,
                o = 30,
                u = 100,
                a = 100,
                f = 30,
                l = 30,
                c = 100,
                h = 100,
                p = !1,
                d = document.createElement("div");
            d.className = "resizehandle", d.innerHTML = '<div class="handle"><div></div></div>', e.appendChild(d);
            var v = d.getElementsByTagName("div")[0],
                m = new r(v);
            m.onMove = function(e, n) {
                s + e + u < t && s + e > 0 && (f = s + e, d.style.left = f + "px"), o + n + a < i && o + n > 0 && (l = o + n, d.style.top = l + "px")
            }, m.onStop = function() {
                s = f, o = l
            };
            var g = d.getElementsByTagName("div")[1];
            g.addEventListener("mousedown", n, !1);
            var y = new r(g);
            y.onMove = function(e, n) {
                s + e + u < t && u + e > 18 && (c = u + e, d.style.width = c + "px"), o + n + a < i && a + n > 18 && (h = a + n, d.style.height = h + "px")
            }, y.onStop = function() {
                u = c, a = h
            }
        }, o = 0,
        u = 0,
        a = 0,
        f = !1,
        l = !1,
        c = null,
        h = this,
        p = e.offsetWidth,
        d = e.offsetHeight,
        v = function(e, t) {
            if (e < -0.5 || e > .5) throw "Invalid value: " + t + " must be between 0 and 1";
            return !0
        }, m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
                window.setTimeout(e, 1e3 / 60)
            }, g = function(e) {
            return b.getElementsByClassName(e)[0]
        }, y = function(e) {
            return document.createElement(e)
        }, b = y("div");
    b.className = "photobooth", b.innerHTML = '<div class="blind"></div><canvas></canvas><div class="warning notSupported">Sorry, Photobooth/div><div class="warning noWebcam">Please give Photobooth permission to use your Webcam. <span>Try again</span></div><ul><li title="hue"class="hue"></li><li title="saturation"class="saturation"></li><li title="brightness"class="brightness"></li><li title="crop"class="crop"></li><li title="take picture"class="trigger"></li></ul>';
    var w = y("canvas"),
        E = w.getContext("2d"),
        S = b.getElementsByTagName("canvas")[0],
        x = S.getContext("2d"),
        T = y("video");
    T.autoplay = !0;
    var N = g("noWebcam");
    N.getElementsByTagName("span")[0].onclick = function() {
        M()
    }, new i(g("hue"), function(e) {
        o = e
    }), new i(g("saturation"), function(e) {
        u = e
    }), new i(g("brightness"), function(e) {
        a = e
    });
    var C = new s(b, p, d),
        k = g("crop");
    k.onclick = function() {
        C.toggle(), k.className === "crop" ? k.className = "crop selected" : k.className = "crop"
    };
    var L = g("blind");
    g("trigger").onclick = function() {

        var e = {};
        C.isActive() ? e = C.getData() : f ? e = {
            x: (p - T.videoWidth) / 2,
            y: (d - T.videoHeight) / 2,
            width: T.videoWidth,
            height: T.videoHeight
        } : e = {
            x: 0,
            y: 0,
            width: p,
            height: d
        };
        var t = y("canvas");
        t.width = e.width, t.height = e.height;
        if (f) t.getContext("2d").drawImage(T, Math.max(0, e.x - (p - T.videoWidth) / 2), Math.max(e.y - (d - T.videoHeight) / 2), e.width, e.height, 0, 0, e.width, e.height);
        else {
            var n = x.getImageData(e.x, e.y, e.width, e.height);
            t.getContext("2d").putImageData(n, 0, 0)
        }
        h.onImage(t.toDataURL())
    };
    var A = function(e) {
        c = e;
        try {
            T.src = (window.URL || window.webkitURL).createObjectURL(c), m(H)
        } catch (t) {
            T.mozSrcObject = c, h.forceHSB === !1 ? (f = !0, b.appendChild(T), b.getElementsByTagName("ul")[0].className = "noHSB") : T.addEventListener("canplay", function() {
                m(H)
            }, !1), T.play()
        }
    }, O = function(e) {
        N.style.display = "block"
    }, M = function() {
        N.style.display = "none", t.call(navigator, {
            video: !0
        }, A, O)
    }, _ = function(e, t, n) {
        return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
    }, D = function(e) {
        return e > 1 ? e - 1 : e < 0 ? 1 + e : e
    }, P = function(e) {
        return e > 1 ? 1 : e < 0 ? 0 : e
    }, H = function() {
        try {
            E.drawImage(T, 0, 0, p, d)
        } catch (e) {}
        var t = E.getImageData(0, 0, p, d),
            n = t.data;
        for (var r = 0; r < n.length; r += 4) {
            var i = n[r] / 255,
                s = n[r + 1] / 255,
                f = n[r + 2] / 255,
                c = Math.max(i, s, f),
                h = Math.min(i, s, f),
                v, g, y = (c + h) / 2;
            if (c == h) v = g = 0;
            else {
                var b = c - h;
                g = y > .5 ? b / (2 - c - h) : b / (c + h), c === i && (v = ((s - f) / b + (s < f ? 6 : 0)) / 6), c === s && (v = ((f - i) / b + 2) / 6), c === f && (v = ((i - s) / b + 4) / 6)
            }
            v = D(v + o), g = P(g + u), y = P(y + a);
            if (g === 0) i = s = f = y;
            else {
                var w = y < .5 ? y * (1 + g) : y + g - y * g,
                    S = 2 * y - w;
                i = _(S, w, v + 1 / 3), s = _(S, w, v), f = _(S, w, v - 1 / 3)
            }
            n[r] = i * 255, n[r + 1] = s * 255, n[r + 2] = f * 255
        }
        x.putImageData(t, 0, 0), l === !1 && m(H)
    };
    this.resize(p, d), e.appendChild(b), t ? m(M) : g("notSupported").style.display = "block"
}
/**
 * jQuery integration. (It's safe to delete this line if you're not using jQuery)
 */
window.jQuery && ($.fn.photobooth = function() {
    return this.each(function(e, t) {
        var n = new Photobooth(t);
        $(t).data("photobooth", n), n.onImage = function(e) {
            $(t).trigger("image", e)
        }
    })
})