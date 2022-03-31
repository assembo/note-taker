import { ASSEMBO_NOTE_TAKER_COMMANDS } from "../constants";

/**
 * function to process raw text from transcript
 * @param {string} rawText string from transcript message
 * @return {Object} result containing action for client end to take 
 */
export const preprocessText = (rawText) => {
  if (rawText.indexOf("assemble") > -1) {
    return ASSEMBO_NOTE_TAKER_COMMANDS.WRITE_IT_DOWN;
  } else {
    return ASSEMBO_NOTE_TAKER_COMMANDS.ADD_TRANSCRIPT;
  }
};

export const stripWhiteSpaceAddDash = (rawText) => {
  const stripped = rawText.replace(/\s+/g, '');
  const formattedText = `- ${stripped}`;
  return formattedText
}
