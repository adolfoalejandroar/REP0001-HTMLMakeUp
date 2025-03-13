document.addEventListener('DOMContentLoaded', () => {
    const student = JSON.parse(localStorage.getItem('entityToView'));
    if (student) {
        document.getElementById('view-avatar').src = student.photo;
        document.getElementById('view-avatar').alt = student.name;
        document.getElementById('view-name').textContent = student.name;
        document.getElementById('view-code').textContent = `ID: ${student.code}`;
        document.getElementById('view-email').textContent = student.email;
        document.getElementById('view-description').textContent = student.description;
    } else {
        console.error('No student data found in localStorage');
    }
});
