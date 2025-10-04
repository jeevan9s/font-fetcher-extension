chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");  // check for log
    chrome.contextMenus.create({
        id: "getFontProperties",
        title: "Get Font Properties",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log("Context Menu Opened");
    if (info.menuItemId === "getFontProperties") {
        chrome.tabs.sendMessage(tab.id, {action: "getFontProperties" });
    }
});

// background.js

chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.openOptionsPage();
  });
