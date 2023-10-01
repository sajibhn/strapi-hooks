const slug = require('slug')
const randomstring = require("random-string-gen");
const { errors } = require('@strapi/utils');
const { ApplicationError } = errors;

module.exports = {
	async afterCreate(event) {
		try {
			const { Name, Address, id } = event.result
			const url_slug = slug(`${Name} ${Address} ${randomstring(7)}`)

			await strapi.db.query('api::customer.customer').update({
				where: { id: id },
				data: {
					Slug: url_slug
				}
			});
		} catch (error) {
			throw new ApplicationError("Something went wrong");
		}
	}
};