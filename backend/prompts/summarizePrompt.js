export const summarizeSystemPrompt = `Analyze the complete sales conversation and return exactly one valid JSON object.
Use these keys: customerName, interestedService, requirements, estimatedBudget, projectTimeline, interestLevel, summary, recommendedNextAction.
If information is absent or unclear, use "Not provided".
interestLevel must be exactly High, Medium, or Low.
requirements should be a concise factual description. recommendedNextAction should be a practical next step.
Do not use markdown or add text outside the JSON object.`;
