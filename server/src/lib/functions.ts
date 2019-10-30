import { ResponseServer } from '../interfaces/ResponseServer';

export function getFormatDate(date: Date): string {
  return `${ date.getDate() }.${ date.getMonth() + 1 }.${ date.getFullYear() } ${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }`;
}

export function setResponse(message = '', status = 200): ResponseServer {
  return { status, message };
}

export function setResponseError(e: Error, status = 400): ResponseServer {
  return { status, message: e.message || e.name };
}
