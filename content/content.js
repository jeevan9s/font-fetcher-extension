import { colorNames } from "./utils/colours";
import { colourDistance, colourNames } from "./utils/colourHelpers";
import { copyAllInfo, copyColourInfo, copyFontInfo, copySizeInfo, copyStyleInfo, copyTextToClipboard } from "./utils/copyHelpers";
import { fontweight_map } from "./utils/fontWeightMap";
import { createModal } from "./utils/modal";

console.log("Content script active");

// listen for message from background.js to run function (context menu clicked)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getFontProperties") {
        // console.log("Received getFontProperties message");
        getFontProperties();
    }
});

function injectCSS(file) {
    const link = document.createElement("link");
    link.href = chrome.runtime.getURL(file);
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
}

injectCSS("content/modal.css");



let followCursor = true;
let shiftPressed = false;

// movement
document.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') {
        shiftPressed = true;
        followCursor = false;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Shift') {
        shiftPressed = false;
        followCursor = true;
    }
});



// MAIN FUNCTION 
function getFontProperties() {

    // create a span to contain the highlighted elements (text)
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement("span");
        range.surroundContents(span);

        // retrieve properties on the span container (highlighted text)
        const textCS = window.getComputedStyle(span);
        const fontFamily = textCS.fontFamily;
        const fontSize = textCS.fontSize;
        const fontStyle = textCS.fontStyle;
        const fontColour = textCS.color;
        const fontWeight = textCS.fontWeight;

        const readableWeight = fontweight_map[fontWeight] || fontWeight;

        const closestColorName = findClosestColor(fontColour);
        const closestColor = colorNames[closestColorName];

        // console logs for font properties
        console.log("Size", fontSize);
        console.log("Style", fontStyle);
        console.log("Weight", fontWeight, ",", readableWeight);
        console.log("Colour", closestColorName, closestColor);

        createModal();

        // update the html 
        document.getElementById("font").textContent = `Font: ${fontFamily}`;
        document.getElementById("size").textContent = `Size: ${fontSize}`;
        document.getElementById("style").textContent = `Style: ${fontStyle}, Weight: ${readableWeight}`;
        document.getElementById("colour").textContent = `Color: ${closestColorName}, ${closestColor}`;
        document.getElementById("font_info").style.display = "block";

        // show modal
        const modal = document.getElementById('font_modal');
        modal.style.display = 'block';

        // remove the span container
        span.outerHTML = span.innerHTML;
    }

}

