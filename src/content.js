const currentURLContent = window.location.href;
const storedChangesString = localStorage.getItem(currentURLContent + "zVeqsxy-inspect-element");

if (storedChangesString) {
  const storedChanges = JSON.parse(storedChangesString);
  
  storedChanges.forEach((change) => {
    const elementSelector = change.path;
    const elementHTML = change.html;

    const element = document.querySelector(elementSelector);
    
    if (element) {
      element.outerHTML = elementHTML;
    }
  });
}