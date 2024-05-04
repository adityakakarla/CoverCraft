import { generateCoverLetter } from "@/app/actions";
import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { ring } from "ldrs";

interface GeneratorProps {
  initialCredits: number;
}

function Generator({ initialCredits }: GeneratorProps) {
  const [description, setDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [credits, setCredits] = useState(initialCredits);
  const [loaded, setLoaded] = useState(true);

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setLoaded(false);
    event.preventDefault();
    const coverLetter = await generateCoverLetter(description);
    if (coverLetter) {
      setCoverLetter(coverLetter);
      setCredits(credits - 1);
    }
    setDescription("");
    setLoaded(true);
  }

  ring.register();

  if (credits > 0) {
    return (
      <div className="bg-white p-10 rounded-2xl w-1/3 flex justify-center mb-40 shadow-lg flex-col">
        {loaded ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              name="description"
              value={description}
              onChange={(e) => handleDescriptionChange(e)}
              placeholder="Copy and paste the job description here"
              className="w-full p-2 border border-sky-950 rounded"
            />
            <div className="flex flex-row">
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-white text-sky-950 border border-sky-950 hover:shadow-sm hover:shadow-sky-400 hover:scale-105 transition duration-300 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <l-ring
            size="40"
            stroke="5"
            bg-opacity="0"
            speed="2"
            color="black"
          ></l-ring>
        )}
        {loaded && coverLetter && <p className="mt-8 py-2">{coverLetter}</p>}
        <p className="mt-8 py-2">
          You have {credits} credit{credits != 1 && "s"} left.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white p-10 rounded-2xl w-1/3 mb-40 shadow-lg flex-col">
      {coverLetter && <p className="py-2 mb-4">{coverLetter}</p>}
      <p className={`py-2 ${!coverLetter && "flex justify-center"}`}>
        You have no credits left.
      </p>
    </div>
  );
}

export default Generator;
