interface commandLineCommandsType {
  (args: string[]): any
}

declare const commandLineCommands: commandLineCommandsType

declare module 'command-line-commands' {
  export = commandLineCommands
}

