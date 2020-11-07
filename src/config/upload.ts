import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, cb) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const normalizedName = file.originalname.replace(/ /g, '_');
      const filename = `${fileHash}-${normalizedName}`;

      cb(null, filename);
    },
  }),
};
