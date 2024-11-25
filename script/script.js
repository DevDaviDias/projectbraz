


const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
let currentDate = new Date(); 
const minYear = 2024;
const maxYear = 2026;
let notes = {}; 


function generateCalendar(date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  
  
  if (year < minYear || year > maxYear) {
    return;
  }

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();  
  const grid = document.querySelector(".calendar-grid");
  const monthName = document.getElementById("month-name");
  
  
  monthName.textContent = `${monthNames[month]} ${year}`;

  
  grid.innerHTML = '';

  
  for (let i = 0; i < startDay; i++) {
    grid.innerHTML += '<div></div>';  
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.textContent = day;
    dayCell.addEventListener('click', () => openModal(day));
    grid.appendChild(dayCell);
  }
}

// Função para abrir o modal e editar a anotação
function openModal(day) {
  const modal = document.getElementById('modal');
  const noteText = document.getElementById('note-text');
  
  // Se já houver uma anotação, mostra ela
  if (notes[day]) {
    noteText.value = notes[day];
  } else {
    noteText.value = '';
  }
  
  modal.style.display = 'flex';
  
  document.getElementById('save-note').onclick = () => saveNote(day);
  document.getElementById('close-modal').onclick = () => closeModal();
}

// Função para fechar o modal
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Função para salvar a anotação
function saveNote(day) {
  const noteText = document.getElementById('note-text').value;
  notes[day] = noteText;
  closeModal();
}

// Função para navegar para o mês anterior
document.getElementById('prev-month').onclick = () => {
  const newDate = new Date(currentDate);
  newDate.setMonth(currentDate.getMonth() - 1);
  
  // Verificar se não ultrapassou o intervalo permitido
  if (newDate.getFullYear() >= minYear) {
    currentDate = newDate;
    generateCalendar(currentDate);
  }
};

// Função para navegar para o próximo mês
document.getElementById('next-month').onclick = () => {
  const newDate = new Date(currentDate);
  newDate.setMonth(currentDate.getMonth() + 1);
  
  // Verificar se não ultrapassou o intervalo permitido
  if (newDate.getFullYear() <= maxYear) {
    currentDate = newDate;
    generateCalendar(currentDate);
  }
};

// Função para garantir que o calendário seja exibido na data atual
function initCalendar() {
  currentDate = new Date(); // Pega a data atual sempre que a página for carregada
  generateCalendar(currentDate);
}

// Inicializar o calendário quando a página for carregada
initCalendar();
