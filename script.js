// Función para cargar los estudiantes desde localStorage y mostrar en la tabla
function loadStudentTable(filter = "todos") {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const tableBody = document.querySelector('.table-container tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos registros

    // Filtrar los estudiantes por tipo de TDAH
    const filteredStudents = students.filter(student => filter === "todos" || student.tdahType === filter);

    filteredStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td>${student.tdahType}</td>
            <td>${student.diagnosisDate}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${student.id})">Editar</button>
                <button class="delete-btn" onclick="deleteStudent(${student.id})">Eliminar</button>
                <button class="plan-btn" onclick="generateStudyPlan(${student.id})">Generar Plan</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para manejar el formulario y guardar los datos en localStorage
document.getElementById('student-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('student-name').value;
    const grade = document.getElementById('student-grade').value;
    const tdahType = document.getElementById('tdah-type').value;

    // Validar si los campos están completos
    if (!name || !grade || !tdahType) {
        alert('Por favor complete todos los campos obligatorios');
        return;
    }

    const newStudent = {
        id: Date.now(),  // Usamos el timestamp como ID único
        name,
        grade,
        tdahType,
        diagnosisDate: new Date().toLocaleDateString(),  // Fecha actual
    };

    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    this.reset();
    loadStudentTable();
});

// Función para editar un estudiante
function editStudent(id) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find(student => student.id === id);
    
    if (student) {
        document.getElementById('student-name').value = student.name;
        document.getElementById('student-grade').value = student.grade;
        document.getElementById('tdah-type').value = student.tdahType;

        // Eliminar el estudiante antes de agregar el editado
        deleteStudent(id);
    }
}

// Función para eliminar un estudiante
function deleteStudent(id) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(student => student.id !== id);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudentTable();
}

// Función para filtrar los estudiantes por tipo de TDAH
document.getElementById('filter-tdah').addEventListener('change', function(e) {
    const filter = e.target.value;
    loadStudentTable(filter);
});

// Función para generar un plan de estudios personalizado
function generateStudyPlan(id) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find(student => student.id === id);
    const planContainer = document.getElementById('plan-container');

    if (student) {
        let plan = '';

        switch (student.tdahType) {
            case 'Inatención':
                plan = `
                    <h3>Plan de Estudio para ${student.name} (Inatención)</h3>
                    <ul>
                        <li>Usar ayudas visuales para tareas.</li>
                        <li>Establecer un horario de estudio claro y conciso.</li>
                        <li>Realizar actividades que promuevan la concentración, como juegos de memoria.</li>
                    </ul>
                `;
                break;
            case 'Hiperactividad':
                plan = `
                    <h3>Plan de Estudio para ${student.name} (Hiperactividad)</h3>
                    <ul>
                        <li>Incluir descansos frecuentes durante las sesiones de estudio.</li>
                        <li>Realizar actividades físicas cortas entre las tareas.</li>
                        <li>Usar métodos de aprendizaje activos, como juegos educativos.</li>
                    </ul>
                `;
                break;
            case 'Impulsividad':
                plan = `
                    <h3>Plan de Estudio para ${student.name} (Impulsividad)</h3>
                    <ul>
                        <li>Fomentar la paciencia con actividades que requieran espera.</li>
                        <li>Establecer tiempos para tomar decisiones y evitar la prisa.</li>
                        <li>Recompensar los logros a medida que se cumplen.</li>
                    </ul>
                `;
                break;
            default:
                plan = `<p>No hay plan disponible para este tipo de TDAH.</p>`;
                break;
        }

        planContainer.innerHTML = plan;
    }
}

// Cargar la tabla de estudiantes al cargar la página
window.onload = loadStudentTable;

               
