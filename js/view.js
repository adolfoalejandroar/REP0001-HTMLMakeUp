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
    const techedit = document.getElementById('techEditCard');

    async function renderTechs() {
        techList.innerHTML = '';
        const technologies = await api.getStudentTechnologies(student.code);
        technologies.forEach((tech) => {
            console.log(tech);
            const clone = template.content.cloneNode(true);
            clone.querySelector('.tech-name').textContent = tech.technology.name;
            clone.querySelector('.tech-icon').src = tech.technology.image;

            clone.querySelector('#tech-button').addEventListener('click', () => {
                const modalTemplate = document.getElementById('studentEditCard');
                const modalClone = modalTemplate.content.cloneNode(true);
                document.body.appendChild(modalClone);

                const modal = document.querySelector('.edit-profile-panel');

                modal.querySelector('#edit-name').textContent = `${tech.technology.name}`;
                modal.querySelector('h2').textContent += ` ${tech.technology.code}`;
                modal.querySelector('#edit-level').value = tech.level;

                modal.querySelector('.close').addEventListener('click', () => {
                    modal.style.display = 'none';
                    document.body.removeChild(modal);
                });

                modal.querySelector('#edit').addEventListener('click', async (event) => {
                    event.preventDefault();
                    const studentCode = student.code;
                    const technologyCode = tech.technology.code;
                    const level = modal.querySelector('#edit-level').value;
                    try {
                        await api.updateStudentTechnology(studentCode, technologyCode, level);
                        alert('Technology updated successfully!');
                        modal.style.display = 'none';
                        document.body.removeChild(modal);
                        await renderTechs();
                    } catch (error) {
                        console.error('Error updating technology:', error);
                        alert('Failed to updating this technology.');
                    }
                });
            });
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

        document.getElementById('add-tech-button').addEventListener('click', () => {
            const modalTemplate = document.getElementById('addTech');
            const modalClone = modalTemplate.content.cloneNode(true);
            document.body.appendChild(modalClone);

            const modal = document.querySelector('#add-tech-panel');

            modal.querySelector('.close').addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.removeChild(modal);
            });

            modal.querySelector('.addTechnology').addEventListener('click', async (event) => {
                event.preventDefault();
                const techImage = modal.querySelector('#add-image').value;
                const techName = modal.querySelector('#add-name').value;
                const techCode = modal.querySelector('#add-code').value;
                const techLevel = modal.querySelector('#add-level').value;
                const studentTech = {
                    level: techLevel,
                    student_code: student.code,
                    technology: {
                        code: techCode,
                        image: techImage,
                        name: techName
                    },
                    technology_code: techCode
                };
                console.log(studentTech);
                try {
                    await api.addStudentTechnology(studentTech);
                    alert('Technology added successfully!');
                    modal.style.display = 'none';
                    document.body.removeChild(modal);
                    await renderTechs();
                } catch (error) {
                    console.error('Error adding technology:', error);
                    alert('Failed to add this technology.');
                }
            });
        });

    }
    await renderTechs();
});
