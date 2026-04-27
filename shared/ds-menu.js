/* shared/ds-menu.js
   Auto-builder for the shared `.ds-menu` sidebar. Reads the document and emits
   numbered links + dividers. Runs on DOMContentLoaded.

   Recognised content nodes (in source order):
     · <section class="ds-section" data-title="...">
         numbered link in the nav
     · <div class="ds-part" data-part="...">
         non-clickable "part" divider (agent-design-guide style)
     · <section class="slide" data-title="..." data-status="open|signed">
         numbered link, with a sign-off dot when status="signed"
     · <section class="slide" data-group="...">
         injects a non-clickable "group" divider before the row (PRD style)

   Required host DOM:
     <header class="ds-menu-bar" id="ds-menu-bar">
       <a class="ds-menu-home" href="..." aria-label="Back to home">&larr; Home</a>
       <button id="ds-menu-toggle" class="ds-menu-toggle" aria-controls="ds-menu" aria-expanded="false">
         <span class="cur-num"></span>
         <span class="cur-label"></span>
         <span class="caret" aria-hidden="true">&#9662;</span>
       </button>
     </header>
     <div class="ds-menu-backdrop" id="ds-menu-backdrop" aria-hidden="true"></div>
     <aside class="ds-menu" id="ds-menu">
       <div><h1 class="deck-title">Title</h1><p class="deck-sub">Subtitle</p></div>
       <h2>Sections</h2>
       <nav id="ds-menu-nav"></nav>
     </aside>
*/

(function () {
  function init() {
    var nav = document.getElementById('ds-menu-nav');
    if (!nav) return;
    var sheet    = document.getElementById('ds-menu');
    var backdrop = document.getElementById('ds-menu-backdrop');
    var toggle   = document.getElementById('ds-menu-toggle');
    var curNum   = toggle ? toggle.querySelector('.cur-num')   : null;
    var curLabel = toggle ? toggle.querySelector('.cur-label') : null;

    var nodes = Array.prototype.slice.call(
      document.querySelectorAll('.ds-section, .ds-part, .slide')
    );
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var isSigned = function (el) {
      return (el.getAttribute('data-status') || '').toLowerCase() === 'signed';
    };

    function closeSheet() {
      if (!sheet) return;
      sheet.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      if (toggle)   toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('ds-menu-locked');
    }
    function openSheet() {
      if (!sheet) return;
      sheet.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      if (toggle)   toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('ds-menu-locked');
    }

    var sectionIdx = 0;
    var trackedSections = [];

    nodes.forEach(function (node) {
      // Part divider (agent-design-guide)
      if (node.classList.contains('ds-part')) {
        var p = document.createElement('span');
        p.className = 'part';
        p.textContent = node.getAttribute('data-part') || '';
        nav.appendChild(p);
        return;
      }

      // Group divider (PRD) — slide with data-group inserts a heading first
      if (node.classList.contains('slide')) {
        var group = node.getAttribute('data-group');
        if (group && group.trim()) {
          var g = document.createElement('span');
          g.className = 'group';
          g.textContent = group.trim();
          nav.appendChild(g);
        }
      }

      sectionIdx += 1;
      var num = sectionIdx;
      if (!node.id) node.id = 's' + num;

      var titleAttr = node.getAttribute('data-title');
      var h1 = node.querySelector('h1');
      var label = (titleAttr && titleAttr.trim())
        || (h1 ? h1.textContent.trim().replace(/[\.!?]+$/, '') : 'Section ' + num);

      var a = document.createElement('a');
      a.href = '#' + node.id;
      a.dataset.num   = pad(num);
      a.dataset.label = label;

      var n = document.createElement('span');
      n.className = 'n';
      n.textContent = pad(num);
      var l = document.createElement('span');
      l.className = 'label';
      l.textContent = label;
      a.appendChild(n);
      a.appendChild(l);

      if (isSigned(node)) {
        var dot = document.createElement('span');
        dot.className = 'status-dot is-signed';
        a.appendChild(dot);
      } else {
        // Reserve the third grid column so heights stay consistent.
        a.appendChild(document.createElement('span'));
      }

      a.addEventListener('click', function () {
        if (sheet && sheet.classList.contains('open')) closeSheet();
      });

      nav.appendChild(a);
      trackedSections.push(node);
    });

    var links = Array.prototype.slice.call(nav.querySelectorAll('a'));
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

    function setActive(a) {
      links.forEach(function (l) { l.classList.remove('is-active'); });
      a.classList.add('is-active');
      if (curNum)   curNum.textContent   = a.dataset.num   || '';
      if (curLabel) curLabel.textContent = a.dataset.label || '';
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var a = byId[e.target.id];
        if (a) setActive(a);
      });
    }, { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    trackedSections.forEach(function (s) { io.observe(s); });

    if (links.length) setActive(links[0]);

    if (toggle) {
      toggle.addEventListener('click', function () {
        if (sheet && sheet.classList.contains('open')) closeSheet();
        else openSheet();
      });
    }
    if (backdrop) {
      backdrop.addEventListener('click', closeSheet);
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sheet && sheet.classList.contains('open')) closeSheet();
    });

    var mq = window.matchMedia('(min-width: 901px)');
    var onMq = function (m) { if (m.matches) closeSheet(); };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
    else if (mq.addListener)  mq.addListener(onMq);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
