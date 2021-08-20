import { useQuery } from "react-query";
import axios from "axios";

export function useQuestions() {
  const {
    data: saQuestions,
    isLoading: saIsLoading,
    refetch: refetchSa,
  } = useQuery<Question[]>("saquestions", async (): Promise<Question[]> => {
    const { data: saQuestions } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/users/saquestions`
    );
    return saQuestions;
  });

  const {
    data: mcQuestions,
    isLoading: mcIsLoading,
    refetch: refetchMc,
  } = useQuery<Question[]>("mcquestions", async (): Promise<Question[]> => {
    const { data: mcQuestions } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/users/mcquestions`
    );
    return mcQuestions;
  });

  return {
    questions:
      saQuestions && mcQuestions
        ? [
            ...saQuestions.map(
              (question) => ({ type: "sa", ...question } as Question)
            ),
            ...mcQuestions.map(
              (question) => ({ type: "mc", ...question } as Question)
            ),
          ]
        : undefined,
    questionsAreLoading: saIsLoading || mcIsLoading,
    refetchQuestions: () => {
      refetchSa();
      refetchMc();
    },
  };
}
