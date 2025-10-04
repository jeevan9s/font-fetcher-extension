import { copyTextToClipboard } from "./clipboard.js";

export function createModal() {
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
            <div id="header">
                <strong>
                    <b>Font Info</b>
                    <button id="copyall"><i class="fa fa-clone"></i></button>
                </strong>
            </div>
        </div>
        <hr>
        <div id="font_fam">
            <div id="p1">
                <p id="font">Font: <span id="font_value"></span></p>
                <button id="copyfont"><i class="fa fa-clone"></i></button>
            </div>
        </div>
        <hr>
        <div id="size_fam">
            <div id="p2">
                <p id="size">Size: <span id="size_value"></span></p>
                <button id="copysize"><i class="fa fa-clone"></i></button>
            </div>
        </div>
        <hr>
        <div id="style_fam">
            <div id="p3">
                <p id="style">Style: <span id="style_value"></span></p>
                <button id="copystyle"><i class="fa fa-clone"></i></button>
            </div>
        </div>
        <hr>
        <div id="colour_fam">
            <div id="p4">
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

    const modal = document.getElementById('font_modal');
    const closeModalButton = document.getElementById('close_modal');

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    let followCursor = true;
    document.addEventListener('mousemove', (e) => {
        if (modal.style.display === 'block' && followCursor) {
            modal.style.left = `${e.clientX + 10}px`;
            modal.style.top = `${e.clientY + 10}px`;
        }
    });

    document.getElementById('copyfont').addEventListener('click', () => {
        copyTextToClipboard(document.getElementById('font').innerText, 'Font Name');
    });
    document.getElementById('copysize').addEventListener('click', () => {
        copyTextToClipboard(document.getElementById('size').innerText, 'Font Size');
    });
    document.getElementById('copystyle').addEventListener('click', () => {
        copyTextToClipboard(document.getElementById('style').innerText, 'Font Style');
    });
    document.getElementById('copycolour').addEventListener('click', () => {
        copyTextToClipboard(document.getElementById('colour').innerText, 'Font Color');
    });
    document.getElementById('copyall').addEventListener('click', () => {
        const font = document.getElementById('font').innerText;
        const size = document.getElementById('size').innerText;
        const style = document.getElementById('style').innerText;
        const color = document.getElementById('colour').innerText;
        copyTextToClipboard(`Font: ${font}\nSize: ${size}\nStyle: ${style}\nColor: ${color}`, 'Font Properties');
    });
}
