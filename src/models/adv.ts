import mongoose from 'mongoose';
import mongoPagination from 'mongo-cursor-pagination';

const AdvModel = new mongoose.Schema({
	productName: {
		type: String,
		required: true,
		trim: true
	},
	extraInfo: {
		type: String,
		required: true,
		trim: true
	},
	priceOffer: {
		type: String,
		required: true,
		trim: true
	},
	userId: {
		type: String,
		required: true
	},
	active: {
		type: Boolean
	}
});

AdvModel.plugin(mongoPagination.mongoosePlugin);

export default mongoose.model('AdvModel', AdvModel);
