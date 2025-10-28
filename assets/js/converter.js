// 단위 변환 데이터
const UNITS = {
    length: [
        { label: 'mm', value: 'mm', toBase: v => v / 1000, fromBase: v => v * 1000 },
        { label: 'cm', value: 'cm', toBase: v => v / 100, fromBase: v => v * 100 },
        { label: 'm', value: 'm', toBase: v => v, fromBase: v => v },
        { label: 'km', value: 'km', toBase: v => v * 1000, fromBase: v => v / 1000 },
        { label: 'in(inch)', value: 'inch', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
        { label: 'ft(feet)', value: 'ft', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
        { label: 'yd(yard)', value: 'yd', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
        { label: 'mi(mile)', value: 'mi', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 }
    ],
    power: [
        { label: 'kcal/h', value: 'kcalh', toBase: v => v * 1.163, fromBase: v => v / 1.163 },
        { label: 'W', value: 'w', toBase: v => v, fromBase: v => v },
        { label: 'kW', value: 'kw', toBase: v => v * 1000, fromBase: v => v / 1000 },
        { label: 'HP', value: 'hp', toBase: v => v * 745.7, fromBase: v => v / 745.7 },
        { label: 'USRt', value: 'usrt', toBase: v => v * 3516.85, fromBase: v => v / 3516.85 },
        { label: 'CRt', value: 'crt', toBase: v => v * 3000, fromBase: v => v / 3000 }
    ]
};

function renderUnitFields(category) {
    const fields = document.getElementById('unitFields');
    const units = UNITS[category];
    fields.innerHTML = `
        <div class="converter-row">
            <label for="fromValue">입력값</label>
            <input type="number" id="fromValue" name="fromValue" required>
            <select id="fromUnit" name="fromUnit">
                ${units.map(u => `<option value="${u.value}">${u.label}</option>`).join('')}
            </select>
        </div>
        <div class="converter-row">
            <label for="toUnit">변환단위</label>
            <select id="toUnit" name="toUnit">
                ${units.map(u => `<option value="${u.value}">${u.label}</option>`).join('')}
            </select>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', function () {
    const categorySelect = document.getElementById('category');
    renderUnitFields(categorySelect.value);
    categorySelect.addEventListener('change', function () {
        renderUnitFields(this.value);
    });

    const converterForm = document.getElementById('converterForm');
    const convertResult = document.getElementById('convertResult');
    const resetBtn = document.getElementById('resetBtn');

    converterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const category = categorySelect.value;
        const units = UNITS[category];
        const fromValue = parseFloat(document.getElementById('fromValue').value);
        const fromUnit = document.getElementById('fromUnit').value;
        const toUnit = document.getElementById('toUnit').value;
        if (isNaN(fromValue)) {
            convertResult.textContent = '입력값을 올바르게 입력하세요.';
            convertResult.style.color = '#d32f2f';
            return;
        }
        const from = units.find(u => u.value === fromUnit);
        const to = units.find(u => u.value === toUnit);
        // 변환: 입력값 → 기준단위 → 변환단위
        const baseValue = from.toBase(fromValue);
    const result = to.fromBase(baseValue);
    // Remove trailing zeros after decimal point
    let resultStr = result.toFixed(6).replace(/\.0+$/, '').replace(/(\.[0-9]*[1-9])0+$/, '$1');
    convertResult.innerHTML = `${fromValue} ${from.label} → <strong>${resultStr} ${to.label}</strong>`;
    convertResult.style.color = '#0078d7';
    });

    resetBtn.addEventListener('click', function () {
        converterForm.reset();
        renderUnitFields(categorySelect.value);
        convertResult.textContent = '';
    });
});
