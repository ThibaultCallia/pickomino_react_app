import { DieInterface } from "../Die"


export interface BoardProps {
    selectedDice: DieInterface[];
    setValidation: React.Dispatch<React.SetStateAction<string>>;
}