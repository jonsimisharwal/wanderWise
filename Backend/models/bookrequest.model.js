import mongoose,{Schema} from 'mongoose'

const CommunityStatsSchema=new mongoose.Schema({
    
},{timestamps:true});

export const Communitystats=mongoose.model("community",CommunityStatsSchema);