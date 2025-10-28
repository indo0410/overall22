// MET values for each activity
const MET_VALUES = {
    walking: 3.0,
    running: 7.0,
    cycling: 6.8,
    swimming: 6.0,
    soccer: 7.0,
    basketball: 6.5,
    yoga: 2.5,
    jump_rope: 8.8,
    weight_training: 6.0,
    aerobics: 5.0,
    pilates: 3.0,
    badminton: 4.5,
    golf: 4.8,
    table_tennis: 4.0,
    climbing: 6.0,
    dancing: 5.5,
    bowling: 3.8,
    tennis: 7.3,
    skateboard: 5.0,
    rowing: 7.0,
    skiing: 7.0,
    jumping_jacks: 8.0,
    stretching: 2.3
};

document.addEventListener('DOMContentLoaded', function () {
    const calorieForm = document.getElementById('calorieForm');
    const calorieResult = document.getElementById('calorieResult');
    const resetBtn = document.getElementById('resetBtn');

    calorieForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const weight = parseFloat(document.getElementById('weight').value);
        const duration = parseFloat(document.getElementById('duration').value);
        const activity = document.getElementById('activity').value;
        if (!weight || !duration || !activity) {
            calorieResult.textContent = '모든 값을 올바르게 입력하세요.';
            calorieResult.style.color = '#d32f2f';
            return;
        }
        const met = MET_VALUES[activity];
        // duration is in minutes, convert to hours
        const hours = duration / 60;
        const calories = met * weight * hours;
        calorieResult.innerHTML = `칼로리 소모량: <strong>${calories.toFixed(1)} kcal</strong>`;
        calorieResult.style.color = '#0078d7';
    });

    resetBtn.addEventListener('click', function () {
        calorieForm.reset();
        calorieResult.textContent = '';
    });
});
