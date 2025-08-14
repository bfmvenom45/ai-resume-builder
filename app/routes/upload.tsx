


import {prepareInstructions} from "../../constants";
import {type FormEvent, useState} from "react";
import { data, useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar"
import { convertPdfToImage } from "~/lib/pdf2image";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

const Upload = () => {  

    const {auth, isLoading, fs, ai, kv} = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        try {
            setIsProcessing(true); 
            setStatusText("Uploading the file...");
            
            const uploadedFile = await fs.upload([file]);
            if (!uploadedFile) {
                setStatusText("Error: Failed to upload file");
                setIsProcessing(false);
                return;
            }
            
            setStatusText("Converting to image...");
            const imageFile = await convertPdfToImage(file);
            
            if (!imageFile.file || imageFile.error) {
                console.error("PDF conversion error:", imageFile.error);
                setStatusText(`Error: ${imageFile.error || "Failed to convert PDF to image"}`);
                setIsProcessing(false);
                return;
            }
            
            setStatusText("Uploading the image...");
            const uploadedImage = await fs.upload([imageFile.file]);
            if (!uploadedImage) {
                setStatusText("Error: Failed to upload image");
                setIsProcessing(false);
                return;
            }
            
            setStatusText("Preparing data...");
            const uuid = generateUUID();
            const data = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName,
                jobTitle,
                jobDescription,
                feedback: "",
            }
            await kv.set(`resume:${uuid}`, JSON.stringify(data));

            setStatusText("Analyzing...");
            const feedback = await ai.feedback(
                uploadedFile.path,
                prepareInstructions({jobTitle, jobDescription})
            )

            if (!feedback) {
                setStatusText("Error: Failed to analyze resume");
                setIsProcessing(false);
                return;
            }

            const feedbackText = typeof feedback.message.content === 'string'
                ? feedback.message.content
                : feedback.message.content[0].text;

            data.feedback = JSON.parse(feedbackText);
            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            setStatusText("Analysis complete, redirecting...");
            console.log(data);
            
            navigate(`/resume/${uuid}`);
        } catch (error) {
            console.error("Error in handleAnalyze:", error);
            setStatusText(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`);
            setIsProcessing(false);
        }

    };

     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) {
            setStatusText("Please upload a resume file.");
            return;
        }

        if (!companyName || !jobTitle || !jobDescription) {
            setStatusText("Please fill in all required fields.");
            return;
        }

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }
    return (
     <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
        <section className="main-section">
            <div className="page-heading py-16">
                <h1>Upload Your Resume</h1>
                <h2>Get AI-powered feedback on your resume.</h2>
                {isProcessing ? (
                    <>
                    <h2>{statusText}</h2>
                    <img 
                        src="/images/resume-scan.gif"
                        alt="Processing your resume"
                        className="w-full"
                    />
                    </>
                ) : (
                    <h2>Drop your resume for an ATS score and improvement tips.</h2>
                )}
                {!isProcessing && (
                    <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                        <div className="form-div">
                            <label htmlFor="company-name">Company Name</label>
                            <input 
                                type="text" 
                                id="company-name" 
                                name="company-name" 
                                placeholder="Company Name"
                                required
                            />
                        </div>
                            <div className="form-div">
                            <label htmlFor="job-title">Job Title</label>
                            <input 
                                type="text" 
                                id="job-title" 
                                name="job-title" 
                                placeholder="Job Title"
                                required
                            />
                        </div>
                            <div className="form-div">
                            <label htmlFor="job-description">Job Description</label>
                            <textarea 
                                rows={5} 
                                id="job-description" 
                                name="job-description" 
                                placeholder="Job Description"
                                required
                            />
                        </div>
                            <div className="form-div">
                            <label htmlFor="uploader">Upload Resume</label>
                            <FileUploader onFileSelect={handleFileSelect} />
                        </div>
                        <button 
                            type="submit" 
                            className="primary-button"
                        >
                            Analyze Resume
                        </button>
                    </form>
                )}
            </div>  
        </section>
    </main>
    );


}
export default Upload;