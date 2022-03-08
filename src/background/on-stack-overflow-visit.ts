
chrome.storage.sync.get("visitCount", ({ visitCount }) => {
  chrome.runtime.sendMessage({ incrementVisitCount: true });
  chrome.storage.sync.set({
    visitCount: visitCount + 1
  })
});