import { Link } from "react-router";
import { useEffect, useState } from "react";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({resume : {id, companyName, jobTitle, feedback, imagePath}}: {resume: Resume }) => {
    const { fs } = usePuterStore();
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        const loadImage = async () => {
            try {
                const imageBlob = await fs.read(imagePath);
                if (!imageBlob) {
                    console.error("Failed to read image file");
                    return;
                }
                const blob = new Blob([imageBlob], { type: 'image/png' });
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            } catch (error) {
                console.error("Error loading image:", error);
            }
        };

        if (imagePath) {
            loadImage();
        }

        // Cleanup function
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imagePath, fs]);

    return (
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in durration-1000">
            <div className="resume-card-header">
            <div className="flex flex-col gap-2">
                <h2 className="!text-black font-bold break-words">
                    {companyName}
                </h2>
                <h3 className="text-lg break-words text-gray-500">
                    {jobTitle}
                </h3>
            </div>
            <div className="flex-shrink-0">
                <ScoreCircle score={feedback.overallScore} />
            </div>

            </div>
            <div className="gradient-border animated-in fade-in duration-1000">
                <div className="w-full h-full ">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt='resume'
                            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
                        />
                    ) : (
                        <div className="w-full h-[350px] max-sm:h-[200px] bg-gray-200 animate-pulse flex items-center justify-center">
                            <span className="text-gray-500">Loading...</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );   
}
export default ResumeCard;  