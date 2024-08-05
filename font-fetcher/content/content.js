console.log("Content script active");


// listen for message from background.js to run function (context menu clicked)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getFontProperties") {
        console.log("Received getFontProperties message");
        getFontProperties();
    }
});

// Function to dynamically inject CSS
function injectCSS(file) {
    const link = document.createElement("link");
    link.href = chrome.runtime.getURL(file);
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
}

// Inject the modal CSS
injectCSS("content/modal.css");

// MODAL STUFF

// colour : rgb lvls - map 
const colorNames = {
    "aliceblue": "rgb(240, 248, 255)",
    "antiquewhite": "rgb(250, 235, 215)",
    "aqua": "rgb(0, 255, 255)",
    "aquamarine": "rgb(127, 255, 212)",
    "azure": "rgb(240, 255, 255)",
    "beige": "rgb(245, 245, 220)",
    "bisque": "rgb(255, 228, 196)",
    "black": "rgb(0, 0, 0)",
    "blanchedalmond": "rgb(255, 235, 205)",
    "blue": "rgb(0, 0, 255)",
    "blueviolet": "rgb(138, 43, 226)",
    "brown": "rgb(165, 42, 42)",
    "burlywood": "rgb(222, 184, 135)",
    "cadetblue": "rgb(95, 158, 160)",
    "chartreuse": "rgb(127, 255, 0)",
    "chocolate": "rgb(210, 105, 30)",
    "coral": "rgb(255, 127, 80)",
    "cornflowerblue": "rgb(100, 149, 237)",
    "cornsilk": "rgb(255, 248, 220)",
    "crimson": "rgb(220, 20, 60)",
    "cyan": "rgb(0, 255, 255)",
    "darkblue": "rgb(0, 0, 139)",
    "darkcyan": "rgb(0, 139, 139)",
    "darkgoldenrod": "rgb(184, 134, 11)",
    "darkgray": "rgb(169, 169, 169)",
    "darkgreen": "rgb(0, 100, 0)",
    "darkkhaki": "rgb(189, 183, 107)",
    "darkmagenta": "rgb(139, 0, 139)",
    "darkolivegreen": "rgb(85, 107, 47)",
    "darkorange": "rgb(255, 140, 0)",
    "darkorchid": "rgb(153, 50, 204)",
    "darkred": "rgb(139, 0, 0)",
    "darksalmon": "rgb(233, 150, 122)",
    "darkseagreen": "rgb(143, 188, 143)",
    "darkslateblue": "rgb(72, 61, 139)",
    "darkslategray": "rgb(47, 79, 79)",
    "darkturquoise": "rgb(0, 206, 209)",
    "darkviolet": "rgb(148, 0, 211)",
    "deeppink": "rgb(255, 20, 147)",
    "deepskyblue": "rgb(0, 191, 255)",
    "dimgray": "rgb(105, 105, 105)",
    "dodgerblue": "rgb(30, 144, 255)",
    "firebrick": "rgb(178, 34, 34)",
    "floralwhite": "rgb(255, 250, 240)",
    "forestgreen": "rgb(34, 139, 34)",
    "fuchsia": "rgb(255, 0, 255)",
    "gainsboro": "rgb(220, 220, 220)",
    "ghostwhite": "rgb(248, 248, 255)",
    "gold": "rgb(255, 215, 0)",
    "goldenrod": "rgb(255, 215, 0)",
    "gray": "rgb(128, 128, 128)",
    "green": "rgb(0, 128, 0)",
    "greenyellow": "rgb(173, 255, 47)",
    "honeydew": "rgb(240, 255, 240)",
    "hotpink": "rgb(255, 105, 180)",
    "indianred": "rgb(205, 92, 92)",
    "indigo": "rgb(75, 0, 130)",
    "ivory": "rgb(255, 255, 240)",
    "khaki": "rgb(240, 230, 140)",
    "lavender": "rgb(230, 230, 250)",
    "lavenderblush": "rgb(255, 240, 245)",
    "lawngreen": "rgb(124, 252, 0)",
    "lemonchiffon": "rgb(255, 250, 205)",
    "lightblue": "rgb(173, 216, 230)",
    "lightcoral": "rgb(240, 128, 128)",
    "lightcyan": "rgb(224, 255, 255)",
    "lightgoldenrodyellow": "rgb(250, 250, 210)",
    "lightgray": "rgb(211, 211, 211)",
    "lightgreen": "rgb(144, 238, 144)",
    "lightpink": "rgb(255, 182, 193)",
    "lightsalmon": "rgb(255, 160, 122)",
    "lightseagreen": "rgb(32, 178, 170)",
    "lightskyblue": "rgb(135, 206, 250)",
    "lightslategray": "rgb(119, 136, 153)",
    "lightsteelblue": "rgb(176, 196, 222)",
    "lightyellow": "rgb(255, 255, 224)",
    "lime": "rgb(0, 255, 0)",
    "limegreen": "rgb(50, 205, 50)",
    "linen": "rgb(250, 240, 230)",
    "magenta": "rgb(255, 0, 255)",
    "maroon": "rgb(128, 0, 0)",
    "mediumaquamarine": "rgb(102, 205, 170)",
    "mediumblue": "rgb(0, 0, 205)",
    "mediumorchid": "rgb(186, 85, 211)",
    "mediumpurple": "rgb(147, 112, 219)",
    "mediumseagreen": "rgb(60, 179, 113)",
    "mediumslateblue": "rgb(123, 104, 238)",
    "mediumspringgreen": "rgb(0, 250, 154)",
    "mediumturquoise": "rgb(72, 209, 204)",
    "mediumvioletred": "rgb(199, 21, 133)",
    "midnightblue": "rgb(25, 25, 112)",
    "mintcream": "rgb(245, 255, 250)",
    "mistyrose": "rgb(255, 228, 225)",
    "moccasin": "rgb(255, 228, 181)",
    "navajowhite": "rgb(255, 222, 173)",
    "navy": "rgb(0, 0, 128)",
    "oldlace": "rgb(253, 245, 230)",
    "olive": "rgb(128, 128, 0)",
    "olivedrab": "rgb(107, 142, 35)",
    "orange": "rgb(255, 165, 0)",
    "orangered": "rgb(255, 69, 0)",
    "orchid": "rgb(218, 112, 214)",
    "palegoldenrod": "rgb(238, 232, 170)",
    "palegreen": "rgb(152, 251, 152)",
    "paleturquoise": "rgb(175, 238, 238)",
    "palevioletred": "rgb(219, 112, 147)",
    "papayawhip": "rgb(255, 239, 213)",
    "peachpuff": "rgb(255, 218, 185)",
    "peru": "rgb(205, 133, 63)",
    "pink": "rgb(255, 192, 203)",
    "plum": "rgb(221, 160, 221)",
    "powderblue": "rgb(176, 224, 230)",
    "purple": "rgb(128, 0, 128)",
    "red": "rgb(255, 0, 0)",
    "rosybrown": "rgb(188, 143, 143)",
    "royalblue": "rgb(65, 105, 225)",
    "saddlebrown": "rgb(139, 69, 19)",
    "salmon": "rgb(250, 128, 114)",
    "sandybrown": "rgb(244, 164, 96)",
    "seagreen": "rgb(46, 139, 87)",
    "seashell": "rgb(255, 245, 238)",
    "sienna": "rgb(160)"
}

