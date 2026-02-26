let images = [];
let selectedImages = [];
let slideshowInterval = null;

/* Load images */
document.getElementById("fileInput").addEventListener("change", function (event) {
    const files = event.target.files;
    const table = document.getElementById("imageTable");
    table.innerHTML = "";
    images = [];

    for (let file of files) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgObj = {
                src: e.target.result,
                selected: false
            };
            images.push(imgObj);

            const cell = document.createElement("div");
            cell.className = "image-cell";

            const img = document.createElement("img");
            img.src = imgObj.src;   

            cell.appendChild(img);

            /* Toggle selection */
            cell.addEventListener("click", function () {
                imgObj.selected = !imgObj.selected;
                cell.classList.toggle("selected");
            });

            table.appendChild(cell);
        };
        reader.readAsDataURL(file);
    }
});

/* Finalize selection */
document.getElementById("finalizeBtn").addEventListener("click", function () {
    selectedImages = images.filter(img => img.selected);
    renderSelectedList();
});

/* Render reorder list */
function renderSelectedList() {
    const list = document.getElementById("selectedList");
    list.innerHTML = "";

    selectedImages.forEach((img, index) => {
        const li = document.createElement("li");

        const thumb = document.createElement("img");
        thumb.src = img.src;
        thumb.width = 60;

        const upBtn = document.createElement("button");
        upBtn.textContent = "↑";
        upBtn.onclick = () => moveImage(index, -1);

        const downBtn = document.createElement("button");
        downBtn.textContent = "↓";
        downBtn.onclick = () => moveImage(index, 1);

        li.appendChild(thumb);
        li.appendChild(upBtn);
        li.appendChild(downBtn);

        list.appendChild(li);
    });
}

/* Move image up/down */
function moveImage(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= selectedImages.length) return;

    const temp = selectedImages[index];
    selectedImages[index] = selectedImages[newIndex];
    selectedImages[newIndex] = temp;

    renderSelectedList();
}

/* Start slideshow */
document.getElementById("startSlideshowBtn").addEventListener("click", function () {
    if (selectedImages.length === 0) return;

    const delay = parseInt(document.getElementById("delayInput").value);
    const slideshow = document.getElementById("slideshow");
    slideshow.innerHTML = "";

    let index = 0;
    const img = document.createElement("img");
    slideshow.appendChild(img);

    if (slideshowInterval) clearInterval(slideshowInterval);

    img.src = selectedImages[index].src;

    slideshowInterval = setInterval(() => {
        index = (index + 1) % selectedImages.length;
        img.src = selectedImages[index].src;
    }, delay);
});