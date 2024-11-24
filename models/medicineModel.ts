import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class MedicineModel extends Model {
	static table = "medicines";

	@field("name") name: string;
	@field("type") type: string;
	@field("stock") stock: number;
}
