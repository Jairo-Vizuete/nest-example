import { Controller, Get, Res } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Response } from 'express';
import * as PDFDocument from 'pdfkit';

@Controller()
export class AppController {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  @Get('pdf')
  async generatePdf(@Res() res: Response) {
    const pdfDoc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="example.pdf"');

    pdfDoc.pipe(res);
    pdfDoc
      .fontSize(20)
      .text('Hello, this is a PDF generated with PDFKit and NestJS.');

    pdfDoc.end();
  }

  // @Get('localtime')
  // async getTime(): Promise<string> {
  //   const queryResult = await this.entityManager.query('SELECT * FROM users');
  //   return queryResult;
  // }
}
