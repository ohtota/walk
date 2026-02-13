function chgTitleEN() {
  const btn = document.getElementById("btn-title-en");
  const cols = document.querySelectorAll("table.main tr > .hidden");
  if (btn.textContent.includes("表示")) {
    btn.textContent = btn.textContent.replace("表示", "消去");
    cols.forEach(col => {
      col.style.setProperty("display", "revert");
    });
  } else {
    btn.textContent = btn.textContent.replace("消去", "表示");
    cols.forEach(col => {
      col.style.setProperty("display", "none");
    });
  }
}
