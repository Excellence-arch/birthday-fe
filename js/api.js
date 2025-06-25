// import { showResult, updateProgress } from './utils.js';
// const {showResult, updateProgress} = require('./utils.js');

const uploadCSV = async (file, isGoogleForms = false) => {
  const formData = new FormData();
  formData.append('csv', file, file.name);

  try {
    document.getElementById('progressContainer').style.display = 'block';

    console.log(file);
    const endpoint = 'https://birthday-ienx.onrender.com/api/import';
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });


    // // Simulate progress (in a real app, you might use axios with onUploadProgress)
    // for (let i = 0; i <= 100; i += 10) {
    //   setTimeout(() => updateProgress(i), i * 20);
    // }

    console.log(response);

    const data = await response.json();

    if (!response.ok) {
      // console.log('Upload failed:', data);
      // showResult(data.error || 'Upload failed', false);
      throw new Error(data.error || 'Upload failed');
    }

    showResult(
      `Successfully imported ${data.imported} records. ${data.duplicates} duplicates skipped.`,
      true
    );
    return data;
  } catch (error) {
    showResult(error.message, false);
    throw error;
  }
};
