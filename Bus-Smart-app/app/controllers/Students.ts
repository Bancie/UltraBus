import { PhuHuynh } from './Parents';

export class HocSinh {
  private maHS: string;
  private ten: string;
  private lop: string;
  private diaChi: string;
  private lichHoc: string;
  private phuHuynh?: PhuHuynh;

  constructor(maHS: string, ten: string, lop: string, diaChi: string, lichHoc: Date) {
    this.maHS = maHS;
    this.ten = ten;
    this.lop = lop;
    this.diaChi = diaChi;
    this.lichHoc = HocSinh.formatDate(lichHoc);
  }

  private static formatDate(date: Date): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }

  static createHSinfo(ten: string, lop: string, diaChi: string, lichHoc: Date): HocSinh {
    const maHS = 'HS' + Math.floor(Math.random() * 10000);
    return new HocSinh(maHS, ten, lop, diaChi, lichHoc);
  }

  linkPH(tenPH: string, sdtPH: string): PhuHuynh {
    const phuHuynh = new PhuHuynh(this.maHS, tenPH, sdtPH);
    this.phuHuynh = phuHuynh;
    return phuHuynh;
  }
}
