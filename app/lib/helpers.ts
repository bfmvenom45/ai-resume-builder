// Authentication helpers
export const requireAuth = (isAuthenticated: boolean, redirectPath: string = '/auth') => {
    if (!isAuthenticated) {
        return { shouldRedirect: true, redirectPath };
    }
    return { shouldRedirect: false };
};

// Resume score calculations
export const calculateOverallScore = (feedback: Feedback): number => {
    const scores = [
        feedback.ATS.score,
        feedback.content.score,
        feedback.structure.score,
        feedback.skills.score,
        feedback.toneAndStyle.score
    ];
    
    return Math.round(scores.reduce((acc, score) => acc + score, 0) / scores.length);
};

// Format date helpers
export const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Resume analysis helpers
export const getScoreStatus = (score: number): 'excellent' | 'good' | 'fair' | 'poor' => {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'fair';
    return 'poor';
};

export const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
};

// File validation
export const validatePdfFile = (file: File): { isValid: boolean; error?: string } => {
    if (!file.type.includes('pdf')) {
        return { isValid: false, error: 'File must be a PDF' };
    }
    
    if (file.size > 20 * 1024 * 1024) { // 20MB
        return { isValid: false, error: 'File size must be less than 20MB' };
    }
    
    return { isValid: true };
};
