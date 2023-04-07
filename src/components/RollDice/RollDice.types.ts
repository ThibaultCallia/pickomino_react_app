import { DieInterface } from "../Die"

export interface RollDiceProps {
    selectedDice: DieInterface[];
    setSelectedDice: React.Dispatch<React.SetStateAction<DieInterface[]>>;
    setValidation: React.Dispatch<React.SetStateAction<string>>;
  }