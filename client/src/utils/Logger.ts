import fs from 'fs'

export class Logger {
  static logFilePath = './logs.txt'

  static error(message: any, error: any) {
    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] ERROR: ${message}, ${error.message}\n`
    fs.appendFile(this.logFilePath, logMessage, (err: any) => {
      if (err) {
        console.error('Failed to write to log file:', err)
      }
    })
  }
}
