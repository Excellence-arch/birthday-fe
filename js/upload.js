// import { uploadCSV } from './api.js';
// import { showResult, resetForm, formatFileSize } from './utils.js';
// const { showResult, resetForm, formatFileSize } = require('./utils.js');
// const { uploadCSV } = require('./api.js');


document.addEventListener('DOMContentLoaded', () => {
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  const browseBtn = document.getElementById('browseBtn');
  const submitBtn = document.getElementById('submitBtn');
  const fileInfo = document.getElementById('fileInfo');
  const isGoogleForms = document.getElementById('isGoogleForms');

  // Drag and drop events
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach((eventName) => {
    uploadArea.addEventListener(eventName, highlight, false);
  });

  ['dragleave', 'drop'].forEach((eventName) => {
    uploadArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight() {
    uploadArea.classList.add('active');
  }

  function unhighlight() {
    uploadArea.classList.remove('active');
  }

  // Handle dropped files
  uploadArea.addEventListener('drop', handleDrop, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  }

  // Browse files
  browseBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => handleFiles(fileInput.files));

  // Submit form
  submitBtn.addEventListener('click', handleSubmit);

  function handleFiles(files) {
    if (files.length === 0) return;

    const file = files[0];
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      showResult('Please upload a valid CSV file', false);
      return;
    }

    fileInfo.textContent = `${file.name} (${formatFileSize(file.size)})`;
    fileInfo.style.display = 'block';
    submitBtn.disabled = false;
  }

  async function handleSubmit() {
    const file = fileInput.files[0];
    if (!file) return;

    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Processing...';

      await uploadCSV(file, isGoogleForms.checked);

      resetForm();
      fileInput.value = '';
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-upload"></i> Upload CSV';
    }
  }
});
