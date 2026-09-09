const KEY = "bridgePort";
const DEFAULT_PORT = 17318;

const input = document.getElementById("port");
const status = document.getElementById("status");

chrome.storage.local.get(KEY).then((stored) => {
  const port = Number(stored[KEY]);
  input.value = Number.isInteger(port) && port > 0 && port < 65536 ? port : DEFAULT_PORT;
  status.textContent = `Polling http://127.0.0.1:${input.value}`;
});

document.getElementById("save").addEventListener("click", async () => {
  const port = Number(input.value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    status.textContent = "Port must be 1–65535";
    return;
  }
  await chrome.storage.local.set({ [KEY]: port });
  status.textContent = `Saved. Polling http://127.0.0.1:${port}`;
});
