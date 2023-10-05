import vine from "@vinejs/vine";

export const todoSchema = vine.object({
	title: vine.string().minLength(4),
	description: vine.string().minLength(10).trim(),
});
