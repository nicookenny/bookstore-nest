import * as fs from 'fs';
import { parse } from 'dotenv';
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction) {
      this.envConfig = {
        PORT: process.env.PORT,
      };
    } else {
      const envPath = __dirname + '/../../.env';
      console.log(envPath);
      const existPath = fs.existsSync(envPath);

      if (!existPath) {
        console.log('El archivo .env no existe');
        process.exit(0);
      }
      this.envConfig = parse(fs.readFileSync(envPath));
    }
  }

  Get(key: string): string {
    return this.envConfig[key];
  }
}
