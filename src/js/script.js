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
        const response = await fetch('http://localhost:8080/dist/data/data.json', {cache: "no-store"});
        if (!response.ok){
            throw new Error('Помилка при завантаженні даних');
        }
        const data = await response.json();
        console.log(data);
        renderData(data);
    } catch (error) {
        console.error('Помилка під час отримання даних:', error);
    }
}

// function renderData(data) {
//     // About Me Section
//     document.getElementById('about-me-title').textContent = data.aboutMe.title;
//     document.getElementById('about-me-description').textContent = data.aboutMe.description;
//
//     // Personal Info Section
//     document.getElementById('personal-name').textContent = data.personalInfo.name;
//     document.getElementById('personal-job-title').textContent = data.personalInfo.jobTitle;
//
//     document.getElementById('job-name').textContent = data.nameEx;
//     // Job Experience Section
//     const jobExperienceContainer = document.getElementById('job-experience');
//     jobExperienceContainer.innerHTML = ''; // Clear previous content
//     data.jobExperience.forEach(job => {
//         const jobDiv = document.createElement('div');
//         jobDiv.classList.add('job-item');
//         jobDiv.innerHTML = `
//             <h3>${job.title}</h3>
//             <span>${job.years}</span>
//             <p><i>${job.company}</i></p>
//             <p>${job.description}</p>
//         `;
//         jobExperienceContainer.appendChild(jobDiv);
//     });
//
//     document.getElementById('skills-name').textContent = data.nameSk;
//     // Skills Section
//     const skillsContainer = document.getElementById('skills');
//     skillsContainer.innerHTML = ''; // Clear previous content
//     data.skills.forEach(skill => {
//         const skillDiv = document.createElement('div');
//         skillDiv.classList.add('skill-item');
//         skillDiv.innerHTML = `
//             <h6>${skill.name}</h6>
//             <progress max="100" value="${skill.level}"></progress>
//         `;
//         skillsContainer.appendChild(skillDiv);
//     });
//
//
//     document.getElementById('language-name').textContent = data.nameLan;
//     document.getElementById('hobby-name').textContent = data.nameHob;
//
// }

function renderData(data) {
    // About Me Section
    const aboutMeTitle = document.getElementById('about-me-title');
    aboutMeTitle.className = 'about-me-title';  // Add class directly
    aboutMeTitle.textContent = data.aboutMe.title;

    const aboutMeDescription = document.getElementById('about-me-description');
    aboutMeDescription.className = 'about-me-description';  // Add class directly
    aboutMeDescription.textContent = data.aboutMe.description;

    // Personal Info Section
    document.getElementById('personal-name').textContent = data.personalInfo.name;
    document.getElementById('personal-job-title').textContent = data.personalInfo.jobTitle;

    document.getElementById('job-name').textContent = data.nameEx;
    // Job Experience Section
    const jobExperienceContainer = document.getElementById('job-experience');
    jobExperienceContainer.innerHTML = ''; // Clear previous content
    data.jobExperience.forEach(job => {
        const jobDiv = document.createElement('div');
        jobDiv.classList.add('job-item');
        jobDiv.innerHTML = `
            <div class="job-desc">
                <h3>${job.title}</h3>
                <span>${job.years}</span>
            </div>
            <div class="job-place-city">
                <span><i>${job.company}</i></span>
            </div>
            <p>${job.description}</p>
        `;
        jobExperienceContainer.appendChild(jobDiv);
    });

    document.getElementById('skills-name').textContent = data.nameSk;
    // Skills Section
    const skillsFirstContainer = document.getElementById('skills-first');
    skillsFirstContainer.innerHTML = ''; // Clear previous content
    data.skillsFirstBlock.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.classList.add('skill-desc');  // Ensures class matches CSS
        skillDiv.innerHTML = `
            <h6>${skill.name}</h6>
            <progress max="100" value="${skill.level}"></progress>
        `;
        skillsFirstContainer.appendChild(skillDiv);
    });

    const skillsSecondContainer = document.getElementById('skills-second');
    skillsSecondContainer.innerHTML = ''; // Clear previous content
    data.skillsSecondBlock.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.classList.add('skill-desc');  // Ensures class matches CSS
        skillDiv.innerHTML = `
            <h6>${skill.name}</h6>
            <progress max="100" value="${skill.level}"></progress>
        `;
        skillsSecondContainer.appendChild(skillDiv);
    });

    document.getElementById('language-name').textContent = data.nameLan;
    document.getElementById('hobby-name').textContent = data.nameHob;
}

getData();
setInterval(getData, 5000);