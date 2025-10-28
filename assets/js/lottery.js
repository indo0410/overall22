document.addEventListener('DOMContentLoaded', function () {
    const totalCountInput = document.getElementById('totalCount');
    const failCountInput = document.getElementById('failCount');
    const makeBtn = document.getElementById('makeLottery');
    const openAllBtn = document.getElementById('openAll');
    const statusDiv = document.getElementById('lotteryStatus');
    const listDiv = document.getElementById('lotteryList');

    let lottery = [];
    let revealed = [];

    function updateStatus() {
        const total = parseInt(totalCountInput.value, 10);
        const fail = parseInt(failCountInput.value, 10);
        statusDiv.textContent = `현재 설정 : ${total}개 제비 (당첨 ${total-fail}개, 꽝 ${fail}개)`;
    }

    function renderLottery() {
        listDiv.innerHTML = '';
        lottery.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = 'lottery-card lottery-item';
            card.textContent = revealed[idx] ? (item === 'fail' ? '꽝' : '당첨!') : `${idx+1}번`;
            card.tabIndex = 0;
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', revealed[idx] ? (item === 'fail' ? '꽝' : '당첨') : `${idx+1}번 제비`);
            card.onclick = function() {
                revealed[idx] = true;
                card.textContent = item === 'fail' ? '꽝' : '당첨!';
                card.classList.add(item === 'fail' ? 'fail' : 'win');
                card.tabIndex = -1;
                card.setAttribute('aria-label', item === 'fail' ? '꽝' : '당첨');
                card.style.pointerEvents = 'none';
                if (revealed.filter(Boolean).length === lottery.length) openAllBtn.disabled = true;
            };
            if (revealed[idx]) {
                card.classList.add(item === 'fail' ? 'fail' : 'win');
                card.tabIndex = -1;
                card.style.pointerEvents = 'none';
            }
            listDiv.appendChild(card);
        });
    }

    function shuffleArray(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    makeBtn.onclick = function() {
        const total = parseInt(totalCountInput.value, 10);
        const fail = parseInt(failCountInput.value, 10);
        if (isNaN(total) || isNaN(fail) || total < 2 || fail < 0 || fail >= total) {
            alert('총 개수는 2 이상, 꽝 개수는 0 이상 총 개수 미만이어야 합니다.');
            return;
        }
        const baseArr = Array(total-fail).fill('win').concat(Array(fail).fill('fail'));
        lottery = shuffleArray(baseArr);
        revealed = Array(total).fill(false);
        openAllBtn.disabled = false;
        renderLottery();
        updateStatus();
    };

    openAllBtn.onclick = function() {
        revealed = Array(lottery.length).fill(true);
        renderLottery();
        openAllBtn.disabled = true;
    };

    totalCountInput.oninput = updateStatus;
    failCountInput.oninput = updateStatus;
    updateStatus();

    // 다시하기 버튼 기능
    const resetBtn = document.getElementById('resetLottery');
    resetBtn.onclick = function() {
        // 입력값, 상태, 제비 모두 초기화
        totalCountInput.value = 10;
        failCountInput.value = 1;
        lottery = [];
        revealed = [];
        listDiv.innerHTML = '';
        openAllBtn.disabled = true;
        updateStatus();
        statusDiv.textContent = '';
    };
});
