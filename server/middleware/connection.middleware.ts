import { Injectable, NestMiddleware } from '@nestjs/common';
import { dataSourceOptions } from 'db/datasource';
import { DataSource } from 'typeorm';

@Injectable()
export class ConnectionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // check if connection is successful
    const connection = new DataSource(dataSourceOptions);
    const isConnected = connection.initialize();
    if (isConnected) {
        console.log('Connection to database successful');
    } else {
        console.log('Connection to database failed');
    }
    next();
  }
}


