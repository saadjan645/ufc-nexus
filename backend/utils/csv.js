import { stringify } from 'csv-stringify/sync';
export const toCsv=rows=>stringify(rows.map(r=>JSON.parse(JSON.stringify(r))),{header:true});
