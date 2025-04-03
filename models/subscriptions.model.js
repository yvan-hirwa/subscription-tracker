import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    price:{
        type: Number,
        required: [true, 'subscription price is required'],
        min: [0,'price must be greater than or equal to 0'],
    },
    currency: {
        type: String,
        required: [true, 'currency is required'],
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD',
    },
    frequency: {
        type: String,
        required: [true, 'frequency is required'],
        enum: ['daily','weekly','monthly', 'yearly'],
        default: 'monthly',
    },
    category: {
        type: String,
        required: [true, 'category is required'],
        enum: ['sports','entertainment', 'utilities', 'food', 'transportation', 'health', 'other'],
        default: 'sports',
    },
    payementMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'canceled', 'expired'],    
        default: 'active',
    },
    startDate: {
        type: Date,
        required: true,
        validate:{
            validator: (Value)=> value<= new Date(),
                message:  'Start Date must be now or past',
            }
        },

    renewalDate: {
        type: Date,
        validate:{
            validator: function(Value){
                return value > this.startDate;
            },
                message:  'Renewal Date must be greater than Start Date',
            }
        },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

},{timestamps: true});

//automatically set the renewal date based on the frequency and start date
// if the renewal date is not provided
subscriptionSchema.pre('save', function(next) {
    if (!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewaldate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //auto-update the status of the subscription based on the renewal date
    if (this.renewalDate < new Date()){
        this.status = 'expired';
    }

    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;