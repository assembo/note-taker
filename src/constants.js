export const ASSEMBO_COLORS = {
    primary: "#8bebeb",
    dark: "#001318",
    darkSecondary: "#00202B",
    seconday: "#838383",
    blue: '#0080ff',
    OFF:"#e3645b"
  };

// commands for client end to recognize, see that assembo is written as assembo for web voice package to recognize
export const ASSEMBO_NOTE_TAKER_COMMANDS = {
  WRITE_IT_DOWN: "assemble write it down",
  ASSIGN_TO: "assemble assign to",
  ADD_TRANSCRIPT: "ADD_TRANSCRIPT"
};

export const ASSEMBO_WRITE_IT_DOWN_VARIATIONs = [
  "write",
  "right",
  "rite"
];

export const ASSEMBO_ASSIGN_DOWN_VARIATIONS = [
  "assign",
  "a sign"
];

export const SLACK_APP_TOKEN_ENDPOINT = "https://slack.com/oauth/v2/authorize?client_id=1849110550144.3455765220631&scope=channels:read,chat:write,incoming-webhook,users:read,users:read.email&user_scope="