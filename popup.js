
chrome.storage.sync.get("count", ({ count }) => {
  if(!count) count = 0
  document.getElementById("times").innerHTML = count
});