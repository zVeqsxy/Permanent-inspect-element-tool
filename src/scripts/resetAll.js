(function() {
  localStorage.clear();
  chrome.runtime.sendMessage({
    action: "displayError",
    message: "Local storage cleared.",
    color: "#228B22"
  });
})();