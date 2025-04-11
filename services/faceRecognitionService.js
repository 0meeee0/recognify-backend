const { exec } = require('child_process');
const path = require('path');

exports.recognizeFace = (uploadedImagePath) => {
  return new Promise((resolve, reject) => {
    const studentsDir = path.join(__dirname, '../students');
    const pythonScriptPath = path.join(__dirname, '../deepface_recognize.py');
    
    // Construct the command to run the Python script with the uploaded image and students directory
    const command = `python3 ${pythonScriptPath} ${uploadedImagePath} ${studentsDir}`;
    
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('Execution error:', err);
        return reject(new Error('Recognition failed'));
      }
      if (stderr) {
        console.error('Stderr:', stderr);
      }
      // Trim the output to remove extra whitespace/newlines
      const studentName = stdout.trim();
      resolve(studentName);
    });
  });
};
