export function ChangeModalStyle() {
  const shadowHost = document.querySelector("wcm-modal");
  if (shadowHost) {
    const shadowRoot = shadowHost.shadowRoot;
    if (shadowRoot) {
      const modalElement = shadowRoot.querySelector(".wcm-overlay");
      if (modalElement) {
        const htmlModalElement = modalElement as HTMLElement;

        const isMobile = isMobileDevice()
        if (!isMobile) {
          htmlModalElement.style.width = '70%';
          htmlModalElement.style.marginLeft = "auto";
          htmlModalElement.style.marginRight = "auto";
          htmlModalElement.style.alignItems = "center";
        }

        const modalContainer = modalElement.parentElement;
        if (modalContainer) {
          // modalContainer.style.alignItems = isWeb ? "center" : "center";
        }
      } else {
        console.warn("Modal element not found within shadow DOM");
      }
    } else {
      console.warn("No shadow root found for the host element");
    }
  } else {
    console.warn("Host element for shadow DOM not found");
  }
}

// Adiciona um event listener para ajustar o alinhamento quando a janela é redimensionada
window.addEventListener("resize", ChangeModalStyle);


export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}