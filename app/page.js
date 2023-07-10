"use client";
import { useState } from "react";
import { saveAs } from "file-saver";
import { PDFDocument,StandardFonts, rgb } from "pdf-lib";
import Swal from "sweetalert2";
import { openai } from "./util";
export default function Home() {
  // Define state variables for loading and user inputs
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [degree, setDegree] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [specialtyOne, setSpecialtyOne] = useState("");
  const [specialtyTwo, setSpecialtyTwo] = useState("");

  // Function to generate the cover letter using the OpenAI API
  const generateCoverLetter = async (
    position,
    company,
    degree,
    experience,
    specialty1,
    specialty2
  ) => {
    // Set the loading state to true
    setLoading(true);

    // Construct the prompt for the OpenAI API
    const prompt = `Please generate the body of a cover letter for a ${position} position at ${company}.
    I have a degree in ${degree} with ${experience} years of experience(s) with a specialty in ${specialty1} and ${specialty2}. 
    Make it a maximum of three paragraphs. Make the words maximum of twenty words per line  
    Add ${name} as the name after the Remarks`;

    // Send the prompt to the OpenAI API and retrieve the response

    openai
      .complete({
        engine: "text-davinci-003",
        prompt: prompt,
        maxTokens: 1000,
        temperature: 0.9,
      })
      .then(async (res) => {
        if (res.status === 200) {
          
          setLoading(false);
          // If the response status is 200, update the state variables, create a PDF document and save it
          if (res.status === 200) {
            const pdfDoc = await PDFDocument.create();
            const timesRomanFont = await pdfDoc.embedFont(
              StandardFonts.TimesRoman
            );
            const page = pdfDoc.addPage([595.28, 841.89]);

            const { width, height } = page.getSize();
            const fontSize = 10;
            const margin = 50;
            let y = height - margin;
            const words = res?.data?.choices[0]?.text.split(" ");
            const lines = [];
            let line = "";

            for (const word of words) {
              if ((line + word).length > 100) {
                lines.push(line);
                line = "";
              }

              line += `${word} `;
            }

            if (line.length > 0) {
              lines.push(line);
            }

            page.drawText(lines.join("\n"), {
              x: 50,
              y: height - 4 * fontSize,
              size: fontSize,
              font: timesRomanFont,
              color: rgb(0, 0.53, 0.71),
            });
            const pdfBytes = await pdfDoc.save();
            saveAs(new Blob([pdfBytes.buffer]), "My_cover_letter.pdf");
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        
        Swal.fire({
          title: "Error!",
          text: `${err}`,
          icon: "error",
          confirmButtonText: "ok",
        });
      });
  };

  // This function handles the form submission when the user clicks the submit button.
  // It prevents the default form submission behavior, and calls the generateCoverLetter 
  //function with the form input values as arguments.

  const handleSubmit = async (e) => {
    e.preventDefault();

    generateCoverLetter(
      position,
      company,
      degree,
      experience,
      specialtyOne,
      specialtyTwo
    );
  };

  return (
    <main className="bg-gray-100 min-h-screen ">
      <div className="flex flex-col items-center justify-center mb-20">
        <h1 className="text-2xl sm:text-2xl md:text-3xl sm:text-2xl font-bold text-center">
          Cover Letter Generator
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-3/4 md:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="company"
              >
                Name of Company applying to
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Enter company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="degree"
              >
                Position applying for
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Frontend developer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="degree"
              >
                Degree
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Mathematics"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="experience"
              >
                Year of Experience(s)
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                type="number"
                placeholder="3"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="specialtyOne"
              >
                Skill
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder=" JavaScript"
                value={specialtyOne}
                onChange={(e) => setSpecialtyOne(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="specialtyTwo"
              >
                Additional skill
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder=" Figma"
                value={specialtyTwo}
                onChange={(e) => setSpecialtyTwo(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center mb-20">
              <button
                className="  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {loading ? "loading..." : "Generate Cover Letter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