// RGB mapping
function colorDistance(color1, color2) {
    const [r1, g1, b1, a1] = color1;
    const [r2, g2, b2, a2] = color2;
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2 + (a1 - a2) ** 2);
}

function findClosestColor(rgbColor) {
    const colorNamesRGBA = {};
    for (const [name, rgb] of Object.entries(colorNames)) {
        // Convert rgb to rgba format with alpha = 1
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        colorNamesRGBA[name] = [r, g, b, 1];
    }

    const [r1, g1, b1] = rgbColor.match(/\d+/g).map(Number);
    const inputColor = [r1, g1, b1, 1];

    let closestColor = null;
    let minDistance = Infinity;

    for (const [name, color] of Object.entries(colorNamesRGBA)) {
        const distance = colorDistance(inputColor, color);
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = name;
        }
    }

    return closestColor;
}



let followCursor = true;
let shiftPressed = false;

// listen for shift key being pressed
document.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') {
        shiftPressed = true;
        followCursor = false;
    }
});

// shift is let go, undo the previous block
document.addEventListener('keyup', (event) => {
    if (event.key === 'Shift') {
        shiftPressed = false;
        followCursor = true;
    }
});

// modal inliine html
function createModal() {
    const modalHTML = `
    <link rel="stylesheet" href="content/modal.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href='https://fonts.googleapis.com/css?family=Roboto+Mono' rel='stylesheet'>
        <div id="font_modal" class="modal-container">
            <div class="modal-header">
                <h5>
                    <span id="font1">Font</span><span id="finder">Fetcher</span>
                    <button id="close_modal" class="close-button">&times;</button>
                </h5>
            </div>
            <div id="font_info">
                <div id ="header">
                    <strong>
                    <b>Font Info</b>
                    <button id="copyall"><i class="fa fa-clone"></i></button>
                    </strong>
                </div>
            </div>
            <hr>
            <div id="font_fam">
                <div id = "p1">
                    <p id="font">Font: <span id="font_value"></span></p>
                    <button id="copyfont"><i class="fa fa-clone"></i></button>
                </div>
            </div>
            <hr>
            <div id="size_fam">
                <div id = "p2" >
                    <p id="size">Size: <span id="size_value"></span></p>
                    <button id="copysize"><i class="fa fa-clone"></i></button>
                </div>
            </div>
            <hr>
            <div id="style_fam">
                <div id = "p3">
                    <p id="style">Style: <span id="style_value"></span></p>
                    <button id="copystyle"><i class="fa fa-clone"></i></button>
                </div>
            </div>
            <hr>
            <div id="colour_fam">
                <div id = "p4">
                    <p id="colour">Color: <span id="colour_value"></span></p>
                    <button id="copycolour"><i class="fa fa-clone"></i></button>
                </div>
            </div>
            <div class="modal-footer"></div>
        </div>
    `;

    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);

    // js for the close button in modal
    const modal = document.getElementById('font_modal');
    const closeModalButton = document.getElementById('close_modal');
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // tether cursor to modal
    document.addEventListener('mousemove', (event) => {
        if (modal.style.display === 'block' && followCursor) {
            modal.style.left = `${event.clientX + 10}px`;
            modal.style.top = `${event.clientY + 10}px`;
        }
    });

    document.getElementById('copyfont').addEventListener('click', copyFontInfo);
    document.getElementById('copysize').addEventListener('click', copySizeInfo);
    document.getElementById('copystyle').addEventListener('click', copyStyleInfo);
    document.getElementById('copycolour').addEventListener('click', copyColourInfo);
    document.getElementById('copyall').addEventListener('click', copyAllInfo);
}




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

        // bold/weight lvls
        const fontweight_map = {
            '100': 'Thin',
            '200': 'Extra Light',
            '300': 'Light',
            '400': 'Normal',
            '500': 'Medium',
            '600': 'Semi Bold',
            '700': 'Bold',
            '800': 'Extra Bold',
            '900': 'Black'
        };

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

