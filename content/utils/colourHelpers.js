import { colorNames } from "./colourMap";

export function colourDistance(color1, color2) {
    const [r1, g1, b1, a1] = color1;
    const [r2, g2, b2, a2] = color2;
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2 + (a1 - a2) ** 2);
}

export function findClosestColour(rgbColor) {
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
