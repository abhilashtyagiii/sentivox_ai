import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, HelpCircle, Lightbulb, AlertCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface QAItem {
  question: string;
  timestamp: string;
  answers: Array<{
    text: string;
    timestamp: string;
    matchScore?: number;
    matchLevel?: string;
    matchExplanation?: string;
    sentiment?: string;
    jdMatch: number;
    reasoning?: string;
  }>;
  relevance: number;
  reasoning?: string;
}

interface ConversationAnalysisProps {
  qaAnalysis: QAItem[];
  insights: string[];
}

export default function ConversationAnalysis({ qaAnalysis, insights }: ConversationAnalysisProps) {
  const getBadgeColor = (score: number) => {
    if (score >= 85) return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700";
    if (score >= 70) return "bg-lime-100 dark:bg-lime-900/30 text-lime-800 dark:text-lime-200 border-lime-200 dark:border-lime-700";
    if (score >= 50) return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700";
    return "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700";
  };

  const getBadgeText = (score: number) => {
    if (score >= 85) return `✅ Excellent Match (${score}%)`;
    if (score >= 70) return `🟡 Good Match (${score}%)`;
    if (score >= 50) return `🟠 Fair Match (${score}%)`;
    return `🔴 Poor Match (${score}%)`;
  };

  const getRelevanceExplanation = (score: number, reasoning?: string) => {
    if (reasoning) return reasoning;
    
    if (score >= 85) return `Why ${score}%? This question fully aligns with the job description, targeting critical competencies and core responsibilities. It effectively evaluates the candidate's ability to perform key functions of the role.`;
    if (score >= 70) return `Why ${score}%? This question covers most job requirements but could be more specific in certain areas. It addresses important skills mentioned in the JD but may lack some depth or miss minor details.`;
    if (score >= 50) return `Why ${score}%? This question is partially relevant, touching on some job requirements but missing important aspects. Consider focusing more directly on the specific technical skills or key responsibilities outlined in the JD.`;
    return `Why ${score}%? This question has minimal connection to the job description. It doesn't effectively assess the candidate's fit for the role's core functions and required competencies. Align questions more closely with JD requirements.`;
  };

  const getAnswerExplanation = (score: number, reasoning?: string) => {
    if (reasoning) return reasoning;
    
    if (score >= 85) return `Why ${score}%? The candidate's answer comprehensively and directly addresses the recruiter's question. The response demonstrates clear understanding, provides relevant examples, and covers all key points asked.`;
    if (score >= 70) return `Why ${score}%? The answer covers the main points of the question with good clarity. The candidate understood the question and provided relevant information, though some details could be more specific.`;
    if (score >= 50) return `Why ${score}%? The answer partially addresses the question but misses some important aspects or lacks clarity. The candidate understood the general intent but didn't fully address all parts of the question.`;
    return `Why ${score}%? The answer does not properly address the recruiter's question. The candidate either misunderstood the question or provided information unrelated to what was asked.`;
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Question & Answer Analysis</h3>
          
          <div className="space-y-6">
            {qaAnalysis.map((qa, index) => (
              <div 
                key={index} 
                id={`transcript-segment-${index}`}
                className="border-l-4 border-primary pl-4 transition-all duration-300" 
                data-testid={`qa-item-${index}`}
              >
                {/* RECRUITER QUESTION */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      <HelpCircle className="inline text-primary mr-2 h-4 w-4" />
                      "{qa.question}"
                    </p>
                    <div className="mt-3 flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
                      <span>Recruiter • {qa.timestamp}</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border cursor-help ${getBadgeColor(qa.relevance)}`} data-testid={`relevance-badge-${index}`}>
                            <span>JD Relevance: {getBadgeText(qa.relevance)}</span>
                            <Info className="h-4 w-4" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-sm">
                          <div className="space-y-2">
                            <p className="font-semibold text-primary">Question Relevance to Job Description</p>
                            <p className="text-xs leading-relaxed">{getRelevanceExplanation(qa.relevance, qa.reasoning)}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              
                {/* CANDIDATE ANSWERS */}
                {qa.answers.map((answer, answerIndex) => (
                  <div key={answerIndex} className="mt-4 ml-6 pb-4 border-b last:border-b-0">
                    <p className="text-foreground mb-2">
                      <MessageCircle className="inline text-green-600 dark:text-green-400 mr-2 h-4 w-4" />
                      <span className="text-sm">{answer.text.length > 200 ? answer.text.substring(0, 200) + "..." : answer.text}</span>
                    </p>
                    <div className="mt-2 flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
                      <span>Candidate • {answer.timestamp}</span>
                      
                      {/* Answer Match Score - shows how well candidate answered the specific question */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border cursor-help ${getBadgeColor(answer.jdMatch)}`} data-testid={`answer-match-badge-${index}-${answerIndex}`}>
                            <span>Answer Match: {getBadgeText(answer.jdMatch)}</span>
                            <Info className="h-4 w-4" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-sm">
                          <div className="space-y-2">
                            <p className="font-semibold text-primary">How Well Did They Answer the Question?</p>
                            <p className="text-xs leading-relaxed">{getAnswerExplanation(answer.jdMatch, answer.reasoning)}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {qaAnalysis.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No conversation analysis available yet.</p>
                <p className="text-sm">Analysis will appear here once processing is complete.</p>
              </div>
            )}
          </div>
          
          {insights.length > 0 && (
            <div className="mt-6 p-4 bg-muted rounded-lg" data-testid="insights-container">
              <h4 className="font-medium text-foreground mb-3 flex items-center">
                <Lightbulb className="text-yellow-500 dark:text-yellow-400 mr-2 h-4 w-4" />
                Analysis Insights
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {insights.map((insight, index) => {
                  let displayText = '';
                  if (typeof insight === 'string') {
                    displayText = insight;
                  } else if (insight && typeof insight === 'object') {
                    displayText = (insight as any).description ||
                                 (insight as any).insight || 
                                 (insight as any).text || 
                                 (insight as any).content || 
                                 JSON.stringify(insight);
                  } else {
                    displayText = 'Unable to display insight';
                  }
                  
                  return (
                    <li key={index} data-testid={`insight-${index}`} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{displayText}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
