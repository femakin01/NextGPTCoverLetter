# NextGPTCoverLetter

This repository contains a Next.js application that generates cover letters using the power of GPT-3.5 language model. With NextGPTCoverLetter, you can quickly and effortlessly create personalized cover letters for various job applications.

# Features

- Generate custom cover letters based on user input

- Preview and download the generated cover letter as a PDF

# Installation

- Clone the repository:

```javaScript
git clone https://github.com/femakin01/NextGPTCoverLetter.git

```


- Navigate to the project directory:

```javaScript
cd NextGPTCoverLetter

```

- Install the dependencies:

```javaScript
npm install

```

# Configure the OpenAI API key:

Create YOUR_API_KEY in the .env file

like `NEXT_PUBLIC_Seceret_Key_API='your_api_key'`

 and use the API Key in the `app/util.js` file like

```
const OpenAI = require('openai-api');
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_Seceret_Key_API;
export const openai = new OpenAI(OPENAI_API_KEY);

```


# Start the development server:

```javaScript
npm run dev
```

The application will be available at `http://localhost:3000`.


# Usage
Open your web browser and navigate to http://localhost:3000.

Fill in the required information, such as the recipient's name, company name, and job position.

Click the "Generate Cover Letter" button to create the cover letter based on your input.


Download the cover letter as a PDF document.

# Contributing
Contributions are welcome! If you have any ideas, enhancements, or bug fixes, please open an issue or submit a pull request.

License
This project is licensed under the [MIT License](https://chat.openai.com/LICENSE). Feel free to use and modify this code for personal and commercial purposes.

# Acknowledgements

- This project utilizes the power of the GPT-3.5 language model provided by OpenAI.
- The Next.js framework is used for the web application development.
- The PDF generation is done using the `html-pdf` library.

# Contact

If you have any questions or suggestions, feel free to contact the project maintainer at akinfemi46@gmail.com.
