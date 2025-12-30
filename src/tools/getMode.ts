import modes from "../constants/modes";
import type { Mode } from "../types";

export default function getMode(data: string): Mode {
  switch (true) {
    case /^[0-9]*$/.test(data):
      return modes.numeric ?? "Numeric";
    case /^[0-9A-Z $%*+\-./:]*$/.test(data):
      return modes.alphanumeric ?? "Alphanumeric";
    default:
      return modes.byte ?? "Byte";
  }
}
