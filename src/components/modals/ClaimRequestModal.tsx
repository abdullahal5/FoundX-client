import { Button } from "@nextui-org/button";
import { FieldValues } from "react-hook-form";

import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import FXTextarea from "../form/FXTextArea";

import FXModal from "./FXModal";

import { useAddClaimRequest } from "@/src/hooks/claimRequest.hook";

interface IProps {
  _id: string;
  questions: string[];
}

const ClaimRequestModal = ({ _id, questions }: IProps) => {
  const { mutate: handleClaimRequest, isPending } = useAddClaimRequest();

  const onSubmit = (data: FieldValues) => {
    const claimRequestData = {
      item: _id,
      description: data?.description,
      answers: Object.keys(data)
        .filter((formEle) => formEle.startsWith("answer"))
        .map((answer) => data[answer]),
    };

    handleClaimRequest(claimRequestData);
  };

  return (
    <div>
      <FXModal
        buttonClassName="flex-1"
        buttonText="Claim Request"
        title="Claim Request"
      >
        <FXForm onSubmit={onSubmit}>
          {questions.map((question, idx) => (
            <div key={idx} className="mb-4">
              <p className="mb-1">{question}</p>
              <FXInput
                label={`${idx + 1} . Answer`}
                name={`answer-${idx + 1}`}
              />
            </div>
          ))}
          <FXTextarea label="Description" name="description" />
          <Button
            className="flex-1 my-4 w-full"
            size="lg"
            type="submit"
            variant="solid"
          >
            {isPending ? "Sending" : "Send"}
          </Button>
        </FXForm>
      </FXModal>
    </div>
  );
};

export default ClaimRequestModal;
