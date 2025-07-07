import express, { Request, Response } from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import { processPDF } from './rag/processPDF.js';
import { askQuestion } from './rag/ragQA.js';

// تعامُل مع الأخطاء غير المُلتقطة وإشعارات الرفض
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
});

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post(
  '/upload-pdf',
  upload.single('file'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const filePath = req.file?.path;
      console.log('File uploaded at:', filePath);

      if (!filePath) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }

      console.log('Calling processPDF...');
      await processPDF(filePath);
      console.log('processPDF done.');

      res.json({ message: 'PDF processed and indexed successfully!' });
    } catch (err) {
      console.error('Error during /upload-pdf:', err);
      res.status(500).json({ error: 'Failed to process PDF' });
    }
  }
);

app.post('/ask', async (req: Request, res: Response): Promise<void> => {
  const { question } = req.body;
  if (!question) {
    res.status(400).json({ error: 'Question is required' });
    return;
  }

  try {
    const answer = await askQuestion(question);
    res.json(answer);
  } catch (err) {
    console.error('Error during /ask:', err);
    res.status(500).json({ error: 'Failed to get answer' });
  }
});
app.post('/ask', async (req: Request, res: Response): Promise<void> => {
  const { question } = req.body;
  if (!question) {
    res.status(400).json({ error: 'Question is required' });
    return;
  }

  try {
    const answer = await askQuestion(question);
    res.json(answer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get answer' });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

