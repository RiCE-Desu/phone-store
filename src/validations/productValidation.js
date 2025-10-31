import z from "zod";

export const createProductSchema = z.object({
  user_id: z.number({
    required_error: "user_id wajib diisi",
    invalid_type_error: "user_id harus berupa angka",
  }),
  name: z
    .string()
    .min(3, "nama minimal 3 karakter")
    .max(150, "nama maksimal 150 karakter"),
  description: z.string().min(5, "deskripsi minimal 5 karakter"),
  price: z
    .number({
      required_error: "harga wajib diisi",
      invalid_type_error: "harga harus berupa angka",
    })
    .nonnegative("harga tidak boleh negatif"),
  stock: z
    .number({
      required_error: "stok wajib diisi",
      invalid_type_error: "stok harus berupa angka",
    })
    .int("stok harus berupa bilangan bulat")
    .nonnegative("stok tidak boleh negatif"),
});

export const updateProductSchema = z.object({
  user_id: z
    .number({
      invalid_type_error: "user_id harus berupa angka",
    })
    .optional(),
  name: z
    .string()
    .min(3, "nama minimal 3 karakter")
    .max(150, "nama maksimal 150 karakter")
    .optional(),
  description: z.string().min(5, "deskripsi minimal 5 karakter").optional(),
  price: z
    .number({
      invalid_type_error: "harga harus berupa angka",
    })
    .nonnegative("harga tidak boleh negatif")
    .optional(),
  stock: z
    .number({
      invalid_type_error: "stok harus berupa angka",
    })
    .int("stok harus berupa bilangan bulat")
    .nonnegative("stok tidak boleh negatif")
    .optional(),
});