import * as appRoot from 'app-root-path';
import * as makeDir from 'make-dir';
import * as fs from 'fs';
import { extname } from 'path';

export const imageDestination =  async (req, file, cb) => {
  const path = `${appRoot}/assets/media`;
  if(fs.existsSync(path)){
      cb(null, path);
  }else{
      const path = await makeDir(`${appRoot}/assets/media`);
      cb(null, path);
  }
}


export const validateFile = (req, file, cb, options) => {
    // console.log(file);
    if (options.allowedExt) {
      if (!options.allowedExt.includes(getExtension(req, file))) {
        return cb(
          {
            message: {
              error: 'Invalid file type.',
            },
          },
          false,
        );
      }
    }
    cb(null, true);
  };

  export const getExtension = (req, file) => {
    const name = file.originalname.split('.')[0];
    return extname(file.originalname);
  };

  export const imgUrl = async (image) => {
    const imageUrl = process.env.ASSETS+'/media/'+image;
    return imageUrl;
  }
