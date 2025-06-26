import mongoose,{ Schema} from 'mongoose'
import bcrypt from 'bcrypt'
const userSchema=new Schema({
   username:{
      type:String,
      required:[true,"Username is required"],
      unique:true,
      trim:true,
      index:true,
      minlength:[3,"username should be atleast 3 characters"],
      maxlength:[50,"username cannot exceed 50 characters"]
   },
   fullname:{
     type:String,
     required:true,
     trim:true
   },

   email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    validate:{
        validator: function(email){
            return email.endswidth('@gmail.com')
        },
        message:'Email must be valid Gmail address (@gmail.com)'
    }

   },
   password:{
    type:String,
    required:[true,"Password is required"],
    minlength:[6, "Password must be at least 6 characters"]
   },
   
   avatar:{
      type:String,
      required:true
   },
    coverimage: {
         type: String,
            
         
      },
   bio:{
    type:String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
      default: ''
   },

   location:{
       type: String,
      maxlength: [100, 'Location cannot exceed 100 characters'],
      default: ''
   },
   stats:{
    numberofCountriesTraveled:{
      type: Number,
      default: 0,
      min: [0, 'Countries traveled cannot be negative']

   },
   numberofAdventures:{
    type: Number,
      default: 0,
      min: [0, 'Adventures cannot be negative']

   },
   overallProgress:{
      type: Number,
      default: 0,
      min: [0, 'Progress cannot be negative'],
      max: [100, 'Progress cannot exceed 100%']
   }},
   achievements:[{
    badgeType:{
      type: String,
      enum: ['explorer', 'photographer', 'storyteller', 'mountainclimber', 'socialbutterfly', 'goalsetting', 'legend'],
      required: true
   },
   earnedAt:{
     type: Date,
     default: Date.now
   },
   criteria:{
     type: String,
     required: true
   }}],




},{timestamps:true});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
export const User = mongoose.model("User", userSchema)

