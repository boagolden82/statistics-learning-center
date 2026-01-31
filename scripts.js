// 全局JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化工具提示
    initTooltips();
    
    // 平滑滚动
    initSmoothScroll();
    
    // 进度指示器
    updateProgressIndicators();
    
    // 互动演示初始化
    initInteractiveDemos();
});

// 工具提示功能
function initTooltips() {
    const tooltips = document.querySelectorAll('.tooltip-custom');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            this.style.position = 'relative';
        });
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 更新进度指示器
function updateProgressIndicators() {
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    progressBars.forEach(bar => {
        const width = bar.dataset.width || '0';
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 500);
    });
}

// 互动演示功能
function initInteractiveDemos() {
    // 线性回归演示
    initLinearRegressionDemo();
    
    // 逻辑回归演示
    initLogisticRegressionDemo();
    
    // X平方检验演示
    initChiSquareDemo();
}

// 线性回归演示
function initLinearRegressionDemo() {
    const demo = document.querySelector('#linear-regression-demo');
    if (!demo) return;
    
    const canvas = demo.querySelector('canvas');
    const addPointBtn = demo.querySelector('#add-point');
    const clearBtn = demo.querySelector('#clear-points');
    const calculateBtn = demo.querySelector('#calculate-regression');
    
    let points = [];
    
    // 添加数据点
    if (addPointBtn) {
        addPointBtn.addEventListener('click', function() {
            const x = Math.random() * 100;
            const y = 50 + x * 0.8 + (Math.random() - 0.5) * 40;
            points.push({x, y});
            updateVisualization();
        });
    }
    
    // 清除所有点
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            points = [];
            updateVisualization();
        });
    }
    
    // 计算回归线
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            if (points.length < 2) {
                showMessage('请至少添加2个数据点', 'warning');
                return;
            }
            const regression = calculateLinearRegression(points);
            displayRegressionResults(regression);
        });
    }
    
    function updateVisualization() {
        // 这里应该更新canvas绘制
        console.log('Points:', points);
    }
    
    function calculateLinearRegression(points) {
        const n = points.length;
        const sumX = points.reduce((sum, p) => sum + p.x, 0);
        const sumY = points.reduce((sum, p) => sum + p.y, 0);
        const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0);
        const sumXX = points.reduce((sum, p) => sum + p.x * p.x, 0);
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        // 计算R²
        const meanY = sumY / n;
        const totalSS = points.reduce((sum, p) => sum + Math.pow(p.y - meanY, 2), 0);
        const residualSS = points.reduce((sum, p) => {
            const predicted = intercept + slope * p.x;
            return sum + Math.pow(p.y - predicted, 2);
        }, 0);
        const rSquared = 1 - (residualSS / totalSS);
        
        return {
            slope: slope.toFixed(3),
            intercept: intercept.toFixed(3),
            rSquared: rSquared.toFixed(3),
            equation: `y = ${slope.toFixed(3)}x + ${intercept.toFixed(3)}`
        };
    }
    
    function displayRegressionResults(results) {
        const resultDiv = demo.querySelector('.regression-results');
        if (resultDiv) {
            resultDiv.innerHTML = `
                <div class="alert alert-success">
                    <h6>回归结果:</h6>
                    <p><strong>方程:</strong> ${results.equation}</p>
                    <p><strong>R²:</strong> ${results.rSquared}</p>
                    <p><strong>斜率:</strong> ${results.slope}</p>
                    <p><strong>截距:</strong> ${results.intercept}</p>
                </div>
            `;
        }
    }
}

// 逻辑回归演示
function initLogisticRegressionDemo() {
    const demo = document.querySelector('#logistic-regression-demo');
    if (!demo) return;
    
    const featureInput = demo.querySelector('#feature-input');
    const predictBtn = demo.querySelector('#predict-btn');
    const resultDiv = demo.querySelector('#prediction-result');
    
    if (predictBtn) {
        predictBtn.addEventListener('click', function() {
            const features = getFeatureValues();
            const prediction = calculateLogisticRegression(features);
            displayPrediction(prediction, resultDiv);
        });
    }
    
    function getFeatureValues() {
        const values = {};
        demo.querySelectorAll('input[type="number"]').forEach(input => {
            values[input.id] = parseFloat(input.value) || 0;
        });
        return values;
    }
    
    function calculateLogisticRegression(features) {
        // 简化的逻辑回归计算示例
        // 实际应用中应该使用训练好的模型参数
        let z = 0;
        if (features.feature1) z += 0.5 * features.feature1;
        if (features.feature2) z += -0.3 * features.feature2;
        if (features.feature3) z += 1.2 * features.feature3;
        z += 0.1; // bias term
        
        // sigmoid函数
        const probability = 1 / (1 + Math.exp(-z));
        
        return {
            probability: probability.toFixed(3),
            prediction: probability > 0.5 ? '正面' : '负面',
            confidence: (Math.abs(probability - 0.5) * 2).toFixed(3)
        };
    }
    
    function displayPrediction(prediction, resultDiv) {
        if (resultDiv) {
            const alertType = prediction.probability > 0.7 ? 'success' : 
                           prediction.probability < 0.3 ? 'danger' : 'warning';
            
            resultDiv.innerHTML = `
                <div class="alert alert-${alertType}">
                    <h6>预测结果:</h6>
                    <p><strong>分类:</strong> ${prediction.prediction}</p>
                    <p><strong>概率:</strong> ${prediction.probability}</p>
                    <p><strong>置信度:</strong> ${prediction.confidence}</p>
                    <div class="progress mt-2">
                        <div class="progress-bar" style="width: ${prediction.probability * 100}%"></div>
                    </div>
                </div>
            `;
        }
    }
}

