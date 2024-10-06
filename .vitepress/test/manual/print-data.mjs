import { getItemsFromDendronNoteFiles } from '../../dendron-utilities.mjs'
import { SiteMetadataService } from '../../site-metadata-service.mjs'
import fs from 'fs';
import path from 'path';

const siteMetadata = new SiteMetadataService(getItemsFromDendronNoteFiles, true);

const folderPath = '.vitepress/test/manual/temp';
if (!fs.existsSync(folderPath))
  fs.mkdirSync(folderPath);

const filename =  `printed-data-${getTimestamp()}.json`
fs.writeFileSync(path.join(folderPath,filename), JSON.stringify(siteMetadata, null, 2));

function getTimestamp() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}