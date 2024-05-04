import { addUser } from "@/app/actions";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface ResumeFormProps {
    setExists: (setExists: boolean) => void
}

function ResumeForm({setExists}: ResumeFormProps) {
  const [experiences, setExperiences] = useState([
    { jobTitle: "", company: "", duration: "", description: "" },
  ]);

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newExperiences = experiences.map((experience, i) => {
      if (index === i) {
        return { ...experience, [event.target.name]: event.target.value };
      }
      return experience;
    });
    setExperiences(newExperiences);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filteredExperiences = experiences.filter((experience) => {
      return (
        experience.jobTitle &&
        experience.company &&
        experience.duration &&
        experience.description
      );
    });

    if(filteredExperiences.length > 0){
        const context = filteredExperiences.reduce((accumulator, currentValue, currentIndex) => {
            const experienceDetails = `Job Title: ${currentValue.jobTitle}\nCompany: ${currentValue.company}\nDuration: ${currentValue.duration}\nDescription: ${currentValue.description}`;
            return currentIndex === 0 ? experienceDetails : `${accumulator}\n\n####\n\n${experienceDetails}`;
          }, '');

        addUser(context);
        setExists(true);
    }
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { jobTitle: "", company: "", duration: "", description: "" },
    ]);
  };

  return (
    <div className="bg-white p-10 rounded-2xl w-1/3 flex justify-center mb-40 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {experiences.map((experience, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              name="jobTitle"
              value={experience.jobTitle}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Job Title"
              className="w-full p-2 border border-sky-950 rounded"
            />
            <input
              type="text"
              name="company"
              value={experience.company}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Company Name"
              className="w-full p-2 border border-sky-950 rounded"
            />
            <input
              type="text"
              name="duration"
              value={experience.duration}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Duration (e.g., Jan 2020 - Aug 2022)"
              className="w-full p-2 border border-sky-950 rounded"
            />
            <textarea
              name="description"
              value={experience.description}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Brief description of your responsibilities"
              className="w-full p-2 border border-sky-950 rounded"
            />
          </div>
        ))}
        <div className="flex flex-row justify-between">
        <button
          type="button"
          onClick={addExperience}
          className="mt-4 px-4 py-2 bg-white text-sky-950 border border-sky-950 hover:shadow-sm hover:shadow-sky-400 hover:scale-105 transition duration-300 rounded"
        >
          Add Another Experience
        </button>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-white text-sky-950 border border-sky-950 hover:shadow-sm hover:shadow-sky-400 hover:scale-105 transition duration-300 rounded"
        >
          Submit
        </button>
        </div>
      </form>
    </div>
  );
}

export default ResumeForm;
