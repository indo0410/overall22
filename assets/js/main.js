// DOM 요소들
const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const charCountNoSpace = document.getElementById('charCountNoSpace');
const wordCount = document.getElementById('wordCount');
const lineCount = document.getElementById('lineCount');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const readingTime = document.getElementById('readingTime');
const goalInput = document.getElementById('goalInput');
const setGoalBtn = document.getElementById('setGoalBtn');
const goalMeter = document.getElementById('goalMeter');
const goalBar = document.getElementById('goalBar');
const goalText = document.getElementById('goalText');
const goalStatus = document.getElementById('goalStatus');
const seoMeta = document.getElementById('seoMeta');
const seoTitle = document.getElementById('seoTitle');

// 글자수 계산 함수
function countText() {
    const text = textInput.value;
    
    // 기본 카운트
    const totalChars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const lines = text === '' ? 0 : text.split('\n').length;
    
    // 읽기 시간 계산 (한국어: 분당 300글자, 영어: 분당 200단어)
    const koreanChars = (text.match(/[가-힣]/g) || []).length;
    const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
    const readingTimeMinutes = Math.ceil((koreanChars / 300) + (englishWords / 200));
    
    // 결과 업데이트
    updateStatCard(charCount, totalChars.toLocaleString());
    updateStatCard(charCountNoSpace, charsNoSpace.toLocaleString());
    updateStatCard(wordCount, words.toLocaleString());
    updateStatCard(lineCount, lines.toLocaleString());
    
    // 읽기 시간 업데이트
    if (readingTimeMinutes === 0) {
        readingTime.textContent = '약 0분';
    } else if (readingTimeMinutes === 1) {
        readingTime.textContent = '약 1분';
    } else {
        readingTime.textContent = `약 ${readingTimeMinutes}분`;
    }
    
    // 글쓰기 목표 업데이트
    updateGoalProgress(totalChars);
    
    // SEO 미터 업데이트
    updateSEOMeter(seoMeta, totalChars, 160, 'Meta Description');
    updateSEOMeter(seoTitle, totalChars, 60, 'Title');
}

// 통계 카드 업데이트 함수
function updateStatCard(element, value) {
    if (element.textContent !== value) {
        element.textContent = value;
        element.classList.add('updated');
        setTimeout(() => {
            element.classList.remove('updated');
        }, 300);
    }
}

// 글쓰기 목표 관련 변수
let writingGoal = 0;

// 글쓰기 목표 설정 함수
function setWritingGoal() {
    const goal = parseInt(goalInput.value);
    
    if (isNaN(goal) || goal <= 0) {
        alert('올바른 목표 글자 수를 입력해주세요.');
        return;
    }
    
    if (goal > 10000) {
        alert('목표 글자 수는 10,000자 이하로 설정해주세요.');
        return;
    }
    
    writingGoal = goal;
    goalMeter.style.display = 'block';
    goalStatus.textContent = `목표: ${goal.toLocaleString()}자`;
    
    // 현재 글자 수로 진행률 업데이트
    const currentChars = textInput.value.length;
    updateGoalProgress(currentChars);
    
    // 로컬 스토리지에 저장
    localStorage.setItem('writingGoal', goal.toString());
}

// 글쓰기 목표 진행률 업데이트 함수
function updateGoalProgress(currentChars) {
    if (writingGoal === 0) {
        return;
    }
    
    const percentage = Math.min((currentChars / writingGoal) * 100, 100);
    const isOverLimit = currentChars > writingGoal;
    
    goalBar.style.width = `${Math.min(percentage, 100)}%`;
    goalText.textContent = `${currentChars.toLocaleString()}/${writingGoal.toLocaleString()}`;
    
    // 색상 상태 업데이트
    if (isOverLimit) {
        goalBar.classList.add('over-limit');
        goalStatus.textContent = `목표 초과! +${(currentChars - writingGoal).toLocaleString()}자`;
        goalStatus.style.color = '#dc3545';
    } else {
        goalBar.classList.remove('over-limit');
        const remaining = writingGoal - currentChars;
        if (remaining === 0) {
            goalStatus.textContent = '목표 달성! 훌륭합니다! 🎉';
            goalStatus.style.color = '#28a745';
        } else {
            goalStatus.textContent = `남은 글자: ${remaining.toLocaleString()}자`;
            goalStatus.style.color = '#6c757d';
        }
    }
}

