// PostForm
import {
  type Dispatch,
  type SetStateAction,
  useState,
  useEffect,
  useCallback,
} from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import FormInput from "../FormInput";
import { type TypeOf, object, string } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { type FormikErrors, useFormik } from "formik";
import { type Post, IPageType } from "~/types/GlobalType";
import ImageFilePicker from "../ImageFilePicker";
import CategorySelector from "../CategorySelector";
import { useAuthProvider } from "../provider/AuthProvider";

const postFormSchema = object({
  title: string({
    required_error: "Title can't be empty",
  }),
  book_author: string({
    required_error: "Book author name can't be empty",
  }),
  publication_year: string({
    required_error: "Publication year can't be empty",
  }),
  description: string({
    required_error: "Description can't be empty",
  }),
  time: string({
    required_error: "time can't be empty",
  }),
  photo: string({
    required_error: "Photo can't be empty",
  }),
});
type PostFormInputs = TypeOf<typeof postFormSchema>;

interface PostFormProps {
  activePost: Post;
  isEdit: boolean;
  setIsEdite: Dispatch<SetStateAction<boolean>>;
}

const PostForm = ({ activePost, isEdit, setIsEdite }: PostFormProps) => {
  const ctx = api.useUtils();
  const router = useRouter();
  const { userId } = useAuthProvider();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { mutate: createPost, isPending: isCreateLoading } =
    api.post.createPost.useMutation({
      onSuccess: async (post) => {
        // await ctx.post.getAll.refetch();
        void router.push(`/post/${post.id}`);
        console.log("created post:", post);
      },
      onError: (e) => {
        console.log(e);
      },
    });

  const { mutate: updatePost, isPending: isUpdateLoading } =
    api.post.updatePost.useMutation({
      onSuccess: async (post) => {
        await ctx.post.getPostById.refetch();
        setIsEdite(false);
        void router.push(`/post/${post.id}`);
        console.log("update post:", post);
      },
      onError: (e) => {
        console.log(e);
      },
    });

  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleSubmit,
    // setValues,
    // submitForm,
  } = useFormik<PostFormInputs>({
    initialValues: {
      title: activePost.title,
      book_author: activePost.book_author,
      publication_year: activePost.publication_year,
      description: activePost.description,
      time: activePost.time,
      photo: activePost.photo,
    },
    isInitialValid: true,
    validationSchema: toFormikValidationSchema(postFormSchema),
    onSubmit: (values) => {
      console.log("-=-= onSubmit values", values);
      if (isEdit && activePost.id) {
        updatePost({
          category_id: selectedCategories,
          post_id: activePost.id,
          view_id: activePost.view_id,
          ...values,
        });
      } else {
        createPost({
          category_id: selectedCategories,
          user_id: userId,
          ...values,
        });
      }
    },
  });

  const setInputValue = useCallback(
    (field: string, value: string) => {
      setFieldValue(field, value).catch(console.log);
    },
    [setFieldValue],
  );

  useEffect(() => {
    if (activePost) {
      setSelectedCategories(activePost.category_id);
    }
  }, [activePost]);

  return (
    <div className="flex h-full w-full px-4 sm:px-12">
      {isCreateLoading || isUpdateLoading ? (
        <div>Is Loading ...</div>
      ) : (
        <div className="flex h-full w-full flex-col gap-12 rounded-lg border border-gray-300 bg-orange-100 p-8 shadow-md md:flex-row">
          <ImageFilePicker
            value={values.photo}
            setImageBase={(val) => setInputValue("photo", val)}
            errorMessage={touched.photo && errors.photo ? errors.photo : ""}
          />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between gap-4 md:w-2/3"
          >
            <div className="flex flex-col gap-4">
              <FormInput
                id="title"
                label="Назва книги"
                name="title"
                type="text"
                placeholder="Введіть назву книги"
                value={values.title}
                onChange={(val) => setInputValue("title", val)}
                errorMessage={touched.title && errors.title ? errors.title : ""}
              />
              <FormInput
                id="book_author"
                label="Автор"
                name="book_author"
                type="text"
                placeholder="Введіть автора книги"
                value={values.book_author}
                onChange={(val) => setInputValue("book_author", val)}
                errorMessage={
                  touched.book_author && errors.book_author
                    ? errors.book_author
                    : ""
                }
              />
              <FormInput
                id="publication_year"
                label="Рік видання"
                name="publication_year"
                type="text"
                placeholder="Введіть рік видання"
                value={values.publication_year}
                onChange={(val) => setInputValue("publication_year", val)}
                errorMessage={
                  touched.publication_year && errors.publication_year
                    ? errors.publication_year
                    : ""
                }
              />
              <FormInput
                id="description"
                label="Опис книги"
                name="description"
                type="text"
                placeholder="Введіть опис книги"
                value={values.description}
                onChange={(val) => setInputValue("description", val)}
                errorMessage={
                  touched.description && errors.description
                    ? errors.description
                    : ""
                }
                isTextarea
              />

              <CategorySelector
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </div>
            <div className="flex items-center justify-end">
              <div className="flex gap-4">
                {isEdit && (
                  <button
                    type="button"
                    onClick={() => setIsEdite(false)}
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    disabled={isCreateLoading || isUpdateLoading}
                  >
                    Скасувати
                  </button>
                )}

                <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  disabled={isCreateLoading || isUpdateLoading}
                >
                  {isEdit ? "Оновити" : "Створити"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostForm;
