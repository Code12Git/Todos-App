import vine from "@vinejs/vine";

export const registerSchema = vine.object({
	username: vine.string().minLength(4),
	name: vine.string().minLength(6).trim(),
	email: vine.string().email(),
	password: vine.string().minLength(8).maxLength(32).confirmed(),
});
