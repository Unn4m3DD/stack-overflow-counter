
chrome.storage.sync.get("count", ({ count }) => {
  if(!count) count = 0;
  chrome.storage.sync.set({count: count + 1}), function(value: number) {
    console.log('Value is set to ' + value);
  }
});