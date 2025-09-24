const ERR_PREFIX = "[SnapSSID]";
const COOKIE_NAME = "PHPSESSID";
const LOCALHOST_TARGET_URL = "http://localhost:3000";

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.url) {
    console.log(ERR_PREFIX, "no active tab URL found");
    return;
  }

  try {
    const activeTabUrl = new URL(tab.url);
    const cookieUrl =
      activeTabUrl.protocol +
      "//" +
      activeTabUrl.hostname +
      (activeTabUrl.port ? ":" + activeTabUrl.port : "") +
      "/";

    chrome.cookies.get({ url: cookieUrl, name: COOKIE_NAME }, (cookie) => {
      if (chrome.runtime.lastError) {
        console.log(
          ERR_PREFIX,
          "error reading cookie:",
          chrome.runtime.lastError.message
        );
        return;
      }
      if (!cookie) {
        console.log(ERR_PREFIX, COOKIE_NAME, "not found on this origin");
        return;
      }

      // Decide localhost target URL based on original Secure flag
      const expirationDate = cookie.expirationDate
        ? cookie.expirationDate
        : Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // default 30 days

      const newCookie = {
        url: LOCALHOST_TARGET_URL,
        name: COOKIE_NAME,
        value: cookie.value,
        path: "/",
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        expirationDate: expirationDate,
      };

      chrome.cookies.set(newCookie, () => {
        if (chrome.runtime.lastError) {
          console.log(
            ERR_PREFIX,
            "error setting cookie on localhost:",
            chrome.runtime.lastError.message
          );
          return;
        }
        console.log(ERR_PREFIX, COOKIE_NAME, "copied to localhost");

        // Redirect active tab
        chrome.tabs.update(tab.id, { url: LOCALHOST_TARGET_URL });
      });
    });
  } catch (e) {
    console.log(ERR_PREFIX, "exception:", e.message);
  }
});
