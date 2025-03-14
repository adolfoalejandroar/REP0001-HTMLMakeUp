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

            clone.querySelector('#delete-button').addEventListener('click', () => {
                const modalTemplate = document.getElementById('are-u-sure');
                const modalClone = modalTemplate.content.cloneNode(true);
                document.body.appendChild(modalClone);

                const modal = document.querySelector('#are-u-sure-panel');

                modal.querySelector('.close').addEventListener('click', () => {
                    modal.style.display = 'none';
                    document.body.removeChild(modal);
                });

                modal.querySelector('#no').addEventListener('click', () => {
                    modal.style.display = 'none';
                    document.body.removeChild(modal);
                });

                modal.querySelector('#yes').addEventListener('click', async () => {
                    const studentCode = student.code;
                    const technologyCode = tech.technology.code;
                    try {
                        await api.deleteStudentTechnology(studentCode, technologyCode);
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

        document.getElementById('add-tech-button').addEventListener('click', async () => {
            const modalTemplate = document.getElementById('addTech');
            const modalClone = modalTemplate.content.cloneNode(true);
            document.body.appendChild(modalClone);

            const modal = document.querySelector('#add-tech-panel');

            modal.querySelector('.close').addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.removeChild(modal);
            });

            const allTechnologies = await api.getTechnologies();
            const studentTechnologies = await api.getStudentTechnologies(student.code);
            const studentTechCodes = studentTechnologies.map(tech => tech.technology.code);
            const availableTechnologies = allTechnologies.filter(tech => !studentTechCodes.includes(tech.code));

            const selectTech = modal.querySelector('#select-tech');
            availableTechnologies.forEach(tech => {
                const option = document.createElement('option');
                option.value = tech.code;
                option.textContent = tech.name;
                selectTech.appendChild(option);
            });

            modal.querySelector('.addTechnology').addEventListener('click', async (event) => {
                event.preventDefault();
                const techTechn = modal.querySelector('#select-tech').value;
                const techLevel = modal.querySelector('#select-level').value;
                const studentTech = {
                    level: techLevel,
                    student_code: student.code,
                    technology_code: techTechn
                };
                try {
                    await api.addStudentTechnology(studentTech);
                    alert('Technology added successfully!');
                    modal.style.display = 'none';
                    document.body.removeChild(modal);
                    location.reload();
                } catch (error) {
                    console.error('Error adding technology:', error);
                    alert('Failed to add this technology.');
                }
            });
        });

    }
    await renderTechs();
});
