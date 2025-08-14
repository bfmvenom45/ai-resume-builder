
import { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";


export const meta = () => ([
    { title: "Resumind | Resume Details" },
    { name: "description", content: "Review your resume analysis" },
])
const Resume = () => {
    const {auth, isLoading, fs, kv} = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState<string>("");
    const [resumeUrl, setResumeUrl] = useState<string>("");
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);

    }, [isLoading ]);

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if (!resume) {
                console.error("Resume not found");
                return;
            }
            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) {
                console.error("Failed to read resume file");
                return;
            }
            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);


            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) {
                console.error("Failed to read image file");
                return;
            }
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);
            setFeedback(data.feedback);
            console.log({resumeUrl, imageUrl, feedback: data.feedback});

        }

        loadResume();
    }, [id]);
    return (
        <main className="!pt-0">
                <nav className="resume-nav">
                    <Link to="/" className="back-button">
                        <img 
                            src="/icons/back.svg"
                            alt="Back to home"
                            className="w-2.5 h-2.5"
                        />
                        <span className="text-gray-800 text-sm font-semibold">Back to Home</span>
                    
                    </Link>
                </nav>

                <div className="flex flex-row w-full max-lg:flex-col-reverse">
                        <section  className="feedback-section bg-[url('/images/bg-small.svg')]
                         bg-cover h-[100vh] sticky top-0 items-center justify-center ">
                            {imageUrl && resumeUrl && (
                                <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-2xl:h-fit w-fit">
                                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full">
                                      
                                      <img
                                        src={imageUrl}
                                        alt="Resume Preview"
                                        className="w-full h-full object-contain rounded-2xl"
                                      />  
                                    </a>
                                </div>
                            )}
                        </section>
                        <section className="feedback-section">
                            <h2 className="text-4xl !text-black font-bold">
                                Resume Analysis
                            </h2>
                            {feedback ? (
                                <div className="flex flex-col gap-8  ani fade-in duration-1000">
                                        <Summary feedback={feedback}/>
                                        <ATS score={feedback.ATS.score || 0} suggestions={feedback.padStart.tips || []} />
                                        <Details feedback={feedback.details} /> 
                                </div>
                            ) : (
                                <img
                                    src="/images/resume-scan-2.gif"
                                    alt="No feedback available"
                                    className="w-full h-64 object-contain"
                                />
                            )

                            }
                        </section>
                </div>
        </main>
       

    )
}

export default Resume;