const titles = document.querySelectorAll(".btn");
const contents = document.querySelectorAll(".content");

titles.forEach((header) => {
    header.addEventListener("click", () => {
        const accordionItem = header.parentElement;
        const accordionContent = accordionItem.querySelector(".content");

        // Close all other contents
        // contents.forEach((content) => {
        //     if (content !== accordionContent) {
        //         content.classList.remove("active");
        //         content.style.maxHeight = "0";
        //     }
        // });

        accordionContent.classList.toggle("active");
        if (accordionContent.classList.contains("active")) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        } else {
            accordionContent.style.maxHeight = "0";
        }
    });
});


async function getData() {
    try {
        const response = await fetch('src/data/data.json');
        if (!response.ok)
            throw new Error('Помилка при завантаженні даних');
        const data = await response.json();
        renderData(data);
    } catch (error) {
        console.error('Помилка під час отримання даних:', error);
    }
}

function renderData(data) {
    const container = document.getElementById('data-container');
    data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `Year: ${item.year}, Count: ${item.count}`;
        container.appendChild(div);
    });
}
getData();