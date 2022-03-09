
chrome.storage.sync.get("visitCount", ({ visitCount }) => {
  chrome.runtime.sendMessage({ incrementVisitCount: visitCount + 1 });
  chrome.storage.sync.set({
    visitCount: visitCount + 1
  })
});