function chgTitleEN() {
  const btn = document.getElementById("btn-title-en");
  const cols = document.querySelectorAll("table.main tr > .hidden");
  if (btn.textContent.includes("表示")) {
    btn.textContent = btn.textContent.replace("表示", "消去");
    cols.forEach(col => col.style.setProperty("display", "revert"));
  } else {
    btn.textContent = btn.textContent.replace("消去", "表示");
    cols.forEach(col => col.style.setProperty("display", "none"));
  }
}
function setMode() {
  const checkbox = document.getElementById("mode-checkbox");
  let mode = null;
  if (!window.matchMedia) {
    mode = localStorage.getItem('theme');
  } else if (isDarkMode()) {
    mode = "dark"
  }
  if (mode === "dark") {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
  chgMode(checkbox);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
    chgMode(checkbox);
  });
}
function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
function chgMode(checkbox) {
  if (checkbox.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (localStorage.getItem('theme') !== null) {
      localStorage.removeItem('theme');
    }
  }
}
