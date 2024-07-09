(function() {
  function generateSelector(context) {
    let pathSelector = "";
  
    while (context && context.nodeType === Node.ELEMENT_NODE) {
      let selector = context.localName;
      if (context.id) {
        selector += "#" + context.id;
        pathSelector = selector + (pathSelector ? " > " + pathSelector : "");
        break;
      } else {
        const className = context.className.split(" ")[0];
        if (className) {
          selector += "." + className;
        }
        const index = Array.from(context.parentNode.children).indexOf(context) + 1;
        if (index > 1 && context.localName === 'p') {
          selector += `:nth-of-type(${index})`;
        }
        pathSelector = selector + (pathSelector ? " > " + pathSelector : "");
      }
      context = context.parentNode;
    }
    return pathSelector;
  }
  
  
  const getElements = () => {
    const modifiedElements = [];
    const elements = document.querySelectorAll("[data-user-modified]");
  
    if (!elements || elements.length === 0) return;
  
    elements.forEach((element) => {
      const selector = generateSelector(element);
      console.log(selector);
  
      const data = {
        path: selector,
        html: element.outerHTML,
      };
  
      modifiedElements.push(data);
    });
  
    return modifiedElements;
  }
  
  const currentURLSave = window.location.href;
  const modifiedElements = getElements();
  
  if (modifiedElements) {
    localStorage.setItem(currentURLSave + "zVeqsxy-inspect-element" , JSON.stringify(modifiedElements));
    chrome.runtime.sendMessage({
      action: "displayError",
      message: "Changes saved successfully.",
      color: "#228B22"
    });
  } else {
    chrome.runtime.sendMessage({
      action: "displayError",
      message: "Nothing found to save. \nDon't forget to add the attribute: data-user-modified",
      color: "#DC143C"
    });
  }
})();