// 글쓰기 목표 초기화 함수
function initWritingGoal() {
    const savedGoal = localStorage.getItem('writingGoal');
    if (savedGoal) {
        const goal = parseInt(savedGoal);
        if (!isNaN(goal) && goal > 0) {
            goalInput.value = goal;
            setWritingGoal();
        }
    }
}

// SEO 미터 업데이트 함수
function updateSEOMeter(meterElement, currentLength, maxLength, type) {
    const meterBar = meterElement.querySelector('.meter-bar');
    const meterText = meterElement.querySelector('.meter-text');
    
    const percentage = Math.min((currentLength / maxLength) * 100, 100);
    const isOverLimit = currentLength > maxLength;
    
    meterBar.style.width = `${percentage}%`;
    meterText.textContent = `${currentLength}/${maxLength}`;
    
    // 색상 상태 업데이트
    meterBar.classList.remove('good', 'warning', 'danger');
    
    if (type === 'Meta Description') {
        if (currentLength >= 120 && currentLength <= 160) {
            meterBar.classList.add('good');
        } else if (currentLength > 160 || (currentLength > 0 && currentLength < 120)) {
            meterBar.classList.add('warning');
        } else if (currentLength > 200) {
            meterBar.classList.add('danger');
        }
    } else if (type === 'Title') {
        if (currentLength >= 30 && currentLength <= 60) {
            meterBar.classList.add('good');
        } else if (currentLength > 60 || (currentLength > 0 && currentLength < 30)) {
            meterBar.classList.add('warning');
        } else if (currentLength > 80) {
            meterBar.classList.add('danger');
        }
    }
}

// 전체 삭제 함수
function clearText() {
    if (textInput.value.length > 0) {
        if (confirm('텍스트를 모두 삭제하시겠습니까?')) {
            textInput.value = '';
            textInput.focus();
            countText();
        }
    }
}

// 텍스트 복사 함수
async function copyText() {
    if (textInput.value.length === 0) {
        alert('복사할 텍스트가 없습니다.');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(textInput.value);
        
        // 성공 피드백
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '복사완료!';
        copyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
        
    } catch (err) {
        // 구식 브라우저 대응
        textInput.select();
        document.execCommand('copy');
        alert('텍스트가 복사되었습니다.');
    }
}

// 키보드 단축키 처리
function handleKeyboardShortcuts(e) {
    // Ctrl+A: 전체 선택
    if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        textInput.select();
    }
    
    // Ctrl+Shift+C: 텍스트 복사
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        copyText();
    }
    
    // Ctrl+Shift+X: 전체 삭제
    if (e.ctrlKey && e.shiftKey && e.key === 'X') {
        e.preventDefault();
        clearText();
    }
    
    // ESC: 텍스트 영역 포커스
    if (e.key === 'Escape') {
        textInput.focus();
    }
}

// 파일 드래그 앤 드롭 처리
function handleFileDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        
        // 텍스트 파일만 허용
        if (file.type.startsWith('text/') || 
            file.name.endsWith('.txt') || 
            file.name.endsWith('.md') || 
            file.name.endsWith('.json')) {
            
            const reader = new FileReader();
            reader.onload = function(e) {
                textInput.value = e.target.result;
                countText();
            };
            reader.readAsText(file, 'UTF-8');
        } else {
            alert('텍스트 파일만 업로드할 수 있습니다.');
        }
    }
}

// 드래그 오버 효과
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    textInput.style.borderColor = '#011C40';
    textInput.style.backgroundColor = '#f0f8f4';
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    textInput.style.borderColor = '';
    textInput.style.backgroundColor = '';
}

