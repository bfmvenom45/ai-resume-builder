
import { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar"

const Upload = () => {  

    const [isProcessing, setIsProcecing] = useState(false);
    const [satusMessage, setStatusMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleSubmit =  (e: FormEvent<HTMLFormElement>) => {

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
                    <h2>{satusMessage}</h2>
                    <img 
                        src="/images/resume-scan.gif"
                        alt="Processing your resume"
                        className="w-full"
                    />
                    </>
                ) : (
                    <h2>Drop your resume for an ATS score and improvement tips. </h2>
                )}
                {!isProcessing && (
                    <form id="upload-form" onClick={handleSubmit} className="flex flex-col gap-4 mt-8">
                        <div className="form-div">
                            <label htmlFor="company-name">Company Name</label>
                            <input 
                                type="text" 
                                id="company-name" 
                                name="company-name" 
                                placeholder="Enter company name"
                                required
                            />
                        </div>
                            <div className="form-div">
                            <label htmlFor="job-title">Job Title</label>
                            <input 
                                type="text" 
                                id="job-title" 
                                name="job-title" 
                                placeholder='Enter job title'
                                required
                            />
                        </div>
                            <div className="form-div">
                            <label htmlFor="job-description">Job description</label>
                            <textarea 
                                rows={5} 
 
                                id="job-description" 
                                name="job-description" 
                                placeholder="Enter job description"
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
                            Submit for Review
                        </button>
                    </form>
                )}
            </div>  
        </section>
    </main>
    );


}
export default Upload;