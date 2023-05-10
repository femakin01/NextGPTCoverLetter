"use client";

import Image from "next/image";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
// import { Document, Page, Text, PDFViewer, PDFDownloadLink } from 'react-pdf';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
	},
	section: {
		flexGrow: 1,
	},
});

export default function Home() {
  const [text, setText] = useState("");
  const [coverLetter, setcoverLetter] = useState();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("");
  const [specialtyOne, setSpecialtyOne] = useState("");
  const [specialtyTwo, setSpecialtyTwo] = useState("");

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    organization: "org-rXCK3Wb8ReJytvT5BtWXXpI3",
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const generateCoverLetter = async (name, position, company) => {
    const prompt = `Please generate the body of a cover letter for a frontend position at Datamellon Limited, Nigeria. I have a degree in Mathematics with 2 years of experience(s) with a specialty in JavaScript and ReactJs. Make it a maximum of three paragraphs.`;

    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.6,
        max_tokens: 1000,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          // setsummarizedtext(res?.data?.choices[0]?.text);
          console.log(res?.data?.choices[0]?.text);
        }
      })
      .catch((err) => {
        console.log(err, "An error occured");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const position = e.target.position.value;
    const company = e.target.company.value;

    console.log(
      "name",
      name,
      email,
      "email",
      position,
      "position",
      company,
      "company"
    );

    generateCoverLetter(position, company);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  const CoverLetter = () => {
    const letterContent = (
      <div>
        <p>Dear Hiring Manager,</p>
        <p>I am excited to apply for the Frontend position at Datamellon Limited, Nigeria. With a degree in Mathematics and 2 years of experience in JavaScript and ReactJs, I am confident that my skills and experience make me a strong candidate for this role.</p>
        <p>...</p>
      </div>
    );
  }


  // Create Document Component
  function BasicDocument() {
    return (
      <Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text>Hello World!</Text>
			</View>
			<View style={styles.section}>
				<Text>We're inside a PDF!</Text>
			</View>
		</Page>
	</Document>
    );
  }
  


  return (
    <main className="">
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
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="company"
              >
                Name of Company
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Enter company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
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
                placeholder="Enter degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="experience"
              >
                Year of Experience
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                type="number"
                placeholder="Enter years of experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="specialtyOne"
              >
                Specialty One
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Enter specialty one"
                value={specialtyOne}
                onChange={(e) => setSpecialtyOne(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="specialtyTwo"
              >
                Specialty Two
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Enter specialty two"
                value={specialtyTwo}
                onChange={(e) => setSpecialtyTwo(e.target.value)}
              />
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </form>




<div>
     

<BasicDocument />
    </div>


        </div>
      </div>
   
    </main>
  );
}
