const showResult = (message, isSuccess = true) => {
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.textContent = message;
  resultContainer.className = `result-container ${
    isSuccess ? 'success' : 'error'
  }`;
  resultContainer.style.display = 'block';
};

const resetForm = () => {
  document.getElementById('fileInfo').style.display = 'none';
  document.getElementById('fileInfo').textContent = '';
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('progressContainer').style.display = 'none';
  document.querySelector('.progress-bar::after').style.width = '0%';
  document.getElementById('progressText').textContent = '0%';
};

const updateProgress = (percentage) => {
  const progressBar = document.querySelector('.progress-bar::after');
  const progressText = document.getElementById('progressText');

  progressBar.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}%`;

  if (percentage === 100) {
    setTimeout(() => {
      document.getElementById('progressContainer').style.display = 'none';
    }, 1000);
  }
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]);
};

// module.exports = { showResult, resetForm, updateProgress, formatFileSize };
