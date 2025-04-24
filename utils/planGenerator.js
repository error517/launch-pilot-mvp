function generateMiniPlan(formData) {
  const {
    productOverview,
    coreValueProposition,
    targetAudienceType,
    targetAudienceDetails,
    currentStage,
    goal,
    budget,
    strengths,
    constraints,
    preferredChannels,
  } = formData;

  const miniPlan = {
    productOverview,
    coreValueProposition,
    targetAudience: { type: targetAudienceType, details: targetAudienceDetails},
    goal
  };

  const channels = [];

  for (const channelName in preferredChannels) {
    if (preferredChannels[channelName]) {
      const channel = {
        name: channelName,
        tasks: [],
      };
      channels.push(channel);
    }
  }

  miniPlan.channels = channels;

  return miniPlan;
}