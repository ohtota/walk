function chgTitleEN() {
  const btn = document.getElementById('btn-title-en');
  const cols = document.querySelectorAll('table.main tr > .hidden');
  if (btn.textContent.includes('表示')) {
    btn.textContent = btn.textContent.replace('表示', '消去');
    cols.forEach(col => col.style.setProperty('display', 'revert'));
  } else {
    btn.textContent = btn.textContent.replace('消去', '表示');
    cols.forEach(col => col.style.setProperty('display', 'none'));
  }
}
function setMode() {
  const checkbox = document.getElementById('mode-checkbox');
  let mode = null;
  if (!window.matchMedia) {
    mode = localStorage.getItem('theme');
  } else if (isDarkMode()) {
    mode = 'dark'
  }
  if (mode === 'dark') {
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
  setAlign();
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
function setAlign() {
  let align = localStorage.getItem('align');
  if (align !== 'L' && align !== 'C' && align !== 'R') {
    align = 'C';
  }
  let id;
  switch (align) {
    case 'L': id = 'align-l'; break; 
    case 'C': id = 'align-c'; break;
    case 'R': id = 'align-r'; break;
  }
  document.getElementById(id).checked = true;
  chgAlign();
}
function chgAlign() {
  // alert('called chgAlign()');
  const elems = document.getElementsByName('content-align');
  let align = '';
  let setting = '';
  for (var i = 0; i < elems.length; i++) {
    if (elems[i].checked === true) {
      align = elems[i].value;
      break;
    }
  }
  if (align === '') {
    return;
  }
  switch(align) {
    case 'L': setting = '0'         ; break;
    case 'C': setting = '0 auto'    ; break;
    case 'R': setting = '0 0 0 auto'; break;
  }
  var elm = document.querySelector('div.wrapper');
  elm.style.margin = setting;
  localStorage.setItem('align', align);
  // alert(setting);
}
