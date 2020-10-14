import multer from 'multer'
import path from 'path'

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    
    // dar nome ao arquivo
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`

      // erro como primeiro param e nome como segundo
      // o null anula o erro
      cb(null, fileName)
    }
  })
}