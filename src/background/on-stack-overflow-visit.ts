

chrome.storage.sync.get("visits", ({ visits }) => {
  if(!visits) visits = []
  visits.push({
    url: window.location.href,
    timestamp: new Date()
  })
  chrome.storage.sync.set({
    visits
  })
});