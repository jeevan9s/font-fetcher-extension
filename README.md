# Font Fetcher

## CS50x Final Project
>This is my capstone project for the CS50x Introduction to Computer Science Course

>JavaScript, HTML CSS, Google Chrome Extension

### Features:
I used JavaScript for the core functions used by the extension, and HTML & CSS for the framework, and design of the project.

### Technical Description:
The core algorithm of the project uses the getComputedStyle() method on a temprorary span containing the users highlighted text, which is accessed by the getSelection method, as well as the range(), and surroundContents() methods.
```javascript
const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement("span");
        range.surroundContents(span);

        // retrieve properties on the span container (highlighted text)
        const textCS = window.getComputedStyle(span);
```



Another function I implemented, _copyTextToClipboard()_ uses the navigator property to insert the contents of the span elements containing the font properties into the user's clipboard.
```javascript
function copyTextToClipboard(text, property) {
    navigator.clipboard.writeText(text)
```

The final core function I implemented uses Euclidean distance calculations for RGB values, for finding the correct "colour name" for a RGB value. This function uses mathematical JS methods like sqrt.
```javascript
function colorDistance(color1, color2) {
    const [r1, g1, b1, a1] = color1;
    const [r2, g2, b2, a2] = color2;
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2 + (a1 - a2) ** 2);
}
```

Using an AI-generate RGB map, I iteratively extracted the correct colour name for the respective RGB value.
```javascript
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
```


Furthermore, I included a launch page which uses an email API to handle incoming client emails. 

### Video Demonstration
https://youtu.be/MXVYI6_wm88?si=i66EWkZt4MWNIyJo
