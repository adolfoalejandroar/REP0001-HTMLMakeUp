document.addEventListener('DOMContentLoaded', async () => {
    const student = JSON.parse(localStorage.getItem('entityToView'));
    if (student) {
        document.getElementById('view-avatar').src = student.photo;
        document.getElementById('view-avatar').alt = student.name;
        document.getElementById('view-name').textContent = student.name;
        document.getElementById('view-code').textContent = `ID: ${student.code}`;
        document.getElementById('view-email').textContent = student.email;
        document.getElementById('view-description').textContent = student.description;
    }

    const techList = document.getElementById('tech-display');
    const template = document.getElementById('tech-template');

    async function renderTechs() {
        techList.innerHTML = '';
        const technologies = await api.getStudentTechnologies(student.code);
        technologies.forEach((tech) => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.tech-name').textContent = tech.technology.name;
            clone.querySelector('.tech-icon').src = tech.technology.image;
            // clone.querySelector('.tech-image').src = tech.technology.image;
            // clone.querySelector('.tech-image').alt = tech.technology.name;

            /**
             * JSON = tech {level, technology {name, image, code}
             */

            const stars = clone.querySelectorAll('.fa-star');
            for (let i = 0; i < stars.length; i++) {
                if (i < tech.level) {
                    stars[i].classList.add('checked');
                } else {
                    stars[i].classList.remove('checked');
                }
            }
            techList.appendChild(clone);
        });
    }
    await renderTechs();
});
