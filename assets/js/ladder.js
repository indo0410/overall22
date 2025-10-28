document.addEventListener('DOMContentLoaded', function () {
    const playerCountInput = document.getElementById('playerCount');
    const makeBtn = document.getElementById('makeLadder');
    const form = document.getElementById('ladderForm');
    const playerInputsDiv = document.getElementById('playerInputs');
    const resultInputsDiv = document.getElementById('resultInputs');
    const resultDiv = document.getElementById('ladderResult');
    const graphicDiv = document.getElementById('ladderGraphic');

    function createInputs() {
        playerInputsDiv.innerHTML = '<h3>참가자 이름</h3>';
        resultInputsDiv.innerHTML = '<h3>결과 이름</h3>';
        const n = parseInt(playerCountInput.value, 10);
        for (let i = 0; i < n; i++) {
            playerInputsDiv.innerHTML += `<input type="text" name="player${i}" placeholder="참가자 ${i+1}" required style="width:90px; margin:2px;">`;
            resultInputsDiv.innerHTML += `<input type="text" name="result${i}" placeholder="결과 ${i+1}" required style="width:90px; margin:2px;">`;
        }
    }

    makeBtn.onclick = function() {
        createInputs();
        form.style.display = '';
        resultDiv.innerHTML = '';
        graphicDiv.innerHTML = '';
    };

    form.onsubmit = function(e) {
        e.preventDefault();
        const n = parseInt(playerCountInput.value, 10);
        const players = [];
        const results = [];
        for (let i = 0; i < n; i++) {
            players.push(form[`player${i}`].value.trim() || `참가자${i+1}`);
            results.push(form[`result${i}`].value.trim() || `결과${i+1}`);
        }
        // 랜덤 매칭
        const shuffled = results.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        // 결과 출력
        let html = '<h3>사다리 결과</h3><ul style="padding-left:0;">';
        for (let i = 0; i < n; i++) {
            html += `<li style="list-style:none; margin-bottom:4px;"><b>${players[i]}</b> → <span style="color:#0078d7; font-weight:600;">${shuffled[i]}</span></li>`;
        }
        html += '</ul>';
        resultDiv.innerHTML = html;
        // 사다리 그래픽(간단 텍스트)
        let ladder = '<pre style="font-size:1.1rem; line-height:1.2;">';
        for (let row = 0; row < 7; row++) {
            let line = '';
            for (let col = 0; col < n; col++) {
                line += '|';
                if (col < n-1) line += (Math.random() < 0.4 ? '---' : '   ');
            }
            ladder += line + '\n';
        }
        ladder += '</pre>';
        graphicDiv.innerHTML = ladder;
    };
});
