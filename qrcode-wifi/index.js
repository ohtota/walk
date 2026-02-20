// onLoad
let isShown = false; // id="show-button" の状態
const hFocus = { handleEvent: action };
const hBlur  = { handleEvent: idle   };
const secu = document.getElementById("security");
const ssid = document.getElementById("ssid");
const pass = document.getElementById("password");
secu.addEventListener("focus", hFocus);
secu.addEventListener("blur" , hBlur);
ssid.addEventListener("focus", hFocus);
ssid.addEventListener("blur" , hBlur);
pass.addEventListener("focus", hFocus);
pass.addEventListener("blur" , hBlur);

function action(event) {
  event.target.parentElement.parentElement.querySelector(".line-red").classList.add("active");
  event.target.parentElement.querySelector("label").classList.add("active");
}
function idle(event) {
  event.target.parentElement.parentElement.querySelector(".line-red").classList.remove('active');
  event.target.parentElement.querySelector("label").classList.remove("active");
}
function actionOff(event) {
  alert("QRコードを消去すると、入力できるようになります。");
  event.target.blur()
}
function idleOff() {
  // 何もしない
}
function inputOn() {
  secu.readOnly = false;
  ssid.readOnly = false;
  pass.readOnly = false;
  hFocus.handleEvent = action;
  hBlur.handleEvent = idle;
}
function inputOff() {
  secu.readOnly = true;
  ssid.readOnly = true;
  pass.readOnly = true;
  hFocus.handleEvent = actionOff;
  hBlur.handleEvent = idleOff;
}
function makeQRCode() {
  if (isShown) {
    inputOn();
    document.getElementById("qrcode-wrap").style.display = 'none';
    document.getElementById("show-button").textContent = "QRコードを表示";
    isShown = false;
    return;
  }
  inputOff();
  const secuVal = secu.value.trim();
  const ssidVal = ssid.value.trim();
  const passVal = pass.value.trim();
  const qrtext = `WIFI:S:${ssidVal};T:${secuVal};P:${passVal};;`;
  const codeArea = document.getElementById("qrcode");
  const textArea = document.getElementById("qrtext");
  if (codeArea.innerHTML.trim() !== "") {
    codeArea.innerHTML = ""; // クリアしないとQRコードの表示が増殖する
  }
  const qrcode = new QRCode(document.getElementById("qrcode"), {
    text: qrtext,
    width: 128,
    height: 128,
    colorDark : "#ffffff",
    colorLight : "#000000",
    correctLevel : QRCode.CorrectLevel.H
  });
  textArea.textContent = qrtext;
  document.getElementById("qrcode-wrap").style.display = "revert";
  document.getElementById("show-button").textContent = "QRコードを消去";
  isShown = true;
}
function copy2clip() {
  const qrcode = document.getElementById("qrcode");
  const canvas = qrcode.querySelector('canvas');
  if (canvas === null) {
    alert("画像（QRコード）の取得に失敗しました。。。");
  } 
  canvas.toBlob(async (blob) => {
    try {
      // クリップボードに書き込み
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      const message = document.getElementById("message");
      message.style.backgroundColor = "lightgreen";
      message.textContent = "コピーしました"
      setTimeout(() => {
        message.style.backgroundColor = "transparent";
        message.textContent = "";
      }, 2000);
    } catch (err) {
      alert("コピーに失敗しました。。。\n" + err);
    }
  }, 'image/png');
}
