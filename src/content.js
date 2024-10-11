const currentURLContent = window.location.href;
const storedChangesString = localStorage.getItem(currentURLContent + "zVeqsxy-inspect-element");

if (storedChangesString) {
  const storedChanges = JSON.parse(storedChangesString);

  const applyChanges = () => {
    observer.disconnect();

    storedChanges.forEach((change) => {
      const elementSelector = change.path;
      const elementHTML = change.html;

      const element = document.querySelector(elementSelector);

      if (element) {
        element.outerHTML = elementHTML;
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  const observer = new MutationObserver((mutations) => {
    applyChanges();
  });

  applyChanges();

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
