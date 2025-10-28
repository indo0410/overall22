document.addEventListener('DOMContentLoaded', function () {
    const bmrForm = document.getElementById('bmrForm');
    const bmrResult = document.getElementById('bmrResult');
    const resetBtn = document.getElementById('resetBtn');

    bmrForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const gender = bmrForm.gender.value;
        const age = parseInt(document.getElementById('age').value, 10);
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);

        if (!gender || !age || !height || !weight) {
            bmrResult.textContent = '모든 값을 올바르게 입력하세요.';
            bmrResult.style.color = '#d32f2f';
            return;
        }

        let bmr = 0;
        if (gender === 'male') {
            // Harris-Benedict Equation for men
            bmr = 66.47 + (13.75 * weight) + (5 * height) - (6.76 * age);
        } else {
            // Harris-Benedict Equation for women
            bmr = 655.1 + (9.56 * weight) + (1.85 * height) - (4.68 * age);
        }
        bmrResult.innerHTML = `기초대사량(BMR): <strong>${bmr.toFixed(1)} kcal</strong>`;
        bmrResult.style.color = '#0078d7';
    });

    resetBtn.addEventListener('click', function () {
        bmrForm.reset();
        bmrResult.textContent = '';
    });
});
