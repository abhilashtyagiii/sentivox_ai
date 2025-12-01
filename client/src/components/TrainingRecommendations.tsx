import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, TrendingUp, Target, AlertTriangle, CheckCircle2, Star, HelpCircle, MessageSquare, Quote } from "lucide-react";

interface MissedFollowUp {
  afterNode: string;
  suggestedQuestion: string;
  suggestedQuestions?: string[];
  importance: "high" | "medium" | "low";
  reasoning: string;
  specificContext?: string;
  answerExcerpt?: string;
  followUpType?: "technical_depth" | "behavioral" | "clarification" | "project_details" | "quantification" | "team_collaboration";
}

interface TrainingRecommendation {
  area: string;
  priority: "critical" | "high" | "medium" | "low";
  issue: string;
  recommendation: string;
  resources: string[];
  expectedImprovement: string;
  missedFollowUps?: MissedFollowUp[];
}

interface PerformanceGap {
  metric: string;
  currentScore: number;
  targetScore: number;
  gap: number;
  severity: "critical" | "moderate" | "minor";
}

interface TrainingRecommendationsProps {
  recommendations?: TrainingRecommendation[];
  performanceGaps?: PerformanceGap[];
  strengthAreas?: string[];
  overallRating?: "excellent" | "good" | "needs_improvement" | "poor";
}

