/**
 * Esta función carga los trabajadores
 */
document.addEventListener('DOMContentLoaded', async () => {

    const studentsList = document.getElementById('studentsList');
    const template = document.getElementById('studentCardTemplate');

    // Render students
    async function renderStudents() {
        const students = await api.getStudents();
        studentsList.innerHTML = '';
        students.forEach(student => {
            console.log(student);

            const clone = template.content.cloneNode(true);

            clone.querySelector('.userName').textContent = student.name;
            clone.querySelector('.email').textContent = student.email;
            clone.querySelector('.avatar').src = student.photo;
            clone.querySelector('.code').textContent = student.code;

            clone.querySelector('#github-btn').addEventListener('click', () => {
                window.open(student.github_link, '_blank');
            });

            clone.querySelector('#edit-btn').addEventListener('click', () => {
                const modalTemplate = document.getElementById('studentEditCard');
                const modalClone = modalTemplate.content.cloneNode(true);
                document.body.appendChild(modalClone);

                const modal = document.querySelector('.edit-profile-panel');

                modal.querySelector('#edit-name').value = student.name;
                modal.querySelector('h2').textContent += ` ${student.code}`;
                modal.querySelector('#edit-email').value = student.email;
                modal.querySelector('#edit-github').value = student.github_link;
                modal.querySelector('#edit-img').value = student.photo;
                modal.querySelector('#edit-descript').value = student.description;

                modal.querySelector('.close').addEventListener('click', () => {
                    modal.style.display = 'none';
                    document.body.removeChild(modal);
                });

                modal.querySelector('#edit').addEventListener('click', async (event) => {
                    event.preventDefault();

                    const updatedStudent = {
                        name: modal.querySelector('#edit-name').value,
                        email: modal.querySelector('#edit-email').value,
                        github_link: modal.querySelector('#edit-github').value,
                        photo: modal.querySelector('#edit-img').value,
                        description: modal.querySelector('#edit-descript').value
                    };

                    try {
                        await api.updateStudent(student.code, updatedStudent);
                        alert('Student updated successfully!');
                        modal.style.display = 'none';
                        document.body.removeChild(modal);
                        await renderStudents();
                    } catch (error) {
                        console.error('Error updating student:', error);
                        alert('Failed to update student.');
                    }
                });
            });

            studentsList.appendChild(clone);
        });
    }

    // Initial render
    await renderStudents();

});

/**
 * Esta función crea un trabajador
 */
document.getElementById('submit').addEventListener('click', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const code = document.getElementById('code').value;
    const email = document.getElementById('email').value;
    const github = document.getElementById('github').value;
    const photo = document.getElementById('photourl').value;
    const description = document.getElementById('description').value;

    const student = {
        name,
        code,
        email,
        github_link: github,
        photo,
        description
    };

    console.log('Creating student:', student);

    try {
        await api.createStudent(student);
        alert('Student created successfully!');
        window.location.href = './index.html';
    } catch (error) {
        console.error('Error creating student:', error);
        alert('Failed to create student.');
    }
});


/**
 * Esta función actualiza un trabajador
 */
document.getElementById('edit').addEventListener('click', async (event) => {
    event.preventDefault();

    const name = document.getElementById('edit-name').value;
    const code = document.getElementById('edit-code').value;
    const email = document.getElementById('edit-email').value;
    const github = document.getElementById('edit-github').value;
    const photo = document.getElementById('edit-photourl').value;
    const description = document.getElementById('edit-description').value;

    const student = {
        name,
        code,
        email,
        github_link: github,
        photo,
        description
    };

    console.log('Updating student:', student);

    try {
        await api.updateStudent(code, student);
        alert('Student updating successfully!');
        window.location.href = './index.html';
    } catch (error) {
        console.error('Error creating student:', error);
        alert('Failed to create student.');
    }
});