// Copy functions
function copyTextToClipboard(text, property) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Text copied to clipboard');
        alert(`${property} copied to clipboard`); // Corrected the syntax
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
}

function copyFontInfo() {
    const fontValue = document.getElementById('font').innerText;
    copyTextToClipboard(`${fontValue}`, 'Font Name'); // Corrected the syntax
}

function copySizeInfo() {
    const sizeValue = document.getElementById('size').innerText;
    copyTextToClipboard(`${sizeValue}`, 'Font Size'); // Corrected the syntax
}

function copyStyleInfo() {
    const styleValue = document.getElementById('style').innerText;
    copyTextToClipboard(`${styleValue}`, 'Font Style'); // Corrected the syntax
}

function copyColourInfo() {
    const colourValue = document.getElementById('colour').innerText;
    copyTextToClipboard(`${colourValue}`, 'Font Color'); // Corrected the syntax
}

function copyAllInfo() {
    const fontValue = document.getElementById('font').innerText;
    const sizeValue = document.getElementById('size').innerText;
    const styleValue = document.getElementById('style').innerText;
    const colourValue = document.getElementById('colour').innerText;

    // Format all the info 
    copyTextToClipboard(`Font: ${fontValue}\nSize: ${sizeValue}\nStyle: ${styleValue}\nColor: ${colourValue}`, 'Font Properties'); // Corrected the syntax
}

