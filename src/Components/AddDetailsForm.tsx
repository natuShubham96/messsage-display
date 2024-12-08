import { useState } from "react";
import { Message } from "../types.module";

interface Props {
    onSubmitDetails: (arg0: Message) => void;
    setScreen: (arg0: string) => void;
}

const AddDetailsForm = ({onSubmitDetails, setScreen}: Props) => {
    const [details, setDetails] = useState<{date: string, message: string}>({date: '', message: ''});

    const onDataChange = (event: React.ChangeEvent<HTMLInputElement>,type: string) => {
        const clonedDetails = {...details};
        const enteredValue = event.target.value;
        if(type === 'date') clonedDetails.date = enteredValue;
        if(type === 'message') clonedDetails.message = enteredValue;
        setDetails(clonedDetails);
    }

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmitDetails(details);
    }

  return (
    <div className="flex flex-col gap-3">
      <span className="font-bold text-[20px]">Add New Tile</span>
      <form className="flex flex-col gap-4" onSubmit={(event) => onFormSubmit(event)}>
        <div className="form-containers">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            required
            className="form-inputs"
            onChange={(event) => onDataChange(event, 'date')}
          />
        </div>
        <div className="form-containers">
          <label htmlFor="message">Message</label>
          <input
            type="text"
            id="message"
            required
            className="form-inputs w-[50%]"
            autoComplete="off"
            onChange={(event) => onDataChange(event, 'message')}
          />
        </div>
        <div className="flex gap-3">
          <input type="submit" className="form-inputs" />
          <button className="form-inputs" onClick={() => setScreen('listing')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddDetailsForm;
