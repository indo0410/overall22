function parseDateInput(dateValue) {
    // Accepts yyyy-mm-dd or yyyymmdd
    if (/^\d{8}$/.test(dateValue)) {
        const y = dateValue.slice(0,4);
        const m = dateValue.slice(4,6);
        const d = dateValue.slice(6,8);
        return new Date(`${y}-${m}-${d}`);
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
        return new Date(dateValue);
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function () {
    // YYYYMMDD 입력 제한: 연도 4자리만 허용
    ['fromDate','baseDate','toDate'].forEach(function(id) {
        const el = document.getElementById(id);
        el.addEventListener('input', function(e) {
            // 숫자만 허용, 최대 8자리
            let v = this.value.replace(/[^0-9]/g, '');
            // 연도 4자리, 월 2자리, 일 2자리만 허용
            if (v.length > 8) v = v.slice(0,8);
            if (v.length > 4) {
                v = v.slice(0,4) + v.slice(4,6) + v.slice(6,8);
            }
            // 연도 4자리 초과 입력 방지
            if (v.length > 0 && v.slice(0,4).length > 4) {
                v = v.slice(0,4);
            }
            this.value = v;
        });
    });
    // 1. 특정 날짜로부터 오늘은 몇일째?
    document.getElementById('fromDateForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const fromDate = parseDateInput(document.getElementById('fromDate').value);
        const today = new Date();
        today.setHours(0,0,0,0);
        if (!fromDate || isNaN(fromDate)) {
            document.getElementById('fromDateResult').textContent = '날짜를 올바르게 입력하세요.';
            return;
        }
        const diff = Math.floor((today - fromDate) / (1000 * 60 * 60 * 24)) + 1;
        document.getElementById('fromDateResult').innerHTML = `오늘은 <strong>${diff}일째</strong>입니다.`;
    });

    // 2. 특정 날짜로부터 N일째 되는 날짜는?
    document.getElementById('addDaysForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const baseDate = parseDateInput(document.getElementById('baseDate').value);
        const addDays = parseInt(document.getElementById('addDays').value, 10);
        if (!baseDate || isNaN(baseDate) || isNaN(addDays)) {
            document.getElementById('addDaysResult').textContent = '날짜와 일수를 올바르게 입력하세요.';
            return;
        }
        const resultDate = new Date(baseDate);
        resultDate.setDate(resultDate.getDate() + addDays - 1);
        document.getElementById('addDaysResult').innerHTML = `${addDays}일째 되는 날짜는 <strong>${resultDate.getFullYear()}-${String(resultDate.getMonth()+1).padStart(2,'0')}-${String(resultDate.getDate()).padStart(2,'0')}</strong> 입니다.`;
    });

    // 3. 특정 날짜까지 오늘부터 남은 날짜는?
    document.getElementById('toDateForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const toDate = parseDateInput(document.getElementById('toDate').value);
        const today = new Date();
        today.setHours(0,0,0,0);
        if (!toDate || isNaN(toDate)) {
            document.getElementById('toDateResult').textContent = '날짜를 올바르게 입력하세요.';
            return;
        }
        const diff = Math.floor((toDate - today) / (1000 * 60 * 60 * 24));
        document.getElementById('toDateResult').innerHTML = `오늘부터 <strong>${diff}일 남음</strong>`;
    });
});