// X平方检验演示
function initChiSquareDemo() {
    const demo = document.querySelector('#chi-square-demo');
    if (!demo) return;
    
    const calculateBtn = demo.querySelector('#calculate-chi-square');
    const resultDiv = demo.querySelector('#chi-square-result');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const observedData = getObservedData();
            const result = calculateChiSquare(observedData);
            displayChiSquareResult(result, resultDiv);
        });
    }
    
    function getObservedData() {
        const data = [];
        demo.querySelectorAll('input[type="number"]').forEach(input => {
            data.push(parseFloat(input.value) || 0);
        });
        return data;
    }
    
    function calculateChiSquare(observed) {
        // 简化的X平方检验示例
        // 2x2列联表的X平方计算
        if (observed.length !== 4) {
            return { error: '请输入4个观测值（2x2表格）' };
        }
        
        const total = observed.reduce((sum, val) => sum + val, 0);
        
        // 计算期望值
        const expected = [];
        expected[0] = ((observed[0] + observed[1]) * (observed[0] + observed[2])) / total;
        expected[1] = ((observed[0] + observed[1]) * (observed[1] + observed[3])) / total;
        expected[2] = ((observed[2] + observed[3]) * (observed[0] + observed[2])) / total;
        expected[3] = ((observed[2] + observed[3]) * (observed[1] + observed[3])) / total;
        
        // 计算X平方统计量
        let chiSquare = 0;
        for (let i = 0; i < 4; i++) {
            chiSquare += Math.pow(observed[i] - expected[i], 2) / expected[i];
        }
        
        // p值近似（这里简化处理）
        const pValue = chiSquare > 3.841 ? 0.05 : 0.1;
        
        return {
            chiSquare: chiSquare.toFixed(3),
            pValue: pValue.toFixed(3),
            significance: pValue < 0.05 ? '显著' : '不显著',
            dof: 1, // 自由度
            conclusion: pValue < 0.05 ? '拒绝原假设，变量间存在关联' : '无法拒绝原假设，变量间无显著关联'
        };
    }
    
    function displayChiSquareResult(result, resultDiv) {
        if (resultDiv) {
            if (result.error) {
                resultDiv.innerHTML = `<div class="alert alert-danger">${result.error}</div>`;
                return;
            }
            
            const alertType = result.significance === '显著' ? 'warning' : 'info';
            
            resultDiv.innerHTML = `
                <div class="alert alert-${alertType}">
                    <h6>X平方检验结果:</h6>
                    <p><strong>X²统计量:</strong> ${result.chiSquare}</p>
                    <p><strong>P值:</strong> ${result.pValue}</p>
                    <p><strong>显著性水平:</strong> ${result.significance}</p>
                    <p><strong>自由度:</strong> ${result.dof}</p>
                    <hr>
                    <p><strong>结论:</strong> ${result.conclusion}</p>
                </div>
            `;
        }
    }
}

// 练习题功能
function initExerciseManager() {
    const exercises = document.querySelectorAll('.exercise-card');
    exercises.forEach(exercise => {
        const options = exercise.querySelectorAll('.answer-option');
        const checkBtn = exercise.querySelector('.check-answer');
        
        if (checkBtn) {
            checkBtn.addEventListener('click', function() {
                checkAnswer(exercise, options);
            });
        }
        
        options.forEach(option => {
            option.addEventListener('click', function() {
                selectOption(option, options);
            });
        });
    });
}

function selectOption(selectedOption, allOptions) {
    allOptions.forEach(option => option.classList.remove('selected'));
    selectedOption.classList.add('selected');
}

function checkAnswer(exercise, options) {
    const selected = exercise.querySelector('.answer-option.selected');
    const correctAnswer = exercise.dataset.correctAnswer;
    
    if (!selected) {
        showMessage('请先选择一个答案', 'warning');
        return;
    }
    
    const isCorrect = selected.dataset.answer === correctAnswer;
    
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
        if (option.dataset.answer === correctAnswer) {
            option.classList.add('correct');
        } else if (option.classList.contains('selected') && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    const feedback = exercise.querySelector('.answer-feedback');
    if (feedback) {
        feedback.innerHTML = isCorrect ? 
            '<div class="alert alert-success">回答正确！</div>' : 
            '<div class="alert alert-danger">回答错误，请查看正确答案。</div>';
        feedback.style.display = 'block';
    }
}

// 消息提示功能
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type} position-fixed`;
    messageDiv.style.cssText = 'top: 80px; right: 20px; z-index: 1050; min-width: 300px;';
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// 数据可视化辅助函数
function createChart(canvasId, data, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    
    // 这里应该集成Chart.js或其他图表库
    // 为简化示例，我们只返回canvas对象
    console.log(`Chart data for ${canvasId}:`, data);
    return canvas;
}

// 表单验证
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// 本地存储功能
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('保存到本地存储失败:', e);
        return false;
    }
}

function loadFromLocalStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error('从本地存储加载失败:', e);
        return defaultValue;
    }
}

// 导出功能
function exportToCSV(data, filename) {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => 
        headers.map(header => {
            const value = row[header];
            return typeof value === 'string' ? `"${value}"` : value;
        }).join(',')
    );
    
    return [csvHeaders, ...csvRows].join('\n');
}

// 页面加载完成后初始化练习管理器
document.addEventListener('DOMContentLoaded', initExerciseManager);