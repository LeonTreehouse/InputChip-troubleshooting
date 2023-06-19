import { z } from 'zod';
import { prisma } from '../../lib/server/server';
import { superValidate } from 'sveltekit-superforms/server';


const newCollectionSchema = z.object({

	chips: z.array(z.string()).optional(),

});



// @ts-ignore
export const load = async ({ event, locals }) => {
	const validation = await superValidate(event, newCollectionSchema);
	return {
		form: validation,
	};
};

export const actions = {
    // @ts-ignore
	default: async ({ event, request, locals }) => {
		const formData = await request.formData();
		const validation = await superValidate(formData, newCollectionSchema);
		const form = validation.data;
		console.log('Form Data:', formData);
		console.log('Validation:', validation);
		console.log('Form:', form);

		const chips = formData.getAll('chips');


		try {
			await prisma.collection.create({
				data: {
					chips: chips,
				}
			});

			return {
				status: 201,
				success: true,
				body: { message: 'Form submitted successfully' },
				form: validation,
			};
		} catch (error) {
			return {
				status: 400,
				success: false,
				body: { message: 'Error when creating collection' },
				form: validation // Add this line here
			};
		}
	}
};
