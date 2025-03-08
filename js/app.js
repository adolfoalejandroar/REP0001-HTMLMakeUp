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
            clone.querySelector('.github').href = student.github_link;
            clone.querySelector('.code').textContent = student.code;

            studentsList.appendChild(clone);
        });
    }

    // Initial render
    await renderStudents();

});

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