// 텍스트 분석 함수 (추가 기능)
function analyzeText() {
    const text = textInput.value;
    
    if (text.length === 0) return;
    
    // 가장 긴 단어 찾기
    const words = text.split(/\s+/);
    const longestWord = words.reduce((longest, current) => 
        current.length > longest.length ? current : longest, '');
    
    // 평균 단어 길이
    const avgWordLength = words.length > 0 ? 
        (words.join('').length / words.length).toFixed(1) : 0;
    
    // 평균 문장 길이
    const sentences = text.split(/[.!?。！？]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = sentences.length > 0 ? 
        (text.length / sentences.length).toFixed(1) : 0;
    
    console.log('텍스트 분석 결과:', {
        longestWord,
        avgWordLength,
        avgSentenceLength,
        sentences: sentences.length
    });
}

// 로컬 스토리지에 텍스트 자동 저장
function autoSave() {
    localStorage.setItem('textCounter_autoSave', textInput.value);
}

// 저장된 텍스트 복원
function restoreText() {
    const saved = localStorage.getItem('textCounter_autoSave');
    if (saved && saved.length > 0) {
        textInput.value = saved;
        countText();
    }
}

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    // 텍스트 입력 이벤트
    textInput.addEventListener('input', function() {
        countText();
        autoSave();
    });
    
    textInput.addEventListener('paste', function() {
        // 붙여넣기 후 약간의 지연을 두고 계산
        setTimeout(countText, 10);
    });
    
    // 버튼 이벤트
    clearBtn.addEventListener('click', clearText);
    copyBtn.addEventListener('click', copyText);
    setGoalBtn.addEventListener('click', setWritingGoal);
    
    // 목표 입력 엔터 키 이벤트
    goalInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            setWritingGoal();
        }
    });
    
    // 키보드 이벤트
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // 드래그 앤 드롭 이벤트
    textInput.addEventListener('dragover', handleDragOver);
    textInput.addEventListener('dragleave', handleDragLeave);
    textInput.addEventListener('drop', handleFileDrop);
    
    // 텍스트 영역 리사이즈 이벤트
    textInput.addEventListener('mouseup', countText);
    
    // 페이지 로드 시 초기화
    restoreText();
    countText();
    initWritingGoal();
    
    // 텍스트 영역에 포커스
    textInput.focus();
    
    // 아코디언 기능 초기화
    initAccordion();
});

// 아코디언 기능
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const content = document.getElementById(target);
            const icon = this.querySelector('.accordion-icon');
            
            // 현재 아코디언이 활성화되어 있는지 확인
            const isActive = this.classList.contains('active');
            
            // 모든 아코디언 닫기
            accordionHeaders.forEach(h => {
                h.classList.remove('active');
                const c = document.getElementById(h.getAttribute('data-target'));
                c.classList.remove('active');
            });
            
            // 클릭한 아코디언이 비활성화 상태였다면 열기
            if (!isActive) {
                this.classList.add('active');
                content.classList.add('active');
            }
        });
    });
}

// 페이지 언로드 시 자동 저장
window.addEventListener('beforeunload', autoSave);

// 유틸리티 함수들
const TextUtils = {
    // 중복 공백 제거
    removeExtraSpaces: function(text) {
        return text.replace(/\s+/g, ' ').trim();
    },
    
    // 줄바꿈 정규화
    normalizeLineBreaks: function(text) {
        return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    },
    
    // 특수문자 제거
    removeSpecialChars: function(text) {
        return text.replace(/[^\w\s가-힣]/g, '');
    },
    
    // 텍스트 요약 (첫 번째 문장)
    getSummary: function(text, maxLength = 100) {
        const firstSentence = text.split(/[.!?。！？]/)[0];
        return firstSentence.length > maxLength ? 
            firstSentence.substring(0, maxLength) + '...' : firstSentence;
    }
};

// 디버그 모드 (개발자 도구에서 사용)
window.TextCounter = {
    getText: () => textInput.value,
    setText: (text) => {
        textInput.value = text;
        countText();
    },
    analyze: analyzeText,
    utils: TextUtils,
    clearStorage: () => localStorage.removeItem('textCounter_autoSave')
};