export interface IReportProps {
  need: number;
  maturity: number;
  selectedAnswers: Array<{
    question: string;
    answer: string;
  }>;
}