const ERR_PREFIX = "[SnapSSID]";
const COOKIE_NAME = "PHPSESSID";
const LOCALHOST_TARGET_URL = "http://localhost:3000";

browser.action.onClicked.addListener(async (tab) => {
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

    const cookie = await browser.cookies.get({
      url: cookieUrl,
      name: COOKIE_NAME,
    });
    if (!cookie) {
      console.log(ERR_PREFIX, COOKIE_NAME, "not found on this origin");
      return;
    }

    const expirationDate = cookie.expirationDate
      ? cookie.expirationDate
      : Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // default 30 days

    // Avoid setting Secure over http://localhost
    const isLocalhostHttp = LOCALHOST_TARGET_URL.startsWith("http://");
    const secureFlag = isLocalhostHttp ? false : !!cookie.secure;

    const newCookie = {
      url: LOCALHOST_TARGET_URL,
      name: COOKIE_NAME,
      value: cookie.value,
      path: "/",
      httpOnly: !!cookie.httpOnly,
      secure: secureFlag,
      expirationDate: expirationDate,
    };

    await browser.cookies.set(newCookie);
    console.log(ERR_PREFIX, COOKIE_NAME, "copied to localhost");

    // Redirect active tab
    await browser.tabs.update(tab.id, { url: LOCALHOST_TARGET_URL });
  } catch (e) {
    console.log(ERR_PREFIX, "exception:", e.message);
  }
});
