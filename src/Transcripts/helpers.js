import { ASSEMBO_NOTE_TAKER_COMMANDS } from "../constants";

/**
 * function to process raw text from transcript
 * @param {string} rawText string from transcript message
 * @return {Object} result containing action for client end to take 
 */
export const preprocessText = (rawText) => {
  if (
    rawText.indexOf("assemble ride") > -1 ||
    rawText.indexOf("assemble right") > -1 ||
    rawText.indexOf("assemble write") > -1 ||
    rawText.indexOf("assemble rite") > -1
  ) {
    return {
      action: ASSEMBO_NOTE_TAKER_COMMANDS.WRITE_IT_DOWN
    };
  } else if (
    rawText.indexOf("assemble assign") > -1 ||
    rawText.indexOf("assemble a sign") > -1 ||
    rawText.indexOf("assemble sign") > -1 ||
    rawText.indexOf("assemble science") > -1 ||
    rawText.indexOf("assemble assigned") > -1 ||
    rawText.indexOf("assemble signed") > -1
  ) {
    // this is some dirty code that need to be cleaned up
    const indexOfThis = rawText.indexOf(" to");
    const relevantText = rawText.slice(indexOfThis + 4);
    const subject = relevantText.split(' ')[0];
    if (indexOfThis > -1 && subject) {
      return {
        action: ASSEMBO_NOTE_TAKER_COMMANDS.ASSIGN_TO,
        subject
      };
    } else {
      return {
        action: ASSEMBO_NOTE_TAKER_COMMANDS.ADD_TRANSCRIPT
      };
    }
  } else {
    return {
      action: ASSEMBO_NOTE_TAKER_COMMANDS.ADD_TRANSCRIPT
    };
  }
};

/**
 * remove white space and add a dash in the front of the text
 * @param {*} rawText 
 * @returns modified text with white space removed and dash added
 */
export const stripWhiteSpaceAddDash = (rawText) => {
  const stripped = stripWhiteSpace(rawText)
  const formattedText = `- ${stripped}`;
  return formattedText
}

/**
 * remove white space
 * @param {*} rawText 
 * @returns modified text with white space removed
 */
 export const stripWhiteSpace = (rawText) => {
  const stripped = rawText.trim();
  console.log("stripped", stripped);
  return stripped
}

