let clipboardInstance = "";
document.onload = setupClipboard();
function setupClipboard() {
  console.log(ClipboardJS.isSupported());
  document.querySelectorAll("button.copyButton").forEach((e) => {
    e.remove();
  });
  document.querySelectorAll("pre>code").forEach((e) => {
    let el = document.createElement("button");
    el.className = "copyButton";
    el.setAttribute("data-clipboard-text", e.textContent);
    el.textContent = "Copy";
    e.parentElement.append(el);
  });
  clipboardInstance = new ClipboardJS(".copyButton");
}
