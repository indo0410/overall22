// BMI Bar Graph rendering
function renderBMIBar(bmi) {
    const barMin = 13; // Lower bound for display
    const barMax = 40; // Upper bound for display
    const bmiClamped = Math.max(barMin, Math.min(barMax, bmi));
    const percent = ((bmiClamped - barMin) / (barMax - barMin)) * 100;
    const bmiBarGraph = document.getElementById('bmiBarGraph');
    bmiBarGraph.innerHTML = `
        <div class="bmi-bar-container">
            <div class="bmi-bar" style="width:${percent}%;"></div>
            <div class="bmi-bar-pointer" style="left:${percent}%; transform: translateX(-50%);">
                <div class="bmi-bar-pointer-arrow"></div>
            </div>
        </div>
        <div class="bmi-bar-labels">
            <span>13</span>
            <span>18.5</span>
            <span>23</span>
            <span>25</span>
            <span>30</span>
            <span>35</span>
            <span>40</span>
        </div>
    `;
}

function clearBMIBar() {
    const bmiBarGraph = document.getElementById('bmiBarGraph');
    bmiBarGraph.innerHTML = '';
}
