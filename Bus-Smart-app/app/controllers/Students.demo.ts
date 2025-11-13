import { HocSinh } from './Students'

const hs = HocSinh.createHSinfo('Nguyen Van A', '10A1', '123 Le Loi', new Date('2024-09-01'))
const ph = hs.linkPH('Tran Thi B', '0909123456')
const hs2 = HocSinh.createHSinfo('Le Thi C', '11B2', '456 Tran Hung Dao', new Date('2024-09-02'))   
const ph2 = hs2.linkPH('Pham Van D', '0909876543')

console.log(hs)
console.log(hs2)
console.log(ph)
console.log(ph2)

