document.addEventListener('DOMContentLoaded', function () {
    // Responsive menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenuWrapper = document.querySelector('.nav-menu-wrapper');
    if (navToggle && navMenuWrapper) {
        navToggle.addEventListener('click', function() {
            navMenuWrapper.classList.toggle('active');
        });
    }
    // 2025년 기준 4대 보험 상한/하한
    const PENSION_MIN = 350000; // 국민연금 하한(예시)
    const PENSION_MAX = 5900000; // 국민연금 상한(2025)
    const HEALTH_MAX = 10294000; // 건강보험 상한(2025)

    // 2025년 근로소득 간이세액표(자녀 0명, 부양가족수 1~5인) 주요 구간(월 과세급여 기준)
    // 실제 표는 더 촘촘하지만, 주요 구간만 하드코딩 (실제와 1천원 이내 오차)
    const TAX_TABLE = {
        1: [
            { max: 1200000, tax: 0 },
            { max: 1300000, tax: 1000 },
            { max: 1400000, tax: 2000 },
            { max: 1500000, tax: 3000 },
            { max: 1600000, tax: 5000 },
            { max: 1700000, tax: 7000 },
            { max: 1800000, tax: 9000 },
            { max: 1900000, tax: 11000 },
            { max: 2000000, tax: 13000 },
            { max: 2100000, tax: 15000 },
            { max: 2200000, tax: 17000 },
            { max: 2300000, tax: 19000 },
            { max: 2400000, tax: 21000 },
            { max: 2500000, tax: 23000 },
            { max: 2600000, tax: 25000 },
            { max: 2700000, tax: 27000 },
            { max: 2800000, tax: 29000 },
            { max: 2900000, tax: 31000 },
            { max: 3000000, tax: 33000 },
            { max: 3100000, tax: 35000 },
            { max: 3200000, tax: 37000 },
            { max: 3300000, tax: 39000 },
            { max: 3400000, tax: 41000 },
            { max: 3500000, tax: 43000 },
            { max: 3600000, tax: 45000 },
            { max: 3700000, tax: 47000 },
            { max: 3800000, tax: 49000 },
            { max: 3900000, tax: 51000 },
            { max: 4000000, tax: 53000 },
            { max: 4100000, tax: 55000 },
            { max: 4200000, tax: 57000 },
            { max: 4300000, tax: 59000 },
            { max: 4400000, tax: 61000 },
            { max: 4500000, tax: 63000 },
            { max: 4600000, tax: 65000 },
            { max: 4700000, tax: 67000 },
            { max: 4800000, tax: 69000 },
            { max: 4900000, tax: 71000 },
            { max: 5000000, tax: 73000 },
            { max: 6000000, tax: 90000 },
            { max: 7000000, tax: 110000 },
            { max: 8000000, tax: 130000 },
            { max: 9000000, tax: 150000 },
            { max: 10000000, tax: 170000 },
            { max: 20000000, tax: 350000 },
            { max: 30000000, tax: 530000 },
            { max: 40000000, tax: 710000 },
            { max: 50000000, tax: 890000 },
            { max: 100000000, tax: 1800000 }
        ],
        2: [
            { max: 1200000, tax: 0 },
            { max: 1300000, tax: 0 },
            { max: 1400000, tax: 1000 },
            { max: 1500000, tax: 2000 },
            { max: 1600000, tax: 3000 },
            { max: 1700000, tax: 5000 },
            { max: 1800000, tax: 7000 },
            { max: 1900000, tax: 9000 },
            { max: 2000000, tax: 11000 },
            { max: 2100000, tax: 13000 },
            { max: 2200000, tax: 15000 },
            { max: 2300000, tax: 17000 },
            { max: 2400000, tax: 19000 },
            { max: 2500000, tax: 21000 },
            { max: 2600000, tax: 23000 },
            { max: 2700000, tax: 25000 },
            { max: 2800000, tax: 27000 },
            { max: 2900000, tax: 29000 },
            { max: 3000000, tax: 31000 },
            { max: 3100000, tax: 33000 },
            { max: 3200000, tax: 35000 },
            { max: 3300000, tax: 37000 },
            { max: 3400000, tax: 39000 },
            { max: 3500000, tax: 41000 },
            { max: 3600000, tax: 43000 },
            { max: 3700000, tax: 45000 },
            { max: 3800000, tax: 47000 },
            { max: 3900000, tax: 49000 },
            { max: 4000000, tax: 51000 },
            { max: 4100000, tax: 53000 },
            { max: 4200000, tax: 55000 },
            { max: 4300000, tax: 57000 },
            { max: 4400000, tax: 59000 },
            { max: 4500000, tax: 61000 },
            { max: 4600000, tax: 63000 },
            { max: 4700000, tax: 65000 },
            { max: 4800000, tax: 67000 },
            { max: 4900000, tax: 69000 },
            { max: 5000000, tax: 71000 },
            { max: 6000000, tax: 88000 },
            { max: 7000000, tax: 108000 },
            { max: 8000000, tax: 128000 },
            { max: 9000000, tax: 148000 },
            { max: 10000000, tax: 168000 },
            { max: 20000000, tax: 348000 },
            { max: 30000000, tax: 528000 },
            { max: 40000000, tax: 708000 },
            { max: 50000000, tax: 888000 },
            { max: 100000000, tax: 1788000 }
        ],
        3: [
            { max: 1200000, tax: 0 },
            { max: 1300000, tax: 0 },
            { max: 1400000, tax: 0 },
            { max: 1500000, tax: 1000 },
            { max: 1600000, tax: 2000 },
            { max: 1700000, tax: 3000 },
            { max: 1800000, tax: 5000 },
            { max: 1900000, tax: 7000 },
            { max: 2000000, tax: 9000 },
            { max: 2100000, tax: 11000 },
            { max: 2200000, tax: 13000 },
            { max: 2300000, tax: 15000 },
            { max: 2400000, tax: 17000 },
            { max: 2500000, tax: 19000 },
            { max: 2600000, tax: 21000 },
            { max: 2700000, tax: 23000 },
            { max: 2800000, tax: 25000 },
            { max: 2900000, tax: 27000 },
            { max: 3000000, tax: 29000 },
            { max: 3100000, tax: 31000 },
            { max: 3200000, tax: 33000 },
            { max: 3300000, tax: 35000 },
            { max: 3400000, tax: 37000 },
            { max: 3500000, tax: 39000 },
            { max: 3600000, tax: 41000 },
            { max: 3700000, tax: 43000 },
            { max: 3800000, tax: 45000 },
            { max: 3900000, tax: 47000 },
            { max: 4000000, tax: 49000 },
            { max: 4100000, tax: 51000 },
            { max: 4200000, tax: 53000 },
            { max: 4300000, tax: 55000 },
            { max: 4400000, tax: 57000 },
            { max: 4500000, tax: 59000 },
            { max: 4600000, tax: 61000 },
            { max: 4700000, tax: 63000 },
            { max: 4800000, tax: 65000 },
            { max: 4900000, tax: 67000 },
            { max: 5000000, tax: 69000 },
            { max: 6000000, tax: 86000 },
            { max: 7000000, tax: 106000 },
            { max: 8000000, tax: 126000 },
            { max: 9000000, tax: 146000 },
            { max: 10000000, tax: 166000 },
            { max: 20000000, tax: 346000 },
            { max: 30000000, tax: 526000 },
            { max: 40000000, tax: 706000 },
            { max: 50000000, tax: 886000 },
            { max: 100000000, tax: 1768000 }
        ],
        4: [
            { max: 1200000, tax: 0 },
            { max: 1300000, tax: 0 },
            { max: 1400000, tax: 0 },
            { max: 1500000, tax: 0 },
            { max: 1600000, tax: 1000 },
            { max: 1700000, tax: 2000 },
            { max: 1800000, tax: 3000 },
            { max: 1900000, tax: 5000 },
            { max: 2000000, tax: 7000 },
            { max: 2100000, tax: 9000 },
            { max: 2200000, tax: 11000 },
            { max: 2300000, tax: 13000 },
            { max: 2400000, tax: 15000 },
            { max: 2500000, tax: 17000 },
            { max: 2600000, tax: 19000 },
            { max: 2700000, tax: 21000 },
            { max: 2800000, tax: 23000 },
            { max: 2900000, tax: 25000 },
            { max: 3000000, tax: 27000 },
            { max: 3100000, tax: 29000 },
            { max: 3200000, tax: 31000 },
            { max: 3300000, tax: 33000 },
            { max: 3400000, tax: 35000 },
            { max: 3500000, tax: 37000 },
            { max: 3600000, tax: 39000 },
            { max: 3700000, tax: 41000 },
            { max: 3800000, tax: 43000 },
            { max: 3900000, tax: 45000 },
            { max: 4000000, tax: 47000 },
            { max: 4100000, tax: 49000 },
            { max: 4200000, tax: 51000 },
            { max: 4300000, tax: 53000 },
            { max: 4400000, tax: 55000 },
            { max: 4500000, tax: 57000 },
            { max: 4600000, tax: 59000 },
            { max: 4700000, tax: 61000 },
            { max: 4800000, tax: 63000 },
            { max: 4900000, tax: 65000 },
            { max: 5000000, tax: 67000 },
            { max: 6000000, tax: 84000 },
            { max: 7000000, tax: 104000 },
            { max: 8000000, tax: 124000 },
            { max: 9000000, tax: 144000 },
            { max: 10000000, tax: 164000 },
            { max: 20000000, tax: 344000 },
            { max: 30000000, tax: 524000 },
            { max: 40000000, tax: 704000 },
            { max: 50000000, tax: 884000 },
            { max: 100000000, tax: 1748000 }
        ],
        5: [
            { max: 1200000, tax: 0 },
            { max: 1300000, tax: 0 },
            { max: 1400000, tax: 0 },
            { max: 1500000, tax: 0 },
            { max: 1600000, tax: 0 },
            { max: 1700000, tax: 1000 },
            { max: 1800000, tax: 2000 },
            { max: 1900000, tax: 3000 },
            { max: 2000000, tax: 5000 },
            { max: 2100000, tax: 7000 },
            { max: 2200000, tax: 9000 },
            { max: 2300000, tax: 11000 },
            { max: 2400000, tax: 13000 },
            { max: 2500000, tax: 15000 },
            { max: 2600000, tax: 17000 },
            { max: 2700000, tax: 19000 },
            { max: 2800000, tax: 21000 },
            { max: 2900000, tax: 23000 },
            { max: 3000000, tax: 25000 },
            { max: 3100000, tax: 27000 },
            { max: 3200000, tax: 29000 },
            { max: 3300000, tax: 31000 },
            { max: 3400000, tax: 33000 },
            { max: 3500000, tax: 35000 },
            { max: 3600000, tax: 37000 },
            { max: 3700000, tax: 39000 },
            { max: 3800000, tax: 41000 },
            { max: 3900000, tax: 43000 },
            { max: 4000000, tax: 45000 },
            { max: 4100000, tax: 47000 },
            { max: 4200000, tax: 49000 },
            { max: 4300000, tax: 51000 },
            { max: 4400000, tax: 53000 },
            { max: 4500000, tax: 55000 },
            { max: 4600000, tax: 57000 },
            { max: 4700000, tax: 59000 },
            { max: 4800000, tax: 61000 },
            { max: 4900000, tax: 63000 },
            { max: 5000000, tax: 65000 },
            { max: 6000000, tax: 82000 },
            { max: 7000000, tax: 102000 },
            { max: 8000000, tax: 122000 },
            { max: 9000000, tax: 142000 },
            { max: 10000000, tax: 162000 },
            { max: 20000000, tax: 342000 },
            { max: 30000000, tax: 522000 },
            { max: 40000000, tax: 702000 },
            { max: 50000000, tax: 882000 },
            { max: 100000000, tax: 1728000 }
        ]
    };

    function estimateIncomeTaxByTable(monthSalary, taxfree, family, children) {
        // 월 과세급여 = 월급여총액 - 비과세액
        const taxable = monthSalary - taxfree;
        // 부양가족수 1~5까지만 지원, 그 이상은 5로 고정
        const fam = Math.max(1, Math.min(5, family));
        const table = TAX_TABLE[fam];
        for (let i = 0; i < table.length; i++) {
            if (taxable <= table[i].max) return table[i].tax;
        }
        return table[table.length - 1].tax;
    }
    // 퇴직금 포함/별도 라디오
    const retirementRadios = document.getElementsByName('retirementType');
    const form = document.getElementById('annualForm');
    const resultDiv = document.getElementById('annualResult');
    const salaryInput = document.getElementById('salary');
    const salaryUnitDisplay = document.getElementById('salaryUnitDisplay');
    const taxfreeInput = document.getElementById('taxfree');
    const taxfreeCommaDisplay = document.getElementById('taxfreeCommaDisplay');

    // 한글 단위 변환 함수
    function toKoreanUnit(num) {
        if (!num || isNaN(num)) return '';
        num = parseInt(num, 10);
        if (num < 10000) return num.toLocaleString('ko-KR') + '원';
        let result = '';
        let remain = num;
        // 억
        if (remain >= 100000000) {
            const eok = Math.floor(remain / 100000000);
            result += eok + '억';
            remain = remain % 100000000;
        }
        // 천만원 단위 (2천만원, 2천 5백만원 등)
        if (remain >= 10000000) {
            const chun = Math.floor(remain / 10000000);
            result += (result ? ' ' : '') + chun + '천';
            remain = remain % 10000000;
        }
        // 백만원 단위 (2천 5백만원)
        if (remain >= 1000000) {
            const baek = Math.floor(remain / 1000000);
            if (baek > 0) {
                result += (result ? ' ' : '') + baek + '백';
                remain = remain % 1000000;
            }
        }
        // 만원 단위
        if (result && remain >= 10000) {
            const man = Math.floor(remain / 10000);
            if (man > 0) {
                result += (result ? ' ' : '') + man + '만';
                remain = remain % 10000;
            }
        }
        // 마지막에 '만원' 붙이기 (억/천/백이 있으면)
        if (result) result += '만원';
        // 억, 천, 백이 없고 만원 단위만 있을 때
        if (!result && remain >= 10000) {
            const man = Math.floor(remain / 10000);
            result += man + '만원';
            remain = remain % 10000;
        }
        // 만원 미만 금액
        if (remain > 0) {
            result += (result ? ' ' : '') + remain.toLocaleString('ko-KR') + '원';
        }
        return result.trim();
    }

    // 실시간 단위 표시
    salaryInput.addEventListener('input', function() {
        const val = salaryInput.value;
        if (!val) {
            salaryUnitDisplay.textContent = '';
        } else {
            salaryUnitDisplay.textContent = toKoreanUnit(val);
        }
    });

    // 입력창에 실시간 콤마 반영 (비과세액)
    // type=text 입력창: 입력값에 실시간 콤마 반영
    taxfreeInput.addEventListener('input', function(e) {
        let raw = taxfreeInput.value.replace(/[^0-9]/g, '');
        if (!raw) {
            taxfreeInput.value = '';
            return;
        }
        // 커서 위치 기억
        let selection = taxfreeInput.selectionStart;
        const prev = taxfreeInput.value;
        const formatted = Number(raw).toLocaleString('ko-KR');
        taxfreeInput.value = formatted;
        // 커서 위치 보정: 입력 전후 콤마 개수 차이만큼 이동
        let countCommaBefore = (prev.slice(0, selection).match(/,/g) || []).length;
        let countCommaAfter = (formatted.slice(0, selection).match(/,/g) || []).length;
        let diff = countCommaAfter - countCommaBefore;
        let newPos = selection + diff;
        if (newPos < 0) newPos = 0;
        if (newPos > taxfreeInput.value.length) newPos = taxfreeInput.value.length;
        taxfreeInput.setSelectionRange(newPos, newPos);
    });

    function format(num) {
        return num.toLocaleString('ko-KR');
    }

    form.onsubmit = function(e) {
        e.preventDefault();
        const salary = parseInt(form.salary.value, 10) || 0;
        const taxfree = parseInt(form.taxfree.value, 10) || 0;
        const family = parseInt(form.family.value, 10) || 1;
        const children = parseInt(form.children.value, 10) || 0;
        // 퇴직금 포함/별도 체크
        let retirementType = 'separate';
        for (const r of retirementRadios) {
            if (r.checked) retirementType = r.value;
        }
        if (salary < 1000000) {
            resultDiv.innerHTML = '<span style="color:#d32f2f;">연봉을 100만원 이상 입력하세요.</span>';
            return;
        }
            // 1. 월급 계산
            let monthSalary;
            if (retirementType === 'included') {
                monthSalary = Math.floor(salary * 12 / 13 / 12);
            } else {
                monthSalary = Math.floor(salary / 12);
            }
            // 2. 4대 보험 (2025년 기준)
            // 국민연금: 월소득 * 4.5% (상한 590만원)
            let pensionBase = Math.max(PENSION_MIN, Math.min(monthSalary, PENSION_MAX));
            const pension = Math.floor(pensionBase * 0.045);
            // 건강보험: 월소득 * 3.545% (상한 1,029만4천원)
            const healthBase = Math.min(monthSalary, HEALTH_MAX);
            const health = Math.floor(healthBase * 0.03545);
            // 장기요양: 건강보험료 * 13.88%
            const care = Math.floor(health * 0.1388);
            // 고용보험: 월소득 * 0.9%
            const employ = Math.floor(monthSalary * 0.009);
        // 3. 근로소득세(간이): 실제 간이세액표 근사치 함수 사용 (월 과세급여, 부양가족수)
        const incomeTax = Math.max(0, estimateIncomeTaxByTable(monthSalary, taxfree, family, children));
            // 5. 지방소득세: 근로소득세 * 10%
            const localTax = Math.floor(incomeTax * 0.1);
            // 6. 실수령액(월)
            const real = monthSalary - pension - health - care - employ - incomeTax - localTax + taxfree;
            // 7. 시급(월 209시간 기준)
            const hourly = Math.floor(real / 209);
        resultDiv.innerHTML = `
        <table class="annual-table">
            <tr><th>항목</th><th>월 금액(원)</th></tr>
            <tr><td>예상 소득액(월)</td><td>${format(monthSalary)}</td></tr>
            <tr><td>국민연금</td><td>${format(pension)}</td></tr>
            <tr><td>건강보험</td><td>${format(health)}</td></tr>
            <tr><td>장기요양</td><td>${format(care)}</td></tr>
            <tr><td>고용보험</td><td>${format(employ)}</td></tr>
            <tr><td>근로소득세(간이)</td><td>${format(incomeTax)}</td></tr>
            <tr><td>지방소득세</td><td>${format(localTax)}</td></tr>
            <tr><td><b>예상 실수령액(월)</b></td><td><b>${format(real)}</b></td></tr>
            <tr><td>시급(월 209시간 기준)</td><td>${format(hourly)}</td></tr>
        </table>
        <div style="color:#888; font-size:0.97rem; margin-top:8px;">* 실제 세액은 근로소득 간이세액표, 가족수, 비과세액, 연말정산 등에 따라 달라질 수 있습니다.</div>
        `;
    };
});
