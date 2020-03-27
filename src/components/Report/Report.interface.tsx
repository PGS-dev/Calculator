import { ISelectedValues } from "../Questions/Questions.interface";

export interface IReportProps {
  selectedValues: Array<ISelectedValues>;
  selectedAnswers: Array<{
    question: string;
    answer: string;
  }>;
}