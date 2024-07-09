(function() {
  let currentURLReset = window.location.href;
  const itemKey = currentURLReset + "zVeqsxy-inspect-element";

  if (localStorage.getItem(itemKey) === null) {
    chrome.runtime.sendMessage({
      action: "displayError",
      message: "Nothing found to reset.",
      color: "#DC143C"
    });
  } else {
    localStorage.removeItem(itemKey);
    chrome.runtime.sendMessage({
      action: "displayError",
      message: "Page reset successfully.",
      color: "#228B22"
    });
  }
})();