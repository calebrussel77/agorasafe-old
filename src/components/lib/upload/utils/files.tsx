import { HiCamera, HiLink, HiMusicNote, HiVideoCamera } from 'react-icons/hi';

import ExcelIcon from '@components/icons/ExcelIcon';
import PdfIcon from '@components/icons/PdfIcon';
import PowerpointIcon from '@components/icons/PowerpointIcon';
import WordIcon from '@components/icons/WordIcon';
import ZipIcon from '@components/icons/ZipIcon';

import { formatBytes } from './formatBytes';
import { types } from './types';

export type FileType = string | File;
export type ForceFileType = 'image' | 'audio' | 'video';

function removeQueryString(name: string): string {
  return name.split('?')[0];
}

export function getFileName(file: FileType): string {
  if (typeof file === 'string') {
    return removeQueryString(file).split('/').pop();
  } else {
    return file.name;
  }
}

export function getMimeType(file: FileType): string {
  if (typeof file === 'string') {
    const fileName = getFileName(file).split('.').pop();
    return types[fileName] || null;
  } else {
    return file.type;
  }
}

export function getFileSize(file: FileType): string {
  return file instanceof File && file.size ? formatBytes(file.size, 0) : null;
}

export function getFileIcon(file: FileType, forceFileType?: ForceFileType) {
  const mimeType = getMimeType(file);

  if (!forceFileType && !mimeType) {
    return HiLink;
  }

  if (
    forceFileType === 'image' ||
    (mimeType && mimeType.startsWith('image/'))
  ) {
    return HiCamera;
  }
  if (
    forceFileType === 'audio' ||
    (mimeType && mimeType.startsWith('audio/'))
  ) {
    return HiMusicNote;
  }
  if (
    forceFileType === 'video' ||
    (mimeType && mimeType.startsWith('video/'))
  ) {
    return HiVideoCamera;
  }

  switch (mimeType) {
    case 'application/pdf':
      return PdfIcon;
    case 'application/msword':
      return WordIcon;
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return WordIcon;
    case 'application/vnd.ms-excel':
      return ExcelIcon;
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return ExcelIcon;
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return PowerpointIcon;
    case 'application/zip':
    case 'application/x-bzip':
    case 'application/x-bzip2':
    case 'application/x-7z-compressed':
    case 'application/gzip':
    case 'application/vnd.rar':
      return ZipIcon;
    case 'text/csv':
      return ExcelIcon;
    default:
      return HiLink;
  }
}
