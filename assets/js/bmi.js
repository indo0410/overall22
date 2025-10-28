document.addEventListener('DOMContentLoaded', function () {
    const bmiForm = document.getElementById('bmiForm');
    const resultDiv = document.getElementById('result');
    const resetBtn = document.getElementById('resetBtn');


    bmiForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        if (!height || !weight || height < 50 || height > 250 || weight < 10 || weight > 200) {
            resultDiv.textContent = '올바른 신장과 체중을 입력하세요.';
            resultDiv.style.color = '#d32f2f';
            if (typeof clearBMIBar === 'function') clearBMIBar();
            return;
        }
        const bmi = weight / Math.pow(height / 100, 2);
        let category = '';
        if (bmi < 18.5) category = '저체중';
        else if (bmi < 23) category = '정상';
        else if (bmi < 25) category = '과체중';
        else if (bmi < 30) category = '비만 1단계';
        else if (bmi < 35) category = '비만 2단계';
        else category = '비만 3단계';
        resultDiv.innerHTML = `BMI: <strong>${bmi.toFixed(1)}</strong> (${category})`;
        resultDiv.style.color = '#0078d7';
        if (typeof renderBMIBar === 'function') renderBMIBar(bmi);
    });

    resetBtn.addEventListener('click', function () {
        bmiForm.reset();
        resultDiv.textContent = '';
        if (typeof clearBMIBar === 'function') clearBMIBar();
    });
});
