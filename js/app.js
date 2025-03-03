document.addEventListener('DOMContentLoaded', () => {
    // Sample student data
    const students = [
        {
            name: 'Carlos Rene Angarita Sanguino',
            id: '05372',
            email: 'carlosreneas@ufps.edu.co',
            github: 'GitHub',
            image: 'https://media.licdn.com/dms/image/C4D03AQEHycGfZ5Gnhg/profile-displayphoto-shrink_800_800/0/1516522723425?e=2147483647&v=beta&t=trkBbPulUH_Hq3tvr0mXqiZ1yutwH1pvDLHvUnoZnzo'
        },
        {
            name: 'Yan Carlo Angarita Sanguino',
            id: '00001',
            email: 'yancarlo120b@gmail.com',
            github: 'GitHub',
            image: 'https://media.licdn.com/dms/image/C4D03AQEHycGfZ5Gnhg/profile-displayphoto-shrink_800_800/0/1516522723425?e=2147483647&v=beta&t=trkBbPulUH_Hq3tvr0mXqiZ1yutwH1pvDLHvUnoZnzo'
        },
        {
            name: 'Claudia Yamile Gomez Llanez',
            id: '05096',
            email: 'claudiaygomez@ufps.edu.co',
            github: 'GitHub',
            image: 'https://media.licdn.com/dms/image/C4D03AQEHycGfZ5Gnhg/profile-displayphoto-shrink_800_800/0/1516522723425?e=2147483647&v=beta&t=trkBbPulUH_Hq3tvr0mXqiZ1yutwH1pvDLHvUnoZnzo'
        }
    ];

    const studentsList = document.getElementById('studentsList');
    const template = document.getElementById('studentCardTemplate');

    // Render students
    function renderStudents() {
        studentsList.innerHTML = '';
        students.forEach(student => {
            console.log(student.name);

            const clone = template.content.cloneNode(true);

            clone.querySelector('.userName').textContent = student.name;
            clone.querySelector('.email').textContent = student.email;
            clone.querySelector('.avatar').src = student.image;
            clone.querySelector('.btn-card').href = 'https://github.com/${student.github}';

            studentsList.appendChild(clone);
        });
    }

    // Initial render
    renderStudents();

});
