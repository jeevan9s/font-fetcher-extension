export function copyTextToClipboard(text, property) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Text copied to clipboard');
        alert(`${property} copied to clipboard`); // Corrected the syntax
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
}

export function copyFontInfo() {
    const fontValue = document.getElementById('font').innerText;
    copyTextToClipboard(`${fontValue}`, 'Font Name'); // Corrected the syntax
}

export function copySizeInfo() {
    const sizeValue = document.getElementById('size').innerText;
    copyTextToClipboard(`${sizeValue}`, 'Font Size'); // Corrected the syntax
}

export function copyStyleInfo() {
    const styleValue = document.getElementById('style').innerText;
    copyTextToClipboard(`${styleValue}`, 'Font Style'); // Corrected the syntax
}

export function copyColourInfo() {
    const colourValue = document.getElementById('colour').innerText;
    copyTextToClipboard(`${colourValue}`, 'Font Color'); // Corrected the syntax
}

export function copyAllInfo() {
    const fontValue = document.getElementById('font').innerText;
    const sizeValue = document.getElementById('size').innerText;
    const styleValue = document.getElementById('style').innerText;
    const colourValue = document.getElementById('colour').innerText;

    copyTextToClipboard(`Font: ${fontValue}\nSize: ${sizeValue}\nStyle: ${styleValue}\nColor: ${colourValue}`, 'Font Properties'); // Corrected the syntax
}

