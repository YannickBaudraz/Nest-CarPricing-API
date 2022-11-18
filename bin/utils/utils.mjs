export function logCommand(command) {
  console.log(inLightGrey(command));
}

export function logError(error) {
  console.error(inRed(error));
}

export function inLightGrey(text) {
  return `\u001b[2m${text}\u001b[0m`;
}

export function inRed(text) {
  return `\u001b[31m${text}\u001b[0m`;
}
