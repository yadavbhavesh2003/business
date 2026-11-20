/* UdyamOS local preview runtime.
 * Renders the exported .html screens (Design Component format) in a normal browser:
 * {{holes}}, <sc-for>, <sc-if>, <dc-import>, onClick="{{fn}}", class Component extends DCLogic.
 * Needs a web server (fetch is used), e.g. XAMPP: http://localhost/businessMitra/design/export/
 */
(function () {
  'use strict';
  var hide = document.createElement('style');
  hide.textContent = 'x-dc, script[type="text/x-dc"] { display: none !important; }';
  document.head.appendChild(hide);

  function DCLogic(props) { this.props = props || {}; this.state = {}; }
  DCLogic.prototype.setState = function (patch) {
    var p = typeof patch === 'function' ? patch(this.state, this.props) : patch;
    this.state = Object.assign({}, this.state, p);
    if (this.__rerender) this.__rerender();
  };
  DCLogic.prototype.forceUpdate = function () { if (this.__rerender) this.__rerender(); };
  DCLogic.prototype.renderVals = function () { return {}; };
  window.DCLogic = DCLogic;

  function esc(v) {
    return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function lookup(path, scope) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (path === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    if (/^'.*'$|^".*"$/.test(path)) return path.slice(1, -1);
    var parts = path.split('.'), v = scope;
    for (var i = 0; i < parts.length; i++) { if (v == null) return undefined; v = v[parts[i]]; }
    return v;
  }
  function attrOf(tag, name) {
    var m = tag.match(new RegExp('\\s' + name + '="([^"]*)"'));
    return m ? m[1] : null;
  }
  function holeVal(raw, scope) {
    var m = raw && raw.match(/^\s*\{\{([^}]+)\}\}\s*$/);
    return m ? lookup(m[1], scope) : raw;
  }
  // find the matching close tag for a block element, counting nesting
  function findClose(src, name, from) {
    var open = new RegExp('<' + name + '[\\s>]', 'g'), close = '</' + name + '>', depth = 1, pos = from;
    while (depth > 0) {
      var c = src.indexOf(close, pos);
      if (c < 0) return -1;
      open.lastIndex = pos;
      var o = open.exec(src);
      if (o && o.index < c) { depth++; pos = o.index + 1; } else { depth--; pos = c + close.length; if (depth === 0) return c; }
    }
    return -1;
  }

  function Ctx() { this.handlers = []; this.imports = []; }
  function render(src, scope, ctx) {
    var out = '', i = 0, re = /<(sc-for|sc-if|dc-import)(\s[^>]*)?>/g, m;
    while ((m = re.exec(src))) {
      out += interp(src.slice(i, m.index), scope, ctx);
      var name = m[1], tag = m[0], bodyStart = m.index + tag.length, closeAt = findClose(src, name, bodyStart);
      if (closeAt < 0) { i = m.index; break; }
      var body = src.slice(bodyStart, closeAt);
      if (name === 'sc-for') {
        var list = holeVal(attrOf(tag, 'list'), scope) || [], as = attrOf(tag, 'as') || 'item';
        for (var k = 0; k < list.length; k++) {
          var s = Object.create(scope); s[as] = list[k]; s.$index = k;
          out += render(body, s, ctx);
        }
      } else if (name === 'sc-if') {
        if (holeVal(attrOf(tag, 'value'), scope)) out += render(body, scope, ctx);
      } else {
        var props = {}, ar = /\s([a-zA-Z][\w-]*)="([^"]*)"/g, a;
        while ((a = ar.exec(tag))) {
          if (a[1] === 'name' || a[1].indexOf('hint-') === 0) continue;
          props[a[1].replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); })] = holeVal(a[2], scope);
        }
        var id = ctx.imports.length;
        ctx.imports.push({ name: attrOf(tag, 'name'), props: props });
        out += '<div data-dc-import="' + id + '" style="display: contents"></div>';
      }
      i = closeAt + name.length + 3;
      re.lastIndex = i;
    }
    return out + interp(src.slice(i), scope, ctx);
  }
  function interp(text, scope, ctx) {
    text = text.replace(/\s(on[A-Z]\w*)="\{\{([^}]+)\}\}"/g, function (_, ev, p) {
      var fn = lookup(p, scope);
      if (typeof fn !== 'function') return '';
      ctx.handlers.push(fn);
      return ' data-dc-' + ev.slice(2).toLowerCase() + '="' + (ctx.handlers.length - 1) + '"';
    });
    text = text.replace(/\sdefaultValue="/g, ' value="');
    return text.replace(/\{\{([^}]+)\}\}/g, function (_, p) { return esc(lookup(p, scope)); });
  }

  var cache = {};
  function load(url) {
    if (!cache[url]) cache[url] = fetch(url).then(function (r) { return r.text(); }).then(function (txt) {
      var tpl = (txt.match(/<x-dc>([\s\S]*)<\/x-dc>/) || [, ''])[1];
      var helmet = (tpl.match(/<helmet>([\s\S]*?)<\/helmet>/) || [, ''])[1];
      tpl = tpl.replace(/<helmet>[\s\S]*?<\/helmet>/, '');
      var code = (txt.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/) || [, ''])[1];
      var Component = new Function('DCLogic', code + '\n;return Component;')(DCLogic);
      return { tpl: tpl, helmet: helmet, Component: Component };
    });
    return cache[url];
  }
  var helmets = {};
  function addHelmet(url, html) {
    if (helmets[url] || !html.trim()) return;
    helmets[url] = true;
    var box = document.createElement('div'); box.innerHTML = html;
    Array.prototype.slice.call(box.children).forEach(function (el) { document.head.appendChild(el); });
  }

  function mount(host, url, props) {
    return load(url).then(function (def) {
      addHelmet(url, def.helmet);
      var inst = new def.Component(props || {});
      var draw = function () {
        var ctx = new Ctx(), scope = inst.renderVals() || {};
        host.innerHTML = render(def.tpl, scope, ctx);
        host.__dcHandlers = ctx.handlers;
        ctx.imports.forEach(function (imp, n) {
          var slot = host.querySelector('[data-dc-import="' + n + '"]');
          var base = window.DC_IMPORT_BASE || url.replace(/[^/]*$/, '');
          if (slot) mount(slot, base + imp.name + '.html', imp.props);
        });
      };
      inst.__rerender = draw;
      draw();
      if (inst.componentDidMount) inst.componentDidMount();
    }).catch(function (e) {
      host.innerHTML = '<pre style="color:#9A3412;padding:16px">Could not render ' + esc(url) + ':\n' + esc(e.message) +
        '\nOpen this folder through a web server (e.g. http://localhost/…), not file://</pre>';
    });
  }

  ['click', 'change', 'input'].forEach(function (type) {
    document.addEventListener(type, function (e) {
      var el = e.target.closest && e.target.closest('[data-dc-' + type + ']');
      if (!el) return;
      var host = el.parentElement;
      while (host && !host.__dcHandlers) host = host.parentElement;
      var fn = host && host.__dcHandlers[+el.getAttribute('data-dc-' + type)];
      if (fn) fn(e);
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.createElement('div');
    root.id = 'dc-root';
    document.body.appendChild(root);
    mount(root, location.pathname.split('/').pop() || 'index.html', {});
  });
})();
