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