import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({
  productOverview: String,
  coreValueProposition: String,
  targetAudienceType: String,
  targetAudienceDetails: String,
  currentStage: String,
  goal: String,
  budget: Number,
  strengths: String,
  constraints: String,
  preferredChannels: {
    paidAds: Boolean,
    partnerships: Boolean,
    contentMarketing: Boolean,
    communityBuilding: Boolean,
    pr: Boolean,
    sem: Boolean,
    seo: Boolean,
    viral: Boolean,
    otherChannel: Boolean,
  },
  preferredChannelsOther: String,
  tone: String,
  email: String,
});

const FormData = mongoose.model('FormData', formDataSchema);

export default FormData;