export default function TrainingRecommendations({
  recommendations = [],
  performanceGaps = [],
  strengthAreas = [],
  overallRating
}: TrainingRecommendationsProps) {
  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, { variant: any; className: string }> = {
      critical: { variant: "destructive", className: "" },
      high: { variant: "default", className: "bg-orange-500 hover:bg-orange-600" },
      medium: { variant: "secondary", className: "" },
      low: { variant: "outline", className: "" }
    };
    return variants[priority] || variants.medium;
  };

  const getRatingBadge = (rating?: string) => {
    const variants: Record<string, { variant: any; text: string; icon: any }> = {
      excellent: { variant: "default", text: "Excellent Performance", icon: <Star className="h-4 w-4 fill-current" /> },
      good: { variant: "secondary", text: "Good Performance", icon: <CheckCircle2 className="h-4 w-4" /> },
      needs_improvement: { variant: "outline", text: "Needs Improvement", icon: <TrendingUp className="h-4 w-4" /> },
      poor: { variant: "destructive", text: "Requires Attention", icon: <AlertTriangle className="h-4 w-4" /> }
    };
    return variants[rating || ""] || null;
  };

  if (recommendations.length === 0 && strengthAreas.length === 0) {
    return null;
  }

  const ratingBadge = getRatingBadge(overallRating);

  return (
    <div className="space-y-6" data-testid="training-recommendations-section">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Recruiter Training & Development
        </h3>
        {ratingBadge && (
          <Badge variant={ratingBadge.variant} className="flex items-center gap-1" data-testid="overall-rating-badge">
            {ratingBadge.icon}
            {ratingBadge.text}
          </Badge>
        )}
      </div>

      {/* Strengths */}
      {strengthAreas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              Areas of Strength
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {strengthAreas.map((strength, index) => (
                <li key={index} className="flex items-start gap-2" data-testid={`strength-${index}`}>
                  <Star className="h-4 w-4 text-green-600 dark:text-green-400 mt-1 shrink-0" />
                  <span className="text-sm text-foreground">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Performance Gaps */}
      {performanceGaps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-500" />
              Performance Gaps
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              These metrics show areas where your interview performance can be improved. Scores are out of 100, and gaps show how many points below the target you currently are.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceGaps.map((gap, index) => {
                const getExplanation = (metric: string, gapData: PerformanceGap) => {
                  if (metric.toLowerCase().includes('jd relevance')) {
                    return `Your questions currently align ${gapData.currentScore}% with the job description. Aim for ${gapData.targetScore}% by asking more questions that directly assess the specific skills, experience, and qualifications listed in the job posting.`;
                  } else if (metric.toLowerCase().includes('follow-up')) {
                    return `You're missing opportunities to dig deeper into candidate responses. Increase your follow-up rate by ${gapData.gap} points through probing questions when candidates mention projects, experiences, or skills.`;
                  } else if (metric.toLowerCase().includes('depth')) {
                    return `Your questions need more depth to properly assess candidates. Move from surface-level questions to ones that reveal true competency, problem-solving ability, and real-world application of skills.`;
                  } else if (metric.toLowerCase().includes('behavioral')) {
                    return `Include more behavioral questions using the STAR method (Situation, Task, Action, Result) to understand how candidates have handled real situations in the past.`;
                  }
                  return `This area needs improvement. Work to close the ${gapData.gap}-point gap through focused practice and training.`;
                };

                return (
                  <div key={index} className="border rounded-lg p-4 space-y-2" data-testid={`performance-gap-${index}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{gap.metric}</p>
                        <p className="text-sm font-medium text-muted-foreground mt-1">
                          Current: <span className="text-orange-600 dark:text-orange-400">{gap.currentScore}</span> → 
                          Target: <span className="text-green-600 dark:text-green-400">{gap.targetScore}</span> 
                          <span className="ml-2 text-red-600 dark:text-red-400">(Gap: {gap.gap} points)</span>
                        </p>
                      </div>
                      <Badge variant={gap.severity === "critical" ? "destructive" : gap.severity === "moderate" ? "default" : "secondary"}>
                        {gap.severity}
                      </Badge>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                      <p className="text-xs font-medium text-blue-900 dark:text-blue-200 mb-1">What this means:</p>
                      <p className="text-xs text-blue-800 dark:text-blue-300">
                        {getExplanation(gap.metric, gap)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Action Plan & Recommendations
          </h4>
          {recommendations.map((rec, index) => (
            <Alert key={index} data-testid={`recommendation-${index}`} className={
              rec.priority === "critical" ? "border-red-500 dark:border-red-700" :
              rec.priority === "high" ? "border-orange-500 dark:border-orange-700" : ""
            }>
              <div className="flex items-start gap-3">
                <AlertTriangle className={`h-5 w-5 mt-0.5 shrink-0 ${
                  rec.priority === "critical" ? "text-red-600 dark:text-red-400" :
                  rec.priority === "high" ? "text-orange-600 dark:text-orange-400" :
                  "text-blue-600 dark:text-blue-400"
                }`} />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <h5 className="font-semibold text-foreground">{rec.area}</h5>
                    <Badge {...getPriorityBadge(rec.priority)} data-testid={`priority-badge-${index}`}>
                      {rec.priority.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <AlertDescription className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">Issue:</p>
                      <p className="text-sm text-muted-foreground">{rec.issue}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-foreground">Recommendation:</p>
                      <p className="text-sm text-muted-foreground">{rec.recommendation}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-foreground">Expected Improvement:</p>
                      <p className="text-sm text-green-600 dark:text-green-400">{rec.expectedImprovement}</p>
                    </div>
                    
                    {rec.resources.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">Training Resources:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {rec.resources.map((resource, rIndex) => (
                            <li key={rIndex} className="flex items-start gap-2">
                              <BookOpen className="h-3 w-3 mt-1 shrink-0" />
                              <span>{resource}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Missed Follow-ups Section */}
                    {rec.missedFollowUps && rec.missedFollowUps.length > 0 && (
                      <div className="mt-4 border-t pt-3">
                        <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <HelpCircle className="h-4 w-4" />
                          Specific Missed Opportunities ({rec.missedFollowUps.length})
                        </p>
                        <Accordion type="single" collapsible className="w-full">
                          {rec.missedFollowUps.map((followUp, fIndex) => (
                            <AccordionItem key={fIndex} value={`followup-${fIndex}`} className="border-b last:border-0">
                              <AccordionTrigger className="text-sm hover:no-underline py-2">
                                <div className="flex items-center gap-2 text-left">
                                  <Badge variant={followUp.importance === "high" ? "destructive" : followUp.importance === "medium" ? "default" : "secondary"} className="text-xs">
                                    {followUp.importance.toUpperCase()}
                                  </Badge>
                                  <span className="font-medium">
                                    {followUp.followUpType === "technical_depth" && "Technical Depth"}
                                    {followUp.followUpType === "behavioral" && "Behavioral/STAR"}
                                    {followUp.followUpType === "project_details" && "Project Details"}
                                    {followUp.followUpType === "quantification" && "Quantification"}
                                    {followUp.followUpType === "clarification" && "Clarification"}
                                    {followUp.followUpType === "team_collaboration" && "Team Collaboration"}
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="text-sm space-y-3 pt-2">
                                {followUp.specificContext && (
                                  <div className="bg-muted/50 p-3 rounded-md">
                                    <p className="text-xs font-medium text-muted-foreground mb-1">Context:</p>
                                    <p className="text-sm">{followUp.specificContext}</p>
                                  </div>
                                )}
                                
                                {followUp.answerExcerpt && (
                                  <div className="border-l-4 border-primary/30 pl-3">
                                    <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                                      <Quote className="h-3 w-3" />
                                      Candidate's Answer:
                                    </p>
                                    <p className="text-sm italic text-muted-foreground">{followUp.answerExcerpt}</p>
                                  </div>
                                )}
                                
                                <div>
                                  <p className="text-xs font-medium text-foreground mb-1">Why This Matters:</p>
                                  <p className="text-sm text-muted-foreground">{followUp.reasoning}</p>
                                </div>
                                
                                {followUp.suggestedQuestions && followUp.suggestedQuestions.length > 0 ? (
                                  <div>
                                    <p className="text-xs font-medium text-foreground mb-2 flex items-center gap-1">
                                      <MessageSquare className="h-3 w-3" />
                                      Suggested Follow-up Questions:
                                    </p>
                                    <ul className="space-y-2">
                                      {followUp.suggestedQuestions.map((q, qIndex) => (
                                        <li key={qIndex} className="flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800">
                                          <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">{qIndex + 1}.</span>
                                          <span className="text-sm text-blue-900 dark:text-blue-100">"{q}"</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ) : (
                                  <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800">
                                    <p className="text-xs font-medium text-foreground mb-1">Suggested Question:</p>
                                    <p className="text-sm text-blue-900 dark:text-blue-100">"{followUp.suggestedQuestion}"</p>
                                  </div>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    )}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
}
