const { ipcRenderer } = require("electron");

document.getElementById("convertButton").addEventListener("click", () => {
  const uuid = document.getElementById("uuidInput").value;
  const hexValue = ipcRenderer.sendSync("convert-uuid", uuid);
  document.getElementById("result").textContent = hexValue;
});

document.getElementById("copyButton").addEventListener("click", () => {
  const result = document.getElementById("result").textContent;
  navigator.clipboard.writeText(result).then(() => {
    alert("Copied to clipboard!");
  });
});
