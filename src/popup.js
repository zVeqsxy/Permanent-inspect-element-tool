chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "displayError") {
    const msg_container = document.getElementById("err-message");
    msg_container.style.display = "block";
    msg_container.style.color = request.color;
    msg_container.innerText = request.message;
  }
});

const decodeEntities = (() => {
  const element = document.createElement("div");

  return (str) => {
    if (str && typeof str === "string") {
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, "");
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, "");
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = "";
    }
    return str;
  };
})();

function executeScriptWithErrorHandling(scriptFile) {
  chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: [scriptFile]
    }).catch((error) => {
      document.getElementById("err-message").style.display = "block";
      document.getElementById("err-message").style.color = "#DC143C";
      document.getElementById("err-message").innerText = "Error injecting script: \n" + error || error.message;
    });
  });
}

window.addEventListener("load", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    document.getElementById("page-url").textContent = tabs[0].url;
  });

  document.getElementById("save").addEventListener("click", () => {
    executeScriptWithErrorHandling("src/scripts/savePage.js");
  });

  document.getElementById('reset').addEventListener('click', () => {
    executeScriptWithErrorHandling('src/scripts/resetPage.js');
  });

  document.getElementById('reset-all').addEventListener('click', () => {
    executeScriptWithErrorHandling('src/scripts/resetAll.js');
  });
});