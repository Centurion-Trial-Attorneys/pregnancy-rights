/* Accessibility options panel. Settings are saved in this browser only. */
(function () {
  var root = document.documentElement;
  var KEY = "a11y";
  var SIZES = [100, 115, 130, 150];
  var widget = document.getElementById("a11y");
  if (!widget) return;

  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { state = {}; }

  var toggle = widget.querySelector(".a11y-toggle");
  var panel = document.getElementById("a11y-panel");
  var sizeOut = document.getElementById("a11y-size-val");
  var options = widget.querySelectorAll(".a11y-opt");

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage blocked: settings last for this page only */ }
  }

  function apply() {
    var size = state.size || 100;
    root.style.fontSize = size === 100 ? "" : size + "%";
    sizeOut.textContent = size + "%";
    for (var i = 0; i < options.length; i++) {
      var key = options[i].getAttribute("data-opt");
      var on = !!state[key];
      root.classList.toggle("a11y-" + key, on);
      options[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  function setOpen(open, returnFocus) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) panel.querySelector("button").focus();
    else if (returnFocus) toggle.focus();
  }

  toggle.addEventListener("click", function () { setOpen(panel.hidden); });
  widget.querySelector(".a11y-close").addEventListener("click", function () { setOpen(false, true); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) setOpen(false, true);
  });
  document.addEventListener("click", function (e) {
    if (!panel.hidden && !widget.contains(e.target)) setOpen(false);
  });

  var sizeButtons = widget.querySelectorAll("[data-size]");
  for (var s = 0; s < sizeButtons.length; s++) {
    sizeButtons[s].addEventListener("click", function () {
      var i = SIZES.indexOf(state.size || 100);
      i = Math.max(0, Math.min(SIZES.length - 1, i + Number(this.getAttribute("data-size"))));
      state.size = SIZES[i];
      save();
      apply();
    });
  }

  for (var o = 0; o < options.length; o++) {
    options[o].addEventListener("click", function () {
      var key = this.getAttribute("data-opt");
      state[key] = !state[key];
      save();
      apply();
    });
  }

  widget.querySelector(".a11y-reset").addEventListener("click", function () {
    state = {};
    save();
    apply();
  });

  apply();
})();
