export class Logger {
  static error(message: any, error: any) {
    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] ERROR: ${message}, ${error.message}\n`
    console.error(logMessage)
  }
}
