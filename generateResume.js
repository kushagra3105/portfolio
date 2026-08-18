import fs from 'fs';
import PDFDocument from 'pdfkit';

function createResume(outputPath) {
  const doc = new PDFDocument({
    margin: 40,
    size: 'A4',
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const primaryColor = '#111827';
  const secondaryColor = '#374151';
  const accentColor = '#6d28d9';
  const grayColor = '#4b5563';

  // Header
  doc.font('Helvetica-Bold').fontSize(22).fillColor(primaryColor).text('KUSHAGRA SINGH', { align: 'center' });
  doc.moveDown(0.2);
  doc.font('Helvetica').fontSize(11).fillColor(secondaryColor).text('B.Tech Computer Science and Engineering', { align: 'center' });
  doc.moveDown(0.2);
  
  doc.font('Helvetica').fontSize(9.5).fillColor(accentColor)
    .text('kushagra.singh.dev@gmail.com', { continued: true, align: 'center' })
    .fillColor(grayColor).text('  •  +91 9414682353  •  ', { continued: true })
    .fillColor(accentColor).text('LinkedIn: kushagra-singh', { continued: true })
    .fillColor(grayColor).text('  •  ', { continued: true })
    .fillColor(accentColor).text('GitHub: kushagra3105');
  
  doc.moveDown(0.6);

  function addSectionHeader(title) {
    doc.moveDown(0.4);
    doc.font('Helvetica-Bold').fontSize(11).fillColor(primaryColor).text(title.toUpperCase());
    const y = doc.y;
    doc.strokeColor('#d1d5db').lineWidth(0.75).moveTo(40, y).lineTo(555, y).stroke();
    doc.moveDown(0.3);
  }

  // Professional Summary
  addSectionHeader('Professional Summary');
  doc.font('Helvetica').fontSize(9).fillColor(secondaryColor).text(
    'Computer Science undergraduate with hands-on experience in Machine Learning, Deep Learning, and Data Science. Skilled Data Scientist proficient in Python, PyTorch, and Scikit-learn, with a proven track record of building AI-driven predictive models and scalable applications.',
    { lineGap: 1.5 }
  );

  // Technical Skills
  addSectionHeader('Technical Skills');
  const skills = [
    { label: 'Languages', val: 'Python, Java, SQL, JavaScript' },
    { label: 'Frameworks & Libraries', val: 'PyTorch, Scikit-learn, Flask, Streamlit, Pandas, NumPy, Matplotlib, Seaborn' },
    { label: 'Databases', val: 'MySQL, MongoDB' },
    { label: 'Tools & Platforms', val: 'Git, GitHub, VS Code, Jupyter Notebook' },
    { label: 'Core Competencies', val: 'Machine Learning, Deep Learning, Data Science, Web Development' },
  ];
  skills.forEach(s => {
    doc.font('Helvetica-Bold').fontSize(9).fillColor(primaryColor).text(s.label + ': ', { continued: true })
       .font('Helvetica').fillColor(secondaryColor).text(s.val, { lineGap: 1 });
  });

  // Education
  addSectionHeader('Education');
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(primaryColor).text('SRM Institute of Science and Technology, Ghaziabad', { continued: true })
     .font('Helvetica').fillColor(grayColor).text('2023 – 2027', { align: 'right' });
  doc.font('Helvetica').fontSize(9).fillColor(secondaryColor).text('B.Tech in Computer Science and Engineering', { continued: true })
     .font('Helvetica-Bold').fillColor(primaryColor).text('CGPA: 8.75/10', { align: 'right' });

  // Professional Experience
  addSectionHeader('Professional Experience');
  
  // Job 1
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(primaryColor).text('Aarvasa Innovations Pvt. Ltd. — Bhopal, India', { continued: true })
     .font('Helvetica').fillColor(grayColor).text('Nov 2025 – Jan 2026', { align: 'right' });
  doc.font('Helvetica-Oblique').fontSize(9).fillColor(accentColor).text('Data Scientist Intern [Certificate]');
  doc.font('Helvetica').fontSize(8.5).fillColor(secondaryColor)
     .text('• Executed comprehensive data preprocessing, feature engineering, and Machine Learning model development workflows.')
     .text('• Leveraged Python, Pandas, NumPy, and Scikit-learn to conduct in-depth data analysis and predictive modeling.')
     .text('• Enhanced model prediction accuracy through the application of advanced data-driven optimization techniques.');
  doc.moveDown(0.2);

  // Job 2
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(primaryColor).text('Web Gain Technologies Pvt. Ltd. — Remote', { continued: true })
     .font('Helvetica').fillColor(grayColor).text('Jun 2025 – Jul 2025', { align: 'right' });
  doc.font('Helvetica-Oblique').fontSize(9).fillColor(accentColor).text('Data Scientist Intern [Certificate]');
  doc.font('Helvetica').fontSize(8.5).fillColor(secondaryColor)
     .text('• Directed data analysis, visualization, and predictive model development pipelines utilizing Python.')
     .text('• Performed rigorous data cleaning and preprocessing operations utilizing Pandas and NumPy.')
     .text('• Architected and evaluated Machine Learning models against real-world datasets to drive actionable insights.');

  // Projects
  addSectionHeader('Projects');
  
  // Project 1
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(primaryColor).text('Breast Cancer Detection Model — [GitHub]', { continued: true })
     .font('Helvetica').fillColor(grayColor).text('2026', { align: 'right' });
  doc.font('Helvetica').fontSize(8.5).fillColor(secondaryColor)
     .text('• Developed a deep learning binary classifier utilizing PyTorch to accurately distinguish between malignant and benign tumors.')
     .text('• Attained a 97% accuracy rate by designing robust neural networks implementing ReLU activation and the Adam optimizer.');
  doc.moveDown(0.2);

  // Project 2
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(primaryColor).text('Image Segmentation Model — [GitHub]', { continued: true })
     .font('Helvetica').fillColor(grayColor).text('2025', { align: 'right' });
  doc.font('Helvetica').fontSize(8.5).fillColor(secondaryColor)
     .text('• Designed and deployed an image segmentation model dedicated to object separation and complex image analysis tasks.')
     .text('• Executed end-to-end workflows including data preprocessing, model training, and performance evaluation using Python and PyTorch.');
  doc.moveDown(0.2);

  // Project 3
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(primaryColor).text('Crop Recommendation System — [GitHub]', { align: 'left' });
  doc.font('Helvetica').fontSize(8.5).fillColor(secondaryColor)
     .text('• Engineered a Machine Learning model to recommend optimal crops based on complex soil and weather datasets.')
     .text('• Implemented classification algorithms and advanced preprocessing techniques to ensure rigorous prediction optimization.');

  // Research & Publications
  addSectionHeader('Research & Publications');
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(primaryColor).text('Real-Time Crop Disease Detection Model — [View Paper]', { continued: true })
     .font('Helvetica').fillColor(grayColor).text('2026', { align: 'right' });
  doc.font('Helvetica').fontSize(8.5).fillColor(secondaryColor)
     .text('• Authored research on developing an adaptive Machine Learning model for real-time crop disease detection utilizing MobileNetV2.')
     .text('• Achieved 87% field accuracy across 27 distinct disease classes.')
     .text('• Successfully optimized and compressed the model into an 11MB TensorFlow Lite application to facilitate offline mobile deployment.');

  // Achievements
  addSectionHeader('Achievements');
  doc.font('Helvetica').fontSize(8.5).fillColor(secondaryColor)
     .text('• Winner, Code Wizard Special Track 2.0 Hackathon (2026): Secured 1st position for developing an innovative Image Segmentation AI project and was awarded a cash prize of Rs. 10,000.');

  // Certifications
  addSectionHeader('Certifications');
  doc.font('Helvetica').fontSize(8.5).fillColor(secondaryColor)
     .text('• Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate [Credential]')
     .text('• Software Engineering Job Simulation - JPMorgan Chase & Co. (Forage) [Credential]')
     .text('• Introduction to Data Science Job Simulation - Forage [Credential]');

  doc.end();

  return new Promise((resolve) => {
    stream.on('finish', () => resolve(true));
  });
}

async function run() {
  await createResume('./public/resume.pdf');
  await createResume('./public/Kushagra_Singh_Resume.pdf');
  console.log('Resume PDFs generated successfully!');
}

run();
