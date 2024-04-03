export const copyToClipboard = async (text: string, toast?: any) => {
  if (!navigator.clipboard) {
    // Clipboard API not supported, fallback to legacy method (if available)
    fallbackCopyToClipboard(text, toast);
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    if (toast) {
      toast.success("Wallet address copied.");
    }
  } catch (error) {
    console.error("Failed to copy text:", error);
    if (toast) {
      toast.error("Failed to copy text. Please try again.");
    }
  }
};

function fallbackCopyToClipboard(text: string, toast?: any) {
  const dummy = document.createElement('textarea');
  dummy.textContent = text;
  dummy.style.display = 'none';
  document.body.appendChild(dummy);
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
  if (toast) {
    toast.success("Wallet address copied.");
  }
}
